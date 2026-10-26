import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Personal Finance, Grade 10, Quarter 1. Standards: National Standards for
 * Personal Financial Education (earning income, spending, saving, investing,
 * managing credit, managing risk), in the school's own words. Rates, brackets
 * and wages are invented for the exercises and every figure has been checked
 * by hand.
 */

const w1: WeekInput = {
  topic: "Earning income and reading a pay stub",
  note: `
## Objectives

Students will be able to:

1. explain how education and skills affect earning potential, using data on careers;
2. read a pay stub and explain gross pay, net pay and each deduction;
3. calculate take-home pay from an hourly wage and a salary.

## Materials

A sample pay stub (invented), a career earnings table (illustrative figures), calculators, the worksheet.

## Starter (6 minutes)

Ask: "Two people work 40 hours a week. One earns $15 an hour, the other $25. Why might that be?" List answers: training, experience, demand, risk.

## Main activity

1. Earning potential: on average, more education and in-demand skills lead to higher pay and lower unemployment, but with exceptions. Trades, certificates and degrees all raise earning power; so does experience.
2. The pay stub: gross pay (before deductions); deductions: Social Security (6.2 percent), Medicare (1.45 percent), federal income tax withholding, state income tax withholding; net pay (take-home).
3. Hourly example: 30 hours at $15 = $450 gross. Social Security 6.2 percent = $27.90; Medicare 1.45 percent = $6.53; federal withholding $24; state withholding $8; total deductions $66.43; net pay $383.57.
4. Salary example: $52,000 a year paid every two weeks (26 paychecks) = $2,000 gross each. Social Security $124, Medicare $29, federal $180, state $60: total $393; net $1,607.

## Worksheet

Compute gross, deductions and net pay.
`,
  reading: [
    "What you earn, and what you take home",
    `
Most people earn income by working, and what they earn depends on many things. Across large groups of workers, those with more **education and training** tend to earn more, and are less likely to be unemployed. The reasons are practical: skills that are rare or in high demand, such as nursing, electrical work, welding or computer programming, command higher pay because employers compete for them. Education does not have to mean a four-year degree. A one-year certificate, an apprenticeship in a trade or a two-year associate's degree can all raise earning power, and so can years of **experience**. These are averages, not guarantees: some people earn a lot without a degree, and some graduates earn little. Choosing a path also means weighing the cost of training and the years of earning lost while studying.

When you start a job, your paycheck is smaller than the number you were quoted. **Gross pay** is what you earn before anything is taken out. For an hourly worker it is hours times the hourly rate; for a salaried worker it is the annual salary divided by the number of paychecks. **Net pay**, or take-home pay, is what is left after **deductions**. The pay stub lists each deduction. **Social Security** (6.2 percent of gross pay) and **Medicare** (1.45 percent) together are called FICA, and fund retirement and health benefits for older Americans. **Federal income tax** and **state income tax** are withheld in advance so that you do not owe a large bill at the end of the year. Some people also have deductions for health insurance or a retirement plan.

Here is an hourly example. A student works 30 hours at $15 an hour: gross pay is 30 x 15 = $450. Social Security is 6.2 percent of 450, which is $27.90. Medicare is 1.45 percent of 450, which is $6.53 (rounded). Suppose federal withholding is $24 and state withholding is $8. Total deductions are 27.90 + 6.53 + 24 + 8 = $66.43, so net pay is 450 - 66.43 = $383.57.

A salary example: a worker earns $52,000 a year and is paid every two weeks, 26 paychecks a year. Gross pay per check is 52,000 / 26 = $2,000. Social Security is $124 and Medicare is $29. If federal withholding is $180 and state is $60, the deductions total $393 and net pay is $1,607. Reading the stub carefully lets you notice mistakes and plan your spending around the amount you really receive, not the amount you were promised.
`,
  ],
  cards: [
    ["Gross pay", "Earnings before any deductions."],
    ["Net pay", "Take-home pay after deductions."],
    ["Deduction", "An amount taken out of gross pay."],
    ["FICA", "Social Security and Medicare payroll taxes."],
    ["Withholding", "Income tax taken from each paycheck in advance."],
    ["Salary", "A fixed yearly pay divided across paychecks."],
    ["Earning potential", "How much a person can expect to earn over time."],
    ["Apprenticeship", "Paid training on the job in a skilled trade."],
  ],
  closed: [
    [
      "A student works 30 hours at $15 an hour. What is the gross pay?",
      ["$45", "$315", "$450", "$495"],
      "C",
    ],
    [
      "Which deduction is 6.2 percent of gross pay?",
      ["Medicare", "Social Security", "State tax", "Health insurance"],
      "B",
    ],
    [
      "A salary of $52,000 is paid every two weeks, 26 times a year. What is the gross pay per check?",
      ["$1,000", "$2,000", "$4,333", "$26,000"],
      "B",
    ],
    [
      "Gross pay is $450 and total deductions are $66.43. What is the net pay?",
      ["$383.57", "$516.43", "$66.43", "$450.00"],
      "A",
    ],
    [
      "Which statement about education and pay is most accurate?",
      ["More training tends to raise average pay, with exceptions", "A degree guarantees a high income", "Training never affects pay", "Only a four-year degree helps"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A student works 20 hours in a week at $15 an hour. Social Security and Medicare together take 7.65 percent of gross pay, and $15 is withheld for income taxes. Calculate the gross pay, the FICA deduction and the net pay, then explain why take-home pay is lower than gross pay.",
      scheme: [
        "Calculates gross pay as $300",
        "Calculates the FICA deduction as $22.95",
        "Calculates net pay as $262.05",
        "Explains that deductions pay for taxes and programs such as Social Security and Medicare, so take-home is lower",
      ],
      model:
        "Gross pay is 20 times $15, which is $300. FICA is 7.65 percent of $300, which is $22.95. Adding the $15 of income tax gives $37.95 of deductions, so net pay is $300 minus $37.95, which is $262.05. Take-home pay is lower because taxes and payroll contributions are taken out before the money is paid, to fund services and programs such as Social Security and Medicare.",
      answers: [
        [
          "full",
          "[[0|Gross pay is 20 × $15 = $300.]] [[1|FICA is 7.65 percent of 300, which is $22.95.]] [[2|With the $15 income tax, deductions are $37.95, so net pay is 300 - 37.95 = $262.05.]] [[3|Take-home is lower because taxes and payroll contributions are taken out first to pay for programs like Social Security and Medicare.]]",
          "Full marks. Every figure is correct and the reason is clear.",
        ],
        [
          "full",
          "[[0|She earns $300 gross for 20 hours.]] [[1|Social Security and Medicare take $22.95.]] [[2|Add $15 for income tax and the deductions are $37.95, which leaves $262.05 in net pay.]] [[3|The difference is money withheld for taxes and for the Social Security and Medicare programs she will use later.]]",
          "Full marks. Linking the deductions to later benefits is accurate.",
        ],
        [
          "partial",
          "[[0|Gross pay is $300.]] [[3|Deductions are taxes.]] FICA is 7.65 percent so it is $7.65, and net pay is $277.35.",
          "7.65 percent of $300 is $22.95, not $7.65. Recalculate FICA and net pay.",
        ],
        [
          "partial",
          "[[1|FICA is $22.95.]] [[2|Net pay is $262.05.]] Gross pay is 20 + 15 = $35.",
          "Gross pay is hours times the rate, so 20 times $15.",
          true,
        ],
        [
          "weak",
          "Gross pay and net pay are the same. The employer must be keeping the missing money.",
          "Deductions are sent to the government for taxes and programs, not kept by the employer.",
        ],
        [
          "weak",
          "[[0|It is $300.]] Net pay is $300 plus the deductions because they are added in.",
          "Deductions are subtracted from gross pay to find net pay.",
        ],
      ],
    },
    {
      prompt:
        "Worker A earns $40,000 a year with no training after high school. Worker B completes a two-year technical program costing $12,000 and then earns $60,000 a year. Calculate how much more Worker B earns over 10 years, subtract the program cost, and explain two other things (one for and one against) that Worker B should consider.",
      scheme: [
        "Calculates the extra earnings as $20,000 a year, or $200,000 over 10 years",
        "Subtracts the $12,000 cost to reach $188,000",
        "Gives one consideration in favor, such as higher pay or better job security",
        "Gives one consideration against, such as two years of lost earnings or the chance the job market changes",
      ],
      model:
        "Worker B earns $20,000 more each year, which is $200,000 over 10 years. Subtracting the $12,000 program cost leaves $188,000. In favor, skilled workers often have better job security and room to advance. Against, B gives up two years of full-time earnings while studying and the job market may change.",
      answers: [
        [
          "full",
          "[[0|B earns $60,000 - $40,000 = $20,000 more a year, which is $200,000 over 10 years.]] [[1|After the $12,000 program, the gain is $188,000.]] [[2|In favor: skilled workers often have steadier jobs and can move up.]] [[3|Against: B loses about two years of full-time pay while studying, and the demand for the skill could change.]]",
          "Full marks. You included a cost that the raw figures hide.",
        ],
        [
          "full",
          "[[0|The yearly gap is $20,000, so over a decade it is $200,000.]] [[1|Taking away the $12,000 tuition leaves $188,000.]] [[2|A good point for B is that employers are asking for the training, so jobs are easier to find.]] [[3|A point against is that B can't work full time during the two years, so the real gain is smaller.]]",
          "Full marks. The real gain accounts for time spent studying.",
        ],
        [
          "partial",
          "[[0|B earns $20,000 more a year, or $200,000 in 10 years.]] [[2|B may find a job more easily.]] The program costs nothing, so the gain is $200,000.",
          "The program costs $12,000, so subtract it. Also name something against the choice.",
        ],
        [
          "partial",
          "[[1|$200,000 - $12,000 = $188,000.]] [[3|Studying costs two years of pay.]] B earns $100,000 more a year.",
          "The yearly difference is $60,000 minus $40,000, which is $20,000.",
          true,
        ],
        [
          "weak",
          "Education does not affect pay, so Worker A is just as well off.",
          "On average, training raises earnings. Use the figures to compare.",
        ],
        [
          "weak",
          "Worker B should do it because $60,000 is a bigger number. No calculation is needed.",
          "Work out the extra earnings and the cost before deciding.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Income tax, and the cost of different paths after high school",
  note: `
## Objectives

Students will be able to:

1. describe how federal and state income tax works and complete a simple tax form;
2. compare the costs and benefits of college, trade school and work after graduation.

## Materials

A simplified tax form (invented numbers), an illustrative bracket table, cost comparison cards, calculators, the worksheet.

## Starter (6 minutes)

Ask: "Why does your employer take tax out of each paycheck instead of letting you pay at the end of the year?" Discuss pay as you go.

## Main activity

1. How income tax works: you report your income for a year, subtract a standard deduction, and apply tax rates to taxable income. Withholding during the year is compared with the tax owed; if too much was withheld, you get a refund; if too little, you owe more. Many states, including Ohio, also tax income.
2. Marginal tax rates (illustrative): 10 percent on the first $11,000 of taxable income and 12 percent on the portion above that. Example: taxable income $15,000: 10 percent of 11,000 = $1,100; 12 percent of 4,000 = $480; total $1,580.
3. Simple return: wages $9,000, standard deduction assumed to be $13,000, so taxable income is $0 and the tax is $0; $450 was withheld, so the refund is $450.
4. Paths after school: a four-year college (illustrative total cost $80,000, higher earnings later), a two-year trade program ($20,000, earning sooner), working right away (no tuition cost, but possibly lower earnings over a career).

## Worksheet

Fill in a simple tax form and compare paths.
`,
  reading: [
    "How tax works, and what each path really costs",
    `
Income tax is the way in which governments collect money from people's earnings to pay for roads, schools, defense and many services. The **federal government** and many states, including Ohio, tax income. During the year, your employer **withholds** part of each paycheck and sends it to the government on your behalf. After the year ends, you file a **tax return** to work out what you actually owe.

The process has a few steps. First, add up your **income** for the year. Second, subtract the **standard deduction**, a set amount that nobody pays tax on. What is left is your **taxable income**. Third, apply the **tax rates** to your taxable income. Finally, compare the tax you owe with the amount that was already withheld. If more was withheld than you owe, the difference is a **refund**; if less, you pay the difference.

Tax rates are **marginal**: higher rates apply only to the portion of income above a threshold, not to all of it. Imagine (for practice) a rate of 10 percent on the first $11,000 of taxable income and 12 percent on anything above. If your taxable income is $15,000, you pay 10 percent of $11,000, which is $1,100, plus 12 percent of the remaining $4,000, which is $480, for a total of $1,580. Earning a raise that pushes you into a higher bracket never reduces your take-home pay, since only the extra dollars are taxed at the higher rate.

A simple return: a student earned $9,000 in wages and, for this exercise, the standard deduction is $13,000. Taxable income is the larger of zero and 9,000 - 13,000, which is $0, so the tax owed is $0. If $450 was withheld during the year, the whole $450 comes back as a refund. This is why even teenagers with part-time jobs should file: otherwise they lose money that was withheld.

Taxes are one part of planning your life after high school. There are three broad paths, each with costs and benefits. A **four-year college** may cost $80,000 or more in tuition and fees (for the illustration), but graduates in many fields earn more over a lifetime. A **trade school or two-year program** may cost about $20,000, takes less time, and leads to jobs such as electrician or dental hygienist that pay well. **Working right away** costs no tuition and starts earning immediately, but may lead to lower earnings later without added skills. Whichever path you choose, compare the total cost, the time before you earn full pay, the likely income, and how much you may borrow. The best path is the one that fits your goals and keeps debt manageable.
`,
  ],
  cards: [
    ["Taxable income", "Income left after the standard deduction."],
    ["Standard deduction", "A set amount of income that is not taxed."],
    ["Withholding", "Tax taken from pay during the year."],
    ["Refund", "Money returned when too much tax was withheld."],
    ["Marginal rate", "A tax rate applied only to income above a threshold."],
    ["Tax return", "A yearly form that reports income and tax owed."],
    ["Tuition", "The price charged for classes."],
    ["Trade school", "A school that trains for a skilled occupation."],
  ],
  closed: [
    [
      "Wages are $9,000, the standard deduction is $13,000. What is the taxable income?",
      ["$0", "$4,000", "$9,000", "$22,000"],
      "A",
    ],
    [
      "$450 was withheld and the tax owed is $0. What is the refund?",
      ["$0", "$450", "$900", "$13,000"],
      "B",
    ],
    [
      "With 10 percent on the first $11,000 and 12 percent above, what is the tax on $15,000 of taxable income?",
      ["$1,500", "$1,580", "$1,800", "$1,100"],
      "B",
    ],
    [
      "A marginal tax rate means a higher rate applies to:",
      ["All of your income", "Only the income above the threshold", "Only your first dollar", "Your deductions"],
      "B",
    ],
    [
      "Why should a student with a part-time job file a tax return even if no tax is owed?",
      ["To get back the tax that was withheld", "To lose money", "Because it is fun", "To avoid working"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "For practice, use a 10 percent rate on the first $11,000 of taxable income and 12 percent above that. A worker has taxable income of $20,000 and had $2,000 withheld during the year. Calculate the tax owed and decide whether the worker gets a refund or owes more, and how much. Then explain why a raise cannot lower take-home pay under marginal rates.",
      scheme: [
        "Calculates the tax on the first $11,000 as $1,100",
        "Calculates the tax on the remaining $9,000 as $1,080, for a total of $2,180",
        "Concludes that the worker owes $180 more because $2,000 was withheld",
        "Explains that only the extra dollars are taxed at the higher rate, so take-home pay still rises",
      ],
      model:
        "The first $11,000 is taxed at 10 percent, which is $1,100. The remaining $9,000 is taxed at 12 percent, which is $1,080. Total tax is $2,180. Since $2,000 was withheld, the worker owes $180 more. A raise cannot lower take-home pay because only the extra dollars are taxed at the higher rate, and the earlier dollars keep their lower rate.",
      answers: [
        [
          "full",
          "[[0|10 percent of $11,000 is $1,100.]] [[1|The other $9,000 at 12 percent is $1,080, so the tax is $2,180.]] [[2|Only $2,000 was withheld, so the worker owes $180 more.]] [[3|A raise can't lower take-home pay because only the extra dollars get the higher rate; the first dollars stay at 10 percent.]]",
          "Full marks. The two-step marginal calculation is exactly right.",
        ],
        [
          "full",
          "[[0|The first slice is $1,100.]] [[1|The second slice is 12 percent of $9,000, or $1,080, so the total is $2,180.]] [[2|Compared with the $2,000 withheld, there is a $180 balance due.]] [[3|Marginal rates tax only the dollars above the threshold, so earning more always leaves more in your pocket.]]",
          "Full marks. Your explanation of marginal rates is accurate.",
        ],
        [
          "partial",
          "[[0|The first $11,000 is taxed $1,100.]] [[3|A raise only taxes the extra dollars.]] All $20,000 is taxed at 12 percent, which is $2,400, so the worker owes $400.",
          "Only the part above $11,000 is taxed at 12 percent. Apply 10 percent to the first slice.",
        ],
        [
          "partial",
          "[[1|The second slice is $1,080.]] [[2|The worker owes more.]] A raise would push all the income into a higher rate and lower take-home pay.",
          "Marginal rates apply the higher rate only to the extra income. A raise never lowers take-home pay.",
          true,
        ],
        [
          "weak",
          "The tax is $20,000 because that is the income. Nothing is withheld.",
          "Apply the rates to taxable income, then compare with the amount withheld.",
        ],
        [
          "weak",
          "[[2|The worker gets a refund of $2,000.]] A refund is always the amount withheld.",
          "A refund is only the amount withheld beyond the tax owed. Here, the tax is higher than the withholding.",
        ],
      ],
    },
    {
      prompt:
        "A graduate is choosing between a four-year college (illustrative cost $80,000, graduates earning $60,000 a year), a trade program (cost $20,000, earning $50,000 a year starting two years sooner) and working at once (no cost, earning $38,000 a year). Calculate the total earnings over the first 10 years after high school for the trade path versus working at once, after subtracting program cost, and say what else the graduate should consider before choosing.",
      scheme: [
        "Calculates work-at-once earnings as $380,000 over 10 years",
        "Calculates the trade path as 8 years at $50,000 = $400,000 minus $20,000 = $380,000 (the two years of study have no earnings in this simple comparison)",
        "Concludes that the two paths are equal after 10 years under these assumptions, with the trade path ahead afterwards",
        "Names another consideration, such as job satisfaction, borrowing, career growth or job demand",
      ],
      model:
        "Working at once earns 10 times $38,000, which is $380,000. The trade path has two years of study with no earnings, then 8 years at $50,000, which is $400,000, minus $20,000 for the program, giving $380,000. The two paths are equal after 10 years, but the trade worker earns $12,000 more per year afterwards. The graduate should also consider job satisfaction, how much would be borrowed and how strong the demand for the trade is.",
      answers: [
        [
          "full",
          "[[0|Working right away is 10 × $38,000 = $380,000.]] [[1|The trade path is 8 working years × $50,000 = $400,000, minus the $20,000 program, which is $380,000.]] [[2|So after 10 years they are equal, but the trade worker then earns $12,000 more each year.]] [[3|The graduate should also think about whether they'd enjoy the work, how much they'd borrow, and the demand for the trade.]]",
          "Full marks. The comparison shows when each path pulls ahead.",
        ],
        [
          "full",
          "[[0|Working at once brings in $380,000 over ten years.]] [[1|The trade path brings in $400,000 over eight working years and the program cost of $20,000 takes it to $380,000.]] [[2|That is a tie at year 10, and after that the trade path leads by $12,000 each year.]] [[3|Other things to weigh are job satisfaction, any loans, and whether employers will keep hiring in that trade.]]",
          "Full marks. Spotting the tie is the key insight.",
        ],
        [
          "partial",
          "[[0|Working is $380,000.]] [[3|The graduate should consider whether they like the work.]] The trade path earns 10 × $50,000 = $500,000, so it is far ahead.",
          "The trade path has two years of study without earnings in this comparison, and the program costs $20,000.",
        ],
        [
          "partial",
          "[[1|Trade is $400,000 - $20,000 = $380,000.]] [[2|They are equal at 10 years.]] Working right away gives $38,000 in total.",
          "Working earns $38,000 a year for 10 years, which is $380,000.",
          true,
        ],
        [
          "weak",
          "College is always best because it costs the most. Nobody should work right away.",
          "Cost does not decide the best path. Compare earnings, time and debt.",
        ],
        [
          "weak",
          "The graduate should pick whatever their friend picks. No comparison is needed.",
          "A good choice rests on costs, earnings and personal goals, not on copying a friend.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Budgeting and comparing prices",
  note: `
## Objectives

Students will be able to:

1. create a monthly budget that separates needs from wants;
2. compare prices and unit costs to make a purchasing decision.

## Materials

A budget template, price tags or flyers (invented) for three sizes of the same product, calculators, the worksheet.

## Starter (6 minutes)

Ask students to write down three things they bought last week and mark each "need" or "want". Compare across the class and see where opinions differ.

## Main activity

1. Budget: a plan for how to use income. Steps: find monthly take-home pay, list needs (housing, food, transport, phone, insurance), list wants (eating out, streaming, hobbies), set savings first, and check that spending does not exceed income.
2. Example: take-home $2,000. Needs: rent $800, food $250, transport $200, phone $50 = $1,300. Wants $300. Savings $400 (20 percent). Total $2,000. The budget balances.
3. Fixed expenses (rent) and variable expenses (food). Tracking real spending against the plan and adjusting.
4. Unit price: price divided by quantity. A 12-oz bottle at $2.40 costs 20 cents per ounce; a 32-oz bottle at $5.76 costs 18 cents; a 64-oz at $12.16 costs 19 cents. The 32-oz bottle is the best value, and the largest size is not always cheapest. Other factors: quality, storage, whether you will use it before it spoils.

## Worksheet

Build a balanced budget and compare unit prices.
`,
  reading: [
    "Telling your money where to go",
    `
A **budget** is a plan for your money. Without one, many people reach the end of the month wondering where their pay went. A budget has four steps. First, find your monthly **income** after taxes: your take-home pay. Second, list your **needs**: things you must pay to live and work, such as housing, groceries, transportation, a phone and insurance. Third, list your **wants**: things that you would like but could do without, such as eating out, streaming services, new clothes beyond the basics and hobbies. Fourth, decide how much to **save**. A useful habit is to treat saving like a bill and pay yourself first, perhaps 10 to 20 percent of income. Finally, check that your planned spending plus saving does not exceed your income.

Here is an example. A worker has take-home pay of $2,000 a month. Needs: rent $800, food $250, transportation $200 and phone $50, a total of $1,300. Wants: $300 for entertainment, eating out and clothes. Savings: $400, which is 20 percent of income. The total is 1,300 + 300 + 400 = $2,000, which equals the income, so the budget **balances**. If the total were more than $2,000, the person would be spending more than they earn and would have to cut wants first, since needs are harder to reduce. Some expenses are **fixed**, such as rent, and stay the same each month. Others are **variable**, such as food and entertainment, and give you room to adjust. A budget is a plan, so compare it with what you actually spend, and adjust the plan when real life differs.

Smart shopping stretches a budget. One tool is the **unit price**, the price per unit of measure, found by dividing price by quantity. Suppose a drink comes in three sizes. A 12-ounce bottle costs $2.40, which is 2.40 / 12 = $0.20, or 20 cents per ounce. A 32-ounce bottle costs $5.76, which is 18 cents per ounce. A 64-ounce bottle costs $12.16, which is 19 cents per ounce. The middle size is the best value even though the largest bottle is the biggest, which shows that larger packages are not always cheaper. A bargain also depends on whether you will use the product: a huge pack of fresh produce that spoils is no bargain. Compare quality, brand and where you buy it, and consider waiting for sales for things you do not need today. Small savings on regular purchases add up to large sums over a year.
`,
  ],
  cards: [
    ["Budget", "A plan for how income will be spent and saved."],
    ["Need", "Something required to live and work."],
    ["Want", "Something you would like but could do without."],
    ["Pay yourself first", "Setting aside savings before spending on wants."],
    ["Fixed expense", "A cost that stays the same each month, such as rent."],
    ["Variable expense", "A cost that changes from month to month."],
    ["Unit price", "Price divided by quantity, such as cents per ounce."],
    ["Balanced budget", "Planned spending and saving equal income."],
  ],
  closed: [
    [
      "A 12-ounce bottle costs $2.40. What is the unit price per ounce?",
      ["10 cents", "20 cents", "24 cents", "30 cents"],
      "B",
    ],
    [
      "Which size is the best value: 12 oz at 20 cents/oz, 32 oz at 18 cents/oz, or 64 oz at 19 cents/oz?",
      ["12 oz", "32 oz", "64 oz", "They are equal"],
      "B",
    ],
    [
      "Which expense is fixed?",
      ["Rent", "Eating out", "Movie tickets", "Groceries"],
      "A",
    ],
    [
      "Needs are $1,300, wants $300 and savings $400. What total income balances the budget?",
      ["$1,300", "$1,700", "$2,000", "$2,400"],
      "C",
    ],
    [
      "If spending exceeds income, which category should usually be cut first?",
      ["Wants", "Housing", "Groceries", "Insurance"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A worker's take-home pay is $2,400 a month. Rent is $950, groceries $300, transportation $220 and phone $60. Wants are $350. The worker wants to save 15 percent of income. Calculate the total of needs, the savings amount, and whether the budget balances. If not, say how much is over or under and suggest one change.",
      scheme: [
        "Calculates needs as $1,530",
        "Calculates savings as $360",
        "Totals spending and saving as $2,240 and concludes there is $160 unplanned",
        "Suggests a sensible use of the $160 surplus or a change, such as more savings or a debt payment",
      ],
      model:
        "Needs are 950 + 300 + 220 + 60 = $1,530. Savings are 15 percent of $2,400, which is $360. Needs plus wants plus savings is 1,530 + 350 + 360 = $2,240, which is $160 less than the income, so the budget has $160 unassigned. The worker could put it toward savings or an emergency fund.",
      answers: [
        [
          "full",
          "[[0|Needs: 950 + 300 + 220 + 60 = $1,530.]] [[1|Savings: 15 percent of $2,400 = $360.]] [[2|Needs + wants + savings = 1,530 + 350 + 360 = $2,240, so $160 of the income is not assigned.]] [[3|I'd put the $160 into the emergency fund or a savings goal.]]",
          "Full marks. A balanced result and a sensible use of the surplus.",
        ],
        [
          "full",
          "[[0|The needs come to $1,530.]] [[1|15 percent of $2,400 is $360 for savings.]] [[2|Altogether $2,240 is planned, which leaves $160 unplanned.]] [[3|Since it's left over, I'd raise the savings to 22 percent or use it to pay down a debt.]]",
          "Full marks. Each category was added correctly.",
        ],
        [
          "partial",
          "[[0|Needs total $1,530.]] [[3|The extra can be saved.]] Savings are 15 percent of 350, which is $52.50, and the budget is $160 over.",
          "Savings are 15 percent of income, which is $2,400. Recalculate the savings and the balance.",
        ],
        [
          "partial",
          "[[1|Savings are $360.]] [[2|There is $160 left unassigned.]] Needs are 950 + 300, which is $1,250.",
          "Needs include all four items: rent, groceries, transportation and phone.",
          true,
        ],
        [
          "weak",
          "A budget does not need numbers. I would spend what I need and see what is left.",
          "A budget plans the numbers in advance. Calculate each category.",
        ],
        [
          "weak",
          "[[1|Savings are $360.]] Wants should be paid before needs because wants are more fun.",
          "Needs come first. Wants are what you cut when money is tight.",
        ],
      ],
    },
    {
      prompt:
        "A shopper compares three packs of the same granola bars: 6 bars for $3.90, 12 bars for $7.20 and 24 bars for $15.60. Calculate the unit price per bar for each, say which is best value, and explain one reason why the best-value pack might still not be the right choice.",
      scheme: [
        "Calculates 65 cents per bar for the 6-pack",
        "Calculates 60 cents for the 12-pack and 65 cents for the 24-pack",
        "Identifies the 12-pack as the best value",
        "Gives a valid reason it may not suit, such as spoilage, storage, a small budget or not needing that many",
      ],
      model:
        "The 6-pack costs 3.90 divided by 6, which is 65 cents per bar. The 12-pack costs 7.20 divided by 12, which is 60 cents. The 24-pack costs 15.60 divided by 24, which is 65 cents. The 12-pack is the best value. It might still not be right if the shopper cannot eat 12 bars before they go stale, or cannot spend $7.20 at once.",
      answers: [
        [
          "full",
          "[[0|6 bars for $3.90 is 65 cents a bar.]] [[1|12 bars for $7.20 is 60 cents, and 24 bars for $15.60 is 65 cents.]] [[2|The 12-pack is the best value.]] [[3|It still might not be right if the shopper can't eat 12 before they go stale, or can't afford $7.20 at once.]]",
          "Full marks. The biggest pack is not the cheapest per bar.",
        ],
        [
          "full",
          "[[0|The small pack costs $3.90 ÷ 6 = $0.65 per bar.]] [[1|The middle pack is $0.60 per bar and the largest pack is $0.65 per bar.]] [[2|So the 12-pack is best.]] [[3|If the shopper only eats one a day, a pack of 12 might still be wasted and storing it costs room.]]",
          "Full marks. Considering how quickly the food is used is sensible.",
        ],
        [
          "partial",
          "[[0|The 6-pack is 65 cents.]] [[3|A bigger pack could go stale.]] The 24-pack is cheapest because it is the biggest.",
          "Divide $15.60 by 24 to get 65 cents. It is not cheaper than the 12-pack.",
        ],
        [
          "partial",
          "[[1|The 12-pack is 60 cents.]] [[2|It is the best value.]] The unit price is the total price, so $7.20 is the unit price.",
          "Unit price is the price divided by the quantity, not the total.",
          true,
        ],
        [
          "weak",
          "The cheapest pack is the one with the lowest total price, so the 6-pack is best.",
          "Compare cost per bar, not the total price.",
        ],
        [
          "weak",
          "Bigger is always better value, so the 24-pack wins. No calculation is needed.",
          "Larger packs are not always cheaper per unit. Divide to check.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Influences on spending, and a first-year plan",
  note: `
## Objectives

Students will be able to:

1. explain how advertising and peers influence spending;
2. create a personal financial plan for the first year after high school.

## Materials

Sample ads (invented), an impulse-purchase reflection sheet, a first-year plan template, calculators, the quiz.

## Starter (6 minutes)

Ask: "Think of something you wanted because you saw it online or a friend had it. Did you still want it a week later?" Collect honest responses.

## Main activity

1. Advertising: tactics include limited-time offers, celebrity endorsements, "free shipping" thresholds, subscriptions that renew automatically, and targeted ads based on your data. Peer pressure: buying to fit in, comparing with friends and social media.
2. Strategies: wait 48 hours before non-essential purchases, make a list before shopping, set a "fun money" limit, unsubscribe from sales emails, ask "do I need it?" and "what am I giving up?"
3. First-year plan: set goals (for example, saving $3,000 for a car in 12 months, which is $250 a month), estimate income and expenses, include an emergency fund contribution, and review every month.
4. Example plan: take-home $2,100; fixed costs $1,350; variable costs $500; savings $250; total $2,100.

## Quiz

Influences and the first-year plan.
`,
  reading: [
    "Why we buy, and planning your first year",
    `
Spending is not only about what you need. Advertisers and friends shape what we want, often without us noticing. **Advertising** uses many tactics to create a feeling that you must buy now. A **limited-time offer** ("Only today!") creates urgency, so you do not think. An **endorsement** by a celebrity or influencer suggests that using the product makes you more like them. A "**free shipping** on orders over $50" message can push someone to spend $50 to save a $5 fee. A **free trial** that renews automatically can turn into a monthly charge you forget about. Online ads are also **targeted**: companies use your browsing and location data to show items you are likely to buy.

Peers also matter. People often buy to fit in, to match what friends have, or to show status. Social media increases this pressure because we see only the best of what other people own and do. Wanting to belong is normal, but spending to impress people can lead to money problems, and the item is often forgotten quickly. Notice your feelings: a purchase made when you are bored, stressed or excited is an **impulse purchase**, and it often disappoints.

There are simple defenses. **Wait 48 hours** before buying any non-essential item; many wants fade. **Make a list** before shopping and stick to it. Set a monthly **fun money** amount that you can spend with no guilt, so that you are not tempted to overspend. Unsubscribe from sales emails. And ask two questions: "Do I really need this?" and "What am I giving up to buy it?" Every dollar you spend now is a dollar that you cannot save for something else.

These habits fit into a **personal financial plan**, which is a written plan for your money over a period, such as the first year after high school. Start with **goals**: for example, save $3,000 for a used car in 12 months, which is $3,000 / 12 = $250 a month. Estimate your **income** after taxes, say $2,100 a month. List your **fixed costs**, such as rent, phone and insurance, perhaps $1,350, and your **variable costs**, such as food, gas and fun, perhaps $500. Add the $250 for savings. Total: 1,350 + 500 + 250 = $2,100, which equals the income, so the plan works. Include a small amount for an emergency fund, and review the plan each month to see if real spending matches. Plans change as jobs, rents and goals change, but having one lets you make choices instead of drifting.
`,
  ],
  cards: [
    ["Impulse purchase", "An unplanned buy made on a sudden urge."],
    ["Limited-time offer", "An ad tactic that creates urgency to buy now."],
    ["Endorsement", "A famous person's support for a product."],
    ["Targeted ad", "An ad chosen using your personal data."],
    ["Peer pressure", "Influence from friends to act or buy a certain way."],
    ["Fun money", "A set amount to spend on wants without guilt."],
    ["Financial goal", "A specific money target with a deadline."],
    ["Financial plan", "A written plan for income, spending and saving."],
  ],
  closed: [
    [
      "Which tactic creates urgency to make you buy right away?",
      ["A limited-time offer", "A warranty", "A receipt", "A budget"],
      "A",
    ],
    [
      "How much must be saved each month to reach $3,000 in 12 months?",
      ["$150", "$250", "$300", "$360"],
      "B",
    ],
    [
      "Which habit best reduces impulse purchases?",
      ["Waiting 48 hours before non-essential items", "Shopping when bored", "Buying on the first ad", "Ignoring prices"],
      "A",
    ],
    [
      "Income is $2,100. Fixed costs are $1,350, variable costs $500 and savings $250. Does the plan balance?",
      ["Yes, it totals $2,100", "No, it is $100 short", "No, it is $250 over", "It cannot be known"],
      "A",
    ],
    [
      "A free trial that renews automatically may cause:",
      ["A forgotten monthly charge", "A refund", "Lower prices", "A tax cut"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A student sees an online ad: \"Sneakers, 40 percent off today only, free shipping over $75!\" The sneakers cost $60 after the discount. Identify two advertising tactics in the ad, explain how a friend wearing the same shoes could add pressure, and describe two steps the student could take to decide wisely.",
      scheme: [
        "Identifies the limited-time urgency as one tactic",
        "Identifies the free-shipping threshold as a second tactic (it encourages spending more)",
        "Explains how peers influence buying, such as wanting to fit in",
        "Describes two sensible steps, such as waiting 48 hours and checking the budget or the real need",
      ],
      model:
        "The ad uses a limited-time offer, today only, to make the student hurry, and a free-shipping threshold of $75, which may push the student to add items to reach it. A friend wearing the same shoes can add pressure to fit in. The student could wait 48 hours and see if the want remains, and check the budget to see whether $60 fits in the fun money.",
      answers: [
        [
          "full",
          "[[0|The 'today only' offer creates urgency, so you hurry without thinking.]] [[1|Free shipping over $75 might push me to add items just to reach the limit.]] [[2|If a friend has the same shoes, I'd feel pressure to fit in.]] [[3|I'd wait 48 hours to see if I still want them and check that $60 fits into my fun money.]]",
          "Full marks. You named both tactics and sensible defenses.",
        ],
        [
          "full",
          "[[0|The first tactic is the limited time: 'today only.']] [[1|The second is the free shipping threshold, which gets people to spend more than they planned.]] [[2|Peers matter because wanting to belong makes the shoes feel like a need.]] [[3|I'd sleep on it, then look at my budget and ask whether I need new shoes at all.]]",
          "Full marks. Asking whether you need them is the key question.",
        ],
        [
          "partial",
          "[[0|The ad is for today only.]] [[3|I'd wait two days before buying.]] Peers do not affect what I buy, and shipping is always free.",
          "Free shipping can have conditions, and friends can strongly affect choices. Revise these.",
        ],
        [
          "partial",
          "[[1|The free shipping threshold makes you spend more.]] [[2|Friends can pressure you.]] I should buy now before the deal ends.",
          "Buying immediately is the reaction the ad wants. Describe how to pause and decide.",
          true,
        ],
        [
          "weak",
          "Ads are just information and have no effect on what people buy.",
          "Ads are designed to influence buying. Identify the tactics in this one.",
        ],
        [
          "weak",
          "The student should buy two pairs so that the free shipping applies, because that saves money.",
          "Spending more to avoid a small fee usually costs more overall.",
        ],
      ],
    },
    {
      prompt:
        "Write a first-year plan for a graduate who will have take-home pay of $2,300 a month. The goal is to save $4,200 in 12 months for a car down payment. List the monthly savings, at least four fixed and variable expenses with amounts, a total, and one habit that will help keep the plan on track.",
      scheme: [
        "Calculates monthly savings as $350",
        "Lists at least four fixed and variable expenses with amounts",
        "Shows a total that matches $2,300 (the plan balances)",
        "Names a habit such as reviewing monthly, waiting 48 hours, or tracking spending",
      ],
      model:
        "Savings are $4,200 divided by 12, which is $350 a month. Expenses: rent $900 (fixed), phone and insurance $210 (fixed), food $380 (variable), gas $220 (variable), fun $240 (variable). The total is 350 + 900 + 210 + 380 + 220 + 240 = $2,300, which balances. To stay on track, I will review my spending each month and wait 48 hours before non-essential purchases.",
      answers: [
        [
          "full",
          "[[0|Savings: $4,200 ÷ 12 = $350 a month.]] [[1|Fixed: rent $900, phone and insurance $210. Variable: food $380, gas $220, fun $240.]] [[2|Total: 350 + 900 + 210 + 380 + 220 + 240 = $2,300, so it balances.]] [[3|I'll review my spending every month and wait 48 hours before any non-essential buy.]]",
          "Full marks. The plan adds up exactly to the income.",
        ],
        [
          "full",
          "[[0|I need to save $350 each month for the down payment.]] [[1|Rent $950 and insurance $150 are fixed; groceries $350, gas $200 and entertainment $150 are variable.]] [[2|With $350 savings, the total is 950 + 150 + 350 + 200 + 150 + 350 = $2,150, so $150 is left, which I'll add to my emergency fund to reach $2,300.]] [[3|I'll track my spending in an app each week.]]",
          "Full marks. Assigning the leftover $150 keeps the plan balanced.",
        ],
        [
          "partial",
          "[[0|I'd save $350 each month.]] [[3|I'll review my spending monthly.]] My expenses are rent and fun and the total is more than my pay.",
          "List at least four expenses and make the total match the income of $2,300.",
        ],
        [
          "partial",
          "[[1|Rent $900, food $380, gas $220 and phone $210.]] [[2|That balances.]] Savings are $4,200 a month.",
          "Divide $4,200 by 12 months to find the monthly savings.",
          true,
        ],
        [
          "weak",
          "I do not need a plan. I will save whatever is left at the end of each month.",
          "Saving what is left usually means saving nothing. Plan savings first.",
        ],
        [
          "weak",
          "[[2|The plan balances.]] I will spend everything and borrow for the car down payment.",
          "The goal is to save the down payment, not to borrow it.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Saving, emergency funds, accounts and interest",
  note: `
## Objectives

Students will be able to:

1. explain why an emergency fund matters and set a savings goal;
2. compare savings accounts, checking accounts and certificates of deposit;
3. calculate simple and compound interest and compare the results.

## Materials

Account comparison cards (invented banks), a savings goal template, calculators, the problem set.

## Starter (6 minutes)

Ask: "Your phone breaks and you need a $300 repair. What do you do?" Discuss using savings, borrowing, or going without.

## Main activity

1. Emergency fund: money set aside for surprises such as a repair, a job loss or a medical bill. Goal: 3 to 6 months of essential expenses. If monthly expenses are $1,800, then 3 months is $5,400 and 6 months is $10,800. Start small.
2. Savings goals: specific, measurable, with a deadline. Save $1,200 in 8 months: $150 a month.
3. Accounts: checking (everyday spending, little or no interest, debit card), savings (earns interest, easy access, limited withdrawals), certificate of deposit (CD: money locked for a fixed term at a fixed rate, penalty for early withdrawal). Check for fees, minimum balances and whether the bank is insured by the FDIC (up to $250,000 per depositor).
4. Interest: simple interest = principal x rate x time. $1,000 at 5 percent for 3 years = $150. Compound interest: interest is earned on interest. $1,000 at 5 percent compounded yearly for 3 years = 1,000 x 1.05^3 = $1,157.63; interest $157.63, which is $7.63 more than simple.

## Problem set

Calculate and compare.
`,
  reading: [
    "A cushion for surprises, and money that grows",
    `
Life is full of surprises: a car repair, a lost job, a medical bill. People without savings often turn to credit cards or loans, which cost more. An **emergency fund** is money set aside only for these events. Experts suggest saving **three to six months** of essential expenses. If your necessary monthly costs are $1,800, three months is 3 x 1,800 = $5,400 and six months is $10,800. That is a big sum, so start with a smaller target, such as $500, and build up. Keep the emergency fund separate from your spending money so that you are not tempted to use it.

Saving works best with a clear **savings goal**: specific, measurable and with a deadline. "Save $1,200 for a laptop in 8 months" is a goal, and it breaks down to 1,200 / 8 = $150 a month. Automatic transfers on payday make saving a habit.

Where you keep your money matters. A **checking account** is for everyday spending and bill paying; it usually comes with a debit card and checks, but pays little or no interest. A **savings account** is meant for money you are not spending soon; it pays **interest** and is easy to reach, although banks may limit withdrawals each month. A **certificate of deposit (CD)** holds your money for a fixed term, such as one year, at a fixed interest rate that is usually higher, but you pay a **penalty** if you take the money out early. When you choose an account, check for monthly **fees**, **minimum balance** requirements and the interest rate, and make sure that the bank is insured by the **FDIC**, which protects deposits up to $250,000 per depositor, per bank, if the bank fails.

Interest is the price of using money. **Simple interest** is calculated only on the original amount, the **principal**: interest = principal x rate x time. On $1,000 at 5 percent for 3 years, interest is 1,000 x 0.05 x 3 = $150. **Compound interest** is calculated on the principal plus the interest already earned, so interest earns interest. At 5 percent compounded yearly: after year 1, $1,050; after year 2, $1,102.50; after year 3, $1,157.63 (rounded). The interest is $157.63, which is $7.63 more than simple interest. The gap looks small here, but it grows quickly with larger amounts, higher rates and longer times, which is why compounding is so powerful for savers, and so costly for borrowers.
`,
  ],
  cards: [
    ["Emergency fund", "Money set aside only for unexpected costs."],
    ["Savings goal", "A specific amount to save by a deadline."],
    ["Certificate of deposit", "A deposit locked for a fixed term at a fixed rate."],
    ["Principal", "The original amount saved or borrowed."],
    ["Simple interest", "Interest calculated only on the principal."],
    ["Compound interest", "Interest calculated on the principal plus earned interest."],
    ["FDIC", "A federal agency that insures bank deposits."],
    ["Early withdrawal penalty", "A fee for taking money from a CD before its term ends."],
  ],
  closed: [
    [
      "Monthly essential expenses are $1,800. How much is a three-month emergency fund?",
      ["$1,800", "$3,600", "$5,400", "$10,800"],
      "C",
    ],
    [
      "What is the simple interest on $1,000 at 5 percent for 3 years?",
      ["$50", "$150", "$157.63", "$1,150"],
      "B",
    ],
    [
      "Which account holds money for a fixed term and charges a penalty for early withdrawal?",
      ["Checking account", "Savings account", "Certificate of deposit", "Debit card"],
      "C",
    ],
    [
      "What does the FDIC do?",
      ["Insures bank deposits up to $250,000", "Sets tax rates", "Gives out loans", "Prints money"],
      "A",
    ],
    [
      "Compound interest differs from simple interest because:",
      ["It is earned on the principal plus earned interest", "It is always lower", "It is paid only on loans", "It has no time period"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A student deposits $2,000 in an account paying 4 percent a year for 2 years. Calculate the interest with simple interest and the balance with interest compounded yearly. Show the difference and explain why compounding gives more.",
      scheme: [
        "Calculates simple interest as $160",
        "Calculates the compounded balance as $2,163.20",
        "States the compound interest as $163.20, which is $3.20 more than simple",
        "Explains that compounding earns interest on previously earned interest",
      ],
      model:
        "Simple interest is 2,000 times 0.04 times 2, which is $160. With compounding, year 1 gives $2,080 and year 2 gives $2,080 times 1.04, which is $2,163.20, so the interest is $163.20. That is $3.20 more than simple interest. Compounding gives more because in year 2 the interest is earned on the $2,080, including the interest from year 1.",
      answers: [
        [
          "full",
          "[[0|Simple interest: 2,000 × 0.04 × 2 = $160.]] [[1|Compounded: year 1 is $2,080, year 2 is 2,080 × 1.04 = $2,163.20.]] [[2|So the compound interest is $163.20, which is $3.20 more.]] [[3|It's more because in year 2 I earn interest on the interest from year 1.]]",
          "Full marks. Both methods are shown step by step.",
        ],
        [
          "full",
          "[[0|With simple interest I'd earn $80 a year, which makes $160.]] [[1|With compounding, the balance after year 1 is $2,080 and after year 2 is $2,163.20.]] [[2|The difference is $163.20 - $160 = $3.20.]] [[3|Compounding pays interest on a growing balance, not on the original amount only.]]",
          "Full marks. 'Growing balance' describes compounding well.",
        ],
        [
          "partial",
          "[[0|Simple interest is $160.]] [[3|Compounding earns interest on interest.]] The compounded balance is 2,000 × 1.08 = $2,160, which is the same.",
          "Compound each year: 2,000 × 1.04 × 1.04 = $2,163.20, which is not the same as $2,160.",
        ],
        [
          "partial",
          "[[1|The balance is $2,163.20.]] [[2|It is $3.20 more.]] Simple interest is $80 for the whole time.",
          "$80 is one year of simple interest. Over 2 years it is $160.",
          true,
        ],
        [
          "weak",
          "Interest is 4 percent, so the answer is $4 whichever method I use.",
          "Apply the 4 percent to the $2,000 principal for each year.",
        ],
        [
          "weak",
          "Compound and simple interest give the same number because they are both interest.",
          "Compounding earns interest on earlier interest, so it gives more over time.",
        ],
      ],
    },
    {
      prompt:
        "A worker's essential expenses are $1,800 a month. The worker has $600 saved. Calculate a three-month emergency fund goal and how much more is needed. If the worker saves $150 a month, how many months will it take? Then recommend where to keep the emergency fund (checking, savings or CD) and explain why.",
      scheme: [
        "Calculates the three-month goal as $5,400",
        "Calculates the shortfall as $4,800 and the time as 32 months at $150 a month",
        "Recommends a savings account (or an equivalent accessible account) as a good fit",
        "Explains the reasoning, such as access without penalty, interest earned and deposit insurance",
      ],
      model:
        "A three-month fund is 3 times $1,800, which is $5,400. With $600 saved, $4,800 more is needed. At $150 a month it takes 4,800 divided by 150, which is 32 months. I would keep it in a savings account, since it earns interest, can be reached quickly in an emergency without a penalty, and is insured by the FDIC.",
      answers: [
        [
          "full",
          "[[0|Three months of expenses is 3 × $1,800 = $5,400.]] [[1|With $600 saved, $4,800 more is needed, and at $150 a month that is 4,800 ÷ 150 = 32 months.]] [[2|I'd keep it in a savings account.]] [[3|It earns interest, I can get it quickly with no penalty, and the FDIC insures it.]]",
          "Full marks. A realistic timeline and a well-reasoned account.",
        ],
        [
          "full",
          "[[0|The target is $5,400.]] [[1|The shortfall is $4,800, so it takes 32 months at $150 a month, which is almost three years.]] [[2|A savings account suits it better than a CD or checking.]] [[3|A CD would charge a penalty if I needed the money early, and checking pays almost nothing and tempts me to spend.]]",
          "Full marks. Rejecting the other two accounts shows good reasoning.",
        ],
        [
          "partial",
          "[[0|The goal is $5,400.]] [[2|A savings account.]] It takes 4,800 months because I save $1 a month. A CD is best since it pays more.",
          "At $150 a month it takes 32 months. And a CD has a penalty for early withdrawal, which does not suit emergencies.",
        ],
        [
          "partial",
          "[[1|It takes 32 months.]] [[3|A savings account earns interest.]] The goal is $1,800 because that is one month.",
          "Experts suggest three to six months of expenses, so the goal is $5,400.",
          true,
        ],
        [
          "weak",
          "An emergency fund is not needed. I can always borrow on a credit card.",
          "Borrowing costs interest. A fund covers surprises without debt.",
        ],
        [
          "weak",
          "I would keep all of it in cash under my mattress because that is the safest.",
          "Cash at home earns nothing and can be lost. A bank account is insured.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Investing: stocks, bonds, funds, risk and time",
  note: `
## Objectives

Students will be able to:

1. describe stocks, bonds and mutual funds and the relationship of risk and return;
2. explain the benefit of investing early using compound growth.

## Materials

A growth table (illustrative 7 percent), a risk-return spectrum chart, calculators, the worksheet.

## Starter (6 minutes)

Ask: "Would you rather have a guaranteed $100 or a coin flip for $250 or nothing?" Discuss risk and expected value.

## Main activity

1. Stocks: shares of ownership in a company; they can rise in value and may pay dividends; they can also fall. Bonds: loans to a company or government that pay interest and return the principal at maturity; usually lower risk and lower return than stocks. Mutual funds and index funds: pools of many investments, giving diversification; fees (expense ratios) matter.
2. Risk and return: higher potential return usually comes with higher risk of loss. Diversification means not putting all your money in one place. Time horizon: longer horizons can better ride out ups and downs.
3. Compounding for investors (illustrative 7 percent a year, not guaranteed): $1,000 grows to about $1,967 in 10 years, about $7,612 in 30 years, and about $14,974 in 40 years.
4. Rule of 72: years to double is about 72 divided by the rate: 72 / 7 is about 10 years.

## Worksheet

Match investments to risk and compare starting early with starting late.
`,
  reading: [
    "Putting money to work, and why starting early matters",
    `
Saving keeps your money safe. **Investing** puts it to work, in exchange for the possibility of larger gains, and for the risk of loss. The main types of investments differ in how they work.

A **stock** is a share of ownership in a company. If the company does well, the share price may rise and the company may pay **dividends**, a portion of profits. If it does poorly, the price can fall, and you could lose some or all of your money. A **bond** is a loan that you make to a company or government. The borrower pays you **interest** and returns your **principal** on a set date, the maturity. Bonds are usually less risky than stocks, and usually return less. A **mutual fund** pools money from many investors to buy a collection of stocks, bonds or both, managed by professionals. An **index fund** is a type of fund that simply follows a market index, and often has lower fees. A fund gives **diversification**: your money is spread over many companies, so a problem at one company does little harm. Fees matter, too; a fund with a 1 percent yearly fee takes a meaningful bite out of returns over decades.

The central rule of investing is the **relationship of risk and return**: investments with a higher chance of high returns usually also have a higher chance of losses. A savings account has low risk and low return. Bonds are in the middle. Stocks have higher risk and, over long periods, have historically earned more. No one can promise a return, and anybody who promises high returns with no risk is probably running a scam. Your **time horizon**, the time before you need the money, matters: money needed in a year should not be in stocks, while money for retirement 40 years away can ride out market ups and downs.

The most powerful tool you have as a young investor is **time**, thanks to compound growth. Suppose an investment earns an average of 7 percent a year (an assumption for practice; real returns vary and are not guaranteed). A single $1,000 invested grows to about $1,967 after 10 years, about $7,612 after 30 years and about $14,974 after 40 years. Someone who invests $1,000 at 18 and leaves it until 58 ends up with about $14,974, but someone who waits until 28 and invests the same $1,000 ends up with only about $7,612, around half, despite investing the same amount. The **Rule of 72** gives a quick estimate: divide 72 by the rate to find the years to double. At 7 percent it takes about 72 / 7, roughly 10 years. Start early, invest regularly, diversify, keep fees low and avoid panic when markets drop.
`,
  ],
  cards: [
    ["Stock", "A share of ownership in a company."],
    ["Bond", "A loan to a company or government that pays interest."],
    ["Mutual fund", "A pool of many investments managed together."],
    ["Diversification", "Spreading money across many investments to reduce risk."],
    ["Dividend", "A share of a company's profit paid to shareholders."],
    ["Time horizon", "How long before you need the money."],
    ["Risk and return", "Higher possible gains usually come with higher possible losses."],
    ["Rule of 72", "Divide 72 by the rate to estimate years to double."],
  ],
  closed: [
    [
      "Which investment is a loan to a company or government?",
      ["Stock", "Bond", "Dividend", "Index"],
      "B",
    ],
    [
      "What is the main benefit of a mutual fund?",
      ["It guarantees a profit", "It spreads money across many investments", "It has no fees", "It never falls in value"],
      "B",
    ],
    [
      "Using the Rule of 72, about how long does money take to double at 6 percent?",
      ["6 years", "12 years", "36 years", "72 years"],
      "B",
    ],
    [
      "Which statement about risk is accurate?",
      ["Higher possible returns usually come with higher risk", "Risk and return are unrelated", "Bonds can never lose value", "All investments are guaranteed"],
      "A",
    ],
    [
      "Why does starting to invest early help?",
      ["Money has more time to grow through compounding", "Early investors pay no fees", "Returns are guaranteed", "Stocks only rise early"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Explain the difference between a stock, a bond and a mutual fund. Then explain how the relationship of risk and return applies to them, and why someone saving for a goal in one year should not put the money in stocks.",
      scheme: [
        "Defines a stock as part ownership of a company",
        "Defines a bond as a loan that pays interest, and a mutual fund as a pool of many investments",
        "Explains that higher potential return comes with higher risk, with stocks riskier than bonds",
        "Explains that a short time horizon means prices might be down when the money is needed, so stocks are unsuitable",
      ],
      model:
        "A stock is part ownership of a company. A bond is a loan to a company or government that pays interest, and a mutual fund pools money from many investors into a collection of investments. Higher possible returns come with higher risk, and stocks are riskier than bonds. Money needed in a year should not be in stocks because the price might be down when it is needed, and there would be no time to recover.",
      answers: [
        [
          "full",
          "[[0|A stock is a share of ownership in a company.]] [[1|A bond is a loan that pays interest, and a mutual fund pools many investors' money into a collection of investments.]] [[2|Higher possible returns come with higher risk, so stocks are riskier than bonds.]] [[3|Money needed in a year shouldn't be in stocks, because prices could be down when I need it, with no time to recover.]]",
          "Full marks. The time horizon reasoning is exactly right.",
        ],
        [
          "full",
          "[[0|Owning a stock means owning a small piece of the company.]] [[1|Buying a bond means lending money for interest; a mutual fund holds lots of different investments in one package.]] [[2|The more return an investment might give, the more you might lose, which is why stocks are riskier than bonds.]] [[3|If I need the cash next year, a market drop could leave me short, so a savings account is safer.]]",
          "Full marks. Naming a safer alternative is a good addition.",
        ],
        [
          "partial",
          "[[0|A stock is ownership in a company.]] [[2|Stocks are riskier.]] A bond is when you borrow money from a company. Stocks are fine for one year because they always rise.",
          "With a bond you lend money. And stocks can fall, so they aren't safe for a one-year goal.",
        ],
        [
          "partial",
          "[[1|A mutual fund pools many investments.]] [[3|A one-year goal needs safety.]] A stock is a loan to a government.",
          "A stock is part ownership of a company. A bond is the loan.",
          true,
        ],
        [
          "weak",
          "All investments are the same, and they all earn the same return.",
          "Investments differ in how they work and in their risk and return.",
        ],
        [
          "weak",
          "Risk-free investments with huge returns are easy to find, so risk does not matter.",
          "High returns without risk are a warning sign of a scam.",
        ],
      ],
    },
    {
      prompt:
        "Two friends each invest a single $1,000. Maya invests at 18 and Ben at 28. Assume 7 percent a year, with both leaving the money until age 58. Using about $14,974 for 40 years and about $7,612 for 30 years, say how much each has at 58 and compare them. Explain the lesson about time, and give one caution about the assumption.",
      scheme: [
        "States Maya has about $14,974 and Ben about $7,612",
        "Compares them, noting that Maya has roughly twice as much from the same single deposit",
        "Explains that the extra 10 years of compounding made the difference, not the amount invested",
        "Cautions that 7 percent is an assumption and real returns vary and are not guaranteed",
      ],
      model:
        "Maya has about $14,974 at 58 and Ben has about $7,612. Maya has roughly twice as much from the same $1,000. The difference comes from 10 extra years of compounding, not from investing more money. The caution is that 7 percent is an assumption: real returns vary from year to year and are not guaranteed.",
      answers: [
        [
          "full",
          "[[0|Maya ends up with about $14,974, and Ben with about $7,612.]] [[1|So Maya has roughly twice as much from the same $1,000.]] [[2|The extra ten years of compounding made the difference, not extra money.]] [[3|But 7 percent is only an assumption; real returns vary and are never guaranteed.]]",
          "Full marks. The lesson and the caution are both clear.",
        ],
        [
          "full",
          "[[0|Maya: about $14,974. Ben: about $7,612.]] [[1|Maya has about twice as much even though both put in only $1,000.]] [[2|Time is the reason, since her money had ten more years to grow on itself.]] [[3|The 7 percent is a guess for practice, as markets go up and down.]]",
          "Full marks. 'Grow on itself' is a good way to describe compounding.",
        ],
        [
          "partial",
          "[[0|Maya has $14,974 and Ben has $7,612.]] [[3|Returns are not guaranteed.]] Maya invested more money, so she has more.",
          "They each invested the same $1,000. The difference is ten extra years of compounding.",
        ],
        [
          "partial",
          "[[1|Maya has about twice as much.]] [[2|Time made the difference.]] Both have $1,000 at 58 because nothing changes.",
          "Compound growth increases the balance. Use the figures given for each person.",
          true,
        ],
        [
          "weak",
          "It does not matter when you start investing, because both get the same money.",
          "Starting earlier gives more time for compounding, so the results differ.",
        ],
        [
          "weak",
          "Ben should have invested at 58 because that is when people retire.",
          "Investing later gives less time to grow. Starting early is the lesson.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Credit cards, loans and credit scores",
  note: `
## Objectives

Students will be able to:

1. describe how credit cards and loans work and calculate the cost of borrowing;
2. explain a credit score and what raises or lowers it.

## Materials

A sample credit card statement (invented), a loan cost table, calculators, the worksheet.

## Starter (6 minutes)

Ask: "If a friend lends you $20 and you pay back $25, what was the cost of borrowing?" Introduce interest as the price of borrowed money.

## Main activity

1. Credit means borrowing with a promise to repay. Credit card: a revolving line of credit with a limit; pay in full each month and there is no interest; carry a balance and interest is charged at the APR (annual percentage rate). A 24 percent APR is 2 percent a month. On a $600 balance, the first month's interest is $12. If only the minimum $25 is paid, $13 reduces the balance, and the debt falls very slowly.
2. Loans: an installment loan is repaid in fixed payments. Example: $2,000 borrowed at 10 percent simple interest for 2 years: interest $400, total $2,400, or $100 a month over 24 months. Compare the total cost, not just the payment.
3. Credit score (300 to 850): a number that predicts how likely you are to repay. Factors: payment history (the biggest), how much of your limit you use (credit utilization; keep below 30 percent), length of history, new accounts and types of credit. Paying late and maxing out cards lower it; paying on time and keeping balances low raise it. A $300 balance on a $1,000 limit is 30 percent utilization.
4. Why it matters: it affects interest rates, renting an apartment and sometimes jobs.

## Worksheet

Calculate interest and utilization.
`,
  reading: [
    "The cost of borrowed money, and the number that follows you",
    `
**Credit** means borrowing money, or buying now and paying later, with a promise to repay. It can be useful, for example for a car, a home or education, but it always costs something, called **interest**, the fee for using someone else's money.

A **credit card** gives you a **credit limit**, the highest balance you may carry. Each month you receive a statement. If you pay the whole balance by the due date, you pay no interest. If you carry a balance, the card company charges interest at the **annual percentage rate (APR)**, which can be very high. At a 24 percent APR, the monthly rate is 24 / 12 = 2 percent. On a $600 balance, interest for a month is 0.02 x 600 = $12. If you pay only a minimum of $25, $12 goes to interest and just $13 reduces the balance, so the debt falls slowly while interest keeps being added. Paying only the minimum can keep you in debt for years. The best habits are to pay in full every month and to use a card only for purchases you could pay for from your budget.

A **loan** gives you a lump sum that you repay in fixed payments over a period. The cost of borrowing is the total you repay minus the amount you borrowed. For practice, suppose you borrow $2,000 at 10 percent simple interest for 2 years: interest is 2,000 x 0.10 x 2 = $400. You repay $2,400 in total, which is $100 a month over 24 months. Always compare the **total cost**, not just the monthly payment: a longer loan has a lower payment but costs more in interest.

Lenders decide whether to lend to you, and at what rate, partly by your **credit score**, a number from 300 to 850 that predicts how likely you are to repay. Several factors go into it. **Payment history** is the most important: paying late hurts. **Credit utilization**, how much of your limit you are using, matters next: a $300 balance on a $1,000 limit is 30 percent utilization, and keeping it under 30 percent is recommended. Other factors are the **length** of your credit history, how often you **apply** for new credit, and the mix of accounts. A high score can lower your interest rate, which saves thousands of dollars on a loan. Landlords and some employers also look at credit reports. You can build a good score by paying every bill on time, keeping balances low and not opening more accounts than you need. Check your credit report for errors each year; you can get free reports from the official source.
`,
  ],
  cards: [
    ["Credit", "Borrowing with a promise to repay later."],
    ["APR", "The yearly cost of borrowing, expressed as a percentage."],
    ["Credit limit", "The highest balance a card allows."],
    ["Minimum payment", "The smallest payment you must make on a card each month."],
    ["Cost of borrowing", "The total repaid minus the amount borrowed."],
    ["Credit score", "A number from 300 to 850 predicting repayment."],
    ["Credit utilization", "The share of your limit that you are using."],
    ["Payment history", "Whether you pay on time; the biggest score factor."],
  ],
  closed: [
    [
      "A card has a 24 percent APR. What is the monthly interest rate?",
      ["1 percent", "2 percent", "12 percent", "24 percent"],
      "B",
    ],
    [
      "What is one month of interest on a $600 balance at 2 percent?",
      ["$2", "$12", "$24", "$120"],
      "B",
    ],
    [
      "A $300 balance on a $1,000 limit is what utilization?",
      ["3 percent", "30 percent", "300 percent", "70 percent"],
      "B",
    ],
    [
      "Which factor most affects a credit score?",
      ["Payment history", "Your age", "Your address", "Your income"],
      "A",
    ],
    [
      "You borrow $2,000 at 10 percent simple interest for 2 years. What is the total repaid?",
      ["$2,200", "$2,400", "$2,600", "$4,000"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A student has a $600 credit card balance at a 24 percent APR (2 percent a month) and pays the $25 minimum this month. Calculate the interest for the month, how much of the payment reduces the balance, and the new balance. Explain why paying only the minimum is costly and what you would do instead.",
      scheme: [
        "Calculates the month's interest as $12",
        "Calculates that $13 reduces the balance, so the new balance is $587",
        "Explains that most of the payment goes to interest so the debt shrinks slowly and total interest grows",
        "Suggests paying more than the minimum or paying in full, and not adding new charges",
      ],
      model:
        "Interest for the month is 2 percent of $600, which is $12. Of the $25 payment, $12 pays the interest and $13 reduces the balance, so the new balance is $587. Paying only the minimum is costly because about half of the payment goes to interest, the balance shrinks slowly, and interest keeps being added. I would pay more than the minimum, ideally the whole balance, and avoid new charges.",
      answers: [
        [
          "full",
          "[[0|The monthly interest is 2 percent of $600, which is $12.]] [[1|Of the $25 payment, $13 reduces the balance, so the new balance is $587.]] [[2|Paying the minimum is costly because nearly half goes to interest, so the debt shrinks slowly and more interest keeps being added.]] [[3|I'd pay much more than the minimum, ideally the full balance, and stop adding new charges.]]",
          "Full marks. The calculation and the habit are both right.",
        ],
        [
          "full",
          "[[0|Interest is $600 × 0.02 = $12.]] [[1|The remaining $13 of the payment lowers the balance to $587.]] [[2|It would take years to pay off like this, because most of each payment goes to interest at the start.]] [[3|A better plan is to pay as much as my budget allows, and to stop using the card until the balance is gone.]]",
          "Full marks. Stopping new charges is an important extra step.",
        ],
        [
          "partial",
          "[[0|Interest is $12.]] [[3|I would pay more than the minimum.]] The new balance is $575 because the whole $25 reduces the balance.",
          "The interest takes $12 of the payment, so only $13 reduces the balance.",
        ],
        [
          "partial",
          "[[1|The new balance is $587.]] [[2|The minimum keeps you in debt.]] Interest is $24 because the APR is 24 percent.",
          "24 percent is the yearly rate. Divide by 12 months to get 2 percent a month.",
          true,
        ],
        [
          "weak",
          "A minimum payment means the debt is paid off, so there is nothing more to worry about.",
          "Paying the minimum leaves most of the balance, and interest keeps being charged.",
        ],
        [
          "weak",
          "Interest does not exist on credit cards, because they are free money.",
          "Cards charge interest on balances you carry past the due date.",
        ],
      ],
    },
    {
      prompt:
        "A student has a card with a $1,500 limit and a $600 balance. She asks how her credit score works. Calculate her credit utilization, say whether it is above or below the 30 percent guideline, and explain two actions that would raise her score and two that would lower it.",
      scheme: [
        "Calculates utilization as 40 percent",
        "States that it is above the 30 percent guideline",
        "Gives two actions that raise a score, such as paying on time and lowering the balance",
        "Gives two actions that lower a score, such as paying late and opening many new accounts or maxing out the card",
      ],
      model:
        "Utilization is $600 divided by $1,500, which is 40 percent. That is above the 30 percent guideline. Her score would rise if she pays every bill on time and pays the balance down below $450. It would fall if she pays late or maxes out the card, or applies for many new accounts at once.",
      answers: [
        [
          "full",
          "[[0|Utilization is 600 ÷ 1,500 = 40 percent.]] [[1|That's above the 30 percent guideline.]] [[2|She'd raise her score by paying every bill on time and paying the balance below $450.]] [[3|She'd lower it by paying late, maxing out the card, or applying for lots of new accounts.]]",
          "Full marks. $450 is exactly 30 percent of the limit.",
        ],
        [
          "full",
          "[[0|Her utilization is 40 percent because 600 is 40 percent of 1,500.]] [[1|The guideline is under 30 percent, so it's a bit high.]] [[2|Paying on time and reducing the balance both help the score.]] [[3|Missing a payment or running the balance up to the limit would hurt it.]]",
          "Full marks. Each factor is linked to the score correctly.",
        ],
        [
          "partial",
          "[[0|Utilization is 40 percent.]] [[2|Paying on time helps.]] That is below the guideline so it's fine, and nothing lowers a score.",
          "40 percent is above the 30 percent guideline, and several actions can lower a score.",
        ],
        [
          "partial",
          "[[1|It is above 30 percent.]] [[3|Paying late lowers the score.]] Utilization is 1,500 ÷ 600, which is 250 percent.",
          "Utilization is the balance divided by the limit: 600 divided by 1,500.",
          true,
        ],
        [
          "weak",
          "A credit score is the same as a bank balance, so more money means a better score.",
          "A score reflects how you manage credit, such as paying on time.",
        ],
        [
          "weak",
          "Credit scores do not matter, because nobody ever checks them.",
          "Lenders, landlords and others check scores, and they affect interest rates.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Insurance, scams and identity theft",
  note: `
## Objectives

Students will be able to:

1. describe types of insurance and explain what each protects against;
2. recognize scams and identity theft and describe how to protect yourself.

## Materials

Scenario cards, an insurance terms handout, examples of scam messages (fictional), the worksheet.

## Starter (6 minutes)

Ask: "A car accident could cost $30,000. How can people protect themselves from a cost that large?" Introduce sharing risk.

## Main activity

1. Insurance: you pay a premium, and the insurer pays for covered losses. A deductible is the amount you pay first. Example: a $2,000 repair with a $500 deductible: you pay $500 and the insurer pays $1,500. Types: health (medical costs), auto (damage and liability; required by law in Ohio), renters (belongings and liability in a rental), homeowners, life (income for dependents), disability (income if you cannot work).
2. Choosing coverage: higher deductible means lower premium, but more out of pocket when something happens. Insure risks that you cannot afford to cover yourself.
3. Scams: phishing, fake check scams, fake job offers, prize or lottery scams, "grandparent" scams, romance scams, and investment scams promising guaranteed returns. Red flags: pressure to act fast, payment by gift cards or wire, requests for secrecy, offers that sound too good to be true.
4. Identity theft: criminals use your personal information (Social Security number, birth date, account numbers). Protection: guard your SSN, use strong unique passwords and two-factor authentication, shred documents, check statements, freeze your credit (free), review your credit reports. If it happens: report it, place a fraud alert, and contact banks.

## Worksheet

Match insurance to risk and spot scam signs.
`,
  reading: [
    "Protecting what you have",
    `
Some losses are too large for most people to handle on their own: a hospital stay, a car crash, a house fire. **Insurance** is a way to share that risk. You pay a regular amount, called a **premium**, and in return the insurance company agrees to pay for specific losses. When a loss occurs, you make a **claim**. Most policies include a **deductible**, the amount that you pay before the insurer pays. If a repair costs $2,000 and your deductible is $500, you pay $500 and the insurer pays $1,500. Choosing a higher deductible usually lowers the premium, but you must be able to pay it when something happens.

There are several main types. **Health insurance** pays part of the costs of doctor visits, hospital stays and medicine. **Auto insurance** pays for damage to cars and for injuries you cause to others (this is called **liability** coverage); it is required by law in Ohio and most states. **Renters insurance** covers your belongings in a rental home or apartment if they are stolen or damaged by fire, and protects you if someone is hurt in your home. **Homeowners insurance** protects a house and its contents. **Life insurance** pays money to your family if you die, which matters if others depend on your income. **Disability insurance** replaces part of your income if illness or injury prevents you from working. A good rule is to insure the risks that you could not afford to cover yourself, and to skip coverage for small losses that you can handle from savings.

Money is also threatened by criminals. **Scams** try to trick you into giving money or information. Common types include **phishing** messages that pretend to be a bank, **fake check** scams (a stranger sends you a check for too much and asks you to send back the extra, then the check bounces and you owe the bank), **fake job** offers that ask you to pay a fee, **prize** scams that say you won a contest you never entered, and **investment** scams promising guaranteed high returns. Red flags include pressure to act right away, a request for payment by **gift cards, wire transfer or cryptocurrency**, a demand for secrecy, and offers that seem too good to be true.

In **identity theft**, a criminal uses your personal information, such as your Social Security number, to open accounts or buy things in your name. To protect yourself, never share your Social Security number unless necessary, use strong unique passwords and two-factor authentication, shred papers with personal details, check your account statements regularly, and consider a **credit freeze**, which is free and stops new accounts from being opened in your name. If your identity is stolen, report it at once to the government's identity-theft site, place a fraud alert, and contact your banks and card companies. Acting fast limits the damage.
`,
  ],
  cards: [
    ["Premium", "The regular payment you make for insurance."],
    ["Deductible", "The amount you pay before the insurer pays."],
    ["Claim", "A request to the insurer to pay for a covered loss."],
    ["Liability coverage", "Pays for harm you cause to others."],
    ["Renters insurance", "Covers your belongings in a rental home."],
    ["Phishing", "A message that pretends to be trusted to steal information."],
    ["Identity theft", "Using someone's personal information without permission."],
    ["Credit freeze", "A free block on new accounts being opened in your name."],
  ],
  closed: [
    [
      "A $2,000 repair has a $500 deductible. How much does the insurer pay?",
      ["$500", "$1,500", "$2,000", "$2,500"],
      "B",
    ],
    [
      "Which insurance covers your belongings in an apartment you rent?",
      ["Auto insurance", "Renters insurance", "Life insurance", "Health insurance"],
      "B",
    ],
    [
      "Which is a red flag for a scam?",
      ["A request to pay with gift cards", "A written contract you can read", "Time to think", "A secure website"],
      "A",
    ],
    [
      "What does a credit freeze do?",
      ["Blocks new accounts being opened in your name", "Raises your score", "Erases your debt", "Cancels your cards"],
      "A",
    ],
    [
      "A higher deductible usually means:",
      ["A lower premium but more out of pocket after a loss", "A higher premium", "No coverage", "No claims"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A student receives a message saying she has won a $1,000 gift card in a contest she never entered. To claim it she must pay a $50 \"processing fee\" using gift cards and tell nobody. List three red flags, explain what she should do, and name two ways she can protect her identity in general.",
      scheme: [
        "Identifies a contest she never entered as a red flag",
        "Identifies the payment by gift cards and the fee up front as red flags, or the secrecy demand",
        "Says she should not pay, should ignore or report the message and tell a trusted adult",
        "Names two protections, such as strong unique passwords, two-factor authentication, guarding her Social Security number or a credit freeze",
      ],
      model:
        "Red flags: a contest she never entered, a fee to claim a prize, payment by gift cards, and a demand for secrecy. She should not pay anything, should not reply, should report the message and tell a parent or teacher. To protect her identity she can use strong unique passwords with two-factor authentication, and guard her Social Security number.",
      answers: [
        [
          "full",
          "[[0|She never entered the contest, so winning makes no sense.]] [[1|They want a $50 fee paid with gift cards and want it kept secret, which are classic scam signs.]] [[2|She should not pay or reply; she should report the message and tell a parent or teacher.]] [[3|To protect herself she should use strong unique passwords with two-factor authentication, and never share her Social Security number.]]",
          "Full marks. The red flags and the response are both accurate.",
        ],
        [
          "full",
          "[[0|Red flag one: a prize for something she didn't enter.]] [[1|Two: asking for a fee up front, three: payment by gift cards, and four: telling nobody.]] [[2|She should delete it, report it as a scam, and talk to a trusted adult.]] [[3|In general she can freeze her credit when she's older and shred papers with personal details.]]",
          "Full marks. Naming four flags is more than was needed.",
        ],
        [
          "partial",
          "[[0|She never entered a contest.]] [[2|She should tell a trusted adult.]] She should pay the fee because $1,000 is more than $50, and keep it secret as asked.",
          "Paying a fee for a prize is the scam. Explain why and say what to do instead.",
        ],
        [
          "partial",
          "[[1|Gift cards and secrecy are red flags.]] [[3|Use two-factor authentication.]] She should reply to ask if it's real.",
          "Replying confirms your address is active. Do not reply; report the message.",
          true,
        ],
        [
          "weak",
          "It is real because it says she won. She should send the fee fast to claim it.",
          "Prize scams ask for payment and pressure you to act fast. Do not pay.",
        ],
        [
          "weak",
          "[[3|She should keep her passwords safe.]] Scams are harmless and never cost anyone money.",
          "Scams cost people billions of dollars each year. Identify the red flags.",
        ],
      ],
    },
    {
      prompt:
        "A 19-year-old rents an apartment and owns a laptop, a bike and furniture worth about $3,000. She also drives a used car. Explain which two types of insurance she most needs and why, and calculate what she pays and what the insurer pays for a $2,400 theft claim with a $500 deductible. Say how a higher deductible could affect her.",
      scheme: [
        "Identifies renters insurance as protecting her belongings and liability",
        "Identifies auto insurance as required and protecting against damage and liability",
        "Calculates that she pays $500 and the insurer pays $1,900",
        "Explains that a higher deductible lowers the premium but raises what she pays after a loss",
      ],
      model:
        "She needs renters insurance to cover her belongings and liability, and auto insurance, which is required and covers damage and injuries she may cause. For a $2,400 theft claim with a $500 deductible, she pays $500 and the insurer pays $1,900. A higher deductible would lower her premium, but she would have to pay more out of pocket after a loss.",
      answers: [
        [
          "full",
          "[[0|Renters insurance covers her laptop, bike and furniture and protects her if someone is hurt in her home.]] [[1|Auto insurance is required and pays for damage and injuries she may cause.]] [[2|For the $2,400 theft she pays the $500 deductible and the insurer pays $1,900.]] [[3|A higher deductible would lower her premium but she'd pay more out of pocket after a loss.]]",
          "Full marks. Both policies and the deductible arithmetic are right.",
        ],
        [
          "full",
          "[[0|She needs renters insurance because her $3,000 of belongings are at risk of theft or fire.]] [[1|She also needs auto insurance, as the law requires it and a crash could cost far more than she has.]] [[2|On the theft, she pays $500 and they pay 2,400 - 500 = $1,900.]] [[3|If she picked a $1,000 deductible her premium would drop, but she'd have to find $1,000 after a claim.]]",
          "Full marks. The $1,000 example makes the trade-off concrete.",
        ],
        [
          "partial",
          "[[0|Renters insurance covers her belongings.]] [[2|She pays $500.]] Life insurance is the most important and a higher deductible lowers what she pays after a loss.",
          "A higher deductible raises what you pay after a loss. And auto insurance is required for her car.",
        ],
        [
          "partial",
          "[[1|Auto insurance is required.]] [[3|A higher deductible lowers the premium.]] The insurer pays $2,900 because it adds the deductible.",
          "The insurer pays the claim minus the deductible: $2,400 minus $500.",
          true,
        ],
        [
          "weak",
          "She does not need insurance because nothing bad will happen to her.",
          "Insurance covers losses that are too large to pay yourself. Name two policies.",
        ],
        [
          "weak",
          "A deductible is the monthly payment, so she pays $2,400 each month.",
          "The monthly payment is the premium. The deductible is paid when a claim is made.",
        ],
      ],
    },
  ],
};

writeCourse(
  "personal-finance-grade-10.json",
  "Personal Finance",
  "Grade 10",
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
