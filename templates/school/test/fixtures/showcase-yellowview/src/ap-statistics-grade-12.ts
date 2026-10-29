import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * AP Statistics, Grade 12, Quarter 1. Framed as the College Board frames the
 * course: free-response practice that asks students to describe, interpret and
 * justify in context. All data and questions are original.
 */

const w1: WeekInput = {
  topic: "Unit 1: Exploring one-variable data",
  note: `
## Objectives

Students will be able to:

1. distinguish categorical from quantitative variables and display each appropriately;
2. describe a distribution by its shape, center, spread and outliers, in context;
3. compute and interpret the mean, median, standard deviation and interquartile range.

## Materials

Graphing handhelds with statistics functions, a class data table of commute times, graph paper, the worksheet. All data in class are original.

## Starter (8 minutes)

Collect the class's commute times to school, in minutes, from eight students (12, 15, 15, 18, 20, 22, 25 and 48, which is a student who lives in Delaware, Ohio). Ask students to make a dotplot on the board. Ask: "What is a typical commute? What do you notice about the 48?" Hold off naming statistics until students have argued for their own idea of typical.

## Main activity

1. Variable types and displays: categorical gets bar graphs, quantitative gets dotplots, histograms and boxplots.
2. The four features of a distribution: shape, center, spread and outliers, always in context.
3. Compute the median, quartiles and IQR by hand, apply the 1.5 times IQR rule, and then compute the mean and standard deviation on the handheld.
4. Resistance: remove the 48 and see which statistics move.

## Checking for understanding

Free-response style: "Describe the distribution of commute times." Score each answer for shape, center, spread and outliers, all with context.

## Worksheet

Collect the worksheet at the end of the period.
`,
  reading: [
    "Describing a distribution in context",
    `
Statistics begins with variables. A categorical variable places each individual into a category, such as the way a student gets to school or a favorite roller coaster. A quantitative variable takes numerical values on which arithmetic makes sense, such as the number of minutes a student spends on the COTA bus each day. A number can be a label: a bus route number or a ZIP code is categorical, since averaging route numbers is meaningless. Categorical data are displayed with bar graphs, and quantitative data with dotplots, stemplots, histograms and boxplots.

To describe a quantitative distribution, address four things, always in the context of the data: shape, center, spread and outliers. Suppose eight students report commute times of 12, 15, 15, 18, 20, 22, 25 and 48 minutes. The distribution is skewed right, since the large value 48 stretches the right tail. For the center, the median is the middle value: with eight values it is the average of the 4th and 5th, (18 + 20)/2 = 19 minutes. For spread, find the quartiles. The lower half is 12, 15, 15, 18, with median Q1 = 15, and the upper half is 20, 22, 25, 48, with median Q3 = 23.5. The interquartile range is IQR = Q3 - Q1 = 8.5 minutes. The outlier rule flags any value more than 1.5 x IQR beyond a quartile: 1.5 x 8.5 = 12.75, so the upper fence is 23.5 + 12.75 = 36.25, and the lower fence is 15 - 12.75 = 2.25. The value 48 is above the upper fence, so it is an outlier.

The mean is the balance point, 175/8 = 21.875, about 21.9 minutes. It is larger than the median because the large value pulls it up. The standard deviation measures the typical distance of the values from the mean. Here it is about 11.4 minutes. If we remove the 48, the mean drops to 18.1 minutes and the standard deviation to 4.5 minutes, while the median goes from 19 to 18 minutes. The mean and standard deviation changed a lot, and the median changed only a little: the median and IQR are resistant to outliers, and the mean and the standard deviation are not. For skewed data with outliers, report the median and IQR. For roughly symmetric data without outliers, the mean and standard deviation are appropriate.

A complete description in context sounds like this: "The distribution of commute times is skewed right with one outlier at 48 minutes. The median commute is 19 minutes, and the middle half of the commutes are within an IQR of 8.5 minutes." Always use the units and the variable's name, not just 'the data.'
`,
  ],
  cards: [
    ["Categorical variable", "Places each individual into a group or category. Displayed with a bar graph."],
    ["Quantitative variable", "Takes numerical values for which arithmetic makes sense. Displayed with a dotplot, histogram or boxplot."],
    ["Shape, center, spread, outliers", "The four features to describe a quantitative distribution, in context."],
    ["Median and IQR", "Resistant measures of center and spread. Use them for skewed data or data with outliers."],
    ["Mean and standard deviation", "Not resistant. Use them for roughly symmetric data without outliers."],
    ["IQR", "Q3 minus Q1, the length of the middle half of the data."],
    ["1.5 x IQR rule", "A value is an outlier if it is more than 1.5 x IQR above Q3 or below Q1."],
    ["Skewed right", "The tail extends toward larger values, and the mean is larger than the median."],
  ],
  closed: [
    [
      "Which of the following is a quantitative variable?",
      [
        "The COTA route number a student rides",
        "A student's homeroom",
        "The number of minutes a student rides the bus each day",
        "A student's ZIP code",
      ],
      "C",
    ],
    [
      "A set of commute times is 12, 15, 15, 18, 20, 22, 25 and 48 minutes. Why is the mean (21.9) larger than the median (19)?",
      [
        "The distribution is skewed right because of the large value 48",
        "The distribution is symmetric",
        "The distribution is skewed left",
        "The median is always smaller than the mean",
      ],
      "A",
    ],
    [
      "For the commute times 12, 15, 15, 18, 20, 22, 25 and 48, what is the IQR?",
      ["15 minutes", "8.5 minutes", "23.5 minutes", "36 minutes"],
      "B",
    ],
    [
      "A survey asks 200 students how they get to school: bus, car, walk or bike. Which display is appropriate?",
      ["A histogram", "A dotplot", "A boxplot", "A bar graph"],
      "D",
    ],
    [
      "Which pair of statistics is resistant to outliers?",
      [
        "The median and the IQR",
        "The mean and the standard deviation",
        "The mean and the median",
        "The range and the standard deviation",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Eight students reported the number of minutes it takes them to get to school: 12, 15, 15, 18, 20, 22, 25 and 48. Describe the distribution of commute times. Include shape, center, spread and outliers, and support any claim about an outlier with a calculation.",
      scheme: [
        "Describes the shape as skewed right, in the context of commute times",
        "Gives a center, the median of 19 minutes, and explains why the median suits a skewed distribution",
        "Gives a measure of spread in context, such as an IQR of 8.5 minutes (Q1 = 15, Q3 = 23.5)",
        "Identifies 48 minutes as an outlier using the 1.5 x IQR rule, with the fence 23.5 + 12.75 = 36.25",
      ],
      model:
        "The distribution of commute times is skewed right. The median commute is 19 minutes, the average of 18 and 20, and the median is a good measure of center for a skewed distribution. The middle half of commute times lies between Q1 = 15 minutes and Q3 = 23.5 minutes, so the IQR is 8.5 minutes. The commute of 48 minutes is an outlier: 1.5 x IQR = 12.75, and the upper fence is 23.5 + 12.75 = 36.25, and 48 is greater than 36.25.",
      answers: [
        [
          "full",
          "[[0|The distribution of commute times is skewed right, with most students between 12 and 25 minutes and a long tail to 48.]] [[1|The median commute is 19 minutes, and I use the median because the distribution is skewed and has an extreme value.]] [[2|The IQR of the commute times is 8.5 minutes, from Q1 = 15 to Q3 = 23.5, so the middle half of students spend about 8.5 minutes of range.]] [[3|The student with the 48-minute commute is an outlier: 1.5 x 8.5 = 12.75 and 23.5 + 12.75 = 36.25, and 48 is above that.]]",
          "Full marks. Each feature of the distribution is named, put in context and tied to a number.",
        ],
        [
          "full",
          "Shape: [[0|the commute times are skewed to the right because of the one very long commute]]. Center: [[1|the median is 19 minutes (the mean 21.9 is pulled up by the long commute so the median is better)]]. Spread: [[2|Q1 is 15 min and Q3 is 23.5 min, so the IQR is 8.5 min]]. Outliers: [[3|upper fence = 23.5 + 1.5(8.5) = 36.25 and 48 > 36.25, so 48 minutes is an outlier]].",
          "All four marks. Explaining why the median is chosen over the mean shows reasoning, not just calculation.",
        ],
        [
          "partial",
          "[[0|The distribution is skewed right.]] [[1|The median is 19 minutes.]] The spread is from 12 to 48. There's one outlier, 48.",
          "Your shape and center are right. A range of 12 to 48 is not resistant, so give the IQR, 8.5 minutes. And an outlier needs a calculation: the 1.5 x IQR fence is 36.25, which 48 exceeds.",
        ],
        [
          "partial",
          "[[2|The IQR is 8.5 minutes.]] [[3|48 is an outlier since 23.5 + 12.75 = 36.25 and 48 is bigger.]] The mean is 21.9 so that's the center.",
          "Your spread and outlier work are right. For a skewed distribution with an outlier, the median, 19 minutes, is a better center. Also say the shape: skewed right, in the context of commute times.",
          true,
        ],
        [
          "weak",
          "The mean is 21.9 and the standard deviation is 11.4. It's normal.",
          "The distribution is not normal: it is skewed right with an outlier. Describe shape, center, spread and outliers, and use the median and IQR for skewed data.",
        ],
        [
          "weak",
          "[[0|It's skewed right.]] The numbers are 12 to 48 and the middle is 20.",
          "Your shape is right. The middle value is the median, 19 minutes, not 20: with eight values, average the 4th and 5th, 18 and 20. Give the IQR and show the outlier calculation.",
        ],
      ],
    },
    {
      prompt:
        "For the commute times 12, 15, 15, 18, 20, 22, 25 and 48 minutes, the mean is 21.9 minutes and the standard deviation is 11.4 minutes. When the 48 is removed, the mean is 18.1 minutes and the standard deviation is 4.5 minutes. Explain what these changes show about the mean and standard deviation, and interpret the standard deviation of 4.5 minutes in context.",
      scheme: [
        "States that removing the outlier lowers the mean from 21.9 to 18.1 minutes",
        "States that removing it lowers the standard deviation from 11.4 to 4.5 minutes",
        "Explains that the mean and standard deviation are not resistant, so a single extreme value affects them a lot",
        "Interprets 4.5 as the typical distance of a commute time from the mean, about 4.5 minutes, in context",
      ],
      model:
        "Removing the 48-minute outlier lowers the mean from 21.9 to 18.1 minutes and the standard deviation from 11.4 to 4.5 minutes. The mean and standard deviation use every value, including extreme ones, so they are not resistant to outliers: one large commute inflated both. The standard deviation of 4.5 minutes means that the commute times of the other seven students typically differ from their mean of 18.1 minutes by about 4.5 minutes.",
      answers: [
        [
          "full",
          "[[0|Without the 48, the mean goes down from 21.9 to 18.1 minutes.]] [[1|The standard deviation goes down from 11.4 to 4.5 minutes.]] [[2|That shows the mean and the standard deviation aren't resistant, because one extreme commute changed them a lot.]] [[3|A standard deviation of 4.5 means that the commute times typically differ from the mean of 18.1 minutes by about 4.5 minutes.]]",
          "Full marks. Your interpretation of the standard deviation says what is measured, the typical distance from the mean, in the units of the problem.",
        ],
        [
          "full",
          "The outlier made the mean [[0|3.8 minutes higher (21.9 compared to 18.1)]], and it [[1|more than doubled the standard deviation (11.4 compared to 4.5)]]. [[2|Both of them use every value in a calculation, with the standard deviation squaring the deviations, so an outlier has a big effect, which means they're not resistant]]. [[3|SD = 4.5 minutes means that the seven commutes are typically about 4.5 minutes away from the mean commute of 18.1 minutes]].",
          "All four marks. Noting that squaring the deviations gives an outlier extra weight is a precise reason for the large effect on the SD.",
        ],
        [
          "partial",
          "[[0|The mean decreased to 18.1.]] [[1|The SD decreased to 4.5.]] That means the outlier doesn't matter.",
          "Your values are right, but the conclusion is the reverse. Both statistics changed a great deal, so the outlier matters a lot: they are not resistant. Interpret the SD of 4.5 minutes in context too.",
        ],
        [
          "partial",
          "[[2|The mean and SD are not resistant to outliers.]] [[3|The SD of 4.5 means typical commutes are about 4.5 minutes from the mean.]]",
          "Your explanation and interpretation are right. Also report the changes: the mean went from 21.9 to 18.1 minutes and the standard deviation from 11.4 to 4.5 minutes.",
          true,
        ],
        [
          "weak",
          "The standard deviation of 4.5 means that every commute is 4.5 minutes.",
          "The standard deviation is a typical distance from the mean, not a common value. Commute times differ, and they typically fall about 4.5 minutes from the mean.",
        ],
        [
          "weak",
          "[[0|The mean went from 21.9 to 18.1.]] The standard deviation went from 11.4 to 4.5 so the data are less spread out and now normal.",
          "The spread did decrease. Removing an outlier does not make a distribution normal, and the question asks about what the changes show: that the mean and SD are sensitive to outliers.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Unit 1: The normal model, z-scores and comparing distributions",
  note: `
## Objectives

Students will be able to:

1. use the empirical rule and z-scores to compare values from different distributions;
2. compare two or more distributions using side-by-side graphs and summary statistics, in context.

## Materials

Graphing handhelds, normal-curve diagrams, a printed set of two quiz-score summaries, whiteboards, the quiz. All data are original.

## Starter (8 minutes)

Pose: "Maya scored 27 on the ACT. Ben scored 1250 on the SAT. Who did better?" Let students argue before anyone has the means and standard deviations. Then supply them (ACT mean 21, SD 5 in this example; SAT mean 1050, SD 200) and ask what number to compute that makes the scores comparable.

## Main activity

1. The z-score: how many standard deviations a value is from the mean. Compute and interpret z = (x - mean)/SD.
2. The empirical rule for approximately normal distributions: 68%, 95% and 99.7%.
3. Percentiles, and the effect of adding a constant or multiplying by a constant on mean, SD and IQR.
4. Comparing two distributions: center and spread side by side, in context, with comparative language.

## Checking for understanding

Free-response style: "Compare the distributions of quiz scores in Period 2 and Period 5." Score for comparative statements about center, spread, shape and outliers.

## Quiz

Give the quiz in the last ten minutes.
`,
  reading: [
    "Standardizing, and describing differences between groups",
    `
To compare values from different distributions, standardize. The z-score of a value is z = (value - mean)/standard deviation, the number of standard deviations the value is above (positive) or below (negative) the mean. A student with an ACT score of 27, where the mean is 21 and the standard deviation is 5, has z = (27 - 21)/5 = 1.2. A student with an SAT score of 1250, where the mean is 1050 and the standard deviation is 200, has z = (1250 - 1050)/200 = 1.0. Though 1250 is a larger number, the ACT score is further above its mean in standard deviation units, so it is the better performance relative to the test takers. A z-score of 1.5 for a test score of 82 with mean 70 and standard deviation 8 says that the score is 1.5 standard deviations above the mean.

If a distribution is approximately normal, the empirical rule says that about 68% of the values are within 1 standard deviation of the mean, about 95% are within 2, and about 99.7% are within 3. Suppose the weights of pumpkins at a county fair are approximately normal with mean 15 pounds and standard deviation 2 pounds. Then about 68% of the pumpkins weigh between 13 and 17 pounds, and about 99.7% weigh between 9 and 21. A weight of 19 pounds is 2 standard deviations above the mean, and about 95% are within 2 standard deviations, so about 2.5% are heavier than 19 pounds. A 20-pound pumpkin has z = 2.5, which is unusual since values more than 2 standard deviations from the mean are rare. A percentile is the percent of values at or below a given value, so the 84th percentile means 84% of values are at or below it.

Linear changes to data have predictable effects. Adding a constant to every value shifts the mean and median by that constant but leaves the standard deviation and the IQR unchanged. Multiplying every value by a constant multiplies the mean, median, standard deviation and IQR by the constant.

To compare distributions, use comparative language and include context. Suppose quiz scores in Period 2 have a mean of 78, median of 80, standard deviation of 6, IQR of 8, with scores ranging from 62 to 90, and Period 5 has a mean of 74, median of 74, standard deviation of 12, IQR of 18, with scores from 45 to 98. A good comparison says: "The scores in Period 2 tend to be higher, with a median of 80 compared with 74 in Period 5. The scores in Period 5 are more variable, with an IQR of 18 compared with 8." Do not just list the statistics. A score of 86 in each class has z = (86 - 78)/6 = 1.33 in Period 2 and z = (86 - 74)/12 = 1.0 in Period 5, so the 86 is relatively better in Period 2.
`,
  ],
  cards: [
    ["z-score", "z = (value - mean)/standard deviation. The number of standard deviations from the mean."],
    ["Empirical rule", "For approximately normal data: about 68%, 95% and 99.7% within 1, 2 and 3 standard deviations of the mean."],
    ["Percentile", "The percent of values at or below a given value."],
    ["Unusual value", "A value more than about 2 standard deviations from the mean, or z beyond plus or minus 2."],
    ["Adding a constant", "Shifts the center. Leaves the standard deviation and IQR unchanged."],
    ["Multiplying by a constant", "Multiplies the mean, median, standard deviation and IQR by that constant."],
    ["Comparative language", "Statements such as 'tends to be higher' or 'is more variable', not just two lists of numbers."],
    ["Relative standing", "How a value compares with its own distribution, measured by z-score or percentile."],
  ],
  closed: [
    [
      "ACT scores at a school are approximately normal with mean 21 and standard deviation 5. About what percent of students score between 11 and 31?",
      ["68%", "95%", "99.7%", "50%"],
      "B",
    ],
    [
      "A student scores 82 on a test with mean 70 and standard deviation 8. What is the z-score?",
      ["1.5", "12", "0.67", "-1.5"],
      "A",
    ],
    [
      "Maya scored 27 on the ACT (mean 21, SD 5). Ben scored 1250 on the SAT (mean 1050, SD 200). Who did better relative to the other test takers?",
      [
        "Ben, since his score is larger",
        "They did equally well",
        "Maya, since her z-score is 1.2 and his is 1.0",
        "Neither, because different tests cannot be compared",
      ],
      "C",
    ],
    [
      "A student scored at the 84th percentile on a district math exam. Which statement is correct?",
      [
        "The student answered 84% of the questions correctly",
        "84 students scored higher",
        "The student scored 16% higher than average",
        "About 84% of students scored at or below this student",
      ],
      "D",
    ],
    [
      "Ten points are added to every score on an exam. What happens to the standard deviation and the IQR?",
      [
        "Both increase by 10",
        "Neither changes",
        "The standard deviation increases by 10 and the IQR is unchanged",
        "Both are multiplied by 10",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "The weights of pumpkins at a county fair are approximately normally distributed with mean 15 pounds and standard deviation 2 pounds. (a) About what percent of pumpkins weigh between 13 and 17 pounds? (b) Between 9 and 21 pounds? (c) About what percent weigh more than 19 pounds? (d) A pumpkin weighs 20 pounds. Calculate its z-score and say whether it is unusual.",
      scheme: [
        "Identifies 13 to 17 pounds as within 1 standard deviation of the mean, so about 68%",
        "Identifies 9 to 21 pounds as within 3 standard deviations, so about 99.7%",
        "Finds that 19 pounds is 2 standard deviations above the mean, so about (100 - 95)/2 = 2.5% weigh more",
        "Finds z = (20 - 15)/2 = 2.5 and says the pumpkin is unusual because it is more than 2 standard deviations above the mean",
      ],
      model:
        "(a) 13 and 17 are 1 standard deviation below and above the mean of 15, so about 68% of the pumpkins weigh between 13 and 17 pounds. (b) 9 and 21 are 3 standard deviations from the mean, so about 99.7%. (c) 19 pounds is 2 standard deviations above the mean. About 95% of pumpkins are within 2 standard deviations, so about 5% are outside, half of which, 2.5%, are above 19 pounds. (d) z = (20 - 15)/2 = 2.5. A 20-pound pumpkin is 2.5 standard deviations above the mean, which is more than 2, so it is unusual.",
      answers: [
        [
          "full",
          "(a) [[0|13 and 17 are one SD from 15, so about 68%.]] (b) [[1|9 and 21 are three SDs from 15, so about 99.7%.]] (c) [[2|19 is two SDs above the mean. 95% are within 2 SDs so 5% are outside, half above, so about 2.5% weigh more than 19 pounds.]] (d) [[3|z = (20 - 15)/2 = 2.5. It is more than 2 standard deviations above the mean, so the pumpkin is unusually heavy.]]",
          "Full marks. In (c), splitting the outside 5% into two tails is the step that students often forget.",
        ],
        [
          "full",
          "(a) 15 plus or minus 2 = 13 to 17, [[0|within one SD, so about 68% of the pumpkins]]. (b) 15 plus or minus 6 = 9 to 21, [[1|within 3 SDs, about 99.7%]]. (c) [[2|19 is 2 SDs above, the area above is (100 - 95)/2 = 2.5%]]. (d) [[3|(20 - 15)/2 = 2.5 SDs above the mean, so unusual (about 0.6% of pumpkins weigh that much or more)]].",
          "All four marks. Adding the approximate tail area for z = 2.5 gives extra support for 'unusual'.",
        ],
        [
          "partial",
          "[[0|(a) 68%.]] [[1|(b) 99.7%.]] (c) 19 is 2 SDs above, so 5% weigh more. (d) z = 2.5 so it's unusual.",
          "Parts (a), (b) and the idea in (d) are right. In (c), the 5% outside 2 SDs is split between both tails, so only about 2.5% weigh more than 19 pounds. Also state why 2.5 is unusual.",
        ],
        [
          "partial",
          "[[2|(c) 2.5% because 19 is two SDs above and half of 5% is 2.5%.]] [[3|(d) z = 2.5, which is unusual since it is more than 2 SDs away.]] (a) 95% and (b) 68%.",
          "Your answers to (c) and (d) are right. In (a) and (b) you swapped the percentages: 1 SD (13 to 17) is about 68%, and 3 SDs (9 to 21) is about 99.7%.",
          true,
        ],
        [
          "weak",
          "(a) 50% because it's the middle. (b) 100%. (c) 19 is more than 15 so half of them, 50%. (d) z = 20 - 15 = 5.",
          "The empirical rule counts standard deviations from the mean, and a z-score divides the difference by the standard deviation: (20 - 15)/2 = 2.5.",
        ],
        [
          "weak",
          "[[0|(a) 68% because 13 to 17 is one standard deviation each way.]] (d) z = 20/2 = 10 so it's very unusual.",
          "(a) is right. A z-score subtracts the mean first: (20 - 15)/2 = 2.5, not 20/2. It is still unusual, but for the right reason.",
        ],
      ],
    },
    {
      prompt:
        "Quiz scores in two classes are summarized below. Period 2: mean 78, median 80, standard deviation 6, IQR 8, scores from 62 to 90. Period 5: mean 74, median 74, standard deviation 12, IQR 18, scores from 45 to 98. (a) Compare the centers of the two distributions. (b) Compare their spreads. (c) A student in each class scored 86. Compute each z-score and say which student did relatively better in their own class.",
      scheme: [
        "Compares centers using comparative language, such as Period 2 scores tend to be higher (median 80 versus 74)",
        "Compares spreads, such as Period 5 scores are more variable (IQR 18 versus 8, SD 12 versus 6)",
        "Computes the z-scores: (86 - 78)/6 = 1.33 for Period 2 and (86 - 74)/12 = 1.0 for Period 5",
        "Concludes the Period 2 student did relatively better, since 86 is 1.33 SDs above the mean there versus 1.0 in Period 5",
      ],
      model:
        "(a) Scores in Period 2 tend to be higher than in Period 5: the median is 80 compared with 74, and the mean is 78 compared with 74. (b) Scores in Period 5 are more variable: the IQR is 18 compared with 8, and the standard deviation is 12 compared with 6. (c) In Period 2, z = (86 - 78)/6 = 1.33. In Period 5, z = (86 - 74)/12 = 1.0. The score of 86 is 1.33 standard deviations above the mean in Period 2 but only 1.0 in Period 5, so the Period 2 student did relatively better.",
      answers: [
        [
          "full",
          "(a) [[0|Scores in Period 2 tend to be higher than Period 5, with a median of 80 versus 74.]] (b) [[1|Period 5 is more spread out: an IQR of 18 against 8, and a standard deviation of 12 against 6.]] (c) [[2|Period 2: z = (86 - 78)/6 = 1.33. Period 5: z = (86 - 74)/12 = 1.0.]] [[3|The Period 2 student did relatively better, because their 86 is further above their class mean in standard deviation units.]]",
          "Full marks. Comparative words like tend to be higher and more spread out make this a comparison and not two lists.",
        ],
        [
          "full",
          "(a) The center: [[0|the median in Period 2 is 6 points higher (80 versus 74), so the class tends to score higher]]. (b) The spread: [[1|Period 2 scores are more consistent, with an IQR of 8 compared with 18 for Period 5]]. (c) [[2|The z-scores are 1.33 for the Period 2 student and 1.0 for the Period 5 student]]. [[3|A larger z-score means a higher relative standing, so the 86 is a stronger score in Period 2]].",
          "All four marks. Saying more consistent is a clear way to describe less spread.",
        ],
        [
          "partial",
          "(a) Period 2 has a higher mean (78 vs 74). (b) Period 5 has a bigger SD. [[2|(c) The z-scores are 1.33 and 1.0.]]",
          "Your z-scores are right. Add comparative statements in context: 'scores in Period 2 tend to be higher' and 'Period 5 scores are more variable', and conclude which student did relatively better.",
        ],
        [
          "partial",
          "[[0|Period 2 scores tend to be higher, median 80 versus 74.]] [[3|The student in Period 2 did better since their z-score is higher.]]",
          "Your center comparison and conclusion are right. Add the spread comparison (IQR 8 versus 18) and show the z-scores, 1.33 and 1.0.",
          true,
        ],
        [
          "weak",
          "Period 2 mean 78, median 80, SD 6. Period 5 mean 74, median 74, SD 12. Both students scored 86 so they did equally well.",
          "A list of statistics is not a comparison. And the same score in different classes does not mean the same standing: the z-scores differ, 1.33 and 1.0.",
        ],
        [
          "weak",
          "[[1|Period 5 is more variable, with an IQR of 18.]] The z-score of the student in Period 5 is higher because 86 - 74 = 12 is larger than 86 - 78 = 8.",
          "The spread comparison is right. A z-score divides the difference by the standard deviation: 12/12 = 1.0 for Period 5 and 8/6 = 1.33 for Period 2. The Period 2 student has the higher z-score.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Unit 2: Scatterplots and the correlation coefficient",
  note: `
## Objectives

Students will be able to:

1. describe an association in a scatterplot by its form, direction and strength, in context;
2. calculate and interpret the correlation coefficient and explain its limits.

## Materials

Graphing handhelds, graph paper, a data table of practice hours and free-throw percentages, the problem set. All data are original.

## Starter (8 minutes)

Give pairs the data for eight members of the school basketball program: weekly practice hours (2, 4, 5, 7, 8, 10, 11, 13) and free-throw percentage (52, 58, 60, 66, 68, 74, 75, 82). Ask them to sketch a scatterplot and describe what they see. Collect the words used and sort them into form, direction and strength.

## Main activity

1. Describe the association in a scatterplot: form (linear, curved), direction (positive, negative) and strength (strong, moderate, weak), with unusual features, and always in the context of the variables.
2. The correlation coefficient r: calculator computation, the range from -1 to 1, and what it measures.
3. Properties of r: unaffected by changes of units or switching x and y, only for linear association, not resistant to outliers.
4. Add a distant point to a strong linear plot and watch r change from 0.99 to a negative value.

## Checking for understanding

Free-response style: "A scatterplot has a clear curved pattern and r = 0.05. Does this mean there is no association? Explain."

## Problem set

Collect the problem set at the next class.
`,
  reading: [
    "Describing association, and what r measures",
    `
When two quantitative variables are measured on the same individuals, a scatterplot shows how they are related. The explanatory variable goes on the horizontal axis and the response variable on the vertical axis. To describe the association, say three things: the form (is the pattern roughly linear or curved?), the direction (positive if y tends to increase as x increases, negative if y tends to decrease) and the strength (how closely the points follow the pattern). Also mention unusual features such as outliers or clusters. A good description names the variables. For eight players, the scatterplot of weekly practice hours against free-throw percentage shows a strong, positive, linear association: players who practice more hours tend to make a higher percentage of their free throws, and the points fall very close to a line.

The correlation coefficient r puts a number on the strength of a linear association. It is always between -1 and 1. A value near 1 means a strong positive linear association, a value near -1 means a strong negative linear association, and a value near 0 means a weak linear association. For the practice and free-throw data, r is about 0.998. Interpreting it: there is a very strong, positive, linear association between weekly practice hours and free-throw percentage for these players.

The properties of r matter as much as the number. First, r has no units, and it does not change if you change the units of either variable, such as inches to centimeters, and it does not change if you swap x and y. If a regression has r = 0.6, then switching the variables still gives r = 0.6. Second, r measures only linear association. A scatterplot with a clear U-shaped pattern could have r close to 0, even though the variables are strongly related, so always look at the scatterplot before using r. Third, r is not resistant: a single point can change it a lot. Take the five points (1, 3), (2, 5), (3, 6), (4, 9) and (5, 10), which give r = 0.988. Add the point (12, 2), which is far to the right and does not follow the pattern. Now r = -0.263: the correlation changed from strongly positive to weakly negative because of one point. A point far from the others in the x direction can have this much influence.

Finally, correlation is not causation. A high r tells you that two variables move together in a linear pattern, not that one causes the other. We take up that idea in the next unit.
`,
  ],
  cards: [
    ["Explanatory and response variables", "The explanatory variable is on the x-axis and the response variable is on the y-axis."],
    ["Form, direction and strength", "The three things to describe in a scatterplot, along with unusual features, in context."],
    ["Correlation coefficient r", "A number from -1 to 1 measuring the strength and direction of a linear association."],
    ["r has no units", "Changing units, or switching x and y, does not change r."],
    ["r measures only linear association", "A curved pattern can have r near 0 even when the association is strong."],
    ["r is not resistant", "A single outlier or influential point can change r a great deal."],
    ["Influential point", "A point whose removal would change the correlation or the line markedly, often far from the others in x."],
    ["Correlation is not causation", "A strong r does not show that changes in x cause changes in y."],
  ],
  closed: [
    [
      "A scatterplot of weekly practice hours (x) and free-throw percentage (y) rises from lower left to upper right, with the points tightly clustered around a line. Which is the best description?",
      [
        "Negative, linear and strong",
        "Positive, linear and strong",
        "Positive, curved and weak",
        "No association",
      ],
      "B",
    ],
    [
      "Which value of r indicates the strongest linear association?",
      ["r = 0.80", "r = 0.15", "r = -0.92", "r = -0.40"],
      "C",
    ],
    [
      "The heights and arm spans of students are recorded in inches, with r = 0.85. If they are converted to centimeters, what happens to r?",
      ["r is unchanged", "r is multiplied by 2.54", "r becomes negative", "r is divided by 2.54"],
      "A",
    ],
    [
      "A scatterplot shows a clear U-shaped pattern and r = 0.05. Which conclusion is best?",
      [
        "There is no association between the variables",
        "The data must contain an error",
        "The variables are not related to each other",
        "There may be a strong association, but it is not linear, so r does not describe it",
      ],
      "D",
    ],
    [
      "A regression of y on x has r = 0.6. If the variables are switched so that x is predicted from y, what is the new r?",
      ["0.36", "0.6", "-0.6", "1.67"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A coach recorded the weekly practice hours (x) and free-throw percentage (y) of eight players: (2, 52), (4, 58), (5, 60), (7, 66), (8, 68), (10, 74), (11, 75) and (13, 82). A calculator gives r = 0.998. (a) Describe the association in context. (b) Interpret r in context. (c) State two limitations of using r to describe this relationship.",
      scheme: [
        "Describes the form (linear) and direction (positive) and strength (strong) in context, naming practice hours and free-throw percentage",
        "States and interprets r = 0.998 as a very strong positive linear association between weekly practice hours and free-throw percentage for these players",
        "Gives a limitation such as r measures only linear association, or r is sensitive to outliers",
        "Gives a second limitation such as a high r does not show that practice causes the improvement, or only 8 players are used",
      ],
      model:
        "(a) There is a strong, positive, linear association between weekly practice hours and free-throw percentage: players who practice more hours tend to make a higher percentage of their free throws, and the points fall close to a line. (b) r = 0.998 means there is a very strong positive linear association between the two variables for these eight players. (c) First, r measures only linear association, so it says nothing about whether a curved relationship might fit better outside this range, and it can be changed a lot by an outlier. Second, correlation does not show causation: a high r does not prove that more practice causes better free-throw shooting, since other factors such as natural ability or motivation could affect both.",
      answers: [
        [
          "full",
          "(a) [[0|The association between weekly practice hours and free-throw percentage is positive, linear and strong, so players who practice more tend to shoot better.]] (b) [[1|r = 0.998 means a very strong positive linear association between practice hours and free-throw percentage for these eight players.]] (c) [[2|r only measures linear association, and one outlier could change it a lot.]] [[3|Also correlation isn't causation, so r doesn't prove practice causes better shooting, since something like talent could affect both.]]",
          "Full marks. Naming a possible third factor, such as talent, shows you understand why correlation does not prove causation.",
        ],
        [
          "full",
          "(a) The scatterplot would be [[0|a strong positive linear association: as weekly practice hours go up, free-throw percentage goes up and the points follow a line closely]]. (b) [[1|r is about 1, so it's a very strong positive linear relationship between practice time and free-throw percentage in this group]]. (c) [[2|r only works for straight-line relationships and it isn't resistant to outliers]], and [[3|it only has 8 players, and being correlated doesn't mean that practice causes the improvement]].",
          "All four marks. Naming the sample size as a limitation is a thoughtful addition.",
        ],
        [
          "partial",
          "(a) [[0|There's a positive linear strong association between practice hours and free-throw percentage.]] (b) r = 0.998 means that 99.8% of players improve. (c) r can be changed by outliers.",
          "Your description and the outlier limitation are right. The value r is not a percent of players. It measures the strength of the linear association, so r = 0.998 means a very strong positive linear association.",
        ],
        [
          "partial",
          "[[1|r = 0.998 is a very strong positive linear association between practice hours and free-throw percentage.]] [[3|It doesn't prove practice causes better shooting.]] The graph is strong.",
          "Your interpretation and a limitation are right. Describe all three features in (a): positive direction, linear form and strong strength, in context, and give a second limitation in (c), such as that r measures only linear association.",
          true,
        ],
        [
          "weak",
          "(a) It's a perfect relationship since r is almost 1. (b) r = 0.998 means practice causes 99.8% of shooting. (c) There are no limits.",
          "A correlation of 0.998 is very strong but not perfect, and it never shows that one variable causes the other. A limit of r is that it measures only linear association and is sensitive to outliers.",
        ],
        [
          "weak",
          "[[0|The association is positive and strong.]] r = 0.998 is the slope of the line, so each hour of practice adds 0.998 percent.",
          "Your first sentence is a start (also mention linear and name the variables). r is not the slope. The slope depends on the units, but r has no units, and it measures strength, not the rate of change.",
        ],
      ],
    },
    {
      prompt:
        "For the five points (1, 3), (2, 5), (3, 6), (4, 9) and (5, 10), the correlation is r = 0.988. A sixth point (12, 2) is added, and the correlation becomes r = -0.263. (a) Describe what happens to r. (b) Explain why a single point had such a large effect. (c) What would you do before reporting a correlation for the data?",
      scheme: [
        "States that r changed from 0.988, a very strong positive linear association, to -0.263, a weak negative association",
        "Explains that the new point is far from the other x-values and does not follow the pattern, so it has a large effect",
        "Concludes that r is not resistant to outliers, or that this point is influential",
        "Suggests examining the scatterplot, checking whether the point is an error or a real individual, and reporting r with and without it",
      ],
      model:
        "(a) Before the sixth point, r = 0.988, a very strong positive linear association. After it, r = -0.263, a weak negative association: one point changed the sign and the strength. (b) The new point (12, 2) has an x-value far from the others, which range from 1 to 5, and its y-value of 2 does not follow the rising pattern, so it pulls the pattern strongly. Correlation is not resistant to outliers, and a point like this one that is far in the x direction is influential. (c) Before reporting a correlation I would look at the scatterplot, check whether the point is an error or a real observation, and report the correlation with and without it, explaining the difference.",
      answers: [
        [
          "full",
          "(a) [[0|r went from 0.988, a very strong positive linear association, to -0.263, which is a weak negative one.]] (b) [[1|(12, 2) is way to the right of the other points, which are at x = 1 to 5, and its y is low instead of high, so it pulls the line down.]] [[2|That's because r is not resistant: one influential point can change it a lot.]] (c) [[3|I would graph the data first, check whether the point is a mistake or a real observation, and report r both with and without it.]]",
          "Full marks. Naming the point as influential because it is far out in x is the key idea.",
        ],
        [
          "full",
          "(a) The correlation [[0|dropped from a strong positive value (0.988) to a weak negative value (-0.263)]]. (b) [[1|The new point has an x-value much larger than any other and a y-value that doesn't continue the pattern, so it has high leverage]]. [[2|Correlation uses every point and isn't resistant to outliers]]. (c) [[3|Look at the scatterplot, find out if the point is an error, and compare the correlation with and without it]].",
          "All four marks. Mentioning leverage is a technical way to express the influence of an extreme x-value.",
        ],
        [
          "partial",
          "(a) [[0|r went from 0.988 to -0.263, so it changed from strong positive to weak negative.]] (b) The new point is wrong so it should be deleted. (c) Delete it.",
          "Your description of the change is right. A point should not be deleted just because it changes r. Check whether it is an error, and if it is a real observation, report the correlation with and without it.",
        ],
        [
          "partial",
          "[[2|r is not resistant, so an outlier can change it a lot.]] [[3|I'd look at a scatterplot and report both versions of r.]]",
          "Your reasoning and plan are right. Add the description of the change, from 0.988 to -0.263, and explain why this point matters: its x-value is far from the rest and it does not follow the pattern.",
          true,
        ],
        [
          "weak",
          "Adding one point can't matter because there are five other points that show a strong relationship.",
          "One point can matter a lot, especially if it is far from the rest in x and off the pattern. Here r changed from 0.988 to -0.263.",
        ],
        [
          "weak",
          "[[0|r changed from 0.988 to -0.263.]] That means the relationship reversed and now larger x causes smaller y.",
          "The change in r is right. A single new point does not show that larger x causes smaller y. It shows that r is sensitive to an influential point, and correlation never shows causation.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Unit 2: Least-squares regression, interpreting the line and residual plots",
  note: `
## Objectives

Students will be able to:

1. fit a least-squares regression line and interpret the slope and intercept in context;
2. use residuals and residual plots to judge whether a linear model is appropriate.

## Materials

Graphing handhelds, graph paper, regression output cards, whiteboards, the worksheet. All data are original.

## Starter (8 minutes)

Return to the free-throw data. Show a calculator regression for the eight players: predicted free-throw percentage = 46.9 + 2.66 x (practice hours). Ask: "What does the 2.66 tell the coach? What does 46.9 mean, and is it believable?" Collect interpretations and refine them into the template: "For each additional [x unit], the predicted [y] increases by [slope]."

## Main activity

1. Interpreting the slope and the y-intercept in context, with units, and deciding whether the intercept is meaningful.
2. Prediction, interpolation and extrapolation: why predictions outside the range of the data are risky.
3. Residuals: residual = actual minus predicted. Compute and interpret positive and negative residuals.
4. Residual plots: a random scatter about zero supports a linear model, and a curved pattern shows that a line is not appropriate even if r is high.

## Checking for understanding

Free-response style: "A residual plot shows a clear U-shape. Is a linear model appropriate? Explain."

## Worksheet

Collect the worksheet at the end of class.
`,
  reading: [
    "Using a line to predict, and checking the line",
    `
The least-squares regression line (LSRL) is the line that makes the sum of the squared vertical distances from the points to the line as small as possible. We write it as y-hat = a + bx, where y-hat is the predicted value of the response, b is the slope and a is the y-intercept. For the eight basketball players, a calculator gives y-hat = 46.9 + 2.66x, where x is weekly practice hours and y-hat is the predicted free-throw percentage.

The slope and intercept must be interpreted in context. The slope says how the predicted response changes for each one-unit increase in x: for each additional hour of practice per week, the predicted free-throw percentage increases by about 2.66 percentage points. The intercept is the predicted response when x = 0. Here, a player who practices 0 hours is predicted to make 46.9%. But the data only cover 2 to 13 hours, so 0 hours is outside the range, and the intercept may not mean much. For a car's resale price, y-hat = 21,450 - 1,380x with x the age in years: for each additional year of age, the predicted price decreases by about $1,380, and a car with age 0 has a predicted price of $21,450, which is meaningful, because new cars exist in the data range. In a third example, a tutoring line is y-hat = 61.2 + 3.5x.

Prediction means substituting a value of x. For the tutoring line, 4 hours gives y-hat = 61.2 + 3.5(4) = 75.2. Predictions are reliable only inside the range of the observed x-values, which is interpolation. Predicting outside it is extrapolation and can be badly wrong: at 20 hours the tutoring line gives 131.2, which is impossible for a score out of 100.

A residual is the actual value minus the predicted value: residual = y - y-hat. If a student actually scored 80 after 4 hours of tutoring, the residual is 80 - 75.2 = 4.8, so the student scored 4.8 points above the prediction. For a car aged 6 years, the prediction is 21,450 - 1,380(6) = 13,170 dollars. If the actual price is 12,500, then the residual is -670, so the car costs $670 less than the line predicts.

A residual plot graphs the residuals against x. If a linear model is appropriate, the residuals should show no pattern: a random scatter around zero. A curved pattern, like a U, means that the relationship is not linear, so a line is not an appropriate model, even if r is large. In that case you would look for a different model, such as a curve or a transformation of the data.
`,
  ],
  cards: [
    ["Least-squares regression line", "The line y-hat = a + bx that minimizes the sum of the squared residuals."],
    ["Slope interpretation", "For each one-unit increase in x, the predicted y changes by b units."],
    ["Intercept interpretation", "The predicted y when x = 0. It is meaningful only if x = 0 is within the data's range."],
    ["Residual", "Actual y minus predicted y. A positive residual means the actual value is above the line."],
    ["Extrapolation", "Predicting for x-values outside the range of the data. It is unreliable."],
    ["Residual plot", "A graph of residuals against x. A linear model is appropriate if there is no pattern."],
    ["Curved residual pattern", "Shows a linear model is not appropriate, even when r is high."],
    ["Predicted value", "y-hat, found by substituting x into the regression equation."],
  ],
  closed: [
    [
      "The regression line for predicting a quiz score from hours of tutoring is y-hat = 61.2 + 3.5x. What score is predicted for 4 hours of tutoring?",
      ["61.2", "14.0", "75.2", "65.4"],
      "C",
    ],
    [
      "In the equation y-hat = 61.2 + 3.5x, the slope 3.5 means which of the following?",
      [
        "For each additional hour of tutoring, the predicted quiz score increases by about 3.5 points",
        "A student with no tutoring scores 3.5",
        "The correlation between tutoring and score is 3.5",
        "Tutoring causes a 3.5% improvement",
      ],
      "A",
    ],
    [
      "The tutoring data covered 1 to 6 hours. Why is a prediction for 20 hours not trustworthy?",
      [
        "The slope is too small",
        "It is extrapolation beyond the data, and the line may not continue to hold",
        "The residuals are all positive",
        "A prediction can only be made for whole numbers of hours",
      ],
      "B",
    ],
    [
      "A student received 4 hours of tutoring, the line predicts 75.2, and the student's actual score was 80. What is the residual?",
      ["-4.8", "75.2", "155.2", "4.8"],
      "D",
    ],
    [
      "A residual plot for a regression shows a clear curved pattern. What does this indicate?",
      [
        "The linear model is a good fit",
        "A linear model is not appropriate for these data",
        "The correlation must be 0",
        "There are no outliers",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A used-car dealer in Columbus models the asking price of a certain model of car (in dollars) from its age in years (1 to 9 years), using y-hat = 21,450 - 1,380x. (a) Interpret the slope in context. (b) Interpret the intercept in context, and say whether it is meaningful. (c) Predict the price of a 6-year-old car. (d) A 6-year-old car is listed at $12,500. Find and interpret its residual.",
      scheme: [
        "Interprets the slope: for each additional year of age, the predicted asking price decreases by about $1,380",
        "Interprets the intercept: the predicted price of a car with age 0 is $21,450, which is meaningful because new cars are near the data range (or notes the caution)",
        "Predicts 21,450 - 1,380(6) = $13,170",
        "Finds the residual 12,500 - 13,170 = -670 and says the car is listed $670 below the price the line predicts",
      ],
      model:
        "(a) For each additional year of age, the predicted asking price decreases by about $1,380. (b) The intercept says that the predicted asking price for a car of age 0 is $21,450. This is reasonable to interpret since a new car has age near the lowest age in the data (1 year), so it is only a small extrapolation. (c) y-hat = 21,450 - 1,380(6) = 21,450 - 8,280 = $13,170. (d) The residual is actual minus predicted: 12,500 - 13,170 = -670. This car is listed $670 below the price predicted by the regression line for a 6-year-old car.",
      answers: [
        [
          "full",
          "(a) [[0|For each extra year of age, the predicted price goes down by about $1,380.]] (b) [[1|The intercept 21,450 is the predicted price of a car with age 0, a new car. It's fairly meaningful since it's close to the 1-year-old cars in the data.]] (c) [[2|21,450 - 1,380 x 6 = 21,450 - 8,280 = $13,170.]] (d) [[3|Residual = 12,500 - 13,170 = -670, so the car is priced $670 below what the line predicts for its age.]]",
          "Full marks. Each answer includes units and context, and your reading of the residual says which direction the car's price is from the line.",
        ],
        [
          "full",
          "(a) The slope is -1,380, so [[0|every year older the predicted asking price drops by about $1,380]]. (b) [[1|The predicted price when the age is 0 is $21,450. Age 0 is just outside the data, which starts at 1 year, so this is a small extrapolation, but it is believable as a new-car price]]. (c) [[2|At age 6, 21,450 - 1,380(6) = $13,170]]. (d) [[3|Actual minus predicted is 12,500 - 13,170 = -$670: this car is $670 less expensive than the model expects]].",
          "All four marks. Pointing out that age 0 is a small extrapolation is a careful comment.",
        ],
        [
          "partial",
          "(a) [[0|The price goes down by $1,380 for each year of age.]] (b) The intercept is the price when x = 0, $21,450. (c) 13,170. (d) The residual is 670 because 13,170 - 12,500.",
          "Your slope interpretation is right (say 'predicted'). Residual is actual minus predicted: 12,500 - 13,170 = -670, so the car is $670 below the prediction, and the sign matters.",
        ],
        [
          "partial",
          "[[2|(c) 21,450 - 1,380(6) = $13,170.]] [[3|(d) The residual is -670, so it's priced $670 lower than predicted.]] (a) The price decreases by 1,380 dollars.",
          "Parts (c) and (d) are right. In (a), say 'for each additional year of age, the predicted price decreases', and add (b), the interpretation of the intercept as the predicted price of a car with age 0.",
          true,
        ],
        [
          "weak",
          "(a) The slope means that the cars lose 1,380 dollars. (b) The intercept is the cost of the car. (c) 21,450 - 6 = 21,444. (d) -670 because 12,500 is lower.",
          "The slope is a rate: dollars per year of age. To predict, substitute the age into the equation: 1,380 x 6 = 8,280, then subtract from 21,450.",
        ],
        [
          "weak",
          "[[0|For each additional year of age the predicted price decreases about $1,380.]] The intercept 21,450 means the car loses 21,450 dollars of value in total.",
          "Your slope is right. The intercept is not a total loss. It is the predicted price when the age is 0, a new car.",
        ],
      ],
    },
    {
      prompt:
        "A student fits a linear model to data on the time (in seconds) a pendulum takes to swing against its length, and finds r = 0.97. The residual plot, however, shows a clear U-shaped pattern. (a) Describe what the residual plot shows. (b) Is a linear model appropriate? Explain, using both r and the residual plot. (c) What would a residual plot look like if a linear model were appropriate?",
      scheme: [
        "Describes the residual plot as having a curved, U-shaped pattern, with residuals positive at the ends and negative in the middle",
        "Says a linear model is not appropriate, because a pattern in the residuals shows the relationship is curved",
        "Explains that a high r only means a strong linear trend, so it does not show that a line is the best model",
        "Says that if a linear model were appropriate the residual plot would show a random scatter around 0 with no pattern",
      ],
      model:
        "(a) The residual plot shows a clear U-shaped pattern: the residuals are positive for small and large lengths and negative in the middle. (b) A linear model is not appropriate. The pattern in the residual plot shows that the relationship is curved, and the line systematically over-predicts in the middle and under-predicts at the ends. The high correlation r = 0.97 shows only that there is a strong increasing trend that is roughly linear, but r does not tell us whether a line is the right form. (c) If a linear model were appropriate, the residuals would be scattered randomly around zero, with no pattern and roughly equal spread across all x-values.",
      answers: [
        [
          "full",
          "(a) [[0|The residuals are positive at the small and large lengths and negative in the middle, so there's a U-shaped, curved pattern.]] (b) [[1|A linear model isn't appropriate, because a pattern in the residual plot means the relationship is curved and the line misses it.]] [[2|Even though r = 0.97, r only measures the strength of the linear trend, and it doesn't prove the form is linear.]] (c) [[3|With a good linear model the residual plot would be randomly scattered around 0 with no pattern.]]",
          "Full marks. You used both r and the residual plot, as the question asked.",
        ],
        [
          "full",
          "(a) The residual plot [[0|curves like a U, positive then negative then positive, so there is a clear pattern]]. (b) [[1|A line is not a good model here because residuals should be random and these are not, so the true relationship is curved]]. [[2|The high r doesn't contradict this: r = 0.97 means the points are close to increasing in a line-like way, but a curve can still be the better fit and a residual plot shows what r hides]]. (c) [[3|An appropriate linear model would have residuals scattered about the horizontal axis at 0, with no pattern and a consistent vertical spread]].",
          "All four marks. Saying that the residual plot shows what r hides is the main point of the unit.",
        ],
        [
          "partial",
          "(a) [[0|The residual plot has a U shape.]] (b) Since r = 0.97 is very high, the linear model is appropriate. (c) It would be random.",
          "Your description and part (c) are right. A pattern in the residual plot shows the linear model is not appropriate, even with a high r, since r measures the strength of a linear trend, not whether the form is correct.",
        ],
        [
          "partial",
          "[[1|A linear model is not appropriate because the residual plot has a pattern, so the data are curved.]] [[3|A good residual plot is random scatter around zero.]]",
          "Your conclusion and part (c) are right. Describe the plot (positive at the ends, negative in the middle), and explain why a high r of 0.97 does not make the line appropriate.",
          true,
        ],
        [
          "weak",
          "The U shape means the data are normal, which is good, so a linear model is fine.",
          "A U-shaped residual plot is not related to a normal distribution. A pattern in the residuals means the relationship is curved and a linear model is not appropriate.",
        ],
        [
          "weak",
          "[[3|The residuals should be scattered randomly around zero for a linear model.]] This plot has a pattern, so we should delete the points in the middle.",
          "Your statement about random scatter is right. Deleting points to remove a pattern is not valid. A pattern is evidence that the model is wrong, and you should look for a better model, such as a curve.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Unit 2 to 3: Association and causation, studies, and sampling methods",
  note: `
## Objectives

Students will be able to:

1. explain why association does not imply causation, and recognize lurking variables;
2. distinguish an observational study from an experiment;
3. describe a simple random sample, a stratified sample and a cluster sample.

## Materials

Index cards numbered for the whole class, a random number table or handheld random integer function, whiteboards, the worksheet. All examples are original.

## Starter (8 minutes)

Write on the board: "Students who eat breakfast have higher GPAs." Ask: "Does this mean a school should feed everyone breakfast to raise GPAs?" Take both sides. Then ask what else could explain the pattern (family resources, sleep, routine) and introduce the term lurking variable.

## Main activity

1. Observational study versus experiment: who decides which individuals get which condition? Random assignment is the mark of an experiment.
2. Lurking variables and confounding: ice cream sales and drownings, breakfast and GPA. Why only a well-designed experiment can support a causal claim.
3. Sampling methods on the same school: a simple random sample (SRS) using numbered cards, a stratified random sample by grade, and a cluster sample of homerooms.
4. Compare the methods: when each is practical and what each guarantees.

## Checking for understanding

Free-response style: "Describe a sampling plan to select 60 of the 1,200 students in a high school as a stratified sample by grade."

## Worksheet

Collect the worksheet at the end of the period.
`,
  reading: [
    "What a study can show, and how to choose who is in it",
    `
Two variables can be strongly associated without either causing the other. The classic example is that ice cream sales and drownings both increase in summer, so the two are positively correlated. Ice cream does not cause drownings, and drownings do not cause ice cream sales. A lurking variable, the hot weather, affects both. A lurking variable is a variable that is not among the variables studied but influences both of them, or the response. When its effect cannot be separated from that of the explanatory variable, the two are confounded.

How the data are produced decides what can be concluded. In an observational study, researchers observe individuals and measure variables, without imposing a treatment. In an experiment, researchers deliberately impose treatments on individuals and observe the responses. The difference is who decides which individuals receive which condition. If students choose whether to eat breakfast, it is an observational study. If researchers randomly assign 60 students to sleep 6 hours or 9 hours for a week, it is an experiment. Because experiments use random assignment, which tends to balance lurking variables across the groups, a well-designed experiment can provide evidence of causation. An observational study can show association, but not causation, no matter how strong.

Samples also have to be chosen with care. A simple random sample (SRS) of size n is a sample in which every group of n individuals in the population has an equal chance of being selected. To take an SRS of 60 from 1,200 students, number the students 1 to 1,200, generate random numbers in that range, and select the students with those numbers, skipping repeats, until you have 60. A stratified random sample first divides the population into homogeneous groups called strata, such as the four grades, and then takes an SRS from each stratum. With 300 students per grade, selecting 15 from each grade gives 60 in all, with every grade represented. A cluster sample divides the population into groups called clusters, such as homerooms, randomly selects some clusters, and surveys every individual in the chosen clusters. Randomly selecting 6 homerooms and surveying all their students is a cluster sample. Clusters should be mini-versions of the whole population, whereas strata should be groups that differ from each other.

Each method has uses. Stratified sampling guarantees the representation of each group and can reduce variability if the strata differ from each other. Cluster sampling is cheaper and easier when a list of individuals is not available, but it can be less precise. A simple random sample can, by chance, include no one from one grade.
`,
  ],
  cards: [
    ["Lurking variable", "A variable not included in the study that affects the variables studied and can explain an association."],
    ["Confounding", "When the effects of two variables on a response cannot be separated."],
    ["Observational study", "Researchers observe and measure, but do not impose treatments."],
    ["Experiment", "Researchers impose treatments on individuals, ideally with random assignment, and observe the response."],
    ["Simple random sample", "Every group of n individuals has an equal chance of being selected."],
    ["Stratified random sample", "Divide into strata, then take an SRS from each stratum."],
    ["Cluster sample", "Randomly select clusters and survey every individual in the selected clusters."],
    ["Only experiments support causation", "Random assignment balances lurking variables, so a significant difference can be attributed to the treatment."],
  ],
  closed: [
    [
      "Monthly ice cream sales and the number of drownings are positively correlated. Which is the best explanation?",
      [
        "A lurking variable, hot weather, may affect both",
        "Ice cream consumption causes drowning",
        "Drowning causes people to buy ice cream",
        "The correlation must be a calculation error",
      ],
      "A",
    ],
    [
      "Researchers randomly assign 60 students to sleep 6 hours or 9 hours for a week and compare their test scores. This is which kind of study?",
      ["An observational study", "An experiment", "A sample survey", "A census"],
      "B",
    ],
    [
      "A school has 1,200 students. Which describes a simple random sample of 50 of them?",
      [
        "Surveying the first 50 students who arrive on the bus",
        "Selecting 5 students from each homeroom",
        "Every possible group of 50 students has the same chance of being selected",
        "Choosing the 50 students with the highest GPAs",
      ],
      "C",
    ],
    [
      "A principal separates the students by grade and randomly selects 25 students from each grade. This is which kind of sample?",
      ["A simple random sample", "A cluster sample", "A systematic sample", "A stratified random sample"],
      "D",
    ],
    [
      "A researcher randomly selects 6 of the 48 homerooms and surveys every student in those homerooms. This is which kind of sample?",
      ["A stratified random sample", "A cluster sample", "A simple random sample", "A convenience sample"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A survey of 500 Columbus high school students found that those who eat breakfast every day have a higher mean GPA than those who do not. (a) Is this an observational study or an experiment? Explain. (b) Can we conclude that eating breakfast causes a higher GPA? Explain. (c) Describe a lurking variable that could explain the association. (d) Briefly describe how an experiment could provide stronger evidence.",
      scheme: [
        "Identifies the study as observational, since students chose whether to eat breakfast and no treatment was imposed",
        "Says we cannot conclude that breakfast causes higher GPAs, since association does not imply causation",
        "Describes a plausible lurking variable, such as family resources, sleep or a stable routine, that could affect both breakfast and GPA",
        "Describes an experiment: randomly assign students to eat or not eat breakfast, so random assignment balances lurking variables",
      ],
      model:
        "(a) This is an observational study, because the students decided for themselves whether to eat breakfast, and the researchers only recorded it and the GPAs. (b) No. The study shows an association but not that breakfast causes higher GPAs; there may be other explanations. (c) A lurking variable such as family resources or a stable home routine could influence both whether a student eats breakfast and the student's GPA. (d) An experiment would randomly assign students to eat a provided breakfast or not for a semester and compare the mean GPAs. Random assignment would tend to balance lurking variables like family resources between the groups, so a difference could be attributed to breakfast.",
      answers: [
        [
          "full",
          "(a) [[0|It's an observational study because the researchers didn't assign who eats breakfast, the students chose.]] (b) [[1|No, we can't conclude breakfast causes higher GPAs. It's an association, and association isn't causation.]] (c) [[2|A lurking variable could be family income or a regular routine, since families with more resources might provide breakfast and also support better grades.]] (d) [[3|You could randomly assign students to get breakfast or not, and since it's random, the lurking variables would be spread evenly between the groups, so a difference in GPA could be blamed on breakfast.]]",
          "Full marks. Your final sentence explains why random assignment allows a causal conclusion.",
        ],
        [
          "full",
          "(a) [[0|Observational: no treatment was imposed, students were just observed doing what they normally do]]. (b) [[1|We cannot conclude causation from an observational study, only that breakfast and GPA are associated]]. (c) [[2|Hours of sleep might be a lurking variable: students who sleep well have time for breakfast and also perform better in school]]. (d) [[3|In an experiment you would randomly assign some students to eat breakfast and others not to, and compare GPAs. The random assignment makes the groups similar in sleep and other factors]].",
          "All four marks. Choosing sleep as the lurking variable gives a believable link to both breakfast and grades.",
        ],
        [
          "partial",
          "(a) [[0|It's an observational study because students chose.]] (b) Yes, it shows that breakfast causes better grades since the difference is big. (c) A lurking variable could be sleep.",
          "Your first part is right and sleep is a good lurking variable. However, a big difference in an observational study still does not show causation, since lurking variables like sleep could explain the difference.",
        ],
        [
          "partial",
          "[[1|We can't say breakfast causes higher GPA.]] [[3|An experiment with random assignment would be stronger.]]",
          "Both statements are right. Also identify the study as observational, because the students chose whether to eat breakfast, and name a specific lurking variable, such as family resources or sleep.",
          true,
        ],
        [
          "weak",
          "It's an experiment because they collected data. Breakfast does cause better grades because the students who eat it have higher GPAs.",
          "Collecting data does not make a study an experiment: an experiment imposes treatments. Here students chose, so it is observational, and the association does not prove causation.",
        ],
        [
          "weak",
          "[[0|It's observational.]] A lurking variable is the GPA because it's the thing we're measuring.",
          "A lurking variable is a third variable, not one of the two being studied. GPA and breakfast are the variables in the association, so a lurking variable has to be something else, like sleep.",
        ],
      ],
    },
    {
      prompt:
        "A high school has 1,200 students, 300 in each of grades 9 through 12. The student council wants a sample of 60 students. (a) Describe how to select a simple random sample of 60 students. (b) Describe how to select a stratified random sample of 60 students using grade as the strata. (c) Give one advantage of the stratified sample over the simple random sample.",
      scheme: [
        "Describes an SRS: number the students 1 to 1,200, use a random number generator, and select 60 different numbers",
        "Describes the stratified sample: take a simple random sample of 15 students from each of the four grades",
        "States an advantage, such as guaranteeing that each grade is represented in the proportions of the population",
        "Explains that an SRS could by chance include too few students from a grade, and stratifying can reduce variability if grades differ in their opinions",
      ],
      model:
        "(a) Number the students from 1 to 1,200. Use a random number generator to choose integers from 1 to 1,200, ignoring repeats, until 60 different students are chosen. (b) Separate the students by grade, so each stratum has 300 students. Number the students in each grade 1 to 300 and use a random number generator to select an SRS of 15 students from each grade, for 60 in all. (c) The stratified sample guarantees that each grade is represented equally, matching the population. A simple random sample might, by chance, include very few students from one grade. If opinions differ between grades, a stratified sample also reduces the variability of estimates.",
      answers: [
        [
          "full",
          "(a) [[0|Give every student a number from 1 to 1,200, use a random number generator to choose 60 different numbers in that range, and those 60 students are the sample.]] (b) [[1|Split the students by grade, 300 each, and take a simple random sample of 15 from each grade.]] (c) [[2|The stratified sample makes sure each grade is represented the right amount.]] [[3|An SRS could, just by chance, get too few from one grade, and if the grades have different opinions that would give a bad estimate, but stratifying avoids that.]]",
          "Full marks. Your reason in (c) names the specific risk that an SRS has.",
        ],
        [
          "full",
          "(a) [[0|Label the 1,200 students 0001 to 1200, generate random numbers, ignore numbers outside the range and repeats, and keep going until 60 students are chosen]]. (b) [[1|The grades are the strata. Number the 300 students in each grade, randomly select 15 from each, and combine them for 60]]. (c) [[2|With stratifying you are certain to have 15 students from every grade, so no grade is left out or over-represented]]. [[3|In an SRS the grade counts would vary by chance, and if freshmen and seniors answer differently, that adds variability the stratified plan removes]].",
          "All four marks. Linking the advantage to the case where strata differ is the reason stratifying helps.",
        ],
        [
          "partial",
          "(a) [[0|Number the students and use random numbers to pick 60.]] (b) Pick the first 15 students in each grade. (c) It's better because it includes everyone.",
          "Part (a) is right. In (b), each stratum needs a random selection of 15, not the first 15. And a sample cannot include everyone, but a stratified sample does guarantee every grade is represented.",
        ],
        [
          "partial",
          "[[1|Take a random sample of 15 from each grade.]] [[2|Each grade will be represented.]] (a) Ask 60 students in the cafeteria.",
          "Your stratified plan and its advantage are right. Asking students in the cafeteria is a convenience sample, not an SRS. For an SRS number all 1,200 students and choose 60 random numbers.",
          true,
        ],
        [
          "weak",
          "(a) Pick every 20th student on the list. (b) Pick every 5th student in each grade. (c) It's less work.",
          "Taking every 20th student is a systematic sample, not a simple random sample. A stratified sample needs a random selection within each grade, and its advantage is representation, not less work.",
        ],
        [
          "weak",
          "[[0|Number the students 1 to 1,200 and randomly pick 60.]] A stratified sample is the same thing as an SRS because both are random.",
          "Your SRS plan is right. A stratified sample is different: it first splits the population into strata and takes an SRS in each, which controls how many come from each group.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Unit 3: Bias in surveys and the design of experiments",
  note: `
## Objectives

Students will be able to:

1. identify sources of bias in a survey;
2. design an experiment with random assignment, a control group and blinding, and explain the purpose of each.

## Materials

Slips of paper for random assignment, a bag for drawing, example surveys on cards, whiteboards, the worksheet. All examples are original.

## Starter (8 minutes)

Hand out three poll questions about school lunch, each worded differently: "Do you like the new lunch menu?", "Do you agree that the terrible new lunch menu should be replaced?" and "Do you think the lunch menu is healthier now?" Ask students to predict how each wording changes the answers and name the effect.

## Main activity

1. Sources of bias: undercoverage, voluntary response, nonresponse and response bias (including wording). Sort sample surveys on cards into these categories.
2. Why a larger sample does not fix bias, using an online poll of 3,200 responses.
3. Experiment design: treatments, experimental units, response variable, random assignment, control group, blinding and replication. Design a completely randomized experiment on a 10-minute walk before a quiz.
4. Write the full plan, as a free-response answer, including how random assignment is carried out.

## Checking for understanding

Free-response style: "Why is random assignment used? Why is a control group used?"

## Worksheet

Collect the worksheet at the end of class.
`,
  reading: [
    "Where surveys go wrong, and how to design an experiment well",
    `
A survey has bias when its design systematically favors some outcomes. There are several common sources. Undercoverage occurs when some part of the population has little or no chance of being selected, as with a phone survey that dials only landlines and misses most young adults. Voluntary response bias occurs when individuals choose whether to take part, as in a call-in or online poll, which tends to attract people with strong opinions. Nonresponse bias occurs when selected individuals cannot be reached or refuse to answer, and may differ from those who respond. Response bias occurs when answers are inaccurate because of the way questions are asked, such as leading or loaded wording ("Do you agree that the dangerous new bike lanes should be removed?") or because respondents want to give an answer that looks good.

A bigger sample does not cure bias. A news website runs an online poll, "Should Columbus build a new downtown stadium?", and 3,200 people respond, 78% saying yes. This is voluntary response bias: people chose to respond, so the sample is likely to over-represent people with strong views and with access to that website. The result cannot be generalized to all Columbus residents, no matter how many respond. A better design is a simple random sample of residents, with follow-ups to reduce nonresponse.

An experiment is designed to show whether a treatment causes a change in a response. The experimental units are the individuals the treatments are applied to, the treatments are the conditions imposed, and the response variable is what is measured. Three principles guide the design. Random assignment uses chance to decide which units get which treatment, so that the groups are roughly equivalent before treatment, balancing known and unknown lurking variables. A control group, which receives no treatment or a placebo, gives a baseline against which to compare. Blinding keeps the subjects (single-blind) or both the subjects and those measuring the response (double-blind) from knowing who gets which treatment, so that expectations do not influence the outcome. Replication means using enough experimental units so that chance differences are small.

Here is a design. A teacher wants to know whether a 10-minute walk before a quiz improves scores, using 40 volunteers. Write the names on slips, mix them in a bag and draw 20 for the walking group, while the other 20 form the control group, which stays seated for 10 minutes. Everyone takes the same quiz in the same room, and the quiz is scored by someone who does not know which group each student is in. Then compare the mean scores of the two groups. Because assignment was random, a large difference in the mean scores is evidence that the walk caused the difference. Note that volunteers limit generalization to all students.
`,
  ],
  cards: [
    ["Undercoverage", "Some part of the population has little or no chance of being included."],
    ["Voluntary response bias", "Individuals choose whether to respond. Tends to over-represent strong opinions."],
    ["Nonresponse bias", "Selected individuals cannot be reached or refuse, and differ from those who respond."],
    ["Response bias", "Inaccurate answers due to wording, the interviewer or a wish to please."],
    ["Random assignment", "Using chance to assign units to treatments so groups are roughly equivalent."],
    ["Control group", "The group that gets no treatment or a placebo, giving a baseline for comparison."],
    ["Blinding", "Keeping subjects (and evaluators) from knowing who receives which treatment."],
    ["Replication", "Using enough experimental units that the chance variation between groups is small."],
  ],
  closed: [
    [
      "A television station asks viewers to call in to vote on a city issue. This is most clearly an example of",
      [
        "Undercoverage",
        "Nonresponse bias",
        "Voluntary response bias",
        "A random sample",
      ],
      "C",
    ],
    [
      "A survey of Columbus adults is conducted by calling only landline telephones. Which source of bias is most likely?",
      ["Undercoverage", "Response bias", "Voluntary response bias", "Replication"],
      "A",
    ],
    [
      "The question, \"Do you agree that the dangerous new bike lanes should be removed?\" is most likely to cause which problem?",
      [
        "Undercoverage",
        "Nonresponse bias",
        "Voluntary response bias",
        "Response bias from the wording",
      ],
      "D",
    ],
    [
      "What is the main purpose of a control group in an experiment?",
      [
        "To make the sample larger",
        "To provide a baseline for comparison with the treatment group",
        "To make sure subjects know their treatment",
        "To eliminate all variation",
      ],
      "B",
    ],
    [
      "What is the main purpose of random assignment in an experiment?",
      [
        "To make the study an observational study",
        "To ensure that the results can be generalized to a population",
        "To create treatment groups that are roughly equivalent, balancing lurking variables",
        "To make the subjects blind to the treatments",
      ],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A teacher thinks a 10-minute walk before a quiz may improve students' scores. Forty students volunteer to participate. Describe a completely randomized experiment to test this, including the treatments, how you would carry out random assignment, how you would use a control group and blinding, and how you would compare the results.",
      scheme: [
        "Identifies the two treatments (a 10-minute walk, or 10 minutes seated as the control) and the response variable (quiz score)",
        "Describes random assignment with a specific method, such as drawing 20 of the 40 names from a bag for the walk group",
        "Describes the control and standardization (same quiz, room and time) and blinding of the person scoring the quizzes",
        "Describes the comparison of the mean scores and states that random assignment allows a conclusion about cause, limited to volunteers like these",
      ],
      model:
        "The treatments are a 10-minute walk before the quiz and, for the control group, 10 minutes seated. The response variable is the quiz score. Write the 40 names on identical slips, mix them in a bag and draw 20: those students are assigned to the walk group, and the other 20 are the control group, which sits quietly for 10 minutes. Both groups take the same quiz in the same room at the same time of day, and the quizzes are scored by someone who does not know which group each student was in, so that scoring is blind. Compare the mean quiz scores of the two groups. Because the assignment was random, a difference larger than chance would produce is evidence that the walk caused the difference, although this applies only to volunteers like these.",
      answers: [
        [
          "full",
          "[[0|The treatments are walking for 10 minutes or sitting for 10 minutes (the control), and the response is the quiz score.]] [[1|Put each of the 40 names on a slip, mix them in a bag, and draw 20 names for the walking group. The other 20 are the control.]] [[2|Everybody takes the same quiz in the same room, and the person grading doesn't know who walked, which is blinding.]] [[3|Compare the mean score of each group. Since we used random assignment, a big difference would be evidence that walking caused it, for students like the volunteers.]]",
          "Full marks. Naming a concrete method for the random assignment, drawing slips from a bag, is the detail the exam wants.",
        ],
        [
          "full",
          "Treatments: [[0|walk 10 min (treatment) vs sit 10 min (control); response variable: quiz score]]. Random assignment: [[1|number the volunteers 1 to 40, use a random number generator to pick 20 different numbers for the walking group, and the rest are the control group]]. Control and blinding: [[2|same quiz, same time and room for everyone, and the scorer doesn't know the groups, so there's no scoring bias]]. Comparison: [[3|calculate and compare the two mean scores. With random assignment a large difference supports the walk causing improvement, but it only applies to volunteers like these students]].",
          "All four marks. Saying that the conclusion only applies to volunteers like these students is a correct limit on the scope.",
        ],
        [
          "partial",
          "[[0|The treatments are a walk or no walk and the response is the quiz score.]] [[1|Randomly assign 20 students to walk.]] Compare the groups and if the walkers did better then walking works.",
          "Your treatments and random assignment are right. Add how you would compare the groups (mean scores), the control and blinding details, and that the result applies to students like the volunteers.",
        ],
        [
          "partial",
          "[[2|Give the same quiz to everyone under the same conditions, and have someone who doesn't know who walked score it.]] [[3|Compare the mean scores of the groups.]]",
          "Your standardization, blinding and comparison are right. State the treatments and the response variable, and describe how the 40 students are assigned at random to the two groups.",
          true,
        ],
        [
          "weak",
          "Let the students pick if they want to walk or not, then compare their scores. The ones who walked are the treatment group.",
          "If students choose, the groups might differ in other ways, such as motivation, and the study would be observational. The experimenter must assign the groups at random.",
        ],
        [
          "weak",
          "[[1|Draw 20 names out of a bag to walk.]] The walkers all take a harder quiz so we can see the difference.",
          "Your random assignment is right. Giving the groups different quizzes would confuse the comparison. Both groups need the same quiz, so that any difference can be attributed to the walk.",
        ],
      ],
    },
    {
      prompt:
        "A local news website posts an online poll: \"Should Columbus build a new downtown stadium?\" Of the 3,200 people who respond, 78% say yes. (a) Name the type of bias most likely to affect this poll. (b) Explain why the result may not represent all Columbus residents. (c) Explain why a larger number of responses would not fix the problem. (d) Describe a better way to estimate the opinion of Columbus residents.",
      scheme: [
        "Names voluntary response bias",
        "Explains that respondents chose to respond, so the sample probably over-represents people with strong feelings or who use the website, and so may differ from all residents",
        "Explains that more responses from the same self-selected group do not remove the bias, since bias is not reduced by sample size",
        "Describes a better method, such as a simple random sample of Columbus residents contacted directly, with follow-up to reduce nonresponse",
      ],
      model:
        "(a) Voluntary response bias. (b) The people who answered chose to do so. They are likely to be those with strong opinions or regular readers of that website, and may not be representative of all Columbus residents, so the 78% may be quite different from the true proportion. (c) A larger sample drawn in the same self-selected way has the same bias: the extra responses come from the same kind of people. Bias is a systematic error that does not shrink as the sample grows. (d) Take a simple random sample of Columbus residents, for example choosing addresses at random from a list of households, and contact them by phone, mail or in person, following up with those who do not respond.",
      answers: [
        [
          "full",
          "(a) [[0|Voluntary response bias.]] (b) [[1|People chose to respond, and those with strong feelings or who read that website are more likely to answer, so they may not be like the rest of Columbus.]] (c) [[2|More responses from the same self-selected group still have the same bias. A bigger sample size doesn't fix bias, it just makes the biased answer more precise.]] (d) [[3|Take a simple random sample of Columbus residents, such as random addresses, contact them directly and follow up with the ones who don't respond.]]",
          "Full marks. 'More precise but still biased' is a very good way of saying why size does not fix bias.",
        ],
        [
          "full",
          "(a) [[0|It's voluntary response bias since it's a poll where people choose to participate]]. (b) [[1|Only people who saw the poll and cared enough to click answered, usually with strong opinions, so the 78% isn't necessarily the proportion of all residents]]. (c) [[2|Bias is systematic. Having 3,200 or 30,000 self-selected responses doesn't change the fact that the sample is not representative]]. (d) [[3|A random sample of residents, say randomly chosen households from a city list, contacted with several attempts to reduce nonresponse]].",
          "All four marks. Mentioning multiple attempts to reach people addresses nonresponse bias in the new design.",
        ],
        [
          "partial",
          "(a) [[0|Voluntary response bias.]] (b) The sample might not be representative. (c) 3,200 is a large sample so the result is reliable. (d) Take a random sample of residents.",
          "Your bias name and your plan are right. A large sample does not make a biased sample reliable. The bias comes from how the sample was chosen, not from its size.",
        ],
        [
          "partial",
          "[[2|A bigger sample from the same poll would still be biased.]] [[3|A better way is a random sample of residents.]]",
          "Those parts are right. Name the type of bias, voluntary response bias, and explain why it makes the result unrepresentative: people chose whether to respond, and those who respond tend to have strong opinions.",
          true,
        ],
        [
          "weak",
          "(a) Undercoverage. (b) It isn't a random sample. (c) It would work if more people responded. (d) Make the poll longer.",
          "Undercoverage is when part of the population cannot be included. Here people chose to respond, which is voluntary response bias, and a larger or longer poll of this kind does not fix it.",
        ],
        [
          "weak",
          "[[0|It's voluntary response bias.]] The poll is fine because 3,200 is a big sample, so 78% of Columbus supports the stadium.",
          "Your name for the bias is right, but you cannot generalize a voluntary response poll to all residents, however large. The 78% describes only the people who responded.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Unit 4: Probability rules, conditional probability and independence",
  note: `
## Objectives

Students will be able to:

1. use the rules of probability, including the addition and multiplication rules and the complement rule;
2. calculate conditional probability from a two-way table and decide whether two events are independent.

## Materials

Two-way table handouts, coins and dice for checking, whiteboards, the quiz. All data are original.

## Starter (8 minutes)

Ask: "Is the probability that a student rides the bus the same whether or not the student is an athlete?" Hand out a table of 200 students by bus use and athlete status. Ask for P(bus) and then P(bus given athlete). Students see that the two probabilities differ and are ready for the idea of independence as "knowing one event does not change the probability of the other."

## Main activity

1. The rules: complement, addition (general and mutually exclusive) and multiplication (general and independent).
2. Conditional probability: P(B given A) = P(A and B)/P(A). Compute from a two-way table.
3. Independence: events A and B are independent if P(A given B) = P(A), equivalently P(A and B) = P(A)P(B). Test it with a table.
4. Mutually exclusive versus independent: they are different ideas.
5. At least one: use the complement. A basketball player with a 70% free-throw percentage and three shots.

## Checking for understanding

Free-response style: "Are the events 'rides the bus' and 'is an athlete' independent? Justify with probabilities."

## Quiz

Give the quiz in the last ten minutes.
`,
  reading: [
    "Rules for combining probabilities, and what independence means",
    `
Probability measures how likely an event is, from 0 to 1. The complement rule says P(not A) = 1 - P(A). The addition rule says P(A or B) = P(A) + P(B) - P(A and B), where the subtraction avoids counting the overlap twice. If A = 0.4, B = 0.3 and P(A and B) = 0.1, then P(A or B) = 0.4 + 0.3 - 0.1 = 0.6. When events are mutually exclusive, they cannot happen together, so P(A and B) = 0 and P(A or B) = P(A) + P(B).

The multiplication rule says P(A and B) = P(A) times P(B given A). The conditional probability P(B given A) = P(A and B)/P(A) is the probability of B when we know A occurred. Two events are independent if knowing that one occurred does not change the probability of the other: P(B given A) = P(B). Then the multiplication rule simplifies to P(A and B) = P(A)P(B). If 30% of students wear glasses and 10% are left-handed, and the two are independent, then P(both) = 0.30 x 0.10 = 0.03. Mutually exclusive and independent are different ideas. Events with positive probability that are mutually exclusive are never independent, since if one occurs, the other cannot: for A = 0.3 and B = 0.4 mutually exclusive, P(A or B) = 0.7, but P(A and B) = 0, which is not 0.3 x 0.4 = 0.12, so they are not independent.

A two-way table makes conditional probability concrete. Among 200 students, 30 ride the bus and are athletes, 90 ride the bus and are not athletes, 40 do not ride the bus and are athletes, and 40 neither ride the bus nor are athletes. The probability P(bus) = 120/200 = 0.60. The joint probability P(bus and athlete) = 30/200 = 0.15. The conditional probability P(athlete given bus) = 30/120 = 0.25, found by restricting to the 120 bus riders. Compare with P(athlete) = 70/200 = 0.35. Since 0.25 is not equal to 0.35, the events are not independent: bus riders are less likely to be athletes than students overall. You can check the multiplication rule too: P(bus)P(athlete) = 0.6 x 0.35 = 0.21, not 0.15.

For "at least one" problems, use the complement. A player makes 70% of free throws, independently. The probability that she makes all 3 is 0.7^3 = 0.343. The probability she misses at least one is 1 - 0.343 = 0.657. The probability of exactly two makes is 3 x 0.7^2 x 0.3 = 0.441, with the 3 counting which shot is missed. The probability of at least one head in 4 flips of a fair coin is 1 - (1/2)^4 = 15/16, or 0.9375. State the independence assumption when you multiply.
`,
  ],
  cards: [
    ["Complement rule", "P(not A) = 1 - P(A)."],
    ["Addition rule", "P(A or B) = P(A) + P(B) - P(A and B)."],
    ["Mutually exclusive", "Events that cannot both occur, so P(A and B) = 0."],
    ["Conditional probability", "P(B given A) = P(A and B)/P(A)."],
    ["Independent events", "P(B given A) = P(B), which means P(A and B) = P(A)P(B)."],
    ["Multiplication rule", "P(A and B) = P(A)P(B given A). For independent events, P(A)P(B)."],
    ["Mutually exclusive is not independent", "Mutually exclusive events with positive probabilities are always dependent."],
    ["At least one", "Use the complement: 1 minus the probability that none occurs."],
  ],
  closed: [
    [
      "For events A and B, P(A) = 0.4, P(B) = 0.3 and P(A and B) = 0.1. What is P(A or B)?",
      ["0.7", "0.12", "0.6", "0.4"],
      "C",
    ],
    [
      "In a class, 30% of the students wear glasses and 10% are left-handed. If the two characteristics are independent, what proportion are both?",
      ["0.40", "0.03", "0.30", "0.13"],
      "B",
    ],
    [
      "P(A) = 0.4 and P(A and B) = 0.12. What is P(B given A)?",
      ["0.3", "0.48", "0.12", "0.52"],
      "A",
    ],
    [
      "Events A and B are mutually exclusive, with P(A) = 0.3 and P(B) = 0.4. Which statement is true?",
      [
        "P(A or B) = 0.7 and the events are independent",
        "P(A or B) = 0.58 and the events are independent",
        "P(A or B) = 0.12 and the events are mutually exclusive",
        "P(A or B) = 0.7 and the events are not independent",
      ],
      "D",
    ],
    [
      "A fair coin is flipped 4 times. What is the probability of at least one head?",
      ["0.0625", "0.5", "0.9375", "0.75"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Among 200 students at a school, 30 ride the bus and are athletes, 90 ride the bus and are not athletes, 40 do not ride the bus and are athletes, and 40 neither ride the bus nor are athletes. (a) Find the probability that a randomly selected student rides the bus and is an athlete. (b) Find the probability that a randomly selected student who rides the bus is an athlete. (c) Are riding the bus and being an athlete independent? Justify your answer with probabilities.",
      scheme: [
        "Finds P(bus and athlete) = 30/200 = 0.15",
        "Finds P(athlete given bus) = 30/120 = 0.25, restricting to the 120 bus riders",
        "Finds P(athlete) = 70/200 = 0.35 for comparison",
        "Concludes the events are not independent, because P(athlete given bus) = 0.25 does not equal P(athlete) = 0.35",
      ],
      model:
        "(a) P(bus and athlete) = 30/200 = 0.15. (b) Among the 120 bus riders (30 + 90), 30 are athletes, so P(athlete given bus) = 30/120 = 0.25. (c) P(athlete) = (30 + 40)/200 = 70/200 = 0.35. If the events were independent, P(athlete given bus) would equal P(athlete). Since 0.25 is not equal to 0.35, riding the bus and being an athlete are not independent: bus riders are less likely to be athletes than students overall.",
      answers: [
        [
          "full",
          "(a) [[0|30 out of 200 students are both, so P = 30/200 = 0.15.]] (b) [[1|There are 30 + 90 = 120 bus riders and 30 of them are athletes, so P(athlete given bus) = 30/120 = 0.25.]] (c) [[2|The overall probability of an athlete is 70/200 = 0.35.]] [[3|If they were independent, P(athlete given bus) would equal P(athlete), but 0.25 is not equal to 0.35, so they are not independent.]]",
          "Full marks. You used the reduced group of bus riders for the conditional probability, which is the key step.",
        ],
        [
          "full",
          "(a) [[0|P(bus and athlete) = 30/200 = 0.15]]. (b) [[1|Restrict to the bus riders: 120 of them, and 30 are athletes, so 30/120 = 0.25]]. (c) Check independence by comparing: [[2|P(athlete) = 70/200 = 0.35]]. [[3|The conditional probability 0.25 differs from the unconditional probability 0.35. So knowing a student rides the bus changes the chance of being an athlete, and the events aren't independent. (Check: 0.6 x 0.35 = 0.21, not 0.15)]].",
          "All four marks. The extra check with the multiplication rule gives a second justification.",
        ],
        [
          "partial",
          "(a) [[0|30/200 = 0.15.]] (b) P(athlete given bus) = 30/200 = 0.15. (c) They're not independent because the numbers are different.",
          "Part (a) is right. For (b), a conditional probability uses only the bus riders as the denominator: 30/120 = 0.25. And (c) needs the comparison with P(athlete) = 0.35.",
        ],
        [
          "partial",
          "[[1|(b) 30/120 = 0.25.]] [[3|(c) Not independent since 0.25 isn't equal to the overall chance of being an athlete.]]",
          "Your conditional probability and conclusion are right. Give the number for P(athlete), 70/200 = 0.35, in (c), and answer (a), 30/200 = 0.15.",
          true,
        ],
        [
          "weak",
          "(a) 30. (b) 30/40. (c) They are independent because both are in the table.",
          "A probability is a proportion of the total: 30 out of 200. And being in a table does not make events independent. Independence means that knowing one event does not change the probability of the other.",
        ],
        [
          "weak",
          "[[0|(a) 30/200 = 0.15.]] (c) They're independent because P(bus and athlete) is greater than 0, so they overlap.",
          "Overlap does not mean independence. Independent events satisfy P(A and B) = P(A)P(B): here 0.6 x 0.35 = 0.21, which is not 0.15, so they are not independent.",
        ],
      ],
    },
    {
      prompt:
        "A basketball player makes 70% of her free throws. Assume her shots are independent. (a) What is the probability that she makes all three of three free throws? (b) What is the probability that she misses at least one? (c) What is the probability that she makes exactly two? (d) Explain why the independence assumption is needed and whether it is reasonable.",
      scheme: [
        "Finds P(all three) = 0.7 x 0.7 x 0.7 = 0.343, using the multiplication rule for independent events",
        "Finds P(at least one miss) = 1 - 0.343 = 0.657, using the complement rule",
        "Finds P(exactly two) = 3(0.7)^2(0.3) = 0.441, with 3 ways to choose which shot is missed",
        "States that independence is needed to multiply probabilities, and comments on whether it is reasonable (for example, fatigue or confidence could make shots dependent)",
      ],
      model:
        "(a) Since the shots are independent, P(all three) = 0.7 x 0.7 x 0.7 = 0.343. (b) Missing at least one is the complement of making all three, so P = 1 - 0.343 = 0.657. (c) Exactly two makes means one miss, which can happen in 3 ways (the miss on the first, second or third shot), each with probability 0.7 x 0.7 x 0.3 = 0.147, so P = 3(0.147) = 0.441. (d) Independence is needed to multiply the probabilities of the individual shots. It is only approximately reasonable: shots might depend on each other if fatigue or confidence changes her percentage during the sequence.",
      answers: [
        [
          "full",
          "(a) [[0|If the shots are independent I multiply: 0.7 x 0.7 x 0.7 = 0.343.]] (b) [[1|Missing at least one is the complement of making all three, so 1 - 0.343 = 0.657.]] (c) [[2|One miss and two makes: the probability of one arrangement is 0.7 x 0.7 x 0.3 = 0.147, and there are 3 places for the miss, so 3 x 0.147 = 0.441.]] (d) [[3|We need independence to multiply the probabilities. It might not be completely reasonable because a player could get tired or get more confident, which would change her chances.]]",
          "Full marks. Counting the 3 arrangements for exactly two makes is the step that makes part (c) correct.",
        ],
        [
          "full",
          "(a) [[0|P(MMM) = (0.7)^3 = 0.343 by the multiplication rule for independent events]]. (b) [[1|P(at least 1 miss) = 1 - P(no misses) = 1 - 0.343 = 0.657]]. (c) [[2|The patterns MMX, MXM, XMM each have probability (0.7)^2(0.3) = 0.147, so P(exactly 2) = 3 x 0.147 = 0.441]]. (d) [[3|The multiplication rule for this simple form requires independence. It's a decent assumption but not perfect, since a miss might shake her confidence for the next shot]].",
          "All four marks. Listing the patterns shows exactly where the 3 comes from.",
        ],
        [
          "partial",
          "(a) [[0|0.7^3 = 0.343.]] (b) [[1|1 - 0.343 = 0.657.]] (c) 0.7 x 0.7 x 0.3 = 0.147. (d) The shots are independent.",
          "Parts (a) and (b) are right. In (c), the miss can come on any of the three shots, so multiply by 3 to get 0.441. In (d), explain why independence is needed and whether it is reasonable.",
        ],
        [
          "partial",
          "[[2|(c) 3 x 0.7^2 x 0.3 = 0.441.]] [[3|(d) Independence is needed to multiply, but a player's shots may depend on fatigue.]]",
          "Parts (c) and (d) are right. Show (a), 0.7^3 = 0.343, and (b), the complement 1 - 0.343 = 0.657.",
          true,
        ],
        [
          "weak",
          "(a) 0.7 + 0.7 + 0.7 = 2.1. (b) 1 - 2.1 = -1.1. (c) 0.7 x 2 = 1.4.",
          "A probability can never be above 1 or below 0, which signals a mistake. For independent events, multiply the probabilities: 0.7 x 0.7 x 0.7 = 0.343.",
        ],
        [
          "weak",
          "[[0|(a) 0.7 x 0.7 x 0.7 = 0.343.]] (b) The probability of missing is 0.3, so at least one miss is 0.3 x 3 = 0.9.",
          "Part (a) is right. At least one miss is the complement of making all three: 1 - 0.343 = 0.657. Multiplying 0.3 by 3 adds up overlapping cases and can overcount.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Statistical practices: writing conclusions and reading technology output",
  note: `
## Objectives

Students will be able to:

1. write a conclusion that interprets a result in context and states the reasoning;
2. use technology to compute statistics and explain the output.

## Materials

Graphing handhelds, printed computer regression output, a scoring checklist for communication, whiteboards, the problem set. All data are original.

## Starter (8 minutes)

Show a statistical conclusion written without context: "The slope is 2.41 and R-squared is 81.3%." Ask students to rewrite it so that a school principal could understand it. Emphasize the three components of an AP-quality answer: the statistic with units, the variables in context, and the reasoning or the condition that justifies the statement.

## Main activity

1. Read a regression output: the constant, the coefficient for hours, S and R-Sq. Write the equation, interpret the slope, S and R-Sq in context, and make a prediction while checking that x is within the range of the data.
2. Parameters and statistics: identify the population, sample, parameter and statistic in a study of bike ownership, and explain what sampling variability means.
3. Practice writing: three sentences that say what the statistic means, what it does not mean, and what condition supports the claim.

## Checking for understanding

Peer scoring: trade answers, score for context, units and justification, and write one improvement.

## Problem set

Collect the problem set at the next class.
`,
  reading: [
    "Making statistics speak: context, units and justification",
    `
Computing a statistic is only half of statistics. The other half is saying what it means in the situation, with the units, and giving the reasoning that supports your claim. Technology computes the numbers, and you explain them. Suppose a statistics class collects data on the number of hours per week that 15 students study (from 2 to 12 hours) and their scores on the final exam. The regression output reads: Constant 38.52, Hours 2.41, S = 4.12, R-Sq = 81.3%.

From the output, the regression equation is y-hat = 38.52 + 2.41x, where x is hours of study per week and y-hat is the predicted final exam score. The slope means that for each additional hour of study per week, the predicted final exam score increases by about 2.41 points. The constant means that a student who studies 0 hours a week is predicted to score 38.52, but 0 hours is outside the data range of 2 to 12 hours, so this is extrapolation and shouldn't be taken literally. S = 4.12 is the standard deviation of the residuals: the actual exam scores typically differ from the predicted scores by about 4.12 points. R-Sq = 81.3% means that about 81.3% of the variation in final exam scores is accounted for by the linear relationship with hours of study. Do not say that studying 'causes' 81.3% of the grade. To predict, put in x = 10: 38.52 + 24.1 = 62.62, so about 62.6 points. Since 10 is within the range from 2 to 12, this is an interpolation and reasonable.

Another core skill is to distinguish what is measured from what is estimated. A random sample of 150 students from a university of about 60,000 finds that 96 own a bike, so the sample proportion is 96/150 = 0.64. The population is all students at the university, and the sample is the 150 selected. The parameter is the true proportion of all students who own a bike, which is unknown, and the statistic is the sample proportion, 0.64. The statistic is used to estimate the parameter, but they are generally not equal. A different random sample of 150 would likely give a different proportion, which is called sampling variability. Because the sample is random, there is no systematic bias, and it makes sense to use the 0.64 as an estimate of the parameter for all students, understanding that it is only an estimate.

A strong written answer follows a pattern: it states the claim in context with units, it names the evidence from the output or the design, and it notes a limit such as extrapolation, correlation not implying causation, or the group of individuals to which the result applies.
`,
  ],
  cards: [
    ["Regression equation from output", "The constant is the intercept and the coefficient of x is the slope: y-hat = constant + slope(x)."],
    ["S in regression output", "The typical size of the residuals: how far actual values typically are from the predictions, in the units of y."],
    ["R-Sq", "The percent of the variation in y accounted for by the linear relationship with x."],
    ["Check the range before predicting", "Predictions inside the x-range of the data are interpolation. Outside it is extrapolation."],
    ["Parameter", "A number that describes a population, usually unknown."],
    ["Statistic", "A number that describes a sample, used to estimate a parameter."],
    ["Sampling variability", "Different random samples give different statistics."],
    ["Complete answer", "A claim in context with units, evidence, and a limit or condition."],
  ],
  closed: [
    [
      "A regression output gives Constant 38.52 and Hours 2.41 for predicting a final exam score from weekly hours of study. Which is the regression equation?",
      [
        "y-hat = 2.41 + 38.52(hours)",
        "y-hat = 38.52 - 2.41(hours)",
        "y-hat = 38.52(hours) + 2.41",
        "y-hat = 38.52 + 2.41(hours)",
      ],
      "D",
    ],
    [
      "In the regression of final exam score on weekly study hours, the slope is 2.41. Which interpretation is correct?",
      [
        "For each additional hour of study per week, the predicted exam score increases by about 2.41 points",
        "Studying 2.41 hours guarantees a passing score",
        "Each point on the exam requires 2.41 hours of study",
        "2.41% of exam scores are explained by study hours",
      ],
      "A",
    ],
    [
      "The output shows R-Sq = 81.3%. Which is the best interpretation?",
      [
        "81.3% of students have an exam score above the average",
        "About 81.3% of the variation in final exam scores is accounted for by the linear relationship with study hours",
        "The correlation is 0.813",
        "Studying causes 81.3% of the exam score",
      ],
      "B",
    ],
    [
      "The output shows S = 4.12. What does this tell you?",
      [
        "The slope of the line is 4.12",
        "The sample size is 4.12",
        "The actual exam scores typically differ from the predicted scores by about 4.12 points",
        "The intercept is 4.12 points",
      ],
      "C",
    ],
    [
      "The study hours in the data ranged from 2 to 12 hours per week. What is the predicted exam score for a student who studies 10 hours, and is the prediction reasonable?",
      [
        "About 62.6, and it is reasonable because 10 hours is within the data range",
        "About 62.6, but it is not reasonable because it is extrapolation",
        "About 24.1, and it is reasonable",
        "About 38.5, and it is reasonable because it is the intercept",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A statistics class collected data on 15 students: weekly hours of study (x), ranging from 2 to 12 hours, and final exam score (y). The regression output reads: Constant 38.52, Hours 2.41, S = 4.12, R-Sq = 81.3%. (a) Write the equation of the least-squares regression line. (b) Interpret the slope in context. (c) Interpret R-Sq in context. (d) Predict the exam score for a student who studies 10 hours a week, and say whether you trust the prediction.",
      scheme: [
        "Writes the equation y-hat = 38.52 + 2.41(hours), defining the variables",
        "Interprets the slope: for each additional hour of study per week, the predicted exam score increases by about 2.41 points",
        "Interprets R-Sq: about 81.3% of the variation in final exam scores is accounted for by the linear relationship with weekly study hours",
        "Predicts 38.52 + 2.41(10) = 62.62 points and notes that 10 hours is within 2 to 12, so it is interpolation and reasonable",
      ],
      model:
        "(a) The equation is y-hat = 38.52 + 2.41x, where x is the weekly hours of study and y-hat is the predicted final exam score. (b) For each additional hour of study per week, the predicted final exam score increases by about 2.41 points. (c) About 81.3% of the variation in the final exam scores is accounted for by the linear relationship with weekly study hours. (d) For x = 10, y-hat = 38.52 + 2.41(10) = 62.62, about 62.6 points. Since 10 hours is within the range of the data, 2 to 12 hours, this is interpolation, so the prediction is reasonable.",
      answers: [
        [
          "full",
          "(a) [[0|y-hat = 38.52 + 2.41x, where x is weekly study hours and y-hat is the predicted final exam score.]] (b) [[1|For each additional hour of study per week, the predicted final exam score goes up by about 2.41 points.]] (c) [[2|About 81.3% of the variation in final exam scores is accounted for by the linear relationship with hours of study.]] (d) [[3|y-hat = 38.52 + 2.41(10) = 62.62, so about 62.6 points. 10 is between 2 and 12 so it's interpolation and the prediction is reasonable.]]",
          "Full marks. Each answer is in context with units, and (d) checks the range before trusting the prediction.",
        ],
        [
          "full",
          "(a) [[0|Predicted exam score = 38.52 + 2.41(hours per week)]]. (b) [[1|The slope means that students who study one more hour per week are predicted to score 2.41 points higher on the final]]. (c) [[2|R-Sq = 81.3% says that about 81.3% of the differences in exam scores can be explained by differences in study hours through the linear model]]. (d) [[3|38.52 + 24.1 = 62.62, about 62.6. Study hours of 10 are inside the range 2 to 12, so I trust the prediction (although it isn't certain, because S = 4.12 means the actual score typically differs from the predicted score by 4 points)]].",
          "All four marks. Using S to say how much trust to place in the prediction is a mature addition.",
        ],
        [
          "partial",
          "(a) [[0|y-hat = 38.52 + 2.41x.]] (b) The slope is 2.41. (c) The R-Sq is 81.3%. (d) 62.62.",
          "Your equation is right. Your other answers need context: the slope means a 2.41-point increase in predicted exam score per extra hour of weekly study, and R-Sq means 81.3% of the variation in scores is accounted for by the linear relationship. Also say why 62.6 is a reasonable prediction.",
        ],
        [
          "partial",
          "[[1|The slope means that each extra hour of studying is associated with a 2.41 point higher predicted exam score.]] [[3|The prediction for 10 hours is 62.62, and that is within the data range, so it's fine.]]",
          "Your slope interpretation and prediction are right. Also write the equation with the variables defined, and interpret R-Sq as the percent of variation in exam scores accounted for by the linear relationship with study hours.",
          true,
        ],
        [
          "weak",
          "(a) y-hat = 2.41 + 38.52x. (b) Each hour of studying gives you 38.52 points. (c) 81.3% of students pass. (d) 38.52 x 10 = 385.2.",
          "The constant is the intercept and the coefficient of Hours is the slope: y-hat = 38.52 + 2.41x. R-Sq is the percent of variation explained, not the percent of students who pass.",
        ],
        [
          "weak",
          "[[0|y-hat = 38.52 + 2.41x.]] The R-Sq of 81.3% means that studying causes 81.3% of a student's grade.",
          "The equation is right. R-Sq describes how much of the variation in scores is accounted for by the linear relationship with study hours. It does not show cause, and it is not a percent of a student's grade.",
        ],
      ],
    },
    {
      prompt:
        "A random sample of 150 students is selected from a university with about 60,000 students. In the sample, 96 students own a bicycle. (a) Identify the population, the sample, the parameter and the statistic. (b) Calculate the statistic. (c) Is it correct to say that exactly 64% of all students at the university own a bicycle? Explain, using the idea of sampling variability. (d) Why does the random selection matter for using this statistic to estimate the parameter?",
      scheme: [
        "Identifies the population (all students at the university) and the sample (the 150 selected students)",
        "Identifies the parameter (the true proportion of all students who own a bicycle) and the statistic (the sample proportion, 96/150 = 0.64)",
        "Explains that it is not correct to say exactly 64%: the statistic estimates the parameter and a different random sample would give a different proportion (sampling variability)",
        "Explains that random selection avoids systematic bias, so the statistic is a reasonable estimate of the parameter for all students",
      ],
      model:
        "(a) The population is all students at the university, and the sample is the 150 students selected. The parameter is the true proportion of all students at the university who own a bicycle, which is unknown. The statistic is the sample proportion who own a bicycle. (b) The statistic is 96/150 = 0.64. (c) No: 0.64 is an estimate of the parameter, and it would be unusual for it to equal the parameter exactly. A different random sample of 150 students would probably give a different sample proportion; this is sampling variability. (d) Random selection means that every student has the same chance of being included, so the sample does not systematically favor bike owners or non-owners. This allows us to use the sample proportion as an unbiased estimate of the population proportion and to generalize to all students at the university.",
      answers: [
        [
          "full",
          "(a) [[0|The population is all the students at the university. The sample is the 150 students who were selected.]] [[1|The parameter is the true proportion of all students who own a bike. The statistic is the sample proportion, 96/150 = 0.64.]] (c) [[2|We can't say exactly 64% of all students, because 0.64 only estimates the parameter. Another random sample of 150 would give a different proportion, which is sampling variability.]] (d) [[3|Because the sample was random there is no systematic bias, so the proportion is a fair estimate of all students, not just a certain type.]]",
          "Full marks. Naming sampling variability as the reason the statistic differs from the parameter is exactly the point of the question.",
        ],
        [
          "full",
          "(a) Population: [[0|every student at the university (about 60,000). Sample: the 150 students chosen]]. (b)-(c) Parameter: [[1|p, the actual proportion of all students who own a bicycle, which is unknown. Statistic: p-hat = 96/150 = 0.64]]. We can use 0.64 to estimate p, but [[2|it would be a coincidence for p to be exactly 0.64, because a different sample would give a different p-hat. That's sampling variability]]. (d) [[3|The random selection makes all students equally likely to be included, so p-hat doesn't systematically over- or under-estimate p, and it can be generalized to the whole university]].",
          "All four marks. Using standard notation, p and p-hat, shows command of the vocabulary.",
        ],
        [
          "partial",
          "(a) [[0|The population is all the students at the university and the sample is 150 students.]] (b) The statistic is 0.64. (c) Yes, 64% of all students own bikes, because the sample is random.",
          "Your population, sample and statistic are right. A random sample gives an estimate and not the exact value: another sample would give a different proportion (sampling variability), so you cannot say exactly 64% of all students.",
        ],
        [
          "partial",
          "[[2|The 0.64 is an estimate, and a different sample would give a different value.]] [[3|The random selection means that it's not biased.]]",
          "Your reasoning in (c) and (d) is right. Also identify the population (all university students), the sample (the 150 students), the parameter (the true proportion who own a bike) and the statistic (96/150 = 0.64).",
          true,
        ],
        [
          "weak",
          "The parameter is 0.64 and the statistic is the 60,000 students.",
          "These are reversed. The parameter describes the population and is unknown, the true proportion of all students who own a bike. The statistic, 0.64, describes the sample.",
        ],
        [
          "weak",
          "[[0|The population is the university's students and the sample is the 150.]] Since 150 is a big number, the sample proportion has to be 0.64 for everyone.",
          "A larger sample reduces sampling variability but does not remove it. The sample proportion is an estimate of the population proportion, and a different sample would give a different value.",
        ],
      ],
    },
  ],
};

writeCourse("ap-statistics-grade-12.json", "AP Statistics", "Grade 12", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
