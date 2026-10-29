import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Algebra I, Grade 9, Quarter 1. Standards: Common Core, High School Algebra
 * and Functions (N-Q, A-SSE, A-CED, A-REI, F-IF), in the school's own words.
 */

const w1: WeekInput = {
  topic: "Quantities, units and writing equations from a story",
  note: `
## Objectives

Students will be able to:

1. choose sensible units for a quantity and use them to read a formula or a graph;
2. name the terms, factors and coefficients in an expression and say what each means in a situation;
3. write and solve a one-variable linear equation from a word problem.

## Materials

Mini whiteboards, a Kroger receipt (one per group), and the exit ticket.

## Starter (8 minutes)

Put a grocery receipt on the board: 3 gallons of milk at $3.49 and a loaf of bread at $2.79. Ask: "What is the total, and what does each number mean?" Collect units on the board: dollars, gallons, dollars per gallon.

## Main activity

1. Model an expression, 3.49m + 2.79, where m is the number of gallons. Circle the terms and point to the coefficient, 3.49, and ask what it measures (dollars per gallon).
2. Give the problem: "A rideshare charges $2.50 to start and $1.40 per mile. The ride cost $16.50. How far did it go?" Students write the equation, 2.50 + 1.40m = 16.50, before solving.
3. Students work in pairs on three more stories and must label every variable with its unit.

## Checking for understanding

Mini whiteboards: show the equation for a story and hold it up. Look for a variable with no unit and for coefficients attached to the wrong quantity.

## Exit ticket

Write an equation for: "Maya has $40 and spends $6 a week on lunch. When does she have $10 left?"
`,
  reading: [
    "Reading a formula like a sentence",
    `
Algebra is a way of writing down how quantities are related. Before you write any symbols, ask what is being measured and in what units. A speed might be in miles per hour, a price in dollars per pound, a time in minutes. A number without a unit tells you very little.

An **expression** is a mathematical phrase, such as 4.25g + 12, with no equal sign. It is made of **terms** separated by plus or minus signs. In 4.25g + 12 the terms are 4.25g and 12. The number multiplying the variable, 4.25, is the **coefficient**. The 12 is a **constant** because it never changes.

Suppose a car wash charges $12 to start and $4.25 for each gallon of water it uses for a special rinse. The expression 4.25g + 12 gives the cost for g gallons. The coefficient tells you the rate, in dollars per gallon. The constant tells you the fixed charge, in dollars. If you change g, only the first term changes.

An **equation** says that two expressions are equal. To solve a word problem, translate it step by step. First define the variable and its unit: "Let m be the number of miles." Next find the words that mean equals: "total is", "ends up", "costs". Then build the equation from the quantities in the story.

**Example.** A rideshare charges $2.50 to start and $1.40 per mile. A ride cost $16.50. Let m be the number of miles. Then 2.50 + 1.40m = 16.50. Subtract 2.50 from both sides to get 1.40m = 14.00, then divide both sides by 1.40 to get m = 10. The ride was 10 miles. Check by substituting: 2.50 + 1.40(10) = 2.50 + 14.00 = 16.50. It works.

A solution only counts if it makes sense. A negative number of miles, or 2.5 people, cannot be the answer to a story problem, so always read your answer back in the story.
`,
  ],
  cards: [
    ["Variable", "A letter that stands for a quantity that can change or that you do not know yet."],
    ["Term", "A number, a variable, or a product of both, separated from others by + or - in an expression."],
    ["Coefficient", "The number multiplied by a variable, such as 4.25 in 4.25g."],
    ["Constant", "A term with no variable. Its value never changes."],
    ["Expression", "A phrase made of numbers, variables and operations with no equal sign."],
    ["Equation", "A statement that two expressions are equal."],
    ["Unit", "What a number measures, such as miles, dollars or gallons per minute."],
    ["Inverse operation", "An operation that undoes another, such as subtraction undoing addition."],
  ],
  closed: [
    [
      "A gym charges a $25 sign-up fee and $18 a month. Which expression gives the cost, in dollars, after m months?",
      ["25m + 18", "18m + 25", "43m", "25 + 18 + m"],
      "B",
    ],
    [
      "In the expression 7.5h + 20, what does the 7.5 most likely represent for a tutor who charges by the hour?",
      ["The number of hours worked", "The fixed fee, in dollars", "The rate, in dollars per hour", "The total pay, in dollars"],
      "C",
    ],
    [
      "Solve 3x + 4 = 19.",
      ["x = 5", "x = 7.67", "x = 15", "x = 23"],
      "A",
    ],
    [
      "A Columbus bus pass costs $62 a month. Dana has $248. Which equation finds how many months m the money lasts?",
      ["62 + m = 248", "62m = 248", "m = 62 × 248", "248m = 62"],
      "B",
    ],
    [
      "Which is a good first step in a word problem?",
      [
        "Pick the operation that sounds right",
        "Define the variable and its unit",
        "Round every number to the nearest ten",
        "Solve before reading the whole problem",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Jordan is saving for a $120 pair of shoes. He has $35 and saves $8.50 each week from a job at the Kroger deli. Write an equation to find the number of weeks w until he has enough, then solve it.",
      scheme: [
        "Defines the variable with its unit, such as w = weeks",
        "Writes a correct equation, 35 + 8.5w = 120",
        "Solves with correct steps, subtracting 35 and dividing by 8.5",
        "States the answer as 10 weeks, with a unit",
      ],
      model:
        "Let w be the number of weeks. Jordan has 35 dollars and adds 8.50 dollars each week, so 35 + 8.5w = 120. Subtract 35 from both sides to get 8.5w = 85. Divide by 8.5 to get w = 10. It will take 10 weeks.",
      answers: [
        [
          "full",
          "[[0|Let w = the number of weeks.]] [[1|35 + 8.5w = 120]]. Take away 35 from each side, 8.5w = 85. [[2|Then 85 / 8.5 so w = 10.]] [[3|He needs 10 weeks.]]",
          "Full marks. You defined w first, which is the habit that keeps word problems organized.",
        ],
        [
          "full",
          "[[0|w is how many weeks he saves]]. He starts with $35 and adds 8.50 per week so [[1|8.50w + 35 = 120]]. [[2|120 - 35 = 85 and 85 / 8.50 = 10]]. [[3|The answer is 10 weeks.]]",
          "All four marks. Writing the constant after the term is fine, since the addition is the same either way.",
        ],
        [
          "partial",
          "[[0|w = weeks]]. [[1|35 + 8.5w = 120]]. 120 + 35 = 155 and 155 / 8.5 = 18.2, so about 18 weeks.",
          "Your equation is right. You added 35 when you needed to subtract it, because it is already in his pocket. Subtract to get 85, then divide.",
        ],
        [
          "partial",
          "[[1|35 + 8.5w = 120]] so 8.5w = 85 and [[2|w = 10]].",
          "The equation and the solving are right. Say what w stands for and finish with a sentence that has the unit, weeks.",
          true,
        ],
        [
          "weak",
          "35 + 8.5 = 43.5 and then 120 - 43.5 = 76.5 so he needs 76.5 weeks.",
          "You added the weekly amount only once. The $8.50 is saved every week, so it multiplies the number of weeks. Try writing 8.5w.",
        ],
        [
          "weak",
          "[[0|I let w be weeks]] and 120 × 8.5 = 1020 so it is 1020 weeks.",
          "Defining w was a good start. Multiplying 120 by 8.5 does not match anything in the story. Ask what he has, what he adds, and what he wants.",
        ],
      ],
    },
    {
      prompt:
        "A taxi charges $3 plus $2.25 per mile. In the expression 3 + 2.25m, name the constant and the coefficient and say what each tells you about the taxi fare.",
      scheme: [
        "Names 3 as the constant",
        "Says the constant is a fixed charge, in dollars, whatever the distance",
        "Names 2.25 as the coefficient",
        "Says the coefficient is the charge per mile, in dollars per mile",
      ],
      model:
        "The constant is 3, the fixed starting charge of 3 dollars no matter how far you go. The coefficient is 2.25, the cost in dollars for each mile traveled.",
      answers: [
        [
          "full",
          "[[0|The constant is 3]] and [[1|that is the flat fee you pay even if you ride zero miles]]. [[2|The coefficient is 2.25]] and [[3|it is what each mile costs in dollars per mile]].",
          "Full marks, and the zero-miles check is a sharp way to explain a constant.",
        ],
        [
          "full",
          "[[2|2.25 is the coefficient]] [[3|because it multiplies the miles, so it is dollars for each mile]]. [[0|3 is the constant]], [[1|the starting charge in dollars that stays the same]].",
          "All four marks. You tied each number to its unit, which is what the question was asking for.",
        ],
        [
          "partial",
          "[[0|The constant is 3]] and the coefficient is m. 3 is the start price.",
          "The coefficient is the number 2.25, not the letter m. The letter is the variable. You described the constant well.",
        ],
        [
          "partial",
          "[[2|The coefficient is 2.25]] [[3|and it is the price for each mile]]. 3 is the first number.",
          "Good on the coefficient. Name 3 as the constant and say it is a fixed charge in dollars that does not change with distance.",
        ],
        [
          "weak",
          "The 3 is the number of miles and 2.25 is the total cost.",
          "Look at where the letter m is. It multiplies 2.25, so m is the miles and 2.25 is a rate. The 3 does not change, so it is the fixed charge.",
        ],
        [
          "weak",
          "[[0|3 is the constant]]. The coefficient is the answer to the whole problem.",
          "You found the constant. The coefficient is the number multiplying the variable, which is 2.25. The answer is a different thing, the total fare.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Rearranging formulas and thinking about constraints",
  note: `
## Objectives

Students will be able to:

1. rearrange a formula to solve for a chosen quantity;
2. write equations and inequalities that describe constraints in a situation;
3. decide whether a solution is possible in the real situation.

## Materials

Formula cards (distance, perimeter, temperature), mini whiteboards, a number line strip.

## Starter (7 minutes)

Show the Fahrenheit and Celsius formula, F = 1.8C + 32. Ask: "If the high in Columbus is 50 degrees Fahrenheit, how can we find Celsius without guessing?" Take two student ideas, then point out that we would like a formula that solves for C.

## Main activity

1. Model solving F = 1.8C + 32 for C by undoing in reverse order: subtract 32, then divide by 1.8. Emphasize that whatever happens on one side happens on the other.
2. Students rearrange d = rt for t and for r, and P = 2l + 2w for w.
3. Introduce constraints with a story: "Your phone plan allows 15 GB. You have used 6.2 GB. How many more gigabytes g can you use?" Write 6.2 + g ≤ 15 and discuss which values of g make sense (g cannot be negative).
4. Pairs write one constraint of their own from a school event, such as the 120-seat auditorium.

## Checking for understanding

Cold-call a student to explain each step of a rearrangement in words. Watch for steps done in the wrong order.

## Exit ticket

Solve A = (1/2)bh for h and give one value of b and A for which h is not sensible.
`,
  reading: [
    "One formula, many questions",
    `
A formula is an equation that connects several quantities. The formula for the area of a rectangle is A = lw. If you know the area and the length, you may want to find the width. You can plug numbers in every time, or you can rearrange the formula once so it is ready to use.

To **rearrange** a formula, treat it like any equation. Whatever you do to one side, you do to the other, and you undo operations in the reverse of the usual order. For A = lw, the width is multiplied by l, so divide both sides by l to get w = A / l.

A formula with two steps works the same way. Temperature in Fahrenheit is F = 1.8C + 32. To solve for C, first undo the addition by subtracting 32 from both sides, which gives F - 32 = 1.8C. Then undo the multiplication by dividing by 1.8, giving C = (F - 32) / 1.8. Now a 50 degree day in Columbus becomes C = (50 - 32) / 1.8 = 10 degrees Celsius.

Many real situations come with **constraints**, limits on what is allowed. A constraint can be an equation, such as "the perimeter of the garden is exactly 40 feet", or an inequality, such as "the class can spend at most $200", which is written c ≤ 200. The symbols ≤ and ≥ mean "at most" and "at least".

Say your phone plan has 15 GB and you have used 6.2. If g is the data you still can use, then 6.2 + g ≤ 15, so g ≤ 8.8. But g also cannot be below 0. So the viable values are from 0 to 8.8 gigabytes. A solution is **viable** if it makes sense in the situation. A negative amount of data is not viable even if it solves the algebra.

When you finish, read the answer back in the story. Does the unit match? Is the size sensible? Those two questions catch most mistakes.
`,
  ],
  cards: [
    ["Formula", "An equation that shows how several quantities are related, such as A = lw."],
    ["Rearrange a formula", "Use inverse operations to solve for a different variable."],
    ["Constraint", "A limit on what values are allowed in a situation."],
    ["Inequality", "A statement that compares two quantities with <, >, ≤ or ≥."],
    ["At most", "Means less than or equal to, written ≤."],
    ["At least", "Means greater than or equal to, written ≥."],
    ["Viable solution", "A solution that makes sense in the real situation."],
    ["Solve for a variable", "Isolate that variable on one side of the equation."],
  ],
  closed: [
    [
      "Solve d = rt for t.",
      ["t = d - r", "t = dr", "t = d / r", "t = r / d"],
      "C",
    ],
    [
      "The perimeter of a rectangle is P = 2l + 2w. Solving for w gives which result?",
      ["w = (P - 2l) / 2", "w = P - 2l", "w = P / 2l", "w = 2P - l"],
      "A",
    ],
    [
      "A school van holds at most 12 students. Which inequality describes s, the number of students riding?",
      ["s ≥ 12", "s < 12", "s ≤ 12", "s = 12"],
      "C",
    ],
    [
      "Marcus must score at least 85 on the final to earn a B. Which statement is correct?",
      ["Scores of 84 qualify", "Scores of 85 or higher qualify", "Only a score of 85 qualifies", "Scores below 85 qualify"],
      "B",
    ],
    [
      "A student solves 2x + 5 = 1 and gets x = -2 for the number of tickets sold. Why is this solution not viable?",
      [
        "The algebra is wrong",
        "A number of tickets cannot be negative",
        "The answer should be a fraction",
        "Tickets cost five dollars",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "The formula for the area of a triangle is A = (1/2)bh. Solve it for h, showing each step, and use it to find the height of a triangle with area 30 square inches and base 12 inches.",
      scheme: [
        "Multiplies both sides by 2 to get 2A = bh",
        "Divides both sides by b to get h = 2A / b",
        "Substitutes A = 30 and b = 12 correctly",
        "Gives the height as 5 inches, with the unit",
      ],
      model:
        "Multiply both sides by 2 to clear the fraction: 2A = bh. Divide both sides by b: h = 2A / b. Substitute A = 30 and b = 12: h = 60 / 12 = 5. The height is 5 inches.",
      answers: [
        [
          "full",
          "[[0|A = (1/2)bh so times 2 on both sides is 2A = bh]]. [[1|Divide by b, h = 2A / b]]. [[2|Plug in, h = 2(30) / 12 = 60 / 12]]. [[3|So h = 5 inches.]]",
          "Full marks. Each step is stated and the unit is on the answer.",
        ],
        [
          "full",
          "First get rid of the half. [[0|Multiply both sides by 2: 2A = bh.]] Now h is multiplied by b so [[1|divide both by b and h = 2A/b]]. [[2|2 × 30 = 60 and 60 divided by 12]] [[3|is 5 inches]].",
          "All four marks. Explaining why you multiplied by 2 shows you understand the step.",
        ],
        [
          "partial",
          "[[1|h = 2A / b]]. [[2|2 × 30 / 12 = 5]].",
          "The result is right, but the steps from A = (1/2)bh to h = 2A / b are missing, and the unit is missing. Show the multiplying by 2 and dividing by b.",
          true,
        ],
        [
          "partial",
          "[[0|Multiply by 2, 2A = bh]]. Then h = 2A × b. h = 2 × 30 × 12 = 720 inches.",
          "Good first step. Since h is multiplied by b, you divide by b, you do not multiply. Check: a triangle with area 30 square inches and a base of 12 cannot be 720 inches tall.",
        ],
        [
          "weak",
          "h = A - b - 2 so 30 - 12 - 2 = 16.",
          "The formula uses multiplication, so the inverse operations are multiplying and dividing, not subtraction. Start by multiplying both sides by 2.",
        ],
        [
          "weak",
          "[[2|A = 30 and b = 12]] so the height is 42.",
          "You found the two numbers to use. Adding them does not match the formula. Rearrange for h first, then substitute.",
        ],
      ],
    },
    {
      prompt:
        "The Yellow View auditorium seats 450 people. The school has already sold 312 tickets to the winter concert. Write an inequality for t, the number of additional tickets that can still be sold, solve it, and say which values of t are viable.",
      scheme: [
        "Writes the inequality 312 + t ≤ 450",
        "Solves to get t ≤ 138",
        "Says t cannot be negative, so t is at least 0",
        "States the viable values as 0 up to 138 tickets, whole numbers",
      ],
      model:
        "312 + t ≤ 450. Subtract 312 from both sides to get t ≤ 138. Tickets cannot be negative, and you cannot sell part of a ticket, so t can be any whole number from 0 to 138.",
      answers: [
        [
          "full",
          "[[0|312 + t ≤ 450]] so [[1|t ≤ 138]]. [[2|You cannot sell negative tickets so t has to be 0 or more]] and [[3|it has to be a whole number, so 0 through 138 tickets]].",
          "Full marks. Pointing out whole numbers is the kind of viability check that matters in real problems.",
        ],
        [
          "full",
          "Seats are limited so [[0|312 + t ≤ 450]]. [[1|450 - 312 = 138 so t ≤ 138]]. [[2|But t can't go below 0]] so [[3|the answer is whole numbers from 0 to 138]].",
          "All four marks. A clear and complete answer.",
        ],
        [
          "partial",
          "[[0|312 + t ≤ 450]] and [[1|t ≤ 138]].",
          "The inequality and the solution are right. The question also asks which values make sense. Think about whether t can be negative or a fraction.",
        ],
        [
          "partial",
          "[[0|312 + t ≤ 450]], t ≤ 162, [[2|and t can't be negative]].",
          "The inequality is correct and the note about negatives is good. Check the subtraction: 450 - 312 is 138, not 162.",
        ],
        [
          "weak",
          "312 + 450 = 762 tickets total.",
          "Adding the capacity to the tickets sold does not match the story. The seats are the limit, so the total sold must be at most 450.",
        ],
        [
          "weak",
          "[[0|312 + t ≤ 450]] is wrong, it should be t = 450 because the room is full.",
          "Your inequality is actually right. The room is not necessarily full, since the school may sell fewer tickets than there are seats. That is why we use ≤.",
          true,
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Equations with two variables and justifying each step",
  note: `
## Objectives

Students will be able to:

1. write an equation in two variables to describe a relationship and graph it;
2. explain each step in solving an equation by naming the property that allows it.

## Materials

Graph paper or the shared grid on the board, rulers, colored pencils, a printed solution with missing justifications.

## Starter (6 minutes)

Pose: "A food truck sells tacos for $3 each and drinks for $2 each. Today it earned $60. What could it have sold?" Collect three pairs of numbers from students, such as 20 tacos and 0 drinks, 10 and 15, 12 and 12, and record them in a table.

## Main activity

1. Write 3t + 2d = 60 and show that each pair in the table makes it true. Plot the pairs and notice they fall on a line.
2. Solve for d to get d = 30 - 1.5t and graph by intercepts: when t = 0, d = 30; when d = 0, t = 20.
3. Hand out a solved equation with the reasons missing. Pairs fill in the property for each line: addition property of equality, multiplication property, distributive property.
4. Gallery walk: groups swap papers and check one another's reasons.

## Checking for understanding

Ask a pair to defend one justification to the class. Listen for "because we did the same thing to both sides" with the specific operation.

## Exit ticket

Write an equation in two variables for "I have $20 to spend on notebooks at $2 and pens at $1" and give two points on its graph.
`,
  reading: [
    "Two unknowns on one line",
    `
So far each equation had one variable. Many situations have two quantities that change together. A food truck earns $60 selling tacos at $3 and drinks at $2. If t is the number of tacos and d is the number of drinks, then 3t + 2d = 60.

This equation has many solutions, because many pairs of numbers work. Each solution is an ordered pair (t, d). The pair (20, 0) works because 3(20) + 2(0) = 60. So does (10, 15) because 30 + 30 = 60. If you plot every solution on a coordinate plane, they all lie on a straight line. In fact, **the graph of an equation is the set of all of its solutions**. A point is on the line exactly when its coordinates make the equation true.

An easy way to graph is to find the **intercepts**. Set t = 0 and solve for d: 2d = 60, so d = 30. That is the point (0, 30). Set d = 0 and solve for t: 3t = 60, so t = 20, the point (20, 0). Draw the line through them. Because tacos and drinks cannot be negative, only the part of the line in the first quadrant makes sense for this story.

When you solve an equation, every step should be something you can defend. Here is a short example with reasons.

- 2(x + 3) = 14. Given.
- 2x + 6 = 14. Distributive property.
- 2x = 8. Subtract 6 from both sides (the subtraction property of equality).
- x = 4. Divide both sides by 2 (the division property of equality).

The big idea is that if two quantities are equal and you do the same thing to both, they stay equal. If you can say which property you used, you are not guessing. Each line is a true statement that follows logically from the one before it, which is why the last line is the solution of the first.
`,
  ],
  cards: [
    ["Ordered pair", "Two numbers (x, y) that name a point on the coordinate plane."],
    ["Solution of an equation in two variables", "An ordered pair that makes the equation true."],
    ["Intercept", "A point where a graph crosses an axis."],
    ["x-intercept", "The point where y = 0."],
    ["y-intercept", "The point where x = 0."],
    ["Distributive property", "a(b + c) = ab + ac."],
    ["Properties of equality", "You can add, subtract, multiply or divide both sides of an equation by the same number (not zero for division)."],
    ["Justify", "Give the reason that makes a step in a solution valid."],
  ],
  closed: [
    [
      "Which ordered pair is a solution of 2x + y = 9?",
      ["(2, 4)", "(3, 3)", "(4, 1)", "(5, 0)"],
      "C",
    ],
    [
      "What is the y-intercept of the graph of 4x + 2y = 12?",
      ["(0, 3)", "(0, 6)", "(3, 0)", "(0, 12)"],
      "B",
    ],
    [
      "In solving 3(x - 2) = 12, the first step is 3x - 6 = 12. Which property justifies it?",
      ["Addition property of equality", "Distributive property", "Division property of equality", "Commutative property"],
      "B",
    ],
    [
      "A student writes 5x = 20, so x = 4. What reason should go with the second step?",
      [
        "Subtract 5 from both sides",
        "Divide both sides by 5",
        "Multiply both sides by 5",
        "Add 20 to both sides",
      ],
      "B",
    ],
    [
      "A graph of 3t + 2d = 60 is drawn for a food truck. Which part of the line makes sense in the story?",
      [
        "The whole line",
        "Only the part where t and d are both negative",
        "Only the part where t and d are zero or positive",
        "Only the point (0, 0)",
      ],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Lena has $24 to spend at the school store on notebooks that cost $3 each and pens that cost $1.50 each. Write an equation in two variables, find its x- and y-intercepts, and say what each intercept means.",
      scheme: [
        "Defines both variables and writes 3n + 1.5p = 24",
        "Finds the intercept (8, 0)",
        "Finds the intercept (0, 16)",
        "Explains each intercept: 8 notebooks and no pens, or 16 pens and no notebooks",
      ],
      model:
        "Let n be the number of notebooks and p the number of pens. Then 3n + 1.5p = 24. If p = 0, then 3n = 24, so n = 8, the point (8, 0): 8 notebooks and no pens. If n = 0, then 1.5p = 24, so p = 16, the point (0, 16): 16 pens and no notebooks.",
      answers: [
        [
          "full",
          "[[0|n = notebooks, p = pens, 3n + 1.5p = 24]]. [[1|If p = 0, 3n = 24, n = 8 so (8, 0).]] [[2|If n = 0, 1.5p = 24, p = 16 so (0, 16).]] [[3|(8, 0) means she could buy 8 notebooks and no pens and (0, 16) means 16 pens and no notebooks.]]",
          "Full marks. You named what each intercept means in the story.",
        ],
        [
          "full",
          "Let n be notebooks and p be pens. [[0|The equation is 3n + 1.5p = 24.]] [[1|When she buys no pens it is 3n = 24 so n = 8, that is (8, 0).]] [[2|When she buys no notebooks p = 24/1.5 = 16 so (0, 16).]] [[3|These are the most of each thing she can buy if she buys only that one.]]",
          "All four marks. Your wording \"the most of each\" is a good interpretation.",
        ],
        [
          "partial",
          "[[0|3n + 1.5p = 24]]. (8, 0) and (0, 16).",
          "The equation and both points are right, but the question also asks what they mean in the story. Say what 8 and 16 stand for.",
        ],
        [
          "partial",
          "[[0|n is notebooks and p is pens, 3n + 1.5p = 24]]. [[1|(8, 0)]]. (0, 8) is the other one.",
          "Good equation and first intercept. For the second, divide 24 by 1.5, not by 3, since 1.5 is the price of a pen. That gives 16.",
        ],
        [
          "weak",
          "3 + 1.5 = 4.5 and 24 / 4.5 = 5.3 so she buys 5.3 of each.",
          "The equation needs the prices multiplied by the number bought, 3n and 1.5p. Combining the prices into 4.5 treats a pen and a notebook as one item.",
        ],
        [
          "weak",
          "[[0|3n + 1.5p = 24]] and the intercepts are 3 and 1.5.",
          "Your equation is correct. The intercepts are points where the line crosses an axis. Set one variable to zero and solve for the other.",
        ],
      ],
    },
    {
      prompt:
        "Solve 4(x - 1) + 3 = 19 and write the reason for every step.",
      scheme: [
        "Distributes to get 4x - 4 + 3 = 19 and names the distributive property",
        "Combines like terms to get 4x - 1 = 19",
        "Adds 1 to both sides to get 4x = 20 and names the addition property of equality",
        "Divides both sides by 4 to get x = 5 and names the division property of equality",
      ],
      model:
        "4(x - 1) + 3 = 19. Distribute: 4x - 4 + 3 = 19 (distributive property). Combine like terms: 4x - 1 = 19. Add 1 to both sides: 4x = 20 (addition property of equality). Divide both sides by 4: x = 5 (division property of equality).",
      answers: [
        [
          "full",
          "[[0|4x - 4 + 3 = 19, I used the distributive property]]. [[1|4x - 1 = 19, I combined -4 and 3]]. [[2|4x = 20, I added 1 to both sides, addition property of equality]]. [[3|x = 5, I divided both sides by 4, division property]].",
          "Full marks. Each line has its reason, and the reasons are the right ones.",
        ],
        [
          "full",
          "Step 1: [[0|multiply 4 through the parentheses (distributive property) and get 4x - 4 + 3 = 19]]. Step 2: [[1|-4 + 3 = -1 so 4x - 1 = 19]]. Step 3: [[2|add 1 to both sides (addition property of equality) 4x = 20]]. Step 4: [[3|divide both sides by 4 (division property of equality) x = 5]].",
          "All four marks. Writing the property next to the step is exactly what the question asks.",
        ],
        [
          "partial",
          "[[0|4x - 4 + 3 = 19 distribute]], 4x - 1 = 19 combine, 4x = 20 add 1, x = 5.",
          "The steps and the answer are right, but only the first one has a reason. Name the property for adding 1 and dividing by 4 as well.",
          true,
        ],
        [
          "partial",
          "[[0|4x - 4 + 3 = 19 by the distributive property]]. 4x + 1 = 19. [[3|4x = 18 so x = 4.5 by division.]]",
          "Distributing was correct. Combining -4 and 3 gives -1, not +1, which changes everything after. Recheck that step.",
        ],
        [
          "weak",
          "4x - 1 + 3 = 19 so 4x = 17 and x = 4.25, I just did it.",
          "The 4 multiplies both terms in the parentheses, so -1 becomes -4. Also, each step should come with a reason, not just be done.",
        ],
        [
          "weak",
          "x - 1 + 3 = 19 - 4 = 15 so x = 13.",
          "Subtracting 4 from the right side does not undo anything in the expression. The 4 is multiplied by the parentheses, so start by distributing it.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Solving linear equations and inequalities, and what a graph means",
  note: `
## Objectives

Students will be able to:

1. solve linear equations and inequalities with variables on both sides;
2. explain that the graph of an equation is the set of all its solutions.

## Materials

A number line on the floor with tape, sticky notes, mini whiteboards.

## Starter (6 minutes)

Pose: "Two phone plans. Plan A is $20 plus $0.10 per text. Plan B is $0.20 per text with no base charge. When do they cost the same?" Have students estimate.

## Main activity

1. Write 20 + 0.10x = 0.20x and solve with variables on both sides: subtract 0.10x, then divide. Compare the answer, x = 200, to the estimates.
2. Introduce inequalities. Ask: "For how many texts is Plan A cheaper?" and solve 20 + 0.10x < 0.20x. Show the effect of dividing by a negative number with a short example, such as -2x > 6.
3. On the floor number line, students stand on solutions of x ≥ 3, then place a sticky note for the boundary and mark it open or closed.
4. Link the graph: a point is on the graph of y = 2x + 1 exactly when its coordinates make the equation true. Test three points together.

## Checking for understanding

Whiteboards: "Is (2, 5) on the graph of y = 2x + 1? How do you know?"

## Exit ticket

Solve 5x - 7 ≤ 3x + 9 and graph the solution on a number line.
`,
  reading: [
    "Equations, inequalities and the line",
    `
Sometimes the variable is on both sides of an equation. The idea is the same: get all the variable terms on one side and the constants on the other. To solve 5x + 3 = 2x + 15, subtract 2x from both sides to get 3x + 3 = 15, subtract 3 from both sides to get 3x = 12, and divide by 3 to get x = 4. Check by substituting: 5(4) + 3 = 23 and 2(4) + 15 = 23.

An **inequality** compares two quantities. Solving one is nearly the same as solving an equation. The solution is usually a whole set of values, not just one. If 3x + 3 < 15, then 3x < 12 and x < 4. Every number below 4 is a solution, including 3.9 and -100. On a number line we draw an open circle at 4, because 4 itself is not a solution, and shade to the left. For ≤ or ≥ we use a closed circle because the boundary is included.

There is one new rule. If you multiply or divide both sides of an inequality by a **negative** number, the inequality sign flips. Compare 2 < 5 with -2 and -5: multiplying both sides by -1 gives -2 and -5, and now -2 > -5. The order reverses. So to solve -2x > 6, divide by -2 and flip the sign: x < -3.

Now connect solutions to a graph. The graph of y = 2x + 1 is the line through all points (x, y) where y equals 2x + 1. Take the point (2, 5). Substitute: is 5 = 2(2) + 1? Yes, so it is on the line. Now (3, 6): is 6 = 2(3) + 1 = 7? No, so it is not on the line. This is the key idea: the line is not just a picture. It is the set of all solutions of the equation. Every point on it works, and every point off it does not.
`,
  ],
  cards: [
    ["Variables on both sides", "An equation like 5x + 3 = 2x + 15; collect the variable terms on one side first."],
    ["Inequality", "A comparison of two quantities using <, >, ≤ or ≥."],
    ["Open circle", "Marks a boundary that is not a solution, used for < and >."],
    ["Closed circle", "Marks a boundary that is a solution, used for ≤ and ≥."],
    ["Flip the inequality", "Reverse the sign when you multiply or divide both sides by a negative number."],
    ["Solution set", "All values of the variable that make an equation or inequality true."],
    ["Graph of an equation", "The set of all points whose coordinates make the equation true."],
    ["Check a solution", "Substitute it back into the original equation."],
  ],
  closed: [
    [
      "Solve 6x - 4 = 2x + 12.",
      ["x = 2", "x = 4", "x = 8", "x = 16"],
      "B",
    ],
    [
      "Solve -3x > 12.",
      ["x > -4", "x < -4", "x > 4", "x < 4"],
      "B",
    ],
    [
      "On a number line, how is the solution of x ≥ 3 drawn?",
      [
        "An open circle at 3, shaded to the right",
        "A closed circle at 3, shaded to the right",
        "A closed circle at 3, shaded to the left",
        "An open circle at 3, shaded to the left",
      ],
      "B",
    ],
    [
      "Which point is on the graph of y = 3x - 2?",
      ["(1, 2)", "(2, 4)", "(0, 2)", "(3, 6)"],
      "B",
    ],
    [
      "Which statement about the graph of an equation is correct?",
      [
        "It is a picture with no link to the solutions",
        "Every point on it is a solution of the equation",
        "Only the points with whole-number coordinates are solutions",
        "It shows only the x-intercept",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A streaming service charges $12 a month. Another charges $4 a month plus $2 for each movie rental. For how many rentals r is the first service the cheaper choice? Write and solve an inequality.",
      scheme: [
        "Writes the inequality 12 < 4 + 2r",
        "Solves it correctly to get r > 4",
        "Says r must be more than 4 rentals, and interprets it",
        "Notes the boundary (4 rentals) costs the same, so it is not included",
      ],
      model:
        "The first service is cheaper when its cost is less than the second: 12 < 4 + 2r. Subtract 4 from both sides: 8 < 2r. Divide by 2: 4 < r, so r > 4. If someone rents more than 4 movies a month, the first service is cheaper. At exactly 4 rentals both cost $12, so 4 is not included.",
      answers: [
        [
          "full",
          "[[0|12 < 4 + 2r]]. [[1|8 < 2r so r > 4]]. [[2|The first one is cheaper if you rent more than 4 movies.]] [[3|At exactly 4 they both cost $12, so 4 does not count.]]",
          "Full marks. You interpreted the boundary, which is what separates < from ≤.",
        ],
        [
          "full",
          "I want the first to cost less so [[0|12 < 4 + 2r]]. [[1|Subtract 4, 8 < 2r, divide by 2, 4 < r.]] [[2|So if r is more than 4 rentals the $12 plan wins.]] [[3|At 4 it is a tie, 4 + 8 = 12, so not included.]]",
          "All four marks. The check that 4 gives a tie is very convincing.",
        ],
        [
          "partial",
          "[[0|12 < 4 + 2r]]. [[1|r > 4]].",
          "The inequality and the solution are right. Add a sentence saying what r > 4 means for the customer and whether 4 is included.",
        ],
        [
          "partial",
          "12 > 4 + 2r so 8 > 2r and r < 4. [[2|The first service is cheaper when you rent fewer than 4 movies.]]",
          "Check the direction. The first service is cheaper when 12 is less than the other cost, so use <. Your interpretation matches your inequality but not the story.",
        ],
        [
          "weak",
          "12 = 4 + 2r so r = 4 and that is the answer.",
          "Setting them equal finds where the plans cost the same, which is useful, but the question asks when one is cheaper, so you need an inequality sign.",
        ],
        [
          "weak",
          "12 + 4 + 2 = 18 so r = 18.",
          "The numbers need to be placed with the variable: the rental cost is 2 for each rental, written 2r. Compare the two total costs, then solve.",
        ],
      ],
    },
    {
      prompt:
        "A student says the point (4, 9) is on the graph of y = 2x + 1 because 4 and 9 are both positive. Is the student's reason correct? Is the point on the graph? Explain how you know.",
      scheme: [
        "Says the reason is not correct, since being positive does not decide it",
        "Substitutes x = 4 into 2x + 1 to get 9",
        "Concludes (4, 9) is on the graph, because the coordinates make the equation true",
        "Says that the graph is the set of all solutions of the equation",
      ],
      model:
        "The reason is not correct, because a point is on the graph only if its coordinates make the equation true. Substitute x = 4: 2(4) + 1 = 9, which equals y. So (4, 9) is on the graph, but for the right reason. The graph is the set of all solutions of y = 2x + 1.",
      answers: [
        [
          "full",
          "[[0|No, the student's reason is wrong because lots of positive points are not on the line]]. [[1|If x = 4, 2(4) + 1 = 9]], [[2|so (4, 9) is on the graph because it makes the equation true]]. [[3|The graph is every point that is a solution.]]",
          "Full marks. You separated the wrong reason from the right conclusion.",
        ],
        [
          "full",
          "[[0|Positive isn't a reason. Plenty of positive points like (4, 1) aren't on it.]] [[1|I put in x = 4 and got 2 × 4 + 1 = 9, which is y.]] [[2|So yes, (4, 9) is on the graph]], [[3|because the line is all the solutions of the equation.]]",
          "All four marks. The counterexample (4, 1) makes your argument strong.",
        ],
        [
          "partial",
          "[[1|2(4) + 1 = 9]] so [[2|(4, 9) is on the graph]]. The reason is okay too.",
          "You did the check and reached the right conclusion. The student's reason is not correct, though: a point with positive coordinates is not always on the line. Say why.",
          true,
        ],
        [
          "partial",
          "[[0|The reason is not right because it has to fit the equation]]. I think it is not on the graph.",
          "Good on the reason. But try the substitution: 2(4) + 1 = 9, so the point is on the graph. Do not decide without testing.",
        ],
        [
          "weak",
          "Yes the student is right because 4 and 9 are positive so it is on the line in the first quadrant.",
          "Being in the first quadrant is not enough. The line passes through many points, and only the ones whose coordinates make the equation true are on it.",
        ],
        [
          "weak",
          "[[3|The graph is the line]]. The point is on it since the line goes up.",
          "The graph is the set of solutions, and you can check any point by substitution rather than by looking at the direction of the line.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Systems of linear equations and linear inequalities",
  note: `
## Objectives

Students will be able to:

1. solve a system of two linear equations by graphing and by substitution;
2. solve a system by elimination and explain why it works;
3. graph a linear inequality in two variables and a system of them.

## Materials

Graph paper, rulers, two colors of pencil, mini whiteboards.

## Starter (6 minutes)

"Two gyms. Gym A is $20 to join and $30 a month. Gym B is no joining fee and $35 a month. When do they cost the same?" Ask students to make a quick table for months 1 to 6.

## Main activity

1. Write both equations (y = 30x + 20 and y = 35x) and graph them together. The intersection is the solution, (4, 140): after 4 months each has cost $140.
2. Solve the same system by substitution: replace y in the first equation, 35x = 30x + 20.
3. Present elimination with 2x + 3y = 12 and 2x - y = 4. Subtract the equations to remove x. Ask why subtracting equals from equals is allowed.
4. Graph y > x + 1 by drawing the boundary dashed, testing (0, 0), and shading the correct side. Then a second inequality and shade the overlap.

## Checking for understanding

Three-finger vote on which method (graph, substitution or elimination) is the best choice for a given system, and why.

## Exit ticket

Solve x + y = 10 and x - y = 2 by any method.
`,
  reading: [
    "When two lines meet",
    `
A **system of linear equations** is two or more equations that use the same variables. A solution is an ordered pair that makes every equation in the system true. On a graph it is the point where the lines cross.

Consider two gyms. Gym A charges $20 to join and $30 per month. Gym B has no joining fee and charges $35 per month. After x months the total cost is y = 30x + 20 at Gym A and y = 35x at Gym B. Graphing both lines, they cross at (4, 140). After four months you have spent $140 at either gym, and after that Gym A is the cheaper gym.

**Graphing** shows the picture but can only be as accurate as your drawing. **Substitution** is exact. Because both equations say y equals something, set the somethings equal: 35x = 30x + 20. Subtract 30x to get 5x = 20, so x = 4, and then y = 35(4) = 140.

**Elimination** adds or subtracts the equations to remove a variable. Take 2x + 3y = 12 and 2x - y = 4. Subtract the second from the first: 4y = 8, so y = 2. Put this into 2x - y = 4 to get 2x - 2 = 4, x = 3. The solution is (3, 2). Why is this allowed? Because if two equations are both true, the differences of their left sides and of their right sides are equal too. You are doing the same thing to both sides of a true equation.

A linear **inequality** in two variables, such as y > x + 1, has a whole region of solutions. Graph the boundary line y = x + 1. Draw it dashed for > or < because points on the line do not satisfy it, and solid for ≥ or ≤. Then test a point not on the line, like (0, 0): is 0 > 0 + 1? No, so shade the side that does not contain (0, 0). A system of inequalities is solved by the overlap of the shaded regions.
`,
  ],
  cards: [
    ["System of equations", "Two or more equations with the same variables, solved together."],
    ["Solution of a system", "An ordered pair that makes every equation true; the point where the graphs cross."],
    ["Substitution", "Replace one variable with an equal expression to get an equation in one variable."],
    ["Elimination", "Add or subtract equations so that one variable cancels."],
    ["Boundary line", "The line that separates the solutions of an inequality from the rest."],
    ["Dashed line", "Used for < and >, where points on the line are not solutions."],
    ["Solid line", "Used for ≤ and ≥, where points on the line are solutions."],
    ["Test point", "A point not on the boundary used to decide which side to shade."],
  ],
  closed: [
    [
      "Which ordered pair is the solution of x + y = 7 and x - y = 1?",
      ["(3, 4)", "(4, 3)", "(5, 2)", "(6, 1)"],
      "B",
    ],
    [
      "Two lines are drawn and cross at (2, 5). What does this tell you?",
      [
        "x = 5 and y = 2 solve both equations",
        "x = 2 and y = 5 solve both equations",
        "The lines have no solution",
        "The lines are the same line",
      ],
      "B",
    ],
    [
      "To solve y = 2x and x + y = 12 by substitution, which equation do you get in one variable?",
      ["x + 2x = 12", "2x = 12", "x + y = 2x", "y = 12 - 2"],
      "A",
    ],
    [
      "For the graph of y ≤ 3x - 1, which boundary line is correct?",
      ["Dashed", "Solid", "Dotted at the corners only", "No boundary is drawn"],
      "B",
    ],
    [
      "A system has no solution. What does the graph look like?",
      [
        "The lines cross once",
        "The lines are parallel",
        "The lines are the same",
        "One line is vertical",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A theater sells adult tickets for $9 and student tickets for $5. One night it sold 80 tickets and took in $520. Let a be the number of adult tickets and s the number of student tickets. Write a system and solve it.",
      scheme: [
        "Writes a + s = 80",
        "Writes 9a + 5s = 520",
        "Solves the system correctly by substitution or elimination",
        "States 30 adult tickets and 50 student tickets, and checks the total",
      ],
      model:
        "a + s = 80 and 9a + 5s = 520. From the first equation, s = 80 - a. Substitute: 9a + 5(80 - a) = 520, so 9a + 400 - 5a = 520, 4a = 120, a = 30. Then s = 50. Check: 9(30) + 5(50) = 270 + 250 = 520. The theater sold 30 adult tickets and 50 student tickets.",
      answers: [
        [
          "full",
          "[[0|a + s = 80]] [[1|9a + 5s = 520]]. s = 80 - a so 9a + 5(80 - a) = 520, 4a + 400 = 520, [[2|4a = 120, a = 30]]. s = 50. [[3|30 adult and 50 student tickets. 9(30) + 5(50) = 270 + 250 = 520, it checks.]]",
          "Full marks. Checking in the original total shows the answer is reasonable.",
        ],
        [
          "full",
          "[[0|Total tickets: a + s = 80.]] [[1|Money: 9a + 5s = 520.]] Multiply the first by 5, 5a + 5s = 400. Subtract from the second. [[2|4a = 120 so a = 30 and s = 50.]] [[3|So 30 adult and 50 student, and 270 + 250 = 520.]]",
          "All four marks. Elimination was an efficient choice here.",
        ],
        [
          "partial",
          "[[0|a + s = 80]] and [[1|9a + 5s = 520]]. I think a = 40 and s = 40.",
          "Both equations are right. Check your guess: 9(40) + 5(40) = 560, not 520. Solve by substitution or elimination instead of guessing.",
        ],
        [
          "partial",
          "[[0|a + s = 80]]. [[1|9a + 5s = 520]]. [[2|a = 30]]. The answer is 30.",
          "The system and the value of a are right. Find s too, and say what the numbers mean: 30 adult tickets and 50 student tickets.",
          true,
        ],
        [
          "weak",
          "9 + 5 = 14 and 520 / 14 = 37 so 37 tickets of each.",
          "Adding the prices treats each ticket as costing $14. You need two unknowns, adult and student tickets, and two equations that use the total and the money.",
        ],
        [
          "weak",
          "[[0|a + s = 80]] so a = 80 and s = 0.",
          "The first equation is right. One equation with two unknowns has many solutions, so you need the money equation too to find the pair that fits both.",
        ],
      ],
    },
    {
      prompt:
        "Graph the inequality y > 2x - 3. Explain how you decide whether the line is solid or dashed and which side to shade.",
      scheme: [
        "Draws the boundary y = 2x - 3 correctly (slope 2, y-intercept -3)",
        "Says the line is dashed because the inequality is strict, > rather than ≥",
        "Tests a point not on the line, such as (0, 0)",
        "Shades the side that makes the test true, here the side containing (0, 0), above the line",
      ],
      model:
        "Graph the boundary y = 2x - 3 with y-intercept -3 and slope 2. The line is dashed because the inequality is >, so points on the line are not solutions. Test (0, 0): 0 > 2(0) - 3 is 0 > -3, which is true, so shade the side containing (0, 0), the region above the line.",
      answers: [
        [
          "full",
          "[[0|I graph y = 2x - 3: start at -3 on the y-axis and go up 2 over 1.]] [[1|It is dashed because it is > and not ≥, so points on the line don't count.]] [[2|Test (0, 0).]] [[3|0 > -3 is true so I shade the side with (0, 0), above the line.]]",
          "Full marks. All the steps are there and in a sensible order.",
        ],
        [
          "full",
          "[[0|The boundary is y = 2x - 3 with slope 2 and y-intercept -3.]] [[1|Because it is just \"greater than\" the line is dashed.]] [[2|I picked (0, 0) because it is not on the line]] and [[3|0 > 2(0) - 3 is true, so shade above the line where the origin is.]]",
          "All four marks. Choosing (0, 0) because it is not on the line is the right reasoning.",
        ],
        [
          "partial",
          "[[0|Slope 2, y-intercept -3]]. [[1|Dashed because it is >.]] Shade above.",
          "The line and the dashed choice are right. Say how you know to shade above: test a point such as (0, 0) and see whether it is true.",
        ],
        [
          "partial",
          "[[0|y = 2x - 3 is the line.]] It's solid. [[2|I test (0, 0).]] [[3|0 > -3 is true so shade the origin's side.]]",
          "Good line, and a good test. With a strict inequality the boundary is dashed, because points on the line are not solutions.",
          true,
        ],
        [
          "weak",
          "Make a table and plot some points. Then shade whatever looks right.",
          "Plotting is a start, but the shading needs a test: substitute a point not on the line into the inequality and shade the side where it is true.",
        ],
        [
          "weak",
          "[[1|It is dashed.]] The line starts at 2 and goes down 3.",
          "Dashed is right. The y-intercept is -3 and the slope is 2, so the line starts at -3 on the y-axis and rises 2 for each 1 across.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "What is a function? Notation and evaluating",
  note: `
## Objectives

Students will be able to:

1. explain what makes a relation a function and use function notation;
2. evaluate a function for given inputs and interpret the result in context.

## Materials

Index cards labeled with names and birthdays, a "function machine" box, mini whiteboards.

## Starter (6 minutes)

Hold up the function machine box. "Put in a number, a rule inside, a number comes out." Take three inputs from the class and write the outputs on the board without revealing the rule. Ask students to guess the rule.

## Main activity

1. Define relation, domain, range. Show two mappings: one where each input has exactly one output, and one where an input has two. Ask which one is a function and why.
2. Use the vertical line test on three graphs. Link it back to "each input has exactly one output".
3. Introduce f(x) notation with f(x) = 3x + 2 and f(4). Emphasize that f(4) means "the output when the input is 4".
4. Contextual practice: C(g) = 3.5g, the cost of g gallons of gas. Compute C(10) and interpret it.

## Checking for understanding

Cold-call: "What does f(4) = 14 tell us about the function?" Look for "when the input is 4 the output is 14".

## Exit ticket

If h(t) = 5 + 2t gives a plant's height in inches after t weeks, find h(3) and explain what it means.
`,
  reading: [
    "Machines that give one answer",
    `
A **relation** is any rule that connects inputs to outputs. The set of allowed inputs is the **domain** and the set of outputs is the **range**. A **function** is a relation with one very important rule: each input has exactly one output.

Think of a vending machine. If you press B4, you always get the same snack. B4 is the input and the snack is the output. A machine that sometimes gave you chips and sometimes cookies for B4 would not be a function. Compare two relations. Students and their birthdays is a function, because each student has exactly one birthday. But birthdays and students is not a function, because one birthday can belong to several students.

On a graph you can use the **vertical line test**. If any vertical line crosses the graph more than once, then one input (an x value) has more than one output (y value), so it is not a function. A circle fails the test. A line that is not vertical passes it.

Mathematicians write functions with **function notation**. In f(x) = 3x + 2, the name of the function is f, the input is x, and f(x) is the output. This is read "f of x". It is not f times x. To evaluate f(4), replace x with 4: f(4) = 3(4) + 2 = 14. That tells you the output is 14 when the input is 4. The point (4, 14) is on the graph of f.

Function notation is useful in real situations. If gas costs $3.50 a gallon, the cost of g gallons is C(g) = 3.50g. Then C(10) = 35 means that 10 gallons cost $35. The domain here is g ≥ 0, because you cannot buy a negative number of gallons, and the answer must always be read back with its unit.
`,
  ],
  cards: [
    ["Relation", "A rule that connects inputs to outputs."],
    ["Function", "A relation in which each input has exactly one output."],
    ["Domain", "The set of all possible inputs."],
    ["Range", "The set of all possible outputs."],
    ["Vertical line test", "A graph is a function if no vertical line crosses it more than once."],
    ["Function notation", "Writing f(x) for the output of function f at input x."],
    ["f(4)", "The output of f when the input is 4."],
    ["Evaluate a function", "Replace the input variable with a number and simplify."],
  ],
  closed: [
    [
      "Which set of ordered pairs is NOT a function?",
      ["{(1, 2), (2, 3), (3, 4)}", "{(1, 5), (2, 5), (3, 5)}", "{(1, 2), (1, 3), (2, 4)}", "{(0, 0), (1, 1), (2, 4)}"],
      "C",
    ],
    [
      "If f(x) = 2x - 5, what is f(6)?",
      ["7", "12", "1", "17"],
      "A",
    ],
    [
      "A graph fails the vertical line test. What does that tell you?",
      [
        "It is a function",
        "Some input has more than one output",
        "It has no y-intercept",
        "It is a straight line",
      ],
      "B",
    ],
    [
      "A pizza costs P(n) = 2.5n + 8 dollars with n toppings. What does P(3) = 15.5 mean?",
      [
        "Three pizzas cost $15.50",
        "A pizza with 3 toppings costs $15.50",
        "A pizza with 15.5 toppings costs $3",
        "The pizza has 3 slices",
      ],
      "B",
    ],
    [
      "The function A(r) = 3.14r² gives the area of a circle. Which input makes sense?",
      ["r = -4 inches", "r = -1 inch", "r = 6 inches", "r = -0.5 inches"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A taxi fare in dollars is given by F(m) = 2.25m + 3, where m is the number of miles. Find F(8) and F(0), and explain what each answer tells you about the fare.",
      scheme: [
        "Substitutes m = 8 correctly",
        "Gets F(8) = 21 and says the fare for 8 miles is $21",
        "Gets F(0) = 3",
        "Says $3 is the starting charge before any miles are traveled",
      ],
      model:
        "F(8) = 2.25(8) + 3 = 18 + 3 = 21, so an 8-mile ride costs $21. F(0) = 2.25(0) + 3 = 3, so the fare for zero miles is $3, which is the starting charge.",
      answers: [
        [
          "full",
          "[[0|F(8) = 2.25 × 8 + 3]] = 18 + 3 = 21. [[1|So an 8 mile ride costs $21.]] [[2|F(0) = 3]] and [[3|that is the fixed starting charge you pay before you go anywhere.]]",
          "Full marks. Reading F(0) as the starting charge is the key idea.",
        ],
        [
          "full",
          "[[0|Put 8 in for m: 2.25(8) + 3]], [[1|that is 21, so the fare for 8 miles is $21.]] [[2|Put in 0: 2.25(0) + 3 = 3.]] [[3|So $3 is what you pay just for getting in the taxi.]]",
          "All four marks. Your sentence about getting in the taxi is a clear interpretation.",
        ],
        [
          "partial",
          "[[0|2.25(8) + 3]] = 21 and F(0) = 3.",
          "The values are right. The question asks what each tells you about the fare. Say that $21 is the cost of 8 miles and $3 is the starting charge.",
        ],
        [
          "partial",
          "F(8) = 2.25 + 8 + 3 = 13.25. [[2|F(0) = 3]] [[3|which is the starting fee.]]",
          "F(0) and its meaning are right. For F(8) the 2.25 multiplies m, so you need 2.25 times 8, which is 18, then add 3.",
        ],
        [
          "weak",
          "F(8) is F times 8, so it is F8. F(0) is zero.",
          "F(8) does not mean F times 8. It means the output of the function when the input is 8. Replace m with 8 in the rule.",
        ],
        [
          "weak",
          "[[0|2.25(8) + 3]] = 5.25 × 8 = 42.",
          "Substituting 8 for m was the right start. Multiply first, then add: 2.25 × 8 = 18, and 18 + 3 = 21.",
        ],
      ],
    },
    {
      prompt:
        "Is the relation that takes a student's ID number to their homeroom a function? Is the relation that takes a homeroom to the student ID numbers in it a function? Explain each answer.",
      scheme: [
        "Says ID to homeroom is a function",
        "Explains that each ID belongs to exactly one homeroom",
        "Says homeroom to IDs is not a function",
        "Explains that one homeroom has many students, so one input has several outputs",
      ],
      model:
        "ID number to homeroom is a function, because each student has one ID and is in exactly one homeroom. Homeroom to student IDs is not a function, because a homeroom contains many students, so one input (the homeroom) has many outputs.",
      answers: [
        [
          "full",
          "[[0|ID to homeroom is a function]] [[1|because every ID goes to just one homeroom.]] [[2|Homeroom to IDs isn't a function]] [[3|because 9A has 15 students, so one input has 15 outputs.]]",
          "Full marks. The count of 15 outputs makes your reason concrete.",
        ],
        [
          "full",
          "[[1|A student can only be in one homeroom so if you put in an ID you get one homeroom out,]] [[0|so that one is a function]]. [[3|If you put in 10B you get lots of ID numbers out,]] [[2|so that one is not a function.]]",
          "All four marks. Explaining with the inputs and outputs shows you have the definition.",
        ],
        [
          "partial",
          "[[0|The first one is a function.]] [[2|The second one is not.]]",
          "Both verdicts are right. Each needs a reason that mentions inputs and outputs: a function gives exactly one output for each input.",
        ],
        [
          "partial",
          "[[0|ID to homeroom is a function.]] [[1|Each ID goes to one homeroom.]] The second one is also a function because homerooms have students.",
          "The first answer is well explained. For the second, a homeroom has many students, so one input would have many outputs, which a function cannot have.",
        ],
        [
          "weak",
          "Both are functions because they connect two things.",
          "A relation connects two things, but a function must give exactly one output for each input. Check each direction for inputs that have more than one output.",
        ],
        [
          "weak",
          "Neither is a function because students are different.",
          "Students being different is not the test. Ask: if I pick one input, do I get only one output? An ID goes to one homeroom, so check that case again.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Reading graphs of functions and rates of change",
  note: `
## Objectives

Students will be able to:

1. read a graph or table to describe where a function rises, falls and crosses the axes;
2. calculate and interpret an average rate of change over an interval.

## Materials

Printed graph of the temperature in Columbus over a 24-hour day, highlighters, rulers.

## Starter (7 minutes)

Display a graph of the temperature in Columbus from midnight to midnight on a fall day (low near 45°F at 6 a.m., high near 68°F at 3 p.m.). Ask: "When is it warming up? When is it cooling off? What is the temperature at noon?" Collect observations.

## Main activity

1. Name the key features: intercepts, intervals where the graph increases and decreases, maximum and minimum. Students mark them on the temperature graph with highlighters.
2. Introduce the average rate of change as the change in output over the change in input: (f(b) - f(a)) / (b - a). Find it from 6 a.m. to 3 p.m.: (68 - 45) / 9, about 2.6 degrees per hour.
3. Compare with the slope of a line. For a line, the rate of change is the same everywhere. For other graphs it changes, which is why we say average.
4. Pairs work on a table of values for a bike rider's distance, find two rates over different intervals, and interpret them with units.

## Checking for understanding

"What are the units of your answer, and what do they mean?" Ask three students.

## Exit ticket

A graph shows d(t) = distance in miles after t hours. d(1) = 12 and d(3) = 30. Find the average rate of change from t = 1 to t = 3 and interpret it.
`,
  reading: [
    "Telling the story of a graph",
    `
A graph can tell a story if you know how to read it. Picture the temperature in Columbus over one day. The graph starts around 45 degrees at midnight, falls a little until sunrise, climbs to about 68 degrees by mid-afternoon, then falls again.

Mathematicians describe this with a few **key features**. An **intercept** is where the graph crosses an axis. The **y-intercept** is the output when the input is 0, here the temperature at midnight. A function is **increasing** on an interval if the outputs get larger as the inputs get larger, and **decreasing** if they get smaller. The highest point of the graph is the **maximum**, and the lowest is the **minimum**. For the day above, the function is decreasing from midnight to about 6 a.m., increasing from 6 a.m. to 3 p.m., and decreasing after that. The maximum is about 68 degrees at 3 p.m.

How fast is the temperature changing? The **average rate of change** of a function f from x = a to x = b is the change in output divided by the change in input:

(f(b) - f(a)) / (b - a).

From 6 a.m. to 3 p.m., the temperature rises from 45 to 68, so the change is 23 degrees over 9 hours, about 2.6 degrees per hour. The units of a rate of change are always the output units per input unit, here degrees Fahrenheit per hour.

For a straight line, this number is the slope, and it is the same on every interval. For a curved graph, the rate changes. Between 6 a.m. and 9 a.m. the temperature might rise at 4 degrees an hour, but in the afternoon it flattens out. That is why we say the average rate over an interval, and always name the interval.

A table of values works too. If a bike rider's distance is 12 miles at 1 hour and 30 miles at 3 hours, the average rate of change is (30 - 12) / (3 - 1) = 9 miles per hour, the rider's average speed over that stretch.
`,
  ],
  cards: [
    ["Intercept", "A point where a graph crosses an axis."],
    ["Increasing", "Outputs get larger as inputs get larger."],
    ["Decreasing", "Outputs get smaller as inputs get larger."],
    ["Maximum", "The highest output of a function on an interval."],
    ["Minimum", "The lowest output of a function on an interval."],
    ["Average rate of change", "(f(b) - f(a)) / (b - a): change in output over change in input."],
    ["Slope", "The rate of change of a line; the same everywhere on a line."],
    ["Units of a rate", "Output units per input unit, such as miles per hour."],
  ],
  closed: [
    [
      "A table gives f(2) = 10 and f(6) = 26. What is the average rate of change from x = 2 to x = 6?",
      ["4", "3.2", "16", "0.25"],
      "A",
    ],
    [
      "A graph goes up from left to right on an interval. On that interval the function is:",
      ["Decreasing", "Constant", "Increasing", "Undefined"],
      "C",
    ],
    [
      "The y-intercept of a function that gives the balance of a savings account over time represents:",
      [
        "The balance when time is zero",
        "The time when the balance is zero",
        "The highest balance",
        "The rate of interest",
      ],
      "A",
    ],
    [
      "A runner's distance is 3 miles at 0.5 hours and 7 miles at 1.5 hours. What are the units of the average rate of change?",
      ["Hours per mile", "Miles", "Miles per hour", "Hours"],
      "C",
    ],
    [
      "Why do we call it the AVERAGE rate of change for a curved graph?",
      [
        "Because it is the mean of all the outputs",
        "Because the rate is not the same on every part of the interval",
        "Because the graph is a straight line",
        "Because it must be rounded",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "The table shows the depth of snow, in inches, at a Columbus park: at 2 p.m. 1 inch, at 5 p.m. 4 inches, at 11 p.m. 13 inches. Find the average rate of change from 2 p.m. to 5 p.m. and from 5 p.m. to 11 p.m. and say when the snow fell faster.",
      scheme: [
        "Finds the first rate, (4 - 1) / 3 = 1 inch per hour",
        "Finds the second rate, (13 - 4) / 6 = 1.5 inches per hour",
        "Includes units, inches per hour",
        "Concludes that the snow fell faster from 5 p.m. to 11 p.m.",
      ],
      model:
        "From 2 p.m. to 5 p.m.: (4 - 1) / (5 - 2) = 3 / 3 = 1 inch per hour. From 5 p.m. to 11 p.m.: (13 - 4) / (11 - 5) = 9 / 6 = 1.5 inches per hour. The snow fell faster in the second interval.",
      answers: [
        [
          "full",
          "[[0|2 to 5: (4 - 1) / 3 = 1]] and [[1|5 to 11: (13 - 4) / 6 = 1.5]]. [[2|Both are in inches per hour.]] [[3|The snow fell faster later, between 5 and 11 p.m.]]",
          "Full marks. The units and the comparison are both there.",
        ],
        [
          "full",
          "[[0|First part: 3 inches in 3 hours so 1 inch per hour.]] [[1|Second part: 9 inches in 6 hours so 1.5 inches per hour.]] [[2|The units are inches per hour.]] [[3|1.5 is bigger than 1 so it snowed faster after 5 p.m.]]",
          "All four marks. Thinking in inches per interval first, then dividing, is a good habit.",
        ],
        [
          "partial",
          "[[0|1 inch per hour]] and [[1|1.5 inches per hour]].",
          "Both rates are correct and have units. The question also asks you to say when the snow fell faster, so finish with that comparison.",
        ],
        [
          "partial",
          "[[0|From 2 to 5 is 3 inches in 3 hours, 1 inch per hour.]] From 5 to 11 is 9 inches / 11 = 0.8. So the first part was faster.",
          "The first rate is right. The time from 5 p.m. to 11 p.m. is 6 hours, not 11. With 9 / 6 you get 1.5, and the second part was faster.",
        ],
        [
          "weak",
          "The snow got up to 13 inches so the rate is 13 inches.",
          "A rate compares a change in depth to a change in time. Use the difference in depths divided by the difference in times for each interval.",
        ],
        [
          "weak",
          "4 - 1 = 3 and 13 - 4 = 9 so the second is faster because 9 is more than 3.",
          "You found the change in depth, which is good. The two intervals are different lengths, so divide each by its number of hours before comparing.",
        ],
      ],
    },
    {
      prompt:
        "A graph shows a school's weekly recycling in pounds. It starts at 40 pounds in week 0, rises to 100 pounds in week 5, then falls to 70 pounds in week 8. Describe where the function is increasing and decreasing, give the maximum, and say what the y-intercept means.",
      scheme: [
        "Says the function is increasing from week 0 to week 5",
        "Says the function is decreasing from week 5 to week 8",
        "Gives the maximum, 100 pounds in week 5",
        "Says the y-intercept, 40, is the weekly recycling at the start (week 0)",
      ],
      model:
        "The function is increasing from week 0 to week 5 and decreasing from week 5 to week 8. The maximum is 100 pounds at week 5. The y-intercept is 40, the number of pounds recycled in week 0, at the start.",
      answers: [
        [
          "full",
          "[[0|It goes up from week 0 to week 5]] and [[1|goes down from week 5 to week 8]]. [[2|The maximum is 100 pounds, in week 5.]] [[3|The y-intercept is 40 pounds, what they recycled at the start in week 0.]]",
          "Full marks. Each feature is named with its numbers and units.",
        ],
        [
          "full",
          "[[0|Increasing 0 to 5.]] [[1|Decreasing 5 to 8.]] [[2|Maximum 100 lbs at week 5.]] [[3|y-intercept is 40, which is the amount of recycling when the weeks start at zero.]]",
          "All four marks. Compact and correct.",
        ],
        [
          "partial",
          "[[0|It's increasing at first]] then decreasing. [[2|The max is 100.]]",
          "You have the shape and the maximum. Give the intervals (weeks 0 to 5, then 5 to 8), the unit for the maximum, and the meaning of the y-intercept.",
        ],
        [
          "partial",
          "[[0|Increasing from 0 to 5.]] [[1|Decreasing from 5 to 8.]] The y-intercept is where it ends, 70.",
          "The intervals are right. The y-intercept is where the graph crosses the y-axis, at week 0, so it is 40 pounds, not 70.",
        ],
        [
          "weak",
          "It goes up and down. The maximum is 8 because the graph ends at week 8.",
          "The maximum is the highest output, which is measured in pounds, not weeks. Look for the greatest value on the vertical axis.",
        ],
        [
          "weak",
          "[[3|The y-intercept is 40.]] It is increasing the whole time.",
          "Good on the y-intercept. The graph falls after week 5, so it is not increasing everywhere. Look at where the values go down.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Graphing and writing linear functions",
  note: `
## Objectives

Students will be able to:

1. graph a linear function and label its intercepts;
2. write a linear function that describes a relationship between two quantities.

## Materials

Graph paper, rulers, a table of data on printing costs at a local copy shop, mini whiteboards.

## Starter (6 minutes)

Display the data: 10 copies cost $2.00, 20 copies cost $3.50, 30 copies cost $5.00. "Is there a pattern? What would 50 copies cost?" Collect predictions and reasoning.

## Main activity

1. Find the rate of change (0.15 dollars per copy) and the starting charge ($0.50) and write C(n) = 0.15n + 0.5. Check with the table.
2. Graph a linear function two ways: slope-intercept (start at the y-intercept, rise over run) and intercepts (set x = 0, then y = 0). Compare.
3. Practice with a contextual function: a plant 6 inches tall that grows 1.5 inches per week. Write h(w), graph it, and interpret the slope and intercept.
4. Students make up their own linear story, exchange with a partner, and write and graph the function.

## Checking for understanding

Whiteboards: show the graph of a line and ask for its function rule. Look for sign errors in the slope.

## Exit ticket

A pool has 500 gallons and is draining 20 gallons per minute. Write G(t), graph it, and say where it crosses the t-axis and what that means.
`,
  reading: [
    "From a story to a line",
    `
A **linear function** has a constant rate of change. Its rule can be written f(x) = mx + b, where m is the slope (the rate of change) and b is the y-intercept (the starting value, when x = 0).

Start with data. A copy shop charges $2.00 for 10 copies, $3.50 for 20 copies and $5.00 for 30 copies. The cost goes up $1.50 for every 10 copies, so the rate is $0.15 per copy. To find the starting value, work backward: 10 copies cost $2.00 and the copies account for 10(0.15) = $1.50, so there must be a $0.50 setup charge. The function is C(n) = 0.15n + 0.5. Check it against the table: C(30) = 4.5 + 0.5 = 5.00. It matches.

To **graph** a linear function there are two reliable methods. In the slope-intercept method, plot the y-intercept first, then use the slope as rise over run to find more points. For C(n), start at (0, 0.5), and for each 10 copies go up 1.50. In the intercept method, find where the line crosses each axis by setting x = 0 and then the output equal to 0, then connect the two points. Use a ruler and extend the line only as far as the story makes sense. A copy shop cannot print a negative number of copies.

Interpretation matters as much as the rule. In h(w) = 1.5w + 6 for a plant, 6 is its starting height in inches and 1.5 is how many inches it grows per week. In G(t) = 500 - 20t for a draining pool, the slope is negative, -20 gallons per minute, because the amount decreases. The t-intercept is when G(t) = 0. Solving 500 - 20t = 0 gives t = 25, so the pool is empty after 25 minutes.

Always check your function against the data, and say what the slope and the intercept mean in words.
`,
  ],
  cards: [
    ["Linear function", "A function with a constant rate of change, written f(x) = mx + b."],
    ["Slope (m)", "The rate of change: rise over run."],
    ["y-intercept (b)", "The output when the input is 0; the starting value."],
    ["Rise over run", "Vertical change divided by horizontal change between two points."],
    ["Slope-intercept form", "y = mx + b."],
    ["Negative slope", "The function decreases as the input increases."],
    ["Initial value", "The value of the output at the start, when x = 0."],
    ["Check a function", "Substitute data points to see that the rule gives the same outputs."],
  ],
  closed: [
    [
      "A line passes through (0, 4) and (2, 10). What is its slope?",
      ["2", "3", "6", "0.33"],
      "B",
    ],
    [
      "A gym membership has an enrollment fee of $40 and costs $25 per month. Which function gives the total cost after m months?",
      ["C(m) = 40m + 25", "C(m) = 25m + 40", "C(m) = 65m", "C(m) = 25 - 40m"],
      "B",
    ],
    [
      "The function V(t) = 800 - 15t gives the gallons in a tank after t minutes. What does -15 mean?",
      [
        "The tank started with 15 gallons",
        "The tank loses 15 gallons each minute",
        "The tank fills in 15 minutes",
        "The tank holds 800 gallons",
      ],
      "B",
    ],
    [
      "What is the y-intercept of y = -2x + 7?",
      ["(0, -2)", "(7, 0)", "(0, 7)", "(0, 3.5)"],
      "C",
    ],
    [
      "A table shows y = 3 when x = 1 and y = 7 when x = 2, and the relationship is linear. What is y when x = 4?",
      ["11", "15", "13", "9"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A rock climbing gym charges $30 to rent equipment once and $12 per visit. Write a function C(v) for the total cost after v visits, graph its first three points, and explain what the slope and the y-intercept mean.",
      scheme: [
        "Writes C(v) = 12v + 30",
        "Gives correct points, such as (0, 30), (1, 42) and (2, 54)",
        "Says the slope, 12, is the cost per visit in dollars per visit",
        "Says the y-intercept, 30, is the one-time equipment rental in dollars",
      ],
      model:
        "C(v) = 12v + 30. Points: (0, 30), (1, 42), (2, 54). The slope, 12, is the cost of each visit in dollars per visit. The y-intercept, 30, is the one-time equipment rental fee, paid before any visits.",
      answers: [
        [
          "full",
          "[[0|C(v) = 12v + 30]]. [[1|Points are (0, 30), (1, 42), (2, 54).]] [[2|The slope is 12 which is dollars for each visit.]] [[3|The y-intercept is 30 which is the one-time rental fee.]]",
          "Full marks. Each part is correct and has a unit.",
        ],
        [
          "full",
          "Cost = rate times visits plus the start, so [[0|C(v) = 12v + 30]]. [[1|When v = 0 it's 30, v = 1 it's 42, v = 2 it's 54, so I plot (0, 30), (1, 42), (2, 54).]] [[2|The slope 12 means $12 per visit.]] [[3|The 30 is the equipment rental you pay once.]]",
          "All four marks. Your explanation of the cost as a rate times visits plus the start is clear.",
        ],
        [
          "partial",
          "[[0|C(v) = 12v + 30]]. [[2|The slope is 12 per visit]] and the intercept is 30.",
          "The function and the slope are right. Give the points to graph and say that 30 is the one-time rental fee in dollars.",
        ],
        [
          "partial",
          "C(v) = 30v + 12. [[1|(0, 30), (1, 42), (2, 54)]]. The slope is 30 and the intercept is 12.",
          "Your points are right, which shows you understand the situation. In your function the 30 and 12 are swapped: 12 is multiplied by the visits and 30 is added once.",
          true,
        ],
        [
          "weak",
          "C(v) = 30 + 12 + v. The slope is v.",
          "The visits must be multiplied by their price. Write 12 times v, then add the fee. The slope is a number, not the variable.",
        ],
        [
          "weak",
          "[[1|(0, 30)]] is a point. The cost goes up as you go to the gym more.",
          "(0, 30) is a good point. A function rule needs the rate, $12 per visit, multiplied by v, plus the $30. Try building the rule from two points.",
        ],
      ],
    },
    {
      prompt:
        "A pool has 500 gallons of water and is draining at 20 gallons per minute. Write G(t) for the gallons left after t minutes, find where its graph crosses the t-axis, and say what that means.",
      scheme: [
        "Writes G(t) = 500 - 20t",
        "Sets G(t) = 0 and solves to get t = 25",
        "Identifies the t-intercept as (25, 0)",
        "Says that the pool is empty after 25 minutes",
      ],
      model:
        "G(t) = 500 - 20t. Set G(t) = 0: 500 - 20t = 0, so t = 25. The graph crosses the t-axis at (25, 0), meaning the pool is empty after 25 minutes.",
      answers: [
        [
          "full",
          "[[0|G(t) = 500 - 20t]]. [[1|0 = 500 - 20t so 20t = 500 and t = 25.]] [[2|It crosses the t axis at (25, 0).]] [[3|That means the pool is empty after 25 minutes.]]",
          "Full marks. You wrote the rule with a negative rate, since the pool is losing water.",
        ],
        [
          "full",
          "It starts at 500 and goes down 20 each minute, [[0|G(t) = -20t + 500]]. To find where it hits zero I do [[1|-20t + 500 = 0, t = 25]]. [[2|The point is (25, 0).]] [[3|At 25 minutes there is no water left.]]",
          "All four marks. -20t + 500 and 500 - 20t are the same function.",
        ],
        [
          "partial",
          "[[0|G(t) = 500 - 20t]]. [[1|t = 25]].",
          "The rule and the time are right. Name the point (25, 0) and say in words what it means: the pool is empty at 25 minutes.",
        ],
        [
          "partial",
          "G(t) = 500 + 20t. [[1|500 - 20t = 0 gives 25]], [[3|the pool is empty after 25 minutes]].",
          "The rule should have a minus sign, since the pool is draining. You found the right time by using the minus sign in the second step, so make the rule match.",
        ],
        [
          "weak",
          "500 / 20 = 25 gallons are left.",
          "500 divided by 20 does give 25, but it is a number of minutes, not gallons. Write the rule first and then say what 25 means.",
        ],
        [
          "weak",
          "G(t) = 20t. It crosses at 0 because it starts empty.",
          "The pool starts with 500 gallons and loses water, so the rule needs the 500 as the starting value and a negative rate of -20.",
        ],
      ],
    },
  ],
};

writeCourse("algebra-i-grade-9.json", "Algebra I", "Grade 9", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
