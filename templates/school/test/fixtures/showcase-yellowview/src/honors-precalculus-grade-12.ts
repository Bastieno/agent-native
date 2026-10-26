import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Honors Precalculus, Grade 12, Quarter 1. Standards: Common Core, High School
 * Functions, Algebra and Number (F-IF, F-BF, F-LE, F-TF, A-APR, N-CN), in the
 * school's own words. Goes deeper and faster than Precalculus: symmetry,
 * higher multiplicities and exact reasoning, base change and exponential
 * equations in two bases, complex-zero constructions, angular speed, and the
 * difference quotient as the first step toward the derivative.
 */

const w1: WeekInput = {
  topic: "Function features: symmetry, multiplicity, holes and slant asymptotes",
  note: `
## Objectives

Students will be able to:

1. describe the key features of a function, including domain, range, intercepts, symmetry, intervals of increase, extrema and end behavior;
2. graph polynomial functions with zeros of higher multiplicity, and decide the sign of the function on each interval;
3. graph rational functions and find the vertical, horizontal and slant asymptotes and any holes, with exact coordinates.

## Materials

Graphing handhelds or Desmos, graph paper, a feature checklist, whiteboards, the problem set.

## Starter (8 minutes)

Display f(x) = x^4 - 3x^2 and f(x) = x^3 - 3x on a graphing handheld. Ask: "What do you notice about each graph? Where could you fold it, or turn it around a point, to match itself?" Collect the observations and name them: even symmetry about the y-axis, and odd symmetry about the origin. State the algebraic tests, f(-x) = f(x) and f(-x) = -f(x).

## Main activity

1. Even and odd tests for polynomials and for quotients. Use them to cut work: only half of an even graph has to be computed.
2. A sixth-degree polynomial, g(x) = -(x - 1)^3 (x + 2)(x - 4)^2: zeros with multiplicity and behavior, end behavior, the y-intercept and a sign chart.
3. A rational function with a hole: f(x) = (x^2 - x - 6)/(x^2 + x - 12). Factor, cancel, locate the hole's exact coordinates, and find the vertical and horizontal asymptotes and intercepts.
4. Slant asymptote: divide (x^2 - 5x + 2) by (x + 3) and read the asymptote from the quotient.

## Checking for understanding

Whiteboards: "True or false: if f is odd and f(0) is defined, then f(0) = 0. Why?" Look for f(0) = -f(0).

## Problem set

Collect the problem set at the next class.
`,
  reading: [
    "Reading features exactly",
    `
Precalculus functions carry a long list of features, and a careful student reports each one with exact values. Start with symmetry. A function is even if f(-x) = f(x) for every x in the domain, so its graph is symmetric about the y-axis. A function is odd if f(-x) = -f(x), and its graph is symmetric about the origin. To test f(x) = x^4 - 3x^2, compute f(-x) = (-x)^4 - 3(-x)^2 = x^4 - 3x^2, which equals f(x), so it is even. The function x^3 - 3x is odd since f(-x) = -x^3 + 3x = -f(x). A function can be neither: x^2 + x. If an odd function is defined at 0 then f(0) = -f(0), so f(0) = 0.

For a polynomial, the factored form tells you the zeros, their multiplicities and the shape. Take g(x) = -(x - 1)^3 (x + 2)(x - 4)^2. The zeros are x = 1 (multiplicity 3), x = -2 (multiplicity 1) and x = 4 (multiplicity 2). At x = 1 the graph crosses and flattens, like x^3 at the origin. At x = -2 it crosses in the ordinary way. At x = 4 it touches the axis and turns, since the multiplicity is even. The degree is 3 + 1 + 2 = 6 and the leading coefficient is -1, so both ends point down. The y-intercept is g(0) = -(-1)^3(2)(16) = 32. To get the signs, test a point in each interval: g(-3) = -3,136, g(0) = 32, g(2) = -16 and g(5) = -448. So g is positive only on -2 < x < 1 and negative everywhere else except at its zeros. Notice that the sign does not change at x = 4.

For a rational function, factor first. f(x) = (x^2 - x - 6)/(x^2 + x - 12) = (x - 3)(x + 2)/((x + 4)(x - 3)). The factor x - 3 cancels, so there is a hole at x = 3. Its height is the value of the reduced function (x + 2)/(x + 4) at x = 3, which is 5/7, so the hole is at (3, 5/7). The factor x + 4 remains in the denominator, so x = -4 is a vertical asymptote. The degrees are equal, so the horizontal asymptote is the ratio of the leading coefficients, y = 1. The x-intercept is (-2, 0) and the y-intercept is f(0) = -6/-12 = 1/2.

When the top has degree one more than the bottom, divide. (x^2 - 5x + 2)/(x + 3) = x - 8 + 26/(x + 3), so the slant asymptote is y = x - 8 and the vertical asymptote is x = -3. For (5x^3 - 2)/(2x^3 + x), the degrees are equal, so y = 5/2 is the horizontal asymptote.
`,
  ],
  cards: [
    ["Even function", "f(-x) = f(x). The graph is symmetric about the y-axis."],
    ["Odd function", "f(-x) = -f(x). The graph is symmetric about the origin, and f(0) = 0 if defined."],
    ["Multiplicity 3", "The graph crosses the axis but flattens there, like x^3 at the origin."],
    ["Sign chart", "The sign of f on each interval between zeros and asymptotes, found by test points."],
    ["Hole coordinates", "The x-value is the canceled zero, and the y-value is the reduced function evaluated there."],
    ["Horizontal asymptote with equal degrees", "The ratio of the leading coefficients."],
    ["Slant asymptote", "The quotient line found by dividing when the top degree is one more than the bottom."],
    ["Leading-term test", "The sign of the leading coefficient and the parity of the degree give the end behavior."],
  ],
  closed: [
    [
      "Is f(x) = x^4 - 3x^2 even, odd or neither?",
      ["Odd", "Neither", "Even", "Both even and odd"],
      "C",
    ],
    [
      "For g(x) = -(x - 1)^3 (x + 2)(x - 4)^2, what does the graph do at x = 1?",
      ["Touches the axis and turns around", "Crosses the axis and flattens", "Crosses straight through with no flattening", "Has a vertical asymptote"],
      "B",
    ],
    [
      "What is the hole of f(x) = (x^2 - x - 6)/(x^2 + x - 12)?",
      ["(3, 5/7)", "(3, 0)", "(-4, 5/7)", "(3, 7/5)"],
      "A",
    ],
    [
      "What is the slant asymptote of f(x) = (x^2 - 5x + 2)/(x + 3)?",
      ["y = x + 3", "y = x - 5", "y = x + 8", "y = x - 8"],
      "D",
    ],
    [
      "What is the horizontal asymptote of f(x) = (5x^3 - 2)/(2x^3 + x)?",
      ["y = 5", "y = 5/2", "y = 0", "y = 2/5"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Describe the graph of g(x) = -(x - 1)^3 (x + 2)(x - 4)^2. Give the zeros and the behavior at each, the degree and end behavior, the y-intercept, and the intervals on which g is positive and negative. Show test points.",
      scheme: [
        "States the zeros 1 (multiplicity 3, crosses and flattens), -2 (multiplicity 1, crosses) and 4 (multiplicity 2, touches and turns)",
        "States the degree 6 and the negative leading coefficient, so both ends point down",
        "Finds the y-intercept g(0) = 32",
        "Gives the signs using test points: positive only for -2 < x < 1, and negative for x < -2, 1 < x < 4 and x > 4",
      ],
      model:
        "The zeros are x = 1 with multiplicity 3, so the graph crosses and flattens; x = -2 with multiplicity 1, so it crosses; and x = 4 with multiplicity 2, so it touches the axis and turns. The degree is 3 + 1 + 2 = 6 and the leading coefficient is -1, so both ends point down. The y-intercept is g(0) = -(-1)^3(2)(16) = 32. Test points: g(-3) = -3,136, g(0) = 32, g(2) = -16 and g(5) = -448. So g is positive only on -2 < x < 1, and negative on x < -2, 1 < x < 4 and x > 4.",
      answers: [
        [
          "full",
          "[[0|At x = 1 it crosses but flattens since it's cubed. At -2 it crosses normally. At 4 it touches and turns because that factor is squared.]] [[1|The degree is 3 + 1 + 2 = 6 and the leading coefficient is negative, so both ends go down.]] [[2|g(0) = -(-1)^3(2)(16) = 32, the y-intercept.]] [[3|Testing: g(-3) = -3136, g(0) = 32, g(2) = -16, g(5) = -448, so positive only between -2 and 1.]]",
          "Full marks. Your sign check at 5 confirms that nothing changes after the double zero at 4.",
        ],
        [
          "full",
          "Zeros: [[0|1 (odd multiplicity 3: crosses, flat), -2 (multiplicity 1: crosses), 4 (even multiplicity 2: bounces off the axis)]]. Ends: [[1|degree 6, even, with a negative leading coefficient, so down and down]]. Intercept: [[2|plug in 0, -(-1)(2)(16) = 32]]. Signs: [[3|from the left it's negative, crosses up at -2, stays positive until it crosses down at 1, then negative, bouncing at 4 without crossing, so positive only on (-2, 1)]].",
          "All four marks. Reading the signs by walking along the graph agrees with the table of test points.",
        ],
        [
          "partial",
          "[[0|The zeros are 1, -2 and 4. At 4 it touches and turns, and the others cross.]] [[2|The y-intercept is 32.]] Both ends go up since the degree is even.",
          "Your zeros and intercept are right. The leading coefficient is negative, which flips an even-degree graph so that both ends point down. Also describe the flattening at x = 1.",
        ],
        [
          "partial",
          "[[1|Degree 6, both ends down.]] [[3|It's positive only between -2 and 1 and negative on the other intervals.]] The zeros are -1, 2 and -4.",
          "Your end behavior and signs are right. The zeros come from setting each factor to 0: x - 1 = 0 gives 1, x + 2 = 0 gives -2, x - 4 = 0 gives 4.",
          true,
        ],
        [
          "weak",
          "It crosses at 1, -2 and 4, and it's degree 3 because there are three zeros.",
          "The degree is the sum of the multiplicities, 3 + 1 + 2 = 6. And the factor (x - 4) is squared, so the graph touches the axis there and does not cross.",
        ],
        [
          "weak",
          "[[2|g(0) = 32.]] The graph is negative everywhere because of the minus sign in front.",
          "The intercept is right. The minus sign flips the ends down, but the graph is positive between -2 and 1, which test point g(0) = 32 shows.",
        ],
      ],
    },
    {
      prompt:
        "For f(x) = (x^2 - x - 6)/(x^2 + x - 12), factor the top and bottom and find the exact coordinates of the hole, the vertical and horizontal asymptotes, and the x- and y-intercepts. Explain how you know which factor gives the hole and which gives the asymptote.",
      scheme: [
        "Factors as (x - 3)(x + 2) over (x + 4)(x - 3) and finds the hole at (3, 5/7) using the reduced function (x + 2)/(x + 4)",
        "Finds the vertical asymptote x = -4 and says it comes from the factor that does not cancel",
        "Finds the horizontal asymptote y = 1 from the equal degrees and leading coefficients 1 and 1",
        "Finds the intercepts (-2, 0) and (0, 1/2)",
      ],
      model:
        "f(x) = (x - 3)(x + 2)/((x + 4)(x - 3)). The factor x - 3 appears in both the top and the bottom, so it cancels and leaves a hole at x = 3; the reduced function (x + 2)/(x + 4) has value 5/7 there, so the hole is at (3, 5/7). The factor x + 4 stays in the denominator, so x = -4 is a vertical asymptote. The degrees are equal and both leading coefficients are 1, so the horizontal asymptote is y = 1. The x-intercept is (-2, 0) from the remaining numerator factor, and the y-intercept is f(0) = -6/-12 = 1/2.",
      answers: [
        [
          "full",
          "[[0|(x - 3)(x + 2) / ((x + 4)(x - 3)). The (x - 3) cancels, so there's a hole at x = 3, and (3 + 2)/(3 + 4) = 5/7 gives the point (3, 5/7).]] [[1|(x + 4) is left on the bottom, so x = -4 is a vertical asymptote. A factor that cancels is a hole, and one that doesn't is an asymptote.]] [[2|The degrees are both 2 and the leading coefficients are 1 and 1, so y = 1 is the horizontal asymptote.]] [[3|The x-intercept is (-2, 0) and the y-intercept is (0, 1/2).]]",
          "Full marks. Your sentence about canceled and remaining factors is exactly the explanation asked for.",
        ],
        [
          "full",
          "Factoring gives f(x) = (x - 3)(x + 2)/((x + 4)(x - 3)). [[0|After canceling, f is (x + 2)/(x + 4), which at x = 3 is 5/7, so there is a hole at (3, 5/7)]]. [[1|The remaining denominator factor x + 4 makes a vertical asymptote at x = -4]]. [[2|Equal degrees means the horizontal asymptote is the ratio of the leading coefficients, 1/1 = 1]]. [[3|x-intercept: x + 2 = 0 gives (-2, 0). y-intercept: f(0) = -6/-12 = 1/2, so (0, 1/2)]].",
          "All four marks. Using the reduced function for the hole and the intercept is the neat way to organize it.",
        ],
        [
          "partial",
          "[[0|There's a hole at (3, 5/7).]] [[1|The vertical asymptote is x = -4.]] The horizontal asymptote is y = 0 and the intercepts are (3, 0) and (-2, 0).",
          "The hole and vertical asymptote are right. With equal degrees, the horizontal asymptote is y = 1, not 0. And x = 3 is a hole, not an x-intercept: the x-intercept is only (-2, 0), and the y-intercept is (0, 1/2).",
        ],
        [
          "partial",
          "[[2|The horizontal asymptote is y = 1.]] [[3|The intercepts are (-2, 0) and (0, 1/2).]] The vertical asymptotes are x = 3 and x = -4.",
          "Your horizontal asymptote and intercepts are right. The factor x - 3 cancels, so x = 3 is a hole, at (3, 5/7). Only x = -4 is a vertical asymptote.",
          true,
        ],
        [
          "weak",
          "The vertical asymptotes are where the bottom is zero: x = -4 and x = 3. There's no hole.",
          "A zero of the denominator is a hole when its factor also appears in the numerator. The factor x - 3 appears in both, so it cancels and leaves a hole.",
        ],
        [
          "weak",
          "[[1|x = -4 is a vertical asymptote.]] The hole is at x = 3 and the y-value is 0 since the top is zero there.",
          "The asymptote is right. The top and bottom are both zero at x = 3, so the y-value comes from the reduced function: (3 + 2)/(3 + 4) = 5/7, not 0.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Logarithmic and exponential functions: change of base and inverses",
  note: `
## Objectives

Students will be able to:

1. graph logarithmic functions and relate them to exponentials as inverses, including transformed versions and their inverses;
2. describe how transformations change the graph and the equation of a function, and use the change-of-base formula.

## Materials

Graphing handhelds, graph paper, log tables for the starter, whiteboards, the worksheet.

## Starter (8 minutes)

Ask: "How would you find log base 4 of 50 if your calculator only has log and ln?" Let pairs discuss. Introduce the change-of-base formula log_b(x) = ln x / ln b, and ask why it must be true by starting from b^y = x and taking the natural log of both sides.

## Main activity

1. Domain of log_2(x^2 - 9): solve the inequality and show the graph has two branches.
2. Graph f(x) = 3 - log_2(x + 1): the transformations from log_2(x), the asymptote, the intercepts, and the inverse.
3. Inverse of an exponential with transformations: f(x) = 5 - 2e^(x - 1).
4. Exponentials in two bases: solve 2^(x + 1) = 3^(x - 1) by logarithms.

## Checking for understanding

Whiteboards: "Why can the argument of a logarithm never be zero or negative?"

## Worksheet

Collect the worksheet at the end of class.
`,
  reading: [
    "Inverses of transformed functions, and logs in any base",
    `
A calculator typically has log, base 10, and ln, base e. Any other base can be handled with the change-of-base formula: log_b(x) = ln(x)/ln(b). To see why, let y = log_b(x), so b^y = x. Take the natural log of both sides: y ln(b) = ln(x), so y = ln(x)/ln(b). For example, log_4(50) = ln 50 / ln 4 = 3.912 / 1.386, about 2.82. Check: 4^2.82 is about 50.

The domain of a logarithm is the set of inputs for which the argument is positive. For f(x) = log_2(x^2 - 9) we need x^2 > 9, which means x < -3 or x > 3. The graph has two branches, with vertical asymptotes at x = -3 and x = 3. Notice that the domain is two separate intervals, which is something that a single shift of the basic logarithm could not produce.

Transformations of a logarithm follow the usual rules. Consider f(x) = 3 - log_2(x + 1). Start with y = log_2(x). The x + 1 shifts the graph 1 unit to the left, so the vertical asymptote becomes x = -1 and the domain is x > -1. The minus sign reflects the graph across the x-axis. The 3 shifts it up 3 units. To find the x-intercept, solve 3 - log_2(x + 1) = 0, so log_2(x + 1) = 3, which means x + 1 = 8 and x = 7. The y-intercept is f(0) = 3 - log_2 1 = 3. To find the inverse, swap x and y: x = 3 - log_2(y + 1), so log_2(y + 1) = 3 - x, and y + 1 = 2^(3 - x). The inverse is f-inverse(x) = 2^(3 - x) - 1. It has the horizontal asymptote y = -1, which mirrors the vertical asymptote x = -1 of f, and its domain is all real numbers, which is the range of f.

Inverses of exponential functions are logarithms. Take f(x) = 5 - 2e^(x - 1). Swap: x = 5 - 2e^(y - 1), so e^(y - 1) = (5 - x)/2, and y - 1 = ln((5 - x)/2), so f-inverse(x) = 1 + ln((5 - x)/2). The domain of the inverse is x < 5, which is the range of f, since 2e^(x - 1) is always positive.

Equations with unknowns in exponents of different bases need logarithms. Solve 2^(x + 1) = 3^(x - 1). Take ln of both sides: (x + 1) ln 2 = (x - 1) ln 3. Expand: x ln 2 + ln 2 = x ln 3 - ln 3. Gather the x terms: ln 2 + ln 3 = x(ln 3 - ln 2), so x = ln 6 / ln 1.5, about 4.42. Check: 2^5.42 is about 42.8, and 3^3.42 is also about 42.8.
`,
  ],
  cards: [
    ["Change of base", "log_b(x) = ln(x)/ln(b), for any base b greater than 0 and not 1."],
    ["Domain of a logarithm", "The argument must be positive. For log_2(x^2 - 9) the domain is x < -3 or x > 3."],
    ["Reflection of a logarithm", "-log_b(x) flips the graph across the x-axis. The asymptote does not move."],
    ["Inverse of a transformed function", "Swap x and y and solve. Asymptotes of the inverse mirror those of the original."],
    ["Range of an exponential", "For a e^(x - h) + k with a > 0 the range is y > k."],
    ["Exponents in two bases", "Take ln of both sides and gather the x terms."],
    ["Domain and range of an inverse", "They swap with the domain and range of the original."],
    ["Natural logarithm", "ln is the logarithm to the base e, the inverse of e^x."],
  ],
  closed: [
    [
      "What is log_4(50), to two decimal places?",
      ["About 12.5", "About 2.82", "About 0.35", "About 1.69"],
      "B",
    ],
    [
      "What is the domain of f(x) = log_2(x^2 - 9)?",
      ["-3 < x < 3", "x > 3", "x < -3 or x > 3", "All real numbers except 3 and -3"],
      "C",
    ],
    [
      "What is the inverse of f(x) = 5 - 2e^(x - 1)?",
      [
        "1 + ln((5 - x)/2)",
        "1 + ln((x - 5)/2)",
        "ln((5 - x)/2) - 1",
        "1 - ln((5 - x)/2)",
      ],
      "A",
    ],
    [
      "What is the x-intercept of g(x) = 3 - log_2(x + 1)?",
      ["-1", "2", "8", "7"],
      "D",
    ],
    [
      "Solve 2^(x + 1) = 3^(x - 1). Which value is closest?",
      ["About 0.23", "About 1.00", "About 4.42", "About 2.71"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Let f(x) = 3 - log_2(x + 1). Describe the transformations of y = log_2(x) that give the graph, state the domain and vertical asymptote, find the intercepts, find the inverse function, and explain how the asymptote of the inverse relates to that of f.",
      scheme: [
        "Describes the transformations (left 1, reflect across the x-axis, up 3) and gives the domain x > -1 and the vertical asymptote x = -1",
        "Finds the x-intercept (7, 0) and the y-intercept (0, 3)",
        "Finds the inverse f-inverse(x) = 2^(3 - x) - 1",
        "Says the inverse has the horizontal asymptote y = -1, which mirrors the vertical asymptote x = -1 of f",
      ],
      model:
        "The graph is y = log_2(x) shifted 1 unit left, reflected across the x-axis, and shifted up 3 units. The argument x + 1 must be positive, so the domain is x > -1 and the vertical asymptote is x = -1. For the x-intercept, 3 - log_2(x + 1) = 0 gives log_2(x + 1) = 3, so x + 1 = 8 and x = 7, giving (7, 0). The y-intercept is f(0) = 3 - log_2(1) = 3, so (0, 3). For the inverse, swap: x = 3 - log_2(y + 1), so log_2(y + 1) = 3 - x and y = 2^(3 - x) - 1. Its horizontal asymptote is y = -1, which is the reflection of f's vertical asymptote x = -1 in the line y = x.",
      answers: [
        [
          "full",
          "[[0|Start with log_2(x). The x + 1 moves it left 1, the minus flips it over the x-axis, the 3 moves it up. The input has to be positive so x > -1, and the vertical asymptote is x = -1.]] [[1|0 = 3 - log_2(x + 1) means log_2(x + 1) = 3, so x + 1 = 8, x = 7. The y-intercept is f(0) = 3 - 0 = 3.]] [[2|Swap x and y: x = 3 - log_2(y + 1), log_2(y + 1) = 3 - x, y = 2^(3 - x) - 1.]] [[3|The inverse has a horizontal asymptote at y = -1, which is the mirror image over y = x of the vertical asymptote at x = -1.]]",
          "Full marks. Every part of the answer comes with its reasoning, including the link between the two asymptotes.",
        ],
        [
          "full",
          "Transformations in order: [[0|left 1, reflection over the x-axis, up 3; the asymptote stays at x = -1 and the domain is (-1, infinity)]]. Intercepts: [[1|x-int (7, 0) since 2^3 = 8 = x + 1, y-int (0, 3)]]. Inverse: [[2|swap to x = 3 - log_2(y + 1), solve to get y = 2^(3 - x) - 1]]. [[3|The inverse is an exponential with horizontal asymptote y = -1, the reflection of x = -1 across y = x, and its domain is all reals, which was f's range]].",
          "All four marks. The remark about domain and range swapping is another good consistency check.",
        ],
        [
          "partial",
          "[[0|It's shifted left 1, flipped, and up 3, so x > -1 and the asymptote is x = -1.]] [[1|The intercepts are (7, 0) and (0, 3).]] The inverse is 3 - 2^(x + 1).",
          "Your first two parts are right. To find the inverse, swap x and y and solve: log_2(y + 1) = 3 - x gives y = 2^(3 - x) - 1. Check by testing x = 7: f(7) = 0 and the inverse of 0 should be 7.",
        ],
        [
          "partial",
          "[[2|The inverse is 2^(3 - x) - 1.]] [[3|Its asymptote is y = -1, which matches x = -1 for f.]] The x-intercept is at x = 2 and the domain is x > 0.",
          "Your inverse and asymptote statement are right. The domain of f is x > -1, since the argument is x + 1. And the x-intercept is x = 7, since log_2(x + 1) = 3 means x + 1 = 8.",
          true,
        ],
        [
          "weak",
          "The asymptote is y = 3, since that's the number added.",
          "A logarithm has a vertical asymptote where its input is 0. The 3 only moves the graph up. Here x + 1 = 0 gives the vertical asymptote x = -1.",
        ],
        [
          "weak",
          "[[1|The y-intercept is 3.]] The inverse is 1/f(x) = 1/(3 - log_2(x + 1)).",
          "The y-intercept is right. 1/f is the reciprocal, and it is not the inverse. The inverse undoes f, which means swapping x and y and solving.",
        ],
      ],
    },
    {
      prompt:
        "Solve 2^(x + 1) = 3^(x - 1) exactly, and then give a decimal approximation. Show the algebra step by step and check the decimal in the original equation.",
      scheme: [
        "Takes the natural log of both sides to get (x + 1) ln 2 = (x - 1) ln 3",
        "Expands and gathers the x terms to get ln 2 + ln 3 = x(ln 3 - ln 2)",
        "Writes the exact answer x = (ln 2 + ln 3)/(ln 3 - ln 2) = ln 6 / ln 1.5",
        "Finds x is about 4.42 and checks that both sides are about 42.8",
      ],
      model:
        "Take natural logs: (x + 1) ln 2 = (x - 1) ln 3. Expand: x ln 2 + ln 2 = x ln 3 - ln 3. Collect the x terms on one side: ln 2 + ln 3 = x ln 3 - x ln 2 = x(ln 3 - ln 2). So x = (ln 2 + ln 3)/(ln 3 - ln 2) = ln 6 / ln 1.5, which is about 1.7918/0.4055 = 4.42. Check: 2^5.42 is about 42.8 and 3^3.42 is about 42.8.",
      answers: [
        [
          "full",
          "[[0|Take ln of both sides and use the power rule: (x + 1) ln 2 = (x - 1) ln 3.]] [[1|Expand: x ln 2 + ln 2 = x ln 3 - ln 3. Get the x's together: ln 2 + ln 3 = x ln 3 - x ln 2 = x(ln 3 - ln 2).]] [[2|So x = (ln 2 + ln 3)/(ln 3 - ln 2), which is ln 6 / ln 1.5.]] [[3|That's 1.7918/0.4055 = 4.42. Check: 2^5.42 = 42.8 and 3^3.42 = 42.8, both sides match.]]",
          "Full marks. Combining ln 2 + ln 3 into ln 6 with the product rule gives a tidy exact answer.",
        ],
        [
          "full",
          "Logs of both sides: [[0|ln(2^(x + 1)) = ln(3^(x - 1)), so (x + 1) ln 2 = (x - 1) ln 3]]. [[1|Distribute, then move x terms to one side and the constants to the other: x(ln 3 - ln 2) = ln 2 + ln 3]]. [[2|Exact: x = (ln 2 + ln 3)/(ln 3 - ln 2)]]. [[3|With a calculator that's 4.419. Check: 2^(5.419) = 42.8 and 3^(3.419) = 42.8]].",
          "All four marks. Showing each side of the check to the same value is convincing.",
        ],
        [
          "partial",
          "[[0|(x + 1) ln 2 = (x - 1) ln 3.]] So x ln 2 + ln 2 = x ln 3 - ln 3, and x = ln 3 - ln 2 = 0.41.",
          "Your first step is right. When you gather terms, x multiplies the difference of the logs, so you divide by (ln 3 - ln 2), and the numerator is ln 2 + ln 3. That gives about 4.42.",
        ],
        [
          "partial",
          "[[2|x = (ln 2 + ln 3)/(ln 3 - ln 2).]] [[3|That's about 4.42, and both sides are about 42.8.]]",
          "Your answer and check are right. Show the algebra before it: taking logs, expanding, and gathering the x terms.",
          true,
        ],
        [
          "weak",
          "2^(x + 1) = 3^(x - 1), so the exponents must be the same, so x + 1 = x - 1, which has no solution.",
          "Equal exponents give equal values only when the bases are the same. Here the bases differ, so take logarithms of both sides.",
        ],
        [
          "weak",
          "[[0|Take ln of both sides to get (x + 1) ln 2 = (x - 1) ln 3.]] Divide by ln 2 and ln 3 to get (x + 1)/(x - 1) = ln 3 / ln 2, so x = 1.",
          "The first step is right. Dividing by both logs and then dropping them does not work. Expand both sides and collect the x terms.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Composition, domains of combined functions and restricted inverses",
  note: `
## Objectives

Students will be able to:

1. combine functions by arithmetic and composition, find the domain of the result before simplifying, and explain when simplification changes the domain;
2. find and restrict the domain of an inverse function and state the domain and range of both.

## Materials

Graphing handhelds, whiteboards, graph paper for reflecting over y = x, the worksheet.

## Starter (8 minutes)

Give f(x) = x/(x - 1) and g(x) = 1/x. Ask students to simplify f(g(x)). Most get 1/(1 - x) and state that the domain is x not equal to 1. Ask what happens at x = 0. The original has g(0) undefined, so 0 is excluded as well. Use this to introduce the habit: find the domain from the original expression.

## Main activity

1. Compose with domains: f(x) = the square root of (x + 3) and g(x) = x^2 - 1, find g(f(x)); and the example above.
2. Quotients with canceling factors: (x^2 - x - 6)/(x^2 - 9).
3. A modeling composition with a radical: a circular oil spill with radius r(t) = the square root of (4t + 1) and area A(r) = pi r^2.
4. Restricted inverses: f(x) = x^2 - 6x + 4 on x >= 3, with the horizontal line test as the reason.

## Checking for understanding

Whiteboards: "The inverse of f(x) = (x + 2)/(x - 5): what is its domain?" Look for x not equal to 1.

## Worksheet

Collect the worksheet at the end of class.
`,
  reading: [
    "The domain belongs to the original, not the simplified form",
    `
When you combine functions, simplifying can hide information. The domain of a combined function must be determined from the original expressions, before any canceling. Take f(x) = x/(x - 1) and g(x) = 1/x. Compose: f(g(x)) = (1/x)/(1/x - 1). Simplify the complex fraction by multiplying the top and bottom by x: 1/(1 - x). This looks as though only x = 1 is a problem, but g(x) = 1/x is not defined at x = 0, so 0 is not in the domain of the composition. And at x = 1, g(1) = 1, which makes the denominator of f zero. So the domain is x not equal to 0 and x not equal to 1.

Quotients work the same way. For f(x) = x^2 - x - 6 = (x - 3)(x + 2) and g(x) = x^2 - 9 = (x - 3)(x + 3), the quotient (f/g)(x) simplifies to (x + 2)/(x + 3), but the domain excludes x = 3 and x = -3, since g is zero at both. For g(f(x)) with f(x) = the square root of (x + 3) and g(x) = x^2 - 1, we get g(f(x)) = (x + 3) - 1 = x + 2, but f needs x >= -3, so the composition's domain is x >= -3, not all real numbers.

A composition with a radical can model growth. An oil spill has radius r(t) = the square root of (4t + 1) feet at time t seconds, and the area is A(r) = pi r^2. Then A(r(t)) = pi(4t + 1). The square root disappears when squared, but the domain in the model is still t >= 0, because time cannot be negative; algebraically the radical would be defined for t >= -1/4, but the situation sets the domain. When is the area 25 pi? Solve pi(4t + 1) = 25 pi: 4t + 1 = 25, so t = 6 seconds. The time as a function of area is t = (A/pi - 1)/4.

An inverse needs a one-to-one function. The function f(x) = x^2 - 6x + 4 fails the horizontal line test: f(2) = 4 - 12 + 4 = -4 and f(4) = 16 - 24 + 4 = -4. Restricting the domain to x >= 3, the right half of the parabola, makes it one-to-one. Complete the square: f(x) = (x - 3)^2 - 5. Swap: x = (y - 3)^2 - 5, so (y - 3)^2 = x + 5, and y - 3 = plus or minus the square root of (x + 5). Since the outputs of the inverse are the inputs of f, which are at least 3, we take the positive root: f-inverse(x) = 3 + the square root of (x + 5). The domain of f is x >= 3 and its range is y >= -5. The inverse has domain x >= -5 and range y >= 3. Check: f(7) = 49 - 42 + 4 = 11 and f-inverse(11) = 3 + the square root of 16 = 7.

An inverse of a rational function also carries restrictions. For f(x) = (x + 2)/(x - 5), swapping gives x(y - 5) = y + 2, so xy - 5x = y + 2, and y(x - 1) = 5x + 2, so f-inverse(x) = (5x + 2)/(x - 1). Its domain excludes x = 1, which is the one value that f never outputs.
`,
  ],
  cards: [
    ["Domain of a combination", "Determined from the original expressions before any canceling or simplifying."],
    ["Domain of a composition", "Inputs of the inner function whose outputs are allowed by the outer function."],
    ["Complex fraction", "A fraction within a fraction. Multiply the top and bottom by the common denominator to simplify it."],
    ["Model domain", "The inputs that make sense in a situation, which can be smaller than the algebraic domain."],
    ["Horizontal line test", "A function is one-to-one if no horizontal line meets its graph twice."],
    ["Restriction for an inverse", "Choose one side of the graph, such as x >= 3 for a parabola with vertex at x = 3."],
    ["Choosing the sign of the root", "The range of the inverse is the restricted domain of the original, which decides plus or minus."],
    ["Excluded value of an inverse", "A value the original function never outputs, such as y = 1 for (x + 2)/(x - 5)."],
  ],
  closed: [
    [
      "Let f(x) = the square root of (x + 3) and g(x) = x^2 - 1. What is g(f(x)) and its domain?",
      [
        "x + 2, for x >= -3",
        "x + 2, for all real numbers",
        "x^2 + 2, for x >= -3",
        "x + 2, for x >= -2",
      ],
      "A",
    ],
    [
      "Let f(x) = x/(x - 1) and g(x) = 1/x. What is the domain of f(g(x))?",
      ["x is not 1", "x is not 0 and not 1", "x is not 0", "All real numbers"],
      "B",
    ],
    [
      "Let f(x) = x^2 - x - 6 and g(x) = x^2 - 9. What is the domain of f/g?",
      ["All real numbers except 3", "x is not -2", "x is not 3 and not -3", "All real numbers"],
      "C",
    ],
    [
      "What is the inverse of f(x) = (x + 2)/(x - 5)?",
      ["(x - 5)/(x + 2)", "(5x - 2)/(x + 1)", "(x + 5)/(x - 2)", "(5x + 2)/(x - 1)"],
      "D",
    ],
    [
      "The function f(x) = |x - 3| + 1 is restricted to x >= 3. What is its inverse, and what is the domain of the inverse?",
      [
        "x + 2, for x >= 1",
        "x + 2, for x >= 3",
        "x - 2, for x >= 1",
        "-x + 4, for x >= 1",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "An oil spill spreads so that its radius after t seconds is r(t) = the square root of (4t + 1) feet, and the area is A(r) = pi r^2. (a) Write A(r(t)). (b) State the domain that makes sense in this situation and why it differs from the algebraic domain. (c) Find when the area is 25 pi square feet. (d) Write t as a function of the area.",
      scheme: [
        "Writes A(r(t)) = pi(4t + 1), since squaring removes the radical",
        "States the model domain t >= 0 and notes the radical alone is defined for t >= -1/4, but time cannot be negative",
        "Solves pi(4t + 1) = 25 pi to get t = 6 seconds",
        "Writes t = (A/pi - 1)/4 as the inverse",
      ],
      model:
        "(a) A(r(t)) = pi(the square root of (4t + 1))^2 = pi(4t + 1). (b) The radical is defined for 4t + 1 >= 0, which is t >= -1/4, but in the situation time starts at 0 and cannot be negative, so the domain is t >= 0. (c) pi(4t + 1) = 25 pi gives 4t + 1 = 25, so t = 6 seconds. (d) From A = pi(4t + 1), A/pi = 4t + 1, so t = (A/pi - 1)/4.",
      answers: [
        [
          "full",
          "(a) [[0|A(r(t)) = pi times (sqrt(4t + 1))^2 = pi(4t + 1), because the square and the root cancel.]] (b) [[1|The root alone would allow t >= -1/4, but time can't be negative, so for the oil spill t >= 0.]] (c) [[2|pi(4t + 1) = 25 pi so 4t + 1 = 25 and t = 6 seconds.]] (d) [[3|A/pi = 4t + 1, so t = (A/pi - 1)/4.]]",
          "Full marks. Noticing that the model's domain is narrower than the algebraic domain is the main point of the question.",
        ],
        [
          "full",
          "[[0|Composition: pi times (4t + 1), since (sqrt(x))^2 = x when x is at least 0, which is pi(4t + 1) = 4 pi t + pi]]. [[1|The square root needs 4t + 1 >= 0, so t >= -1/4, but the spill starts at t = 0 and time doesn't go backward, so the model's domain is t >= 0]]. [[2|Set equal to 25 pi, 4t + 1 = 25, t = 6 s]]. [[3|Solving A = pi(4t + 1) for t gives t = (A - pi)/(4 pi), the time to reach a given area]].",
          "All four marks. Writing the expanded form and the inverse in two forms is useful for different tasks.",
        ],
        [
          "partial",
          "[[0|A(r(t)) = pi(4t + 1).]] [[2|t = 6 seconds.]] The domain is t >= -1/4 because of the square root.",
          "Your composition and time are right. The square root gives t >= -1/4, but a spill cannot exist before it starts, so the model's domain is t >= 0.",
        ],
        [
          "partial",
          "[[1|The domain is t >= 0 since time can't be negative.]] [[3|t = (A/pi - 1)/4.]] A(r(t)) = pi x 4t + 1 = 4 pi t + 1.",
          "Your domain and inverse are right. In the composition, pi multiplies the entire (4t + 1), so it is 4 pi t + pi, not 4 pi t + 1.",
          true,
        ],
        [
          "weak",
          "A(r(t)) = pi + sqrt(4t + 1), you just add them together.",
          "Composition substitutes the radius into the area formula: A(r(t)) = pi(r(t))^2. It is not a sum.",
        ],
        [
          "weak",
          "[[0|A(r(t)) = pi(4t + 1).]] 25 pi = pi(4t + 1) so 25 = 4t and t = 6.25.",
          "Your composition is right. When you divide both sides by pi you get 25 = 4t + 1, not 25 = 4t, so 4t = 24 and t = 6.",
        ],
      ],
    },
    {
      prompt:
        "The function f(x) = x^2 - 6x + 4 is not one-to-one. Show why, using two inputs with the same output. Restrict the domain to x >= 3, find the inverse, give the domain and range of f and of its inverse, and check with the input 7.",
      scheme: [
        "Shows f(2) = f(4) = -4, so f fails the horizontal line test and needs a restriction",
        "Completes the square, f(x) = (x - 3)^2 - 5, and solves for the inverse, choosing the positive root: 3 + the square root of (x + 5)",
        "States the domain and range: f has x >= 3 and y >= -5, and the inverse has x >= -5 and y >= 3",
        "Checks: f(7) = 11 and f-inverse(11) = 3 + 4 = 7",
      ],
      model:
        "f(2) = 4 - 12 + 4 = -4 and f(4) = 16 - 24 + 4 = -4, so two inputs share an output and f is not one-to-one; it fails the horizontal line test. Restrict to x >= 3. Completing the square gives f(x) = (x - 3)^2 - 5. Swapping, x = (y - 3)^2 - 5, so y - 3 = plus or minus the square root of (x + 5). The outputs of the inverse must be at least 3, so we take the plus sign: f-inverse(x) = 3 + the square root of (x + 5). The function f has domain x >= 3 and range y >= -5, and the inverse has domain x >= -5 and range y >= 3. Check: f(7) = 49 - 42 + 4 = 11, and f-inverse(11) = 3 + the square root of 16 = 7.",
      answers: [
        [
          "full",
          "[[0|f(2) = 4 - 12 + 4 = -4 and f(4) = 16 - 24 + 4 = -4. Two different inputs give the same output, so it's not one-to-one.]] [[1|(x - 3)^2 - 5 is the completed square. Swap: x + 5 = (y - 3)^2, y = 3 plus or minus sqrt(x + 5). The right half has y >= 3, so I pick the plus: 3 + sqrt(x + 5).]] [[2|f: domain x >= 3, range y >= -5. Inverse: domain x >= -5, range y >= 3.]] [[3|f(7) = 11 and 3 + sqrt(16) = 7, it comes back.]]",
          "Full marks. Choosing the plus sign because the inverse's outputs must be at least 3 is the key reasoning.",
        ],
        [
          "full",
          "Not one-to-one because [[0|the vertex is at x = 3 and the parabola is symmetric, so f(2) = f(4) = -4]]. After restricting to x >= 3: [[1|y = (x - 3)^2 - 5 becomes x = (y - 3)^2 - 5, then y = 3 + sqrt(x + 5) (positive root because outputs of the inverse are the old inputs, at least 3)]]. [[2|The domain of the inverse equals the range of f, x >= -5; its range y >= 3 equals the restricted domain of f]]. [[3|Testing 7: f(7) = 49 - 42 + 4 = 11; 3 + sqrt(11 + 5) = 7]].",
          "All four marks. Linking the inverse's domain to the range of f explains why the sets swap.",
        ],
        [
          "partial",
          "[[0|f(2) and f(4) are both -4, so it's not one-to-one.]] [[1|The inverse is 3 plus or minus sqrt(x + 5).]] The domain is all real numbers.",
          "Your first part is right. An inverse function has only one output for each input, so choose the plus root for the restriction x >= 3. And its domain is x >= -5, since the root needs x + 5 >= 0.",
        ],
        [
          "partial",
          "[[3|f(7) = 11 and f-inverse(11) = 7.]] [[2|Domain of f-inverse is x >= -5.]]",
          "Your check and the inverse's domain are right. Show why f is not one-to-one, and the steps to find the inverse: complete the square, swap, and choose the positive root.",
          true,
        ],
        [
          "weak",
          "The inverse is 1/(x^2 - 6x + 4).",
          "The reciprocal does not undo f. Test x = 7: f(7) = 11, but 1/(f(7)) is 1/11, which is not 7.",
        ],
        [
          "weak",
          "[[0|f(2) = f(4) = -4, so it isn't one-to-one.]] You fix it by restricting to x <= 3, and then the inverse has y >= 3.",
          "The restriction x <= 3 would give outputs of the inverse y <= 3, not y >= 3. With the stated restriction x >= 3, the inverse has range y >= 3.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Factoring higher-degree polynomials and dividing rational expressions",
  note: `
## Objectives

Students will be able to:

1. use the remainder and factor theorems and the rational zero theorem to factor polynomials of degree 3 and 4 and find all rational zeros, including repeated ones;
2. rewrite rational expressions by long division and by factoring, and use the result to describe asymptotes and holes.

## Materials

Whiteboards, synthetic division reference cards, graphing handhelds for checking, the worksheet.

## Starter (8 minutes)

Give x^3 - 7x + 6 and ask for a zero. Students can try x = 1, 2 and 3. Ask: "How do we know we have found all the zeros?" Introduce the counting by degree: each zero found and divided out reduces the degree, and when it reaches 2, the quadratic formula finishes the job.

## Main activity

1. Factor x^4 - 3x^3 - 7x^2 + 15x + 18 completely. List candidates, test with synthetic division, divide repeatedly, and record multiplicities.
2. Remainder with a non-monic divisor: the remainder of 2x^4 - x^3 + 3x - 5 on division by 2x + 1.
3. Find k so that x + 2 is a factor of x^3 + kx^2 - 5x + 6.
4. Rewrite (x^3 - 2x^2 + 3)/(x^2 - 1) by long division, and by factoring. Find the slant asymptote, the vertical asymptote and the hole.

## Checking for understanding

Whiteboards: "After testing x = 3 you divide and get x^3 - 7x - 6. Do you need to test 3 again? Why or why not?"

## Worksheet

Collect the worksheet at the end of class.
`,
  reading: [
    "Finding all the zeros, and rewriting rational functions",
    `
To factor a polynomial of degree 3 or higher completely, use the rational zero theorem to list candidates, test them, divide out each zero found, and repeat on what is left. Consider x^3 - 7x + 6. The candidates are plus or minus 1, 2, 3 and 6. Test x = 1: 1 - 7 + 6 = 0. Divide to get x^2 + x - 6 = (x + 3)(x - 2). So x^3 - 7x + 6 = (x - 1)(x - 2)(x + 3), with zeros 1, 2 and -3.

A harder example is f(x) = x^4 - 3x^3 - 7x^2 + 15x + 18. The candidates are the factors of 18: plus or minus 1, 2, 3, 6, 9 and 18. Synthetic division with 3 uses the coefficients 1, -3, -7, 15, 18. Bring down 1; multiply by 3 and add to -3 to get 0; multiply by 3 and add to -7 to get -7; multiply by 3 and add to 15 to get -6; multiply by 3 and add to 18 to get 0. The remainder is 0, and the quotient is x^3 + 0x^2 - 7x - 6. A found zero must be tested again in the quotient, in case it repeats. Here 3^3 - 7(3) - 6 = 27 - 21 - 6 = 0, so 3 is a double zero. Dividing again gives x^2 + 3x + 2 = (x + 1)(x + 2). The complete factorization is f(x) = (x - 3)^2 (x + 1)(x + 2), with zeros 3 (multiplicity 2), -1 and -2, so the graph touches the axis at x = 3.

The remainder theorem works for divisors with a leading coefficient other than 1. To find the remainder of 2x^4 - x^3 + 3x - 5 on division by 2x + 1, evaluate at x = -1/2: 2(1/16) + 1/8 - 3/2 - 5 = 1/8 + 1/8 - 3/2 - 5 = -25/4. It can also be used to find unknowns. If x + 2 is a factor of x^3 + kx^2 - 5x + 6, then f(-2) = -8 + 4k + 10 + 6 = 4k + 8 = 0, so k = -2.

Rational expressions can be rewritten by division. Divide x^3 - 2x^2 + 3 by x^2 - 1. The first term is x, and x(x^2 - 1) = x^3 - x, leaving -2x^2 + x + 3. Next, -2x^2 divided by x^2 is -2, and -2(x^2 - 1) = -2x^2 + 2, leaving x + 1. So the quotient is x - 2 and the remainder is x + 1. But x + 1 is itself a factor of x^2 - 1 = (x - 1)(x + 1), so (x + 1)/(x^2 - 1) = 1/(x - 1) for x not equal to -1. The function equals x - 2 + 1/(x - 1), with the slant asymptote y = x - 2 and the vertical asymptote x = 1. At x = -1 the original is undefined, and the simplified form gives -3 - 1/2 = -7/2, so there is a hole at (-1, -7/2). Indeed the numerator factors as (x + 1)(x^2 - 3x + 3) because f(-1) = -1 - 2 + 3 = 0.
`,
  ],
  cards: [
    ["Repeated zero", "A zero that is also a zero of the quotient after division, so it has multiplicity 2 or more."],
    ["Synthetic division", "A shortcut for dividing by x - a: bring down, multiply by a, add, and repeat."],
    ["Complete factorization", "Keep dividing out zeros until the remaining factor is a quadratic that you can solve."],
    ["Remainder with 2x + 1", "Evaluate f at -1/2, the zero of the divisor."],
    ["Finding an unknown coefficient", "If x - a is a factor, set f(a) = 0 and solve for the unknown."],
    ["Rewriting a rational function", "Divide to get quotient plus remainder over divisor, then simplify any common factor."],
    ["Hole after division", "A common factor of the numerator and denominator gives a hole at its zero."],
    ["Slant asymptote", "The quotient line, y = x - 2 for (x^3 - 2x^2 + 3)/(x^2 - 1)."],
  ],
  closed: [
    [
      "The polynomial f(x) = x^3 - 7x + 6 has x - 1 as a factor. What are all of its zeros?",
      ["1, 2 and -3", "1, -2 and 3", "-1, 2 and 3", "1, 6 and -1"],
      "A",
    ],
    [
      "What is the remainder when 2x^4 - x^3 + 3x - 5 is divided by 2x + 1?",
      ["-5", "-25/4", "25/4", "-7"],
      "B",
    ],
    [
      "For what value of k is x + 2 a factor of x^3 + kx^2 - 5x + 6?",
      ["2", "-8", "-2", "8"],
      "C",
    ],
    [
      "How can (3x^3 - 2x^2 + x - 5)/(x^2 + 1) be written as a polynomial plus a fraction?",
      [
        "3x - 2 + (2x + 3)/(x^2 + 1)",
        "3x + 2 + (-2x - 3)/(x^2 + 1)",
        "3x - 2 + (-2x + 3)/(x^2 + 1)",
        "3x - 2 + (-2x - 3)/(x^2 + 1)",
      ],
      "D",
    ],
    [
      "Which of the following is NOT a possible rational zero of 2x^4 - 3x^3 + x - 12?",
      ["5/2", "3/2", "12", "1/2"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Factor f(x) = x^4 - 3x^3 - 7x^2 + 15x + 18 completely. List the candidates for rational zeros, use synthetic division to find zeros and divide them out, and give each zero with its multiplicity. Say what the graph does at the repeated zero.",
      scheme: [
        "Lists the candidates as the plus or minus factors of 18: 1, 2, 3, 6, 9, 18",
        "Shows that f(3) = 0 and divides to get x^3 - 7x - 6",
        "Finds that 3 is a zero again, then divides to get x^2 + 3x + 2 = (x + 1)(x + 2)",
        "Writes f(x) = (x - 3)^2 (x + 1)(x + 2), gives the zeros 3 (multiplicity 2), -1 and -2, and says the graph touches the axis and turns at x = 3",
      ],
      model:
        "The leading coefficient is 1, so the rational zeros are integers dividing 18: plus or minus 1, 2, 3, 6, 9 and 18. Synthetic division by 3 on 1, -3, -7, 15, 18 gives 1, 0, -7, -6, 0, so f(3) = 0 and the quotient is x^3 - 7x - 6. Testing 3 again: 27 - 21 - 6 = 0, so 3 is a zero again, and dividing gives x^2 + 3x + 2 = (x + 1)(x + 2). So f(x) = (x - 3)^2 (x + 1)(x + 2). The zeros are 3 with multiplicity 2, -1 and -2. At the double zero x = 3, the graph touches the x-axis and turns around.",
      answers: [
        [
          "full",
          "[[0|The leading coefficient is 1 so the zeros are factors of 18: plus or minus 1, 2, 3, 6, 9, 18.]] [[1|Synthetic division with 3 gives 1, 0, -7, -6 and a remainder of 0, so 3 is a zero, quotient x^3 - 7x - 6.]] [[2|Try 3 again, 27 - 21 - 6 = 0, so divide again to get x^2 + 3x + 2 = (x + 1)(x + 2).]] [[3|f(x) = (x - 3)^2 (x + 1)(x + 2). The zeros are 3 (twice), -1 and -2, and at 3 the graph touches the axis and bounces.]]",
          "Full marks. Testing the same zero again after dividing is how you find a repeated zero.",
        ],
        [
          "full",
          "Candidates: [[0|+-1, 2, 3, 6, 9, 18]]. Synthetic division by 3: [[1|1, -3, -7, 15, 18 becomes 1, 0, -7, -6, 0. It works, and the cubic left is x^3 - 7x - 6]]. Try 3 on the cubic: it gives 1, 3, 2, 0, [[2|so the quotient is x^2 + 3x + 2, which factors as (x + 1)(x + 2)]]. [[3|So (x - 3)^2 (x + 1)(x + 2): zeros are 3 with multiplicity 2, -1, and -2; the graph touches at 3 since the multiplicity is even]].",
          "All four marks. Running synthetic division twice with the same zero shows the multiplicity directly.",
        ],
        [
          "partial",
          "[[0|The candidates are factors of 18.]] [[1|f(3) = 0 so I divide and get x^3 - 7x - 6.]] Then I test -1 and get (x + 1)(x^2 - x - 6), so (x - 3)(x + 1)(x - 3)(x + 2).",
          "Your steps are valid, and (x + 1)(x - 3)(x + 2) is the factorization of the cubic. The final answer has (x - 3) twice, so the multiplicity at 3 is 2 and the graph touches the axis there. Say that.",
        ],
        [
          "partial",
          "[[3|f(x) = (x - 3)^2 (x + 1)(x + 2), a double zero at 3, and the graph touches and turns at 3.]] [[0|The candidates are the factors of 18.]]",
          "Your factorization and graph behavior are right. Show the work in between: the synthetic division with 3, the cubic x^3 - 7x - 6, and the second division.",
          true,
        ],
        [
          "weak",
          "The zeros are 1, 2 and 3 because 1 x 2 x 3 = 6 and those are small numbers.",
          "Zeros are found by testing, not by multiplying small numbers. Test each candidate in f. f(1) = 1 - 3 - 7 + 15 + 18 = 24, so 1 is not a zero.",
        ],
        [
          "weak",
          "[[1|f(3) = 0 so 3 is a zero.]] That's the only zero because after dividing I can't test 3 again.",
          "You can test 3 again. The cubic x^3 - 7x - 6 is zero at 3, so 3 is a repeated zero. Always test a found zero again in the quotient.",
        ],
      ],
    },
    {
      prompt:
        "Rewrite f(x) = (x^3 - 2x^2 + 3)/(x^2 - 1) by long division. Then factor the numerator, simplify, and find the slant asymptote, the vertical asymptote and the hole, with its coordinates.",
      scheme: [
        "Divides to get the quotient x - 2 and the remainder x + 1, so f(x) = x - 2 + (x + 1)/(x^2 - 1)",
        "Factors the numerator as (x + 1)(x^2 - 3x + 3), since f(-1) = 0, and simplifies to (x^2 - 3x + 3)/(x - 1) for x not equal to -1",
        "Gives the slant asymptote y = x - 2 and the vertical asymptote x = 1",
        "Finds the hole at (-1, -7/2) using the simplified form",
      ],
      model:
        "Dividing, x^3 - 2x^2 + 3 = (x^2 - 1)(x - 2) + (x + 1), so f(x) = x - 2 + (x + 1)/(x^2 - 1). The numerator is zero at x = -1, so (x + 1) is a factor: x^3 - 2x^2 + 3 = (x + 1)(x^2 - 3x + 3). The denominator is (x - 1)(x + 1), so f simplifies to (x^2 - 3x + 3)/(x - 1) for x not equal to -1, which is x - 2 + 1/(x - 1). The slant asymptote is y = x - 2 and the vertical asymptote is x = 1. At x = -1 the original is undefined, and the simplified function there equals (1 + 3 + 3)/(-2) = -7/2, so there is a hole at (-1, -7/2).",
      answers: [
        [
          "full",
          "[[0|x^3 divided by x^2 is x, x(x^2 - 1) = x^3 - x, subtract to get -2x^2 + x + 3, then -2(x^2 - 1) = -2x^2 + 2, subtract to get x + 1. So the quotient is x - 2 and the remainder is x + 1.]] [[1|The numerator is zero at -1, so (x + 1) is a factor and it equals (x + 1)(x^2 - 3x + 3), which cancels with the (x + 1) in x^2 - 1, leaving (x^2 - 3x + 3)/(x - 1).]] [[2|The slant asymptote is y = x - 2 and the vertical asymptote is x = 1.]] [[3|The hole is at x = -1 and the y-value is (1 + 3 + 3)/(-2) = -7/2, so (-1, -7/2).]]",
          "Full marks. Spotting that the remainder shares a factor with the divisor is the insight in this problem.",
        ],
        [
          "full",
          "Long division gives [[0|x - 2 with remainder x + 1, so x - 2 + (x + 1)/(x^2 - 1)]]. Since x^2 - 1 = (x - 1)(x + 1), [[1|the fraction reduces to 1/(x - 1), so f is x - 2 + 1/(x - 1), with the original undefined at x = -1]]. [[2|Slant asymptote y = x - 2, vertical asymptote x = 1 (the factor that did not cancel)]]. [[3|At x = -1 the reduced function is -1 - 2 + 1/(-2) = -3.5, so there's a hole at (-1, -3.5)]].",
          "All four marks. Evaluating the reduced function x - 2 + 1/(x - 1) gives the hole's height in an easy way.",
        ],
        [
          "partial",
          "[[0|The quotient is x - 2 and the remainder is x + 1.]] [[2|The slant asymptote is y = x - 2 and the vertical asymptotes are x = 1 and x = -1.]] No holes.",
          "The division and slant asymptote are right. The remainder x + 1 shares a factor with x^2 - 1, so x = -1 is a hole, not an asymptote: at (-1, -7/2).",
        ],
        [
          "partial",
          "[[3|The hole is at (-1, -7/2).]] [[2|The slant asymptote is y = x - 2 and the vertical asymptote is x = 1.]]",
          "Your hole and asymptotes are right. Show the long division giving x - 2 with remainder x + 1, and the factoring of the numerator that justifies the hole.",
          true,
        ],
        [
          "weak",
          "Divide x^3 by x^2 to get x, and 3 by -1 to get -3, so it's x - 3.",
          "Long division is not done term by term. After the first quotient term x, multiply back, subtract, and continue with the remainder. The quotient is x - 2.",
        ],
        [
          "weak",
          "[[1|The numerator factors as (x + 1)(x^2 - 3x + 3).]] There's no hole because x^2 - 3x + 3 doesn't factor.",
          "The numerator factoring is right. A hole comes from the common factor (x + 1), which appears in both numerator and denominator. The quadratic factor not factoring is irrelevant to the hole.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Complex zeros, radical and rational inequalities, and exponential models",
  note: `
## Objectives

Students will be able to:

1. use the fundamental theorem of algebra and the conjugate pair theorem to count zeros of a polynomial and build a polynomial from given zeros;
2. solve rational and radical equations and rational inequalities, including equations with two radicals;
3. model growth and decay with exponential functions, write them in base e, and solve for time with logarithms.

## Materials

Graphing handhelds, sign chart templates, whiteboards, the quiz.

## Starter (8 minutes)

Ask: "A real polynomial of degree 4 has the zeros 1 (twice) and 2 - 3i. What is the polynomial?" Let students discuss whether the information is enough. Reach the conclusion that 2 + 3i must be a zero as well, and that the four zeros are now accounted for.

## Main activity

1. The conjugate pair theorem: build (x - 1)^2 (x^2 - 4x + 13) and expand. Check that the result has real coefficients and that x = 1 is a zero.
2. Rational inequality: (x - 3)/(x + 2) > 1. Do not cross-multiply; move everything to one side and combine.
3. Two radicals: solve the square root of (x + 5) minus the square root of (x - 3) = 2. Isolate and square twice if needed, and check.
4. Exponential models: write 800(3)^(t/5) as 800e^(kt) and find k. Solve for the time to reach 10,000.

## Checking for understanding

Whiteboards: "Which of these could be the full set of zeros of a degree-5 polynomial with real coefficients: {1, 2 + i, 3i}, or {1, 2 + i, 2 - i, 3i, -3i}?"

## Quiz

Give the quiz in the last ten minutes.
`,
  reading: [
    "Building polynomials from their zeros, and solving with care",
    `
The fundamental theorem of algebra says that a polynomial of degree n has exactly n complex zeros, counting multiplicity. The conjugate pair theorem adds that for a polynomial with real coefficients, non-real zeros come in pairs: if a + bi is a zero, so is a - bi. These two facts let you reason about what a set of zeros can be. A degree-5 real polynomial could have the zeros 1, 2 + i, 2 - i, 3i and -3i, but not 1, 2 + i and 3i alone, because the conjugates 2 - i and -3i are missing.

To build a polynomial from zeros, multiply the factors. Suppose a real polynomial of degree 4 has a leading coefficient of 1, a zero at 1 of multiplicity 2, and a zero at 2 - 3i. The conjugate 2 + 3i must also be a zero, and now there are four. The pair gives the quadratic (x - (2 - 3i))(x - (2 + 3i)) = (x - 2)^2 + 9 = x^2 - 4x + 13. Multiply by (x - 1)^2 = x^2 - 2x + 1: the result is x^4 - 4x^3 + 13x^2 - 2x^3 + 8x^2 - 26x + x^2 - 4x + 13 = x^4 - 6x^3 + 22x^2 - 30x + 13. As a check, substituting x = 1 gives 1 - 6 + 22 - 30 + 13 = 0.

Rational inequalities should not be handled by cross-multiplying, because the sign of the denominator is unknown. For (x - 3)/(x + 2) > 1, subtract 1 from both sides and combine: (x - 3 - (x + 2))/(x + 2) = -5/(x + 2) > 0. A negative number divided by x + 2 is positive exactly when x + 2 is negative, so x < -2. Always test a point: x = -3 gives (-6)/(-1) = 6, which is greater than 1.

Radical equations with two radicals need two rounds of squaring. For the square root of (x + 5) minus the square root of (x - 3) = 2, isolate one radical: the square root of (x + 5) = 2 + the square root of (x - 3). Square: x + 5 = 4 + 4 times the square root of (x - 3) + x - 3. Simplify: 4 = 4 times the square root of (x - 3), so the square root of (x - 3) = 1 and x = 4. Check: the square root of 9 minus the square root of 1 is 3 - 1 = 2. It works.

Exponential models can be written in base e. If bacteria triple every 5 hours from 800, then P(t) = 800(3)^(t/5) = 800e^(kt) with k = (ln 3)/5, about 0.2197. To find when the population reaches 10,000, solve 800e^(kt) = 10,000: e^(kt) = 12.5, so t = ln(12.5)/k = 5 ln(12.5)/ln 3, about 11.5 hours. Check: 3^(11.5/5) = 3^2.3, about 12.5. For continuous growth, a deposit of $5,000 at 4.5% compounded continuously doubles when e^(0.045t) = 2, so t = ln 2 / 0.045, about 15.4 years. And 5e^(0.3t) = 40 gives e^(0.3t) = 8, so t = ln 8 / 0.3, about 6.93.
`,
  ],
  cards: [
    ["Conjugate pair theorem", "If a real polynomial has a + bi as a zero, it also has a - bi."],
    ["Fundamental theorem of algebra", "A polynomial of degree n has exactly n complex zeros, counting multiplicity."],
    ["Building from zeros", "Multiply factors (x - r). A conjugate pair gives a real quadratic: x^2 - 2ax + a^2 + b^2."],
    ["Rational inequality", "Move everything to one side, combine into a single fraction, and use a sign chart. Never cross-multiply."],
    ["Two-radical equation", "Isolate one radical, square, simplify, and square again if a radical remains."],
    ["Exponential model in base e", "P(t) = P0 e^(kt). For a base b every T units, k = ln(b)/T."],
    ["Continuous doubling time", "The time for e^(rt) = 2 is t = ln 2 / r."],
    ["Checking solutions", "Every squaring step needs a check in the original equation."],
  ],
  closed: [
    [
      "Which could be the complete set of zeros of a polynomial of degree 5 with real coefficients?",
      [
        "1, 2 + i and 3i",
        "1, 2 + i, 2 - i and 3i",
        "1, 2 + i, 2 - i, 3i and -3i",
        "2 + i, 2 - i, 3i, -3i",
      ],
      "C",
    ],
    [
      "Solve (x - 3)/(x + 2) > 1.",
      ["x < -2", "x > -2", "x < 3", "-2 < x < 3"],
      "A",
    ],
    [
      "Solve the square root of (x + 5) minus the square root of (x - 3) = 2.",
      ["x = 3", "x = 4", "x = 7", "No solution"],
      "B",
    ],
    [
      "A deposit earns 4.5% interest compounded continuously, so A = Pe^(0.045t). About how long until it doubles?",
      ["About 22.2 years", "About 11.1 years", "About 8.7 years", "About 15.4 years"],
      "D",
    ],
    [
      "Solve 5e^(0.3t) = 40. Which is closest to t?",
      ["About 2.08", "About 26.7", "About 6.93", "About 13.3"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A polynomial P with real coefficients has degree 4, leading coefficient 1, a zero at x = 1 of multiplicity 2, and a zero at 2 - 3i. Explain why 2 + 3i is also a zero, find P in expanded form, and check your answer.",
      scheme: [
        "Says that the polynomial has real coefficients, so by the conjugate pair theorem 2 + 3i is a zero as well, and that these account for all four zeros by the fundamental theorem",
        "Writes the quadratic factor from the conjugate pair, x^2 - 4x + 13",
        "Multiplies (x - 1)^2 (x^2 - 4x + 13) correctly",
        "Gets P(x) = x^4 - 6x^3 + 22x^2 - 30x + 13 and checks, for example, that P(1) = 0",
      ],
      model:
        "Because P has real coefficients, non-real zeros come in conjugate pairs, so 2 + 3i is also a zero. With the double zero at 1 that makes four zeros, which is the degree. The conjugate pair gives (x - (2 - 3i))(x - (2 + 3i)) = (x - 2)^2 + 9 = x^2 - 4x + 13. Then P(x) = (x - 1)^2 (x^2 - 4x + 13) = (x^2 - 2x + 1)(x^2 - 4x + 13) = x^4 - 6x^3 + 22x^2 - 30x + 13. Check: P(1) = 1 - 6 + 22 - 30 + 13 = 0.",
      answers: [
        [
          "full",
          "[[0|The coefficients are real, so complex zeros come in conjugate pairs, so 2 + 3i is a zero too. Together with 1 twice that's four zeros, which is the degree.]] [[1|The pair gives (x - 2 + 3i)(x - 2 - 3i) = (x - 2)^2 - (3i)^2 = x^2 - 4x + 4 + 9 = x^2 - 4x + 13.]] [[2|Multiplying by (x - 1)^2 = x^2 - 2x + 1: x^4 - 4x^3 + 13x^2 - 2x^3 + 8x^2 - 26x + x^2 - 4x + 13.]] [[3|P(x) = x^4 - 6x^3 + 22x^2 - 30x + 13, and P(1) = 1 - 6 + 22 - 30 + 13 = 0.]]",
          "Full marks. Computing (x - 2)^2 - (3i)^2 as a difference of squares makes the imaginary parts vanish cleanly.",
        ],
        [
          "full",
          "A polynomial with real coefficients has [[0|zeros that pair up as a + bi and a - bi, so 2 + 3i is a zero, and the four zeros are 1, 1, 2 + 3i and 2 - 3i]]. Quadratic factor: [[1|sum of the pair is 4 and product is 4 + 9 = 13, so x^2 - 4x + 13]]. Multiply: [[2|(x^2 - 2x + 1)(x^2 - 4x + 13) = x^4 - 4x^3 + 13x^2 - 2x^3 + 8x^2 - 26x + x^2 - 4x + 13]]. [[3|Combine to get x^4 - 6x^3 + 22x^2 - 30x + 13. P(1) = 0 confirms the double zero is placed correctly]].",
          "All four marks. Using the sum and product of the conjugate pair is a quick way to the real quadratic.",
        ],
        [
          "partial",
          "[[0|Since the coefficients are real, 2 + 3i is a zero too.]] [[1|The quadratic is x^2 - 4x + 13.]] Then (x - 1)(x^2 - 4x + 13) = x^3 - 5x^2 + 17x - 13.",
          "Your reasoning and quadratic are right. The zero at 1 has multiplicity 2, so you need (x - 1)^2, not (x - 1). The degree-4 polynomial is x^4 - 6x^3 + 22x^2 - 30x + 13.",
        ],
        [
          "partial",
          "[[2|(x^2 - 2x + 1)(x^2 - 4x + 13) expands to x^4 - 6x^3 + 22x^2 - 30x + 13.]] [[3|P(1) = 0, so it works.]]",
          "Your polynomial and check are right. Explain why 2 + 3i must be a zero, the conjugate pair theorem, and show how the quadratic factor x^2 - 4x + 13 comes from the pair.",
          true,
        ],
        [
          "weak",
          "The polynomial is (x - 1)^2 (x - 2 + 3i), which is degree 3.",
          "The polynomial has degree 4 and real coefficients, so there must be four zeros including 2 + 3i. A factor containing i would give non-real coefficients.",
        ],
        [
          "weak",
          "[[1|The quadratic is x^2 - 4x + 13.]] To get the polynomial I just add: (x - 1) + (x - 1) + x^2 - 4x + 13.",
          "The factors are multiplied, not added, because the zeros of a product are the zeros of each factor. Multiply (x - 1)^2 by the quadratic.",
        ],
      ],
    },
    {
      prompt:
        "A culture of bacteria triples every 5 hours, starting from 800, so P(t) = 800(3)^(t/5). Write the model in the form 800e^(kt) and give k. Find the time for the culture to reach 10,000 using logarithms, and check your answer.",
      scheme: [
        "Writes 3^(t/5) as e^((ln 3 / 5)t), so k = (ln 3)/5, about 0.2197",
        "Sets 800e^(kt) = 10,000 and divides to get e^(kt) = 12.5",
        "Takes the natural log to get t = ln(12.5)/k, about 11.5 hours",
        "Checks that 800 x 3^(11.5/5) is about 10,000, since 3^2.3 is about 12.5",
      ],
      model:
        "Since 3 = e^(ln 3), 3^(t/5) = e^((ln 3 / 5)t), so P(t) = 800e^(kt) with k = (ln 3)/5, which is about 0.2197 per hour. To reach 10,000: 800e^(kt) = 10,000, so e^(kt) = 12.5. Taking natural logs, kt = ln 12.5, so t = ln(12.5)/k = 5 ln(12.5)/ln 3, about 5(2.5257)/1.0986, which is about 11.5 hours. Check: 3^(11.5/5) = 3^2.3, about 12.5, and 800 x 12.5 = 10,000.",
      answers: [
        [
          "full",
          "[[0|3 = e^(ln 3), so 3^(t/5) = e^((ln 3/5) t) and k = ln 3 / 5, about 0.2197.]] [[1|800 e^(kt) = 10,000 means e^(kt) = 12.5.]] [[2|ln of both sides: kt = ln 12.5, so t = ln 12.5 / 0.2197 = 2.5257/0.2197, about 11.5 hours.]] [[3|Check: 3^(11.5/5) = 3^2.3 = about 12.5 and 800 x 12.5 = 10,000.]]",
          "Full marks. Rewriting the base as e^(ln 3) is the key step in converting between bases.",
        ],
        [
          "full",
          "Base change: [[0|(3)^(t/5) = (e^(ln 3))^(t/5) = e^(t ln 3/5), so k = ln 3/5, about 0.22]]. [[1|Set 800 e^(kt) = 10000, divide by 800, and e^(kt) = 12.5]]. [[2|Natural log: t = ln(12.5)/k = 5 ln 12.5 / ln 3, which is about 11.5 hours]]. [[3|To check without e: 12.5 is between 3^2 = 9 and 3^3 = 27, and 3^2.3 is about 12.5, so 11.5 hours is 2.3 periods]].",
          "All four marks. Checking against powers of 3 without the calculator is a smart sense check.",
        ],
        [
          "partial",
          "[[0|k = ln 3 / 5 = 0.2197.]] [[1|e^(kt) = 12.5.]] Then t = 12.5 / 0.2197 = 56.9 hours.",
          "Your k and equation are right. To get t out of the exponent, take the natural log of both sides: t = ln(12.5)/0.2197, about 11.5 hours, not 12.5 divided by k.",
        ],
        [
          "partial",
          "[[2|t = ln(12.5)/k is about 11.5 hours.]] [[3|3^2.3 is about 12.5, so it checks out.]]",
          "Your solution and check are right. Show how to write the model as 800e^(kt), with k = (ln 3)/5, and how 10,000 leads to e^(kt) = 12.5.",
          true,
        ],
        [
          "weak",
          "k = 3/5 = 0.6 so the model is 800e^(0.6t), and t = ln(12.5)/0.6 = 4.2 hours.",
          "The rate k is not the 3 divided by 5. You need e^(kt) = 3^(t/5), so kt = (t/5) ln 3, which gives k = (ln 3)/5, about 0.22.",
        ],
        [
          "weak",
          "[[1|800 e^(kt) = 10,000 gives e^(kt) = 12.5.]] And 12.5 / 3 = 4.17, so it takes 4.17 periods, which is 20.8 hours.",
          "The equation is right. Dividing 12.5 by 3 is not the way to find how many tripling periods: you want the exponent n with 3^n = 12.5, which is ln 12.5 / ln 3, about 2.3 periods, or 11.5 hours.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Logarithm laws, exponential equations and angular measure",
  note: `
## Objectives

Students will be able to:

1. use the properties of logarithms to solve exponential and logarithmic equations, including equations in quadratic form and systems;
2. define radian measure, relate it to arc length on the unit circle, and apply it to angular speed and linear speed.

## Materials

Graphing handhelds, a bicycle wheel or a spinning disc for the demonstration, whiteboards, the problem set.

## Starter (8 minutes)

Spin a bicycle wheel and ask: "Is a point on the rim moving faster than a point near the hub?" Let students argue. Introduce angular speed, radians per second, and linear speed, the arc per second. Both points have the same angular speed, but the rim point covers more arc.

## Main activity

1. Logarithm identities: simplify log_3(8) times log_2(3) using change of base. Solve ln(x) + ln(x - 3) = ln 10 and check the domain.
2. Equation in quadratic form: e^(2x) - 5e^x + 6 = 0 with the substitution u = e^x.
3. A system: log_2(x) + log_2(y) = 5 and x - 2y = 0.
4. Angular speed: a wheel of radius 0.35 m turns at 240 revolutions per minute. Find omega in radians per second, the speed of the rim, and the distance covered in one minute.

## Checking for understanding

Whiteboards: "Convert 7(pi)/12 radians to degrees."

## Problem set

Collect the problem set the next day.
`,
  reading: [
    "More ways to use logarithms, and angular speed",
    `
The properties of logarithms are tools for simplifying, and the change-of-base formula connects bases. For example, log_3(8) times log_2(3) = (ln 8 / ln 3)(ln 3 / ln 2) = ln 8 / ln 2 = 3, since 8 = 2^3. The ln 3 factors cancel, so the product is the exponent that takes 2 to 8. The same idea gives the identity log_a(b) times log_b(a) = 1.

Equations with logs often combine and then reduce to a polynomial. For ln(x) + ln(x - 3) = ln 10, the product rule gives ln(x(x - 3)) = ln 10, so x(x - 3) = 10 and x^2 - 3x - 10 = 0, which factors as (x - 5)(x + 2) = 0. The candidate x = -2 would put negative numbers inside the logs, so it is extraneous, and the solution is x = 5. Exponential equations can sometimes be turned into quadratics by substitution. For e^(2x) - 5e^x + 6 = 0, let u = e^x, so u^2 - 5u + 6 = 0 and (u - 2)(u - 3) = 0. So e^x = 2 or e^x = 3, which gives x = ln 2 or x = ln 3. Both are valid because e^x is always positive.

Systems can involve logs too. Take log_2(x) + log_2(y) = 5 and x - 2y = 0. The first combines to log_2(xy) = 5, so xy = 32. From the second, x = 2y, so 2y^2 = 32 and y^2 = 16. Since log_2(y) needs y > 0, y = 4 and x = 8. Check: log_2 8 + log_2 4 = 3 + 2 = 5, and 8 - 2(4) = 0.

Radian measure makes motion simple. An angle of 1 radian has an arc equal in length to the radius, so an angle of theta radians cuts off the arc s = r(theta). A full turn is 2(pi) radians. To convert, multiply degrees by pi/180: 7(pi)/12 radians is 7(180)/12 = 105 degrees. For a wheel turning at a steady rate, the angular speed omega is the angle per unit time, in radians per second. A bicycle wheel of radius 0.35 m turning at 240 revolutions per minute covers 240 x 2(pi) radians per minute, so omega = 240 x 2(pi)/60 = 8(pi) radians per second, about 25.1. The speed of a point on the rim is v = r(omega) = 0.35 x 8(pi) = 2.8(pi), about 8.8 meters per second. In one minute the rim covers about 8.8 x 60, which is 528 meters. A cross-check: in one minute there are 240 turns, each of circumference 2(pi)(0.35), about 2.2 meters, and 240 x 2.2 = 528 meters. A point nearer the hub has the same omega but a smaller r, so its linear speed is smaller. On a circle of radius 15 centimeters, a central angle of 2.4 radians has an arc of 15 x 2.4 = 36 centimeters.
`,
  ],
  cards: [
    ["Reciprocal identity for logs", "log_a(b) times log_b(a) = 1."],
    ["Substitution for exponentials", "In e^(2x) - 5e^x + 6 = 0, let u = e^x to get a quadratic in u."],
    ["Domain check", "Reject any candidate that makes the argument of a logarithm zero or negative."],
    ["Radian conversion", "Radians = degrees x pi/180. Degrees = radians x 180/pi."],
    ["Angular speed", "omega = angle per unit time, in radians per second. One revolution is 2(pi) radians."],
    ["Linear speed", "v = r(omega). A point farther from the center moves faster, with the same omega."],
    ["Arc length", "s = r(theta), with theta in radians."],
    ["Systems with logs", "Combine the logs, solve for one variable, and check that the logs are defined."],
  ],
  closed: [
    [
      "What is the value of log_3(8) times log_2(3)?",
      ["3", "24", "8/3", "1"],
      "A",
    ],
    [
      "Solve ln(x) + ln(x - 3) = ln 10.",
      ["x = -2", "x = 5", "x = 5 or x = -2", "x = 10"],
      "B",
    ],
    [
      "Solve e^(2x) - 5e^x + 6 = 0.",
      ["x = 2 or x = 3", "x = ln 6", "x = ln 2 or x = ln 3", "x = ln 5"],
      "C",
    ],
    [
      "What is 7(pi)/12 radians in degrees?",
      ["84 degrees", "210 degrees", "75 degrees", "105 degrees"],
      "D",
    ],
    [
      "On a circle of radius 15 centimeters, what is the length of the arc cut off by a central angle of 2.4 radians?",
      ["6.25 cm", "36 cm", "17.4 cm", "72 cm"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Solve the system log_2(x) + log_2(y) = 5 and x - 2y = 0. Show how you combine the logarithms, eliminate a variable, reject any invalid solution, and check in both equations.",
      scheme: [
        "Combines the logs with the product rule to get log_2(xy) = 5, so xy = 32",
        "Substitutes x = 2y to get 2y^2 = 32, so y^2 = 16",
        "Gets y = 4 (rejecting y = -4 since the logarithm of a negative number is undefined) and x = 8",
        "Checks that log_2 8 + log_2 4 = 3 + 2 = 5 and 8 - 2(4) = 0",
      ],
      model:
        "By the product rule log_2(x) + log_2(y) = log_2(xy) = 5, so xy = 2^5 = 32. From x - 2y = 0, x = 2y, so (2y)y = 32, 2y^2 = 32 and y^2 = 16. Then y = 4 or y = -4. Since log_2(y) needs y > 0, y = -4 is rejected, so y = 4 and x = 8. Check: log_2 8 + log_2 4 = 3 + 2 = 5, and 8 - 2(4) = 0.",
      answers: [
        [
          "full",
          "[[0|Add logs means multiply inside: log_2(xy) = 5, so xy = 2^5 = 32.]] [[1|x = 2y from the second equation, so 2y x y = 32, 2y^2 = 32, y^2 = 16.]] [[2|y = 4 or -4, but you can't take the log of -4, so y = 4, and x = 8.]] [[3|Check: log_2 8 = 3 and log_2 4 = 2, 3 + 2 = 5. And 8 - 8 = 0.]]",
          "Full marks. Checking both equations is how you know the pair works for the whole system.",
        ],
        [
          "full",
          "Equation 1: [[0|log_2(xy) = 5 gives xy = 32]]. Equation 2: x = 2y. [[1|Substituting, 2y^2 = 32, so y^2 = 16]]. [[2|y has to be positive for log_2(y) to exist, so y = 4 and x = 8]]. [[3|log_2(8) + log_2(4) = 3 + 2 = 5 checks the first equation, and 8 - 2(4) = 0 checks the second]].",
          "All four marks. Saying why y must be positive links the rejection to the domain of the log.",
        ],
        [
          "partial",
          "[[0|log_2(xy) = 5, so xy = 32.]] [[1|2y^2 = 32 so y^2 = 16.]] y = 4 or -4 and x = 8 or -8.",
          "Your first two steps are right. Logarithms need positive inputs, so y = -4 and x = -8 are not allowed, and the only solution is x = 8, y = 4.",
        ],
        [
          "partial",
          "[[2|y = 4 and x = 8, and the negative one doesn't work.]] [[3|log_2 8 + log_2 4 = 5.]]",
          "Your answer and check are right. Show how the logs combine to give xy = 32, and how the substitution leads to y^2 = 16.",
          true,
        ],
        [
          "weak",
          "log_2(x) + log_2(y) = 5 means x + y = 5, and with x = 2y that gives y = 5/3 and x = 10/3.",
          "The sum of logs is the log of a product, not the log of a sum. So log_2(xy) = 5 gives xy = 32.",
        ],
        [
          "weak",
          "[[0|log_2(xy) = 5, so xy = 32.]] Then x = 2y means x = y/2, so y^2/2 = 32 and y = 8.",
          "The first step is right. x = 2y means x is twice y, not half of it, so (2y)(y) = 32, which gives y = 4.",
        ],
      ],
    },
    {
      prompt:
        "A bicycle wheel of radius 0.35 meters turns at 240 revolutions per minute. Find its angular speed in radians per second, the speed of a point on the rim in meters per second, and the distance a point on the rim travels in one minute. Check the distance a second way.",
      scheme: [
        "Finds the angular speed 240 x 2(pi)/60 = 8(pi) radians per second, about 25.1",
        "Finds the rim speed v = r(omega) = 0.35 x 8(pi) = 2.8(pi), about 8.8 meters per second",
        "Finds the distance in one minute as about 8.8 x 60, which is about 528 meters",
        "Checks with 240 turns times the circumference 2(pi)(0.35), about 2.2 meters, giving about 528 meters",
      ],
      model:
        "In one minute the wheel turns 240 times, which is 240 x 2(pi) radians, so omega = 240 x 2(pi)/60 = 8(pi) radians per second, about 25.1. The speed of the rim is v = r(omega) = 0.35 x 8(pi) = 2.8(pi), about 8.8 meters per second. In 60 seconds the rim travels about 8.8 x 60 = 528 meters. Check: each turn covers the circumference 2(pi)(0.35), about 2.199 meters, and 240 turns cover about 240 x 2.199 = 528 meters.",
      answers: [
        [
          "full",
          "[[0|240 rev per minute is 240 x 2 pi radians per minute, divided by 60 is 8 pi radians per second, about 25.1.]] [[1|v = r omega = 0.35 x 8 pi = 2.8 pi, about 8.8 m/s.]] [[2|For one minute, 8.8 x 60 is about 528 meters.]] [[3|Check: the circumference is 2 pi (0.35) = 2.2 m, and 240 turns is 240 x 2.2 = 528 m.]]",
          "Full marks. Two independent routes to 528 meters make the answer trustworthy.",
        ],
        [
          "full",
          "Angular speed: [[0|each revolution is 2 pi, so 240 x 2 pi / 60 s = 8 pi rad/s]]. Rim speed: [[1|v = r times omega = 0.35 x 25.13 = 8.80 m/s]]. Distance: [[2|speed times time = 8.80 x 60 = 527.8 m]]. Cross-check: [[3|240 turns of circumference 2 pi (0.35) = 2.199 m gives 527.8 m too]].",
          "All four marks. Keeping the extra decimal places makes the two results agree exactly.",
        ],
        [
          "partial",
          "[[0|omega = 8 pi radians per second.]] [[1|The rim speed is 0.35 x 8 pi = 8.8 m/s.]] The distance is 8.8 meters.",
          "Your angular and rim speeds are right. The distance in one minute is speed times 60 seconds: 8.8 x 60 = 528 meters, not 8.8.",
        ],
        [
          "partial",
          "[[2|The rim travels about 528 meters in a minute.]] [[3|240 x 2 pi (0.35) is about 528.]] The angular speed is 240 radians per second.",
          "Your distance and check are right. 240 is the number of revolutions per minute, not radians per second. Convert: 240 x 2 pi radians per minute is 8 pi radians per second.",
          true,
        ],
        [
          "weak",
          "Speed is 240 x 0.35 = 84 m/s.",
          "Revolutions per minute is not a speed in meters. Convert to angular speed in radians per second and multiply by the radius, or use the circumference of the wheel for each turn.",
        ],
        [
          "weak",
          "[[0|omega = 8 pi rad/s.]] The rim and the hub are going the same speed because they have the same omega.",
          "They have the same angular speed, but the linear speed is r times omega, so a point on the rim, with a bigger r, travels faster than one near the hub.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "The unit circle, trigonometric identities and periodic models with phase shift",
  note: `
## Objectives

Students will be able to:

1. extend the trigonometric functions to all real numbers using the unit circle, find exact values from one known value and the quadrant, and use reference angles;
2. model periodic phenomena with trigonometric functions, choosing the amplitude, period, midline and phase shift, and solving for times.

## Materials

Unit circle poster, graphing handhelds, whiteboards, the worksheet.

## Starter (8 minutes)

Write: "sin theta = -5/13 and cos theta is negative. Find cos theta and tan theta." Let students sketch a unit circle and decide the quadrant first. Then use x^2 + y^2 = 1 to find the other coordinate. Discuss why the quadrant decides the sign and the identity decides the size.

## Main activity

1. Exact values at special angles using reference angles: sin(11(pi)/6), cos(-5(pi)/6), and tan of any quadrantal-related angle.
2. From one value to the rest: given sin theta = 3/5 in quadrant II, find cos and tan. Then sin theta = -5/13 in quadrant III, with the angle in radians as an inverse-sine computation.
3. Modeling: the depth of water at a Lake Erie marina, d(t) = 6 + 1.5 sin((pi)(t - 2)/6). Amplitude, period, midline and phase shift; depth at t = 5; the first time the depth is 6.75.
4. Solving 2 cos theta = -(the square root of 3) for theta between 0 and 2(pi).

## Checking for understanding

Whiteboards: "What are the period and phase shift of y = sin((pi)(t - 2)/6)?" Look for 12 and 2 to the right.

## Worksheet

Collect the worksheet at the end of class.
`,
  reading: [
    "Exact values, identities and phase shifts",
    `
On the unit circle, the point at angle theta has coordinates (cos theta, sin theta), and because the point is on the circle, cos^2 theta + sin^2 theta = 1. That one identity lets you find one function from another. Suppose sin theta = 3/5 and theta is in quadrant II. Then cos^2 theta = 1 - 9/25 = 16/25, so cos theta = plus or minus 4/5. In quadrant II the cosine is negative, so cos theta = -4/5, and tan theta = (3/5)/(-4/5) = -3/4. Similarly, if sin theta = -5/13 and cos theta < 0, the angle is in quadrant III, cos theta = -12/13 and tan theta = 5/12. The reference angle is arcsin(5/13), about 0.395 radians, so theta = (pi) + 0.395, about 3.536 radians.

For special angles, use the reference angle and the quadrant. The angle 11(pi)/6 is in quadrant IV, with reference angle (pi)/6, so sin(11(pi)/6) = -1/2. The angle -5(pi)/6 is in quadrant III, with reference angle (pi)/6, so cos(-5(pi)/6) = -(the square root of 3)/2. To solve 2 cos theta = -(the square root of 3), write cos theta = -(the square root of 3)/2. The reference angle is (pi)/6 and cosine is negative in quadrants II and III, so theta = 5(pi)/6 or 7(pi)/6.

The general sinusoid is y = A sin(B(t - C)) + D. The amplitude is |A|, the period is 2(pi)/|B|, the phase shift is C, which moves the graph C units to the right, and the midline is y = D. The depth of water at a Lake Erie marina might be d(t) = 6 + 1.5 sin((pi)(t - 2)/6) feet, with t in hours. The midline is 6 feet, the amplitude is 1.5 feet and B = (pi)/6, so the period is 2(pi)/((pi)/6) = 12 hours. The phase shift is 2 hours to the right. The depth ranges from 4.5 to 7.5 feet. At t = 5, d = 6 + 1.5 sin((pi)(3)/6) = 6 + 1.5 sin((pi)/2) = 7.5 feet, the highest tide. To find when the depth is first 6.75 feet, solve 6 + 1.5 sin((pi)(t - 2)/6) = 6.75, so sin((pi)(t - 2)/6) = 0.5. The smallest angle with sine 1/2 for t after the start is (pi)/6, so (pi)(t - 2)/6 = (pi)/6 and t - 2 = 1, so t = 3 hours. Check: d(3) = 6 + 1.5 sin((pi)/6) = 6 + 0.75 = 6.75.

When the argument is shifted, always set the whole argument equal to the angle you found, and then solve for t. If the question asks for all times in one period, also use the second angle, 5(pi)/6, which gives t - 2 = 5, so t = 7.
`,
  ],
  cards: [
    ["Pythagorean identity", "cos^2 theta + sin^2 theta = 1, since the point is on the unit circle."],
    ["From one value to the others", "Use the identity for size and the quadrant for sign."],
    ["Quadrant II", "Sine is positive, cosine and tangent are negative."],
    ["Quadrant III", "Tangent is positive, sine and cosine are negative."],
    ["Phase shift", "In A sin(B(t - C)) + D, the graph is moved C units to the right."],
    ["Period of a sinusoid", "2(pi)/|B|."],
    ["Solving a trig equation", "Find the reference angle, use the signs to find all angles in one period, then solve for the variable."],
    ["Tide model", "A sinusoid with midline at the average depth and amplitude equal to half the range."],
  ],
  closed: [
    [
      "What is sin(11(pi)/6)?",
      ["-1/2", "1/2", "-(the square root of 3)/2", "(the square root of 3)/2"],
      "A",
    ],
    [
      "What is cos(-5(pi)/6)?",
      ["(the square root of 3)/2", "-(the square root of 3)/2", "-1/2", "1/2"],
      "B",
    ],
    [
      "If sin theta = 3/5 and theta is in quadrant II, what is tan theta?",
      ["3/4", "4/3", "-3/4", "-4/3"],
      "C",
    ],
    [
      "A marina's water depth in feet is d(t) = 6 + 1.5 sin((pi)(t - 2)/6), with t in hours. What is the period?",
      ["6 hours", "2 hours", "24 hours", "12 hours"],
      "D",
    ],
    [
      "Solve 2 cos(theta) = -(the square root of 3) for theta between 0 and 2(pi).",
      [
        "5(pi)/6 and 7(pi)/6",
        "(pi)/6 and 11(pi)/6",
        "2(pi)/3 and 4(pi)/3",
        "(pi)/3 and 5(pi)/3",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Given sin(theta) = -5/13 and cos(theta) < 0, find cos(theta) and tan(theta) exactly, and say in which quadrant theta lies and why. Find the reference angle and the angle theta in radians, between 0 and 2(pi).",
      scheme: [
        "Says theta is in quadrant III because sine and cosine are both negative",
        "Finds cos(theta) = -12/13 using cos^2 + sin^2 = 1 and choosing the negative root",
        "Finds tan(theta) = 5/12, positive in quadrant III",
        "Finds the reference angle arcsin(5/13), about 0.395 radians, and theta = (pi) + 0.395, about 3.54 radians",
      ],
      model:
        "Sine and cosine are both negative in quadrant III, so theta is in quadrant III. From cos^2 theta = 1 - 25/169 = 144/169, cos theta = plus or minus 12/13, and the negative sign gives cos theta = -12/13. Then tan theta = (-5/13)/(-12/13) = 5/12, which is positive, as expected in quadrant III. The reference angle is arcsin(5/13), about 0.395 radians, and in quadrant III theta = (pi) + 0.395, about 3.54 radians.",
      answers: [
        [
          "full",
          "[[0|sin is negative and cos is negative, so it's in quadrant III.]] [[1|cos^2 = 1 - 25/169 = 144/169, so cos = -12/13, taking the negative root since cos is negative.]] [[2|tan = (-5/13)/(-12/13) = 5/12, positive, which fits quadrant III.]] [[3|The reference angle is arcsin(5/13), about 0.395, and in the third quadrant theta = pi + 0.395 = about 3.54 radians.]]",
          "Full marks. Each answer is consistent with the quadrant, which is the best check available.",
        ],
        [
          "full",
          "Signs first: [[0|quadrant III, where both coordinates are negative]]. Size: [[1|(-5/13)^2 + x^2 = 1 gives x^2 = 144/169, and x is negative, so cos theta = -12/13]]. Then [[2|tan theta = sin/cos = 5/12, positive like it should be in III]]. For the angle: [[3|the reference angle is sin^-1(5/13) = 0.395 and theta = 3.1416 + 0.395 = 3.537 radians]].",
          "All four marks. Taking the sign from the quadrant after finding the size is the efficient order of work.",
        ],
        [
          "partial",
          "[[0|It's in quadrant III.]] [[1|cos = -12/13.]] tan = -5/-12 = -5/12 and the angle is 0.395 radians.",
          "The quadrant and cosine are right. Dividing two negatives gives a positive, so tan = 5/12. And 0.395 is the reference angle; theta in quadrant III is pi plus that, about 3.54.",
        ],
        [
          "partial",
          "[[2|tan = 5/12.]] [[3|The reference angle is 0.395 and theta is pi + 0.395, about 3.54.]] cos = 12/13.",
          "Your tangent and angle are right. The cosine is negative, given in the question, so cos theta = -12/13, and that matches the positive tangent.",
          true,
        ],
        [
          "weak",
          "cos = sqrt(1 - 5/13) = sqrt(8/13). tan = -5/sqrt(8/13).",
          "The identity squares the sine: cos^2 = 1 - (5/13)^2 = 144/169. You cannot subtract the unsquared 5/13.",
        ],
        [
          "weak",
          "[[1|cos = -12/13.]] The angle is arcsin(-5/13) = -0.395 radians so that's it.",
          "A calculator returns -0.395, which is in quadrant IV. The angle in quadrant III with that sine is pi + 0.395, about 3.54 radians, where cosine is also negative.",
        ],
      ],
    },
    {
      prompt:
        "The depth of water at a Lake Erie marina is d(t) = 6 + 1.5 sin((pi)(t - 2)/6) feet, with t in hours. Give the midline, amplitude, period and phase shift. Find the depth at t = 5 hours, and find the first time that the depth is 6.75 feet. Check your answer.",
      scheme: [
        "Gives the midline 6, the amplitude 1.5, the period 12 hours and the phase shift 2 hours to the right",
        "Finds d(5) = 6 + 1.5 sin((pi)/2) = 7.5 feet",
        "Sets the sine equal to 0.5, so (pi)(t - 2)/6 = (pi)/6 for the first time",
        "Finds t = 3 hours and checks that d(3) = 6.75",
      ],
      model:
        "In d(t) = 6 + 1.5 sin((pi)(t - 2)/6), the midline is y = 6, the amplitude is 1.5, the period is 2(pi)/((pi)/6) = 12 hours, and the phase shift is 2 hours to the right. At t = 5, d = 6 + 1.5 sin((pi)(3)/6) = 6 + 1.5 sin((pi)/2) = 7.5 feet. For 6.75 feet: 1.5 sin((pi)(t - 2)/6) = 0.75, so sin((pi)(t - 2)/6) = 0.5. The first angle with sine 0.5 after the start is (pi)/6, so (pi)(t - 2)/6 = (pi)/6, giving t - 2 = 1 and t = 3 hours. Check: d(3) = 6 + 1.5 sin((pi)/6) = 6 + 0.75 = 6.75.",
      answers: [
        [
          "full",
          "[[0|The midline is 6 feet, the amplitude is 1.5, the period is 2 pi divided by pi/6, which is 12 hours, and the phase shift is 2 hours to the right.]] [[1|d(5) = 6 + 1.5 sin(pi/2) = 7.5 feet, the high tide.]] [[2|6.75 means sin(pi(t - 2)/6) = 0.5, and the first angle is pi/6, so pi(t - 2)/6 = pi/6.]] [[3|t - 2 = 1 so t = 3 hours, and d(3) = 6 + 1.5(0.5) = 6.75.]]",
          "Full marks. The check at t = 3 confirms the whole chain of steps.",
        ],
        [
          "full",
          "Reading the equation: [[0|center line y = 6, amplitude 1.5, period 12 (since B = pi/6), shifted 2 hours right]]. At 5 hours: [[1|the inside is pi(3)/6 = pi/2, sin is 1, depth is 7.5 ft, the maximum 6 + 1.5]]. For 6.75: [[2|1.5 sin(...) = 0.75, so sin(...) = 1/2, the angle is pi/6 (or 5 pi/6 later)]]. [[3|pi(t - 2)/6 = pi/6 gives t = 3 hours. The second time in the cycle, at 5 pi/6, is t = 7]].",
          "All four marks. Noting the second solution at t = 7 shows you understand there are two crossings per cycle.",
        ],
        [
          "partial",
          "[[0|Midline 6, amplitude 1.5, period 12, shifted right 2.]] [[1|d(5) = 7.5 feet.]] For 6.75, pi(t - 2)/6 = 0.5 so t = 2.95.",
          "Your first two parts are right. When sin(angle) = 0.5, the angle is pi/6, not 0.5. So pi(t - 2)/6 = pi/6 gives t = 3.",
        ],
        [
          "partial",
          "[[2|sin(pi(t - 2)/6) = 0.5.]] [[3|The first time is 3 hours, and d(3) = 6.75.]] The period is 6 hours and the phase shift is 6.",
          "Your solving and check are right. The period is 12 hours, since 2 pi divided by pi/6 is 12, and the phase shift is 2 hours to the right, because the t - 2 is inside the bracket.",
          true,
        ],
        [
          "weak",
          "The midline is 1.5 and the amplitude is 6. d(5) = 6 + 1.5 x 5 = 13.5.",
          "The midline is the number added at the end, 6, and the amplitude is the number multiplying the sine, 1.5. And d(5) puts 5 inside the sine, not outside.",
        ],
        [
          "weak",
          "[[1|d(5) = 7.5 feet.]] To find when it's 6.75 you divide 6.75 by 1.5 to get 4.5 hours.",
          "The depth at 5 hours is right. To find the time, solve the equation 6 + 1.5 sin(...) = 6.75 for t. Dividing 6.75 by the amplitude does not use the model.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Limits at infinity, one-sided limits and the difference quotient",
  note: `
## Objectives

Students will be able to:

1. describe the end behavior and asymptotes of a function using limit notation, including one-sided limits at a vertical asymptote;
2. find an average rate of change over an interval, interpret it as the slope of a secant line, and use the difference quotient to approach the instantaneous rate of change.

## Materials

Graphing handhelds, tables of values, whiteboards, the worksheet.

## Starter (8 minutes)

Give f(x) = 2x^2 - x. Ask students to compute the average rate of change from x = 2 to x = 2.1, then from 2 to 2.01, then 2 to 2.001. They get 6.2, 6.02 and 6.002. Ask: "What number is the rates approaching, and how could you find it without a table?" Introduce the difference quotient.

## Main activity

1. Limits at infinity with unequal degrees: the limit as x goes to negative infinity of (3x^2 - x)/(1 - x^2) is -3. Explain with leading terms.
2. One-sided limits at vertical asymptotes: f(x) = (3x^2 - x - 2)/(x^2 - 4). Factor and read the signs near x = 2 and x = -2.
3. The difference quotient: simplify (f(x + h) - f(x))/h for f(x) = x^2 + 3x and for f(x) = 2x^2 - x. Let h go to 0 informally.
4. Interpreting: the value at x = 3 for f(x) = x^2 as the slope of the tangent line.

## Checking for understanding

Whiteboards: "What happens to 2x + h + 3 as h gets close to 0?"

## Worksheet

Collect the worksheet at the end of class.
`,
  reading: [
    "From asymptotes to the derivative",
    `
Limits describe what a function approaches. At infinity, the leading terms of a rational function decide. For (3x^2 - x)/(1 - x^2) as x goes to negative infinity, the terms 3x^2 and -x^2 dominate, so the quotient approaches 3/(-1) = -3. For a numerator of lower degree, such as (4x + 1)/(x^2 + 3), the limit is 0. A limit at infinity that is a finite number L gives the horizontal asymptote y = L.

Near a vertical asymptote, the function can go to positive or negative infinity depending on the side. Consider f(x) = (3x^2 - x - 2)/(x^2 - 4), which factors as (3x + 2)(x - 1)/((x - 2)(x + 2)). The denominator is zero at 2 and -2, and the numerator is not zero at either, so both are vertical asymptotes. As x approaches 2 from the right, the numerator is about 8, positive, x + 2 is about 4, positive, and x - 2 is a small positive number, so f goes to positive infinity. From the left, x - 2 is a small negative number, so f goes to negative infinity. As x approaches -2 from the right, the numerator is about 12, positive, x - 2 is about -4, negative, and x + 2 is a small positive number, so the denominator is a small negative number and f goes to negative infinity. From the left x + 2 is a small negative number, the denominator is small and positive, and f goes to positive infinity. The horizontal asymptote is y = 3.

The average rate of change from x to x + h is the difference quotient, (f(x + h) - f(x))/h, the slope of a secant line. Simplifying it algebraically shows what happens as h shrinks. For f(x) = x^2 + 3x, f(x + h) - f(x) = (x + h)^2 + 3(x + h) - x^2 - 3x = 2xh + h^2 + 3h, and dividing by h gives 2x + h + 3. As h gets close to 0 this approaches 2x + 3. At x = 2, the difference quotient is 7 + h, so the average rates for h = 0.1 and 0.01 are 7.1 and 7.01, approaching 7. That limit is the instantaneous rate of change at x = 2, the slope of the tangent line. For f(x) = 2x^2 - x, the quotient is 4x + 2h - 1, which approaches 4x - 1. For f(x) = x^2 at x = 3, the quotient is ((3 + h)^2 - 9)/h = 6 + h, which approaches 6.

The idea is the same whenever you take an average rate of change and let the interval shrink. For the function 1/x, the average rate from 1 to 4 is (1/4 - 1)/3 = -1/4. The limit idea, replacing h by 0 after the algebra removes the division by h, is the foundation of the derivative, which you will study in calculus.
`,
  ],
  cards: [
    ["Limit at infinity", "The value L that f(x) approaches as x grows without bound. It gives the horizontal asymptote y = L."],
    ["Leading-term comparison", "For a rational function, compare the highest powers of the top and bottom to find the limit at infinity."],
    ["One-sided limit", "The behavior of f(x) as x approaches a value from one side only."],
    ["Sign analysis near an asymptote", "Look at the sign of each factor near the value, and whether the small factor is positive or negative."],
    ["Difference quotient", "(f(x + h) - f(x))/h, the average rate of change from x to x + h."],
    ["Secant slope to tangent slope", "As h goes to 0, the secant slope approaches the slope of the tangent line."],
    ["Instantaneous rate of change", "The limit of the difference quotient as h approaches 0."],
    ["Simplify first", "Expand and cancel h in the numerator before letting h approach 0."],
  ],
  closed: [
    [
      "What is the limit as x goes to negative infinity of (3x^2 - x)/(1 - x^2)?",
      ["-3", "3", "-1", "0"],
      "A",
    ],
    [
      "What is the difference quotient (f(x + h) - f(x))/h for f(x) = 2x^2 - x, simplified?",
      ["4x - 1", "2x + h - 1", "4x + 2h - 1", "4x + h - 1"],
      "C",
    ],
    [
      "What is the average rate of change of f(x) = 1/x from x = 1 to x = 4?",
      ["-3/4", "-1/4", "1/4", "-1/3"],
      "B",
    ],
    [
      "What happens to f(x) = (x + 1)/(x - 2) as x approaches 2 from the left?",
      ["It approaches positive infinity", "It approaches 0", "It approaches 3", "It approaches negative infinity"],
      "D",
    ],
    [
      "For f(x) = x^2, the difference quotient at x = 3 is 6 + h. What does it approach as h approaches 0?",
      ["6", "9", "0", "3"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "For f(x) = x^2 + 3x, simplify the difference quotient (f(x + h) - f(x))/h. Evaluate it at x = 2 for h = 0.1 and h = 0.01, and say what number the rates approach as h approaches 0. What does that number mean for the graph of f?",
      scheme: [
        "Expands f(x + h) - f(x) and simplifies the quotient to 2x + h + 3",
        "Evaluates at x = 2: 7 + h gives 7.1 for h = 0.1 and 7.01 for h = 0.01",
        "States that the rates approach 7 as h approaches 0",
        "Interprets 7 as the instantaneous rate of change at x = 2, the slope of the tangent line there",
      ],
      model:
        "f(x + h) - f(x) = (x + h)^2 + 3(x + h) - x^2 - 3x = 2xh + h^2 + 3h. Dividing by h gives 2x + h + 3. At x = 2 this is 7 + h, which is 7.1 for h = 0.1 and 7.01 for h = 0.01. As h approaches 0, the quotient approaches 7. This is the instantaneous rate of change of f at x = 2, which is the slope of the tangent line to the graph at the point (2, 10).",
      answers: [
        [
          "full",
          "[[0|f(x + h) - f(x) = x^2 + 2xh + h^2 + 3x + 3h - x^2 - 3x = 2xh + h^2 + 3h, and dividing by h gives 2x + h + 3.]] [[1|At x = 2 it's 4 + h + 3 = 7 + h, so 7.1 for h = 0.1 and 7.01 for h = 0.01.]] [[2|As h gets closer to 0, it gets closer to 7.]] [[3|7 is the instantaneous rate of change at x = 2, which is the slope of the tangent line to the parabola at (2, 10).]]",
          "Full marks. The point (2, 10) on the graph, from f(2) = 4 + 6, makes the tangent line concrete.",
        ],
        [
          "full",
          "Expand carefully: [[0|(x + h)^2 + 3(x + h) - x^2 - 3x = 2xh + h^2 + 3h, which I divide by h to get 2x + h + 3]]. [[1|With x = 2 the quotient is 7 + h, so 7.1 and 7.01]]. [[2|The values are getting closer and closer to 7]]. [[3|That number is the slope of the tangent line at x = 2, the instantaneous rate of change; the secant lines get closer to the tangent as h shrinks]].",
          "All four marks. The link between the shrinking secant lines and the tangent is the main idea of the week.",
        ],
        [
          "partial",
          "[[0|The difference quotient is 2x + h + 3.]] [[1|At x = 2 it is 7.1 and 7.01.]] The rates approach 0 as h approaches 0.",
          "Your quotient and values are right. As h gets close to 0, the quotient gets close to 7, not 0. The 0 is the value of h, not of the rate of change.",
        ],
        [
          "partial",
          "[[2|The rates approach 7.]] [[3|7 is the slope of the tangent line at x = 2.]] The difference quotient is 2x + 3, right away.",
          "Your limit and meaning are right. The difference quotient itself is 2x + h + 3, and the h only disappears in the limit. Show the expansion and the simplification.",
          true,
        ],
        [
          "weak",
          "f(x + h) - f(x) = h, so the quotient is 1.",
          "f(x + h) is not f(x) + h. You have to substitute x + h into the formula: (x + h)^2 + 3(x + h).",
        ],
        [
          "weak",
          "[[1|At x = 2 and h = 0.1, 7 + 0.1 = 7.1.]] I got the same answer for every h so it's 7.1.",
          "Your first value is right, but h = 0.01 gives 7.01. The quotient depends on h, and it is the pattern 7.1, 7.01, closer and closer to 7, that matters.",
        ],
      ],
    },
    {
      prompt:
        "Let f(x) = (3x^2 - x - 2)/(x^2 - 4). Factor and find the vertical asymptotes and the horizontal asymptote. Using the signs of the factors, describe in limit notation what f does as x approaches 2 from each side and as x approaches -2 from each side.",
      scheme: [
        "Factors as (3x + 2)(x - 1) over (x - 2)(x + 2) and gives the vertical asymptotes x = 2 and x = -2 and the horizontal asymptote y = 3",
        "Says f goes to positive infinity as x approaches 2 from the right and to negative infinity from the left",
        "Says f goes to negative infinity as x approaches -2 from the right",
        "Says f goes to positive infinity as x approaches -2 from the left",
      ],
      model:
        "The numerator factors as (3x + 2)(x - 1) and the denominator as (x - 2)(x + 2). The numerator is not zero at 2 or -2, so there are vertical asymptotes at x = 2 and x = -2. The degrees are equal with leading coefficients 3 and 1, so the horizontal asymptote is y = 3. As x approaches 2 from the right, the numerator is about 8 and x + 2 is about 4, both positive, and x - 2 is a small positive number, so f goes to positive infinity; from the left, x - 2 is a small negative number, so f goes to negative infinity. As x approaches -2 from the right, the numerator is about 12, positive, x - 2 is about -4 and x + 2 is a small positive number, so the quotient goes to negative infinity; from the left, x + 2 is a small negative number, so f goes to positive infinity.",
      answers: [
        [
          "full",
          "[[0|(3x + 2)(x - 1) over (x - 2)(x + 2). Nothing cancels so x = 2 and x = -2 are vertical asymptotes, and y = 3 is the horizontal one since the degrees match and 3/1 = 3.]] [[1|At 2 from the right the top is about 8, x + 2 about 4, x - 2 small positive, so positive infinity. From the left x - 2 is small negative, so negative infinity.]] [[2|At -2 from the right, the top is about 12, x - 2 is about -4 and x + 2 is a tiny positive number, so the bottom is a tiny negative number, and it goes to negative infinity.]] [[3|At -2 from the left, x + 2 is a tiny negative so the bottom is a tiny positive and it goes to positive infinity.]]",
          "Full marks. Each limit is justified by the signs of the individual factors.",
        ],
        [
          "full",
          "Asymptotes: [[0|vertical x = 2 and x = -2 since the numerator factors (3x + 2), (x - 1) don't cancel anything; horizontal y = 3]]. Near x = 2: the top is positive, x + 2 is positive, [[1|so the sign is the sign of x - 2: the limit from the right is +infinity and from the left is -infinity]]. Near x = -2: the top is positive, x - 2 is negative, [[2|so the sign is the opposite of the sign of x + 2: from the right it's negative, so negative infinity]], and [[3|from the left (x + 2 negative) it's positive, so positive infinity]].",
          "All four marks. Writing the sign as the sign of the single small factor is a tidy way to do all four limits.",
        ],
        [
          "partial",
          "[[0|The vertical asymptotes are x = 2 and x = -2 and the horizontal one is y = 3.]] [[1|At 2 it goes to positive infinity from the right and negative infinity from the left.]] At -2 it does the same thing.",
          "Your asymptotes and the behavior at 2 are right. At x = -2 the factor x - 2 is negative, so the signs are reversed: negative infinity from the right and positive infinity from the left.",
        ],
        [
          "partial",
          "[[2|From the right of -2 it goes to negative infinity.]] [[3|From the left of -2 it goes to positive infinity.]] The asymptotes are x = 1 and x = -2/3.",
          "Your two limits are right. The values x = 1 and x = -2/3 are zeros of the numerator, which are x-intercepts. The vertical asymptotes come from the denominator: x = 2 and x = -2.",
          true,
        ],
        [
          "weak",
          "The function is undefined at 2 and -2, so the limit is undefined there and doesn't mean anything.",
          "Being undefined at a point does not mean there is no behavior near it. Limits describe what happens as x approaches the value, and here the function grows without bound in a way that depends on the side.",
        ],
        [
          "weak",
          "[[0|Vertical asymptotes at x = 2 and x = -2.]] The horizontal asymptote is y = 0 because the bottom has x^2 in it.",
          "The vertical asymptotes are right. The top also has x^2, so the degrees are equal, and the horizontal asymptote is the ratio of the leading coefficients, y = 3.",
        ],
      ],
    },
  ],
};

writeCourse("honors-precalculus-grade-12.json", "Honors Precalculus", "Grade 12", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
