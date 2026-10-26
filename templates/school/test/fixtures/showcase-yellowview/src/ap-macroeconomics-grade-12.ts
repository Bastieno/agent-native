import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * AP Macroeconomics, Grade 12, Quarter 1. Units 1 to 4 and the course's
 * skills: graphs, calculations, data and free-response writing. All figures
 * and questions are original; real data are cited only where noted as
 * approximate.
 */

const w1: WeekInput = {
  topic: "Scarcity, comparative advantage, terms of trade and market equilibrium",
  note: `
## Objectives

Students will be able to:

1. explain scarcity, opportunity cost and comparative advantage using a production possibilities curve;
2. calculate absolute and comparative advantage and the terms of trade;
3. explain how supply and demand determine market equilibrium and what shifts them.

## Materials

A two-country output table (per hour of labor: Country X produces 8 bushels of wheat or 4 bolts of cloth; Country Y produces 3 bushels or 2 bolts), a PPC graph template, supply-and-demand graph templates, a shifter sort (determinants of demand and supply), a short scoring guide for graph questions (labeled axes, curves, equilibrium, shifts), and the exit ticket.

## Starter (8 minutes)

Display the output table and ask: "Country X is better at producing both goods. Should X trade with Y at all?" Let students vote and give a one-sentence reason. Keep the votes visible until the end of class.

## Main activity

1. Opportunity cost from the table. Students calculate: in X, one bushel of wheat costs 0.5 bolt (4 divided by 8) and one bolt costs 2 bushels; in Y, a bushel costs about 0.67 bolt (2 divided by 3) and a bolt costs 1.5 bushels. X has an absolute advantage in both goods, since it produces more of each per hour, but X has the comparative advantage in wheat (0.5 is lower than 0.67) and Y in cloth (1.5 is lower than 2).
2. Terms of trade. The price of one bushel in bolts must fall between 0.5 and 0.67 for both to gain, or one bolt must trade for between 1.5 and 2 bushels. Students test 0.6 bolts per bushel and then a value outside the range, and explain why one country would refuse.
3. Market equilibrium. Review the supply and demand model with a market for electric bicycles. Students graph equilibrium, then shift curves for each scenario (a government rebate for buyers, a rise in battery prices, a news report that safety standards will tighten) and state the effect on price and quantity.
4. Practice free response. Students answer one graph question in the format of the exam.

## Checking for understanding

Whiteboards: "Which country has the comparative advantage in cloth, and what is the evidence?"

## Exit ticket

Revisit your starter vote and write a one-sentence revision.
`,
  reading: [
    "Gains from trade without being the best at anything",
    `
Scarcity, the condition of limited resources against unlimited wants, forces choices, and every choice has an **opportunity cost**, the value of the next-best alternative given up. A **production possibilities curve** (PPC) turns this idea into a model. It shows the maximum combinations of two goods an economy can produce, given its resources and technology. Points on the curve are efficient, points inside the curve waste resources, and points outside are unattainable for now. A straight-line PPC shows constant opportunity cost, while a bowed-outward PPC shows increasing opportunity cost, because resources are not equally suited to every use. Economic growth shifts the PPC outward.

International trade rests on a surprising idea. A country does not have to be the best at producing anything to gain from trade. Suppose that, per hour of labor, Country X can produce 8 bushels of wheat or 4 bolts of cloth, and Country Y can produce 3 bushels of wheat or 2 bolts of cloth. Country X has an **absolute advantage** in both goods, because it produces more of each with the same input. But the question that matters is opportunity cost. In X, producing one more bushel of wheat means giving up 4/8 = 0.5 bolt of cloth, and producing one more bolt means giving up 8/4 = 2 bushels. In Y, a bushel costs 2/3, about 0.67, bolt, and a bolt costs 3/2 = 1.5 bushels. X gives up less cloth for each bushel (0.5 versus 0.67), so X has the **comparative advantage** in wheat. Y gives up fewer bushels for each bolt (1.5 versus 2), so Y has the comparative advantage in cloth. A country has the comparative advantage in whatever it produces at the lowest opportunity cost, and the two countries can both be better off if each specializes there and trades.

The **terms of trade** are the rate at which the goods exchange. For both to gain, the price must fall between the two countries' opportunity costs. Here, one bushel must trade for between 0.5 and 0.67 bolts. At 0.6 bolts per bushel, X gets 0.6 bolts for a bushel, more than the 0.5 bolt it could make itself, and Y pays 0.6 bolts for a bushel that would cost it 0.67 bolts to produce. Both gain. If the terms were 0.4 bolts per bushel, X would refuse, since making cloth itself costs only 0.5 bolt per bushel of wheat given up. A frequent exam error is to say that the country with the absolute advantage should produce everything. The right answer is based on opportunity cost.

Markets work through **supply and demand**. The demand curve slopes downward, because of the substitution and income effects, and the supply curve slopes upward, because of rising marginal opportunity costs. The equilibrium is where quantity demanded equals quantity supplied. The **determinants of demand** are consumer tastes, the number of consumers, income (normal versus inferior goods), the prices of related goods (substitutes and complements) and expectations. The **determinants of supply** are input prices, technology, the number of sellers, taxes and subsidies, and expectations. A change in the good's own price causes a change in quantity demanded or supplied, a movement along the curve, not a shift.

On the exam, a shift must be named and justified. Suppose a government rebate for buyers of electric bicycles. The rebate raises consumers' willingness to pay, so demand increases and shifts right, which raises both the equilibrium price and quantity. If battery prices rise, supply decreases, price rises and quantity falls. When both curves shift, one of the effects, price or quantity, is determinate and the other is ambiguous. When demand increases and supply decreases, for example, price rises for certain, while quantity depends on the relative sizes of the shifts.
`,
  ],
  cards: [
    ["Opportunity cost", "The value of the next-best alternative given up."],
    ["Absolute advantage", "The ability to produce more of a good with the same resources."],
    ["Comparative advantage", "The ability to produce a good at a lower opportunity cost."],
    ["Terms of trade", "The rate at which two goods exchange; must lie between the two countries' opportunity costs for both to gain."],
    ["Increasing opportunity cost", "A bowed-outward PPC shape, because resources are not perfectly adaptable."],
    ["Determinants of demand", "Tastes, number of consumers, income, prices of related goods and expectations."],
    ["Determinants of supply", "Input prices, technology, number of sellers, taxes and subsidies, and expectations."],
    ["Determinate versus ambiguous effect", "When two curves shift, one of price or quantity changes in a known direction and the other depends on the sizes of the shifts."],
  ],
  closed: [
    [
      "In Country X, 1 hour of labor produces 8 bushels of wheat or 4 bolts of cloth. In Country Y, it produces 3 bushels or 2 bolts. Which statement is correct?",
      [
        "Y has the comparative advantage in wheat",
        "X has the comparative advantage in wheat and Y in cloth",
        "X has the comparative advantage in both goods",
        "Neither country has a comparative advantage",
      ],
      "B",
    ],
    [
      "Using the data above, which terms of trade would make both countries better off?",
      [
        "0.4 bolts per bushel of wheat",
        "0.6 bolts per bushel of wheat",
        "0.8 bolts per bushel of wheat",
        "1.0 bolt per bushel of wheat",
      ],
      "B",
    ],
    [
      "A government begins to give a rebate to buyers of electric bicycles. Which effect on the market for electric bicycles is most likely?",
      [
        "Supply increases and price falls",
        "Demand increases, raising both equilibrium price and quantity",
        "Demand decreases and price falls",
        "Quantity supplied falls",
      ],
      "B",
    ],
    [
      "A rise in the price of lithium batteries, an input, and a simultaneous increase in consumer incomes (for a normal good) will cause which result in the market for electric bicycles?",
      [
        "Price rises, quantity change is ambiguous",
        "Price falls, quantity rises",
        "Quantity rises, price change is ambiguous",
        "Both price and quantity fall",
      ],
      "A",
    ],
    [
      "A point inside a country's PPC represents:",
      [
        "An efficient combination of goods",
        "An unattainable combination of goods",
        "A combination that does not use all resources efficiently",
        "Economic growth",
      ],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Country X can produce 8 bushels of wheat or 4 bolts of cloth per hour; Country Y can produce 3 bushels or 2 bolts. (a) Which country has the absolute advantage in wheat? (b) Calculate each country's opportunity cost of producing one bushel of wheat. (c) Identify which country has the comparative advantage in wheat, and explain. (d) Give a price, in bolts per bushel, at which both countries gain from trade, and explain why.",
      scheme: [
        "Identifies X as having the absolute advantage in wheat",
        "Calculates opportunity costs of 0.5 bolt for X and about 0.67 bolt for Y",
        "Identifies X as having the comparative advantage in wheat because its opportunity cost is lower",
        "Gives a price between 0.5 and 0.67 bolts per bushel and explains that both prefer it to producing the good themselves",
      ],
      model:
        "(a) Country X, because it produces 8 bushels per hour and Y only 3. (b) In X, one bushel costs 4/8 = 0.5 bolt, and in Y, 2/3, about 0.67 bolt. (c) X has the comparative advantage in wheat because its opportunity cost of 0.5 bolt is lower than Y's 0.67. (d) A price of 0.6 bolts per bushel works. X gets 0.6 bolts for a bushel when it could make only 0.5 bolt by switching resources, and Y pays 0.6 bolts for a bushel that would cost it 0.67 bolts to make, so both gain.",
      answers: [
        [
          "full",
          "(a) [[0|Country X has the absolute advantage in wheat because it makes 8 bushels per hour versus 3 for Y]]. (b) [[1|In X, 1 bushel costs 4/8 = 0.5 bolt, and in Y it costs 2/3, about 0.67 bolt]]. (c) [[2|X has the comparative advantage in wheat since 0.5 is lower than 0.67]]. (d) [[3|A price of 0.6 bolts per bushel works, because X gets more than 0.5 bolt for each bushel and Y pays less than the 0.67 bolt it would cost to make it]].",
          "Full marks. Every part is correct and your explanation in (d) compares the price with both opportunity costs.",
        ],
        [
          "full",
          "(a) [[0|X, since it produces more wheat per hour]]. (b) [[1|X gives up 0.5 bolt per bushel (4 divided by 8) and Y gives up about 0.67 bolt per bushel (2 divided by 3)]]. (c) [[2|X has the lower opportunity cost, so X has the comparative advantage in wheat]]. (d) [[3|0.55 bolts per bushel is in the range, because it is above X's cost of 0.5 and below Y's cost of 0.67, so X would sell wheat for more than it costs to give up and Y would buy it for less than its own cost]].",
          "All four points. Choosing 0.55 shows you understand it is a range, not one number.",
        ],
        [
          "partial",
          "(a) [[0|X]]. (b) [[1|0.5 for X and 0.67 for Y]]. (c) X has an advantage. (d) 0.5.",
          "Parts (a) and (b) are right. In (c), name which kind of advantage and why, and in (d) a price must be strictly between 0.5 and 0.67 so both gain.",
        ],
        [
          "partial",
          "(c) [[2|X has the comparative advantage in wheat because its opportunity cost is lower]]. (d) [[3|0.6 bolts works because X gets more than 0.5 and Y pays less than 0.67]]. (a) Y. (b) 3 and 8.",
          "Parts (c) and (d) are good, but in (a) X has the absolute advantage, and opportunity costs in (b) are in bolts per bushel (0.5 and about 0.67).",
          true,
        ],
        [
          "weak",
          "(a) Y because it is the smaller country. (b) 8 and 3. (c) Y. (d) 1.0 because it is fair.",
          "Absolute advantage is about output per hour, and opportunity cost is the other good given up. Review the definitions and the range for the terms of trade.",
        ],
        [
          "weak",
          "(a) [[0|X has the absolute advantage]]. (b) It costs 4 bolts. (c) X has everything so Y shouldn't trade. (d) No trade is good.",
          "Part (a) is correct. Opportunity cost per bushel is 4/8 = 0.5 bolt, and trade can still benefit X because of comparative advantage.",
        ],
      ],
    },
    {
      prompt:
        "The market for electric bicycles is initially in equilibrium. (a) Draw, in words, a correctly labeled supply and demand graph showing the initial equilibrium. (b) A government rebate is offered to buyers. Explain the effect on demand or supply and the resulting change in equilibrium price and quantity. (c) Suppose in addition that battery prices rise sharply. Explain the effect on equilibrium price and on equilibrium quantity, and state which is certain and which is ambiguous.",
      scheme: [
        "Describes a correctly labeled graph: price on the vertical axis, quantity on the horizontal axis, downward-sloping demand, upward-sloping supply and equilibrium where they intersect",
        "Explains that the rebate increases demand (right shift), raising both equilibrium price and quantity",
        "Explains that higher battery prices decrease supply (left shift)",
        "States that price rises for certain and quantity is ambiguous after both shifts",
      ],
      model:
        "(a) The graph has price on the vertical axis and quantity on the horizontal, a downward-sloping demand curve, an upward-sloping supply curve and equilibrium where they cross. (b) The rebate raises consumers' willingness to pay, so demand shifts right and both equilibrium price and quantity rise. (c) Higher battery prices raise producers' costs, so supply shifts left. Together with the demand increase, price rises for certain, because both shifts push price up. Quantity is ambiguous, since the demand increase raises it while the supply decrease lowers it.",
      answers: [
        [
          "full",
          "(a) [[0|My graph has price on the vertical axis and quantity on the horizontal axis, a downward-sloping demand curve and an upward-sloping supply curve crossing at equilibrium]]. (b) [[1|The rebate makes buyers willing to pay more, so demand shifts right and both the equilibrium price and quantity go up]]. (c) [[2|Higher battery prices raise the cost of making the bikes, so supply shifts left]]. [[3|Price rises for sure because both shifts push price up, but quantity is ambiguous since demand pushes it up and supply pushes it down]].",
          "Full marks. You labeled the graph, named both shifts and stated which effect is certain.",
        ],
        [
          "full",
          "(a) [[0|Vertical axis is price, horizontal is quantity, demand slopes down, supply slopes up, and they meet at the equilibrium]]. (b) [[1|The rebate increases demand, shifting the demand curve right, so price and quantity rise]]. (c) [[2|The battery price is an input cost, so supply decreases and shifts left]]. [[3|The combined result is a higher price, definitely, while the quantity could rise, fall or stay the same depending on which shift is bigger]].",
          "All four points. Saying the quantity could go any direction shows careful thinking about ambiguity.",
        ],
        [
          "partial",
          "(a) [[0|Price on the vertical axis, quantity on the horizontal, demand down and supply up]]. (b) The rebate does something. (c) Supply goes down.",
          "Part (a) is right. In (b), say which curve shifts and how price and quantity change, and in (c), state what is certain and what is ambiguous.",
        ],
        [
          "partial",
          "(b) [[1|Demand shifts right so price and quantity both increase]]. (c) [[3|Price definitely rises but quantity is unclear]]. (a) I drew a graph.",
          "Parts (b) and (c) are strong. In (a), describe the axes and curves. In (c), also say that supply shifts left.",
          true,
        ],
        [
          "weak",
          "(a) Quantity is on the vertical axis. (b) Supply shifts right so the price falls. (c) Both rise.",
          "Price goes on the vertical axis, and a rebate to buyers shifts demand right. Higher input costs decrease supply. Review the determinants.",
        ],
        [
          "weak",
          "(a) [[0|Price on the vertical axis, quantity on the horizontal, with supply and demand]]. (b) The rebate moves along the demand curve. (c) Nothing is certain.",
          "The graph description is fine. A rebate shifts demand rather than moving along the curve, and price is certain in (c). Review shifts.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Price controls and measuring output: GDP, nominal and real",
  note: `
## Objectives

Students will be able to:

1. analyze the effect of a price ceiling or floor on a market, with a graph;
2. calculate and interpret GDP by the expenditure approach and distinguish nominal from real GDP.

## Materials

An apartment-rental market (demand Qd = 1,000 - 0.5P and supply Qs = 0.5P - 200, with P a monthly rent in dollars and Q in hundreds of units), a crop market for the price floor, a graph template with shaded regions for deadweight loss, a GDP table for an imaginary economy (consumption 14,000; investment 3,500; government 3,700; exports 2,500; imports 3,200, in billions of dollars), a nominal-and-real GDP table with deflators, a what-counts-in-GDP card sort, and the exit ticket.

## Starter (8 minutes)

Ask: "A city caps rents at a level below the market rent to help renters. What are three things that might happen over five years?" List responses and mark each as short run or long run.

## Main activity

1. Price ceiling. Solve the equilibrium: 1,000 - 0.5P = 0.5P - 200, so P = 1,200 and Q = 400. A ceiling of 1,000: Qd = 500 and Qs = 300, a shortage of 200. Students graph it, identify the shaded deadweight loss triangle and discuss non-price rationing, black markets, reduced quality and who gains and who loses.
2. Price floor. A floor of 1,400 in a crop market with the same equations: Qd = 300 and Qs = 500, a surplus of 200. Discuss government purchases, storage and who bears the cost. Students explain why a ceiling above equilibrium or a floor below it has no effect.
3. GDP. Compute GDP = C + I + G + (X - M): 14,000 + 3,500 + 3,700 + (2,500 - 3,200) = 20,500. Use the card sort to decide which items count (final goods and services produced in the country in the year) and which do not (used goods, intermediate goods, financial transfers, illegal activity, unpaid household work).
4. Nominal versus real. Year 1: nominal GDP 21,000, deflator 100. Year 2: nominal GDP 24,000, deflator 120. Real GDP = nominal divided by the deflator times 100: 21,000 and 20,000. Nominal grew 14.3 percent while real fell 4.8 percent.

## Checking for understanding

Whiteboards: "Compute real GDP from nominal GDP of 33,000 and a deflator of 110." (30,000)

## Exit ticket

Explain why a price ceiling set above equilibrium has no effect.
`,
  reading: [
    "When governments set prices, and how output is counted",
    `
A **price ceiling** is a legal maximum price, and a **price floor** is a legal minimum price. Each is intended to help one side of a market, but each is a departure from equilibrium and has predictable effects.

Take a city rent cap. Suppose the monthly demand for apartments is Qd = 1,000 - 0.5P and supply is Qs = 0.5P - 200, with P in dollars and Q in hundreds of units. Setting them equal gives 1,200 = P and Q = 400, so the market rent is 1,200 dollars with 40,000 apartments rented. Now the city sets a ceiling of 1,000 dollars. At that rent, Qd = 500 and Qs = 300, so renters want 50,000 apartments but landlords offer only 30,000. The result is a **shortage** of 20,000 apartments. The price can no longer ration the scarce apartments, so other methods appear: waiting lists, favoritism, side payments and discrimination. Landlords have little incentive to maintain apartments that renters are eager to take, so quality may fall, and over time, fewer apartments may be built. Renters who find an apartment at 1,000 dollars gain, but some mutually beneficial trades do not occur. This lost surplus is the **deadweight loss**, shown on a graph as the triangle between the supply and demand curves from the quantity traded (300) up to the equilibrium quantity (400). A ceiling is binding only if it is set below the equilibrium price. A ceiling of 1,400 dollars would have no effect on this market.

A price floor is the mirror image. A floor of 1,400 dollars in a farm-crop market with the same equations gives Qd = 300 and Qs = 500, a **surplus** of 200. Producers who sell at the higher price gain, but consumers pay more and buy less, and the surplus must be stored, destroyed or purchased by the government, which means taxpayers bear the cost. A floor is binding only if it is set above equilibrium. The minimum wage can be analyzed as a floor in the labor market.

Macroeconomics measures the economy's output through **gross domestic product** (GDP), the market value of all final goods and services produced within a country in one year. The **expenditure approach** adds up spending: GDP = C + I + G + (X - M). **Consumption** (C) is household spending. **Investment** (I) is spending by firms on capital, new houses and changes in inventories, and does not mean buying stocks. **Government purchases** (G) are spending on goods and services, not transfer payments such as Social Security. **Net exports** (X - M) are exports minus imports. With C = 14,000, I = 3,500, G = 3,700, X = 2,500 and M = 3,200 (all in billions), GDP = 14,000 + 3,500 + 3,700 - 700 = 20,500 billion dollars. Items that are not counted include used goods, intermediate goods (to avoid double counting), financial transactions, transfer payments, illegal activity and unpaid work.

Because prices change, GDP measured in current prices can mislead. **Nominal GDP** uses current prices, and **real GDP** adjusts for price changes by using a base-year price level. The **GDP deflator** is a price index: deflator = (nominal GDP / real GDP) x 100. So real GDP = nominal GDP divided by the deflator, times 100. If nominal GDP rises from 21,000 to 24,000 and the deflator rises from 100 to 120, real GDP goes from 21,000 to 20,000. Nominal GDP grew by about 14.3 percent, but real GDP fell by about 4.8 percent, because prices rose faster than nominal output. To compare output over time, economists use real GDP.

A strong response states whether the control is binding, identifies the shortage or surplus with numbers, shows the deadweight loss on the graph and identifies winners and losers.
`,
  ],
  cards: [
    ["Price ceiling", "A legal maximum price; creates a shortage if set below equilibrium."],
    ["Price floor", "A legal minimum price; creates a surplus if set above equilibrium."],
    ["Binding", "A price control is binding only if it lies on the other side of equilibrium from where the market would naturally settle."],
    ["Deadweight loss", "The loss of total surplus from trades that do not occur because of a distortion."],
    ["GDP (expenditure approach)", "C + I + G + (X - M)."],
    ["Investment (macroeconomics)", "Spending on capital goods, new housing and inventories, not on stocks or bonds."],
    ["Nominal GDP", "Output valued at current prices."],
    ["Real GDP", "Output valued at constant base-year prices; nominal GDP divided by the deflator times 100."],
  ],
  closed: [
    [
      "In a rental market with equilibrium rent of 1,200 dollars, the city sets a maximum rent of 1,000 dollars. Which of the following is the most likely short-run result?",
      [
        "A surplus of apartments",
        "A shortage of apartments",
        "No effect on the market",
        "An increase in the quantity supplied",
      ],
      "B",
    ],
    [
      "A government sets a price floor of 1,400 dollars in a market whose equilibrium price is 1,200. At 1,400, Qd = 300 and Qs = 500. What is the result?",
      ["A shortage of 200", "A surplus of 200", "A shortage of 800", "No change"],
      "B",
    ],
    [
      "C = 14,000, I = 3,500, G = 3,700, X = 2,500, M = 3,200. What is GDP?",
      ["20,500", "21,200", "23,700", "27,700"],
      "A",
    ],
    [
      "Which of the following is counted in this year's GDP?",
      [
        "The sale of a used car from a dealer's lot (the dealer's commission aside)",
        "A new car produced and sold this year",
        "A Social Security payment",
        "The purchase of shares of stock",
      ],
      "B",
    ],
    [
      "Nominal GDP is 24,000 and the GDP deflator is 120. What is real GDP?",
      ["20,000", "24,000", "28,800", "120,000"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "In an apartment-rental market, Qd = 1,000 - 0.5P and Qs = 0.5P - 200, where P is monthly rent in dollars and Q is in hundreds of units. (a) Calculate the equilibrium rent and quantity. (b) The city sets a rent ceiling of 1,000 dollars. Calculate quantity demanded, quantity supplied and the shortage. (c) Explain one effect of the ceiling on renters and one effect on landlords. (d) Explain why a ceiling of 1,400 dollars would have no effect.",
      scheme: [
        "Solves for P = 1,200 and Q = 400",
        "Calculates Qd = 500 and Qs = 300 at 1,000 dollars and the shortage of 200 (hundreds)",
        "Explains an effect on renters, such as some gain and others cannot find an apartment, or non-price rationing",
        "Explains an effect on landlords, such as less incentive to maintain or supply apartments",
        "Explains that a ceiling above equilibrium is not binding",
      ],
      model:
        "(a) Setting 1,000 - 0.5P = 0.5P - 200 gives P = 1,200 and Q = 400. (b) At 1,000 dollars, Qd = 1,000 - 500 = 500 and Qs = 500 - 200 = 300, a shortage of 200 (20,000 apartments). (c) Renters who find an apartment gain from the lower rent, but others cannot find one, so they must use waiting lists or side payments. Landlords have less incentive to supply or maintain apartments because they receive less than the market rent. (d) A ceiling of 1,400 is above the equilibrium of 1,200, so the market price would be reached anyway and the ceiling is not binding.",
      answers: [
        [
          "full",
          "(a) [[0|1,000 - 0.5P = 0.5P - 200 gives P = 1,200 and Q = 400]]. (b) [[1|At 1,000 dollars Qd = 500 and Qs = 300, so there is a shortage of 200 hundred apartments, or 20,000]]. (c) [[2|Renters who find an apartment gain from the lower rent, but others can't find one and have to rely on waiting lists or side payments]]. [[3|Landlords get less than the market rent so they have less reason to keep up or add apartments, and quality falls over time]]. (d) [[4|A ceiling of 1,400 is above the equilibrium of 1,200, so the market price is below the ceiling and the ceiling doesn't bind]].",
          "Full marks. All five parts are right, including the explanation that a ceiling only matters when it is below equilibrium.",
        ],
        [
          "full",
          "(a) [[0|Equilibrium rent is 1,200 and quantity is 400 hundred apartments]]. (b) [[1|At 1,000, renters demand 500 and landlords supply 300, which is a shortage of 200]]. (c) [[2|Some renters gain a cheaper apartment but the shortage means other renters are shut out, and non-price rationing like favoritism appears]]. [[3|Landlords lose, because they can charge less than the market rent, and they might convert apartments or skip repairs]]. (d) [[4|A price ceiling is binding only if it's below equilibrium, and 1,400 is above 1,200]].",
          "All five points. Mentioning non-price rationing and conversion of apartments shows depth.",
        ],
        [
          "partial",
          "(a) [[0|1,200 and 400]]. (b) [[1|Qd is 500 and Qs is 300, so a shortage of 200]]. (c) Renters like it. (d) It would work.",
          "Parts (a) and (b) are right. In (c), explain effects on both renters and landlords, and in (d), say why the ceiling does not bind.",
        ],
        [
          "partial",
          "(c) [[3|Landlords have less incentive to maintain apartments]]. (d) [[4|1,400 is above equilibrium so it doesn't bind]]. (a) 1,000 and 500. (b) A surplus.",
          "Parts (c) and (d) are right. In (a), solve for equilibrium (1,200 and 400), and in (b) a ceiling below equilibrium creates a shortage of 200.",
          true,
        ],
        [
          "weak",
          "(a) 1,000 and 500. (b) A surplus of 200 because the price is lower. (c) Everyone benefits. (d) It would create a bigger shortage.",
          "Set demand equal to supply to find equilibrium. A ceiling below equilibrium creates a shortage, and a ceiling above it has no effect.",
        ],
        [
          "weak",
          "(a) [[0|1,200 rent]]. (b) 200 renters. (c) Landlords gain. (d) Not sure.",
          "The rent is right, but also give Q = 400. At 1,000 compute Qd and Qs. Landlords lose from a binding ceiling. Review the effects.",
        ],
      ],
    },
    {
      prompt:
        "An economy has consumption of 14,000, investment of 3,500, government purchases of 3,700, exports of 2,500 and imports of 3,200 (billions of dollars). In year 2, nominal GDP is 24,000 with a deflator of 120; in year 1, nominal GDP was 21,000 with a deflator of 100. (a) Calculate GDP using the expenditure approach. (b) Calculate real GDP for each year. (c) Calculate the percentage change in nominal GDP and in real GDP from year 1 to year 2. (d) Explain why real GDP is a better measure for comparing years.",
      scheme: [
        "Calculates GDP as 14,000 + 3,500 + 3,700 + (2,500 - 3,200) = 20,500",
        "Calculates real GDP of 21,000 in year 1 and 20,000 in year 2",
        "Calculates nominal growth of about 14.3 percent and real change of about -4.8 percent",
        "Explains that real GDP removes the effect of price changes so output can be compared",
      ],
      model:
        "(a) GDP = 14,000 + 3,500 + 3,700 + (2,500 - 3,200) = 20,500 billion dollars. (b) Real GDP in year 1 is 21,000/100 x 100 = 21,000, and in year 2 it is 24,000/120 x 100 = 20,000. (c) Nominal GDP rose by 3,000/21,000, about 14.3 percent, while real GDP fell by 1,000/21,000, about 4.8 percent. (d) Real GDP removes the effect of price changes, so it shows whether the quantity of output actually rose or fell. Nominal GDP can rise just because prices increased.",
      answers: [
        [
          "full",
          "(a) [[0|GDP = 14,000 + 3,500 + 3,700 + (2,500 minus 3,200) = 20,500 billion dollars]]. (b) [[1|Year 1 real GDP is 21,000 and year 2 is 24,000 divided by 1.2, which is 20,000]]. (c) [[2|Nominal GDP rose 3,000 out of 21,000, about 14.3 percent, but real GDP fell 1,000 out of 21,000, about 4.8 percent]]. (d) [[3|Real GDP removes the effect of rising prices, so it shows whether the amount of output actually increased, but nominal GDP can go up just because prices rose]].",
          "Full marks. Each calculation is correct and your explanation points to the key reason real GDP is the better comparison.",
        ],
        [
          "full",
          "(a) [[0|Net exports are 2,500 - 3,200 = -700, so GDP = 14,000 + 3,500 + 3,700 - 700 = 20,500]]. (b) [[1|Real GDP year 1 = 21,000 / 100 x 100 = 21,000, and year 2 = 24,000 / 120 x 100 = 20,000]]. (c) [[2|Nominal grew 14.3 percent and real fell 4.76 percent]]. (d) [[3|Prices rose 20 percent, so nominal GDP growth was an illusion caused by inflation, and real GDP shows the economy actually produced less]].",
          "All four points. Calling the nominal growth an illusion caused by inflation puts the idea very clearly.",
        ],
        [
          "partial",
          "(a) [[0|GDP is 20,500]]. (b) [[1|21,000 and 20,000]]. (c) Nominal went up and real went down. (d) It's better.",
          "Parts (a) and (b) are right. In (c), give the percentages, and in (d) explain why.",
        ],
        [
          "partial",
          "(c) [[2|Nominal GDP rose about 14.3 percent and real GDP fell about 4.8 percent]]. (d) [[3|Real GDP adjusts for inflation]]. (a) 24,000. (b) 21,000 and 24,000.",
          "Parts (c) and (d) are strong. In (a), use the expenditure formula to get 20,500, and in (b) divide year 2's nominal GDP by 1.2.",
          true,
        ],
        [
          "weak",
          "(a) 14,000 + 3,500 + 3,700 + 2,500 + 3,200 = 26,900. (b) 24,000 and 21,000. (c) Both grew. (d) Nominal is better because it's bigger.",
          "Imports are subtracted in the formula, and real GDP divides nominal by the deflator. Real GDP is the right measure of output.",
        ],
        [
          "weak",
          "(a) [[0|20,500]]. (b) Same as nominal. (c) 3,000 and 1,000. (d) Not sure.",
          "GDP is right. Real GDP in year 2 is 20,000, the changes should be percentages, and real GDP removes the effect of prices. Review those steps.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Unemployment and inflation: measuring and interpreting them",
  note: `
## Objectives

Students will be able to:

1. calculate the unemployment rate and describe types of unemployment;
2. measure inflation with the consumer price index and explain how it affects people differently.

## Materials

A labor-force table for an imaginary economy (adult civilian population 250,000; employed 150,000; unemployed 10,000; not in the labor force 90,000), a card sort of workers (a graduate between jobs, a laid-off steelworker whose plant closed for good, a retail worker laid off in a recession, a student who gave up looking, a part-time worker who wants full-time), a market-basket table for a CPI calculation, a set of inflation-effect scenarios (a fixed-rate borrower, a retiree on a fixed pension, a worker with a cost-of-living raise), and the exit ticket.

## Starter (8 minutes)

Ask: "If 1,000 people lose jobs and 1,000 more stop looking, does the unemployment rate rise by the same amount in both cases?" Let students reason. Reveal that the official rate counts only those actively looking.

## Main activity

1. Measure unemployment. Using the table, students compute the labor force (150,000 + 10,000 = 160,000), the unemployment rate (10,000 divided by 160,000, or 6.25 percent) and the labor force participation rate (160,000 divided by 250,000, or 64 percent). Then they compute what happens if 5,000 unemployed people stop looking: the labor force becomes 155,000, unemployed 5,000, and the rate falls to about 3.2 percent without anyone finding a job.
2. Types. Sort the worker cards into frictional (between jobs, searching), structural (skills no longer match, such as a closed plant) and cyclical (due to a downturn). Explain that the natural rate of unemployment is frictional plus structural, and cyclical unemployment is zero at the natural rate.
3. Inflation. A market basket costs 400 dollars in the base year and 460 dollars today: CPI = 460 / 400 x 100 = 115. If the CPI rises from 250 to 262.5, the inflation rate is 5 percent. Calculate a real wage change: a 3 percent raise with 5 percent inflation lowers purchasing power by about 2 percent.
4. Winners and losers. Discuss the effects of unanticipated inflation on a fixed-rate borrower (gains), a lender and a retiree on a fixed pension (lose) and the costs of anticipated inflation (menu costs and shoe-leather costs).

## Checking for understanding

Quiz: five questions on unemployment, CPI and inflation.

## Exit ticket

Explain why the unemployment rate can fall even when no new jobs are created.
`,
  reading: [
    "Counting the jobless and counting price increases",
    `
The **unemployment rate** is the percent of the labor force that is unemployed. A person is **unemployed** if they are not working, are available for work, and have actively looked for work in the past four weeks. The **labor force** consists of everyone who is employed or unemployed. People who are not working and not looking, such as students, retirees and those who have given up, are not in the labor force. For an economy with an adult civilian noninstitutional population of 250,000, where 150,000 are employed and 10,000 are unemployed, the labor force is 160,000, the unemployment rate is 10,000 / 160,000 = 6.25 percent, and the **labor force participation rate** is 160,000 / 250,000 = 64 percent.

The rate has quirks that matter on the exam. A **discouraged worker** stops looking because he believes no jobs are available, and is no longer counted as unemployed. If 5,000 of the 10,000 unemployed stop looking, the labor force shrinks to 155,000, unemployment becomes 5,000 and the rate falls to about 3.2 percent, even though no one has found a job. Part-time workers who want full-time work are counted as employed. For these reasons, the official rate can understate the weakness of a labor market, and the participation rate is a useful companion.

Economists distinguish three types of unemployment. **Frictional** unemployment arises when people are between jobs or entering the labor force and take time to find a match, such as a graduate searching for a first job. **Structural** unemployment arises when the skills of workers do not match the skills employers need, as when a steel plant closes for good and its workers need retraining. **Cyclical** unemployment arises from downturns in the business cycle, when demand for goods falls and firms lay off workers. The **natural rate of unemployment** is the sum of frictional and structural unemployment, the rate that exists when the economy is at full employment. At the natural rate, cyclical unemployment is zero, which means that an unemployment rate of zero is neither expected nor desirable.

Inflation is a sustained rise in the general price level. The **consumer price index** (CPI) tracks the cost of a fixed market basket of goods and services bought by a typical household. CPI = (cost of the basket in the current year / cost of the basket in the base year) x 100. If the basket cost 400 dollars in the base year and 460 dollars now, the CPI is 115. The **inflation rate** is the percentage change in the price index between two periods: if the CPI rises from 250 to 262.5, inflation is (262.5 - 250) / 250 = 5 percent. A worker whose nominal wage rises 3 percent in a year when prices rise 5 percent sees a decline in real wage of about 2 percent. The CPI has limitations: it can overstate inflation because it does not fully adjust for substitution toward cheaper goods, for improvements in quality or for new products.

Inflation affects people in different ways, and it matters whether it was anticipated. **Unanticipated inflation** redistributes wealth. Borrowers with fixed-rate loans gain, because they repay in dollars that are worth less, and lenders lose. People living on fixed incomes lose purchasing power. **Anticipated inflation** can be built into contracts and interest rates, which reduces redistribution, but it still has costs: **menu costs**, the expense of changing prices, and **shoe-leather costs**, the effort spent keeping cash balances low. The relationship between interest rates and inflation is summarized by the **real interest rate**, which equals the nominal rate minus expected inflation. If the nominal rate is 7 percent and expected inflation is 4 percent, the real rate is 3 percent.

On the exam, show the formula, substitute the numbers and state the result with units or a percent sign. Then interpret what it means for workers, lenders or the economy.
`,
  ],
  cards: [
    ["Unemployment rate", "Unemployed divided by the labor force, times 100."],
    ["Labor force participation rate", "Labor force divided by the adult civilian population, times 100."],
    ["Frictional unemployment", "Short-term unemployment while workers search for a suitable job."],
    ["Structural unemployment", "Unemployment from a mismatch between workers' skills and available jobs."],
    ["Cyclical unemployment", "Unemployment caused by a downturn in the business cycle."],
    ["Natural rate of unemployment", "Frictional plus structural unemployment; the rate at full employment."],
    ["CPI", "Cost of a fixed market basket in the current year divided by the base-year cost, times 100."],
    ["Real interest rate", "Nominal interest rate minus expected inflation."],
  ],
  closed: [
    [
      "An economy has 150,000 employed, 10,000 unemployed and 90,000 not in the labor force. What is the unemployment rate?",
      ["4.0 percent", "6.25 percent", "6.67 percent", "10.0 percent"],
      "B",
    ],
    [
      "A steelworker loses a job when a plant closes permanently because the industry no longer needs his skills. This is best described as:",
      ["Frictional unemployment", "Structural unemployment", "Cyclical unemployment", "Not unemployment"],
      "B",
    ],
    [
      "The CPI rises from 250 to 262.5. What is the inflation rate?",
      ["2.5 percent", "5 percent", "12.5 percent", "262.5 percent"],
      "B",
    ],
    [
      "A fixed-rate borrower repays a loan during a period of unanticipated inflation. Which of the following is true?",
      [
        "The borrower is hurt because repayments are worth more",
        "The borrower gains because the repayment dollars are worth less in real terms",
        "The lender gains",
        "Nobody is affected",
      ],
      "B",
    ],
    [
      "The nominal interest rate is 7 percent and expected inflation is 4 percent. What is the real interest rate?",
      ["3 percent", "4 percent", "7 percent", "11 percent"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "An economy has an adult civilian population of 250,000, with 150,000 employed and 10,000 unemployed. (a) Calculate the unemployment rate and the labor force participation rate. (b) Suppose 5,000 of the unemployed become discouraged and stop looking. Calculate the new unemployment rate. (c) Explain why this change does not mean the labor market has improved. (d) Classify a worker who loses a job because of a recession and explain why this type of unemployment is not part of the natural rate.",
      scheme: [
        "Calculates the unemployment rate of 6.25 percent and the participation rate of 64 percent",
        "Calculates the new unemployment rate of about 3.2 percent",
        "Explains that discouraged workers leave the labor force and are no longer counted, so no one has found a job",
        "Classifies the worker as cyclical and explains that the natural rate includes only frictional and structural unemployment",
      ],
      model:
        "(a) The labor force is 160,000, so the unemployment rate is 10,000/160,000 = 6.25 percent and the participation rate is 160,000/250,000 = 64 percent. (b) The labor force becomes 155,000, and unemployment is 5,000, so the rate is about 3.2 percent. (c) The rate fell only because discouraged workers left the labor force and are no longer counted, not because anyone found a job, so the labor market has not improved. (d) The worker has cyclical unemployment, caused by a downturn, and it is not part of the natural rate, which includes only frictional and structural unemployment.",
      answers: [
        [
          "full",
          "(a) [[0|The labor force is 160,000, so the unemployment rate is 10,000 / 160,000 = 6.25 percent and the participation rate is 160,000 / 250,000 = 64 percent]]. (b) [[1|After the change the labor force is 155,000 and 5,000 are unemployed, so the rate is about 3.2 percent]]. (c) [[2|The discouraged workers left the labor force so they aren't counted as unemployed, but nobody got a job]]. (d) [[3|It is cyclical unemployment because it's caused by the recession, and the natural rate only counts frictional and structural unemployment]].",
          "Full marks. Each calculation is right and your reasoning about discouraged workers shows how the rate can mislead.",
        ],
        [
          "full",
          "(a) [[0|Labor force is 150,000 + 10,000 = 160,000, so the unemployment rate is 6.25 percent and the participation rate is 64 percent]]. (b) [[1|The new labor force is 155,000 and unemployed is 5,000, so about 3.2 percent]]. (c) [[2|The rate fell only because people stopped looking, which removed them from the labor force, so employment didn't change at all]]. (d) [[3|The laid-off worker has cyclical unemployment, which goes away when the economy recovers, so it isn't in the natural rate, which is frictional plus structural]].",
          "All four points. Pointing out that employment didn't change is the clearest evidence the market has not improved.",
        ],
        [
          "partial",
          "(a) [[0|6.25 percent unemployment and 64 percent participation]]. (b) About 3 percent. (c) It's better. (d) Cyclical.",
          "Part (a) is right. In (b) calculate with the new labor force, in (c) explain why the labor market has not improved, and in (d) explain why it is excluded from the natural rate.",
        ],
        [
          "partial",
          "(c) [[2|The unemployed who stop looking aren't counted so nobody got a job]]. (d) [[3|Cyclical isn't part of the natural rate]]. (a) 4 percent. (b) 2 percent.",
          "Parts (c) and (d) are right. In (a) the rate is 10,000/160,000 = 6.25 percent, and in (b) the new rate is 5,000/155,000, about 3.2 percent.",
          true,
        ],
        [
          "weak",
          "(a) 10,000 / 250,000 = 4 percent. (b) The rate stays the same. (c) The economy is improving. (d) Structural.",
          "The unemployment rate divides by the labor force, not by the population, and discouraged workers leave the labor force. Check each definition.",
        ],
        [
          "weak",
          "(a) [[0|6.25 percent]]. (b) Unemployment goes to zero. (c) People found jobs. (d) Frictional.",
          "The first figure is right, but give the participation rate too. Discouraged workers did not find jobs, and unemployment from a recession is cyclical.",
        ],
      ],
    },
    {
      prompt:
        "The CPI rises from 250 in year 1 to 262.5 in year 2. A worker's nominal wage rises from 20 dollars to 20.60 dollars an hour. (a) Calculate the inflation rate. (b) Calculate the percent change in the worker's nominal wage and describe what happened to the real wage. (c) Explain who gains and who loses from unanticipated inflation among a fixed-rate borrower, a lender and a retiree on a fixed pension. (d) Explain one cost of inflation even when it is anticipated.",
      scheme: [
        "Calculates inflation of 5 percent",
        "Calculates the nominal wage change of 3 percent and states that the real wage fell about 2 percent",
        "Identifies the borrower as a gainer and the lender and retiree as losers from unanticipated inflation",
        "Explains a cost of anticipated inflation, such as menu costs or shoe-leather costs",
      ],
      model:
        "(a) Inflation is (262.5 - 250)/250 = 5 percent. (b) The nominal wage rose from 20 to 20.60, which is 3 percent, but prices rose 5 percent, so the real wage fell by about 2 percent. (c) With unanticipated inflation, the fixed-rate borrower gains, because loan payments are made in dollars that are worth less, while the lender and the retiree on a fixed pension lose purchasing power. (d) Even anticipated inflation has menu costs, the cost of changing prices, and shoe-leather costs, the time and effort spent keeping cash balances low.",
      answers: [
        [
          "full",
          "(a) [[0|The inflation rate is (262.5 - 250) / 250 = 5 percent]]. (b) [[1|The nominal wage rose 0.60 out of 20, which is 3 percent, but inflation was 5 percent, so the real wage fell about 2 percent]]. (c) [[2|The borrower gains because they repay with dollars that are worth less, while the lender loses and the retiree on a fixed pension loses purchasing power]]. (d) [[3|Menu costs are a cost even when inflation is expected, because firms have to spend resources changing their prices and menus]].",
          "Full marks. Your calculations are correct, and you named a specific cost of anticipated inflation.",
        ],
        [
          "full",
          "(a) [[0|12.5 divided by 250 is 5 percent]]. (b) [[1|The wage went up 3 percent, which is less than the 5 percent inflation, so the purchasing power of the wage dropped by about 2 percent]]. (c) [[2|Fixed-rate borrowers gain, lenders lose real value and a retiree on a fixed pension loses because the pension buys less]]. (d) [[3|Shoe-leather costs are one, because people spend time and effort holding less cash and going to the bank more often]].",
          "All four points. Shoe-leather costs are a classic example, and your description is exact.",
        ],
        [
          "partial",
          "(a) [[0|5 percent]]. (b) The wage went up 3 percent. (c) Borrowers win. (d) Prices rise.",
          "Part (a) is right. In (b) say what happened to the real wage, in (c) identify all three, and in (d) name a specific cost of inflation.",
        ],
        [
          "partial",
          "(b) [[1|The wage rose 3 percent but prices rose 5 percent so the real wage fell about 2 percent]]. (c) [[2|A borrower gains and lenders lose]]. (a) 12.5 percent. (d) None.",
          "Parts (b) and (c) are good. In (a), the inflation rate is 12.5/250 = 5 percent, and in (d), even anticipated inflation has menu and shoe-leather costs.",
          true,
        ],
        [
          "weak",
          "(a) 262.5 percent. (b) The wage fell 20 percent. (c) Lenders gain from inflation. (d) Inflation has no costs.",
          "Inflation is the percentage change in the CPI, and lenders lose from unanticipated inflation. Inflation also has real costs. Review the formulas.",
        ],
        [
          "weak",
          "(a) [[0|5 percent]]. (b) The real wage increased because the nominal wage rose. (c) Everyone loses. (d) Menu is for restaurants.",
          "The inflation rate is right, but the real wage fell because prices rose more than wages. Menu costs apply to any business changing prices.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "The business cycle, aggregate demand and aggregate supply",
  note: `
## Objectives

Students will be able to:

1. describe the phases of the business cycle and their effects on output and employment;
2. explain aggregate demand and aggregate supply and what shifts them.

## Materials

A business-cycle graph of real GDP over time with trend line, phase labels (expansion, peak, contraction, trough), an AD-AS graph template with LRAS, SRAS and AD, a shifter card set (consumer wealth, interest rates, government spending, foreign income, input prices, productivity, regulation, inflationary expectations), a data sheet (potential real GDP 21,000, actual real GDP 20,300; real GDP of 20,000 growing to 20,400), and the exit ticket.

## Starter (8 minutes)

Ask: "In 2020 the economy shrank very sharply for two months and then recovered in a few years. What makes the economy move up and down?" Collect ideas and sort them into demand-side and supply-side causes.

## Main activity

1. Business cycle. Students label the phases on the graph and match to indicators: in an expansion output and employment rise; at a peak, output reaches a high point; in a contraction or recession, output falls and unemployment rises; at a trough output hits a low. Compute growth: real GDP from 20,000 to 20,400 is 2 percent. Compute the output gap: (actual - potential) divided by potential = (20,300 - 21,000) / 21,000 = -3.3 percent, a recessionary gap.
2. Aggregate demand. AD shows the relationship between the price level and real GDP demanded, and slopes downward because of the wealth effect, the interest-rate effect and the exchange-rate (net export) effect. Shifters: changes in consumer spending (wealth, expectations, taxes), investment (interest rates, business expectations), government spending and net exports (foreign income, exchange rates).
3. Aggregate supply. SRAS slopes upward because some input prices, especially wages, are sticky in the short run. LRAS is vertical at potential output. SRAS shifters: input prices, productivity, regulations and taxes, inflationary expectations. LRAS shifters: resources, technology and institutions.
4. Practice. Groups draw an AD-AS graph for each scenario and state the changes in the price level and real GDP.

## Checking for understanding

Whiteboards: "Does this shift AD, SRAS or LRAS? Direction?" for six items.

## Exit ticket

Name one factor that shifts SRAS but not LRAS and explain why.
`,
  reading: [
    "Ups, downs and the two curves that explain them",
    `
Economies do not grow smoothly. The **business cycle** is the pattern of expansions and contractions in real GDP around its long-run trend. An **expansion** is a period of rising real GDP, falling unemployment and, often, rising prices. The **peak** is the high point at the end of an expansion. A **contraction**, or recession when severe, is a period of falling real GDP and rising unemployment. The **trough** is the low point before a recovery begins. Measuring helps: if real GDP rises from 20,000 to 20,400, growth is 400/20,000 = 2 percent. The **output gap** compares actual output with **potential output**, the level the economy can sustain at full employment. If potential real GDP is 21,000 and actual real GDP is 20,300, the gap is (20,300 - 21,000)/21,000, about -3.3 percent. A negative gap, called a **recessionary gap**, means unemployment is above the natural rate. A positive gap, called an **inflationary gap**, means output is above potential and unemployment is below the natural rate.

The **aggregate demand and aggregate supply** (AD-AS) model explains these fluctuations. The vertical axis is the price level, and the horizontal axis is real GDP.

**Aggregate demand** (AD) shows the total quantity of real output demanded at each price level. It slopes downward for three reasons that differ from the reasons for a single product. The **wealth effect**: a higher price level lowers the real value of savings, so people spend less. The **interest-rate effect**: a higher price level raises the demand for money, which raises interest rates and reduces investment and interest-sensitive spending. The **exchange-rate effect**: a higher domestic price level makes domestic goods less competitive, so exports fall and imports rise. AD is made up of consumption, investment, government spending and net exports, so it shifts when any component changes at a given price level. Consumer confidence, rising household wealth or a tax cut shifts it right. Business expectations or lower interest rates raise investment. Higher government spending, or higher income in other countries that buys more exports, shifts AD right. Opposites shift it left.

**Aggregate supply** has two forms. **Short-run aggregate supply** (SRAS) slopes upward because some prices, particularly nominal wages, are sticky, so when the price level rises, firms' profits rise and they increase output. SRAS shifts when production costs change. Higher input prices, such as oil, raise costs and shift SRAS left. Higher productivity, lower taxes on business or fewer regulations shift SRAS right, and a rise in inflation expectations shifts it left, since workers demand higher wages. **Long-run aggregate supply** (LRAS) is a vertical line at potential output, because in the long run all prices adjust, and output depends on resources, technology and institutions. Only changes in those, such as more capital, a larger labor force or better technology, shift LRAS, which is the same as economic growth, shifting the PPC outward.

Together the curves determine the equilibrium price level and real GDP. A drop in consumer confidence shifts AD left, lowering both the price level and real GDP. An oil price spike shifts SRAS left, raising the price level while lowering real GDP, a combination called **stagflation**. A strong response on the exam identifies the curve, direction and result: "Because consumer confidence falls, consumption falls, so AD shifts left, lowering real GDP and the price level."
`,
  ],
  cards: [
    ["Expansion and contraction", "Phases of the business cycle with rising and falling real GDP."],
    ["Peak and trough", "The high point at the end of an expansion and the low point at the end of a contraction."],
    ["Potential output", "The level of real GDP the economy can sustain at full employment."],
    ["Recessionary gap", "Actual real GDP below potential; unemployment above the natural rate."],
    ["Inflationary gap", "Actual real GDP above potential; unemployment below the natural rate."],
    ["Reasons AD slopes downward", "Wealth effect, interest-rate effect and exchange-rate (net export) effect."],
    ["SRAS shifters", "Input prices, productivity, taxes and regulation, inflation expectations."],
    ["Stagflation", "Falling real GDP together with a rising price level, as from a negative supply shock."],
  ],
  closed: [
    [
      "Real GDP rises from 20,000 to 20,400. What is the growth rate?",
      ["0.4 percent", "2 percent", "4 percent", "400 percent"],
      "B",
    ],
    [
      "Potential real GDP is 21,000 and actual real GDP is 20,300. The output gap is closest to:",
      ["-3.3 percent", "-0.3 percent", "+3.3 percent", "+3.4 percent"],
      "A",
    ],
    [
      "Which of the following causes a shift of the aggregate demand curve to the right?",
      [
        "A rise in the price level",
        "A rise in consumer confidence",
        "A rise in oil prices",
        "A fall in productivity",
      ],
      "B",
    ],
    [
      "A sharp rise in oil prices, an input to many industries, will most likely cause which of the following in the short run?",
      [
        "A higher price level and lower real GDP",
        "A lower price level and higher real GDP",
        "A higher price level and higher real GDP",
        "No change in either",
      ],
      "A",
    ],
    [
      "Which of the following shifts the long-run aggregate supply curve to the right?",
      [
        "A temporary fall in oil prices",
        "An increase in the capital stock and improvement in technology",
        "A rise in the price level",
        "A decrease in consumer spending",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "The economy is initially at long-run equilibrium. (a) Draw, in words, a correctly labeled AD-AS graph showing the initial long-run equilibrium. (b) A sharp drop in consumer confidence reduces consumption spending. Show and explain the effect on aggregate demand, the price level and real GDP in the short run. (c) State what is happening to unemployment relative to the natural rate and explain the type of gap.",
      scheme: [
        "Describes a labeled graph: price level on the vertical axis, real GDP on the horizontal axis, downward-sloping AD, upward-sloping SRAS, vertical LRAS and equilibrium at their intersection",
        "Explains that lower consumption shifts AD left",
        "States that the price level and real GDP both fall in the short run",
        "States that unemployment rises above the natural rate and identifies a recessionary gap",
      ],
      model:
        "(a) The graph has price level on the vertical axis and real GDP on the horizontal axis, with a downward-sloping AD, an upward-sloping SRAS and a vertical LRAS, all intersecting at the initial equilibrium at potential output. (b) Lower consumer confidence reduces consumption, so aggregate demand shifts left. In the short run, both the price level and real GDP fall. (c) Real GDP is below potential, so unemployment rises above the natural rate, which is a recessionary gap.",
      answers: [
        [
          "full",
          "(a) [[0|The graph has price level on the vertical axis and real GDP on the horizontal axis, with a downward-sloping AD, an upward-sloping SRAS and a vertical LRAS all crossing at the starting equilibrium at potential output]]. (b) [[1|Lower consumer confidence lowers consumption, so AD shifts left]]. [[2|The price level and real GDP both fall in the short run]]. (c) [[3|Real GDP is below potential, so unemployment is above the natural rate, which is a recessionary gap]].",
          "Full marks. Your graph is fully labeled and each effect is traced from the cause.",
        ],
        [
          "full",
          "(a) [[0|Vertical axis is the price level, horizontal axis is real GDP, with LRAS vertical at potential GDP, SRAS sloping up and AD sloping down, all meeting at the same point]]. (b) [[1|Consumer confidence falls so households spend less at every price level, shifting AD left]]. [[2|The new equilibrium has a lower price level and lower real GDP]]. (c) [[3|Output is below potential, so cyclical unemployment appears and the actual rate is above the natural rate, which means a recessionary gap]].",
          "All four points. Mentioning cyclical unemployment ties the graph to the labor-market concepts from last week.",
        ],
        [
          "partial",
          "(a) [[0|Price level on the vertical axis, real GDP on the horizontal axis, with AD, SRAS and LRAS meeting at equilibrium]]. (b) AD goes down. (c) Unemployment rises.",
          "Part (a) is right. In (b) say that AD shifts left and describe the effect on price and real GDP, and in (c) name the type of gap.",
        ],
        [
          "partial",
          "(b) [[1|AD shifts left]] and [[2|price level and real GDP fall]]. (c) [[3|There's a recessionary gap and unemployment is above the natural rate]]. (a) I drew the curves.",
          "Parts (b) and (c) are strong. In (a), describe the axes, the three curves and the equilibrium.",
          true,
        ],
        [
          "weak",
          "(a) Quantity on the horizontal axis and price on the vertical axis. (b) SRAS shifts left and prices rise. (c) An inflationary gap.",
          "The axes are price level and real GDP. Lower consumption shifts AD left, and the result is a recessionary gap. Review the determinants.",
        ],
        [
          "weak",
          "(a) [[0|Price level and real GDP on the axes]]. (b) The economy grows. (c) Unemployment falls.",
          "Falling confidence reduces spending, so AD shifts left, real GDP falls and unemployment rises. Review the shifters.",
        ],
      ],
    },
    {
      prompt:
        "Compare two shocks: (1) a sharp rise in oil prices and (2) an increase in government spending on infrastructure. For each, (a) identify which curve shifts and in which direction, (b) state the short-run effect on the price level and real GDP, and (c) explain whether each is a demand shock or a supply shock and why the oil shock is called stagflation.",
      scheme: [
        "Identifies that higher oil prices shift SRAS left",
        "Identifies that higher government spending shifts AD right",
        "States the short-run effects: oil raises the price level and lowers real GDP; infrastructure spending raises both",
        "Classifies oil as a supply shock and spending as a demand shock",
        "Explains that stagflation is rising prices together with falling output and rising unemployment",
      ],
      model:
        "(1) Higher oil prices raise production costs, so SRAS shifts left. The price level rises and real GDP falls. This is a supply shock. (2) More government spending on infrastructure raises aggregate demand, shifting AD right, so both the price level and real GDP rise in the short run. This is a demand shock. The oil shock is called stagflation because it combines inflation, a higher price level, with stagnation, falling real output and rising unemployment.",
      answers: [
        [
          "full",
          "(1) [[0|Higher oil prices raise costs, so SRAS shifts left]]. (2) [[1|More government spending raises a component of AD, so AD shifts right]]. (b) [[2|With oil, the price level rises and real GDP falls, and with infrastructure spending, the price level and real GDP both rise in the short run]]. (c) [[3|The oil change is a supply shock and the spending change is a demand shock]]. [[4|The oil shock is called stagflation because there is inflation with falling output and higher unemployment, which doesn't happen with a demand shock]].",
          "Full marks. You identified each curve, traced each effect and explained why stagflation is special to a negative supply shock.",
        ],
        [
          "full",
          "(a) [[0|The oil price increase is an input cost increase, which decreases SRAS and shifts it left]]. [[1|The infrastructure spending is part of G, so it increases AD and shifts it right]]. (b) [[2|Oil: price level up, real GDP down. Infrastructure: both up in the short run]]. (c) [[3|Oil is a supply-side shock and the spending is a demand-side shock]]. [[4|Stagflation means stagnant output together with inflation, and only a leftward SRAS shift causes both at once]].",
          "All five points. Showing that only a leftward SRAS shift produces both effects explains the term precisely.",
        ],
        [
          "partial",
          "(a) [[0|Oil shifts SRAS left]]. [[1|Spending shifts AD right]]. (b) Prices go up. (c) Oil is a shock.",
          "Part (a) is right. In (b) state the effects on both price and real GDP for each shock, and in (c) classify and explain stagflation.",
        ],
        [
          "partial",
          "(c) [[3|Oil is a supply shock and spending is a demand shock]]. [[4|Stagflation is inflation with falling output]]. (a) Both shift AD left.",
          "Parts (c) are strong. In (a), the oil shock shifts SRAS left and spending shifts AD right, which also gives the effects in (b).",
          true,
        ],
        [
          "weak",
          "(a) Oil shifts AD right. (b) Oil makes everything cheaper. (c) Stagflation is when GDP rises.",
          "Higher oil prices raise costs and shift SRAS left, which raises prices and lowers output. Stagflation is falling output with inflation.",
        ],
        [
          "weak",
          "(a) [[1|Spending shifts AD right]]. (b) Real GDP falls. (c) They are the same kind of shock.",
          "AD shifting right raises real GDP, and the two shocks are different types: one on the supply side and one on the demand side. Review the shifters.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Shocks, the multiplier and the return to long-run equilibrium",
  note: `
## Objectives

Students will be able to:

1. use the AD-AS model to show the short-run effects of a shock;
2. explain the multiplier and calculate its effect on spending;
3. describe how the economy returns to long-run equilibrium.

## Materials

AD-AS templates, a shock card set (a stock market crash, a surge in productivity, a rise in oil prices, a cut in government spending), a multiplier worksheet (MPC = 0.75; government spending change 50; tax cut 40; recessionary gap 400), a self-correction flowchart (wages, SRAS and LRAS), a table of fiscal policy tools, and the exit ticket.

## Starter (8 minutes)

Ask: "If the economy falls into a recession and the government does nothing, will it eventually recover? How? How long might that take?" Record guesses. Introduce the idea of sticky wages and the debate over self-correction versus policy.

## Main activity

1. Shocks. For each shock card, students draw the AD-AS graph from a long-run starting point, label the change and state the effect on price level, real GDP and unemployment. They classify each as a demand or supply shock.
2. Multiplier. The **spending multiplier** is 1/(1 - MPC) = 1/MPS. With MPC = 0.75, it is 4. A 50-unit increase in government spending raises GDP by 200 (holding the price level constant). The **tax multiplier** is -MPC/(1 - MPC) = -3, so a 40-unit tax cut raises GDP by 120. A balanced increase of 40 in both spending and taxes raises GDP by 160 - 120 = 40. To close a recessionary gap of 400 with spending alone, the government needs 400/4 = 100.
3. Self-correction. Students trace a recessionary gap: unemployment is above the natural rate, nominal wages eventually fall, SRAS shifts right, and the economy returns to potential output at a lower price level. An inflationary gap works in reverse: wages and costs rise, SRAS shifts left, and the economy returns to potential at a higher price level.
4. Fiscal choices. Debate when to use expansionary fiscal policy (increase G or cut taxes) instead of waiting, and consider limits: time lags, crowding out and deficits.

## Checking for understanding

Whiteboards: "MPC is 0.8. What are the spending and tax multipliers?" (5 and -4)

## Exit ticket

Explain why the tax multiplier is smaller in absolute value than the spending multiplier.
`,
  reading: [
    "From a shock to a new equilibrium and back to potential",
    `
The AD-AS model becomes useful when it is used to trace a shock. Begin at **long-run equilibrium**, where AD, SRAS and LRAS intersect at one point, and actual output equals potential. A **demand shock** shifts AD. A stock market crash lowers household wealth, so consumption falls and AD shifts left. In the short run, the price level and real GDP fall and unemployment rises above the natural rate. A **supply shock** shifts SRAS. A surge in productivity from new technology lowers costs and shifts SRAS right, so the price level falls and real GDP rises, and unemployment falls. A sharp rise in oil prices raises costs and shifts SRAS left, so the price level rises, real GDP falls and unemployment rises, the case called stagflation.

Changes in spending ripple through the economy through the **multiplier effect**. When government spends one dollar, that dollar becomes income for someone, who spends part of it, which becomes income for someone else, and so on. The fraction of additional income that is spent is the **marginal propensity to consume** (MPC); the fraction saved is the **marginal propensity to save** (MPS = 1 - MPC). The **spending multiplier** is 1/(1 - MPC) = 1/MPS. If MPC = 0.75, the multiplier is 1/0.25 = 4, so an increase in government spending of 50 raises equilibrium GDP by 200, assuming the price level does not change. In terms of the AD curve, the initial spending shifts AD right by 50, and the multiplier amplifies the horizontal shift to 200.

A change in taxes works through a smaller multiplier, since only part of a tax cut is spent. The **tax multiplier** is -MPC/(1 - MPC). For MPC = 0.75 it is -0.75/0.25 = -3, so a 40-unit tax cut raises GDP by 120 (the cut is negative, times negative 3). The tax multiplier is smaller in absolute value than the spending multiplier because the first round of a tax cut is partly saved, whereas government spending is spent in full. If the government increases spending and taxes by the same 40, the **balanced budget multiplier** is 1: GDP rises by 160 from the spending and falls by 120 from the taxes, a net rise of 40. To close a recessionary gap of 400 with government spending alone, the government needs an increase of 400 divided by 4, or 100.

Does the economy fix itself? In a **recessionary gap**, real GDP is below potential and unemployment is above the natural rate. With enough unemployment, nominal wages eventually fall. Lower wages reduce firms' costs, which shifts SRAS to the right, and the economy slides down along AD back to potential output, at a lower price level. In an **inflationary gap**, real GDP is above potential, unemployment is below the natural rate, and workers' wages and other input prices rise. Costs increase, SRAS shifts left, and the economy returns to potential at a higher price level. This **self-correction** takes time, because wages are sticky downward. If a recession drags on, the cost of waiting, in lost output and long-term unemployment, may justify **fiscal policy**: discretionary changes in government spending and taxes. Expansionary fiscal policy raises G or cuts taxes to shift AD right. Contractionary fiscal policy does the opposite to fight an inflationary gap.

Fiscal policy has limits. **Time lags** occur in recognizing a problem, passing a law and spending the money, so the effect may arrive when it is no longer needed. **Crowding out** occurs when government borrowing to finance a deficit raises interest rates and reduces private investment. Deficits add to the national debt. Also, if people expect higher future taxes, they may save more, reducing the multiplier.

On the exam, give the formula, apply it, and draw the graph with the right shifts. State what the result means for output, prices and unemployment.
`,
  ],
  cards: [
    ["Demand shock", "A change in aggregate demand, such as a fall in household wealth."],
    ["Supply shock", "A change in short-run aggregate supply, such as a rise in oil prices or a jump in productivity."],
    ["MPC and MPS", "The fraction of extra income that is spent (MPC) or saved (MPS); MPC + MPS = 1."],
    ["Spending multiplier", "1/(1 - MPC) = 1/MPS."],
    ["Tax multiplier", "-MPC/(1 - MPC); smaller in size than the spending multiplier."],
    ["Self-correction", "The return to potential output as nominal wages adjust and SRAS shifts."],
    ["Expansionary fiscal policy", "Increasing government spending or cutting taxes to raise AD."],
    ["Crowding out", "A reduction in private investment because government borrowing raises interest rates."],
  ],
  closed: [
    [
      "The MPC is 0.75. What is the spending multiplier?",
      ["0.25", "3", "4", "7.5"],
      "C",
    ],
    [
      "With MPC = 0.75, the government cuts taxes by 40. By how much does equilibrium GDP rise, assuming the price level is constant?",
      ["30", "40", "120", "160"],
      "C",
    ],
    [
      "The economy has a recessionary gap of 400 and MPC = 0.75. How much must government spending rise to close the gap, assuming the price level is constant?",
      ["50", "100", "300", "1,600"],
      "B",
    ],
    [
      "In a recessionary gap, how does the economy return to potential output without policy?",
      [
        "Nominal wages fall, SRAS shifts right and the price level falls",
        "Nominal wages rise, SRAS shifts left and the price level rises",
        "AD shifts left again",
        "LRAS shifts left",
      ],
      "A",
    ],
    [
      "Which of the following is a limitation of expansionary fiscal policy?",
      [
        "It is immediate and always sized correctly",
        "Time lags and crowding out of private investment may reduce its effect",
        "It has no effect on AD",
        "It reduces the national debt",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "The economy is in long-run equilibrium when a stock market crash reduces household wealth. (a) Explain the effect on AD and show the short-run effect on the price level and real GDP. (b) Describe what happens to unemployment relative to the natural rate. (c) Explain how the economy returns to long-run equilibrium without policy, including what happens to nominal wages, SRAS and the price level in the long run.",
      scheme: [
        "Explains that lower wealth reduces consumption, so AD shifts left",
        "States that the price level and real GDP fall in the short run",
        "States that unemployment rises above the natural rate (recessionary gap)",
        "Explains that nominal wages eventually fall, shifting SRAS right",
        "States that the economy returns to potential output at a lower price level than the original",
      ],
      model:
        "(a) A fall in household wealth reduces consumption, so AD shifts left. In the short run, the price level and real GDP both fall. (b) Real GDP is below potential, so unemployment rises above the natural rate, a recessionary gap. (c) Over time, high unemployment puts downward pressure on nominal wages. Lower wages reduce costs, so SRAS shifts right until the economy returns to potential output. In the long run, real GDP is back at potential and the price level is lower than at the start.",
      answers: [
        [
          "full",
          "(a) [[0|The crash lowers household wealth, so consumption falls and AD shifts left]]. [[1|In the short run the price level and real GDP both fall]]. (b) [[2|Real GDP is below potential so unemployment is above the natural rate, a recessionary gap]]. (c) [[3|High unemployment eventually pushes nominal wages down, which lowers firms' costs and shifts SRAS right]]. [[4|The economy returns to potential output at a lower price level than at the start]].",
          "Full marks. You traced the adjustment step by step and ended with the correct long-run price level.",
        ],
        [
          "full",
          "(a) [[0|A fall in wealth causes less consumer spending, which shifts AD to the left]]. [[1|Price level and real GDP go down]]. (b) [[2|Unemployment goes above the natural rate because output is under potential]]. (c) [[3|Since there are many unemployed workers, nominal wages fall over time, and when costs fall SRAS shifts right]]. [[4|Real GDP goes back to potential, and the long-run price level ends up lower than before the crash]].",
          "All five points. 'The long-run price level ends up lower' is the key detail many students miss.",
        ],
        [
          "partial",
          "(a) [[0|AD shifts left]]. [[1|Real GDP and prices fall]]. (b) Unemployment rises. (c) Things recover.",
          "Part (a) is right. In (b) name the gap, and in (c) explain the role of nominal wages and SRAS and the long-run price level.",
        ],
        [
          "partial",
          "(c) [[3|Wages fall and SRAS shifts right]] and [[4|the economy gets back to potential at a lower price level]]. (a) AD shifts right.",
          "Part (c) is strong. In (a), a drop in wealth shifts AD left, which lowers the price level and real GDP, and in (b) unemployment is above the natural rate.",
          true,
        ],
        [
          "weak",
          "(a) AD shifts right because the market fell. (b) Unemployment falls. (c) Wages go up and SRAS shifts left.",
          "A wealth loss reduces spending, so AD shifts left. In a recessionary gap, wages fall and SRAS shifts right. Review the self-correction steps.",
        ],
        [
          "weak",
          "(a) [[0|AD shifts left]]. (b) Nothing changes in unemployment. (c) The economy stays in recession forever.",
          "AD shifting left is right, but unemployment rises, and wages eventually fall, restoring potential output. Review the long-run adjustment.",
        ],
      ],
    },
    {
      prompt:
        "The MPC is 0.75 and the economy has a recessionary gap of 400. Assume the price level is constant. (a) Calculate the spending multiplier and the tax multiplier. (b) Calculate the change in government spending needed to close the gap. (c) Calculate the tax cut needed to close the gap. (d) Explain one reason the actual effect of a fiscal stimulus might be smaller than the calculation.",
      scheme: [
        "Calculates a spending multiplier of 4 and a tax multiplier of -3",
        "Calculates a spending increase of 100",
        "Calculates a tax cut of about 133.3",
        "Explains a reason the effect might be smaller, such as crowding out, time lags, or saving some of the tax cut",
      ],
      model:
        "(a) The spending multiplier is 1/(1 - 0.75) = 4, and the tax multiplier is -0.75/0.25 = -3. (b) To close a gap of 400 with spending, the government needs 400/4 = 100. (c) With taxes, 400/3 = about 133.3, a tax cut of about 133. (d) The effect might be smaller because the government borrows to finance the stimulus, which can raise interest rates and crowd out private investment, or because consumers may save part of a tax cut.",
      answers: [
        [
          "full",
          "(a) [[0|The spending multiplier is 1 / 0.25 = 4 and the tax multiplier is -0.75 / 0.25 = -3]]. (b) [[1|Government spending needs to rise by 400 divided by 4, which is 100]]. (c) [[2|A tax cut needs to be 400 divided by 3, which is about 133]]. (d) [[3|The effect might be smaller because the government borrows the money, which could raise interest rates and crowd out private investment]].",
          "Full marks. Your multipliers and both policy sizes are correct, and you named crowding out as a limit.",
        ],
        [
          "full",
          "(a) [[0|Spending multiplier = 1/(1 - 0.75) = 4 and tax multiplier = -0.75/(1 - 0.75) = -3]]. (b) [[1|100 in government spending closes the 400 gap since 100 x 4 = 400]]. (c) [[2|A tax cut of 133.3 would do it, since 133.3 x 3 = 400]]. (d) [[3|People could save part of a tax cut or save more if they expect higher taxes later, so the multiplier would be lower than the formula says]].",
          "All four points. The point about expected future taxes is a sophisticated reason the multiplier may fall short.",
        ],
        [
          "partial",
          "(a) [[0|Spending multiplier is 4 and tax multiplier is -3]]. (b) [[1|100]]. (c) 100 also. (d) It might not work.",
          "Parts (a) and (b) are right. In (c) use the tax multiplier (400/3, about 133), and in (d) give a specific reason.",
        ],
        [
          "partial",
          "(c) [[2|About 133]]. (d) [[3|Crowding out reduces the effect]]. (a) 0.75 and 0.25. (b) 300.",
          "Parts (c) and (d) are right. In (a) the multipliers are 4 and -3, and in (b) the spending needed is 400/4, which is 100.",
          true,
        ],
        [
          "weak",
          "(a) 3 and 4. (b) 400. (c) 400. (d) It will work perfectly.",
          "The spending multiplier is 4 and the tax multiplier is -3. Divide the gap by each multiplier. Fiscal policy has limits.",
        ],
        [
          "weak",
          "(a) [[0|The spending multiplier is 4]]. (b) 1,600. (c) 1,200. (d) No reason.",
          "The spending multiplier is right. Divide the gap by the multiplier (400/4 = 100), not multiply, and use -3 for taxes.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Money, banks and how money is created",
  note: `
## Objectives

Students will be able to:

1. explain the functions of money and measures of the money supply;
2. describe how banks create money and how the money multiplier works.

## Materials

A money-functions matching set (medium of exchange, unit of account, store of value, with scenarios), a chart of M1 and M2 components, a T-account template for a bank, a lending-chain worksheet (new cash deposit of 5,000 dollars and a required reserve ratio of 20 percent; a deposit of 200,000 dollars in checkable accounts with RR 10 percent and reserves of 30,000), a short list of the Federal Reserve's tools, and the exit ticket.

## Starter (8 minutes)

Ask: "Your phone can pay a Kroger bill with a tap. What is the money? Where is it?" List forms (cash, a checking balance, a card, an app) and ask what makes each acceptable.

## Main activity

1. Functions of money. Students classify scenarios: a seller accepts a check (medium of exchange), a house priced in dollars (unit of account), saving cash for college (store of value). Explain why barter requires a double coincidence of wants and why fiat money, which has value because of government decree and public trust, works. Distinguish M1 (currency and checkable deposits) from M2 (M1 plus savings deposits, small time deposits and retail money market funds).
2. Fractional reserve banking. Walk through a bank's T-account. A new cash deposit of 5,000 dollars with a required reserve ratio of 20 percent: required reserves of 1,000, excess reserves of 4,000. The bank can lend 4,000, which is deposited elsewhere, and so on. The money multiplier is 1/RR = 5, so the maximum increase in the money supply from the new excess reserves is 4,000 x 5 = 20,000.
3. Second problem. A bank system has 200,000 in checkable deposits and a required ratio of 10 percent, so required reserves are 20,000. If actual reserves are 30,000, then excess reserves are 10,000, and the maximum expansion is 10,000 x 10 = 100,000.
4. The Federal Reserve. List its tools: open market operations, the discount rate, the reserve requirement and interest on reserve balances. Show how purchases of bonds increase reserves.

## Checking for understanding

Whiteboards: "RR is 25 percent. What is the multiplier? A new excess reserve of 2,000. What is the maximum change in the money supply?" (4 and 8,000)

## Exit ticket

Why can banks create money, and what limits how much?
`,
  reading: [
    "What counts as money, and how lending makes more of it",
    `
Money is anything that is generally accepted in exchange for goods and services. It serves three functions. As a **medium of exchange**, it lets trade happen without the double coincidence of wants that barter requires. As a **unit of account**, it provides a common measure in which prices and debts are stated. As a **store of value**, it allows purchasing power to be saved for later. Cash holds its value less well when inflation is high. Modern money in the United States is **fiat money**, with no intrinsic value and no backing in gold. It is accepted because the government declares it legal tender and because people trust that others will accept it.

Economists measure the **money supply** at different levels of liquidity, which is how easily an asset is turned into spending. **M1** includes currency in circulation and checkable deposits, the most liquid forms. **M2** includes everything in M1 plus savings deposits, small time deposits (such as certificates of deposit under 100,000 dollars) and retail money market funds. Credit cards are not money, because a card is a way of borrowing, not an asset. (In 2020 the Federal Reserve began counting savings deposits in M1, but the AP course still uses the traditional split described here, so check which your question uses.)

Banks do more than store money. In a **fractional reserve banking system**, banks keep only a fraction of deposits as reserves and lend out the rest. The **required reserve ratio** (RR) is the fraction of deposits that banks must hold in reserve. Suppose RR is 20 percent, and a customer deposits 5,000 dollars in cash. The bank must keep 1,000 as **required reserves**, and the remaining 4,000 are **excess reserves**, which it can lend. When it lends 4,000 and the borrower spends it, the funds end up in another bank's deposits, which keeps 20 percent (800) and lends 3,200, and so on. Each loan creates new checkable deposits, so lending expands the money supply. The maximum expansion is given by the **money multiplier**, which equals 1/RR. With RR of 20 percent, the multiplier is 5. The maximum possible increase in the money supply from a change in excess reserves is the change in excess reserves times the multiplier: 4,000 x 5 = 20,000.

The same logic applies to the banking system as a whole. Suppose banks have 200,000 dollars in checkable deposits and a required ratio of 10 percent, so required reserves are 20,000. If actual reserves are 30,000, excess reserves are 10,000. With a multiplier of 10, the maximum potential expansion is 10,000 x 10 = 100,000. In practice the actual increase is smaller, because banks may hold extra reserves and borrowers may keep some funds as cash, which are called leakages. If banks lend nothing during a crisis, the multiplier effect weakens.

The **Federal Reserve**, the central bank, controls the money supply with four main tools. In **open market operations**, it buys or sells government bonds. A purchase puts reserves in banks' hands, which raises excess reserves and expands the money supply. A sale takes reserves out and contracts it. The Fed can also change the **discount rate**, the interest rate it charges banks for short-term loans, and the **reserve requirement**; lowering either encourages lending and increases the money supply. Since 2008 it has also used **interest on reserve balances**, which sets a floor under short-term rates. The Fed's open market purchase of 1,000 dollars of bonds from a bank with RR of 20 percent adds 1,000 in excess reserves and could expand the money supply by up to 5,000.

For the exam, practice with T-accounts and be precise about words: required reserves, excess reserves, maximum potential change in the money supply.
`,
  ],
  cards: [
    ["Medium of exchange", "A function of money: accepted in payment for goods and services."],
    ["Unit of account", "A function of money: the standard in which prices are quoted."],
    ["Store of value", "A function of money: holding purchasing power for the future."],
    ["Fiat money", "Money with value because of government decree and public trust, not backing in a commodity."],
    ["M1 and M2", "M1 is currency and checkable deposits; M2 adds savings deposits, small time deposits and retail money market funds."],
    ["Required reserves", "The fraction of deposits a bank must hold in reserve (RR times deposits)."],
    ["Money multiplier", "1 divided by the required reserve ratio."],
    ["Open market purchase", "The Fed buys bonds, increasing banks' reserves and the money supply."],
  ],
  closed: [
    [
      "A seller in Columbus posts a car for 12,000 dollars. In this case, money is functioning as:",
      ["A medium of exchange", "A unit of account", "A store of value", "A fiat standard"],
      "B",
    ],
    [
      "The required reserve ratio is 20 percent. What is the money multiplier?",
      ["0.2", "2", "5", "20"],
      "C",
    ],
    [
      "A customer deposits 5,000 dollars in cash in a bank with RR of 20 percent. What are excess reserves immediately after the deposit?",
      ["1,000 dollars", "4,000 dollars", "5,000 dollars", "20,000 dollars"],
      "B",
    ],
    [
      "Banks have 200,000 dollars in checkable deposits, a required ratio of 10 percent and actual reserves of 30,000 dollars. What is the maximum potential increase in the money supply?",
      ["10,000 dollars", "30,000 dollars", "100,000 dollars", "300,000 dollars"],
      "C",
    ],
    [
      "Which action by the Federal Reserve would most likely decrease the money supply?",
      [
        "Buying government bonds",
        "Selling government bonds",
        "Lowering the discount rate",
        "Lowering the reserve requirement",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A customer deposits 5,000 dollars in cash in a bank. The required reserve ratio is 20 percent. (a) Calculate required reserves and excess reserves for the bank after the deposit. (b) Calculate the money multiplier. (c) Calculate the maximum potential increase in the money supply from the new excess reserves. (d) Explain one reason the actual increase would be smaller than your answer.",
      scheme: [
        "Calculates required reserves of 1,000 and excess reserves of 4,000",
        "Calculates the money multiplier of 5",
        "Calculates the maximum potential increase of 20,000 dollars",
        "Explains a reason the actual increase would be smaller, such as banks holding extra reserves or borrowers holding cash",
      ],
      model:
        "(a) Required reserves are 0.20 x 5,000 = 1,000 dollars, so excess reserves are 5,000 - 1,000 = 4,000 dollars. (b) The money multiplier is 1/0.20 = 5. (c) The maximum potential increase in the money supply is 4,000 x 5 = 20,000 dollars. (d) The actual increase would be smaller if banks choose to hold more reserves than required, or if borrowers keep some of their loans as cash instead of depositing it, which breaks the chain of lending.",
      answers: [
        [
          "full",
          "(a) [[0|Required reserves are 20 percent of 5,000, which is 1,000, so the excess reserves are 4,000]]. (b) [[1|The money multiplier is 1 divided by 0.20, which is 5]]. (c) [[2|The maximum increase in the money supply is 4,000 times 5, which is 20,000 dollars]]. (d) [[3|The actual increase would be smaller if banks keep extra reserves or if people hold some of the loan money as cash instead of putting it in the bank]].",
          "Full marks. Your calculations are right and your reason for a smaller actual increase is correct.",
        ],
        [
          "full",
          "(a) [[0|The bank has to hold back 1,000 as required reserves and has 4,000 in excess reserves]]. (b) [[1|With RR = 0.2 the multiplier is 5]]. (c) [[2|The excess reserves times the multiplier gives 4,000 x 5 = 20,000 as the maximum possible]]. (d) [[3|In reality some borrowers keep cash in their wallets or banks hold more than required, so the loans don't all get deposited and re-lent]].",
          "All four points. Stating that this is the maximum shows you know the formula's limits.",
        ],
        [
          "partial",
          "(a) [[0|Required reserves are 1,000 and excess reserves are 4,000]]. (b) [[1|5]]. (c) 5,000 x 5 is 25,000. (d) Banks might not lend.",
          "Parts (a) and (b) are right. In (c) use the excess reserves of 4,000, not the whole deposit. In (d), say why the actual increase would be smaller.",
        ],
        [
          "partial",
          "(c) [[2|20,000]]. (d) [[3|Borrowers might keep some cash]]. (a) Required reserves are 5,000. (b) 0.2.",
          "Parts (c) and (d) are right. In (a), required reserves are 0.20 x 5,000 = 1,000, and in (b) the multiplier is 1 divided by 0.2, which is 5.",
          true,
        ],
        [
          "weak",
          "(a) 1,000 and 1,000. (b) 0.2. (c) 1,000. (d) Banks always lend everything.",
          "Excess reserves are the deposit minus required reserves, which is 4,000, and the multiplier is 1/RR. Review the steps.",
        ],
        [
          "weak",
          "(a) [[0|1,000 required reserves]]. (b) 20. (c) 100,000. (d) None.",
          "The required reserves are right, but the multiplier is 1/0.20 = 5, and the maximum increase is excess reserves (4,000) times the multiplier. Review the steps.",
        ],
      ],
    },
    {
      prompt:
        "The Federal Reserve wants to expand the money supply. Banks hold no excess reserves, and the required reserve ratio is 10 percent. (a) Describe one open market operation the Fed could use. (b) The Fed buys 2,000 dollars of bonds from banks. Calculate the maximum potential increase in the money supply. (c) Explain the effect of the operation on the money supply, the nominal interest rate and aggregate demand. (d) Explain one other tool the Fed could use to expand the money supply.",
      scheme: [
        "Describes an open market purchase of government bonds",
        "Calculates the maximum increase as 2,000 times 10, or 20,000 dollars",
        "Explains that the money supply rises, the nominal interest rate falls and AD rises",
        "Describes another tool, such as lowering the reserve requirement or discount rate",
      ],
      model:
        "(a) The Fed could buy government bonds from banks, which puts reserves in their hands. (b) The purchase adds 2,000 of excess reserves. With RR of 10 percent the multiplier is 10, so the maximum increase is 2,000 x 10 = 20,000 dollars. (c) The money supply increases, which lowers the nominal interest rate, and lower rates increase investment and consumption, so aggregate demand rises. (d) The Fed could also lower the reserve requirement or the discount rate, which would encourage banks to lend more.",
      answers: [
        [
          "full",
          "(a) [[0|The Fed could buy government bonds from banks, which gives them more reserves]]. (b) [[1|The 2,000 is all excess reserves, and the multiplier is 1/0.10 = 10, so the maximum money supply increase is 20,000 dollars]]. (c) [[2|The money supply goes up, which lowers the nominal interest rate, and lower rates raise investment and consumption, so AD increases]]. (d) [[3|The Fed could also lower the reserve requirement or the discount rate so banks would lend more]].",
          "Full marks. Your chain from reserves to interest rates to AD is complete.",
        ],
        [
          "full",
          "(a) [[0|An open market purchase of Treasury bonds from banks]]. (b) [[1|Excess reserves rise by 2,000 and with a multiplier of 10, the maximum rise in the money supply is 20,000]]. (c) [[2|The money supply increases, interest rates fall because money is more plentiful, and lower rates encourage borrowing for investment and spending, shifting AD to the right]]. (d) [[3|Lowering the discount rate would make it cheaper for banks to borrow from the Fed, so they would lend more]].",
          "All four points. You explained why rates fall, not just that they do.",
        ],
        [
          "partial",
          "(a) [[0|The Fed buys bonds]]. (b) [[1|20,000]]. (c) The money supply goes up. (d) Something else.",
          "Parts (a) and (b) are right. In (c), explain the effects on interest rates and AD, and in (d) name another tool.",
        ],
        [
          "partial",
          "(c) [[2|The money supply rises, interest rates fall and AD increases]]. (d) [[3|The Fed could lower the reserve requirement]]. (a) Sell bonds. (b) 2,000.",
          "Parts (c) and (d) are right. To expand the money supply the Fed buys bonds, and the maximum increase is 2,000 x 10 = 20,000.",
          true,
        ],
        [
          "weak",
          "(a) The Fed sells bonds. (b) 200. (c) The interest rate goes up. (d) Print more money.",
          "To expand the money supply the Fed buys bonds, which lowers the nominal interest rate. The multiplier is 1/RR = 10, so the effect is 20,000.",
        ],
        [
          "weak",
          "(a) [[0|The Fed buys bonds]]. (b) The money supply doesn't change. (c) Nothing. (d) The Fed can't do more.",
          "Buying bonds does expand the money supply, by up to 20,000 here. Explain the effects and a second tool.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "The money market, loanable funds and drawing the graphs",
  note: `
## Objectives

Students will be able to:

1. analyze the money market and the loanable funds market with graphs;
2. draw and label a graph that illustrates an economic change and explain the result in words.

## Materials

Blank graph templates for the money market (nominal interest rate on the vertical axis, quantity of money on the horizontal) and the loanable funds market (real interest rate on the vertical axis, quantity of loanable funds on the horizontal), a scoring guide for graph questions (axis labels, curve labels, equilibrium, shift with arrows, new equilibrium, words), scenario cards (an open market purchase; a rise in the price level; a government budget deficit; a rise in private saving), a calculation set (nominal rate 6 percent with expected inflation 2.5 percent; investment falls 40 billion dollars for each 1-point rise in the real rate), and the exit ticket.

## Starter (8 minutes)

Ask: "Why does holding cash cost you something, even if it is in your pocket and safe?" Elicit the idea of opportunity cost: the interest you could have earned. Use this to introduce a money demand curve that slopes downward.

## Main activity

1. Money market. Draw a downward-sloping money demand (people hold less money as the nominal interest rate rises), a vertical money supply set by the Fed, and equilibrium. An open market purchase shifts supply right, so the nominal interest rate falls, investment and interest-sensitive consumption rise, and AD shifts right. A rise in the price level shifts money demand right, raising the nominal interest rate. Students practice each shift with the scoring guide.
2. Loanable funds. Savers supply funds and borrowers (firms and government) demand them. A government budget deficit increases the demand for loanable funds (shifts it right), raising the real interest rate and crowding out private investment. A rise in private saving shifts supply right, lowering the real rate. Calculate: if the real rate rises by 1.5 points, investment falls by 1.5 x 40 = 60 billion dollars.
3. Real and nominal rates. Calculate the real rate: 6 - 2.5 = 3.5 percent.
4. Free response practice. Students write a complete graph question in the exam's format and exchange it for scoring.

## Checking for understanding

Whiteboards: "State the new nominal interest rate direction when the Fed sells bonds, and name the curve that shifts."

## Exit ticket

Explain in two sentences how a budget deficit affects private investment.
`,
  reading: [
    "Two markets for money and credit, and the habit of precise graphs",
    `
Interest rates play a central role in macroeconomics, and AP questions treat them in two separate graphs. Students often confuse them, so it is worth being careful about which market, which axis and which interest rate.

The **money market** shows the demand and supply of money itself, such as cash and checkable deposits. The vertical axis is the **nominal interest rate**, and the horizontal axis is the quantity of money. **Money demand** slopes downward because the nominal interest rate is the opportunity cost of holding money. When rates are high, people hold less cash and put more in bonds or savings, and when rates are low, they hold more. Money demand shifts right when the price level rises or when real GDP rises, since people need more money for transactions, and it can shift because of technology, such as mobile payments, that changes how much cash people need. **Money supply** is a vertical line, because the Federal Reserve sets it. Equilibrium is where the two intersect. If the Fed conducts an **open market purchase**, banks gain reserves and money supply shifts right. At the original interest rate there is now excess supply, so the nominal rate falls. Lower rates raise investment and interest-sensitive consumption, so aggregate demand shifts right, increasing real GDP and the price level. A sale of bonds does the opposite: money supply shifts left, the rate rises, AD shifts left.

The **loanable funds market** shows how savers and borrowers meet. The vertical axis is the **real interest rate**, and the horizontal axis is the quantity of loanable funds. The supply of loanable funds comes from saving by households, businesses and foreigners, and slopes upward, since higher real rates reward saving. The demand comes from borrowers, mainly firms that want to invest and governments that run deficits, and slopes downward. Suppose the government runs a larger **budget deficit** and must borrow more. The demand for loanable funds shifts right, so the real interest rate rises and the quantity of loanable funds rises. The higher real rate reduces private investment, an effect called **crowding out**. If each one-point rise in the real rate reduces investment by 40 billion dollars, a rise of 1.5 points reduces it by 60 billion. A rise in private saving, by contrast, shifts the supply right, lowers the real interest rate and raises investment.

The two interest rates are linked. The **Fisher relationship** says that the nominal rate is approximately the real rate plus expected inflation, so real = nominal - expected inflation. If the nominal rate is 6 percent and expected inflation is 2.5 percent, the real rate is 3.5 percent. In the short run, the Fed influences nominal short-term rates through the money market, and with sticky prices, this affects real rates too.

On free-response questions, the graph earns points only if it is complete. Label the axes (nominal interest rate versus real interest rate matters), label each curve (MD, MS, or supply and demand of loanable funds), mark the original equilibrium, show the shift with an arrow and a new curve label, and mark the new equilibrium. Then use words to state the direction of each change and the reason. A common error is to draw a correct shift on the wrong graph, or to say that the Fed shifts money demand when it shifts money supply.
`,
  ],
  cards: [
    ["Money market", "Graph of money demand and supply; vertical axis is the nominal interest rate."],
    ["Money demand", "Downward-sloping because the nominal interest rate is the opportunity cost of holding money."],
    ["Money supply", "Vertical line set by the Federal Reserve."],
    ["Loanable funds market", "Graph of saving (supply) and borrowing (demand); vertical axis is the real interest rate."],
    ["Budget deficit effect", "Raises demand for loanable funds, raising the real rate and crowding out private investment."],
    ["Fisher relationship", "Real interest rate is approximately the nominal rate minus expected inflation."],
    ["Crowding out", "Reduced private investment because government borrowing raises the real interest rate."],
    ["Graph scoring points", "Labeled axes, labeled curves, original equilibrium, shift, new equilibrium and an explanation in words."],
  ],
  closed: [
    [
      "In the money market, the Fed conducts an open market sale of bonds. What happens to the nominal interest rate?",
      ["It falls", "It rises", "It stays the same", "It cannot be determined"],
      "B",
    ],
    [
      "A government increases its budget deficit. In the loanable funds market, which curve shifts and what happens to the real interest rate?",
      [
        "Supply shifts right; the real rate falls",
        "Demand shifts right; the real rate rises",
        "Demand shifts left; the real rate falls",
        "Supply shifts left; the real rate falls",
      ],
      "B",
    ],
    [
      "The nominal interest rate is 6 percent and expected inflation is 2.5 percent. What is the real interest rate?",
      ["2.5 percent", "3.5 percent", "6.0 percent", "8.5 percent"],
      "B",
    ],
    [
      "Investment falls by 40 billion dollars for each 1-point rise in the real rate. The real rate rises by 1.5 points. By how much does investment fall?",
      ["26.7 billion dollars", "40 billion dollars", "60 billion dollars", "80 billion dollars"],
      "C",
    ],
    [
      "Which of the following shifts the money demand curve to the right?",
      [
        "A fall in the price level",
        "A rise in the price level",
        "An open market purchase by the Fed",
        "A fall in real GDP",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "The Federal Reserve conducts an open market purchase of government bonds. (a) Draw, in words, a correctly labeled money market graph showing the initial equilibrium. (b) Show and explain the effect of the purchase on the money market graph, including the new nominal interest rate. (c) Explain the effect on investment and aggregate demand. (d) Explain the effect on real GDP and the price level in the short run.",
      scheme: [
        "Describes a labeled graph: nominal interest rate on the vertical axis, quantity of money on the horizontal axis, downward-sloping money demand, vertical money supply and equilibrium",
        "Explains that money supply shifts right, lowering the nominal interest rate",
        "Explains that the lower rate increases investment and shifts AD right",
        "States that real GDP and the price level both rise in the short run",
      ],
      model:
        "(a) The graph has the nominal interest rate on the vertical axis and the quantity of money on the horizontal axis, a downward-sloping money demand curve and a vertical money supply curve crossing at the equilibrium rate. (b) The open market purchase gives banks reserves, so money supply shifts right and the nominal interest rate falls. (c) A lower interest rate makes borrowing cheaper, so investment and interest-sensitive consumption rise, shifting aggregate demand right. (d) In the short run, real GDP and the price level both rise.",
      answers: [
        [
          "full",
          "(a) [[0|The vertical axis is the nominal interest rate and the horizontal axis is the quantity of money, with a downward-sloping money demand, a vertical money supply and equilibrium where they meet]]. (b) [[1|The Fed buys bonds, giving banks reserves, so money supply shifts right and the nominal interest rate falls]]. (c) [[2|A lower interest rate makes borrowing cheaper, so investment and consumption rise, shifting AD right]]. (d) [[3|In the short run real GDP and the price level both increase]].",
          "Full marks. Your graph description is complete and each step follows from the one before it.",
        ],
        [
          "full",
          "(a) [[0|On the money market graph, the nominal interest rate is on the vertical axis and the quantity of money on the horizontal axis, with MD sloping down, MS vertical, and equilibrium at the crossing]]. (b) [[1|An open market purchase increases reserves and the money supply, so MS shifts to the right, which causes excess money supply at the old rate, and the nominal rate falls]]. (c) [[2|With lower interest rates, firms invest more and households buy more interest-sensitive items, so AD shifts right]]. (d) [[3|The AD shift raises real GDP and the price level in the short run, and lowers unemployment]].",
          "All four points. Describing the excess supply at the old rate explains why the rate falls.",
        ],
        [
          "partial",
          "(a) [[0|Nominal interest rate on the vertical axis, quantity of money on the horizontal axis, with demand, supply and equilibrium]]. (b) The money supply changes. (c) AD goes up. (d) GDP rises.",
          "Part (a) is right. In (b), state the direction of the shift and the interest rate, in (c) explain the link from rates to investment, and in (d) include the price level.",
        ],
        [
          "partial",
          "(b) [[1|MS shifts right so the nominal interest rate falls]]. (c) [[2|Lower rates increase investment and AD]]. (a) I drew the graph with real interest rate on the vertical axis. (d) Prices fall.",
          "Parts (b) and (c) are right. The money market uses the nominal interest rate on the vertical axis, and in (d) both real GDP and the price level rise in the short run.",
          true,
        ],
        [
          "weak",
          "(a) Real interest rate on the vertical axis. (b) Money demand shifts left. (c) Investment falls. (d) Real GDP falls.",
          "An open market purchase shifts money supply right, lowering the nominal interest rate and raising investment. Review the money market.",
        ],
        [
          "weak",
          "(a) [[0|Nominal interest rate and quantity of money on the axes]]. (b) The interest rate rises. (c) AD goes down. (d) Nothing happens.",
          "The axes are right. A purchase of bonds increases the money supply and lowers the nominal interest rate, which raises AD. Review each step.",
        ],
      ],
    },
    {
      prompt:
        "A government increases its budget deficit to pay for new spending. (a) Draw, in words, a correctly labeled loanable funds graph showing the initial equilibrium. (b) Show and explain the effect of the larger deficit on the graph, including the real interest rate. (c) If each 1-point rise in the real interest rate reduces private investment by 40 billion dollars and the real rate rises by 1.5 points, calculate the reduction in investment. (d) Explain what this effect is called and why it matters for long-run growth.",
      scheme: [
        "Describes a labeled graph: real interest rate on the vertical axis, quantity of loanable funds on the horizontal axis, upward-sloping supply, downward-sloping demand and equilibrium",
        "Explains that demand for loanable funds shifts right and the real interest rate rises",
        "Calculates the reduction in investment as 60 billion dollars",
        "Names crowding out and explains that lower investment reduces capital accumulation and long-run growth",
      ],
      model:
        "(a) The graph has the real interest rate on the vertical axis and the quantity of loanable funds on the horizontal axis, with an upward-sloping supply from savers and a downward-sloping demand from borrowers, crossing at equilibrium. (b) A larger deficit means the government borrows more, so demand for loanable funds shifts right and the real interest rate rises. (c) 1.5 x 40 = 60 billion dollars of investment is lost. (d) This is crowding out. Lower private investment means less capital accumulation, which can reduce long-run economic growth.",
      answers: [
        [
          "full",
          "(a) [[0|Real interest rate is on the vertical axis and quantity of loanable funds is on the horizontal axis, with upward-sloping supply from savers and downward-sloping demand from borrowers, crossing at equilibrium]]. (b) [[1|The government borrows more so the demand for loanable funds shifts right, and the real interest rate rises]]. (c) [[2|1.5 times 40 is 60 billion dollars less investment]]. (d) [[3|It's called crowding out, and less private investment means less capital for the future, which can lower long-run growth]].",
          "Full marks. You labeled the graph, traced the shift and tied crowding out to long-run growth.",
        ],
        [
          "full",
          "(a) [[0|The loanable funds graph has the real interest rate on the vertical axis, loanable funds on the horizontal axis, supply sloping up, demand sloping down and equilibrium]]. (b) [[1|The deficit raises the demand for loanable funds, shifting D to the right, so the real interest rate goes up and the quantity of loanable funds increases]]. (c) [[2|With a 1.5-point increase and 40 billion per point, investment falls by 60 billion dollars]]. (d) [[3|This is crowding out, because government borrowing pushes out private firms, and since investment builds capital, it can slow long-run growth]].",
          "All four points. 'Pushes out private firms' is a plain-language way to put crowding out.",
        ],
        [
          "partial",
          "(a) [[0|Real interest rate vertical, loanable funds horizontal, supply and demand]]. (b) The demand shifts. (c) 40. (d) Crowding out.",
          "Part (a) is right. In (b) say which way it shifts and what happens to the rate, in (c) multiply 1.5 by 40, and in (d) explain the effect.",
        ],
        [
          "partial",
          "(c) [[2|60 billion dollars]]. (d) [[3|Crowding out reduces investment and future growth]]. (b) Supply shifts left. (a) A graph.",
          "Parts (c) and (d) are right. In (b), a larger deficit shifts demand for loanable funds right, which raises the real rate, and describe the labeled graph in (a).",
          true,
        ],
        [
          "weak",
          "(a) Nominal interest rate on the vertical axis. (b) Supply shifts right so the rate falls. (c) 1.5. (d) Deficits are good for growth.",
          "The loanable funds graph uses the real interest rate, and a deficit shifts demand right, raising the rate. Calculate 1.5 x 40. Review crowding out.",
        ],
        [
          "weak",
          "(a) [[0|Real interest rate and loanable funds on the axes]]. (b) Nothing shifts. (c) 40. (d) Crowding out means more investment.",
          "The axes are right. A deficit shifts demand right, investment falls by 60, and crowding out means less private investment. Review the effect.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Reading real data from FRED and writing a free-response answer",
  note: `
## Objectives

Students will be able to:

1. interpret recent government data from FRED and explain what it shows about the economy;
2. write a free-response answer that defines, graphs and explains the effect of a policy.

## Materials

A data sheet from the St. Louis Fed's FRED database, with approximate values for the civilian unemployment rate (about 3.5 percent in February 2020, about 14.8 percent in April 2020, about 3.4 percent in January 2023), the 12-month change in the consumer price index (about 9.1 percent in June 2022), and the effective federal funds rate (near zero in early 2022, above 5 percent in mid-2023); a graph-reading guide (axis, units, scale, shaded recession bars, source); the free-response scoring guide; and the exit ticket.

## Starter (8 minutes)

Ask: "A headline says the unemployment rate is 3.4 percent, the lowest in over fifty years. What would you want to check before deciding the economy is healthy?" List: participation rate, inflation, wages, the type of jobs, which month, revisions.

## Main activity

1. Read the data. Students record the source, units and date for each series. They calculate the percentage-point change in unemployment from February to April 2020 (11.3 points) and the ratio (14.8 divided by 3.5, about 4.2 times). They identify the type of unemployment that rose sharply (cyclical) and relate the data to the AD-AS model: a large negative demand and supply shock.
2. Policy and data. Discuss the policy response in 2020: the Fed lowered the target for the federal funds rate to near zero and Congress passed large spending and transfer measures. Then discuss 2022: after inflation rose to about 9.1 percent, the Fed raised the federal funds rate above 5 percent by mid-2023. Students explain each in the AD-AS and money market models.
3. Free response. Students write a full answer to a four-part question on a policy that responds to the high inflation, including a labeled graph described in words, using the scoring guide.
4. Quiz. Five short questions on data interpretation and policy.

## Checking for understanding

Pairs exchange answers and score each other for one point at a time, using the guide.

## Exit ticket

State one thing the FRED data shows and one thing it cannot show.
`,
  reading: [
    "Reading FRED like an economist, and answering like one",
    `
The Federal Reserve Bank of St. Louis maintains FRED, an online database of hundreds of thousands of economic data series, many drawn from government agencies such as the Bureau of Labor Statistics and the Bureau of Economic Analysis. Every FRED graph tells you the series' name, units, frequency (monthly, quarterly) and source, and often shows recessions as shaded bars. A careful reader checks these before interpreting anything. A line labeled "percent" for the unemployment rate has a different meaning from a line labeled "index 1982-1984 = 100" for prices, and a change in the scale of the vertical axis can exaggerate or hide a movement.

Consider three data points on the civilian unemployment rate, which are approximate. In February 2020 it was about 3.5 percent, close to a fifty-year low. In April 2020, after the sudden shutdowns during the pandemic, it was about 14.8 percent. By January 2023, it was back to about 3.4 percent. The rise from February to April 2020 was about 11.3 percentage points, and the rate was about 4.2 times as high. A rise that large and quick had no precedent in the postwar data. In terms of the course, nearly all of it was **cyclical unemployment**, caused by a sharp fall in output and aggregate demand and by restrictions on supply, rather than by frictions or structural change. A graph of the AD-AS model would show AD shifting left, and for a time SRAS shifting left as well, with real GDP falling well below potential.

The policy response used both tools. The Federal Reserve cut its target for the federal funds rate to nearly zero in March 2020 and bought large quantities of bonds, which is an expansionary monetary policy that raises the money supply, lowers interest rates and shifts AD right. Congress passed large fiscal measures that raised government spending and sent transfer payments and tax relief to households and businesses, which are expansionary fiscal policy, using the multiplier idea. The recovery was fast. Then, as demand recovered while supply remained constrained, prices rose quickly. The 12-month change in the consumer price index reached about 9.1 percent in June 2022, the highest in about four decades. The Fed responded with contractionary monetary policy, raising the federal funds rate from near zero in early 2022 to above 5 percent by mid-2023, with open market sales and other tools. The aim was to shift AD left, reduce inflation and keep long-run expectations stable, at the risk of raising unemployment.

Data have limits. A single series cannot show cause. Rising prices might reflect strong demand, constrained supply, expectations or all three, and the data themselves do not decide. Data are also revised, so early estimates can change. A careful answer cites the series, states the numbers and says what the data suggest, and does not claim more than they show.

The free-response section rewards a specific structure. A typical question has four or five parts: define a term, draw and label a graph, show a shift, explain the effect in words, and sometimes calculate. Each part earns points separately, and a wrong answer in one part does not prevent credit in another. The best habit is to answer each part in order, label it with the letter, show the work for any calculation and write in short, precise sentences. Use economic terms exactly. For example, say "the Fed sells bonds, which decreases bank reserves and shifts money supply left" and not "the Fed reduces money."
`,
  ],
  cards: [
    ["FRED", "A database from the St. Louis Fed with data series from government agencies, shown with units, dates and recession bars."],
    ["Percentage point change", "The simple difference between two percentages; 14.8 minus 3.5 is 11.3 points."],
    ["Cyclical unemployment (2020)", "Unemployment caused by the sharp, temporary collapse in output."],
    ["Federal funds rate", "The interest rate banks charge each other for overnight loans; the Fed's main policy target."],
    ["Contractionary monetary policy", "Raising interest rates or selling bonds to shift AD left and reduce inflation."],
    ["Expansionary fiscal policy", "Raising government spending or cutting taxes to shift AD right."],
    ["Limits of data", "A series shows what happened, not why; values can be revised."],
    ["Free-response structure", "Answer each lettered part in order, show work and use precise terms."],
  ],
  closed: [
    [
      "The unemployment rate rose from about 3.5 percent to about 14.8 percent. By how many percentage points?",
      ["4.2", "11.3", "18.3", "423"],
      "B",
    ],
    [
      "Inflation reaches about 9.1 percent, and the Fed raises the federal funds rate from near zero to above 5 percent. This is an example of:",
      [
        "Expansionary monetary policy",
        "Contractionary monetary policy",
        "Expansionary fiscal policy",
        "A supply shock",
      ],
      "B",
    ],
    [
      "Which action by the Fed is consistent with raising the federal funds rate?",
      [
        "Open market purchases of bonds",
        "Open market sales of bonds",
        "Lowering the reserve requirement",
        "Lowering the discount rate",
      ],
      "B",
    ],
    [
      "A FRED chart shows an index of consumer prices rising from 250 to 275. What is the percentage change?",
      ["2.5 percent", "10 percent", "25 percent", "27.5 percent"],
      "B",
    ],
    [
      "Which statement shows the most careful reading of a single FRED data series?",
      [
        "The data prove why unemployment rose",
        "The series shows the unemployment rate rose to about 14.8 percent in April 2020, but it does not by itself show the cause",
        "Unemployment always rises in April",
        "FRED data are never revised",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Use these approximate FRED values for the civilian unemployment rate: February 2020, 3.5 percent; April 2020, 14.8 percent. (a) Calculate the change in the unemployment rate in percentage points. (b) Identify the type of unemployment that most increased and explain why. (c) Explain, using an AD-AS description, what happened to real GDP relative to potential. (d) Identify one fiscal and one monetary policy that could respond, and explain the effect of each on aggregate demand.",
      scheme: [
        "Calculates an increase of 11.3 percentage points",
        "Identifies cyclical unemployment and explains that it was caused by a sharp fall in output and demand",
        "Explains that AD shifted left, so real GDP fell below potential (a recessionary gap)",
        "Describes an expansionary fiscal policy and explains that it shifts AD right",
        "Describes an expansionary monetary policy and explains that it lowers interest rates and shifts AD right",
      ],
      model:
        "(a) 14.8 - 3.5 = 11.3 percentage points. (b) Cyclical unemployment rose the most, because the cause was a sharp collapse in output and aggregate demand, and not workers searching or skills mismatches. (c) AD shifted left, so real GDP fell below potential, a large recessionary gap. (d) Expansionary fiscal policy, such as higher government spending or transfer payments, shifts AD right. Expansionary monetary policy, such as the Fed lowering interest rates and buying bonds, lowers interest rates, raises investment and consumption, and shifts AD right.",
      answers: [
        [
          "full",
          "(a) [[0|14.8 minus 3.5 is 11.3 percentage points]]. (b) [[1|Cyclical unemployment rose the most, because output and demand collapsed, not because of job searching or a skills mismatch]]. (c) [[2|AD shifted left, so real GDP fell far below potential, a big recessionary gap]]. (d) [[3|A fiscal policy is more government spending or transfer payments, which shifts AD right]]. [[4|A monetary policy is the Fed lowering interest rates by buying bonds, which raises investment and consumption and shifts AD right]].",
          "Full marks. You gave the calculation, the correct type and an explanation using the model, and described both policies.",
        ],
        [
          "full",
          "(a) [[0|The change is 11.3 percentage points]]. (b) [[1|It was mostly cyclical unemployment since the downturn caused firms to lay off workers when demand collapsed]]. (c) [[2|Real GDP dropped well below potential GDP because AD shifted left]]. (d) [[3|Congress could cut taxes or raise spending, which increases AD]]. [[4|The Fed could buy bonds to lower the nominal interest rate, which encourages borrowing and shifts AD right]].",
          "All five points. Saying firms laid off workers when demand collapsed is a clear description of cyclical unemployment.",
        ],
        [
          "partial",
          "(a) [[0|11.3 percentage points]]. (b) Cyclical. (c) GDP fell. (d) The government can spend more.",
          "Part (a) is right. In (b) explain why it is cyclical, in (c) use the AD-AS model, and in (d) give both a fiscal and a monetary policy with effects.",
        ],
        [
          "partial",
          "(d) [[3|Raising government spending shifts AD right]] and [[4|the Fed lowering interest rates shifts AD right]]. (a) 4.2. (b) Structural.",
          "Part (d) is strong. In (a), the change is 11.3 percentage points (4.2 is the ratio), and in (b), the surge was cyclical, not structural.",
          true,
        ],
        [
          "weak",
          "(a) 14.8 + 3.5 = 18.3. (b) Frictional because people were between jobs. (c) GDP rose. (d) Nothing could be done.",
          "The change is a difference, and the rise was cyclical, with real GDP falling below potential. Expansionary policies can respond. Review the terms.",
        ],
        [
          "weak",
          "(a) [[0|11.3]]. (b) Structural. (c) AD shifted right. (d) Raise interest rates.",
          "The difference is right. The surge was cyclical, AD shifted left, and the response would lower interest rates, not raise them.",
        ],
      ],
    },
    {
      prompt:
        "In mid-2022 inflation (the 12-month change in the CPI) was about 9.1 percent. The Federal Reserve raised its target for the federal funds rate. (a) Define the federal funds rate. (b) Draw, in words, a correctly labeled money market graph showing the Fed's action and the new nominal interest rate. (c) Explain the effect on investment, aggregate demand, real GDP and the price level in the short run. (d) Explain one risk of this policy.",
      scheme: [
        "Defines the federal funds rate as the interest rate banks charge each other for overnight loans",
        "Describes a labeled money market graph with a leftward money supply shift raising the nominal interest rate",
        "Explains that higher rates reduce investment and interest-sensitive spending, so AD shifts left",
        "States that real GDP and the price level fall (or inflation slows) in the short run",
        "Explains a risk, such as higher unemployment or a recession",
      ],
      model:
        "(a) The federal funds rate is the interest rate banks charge each other for overnight loans of reserves. (b) The money market graph has the nominal interest rate on the vertical axis and the quantity of money on the horizontal axis, a downward-sloping money demand and a vertical money supply. The Fed sells bonds, so money supply shifts left and the nominal interest rate rises. (c) Higher rates reduce investment and interest-sensitive consumption, so AD shifts left, lowering real GDP and the price level (slowing inflation) in the short run. (d) A risk is that the lower output raises cyclical unemployment and could cause a recession.",
      answers: [
        [
          "full",
          "(a) [[0|The federal funds rate is the interest rate banks charge each other for overnight loans]]. (b) [[1|The graph has the nominal interest rate on the vertical axis and the quantity of money on the horizontal axis, with money demand sloping down and a vertical money supply. The Fed sells bonds so money supply shifts left and the nominal interest rate rises]]. (c) [[2|The higher rate lowers investment and interest-sensitive consumption, so AD shifts left]]. [[3|Real GDP falls and the price level falls, which means inflation slows]]. (d) [[4|A risk is that unemployment could go up and cause a recession]].",
          "Full marks. Your answer states each part in order with precise terms.",
        ],
        [
          "full",
          "(a) [[0|The rate banks charge one another on overnight loans of reserves]]. (b) [[1|Nominal interest rate on the vertical axis, quantity of money on the horizontal axis, MD downward, MS vertical. Contractionary policy means selling bonds, which shifts MS left, and the nominal rate rises]]. (c) [[2|Higher interest rates make borrowing more expensive, so firms invest less and households buy fewer interest-sensitive goods, shifting AD left]]. [[3|In the short run that lowers real GDP and puts downward pressure on the price level]]. (d) [[4|The Fed risks going too far, causing cyclical unemployment to rise and the economy to slip into a recession]].",
          "All five points. 'Downward pressure on the price level' is the right way to describe slowing inflation in this model.",
        ],
        [
          "partial",
          "(a) [[0|The rate banks charge each other for overnight loans]]. (b) The Fed raised the rate. (c) AD went down. (d) A risk is something bad.",
          "Part (a) is right. In (b) describe the graph and the shift, in (c) explain the effects on investment, real GDP and the price level, and in (d) name a specific risk.",
        ],
        [
          "partial",
          "(c) [[2|Higher rates lower investment and AD]]. [[3|Real GDP and the price level fall]]. (d) [[4|Unemployment could rise]]. (a) A government rate. (b) A graph.",
          "Parts (c) and (d) are strong. Define the federal funds rate as the interbank overnight rate, and describe the graph with a leftward money supply shift.",
          true,
        ],
        [
          "weak",
          "(a) The rate the government charges taxpayers. (b) Money supply shifts right. (c) Investment rises and inflation goes up. (d) No risk.",
          "To reduce inflation the Fed sells bonds, which shifts money supply left and raises the rate. That lowers investment and AD.",
        ],
        [
          "weak",
          "(a) [[0|The rate banks charge each other]]. (b) The rate goes down. (c) AD shifts right. (d) Nothing.",
          "The definition is right. Contractionary policy raises the rate and shifts AD left, and it carries the risk of higher unemployment.",
        ],
      ],
    },
  ],
};

writeCourse("ap-macroeconomics-grade-12.json", "AP Macroeconomics", "Grade 12", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
