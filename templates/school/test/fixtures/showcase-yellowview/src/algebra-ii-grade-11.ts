import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Algebra II, Grade 11, Quarter 1. Standards: Common Core, High School
 * Algebra and Functions, Algebra II course (A-APR, A-REI, A-SSE, F-IF, F-BF,
 * N-CN), in the school's own words.
 */

const w1: WeekInput = {
  topic: "Parent functions, forms of a quadratic and polynomial graphs",
  note: `
## Objectives

Students will be able to:

1. graph and compare the parent functions: linear, quadratic, absolute value, square root and cube root;
2. choose the form of a quadratic (standard, vertex or factored) that shows the zeros, the vertex or the axis of symmetry;
3. graph polynomial functions, showing zeros, end behavior and turning points.

## Materials

Graphing handhelds or Desmos, graph paper, a parent-function reference sheet, whiteboards.

## Starter (8 minutes)

Give a table of values for five parent functions with the function names removed. Ask students to plot each by hand and match the shape to its rule: f(x) = x, x squared, |x|, the square root of x, and x cubed. Discuss domain and range for each, noting the square root starts at 0.

## Main activity

1. A punted football's height is h(t) = -16t^2 + 64t + 80. Rewrite it in factored form, -16(t - 5)(t + 1), and in vertex form, -16(t - 2)^2 + 144. Ask which form answers which question.
2. Polynomial graphs: for f(x) = (x + 2)(x - 1)(x - 3), find the zeros, y-intercept, end behavior and the most turning points possible.
3. Connect the degree and leading coefficient to the ends of the graph on a sketching grid.

## Checking for understanding

Mini whiteboards: "Which form of x squared minus 6x plus 5 shows the zeros? Write it."

## Problem set and worksheet

Hand out the problem set now and the worksheet at the end of class.
`,
  reading: [
    "Choosing the right form of a function",
    `
Every function family has a simplest member, a parent function, and the others are variations of it. The linear parent is f(x) = x, a diagonal line through the origin. The quadratic parent f(x) = x squared is a U-shaped parabola with its vertex at the origin. The absolute value f(x) = |x| is a V. The square root f(x) = the square root of x starts at the origin and rises slowly to the right, and its domain is only x >= 0. The cube root and the cube, f(x) = x cubed, both pass through the origin with an S shape, but one is sideways. Knowing these shapes makes it easier to sketch any variation.

A quadratic can be written in three forms, and each answers a different question. Standard form, ax^2 + bx + c, shows the y-intercept c at a glance. Factored form, a(x - r)(x - s), shows the zeros r and s. Vertex form, a(x - h)^2 + k, shows the vertex (h, k) and the axis of symmetry x = h. A punt's height in feet after t seconds might be h(t) = -16t^2 + 64t + 80. In standard form, the 80 says that the ball leaves the punter's foot 80 feet up in this example. Factoring gives -16(t - 5)(t + 1), so the zeros are t = 5 and t = -1. Time cannot be negative, so the ball lands after 5 seconds. Vertex form is -16(t - 2)^2 + 144, so the highest point is 144 feet at t = 2 seconds. You can check each form by expanding it back to standard form.

To find the vertex from standard form, use x = -b/(2a). For y = 2x^2 - 12x + 7, x = 12/4 = 3 and y = 2(9) - 36 + 7 = -11, so the vertex is (3, -11). Zeros of y = x^2 - 6x + 5 come from the factored form (x - 1)(x - 5).

Higher-degree polynomials have graphs with features you can predict. The degree and the sign of the leading coefficient decide the end behavior. An odd-degree polynomial with a positive leading coefficient falls to the left and rises to the right, as in f(x) = (x + 2)(x - 1)(x - 3). With a negative leading coefficient the ends are reversed. An even-degree polynomial has both ends going the same way. A polynomial of degree n has at most n real zeros and at most n - 1 turning points, where the graph changes from rising to falling or the reverse. The cubic f(x) = (x + 2)(x - 1)(x - 3) has zeros at -2, 1 and 3, a y-intercept f(0) = 2(-1)(-3) = 6, and at most 2 turning points.
`,
  ],
  cards: [
    ["Parent function", "The simplest function of a family, such as x squared, from which others are formed by transformations."],
    ["Standard form of a quadratic", "ax^2 + bx + c. The constant c is the y-intercept."],
    ["Factored form", "a(x - r)(x - s). The zeros are r and s."],
    ["Vertex form", "a(x - h)^2 + k. The vertex is (h, k) and the axis of symmetry is x = h."],
    ["Axis of symmetry", "The vertical line through the vertex of a parabola. For standard form it is x = -b/(2a)."],
    ["Zero of a function", "An input at which the output is 0, which is an x-intercept of the graph."],
    ["End behavior", "What the graph does as x grows very large in the positive or negative direction."],
    ["Turning point", "A point where the graph changes between rising and falling. A degree-n polynomial has at most n - 1."],
  ],
  closed: [
    [
      "Which parent function has a V-shaped graph with its vertex at the origin?",
      ["f(x) = x^2", "f(x) = |x|", "f(x) = the square root of x", "f(x) = x^3"],
      "B",
    ],
    [
      "Which form of f(x) = x^2 - 6x + 5 shows its zeros directly?",
      ["Standard form, x^2 - 6x + 5", "Vertex form, (x - 3)^2 - 4", "Factored form, (x - 1)(x - 5)", "None, the zeros cannot be seen in any form"],
      "C",
    ],
    [
      "What is the vertex of the graph of y = 2x^2 - 12x + 7?",
      ["(3, -11)", "(-3, -11)", "(6, -11)", "(3, 7)"],
      "A",
    ],
    [
      "The polynomial f(x) = -2x^3 + x has what end behavior?",
      [
        "Both ends rise",
        "Both ends fall",
        "It falls on the left and rises on the right",
        "It rises on the left and falls on the right",
      ],
      "D",
    ],
    [
      "What is the greatest number of turning points that a polynomial of degree 5 can have?",
      ["5", "6", "4", "3"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A punter's kick has height h(t) = -16t^2 + 64t + 80 feet after t seconds. It can be written as h(t) = -16(t - 5)(t + 1) or as h(t) = -16(t - 2)^2 + 144. Use the factored form to find when the ball lands, and the vertex form to find its greatest height and when it happens. Say what the standard form tells you.",
      scheme: [
        "Reads the zeros t = 5 and t = -1 from the factored form",
        "Rejects t = -1 because time cannot be negative, so the ball lands after 5 seconds",
        "Reads the vertex (2, 144) from the vertex form: the greatest height is 144 feet at 2 seconds",
        "Says the standard form shows h(0) = 80, the height of the ball when it is kicked",
      ],
      model:
        "In factored form, h(t) = 0 when t = 5 or t = -1. Time cannot be negative, so the ball lands after 5 seconds. In vertex form the vertex is (2, 144), so the greatest height is 144 feet, reached 2 seconds after the kick. In standard form the constant 80 is h(0), so the ball is 80 feet up at the start.",
      answers: [
        [
          "full",
          "[[0|The factored form is zero when t = 5 or t = -1.]] [[1|Negative time doesn't make sense, so the ball lands at 5 seconds.]] [[2|The vertex form has the vertex at (2, 144), so the highest it gets is 144 feet and that happens at 2 seconds.]] [[3|The standard form tells you that the constant, 80, is the height when t = 0, so it starts at 80 feet.]]",
          "Full marks. Pairing each form with the question it answers is what this lesson is about.",
        ],
        [
          "full",
          "Landing means height 0, so I use factored: (t - 5)(t + 1) = 0, [[0|t = 5 or t = -1]]. [[1|I throw out -1 because the kick doesn't have a time before it happens, so 5 seconds]]. Max height: [[2|vertex form gives (2, 144), so 144 ft at 2 s]]. And [[3|in standard form c = 80 which is h(0), the starting height]].",
          "All four marks. You explained why -1 is rejected, which makes the answer a model of the situation and not just a calculation.",
        ],
        [
          "partial",
          "[[0|The zeros are t = 5 and t = -1.]] So the ball lands at 5 and -1 seconds. [[2|The max is 144 at t = 2.]]",
          "The zeros and the vertex are right. Only one of the two zeros fits the story, because the ball cannot land at a negative time. Add what the standard form tells you, the starting height.",
        ],
        [
          "partial",
          "[[2|The highest height is 144 feet at 2 seconds.]] [[3|The 80 in the standard form is the starting height.]] It lands when t = 2 because that's the vertex.",
          "Your vertex and starting height are right. The vertex is the highest point, not the landing. Use the factored form: the ball lands when h = 0, at t = 5.",
          true,
        ],
        [
          "weak",
          "It lands at 80 seconds because that's the number at the end of the equation.",
          "The 80 is a height in feet, not a time. It is the height at t = 0. To find the landing time, set the height equal to 0 and solve.",
        ],
        [
          "weak",
          "[[2|The max height is 144.]] I think -16 is how long it stays in the air.",
          "The 144 is right. The -16 is the coefficient that comes from gravity and it makes the parabola open downward. It is not a time. The landing time comes from the zeros.",
        ],
      ],
    },
    {
      prompt:
        "Let f(x) = (x + 2)(x - 1)(x - 3). Find its zeros and y-intercept, describe its end behavior, and say the greatest number of turning points it can have. Explain how you know each.",
      scheme: [
        "Finds the zeros -2, 1 and 3 from the factors",
        "Finds the y-intercept f(0) = 2(-1)(-3) = 6",
        "Describes the end behavior: falls to the left and rises to the right, because the degree is 3 and the leading coefficient is positive",
        "Says at most 2 turning points, because the degree is 3 and the maximum is one less than the degree",
      ],
      model:
        "Setting each factor to 0 gives zeros at x = -2, 1 and 3. The y-intercept is f(0) = (2)(-1)(-3) = 6. The degree is 3 and the leading coefficient is 1, which is positive, so the graph falls on the left and rises on the right. A degree-3 polynomial has at most 3 - 1 = 2 turning points.",
      answers: [
        [
          "full",
          "[[0|Each factor can be zero, so the zeros are -2, 1 and 3.]] [[1|For the y-intercept put in 0: (2)(-1)(-3) = 6.]] [[2|If you multiply it out the highest term is x^3 with a positive coefficient, so the left end goes down and the right end goes up.]] [[3|A degree 3 can have at most 2 turning points, one less than the degree.]]",
          "Full marks. Each answer comes with a reason, which is what 'explain how you know' asks.",
        ],
        [
          "full",
          "Zeros: [[0|x + 2 = 0, x - 1 = 0, x - 3 = 0, so x = -2, 1, 3]]. y-intercept: [[1|f(0) = 2 x -1 x -3 = 6, so (0, 6)]]. End behavior: [[2|it's cubic, odd degree, positive leading coefficient, so down on the left and up on the right]]. Turning points: [[3|n - 1 = 2 at most]].",
          "All four marks. Giving the y-intercept as a point, (0, 6), is the right way to write it.",
        ],
        [
          "partial",
          "[[0|The zeros are -2, 1, 3.]] The y-intercept is 6. [[3|It has at most 2 turning points.]] Both ends go up.",
          "Your zeros and turning points are right. Odd-degree graphs have ends that go opposite ways: with a positive leading coefficient it falls on the left and rises on the right.",
        ],
        [
          "partial",
          "[[1|f(0) = 6.]] [[2|It goes down on the left and up on the right.]] The zeros are 2, -1 and -3.",
          "The intercept and end behavior are right. The zeros have the opposite signs of the numbers in the factors: x + 2 = 0 gives x = -2, and x - 1 = 0 gives x = 1.",
          true,
        ],
        [
          "weak",
          "The zeros are 2, -1 and -3 and it has 3 turning points because it's a cubic.",
          "The zeros come from setting each factor to zero, which gives -2, 1 and 3. A cubic has at most 2 turning points, not 3.",
        ],
        [
          "weak",
          "[[1|y-intercept is 6]]. The ends both point up because it's a polynomial.",
          "The intercept is right. Not all polynomials have both ends up. Odd degree ones have ends going opposite ways. This one falls on the left and rises on the right.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Transformations of graphs and combining functions",
  note: `
## Objectives

Students will be able to:

1. describe how a graph changes when its function is shifted, stretched or reflected;
2. combine functions by arithmetic and by composition to model a situation.

## Materials

Graphing handhelds or Desmos, transparency sheets, whiteboards, the worksheet.

## Starter (8 minutes)

Graph f(x) = the square root of x. Then ask students to predict, before graphing, what changes in g(x) = -(1/2) times the square root of (x + 4) plus 3. Take predictions: left 4, flip, squash, up 3. Graph to check, and discuss the order of operations in a transformation.

## Main activity

1. Table: f(x - h) shifts right, f(x) + k shifts up, a times f(x) stretches vertically (a negative a reflects over the x-axis), f(bx) stretches horizontally. Practice with the absolute value parent.
2. Combine: if f(x) = x^2 + 1 and g(x) = 3x - 2, find (f + g)(x), (f times g)(x) and (f of g)(2).
3. Modeling: a bike helmet priced p dollars gets 20% off and 7.5% tax. Compare tax-then-discount and discount-then-tax, and then with a $5 coupon in place of the 20% discount.

## Checking for understanding

Whiteboards: "Describe y = -2|x + 1| in order." Look for the order shift, reflect, stretch.

## Worksheet

Collect the worksheet.
`,
  reading: [
    "Shifting, stretching, reflecting and composing",
    `
Once you know a parent function, you can describe a large family of functions as transformations of it. If you replace x with x - h, the graph shifts right by h; with x + 4 it shifts left by 4. The shift is opposite to what the sign suggests because the function needs the input to be larger to reach the same output. Adding k to the whole function, f(x) + k, shifts the graph up by k. Multiplying the function by a, a times f(x), stretches the graph vertically by a factor of a, and a negative a also reflects it across the x-axis. Multiplying the input, f(bx), stretches horizontally by a factor of 1/b.

For g(x) = -(1/2) times the square root of (x + 4) plus 3, start from the square root parent. The x + 4 moves the graph left 4. The factor -1/2 reflects it across the x-axis and compresses it vertically by half. The + 3 moves it up. The starting point of the graph, which was (0, 0), becomes (-4, 3). The domain is x >= -4, and g(0) = -(1/2)(2) + 3 = 2. Likewise y = -2|x + 1| is the V shape shifted left 1, stretched by 2 and flipped to open downward.

Functions can also be combined. The sum (f + g)(x) = f(x) + g(x), and the product and quotient work the same way, though a quotient is undefined where the bottom is zero. For f(x) = x + 4 and g(x) = x - 2, the domain of f/g is all real numbers except x = 2. Composition feeds one function into another: (f of g)(x) = f(g(x)). With f(x) = x^2 + 1 and g(x) = 3x - 2, g(2) = 4 and f(4) = 17, so (f of g)(2) = 17. The other order gives f(2) = 5 and g(5) = 13, a different number, so the order matters.

Composition is how you model a chain of steps. A helmet is priced at p dollars. The sale takes 20% off, S(p) = 0.8p, and tax adds 7.5%, T(x) = 1.075x. Then T(S(p)) = 1.075(0.8p) = 0.86p, and S(T(p)) = 0.8(1.075p) = 0.86p. They agree, because both steps multiply, and multiplication does not care about order. Now replace the sale with a $5 coupon, K(x) = x - 5. For a $60 helmet, T(K(60)) = 1.075(55) = 59.125, about $59.13, but K(T(60)) = 64.50 - 5 = 59.50. This time the order matters, because subtracting before and after multiplying are not the same. At a real checkout, whether the coupon is applied before the tax is part of the model.
`,
  ],
  cards: [
    ["Horizontal shift", "f(x - h) shifts the graph right h units. f(x + h) shifts it left."],
    ["Vertical shift", "f(x) + k shifts the graph up k units. A negative k shifts it down."],
    ["Reflection across the x-axis", "-f(x) flips the graph over the x-axis."],
    ["Vertical stretch", "a times f(x) with a > 1 stretches the graph away from the x-axis. With 0 < a < 1 it compresses."],
    ["Composition", "(f of g)(x) = f(g(x)). Apply g first, then f."],
    ["Domain of a quotient", "All inputs in both domains, except where the divisor is 0."],
    ["Order of transformations", "Stretch and reflect first, then shift, when graphing a function written as a f(x - h) + k."],
    ["Function arithmetic", "(f + g)(x) = f(x) + g(x), and similarly for difference, product and quotient."],
  ],
  closed: [
    [
      "How does the graph of g(x) = f(x - 3) + 2 compare with the graph of f?",
      ["Right 3 and up 2", "Right 3 and down 2", "Left 3 and up 2", "Left 3 and down 2"],
      "A",
    ],
    [
      "Which describes the graph of y = -2|x + 1| compared with y = |x|?",
      [
        "Shifted right 1, stretched by 2 and opening upward",
        "Shifted left 1, stretched by 2 and flipped to open downward",
        "Shifted left 1, compressed by 1/2 and opening downward",
        "Shifted up 1, stretched by 2 and flipped to open downward",
      ],
      "B",
    ],
    [
      "Let f(x) = x^2 + 1 and g(x) = 3x - 2. What is (f of g)(2)?",
      ["13", "9", "17", "25"],
      "C",
    ],
    [
      "If f(x) = x + 4 and g(x) = x - 2, what is the domain of f/g?",
      ["All real numbers", "All real numbers except x = -4", "x > 2 only", "All real numbers except x = 2"],
      "D",
    ],
    [
      "The cost of n bike-share rides is C(n) = 12n + 40 dollars, and a 7.25% sales tax is applied by T(x) = 1.0725x. Which expression gives the total with tax?",
      [
        "T(C(n)) = 1.0725(12n + 40)",
        "C(T(n)) = 12(1.0725n) + 40",
        "T(n) + C(n)",
        "0.0725(12n + 40)",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Starting from the parent function f(x) = the square root of x, describe the transformations that produce g(x) = -(1/2) times the square root of (x + 4), plus 3. Then give the domain of g and find g(0).",
      scheme: [
        "Says the graph is shifted left 4 units, because of x + 4",
        "Says it is reflected across the x-axis and compressed vertically by 1/2, because of the factor -1/2",
        "Says it is then shifted up 3 units",
        "Gives the domain x >= -4 and g(0) = -(1/2)(2) + 3 = 2",
      ],
      model:
        "The x + 4 inside the root shifts the graph 4 units left. The factor -1/2 reflects it across the x-axis and compresses it vertically by a factor of 1/2. The + 3 shifts it 3 units up. The root needs x + 4 >= 0, so the domain is x >= -4. And g(0) = -(1/2)(the square root of 4) + 3 = -(1/2)(2) + 3 = 2.",
      answers: [
        [
          "full",
          "[[0|The x + 4 inside moves the graph left 4.]] [[1|The -1/2 in front flips it over the x-axis and squashes it, so it's half as tall.]] [[2|The + 3 at the end moves it up 3.]] [[3|The domain is x >= -4 because the inside has to be 0 or more, and g(0) = -1/2 times 2 plus 3 = 2.]]",
          "Full marks. Each transformation is tied to the part of the equation that causes it.",
        ],
        [
          "full",
          "Left 4 [[0|since it's x + 4 under the root]], then [[1|a reflection in the x-axis and a vertical compression by 1/2 because of the -1/2]], then [[2|up 3]]. [[3|The starting point (0, 0) goes to (-4, 3), so the domain is x >= -4. g(0) = -(1/2)(sqrt 4) + 3 = -1 + 3 = 2]].",
          "All four marks. Tracking the starting point of the graph is a quick way to find both the domain and the shift.",
        ],
        [
          "partial",
          "[[1|The -1/2 flips it and shrinks it.]] [[2|The + 3 moves it up 3.]] The x + 4 moves it right 4. The domain is x >= -4. g(0) = 2.",
          "The flip, squash and up 3 are right. Inside the root, x + 4 moves the graph left. Your domain, x >= -4, actually agrees with a left shift, so recheck the direction.",
        ],
        [
          "partial",
          "[[0|Left 4.]] [[3|The domain is x >= -4 and g(0) = 2.]] The -1/2 makes it wider and the 3 moves it right.",
          "Your left shift, domain and g(0) are right. A factor of 1/2 in front makes the graph less tall, not wider, and the + 3 outside the root moves it up, not right.",
          true,
        ],
        [
          "weak",
          "It's the same graph just moved around. The domain is all real numbers.",
          "The transformations also change the shape: the graph is flipped and compressed. The domain is not all reals, because the root needs x + 4 to be at least 0.",
        ],
        [
          "weak",
          "[[0|It goes left 4]]. Then it's all up and down. g(0) = -(1/2)(4) + 3 = 1.",
          "The left shift is right. For g(0), take the root first: the square root of 4 is 2, then -(1/2)(2) + 3 = 2. You applied the 1/2 to 4 instead of 2.",
        ],
      ],
    },
    {
      prompt:
        "A bike helmet has price p dollars. A sale takes 20% off, S(p) = 0.8p, and the sales tax is 7.5%, T(x) = 1.075x. (a) Write T(S(p)) and S(T(p)). (b) A coupon K(x) = x - 5 replaces the sale. For a $60 helmet find T(K(60)) and K(T(60)). (c) Explain why order matters in (b) but not in (a).",
      scheme: [
        "Finds T(S(p)) = 1.075(0.8p) = 0.86p and S(T(p)) = 0.8(1.075p) = 0.86p, which are equal",
        "Computes T(K(60)) = 1.075(55), about $59.13",
        "Computes K(T(60)) = 64.50 - 5 = $59.50",
        "Explains that multiplying by two factors commutes, but subtracting a fixed amount before or after multiplying does not give the same result",
      ],
      model:
        "T(S(p)) = 1.075(0.8p) = 0.86p and S(T(p)) = 0.8(1.075p) = 0.86p, so in (a) the two orders agree. In (b), T(K(60)) = 1.075(60 - 5) = 1.075(55) = 59.125, about $59.13, and K(T(60)) = 1.075(60) - 5 = 64.50 - 5 = 59.50. They differ. In (a) both steps multiply by a number, and multiplication can be done in either order. In (b) one step subtracts a fixed dollar amount, and a fixed amount subtracted before the tax is taxed, but subtracted after the tax it is not.",
      answers: [
        [
          "full",
          "(a) [[0|T(S(p)) = 1.075 x 0.8p = 0.86p and S(T(p)) = 0.8 x 1.075p = 0.86p, same thing]]. (b) [[1|T(K(60)) = 1.075 x 55 = 59.125 so $59.13]] and [[2|K(T(60)) = 64.50 - 5 = $59.50]]. (c) [[3|In (a) you multiply twice and multiplication can switch order. In (b) the subtraction is a flat $5, and if you take it off before tax you pay less tax, so the order matters.]]",
          "Full marks. The point about paying less tax when the coupon comes first explains the difference in dollars.",
        ],
        [
          "full",
          "(a) Both come out to [[0|0.86p, since 1.075 x 0.8 = 0.86 in either order]]. (b) Coupon first: [[1|1.075(60 - 5) = 1.075(55) = 59.125, about $59.13]]. Tax first: [[2|1.075(60) - 5 = 64.5 - 5 = $59.50]]. (c) [[3|The 20% and the tax are both multiplications and multiplication is commutative. The coupon is subtraction, and subtracting before or after multiplying by 1.075 gives different answers]].",
          "All four marks. Calling out the commutative property of multiplication names exactly why (a) works.",
        ],
        [
          "partial",
          "[[0|T(S(p)) = 0.86p and S(T(p)) = 0.86p.]] [[1|T(K(60)) = 59.13]] and K(T(60)) = 59.13 as well. Order doesn't matter in either.",
          "Part (a) and the first value are right. Check K(T(60)): tax first gives $64.50, and the coupon takes $5 off, which makes $59.50, so order does matter.",
        ],
        [
          "partial",
          "[[2|K(T(60)) = 64.50 - 5 = 59.50.]] [[3|Order matters in (b) because one is subtraction.]] (a) T(S(p)) = 1.075 + 0.8p.",
          "Your (b) calculation and reason are right. In (a) the composition multiplies: T(S(p)) = 1.075 times 0.8p, which is 0.86p, not a sum.",
          true,
        ],
        [
          "weak",
          "(a) T(S(p)) = 1.075p - 0.8p = 0.275p. (b) I get 55 for both.",
          "Composing means putting one function's output into the other, not subtracting. T(S(p)) means 1.075 times S(p). And 60 - 5 = 55 is the price before the tax.",
        ],
        [
          "weak",
          "[[3|Order matters because multiplication is not commutative]], so 0.86p is wrong, it's p times 0.86.",
          "Multiplication is commutative, which is exactly why the two orders in (a) agree. Order matters in (b) only because a flat amount is subtracted.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Inverse functions and equations with absolute values, radicals and fractions",
  note: `
## Objectives

Students will be able to:

1. find the inverse of a function and verify it by composition;
2. solve absolute-value, radical and rational equations in one variable and identify extraneous solutions.

## Materials

Graphing handhelds, whiteboards, a reference card of solving steps, the worksheet.

## Starter (8 minutes)

Ask: "If a function takes a Celsius temperature and gives the Fahrenheit temperature, what would you call the function that does the reverse?" Write F(C) = (9/5)C + 32 on the board and let students find the rule that undoes it, without any formal method. Then show the method: swap the variables and solve.

## Main activity

1. Find the inverse of f(x) = 3x - 7 and check with f of f-inverse and f-inverse of f. Point out that the graphs of a function and its inverse are mirror images across y = x.
2. Absolute value: solve |2x - 5| = 9 by splitting into two cases. Then show why |x| = -3 has no solution.
3. Radical equation: solve the square root of (x + 7) = x - 5. Isolate the radical, square both sides, solve and then check every answer in the original equation.
4. Rational equation: x over (x - 3) = 3 over (x - 3) + 2, and decide what the check says.

## Checking for understanding

Ask: "Why do we have to check answers after squaring?" Accept an example with a number.

## Worksheet

Hand out the worksheet and collect it at the end of class.
`,
  reading: [
    "Undoing a function, and answers that do not survive the check",
    `
The inverse of a function undoes it. If a function f takes an input x to an output y, its inverse takes y back to x. The recipe has two steps. First, write y = f(x). Second, swap x and y and solve for y. For f(x) = 3x - 7, write y = 3x - 7, swap to get x = 3y - 7, and solve: y = (x + 7)/3. So the inverse is f-inverse(x) = (x + 7)/3. To verify, compose them in both orders. f(f-inverse(x)) = 3((x + 7)/3) - 7 = x + 7 - 7 = x, and f-inverse(f(x)) = ((3x - 7) + 7)/3 = x. Both come back to x. The graph of an inverse is the mirror image of the original in the line y = x. For the cube-plus-one function f(x) = x^3 + 1, the inverse is the cube root of (x - 1).

Some equations are solved by turning one hard equation into easier ones. The equation |2x - 5| = 9 says that 2x - 5 is 9 units from zero, so 2x - 5 = 9 or 2x - 5 = -9, which gives x = 7 or x = -2. An absolute value can never equal a negative number, so |x| = -3 has no solution.

Radical equations are solved by isolating the radical and then squaring both sides. Squaring is not a reversible step, though. For example -3 and 3 have the same square, so squaring can create answers that the original equation does not allow. Those are called extraneous solutions. Solve the square root of (3x + 4) = x. Square both sides: 3x + 4 = x^2, so x^2 - 3x - 4 = 0 and (x - 4)(x + 1) = 0, which gives x = 4 or x = -1. Check each one in the original. For x = 4, the square root of 16 is 4, which works. For x = -1, the square root of 1 is 1, not -1, so x = -1 is extraneous. The only solution is x = 4.

Rational equations have the same hazard, since multiplying through by an expression that contains x can bring in values that make a denominator zero. Take x/(x - 3) = 3/(x - 3) + 2. Multiply by (x - 3): x = 3 + 2(x - 3), so x = 2x - 3, and x = 3. But x = 3 makes the denominators zero, so it is not allowed. The equation has no solution. The rule is simple and not optional: when you square both sides or multiply by a variable expression, check every candidate in the original equation.
`,
  ],
  cards: [
    ["Inverse function", "A function that reverses another, sending each output back to its input."],
    ["Finding an inverse", "Write y = f(x), swap x and y, and solve for y."],
    ["Verifying inverses", "f(g(x)) = x and g(f(x)) = x for all x in the domains."],
    ["Absolute value equation", "|u| = c with c > 0 gives u = c or u = -c. If c < 0 there is no solution."],
    ["Radical equation", "An equation with the variable under a root. Isolate the root and raise both sides to the matching power."],
    ["Extraneous solution", "A value found by correct algebra that does not satisfy the original equation."],
    ["Rational equation", "An equation with variable expressions in denominators. Values that make a denominator 0 are excluded."],
    ["Check step", "Substitute each candidate into the original equation. It is required after squaring or multiplying by a variable expression."],
  ],
  closed: [
    [
      "What is the inverse of f(x) = 3x - 7?",
      ["(x - 7)/3", "3x + 7", "(x + 7)/3", "1/(3x - 7)"],
      "C",
    ],
    [
      "What is the inverse of f(x) = x^3 + 1?",
      [
        "the cube root of (x - 1)",
        "(the cube root of x) - 1",
        "(x - 1)^3",
        "1/(x^3 + 1)",
      ],
      "A",
    ],
    [
      "Solve |2x - 5| = 9.",
      ["x = 7 only", "x = 2 or x = -7", "x = 7 or x = 2", "x = 7 or x = -2"],
      "D",
    ],
    [
      "Solve the square root of (3x + 4) = x.",
      ["x = -1 only", "x = 4 only", "x = 4 and x = -1", "No solution"],
      "B",
    ],
    [
      "Solve x/(x - 3) = 3/(x - 3) + 2.",
      ["x = 3", "x = 0", "No solution", "x = 2"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "The function F(C) = (9/5)C + 32 converts a temperature in degrees Celsius to degrees Fahrenheit. Find the inverse function, verify it by composing in both orders, and say in words what the inverse does.",
      scheme: [
        "Swaps the variables and solves to get the inverse (5/9)(F - 32)",
        "Verifies one composition, such as F(inverse(x)) = x, with algebra",
        "Verifies the other composition, inverse(F(C)) = C, with algebra",
        "Says the inverse converts Fahrenheit temperatures back to Celsius",
      ],
      model:
        "Write F = (9/5)C + 32, swap the letters, F = (9/5)C + 32 solved for C gives C = (5/9)(F - 32), so the inverse is g(x) = (5/9)(x - 32). Check: F(g(x)) = (9/5)(5/9)(x - 32) + 32 = (x - 32) + 32 = x. And g(F(C)) = (5/9)((9/5)C + 32 - 32) = (5/9)(9/5)C = C. The inverse converts degrees Fahrenheit to degrees Celsius.",
      answers: [
        [
          "full",
          "[[0|Solve for C: subtract 32 to get F - 32 = (9/5)C, and multiply by 5/9, so the inverse is g(x) = (5/9)(x - 32).]] [[1|F(g(x)) = (9/5) x (5/9)(x - 32) + 32 = x - 32 + 32 = x.]] [[2|g(F(C)) = (5/9)((9/5)C + 32 - 32) = (5/9)(9/5)C = C.]] [[3|The inverse takes a Fahrenheit temperature and gives the Celsius temperature.]]",
          "Full marks. Showing both compositions proves the functions undo each other, not only one way.",
        ],
        [
          "full",
          "Step 1, swap and solve: x = (9/5)y + 32, so [[0|(5/9)(x - 32) = y, the inverse is (5/9)(x - 32)]]. Step 2, check: [[1|(9/5)((5/9)(x - 32)) + 32 = (x - 32) + 32 = x]] and [[2|(5/9)((9/5)x + 32 - 32) = (5/9)(9/5)x = x]]. [[3|In words it converts Fahrenheit into Celsius, the opposite direction]].",
          "All four marks. Swapping the variables first is the textbook method, and you followed it.",
        ],
        [
          "partial",
          "[[0|The inverse is (5/9)(x - 32).]] [[3|It changes Fahrenheit to Celsius.]] To check I tried 100 degrees Celsius, which is 212, and it went back to 100.",
          "The inverse and its meaning are right, and checking a number is good. A verification needs algebra for any x, composing in both orders.",
        ],
        [
          "partial",
          "[[1|F(g(x)) = (9/5)(5/9)(x - 32) + 32 = x]]. [[2|g(F(C)) = C also]]. The inverse is (9/5)(x - 32).",
          "Your compositions are right for the correct inverse, which is (5/9)(x - 32). If you use (9/5)(x - 32), the compositions do not come out to x. Recheck how you solved for C.",
          true,
        ],
        [
          "weak",
          "The inverse is 1/F, so it's 1 over (9/5)C + 32.",
          "The inverse is not the reciprocal. It is the function that undoes F. Swap the letters and solve for the new output.",
        ],
        [
          "weak",
          "[[3|It goes from Fahrenheit back to Celsius]]. You just subtract 32 and multiply by 9/5.",
          "The meaning is right. To undo multiplying by 9/5, you divide by 9/5, which is multiplying by 5/9, and you subtract the 32 first.",
        ],
      ],
    },
    {
      prompt:
        "Solve the square root of (x + 7) = x - 5. Show each step, check each answer you find in the original equation, and identify any extraneous solution. Explain why squaring can produce one.",
      scheme: [
        "Squares both sides and rearranges to x^2 - 11x + 18 = 0",
        "Factors to (x - 2)(x - 9) = 0, giving candidates x = 2 and x = 9",
        "Checks x = 9 (the square root of 16 = 4 = 9 - 5) and rejects x = 2 (the square root of 9 = 3, not -3)",
        "Explains that squaring loses the sign, so a number and its opposite give the same square",
      ],
      model:
        "Square both sides: x + 7 = (x - 5)^2 = x^2 - 10x + 25. Rearrange: x^2 - 11x + 18 = 0, which factors as (x - 2)(x - 9) = 0, so x = 2 or x = 9. Check x = 9: the square root of 16 = 4 and 9 - 5 = 4, so it works. Check x = 2: the square root of 9 = 3, but 2 - 5 = -3, so it fails and is extraneous. Squaring can produce extraneous solutions because 3 and -3 have the same square, so the squared equation is also true when the original sides have opposite signs.",
      answers: [
        [
          "full",
          "[[0|Square both sides: x + 7 = x^2 - 10x + 25, so x^2 - 11x + 18 = 0.]] [[1|(x - 2)(x - 9) = 0 so x = 2 or 9.]] [[2|Check 9: sqrt(16) = 4 and 9 - 5 = 4, good. Check 2: sqrt(9) = 3 but 2 - 5 = -3, not equal, so 2 is extraneous.]] [[3|It happens because squaring erases the sign, 3 and -3 both square to 9.]]",
          "Full marks. Your explanation about 3 and -3 using the actual numbers from the problem is the clearest kind.",
        ],
        [
          "full",
          "(x - 5)^2 = x^2 - 10x + 25, so [[0|x + 7 = x^2 - 10x + 25 which gives x^2 - 11x + 18 = 0]]. [[1|Factor: (x - 2)(x - 9), so candidates are 2 and 9]]. [[2|x = 9 works (4 = 4). x = 2 doesn't (3 does not equal -3), so 2 is extraneous]]. [[3|Squaring can bring in false answers because a number and its negative have the same square]].",
          "All four marks. Candidates and the final answers are clearly separated.",
        ],
        [
          "partial",
          "[[0|x + 7 = x^2 - 10x + 25 so x^2 - 11x + 18 = 0.]] [[1|(x - 2)(x - 9) = 0 so x = 2 or x = 9.]] Both answers work.",
          "The algebra is right, but you did not check. For x = 2, the left side is the square root of 9 = 3 and the right side is -3, so it is extraneous.",
        ],
        [
          "partial",
          "[[2|9 works and 2 is extraneous because 3 is not -3.]] [[3|Squaring makes positive and negative the same.]]",
          "Your checking and explanation are right. Show the algebra that gives the candidates: squaring to get x^2 - 11x + 18 = 0 and factoring it.",
          true,
        ],
        [
          "weak",
          "Take away the square root: x + 7 = x - 5, so 7 = -5, no solution.",
          "The square root cannot just be dropped. Square both sides: the right side becomes (x - 5)^2, which has three terms.",
        ],
        [
          "weak",
          "[[1|(x - 2)(x - 9) = 0, x = 2 or 9]]. I squared x - 5 to get x^2 + 25.",
          "Your factoring is right, but (x - 5)^2 is x^2 - 10x + 25, not x^2 + 25. You also need to check the answers in the original equation, which rules out x = 2.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Solving quadratics three ways, and a line meeting a parabola",
  note: `
## Objectives

Students will be able to:

1. solve quadratic equations by factoring, by completing the square and by the quadratic formula, and choose a method;
2. solve a system of a linear equation and a quadratic equation in two variables.

## Materials

Graphing handhelds, algebra tiles for completing the square, whiteboards, the worksheet and the quiz.

## Starter (8 minutes)

Write x^2 + 10x - 3 = 0 and ask: "Can you factor it?" Let students try for two minutes, then ask what they can do instead. Bring out the algebra tile picture: x^2 + 10x is a square with a missing corner of 25. Completing the square is just filling in the corner.

## Main activity

1. Solve x^2 - 5x - 14 = 0 by factoring, x^2 + 10x - 3 = 0 by completing the square, and 2x^2 - 3x - 5 = 0 by the formula. For each, discuss why that method was easiest.
2. The discriminant: b^2 - 4ac tells you how many real solutions. Compute it for x^2 + 4x + 7.
3. A line and a parabola: the rail on a skate park is y = x - 2 and the curve is y = x^2 - 6x + 8. Find where they meet.
4. Graph both on the handheld to confirm the intersections.

## Checking for understanding

Whiteboards: "Which method would you pick for x^2 - 49 = 0? For x^2 + 6x + 4 = 0?" Ask for reasons.

## Worksheet and quiz

Collect the worksheet, then give the quiz.
`,
  reading: [
    "Three methods, and the points where a line and a curve meet",
    `
A quadratic equation can be solved in three standard ways, and a good problem solver knows which to reach for. Factoring is fastest when it works. To solve x^2 - 5x - 14 = 0, find two numbers that multiply to -14 and add to -5. The pair 2 and -7 works, since 2 x (-7) = -14 and 2 + (-7) = -5, so the factored form is (x + 2)(x - 7) = 0, and the solutions are x = -2 and x = 7. This uses the zero product property: if a product is zero, one of the factors is zero.

When an equation does not factor nicely, complete the square. Take x^2 + 10x - 3 = 0. Move the constant: x^2 + 10x = 3. Half of 10 is 5 and 5 squared is 25, so add 25 to both sides: (x + 5)^2 = 28. Take square roots: x + 5 = plus or minus the square root of 28, which is 2 times the square root of 7, so x = -5 plus or minus 2 times the square root of 7. The same idea, done once for a general equation, produces the quadratic formula, x = (-b plus or minus the square root of (b^2 - 4ac)) / (2a). For 2x^2 - 3x - 5 = 0, the discriminant is 9 + 40 = 49, so x = (3 plus or minus 7)/4, which gives x = 5/2 or x = -1.

The discriminant b^2 - 4ac predicts the kind of solutions without solving. If it is positive there are two real solutions, if zero there is one, and if negative there are none that are real. For x^2 + 4x + 7, the discriminant is 16 - 28 = -12, so the parabola never touches the x-axis. A negative discriminant is not a mistake. It tells you the parabola stays above or below the axis.

Algebra can also find where a line meets a parabola. A skate park rail is the line y = x - 2 and the curved ramp is y = x^2 - 6x + 8. At an intersection both equations hold, so set the expressions equal: x^2 - 6x + 8 = x - 2. Rearranging gives x^2 - 7x + 10 = 0, which factors as (x - 2)(x - 5) = 0, so x = 2 or x = 5. Substitute into the line to get the y-values: y = 0 and y = 3, so the intersections are (2, 0) and (5, 3). Check in the parabola: 4 - 12 + 8 = 0 and 25 - 30 + 8 = 3. A line can meet a parabola twice, once (a tangent line), or not at all, which is why the discriminant of the combined equation matters.
`,
  ],
  cards: [
    ["Zero product property", "If a product is 0, at least one factor is 0."],
    ["Completing the square", "Adding (b/2)^2 to x^2 + bx to make a perfect square trinomial."],
    ["Quadratic formula", "x = (-b plus or minus the square root of (b^2 - 4ac)) / (2a) for ax^2 + bx + c = 0."],
    ["Discriminant", "b^2 - 4ac. Positive: two real solutions. Zero: one. Negative: no real solutions."],
    ["Perfect square trinomial", "A trinomial that is the square of a binomial, such as x^2 + 10x + 25 = (x + 5)^2."],
    ["Intersection of graphs", "A point whose coordinates satisfy both equations. Found by setting the expressions equal."],
    ["Tangent line", "A line that meets a curve at exactly one point."],
    ["Choosing a method", "Factor if it works quickly. Use square roots for x^2 = k. Use completing the square or the formula otherwise."],
  ],
  closed: [
    [
      "Solve x^2 - 5x - 14 = 0.",
      ["x = 7 or x = -2", "x = -7 or x = 2", "x = 14 or x = -1", "x = 5 or x = -14"],
      "A",
    ],
    [
      "Solve x^2 + 10x - 3 = 0 by completing the square.",
      [
        "x = 5 plus or minus 2 times the square root of 7",
        "x = -5 plus or minus 2 times the square root of 7",
        "x = -5 plus or minus the square root of 22",
        "x = -10 plus or minus 2 times the square root of 7",
      ],
      "B",
    ],
    [
      "Solve 2x^2 - 3x - 5 = 0 using the quadratic formula.",
      ["x = -5/2 or x = 1", "x = 5 or x = -1/2", "x = 5/2 or x = -1", "x = 3 or x = -2"],
      "C",
    ],
    [
      "How many real solutions does x^2 + 4x + 7 = 0 have?",
      ["Two real solutions", "One real solution", "Infinitely many real solutions", "No real solutions"],
      "D",
    ],
    [
      "Solve the system y = x^2 - 2x - 3 and y = 2x - 3.",
      ["(0, -3) and (4, 5)", "(0, -3) only", "(4, 5) only", "(2, 1) and (-2, -7)"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Solve 2x^2 - 8x + 1 = 0 by completing the square. Then confirm your answer with the quadratic formula.",
      scheme: [
        "Divides by 2 and moves the constant to get x^2 - 4x = -1/2",
        "Adds 4 to both sides to get (x - 2)^2 = 7/2",
        "Solves to x = 2 plus or minus the square root of (7/2), which is 2 plus or minus (the square root of 14)/2",
        "Checks with the quadratic formula: discriminant 64 - 8 = 56 and x = (8 plus or minus 2 times the square root of 14)/4, the same values",
      ],
      model:
        "Divide by 2: x^2 - 4x + 1/2 = 0, so x^2 - 4x = -1/2. Half of -4 is -2, and its square is 4, so add 4 to both sides: (x - 2)^2 = 7/2. Take roots: x = 2 plus or minus the square root of (7/2), which is 2 plus or minus (the square root of 14)/2. With the formula, a = 2, b = -8 and c = 1, so the discriminant is 64 - 8 = 56 and x = (8 plus or minus the square root of 56)/4 = (8 plus or minus 2 times the square root of 14)/4 = 2 plus or minus (the square root of 14)/2. The two methods agree.",
      answers: [
        [
          "full",
          "[[0|Divide everything by 2: x^2 - 4x + 1/2 = 0, so x^2 - 4x = -1/2.]] [[1|Half of -4 is -2 and squared is 4, so add 4: (x - 2)^2 = 3.5, which is 7/2.]] [[2|x - 2 = plus or minus sqrt(7/2), so x = 2 plus or minus sqrt(14)/2.]] [[3|Formula: 64 - 4(2)(1) = 56, x = (8 plus or minus sqrt 56)/4 = (8 plus or minus 2 sqrt 14)/4 = 2 plus or minus sqrt(14)/2, the same.]]",
          "Full marks. Reducing the square root of 56 to 2 times the square root of 14 let you match the two answers exactly.",
        ],
        [
          "full",
          "First get a leading 1: [[0|x^2 - 4x = -1/2]]. The square: (-4/2)^2 = 4. [[1|(x - 2)^2 = -1/2 + 4 = 7/2]]. [[2|x = 2 plus or minus the square root of 7/2, about 2 plus or minus 1.87, so 3.87 or 0.13]]. [[3|Quadratic formula with a = 2, b = -8, c = 1: discriminant 56, x = (8 plus or minus 2 sqrt 14)/4, and that's 2 plus or minus sqrt(14)/2, about 3.87 or 0.13]].",
          "All four marks. Checking the decimals from both methods gives extra confidence.",
        ],
        [
          "partial",
          "[[0|x^2 - 4x = -1/2.]] [[1|(x - 2)^2 = 7/2.]] So x = 2 plus 7/2 = 5.5 and x = 2 minus 7/2 = -1.5.",
          "Your setup is right. After (x - 2)^2 = 7/2 you take the square root of both sides, so x = 2 plus or minus the square root of 7/2, not plus or minus 7/2.",
        ],
        [
          "partial",
          "[[3|The formula gives 56 under the root, and x = (8 plus or minus 2 sqrt 14)/4.]] Completing the square, (x - 4)^2 = 1/2 + 16.",
          "The formula part is right. In completing the square, half of -4 is -2, so the square is (x - 2)^2, and you add 4, not 16.",
          true,
        ],
        [
          "weak",
          "I tried to factor it and it didn't work so there's no solution.",
          "An equation that does not factor easily can still have solutions. The discriminant is 56, which is positive, so there are two real solutions. Complete the square or use the formula.",
        ],
        [
          "weak",
          "[[0|x^2 - 4x = -1/2]]. Then add 8 to each side so (x - 4)^2 = 7.5, x = 4 plus or minus 2.7.",
          "You started well. Add the square of half the coefficient: half of -4 is -2, whose square is 4, not 8, and the binomial is (x - 2).",
        ],
      ],
    },
    {
      prompt:
        "A skate park has a rail on the line y = x - 2 and a curved ramp described by y = x^2 - 6x + 8. Find the points where the rail meets the ramp, and check your answers in both equations.",
      scheme: [
        "Sets the expressions equal: x^2 - 6x + 8 = x - 2",
        "Rearranges to x^2 - 7x + 10 = 0 and factors as (x - 2)(x - 5)",
        "Finds x = 2 and x = 5",
        "Finds the y-values by substitution, giving (2, 0) and (5, 3), and checks both points in the parabola",
      ],
      model:
        "At a meeting point both equations hold, so x^2 - 6x + 8 = x - 2. Subtract x and add 2: x^2 - 7x + 10 = 0, which factors as (x - 2)(x - 5) = 0, so x = 2 or x = 5. Using the line, y = 2 - 2 = 0 and y = 5 - 2 = 3, so the points are (2, 0) and (5, 3). Check in the parabola: 4 - 12 + 8 = 0 and 25 - 30 + 8 = 3, so both points are on both graphs.",
      answers: [
        [
          "full",
          "[[0|Set them equal: x^2 - 6x + 8 = x - 2.]] [[1|Move everything: x^2 - 7x + 10 = 0, which is (x - 2)(x - 5).]] [[2|So x = 2 or x = 5.]] [[3|The line gives y = 0 and y = 3, so (2, 0) and (5, 3). In the parabola, 4 - 12 + 8 = 0 and 25 - 30 + 8 = 3, so they are on both.]]",
          "Full marks. Substituting into the other equation is the check that the points belong to both graphs.",
        ],
        [
          "full",
          "Both y's must be equal at a crossing so [[0|x^2 - 6x + 8 = x - 2]]. Subtract x and add 2 on both sides, [[1|x^2 - 7x + 10 = 0, which factors into (x - 2)(x - 5) = 0]]. [[2|The x-values are 2 and 5]]. [[3|Plugging them into y = x - 2 gives (2, 0) and (5, 3), and plugging into the parabola gives the same y-values, so both are intersections]].",
          "All four marks. Your explanation of why the y-values must be equal at a crossing is the idea behind the method.",
        ],
        [
          "partial",
          "[[0|x^2 - 6x + 8 = x - 2]], so x^2 - 7x + 10 = 0 and [[2|x = 2 and x = 5]]. The rail meets the ramp at x = 2 and x = 5.",
          "Your x-values are right, but the intersection points need both coordinates. Substitute into the line to get (2, 0) and (5, 3), and check them in the parabola.",
        ],
        [
          "partial",
          "[[3|The points are (2, 0) and (5, 3), and they work in both equations.]] I just graphed it on my calculator.",
          "The points are right. The question asks you to show the algebra: set the equations equal, rearrange, and factor to get the x-values.",
          true,
        ],
        [
          "weak",
          "Substitute the line into the ramp: x - 2 = x^2 - 6x + 8, so x = x^2 - 5x + 10 and x = 10.",
          "Setting them equal is the right idea. When you move x - 2 across, the result is x^2 - 7x + 10 = 0, which has to be factored or solved, not cancelled to x = 10.",
        ],
        [
          "weak",
          "[[1|x^2 - 7x + 10 = 0 factors as (x - 2)(x - 5)]]. So the answers are (2, 5) because those are the numbers.",
          "The factoring is right. The numbers 2 and 5 are x-values. Each intersection has an x and a y, which you find by substituting into the line.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Inequalities, constraints and the structure of expressions",
  note: `
## Objectives

Students will be able to:

1. write and solve inequalities and compound inequalities from a context;
2. represent constraints with equations and inequalities and interpret a solution as viable or not;
3. recognize the structure of an expression and rewrite it, such as a difference of squares.

## Materials

Number-line handouts, whiteboards, a short quiz, the problem set.

## Starter (8 minutes)

Pose the problem: "Maya wants her phone bill to be at least $45 but less than $70. Her plan costs $30 plus $2.50 per gigabyte. How much data can she use?" Ask students to write one inequality that says both conditions at once. Discuss why the form 45 <= 30 + 2.5g < 70 is natural.

## Main activity

1. Solve compound inequalities by working on all three parts at once, and write the answer in interval form and on a number line.
2. Quadratic inequality: x^2 - 4x - 5 > 0. Factor, find the zeros, and test a point in each region.
3. Constraints: a $150 budget at the state fair with $25 admission and $4.50 per ride. Write 25 + 4.5r <= 150, solve, and decide how many rides are viable.
4. Structure: recognize 49^2 - 47^2 as a difference of squares and factor 16x^4 - 81 completely.

## Checking for understanding

Whiteboards: "Factor 3x^3 - 12x. What do you take out first?" Look for the common factor before the difference of squares.

## Quiz and problem set

Give the quiz at the start of the next class. Collect the problem set then.
`,
  reading: [
    "Ranges of answers and the shape of an expression",
    `
An inequality describes a range of values rather than a single one. Many real situations need two limits at once, such as a phone bill that must be at least $45 but less than $70. If the plan is $30 plus $2.50 per gigabyte, then 45 <= 30 + 2.5g < 70. A compound inequality like this is solved by doing the same operation to all three parts. Subtract 30 to get 15 <= 2.5g < 40, then divide by 2.5 to get 6 <= g < 16. She can use from 6 gigabytes up to, but not including, 16. If the carrier bills in whole gigabytes, the viable values are 6 through 15. For the compound inequality -2 < 3x - 5 <= 10, add 5 to get 3 < 3x <= 15 and divide by 3 to get 1 < x <= 5. Notice that the inequality signs that include the end value, like <=, use a filled circle on the number line, and a strict sign, like <, uses an open circle.

A quadratic inequality needs the graph in mind. To solve x^2 - 4x - 5 > 0, factor: (x - 5)(x + 1) > 0. The zeros are -1 and 5. The parabola opens upward, so it is above the x-axis outside the zeros. The answer is x < -1 or x > 5. You can check by testing a point in each region: x = 0 gives -5, which is not greater than zero, but x = 6 gives 7, which is.

Constraints come from the situation. At the state fair with $150, admission $25 and rides at $4.50 each, the inequality is 25 + 4.5r <= 150. Then 4.5r <= 125 and r <= 27.78. The algebra permits any number up to about 27.78, but rides come in whole numbers, so the viable answer is at most 27 rides. Rounding to 28 would break the budget. A solution is viable only if it fits both the algebra and the story.

The structure of an expression can make a problem easy. A difference of squares, a^2 - b^2, factors as (a - b)(a + b). To compute 49^2 - 47^2 without a calculator, write it as (49 - 47)(49 + 47) = 2 x 96 = 192. The same pattern works with larger expressions. 49x^2 - 64y^2 = (7x - 8y)(7x + 8y). To factor 16x^4 - 81, see it as (4x^2)^2 - 9^2 = (4x^2 - 9)(4x^2 + 9), and the first factor is itself a difference of squares, so the complete factorization is (2x - 3)(2x + 3)(4x^2 + 9). The last factor cannot be broken down further over the real numbers. Always take out a common factor first: 3x^3 - 12x = 3x(x^2 - 4) = 3x(x - 2)(x + 2).
`,
  ],
  cards: [
    ["Compound inequality", "Two inequalities joined, such as 15 <= 2.5g < 40, solved by doing the same to all parts."],
    ["Strict inequality", "An inequality that uses < or > and does not include the endpoint."],
    ["Interval notation", "A way of writing a range, such as [6, 16) for 6 <= g < 16."],
    ["Test point method", "Pick a number in each region and check whether it satisfies the inequality."],
    ["Viable solution", "A solution of the algebra that also fits the situation, such as a whole number of rides."],
    ["Difference of squares", "a^2 - b^2 = (a - b)(a + b)."],
    ["Common factor", "A factor shared by every term, to be taken out first, such as 3x in 3x^3 - 12x."],
    ["Irreducible factor", "A factor that cannot be broken down further over the real numbers, such as 4x^2 + 9."],
  ],
  closed: [
    [
      "Solve -2 < 3x - 5 <= 10.",
      ["1 <= x < 5", "1 < x <= 15", "1 < x <= 5", "-1 < x <= 5"],
      "C",
    ],
    [
      "Solve x^2 - 4x - 5 > 0.",
      ["-1 < x < 5", "x > 5 only", "x < 1 or x > -5", "x < -1 or x > 5"],
      "D",
    ],
    [
      "At the state fair, admission is $25 and each ride costs $4.50. With a $150 budget, what is the greatest number of rides you can buy?",
      ["27 rides", "28 rides", "27.8 rides", "33 rides"],
      "A",
    ],
    [
      "Which is the factored form of 49x^2 - 64y^2?",
      ["(7x - 8y)^2", "(7x - 8y)(7x + 8y)", "(49x - 64y)(x + y)", "It cannot be factored"],
      "B",
    ],
    [
      "Which is the complete factorization of 3x^3 - 12x?",
      ["3x(x - 2)^2", "3x(x^2 - 4)", "3x(x - 2)(x + 2)", "3(x^3 - 4x)"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Maya wants her monthly phone bill to be at least $45 but less than $70. Her plan costs $30 plus $2.50 per gigabyte, g. Write a compound inequality, solve it, and say what the solution means for her data use.",
      scheme: [
        "Writes the compound inequality 45 <= 30 + 2.5g < 70",
        "Subtracts 30 from all three parts to get 15 <= 2.5g < 40",
        "Divides by 2.5 to get 6 <= g < 16",
        "Interprets: she can use at least 6 gigabytes and less than 16, so 6 to 15 if whole gigabytes",
      ],
      model:
        "The bill is 30 + 2.5g, and it must be at least 45 and less than 70, so 45 <= 30 + 2.5g < 70. Subtract 30 from every part: 15 <= 2.5g < 40. Divide every part by 2.5: 6 <= g < 16. Maya can use 6 gigabytes or more, but less than 16. If data is billed in whole gigabytes, she can use anywhere from 6 to 15.",
      answers: [
        [
          "full",
          "[[0|45 <= 30 + 2.5g < 70]]. [[1|Take 30 from all three: 15 <= 2.5g < 40.]] [[2|Divide all three by 2.5: 6 <= g < 16.]] [[3|So she can use 6 GB or more but not 16, up to 15 if they only count whole gigabytes.]]",
          "Full marks. Doing each operation on all three parts is exactly right.",
        ],
        [
          "full",
          "The two conditions together are [[0|45 <= 30 + 2.5g and 30 + 2.5g < 70, written as 45 <= 30 + 2.5g < 70]]. Subtract 30 from everything: [[1|15 <= 2.5g < 40]]. Divide by 2.5, a positive number so nothing flips: [[2|6 <= g < 16]]. [[3|This means g starts at 6 and can go up to just under 16, so the bill stays in range if she uses between 6 and 16 GB]].",
          "All four marks. Noting that dividing by a positive number does not flip the signs shows you checked the rule.",
        ],
        [
          "partial",
          "[[0|45 <= 30 + 2.5g < 70]]. Subtract 30 from the middle: 45 <= 2.5g < 70. [[2|Divide: 18 <= g < 28.]]",
          "Your inequality is right. You have to subtract 30 from all three parts, not only the middle: 15 <= 2.5g < 40, which gives 6 <= g < 16.",
        ],
        [
          "partial",
          "[[1|15 <= 2.5g < 40.]] [[2|6 <= g < 16.]] So she can use any number of gigabytes.",
          "The solving is right, but 'any number' is not what 6 <= g < 16 says. Write the starting inequality and say what the range means: at least 6, less than 16.",
          true,
        ],
        [
          "weak",
          "30 + 2.5g = 70 so 2.5g = 40 and g = 16. She can use 16 gigabytes.",
          "That finds the limit for the upper bound only, and 16 is not even allowed because the bill must be less than $70. Also there is a lower bound of $45.",
        ],
        [
          "weak",
          "[[0|45 <= 30 + 2.5g < 70]] so g is between 45 and 70.",
          "Your inequality is right. The 45 and 70 are limits on the bill, not on g. Solve for g by subtracting 30 and dividing by 2.5.",
        ],
      ],
    },
    {
      prompt:
        "(a) Use a difference of squares to evaluate 49^2 - 47^2 without a calculator, and show the step. (b) Factor 16x^4 - 81 completely over the integers, and explain why you stop where you do.",
      scheme: [
        "Writes 49^2 - 47^2 = (49 - 47)(49 + 47)",
        "Evaluates it as 2 x 96 = 192",
        "Factors 16x^4 - 81 as (4x^2 - 9)(4x^2 + 9) and then factors 4x^2 - 9 as (2x - 3)(2x + 3)",
        "Says 4x^2 + 9 is a sum of squares and cannot be factored over the integers or real numbers, so the factorization is complete",
      ],
      model:
        "(a) 49^2 - 47^2 = (49 - 47)(49 + 47) = 2 x 96 = 192. (b) 16x^4 - 81 = (4x^2)^2 - 9^2 = (4x^2 - 9)(4x^2 + 9). The factor 4x^2 - 9 is also a difference of squares, (2x)^2 - 3^2 = (2x - 3)(2x + 3). The complete factorization is (2x - 3)(2x + 3)(4x^2 + 9). The factor 4x^2 + 9 is a sum of squares and has no real factors, so I stop there.",
      answers: [
        [
          "full",
          "(a) [[0|49^2 - 47^2 = (49 - 47)(49 + 47)]] [[1|= 2 x 96 = 192]]. (b) [[2|16x^4 - 81 is (4x^2)^2 - 9^2 = (4x^2 - 9)(4x^2 + 9), and 4x^2 - 9 is (2x - 3)(2x + 3)]]. [[3|I stop because 4x^2 + 9 is a sum of squares, and those don't factor with real numbers]].",
          "Full marks. Looking for a second difference of squares inside the first factor is the key move in part (b).",
        ],
        [
          "full",
          "(a) Difference of squares with a = 49, b = 47: [[0|(49 - 47)(49 + 47)]], which is [[1|2 times 96 = 192]]. (b) Both terms are perfect squares, so [[2|(4x^2 - 9)(4x^2 + 9), then the first one again as (2x - 3)(2x + 3)]]. [[3|The 4x^2 + 9 can't be factored any more, since there's no minus sign and no real number squares to a negative]].",
          "All four marks. Your reason for stopping says why no more real factors exist.",
        ],
        [
          "partial",
          "(a) [[0|(49 - 47)(49 + 47)]] = 2 x 96 = 182. (b) [[2|(4x^2 - 9)(4x^2 + 9) and 4x^2 - 9 is (2x - 3)(2x + 3).]]",
          "Your setup is right. Recheck the arithmetic: 2 x 96 = 192. Also say why you stop at 4x^2 + 9.",
        ],
        [
          "partial",
          "[[0|(49 - 47)(49 + 47)]] [[1|= 192]]. 16x^4 - 81 = (4x^2 - 9)^2.",
          "Part (a) is right. In part (b), a difference of squares gives one sum factor and one difference factor, (4x^2 - 9)(4x^2 + 9), not a square of a difference.",
          true,
        ],
        [
          "weak",
          "49^2 = 2401 and 47^2 = 2209 so the answer is 192, I used a calculator. 16x^4 - 81 = (4x - 9)(4x + 9).",
          "The arithmetic checks out but part (a) asks for the difference of squares step. In (b), 16x^4 is (4x^2)^2, not (4x)^2, so the factors have x^2 in them.",
        ],
        [
          "weak",
          "[[3|You stop at 4x^2 + 9 because it can't be factored.]] (a) is 49 - 47 = 2 and 2 squared is 4.",
          "Your reason for stopping is right. In (a) the difference of squares gives (49 - 47)(49 + 47), a product, not 49 - 47 squared.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Complex numbers and quadratics with complex solutions",
  note: `
## Objectives

Students will be able to:

1. write and compute with complex numbers of the form a + bi;
2. solve quadratic equations with real coefficients that have complex solutions.

## Materials

Graphing handhelds, a table of powers of i, whiteboards, the problem set and worksheet.

## Starter (8 minutes)

Ask: "Is there a number whose square is -1?" Let students argue. Then introduce i, defined by i^2 = -1, and fill in the cycle of powers: i, -1, -i, 1. Ask for i^23 by finding the remainder when 23 is divided by 4.

## Main activity

1. Add, subtract and multiply complex numbers, always replacing i^2 by -1. Practice (3 + 2i)(4 - 5i).
2. Division: multiply the top and bottom by the conjugate. Do (5 + i)/(2 - i) and explain why the denominator becomes a real number.
3. Quadratic equations: solve x^2 + 4x + 13 = 0 and 2x^2 - 4x + 10 = 0 with the formula, and check one complex solution by substituting.
4. Modulus: |3 - 4i| = 5 as the distance from the origin on the complex plane.

## Checking for understanding

Whiteboards: "What is (2 + 3i)(2 - 3i)? What do you notice?" Look for the real result 13.

## Problem set and worksheet

Collect the problem set, and hand out the worksheet.
`,
  reading: [
    "Numbers with a new square root",
    `
Over the real numbers, the equation x^2 = -1 has no solution, since no real number squared is negative. Mathematicians fixed this by inventing a number i with the property i^2 = -1. A complex number is a number a + bi, where a and b are real. The number a is the real part and b is the imaginary part. Real numbers are the special case b = 0.

Adding and subtracting work part by part: (2 + 3i) + (4 - i) = 6 + 2i. Multiplication works like multiplying binomials, and then each i^2 is replaced by -1. For (3 + 2i)(4 - 5i), expand to 12 - 15i + 8i - 10i^2. Since i^2 = -1, the last term is +10, so the product is 22 - 7i. A common mistake is to forget that i^2 is -1 and write 12 - 7i - 10 = 2 - 7i. Powers of i repeat in a cycle of four: i, -1, -i, 1. To find i^23, divide 23 by 4, with remainder 3, so i^23 = i^3 = -i.

The conjugate of a + bi is a - bi. Multiplying a number by its conjugate always gives a real number: (2 + 3i)(2 - 3i) = 4 - 9i^2 = 13. This is how we divide. To compute (5 + i)/(2 - i), multiply the top and bottom by 2 + i. The top becomes (5 + i)(2 + i) = 10 + 5i + 2i + i^2 = 9 + 7i. The bottom becomes 4 + 1 = 5. So the quotient is (9 + 7i)/5, which is 9/5 + (7/5)i. The modulus |a + bi| is the distance from the origin, the square root of a^2 + b^2, so |3 - 4i| = 5.

Complex numbers finish the story of quadratics. If the discriminant is negative, the quadratic formula gives square roots of negative numbers, and now they have an answer. Solve x^2 + 4x + 13 = 0. The discriminant is 16 - 52 = -36, so x = (-4 plus or minus the square root of -36)/2 = (-4 plus or minus 6i)/2 = -2 plus or minus 3i. The solutions come in conjugate pairs when the coefficients are real. For 2x^2 - 4x + 10 = 0 the discriminant is 16 - 80 = -64, so x = (4 plus or minus 8i)/4 = 1 plus or minus 2i. Check x = 1 + 2i: x^2 = -3 + 4i, so 2x^2 - 4x + 10 = (-6 + 8i) - (4 + 8i) + 10 = 0. The parabola never crosses the x-axis, but the equation still has two solutions in the complex numbers.
`,
  ],
  cards: [
    ["Imaginary unit", "The number i with i^2 = -1."],
    ["Complex number", "A number a + bi, where a and b are real numbers."],
    ["Complex conjugate", "The conjugate of a + bi is a - bi. The product of a number and its conjugate is real."],
    ["Powers of i", "The cycle i, -1, -i, 1, repeating every four powers."],
    ["Modulus", "|a + bi| = the square root of (a^2 + b^2), the distance from the origin."],
    ["Dividing complex numbers", "Multiply the top and bottom by the conjugate of the bottom."],
    ["Complex solutions of a quadratic", "When the discriminant is negative, the solutions are a conjugate pair."],
    ["Real and imaginary parts", "In 3 + 2i, the real part is 3 and the imaginary part is 2."],
  ],
  closed: [
    [
      "What is i^23?",
      ["i", "-i", "1", "-1"],
      "B",
    ],
    [
      "What is (3 + 2i)(4 - 5i)?",
      ["22 - 7i", "2 - 7i", "12 - 10i", "22 + 7i"],
      "A",
    ],
    [
      "What is (5 + i)/(2 - i) in the form a + bi?",
      ["(9 + 7i)/3", "(11 + 7i)/5", "(9 + 7i)/5", "(9 - 7i)/5"],
      "C",
    ],
    [
      "Solve x^2 + 4x + 13 = 0.",
      ["x = 2 plus or minus 3i", "x = -4 plus or minus 3i", "x = -2 plus or minus 9i", "x = -2 plus or minus 3i"],
      "D",
    ],
    [
      "What is |3 - 4i|?",
      ["7", "1", "5", "the square root of 7"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Simplify (2 + 3i)^2 - (1 - i)(4 + 2i) and write the result in the form a + bi. Show each product, and explain what you do with every i^2.",
      scheme: [
        "Expands (2 + 3i)^2 as 4 + 12i + 9i^2",
        "Replaces i^2 with -1 to get -5 + 12i",
        "Expands (1 - i)(4 + 2i) and simplifies to 6 - 2i",
        "Subtracts to get -11 + 14i",
      ],
      model:
        "(2 + 3i)^2 = 4 + 12i + 9i^2 = 4 + 12i - 9 = -5 + 12i, since i^2 = -1. (1 - i)(4 + 2i) = 4 + 2i - 4i - 2i^2 = 4 - 2i + 2 = 6 - 2i. Subtracting: (-5 + 12i) - (6 - 2i) = -11 + 14i.",
      answers: [
        [
          "full",
          "[[0|(2 + 3i)^2 = 4 + 6i + 6i + 9i^2 = 4 + 12i + 9i^2.]] [[1|Since i^2 is -1, the 9i^2 is -9, so it's -5 + 12i.]] [[2|(1 - i)(4 + 2i) = 4 + 2i - 4i - 2i^2 = 4 - 2i + 2 = 6 - 2i.]] [[3|Subtract (careful with the signs): -5 - 6 = -11 and 12i + 2i = 14i, so -11 + 14i.]]",
          "Full marks. Distributing the minus sign to both parts of 6 - 2i was the careful step here.",
        ],
        [
          "full",
          "First term: FOIL gives [[0|4 + 12i + 9i^2]], and [[1|replacing i^2 with -1 makes 4 + 12i - 9 = -5 + 12i]]. Second term: [[2|4 + 2i - 4i - 2i^2 = 4 - 2i + 2 = 6 - 2i, because -2i^2 = +2]]. Then [[3|(-5 + 12i) - (6 - 2i) = -5 - 6 + 12i + 2i = -11 + 14i]].",
          "All four marks. You kept track of every i^2 separately, which is what the question asked for.",
        ],
        [
          "partial",
          "[[0|(2 + 3i)^2 = 4 + 12i + 9i^2.]] [[1|With i^2 = -1 that is -5 + 12i.]] Second, (1 - i)(4 + 2i) = 4 + 2i - 4i - 2i^2 = 4 - 2i - 2 = 2 - 2i. So the answer is -7 + 14i.",
          "The first product is right. In the second, -2i^2 is -2 times -1, which is +2, not -2, so the product is 6 - 2i.",
        ],
        [
          "partial",
          "[[2|(1 - i)(4 + 2i) = 6 - 2i.]] [[3|(-5 + 12i) - (6 - 2i) = -11 + 14i.]]",
          "Your second product and final answer are right. Show the first one, (2 + 3i)^2, with its middle term 12i and the i^2 replaced by -1.",
          true,
        ],
        [
          "weak",
          "(2 + 3i)^2 = 4 + 9i^2 = 4 + 9 = 13, because i^2 is 1.",
          "i^2 is -1, not 1. Also squaring a binomial has a middle term: (2 + 3i)^2 = 4 + 12i + 9i^2.",
        ],
        [
          "weak",
          "[[1|i^2 is -1]]. Then (2 + 3i)^2 is 4 + 9i = 4 + 9i and (1 - i)(4 + 2i) is 4 + 2i^2 = 2. Answer: 2 + 9i.",
          "You remembered i^2 = -1, which is the key fact. But the square (2 + 3i)^2 needs all four products, and so does the second one. The squares of 2 and 3i are not the whole story.",
        ],
      ],
    },
    {
      prompt:
        "Solve 2x^2 - 4x + 10 = 0 using the quadratic formula. State the discriminant, give both solutions in the form a + bi, and check one of them by substituting it into the equation.",
      scheme: [
        "Finds the discriminant 16 - 80 = -64, which is negative, so the solutions are complex",
        "Writes the square root of -64 as 8i",
        "Finds x = (4 plus or minus 8i)/4 = 1 plus or minus 2i",
        "Checks one solution: with x = 1 + 2i, x^2 = -3 + 4i and 2x^2 - 4x + 10 = 0",
      ],
      model:
        "With a = 2, b = -4 and c = 10, the discriminant is (-4)^2 - 4(2)(10) = 16 - 80 = -64. The square root of -64 is 8i, so x = (4 plus or minus 8i)/4 = 1 plus or minus 2i. Check x = 1 + 2i: x^2 = 1 + 4i + 4i^2 = -3 + 4i, so 2x^2 = -6 + 8i, and -4x = -4 - 8i. Then -6 + 8i - 4 - 8i + 10 = 0, which works.",
      answers: [
        [
          "full",
          "[[0|a = 2, b = -4, c = 10 so the discriminant is 16 - 80 = -64, negative.]] [[1|The square root of -64 is 8i.]] [[2|x = (4 plus or minus 8i)/4 = 1 plus or minus 2i.]] [[3|Check 1 + 2i: x^2 = -3 + 4i, 2x^2 = -6 + 8i, -4x = -4 - 8i, add 10: -6 - 4 + 10 = 0 and 8i - 8i = 0. It works.]]",
          "Full marks. A complete check by substitution is the best way to trust a complex answer.",
        ],
        [
          "full",
          "Discriminant: [[0|b^2 - 4ac = 16 - 80 = -64, so we get complex solutions]]. [[1|sqrt(-64) = sqrt(64) times i = 8i]]. [[2|x = (4 plus or minus 8i) / 4, divide both by 4, x = 1 plus or minus 2i]]. [[3|Check x = 1 - 2i: x^2 = 1 - 4i + 4i^2 = -3 - 4i, so 2x^2 = -6 - 8i, minus 4x is -4 + 8i, plus 10, total 0]].",
          "All four marks. Checking the other conjugate shows the pair both work.",
        ],
        [
          "partial",
          "[[0|The discriminant is -64.]] [[1|The root is 8i.]] x = (4 plus or minus 8i)/2 = 2 plus or minus 4i.",
          "The discriminant and root are right. The formula divides by 2a, which is 4 for this equation, not 2. That gives 1 plus or minus 2i.",
        ],
        [
          "partial",
          "[[2|x = 1 plus or minus 2i]]. [[3|I checked 1 + 2i and it works.]]",
          "The solutions are right. Show the discriminant, -64, and how the square root of -64 becomes 8i, and show your check in detail.",
          true,
        ],
        [
          "weak",
          "The discriminant is negative so there's no solution.",
          "A negative discriminant means no real solutions. There are two complex solutions, which come from the square root of a negative number, written with i.",
        ],
        [
          "weak",
          "[[0|16 - 80 = -64 for the discriminant]]. The square root of -64 is -8, so x = (4 plus or minus -8)/4 = 3 or -1.",
          "The discriminant is right. But no real number squared is -64, so the root is 8i, not -8. That makes the solutions complex: 1 plus or minus 2i.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Polynomial arithmetic and the remainder theorem",
  note: `
## Objectives

Students will be able to:

1. add, subtract and multiply polynomials, and explain why polynomials are closed under those three operations;
2. apply the remainder theorem to test whether a number is a root of a polynomial and to find factors.

## Materials

Whiteboards, a handout of polynomial subtraction practice, synthetic division reference cards, the worksheet.

## Starter (8 minutes)

Write (3x^2 - 2x + 5) - (x^2 + 4x - 7) and ask students to subtract. Many forget to distribute the minus sign across the second polynomial. Use the error to emphasize writing the sign change on every term before combining.

## Main activity

1. Add, subtract and multiply: (x + 3)(x^2 - 2x + 4). Find the degree of each result and discuss why the sum, difference and product of polynomials are again polynomials.
2. Evaluate f(3) for f(x) = x^3 - 4x^2 + 2x + 6, then divide by x - 3 and compare the remainder. State the remainder theorem: the remainder on division by x - a is f(a).
3. Test x - 3 as a factor of f(x) = 2x^3 - 5x^2 - 4x + 3 with f(3), divide, and factor the quotient completely.
4. Show that x - 1 is not a factor of x^3 + 3x^2 - 4x - 12, and find the remainder.

## Checking for understanding

Whiteboards: "What does f(2) = 0 tell you about the polynomial f?" Look for the factor (x - 2).

## Worksheet

Collect the worksheet at the end of class.
`,
  reading: [
    "Closed under three operations, and what the remainder tells you",
    `
A polynomial is a sum of terms of the form a times x^n with n a whole number. When you add two polynomials, you add the coefficients of the matching powers, and the result is another polynomial. Subtraction is the same, but you must distribute the minus sign to every term of the second polynomial. For (3x^2 - 2x + 5) - (x^2 + 4x - 7), write 3x^2 - 2x + 5 - x^2 - 4x + 7, then combine like terms: 2x^2 - 6x + 12. A very common error is to subtract only the first term of the second polynomial and leave the signs of the others alone.

Multiplication uses the distributive property over and over. For (x + 3)(x^2 - 2x + 4), multiply x by each term to get x^3 - 2x^2 + 4x, multiply 3 by each term to get 3x^2 - 6x + 12, and combine to get x^3 + x^2 - 2x + 12. The degree of a product is the sum of the degrees, here 1 + 2 = 3. Because adding, subtracting and multiplying polynomials always gives another polynomial, we say that polynomials are closed under those operations, in the same way that the integers are closed under addition, subtraction and multiplication. Division is different. Dividing 1 by x gives 1/x, which is not a polynomial, just as dividing 1 by 2 does not give an integer.

Now for a clever connection. If you divide a polynomial f(x) by x - a, the remainder is a number, and it equals f(a). That is the remainder theorem. For f(x) = x^3 - 4x^2 + 2x + 6 divided by x - 3, the remainder is f(3) = 27 - 36 + 6 + 6 = 3. You do not need to do the long division to know it. A special case is the factor theorem: if f(a) = 0, the remainder is 0, so x - a divides f(x) evenly, and a is a root of the polynomial.

Test f(x) = 2x^3 - 5x^2 - 4x + 3 at x = 3: 54 - 45 - 12 + 3 = 0. So x - 3 is a factor. Dividing gives the quotient 2x^2 + x - 1, which factors as (2x - 1)(x + 1). So f(x) = (x - 3)(2x - 1)(x + 1) and the roots are 3, 1/2 and -1. Compare with f(x) = x^3 + 3x^2 - 4x - 12 at x = 1: f(1) = 1 + 3 - 4 - 12 = -12, which is not zero, so x - 1 is not a factor, and the remainder is -12.
`,
  ],
  cards: [
    ["Polynomial", "A sum of terms a times x^n where n is a whole number."],
    ["Closure", "A set is closed under an operation if the result is always in the set. Polynomials are closed under addition, subtraction and multiplication."],
    ["Degree of a product", "The sum of the degrees of the factors."],
    ["Remainder theorem", "The remainder when f(x) is divided by x - a equals f(a)."],
    ["Factor theorem", "x - a is a factor of f(x) exactly when f(a) = 0."],
    ["Root", "A number a for which f(a) = 0. It is also called a zero."],
    ["Distribute the minus sign", "When subtracting a polynomial, change the sign of every one of its terms."],
    ["Quotient and remainder", "Dividing f(x) by x - a gives a quotient polynomial plus a constant remainder."],
  ],
  closed: [
    [
      "What is (3x^2 - 2x + 5) - (x^2 + 4x - 7)?",
      ["2x^2 - 6x + 12", "2x^2 + 2x - 2", "2x^2 - 6x - 2", "4x^2 + 2x - 2"],
      "A",
    ],
    [
      "What is (x + 3)(x^2 - 2x + 4)?",
      ["x^3 + 12", "x^3 + x^2 - 2x + 12", "x^3 + 5x^2 - 2x + 12", "x^3 + x^2 + 2x + 12"],
      "B",
    ],
    [
      "What is the remainder when f(x) = x^3 - 4x^2 + 2x + 6 is divided by x - 3?",
      ["-3", "6", "3", "9"],
      "C",
    ],
    [
      "Is x - 1 a factor of f(x) = x^3 + 3x^2 - 4x - 12?",
      [
        "Yes, since f(1) = 0",
        "Yes, since f(-1) = 0",
        "No, since f(1) = 12",
        "No, since f(1) = -12, which is the remainder",
      ],
      "D",
    ],
    [
      "Which operation on two polynomials does NOT always result in a polynomial?",
      ["Division", "Addition", "Subtraction", "Multiplication"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Use the remainder theorem to show that x - 3 is a factor of f(x) = 2x^3 - 5x^2 - 4x + 3. Then divide, factor the quotient, and list all the zeros of f.",
      scheme: [
        "Computes f(3) = 54 - 45 - 12 + 3 = 0",
        "States that the remainder is 0, so x - 3 is a factor",
        "Divides to get the quotient 2x^2 + x - 1",
        "Factors the quotient as (2x - 1)(x + 1) and lists the zeros 3, 1/2 and -1",
      ],
      model:
        "f(3) = 2(27) - 5(9) - 4(3) + 3 = 54 - 45 - 12 + 3 = 0. By the remainder theorem the remainder when f is divided by x - 3 is 0, so x - 3 is a factor. Dividing gives 2x^2 + x - 1, because (x - 3)(2x^2 + x - 1) = 2x^3 + x^2 - x - 6x^2 - 3x + 3 = 2x^3 - 5x^2 - 4x + 3. Factoring, 2x^2 + x - 1 = (2x - 1)(x + 1). So f(x) = (x - 3)(2x - 1)(x + 1) and the zeros are 3, 1/2 and -1.",
      answers: [
        [
          "full",
          "[[0|f(3) = 2(27) - 5(9) - 12 + 3 = 54 - 45 - 12 + 3 = 0.]] [[1|The remainder is 0, so x - 3 divides f evenly and is a factor.]] [[2|Dividing gives 2x^2 + x - 1.]] [[3|2x^2 + x - 1 = (2x - 1)(x + 1), so the zeros are 3, 1/2 and -1.]]",
          "Full marks. You might also have checked by multiplying the factors back out.",
        ],
        [
          "full",
          "Test with the remainder theorem: [[0|f(3) = 54 - 45 - 12 + 3 which is 0]]. [[1|Remainder zero means (x - 3) is a factor, by the factor theorem]]. Long division gives [[2|a quotient of 2x^2 + x - 1]]. [[3|Factor it: (2x - 1)(x + 1). All three factors, (x - 3)(2x - 1)(x + 1), set to zero give 3, 1/2 and -1]].",
          "All four marks. Naming the factor theorem for the second step is the right reason.",
        ],
        [
          "partial",
          "[[0|f(3) = 54 - 45 - 12 + 3 = 0.]] [[1|So x - 3 is a factor.]] Then the zeros are just 3.",
          "The factor test is right. A cubic can have three zeros. Divide to get 2x^2 + x - 1, factor it as (2x - 1)(x + 1), and the other zeros are 1/2 and -1.",
        ],
        [
          "partial",
          "[[2|The quotient is 2x^2 + x - 1.]] [[3|It factors into (2x - 1)(x + 1), so the zeros are 3, 1/2 and -1.]]",
          "The quotient and zeros are right. Show how you know x - 3 is a factor first, by evaluating f(3) and finding a remainder of 0.",
          true,
        ],
        [
          "weak",
          "f(3) = 2 x 3^3 = 162 and so the remainder is 162, which means x - 3 isn't a factor.",
          "You have to evaluate every term: 2(27) - 5(9) - 4(3) + 3 = 0. With only the first term, you found a wrong remainder.",
        ],
        [
          "weak",
          "[[1|The remainder is zero so it's a factor]]. I divided in my head and got 2x^2 - x - 1.",
          "Your reasoning is right if the remainder is zero. Check the quotient by multiplying: (x - 3)(2x^2 - x - 1) gives a middle coefficient that does not match. The quotient is 2x^2 + x - 1.",
        ],
      ],
    },
    {
      prompt:
        "Multiply (2x - 1)(x^2 + 3x - 4), state the degree of the product, and explain why this shows that the set of polynomials is closed under multiplication. Give an example of an operation on polynomials that is not closed.",
      scheme: [
        "Distributes correctly, multiplying each term of the quadratic by 2x and by -1",
        "Combines like terms to get 2x^3 + 5x^2 - 11x + 4, of degree 3",
        "Explains closure: the sum, difference or product of any two polynomials is another polynomial",
        "Gives division as an operation that is not closed, such as 1 divided by x, which is not a polynomial",
      ],
      model:
        "(2x - 1)(x^2 + 3x - 4) = 2x^3 + 6x^2 - 8x - x^2 - 3x + 4 = 2x^3 + 5x^2 - 11x + 4. The degree is 3, which is 1 + 2. This is an example of closure: multiplying two polynomials gives terms with whole-number powers, so the result is always a polynomial, and the same holds for sums and differences. Division is not closed, since 1 divided by x is 1/x, which has a negative power of x and is not a polynomial.",
      answers: [
        [
          "full",
          "[[0|2x times each term gives 2x^3 + 6x^2 - 8x, and -1 times each term gives -x^2 - 3x + 4.]] [[1|Combined: 2x^3 + 5x^2 - 11x + 4, which is degree 3.]] [[2|Closure means if you add, subtract or multiply two polynomials you always get a polynomial, since the powers stay whole numbers.]] [[3|Division isn't closed because 1 divided by x is 1/x, with x to the -1, and that's not a polynomial.]]",
          "Full marks. Your reason, that the powers stay whole numbers, is the heart of closure.",
        ],
        [
          "full",
          "Distribute: [[0|(2x)(x^2) + (2x)(3x) + (2x)(-4) + (-1)(x^2) + (-1)(3x) + (-1)(-4)]]. Combine: [[1|2x^3 + 6x^2 - x^2 - 8x - 3x + 4 = 2x^3 + 5x^2 - 11x + 4, degree 1 + 2 = 3]]. [[2|Closed means the result is always a polynomial: products of whole-number powers are whole-number powers]]. [[3|Dividing by a polynomial can leave x in the denominator, like 3 divided by x + 1, so division isn't closed]].",
          "All four marks. Showing every product before combining makes it easy to find any slip.",
        ],
        [
          "partial",
          "[[0|2x^3 + 6x^2 - 8x - x^2 - 3x + 4.]] That makes 2x^3 + 5x^2 - 11x + 4, which is degree 3. Closure means they stay the same.",
          "Your product is right. Closure does not mean they stay the same. It means the result of the operation is always in the same family, a polynomial.",
        ],
        [
          "partial",
          "[[2|Polynomials are closed under multiplication, so the answer is another polynomial.]] [[3|Division is not closed because 1/x isn't a polynomial.]]",
          "Your explanation of closure and the non-example are right. Show the multiplication and say the degree: 2x^3 + 5x^2 - 11x + 4 has degree 3.",
          true,
        ],
        [
          "weak",
          "(2x - 1)(x^2 + 3x - 4) = 2x^3 + 3x - 4 - 1 = 2x^3 + 3x - 5.",
          "Each term of the first factor multiplies each term of the second factor, so there are six products, not three. 2x times x^2 is 2x^3, but 2x also multiplies 3x and -4.",
        ],
        [
          "weak",
          "[[1|2x^3 + 5x^2 - 11x + 4 is degree 3]]. Closure means you can multiply as much as you want.",
          "Your product and degree are right. Closure is about the type of result: multiplying polynomials always gives a polynomial, so you stay inside the set.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Zeros from factored form, sketching polynomials, and identities",
  note: `
## Objectives

Students will be able to:

1. find the zeros of a polynomial from its factored form and use them, with the multiplicity and the end behavior, to sketch its graph;
2. prove polynomial identities and use them to describe numerical relationships.

## Materials

Graph paper, graphing handhelds for checking, whiteboards, the quiz.

## Starter (8 minutes)

Ask: "How could you compute 103 squared in your head?" Let students find (100 + 3)^2 = 10,000 + 600 + 9. Write the general identity (a + b)^2 = a^2 + 2ab + b^2 and ask why it must be true for every pair of numbers. Use the area of a square with side a + b to illustrate.

## Main activity

1. For f(x) = -(x + 2)(x - 1)^2(x - 4), find the zeros, say which one is a double zero and what the graph does there, find the y-intercept, give the end behavior, and decide the sign of f on each interval.
2. Prove the identity (x^2 - y^2)^2 + (2xy)^2 = (x^2 + y^2)^2 by expanding both sides. Use it to produce Pythagorean triples from x = 5, y = 2 and x = 4, y = 1.
3. Sort practice: given f(x) = x(x - 2)(x + 3), where is it positive? Use test points.

## Checking for understanding

Whiteboards: "A zero of multiplicity 2: does the graph cross or touch the axis?" Look for touch and turn.

## Quiz

Collect the quiz in the last ten minutes.
`,
  reading: [
    "Sketching from the factors, and proving identities",
    `
The factored form of a polynomial gives you a lot of information without any calculation. Each factor (x - r) means there is a zero at x = r. If a factor appears twice, as in (x - 1)^2, the zero has multiplicity 2, and the graph touches the x-axis there and turns around, like the bottom of a parabola, instead of crossing. With multiplicity 3 the graph crosses but flattens at the axis. Consider f(x) = -(x + 2)(x - 1)^2(x - 4). The zeros are -2, 1 (a double zero) and 4. The y-intercept is f(0) = -(2)(1)(-4) = 8. The degree is 4, and the leading coefficient is negative, so both ends point down.

To sketch it, mark the zeros and then work out the sign of f in each interval by testing a point. At x = -3: -(-1)(16)(-7) = -112, negative. At x = 0 the value is 8, positive. At x = 2: -(4)(1)(-2) = 8, positive. At x = 5: -(7)(16)(1) = -112, negative. So the graph comes up from below, crosses at -2, stays above the axis, touches down at x = 1 without crossing, climbs again, crosses at x = 4 and falls forever. Compare f(x) = x(x - 2)(x + 3), with zeros -3, 0 and 2. It is positive between -3 and 0 and again for x greater than 2, and negative elsewhere. Notice the pattern: when the zero is of odd multiplicity the sign changes, and when it is even the sign does not.

An identity is an equation that is true for all values of the variables. We prove it by working on one side until it becomes the other, usually by expanding. Take (x^2 - y^2)^2 + (2xy)^2 = (x^2 + y^2)^2. Expand the left: x^4 - 2x^2y^2 + y^4 + 4x^2y^2 = x^4 + 2x^2y^2 + y^4. The right side, (x^2 + y^2)^2, expands to the same thing, so the identity holds. Its meaning is geometric: the three quantities x^2 - y^2, 2xy and x^2 + y^2 form the sides of a right triangle, for any x and y. With x = 5 and y = 2 we get 21, 20 and 29, and indeed 441 + 400 = 841 = 29^2. With x = 4 and y = 1 the identity produces 15, 8 and 17.

Identities also make mental arithmetic easy. Since (a + b)^2 = a^2 + 2ab + b^2, you can compute 103^2 as (100 + 3)^2 = 10,000 + 600 + 9 = 10,609.
`,
  ],
  cards: [
    ["Multiplicity", "The number of times a factor appears. A zero of multiplicity 2 means the graph touches the axis and turns."],
    ["Odd multiplicity", "At a zero of odd multiplicity the graph crosses the x-axis, and the sign of the function changes."],
    ["Even multiplicity", "At a zero of even multiplicity the graph touches the x-axis and the sign does not change."],
    ["Sign chart", "A list of the intervals between zeros with the sign of the function on each, found by testing a point."],
    ["Identity", "An equation that is true for all values of its variables."],
    ["Proving an identity", "Expand or simplify one side, or both, until the two sides match."],
    ["Square of a binomial", "(a + b)^2 = a^2 + 2ab + b^2."],
    ["Pythagorean triple identity", "(x^2 - y^2)^2 + (2xy)^2 = (x^2 + y^2)^2."],
  ],
  closed: [
    [
      "At x = 1, the graph of f(x) = (x + 4)(x - 1)^2 does what?",
      [
        "It touches the x-axis and turns around",
        "It crosses the x-axis",
        "It has a vertical asymptote",
        "It has a y-intercept of 1",
      ],
      "A",
    ],
    [
      "What is the end behavior of f(x) = -x^4 + 3x^2?",
      ["Both ends point up", "Left end up and right end down", "Left end down and right end up", "Both ends point down"],
      "D",
    ],
    [
      "Using (100 + 3)^2, what is 103^2?",
      ["10,309", "10,609", "10,009", "10,906"],
      "B",
    ],
    [
      "The identity (x^2 - y^2)^2 + (2xy)^2 = (x^2 + y^2)^2 generates a Pythagorean triple. Which triple comes from x = 4 and y = 1?",
      ["3, 4, 5", "9, 12, 15", "8, 15, 17", "15, 17, 19"],
      "C",
    ],
    [
      "For f(x) = x(x - 2)(x + 3), on which intervals is f(x) positive?",
      [
        "x < -3 and 0 < x < 2",
        "-3 < x < 0 and x > 2",
        "-3 < x < 2 only",
        "x > 0 only",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Let f(x) = -(x + 2)(x - 1)^2(x - 4). Find the zeros and say what the graph does at the double zero. Find the y-intercept and the end behavior. State on which intervals f is positive and on which it is negative.",
      scheme: [
        "Finds the zeros -2, 1 and 4 and says the graph touches the axis and turns at the double zero x = 1",
        "Finds the y-intercept f(0) = 8",
        "States the end behavior: both ends point down, because the degree is 4 and the leading coefficient is negative",
        "Gives the signs: positive for -2 < x < 1 and 1 < x < 4, negative for x < -2 and x > 4, using test points",
      ],
      model:
        "The zeros are x = -2, x = 1 and x = 4. The zero at 1 has multiplicity 2, so the graph touches the x-axis there and turns instead of crossing. The y-intercept is f(0) = -(2)(1)(-4) = 8. The degree is 4 and the leading coefficient is negative, so both ends point down. Testing points: f(-3) = -112, f(0) = 8, f(2) = 8 and f(5) = -112. So f is positive on -2 < x < 1 and 1 < x < 4, and negative on x < -2 and x > 4.",
      answers: [
        [
          "full",
          "[[0|The zeros are -2, 1 and 4, and 1 is a double zero, so the graph just touches the x-axis at 1 and bounces back.]] [[1|The y-intercept is f(0) = -(2)(1)(-4) = 8.]] [[2|It's degree 4 with a negative front, so both ends go down.]] [[3|f(0) = 8 and f(2) = 8 are positive, so it's positive from -2 to 1 and from 1 to 4. At -3 and 5 it is -112, so it's negative outside of -2 and 4.]]",
          "Full marks. Testing a point in each interval is the reliable way to get the signs.",
        ],
        [
          "full",
          "Zeros: [[0|x = -2, x = 4 and the double zero x = 1 where it touches and turns]]. [[1|(0, 8) is the y-intercept: -(0 + 2)(0 - 1)^2(0 - 4) = -(2)(1)(-4) = 8]]. Ends: [[2|even degree and the leading coefficient is -1, so down on both sides]]. Signs: [[3|negative for x < -2, positive from -2 to 4 (except zero at 1, where it only touches), negative for x > 4]].",
          "All four marks. Noticing the sign does not change at x = 1 is the point of the double zero.",
        ],
        [
          "partial",
          "[[0|Zeros -2, 1 and 4. At 1 it touches and turns.]] [[1|f(0) = 8.]] The left end goes down and the right end goes up.",
          "The zeros and intercept are right. This is an even-degree polynomial, so both ends go the same way, and the negative leading coefficient makes them go down.",
        ],
        [
          "partial",
          "[[2|Both ends down.]] [[3|Positive between -2 and 4 except at 1, negative otherwise.]] The zeros are 2, -1 and -4.",
          "The end behavior and signs are right. The zeros are the opposites of the numbers in the factors: x + 2 = 0 gives -2, and x - 4 = 0 gives 4.",
          true,
        ],
        [
          "weak",
          "It crosses at -2, 1 and 4. The y-intercept is 4 because of the -4 in the last factor.",
          "At x = 1 the factor is squared, so the graph touches and turns instead of crossing. The y-intercept comes from putting x = 0 into the whole product, which is 8.",
        ],
        [
          "weak",
          "[[0|The zeros are -2, 1 and 4]], and all of them cross the axis because that's what zeros do.",
          "The zeros are right. A zero with an even multiplicity, like the squared factor at x = 1, touches the axis and turns around rather than crossing.",
        ],
      ],
    },
    {
      prompt:
        "Prove the identity (x^2 - y^2)^2 + (2xy)^2 = (x^2 + y^2)^2 by expanding. Then use it with x = 5 and y = 2 to produce a Pythagorean triple, and check that it works.",
      scheme: [
        "Expands (x^2 - y^2)^2 as x^4 - 2x^2y^2 + y^4",
        "Expands (2xy)^2 as 4x^2y^2",
        "Adds to get x^4 + 2x^2y^2 + y^4, which equals (x^2 + y^2)^2",
        "Uses x = 5, y = 2 to get 21, 20 and 29, and checks that 441 + 400 = 841",
      ],
      model:
        "(x^2 - y^2)^2 = x^4 - 2x^2y^2 + y^4 and (2xy)^2 = 4x^2y^2. Adding them gives x^4 + 2x^2y^2 + y^4, which is (x^2 + y^2)^2, so the identity is true. With x = 5 and y = 2: x^2 - y^2 = 21, 2xy = 20 and x^2 + y^2 = 29. Check: 21^2 + 20^2 = 441 + 400 = 841 = 29^2.",
      answers: [
        [
          "full",
          "[[0|Left side: (x^2 - y^2)^2 = x^4 - 2x^2y^2 + y^4.]] [[1|(2xy)^2 = 4x^2y^2.]] [[2|Add them: x^4 + 2x^2y^2 + y^4, and that is (x^2 + y^2)^2, the right side.]] [[3|With x = 5 and y = 2: 25 - 4 = 21, 2 x 5 x 2 = 20, 25 + 4 = 29, and 441 + 400 = 841 = 29^2.]]",
          "Full marks. Your check with real numbers confirms the algebra.",
        ],
        [
          "full",
          "Expand the left. [[0|(x^2 - y^2)(x^2 - y^2) = x^4 - x^2y^2 - x^2y^2 + y^4 = x^4 - 2x^2y^2 + y^4]]. [[1|(2xy)^2 = 4x^2y^2]]. [[2|Sum is x^4 + 2x^2y^2 + y^4 = (x^2 + y^2)^2 because that's a perfect square trinomial]]. [[3|Plug in 5 and 2: legs 21 and 20, hypotenuse 29, and 21^2 + 20^2 = 841 and 29^2 = 841]].",
          "All four marks. Recognizing the result as a perfect square trinomial ties it to the right side.",
        ],
        [
          "partial",
          "[[0|(x^2 - y^2)^2 = x^4 - 2x^2y^2 + y^4.]] [[1|(2xy)^2 = 4x^2y^2.]] Adding gives x^4 + 2x^2y^2 + y^4 which is the same.",
          "Your two expansions are right. State the last step: x^4 + 2x^2y^2 + y^4 equals (x^2 + y^2)^2, and then use x = 5 and y = 2 as the question asks.",
        ],
        [
          "partial",
          "[[3|x = 5 and y = 2 gives 21, 20 and 29, and 441 + 400 = 841 = 29^2.]] I know the identity is true because the triple works.",
          "The triple is right. One example does not prove an identity for every x and y. Expand both sides to show they match for any values.",
          true,
        ],
        [
          "weak",
          "(x^2 - y^2)^2 = x^4 - y^4 and (2xy)^2 = 2x^2y^2 so the sum is x^4 + 2x^2y^2 - y^4.",
          "Squaring a binomial has a middle term, and (2xy)^2 = 4x^2y^2, with the 2 squared. The correct expansions are x^4 - 2x^2y^2 + y^4 and 4x^2y^2.",
        ],
        [
          "weak",
          "[[3|With 5 and 2 you get 21, 20 and 29.]] I think 21 + 20 = 41 which is bigger than 29, so it works.",
          "The numbers are right. A Pythagorean triple satisfies a^2 + b^2 = c^2, so check 441 + 400 = 841 = 29^2, not the sum of the sides.",
        ],
      ],
    },
  ],
};

writeCourse("algebra-ii-grade-11.json", "Algebra II", "Grade 11", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
