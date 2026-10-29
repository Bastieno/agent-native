import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Honors Algebra I, Grade 9, Quarter 1. Standards: Common Core, High School
 * Algebra and Functions, in the school's own words. Goes deeper and faster than
 * Algebra I: unit conversion, literal equations, proofs of steps, systems with
 * inequalities, and rates of change from tables.
 */

const w1: WeekInput = {
  topic: "Units, structure of expressions and equations from a story",
  note: `
## Objectives

Students will be able to:

1. choose units for a quantity, convert between them, and use them to check a formula;
2. name the terms, factors and coefficients of an expression and say what each means in context, including a factor such as 1.075;
3. write and solve a multi-step linear equation from a word problem, with decimals and fractions.

## Materials

Mini whiteboards, a copy of a gas-station receipt, and the exit ticket.

## Starter (8 minutes)

Write "45 miles per hour" on the board. Ask: "How fast is that in feet per second?" Let pairs try for three minutes before anyone calls out an answer. Collect their strategies and show the chain of conversion factors, writing every unit so that the ones that should cancel actually cancel.

## Main activity

1. Take the expression 1.075p - 5 and ask what each piece does to a price p. Insist on the word "factor" for 1.075 and on why it is not 0.075.
2. Pose a two-stage trip problem and have students define a variable with its unit, write one equation, solve it, and read the answer back in the story.
3. Groups of three get a card with a story that has fractions or decimals and must show a unit on every line of work.

## Checking for understanding

Walk the room with the question: "What does this number mean, and in what unit?" Pick a group that left a unit off and ask them to find the mistake that results.

## Exit ticket

A store charges 6% tax and you have a $4 coupon off after tax. Write the expression for the final cost of an item priced p, then say what the 1.06 does.
`,
  reading: [
    "Units are part of the answer",
    `
A number without a unit is only half a fact. "Forty-five" tells you nothing, but "forty-five miles per hour" tells you how fast a COTA bus is traveling on the freeway. In algebra the units are a built-in check. If you are finding a speed, your answer should come out in a distance divided by a time, and if it does not, a step went wrong.

Units can be converted by multiplying by a fraction equal to one. Because 5,280 feet is the same length as 1 mile, the fraction 5,280 ft over 1 mile equals 1, and multiplying by it changes the unit without changing the quantity. To change 45 miles per hour into feet per second, line up the factors so that miles cancel with miles and hours with hours: 45 mi/hr times 5,280 ft/mi times 1 hr/3,600 s. What is left is 45 times 5,280 divided by 3,600, which is 66 feet per second.

Now look at structure. In the expression 1.075p - 5, there are two terms, 1.075p and 5. The first term is a product, so p and 1.075 are factors of it. The number 1.075 is more than a coefficient to read off: it is 1 + 0.075, so multiplying by it gives the price itself plus 7.5% of the price. That is why it models a price with sales tax. If you wrote 0.075p instead, you would only have the tax and would have lost the item. The minus 5 then takes off a five-dollar coupon after tax.

To solve a story problem, define each variable with its unit, build one equation from the relationship, and solve it with inverse operations on both sides. Suppose a driver goes h hours at 60 miles per hour on the highway and then 1.5 hours at 30 miles per hour in town, covering 180 miles in all. The equation is 60h + 30(1.5) = 180, so 60h + 45 = 180, then 60h = 135, so h = 2.25 hours. Read it back: that is 2 hours and 15 minutes, which is a believable highway time. A negative time or a number of people with a fraction would be a sign you should recheck.
`,
  ],
  cards: [
    ["Conversion factor", "A fraction equal to 1 that relates two units, such as 5,280 ft over 1 mi, used to change units without changing the quantity."],
    ["Dimensional analysis", "Using the units in a calculation to check that the answer has the right kind of unit."],
    ["Term", "A part of an expression separated from the others by plus or minus signs."],
    ["Factor", "One of the numbers or letters multiplied together in a term. In 1.075p, both 1.075 and p are factors."],
    ["Coefficient", "The numerical factor in a term with a variable, such as 8.5 in 8.5w."],
    ["Growth factor", "A multiplier such as 1.075 that is 1 plus a rate. It gives the original amount plus a percent of it."],
    ["Define the variable", "State what a letter stands for, with its unit, before writing the equation."],
    ["Viable answer", "A solution that makes sense in the story, such as a non-negative number of hours."],
  ],
  closed: [
    [
      "A COTA express bus travels at 45 miles per hour. Which is its speed in feet per second? (1 mile = 5,280 feet.)",
      ["3,960 feet per second", "66 feet per second", "30.7 feet per second", "12.5 feet per second"],
      "B",
    ],
    [
      "At a Friday night football game, student tickets cost $8 and adult tickets cost $12. The gate receipts are 8s + 12a. Which statement about the term 12a is correct?",
      [
        "12 is the number of adults who came to the game",
        "12a is the price of a single adult ticket",
        "12a is the total dollars from adult tickets, and 12 is dollars per adult ticket",
        "12a is the number of adult tickets sold times 8",
      ],
      "C",
    ],
    [
      "Solve 2.5(x - 4) + 3 = 0.5x + 11.",
      ["x = 9", "x = 6", "x = 18", "x = -9"],
      "A",
    ],
    [
      "A kayak shop at Buckeye Lake charges $15 plus $9 per hour. A rival shop charges $5 plus $11 per hour. After how many hours h do the two rentals cost the same?",
      ["10 hours", "0.5 hours", "-5 hours", "5 hours"],
      "D",
    ],
    [
      "A savings account balance after t years is 1500(1.04)^t dollars. What does the factor 1.04 tell you?",
      [
        "The account starts with $1.04",
        "The balance grows by $1.04 each year",
        "The balance is multiplied by 1.04 each year, which is growth of 4% a year",
        "The account earns 104% interest each year",
      ],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A family drives about 180 miles to Pittsburgh. They travel h hours on the interstate at 60 miles per hour and then 1.5 hours on city streets at 30 miles per hour. Define h with its unit, write an equation, solve it, and say what your answer means in hours and minutes.",
      scheme: [
        "Defines the variable with its unit, such as h = hours on the interstate",
        "Writes a correct equation, 60h + 30(1.5) = 180",
        "Solves with correct steps, getting 60h = 135",
        "States h = 2.25 hours, which is 2 hours 15 minutes, with units",
      ],
      model:
        "Let h be the number of hours on the interstate. The distance on the interstate is 60h miles and the distance on city streets is 30 times 1.5 = 45 miles, so 60h + 45 = 180. Subtract 45 from both sides to get 60h = 135, then divide by 60 to get h = 2.25. They spent 2.25 hours, or 2 hours 15 minutes, on the interstate.",
      answers: [
        [
          "full",
          "[[0|Let h = hours spent on the interstate.]] The city part is 30 mph for 1.5 hours = 45 miles, so [[1|60h + 30(1.5) = 180]]. That makes 60h + 45 = 180, and [[2|60h = 135]]. [[3|h = 2.25 hours, which is 2 hours and 15 minutes]] on the interstate.",
          "Full marks. Computing the city miles first, 45, made the equation easy to check.",
        ],
        [
          "full",
          "h is the hours on the highway ([[0|h = hours at 60 mph]]). Total miles: [[1|60h + 1.5 x 30 = 180]]. Subtract 45 from both sides: [[2|60h = 135]]. Divide: [[3|h = 2.25 hr = 2 hr 15 min]]. I checked: 60(2.25) = 135 and 135 + 45 = 180.",
          "All four marks, and checking by substituting back is the right habit for a trip problem.",
        ],
        [
          "partial",
          "[[0|h = hours on the interstate]]. [[1|60h + 30(1.5) = 180]]. 60h + 45 = 180 so 60h = 225 and h = 3.75 hours.",
          "Your equation is right. In the next step you added 45 to 180 when you needed to subtract it. The city miles are already covered, so take them away from 180.",
        ],
        [
          "partial",
          "60h + 45 = 180, so [[2|60h = 135]] and h = 2.25. They drove 2.25.",
          "The solving is correct. Say what h stands for before the equation, and finish with units: 2.25 hours, which is 2 hours 15 minutes.",
          true,
        ],
        [
          "weak",
          "60 + 30 = 90 and 180 / 90 = 2 so it was 2 hours.",
          "You added the two speeds, but the speeds apply for different amounts of time. Use distance = rate times time for each part and add the distances.",
        ],
        [
          "weak",
          "[[0|h is hours on the interstate]] and 60 x 1.5 = 90, 180 - 90 = 90, so h = 90 hours.",
          "Defining h was good. The 1.5 hours goes with the 30 miles per hour, not with 60, and 90 is miles, so it cannot be the number of hours.",
        ],
      ],
    },
    {
      prompt:
        "At the Crew team store a jersey has a price p dollars. A shopper pays 7.5% sales tax and then uses a $5 coupon, so the final cost is 1.075p - 5. (a) Explain what the factor 1.075 means and why it is not 0.075. (b) A shopper pays $59.50 in all. Find p.",
      scheme: [
        "Says 1.075 = 1 + 0.075, so it gives the price plus 7.5% of it",
        "Says 0.075p alone would be only the tax, not the total cost",
        "Writes the equation 1.075p - 5 = 59.50",
        "Solves to p = 60 dollars, with a unit and a check",
      ],
      model:
        "The factor 1.075 is 1 + 0.075, so multiplying by it gives the full price plus 7.5% of the price. 0.075p would be only the tax. For part (b), 1.075p - 5 = 59.50. Add 5 to get 1.075p = 64.50, then divide by 1.075 to get p = 60. The jersey costs $60. Check: 1.075(60) = 64.50 and 64.50 - 5 = 59.50.",
      answers: [
        [
          "full",
          "[[0|1.075 is 1 + 0.075, so it is the whole price plus 7.5 percent of it]]. [[1|0.075p would only be the tax, you would lose the jersey itself]]. [[2|1.075p - 5 = 59.50]], so 1.075p = 64.50 and [[3|p = 60 dollars]]. Check: 64.5 - 5 = 59.5.",
          "Full marks. The sentence about losing the jersey itself is exactly the reason the factor is not 0.075.",
        ],
        [
          "full",
          "[[1|If I used 0.075 it would give just the tax amount and not the price I pay]]. [[0|1.075 means 100% of the price plus 7.5% more, 1 + 0.075]]. Then [[2|1.075p - 5 = 59.50]]. Add 5, divide by 1.075, [[3|p = $60]].",
          "All four marks. Each step is in order and your reason for the factor is clear.",
        ],
        [
          "partial",
          "1.075 is the tax percent. 1.075p - 5 = 59.50, so [[2|1.075p - 5 = 59.50]] then 1.075p = 54.50 and p = 50.70.",
          "The tax is 7.5%, written 0.075; the 1.075 includes the whole price. You also subtracted 5 when you needed to add it to both sides before dividing.",
        ],
        [
          "partial",
          "[[0|It is 1 plus 0.075 so the price and the tax]]. For b I got 59.50 + 5 = 64.50, then 64.50 / 1.075 = 60.",
          "Part (a) is right on the first point. Say why 0.075 alone does not work. In (b) write the equation first and finish with a dollar sign and a check.",
          true,
        ],
        [
          "weak",
          "1.075 is because tax is 7.5 percent so you move the decimal. 59.50 / 1.075 = 55.35 so p = 55.35.",
          "You left out the coupon, which was taken off after tax. Undo the steps in reverse order: add 5 first, then divide by 1.075.",
        ],
        [
          "weak",
          "[[2|1.075p - 5 = 59.50]] so p = 59.50 - 5 - 1.075 = 53.425.",
          "The equation is right, but the 1.075 multiplies p, so you divide by it. You cannot subtract a factor. Add 5 to both sides, then divide.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Literal equations and constraints",
  note: `
## Objectives

Students will be able to:

1. rearrange a formula to isolate a chosen quantity, keeping each step balanced;
2. write equations and inequalities for constraints and decide which solutions are viable in the situation.

## Materials

Formula cards (temperature, volume, simple interest, trapezoid area), whiteboards, graph paper.

## Starter (8 minutes)

Display F = (9/5)C + 32. Ask students to find C when F is 14 degrees, the kind of morning Columbus gets on a snow day. Then ask: "If we had to do this a hundred times, what would we rather have?" Lead them to solving for C once, in general.

## Main activity

1. Model solving for C step by step, labeling the inverse operation at each step: subtract 32 from both sides, then multiply by 5/9. Stress that you do to the whole side what you do to the other side.
2. Give the class three formulas to rearrange: V = (1/3)(pi)(r^2)h for h, A = (1/2)h(b1 + b2) for b2, I = Prt for r. Check each with numbers.
3. Constraints: the State Fair family budget. Students write the inequality, solve it, and list the viable whole-number answers.

## Checking for understanding

Whiteboards up on "solve for the letter I point to." Look for errors that divide only part of one side.

## Exit ticket

The charge is $48 for four admissions plus $1.25 per ride ticket, and the budget is $60. How many tickets can the family buy at most, and why is 9.6 not the answer?
`,
  reading: [
    "One formula, many questions",
    `
A formula is an equation that links several quantities. The temperature formula F = (9/5)C + 32 turns Celsius into Fahrenheit. It is written so that F is alone on one side, which makes it easy to find F. But if you want to go the other way and you know F, you would like C alone. You can solve a formula for any letter by using the same inverse operations you use on numbers. An equation of this kind is called a literal equation because it has letters where you might expect numbers.

The rule is simple: whatever you do to one side, you do to the entire other side. To solve F = (9/5)C + 32 for C, subtract 32 from both sides to get F - 32 = (9/5)C. Then multiply both sides by 5/9, the reciprocal of 9/5, and you have C = (5/9)(F - 32). Notice that F - 32 is multiplied as a group. If you only multiply F by 5/9, you have broken the balance. Check with a cold morning: at 14 degrees Fahrenheit, C = (5/9)(14 - 32) = (5/9)(-18) = -10 degrees Celsius.

The same method works for harder formulas. The volume of a cone is V = (1/3)(pi)r^2h. To find the height, multiply both sides by 3 to get 3V = (pi)r^2h and then divide both sides by (pi)r^2: h = 3V / ((pi)r^2). For the area of a trapezoid, A = (1/2)h(b1 + b2), multiply by 2, divide by h, and subtract b1 to get b2 = 2A/h - b1.

Real situations also have limits. A limit is called a constraint. You write it as an equation if it must be exact, or an inequality if it is a maximum or minimum. If a family has $60 and pays $48 for admission, then 48 + 1.25t is at most 60, where t is ride tickets. Solving gives 1.25t is at most 12, so t is at most 9.6. But tickets come in whole numbers and cannot be negative, so the viable answers are 0, 1, 2, up to 9. The algebra gives a solution set; the situation then decides which of those solutions are viable.
`,
  ],
  cards: [
    ["Literal equation", "An equation with several letters, such as a formula, that can be solved for any one of them."],
    ["Isolate", "Get one variable alone on one side of the equation by using inverse operations."],
    ["Reciprocal", "The number that multiplies with a given number to make 1. The reciprocal of 9/5 is 5/9."],
    ["Constraint", "A limit that a situation puts on the quantities, written as an equation or an inequality."],
    ["Viable solution", "A solution of the algebra that also makes sense in the situation, such as a whole number of tickets."],
    ["Non-negativity constraint", "The fact that quantities such as time, counts and distances cannot be below zero."],
    ["Simple interest formula", "I = Prt, where P is the principal, r the yearly rate as a decimal and t the time in years."],
    ["Properties of equality", "Rules saying that doing the same thing to both sides of an equation keeps it true."],
  ],
  closed: [
    [
      "The area of a trapezoid is A = (1/2)h(b1 + b2). Which equation solves it for b2?",
      ["b2 = 2A/h - b1", "b2 = (2A - b1)/h", "b2 = 2A - h - b1", "b2 = A/(2h) - b1"],
      "A",
    ],
    [
      "A snow day in Cleveland is 14 degrees Fahrenheit. Using C = (5/9)(F - 32), what is that in degrees Celsius?",
      ["-24.2 degrees", "-10 degrees", "-32.4 degrees", "-18 degrees"],
      "B",
    ],
    [
      "A ballroom at the convention center holds at most 40 people. A group has 6 chaperones and s students. Which inequality describes how many students can attend?",
      ["s + 6 >= 40", "6s <= 40", "s - 6 <= 40", "s + 6 <= 40"],
      "D",
    ],
    [
      "A food truck makes $12.50 profit on each batch of tacos and wants at least $80. Solving 12.5b >= 80 gives b >= 6.4. How many whole batches must the truck make?",
      ["6 batches", "6.4 batches", "7 batches", "8 batches"],
      "C",
    ],
    [
      "A $2,000 loan earns $150 in simple interest over 2.5 years (I = Prt). What is the yearly rate r?",
      ["3%", "7.5%", "0.03%", "33.3%"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "The Ohio Department of Transportation stores road salt in a cone-shaped pile. The volume is V = (1/3)(pi)r^2 h. (a) Solve the formula for h, showing each step. (b) A pile has volume 1,570 cubic feet and radius 10 feet. Use pi = 3.14 to find its height.",
      scheme: [
        "Multiplies both sides by 3 to get 3V = (pi)r^2 h",
        "Divides both sides by (pi)r^2 to get h = 3V / ((pi)r^2)",
        "Substitutes correctly, with r squared as 100",
        "Finds h = 15 feet, with a unit",
      ],
      model:
        "Multiply both sides by 3 to get 3V = (pi)r^2 h. Divide both sides by (pi)r^2 to get h = 3V / ((pi)r^2). Substitute: h = 3(1,570) / (3.14 x 10^2) = 4,710 / 314 = 15. The pile is 15 feet tall.",
      answers: [
        [
          "full",
          "[[0|Multiply both sides by 3: 3V = (pi)r^2 h.]] [[1|Then divide both sides by (pi)r^2 so h = 3V / ((pi)r^2).]] For (b): [[2|r^2 = 100, so h = 3(1570) / (3.14 x 100)]] = 4710 / 314, [[3|which is 15 feet]].",
          "Full marks. Writing r squared as 100 before dividing kept your numbers clean.",
        ],
        [
          "full",
          "To get h alone I [[0|clear the one-third by multiplying both sides by 3, giving 3V = (pi) r^2 h]]. [[1|Next I divide both sides by pi r^2 and get h = 3V over pi r^2]]. Plug in: [[2|3 x 1570 = 4710 and 3.14 x 10^2 = 3.14 x 100 = 314]]. [[3|4710 / 314 = 15 ft]]. Salt pile is 15 feet tall.",
          "All four marks. Showing both the numerator and the denominator separately makes your work easy to check.",
        ],
        [
          "partial",
          "[[0|3V = pi r^2 h]] and h = 3V - pi r^2. Then 4710 - 314 = 4396 feet.",
          "The first step is right. After that you have to divide by pi r^2, not subtract it, since pi r^2 multiplies h. A pile 4,396 feet tall should also have made you stop and check.",
        ],
        [
          "partial",
          "[[1|h = 3V / (pi r^2)]], so h = 3(1570) / (3.14 x 10 x 2) = 4710 / 62.8 = 75 feet.",
          "Your formula is right. The radius is squared, so r^2 = 100, not 10 x 2 = 20. Check the result: 75 feet for 1,570 cubic feet is far too tall for that base.",
          true,
        ],
        [
          "weak",
          "V = (1/3) pi r^2 h so h = V / 3 pi r^2 and that is 1570 / 3 = 523.3 feet.",
          "You divided by 3, but the 3 has to go to the top. Multiply both sides by 3 first. Then divide by pi r^2 as one group.",
        ],
        [
          "weak",
          "[[0|you multiply by 3]] and get h = 3(1570)(3.14)(100) which is 1,478,940.",
          "You multiplied by 3 correctly. The pi r^2 sits next to h, so you divide by it, not multiply. A height in the millions of feet is a signal to recheck.",
        ],
      ],
    },
    {
      prompt:
        "A family of four goes to the Ohio State Fair with $60. Admission is $12 per person, and each ride ticket costs $1.25. Write an inequality for the number of ride tickets t, solve it, and explain which values of t are viable.",
      scheme: [
        "Writes the inequality 4(12) + 1.25t <= 60",
        "Solves to get t <= 9.6",
        "Says t must be a non-negative whole number",
        "States the maximum is 9 tickets, not 9.6 or 10",
      ],
      model:
        "Admission for four is 4(12) = 48 dollars, so 48 + 1.25t <= 60. Subtract 48 to get 1.25t <= 12, then divide by 1.25 to get t <= 9.6. Tickets cannot be fractions or negative, so t must be a whole number from 0 to 9. The family can buy at most 9 tickets.",
      answers: [
        [
          "full",
          "[[0|4 x 12 = 48 so 48 + 1.25t <= 60]]. [[1|1.25t <= 12 so t <= 9.6]]. [[2|You can't buy part of a ticket or a negative number so t is a whole number 0 or more]], and [[3|the most is 9 tickets]] because 10 would cost $60.50.",
          "Full marks. Checking that 10 tickets would break the budget was a strong way to justify the cutoff.",
        ],
        [
          "full",
          "Let t = ride tickets. [[0|48 + 1.25t <= 60]] since admission is 4(12). Subtract 48: 1.25t <= 12. [[1|Divide by 1.25, t <= 9.6.]] [[2|Tickets are whole numbers and can't go below 0]], so t could be 0, 1, 2, up to [[3|9, and 9 is the max]].",
          "All four marks, with the inequality in a clear order and the viable values listed.",
        ],
        [
          "partial",
          "[[0|48 + 1.25t <= 60]], [[1|t <= 9.6]]. So the family can buy 10 tickets.",
          "Your algebra is right. Rounding up to 10 breaks the budget, because 10 tickets cost $12.50. When the solution is t <= 9.6, the largest whole number is 9.",
        ],
        [
          "partial",
          "1.25t <= 60 so t <= 48. [[2|You can only have whole tickets]] so 48 is the most.",
          "You left out the $48 of admission. The family spends $48 before buying a ticket, so the equation needs the 48 on the left. You were right that tickets are whole numbers.",
        ],
        [
          "weak",
          "12 x 1.25 = 15 and 60 / 15 = 4 so they get 4 tickets.",
          "Multiplying the admission price by the ticket price does not match anything in the story. Find what each person pays, add the ticket cost, and compare to $60.",
        ],
        [
          "weak",
          "t >= 9.6 because they need to spend all the money, so 10 tickets.",
          "A budget is a maximum, so the inequality points the other way, t <= 9.6. Spending more than $60 is not possible.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Two-variable equations and justifying each step",
  note: `
## Objectives

Students will be able to:

1. write an equation in two variables for a relationship and graph it, labeling the intercepts and what they mean;
2. justify each step of solving an equation by naming the property that allows it.

## Materials

Graph paper, rulers, whiteboards, a step-justification table (blank) for each pair.

## Starter (8 minutes)

A booster club needs to raise $600 from t-shirts at $15 and hoodies at $30. Ask: "Is there only one way to do it?" Let students list three combinations, then ask what all the combinations have in common. Write 15t + 30h = 600 and say it is one equation with two unknowns.

## Main activity

1. Find the intercepts of 15t + 30h = 600 by setting each variable to zero. Plot them and join them with a ruler, then ask which points on the line are viable sales and which are not.
2. Hand out the step table. Solve 3(x + 4) = 5x - 6 on the board, with two columns: the step and the reason (distributive property, subtraction property of equality, and so on).
3. Pairs write their own equation, solve it, and swap the table with another pair, who must add the reasons.

## Checking for understanding

Ask "why are you allowed to do that?" at random. Accept only a named property, not "because it works."

## Exit ticket

Solve 4(2x - 3) - 5 = 3(x + 1) + 2x + 1 and give the reason for the first step.
`,
  reading: [
    "A line is a list of solutions, and every step has a reason",
    `
Most real problems have more than one unknown. A club that raises money by selling t-shirts at $15 and hoodies at $30, with a goal of $600, can use the equation 15t + 30h = 600. There is no single answer, because many pairs work: 40 shirts and no hoodies, 20 shirts and 10 hoodies, or no shirts and 20 hoodies. Each pair of numbers (t, h) that makes the equation true is a solution, and all of them lie on one straight line.

The easiest points to find are the intercepts. To find where the line meets the t-axis, set h = 0: 15t = 600 gives t = 40, so the point is (40, 0), which means 40 shirts and no hoodies. To find where it meets the h-axis, set t = 0: 30h = 600 gives h = 20, so the point is (0, 20), which means 20 hoodies and no shirts. Plot both, draw the line through them, and read off other solutions. A point such as (20, 10) is viable because 15(20) + 30(10) = 300 + 300 = 600. A point like (10, 7.5) is on the line but is not viable, since you cannot sell half a hoodie.

Now think about what makes each step in solving an equation legal. Algebra is not a list of tricks; each step follows from the previous one by a property. Take 5(x - 2) = 3x + 6. Step one is 5x - 10 = 3x + 6, justified by the distributive property. Step two subtracts 3x from both sides to give 2x - 10 = 6; this is the subtraction property of equality, which says that if two quantities are equal, they stay equal when you subtract the same amount from each. Step three adds 10 to both sides, giving 2x = 16. Step four divides both sides by 2, so x = 8. Every line is a claim, and every claim has a reason.

If you cannot name the reason for a step, treat it as suspect. Many wrong answers come from steps that look natural but do something to just one side of the equation, or from moving a number across the equal sign without remembering that you are really adding or subtracting it from both sides.
`,
  ],
  cards: [
    ["Equation in two variables", "An equation with two unknowns, such as 15t + 30h = 600, whose solutions are pairs of numbers."],
    ["Solution of a two-variable equation", "An ordered pair that makes the equation true when its numbers are substituted."],
    ["x-intercept", "The point where a graph crosses the x-axis. Its y-coordinate is 0."],
    ["y-intercept", "The point where a graph crosses the y-axis. Its x-coordinate is 0."],
    ["Distributive property", "a(b + c) = ab + ac. Multiplying a sum by a number multiplies each term."],
    ["Addition property of equality", "If a = b, then a + c = b + c. You can add the same amount to both sides."],
    ["Division property of equality", "If a = b and c is not 0, then a/c = b/c. You can divide both sides by the same nonzero number."],
    ["Combine like terms", "Add or subtract terms with the same variable part, such as 8x - 17x or 3x + 2x."],
  ],
  closed: [
    [
      "Which ordered pair is a solution of 3x + 4y = 24?",
      ["(3, 4)", "(4, 3)", "(6, 2)", "(2, 6)"],
      "B",
    ],
    [
      "What is the x-intercept of the graph of 3x + 4y = 24?",
      ["(0, 6)", "(6, 0)", "(0, 8)", "(8, 0)"],
      "D",
    ],
    [
      "A catering order has p pizzas at $12 each and s salads at $8 each, and the total is $100. Which combination of (p, s) fits exactly?",
      ["(4, 6)", "(6, 4)", "(3, 8)", "(2, 9)"],
      "C",
    ],
    [
      "A student solves an equation. Step 1: 5x - 10 = 3x + 6. Step 2: 2x - 10 = 6. What was done to get from Step 1 to Step 2?",
      [
        "Added 3x to both sides",
        "Subtracted 3x from the left side only",
        "Subtracted 3x from both sides",
        "Divided both sides by 3",
      ],
      "C",
    ],
    [
      "Solve 2x - y = 6 for y.",
      ["y = 2x - 6", "y = 6 - 2x", "y = 2x + 6", "y = -2x - 6"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "The Hilltop High booster club needs $600 from sales of t-shirts at $15 and hoodies at $30. (a) Write an equation using t for shirts and h for hoodies. (b) Find both intercepts and say what each means. (c) Give one other viable point and show that it works.",
      scheme: [
        "Writes the equation 15t + 30h = 600",
        "Finds the intercepts (40, 0) and (0, 20)",
        "Interprets the intercepts: 40 shirts and no hoodies, or 20 hoodies and no shirts",
        "Gives another whole-number point such as (20, 10) and verifies it",
      ],
      model:
        "15t + 30h = 600. If h = 0, then 15t = 600 and t = 40, so (40, 0) means selling 40 shirts and no hoodies. If t = 0, then 30h = 600 and h = 20, so (0, 20) means selling 20 hoodies and no shirts. Another solution is (20, 10), since 15(20) + 30(10) = 300 + 300 = 600.",
      answers: [
        [
          "full",
          "[[0|15t + 30h = 600]]. When h is 0, 15t = 600 so t = 40. When t is 0, 30h = 600 so h = 20. [[1|The intercepts are (40, 0) and (0, 20)]]. [[2|(40, 0) is 40 shirts and zero hoodies, (0, 20) is 20 hoodies and no shirts]]. [[3|(20, 10) works because 300 + 300 = 600]].",
          "Full marks. You found the intercepts by setting each variable to zero and kept the story attached to the numbers.",
        ],
        [
          "full",
          "Equation: [[0|15t + 30h = 600]]. For the intercepts I set one variable to 0. [[1|x-intercept (40, 0), y-intercept (0, 20)]]. [[2|The first means they sell only shirts, 40 of them. The second is they only sell hoodies, 20 of them.]] Another point is [[3|(30, 5) since 15 x 30 = 450 and 30 x 5 = 150 and the total is 600]].",
          "All four marks. Choosing (30, 5) and checking it with both products shows you understand it is a solution.",
        ],
        [
          "partial",
          "[[0|15t + 30h = 600]]. [[1|The intercepts are (40, 0) and (0, 20).]] The 40 is how much money and 20 is the hoodies.",
          "Your equation and intercepts are right. Each coordinate has a unit. (40, 0) means 40 shirts and 0 hoodies, not an amount of money.",
        ],
        [
          "partial",
          "15t + 30h = 600, then [[1|if h = 0 then t = 40, if t = 0 then h = 20]]. A point is (10, 15).",
          "The intercepts are right. Check (10, 15): 15(10) + 30(15) = 150 + 450 = 600, so it works, but you needed to say that and explain what the intercepts mean.",
          true,
        ],
        [
          "weak",
          "15 + 30 = 45 and 600 / 45 = 13.3 so they sell 13 of each.",
          "Adding the two prices assumes one of each is sold together. Write the money from shirts, 15t, and from hoodies, 30h, and set the sum equal to 600.",
        ],
        [
          "weak",
          "[[0|15t + 30h = 600]] and the intercepts are (15, 30) and (600, 0).",
          "The equation is correct. The intercepts have a zero in them: one product is 0, so you solve a one-variable equation. 15, 30 are the prices, not coordinates.",
        ],
      ],
    },
    {
      prompt:
        "Solve 4(2x - 3) - 5 = 3(x + 1) + 2x + 1. Write each step and the property that justifies it, and check your solution.",
      scheme: [
        "Distributes on both sides, naming the distributive property",
        "Combines like terms to get 8x - 17 = 5x + 4",
        "Gets 3x = 21 using equal operations on both sides, with the property named",
        "Finds x = 7 and checks it by substituting",
      ],
      model:
        "Distribute: 8x - 12 - 5 = 3x + 3 + 2x + 1 (distributive property). Combine like terms: 8x - 17 = 5x + 4. Subtract 5x from both sides and add 17 to both sides (properties of equality): 3x = 21. Divide both sides by 3: x = 7. Check: 4(14 - 3) - 5 = 39 and 3(8) + 14 + 1 = 39.",
      answers: [
        [
          "full",
          "[[0|Distributive property: 8x - 12 - 5 = 3x + 3 + 2x + 1.]] [[1|Combine like terms: 8x - 17 = 5x + 4.]] [[2|Subtract 5x and add 17 on both sides, 3x = 21, by the subtraction and addition properties of equality.]] Division property: [[3|x = 7. Check: left is 4(11) - 5 = 39, right is 3(8) + 14 + 1 = 39.]]",
          "Full marks. Each line has a reason beside it, and the check settles it.",
        ],
        [
          "full",
          "Step 1, [[0|distribute the 4 and the 3 (distributive property)]], gives 8x - 12 - 5 = 3x + 3 + 2x + 1. Step 2 is [[1|combining like terms on each side, 8x - 17 = 5x + 4]]. Step 3: [[2|3x = 21 by subtracting 5x and adding 17 to both sides, the properties of equality]]. [[3|x = 7 after dividing by 3, and when I plug it in both sides equal 39]].",
          "All four marks. Naming both sides in the distribution step is the detail that many students skip.",
        ],
        [
          "partial",
          "[[0|Distribute: 8x - 12 - 5 = 3x + 3 + 2x + 1.]] [[1|Combine: 8x - 17 = 5x + 4.]] Then I move 5x over so 13x = 21 and x = 21/13.",
          "Your first two steps are correct. Moving 5x to the other side means subtracting 5x from both sides, which gives 3x, not 13x. Check by substituting.",
        ],
        [
          "partial",
          "8x - 12 - 5 = 5x + 4 so [[1|8x - 17 = 5x + 4]]. [[2|3x = 21]]. [[3|x = 7 and it checks since 39 = 39.]]",
          "The algebra and the check are right. Missing are the reasons beside each step and the distribution step. Name each property.",
          true,
        ],
        [
          "weak",
          "8x - 3 - 5 = 3x + 1 + 2x + 1 so 8x - 8 = 5x + 2 and 3x = 10.",
          "When you distribute 4 over (2x - 3), the 4 multiplies both terms, so you get -12, not -3. Same for the 3 over (x + 1).",
        ],
        [
          "weak",
          "[[3|x = 7]] because I tried numbers until it worked.",
          "Guessing and checking can find an answer, but this question asks you to show the steps and the reasons. Write each step and name the property.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Equations and inequalities with letter coefficients; graphs as solution sets",
  note: `
## Objectives

Students will be able to:

1. solve linear equations and inequalities in one variable, including those whose coefficients are letters;
2. explain that the graph of an equation in two variables is the set of all its solutions.

## Materials

Whiteboards, graph paper, a printed number line for inequality graphs, quiz.

## Starter (8 minutes)

Write ax + 3 = 11 and ask students to solve it for x. Some will say "I can't, it has two letters." Ask them to solve 5x + 3 = 11 first, then replace 5 with a, and compare the steps. Conclude that letters can be treated like numbers.

## Main activity

1. Solve ax - b = cx + d for x. Do it with the team in four steps: collect the x terms, factor, divide, and note that a minus c cannot be zero. Check with a = 5, b = 2, c = 3, d = 8.
2. Inequalities: solve -3x + 7 > 22 and discuss why multiplying or dividing by a negative number flips the sign. Use a number line to test one value from each side.
3. Graph y = (1/2)x - 4 and test the points (6, -1) and (8, 1). Ask: "What is the line, really?" Land on "all and only the solutions."

## Checking for understanding

Whiteboards on a compound inequality. Look for students who apply the operation to only the middle part.

## Exit ticket

Is (8, 1) on the graph of y = (1/2)x - 4? How do you know, and which side of the line is it on?
`,
  reading: [
    "Letters as coefficients, and what a graph really is",
    `
When you solve 5x + 3 = 11, you subtract 3 and then divide by 5. If you replace the 5 with a letter a, nothing about the method changes. Subtract 3 from both sides to get ax = 8 and then divide by a to get x = 8/a. The answer is a formula, and it tells you something real: it works for every nonzero value of a. This is what mathematicians mean when they say they are solving "in general."

Letters also let you solve for a variable that appears on both sides. Take ax - b = cx + d. Get all the x terms on one side: ax - cx = d + b. Now factor out x to get x(a - c) = d + b, and divide by (a - c) to get x = (d + b)/(a - c). The division is only allowed when a - c is not zero, so the answer holds only if a is different from c. Test it with numbers: with a = 5, b = 2, c = 3, d = 8 you get x = 10/2 = 5, and both sides equal 23 when x = 5.

Inequalities follow the same rules with one new one. Adding or subtracting the same number keeps the sign. Multiplying or dividing by a positive number keeps the sign. But multiplying or dividing by a negative number reverses it. Solve -3x + 7 > 22: subtract 7 to get -3x > 15, then divide by -3 and reverse the sign: x < -5. You can confirm with a test value. Try x = -6: -3(-6) + 7 = 25, which is greater than 22, so it works. Try x = 0: 7 is not greater than 22, so it does not. A compound inequality such as -4 <= 2x - 6 < 8 is solved by doing the same operation to all three parts: add 6 to get 2 <= 2x < 14 and divide by 2 to get 1 <= x < 7.

Finally, what is a graph? The graph of y = (1/2)x - 4 is not just a picture of a line. It is the set of all pairs (x, y) that make the equation true, and every point on the line is one of those pairs. The point (6, -1) is on the line because (1/2)(6) - 4 = -1. The point (8, 1) is not, because (1/2)(8) - 4 = 0 and not 1. It lies above the line, where y is greater than the value the equation gives.
`,
  ],
  cards: [
    ["Solving for x in general", "Using letters for the coefficients and finding a formula for x in terms of them."],
    ["Restriction", "A value a letter cannot take, such as a - c = 0 when you are dividing by a - c."],
    ["Factoring out a variable", "Rewriting ax - cx as x(a - c) so the variable is no longer split between terms."],
    ["Inequality reversal rule", "Multiplying or dividing both sides of an inequality by a negative number reverses the inequality sign."],
    ["Compound inequality", "Two inequalities joined together, such as 1 <= x < 7, solved by doing the same to every part."],
    ["Test value", "A number you substitute to see whether it satisfies an inequality, used to catch sign errors."],
    ["Graph of an equation", "The set of all points whose coordinates satisfy the equation."],
    ["Boundary line", "The line y = mx + b that separates the points where y is greater from those where y is less."],
  ],
  closed: [
    [
      "Solve ax + 3 = 11 for x, where a is not 0.",
      ["x = 14/a", "x = 8a", "x = 8/a", "x = a - 8"],
      "C",
    ],
    [
      "Solve -3x + 7 > 22.",
      ["x > -5", "x < -5", "x > 5", "x < 5"],
      "B",
    ],
    [
      "Solve mx - n = px + q for x, where m is not equal to p.",
      ["x = (q - n)/(m - p)", "x = (q + n)/(m + p)", "x = (q + n)/(m - p)", "x = (n + q)/(p - m)"],
      "C",
    ],
    [
      "Which statement about the graph of y = 3x - 7 is true?",
      [
        "Only the intercepts of the line are solutions of the equation",
        "Every point on the line is a solution, and every solution is a point on the line",
        "Points above the line are also solutions of the equation",
        "The line shows only the solutions with whole numbers",
      ],
      "B",
    ],
    [
      "Solve the compound inequality -4 <= 2x - 6 < 8.",
      ["1 <= x < 7", "2 <= x < 14", "-5 <= x < 1", "1 < x <= 7"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Solve ax - b = cx + d for x, where a is not equal to c. Show each step, say why a is not allowed to equal c, and check your formula using a = 5, b = 2, c = 3, d = 8.",
      scheme: [
        "Collects the x terms on one side, ax - cx = d + b",
        "Factors and divides to get x = (d + b)/(a - c)",
        "States that a - c must not be 0, so a cannot equal c",
        "Checks with the numbers: x = 5 and both sides equal 23",
      ],
      model:
        "Subtract cx from both sides and add b to both sides: ax - cx = d + b. Factor: x(a - c) = d + b. Divide by (a - c): x = (d + b)/(a - c). This needs a - c not equal to 0, because division by 0 is undefined. With a = 5, b = 2, c = 3, d = 8: x = 10/2 = 5. Check: 5(5) - 2 = 23 and 3(5) + 8 = 23.",
      answers: [
        [
          "full",
          "[[0|Subtract cx and add b on both sides to get ax - cx = d + b.]] [[1|Factor out x: x(a - c) = d + b, so x = (d + b)/(a - c).]] [[2|We divide by a - c, so it can't be zero, which means a can't equal c.]] [[3|With the numbers, x = 10/2 = 5, and 5(5) - 2 = 23 and 3(5) + 8 = 23.]]",
          "Full marks. The check with real numbers is the best way to trust a general formula.",
        ],
        [
          "full",
          "I want the x's together so [[0|ax - cx = d + b]]. [[1|x(a - c) = d + b, so divide both sides by (a - c) and x = (d + b) / (a - c)]]. [[2|If a = c then a - c = 0 and you can't divide by 0, so a has to be different from c]]. [[3|Plugging in: (8 + 2)/(5 - 3) = 5. Left: 25 - 2 = 23, right: 15 + 8 = 23.]]",
          "All four marks. Linking the restriction to division by zero is exactly what the question asked.",
        ],
        [
          "partial",
          "[[0|ax - cx = d + b]], then x = d + b - a - c. With the numbers that is 10 - 8 = 2.",
          "The first step is right. After it, x is multiplied by (a - c), so you divide by it. You cannot subtract the letters. Substituting x = 2 would have shown the mistake.",
        ],
        [
          "partial",
          "ax - cx = d + b so [[1|x(a - c) = d + b and x = (d + b)/(a - c)]]. That checks: x = 5.",
          "The algebra and the check are correct. Say why a cannot equal c, and show the left and right sides for the check.",
          true,
        ],
        [
          "weak",
          "ax - b = cx + d, so a - b = c + d, and x = d + b over a - c.",
          "The final formula is almost right, but the step before it is not valid: you cannot just remove the x from each side. Collect the x terms first, then factor.",
        ],
        [
          "weak",
          "[[3|x = 5 because 10 divided by 2 is 5]].",
          "A check needs both sides of the original equation. Substitute x = 5 into 5x - 2 and 3x + 8. And show how you got the general formula first.",
        ],
      ],
    },
    {
      prompt:
        "A student claims the graph of y = (1/2)x - 4 is the set of all solutions of the equation. Check whether (6, -1) and (8, 1) lie on the graph, and explain what the claim means. Which side of the line is (8, 1) on?",
      scheme: [
        "Shows (6, -1) is on the graph: (1/2)(6) - 4 = -1",
        "Shows (8, 1) is not on the graph: (1/2)(8) - 4 = 0, not 1",
        "Explains the graph holds all and only the points whose coordinates make the equation true",
        "Says (8, 1) is above the line, since 1 is more than 0",
      ],
      model:
        "At x = 6, (1/2)(6) - 4 = -1, so (6, -1) is a solution and is on the line. At x = 8, (1/2)(8) - 4 = 0, which is not 1, so (8, 1) is not on the line. The claim means every point on the line makes the equation true and every pair that makes it true is on the line. The point (8, 1) is above the line because its y-value, 1, is greater than the 0 the equation gives for x = 8.",
      answers: [
        [
          "full",
          "[[0|For (6, -1): half of 6 is 3 and 3 - 4 = -1, so it is on the line.]] [[1|For (8, 1): half of 8 is 4 and 4 - 4 = 0, not 1, so it is not on the line.]] [[2|The graph is the set of every point that makes the equation true and nothing else.]] [[3|(8, 1) is above the line because the line is at 0 when x is 8 and 1 is higher.]]",
          "Full marks. Comparing 1 to the 0 the equation gives is the cleanest way to say which side of the line the point is on.",
        ],
        [
          "full",
          "[[0|Plug in x = 6: 0.5(6) - 4 = -1, matches, so on the graph]]. [[1|Plug in x = 8: 0.5(8) - 4 = 0, but the point says 1, so not on the graph]]. [[2|The graph is all the solutions: if the numbers make the equation true the point is on the line, and if the point is on the line the numbers make it true]]. [[3|The line is at y = 0 at x = 8, so (8, 1) is above it]].",
          "All four marks. Saying both directions of the claim shows you know why a graph is a solution set.",
        ],
        [
          "partial",
          "[[0|(6, -1) works because 3 - 4 = -1]]. (8, 1) works too because 8 - 4 = 4 and 4 - 3 = 1. The graph is all the solutions.",
          "Your check of (6, -1) is correct. For (8, 1) you did not use the equation: half of 8 is 4, then 4 - 4 = 0, so it is not on the line.",
        ],
        [
          "partial",
          "[[1|(8, 1) is not on the graph since 4 - 4 is 0 and not 1]]. [[3|It is above the line]]. (6, -1) is not on it either.",
          "You are right about (8, 1) and its side of the line. Recheck (6, -1): half of 6 is 3, and 3 - 4 is -1, so it is on the line.",
          true,
        ],
        [
          "weak",
          "The graph is just a picture of the equation. Both points are on the picture because they are near the line.",
          "A graph is the exact set of solutions, not a rough picture. Near the line does not count. Substitute the coordinates and see whether the equation is true.",
        ],
        [
          "weak",
          "[[2|The graph is all the points that are solutions]]. I think (6, -1) and (8, 1) are both below the line because they have an 8 and a 6.",
          "Your sentence about the graph is right. Above or below depends on the y-value compared with what the equation gives at that x, not on the size of the x-value.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Systems of equations and inequalities",
  note: `
## Objectives

Students will be able to:

1. solve a system of two linear equations by graphing and by substitution;
2. solve a system by elimination and explain why adding the equations is a valid move;
3. graph a linear inequality in two variables and a system of them, and use the overlap to decide which points are solutions.

## Materials

Graph paper, colored pencils, a Desmos or graphing handheld for checking, the problem set.

## Starter (8 minutes)

Two cell phone plans: Plan A is $20 plus $5 per gigabyte and Plan B is $35 plus $2 per gigabyte. Ask: "When do they cost the same?" Have students graph each as a table first. Then show that the crossing point is a solution of both equations at once.

## Main activity

1. Solve by substitution: y = 2x - 3 and 4x + y = 15. Emphasize writing the substituted expression in parentheses.
2. Elimination, with the reasoning: solve 4x - 3y = 17 and 3x + 5y = -9 by multiplying to make the y coefficients opposites. Ask why adding two true equations gives a true equation, and why the solution of the system must still work.
3. Inequalities: graph y < 2x - 1 with a dashed boundary, test (0, 0), shade. Then add y >= -x + 4 and describe the overlap.

## Checking for understanding

Ask for a quick count of solutions: parallel, same, or crossing. Students show 0, one or infinity.

## Problem set

Complete the problem set. Collect it at the end of the period.
`,
  reading: [
    "Two conditions at once",
    `
A system of equations is a set of two or more equations that must be true at the same time. Consider two phone plans. Plan A costs $20 plus $5 per gigabyte, so y = 20 + 5x. Plan B costs $35 plus $2 per gigabyte, so y = 35 + 2x. A solution of the system is a pair (x, y) that satisfies both equations. Graph both lines and the point where they cross is that pair. Setting them equal gives 20 + 5x = 35 + 2x, so 3x = 15, x = 5, and then y = 45: at 5 gigabytes both plans cost $45.

Graphing shows the picture, but it can be hard to read an exact crossing point, so we use algebra. Substitution works best when a variable is already alone. For y = 2x - 3 and 4x + y = 15, replace y in the second equation with the expression 2x - 3 to get 4x + (2x - 3) = 15. Then 6x = 18 and x = 3. Put it back into either equation: y = 2(3) - 3 = 3. The solution is (3, 3), and it should make both equations true.

Elimination is useful when both equations are in standard form. The idea is to add or subtract the equations so that one variable disappears. It is legal because if A = B and C = D are both true, then A + C = B + D is true too: you are adding equal quantities to equal quantities. For 4x - 3y = 17 and 3x + 5y = -9, multiply the first by 5 and the second by 3 so the y terms become -15y and +15y. Adding gives 29x = 58, so x = 2. Substituting into the first, 8 - 3y = 17, so y = -3. The pair (2, -3) is the only point that satisfies both. A system can also have no solution, if the lines are parallel, or infinitely many, if both equations describe the same line.

An inequality such as y < 2x - 1 describes a region. Draw the boundary line y = 2x - 1 as dashed, because points on the line do not make a strict inequality true, then shade the side that does, found by testing a point such as (0, 0). A system of inequalities is graphed by shading each one and keeping the overlap. Every point in that overlap satisfies all the inequalities at once.
`,
  ],
  cards: [
    ["System of equations", "Two or more equations that must be true for the same values of the variables."],
    ["Solution of a system", "An ordered pair that makes every equation in the system true. On a graph, it is where the lines cross."],
    ["Substitution", "Replacing a variable in one equation with an equivalent expression taken from the other."],
    ["Elimination", "Adding or subtracting equations, after scaling, so one variable cancels."],
    ["Inconsistent system", "A system with no solution. Its lines are parallel."],
    ["Dependent system", "A system whose equations describe the same line, so it has infinitely many solutions."],
    ["Boundary line", "The line drawn for an inequality. It is dashed for < or >, solid for <= or >=."],
    ["Feasible region", "The overlap of the shaded regions of a system of inequalities, where every condition holds."],
  ],
  closed: [
    [
      "Solve the system y = 2x - 3 and 4x + y = 15.",
      ["(3, 3)", "(2, 1)", "(3, 9)", "(-3, -9)"],
      "A",
    ],
    [
      "Adding 3x + 2y = 16 and 5x - 2y = 8 eliminates y. What is the solution of the system?",
      ["(3, 2.5)", "(8, 12)", "(3, -3.5)", "(3, 3.5)"],
      "D",
    ],
    [
      "How many solutions does the system 2x + 3y = 6 and 4x + 6y = 18 have?",
      ["One solution", "No solution", "Infinitely many solutions", "Two solutions"],
      "B",
    ],
    [
      "Which point satisfies both y < 2x - 1 and y >= -x + 4?",
      ["(3, 4)", "(2, 3)", "(1, 3)", "(4, -1)"],
      "A",
    ],
    [
      "Plan A costs $20 plus $5 per gigabyte and Plan B costs $35 plus $2 per gigabyte. For how much data do the plans cost the same, and what is that cost?",
      ["3 gigabytes, $35", "5 gigabytes, $25", "15 gigabytes, $95", "5 gigabytes, $45"],
      "D",
    ],
  ],
  open: [
    {
      prompt:
        "Solve the system 4x - 3y = 17 and 3x + 5y = -9 by elimination. Show the multiplication step. Then explain why it is valid to add the two equations, and check your solution in the second equation.",
      scheme: [
        "Multiplies the equations by 5 and 3 so the y coefficients are opposites",
        "Adds to get 29x = 58 and finds x = 2",
        "Substitutes to find y = -3",
        "Explains that adding equal quantities to equal quantities keeps the equation true, so the solution still works",
      ],
      model:
        "Multiply the first equation by 5: 20x - 15y = 85. Multiply the second by 3: 9x + 15y = -27. Adding gives 29x = 58, so x = 2. Substituting into 4x - 3y = 17 gives 8 - 3y = 17, so y = -3. The solution is (2, -3). Check in the second: 3(2) + 5(-3) = 6 - 15 = -9. Adding is valid because each equation says two quantities are equal, and adding equal quantities to both sides of a true equation gives another true equation, so any pair that satisfies both originals satisfies the sum.",
      answers: [
        [
          "full",
          "[[0|Multiply the top equation by 5 and the bottom by 3 so the y's are -15y and +15y.]] [[1|Add: 29x = 58 so x = 2.]] [[2|Then 4(2) - 3y = 17 gives -3y = 9 so y = -3.]] [[3|Adding is allowed because both equations are true, so adding the left sides and adding the right sides is adding the same value to both sides.]] Check: 6 - 15 = -9.",
          "Full marks. The check in the second equation shows the solution works in both.",
        ],
        [
          "full",
          "To cancel y, [[0|I multiply the first equation by 5 (20x - 15y = 85) and the second by 3 (9x + 15y = -27)]]. [[1|Adding, 29x = 58, x = 2]]. Put x in: 8 - 3y = 17, [[2|so y = -3 and the solution is (2, -3)]]. [[3|It's valid because if the left side equals the right in each one, adding equal things to equal things keeps them equal]].",
          "All four marks. Your multiplying step is shown in full, which is what the question asked for.",
        ],
        [
          "partial",
          "[[0|Multiply the first by 5 and the second by 3.]] 20x - 15y = 85 and 9x + 15y = -27. Add them: 29x = 58, [[1|x = 2]]. Then y = 3. Adding is OK because it is the same thing.",
          "The setup and x = 2 are right. Substitute carefully: 8 - 3y = 17 means -3y = 9, so y = -3, not 3. For why adding works, say the quantities are equal on each side.",
        ],
        [
          "partial",
          "[[1|29x = 58 so x = 2]], [[2|y = -3]]. I multiplied and added to get rid of y.",
          "The solution is right. Show the multiplication, 20x - 15y = 85 and 9x + 15y = -27, and give the reason adding two equations is allowed.",
          true,
        ],
        [
          "weak",
          "Add the equations: 7x + 2y = 8. That's the answer.",
          "Adding the equations as they are does not cancel either variable, so you still have two unknowns. Multiply first so one of them cancels.",
        ],
        [
          "weak",
          "[[3|You can add them since they are both true]]. Then I get 4x + 3x = 7x and -3y + 5y = 2y and x = 7 and y = 2.",
          "Your reason is on the right track. But 7x + 2y is an expression with two unknowns, and you cannot just set x and y to the coefficients. Eliminate one variable first.",
        ],
      ],
    },
    {
      prompt:
        "At the Columbus Zoo gift shop, Zoe has at most $60. Posters cost $8 each and stickers cost $3 each, and she wants at least 5 items. Let x be the number of posters and y the number of stickers. Write a system of inequalities. Decide whether (4, 5) and (7, 2) are viable, with arithmetic.",
      scheme: [
        "Writes the budget inequality 8x + 3y <= 60",
        "Writes the item inequality x + y >= 5",
        "Shows (4, 5) works: 8(4) + 3(5) = 47 <= 60 and 4 + 5 = 9 >= 5",
        "Shows (7, 2) fails: 8(7) + 3(2) = 62, more than 60",
      ],
      model:
        "The budget is 8x + 3y <= 60 and the number of items is x + y >= 5, with x and y whole numbers that are at least 0. For (4, 5): 8(4) + 3(5) = 32 + 15 = 47, which is at most 60, and 4 + 5 = 9, which is at least 5, so it is viable. For (7, 2): 8(7) + 3(2) = 56 + 6 = 62, which is more than 60, so it is not viable even though 7 + 2 = 9 is enough items.",
      answers: [
        [
          "full",
          "[[0|8x + 3y <= 60]] for the money and [[1|x + y >= 5]] for the number of items. [[2|(4, 5): 8(4) + 3(5) = 32 + 15 = 47 which is under 60, and 9 items is at least 5, so it works]]. [[3|(7, 2): 56 + 6 = 62 which is over 60, so no]], even though she has 9 items.",
          "Full marks. Noticing that (7, 2) fails only the money condition shows you checked both inequalities.",
        ],
        [
          "full",
          "Money: [[0|8x + 3y <= 60]]. Items: [[1|x + y >= 5]]. Test (4, 5): [[2|8 x 4 = 32, 3 x 5 = 15, 47 is at most 60, and 4 + 5 = 9 is at least 5, so viable]]. Test (7, 2): [[3|8 x 7 = 56, plus 6 is 62 which is over her 60 dollars, so not viable]].",
          "All four marks. Both points are tested against both conditions, as the problem needs.",
        ],
        [
          "partial",
          "[[0|8x + 3y <= 60]] and x + y <= 5. (4, 5) has 9 items so it fails. (7, 2) costs 62 so it fails too.",
          "The budget inequality is right. She wants at least 5 items, so the sign is >=, which makes (4, 5) viable. Re-test it: $47 and 9 items.",
        ],
        [
          "partial",
          "[[0|8x + 3y <= 60]], [[1|x + y >= 5]]. Both points work because they have 9 items.",
          "Your two inequalities are right. Having 9 items only checks the second condition. Compute the cost: (7, 2) costs $62, which is over the $60 limit.",
          true,
        ],
        [
          "weak",
          "8 + 3 = 11 and 60 / 11 = 5.45 so she can get 5 things.",
          "Adding the two prices assumes she buys exactly one poster for each sticker. Use 8x + 3y to count the money for any numbers of each.",
        ],
        [
          "weak",
          "[[1|x + y >= 5]] and 8x + 3y >= 60 because she wants to spend the money.",
          "The item condition is right. The $60 is the most she can spend, so the sign is <=. Spending more than she has would not be possible.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "What a function is, and function notation",
  note: `
## Objectives

Students will be able to:

1. explain what makes a relation a function, using inputs and outputs, and use function notation to describe it;
2. evaluate functions for inputs in their domains and interpret the results in context.

## Materials

Index cards with student names and homeroom numbers, whiteboards, a few mapping diagrams, graphing handhelds.

## Starter (8 minutes)

Give each student a card with their name on one side and their homeroom on the other. Ask: "If I give you a name, can I always tell you one homeroom? If I give you a homeroom, can I always tell you one student?" Use the contrast to state the definition of a function: each input has exactly one output.

## Main activity

1. Look at four tables and one graph. For each, decide whether it is a function and explain with a pair that breaks the rule or a statement that it does not.
2. Evaluate f(x) = 3x^2 - 2x + 5 at x = -2, working through the squaring and the signs one line at a time.
3. Introduce a rental function C(m) = 0.35m + 22. Evaluate C(120), solve C(m) = 71 and decide a domain. Insist on a sentence with units for each answer.

## Checking for understanding

Cold-call: "What does f(5) = 12 say in words?" Students must say the input, the output, and what they stand for.

## Exit ticket

A relation lists each homeroom and the students in it. Is it a function from homeroom to student? Why or why not?
`,
  reading: [
    "Inputs, outputs and the one-output rule",
    `
A function is a rule that takes an input and gives back exactly one output. The one-output rule is the heart of it. Your school ID number is a function of you, because you have only one. But your homeroom does not determine a single student, since many students share it, so the relation from homeroom to student is not a function. The relation from student to homeroom is a function, since each student has just one homeroom. The set of allowed inputs is the domain and the set of outputs that actually occur is the range.

Mathematicians write functions with notation such as f(x). Read it as "f of x," meaning the output of f when the input is x. It is not f multiplied by x. If f(x) = 3x^2 - 2x + 5, then f(-2) means replace every x by -2: f(-2) = 3(-2)^2 - 2(-2) + 5. Square first, (-2)^2 = 4, so 3 times 4 is 12; then -2 times -2 is +4; so f(-2) = 12 + 4 + 5 = 21. A common error is to treat (-2)^2 as -4, which would give a wrong sign in the very first term.

In context, notation carries units and meaning. Suppose a truck rental charges C(m) = 0.35m + 22 dollars for m miles. Then C(120) = 0.35(120) + 22 = 42 + 22 = 64, which says that a 120-mile trip costs $64. Going the other way, C(m) = 71 means 0.35m + 22 = 71, so 0.35m = 49 and m = 140: a $71 bill corresponds to 140 miles. The input is the miles driven and the output is the cost, and swapping them gives a different question.

The domain depends on the situation. The height of a ball tossed up from the ground is h(t) = -16t^2 + 64t feet after t seconds. Mathematically any real t can be put in, but the ball is only in the air from t = 0 until it lands. Since h(t) = -16t(t - 4) is 0 at t = 4, the reasonable domain is 0 <= t <= 4. A graph is a function if no vertical line meets it more than once, because a vertical line is a single input.
`,
  ],
  cards: [
    ["Function", "A rule that gives exactly one output for each input."],
    ["Domain", "The set of inputs a function accepts, which may be limited by the situation."],
    ["Range", "The set of outputs a function produces from its domain."],
    ["Function notation", "Writing f(x) for the output of f at input x, as in f(3) = 11."],
    ["Evaluate", "Substitute a value for the input and compute the output."],
    ["Vertical line test", "A graph is a function if every vertical line crosses it at most once."],
    ["Relation", "Any set of ordered pairs. It is a function only if no input has two outputs."],
    ["Reasonable domain", "The inputs that make sense in a story, such as times from 0 to the moment a ball lands."],
  ],
  closed: [
    [
      "Which set of ordered pairs is NOT a function of x?",
      [
        "{(2, 1), (2, 4), (5, 6), (7, 8)}",
        "{(0, 4), (1, 4), (2, 4), (3, 4)}",
        "{(1, 3), (2, 5), (3, 3), (4, 7)}",
        "{(-1, 5), (0, 6), (1, 7), (2, 8)}",
      ],
      "A",
    ],
    [
      "If f(x) = 3x^2 - 2x + 5, what is f(-2)?",
      ["13", "-3", "45", "21"],
      "D",
    ],
    [
      "A ball is thrown up from the ground. Its height in feet is h(t) = -16t^2 + 64t, and it lands when h(t) = 0 again, at t = 4. Which domain best fits the model?",
      ["All real numbers", "t >= 0", "0 <= t <= 4", "0 <= t <= 64"],
      "C",
    ],
    [
      "P(w) = 15w - 40 gives the profit in dollars of a car wash fundraiser that sells w washes. What does P(8) = 80 mean?",
      [
        "Selling 80 washes makes a profit of 8 dollars",
        "Selling 8 washes makes a profit of 80 dollars",
        "P times 8 equals 80, so P is 10",
        "The car wash needs 8 washes to cover 80 dollars of costs",
      ],
      "B",
    ],
    [
      "Which equation does NOT define y as a function of x?",
      ["y = |x|", "y = x^3", "y = 2x - 5", "x = y^2"],
      "D",
    ],
  ],
  open: [
    {
      prompt:
        "A moving company's truck rental is modeled by C(m) = 0.35m + 22, where m is miles driven and C(m) is the cost in dollars. (a) Find C(120) and say what it means. (b) A customer is billed $71. Find the miles. (c) Give a reasonable domain and explain it.",
      scheme: [
        "Computes C(120) = 0.35(120) + 22 = 64",
        "Interprets: a 120-mile trip costs $64, with units",
        "Solves 0.35m + 22 = 71 to get m = 140 miles",
        "States a reasonable domain m >= 0 and explains miles cannot be negative",
      ],
      model:
        "C(120) = 0.35(120) + 22 = 42 + 22 = 64, so driving 120 miles costs $64. For a bill of $71: 0.35m + 22 = 71, so 0.35m = 49 and m = 140 miles. A reasonable domain is m >= 0, because miles driven cannot be negative.",
      answers: [
        [
          "full",
          "[[0|C(120) = 0.35 x 120 + 22 = 42 + 22 = 64]]. [[1|It means a trip of 120 miles costs $64]]. For $71, 0.35m + 22 = 71, 0.35m = 49, [[2|m = 140 miles]]. [[3|The domain is m >= 0 because you can't drive negative miles]].",
          "Full marks. Each answer is in a sentence with its unit.",
        ],
        [
          "full",
          "(a) [[0|Plug in 120: 0.35(120) = 42, 42 + 22 = 64]]. [[1|So 120 miles costs 64 dollars.]] (b) 71 - 22 = 49 and [[2|49 / 0.35 = 140, so 140 miles]]. (c) [[3|Domain is all m greater than or equal to 0, since mileage can't be less than zero]].",
          "All four marks. Working backward from the bill is the part many students find hard, and yours is correct.",
        ],
        [
          "partial",
          "[[0|C(120) = 0.35(120) + 22 = 64]]. For (b) 71 / 0.35 = 202.9 miles. (c) m >= 0.",
          "Part (a) is right. In (b) you must subtract the $22 fixed charge before dividing by 0.35. Also say in words what C(120) means.",
        ],
        [
          "partial",
          "C(120) = 0.35 x 120 + 22 = 64 dollars. [[2|140 miles for $71]]. All real numbers are OK for m.",
          "Your calculations are right, and you found 140. Miles cannot be negative, so the domain is m >= 0, not all real numbers.",
          true,
        ],
        [
          "weak",
          "C(120) means C times 120, which is 0.35 x 120 x 22 = 924.",
          "C(120) is the cost when m = 120, not C multiplied by 120. Put 120 in for m: 0.35(120) + 22.",
        ],
        [
          "weak",
          "[[3|The domain is m >= 0]]. C(120) = 120 + 0.35 + 22 = 142.35. 71 = 0.35m so m = 202.9.",
          "The domain is right. In C(120), 0.35 multiplies the miles, so you compute 0.35 x 120, not add. Recheck.",
        ],
      ],
    },
    {
      prompt:
        "Hilltop High keeps a list of each student's homeroom. Is the homeroom a function of the student? Is the student a function of the homeroom? Use the definition of a function and a specific example in your explanation.",
      scheme: [
        "States the definition: each input has exactly one output",
        "Says homeroom is a function of the student, because each student has exactly one homeroom",
        "Says student is not a function of homeroom, because one homeroom can have many students",
        "Gives a specific example, such as Room 214 matching two different students",
      ],
      model:
        "A function gives exactly one output for each input. The homeroom is a function of the student, because each student has only one homeroom. The student is not a function of the homeroom, because one input, Room 214, has many students as outputs, for instance Ava and Ben, so it breaks the one-output rule.",
      answers: [
        [
          "full",
          "[[0|A function has one output for every input.]] [[1|Student to homeroom is a function since a student is only in one homeroom.]] [[2|Homeroom to student isn't because one homeroom has a lot of students.]] [[3|Like homeroom 214 would go to Ava and also to Ben, two outputs for one input.]]",
          "Full marks. Your pair, Room 214 to Ava and Ben, is exactly the kind of example that breaks the rule.",
        ],
        [
          "full",
          "In a function [[0|every input gets exactly one output, not two]]. If the student is the input, [[1|each student has one homeroom so it's a function]]. If the homeroom is the input, [[2|it is not a function because the input can match many students]]. [[3|For example Room 108 has 24 students, so 108 would have 24 outputs]].",
          "All four marks. Using the number of students as the count of outputs is a clear way to show it fails.",
        ],
        [
          "partial",
          "[[0|A function means each input has exactly one output.]] [[1|The student to homeroom is a function.]] The homeroom to student is also a function because they are connected.",
          "The first two points are right. Being connected is not enough. A function needs one output per input, and a homeroom connects to many students.",
        ],
        [
          "partial",
          "Student to homeroom is a function. [[2|Homeroom to student is not, because lots of students are in the same room.]] [[3|Like Room 214 and Ava and Ben.]]",
          "You have the idea and a good example. Add the definition of a function, one output per input, and say why student to homeroom is a function.",
          true,
        ],
        [
          "weak",
          "Neither is a function because they are not numbers.",
          "Functions do not have to use numbers. Any rule that gives each input exactly one output is a function, including name to homeroom.",
        ],
        [
          "weak",
          "[[0|A function is when each input has one output]], so both are functions since every student has a homeroom.",
          "You stated the definition well. Apply it to each direction: a student has only one homeroom, but a homeroom has many students, so one direction fails.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Reading graphs and tables, and average rate of change",
  note: `
## Objectives

Students will be able to:

1. read a graph or table of a function and describe where it rises, falls and reaches its intercepts;
2. calculate and interpret the average rate of change of a function over an interval.

## Materials

Printed graphs of a roller coaster height and a snow depth table, rulers, whiteboards.

## Starter (8 minutes)

Show a table of snow depth at Cleveland Hopkins airport during a lake-effect storm: 0, 2.4, 5.1, 6.0 and 6.0 inches at hours 0, 3, 6, 9 and 12. Ask: "When did the snow fall fastest? How do you know?" Students must give a number with a unit, not just a time.

## Main activity

1. Teach the formula: the average rate of change from a to b is (f(b) - f(a)) / (b - a). Do the snow table from hour 3 to hour 9, writing the units on each line.
2. Describe a graph in words from a list of points: where it rises, where it falls, intercepts, maximum and minimum. Give the class a sketch with a few labeled points and ask for a one-paragraph description.
3. Compare average rates on two intervals for f(x) = x^2 and discuss why they differ although it is the same function.

## Checking for understanding

Ask: "Does an average rate of change of 0.6 inches per hour mean the snow fell at exactly 0.6 inches per hour all the time?" Take answers and push for the idea of an average over an interval.

## Exit ticket

The function has f(0) = 4, f(3) = 10, f(7) = 10 and f(10) = 1. Find the average rate of change from x = 7 to x = 10 and say what the sign tells you.
`,
  reading: [
    "How fast on average",
    `
A table or a graph gives you the whole story of a function, and the skill is to read it in words. Look first at where the graph is going. A function is increasing on an interval when its outputs go up as the inputs go up, and decreasing when they go down. Its peaks and valleys are the maximum and minimum values. The x-intercepts are the inputs where the output is 0, and the y-intercept is the output when the input is 0. In a real situation each of these carries a meaning. For a tank draining by V(t) = 480 - 12t gallons after t minutes, the y-intercept (0, 480) says the tank starts with 480 gallons, and the t-intercept (40, 0) says that it is empty after 40 minutes.

Often you also want to know how quickly a quantity is changing. For a linear function the answer is its slope. For other functions the rate keeps changing, so we ask for the average rate of change over an interval from x = a to x = b: (f(b) - f(a)) / (b - a). It is the change in output divided by the change in input, and it is the slope of the straight line, called a secant line, through the two points on the graph.

Example. The table shows the depth of snow at Cleveland Hopkins airport in a storm: 0 inches at hour 0, 2.4 inches at hour 3, 5.1 inches at hour 6, 6.0 inches at hour 9 and 6.0 inches at hour 12. From hour 3 to hour 9, the depth went from 2.4 to 6.0 inches, so the average rate is (6.0 - 2.4) / (9 - 3) = 3.6 / 6 = 0.6 inches per hour. From hour 9 to hour 12 it is (6.0 - 6.0) / 3 = 0, which says the snow depth stopped changing. Comparing the three-hour blocks, the rate from hour 3 to hour 6 is 2.7 / 3 = 0.9 inches per hour, the highest of the blocks, so that is when the snow piled up fastest.

Notice the units. An average rate always has output units per input unit, such as inches per hour or dollars per week. A negative average rate means the output fell, on average, over that interval. And be careful with the word average. It does not say the function changed at a constant rate. For f(x) = x^2 from x = 1 to x = 4, the average rate is (16 - 1) / 3 = 5, even though the function is changing slowly near 1 and much faster near 4.
`,
  ],
  cards: [
    ["Increasing", "A function is increasing on an interval if its outputs rise as the inputs rise."],
    ["Decreasing", "A function is decreasing on an interval if its outputs fall as the inputs rise."],
    ["Maximum", "The greatest output a function reaches, found at the highest point of the graph."],
    ["Intercept", "A point where the graph meets an axis. The x-intercept has output 0 and the y-intercept has input 0."],
    ["Average rate of change", "(f(b) - f(a)) / (b - a), the change in output per unit change in input over an interval."],
    ["Secant line", "A line through two points of a graph. Its slope is the average rate of change between them."],
    ["Units of a rate", "Output units per input units, such as inches per hour."],
    ["Constant function on an interval", "A function whose output does not change there. Its average rate of change is 0."],
  ],
  closed: [
    [
      "Temperatures in Columbus on a winter morning: 20 degrees F at 0 hours, 26 at 2 hours, 31 at 4 hours and 33 at 6 hours. What is the average rate of change from hour 2 to hour 6?",
      ["7 degrees per hour", "0.57 degrees per hour", "1.75 degrees per hour", "5.5 degrees per hour"],
      "C",
    ],
    [
      "A function has f(0) = 4, f(3) = 10, f(7) = 10 and f(10) = 1. Over which interval is its average rate of change 0?",
      ["From x = 0 to x = 3", "From x = 7 to x = 10", "From x = 0 to x = 10", "From x = 3 to x = 7"],
      "D",
    ],
    [
      "V(t) = 480 - 12t gives the gallons in a tank after t minutes. What is the t-intercept and what does it mean?",
      [
        "(0, 480): the tank is empty at the start",
        "(40, 0): the tank is empty after 40 minutes",
        "(480, 0): the tank is empty after 480 minutes",
        "(0, 480): the tank holds 480 gallons at the start",
      ],
      "B",
    ],
    [
      "What is the average rate of change of f(x) = x^2 from x = 1 to x = 4?",
      ["15", "8.5", "3", "5"],
      "D",
    ],
    [
      "A student finds that the average rate of change of g over the interval from x = 2 to x = 8 is -3 points per week. Which statement must be true?",
      [
        "On average, g fell by 3 for each increase of 1 in x over that interval",
        "g equals -3 at x = 5",
        "g is decreasing at every point between x = 2 and x = 8",
        "g falls by exactly 3 in every one-unit step",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "During a lake-effect storm, snow depth at Cleveland Hopkins airport was 0 inches at hour 0, 2.4 at hour 3, 5.1 at hour 6, 6.0 at hour 9 and 6.0 at hour 12. (a) Find the average rate of change from hour 3 to hour 9 and say what it means. (b) Find it from hour 9 to hour 12 and say what it tells you. (c) Among the three-hour blocks, when did the snow depth grow fastest?",
      scheme: [
        "Computes (6.0 - 2.4) / (9 - 3) = 0.6",
        "States the units and meaning: 0.6 inches per hour on average over hours 3 to 9",
        "Finds 0 from hour 9 to hour 12 and says the depth stopped changing",
        "Identifies hours 3 to 6, at 0.9 inches per hour, as the fastest block",
      ],
      model:
        "From hour 3 to hour 9, (6.0 - 2.4) / (9 - 3) = 3.6 / 6 = 0.6 inches per hour, so the snow deepened by 0.6 inches each hour on average. From hour 9 to hour 12, (6.0 - 6.0) / 3 = 0, so the depth was not changing, because the snow had stopped. The three-hour blocks have rates 0.8, 0.9, 0.3 and 0, so the depth grew fastest from hour 3 to hour 6, at 0.9 inches per hour.",
      answers: [
        [
          "full",
          "(a) [[0|(6.0 - 2.4) / (9 - 3) = 3.6 / 6 = 0.6]]. [[1|The snow got deeper by 0.6 inches per hour on average between hours 3 and 9.]] (b) [[2|(6.0 - 6.0) / 3 = 0, so the depth didn't change, the snow stopped]]. (c) [[3|The 3 to 6 block is 2.7 / 3 = 0.9 inches per hour, which is higher than 0.8, 0.3 and 0]].",
          "Full marks. Comparing all four blocks, not just a guess, justifies your answer to part (c).",
        ],
        [
          "full",
          "(a) The change is 6.0 - 2.4 = 3.6 over 9 - 3 = 6 hours so [[0|3.6 / 6 = 0.6]]. [[1|That means on average the depth grew 0.6 inches every hour in that stretch, not that it was exactly 0.6 all the time]]. (b) [[2|It's 0 because 6.0 and 6.0 are the same, so no change in depth (the snow stopped falling or melted as much as fell)]]. (c) [[3|Hours 3 to 6 had the biggest rate, 0.9 in/hr]].",
          "All four marks. Your note that 0.6 is an average and not an exact rate is the point of this week.",
        ],
        [
          "partial",
          "[[0|(6.0 - 2.4) / (9 - 3) = 0.6]]. [[2|From 9 to 12 it is zero so no change.]] The fastest was 0 to 3 because it started from nothing.",
          "Parts (a) and (b) are right. In (c) compare the rates, not the starting depth. The 3 to 6 block had 0.9 inches per hour, higher than the 0.8 of the first block.",
        ],
        [
          "partial",
          "[[0|3.6 / 6 = 0.6]] [[1|inches per hour]]. (b) (6.0 - 6.0) = 0 so 0 inches. (c) 3 to 6 hours.",
          "Parts (a) and (c) are right. In (b), divide by the 3 hours to get a rate, and say what a rate of 0 means: the snow depth did not change.",
          true,
        ],
        [
          "weak",
          "6.0 - 2.4 = 3.6 so the rate is 3.6 inches. From 9 to 12 it is 6.0 so 6 inches. The fastest was hour 12.",
          "A rate needs a division by the length of the interval. 3.6 inches over 6 hours is 0.6 inches per hour. And the depth stayed flat after hour 9, so it did not grow fastest then.",
        ],
        [
          "weak",
          "[[0|6.0 - 2.4 divided by 9 - 3 is 0.6]]. For (b) 12 - 9 = 3 so 3 inches. The fastest was when the snow got to 6.",
          "Part (a) is right. For (b) subtract the depths, 6.0 - 6.0, before dividing by 3 hours. A rate compares how much changed per hour, and the depth did not change.",
        ],
      ],
    },
    {
      prompt:
        "The graph of a function g is described like this: it starts at (-3, -1), falls to a minimum at (0, -4), rises through (2, 0) to a maximum at (5, 6), then falls to its end at (7, 3). State where g is increasing and where it is decreasing, give the intercepts shown, and give the maximum value of g.",
      scheme: [
        "States g is increasing from x = 0 to x = 5",
        "States g is decreasing from x = -3 to x = 0 and from x = 5 to x = 7",
        "Gives the intercepts (2, 0) and (0, -4)",
        "States the maximum value is 6, at x = 5",
      ],
      model:
        "The function increases from x = 0 to x = 5, where it rises from -4 to 6. It decreases from x = -3 to x = 0 and again from x = 5 to x = 7. The x-intercept shown is (2, 0), and the y-intercept is (0, -4), because the minimum occurs at x = 0. The maximum value of g is 6, reached at x = 5.",
      answers: [
        [
          "full",
          "[[0|g goes up between x = 0 and x = 5, from -4 up to 6.]] [[1|It goes down from -3 to 0 and also from 5 to 7.]] [[2|It crosses the x-axis at (2, 0) and the y-axis at (0, -4), which is also its lowest point.]] [[3|The maximum value is 6, at x = 5.]]",
          "Full marks. Pointing out that the y-intercept is also the minimum shows careful reading of the description.",
        ],
        [
          "full",
          "Reading the points in order, it turns at the minimum and is [[0|increasing on 0 < x < 5]], and then it turns at the max. [[1|It is decreasing on -3 < x < 0 and again on 5 < x < 7]]. [[2|x-intercept is (2, 0) and y-intercept is (0, -4)]]. [[3|The max value is 6]].",
          "All four marks. Splitting the decreasing part into two intervals is exactly right.",
        ],
        [
          "partial",
          "[[0|It increases from 0 to 5.]] It decreases from 5 to 7. [[3|Max is 6.]] The intercept is (2, 0).",
          "Good on the increase and the maximum. The graph also decreases from -3 to 0, and it has a y-intercept, (0, -4), where x is 0.",
        ],
        [
          "partial",
          "[[2|The intercepts are (2, 0) and (0, -4).]] It is going up on the whole thing. The max is 5.",
          "The intercepts are right. The function is not increasing everywhere, since it falls at both ends. And the maximum value is the y-value, 6, not the x-value, 5.",
          true,
        ],
        [
          "weak",
          "The function is increasing because the numbers get bigger, from -3 to 7. The max is 7.",
          "Reading across x only shows the domain. Increasing means the output goes up. Look at the y-values: -1, then -4, then 6, then 3.",
        ],
        [
          "weak",
          "[[3|The maximum is 6]]. It is decreasing when x is positive and increasing when x is negative.",
          "The maximum is right. The direction depends on the y-values, not on the sign of x. The graph decreases from -3 to 0 and rises from 0 to 5.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Linear functions: intercepts and writing the function",
  note: `
## Objectives

Students will be able to:

1. graph linear functions and show the intercepts, and say what they mean;
2. write a linear function that describes a relationship between two quantities from a table or two data points.

## Materials

Graph paper, rulers, taxi-fare and savings data cards, whiteboards.

## Starter (8 minutes)

Give the table: x = 0, 1, 2, 3 and y = 5, 8, 11, 14. Ask: "Is it linear? How would you check?" Students find the constant change, 3, and then write y = 3x + 5. Ask what the 5 and the 3 measure if x is weeks and y is dollars.

## Main activity

1. From two data points: a taxi charges $9.50 after 2 miles and $19.50 after 7 miles. Find the slope, find the intercept by substituting a point, write F(m), and interpret both numbers.
2. Intercepts: Jada has $240 and spends $15 per week, S(w) = 240 - 15w. Find both intercepts, say what they mean, and state the domain that makes sense. Graph it with a ruler.
3. Sort four tables into linear and not linear by checking for a constant rate of change, then write the rule for the linear ones.

## Checking for understanding

Ask: "What would change in the equation if the taxi started charging $7 instead of $5.50?" Look for the answer that only the intercept changes.

## Exit ticket

A hot tub starts at 104 degrees F and cools at 0.8 degrees per minute. Write T(t) and find when it reaches 80 degrees.
`,
  reading: [
    "A line is a story with a start and a rate",
    `
A linear function changes by the same amount for every one-unit step in the input. That constant amount is the slope, written m, and the output when the input is 0 is the initial value, written b. Together they give the function f(x) = mx + b. Every linear function has a graph that is a straight line, and in a story the two numbers mean something specific: the slope is the rate of change, with units of output per input, and the intercept is where the quantity starts.

Two quick tests tell you whether a table is linear. Check that each step in x is the same size and that each step in y is the same size too. The table x = 0, 1, 2, 3 and y = 5, 8, 11, 14 changes by 3 every time, so the function is y = 3x + 5. The table y = 2, 4, 8, 16 doubles each time rather than adding the same amount, so it is not linear.

To write a linear function from two data points, find the slope first, then find b. A taxi charges $9.50 for a 2-mile ride and $19.50 for a 7-mile ride. The slope is (19.50 - 9.50) / (7 - 2) = 10 / 5 = 2 dollars per mile. Substitute a point into F(m) = 2m + b: 9.50 = 2(2) + b gives b = 5.50. So F(m) = 2m + 5.50. The $5.50 is the starting fee, because it is the cost of a 0-mile ride, and the 2 is the cost for each mile.

The intercepts are the quickest points to graph. Jada has $240 saved and spends $15 each week, so S(w) = 240 - 15w. The vertical intercept is (0, 240), her savings at the start. To find the horizontal intercept, set S(w) = 0: 240 - 15w = 0 gives w = 16, so the point is (16, 0) and she runs out of money after 16 weeks. The slope is -15 dollars per week, negative because the balance is falling. The domain that makes sense is 0 <= w <= 16, because there are no negative weeks and she cannot spend money she does not have. Draw the graph as a line segment between those two points, not a line that continues forever.

Equations of the same line can look different. The standard form 2x + 5y = 20 has intercepts (10, 0) and (0, 4) and, solved for y, becomes y = -(2/5)x + 4. Which form to use depends on the question: slope-intercept form shows the rate and the start, while standard form is handy for finding intercepts.
`,
  ],
  cards: [
    ["Linear function", "A function with a constant rate of change, written f(x) = mx + b."],
    ["Slope", "The constant rate of change, (y2 - y1) / (x2 - x1), with units of output per input."],
    ["Initial value", "The output when the input is 0. It is the y-intercept b."],
    ["Slope-intercept form", "y = mx + b, which shows the rate and the starting value."],
    ["Standard form", "Ax + By = C, convenient for finding both intercepts."],
    ["Break-even point", "The input where profit is 0, which is the x-intercept of a profit function."],
    ["Reasonable domain", "The inputs that make sense in the situation, such as 0 to 16 weeks."],
    ["Constant rate of change", "The same change in output for every one-unit change in input, which tells you a table is linear."],
  ],
  closed: [
    [
      "A line passes through (1, 5) and (4, 14). Which equation is the line?",
      ["y = 3x + 5", "y = 3x - 2", "y = 3x + 2", "y = 9x - 4"],
      "C",
    ],
    [
      "What are the intercepts of the graph of 2x + 5y = 20?",
      ["(10, 0) and (0, 4)", "(5, 0) and (0, 2)", "(4, 0) and (0, 10)", "(20, 0) and (0, 20)"],
      "A",
    ],
    [
      "A hot tub cools by T(t) = 104 - 0.8t degrees F after t minutes. What does the slope tell you?",
      [
        "The tub starts at 0.8 degrees",
        "The tub cools 0.8 degrees each minute",
        "The tub reaches 0 degrees after 0.8 minutes",
        "The tub warms 0.8 degrees each minute",
      ],
      "B",
    ],
    [
      "A fundraiser's profit is P(c) = 4c - 60 dollars after washing c cars. How many cars must be washed to break even?",
      ["15", "240", "56", "60"],
      "A",
    ],
    [
      "Which table shows a linear function?",
      [
        "x: 0, 1, 2, 3 and y: 2, 4, 8, 16",
        "x: 0, 1, 2, 3 and y: 1, 4, 9, 16",
        "x: 0, 1, 2, 3 and y: 10, 7, 5, 4",
        "x: 0, 1, 2, 3 and y: 5, 8, 11, 14",
      ],
      "D",
    ],
  ],
  open: [
    {
      prompt:
        "A taxi in Columbus charges $9.50 for a 2-mile ride and $19.50 for a 7-mile ride, and the fare is linear in the miles m. Find the slope, write the function F(m), and say what each number in it means.",
      scheme: [
        "Finds the slope (19.50 - 9.50) / (7 - 2) = 2",
        "Interprets the slope as 2 dollars per mile",
        "Finds the intercept 5.50 by substituting a point",
        "Writes F(m) = 2m + 5.50 and says 5.50 is the starting fee",
      ],
      model:
        "Slope = (19.50 - 9.50) / (7 - 2) = 10 / 5 = 2, which means the fare rises 2 dollars for each additional mile. Substitute (2, 9.50): 9.50 = 2(2) + b, so b = 5.50. The function is F(m) = 2m + 5.50. The 5.50 is the fee before any miles are traveled.",
      answers: [
        [
          "full",
          "[[0|The slope is (19.50 - 9.50) / (7 - 2) = 10 / 5 = 2.]] [[1|That is 2 dollars per mile.]] [[2|Put in (2, 9.50): 9.50 = 2(2) + b so b = 5.50.]] [[3|F(m) = 2m + 5.50 and the 5.50 is the flat starting fee even for 0 miles.]]",
          "Full marks. Naming the starting fee as the fare for zero miles connects the intercept to the story.",
        ],
        [
          "full",
          "Rate of change: [[0|(19.5 - 9.5) / (7 - 2) = 2]]. [[1|So each mile costs $2.]] To get b: [[2|9.5 = 2 x 2 + b, b = 5.5]]. [[3|F(m) = 2m + 5.5. The 5.5 is the starting charge in dollars, and I checked 2(7) + 5.5 = 19.5]].",
          "All four marks. Checking with the second point confirms your function.",
        ],
        [
          "partial",
          "[[0|slope = 10 / 5 = 2]] [[1|dollars per mile]]. So F(m) = 2m + 9.50, and 9.50 is the start.",
          "The slope is right. The 9.50 is the fare for 2 miles, not for 0. Substitute it: 9.50 = 2(2) + b, so b = 5.50.",
        ],
        [
          "partial",
          "[[2|9.50 = 2(2) + b so b = 5.50]]. [[3|F(m) = 2m + 5.50]]",
          "The function is right. Show how you found the slope, 10 divided by 5, and say that 2 means dollars per mile.",
          true,
        ],
        [
          "weak",
          "9.50 + 19.50 = 29 and 29 / 2 = 14.5. So F(m) = 14.5m.",
          "Averaging the two fares does not give a rate. The rate is the change in fare divided by the change in miles.",
        ],
        [
          "weak",
          "[[1|It's 2 dollars per mile]] because 19.50 - 9.50 = 10 and 7 - 2 = 5. F(m) = 10m + 5.",
          "Good that you found the rate. Using the difference 10 as the slope skips the division by 5. The slope is 2, and the start is 5.50.",
        ],
      ],
    },
    {
      prompt:
        "Jada has $240 saved and spends $15 each week, so her savings are S(w) = 240 - 15w dollars after w weeks. Find both intercepts, explain what each means, explain what the slope tells you, and give a reasonable domain.",
      scheme: [
        "Finds the vertical intercept (0, 240) and says it is the starting savings",
        "Solves 240 - 15w = 0 to find the horizontal intercept w = 16 and says the money runs out after 16 weeks",
        "Says the slope is -15 dollars per week, the rate she spends",
        "Gives the domain 0 <= w <= 16 and explains why",
      ],
      model:
        "At w = 0, S = 240, so the vertical intercept is (0, 240): she starts with $240. Setting S(w) = 0: 240 - 15w = 0 gives w = 16, so (16, 0) means her savings run out after 16 weeks. The slope is -15 dollars per week, so her balance falls 15 dollars each week. A reasonable domain is 0 <= w <= 16, since there are no negative weeks and she cannot spend money she no longer has.",
      answers: [
        [
          "full",
          "[[0|When w = 0, S = 240, so (0, 240) is what she has at the start.]] [[1|240 - 15w = 0 gives w = 16, so (16, 0) means she is out of money after 16 weeks.]] [[2|The slope is -15, which is dollars per week going down.]] [[3|The domain is w from 0 to 16 because after 16 weeks she'd be negative.]]",
          "Full marks. Each intercept and the slope is described with the right unit.",
        ],
        [
          "full",
          "[[0|The y-intercept is (0, 240), her savings before any weeks go by]]. [[1|For the x-intercept: 15w = 240, w = 16, so (16, 0), meaning the savings hit zero at week 16]]. [[2|The slope -15 means she loses $15 every week]]. [[3|Domain: 0 <= w <= 16, because there are no weeks before the start and she can't spend what she doesn't have]].",
          "All four marks. Your reasoning for the end of the domain shows that you read the situation, not just the algebra.",
        ],
        [
          "partial",
          "[[0|(0, 240) is the start]]. [[1|(16, 0) because 240 / 15 = 16, she runs out in 16 weeks]]. The slope is 15 and the domain is all numbers.",
          "The intercepts are right. The slope is -15 since the balance goes down, and the domain should be limited to 0 to 16 weeks.",
        ],
        [
          "partial",
          "The intercepts are 240 and 16. [[2|The slope is -15 dollars each week]]. [[3|She can't have negative weeks or negative money so w goes from 0 to 16]].",
          "The slope and domain are right. Write the intercepts as points, (0, 240) and (16, 0), and say what each one means.",
          true,
        ],
        [
          "weak",
          "The y-intercept is 15 because that's the number next to w. The x-intercept is 240.",
          "The 15 is the slope, not an intercept. At w = 0 the savings are 240, so (0, 240) is the vertical intercept. Set S = 0 to find the other.",
        ],
        [
          "weak",
          "[[2|The slope is -15 dollars per week]]. The domain is w >= 0 forever because time keeps going.",
          "The slope is right. But she has only $240, and at 16 weeks it is gone, so the model stops making sense after that. The domain ends at 16.",
        ],
      ],
    },
  ],
};

writeCourse("honors-algebra-i-grade-9.json", "Honors Algebra I", "Grade 9", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
