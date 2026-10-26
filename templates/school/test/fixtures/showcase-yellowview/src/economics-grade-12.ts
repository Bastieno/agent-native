import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Economics, Grade 12, Quarter 1. Scarcity, markets, decisions and personal
 * finance, with data from the Bureau of Labor Statistics.
 * Standards: C3 Framework, Dimension 2 Economics and Dimension 3, in the
 * school's own words.
 */

const w1: WeekInput = {
  topic: "Scarcity, opportunity cost, incentives and thinking at the margin",
  note: `
## Objectives

Students will be able to:

1. explain scarcity, opportunity cost and trade-offs, and apply them to a personal decision;
2. analyze how incentives influence the choices of people and the costs and benefits for different groups;
3. use marginal benefits and marginal costs to argue for or against a solution to an economic problem.

## Materials

A decision card for each student (a $60 Saturday: Cedar Point ticket, 5 hours of work at $12 an hour, or a study session), a marginal-analysis table for studying (extra points on a chemistry exam by hour), calculators, an incentive scenario sheet (a bus fare cut, a plastic-bag fee, a late fee), and the exit ticket.

## Starter (8 minutes)

Display: "You have one free Saturday. Options: work 5 hours at 12 dollars an hour, go to Cedar Point with a 60-dollar ticket, or study for the ACT." Ask students to rank their choices and then to name the single thing they gave up by choosing the first. Introduce the definition: opportunity cost is the value of the next-best alternative given up.

## Main activity

1. Scarcity and trade-offs. Draw out that scarcity exists because wants are unlimited and resources are limited, even for people with a lot of money, because time is limited. Students recalculate the cost of the Cedar Point day: 60 dollars for the ticket plus 60 dollars in lost wages from the five hours not worked, 120 dollars in all.
2. Incentives. Using the scenario sheet, students identify the incentive in each case, whether it is positive or negative, and who gains or loses: riders, taxpayers, drivers and businesses in a bus fare cut; shoppers and stores in a plastic-bag fee.
3. Marginal thinking. Give the table of extra points on the chemistry exam by hour of study: hour 1 gives 12 points, hour 2 gives 8, hour 3 gives 5, hour 4 gives 2. Assume each hour costs 4 points of other schoolwork. Students decide how many hours to study (3) and explain why they stop where marginal benefit falls below marginal cost.

## Checking for understanding

Mini whiteboards: "State the opportunity cost of this choice in one sentence."

## Exit ticket

Describe a decision you made this week and name its opportunity cost and one marginal benefit.
`,
  reading: [
    "Choosing with limits: opportunity cost, incentives and the margin",
    `
Economics begins with a plain fact: **scarcity**. People want more than they can have, and the resources used to make things, such as land, labor and capital, are limited. Scarcity does not mean poverty. A billionaire still has only 24 hours in a day. Because we cannot have everything, we must choose, and every choice involves a **trade-off**, giving up one thing to get another. The most useful measure of what is given up is **opportunity cost**, the value of the next-best alternative. It is not the sum of everything you did not choose, only the best one you passed up.

Suppose a high school senior in Columbus has one free Saturday. She could work five hours at a grocery store for 12 dollars an hour, which earns 60 dollars, or spend 60 dollars on a ticket to Cedar Point. The ticket costs 60 dollars in cash, but she also gives up the 60 dollars she would have earned, so the economic cost of the trip is 120 dollars. Opportunity cost includes money and everything else of value, such as time. This is why an hour of study has a cost even when it costs nothing to open the book.

**Incentives** are rewards or penalties that influence choices. A **positive incentive** encourages an action, such as a discount on gas for buying groceries. A **negative incentive** discourages it, such as a late fee at the library. When incentives change, behavior changes, but there can be winners and losers. If a city cuts bus fares to encourage riders, people who ride gain, taxpayers may cover the lost fares and drivers may enjoy less traffic. If a store charges ten cents for a plastic bag, shoppers bring reusable bags and the store buys fewer bags, but shoppers who forget their bags pay more. A careful analyst names who is affected, how and by how much, and not just whether the policy "works."

The most powerful tool in economics is thinking at the **margin**, which means comparing the extra benefit of one more unit with the extra cost. **Marginal benefit** is the added benefit, and **marginal cost** is the added cost. A rational decision-maker keeps going as long as the marginal benefit is at least the marginal cost, and stops when it is not. Consider studying for a chemistry test. The first hour raises the score by 12 points, the second by 8, the third by 5 and the fourth by only 2. If each hour costs 4 points of lost homework or sleep, the first three hours are worth it, since 12, 8 and 5 are each more than 4, but the fourth hour, with a marginal benefit of 2, is not. The best choice is three hours. Notice that the total benefit of studying is still positive at four hours, but the marginal analysis shows that the last hour is not worth it.

Marginal thinking also helps with public problems. A city thinking about adding another bus on a route compares the added riders and the reduced traffic with the added driver wages and fuel. An argument for or against the proposal is strong when it names marginal benefits and marginal costs and uses numbers.

The key habit is to ask: compared with what, for whom, and at the margin?
`,
  ],
  cards: [
    ["Scarcity", "Limited resources versus unlimited wants, which forces choices."],
    ["Trade-off", "Giving up one thing to get another."],
    ["Opportunity cost", "The value of the next-best alternative that you give up."],
    ["Incentive", "A reward or penalty that influences a choice."],
    ["Positive and negative incentive", "A positive incentive encourages an action; a negative one discourages it."],
    ["Marginal benefit", "The additional benefit from one more unit of an activity."],
    ["Marginal cost", "The additional cost of one more unit of an activity."],
    ["Rational choice rule", "Do more of something as long as marginal benefit is at least marginal cost."],
  ],
  closed: [
    [
      "A student can work 4 hours at 11 dollars an hour or go to a Friday night football game that costs 8 dollars to enter. What is the full economic cost of going to the game?",
      ["8 dollars", "44 dollars", "52 dollars", "36 dollars"],
      "C",
    ],
    [
      "A pizza place cuts the price of a large pizza from 14 dollars to 12 dollars on Tuesdays. This is best described as:",
      [
        "A positive incentive for customers to buy on Tuesdays",
        "A negative incentive for customers",
        "An increase in scarcity",
        "A change in opportunity cost for the owner only",
      ],
      "A",
    ],
    [
      "The marginal benefits of each additional hour of studying are 12, 8, 5 and 2 points. Each hour costs 4 points. How many hours should a rational student study?",
      ["1 hour", "2 hours", "3 hours", "4 hours"],
      "C",
    ],
    [
      "Which best describes the opportunity cost of a decision?",
      [
        "The total of all choices not made",
        "The value of the next-best alternative given up",
        "The price paid in dollars only",
        "The benefit received",
      ],
      "B",
    ],
    [
      "A city adds a 10-cent fee for plastic bags. Which group is most likely to be worse off in the short run?",
      [
        "Shoppers who forget their reusable bags",
        "Stores that buy fewer bags",
        "People who bring their own bags",
        "The environment",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Maya has one Saturday. She can (A) work 6 hours at 11 dollars an hour at a Kroger deli, (B) volunteer at a food pantry for free, or (C) study for the SAT. She chooses to work. (a) State her opportunity cost, assuming her next-best alternative is studying for the SAT, which she values at 40 dollars. (b) Explain why the opportunity cost is not the sum of all the alternatives she gave up. (c) Identify one incentive that would make her switch to studying, and explain how it changes the trade-off.",
      scheme: [
        "Correctly states the opportunity cost as the next-best alternative, valued at 40 dollars",
        "Explains that opportunity cost is only the single next-best alternative and not all of them",
        "Identifies a specific incentive, such as a lower wage, a higher value placed on the SAT or a reward for studying",
        "Explains how the incentive changes the comparison between benefits and costs",
      ],
      model:
        "(a) Maya earns 66 dollars from working (6 hours times 11 dollars). Her opportunity cost is the value of the next-best alternative, studying, valued at 40 dollars. (b) Opportunity cost counts only the next-best alternative, not all of them, because she could only have done one of them with the time. (c) If a scholarship program offered a 100-dollar reward for completing an SAT study session, the benefit of studying would rise above 66 dollars, so the trade-off would favor studying.",
      answers: [
        [
          "full",
          "(a) [[0|Her opportunity cost is the next best thing she gave up, which is studying for the SAT, worth 40 dollars to her]]. (b) [[1|It doesn't include volunteering too because she could only do one of those things with the time, so only the next best one counts]]. (c) [[2|An incentive would be a 100-dollar reward from a scholarship program for finishing an SAT study session]]. [[3|That raises the benefit of studying above the 66 dollars she'd earn, so now studying is worth more than working]].",
          "Full marks. You named the next-best alternative as the opportunity cost and showed how a change in the incentive flips the comparison.",
        ],
        [
          "full",
          "(a) 6 times 11 is 66 dollars for working. [[0|Her opportunity cost is 40 dollars, the value of studying, which is the next best alternative]]. (b) [[1|Opportunity cost is only the best option you gave up, not all, since you can't do all the things at once anyway and adding them would count the same hours more than once]]. (c) [[2|If her boss cut her pay to 5 dollars an hour, working would only be worth 30 dollars]]. [[3|That would be less than the 40 dollars from studying, so the trade-off now favors studying]].",
          "All four points. Pointing out that adding all the alternatives would count the same hours more than once is an excellent explanation.",
        ],
        [
          "partial",
          "(a) [[0|Her opportunity cost is studying for the SAT, 40 dollars]]. (b) Because it is what you give up. (c) A raise.",
          "Part (a) is right. In (b) say why only one alternative counts, and in (c) explain how a raise would change the choice, since a raise would make working more attractive.",
        ],
        [
          "partial",
          "(b) [[1|Only the next best alternative counts as the opportunity cost]]. (c) [[2|A bigger reward for studying]] [[3|would make studying worth more than 66 dollars]]. (a) The opportunity cost is 66 dollars.",
          "Parts (b) and (c) are strong. In (a), 66 dollars is her earnings; her opportunity cost is the 40-dollar value of studying.",
          true,
        ],
        [
          "weak",
          "(a) Her opportunity cost is 66 dollars plus 40 plus volunteering. (b) It is all of them added up. (c) None because she likes working.",
          "Opportunity cost is only the single next-best alternative, so you do not add them all up. Re-read the definition.",
        ],
        [
          "weak",
          "(a) [[0|Studying for the SAT]]. (b) Because it is easy. (c) More money.",
          "Naming studying is right, but give its value of 40 dollars, explain why only one alternative counts, and describe an incentive in detail.",
        ],
      ],
    },
    {
      prompt:
        "A school considers adding a fourth period of free after-school tutoring. The table shows the benefit and cost of each extra tutoring session per week: session 1 raises average student scores by 6 points at a cost of 400 dollars; session 2 raises scores by 4 points at 400 dollars; session 3 raises scores by 2 points at 400 dollars; session 4 raises scores by 1 point at 400 dollars. The school values each point of improvement at 150 dollars. (a) Calculate the marginal benefit in dollars of each session. (b) State how many sessions the school should run and justify the choice using marginal analysis. (c) Name one group that benefits and one that bears a cost.",
      scheme: [
        "Correctly calculates the marginal benefits (900, 600, 300, 150 dollars)",
        "Compares marginal benefit with the 400-dollar marginal cost for each session",
        "States 2 sessions as the best choice with the rule that marginal benefit exceeds marginal cost",
        "Names a group that benefits and a group that bears the cost",
      ],
      model:
        "(a) The marginal benefits are 6 times 150, or 900 dollars, then 600, 300 and 150 dollars. (b) Each session costs 400 dollars, so the school should run sessions as long as the marginal benefit is at least 400 dollars. Sessions 1 and 2 meet this (900 and 600), but session 3 (300) and session 4 (150) do not, so the school should run two sessions. (c) Students who attend tutoring benefit, and taxpayers or the school budget bear the cost.",
      answers: [
        [
          "full",
          "(a) [[0|The marginal benefits are 6 x 150 = 900 dollars, 4 x 150 = 600, 2 x 150 = 300 and 1 x 150 = 150]]. (b) [[1|Each session costs 400, so session 1 gives 900 which is more, session 2 gives 600 which is more, but session 3 gives 300 and session 4 gives 150, which are less than 400]]. [[2|So the school should run 2 sessions, because you keep adding as long as marginal benefit is at least marginal cost]]. (c) [[3|Students who need help benefit, and the school budget, which taxpayers pay for, bears the cost]].",
          "Full marks. Your table of marginal values and the stopping rule lead cleanly to the answer.",
        ],
        [
          "full",
          "(a) [[0|900 dollars for session one, 600 for session two, 300 for session three and 150 for session four]]. (b) [[1|Comparing to the 400-dollar cost, the first two sessions have higher benefits but the last two have lower]]. [[2|The school should stop at 2 sessions, since going to 3 would cost 400 for only 300 of benefit]]. (c) [[3|Struggling students benefit and the district's taxpayers bear the cost, and teachers might bear the cost of extra hours]].",
          "All four points. Showing session 3 as a 400-dollar cost for 300 dollars of benefit makes the stopping point vivid.",
        ],
        [
          "partial",
          "(a) [[0|The benefits are 900, 600, 300 and 150]]. (b) The school should do all four because they all help. (c) Students.",
          "Part (a) is right. For (b), compare each benefit with 400 dollars, because a session that benefits students can still cost more than it is worth. Add the cost-bearing group.",
        ],
        [
          "partial",
          "(b) [[1|Sessions 3 and 4 give less than 400]], so [[2|the school should run 2 sessions]]. (a) 6, 4, 2 and 1 are the benefits.",
          "Your decision and reasoning are right. In (a), convert points to dollars at 150 each to get 900, 600, 300 and 150.",
          true,
        ],
        [
          "weak",
          "(a) 6 + 4 + 2 + 1 = 13 points. (b) Run all four because 13 points is a lot. (c) Everyone benefits and nobody pays.",
          "Marginal analysis looks at each session's extra benefit and cost, not the total. Someone always pays, so think about who bears the cost.",
        ],
        [
          "weak",
          "(a) [[0|900 for the first]]. (b) The more sessions the better. (c) The teachers.",
          "The first value is right; compute all four. More is not automatically better if the marginal cost exceeds the marginal benefit.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Three basic questions, economic systems and the production possibilities curve",
  note: `
## Objectives

Students will be able to:

1. describe the three basic economic questions and compare market, command and mixed economies;
2. describe the factors of production and show how a production possibilities curve shows trade-offs.

## Materials

A one-page chart for the three questions (what, how, for whom), a country-profile card set (a traditional market, a command economy, the United States, a mixed example), a factors-of-production card sort (land, labor, capital, entrepreneurship), a production possibilities data table for an Ohio farm (corn and soybeans), graph paper, and the exit ticket.

## Starter (8 minutes)

Ask: "Every day somebody decides what a grocery store sells, how it gets there and who can afford it. Who makes those decisions in the United States, and who made them in the Soviet Union?" Collect ideas and put the three questions on the board: What to produce? How to produce it? For whom?

## Main activity

1. Systems. Students use the profile cards to answer the three questions for each system. In a market economy, individual consumers and businesses decide through prices; in a command economy, a central authority decides; in a mixed economy such as the United States, both markets and government play roles. They place examples on a spectrum.
2. Factors of production. Sort cards into land (natural resources), labor (human effort), capital (tools, machines, buildings) and entrepreneurship (organizing and risk-taking). Ask where a Columbus food truck gets each.
3. Production possibilities. Give the farm table: A (0 corn, 120 soybeans), B (40, 100), C (80, 70), D (120, 30), E (140, 0). Students plot the curve, label points on, inside and outside the curve and compute the opportunity cost of each move: from A to B, 40 corn costs 20 soybeans, or 0.5 soybeans per corn; B to C, 0.75; C to D, 1.0; D to E, 1.5. They explain why the cost increases.

## Checking for understanding

Whiteboards: "A point inside the curve means ___. A point outside means ___."

## Exit ticket

Which of the three questions does the PPC most directly answer, and why?
`,
  reading: [
    "Who decides, what is used and what is given up",
    `
Every society faces three basic economic questions. **What** will be produced, in what amounts? **How** will it be produced, with what resources and methods? **For whom** will it be produced, meaning who gets to buy or use it? Different economic systems answer them differently.

In a **market economy**, millions of individual decisions answer them. Businesses produce what consumers are willing to pay for, choose methods that keep their costs low, and goods go to those with the money to buy them. Prices carry the signals: a high price tells producers to make more and consumers to buy less. In a **command economy**, a central authority, such as the government of the former Soviet Union, decides what to produce, how and for whom, and sets prices and output targets. The strength of a command economy can be coordination for a specific goal, but its weakness is that planners cannot know what millions of people want, and shortages and waste are common. A **traditional economy** answers the questions by custom and habit passed down through generations, as in some farming communities. In reality, almost every country has a **mixed economy**, in which markets handle most decisions and government plays a role, for instance by providing schools and roads, regulating food safety and taxing income. The United States is a mixed economy, and so are most other nations; the difference is a matter of degree.

To produce anything, an economy needs **factors of production**. **Land** includes all natural resources: soil, water, minerals and timber. **Labor** is the work people do, with their skills. **Capital** consists of the goods made to produce other goods, such as tractors, ovens and computers. **Entrepreneurship** is the organizing of the other three and the willingness to take risks. A Columbus food truck uses land (the parking spot and the ingredients' sources), labor (the cooks), capital (the truck and the grill) and an entrepreneur who started it.

The **production possibilities curve** (PPC) shows the most of two goods an economy can produce with its resources and technology. Consider a farm that can grow corn and soybeans. At point A it grows 120 soybeans and no corn; at B, 40 corn and 100 soybeans; at C, 80 and 70; at D, 120 and 30; and at E, 140 corn and no soybeans. A point on the curve means resources are fully and efficiently used. A point inside the curve, such as 40 corn and 70 soybeans, means some resources are idle or used poorly. A point outside, such as 100 corn and 100 soybeans, is not attainable with current resources and technology.

The curve shows trade-offs. Moving from A to B gives up 20 soybeans for 40 corn, an opportunity cost of 0.5 soybeans for each corn. From B to C the cost is 30 soybeans for 40 corn, or 0.75 soybeans per corn. From C to D it is 40 for 40, or 1.0, and from D to E, 30 soybeans for 20 corn, or 1.5. The opportunity cost rises, which is why the curve bows outward. The reason is that resources are not perfectly adaptable: land that is best for soybeans produces little corn, so as the farm shifts more land to corn it must use land less suited to it.

The curve can shift outward if the economy gets more resources or better technology, a process called **economic growth**. It does not shift because of a choice among points on the curve. A choice among points answers the "what" question, while a shift outward means the economy can have more of both.
`,
  ],
  cards: [
    ["Three economic questions", "What to produce, how to produce it and for whom."],
    ["Market economy", "Decisions are made by individuals and firms responding to prices."],
    ["Command economy", "A central authority decides what, how and for whom."],
    ["Mixed economy", "Markets and government both play roles; most modern economies."],
    ["Factors of production", "Land, labor, capital and entrepreneurship."],
    ["Capital (economics)", "Goods made to produce other goods, such as machines and buildings."],
    ["Production possibilities curve", "A graph showing the maximum combinations of two goods an economy can produce."],
    ["Increasing opportunity cost", "As more of one good is produced, more of the other must be given up for each additional unit."],
  ],
  closed: [
    [
      "A government agency decides how many cars the country will produce and sets their prices. This is most characteristic of:",
      ["A market economy", "A command economy", "A traditional economy", "A free-trade zone"],
      "B",
    ],
    [
      "A bakery owner buys a new oven. In economics the oven is an example of:",
      ["Labor", "Land", "Capital", "Entrepreneurship"],
      "C",
    ],
    [
      "A farm's PPC includes points (40 corn, 100 soybeans) and (80 corn, 70 soybeans). What is the opportunity cost of each additional corn between these points?",
      ["0.5 soybeans", "0.75 soybeans", "1.0 soybeans", "30 soybeans"],
      "B",
    ],
    [
      "A farm has resources that could produce 80 corn and 70 soybeans, but it produces 40 corn and 70 soybeans. Which statement is true?",
      [
        "It is using resources fully and efficiently",
        "It is producing inside its PPC, so some resources are idle or not used well",
        "It is producing outside its PPC",
        "Its PPC has shifted inward",
      ],
      "B",
    ],
    [
      "Which would most likely shift a country's PPC outward?",
      [
        "A decision to produce more of one good",
        "A new technology that increases productivity",
        "An unemployment rise",
        "A price increase",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Compare how a market economy and a command economy answer the question 'What will be produced?' Give one strength and one weakness of each approach.",
      scheme: [
        "Explains that in a market economy consumers' purchases and prices guide what firms produce",
        "Gives a strength of the market approach",
        "Explains that in a command economy a central authority decides what is produced",
        "Gives a weakness of the command approach, such as shortages or waste",
      ],
      model:
        "In a market economy, firms produce what consumers are willing to pay for, and prices signal what to make more or less of. A strength is that it responds quickly to what people want. In a command economy, a central authority decides what is produced. A weakness is that planners cannot know what millions of people want, which can lead to shortages and waste.",
      answers: [
        [
          "full",
          "[[0|In a market economy, businesses make what people are willing to buy, and prices tell them what to produce more or less of]]. [[1|A strength is that it responds quickly to what people want, and firms compete to offer better products]]. [[2|In a command economy, a central authority like the government decides what to produce and in what amounts]]. [[3|A weakness is that planners can't know what millions of people want, so there can be shortages of some things and waste of others]].",
          "Full marks. You connected each system to how it decides and gave a reason for the strength and the weakness.",
        ],
        [
          "full",
          "[[0|In a market economy, what gets produced depends on consumers' demand, because if people buy more of something prices rise and firms make more]]. [[1|A strength is that firms have a profit incentive to find out what people want and make it efficiently]]. [[2|In a command economy, a planning agency sets output goals for factories]]. [[3|A weakness is that the plan can ignore what people actually want, like in the Soviet Union where long lines for basic goods were common]].",
          "All four points. The Soviet example shows you understand where the weakness shows up in practice.",
        ],
        [
          "partial",
          "[[0|In a market economy, firms produce what people want to buy]]. [[2|In a command economy, the government decides]].",
          "Both descriptions are accurate. Add a strength of the market and a weakness of the command economy.",
        ],
        [
          "partial",
          "[[1|A strength of the market is that firms compete to give consumers what they want]]. [[3|A weakness of the command economy is shortages]]. Both of them decide what to produce.",
          "Your strength and weakness are good. Explain how each system decides what to produce.",
          true,
        ],
        [
          "weak",
          "In a market economy the government decides what to produce, and in a command economy the people decide, which is better.",
          "It is the reverse: in a market economy consumers and firms decide, and in a command economy a central authority decides. Review the definitions.",
        ],
        [
          "weak",
          "[[2|In a command economy the government decides]]. A market economy has no rules at all so everything is wasted.",
          "The command economy is right. A market economy has laws and uses prices to guide production. Describe both systems and a strength and a weakness.",
        ],
      ],
    },
    {
      prompt:
        "An Ohio farm's production possibilities are: A (0 corn, 120 soybeans), B (40, 100), C (80, 70), D (120, 30), E (140, 0). (a) Calculate the opportunity cost per bushel of corn when moving from C to D. (b) Calculate the opportunity cost per bushel of corn when moving from D to E, and compare it with C to D. (c) Explain why the opportunity cost changes. (d) Explain what a point at (100 corn, 90 soybeans) would mean.",
      scheme: [
        "Correctly calculates 40 soybeans for 40 corn, or 1.0 soybean per corn, from C to D",
        "Correctly calculates 30 soybeans for 20 corn, or 1.5 soybeans per corn, from D to E and compares",
        "Explains that opportunity cost rises because resources are not equally suited to both goods",
        "Explains that (100, 90) lies outside the curve and cannot be produced with current resources and technology",
      ],
      model:
        "(a) Moving from C to D, the farm gives up 40 soybeans for 40 more corn, so each corn costs 1.0 soybean. (b) From D to E it gives up 30 soybeans for 20 more corn, or 1.5 soybeans per corn, higher than from C to D. (c) The cost rises because land and other resources are not equally good at both crops, so as more shifts to corn it uses land better suited to soybeans. (d) The point (100 corn, 90 soybeans) lies outside the PPC, since at 100 corn the farm can produce only about 50 soybeans, so it is not attainable with current resources and technology.",
      answers: [
        [
          "full",
          "(a) [[0|From C to D the farm gives up 40 soybeans (70 to 30) and gets 40 more corn (80 to 120), so it's 1.0 soybean per corn]]. (b) [[1|From D to E it gives up 30 soybeans and gets 20 more corn, so it's 1.5 soybeans per corn, which is higher]]. (c) [[2|The cost goes up because the resources aren't equally good for both crops, so as the farm moves more land to corn it uses land that was better suited to soybeans]]. (d) [[3|A point at 100 corn and 90 soybeans is outside the curve, so the farm can't produce it with its current resources and technology]].",
          "Full marks. Your calculations are correct and your explanation for the rising cost uses the idea of resources that are not equally suited.",
        ],
        [
          "full",
          "(a) [[0|Corn goes up by 40 and soybeans go down by 40, so one corn costs one soybean]]. (b) [[1|Corn goes up by 20 and soybeans go down by 30, which is 1.5, so it costs more than before]]. (c) [[2|Some land is better for soybeans, so when the farm makes more corn it has to give up more soybeans for each extra corn]]. (d) [[3|That point is beyond the PPC so it's unattainable unless the farm got more land or better technology]].",
          "All four points. Adding that more land or better technology would shift the curve shows you understand what makes the point possible.",
        ],
        [
          "partial",
          "(a) [[0|C to D costs 1 soybean per corn]]. (b) [[1|D to E costs 1.5 per corn]]. (c) It is because of economics. (d) It is a good point.",
          "Parts (a) and (b) are right. In (c) explain why the cost rises, and in (d) say that the point is outside the curve and unattainable.",
        ],
        [
          "partial",
          "(c) [[2|The resources aren't equally good for both crops]]. (d) [[3|It's outside the curve so it can't be produced]]. (a) 1.5. (b) 1.0.",
          "Parts (c) and (d) are strong, but (a) and (b) are reversed: C to D is 1.0 and D to E is 1.5.",
          true,
        ],
        [
          "weak",
          "(a) 40 corn. (b) 20 corn. (c) Because corn costs more than soybeans. (d) It means the farm is doing very well.",
          "Opportunity cost is measured in the other good given up, soybeans per corn. The point is outside the curve, so it cannot be produced. Review how to compute.",
        ],
        [
          "weak",
          "(a) [[0|1.0 soybean per corn]]. (b) Same as (a), because opportunity cost is constant. (c) It is constant. (d) That is inside the curve.",
          "Part (a) is right, but the cost rises to 1.5 from D to E, which is why the curve bows outward. The point (100, 90) is outside the curve.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Consumers, producers, demand and supply",
  note: `
## Objectives

Students will be able to:

1. explain how consumers decide what to buy and build and interpret a demand curve;
2. explain how producers decide what to sell and build and interpret a supply curve.

## Materials

A demand and supply schedule for hot chocolate at a Saturday farmers' market (price from 2 dollars to 4 dollars), graph paper and rulers, a card set of "determinants" (income, tastes, prices of related goods, expectations, number of buyers; input costs, technology, taxes, number of sellers), a sort of "movement along the curve" versus "shift of the curve" scenarios, and the exit ticket.

## Starter (8 minutes)

Ask: "A hot chocolate costs 4 dollars on a freezing day. How many would you buy at 4 dollars, at 3 dollars, at 2 dollars?" Collect responses on the board to build a class demand schedule and ask what pattern they see.

## Main activity

1. Demand. Use the schedule: at 2 dollars, 120 cups are demanded; 2.50, 100; 3, 80; 3.50, 60; 4, 40. Students plot the demand curve, notice that quantity demanded falls as price rises (the law of demand), and explain it with the substitution effect and income effect. They then write the demand rule, Qd = 200 - 40P, and test it at three prices.
2. Supply. Use the supply schedule: at 2 dollars, 20 cups are supplied; 2.50, 50; 3, 80; 3.50, 110; 4, 140. Plot it and state the law of supply: higher price gives sellers an incentive to supply more. Write the rule: Qs = 60P - 100.
3. Movement versus shift. In pairs, students sort scenarios: a price change moves along a curve; a change in income, tastes, input costs or technology shifts the curve. Examples: a lake-effect snowstorm increases the taste for hot chocolate (demand shifts right); the price of milk rises (supply shifts left); a new machine speeds up making cocoa (supply shifts right).

## Checking for understanding

Whiteboards: "Does this change the quantity demanded or demand? Why?"

## Exit ticket

Explain the difference between a change in quantity demanded and a change in demand, with one example of each.
`,
  reading: [
    "Why buyers buy less when prices rise, and sellers sell more",
    `
Every purchase is a decision made at the margin. A consumer decides how much to buy by comparing the benefit of one more unit with its price. The **law of demand** says that, other things equal, when the price of a good rises, the quantity demanded falls, and when the price falls, the quantity demanded rises. Two ideas explain it. The **substitution effect** says that when a good gets more expensive, buyers switch to similar, cheaper goods. If a hot chocolate rises from 3 to 4 dollars, some people choose a coffee or tea. The **income effect** says that a higher price reduces the purchasing power of a given income, so people can afford less. A **demand schedule** lists prices and quantities, and a **demand curve** plots them, sloping downward from left to right.

Consider the weekend farmers' market. At a price of 2 dollars, buyers demand 120 cups of hot chocolate; at 3 dollars, 80; at 4 dollars, 40. Each 1-dollar rise in the price cuts the quantity demanded by 40 cups, so the demand can be written as Qd = 200 - 40P. If P is 3, Qd is 200 - 120, which is 80, matching the schedule.

It is important to distinguish a **change in quantity demanded**, which is a movement along the demand curve caused by a change in the good's own price, from a **change in demand**, which is a shift of the whole curve. Demand shifts when something other than price changes. The usual causes are consumers' income, tastes and preferences, the prices of related goods (substitutes and complements), expectations about the future, and the number of buyers. A freezing lake-effect snowstorm raises people's taste for hot drinks, so at every price they want more, and the demand curve shifts to the right.

Producers face the opposite incentive. The **law of supply** says that, other things equal, when the price of a good rises, the quantity supplied rises. A higher price makes it more profitable to produce, and encourages producers to bring more to market, even though the cost of making each additional unit usually rises. A **supply schedule** lists the quantities that sellers will offer at each price, and the **supply curve** slopes upward. In the farmers' market example, at 2 dollars sellers offer 20 cups, at 3 dollars 80, and at 4 dollars 140. Each 1-dollar rise adds 60 cups, so Qs = 60P - 100. At 3 dollars, that is 180 - 100, or 80.

As with demand, a change in the good's price causes a movement along the supply curve, while a change in something else shifts the curve. The main **determinants of supply** are the prices of inputs, technology, taxes and subsidies, expectations and the number of sellers. If the price of milk rises, the cost of making hot chocolate rises, so sellers supply less at every price, and the supply curve shifts left. A new machine that speeds up production reduces costs, and the supply curve shifts right.

Reading these curves precisely is the skill. A sentence such as "Demand for hot chocolate increased because of the snowstorm" means the whole curve shifted right. A sentence such as "People bought fewer hot chocolates because the price went up" describes movement up and to the left along an unchanged curve.
`,
  ],
  cards: [
    ["Law of demand", "As price rises, quantity demanded falls, other things equal."],
    ["Substitution effect", "Buyers switch to cheaper alternatives when a good's price rises."],
    ["Income effect", "A higher price reduces purchasing power, so people can buy less."],
    ["Change in quantity demanded", "A movement along the demand curve caused by a change in the good's own price."],
    ["Change in demand", "A shift of the whole demand curve caused by something other than price."],
    ["Law of supply", "As price rises, quantity supplied rises, other things equal."],
    ["Determinants of supply", "Input prices, technology, taxes and subsidies, expectations and the number of sellers."],
    ["Complement and substitute", "Complements are used together (hot chocolate and cups); substitutes replace each other (tea and coffee)."],
  ],
  closed: [
    [
      "Using Qd = 200 - 40P, how many cups are demanded at a price of 2.50 dollars?",
      ["60", "80", "100", "120"],
      "C",
    ],
    [
      "Using Qs = 60P - 100, how many cups are supplied at a price of 3.50 dollars?",
      ["80", "100", "110", "140"],
      "C",
    ],
    [
      "A snowstorm increases people's taste for hot chocolate. This causes:",
      [
        "A movement along the demand curve",
        "A shift of the demand curve to the right",
        "A shift of the supply curve to the left",
        "A decrease in quantity demanded",
      ],
      "B",
    ],
    [
      "The price of cocoa, an input, rises sharply. Which is the effect on the supply of hot chocolate?",
      [
        "Supply increases and the curve shifts right",
        "Supply decreases and the curve shifts left",
        "Quantity supplied increases along the curve",
        "There is no effect",
      ],
      "B",
    ],
    [
      "A coffee shop raises its price and sells fewer cups. Which describes this?",
      [
        "A decrease in demand",
        "A decrease in quantity demanded",
        "An increase in supply",
        "A decrease in supply",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "For each of the following, state whether it causes a change in demand or a change in quantity demanded for Buckeye game-day T-shirts, and say whether the demand curve shifts or the point moves along it. (a) Ohio State wins a championship. (b) The seller raises the T-shirt price from 20 to 25 dollars. (c) The price of a similar jersey rises. Explain your reasoning for one of them in a full sentence.",
      scheme: [
        "States that a championship win is a change in demand, shifting the curve right (a change in tastes)",
        "States that a price change is a change in quantity demanded, a movement along the curve",
        "States that a higher price of a substitute raises demand, shifting the curve right",
        "Gives accurate reasoning for at least one of them",
      ],
      model:
        "(a) A championship win raises people's taste for the shirts, so demand increases and the curve shifts right. (b) Raising the shirt's own price from 20 to 25 dollars decreases the quantity demanded, a movement up and to the left along the same curve. (c) If a similar jersey becomes more expensive, buyers switch to the T-shirt, a substitute, so demand for the T-shirt increases and shifts right. In (b), the change is in quantity demanded and not demand because only the good's own price changed.",
      answers: [
        [
          "full",
          "(a) [[0|A championship win is a change in demand because people's tastes change, so the curve shifts to the right]]. (b) [[1|Raising the price from 20 to 25 is a change in quantity demanded, a movement along the same curve]]. (c) [[2|A higher price for a similar jersey makes people buy the T-shirt instead, since they're substitutes, so demand shifts right]]. [[3|In (b) only the shirt's own price changed, which is why it's a movement along the curve and not a shift]].",
          "Full marks. Each case is classified correctly and you explained the key rule: only the good's own price causes a movement along the curve.",
        ],
        [
          "full",
          "(a) [[0|Winning the championship increases demand because more fans want to buy Buckeye gear at every price]]. (b) [[1|A price increase to 25 dollars only reduces quantity demanded, so we slide up the same demand curve]]. (c) [[2|The jersey is a substitute, so if its price goes up, some buyers switch to the T-shirt and the demand curve shifts right]]. [[3|The difference is that a change in a shirt's own price moves along the curve, but changes in other things like tastes or related goods shift the curve]].",
          "All four points. Your last sentence states the general rule clearly.",
        ],
        [
          "partial",
          "(a) [[0|A change in demand, shifts right]]. (b) A change in demand. (c) A change in demand too.",
          "Part (a) is right. For (b), only the shirt's own price changed, so it is a change in quantity demanded, and (c) shifts demand because of a substitute. Explain your reasoning.",
        ],
        [
          "partial",
          "(b) [[1|A change in quantity demanded, a movement along the curve]]. (c) [[2|The demand curve shifts right because the jersey is a substitute]]. (a) A change in price.",
          "Parts (b) and (c) are correct. A championship win changes tastes, so (a) is a change in demand.",
          true,
        ],
        [
          "weak",
          "(a) Quantity demanded goes up. (b) The curve shifts left. (c) Nothing happens because jerseys are different.",
          "Check which changes are the good's own price. A shirt's own price moves along the curve, while changes in tastes or related goods shift it.",
        ],
        [
          "weak",
          "(a) [[0|The curve shifts right]]. (b) The curve shifts left because the price went up. (c) It shifts left.",
          "Part (a) is right. A higher price moves us along the curve, and a higher price of a substitute shifts demand right. Look at the difference between price and the other determinants.",
        ],
      ],
    },
    {
      prompt:
        "Use the supply rule Qs = 60P - 100. (a) Calculate the quantity supplied at 3 dollars and at 4 dollars. (b) State the law of supply and explain, using your answers, why sellers would offer more at the higher price. (c) A new machine lowers the cost of making a cup. Explain what happens to the supply curve and why this is not the same as a change in quantity supplied.",
      scheme: [
        "Correctly calculates 80 at 3 dollars and 140 at 4 dollars",
        "States the law of supply, that a higher price gives a higher quantity supplied",
        "Explains that a higher price makes production more profitable, which encourages sellers to offer more",
        "Explains that lower costs shift the supply curve right, and that this is a change in supply caused by something other than price",
      ],
      model:
        "(a) At 3 dollars, Qs = 60(3) - 100 = 80, and at 4 dollars, Qs = 60(4) - 100 = 140. (b) The law of supply says that when price rises, quantity supplied rises. At 4 dollars sellers offer 140 cups instead of 80, because the higher price makes selling more profitable. (c) A new machine lowers the cost of making a cup, so sellers will supply more at every price and the supply curve shifts right. This is a change in supply, caused by something other than the price, while a change in quantity supplied is a movement along the curve caused by a change in the price.",
      answers: [
        [
          "full",
          "(a) [[0|At 3 dollars, 60 x 3 = 180 minus 100 is 80, and at 4 dollars, 240 minus 100 is 140]]. (b) [[1|The law of supply says that when price goes up quantity supplied goes up]]. [[2|At 4 dollars sellers offer 140 cups instead of 80 because the higher price makes selling more profitable]]. (c) [[3|The machine lowers costs, so sellers supply more at every price, which shifts the curve right. That's a change in supply and not a change in quantity supplied, which only happens when the price changes]].",
          "Full marks. Your answers to (a) are correct, and (c) clearly separates a shift from a movement.",
        ],
        [
          "full",
          "(a) [[0|At 3 it's 80 cups and at 4 it's 140 cups]]. (b) [[1|The law of supply says higher prices lead to a higher quantity supplied]]. [[2|Sellers get a higher profit on each cup at 4 dollars so they are willing to make more]]. (c) [[3|The cost of making each cup goes down, so the supply curve shifts to the right. A change in quantity supplied would be sliding along the curve, which only happens when the cup's own price changes]].",
          "All four points. Describing profit per cup explains the incentive behind the law of supply.",
        ],
        [
          "partial",
          "(a) [[0|80 and 140]]. (b) [[1|When price goes up the quantity supplied goes up]]. (c) The curve moves.",
          "Parts (a) and (b) are right. Explain why sellers offer more at the higher price, and in (c) say which direction the curve moves and why it is a shift.",
        ],
        [
          "partial",
          "(c) [[3|The machine shifts supply to the right because costs are lower]]. (b) [[2|Higher prices make it more profitable]]. (a) 3 dollars gives 80 and 4 dollars gives 120.",
          "Parts (b) and (c) are strong, but at 4 dollars Qs = 60(4) - 100 = 140, not 120. Check the arithmetic.",
          true,
        ],
        [
          "weak",
          "(a) 3 and 4. (b) When price goes up quantity supplied goes down. (c) Supply goes down because machines cost a lot.",
          "Substitute the price into the rule: 60P - 100. The law of supply says quantity supplied rises with price, and a cost-saving machine increases supply.",
        ],
        [
          "weak",
          "(a) [[0|80 at 3 dollars]] and 100 at 4. (b) They offer more because they are nice. (c) Same as quantity supplied.",
          "At 4 dollars it is 140, sellers respond to profit incentives, and a shift is different from a change in quantity supplied. Review the definitions.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Markets find prices: equilibrium, shortages, surpluses and shifts",
  note: `
## Objectives

Students will be able to:

1. show how supply and demand set a market price and what happens at shortages and surpluses;
2. explain what shifts supply and demand and predict the effect of a change on price and quantity.

## Materials

The hot-chocolate schedule from last week extended to show quantity demanded and supplied at each price (2.00: 120 and 20; 2.50: 100 and 50; 3.00: 80 and 80; 3.50: 60 and 110; 4.00: 40 and 140), a blank supply-and-demand graph, shift scenario cards, calculators, a short quiz, and the exit ticket.

## Starter (8 minutes)

Ask: "What happens at the school store if hot chocolate is priced at 2 dollars and the line is out the door? What if it is priced at 4 dollars and unsold cups sit around?" Elicit the ideas of shortage and surplus.

## Main activity

1. Finding equilibrium. Students compute the shortage or surplus at each price: at 2 dollars, the shortage is 100 (120 - 20); at 2.50, 50; at 3, none; at 3.50, a surplus of 50; at 4, a surplus of 100. Equilibrium is 3 dollars and 80 cups. They check algebraically: 200 - 40P = 60P - 100 gives 100P = 300, so P = 3.
2. Adjustment. Explain how prices tend to move toward equilibrium: shortage pushes prices up; surplus pushes them down. Discuss real-world examples: concert tickets, snow shovels before a storm.
3. Shifts. A lake-effect storm raises demand by 40 cups at every price: Qd = 240 - 40P. Solve: 240 - 40P = 60P - 100, so P = 3.40 and Q = 104. Then explore other shifts: a milk price increase shifts supply left, a new competitor shifts supply right. Students fill in a table predicting the direction of price and quantity for single and double shifts.
4. Quiz. Five questions on equilibrium and shifts.

## Checking for understanding

Whiteboards: "Demand increases and supply increases. What happens to quantity? To price?" (Quantity rises; price is uncertain.)

## Exit ticket

Predict what happens to price and quantity when supply decreases and demand stays the same, and explain.
`,
  reading: [
    "Where the lines meet: price as a signal",
    `
A market brings buyers and sellers together, and its price is not set by anyone in particular. It emerges from their choices. The price at which the quantity demanded equals the quantity supplied is the **equilibrium price**, and the quantity at that price is the **equilibrium quantity**. Using the hot-chocolate market from last week, at 3 dollars buyers want 80 cups and sellers offer 80, so the market clears. You can check it algebraically. Setting Qd = Qs gives 200 - 40P = 60P - 100. Adding 40P and 100 to both sides gives 300 = 100P, so P = 3. Substituting back, Q = 200 - 120 = 80.

At any other price, the market is out of balance. A price below equilibrium creates a **shortage**, when the quantity demanded exceeds the quantity supplied. At 2 dollars, buyers want 120 cups but sellers offer only 20, a shortage of 100. Buyers compete, lines form, and sellers see that they can charge more, so prices rise. A price above equilibrium creates a **surplus**, when the quantity supplied exceeds the quantity demanded. At 4 dollars, sellers offer 140 but buyers want 40, a surplus of 100. Unsold cups pile up, sellers cut prices to move them, and prices fall. In both cases, the movement of prices pushes the market toward equilibrium. This is why economists say that prices are signals and incentives: they tell buyers and sellers about scarcity and reward them for responding.

Now consider changes. When a lake-effect storm increases the taste for hot drinks, demand shifts right. Suppose the quantity demanded rises by 40 cups at every price, so Qd = 240 - 40P. Setting that equal to supply, 240 - 40P = 60P - 100, gives 340 = 100P, so P = 3.40. The quantity is 240 - 136 = 104. Demand rose, the price rose from 3.00 to 3.40 and the quantity rose from 80 to 104. This is the standard result: an increase in demand raises both the price and the quantity.

A short set of rules helps. When **demand increases** (shifts right), price and quantity both rise. When **demand decreases**, price and quantity both fall. When **supply increases** (shifts right), price falls and quantity rises. When **supply decreases**, price rises and quantity falls. These rules hold when only one curve moves. When both curves move, one of the effects, price or quantity, is certain and the other is uncertain. If both demand and supply increase, quantity rises for sure, but price may rise, fall or stay the same, depending on which shift is larger. If demand increases and supply decreases, price rises for sure, but the quantity may rise or fall.

Real prices respond to such shifts constantly. Snow shovels sell out and the price rises before a storm because demand shifts right. Gas prices rise in summer when more people drive. Concert tickets for a popular band sell for more than the face value because quantity is limited and demand is high.

When explaining, name the curve that shifts, give its direction, and trace the effect on price and quantity. Avoid saying "demand went up so supply went down." The curves are independent, and one's change does not cause the other.
`,
  ],
  cards: [
    ["Equilibrium price", "The price at which quantity demanded equals quantity supplied."],
    ["Equilibrium quantity", "The quantity bought and sold at the equilibrium price."],
    ["Shortage", "A situation in which quantity demanded exceeds quantity supplied, at a price below equilibrium."],
    ["Surplus", "A situation in which quantity supplied exceeds quantity demanded, at a price above equilibrium."],
    ["Market clearing", "When price adjusts until there is neither a shortage nor a surplus."],
    ["Price signal", "Information conveyed by prices that tells buyers and sellers about scarcity."],
    ["Increase in demand", "A right shift of the demand curve; raises both equilibrium price and quantity."],
    ["Decrease in supply", "A left shift of the supply curve; raises price and lowers quantity."],
  ],
  closed: [
    [
      "With Qd = 200 - 40P and Qs = 60P - 100, what is the equilibrium price?",
      ["2.00 dollars", "2.50 dollars", "3.00 dollars", "4.00 dollars"],
      "C",
    ],
    [
      "At a price of 2.50 dollars, quantity demanded is 100 and quantity supplied is 50. This is:",
      ["A surplus of 50", "A shortage of 50", "A shortage of 150", "Equilibrium"],
      "B",
    ],
    [
      "Demand shifts to Qd = 240 - 40P while supply remains Qs = 60P - 100. What is the new equilibrium quantity?",
      ["80", "96", "104", "140"],
      "C",
    ],
    [
      "A new tax on cocoa raises the cost of making hot chocolate. What happens to the equilibrium price and quantity?",
      [
        "Price rises, quantity falls",
        "Price falls, quantity rises",
        "Both rise",
        "Both fall",
      ],
      "A",
    ],
    [
      "Both demand and supply increase. Which result is certain?",
      [
        "Price rises",
        "Price falls",
        "Quantity rises",
        "Quantity falls",
      ],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Use the market schedule (price: Qd, Qs): 2.00: 120, 20; 2.50: 100, 50; 3.00: 80, 80; 3.50: 60, 110; 4.00: 40, 140. (a) State the equilibrium price and quantity. (b) Describe the situation at 2.00 dollars, calculate the shortage or surplus, and explain what will happen to the price. (c) Describe the situation at 4.00 dollars and explain what will happen to the price.",
      scheme: [
        "States the equilibrium price of 3.00 dollars and quantity of 80",
        "Identifies a shortage of 100 at 2.00 dollars with the calculation",
        "Explains that the shortage pushes the price up",
        "Identifies a surplus of 100 at 4.00 dollars and explains that it pushes the price down",
      ],
      model:
        "(a) Equilibrium is at 3.00 dollars, where quantity demanded and supplied are both 80. (b) At 2.00 dollars, buyers want 120 cups and sellers offer 20, a shortage of 100. Buyers compete for the limited cups, so sellers will raise the price. (c) At 4.00 dollars, sellers offer 140 but buyers want 40, a surplus of 100. Sellers will cut the price to sell their extra cups, pushing the price down toward 3.00.",
      answers: [
        [
          "full",
          "(a) [[0|The equilibrium price is 3.00 and the quantity is 80, since both are 80 there]]. (b) [[1|At 2.00 buyers want 120 and sellers only make 20, so there's a shortage of 100]]. [[2|Buyers will compete for the few cups, so sellers will raise the price]]. (c) [[3|At 4.00 sellers make 140 but buyers only want 40, a surplus of 100, so sellers will have to cut the price to sell them, and it falls toward 3.00]].",
          "Full marks. You calculated both gaps and explained how each moves the price toward equilibrium.",
        ],
        [
          "full",
          "(a) [[0|Equilibrium is at 3 dollars and 80 cups]]. (b) [[1|At 2 dollars the quantity demanded is 120 and the quantity supplied is 20, so there's a shortage of 100 cups]]. [[2|With a shortage, people are willing to pay more, and sellers see lines forming, so the price rises]]. (c) [[3|At 4 dollars there is a surplus of 100 cups, because sellers supply 140 and buyers only want 40, so unsold cups cause sellers to cut prices until the market clears at 3 dollars]].",
          "All four points. 'Sellers see lines forming' captures the market signal behind the price rise.",
        ],
        [
          "partial",
          "(a) [[0|3 dollars and 80 cups]]. (b) [[1|At 2 dollars there is a shortage]]. (c) At 4 dollars there's a surplus.",
          "Part (a) is right and you identified the conditions. Give the size of each gap and explain what happens to the price.",
        ],
        [
          "partial",
          "(b) [[2|The shortage makes the price go up]]. (c) [[3|At 4 dollars there's a surplus of 100 so the price goes down]]. (a) The equilibrium is 3 dollars and 100 cups.",
          "Parts (b) and (c) are correct. At 3 dollars, 80 cups are demanded and supplied, so the quantity is 80, not 100.",
          true,
        ],
        [
          "weak",
          "(a) The equilibrium is at 4 dollars. (b) At 2 dollars there is a surplus because the price is low. (c) At 4 dollars there's a shortage.",
          "At 4 dollars sellers offer more than buyers want, so there is a surplus, and at 2 dollars there is a shortage. Compare quantity demanded and supplied.",
        ],
        [
          "weak",
          "(a) [[0|3 dollars and 80]]. (b) Price does not change. (c) Nothing happens.",
          "Equilibrium is right. At 2 and 4 dollars there is a shortage and surplus, and prices adjust toward 3 dollars. Describe the adjustment.",
        ],
      ],
    },
    {
      prompt:
        "A lake-effect snowstorm shifts the demand for hot chocolate to Qd = 240 - 40P, while supply remains Qs = 60P - 100. (a) Calculate the new equilibrium price and quantity. (b) State the change in price and quantity compared with the original equilibrium (3.00 dollars and 80 cups). (c) Suppose a milk price increase also shifts supply left. Explain what happens to price and quantity compared with the situation in (a), and which effect is uncertain.",
      scheme: [
        "Sets 240 - 40P = 60P - 100 and solves correctly",
        "States the new equilibrium price of 3.40 dollars and quantity of 104 cups",
        "States that price rose by 0.40 dollars and quantity rose by 24 cups",
        "Explains that a left shift of supply raises price and lowers quantity, so price rises for sure and quantity is uncertain given the two shifts",
      ],
      model:
        "(a) Setting 240 - 40P = 60P - 100 gives 340 = 100P, so P = 3.40, and Q = 240 - 40(3.40) = 104. (b) Compared with 3.00 and 80, price rose by 0.40 dollars and quantity rose by 24 cups. (c) If supply also shifts left, price rises further for sure, since both shifts push price up. The quantity effect is uncertain, because the demand increase raises quantity and the supply decrease lowers it, so the result depends on which shift is larger.",
      answers: [
        [
          "full",
          "(a) [[0|240 - 40P = 60P - 100, so 340 = 100P and P = 3.40]]. [[1|The quantity is 240 - 40 x 3.40 = 104, so the new equilibrium is 3.40 dollars and 104 cups]]. (b) [[2|Price went up by 40 cents and quantity went up by 24 cups]]. (c) [[3|If supply also shifts left, the price rises even more because both shifts push it up, but the quantity is uncertain because the demand increase raises it and the supply decrease lowers it, depending on which shift is bigger]].",
          "Full marks. Your algebra is clean and your conclusion for (c) names which effect is certain and which is not.",
        ],
        [
          "full",
          "(a) [[0|Set demand equal to supply: 240 - 40P = 60P - 100, so 100P = 340]]. [[1|P = 3.40 and Q = 104]]. (b) [[2|Price is 0.40 higher and quantity is 24 cups higher than before]]. (c) [[3|Both shifts raise the price, so price definitely rises. The demand shift pushes quantity up while the supply shift pushes it down, so quantity could go either way]].",
          "All four points. Setting out how each shift pushes quantity in opposite directions is exactly the right reasoning.",
        ],
        [
          "partial",
          "(a) [[0|240 - 40P = 60P - 100]]. [[1|P = 3.40 and Q = 104]]. (b) Price and quantity went up. (c) Price goes up.",
          "Parts (a) is right. For (b), give the sizes of the changes, and for (c), explain what happens to quantity and why it is uncertain.",
        ],
        [
          "partial",
          "(b) [[2|Price rose 40 cents and quantity rose 24 cups]]. (c) [[3|Price rises for sure, quantity is uncertain]]. (a) The equilibrium is 3.20 and 112.",
          "Parts (b) and (c) are right, but check (a): 240 - 40P = 60P - 100 gives P = 3.40 and Q = 104.",
          true,
        ],
        [
          "weak",
          "(a) 240 + 60 = 300. (b) Nothing changed. (c) Quantity falls, price falls.",
          "To find the equilibrium, set the two equations equal and solve for P. A demand increase raises price and quantity, and a supply decrease raises price.",
        ],
        [
          "weak",
          "(a) [[0|240 - 40P = 60P - 100]]. (b) Price went down because demand went up. (c) No effect.",
          "Setting up the equation is right. Solve it: P = 3.40, which is higher than before. An increase in demand raises the price.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Incentives in markets, elasticity and the structure of competition",
  note: `
## Objectives

Students will be able to:

1. analyze how incentives affect what a market system produces and distributes;
2. describe elasticity of demand and why it matters to a seller;
3. compare perfect competition, monopoly and oligopoly and their effects on consumers.

## Materials

A short case on the profit motive and consumer sovereignty (the grocery shelf), the hot-chocolate demand schedule (2.00: 120; 2.50: 100; 3.00: 80; 3.50: 60; 4.00: 40), the midpoint-formula card, a market-structure comparison table (number of sellers, product, entry, price control, examples), four mini-cases (wheat farmers, a local cable provider, three big airlines, a neighborhood pizza place), calculators, a quiz, and the exit ticket.

## Starter (8 minutes)

Ask: "Why does your grocery store carry six brands of cereal but only one brand of tap water in your home? Who decided?" Draw out incentives: sellers earn profit by giving buyers what they want, and competition pushes prices down and quality up.

## Main activity

1. Incentives and outcomes. Students identify how the profit motive, consumer choice and competition answer what, how and for whom in a market system, and name one problem the system does not solve alone, such as a public good.
2. Elasticity. Teach the midpoint formula: percent change in quantity demanded divided by percent change in price. Using the schedule, compute from 4.00 to 3.00 dollars: quantity rises from 40 to 80, a 66.7 percent increase, while price falls 28.6 percent, so elasticity is 2.33, elastic. From 3.00 to 2.00: 40 percent over 40 percent, a value of 1.0, unit elastic. Then compute total revenue at each price: 160, 240 and 240 dollars.
3. Market structures. In groups, students classify the four mini-cases and fill in the comparison table. They then discuss how each structure affects prices and choices for consumers.

## Checking for understanding

Quiz: five questions on elasticity and market structure.

## Exit ticket

A seller of a product with inelastic demand is thinking of raising the price. Predict the effect on total revenue and explain.
`,
  reading: [
    "How incentives steer a market, how buyers react to price and who competes",
    `
In a market system, **incentives** answer the basic questions. Because firms keep what is left after paying costs, the **profit motive** pushes them to produce goods people will buy, and to produce them at the lowest cost. Consumers, who vote with their dollars, decide which goods succeed, a principle sometimes called **consumer sovereignty**. **Competition** among sellers pushes prices down and quality up, since a seller who charges too much loses customers to a rival. The goods go to those willing and able to pay. This explains why a grocery store carries many cereals, and why a product that few people buy disappears from the shelf. It also explains a limit: markets respond to what people can pay, not to need alone, and some goods, such as national defense, cannot be sold one person at a time, so a market will underprovide them.

Sellers also care how buyers react to changes in price. **Price elasticity of demand** measures that reaction: the percent change in quantity demanded divided by the percent change in price. When the result is greater than 1, demand is **elastic**, meaning buyers are quite sensitive. When it is less than 1, demand is **inelastic**, meaning buyers are not very sensitive. At exactly 1, demand is **unit elastic**. The **midpoint method** uses the average of the starting and ending values as the base so that the answer is the same going up or down.

Return to the hot-chocolate demand schedule. When the price falls from 4.00 to 3.00 dollars, quantity demanded rises from 40 to 80. The change in quantity is 40, and the midpoint is 60, so the percent change is 66.7 percent. The change in price is 1.00 and the midpoint is 3.50, so the percent change is 28.6 percent. Dividing gives an elasticity of about 2.33, which is elastic. Total revenue, price times quantity, rises from 160 dollars (4.00 x 40) to 240 dollars (3.00 x 80). When the price falls from 3.00 to 2.00 dollars, quantity rises from 80 to 120, a 40 percent change over a midpoint of 100, and price falls 1.00 over a midpoint of 2.50, also 40 percent. The elasticity is 1.0, unit elastic, and revenue stays at 240 dollars. For a seller, the lesson is that cutting a price raises revenue if demand is elastic, leaves it unchanged if unit elastic and lowers it if inelastic. Raising a price does the opposite. Gasoline is a good example of inelastic demand in the short run: if its price rises 10 percent and quantity demanded falls 2 percent, the elasticity is 0.2, so total spending on gas rises. Factors that make demand more elastic include the availability of substitutes, whether the good is a luxury and how much of a budget it takes. Salt is inelastic; a specific brand of cereal is elastic.

How much competition a seller faces also shapes the market. Economists describe **market structures** by the number of sellers, the similarity of products and the ease of entry. In **perfect competition**, many small sellers offer identical products and no seller can influence the price, as with wheat farmers. In **monopoly**, a single seller has no close substitutes and can set the price, often because of high barriers to entry, such as a government license or a local cable network. A monopoly tends to charge a higher price and produce less than a competitive market. In **oligopoly**, a few large firms dominate, as in the airline industry, and each firm's decisions affect the others, which can lead to price matching or, sometimes, secret agreements that the law forbids. **Monopolistic competition**, in between, has many sellers with differentiated products, like restaurants.

Consumers benefit most when there is real competition. They suffer when a firm faces no rivals, which is why laws against monopolies and collusion exist. But concentration alone is not proof of harm. Judging a market requires asking about entry, prices, quality and the options buyers actually have.
`,
  ],
  cards: [
    ["Profit motive", "The incentive for a business to earn revenue above its costs, which pushes firms to produce what buyers want."],
    ["Consumer sovereignty", "The idea that consumers' choices ultimately decide what gets produced."],
    ["Price elasticity of demand", "Percent change in quantity demanded divided by percent change in price."],
    ["Elastic, inelastic, unit elastic", "Greater than 1, less than 1 and equal to 1, respectively."],
    ["Total revenue test", "A price cut raises revenue if demand is elastic and lowers it if inelastic."],
    ["Perfect competition", "Many sellers, identical products, no control over price."],
    ["Monopoly", "A single seller with barriers to entry and control over price."],
    ["Oligopoly", "A few large firms whose decisions affect one another."],
  ],
  closed: [
    [
      "Using the midpoint method, the price falls from 4.00 to 3.00 dollars and quantity demanded rises from 40 to 80. The elasticity is about:",
      ["0.43", "1.0", "2.33", "4.0"],
      "C",
    ],
    [
      "A store lowers the price of a product with elastic demand. What happens to total revenue?",
      ["It rises", "It falls", "It stays the same", "It cannot be known"],
      "A",
    ],
    [
      "Gas prices rise 10 percent and quantity demanded falls 2 percent. The elasticity is:",
      ["0.2", "1.0", "5.0", "12"],
      "A",
    ],
    [
      "A town's only cable provider faces no rivals and sets prices. This is best classified as:",
      ["Perfect competition", "Monopoly", "Oligopoly", "Monopolistic competition"],
      "B",
    ],
    [
      "Three large airlines serve most routes and watch each other's fares closely. This is best classified as:",
      ["Perfect competition", "Monopoly", "Oligopoly", "A traditional economy"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A pizza shop raises the price of a large pizza from 12 to 14 dollars, and the number sold per week falls from 100 to 80. (a) Use the midpoint method to calculate the price elasticity of demand. (b) State whether demand is elastic or inelastic. (c) Calculate the change in total revenue and explain what it means for the shop's decision to raise prices.",
      scheme: [
        "Calculates the percent change in quantity using the midpoint (20 divided by 90, about 22.2 percent)",
        "Calculates the percent change in price using the midpoint (2 divided by 13, about 15.4 percent) and elasticity of about 1.44",
        "Identifies demand as elastic because the elasticity is greater than 1",
        "Calculates revenue falling from 1,200 to 1,120 dollars and concludes the price rise was not profitable in revenue terms",
      ],
      model:
        "(a) The change in quantity is 20 and the midpoint is 90, so the percent change is about 22.2 percent. The change in price is 2 and the midpoint is 13, so the percent change is about 15.4 percent. The elasticity is 22.2 divided by 15.4, about 1.44. (b) That is greater than 1, so demand is elastic. (c) Revenue before was 12 x 100 = 1,200 dollars and after is 14 x 80 = 1,120 dollars, a decrease of 80 dollars. Because demand is elastic, raising the price lowered total revenue, so the shop should not raise the price on revenue grounds.",
      answers: [
        [
          "full",
          "(a) [[0|The quantity change is 20 out of a midpoint of 90, which is 22.2 percent]]. [[1|The price change is 2 out of a midpoint of 13, which is 15.4 percent, so the elasticity is 22.2 divided by 15.4, about 1.44]]. (b) [[2|It's more than 1, so demand is elastic]]. (c) [[3|Revenue was 1,200 and now it's 1,120, so it fell by 80 dollars, which means raising the price was a bad idea for revenue]].",
          "Full marks. Your midpoint calculations are correct and your revenue comparison supports the conclusion.",
        ],
        [
          "full",
          "(a) [[0|Percent change in quantity is 20 / 90 = 22 percent]]. [[1|Percent change in price is 2 / 13 = 15 percent, so elasticity is about 1.4]]. (b) [[2|1.4 is greater than 1, so it's elastic, and customers are sensitive to price]]. (c) [[3|12 x 100 = 1,200 and 14 x 80 = 1,120, so total revenue dropped 80 dollars, which matches the rule that raising prices lowers revenue when demand is elastic]].",
          "All four points. Connecting the calculation to the total revenue rule shows you understand why elasticity matters.",
        ],
        [
          "partial",
          "(a) [[0|The percent change in quantity is 22.2 percent]]. The price change is 2 dollars. (b) Elastic. (c) Revenue fell.",
          "Good start on the quantity. Compute the percent change in price and the elasticity, and give revenue numbers.",
        ],
        [
          "partial",
          "(b) [[2|Demand is elastic because it's more than 1]]. (c) [[3|Revenue went from 1,200 to 1,120]]. (a) The elasticity is 0.8.",
          "Parts (b) and (c) are right, but the elasticity is 22.2 divided by 15.4, about 1.44, not 0.8. Recheck the calculation.",
          true,
        ],
        [
          "weak",
          "(a) 20 divided by 2 is 10. (b) Inelastic. (c) Revenue rose because the price went up.",
          "Use percent changes with the midpoint, not dollar amounts. Revenue is price times quantity: 1,200 before and 1,120 after.",
        ],
        [
          "weak",
          "(a) 100 minus 80 is 20. [[2|Demand is elastic]]. (c) 14 times 80 is the revenue.",
          "Naming elastic is right, but you need to calculate the elasticity and compare revenue before (1,200) and after (1,120).",
        ],
      ],
    },
    {
      prompt:
        "Compare how a perfectly competitive market and a monopoly affect consumers. Use one example of each from this week's cases. Describe the number of sellers, price control, and effects on price and choice.",
      scheme: [
        "Describes perfect competition with many sellers and no price control, with an example",
        "States the effects on consumers, such as lower prices and more choice",
        "Describes monopoly with a single seller and price control, with an example",
        "States the effects on consumers, such as higher prices, lower output or fewer choices",
      ],
      model:
        "In perfect competition, such as wheat farming, there are many sellers of identical products and none can control the price, so consumers get low prices and plenty of supply. In a monopoly, such as a town's only cable provider, one seller faces no close rivals and can set the price. Consumers often pay a higher price, get less output and have fewer choices, which is why monopolies are often regulated.",
      answers: [
        [
          "full",
          "[[0|In perfect competition, like wheat farming, there are many sellers selling the same thing and none can control the price]]. [[1|Consumers get low prices and lots of supply]]. [[2|In a monopoly, like a town with only one cable company, one seller has no close rivals and can set the price]]. [[3|Consumers usually pay more, get fewer choices and less quality because there is no competition]].",
          "Full marks. You described the structure and the effect on consumers for each example.",
        ],
        [
          "full",
          "[[0|A perfectly competitive market, like farmers selling wheat, has lots of sellers and no one seller can raise the price without losing customers]]. [[1|That keeps prices low for consumers and gives them lots of choices of who to buy from]]. [[2|A monopoly is a single seller with barriers to entry, like a local cable provider]]. [[3|It can charge higher prices and produce less than a competitive market would, so consumers are worse off, and that's why governments often regulate monopolies]].",
          "All four points. Noting regulation shows you connect structure to public policy.",
        ],
        [
          "partial",
          "[[0|Perfect competition has many sellers like wheat farmers]]. [[2|A monopoly has one seller like a cable company]]. They are different.",
          "You described both structures. Now explain the effects on consumers in each case.",
        ],
        [
          "partial",
          "[[1|Consumers get lower prices in competition]], and [[3|they pay more in a monopoly]].",
          "Good conclusions. Describe the number of sellers and price control in each structure, with an example.",
          true,
        ],
        [
          "weak",
          "In perfect competition there is one big seller and in a monopoly there are many. Monopolies give the best prices.",
          "It's the reverse: perfect competition has many sellers, and a monopoly has one, which can charge more. Review the definitions.",
        ],
        [
          "weak",
          "[[2|A monopoly is when one company is the only seller]]. They are the same for consumers.",
          "The monopoly definition is right, but the effects differ: competition lowers prices and a monopoly can raise them. Compare both.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Government in markets: taxes, regulation, externalities and the business owner",
  note: `
## Objectives

Students will be able to:

1. explain the role of the government in markets, including taxes, regulation and externalities;
2. describe how business owners choose a form of business and what profit is.

## Materials

The hot-chocolate market equations (Qd = 200 - 40P and Qs = 60P - 100), a tax worksheet (a 1-dollar per-cup tax on sellers), an externality case (a paint factory: market price 20 dollars, 100 units a month, 6 dollars of pollution damage per unit), a business-forms comparison table (sole proprietorship, partnership, corporation, LLC), a food-truck income statement (revenue 9,000 dollars, costs 6,500 dollars, owner's best alternative pay 3,000 dollars), and the exit ticket.

## Starter (8 minutes)

Ask: "Who pays when a city adds a 1-dollar tax to every hot chocolate: the shop or the customer?" Let students predict, then promise that the numbers will show it depends.

## Main activity

1. Taxes. A 1-dollar per-cup tax on sellers shifts supply: Qs = 60(P - 1) - 100. Students solve with demand: 200 - 40P = 60P - 160, so P = 3.60 and Q = 56. Buyers now pay 3.60, up 0.60 from 3.00; sellers keep 2.60, down 0.40. The tax revenue is 1.00 x 56 = 56 dollars, and the lost quantity of 24 cups (80 to 56) creates a deadweight loss of about 12 dollars (half of 1.00 times 24).
2. Externalities. The paint factory produces 100 units at 20 dollars each, but each unit causes 6 dollars of damage to neighbors. Students compute the damage (600 dollars) and show how a 6-dollar tax per unit could lower output to 70 units and cut the damage to 420 dollars, a 180-dollar reduction. Discuss regulation versus taxes versus permits.
3. Forms of business. Using the table, compare sole proprietorships, partnerships, corporations and LLCs on ease of setup, liability, taxes and ability to raise money. Then use the food-truck statement: accounting profit is 9,000 minus 6,500, or 2,500 dollars, but if the owner could earn 3,000 dollars elsewhere for the same time, the economic profit is negative 500 dollars.

## Checking for understanding

Whiteboards: "Who bears more of the 1-dollar tax? Show with the new price paid and received."

## Exit ticket

Why might a government tax a product that causes pollution, and what must it know to set the tax at the right level?
`,
  reading: [
    "Taxes, side effects and who owns the business",
    `
Governments take part in markets in many ways: they enforce contracts, set rules to protect safety, supply public goods and collect taxes. Each action changes incentives, so each can be analyzed with supply and demand.

Take a **tax**. Suppose a city adds a 1-dollar tax on each cup of hot chocolate, collected from sellers. For sellers, the tax is a cost added to every cup, so supply decreases: sellers need 1 dollar more at every quantity to supply the same amount. The supply rule becomes Qs = 60(P - 1) - 100, or 60P - 160. Set it equal to demand, 200 - 40P = 60P - 160, and 360 = 100P, so P = 3.60 and Q = 56. Buyers now pay 3.60 instead of 3.00, 60 cents more. Sellers receive 3.60 minus the 1.00 tax, or 2.60, which is 40 cents less than before. The tax was collected from the seller, but its burden is shared: buyers bear 60 percent and sellers 40 percent. This is **tax incidence**, and who bears more depends on elasticity. The side with fewer alternatives bears more. The government collects 1.00 x 56 = 56 dollars. The market, however, produces fewer cups, 56 instead of 80, and some trades that benefited both buyers and sellers no longer happen. The lost value is called **deadweight loss**, about 12 dollars here, half the 1-dollar tax times the 24 cups that vanished.

Prices also fail to capture some costs and benefits. An **externality** is a cost or benefit that falls on someone not involved in the transaction. A **negative externality**, such as pollution, makes the cost to society greater than the cost to the producer. Suppose a paint factory produces 100 units a month at a market price of 20 dollars, and each unit causes 6 dollars of damage to neighbors, so the total external damage is 600 dollars. Because the factory does not pay for the damage, it produces too much from society's point of view. A tax of 6 dollars per unit, equal to the damage, makes the factory pay the full cost of what it does and might lower production to 70 units, cutting the damage to 420 dollars. Governments can also use **regulations**, such as emission limits, or tradable permits. A **positive externality**, such as vaccination that protects others, benefits third parties, and a market tends to produce too little of it, which is why governments subsidize vaccines and education.

People who produce goods must also choose a form of business. A **sole proprietorship** is owned by one person; it is easy to start and the owner keeps the profit, but the owner has **unlimited liability**, meaning personal assets can be used to pay the business's debts. A **partnership** has two or more owners who share profits and decisions, and usually liability. A **corporation** is a separate legal entity owned by shareholders, with **limited liability**, which protects owners' personal assets, and an ability to raise money by selling stock, but its profits can be taxed twice, once at the company and again when paid out as dividends. A **limited liability company** (LLC) mixes features of these, with limited liability and simpler taxes.

Whatever the form, an owner wants **profit**, the difference between total revenue and total cost. A food truck with 9,000 dollars of revenue and 6,500 dollars of costs has an accounting profit of 2,500 dollars. Economists add the opportunity cost of the owner's own time. If the owner could earn 3,000 dollars working elsewhere for the same hours, the **economic profit** is 2,500 minus 3,000, or negative 500 dollars. The business makes money in dollars but is not the best use of the owner's time.

The central lesson is that taxes, rules and structures change incentives, and each has costs as well as benefits. Strong analysis asks who gains, who loses and what trade-offs are made.
`,
  ],
  cards: [
    ["Tax incidence", "How the burden of a tax is divided between buyers and sellers."],
    ["Deadweight loss", "The value of mutually beneficial trades lost because of a tax or other distortion."],
    ["Negative externality", "A cost of a transaction that falls on people who are not part of it, such as pollution."],
    ["Positive externality", "A benefit that falls on third parties, such as the protection from a vaccine."],
    ["Regulation", "A rule set by government to control behavior, such as an emission limit."],
    ["Limited liability", "Protection of owners' personal assets from the business's debts, as in a corporation or an LLC."],
    ["Accounting profit", "Total revenue minus explicit costs."],
    ["Economic profit", "Total revenue minus all costs, including the opportunity cost of the owner's time and money."],
  ],
  closed: [
    [
      "A 1-dollar per-cup tax moves the equilibrium price from 3.00 to 3.60 dollars. How much of the tax do buyers bear per cup?",
      ["0.40 dollars", "0.60 dollars", "1.00 dollar", "3.60 dollars"],
      "B",
    ],
    [
      "After the tax, 56 cups are sold at 3.60 dollars with a 1-dollar tax. How much tax revenue does the government collect?",
      ["36 dollars", "56 dollars", "80 dollars", "201.60 dollars"],
      "B",
    ],
    [
      "A factory produces 100 units, each causing 6 dollars of external damage. What is the total external damage?",
      ["6 dollars", "100 dollars", "600 dollars", "1,000 dollars"],
      "C",
    ],
    [
      "A business owner wants to protect personal savings from the business's debts. Which form is the best match?",
      ["Sole proprietorship", "General partnership", "Limited liability company", "No form protects them"],
      "C",
    ],
    [
      "A shop has revenue of 50,000 dollars and costs of 38,000 dollars, and the owner could earn 15,000 dollars elsewhere. What is the economic profit?",
      ["12,000 dollars", "-3,000 dollars", "15,000 dollars", "-12,000 dollars"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A city adds a 1-dollar tax per cup of hot chocolate collected from sellers. The new equilibrium is 3.60 dollars and 56 cups (the original was 3.00 dollars and 80 cups). (a) Calculate how much of the tax buyers pay and how much sellers pay per cup. (b) Calculate the government's tax revenue. (c) Calculate the deadweight loss, given by one half of the tax times the lost quantity. (d) Explain why the tax is shared even though sellers are the ones who send it to the government.",
      scheme: [
        "Calculates that buyers pay 0.60 more and sellers receive 0.40 less per cup",
        "Calculates tax revenue as 1.00 times 56, or 56 dollars",
        "Calculates the deadweight loss as one half times 1.00 times 24, or 12 dollars",
        "Explains that the tax raises the price buyers pay while lowering what sellers keep, because both adjust their quantities and prices, so the burden depends on how responsive each side is",
      ],
      model:
        "(a) Buyers pay 3.60 instead of 3.00, 0.60 more per cup. Sellers get 3.60 minus the 1.00 tax, or 2.60, which is 0.40 less than before. (b) Revenue is 1.00 times 56 cups, which is 56 dollars. (c) The quantity falls by 24 cups, so deadweight loss is one half times 1.00 times 24, or 12 dollars. (d) The tax is shared because the tax shifts supply, so the market price rises only part of the way. Buyers pay more and sellers keep less, depending on how responsive each is to price.",
      answers: [
        [
          "full",
          "(a) [[0|Buyers pay 3.60 instead of 3.00, which is 60 cents more. Sellers receive 3.60 minus 1.00, which is 2.60, so they get 40 cents less]]. (b) [[1|56 cups times 1 dollar is 56 dollars of revenue]]. (c) [[2|The quantity fell by 24 cups, so deadweight loss is one half times 1 times 24, which is 12 dollars]]. (d) [[3|The tax is shared because the market price rises, but only by 60 cents, which is less than the whole tax. Buyers pay a higher price and sellers keep less, and who bears more depends on how responsive each side is to price]].",
          "Full marks. Your calculations are right and your explanation shows that the burden is not decided by who writes the check.",
        ],
        [
          "full",
          "(a) [[0|Buyers pay 60 cents of the tax since the price went up from 3.00 to 3.60, and sellers pay the other 40 cents because they only keep 2.60]]. (b) [[1|The government collects 1 times 56, which is 56 dollars]]. (c) [[2|Half of 1 dollar times the 24 lost cups is 12 dollars of deadweight loss]]. (d) [[3|The seller can't pass all of the tax to buyers because buyers would buy fewer cups, and the seller can't absorb it all because they'd stop making them, so each side takes part of the burden]].",
          "All four points. 'Buyers would buy fewer cups, and sellers would stop making them' is a clear account of why each side takes some.",
        ],
        [
          "partial",
          "(a) [[0|Buyers pay 60 cents more and sellers get 40 cents less]]. (b) [[1|56 dollars]]. (c) The deadweight loss is 24. (d) Because of supply.",
          "Parts (a) and (b) are right. In (c) use one half times the tax times the lost quantity, and in (d) explain why the burden is shared.",
        ],
        [
          "partial",
          "(c) [[2|One half times 1 times 24 is 12 dollars]]. (d) [[3|The tax raises the price but not by a full dollar, so both sides pay some]]. (a) Buyers pay 1 dollar. (b) 36.",
          "Parts (c) and (d) are right. In (a) buyers pay 0.60, and in (b) revenue is 1.00 times 56, which is 56 dollars.",
          true,
        ],
        [
          "weak",
          "(a) Sellers pay the full dollar because they send the money. (b) 80 dollars. (c) 24 dollars. (d) The government decides.",
          "Check the price changes: buyers pay 3.60 and sellers keep 2.60, so both bear part. Revenue is the tax times 56 cups.",
        ],
        [
          "weak",
          "(a) [[0|Buyers pay 60 cents more]]. (b) 3.60. (c) 56. (d) It isn't shared.",
          "The buyer's share is right. Revenue is 56 dollars, deadweight loss is 12 and the burden is shared. Review the calculations.",
        ],
      ],
    },
    {
      prompt:
        "A paint factory sells 100 units a month at 20 dollars each, and each unit causes 6 dollars of pollution damage to neighbors. (a) Calculate the total external damage. (b) Explain why the market produces too much from society's point of view. (c) A 6-dollar tax per unit reduces output to 70 units. Calculate the new damage and the reduction. (d) Name one alternative to a tax and one drawback of it.",
      scheme: [
        "Calculates 600 dollars of external damage",
        "Explains that the factory does not pay the external cost, so it ignores part of the true cost and produces too much",
        "Calculates 420 dollars of damage and the 180-dollar reduction",
        "Names an alternative such as regulation or permits and gives a drawback",
      ],
      model:
        "(a) 100 units times 6 dollars is 600 dollars. (b) The factory does not pay for the damage to neighbors, so the cost it faces is lower than the true cost to society, and it produces more than is best for society. (c) With a 6-dollar tax, output falls to 70 units, and the damage is 70 times 6, or 420 dollars, a reduction of 180 dollars. (d) An alternative is a regulation capping emissions, whose drawback is that it may not give firms an incentive to cut pollution cheaply, and it requires the government to monitor each firm.",
      answers: [
        [
          "full",
          "(a) [[0|100 x 6 = 600 dollars of damage]]. (b) [[1|The factory doesn't pay for the damage to the neighbors, so it only counts its own costs and produces more than is best for society]]. (c) [[2|After the tax output is 70, so the damage is 70 x 6 = 420 dollars, which is 180 dollars less]]. (d) [[3|An alternative is an emission limit regulation, and a drawback is that the government has to monitor each firm and a limit doesn't reward firms that find cheaper ways to cut pollution]].",
          "Full marks. Your drawback for regulation, that it does not reward cheap reductions, is a point economists make.",
        ],
        [
          "full",
          "(a) [[0|The total damage is 600 dollars]]. (b) [[1|It's a negative externality, because the cost falls on people who aren't part of the sale, and the factory ignores it, so more gets made than society would want]]. (c) [[2|At 70 units the damage is 420, so the tax cuts the damage by 180 dollars]]. (d) [[3|Another option is tradable pollution permits, and a drawback is that the permits might be set too high or concentrated pollution in certain neighborhoods]].",
          "All four points. Naming a negative externality and a permit system shows command of the vocabulary.",
        ],
        [
          "partial",
          "(a) [[0|600 dollars]]. (b) The factory makes too much. (c) The damage goes down. (d) The government can fine them.",
          "Part (a) is right. Explain why the factory overproduces, calculate the new damage (420) and the reduction, and name a drawback.",
        ],
        [
          "partial",
          "(c) [[2|70 x 6 is 420 dollars, so it falls by 180]]. (b) [[1|The factory doesn't pay for the damage so it makes too many]]. (a) 100 dollars.",
          "Parts (b) and (c) are right. In (a), the damage is 100 units times 6 dollars, which is 600 dollars.",
          true,
        ],
        [
          "weak",
          "(a) 20 dollars. (b) The market always produces the right amount. (c) 70 dollars. (d) No other way.",
          "The damage is 6 dollars per unit, so for 100 units it is 600 dollars. Because the factory does not pay it, the market overproduces. Review the externality definition.",
        ],
        [
          "weak",
          "(a) [[0|600]]. (b) Because the neighbors like paint. (c) The tax makes the damage go up. (d) Fines.",
          "The total is right. A tax reduces output and damage, and the market overproduces because the factory does not pay for the damage.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Wages, skills and a savings plan: labor markets, budgets, loans and compound interest",
  note: `
## Objectives

Students will be able to:

1. describe how labor markets set wages and how education and skills affect earnings;
2. use a budget, a loan and compound interest to make a savings plan.

## Materials

A labor-market schedule for summer jobs in Columbus (Ld = 120 - 6W and Ls = 4W + 20, where L is hundreds of workers), a table of approximate median weekly earnings by education from the Bureau of Labor Statistics (about 900 dollars with a high school diploma, about 1,500 with a bachelor's degree), a monthly take-home budget template (1,800 dollars), a loan scenario (12,000 dollars at 6 percent a year, 48 monthly payments), a compound-interest worksheet, calculators, and the exit ticket.

## Starter (8 minutes)

Ask: "Why does a surgeon earn more than a cashier? Is it fair? Is it explainable?" List reasons: training time, skill, risk, how many people can do the job. Introduce the idea of a price for labor.

## Main activity

1. Labor markets. Using Ld and Ls, find the equilibrium wage: 120 - 6W = 4W + 20, so W = 10 dollars an hour and L = 60 (6,000 workers). Then test a 12-dollar minimum wage: Ld = 48 and Ls = 68, so 2,000 more people want work than there are jobs, a surplus of labor. Discuss who gains (workers who keep jobs at the higher wage) and who loses (those who lose or cannot find work), and the economists' debate about the size of such effects.
2. Skills and earnings. Students compute the weekly and annual difference between a high school diploma and a bachelor's degree: 600 dollars a week, or 31,200 dollars a year (52 weeks). They discuss human capital, the knowledge and skills that raise productivity, and the costs of acquiring it.
3. Money plan. Build a budget from 1,800 dollars of monthly take-home pay using a 50/30/20 split (900 needs, 540 wants, 360 savings). Compute a car loan: 12,000 dollars at 6 percent a year over 48 months has a payment of about 281.82 dollars and total interest of about 1,527 dollars. Compare simple and compound interest on 1,000 dollars at 5 percent for 10 years (1,500 versus about 1,629) and apply the Rule of 72.

## Checking for understanding

Whiteboards: "Using the Rule of 72, how long does 1,000 dollars take to double at 6 percent?" (12 years)

## Exit ticket

State one trade-off in your own savings plan and one number that shows its effect.
`,
  reading: [
    "The price of work, the value of skills and the arithmetic of money over time",
    `
A wage is the price of labor, and like other prices it is set by supply and demand. Employers demand labor, and the quantity they want falls as the wage rises, because labor is a cost. Workers supply labor, and the quantity offered rises with the wage, because a higher wage draws more people into jobs and more hours. In a summer job market in Columbus, suppose the demand for workers is Ld = 120 - 6W and the supply is Ls = 4W + 20, with L counted in hundreds. Setting them equal gives 100 = 10W, so W = 10 dollars and L = 60, meaning 6,000 jobs. At 10 dollars an hour, every worker who wants to work at that wage can find a job.

Now suppose a rule sets a minimum wage of 12 dollars an hour. Employers now demand Ld = 120 - 72 = 48, or 4,800 workers, while workers supply Ls = 48 + 20 = 68, or 6,800. The labor market has a surplus of 2,000. Those who keep their jobs earn more, but some lose jobs, and others who want work cannot find any. The size of this effect is debated among economists. Real labor markets have employers with some power over wages, and workers' hours and prices adjust in many ways. A careful analysis names the groups, estimates the effect and avoids claiming certainty. The federal minimum wage has been 7.25 dollars an hour since 2009, and many states, including Ohio, set higher ones.

Wages differ across jobs because of skills, training and conditions. **Human capital** is the knowledge and skill workers acquire through education, training and experience. It raises productivity, so employers pay more for it. Data from the Bureau of Labor Statistics show that median weekly earnings are about 900 dollars for workers with a high school diploma and about 1,500 dollars for those with a bachelor's degree. The difference of 600 dollars a week is about 31,200 dollars a year (600 times 52). Unemployment rates also differ, about 4 percent for workers with a high school diploma and about 2 percent for those with a bachelor's degree. These are averages, not guarantees, and they do not account for the cost of tuition or the earnings lost while studying. Still, they show why skills usually pay.

Money decisions are also trade-offs over time. A **budget** is a plan for spending and saving. One common guide, the 50/30/20 rule, divides take-home pay into 50 percent needs, 30 percent wants and 20 percent savings. For 1,800 dollars a month, that is 900 for needs, 540 for wants and 360 for savings.

A **loan** is borrowed money that must be repaid with **interest**, the price of borrowing. A 12,000-dollar car loan at 6 percent a year, repaid in 48 equal monthly payments, has a monthly payment of about 281.82 dollars. Over 48 months the borrower pays about 13,527 dollars, so the interest costs about 1,527 dollars. A longer loan lowers the monthly payment but raises the total interest. Saving works in the opposite direction. **Simple interest** is earned only on the original amount: 1,000 dollars at 5 percent earns 50 dollars each year, or 500 dollars over ten years, for a total of 1,500. **Compound interest** is earned on the interest as well, so the balance grows by the same percentage each year: 1,000 times 1.05 to the tenth power is about 1,629 dollars. The difference grows with time. A quick estimate is the **Rule of 72**: divide 72 by the annual interest rate in percent to find the years needed to double. At 6 percent, money doubles in about 12 years, since 72 divided by 6 is 12.

A savings plan that works uses all of these ideas: a budget that makes room for saving, an understanding of what borrowing costs and the patience to let compounding work.
`,
  ],
  cards: [
    ["Wage", "The price of labor, set by the supply of workers and the demand from employers."],
    ["Human capital", "Knowledge and skills gained through education, training and experience that raise productivity."],
    ["Minimum wage", "A legal floor on hourly pay; if above equilibrium, it creates a surplus of labor."],
    ["Budget", "A plan for how to spend and save income."],
    ["50/30/20 rule", "A guide that splits take-home pay into 50 percent needs, 30 percent wants and 20 percent savings."],
    ["Interest", "The price of borrowing money, or the reward for saving it."],
    ["Simple versus compound interest", "Simple interest is earned only on the principal; compound interest is earned on principal plus past interest."],
    ["Rule of 72", "A shortcut: years to double is about 72 divided by the interest rate in percent."],
  ],
  closed: [
    [
      "With Ld = 120 - 6W and Ls = 4W + 20, what is the equilibrium wage?",
      ["8 dollars", "10 dollars", "12 dollars", "20 dollars"],
      "B",
    ],
    [
      "At a minimum wage of 12 dollars, Ld = 48 and Ls = 68 (in hundreds). How many more people want jobs than there are jobs?",
      ["20", "200", "2,000", "6,800"],
      "C",
    ],
    [
      "Median weekly earnings are about 900 dollars with a high school diploma and about 1,500 with a bachelor's degree. About how much more per year is that for the bachelor's degree, assuming 52 weeks?",
      ["About 3,100 dollars", "About 31,200 dollars", "About 46,800 dollars", "About 78,000 dollars"],
      "B",
    ],
    [
      "A worker takes home 1,800 dollars a month. Under the 50/30/20 rule, how much goes to savings?",
      ["180 dollars", "360 dollars", "540 dollars", "900 dollars"],
      "B",
    ],
    [
      "Using the Rule of 72, about how many years does it take for money to double at 8 percent interest?",
      ["6 years", "9 years", "12 years", "18 years"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "In a summer job market, Ld = 120 - 6W and Ls = 4W + 20 (L in hundreds of workers). (a) Calculate the equilibrium wage and number of jobs. (b) Suppose the minimum wage is set at 12 dollars. Calculate the quantity of labor demanded and supplied and the surplus. (c) Explain who gains and who loses from the minimum wage, and why economists might disagree about its size.",
      scheme: [
        "Solves 120 - 6W = 4W + 20 to get W = 10 and L = 60 (6,000 jobs)",
        "Calculates demand of 48 and supply of 68 at 12 dollars, a surplus of 20 (2,000 workers)",
        "Identifies who gains, such as workers who keep their jobs at a higher wage",
        "Identifies who loses and explains the disagreement, such as workers who lose jobs or cannot find them and the uncertainty about how many",
      ],
      model:
        "(a) Set 120 - 6W = 4W + 20, so 100 = 10W and W = 10 dollars. Then L = 60, or 6,000 jobs. (b) At 12 dollars, labor demanded is 120 - 72 = 48 (4,800 workers) and supplied is 48 + 20 = 68 (6,800), a surplus of 20, or 2,000 workers. (c) Workers who keep their jobs gain from the higher wage. Workers who lose jobs or cannot find them lose. Economists might disagree about the size of the job loss, because real labor markets differ from the model, and employers may adjust hours or prices.",
      answers: [
        [
          "full",
          "(a) [[0|120 - 6W = 4W + 20, so 100 = 10W, which makes W = 10 dollars and L = 60, which is 6,000 jobs]]. (b) [[1|At 12 dollars demand is 120 - 72 = 48 and supply is 48 + 20 = 68, so there is a surplus of 20, which is 2,000 workers]]. (c) [[2|Workers who keep their jobs gain because they earn more]]. [[3|Workers who lose jobs or can't find one lose, and economists disagree about how many because real labor markets don't match the simple model and employers can change hours or prices]].",
          "Full marks. Your numbers are right and your answer to (c) names both groups and the reason for the disagreement.",
        ],
        [
          "full",
          "(a) [[0|Setting them equal gives 10 dollars an hour and 60 hundred workers, so 6,000 jobs]]. (b) [[1|At 12 dollars firms want 48 hundred workers and 68 hundred want to work, so there are 20 hundred, or 2,000, more people wanting a job than there are jobs]]. (c) [[2|Gainers are workers who still have a job and now earn 2 dollars more per hour]]. [[3|Losers are the 2,000 who can't get jobs and maybe workers whose hours get cut. Economists disagree because some studies find small job losses and others find bigger ones, and it depends on how much power employers have]].",
          "All four points. Noting that studies find different job-loss sizes captures the real disagreement.",
        ],
        [
          "partial",
          "(a) [[0|The wage is 10 dollars and there are 6,000 jobs]]. (b) There's a surplus. (c) Some people win and some lose.",
          "Part (a) is right. In (b), calculate demand, supply and the size of the surplus, and in (c) name the groups and the reasons for disagreement.",
        ],
        [
          "partial",
          "(b) [[1|At 12 dollars demand is 48 and supply is 68, a surplus of 2,000 workers]]. (c) [[2|Workers who keep jobs gain]]. (a) The equilibrium is at 12 dollars.",
          "Parts (b) and (c) are good. In (a), the equilibrium wage is 10 dollars and 6,000 jobs. The 12 dollars is the minimum wage.",
          true,
        ],
        [
          "weak",
          "(a) The wage is 120 and the jobs are 20. (b) There is a shortage of workers at 12 dollars. (c) Everyone gains from a higher wage.",
          "Set demand equal to supply and solve for W. At 12 dollars there is a surplus of workers, and some workers lose jobs.",
        ],
        [
          "weak",
          "(a) [[0|10 dollars and 6,000 jobs]]. (b) 12 dollars doesn't change anything. (c) Only businesses lose.",
          "Part (a) is right. At 12 dollars, labor demanded falls to 48 and supplied rises to 68, so there is a surplus. Workers who lose jobs also lose.",
        ],
      ],
    },
    {
      prompt:
        "Aisha takes home 1,800 dollars a month and wants to buy a 12,000-dollar used car with a loan at 6 percent a year over 48 months (monthly payment about 281.82 dollars). She also wants to save 2,000 dollars now at 5 percent compounded yearly. (a) Under the 50/30/20 rule, how much should she save each month, and does the car payment fit in the needs part (900 dollars) if her other needs are 650 dollars? (b) Calculate the total interest on the loan. (c) Calculate the balance after 10 years on the 2,000-dollar deposit and compare it with simple interest. (d) Use the Rule of 72 to estimate how long it takes the deposit to double.",
      scheme: [
        "States 360 dollars a month in savings and checks the needs budget (650 + 281.82 = 931.82, which exceeds 900)",
        "Calculates total interest of about 1,527 dollars (48 payments of 281.82 total about 13,527 minus 12,000)",
        "Calculates about 3,258 dollars compounded versus 3,000 with simple interest",
        "Uses the Rule of 72 to estimate about 14.4 years to double at 5 percent",
      ],
      model:
        "(a) Under the rule, she should save 20 percent of 1,800, or 360 dollars. Her needs would total 650 + 281.82 = 931.82 dollars, which is more than the 900 allowed, so the car payment does not fit unless she cuts other needs or chooses a cheaper car. (b) She would pay 281.82 x 48 = about 13,527 dollars, so the interest is about 1,527 dollars. (c) With compounding, 2,000 x 1.05 to the tenth is about 3,258 dollars, while simple interest gives 2,000 + 10 x 100 = 3,000 dollars. (d) The Rule of 72 gives 72 divided by 5, about 14.4 years to double.",
      answers: [
        [
          "full",
          "(a) [[0|20 percent of 1,800 is 360 dollars a month in savings, and 650 plus 281.82 is 931.82, which is more than the 900 for needs, so the car payment doesn't fit]]. (b) [[1|281.82 times 48 is about 13,527 dollars, minus the 12,000 borrowed, so interest is about 1,527 dollars]]. (c) [[2|2,000 times 1.05 to the 10th is about 3,258 dollars, compared with 3,000 with simple interest, so compounding gives about 258 dollars more]]. (d) [[3|72 divided by 5 is about 14.4 years to double]].",
          "Full marks. Each calculation is correct and you noticed that the car payment pushes needs over the budget.",
        ],
        [
          "full",
          "(a) [[0|She should save 360 dollars a month, and her needs would be 650 + 281.82 = 931.82, which is over 900, so she would need to cut other needs or buy a cheaper car]]. (b) [[1|Total payments are about 13,527 dollars, so about 1,527 dollars is interest]]. (c) [[2|After 10 years the compound balance is about 3,258 dollars, while simple interest would give 2,000 plus 10 years of 100 dollars, which is 3,000]]. (d) [[3|The Rule of 72 says 72 over 5 is 14.4 years]].",
          "All four points. Your comparison of the budget with the car payment shows how the pieces of a plan interact.",
        ],
        [
          "partial",
          "(a) [[0|She should save 360 dollars a month, and the car payment doesn't fit in the 900]]. (b) The interest is a lot. (c) It grows. (d) 14 years.",
          "Part (a) is right. In (b) and (c) calculate the dollar amounts, and in (d) show how you used the Rule of 72.",
        ],
        [
          "partial",
          "(b) [[1|About 1,527 dollars in interest]]. (d) [[3|72 divided by 5 is 14.4 years]]. (a) She should save 180. (c) 3,000.",
          "Parts (b) and (d) are right. In (a), 20 percent of 1,800 is 360. In (c), compounding gives about 3,258, not 3,000.",
          true,
        ],
        [
          "weak",
          "(a) She should save 900 dollars. (b) The interest is 6 percent so 720. (c) 2,000. (d) 5 years.",
          "Twenty percent of 1,800 is 360, and the interest on the loan is the total of the payments minus 12,000. Review the formulas.",
        ],
        [
          "weak",
          "(a) [[0|She should save 360]]. (b) There's no interest on a loan. (c) Simple and compound interest are the same. (d) Can't be done.",
          "Loans carry interest, compound interest grows faster than simple interest, and the Rule of 72 estimates doubling time. Redo each part.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Using data to argue about policy: free community college",
  note: `
## Objectives

Students will be able to:

1. gather and compare data from the Bureau of Labor Statistics and other sources on a question about the economy;
2. build an argument about an economic policy using data and economic reasoning.

## Materials

A data packet (teacher-prepared, with approximate Bureau of Labor Statistics figures for median weekly earnings and unemployment by education, and a Census Bureau note on median household income that uses a different measure), a cost-benefit organizer, a policy brief on a proposal for free community college tuition (cost 6,000 dollars a year per student for two years, 12,000 dollars total), a source-comparison checklist, an argument rubric, calculators, and the exit ticket.

## Starter (8 minutes)

Ask: "A candidate says a policy will pay for itself. What would you need to see to believe it?" Collect answers: costs, benefits, who pays, how long it takes, what else could be done with the money.

## Main activity

1. Compare sources. In pairs, students compare two sources on earnings: a BLS table of median weekly earnings by education, and a Census Bureau figure for median household income. They list how the measures differ (a worker's weekly pay versus a household's yearly income), what each can show and what it cannot, and the dates and methods of collection.
2. Build the cost-benefit case. Using the packet, students compute: a worker with an associate degree earns about 150 dollars more per week than a worker with a high school diploma, or 7,800 dollars a year (52 weeks). The 12,000-dollar tuition would be repaid by that premium in about 1.5 years (12,000 divided by 7,800 is about 1.54), if the premium holds and ignoring the earnings lost while studying. Students list opportunity costs, who pays (taxpayers) and who benefits (students, employers, the public through higher taxes and lower unemployment).
3. Write the argument. In 20 minutes, each student writes a short policy argument with a claim, two pieces of data, economic reasoning (incentives, opportunity cost, marginal analysis, externalities) and a counterargument.

## Checking for understanding

Pairs swap arguments and mark where the data are specific and where the economic reasoning is explicit.

## Exit ticket

Write the one piece of data that would most change your mind about the policy.
`,
  reading: [
    "From numbers to an argument: is free community college worth it?",
    `
Good economic arguments begin with data from reliable sources. The **Bureau of Labor Statistics** (BLS), part of the U.S. Department of Labor, publishes monthly figures on employment and unemployment and regular tables on earnings by education, occupation and region. The **Census Bureau** reports on incomes and poverty using household surveys. The two measure different things. The BLS figure for median weekly earnings describes full-time workers' pay, while the Census figure for median household income adds up everyone's income in a household over a year, so the two numbers cannot be compared directly. A careful researcher records the source, the date, the definition and the method, and notes what the data leave out.

Suppose a state is considering a policy of free community college tuition. Opponents and supporters will use data. A BLS table shows that workers with an associate degree earn about 150 dollars more per week than workers with only a high school diploma, about 1,050 dollars versus 900 dollars. Over a year that is 150 times 52, or 7,800 dollars. Unemployment is also lower for workers with more education, about 4 percent for high school graduates and below that for those with an associate degree. If the tuition for two years totals 12,000 dollars, then dividing 12,000 by 7,800 shows that the earnings premium repays the cost in about 1.5 years of work. That is a strong return, if the averages hold.

Economic reasoning adds the rest. The **opportunity cost** of college includes not only tuition but also the wages a student could have earned. A student who attends full time may give up 15,000 dollars or more of work income per year, which makes the true cost much larger than tuition. **Marginal analysis** asks whether the next student who enrolls because of the policy gains as much as the average graduate. Students who would have gone anyway receive a benefit without changing their behavior, which reduces the value of the policy, while students induced to enroll by free tuition, who may be more likely to drop out, may gain less than the average. **Incentives** matter too: a free program might attract more students, but if completion rates are low, the average return is lower. **Externalities** may favor the policy, since an educated workforce can raise tax revenue and lower public spending, benefits that go beyond the student. Finally, **trade-offs**: the same money could fund other uses, such as targeted aid, apprenticeships or lower taxes.

A strong written argument includes a **claim**, such as "A state should fund free community college tuition for students who complete a program." It then supplies **evidence**, such as the earnings gap and unemployment data. It gives **reasoning** that explains why the evidence matters and uses economic concepts. It also addresses a **counterargument**: "Critics say much of the money would go to students who would have enrolled anyway. That is a real concern, and the program could target aid to need or require completion, which would raise the return for each dollar spent."

The goal is not to prove one answer correct, but to show that your position is built from sources you can name and reasoning others can check. When data cannot settle a question, say what additional data would, and what assumptions you are making.
`,
  ],
  cards: [
    ["Bureau of Labor Statistics (BLS)", "The federal agency that publishes data on employment, unemployment, earnings and prices."],
    ["Census Bureau", "The federal agency that publishes data on population, income and poverty."],
    ["Earnings premium", "The extra pay a worker with more education earns compared with a worker with less."],
    ["Payback period", "The time needed for the benefits of an investment, such as tuition, to repay its cost."],
    ["Cost-benefit analysis", "Comparing the total costs and benefits of a choice to judge whether it is worthwhile."],
    ["Average versus marginal", "The average graduate's gain may differ from the gain for a student who enrolls only because of a new policy."],
    ["Counterargument", "A reasonable objection to your position that a strong argument answers."],
    ["Assumption", "Something taken as true in an analysis, which should be stated and tested."],
  ],
  closed: [
    [
      "A degree raises earnings by 150 dollars a week. Over 52 weeks, how much more does a worker earn in a year?",
      ["1,500 dollars", "7,800 dollars", "15,000 dollars", "78,000 dollars"],
      "B",
    ],
    [
      "Tuition of 12,000 dollars is repaid by an earnings premium of 7,800 dollars a year. About how long does repayment take?",
      ["About 6 months", "About 1.5 years", "About 3 years", "About 5 years"],
      "B",
    ],
    [
      "Why can't a BLS weekly earnings figure be compared directly with the Census median household income?",
      [
        "They are from different planets",
        "They measure different things: one worker's weekly pay, the other a household's yearly income",
        "BLS data are always wrong",
        "Census data are always older",
      ],
      "B",
    ],
    [
      "Which factor is part of the opportunity cost of attending college full time?",
      [
        "The wages the student could have earned instead",
        "The graduation ceremony",
        "The price of a textbook only",
        "The tax paid by employers",
      ],
      "A",
    ],
    [
      "Which is the best counterargument to a claim that free tuition benefits everyone who uses it?",
      [
        "Tuition is always too low",
        "Some students would have enrolled anyway, so for them the policy only transfers money",
        "College is not real",
        "Students all drop out",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A state proposes free community college tuition (12,000 dollars per student for two years). The BLS data packet shows median weekly earnings of about 900 dollars with a high school diploma and about 1,050 dollars with an associate degree. (a) Calculate the yearly earnings premium. (b) Calculate the payback period for the 12,000-dollar tuition. (c) Explain two reasons the real payback could be longer than your calculation, using economic concepts. (d) Name one reason the policy might be worth it even if the payback is long.",
      scheme: [
        "Calculates the premium of 150 dollars a week, or 7,800 dollars a year",
        "Calculates the payback as about 1.5 years (12,000 divided by 7,800)",
        "Explains a first reason the payback could be longer, such as earnings lost while studying (opportunity cost)",
        "Explains a second reason, such as lower returns for students who enroll only because of the policy or do not finish, or that averages do not apply to everyone",
        "Names a reason the policy might be worth it, such as a positive externality (higher taxes paid, lower unemployment)",
      ],
      model:
        "(a) The premium is 1,050 - 900 = 150 dollars a week, so 150 x 52 = 7,800 dollars a year. (b) 12,000 divided by 7,800 is about 1.5 years. (c) The payback could be longer because a student gives up earnings while studying, which is an opportunity cost, and because students who enroll only because tuition is free, and who may not finish, may earn less of a premium than the average graduate. (d) The policy might be worth it anyway because of positive externalities: more educated workers pay more in taxes and are less likely to be unemployed, which benefits the public as well as the student.",
      answers: [
        [
          "full",
          "(a) [[0|1,050 minus 900 is 150 dollars a week, and times 52 is 7,800 dollars a year]]. (b) [[1|12,000 divided by 7,800 is about 1.5 years]]. (c) [[2|One reason is the opportunity cost, since students give up wages while they study]]. [[3|Another is that students who enroll only because it's free may be less likely to finish, so they won't get the average premium]]. (d) [[4|It might still be worth it because of externalities: more educated workers pay more taxes and are less likely to be unemployed, so the public gains too]].",
          "Full marks. Your numbers are right, and both reasons use real economic concepts instead of vague doubts.",
        ],
        [
          "full",
          "(a) [[0|The difference is 150 dollars a week, which is 7,800 a year]]. (b) [[1|12,000 divided by 7,800 is about 1.54, so around a year and a half]]. (c) [[2|The calculation ignores what students could have earned working instead, which could be 15,000 or more a year]]. [[3|It also uses the average graduate, but marginal students who'd only go because it's free may have lower completion rates and earn less]]. (d) [[4|A reason to do it anyway is that society benefits when more people are employed and paying taxes, which is a positive externality]].",
          "All five points. Distinguishing the average student from the marginal student is a sophisticated use of marginal analysis.",
        ],
        [
          "partial",
          "(a) [[0|150 dollars a week is 7,800 a year]]. (b) [[1|About 1.5 years]]. (c) It could take longer. (d) It's good.",
          "Parts (a) and (b) are right. In (c) give specific reasons, and in (d) give a specific benefit.",
        ],
        [
          "partial",
          "(c) [[2|Students give up wages while they study]], and [[4|educated people pay more taxes]]. (a) 1,500. (b) 8 years.",
          "Your reasoning in (c) and (d) is strong, but the premium is 150 x 52 = 7,800 a year, and 12,000 divided by 7,800 is about 1.5 years.",
          true,
        ],
        [
          "weak",
          "(a) 1,050 plus 900 is 1,950. (b) 12,000 divided by 1,950 is 6. (c) It won't change. (d) Nothing.",
          "The premium is the difference between the two earnings, not the sum. Use that to compute the yearly premium and the payback.",
        ],
        [
          "weak",
          "(a) [[0|150 dollars a week]]. (b) The payback is never. (c) College is expensive. (d) Not sure.",
          "The weekly premium is right, but multiply by 52 and divide the tuition by it. Explain specific reasons with economic concepts.",
        ],
      ],
    },
    {
      prompt:
        "Write a short policy argument on the question: Should the state fund free community college tuition? Include a claim, two pieces of data from this week's packet (earnings premium of 150 dollars a week; unemployment of about 4 percent for high school graduates; tuition of 12,000 dollars), economic reasoning that uses at least one concept (opportunity cost, marginal analysis, incentives or externalities), and a counterargument with a response.",
      scheme: [
        "States a clear claim",
        "Uses a first piece of accurate data",
        "Uses a second piece of accurate data",
        "Gives economic reasoning with at least one named concept",
        "States a counterargument",
        "Responds to the counterargument with reasoning or a proposed adjustment",
      ],
      model:
        "The state should fund free community college tuition, but only for students who complete a program. An associate degree raises weekly earnings by about 150 dollars, or 7,800 dollars a year, so the 12,000-dollar tuition is repaid in about a year and a half of work. This is a positive externality too, since more educated workers pay more taxes and face lower unemployment. Critics say many students would have enrolled anyway, so the money goes to those who don't need it. That is a real concern, but tying funding to completion and to financial need would raise the return, since it directs money to students whose choice depends on it.",
      answers: [
        [
          "full",
          "[[0|I think the state should fund free community college but only for students who finish]]. [[1|An associate degree raises earnings by about 150 dollars a week, which is 7,800 a year]]. [[2|The 12,000 dollar tuition is paid back in about 1.5 years of the extra earnings]]. [[3|Economically, there are positive externalities: more educated workers pay more taxes and are less likely to be unemployed, so everyone gains and not just the student]]. [[4|Critics say many students would have enrolled anyway, so the money is wasted]]. [[5|That's true for some, but requiring completion and basing aid on need means the money goes to students whose choice depends on it, which raises the return]].",
          "Full marks. Your argument ties specific data to an economic concept and your response modifies the policy instead of just denying the objection.",
        ],
        [
          "full",
          "[[0|My claim is that the state should not fund free tuition for everyone, because the cost is too high compared with targeted help]]. [[1|Tuition is 12,000 dollars per student]], and [[2|unemployment for high school graduates is about 4 percent, so most of the people who would use the program are already employed]]. [[3|The opportunity cost matters too, because the money could go to targeted aid that helps students who really can't afford college, which raises the benefit per dollar spent]]. [[4|Supporters say the earnings premium of 150 dollars a week repays the cost in a year and a half]]. [[5|But that is the average for graduates, and students who enroll only because it's free may finish less often, so the marginal return is lower than the average]].",
          "All six points. You argued the opposite from the first answer and used marginal analysis to answer the strongest objection.",
        ],
        [
          "partial",
          "[[0|The state should fund free community college]]. [[1|An associate degree raises earnings 150 dollars a week]]. It's a good investment.",
          "A claim and one data point. Add a second piece of data, name an economic concept, and address a counterargument.",
        ],
        [
          "partial",
          "[[4|Some people say students would have enrolled anyway]], [[5|but you could require completion]]. [[2|The unemployment rate is about 4 percent for high school graduates]].",
          "You have a data point and an objection with a response. State a claim, add the earnings data and use an economic concept in your reasoning.",
          true,
        ],
        [
          "weak",
          "College should be free because everyone deserves it and money isn't important. Everyone agrees.",
          "A policy argument needs specific data and economic reasoning, such as costs and benefits. Use numbers from the packet.",
        ],
        [
          "weak",
          "[[0|The state shouldn't fund it]]. It costs money, and money is bad.",
          "A claim needs data like the 12,000 tuition and 150 dollar weekly premium, reasoning about costs and benefits, and a response to a counterargument.",
        ],
      ],
    },
  ],
};

writeCourse("economics-grade-12.json", "Economics", "Grade 12", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
