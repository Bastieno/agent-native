import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Honors Physics, Grade 11, Quarter 1. Standards: Next Generation Science
 * Standards, HS-PS2, in the school's own words. Same objectives as Physics,
 * with multi-stage problems, uncertainty propagation and derivations.
 * g is taken as 9.8 m/s^2 throughout.
 */

const w1: WeekInput = {
  topic: "Uncertainty, linearizing data and the language of motion",
  note: `
## Objectives

Students will be able to:

1. design an investigation, propagate uncertainty and present data as a graph with a line of best fit;
2. communicate the results of a motion investigation in a short lab report;
3. distinguish distance from displacement and speed from velocity, including average values over multi-stage trips.

## Materials

Stopwatches, meter sticks, a motion cart, graph paper or a graphing app, the worksheet.

## Starter (7 minutes)

Pose: "You drive 60 km at 30 km/h and then 60 km at 60 km/h. Is your average speed 45 km/h?" Take a vote. Then work it out on the board: the times are 2 h and 1 h, so the average speed is 120/3 = 40 km/h.

## Main activity

1. Propagating uncertainty: for v = d / t, add the percent uncertainties. With d = 1.50 plus or minus 0.01 m (0.7 percent) and t = 2.2 plus or minus 0.1 s (4.5 percent), v = 0.68 m/s with an uncertainty of about 5 percent, or plus or minus 0.04 m/s.
2. Linearizing: if a cart starts from rest, d = 1/2 a t squared, so a graph of d against t squared is a straight line with a slope of a/2. Students plot sample data and find a.
3. Short report structure: question, method, data, analysis, conclusion with uncertainty.

## Checking for understanding

Ask: "Why can the average speed for a round trip be greater than zero while the average velocity is zero?"

## Worksheet

Multi-stage average-speed problems and uncertainty calculations.
`,
  reading: [
    "How sure are you, and how do you find out",
    `
A result in physics is a number, a unit, and a statement of how far to trust it. Suppose you time a cart over a distance of 1.50 m, with a ruler that reads to plus or minus 0.01 m, and you measure a time of 2.2 s with an uncertainty of plus or minus 0.1 s from repeated trials. Which measurement limits the precision of the speed? Compare the **percent uncertainties**: 0.01 divided by 1.50 is 0.7 percent for the distance, and 0.1 divided by 2.2 is 4.5 percent for the time. When quantities are multiplied or divided, the percent uncertainties add, about 5.2 percent here. The speed is 1.50 divided by 2.2, which is 0.68 m/s, and 5.2 percent of that is 0.04 m/s, so the result is written 0.68 plus or minus 0.04 m/s. The timing is the weak link, and a better ruler would not help.

Graphs make a stronger test than a single calculation. If an object starting from rest has constant acceleration, then d = 1/2 a t squared. A graph of d against t gives a curve that is hard to judge by eye, but a graph of d against t squared should be a straight line through the origin, with slope a/2. This is called **linearizing**. If the points follow a straight line, the model fits; if they curve, something else is happening. The slope, with its own uncertainty found by drawing the steepest and shallowest lines that still fit the data, gives the acceleration.

Averages also hide traps. Suppose a driver covers 60 km at 30 km/h and then 60 km at 60 km/h. The average speed is total distance divided by total time, not the average of the two speeds. The first leg takes 2 h and the second 1 h, so the average speed is 120 km divided by 3 h, which is 40 km/h, below 45. The driver spent more time at the lower speed. Velocity adds the idea of direction: the average velocity is the displacement divided by the time. On a round trip, the displacement is zero, so the average velocity is zero even though the average speed is not.

A report should lead with the answer and defend it. The conclusion should say whether the data support the model, give the size of the result with its uncertainty, and name the largest source of error.
`,
  ],
  cards: [
    ["Percent uncertainty", "The uncertainty divided by the measurement, times 100."],
    ["Propagation of uncertainty", "Combining uncertainties; percent uncertainties add when quantities multiply or divide."],
    ["Linearizing", "Choosing axes so that a relationship plots as a straight line."],
    ["Average speed", "Total distance divided by total time."],
    ["Average velocity", "Total displacement divided by total time."],
    ["Line of best fit", "The line that follows the trend of the data points as closely as possible."],
    ["Slope uncertainty", "The range of slopes of lines that still fit the data."],
    ["Round trip", "A journey that returns to the start, so the displacement is zero."],
  ],
  closed: [
    [
      "A driver goes 60 km at 30 km/h and then 60 km at 60 km/h. What is the average speed?",
      ["40 km/h", "45 km/h", "50 km/h", "90 km/h"],
      "A",
    ],
    [
      "A distance of 1.50 plus or minus 0.01 m is divided by a time of 2.2 plus or minus 0.1 s. Which has the larger percent uncertainty?",
      ["The distance", "The time", "They are equal", "Neither has one"],
      "B",
    ],
    [
      "For a cart starting from rest with constant acceleration, which graph is a straight line through the origin?",
      ["d against t", "d against t squared", "v against d", "a against t squared"],
      "B",
    ],
    [
      "A d against t squared graph has a slope of 0.40 m/s2. What is the acceleration?",
      ["0.20 m/s2", "0.40 m/s2", "0.80 m/s2", "1.6 m/s2"],
      "C",
    ],
    [
      "A runner finishes a full lap of a 400 m track. For the lap, which is true?",
      ["The average velocity is zero", "The average speed is zero", "The distance is zero", "The displacement is 400 m"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A student times a cart over 1.50 plus or minus 0.01 m and finds the time to be 2.2 plus or minus 0.1 s. Calculate the average speed with its uncertainty, and say which measurement should be improved first.",
      scheme: [
        "Calculates the speed as 1.50 / 2.2 = 0.68 m/s",
        "Calculates the percent uncertainties as 0.7 percent for distance and 4.5 percent for time",
        "Adds them to get about 5 percent, or plus or minus 0.04 m/s",
        "Concludes that the time measurement should be improved first because it dominates the uncertainty",
      ],
      model:
        "The speed is 1.50 divided by 2.2, which is 0.68 m/s. The percent uncertainty in distance is 0.7 percent and in time is 4.5 percent, so the total is about 5.2 percent, giving plus or minus 0.04 m/s. The time measurement dominates the uncertainty, so it should be improved first, for example by using a photogate or more trials.",
      answers: [
        [
          "full",
          "[[0|v = 1.50/2.2 = 0.68 m/s.]] [[1|The percent uncertainties are 0.01/1.50 = 0.7% and 0.1/2.2 = 4.5%.]] [[2|Adding gives about 5.2%, so v = 0.68 ± 0.04 m/s.]] [[3|The time is the biggest source, so I'd improve the timing first, maybe with a photogate.]]",
          "Full marks. Improving the larger uncertainty is the efficient choice.",
        ],
        [
          "full",
          "[[0|Speed = 0.68 m/s.]] [[1|Distance is 0.7% uncertain, time is 4.5% uncertain.]] [[2|Total ≈ 5%, which is ±0.04 m/s.]] [[3|A better ruler won't help because the time uncertainty dominates.]]",
          "All four marks, with a sensible recommendation.",
        ],
        [
          "partial",
          "[[0|0.68 m/s.]] [[1|0.7% for the distance and 4.5% for the time.]] The total uncertainty is the larger one, 4.5%, and I would improve the ruler.",
          "When dividing, the percent uncertainties add, about 5.2 percent. The time dominates, so the timing is what to improve, not the ruler.",
        ],
        [
          "partial",
          "[[2|0.68 ± 0.04 m/s]] and [[3|the timing needs improving]].",
          "Right conclusions. Show the speed calculation and the two percent uncertainties that lead to them.",
          true,
        ],
        [
          "weak",
          "1.50 × 2.2 = 3.3 m/s, and the uncertainty is 0.01 + 0.1 = 0.11 m/s.",
          "Speed is distance divided by time. Absolute uncertainties of different units cannot be added directly; use percent uncertainties.",
        ],
        [
          "weak",
          "[[0|The speed is 0.68 m/s.]] The ruler should be improved because the distance is the longer number.",
          "Compare the percent uncertainties: 0.7% for the distance and 4.5% for the time. The time is the weak link.",
        ],
      ],
    },
    {
      prompt:
        "Explain why a graph of distance against time squared is better than a graph of distance against time for testing whether a cart released from rest has constant acceleration. State what the slope represents.",
      scheme: [
        "States that for constant acceleration from rest d = 1/2 a t squared",
        "States that plotting d against t squared gives a straight line through the origin",
        "States that a straight line is easier to judge by eye than a curve",
        "States that the slope equals a/2, so the acceleration is twice the slope",
      ],
      model:
        "For constant acceleration from rest, d = 1/2 a t squared. A graph of d against t squared should be a straight line through the origin, and a straight line is much easier to judge by eye than a curve. If the points follow the line, the acceleration is constant. The slope equals a/2, so the acceleration is twice the slope.",
      answers: [
        [
          "full",
          "[[0|From rest with constant acceleration d = ½at².]] [[1|So d against t² should be a straight line through the origin.]] [[2|It's much easier to see whether points fit a straight line than a curve.]] [[3|The slope is a/2, so the acceleration is twice the slope.]]",
          "Full marks. Linearizing turns a hard judgment into an easy one.",
        ],
        [
          "full",
          "[[0|d = ½at² when it starts from rest.]] [[1|Plotting d vs t² makes it a line through the origin.]] [[2|You can tell a line from a curve by eye, so it's a better test of constant a.]] [[3|The gradient equals a/2.]]",
          "All four marks, in concise form.",
        ],
        [
          "partial",
          "[[0|d = ½at².]] [[2|A straight line is easier to check than a curve.]] The slope is the acceleration.",
          "The slope of d against t squared is a/2, not a. Double it to get the acceleration.",
        ],
        [
          "partial",
          "[[1|It gives a straight line through the origin.]] [[3|The slope is a/2.]]",
          "Both are right. Explain why that makes it a better test than d against t.",
          true,
        ],
        [
          "weak",
          "t squared makes the numbers bigger, so the graph is easier to read.",
          "The reason is that the relationship becomes a straight line, which is easy to judge. Use the equation d = 1/2 a t squared.",
        ],
        [
          "weak",
          "[[2|A straight line is easier to judge.]] The slope of the graph is the velocity of the cart.",
          "On a d against t squared graph the slope is a/2, not the velocity. Velocity is the slope of d against t.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Multi-stage motion and the kinematic equations",
  note: `
## Objectives

Students will be able to:

1. describe motion in one dimension using position, velocity and acceleration graphs, including multi-stage motion;
2. apply the constant-acceleration equations to chase, catch-up and braking problems.

## Materials

Graph paper, motion sensor data sets, calculators, the worksheet.

## Starter (6 minutes)

Pose: "A cyclist rides at a steady 8.0 m/s past a stationary car. At that instant the car pulls away with an acceleration of 2.0 m/s2. When and where does the car catch up?" Take guesses, then solve with equations.

## Main activity

1. Multi-stage trips on a velocity-time graph: accelerate at 2.0 m/s2 for 10 s, cruise at 20 m/s for 15 s, brake at 4.0 m/s2 to rest. Area gives 100 + 300 + 50 = 450 m in 30 s, an average velocity of 15 m/s.
2. Chase problems: set both positions equal. 8.0 t = 1/2 (2.0) t squared gives t = 8.0 s and 64 m.
3. Use v squared = v0 squared + 2ad to find the deceleration of a car that stops from 30 m/s in 75 m.

## Checking for understanding

Whiteboards: sketch the velocity-time graph for the cyclist and the car, and mark where the lines' areas are equal.

## Worksheet

Two multi-stage problems and a braking problem.
`,
  reading: [
    "Putting the stages together",
    `
Real journeys are not one equation long. A car accelerates, cruises and brakes. The trick is to split the motion into stages in which the acceleration is constant, apply the equations to each stage, and pass the final velocity of one stage on as the initial velocity of the next.

Consider a car that accelerates from rest at 2.0 m/s2 for 10 s. At the end of the first stage, v = 0 + 2.0 times 10 = 20 m/s and the distance is 1/2 times 2.0 times 100, which is 100 m. It then cruises at 20 m/s for 15 s, covering 300 m. Finally it brakes at 4.0 m/s2 until it stops. The braking time is 20 divided by 4.0, which is 5.0 s, and the distance is 20 squared divided by (2 times 4.0), which is 50 m. The whole trip covers 100 + 300 + 50 = 450 m in 10 + 15 + 5 = 30 s, so the average velocity is 15 m/s. You can check this with the velocity-time graph: the area of the trapezoid, with parallel sides of 30 s and 15 s and a height of 20 m/s, is 1/2 times (30 + 15) times 20, which is 450 m. The average velocity is not the average of the highest and lowest speeds, because the car spent different amounts of time in each stage.

In a **catch-up problem**, two objects start from the same point and you want to know when they are at the same position. Write the position of each as a function of time and set them equal. A cyclist at a steady 8.0 m/s has position x = 8.0t. A car starting from rest at 2.0 m/s2 has x = 1/2 times 2.0 times t squared, which is t squared. Setting them equal, t squared = 8.0t, so t = 0 or t = 8.0 s. At 8.0 s, they are 64 m from the start. At that moment the car's speed is 16 m/s, twice the cyclist's, which shows the car has been faster for a while. They were closest to being level halfway, when the car's speed passed 8.0 m/s at 4.0 s.

The third equation, v squared = v0 squared + 2ad, solves problems in which time is not given. A car stops from 30 m/s in 75 m. Then 0 = 900 + 2a(75), so a = -6.0 m/s2. This is more than half of g, which is a hard stop that would be possible only on dry pavement.
`,
  ],
  cards: [
    ["Multi-stage motion", "Motion split into parts with different constant accelerations."],
    ["Catch-up problem", "A problem in which two objects are at the same position at some time."],
    ["Area under v-t graph", "The displacement."],
    ["Average velocity", "Total displacement divided by total time."],
    ["Trapezoid area", "One half times the sum of the parallel sides times the height."],
    ["v^2 = v0^2 + 2ad", "The equation used when time is not known."],
    ["Final velocity of a stage", "Becomes the initial velocity of the next stage."],
    ["Negative acceleration", "Acceleration opposite to the chosen positive direction."],
  ],
  closed: [
    [
      "A car accelerates from rest at 2.0 m/s2 for 10 s. How far does it go?",
      ["20 m", "50 m", "100 m", "200 m"],
      "C",
    ],
    [
      "A car at 20 m/s brakes at 4.0 m/s2 to a stop. How far does it travel?",
      ["25 m", "50 m", "80 m", "100 m"],
      "B",
    ],
    [
      "A cyclist rides at 8.0 m/s while a car from rest accelerates at 2.0 m/s2. When does the car catch up?",
      ["4.0 s", "8.0 s", "16 s", "2.0 s"],
      "B",
    ],
    [
      "A car stops from 30 m/s in 75 m. Its acceleration is:",
      ["-3.0 m/s2", "-6.0 m/s2", "-9.0 m/s2", "-12 m/s2"],
      "B",
    ],
    [
      "A trip covers 450 m in 30 s. The average velocity is:",
      ["10 m/s", "15 m/s", "20 m/s", "45 m/s"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A cyclist rides past a stationary car at a steady 8.0 m/s. At that moment the car accelerates from rest at 2.0 m/s2. Find when and where the car catches the cyclist, and the car's speed at that moment.",
      scheme: [
        "Writes the cyclist's position as 8.0t and the car's position as 1/2 (2.0) t squared",
        "Sets the positions equal and solves for t = 8.0 s",
        "Finds the distance as 64 m",
        "Finds the car's speed as 16 m/s using v = at",
      ],
      model:
        "The cyclist's position is x = 8.0t and the car's is x = 1/2 times 2.0 times t squared, which is t squared. Setting them equal gives t squared = 8.0t, so t = 8.0 s. The distance is 8.0 times 8.0, or 64 m. The car's speed is 2.0 times 8.0, which is 16 m/s.",
      answers: [
        [
          "full",
          "[[0|Cyclist x = 8.0t, car x = ½(2.0)t² = t².]] [[1|Set equal: t² = 8.0t so t = 8.0 s.]] [[2|x = 8.0 × 8.0 = 64 m.]] [[3|The car's speed is v = at = 16 m/s.]]",
          "Full marks. The car is going twice as fast as the cyclist when it catches up.",
        ],
        [
          "full",
          "[[0|x_cyclist = vt = 8.0t; x_car = ½at² = 1.0t².]] [[1|When they meet, 8.0t = t², so t = 8.0 s (ignoring t = 0).]] [[2|That is 64 m from the start.]] [[3|At that time the car's speed is 2.0 × 8.0 = 16 m/s.]]",
          "All four marks, and you excluded the trivial solution.",
        ],
        [
          "partial",
          "[[0|8.0t for the cyclist and t² for the car.]] [[1|t = 8.0 s.]] The distance is 64 m and the car's speed is 8.0 m/s, the same as the cyclist.",
          "The car is accelerating, so its speed is 2.0 times 8.0 = 16 m/s at that point. It only catches the cyclist because it is going faster.",
        ],
        [
          "partial",
          "[[2|They meet 64 m from the start]] and [[3|the car is going 16 m/s]].",
          "Both are right. Show the equations for position and how you solved for the time.",
          true,
        ],
        [
          "weak",
          "The car catches up when its speed is 8.0 m/s, which is after 4.0 s, and the distance is 32 m.",
          "At 4.0 s the speeds are equal but the car is still behind. It catches up when the positions, not the speeds, are equal.",
        ],
        [
          "weak",
          "[[0|The cyclist's position is 8.0t.]] The car's position is 2.0t because the acceleration is 2.0, so they meet at t = 4.0 s.",
          "The car's position under constant acceleration is 1/2 a t squared, not at. Use that expression.",
        ],
      ],
    },
    {
      prompt:
        "A car accelerates from rest at 2.0 m/s2 for 10 s, cruises for 15 s and then brakes at 4.0 m/s2 to a stop. Find the total distance, the total time and the average velocity, and sketch the velocity-time graph in words.",
      scheme: [
        "Finds the first stage: 20 m/s and 100 m",
        "Finds the cruise: 300 m",
        "Finds the braking: 5.0 s and 50 m, so 450 m in 30 s",
        "Gives the average velocity as 15 m/s and describes a trapezoid-shaped graph",
      ],
      model:
        "In the first stage the car reaches 20 m/s and travels 100 m. In the cruise it covers 20 times 15 = 300 m. Braking takes 20 / 4.0 = 5.0 s and covers 50 m. The total distance is 450 m in 30 s, so the average velocity is 15 m/s. The velocity-time graph rises in a straight line to 20 m/s, stays level, and falls in a straight line to zero, a trapezoid.",
      answers: [
        [
          "full",
          "[[0|Stage 1: v = 20 m/s and d = ½(2.0)(10²) = 100 m.]] [[1|Cruising: 20 × 15 = 300 m.]] [[2|Braking: t = 20/4.0 = 5.0 s, d = 20²/(2×4.0) = 50 m. Total = 450 m in 30 s.]] [[3|Average velocity = 450/30 = 15 m/s, and the graph is a trapezoid: up, flat, down.]]",
          "Full marks. The trapezoid area gives the same distance, a good check.",
        ],
        [
          "full",
          "[[0|After 10 s the car is at 20 m/s and has gone 100 m.]] [[1|Cruise distance is 300 m.]] [[2|Stopping takes 5 s and 50 m, so the whole trip is 450 m in 30 s.]] [[3|Average velocity = 15 m/s. The v-t graph is a trapezoid with area 450.]]",
          "All four marks, with the graph linked to the answer.",
        ],
        [
          "partial",
          "[[0|100 m in stage 1.]] [[1|300 m cruising.]] The braking distance is 20 × 5 = 100 m, so the total is 500 m.",
          "During braking the speed falls from 20 to 0, so the distance uses the average speed, 10 m/s, giving 50 m. The total is 450 m.",
        ],
        [
          "partial",
          "[[3|The average velocity is 15 m/s]] and [[2|the total time is 30 s]].",
          "Both right. Show the distance of each stage, since the average depends on them.",
          true,
        ],
        [
          "weak",
          "The average velocity is the average of 0 and 20 which is 10 m/s, and the distance is 300 m.",
          "The car spends different times in each stage, so use total distance divided by total time: 450/30 = 15 m/s.",
        ],
        [
          "weak",
          "[[1|It travels 300 m while cruising.]] The graph is a straight line from 0 to 20 because it speeds up all the time.",
          "The graph rises, stays flat while cruising, and then falls as the car brakes. It is a trapezoid.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Free fall with initial velocity, and vectors by components",
  note: `
## Objectives

Students will be able to:

1. analyze free fall for objects thrown upward and explain why objects of different masses fall together when air resistance is small;
2. add and resolve vectors graphically and by components, including forces at angles.

## Materials

Meter sticks, a tennis ball, a coin and a crumpled paper (demo), protractors, force table or sketches, the worksheet.

## Starter (6 minutes)

Toss a ball straight up and ask: "What is its velocity at the top? What is its acceleration?" Collect answers. Replay with a motion sensor graph showing a constant slope of -9.8 m/s2 on the velocity-time graph.

## Main activity

1. Upward throw: a ball thrown at 14.7 m/s rises for 1.5 s to a maximum height of about 11 m and returns to the thrower's hand after 3.0 s at the same speed.
2. Compare a coin and a crumpled paper dropped together and a flat paper, then discuss air resistance as a force that depends on speed and shape.
3. Add 50 N at 0 degrees and 80 N at 60 degrees: components 90 N and 69.3 N, a resultant of about 114 N at 38 degrees.

## Checking for understanding

Ask: "A ball is thrown up at 14.7 m/s. What is its speed when it returns to the same height?"

## Worksheet

Upward throw, a symmetry problem and a force addition problem.
`,
  reading: [
    "Up, down and the symmetry of free fall",
    `
When you throw a ball straight up, it slows down on the way up, stops for an instant at the top, and speeds up on the way down. Throughout the flight, the only force is gravity (ignoring air), so the acceleration is 9.8 m/s2 downward the entire time. Taking up as positive, a = -9.8 m/s2. At the top the velocity is zero but the acceleration is not. If the acceleration were zero there, the ball would hover.

Use the equations with care for signs. Suppose you throw a ball upward at 14.7 m/s. The time to the top comes from v = v0 + at: 0 = 14.7 - 9.8t, so t = 1.5 s. The maximum height comes from v squared = v0 squared + 2ad: 0 = 14.7 squared - 2(9.8)d, so d = 216.1 divided by 19.6, which is about 11.0 m. The motion is symmetric when the ball returns to its starting height. It takes another 1.5 s, for 3.0 s in total, and returns with the same speed, 14.7 m/s, directed downward. If the ball is thrown from a bridge and lands in the river below, the equation d = v0 t + 1/2 a t squared gives a quadratic in t, and the physically sensible root is the positive one.

Galileo's observation that objects of different mass fall together is not a coincidence. The gravitational force on an object is mg, and Newton's second law says a = F/m. The mass cancels: a = mg/m = g. A heavier object has more force pulling it down, but proportionally more inertia resisting the acceleration. The reason that a feather falls more slowly than a coin in air is that air resistance, which depends on the shape and speed of the object, is large compared with the feather's weight.

When forces or velocities are at angles, add them by components. Take a 50 N force along the x-axis and an 80 N force at 60 degrees to the x-axis. The second has components 80 cos 60 = 40 N and 80 sin 60 = 69.3 N. The sums are Rx = 50 + 40 = 90 N and Ry = 69.3 N. The magnitude of the resultant is the square root of 90 squared plus 69.3 squared, which is 113.6 N, about 114 N, and its direction is the angle whose tangent is 69.3 divided by 90, which is 37.6 degrees, or 38 degrees above the x-axis.
`,
  ],
  cards: [
    ["Symmetry of free fall", "A thrown object takes equal time up and down and returns with the same speed."],
    ["Acceleration at the top", "Still 9.8 m/s2 downward, even though the velocity is zero."],
    ["Air resistance", "A drag force that depends on the speed and shape of an object."],
    ["Component method", "Add vectors by summing their x-components and their y-components separately."],
    ["Resultant", "The vector sum of two or more vectors."],
    ["Magnitude from components", "The square root of the sum of the squares of the components."],
    ["Direction from components", "The angle whose tangent is Ry divided by Rx."],
    ["Sign convention", "Choosing up (or right) as positive and keeping that choice throughout."],
  ],
  closed: [
    [
      "A ball is thrown upward at 14.7 m/s. How long does it take to reach the top?",
      ["0.75 s", "1.5 s", "3.0 s", "14.7 s"],
      "B",
    ],
    [
      "Which is the maximum height of that ball?",
      ["1.5 m", "7.3 m", "11 m", "22 m"],
      "C",
    ],
    [
      "At the top of its flight, a ball thrown upward has:",
      ["Zero velocity and zero acceleration", "Zero velocity and acceleration 9.8 m/s2 downward", "Maximum velocity", "Acceleration 9.8 m/s2 upward"],
      "B",
    ],
    [
      "Forces of 50 N along x and 80 N at 60 degrees to x are added. What is the x-component of the resultant?",
      ["50 N", "70 N", "90 N", "130 N"],
      "C",
    ],
    [
      "Why do a coin and a hammer fall together in a vacuum?",
      [
        "The heavier object has more gravity, but also more inertia, so a = g for both",
        "Gravity is the same force on both",
        "Inertia is zero in a vacuum",
        "Mass has no effect on weight",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A ball is thrown vertically upward at 14.7 m/s from the ground. Find the time to the top, the maximum height, and the total time in the air. State the speed on return to the ground.",
      scheme: [
        "Finds the time to the top as 1.5 s using v = v0 + at",
        "Finds the maximum height as about 11 m",
        "Finds the total time as 3.0 s using symmetry",
        "States the return speed as 14.7 m/s downward",
      ],
      model:
        "Taking up as positive, 0 = 14.7 minus 9.8t gives t = 1.5 s. The height is 14.7 squared divided by (2 times 9.8), which is 11 m. The flight is symmetric, so the total time is 3.0 s, and the ball returns with a speed of 14.7 m/s downward.",
      answers: [
        [
          "full",
          "[[0|0 = 14.7 − 9.8t, so t = 1.5 s.]] [[1|0 = 14.7² − 2(9.8)d, so d = 11 m.]] [[2|It takes the same time down, so 3.0 s in all.]] [[3|It comes back at 14.7 m/s downward.]]",
          "Full marks. Using symmetry saves a second calculation.",
        ],
        [
          "full",
          "[[0|Time up: t = v0/g = 1.5 s.]] [[1|Height: v0²/(2g) = 216/19.6 = 11 m.]] [[2|Total time = 2 × 1.5 = 3.0 s.]] [[3|The speed at the ground is 14.7 m/s, the same as the launch speed, but downward.]]",
          "All four marks, in a clear order.",
        ],
        [
          "partial",
          "[[0|t up = 1.5 s.]] [[2|Total time is 3.0 s.]] The maximum height is 14.7 × 1.5 = 22 m.",
          "The speed is not constant at 14.7 m/s on the way up. Use the average speed, 7.35 m/s, to get 11 m.",
        ],
        [
          "partial",
          "[[1|The max height is 11 m]] and [[3|the speed is 14.7 m/s on return]].",
          "Both right. Show how you found the time to the top and the total time.",
          true,
        ],
        [
          "weak",
          "At the top the acceleration is zero, so the ball stops there for 1.5 s and then falls.",
          "The acceleration is 9.8 m/s2 downward all the time, including at the top, where only the velocity is zero.",
        ],
        [
          "weak",
          "[[0|t = 14.7/9.8 = 1.5 s.]] The ball lands at 0 m/s because it ends on the ground.",
          "On return to the ground the ball is still moving at 14.7 m/s just before impact. It stops only because the ground exerts a force.",
        ],
      ],
    },
    {
      prompt:
        "Two forces act on a crate: 50 N along the x-axis and 80 N at 60 degrees above the x-axis. Find the magnitude and direction of the resultant force by components.",
      scheme: [
        "Resolves the 80 N force into 40 N (x) and 69.3 N (y)",
        "Adds to get Rx = 90 N and Ry = 69.3 N",
        "Calculates the magnitude as about 114 N",
        "Calculates the direction as about 38 degrees above the x-axis",
      ],
      model:
        "The 80 N force has components 80 cos 60 = 40 N and 80 sin 60 = 69.3 N. Adding, Rx = 50 + 40 = 90 N and Ry = 69.3 N. The magnitude is the square root of 90 squared plus 69.3 squared, which is 114 N. The direction is the angle whose tangent is 69.3/90, which is 38 degrees above the x-axis.",
      answers: [
        [
          "full",
          "[[0|80 cos 60° = 40 N and 80 sin 60° = 69.3 N.]] [[1|Rx = 50 + 40 = 90 N, Ry = 69.3 N.]] [[2|R = √(90² + 69.3²) = 114 N.]] [[3|θ = tan⁻¹(69.3/90) = 38° above the x-axis.]]",
          "Full marks. Each step is clear and the angle is given relative to a stated axis.",
        ],
        [
          "full",
          "[[0|The second force splits into 40 N along x and 69.3 N along y.]] [[1|Adding the x parts gives 90 N and the y part is 69.3 N.]] [[2|The resultant magnitude is about 114 N.]] [[3|Its direction is about 38° from the x-axis toward the y-axis.]]",
          "All four marks, with a clear direction statement.",
        ],
        [
          "partial",
          "[[0|40 N and 69.3 N for the 80 N force.]] [[1|Rx = 90 N and Ry = 69.3 N.]] The resultant is 90 + 69.3 = 159 N.",
          "Components combine at right angles, so use Pythagoras: the square root of 90 squared plus 69.3 squared is 114 N.",
        ],
        [
          "partial",
          "[[2|The magnitude is 114 N]] [[3|at about 38°]].",
          "Both right. Show the components, since the method earns marks.",
          true,
        ],
        [
          "weak",
          "50 + 80 = 130 N at 60 degrees because the forces add up.",
          "Forces at an angle do not add numerically. Resolve into components and add each direction separately.",
        ],
        [
          "weak",
          "[[1|Rx = 90 N.]] Ry = 80 N because that is the other force, so R = √(90² + 80²) = 120 N.",
          "The y-component of the 80 N force is 80 sin 60, which is 69.3 N, not 80 N.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Projectiles at an angle, and Newton's second law in connected systems",
  note: `
## Objectives

Students will be able to:

1. analyze projectile motion by treating the horizontal and vertical motions separately, including angled launches and impact velocity;
2. analyze data and connected-body problems to support the claim that net force equals mass times acceleration.

## Materials

Launchers or ramps, carbon paper, meter sticks, Atwood machine or pulley with masses, the quiz.

## Starter (6 minutes)

Ask: "A football is kicked at 30 m/s at 30 degrees. For how long is it in the air? How far does it go?" Take estimates before solving.

## Main activity

1. Angled launch: 30 m/s at 30 degrees gives vx = 26.0 m/s and vy = 15 m/s, a flight time of 3.06 s, a range of 79.5 m and a maximum height of 11.5 m. Compare two launch angles that give the same range (for example 30 and 60 degrees).
2. Cliff launch: a ball at 15 m/s horizontally from 78.4 m falls for 4.0 s, lands 60 m away and hits at 42 m/s.
3. Atwood machine: 3.0 kg and 2.0 kg over a pulley give a = 1.96 m/s2 and T = 23.5 N.

## Checking for understanding

Ask: "At what launch angle is the range greatest, ignoring air resistance? Why?"

## Quiz and problem set

Five quiz questions and a short problem set.
`,
  reading: [
    "Trajectories and connected masses",
    `
Every projectile is two motions sharing a clock. Horizontally, with no force, the velocity is constant. Vertically, gravity gives a constant downward acceleration of 9.8 m/s2. For a launch at speed v and angle θ above horizontal, the components are vx = v cos θ and vy = v sin θ. For a football kicked at 30 m/s and 30 degrees, vx = 26.0 m/s and vy = 15 m/s. On level ground, the time of flight is 2vy/g, which is 30/9.8 = 3.06 s. The range is vx times t, which is 79.5 m. The maximum height is vy squared divided by 2g, which is 225/19.6 = 11.5 m. At the top of the path the vertical velocity is zero and the horizontal velocity is still 26.0 m/s.

Without air resistance, the range is greatest at 45 degrees, and any two angles that add up to 90 degrees give the same range. A launch at 30 degrees goes as far as one at 60 degrees, though the 60 degree one stays in the air longer and goes higher. In real sports, air resistance reduces the best angle somewhat.

When an object is launched horizontally from a height, the vertical motion starts from zero. A ball thrown at 15 m/s horizontally from a 78.4 m cliff falls for t = the square root of (2 times 78.4 divided by 9.8), which is 4.0 s. It lands 15 times 4.0, or 60 m from the base. Its vertical velocity at impact is 9.8 times 4.0, or 39.2 m/s, so the speed at impact is the square root of 15 squared plus 39.2 squared, about 42 m/s, directed below the horizontal at an angle of tan inverse of 39.2/15, which is 69 degrees.

Newton's second law also applies to connected objects. In an **Atwood machine**, two masses hang over a pulley. For 3.0 kg and 2.0 kg, the heavier mass accelerates down and the lighter up at the same rate. The net force on the system is the difference in weights, (3.0 - 2.0) times 9.8 = 9.8 N, and the mass that has to be accelerated is the total, 5.0 kg, so a = 9.8/5.0 = 1.96 m/s2. To find the tension, apply the second law to one mass. For the 2.0 kg mass moving up, T - 2.0(9.8) = 2.0(1.96), so T = 19.6 + 3.9 = 23.5 N. It is more than the weight of the lighter mass and less than that of the heavier one.
`,
  ],
  cards: [
    ["Time of flight", "For level ground, twice the vertical launch speed divided by g."],
    ["Maximum height", "For a launch, vy squared divided by 2g."],
    ["Complementary angles", "Two launch angles adding to 90 degrees give the same range."],
    ["Impact speed", "The magnitude of the combined horizontal and vertical velocity on landing."],
    ["Atwood machine", "Two masses connected over a pulley, used to study acceleration."],
    ["System", "The group of objects considered together, with the external forces on it."],
    ["Tension", "The pulling force of a rope, the same along a light rope over a frictionless pulley."],
    ["Net force of a system", "The sum of external forces along the direction of motion."],
  ],
  closed: [
    [
      "A ball is kicked at 30 m/s at 30 degrees. What is its time of flight on level ground?",
      ["1.5 s", "3.06 s", "6.1 s", "15 s"],
      "B",
    ],
    [
      "Which launch angle gives the same range as 30 degrees (same speed, no air resistance)?",
      ["45 degrees", "60 degrees", "75 degrees", "90 degrees"],
      "B",
    ],
    [
      "A ball is thrown horizontally at 15 m/s from a 78.4 m cliff. How far from the base does it land?",
      ["15 m", "40 m", "60 m", "78.4 m"],
      "C",
    ],
    [
      "A 3.0 kg and a 2.0 kg mass hang on an Atwood machine. The acceleration is:",
      ["0.98 m/s2", "1.96 m/s2", "4.9 m/s2", "9.8 m/s2"],
      "B",
    ],
    [
      "At the highest point of a projectile's path, the speed is:",
      ["Zero", "Equal to the horizontal component of the launch velocity", "Equal to the vertical component of the launch velocity", "Equal to g"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A ball is thrown horizontally at 15 m/s from a cliff 78.4 m high. Find the time of flight, the horizontal distance, and the speed and direction of the ball at impact.",
      scheme: [
        "Finds the time as 4.0 s using vertical motion from rest",
        "Finds the horizontal distance as 60 m",
        "Finds the vertical velocity at impact as 39.2 m/s and the speed as about 42 m/s",
        "Finds the angle below horizontal as about 69 degrees",
      ],
      model:
        "From 78.4 = 1/2 times 9.8 times t squared, t = 4.0 s. The horizontal distance is 15 times 4.0 = 60 m. The vertical velocity at impact is 9.8 times 4.0 = 39.2 m/s, so the speed is the square root of 15 squared plus 39.2 squared, about 42 m/s. The angle below horizontal is tan inverse of 39.2/15, about 69 degrees.",
      answers: [
        [
          "full",
          "[[0|78.4 = ½(9.8)t², so t = 4.0 s.]] [[1|Horizontal distance = 15 × 4.0 = 60 m.]] [[2|vy = 9.8 × 4.0 = 39.2 m/s, so v = √(15² + 39.2²) ≈ 42 m/s.]] [[3|The angle below horizontal is tan⁻¹(39.2/15) ≈ 69°.]]",
          "Full marks. Combining the two components for the impact velocity is the demanding step.",
        ],
        [
          "full",
          "[[0|Vertical motion from rest gives t = √(2h/g) = 4.0 s.]] [[1|The ball travels 60 m horizontally.]] [[2|At impact vx = 15 m/s and vy = 39.2 m/s, so the speed is about 42 m/s.]] [[3|It hits at roughly 69° below the horizontal.]]",
          "All four marks, in a clear order.",
        ],
        [
          "partial",
          "[[0|t = 4.0 s.]] [[1|The distance is 60 m.]] The speed at impact is 15 m/s because horizontal speed is constant.",
          "Horizontal speed is constant, but the ball also has a vertical speed of 39.2 m/s on impact. Combine them to get 42 m/s.",
        ],
        [
          "partial",
          "[[2|The speed on impact is 42 m/s]] [[3|at 69 degrees below horizontal]].",
          "Right results. Show how you found the time of flight and the horizontal distance.",
          true,
        ],
        [
          "weak",
          "The time is 78.4/15 = 5.2 s and the distance is 78.4 m.",
          "The fall time comes from the vertical motion only, using d = 1/2 g t squared. The horizontal speed does not affect it.",
        ],
        [
          "weak",
          "[[1|The horizontal distance is 60 m.]] The ball hits at 15 m/s straight down because it falls.",
          "At impact it moves both sideways at 15 m/s and downward at 39.2 m/s, so its direction is about 69 degrees below horizontal.",
        ],
      ],
    },
    {
      prompt:
        "A 3.0 kg mass and a 2.0 kg mass are joined by a light string over a frictionless pulley. Find the acceleration of the masses and the tension in the string, and explain why the tension is not equal to either weight.",
      scheme: [
        "Finds the net force on the system as (3.0 - 2.0)(9.8) = 9.8 N",
        "Finds the acceleration as 9.8/5.0 = 1.96 m/s2",
        "Finds the tension as 23.5 N by applying Newton's second law to one mass",
        "Explains that the tension is between the two weights (19.6 N and 29.4 N) because the masses accelerate",
      ],
      model:
        "The net force driving the system is 9.8 N and the total mass is 5.0 kg, so a = 1.96 m/s2. For the 2.0 kg mass, T minus 19.6 = 2.0 times 1.96, so T = 23.5 N. The tension is greater than the lighter weight (19.6 N), which is accelerating upward, and less than the heavier weight (29.4 N), which is accelerating downward.",
      answers: [
        [
          "full",
          "[[0|Net force = (3.0 − 2.0)(9.8) = 9.8 N.]] [[1|a = 9.8/(3.0 + 2.0) = 1.96 m/s².]] [[2|For the 2.0 kg mass, T − 19.6 = 2.0(1.96), so T = 23.5 N.]] [[3|T is more than 19.6 N because that mass goes up, and less than 29.4 N because the other mass goes down.]]",
          "Full marks. Checking the tension against both weights is a good habit.",
        ],
        [
          "full",
          "[[0|The unbalanced force is the difference in weights, 9.8 N.]] [[1|The total mass being accelerated is 5.0 kg so a = 1.96 m/s².]] [[2|Using the 3.0 kg mass: 29.4 − T = 3.0(1.96), so T = 23.5 N.]] [[3|T lies between the weights because one mass accelerates up and the other down.]]",
          "All four marks, with a second way to find the tension.",
        ],
        [
          "partial",
          "[[0|The net force is 9.8 N.]] [[1|a = 1.96 m/s².]] The tension is 29.4 N, the weight of the heavy mass.",
          "If the tension equaled the heavy mass's weight, the net force on it would be zero and it would not accelerate. Apply F = ma to one mass.",
        ],
        [
          "partial",
          "[[2|T = 23.5 N]] [[3|which is between the two weights]].",
          "Right. Show how you found the acceleration, since the tension depends on it.",
          true,
        ],
        [
          "weak",
          "The acceleration is 9.8 m/s² because the heavier mass is falling, and the tension is 0 N.",
          "The masses are connected, so they accelerate together at less than g, and the string is under tension. Divide the net force by the total mass.",
        ],
        [
          "weak",
          "[[0|The net force is 9.8 N.]] a = 9.8/3.0 = 3.3 m/s² because the 3.0 kg mass is the one moving.",
          "Both masses accelerate together, so divide by the total mass, 5.0 kg.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Friction on inclines, connected bodies and the angle of repose",
  note: `
## Objectives

Students will be able to:

1. draw free-body diagrams and find the net force on an object on a slope or in a connected system;
2. state and apply Newton's first and third laws;
3. calculate friction and tension and solve problems on inclined planes with friction.

## Materials

Wooden ramp with adjustable angle, blocks of wood with felt, sandpaper and rubber faces, protractor, spring scales, the practical sheet.

## Starter (6 minutes)

Place a block on a board and slowly raise one end. Ask: "At what angle will it start to slide, and what does that tell us about friction?" Record the guesses.

## Main activity

1. Incline with friction: a 10 kg block on a 30 degree slope with kinetic friction coefficient 0.20 has down-slope force 49 N, normal force 84.9 N and friction 17.0 N. The net force is 32.0 N and a = 3.2 m/s2.
2. Angle of repose: the block just begins to slide when tan(theta) = mu(s). A coefficient of 0.40 corresponds to 21.8 degrees.
3. Connected bodies: a 4.0 kg block on a table (mu = 0.25) pulled by a 2.0 kg hanging mass: a = 1.63 m/s2 and T = 16.3 N.
4. Practical: measure the static friction coefficient for several surfaces by the tilt method.

## Checking for understanding

Ask: "Does the angle of repose depend on the mass of the block? Why or why not?"

## Practical write-up and problem set

Collect with the table of angles and a short analysis.
`,
  reading: [
    "Friction on slopes",
    `
Inclined planes combine components and friction. On a slope of angle θ, the weight mg splits into a component along the slope, mg sin θ, which tries to pull the object downhill, and a component perpendicular to the slope, mg cos θ, which is balanced by the **normal force**. So N = mg cos θ, not mg. The friction force is f = μN, parallel to the slope and opposing the sliding.

Take a 10 kg block on a 30 degree slope with a kinetic friction coefficient of 0.20. The weight is 98 N. Down the slope: 98 sin 30 = 49 N. Normal force: 98 cos 30 = 84.9 N. Friction: 0.20 times 84.9 = 17.0 N. The net force down the slope is 49 - 17.0 = 32.0 N, and the acceleration is 32.0/10 = 3.2 m/s2. In general, a = g(sin θ - μ cos θ). The mass cancels. A block with a different mass would slide at the same acceleration.

There are two kinds of friction. **Static friction** acts when the surfaces are not sliding and adjusts to match the applied force up to a maximum value, μs N. **Kinetic friction** acts during sliding and is usually a little smaller. If you raise a ramp slowly, the block starts to slide when mg sin θ just exceeds the maximum static friction μs mg cos θ. Then tan θ = μs. This is the **angle of repose**. It does not depend on mass, because the mass cancels. A coefficient of 0.40 corresponds to an angle of 21.8 degrees. Measuring the angle with a protractor is a simple way to find μs for any pair of surfaces.

Connected-body problems require separate free-body diagrams for each object, joined by the shared tension and shared acceleration. A 4.0 kg block on a table with μ = 0.25 is pulled by a string over a pulley from a 2.0 kg hanging mass. For the hanging mass, 19.6 - T = 2.0a. For the block, T - 0.25(4.0)(9.8) = 4.0a, where the friction is 9.8 N. Adding the two equations, 19.6 - 9.8 = 6.0a, so a = 1.63 m/s2. Substituting back, T = 19.6 - 2.0(1.63) = 16.3 N.

Newton's third law is useful to check your diagrams. The block pulls on the string and the string pulls on the block with equal forces, but these two forces are on different objects, so they appear on different free-body diagrams.
`,
  ],
  cards: [
    ["Normal force on an incline", "N = mg cos θ, perpendicular to the surface."],
    ["Down-slope component", "mg sin θ, the part of the weight along the slope."],
    ["Static friction", "Friction when surfaces are not sliding; up to a maximum of μs N."],
    ["Kinetic friction", "Friction during sliding, f = μk N."],
    ["Angle of repose", "The angle at which an object begins to slide; tan θ = μs."],
    ["Acceleration on an incline with friction", "a = g(sin θ - μ cos θ)."],
    ["Connected bodies", "Objects linked by a string that share the same acceleration."],
    ["Third-law pair", "Equal and opposite forces that act on different objects."],
  ],
  closed: [
    [
      "A 10 kg block on a 30 degree slope has a kinetic friction coefficient of 0.20. What is its acceleration?",
      ["1.6 m/s2", "3.2 m/s2", "4.9 m/s2", "6.5 m/s2"],
      "B",
    ],
    [
      "A block starts sliding on a ramp at 21.8 degrees. The coefficient of static friction is closest to:",
      ["0.20", "0.40", "0.80", "1.0"],
      "B",
    ],
    [
      "Does the angle of repose depend on the mass of the block?",
      ["Yes, heavier blocks slide sooner", "Yes, lighter blocks slide sooner", "No, the mass cancels", "Only for rough surfaces"],
      "C",
    ],
    [
      "For a 4.0 kg block on a table with mu = 0.25, what is the friction force?",
      ["1.0 N", "9.8 N", "39.2 N", "9.8 kg"],
      "B",
    ],
    [
      "On a slope, the normal force on an object of mass m is:",
      ["mg", "mg sin θ", "mg cos θ", "mg tan θ"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A 10 kg block slides down a 30 degree slope. The coefficient of kinetic friction is 0.20. Draw (describe) the free-body diagram, and find the normal force, the friction force and the acceleration.",
      scheme: [
        "Lists the forces: weight (resolved into components), normal force and friction up the slope",
        "Finds the normal force as 84.9 N",
        "Finds the friction as 17.0 N",
        "Finds the net force as 32 N and the acceleration as 3.2 m/s2",
      ],
      model:
        "The forces are the weight, with a component of 49 N down the slope and 84.9 N into the slope, the normal force of 84.9 N, and friction up the slope. N = 98 cos 30 = 84.9 N. Friction = 0.20 times 84.9 = 17.0 N. The net force is 49 minus 17.0 = 32 N, so a = 3.2 m/s2.",
      answers: [
        [
          "full",
          "[[0|Forces: weight (mg sin θ down the slope, mg cos θ into it), normal force perpendicular, friction up the slope.]] [[1|N = 98 cos 30° = 84.9 N.]] [[2|f = 0.20 × 84.9 = 17.0 N.]] [[3|Net = 49 − 17.0 = 32 N so a = 3.2 m/s².]]",
          "Full marks. All the forces are on the correct axes.",
        ],
        [
          "full",
          "[[0|Three forces act: weight, normal and friction. I resolved the weight along and perpendicular to the slope.]] [[1|The normal force equals mg cos θ = 84.9 N.]] [[2|Friction is μN = 17.0 N, up the slope.]] [[3|a = (49 − 17.0)/10 = 3.2 m/s².]]",
          "All four marks, with a clear choice of axes.",
        ],
        [
          "partial",
          "[[0|Weight, normal and friction.]] The normal force is 98 N so friction is 19.6 N and a = (49 − 19.6)/10 = 2.9 m/s².",
          "On a slope the normal force is mg cos θ, 84.9 N, not the whole weight. Redo the friction with 84.9 N.",
        ],
        [
          "partial",
          "[[3|The acceleration is 3.2 m/s²]] and [[2|friction is 17.0 N]].",
          "These are right. Show the normal force and the forces in the diagram.",
          true,
        ],
        [
          "weak",
          "The net force is 98 N because that's the weight, so a = 9.8 m/s² down the slope.",
          "Only the part of the weight along the slope moves the block, and friction opposes it. The acceleration is less than g.",
        ],
        [
          "weak",
          "[[0|There are weight, normal and friction forces.]] Friction is 0.20 × 10 = 2.0 N, so a = (49 − 2.0)/10 = 4.7 m/s².",
          "Friction is μ times the normal force, 84.9 N, not times the mass. That gives 17.0 N.",
        ],
      ],
    },
    {
      prompt:
        "A 4.0 kg block rests on a table (mu = 0.25) and is connected over a pulley to a 2.0 kg hanging mass. Find the acceleration and the tension. Explain why the tension is the same on both sides of the pulley.",
      scheme: [
        "Finds the friction on the block as 9.8 N",
        "Finds the acceleration as 1.63 m/s2 using the net force 9.8 N and the total mass 6.0 kg",
        "Finds the tension as 16.3 N",
        "Explains that the string is light and the pulley is frictionless, so the tension is the same throughout",
      ],
      model:
        "Friction on the block is 0.25 times 4.0 times 9.8 = 9.8 N. The net force on the system is 19.6 minus 9.8 = 9.8 N, and the total mass is 6.0 kg, so a = 1.63 m/s2. For the hanging mass, T = 19.6 minus 2.0 times 1.63 = 16.3 N. The tension is the same on both sides because the string is light and the pulley frictionless, so it only changes the direction of the force.",
      answers: [
        [
          "full",
          "[[0|Friction = 0.25 × 4.0 × 9.8 = 9.8 N.]] [[1|Net force on the system = 19.6 − 9.8 = 9.8 N, mass 6.0 kg, so a = 1.63 m/s².]] [[2|For the hanging mass, 19.6 − T = 2.0(1.63), so T = 16.3 N.]] [[3|The tension is the same on both sides because the string is light and the pulley has no friction.]]",
          "Full marks. Treating the pair as one system first is an efficient method.",
        ],
        [
          "full",
          "[[0|The friction on the block is 9.8 N.]] [[1|Driving force 19.6 N minus friction 9.8 N leaves 9.8 N for 6.0 kg, so a = 1.63 m/s².]] [[2|Using the block: T − 9.8 = 4.0(1.63), so T = 16.3 N.]] [[3|An ideal pulley only changes direction, so the tension is the same on both ends.]]",
          "All four marks, and the check with the block's equation matches.",
        ],
        [
          "partial",
          "[[0|Friction is 9.8 N.]] [[1|a = 1.63 m/s².]] The tension is 19.6 N, the weight of the hanging mass.",
          "If T equaled the hanging mass's weight, the mass would not accelerate. T is less: 19.6 − 3.3 = 16.3 N.",
        ],
        [
          "partial",
          "[[2|T = 16.3 N]] [[3|because the pulley is frictionless]].",
          "Good. Show the friction and the acceleration calculation that produce the tension.",
          true,
        ],
        [
          "weak",
          "a = 9.8 m/s² because the hanging mass is in free fall, and T = 0.",
          "The hanging mass is attached to a block, so it is not in free fall. The string is taut and the acceleration is much smaller.",
        ],
        [
          "weak",
          "[[3|The tension is the same everywhere in the string.]] a = 19.6/2.0 = 9.8 m/s² because the force is the weight of the hanging mass.",
          "The block and the friction also affect the acceleration. Use the net force and the total mass of the system.",
        ],
      ],
    },
  ],
  practical: {
    title: "Measuring static friction by the tilt method",
    instructions:
      "Place a wooden block on a ramp covered with different surfaces (bare wood, felt, sandpaper, rubber). Raise the ramp slowly until the block just begins to slide, and record the angle. Repeat three times for each surface, use tan θ = μs to find the coefficient of static friction, and compare the surfaces.",
    steps: [
      ["Measure the mass of the block and attach each surface material to the ramp in turn."],
      ["Place the block at the lower end of the ramp and raise the end slowly by hand."],
      ["Stop at the instant the block begins to slide and read the angle with the protractor.", "Hold the ramp steady so the block does not slide off the table."],
      ["Repeat three times for each surface and calculate the mean angle."],
      ["Calculate μs = tan θ for each surface."],
      ["Compare the surfaces, and test your result by adding a 200 g mass to the block and repeating one measurement."],
    ],
    rubric: [
      ["Method: controlled, repeated measurements on each surface", 4],
      ["Calculation: correct μs from the mean angle with a comparison", 4],
      ["Evaluation: mass test, uncertainty and sources of error", 4],
    ],
    writeUps: [
      [
        "full",
        "The mean angles were 24 degrees on bare wood, 31 on felt, 38 on sandpaper and 45 on rubber. Taking the tangent gives coefficients of 0.45, 0.60, 0.78 and 1.0. The three trials on each surface agreed within about 2 degrees, an uncertainty of about 0.05 in the coefficient. When I added 200 g to the block on wood it still slid at 24 degrees, which confirms that the angle does not depend on mass because the mass cancels from the equation.",
        [4, 4, 4],
        "An excellent report: controlled trials, correct tangents, and a direct test of the mass-independence prediction.",
      ],
      [
        "full",
        "Wood: 23°, 24°, 25° gives a mean of 24°, so μs = tan 24° = 0.45. Felt: 31°, 30°, 32° gives a mean of 31°, so μs = 0.60. Sandpaper averaged 38° (μs = 0.78) and rubber averaged 45° (μs = 1.0). Rougher surfaces have larger coefficients. Sources of error: raising the ramp too fast makes the block slide at a larger angle, and reading the protractor by eye. We did not test a different mass, so we cannot show that mass has no effect.",
        [4, 4, 3],
        "Very good. The mass test is the one thing that would make the evaluation complete.",
      ],
      [
        "partial",
        "We raised the ramp until the block slid. On wood the angle was 24 degrees, and on felt it was 31 degrees. The coefficient of friction is the tangent of the angle, so the wood is 0.45 and the felt is 0.60. We did not have time to test the sandpaper and the rubber so I do not have those results to compare.",
        [3, 2, 1],
        "You need all four surfaces for a comparison, three trials for each, and an evaluation of errors.",
      ],
      [
        "partial",
        "The angles were 24, 31, 38 and 45 degrees for wood, felt, sandpaper and rubber. I think the coefficient is the sine of the angle, so wood is 0.41, felt is 0.52, sandpaper is 0.62 and rubber is 0.71. Rubber has the most friction. We did three trials for each and the results were close.",
        [3, 1, 2],
        "At the point of sliding, mg sin θ = μs mg cos θ, so μs = tan θ, not sin θ. Recalculate with the tangent.",
      ],
      [
        "weak",
        "We tilted the ramp and the block slid down. The heavier block would slide at a smaller angle because it weighs more. The rubber was the best surface because it was black. I did not write down the angles but they were all around 30 degrees or so.",
        [1, 0, 0],
        "Record each angle. The angle of repose does not depend on mass, and the surfaces differ by their roughness, not color.",
      ],
      [
        "weak",
        "The coefficient of friction was 24 for wood because that was the angle. The felt was 31 and the others were bigger. A coefficient is just the number you read off the protractor when the block starts to move. We could not repeat it because the block kept falling off the ramp.",
        [1, 1, 0],
        "The coefficient is the tangent of the angle and has no units. Use tan 24 degrees to get about 0.45.",
      ],
    ],
  },
};

const w6: WeekInput = {
  topic: "Gravitation, orbits and circular motion",
  note: `
## Objectives

Students will be able to:

1. use the law of gravitation to describe forces between objects, test it with the Moon's orbit, and explain weight;
2. describe uniform circular motion and identify the centripetal force in a given situation, including a maximum speed on a curve.

## Materials

Orbital data table, calculators, a string and stopper demo, the worksheet.

## Starter (6 minutes)

Pose Newton's Moon test: "The Moon is about 60 times farther from Earth's center than we are. If gravity follows an inverse square law, what should the Moon's acceleration be?" Predict 9.8/3600 and compare with the Moon's measured circular acceleration.

## Main activity

1. Work the Moon test: orbit radius 3.84 x 10^8 m, period 27.3 days (2.36 x 10^6 s). Speed = 2 pi r / T = 1.02 x 10^3 m/s, and a = v squared / r = 2.7 x 10^-3 m/s2, which matches 9.8/3600 = 2.72 x 10^-3.
2. Gravitational field strength at a distance: at twice the radius the field is one quarter, 2.45 N/kg.
3. Maximum speed on a flat curve: v = sqrt(mu g r). With mu = 0.60 and r = 50 m, v = 17.1 m/s.

## Checking for understanding

Ask: "Does an astronaut in orbit feel weightless because gravity is zero?" Look for the free-fall explanation.

## Worksheet

Orbit calculation, field strength at height and curve speed.
`,
  reading: [
    "Newton's Moon test, and what holds a car on a curve",
    `
Newton's boldest idea was that the force that pulls an apple to the ground is the same one that holds the Moon in its orbit. To test it, he asked what the Moon's acceleration should be. The Moon is about 60 times farther from Earth's center than the apple is. If gravity follows an inverse square law, the acceleration at the Moon should be 9.8 divided by 60 squared, which is 9.8/3600 = 2.72 x 10^-3 m/s2. Now measure the Moon's actual acceleration from its motion. It travels around a circle of radius 3.84 x 10^8 m in 27.3 days, or 2.36 x 10^6 s. Its speed is 2 pi r / T = 2 x 3.14 x 3.84 x 10^8 / 2.36 x 10^6, about 1.02 x 10^3 m/s. The centripetal acceleration is v squared / r = (1.02 x 10^3) squared divided by 3.84 x 10^8, which is 2.7 x 10^-3 m/s2. The two agree. The same law governs falling apples and orbiting moons.

The law of gravitation, F = G m1 m2 / r squared, also gives the field strength g at a distance r from the center of a planet of mass M: g = GM / r squared. At twice Earth's radius, g falls to one quarter of its surface value, 2.45 N/kg. An astronaut in the International Space Station, about 400 km up, is only about 6 percent farther from Earth's center than someone on the ground, so gravity there is still about 89 percent of its surface value. The astronaut feels weightless because they and the station are both in free fall, constantly accelerating toward Earth, and moving sideways so fast, about 7.7 km/s, that the surface curves away as quickly as they fall.

Uniform circular motion requires a net inward force F = m v squared / r. Where does it come from? For the Moon, gravity. For a car on a flat curve, it is the friction between the tires and the road. The maximum friction is μs times the normal force mg, so the greatest centripetal force is μs mg. Setting m v squared / r = μs m g gives v max = the square root of (μs g r). The mass cancels, so a heavy truck and a light car have the same limit on the same road. With μs = 0.60 and r = 50 m, v max = the square root of (0.60 x 9.8 x 50), which is 17.1 m/s, about 38 miles per hour. On wet pavement, μs is closer to 0.30 and the limit drops to 12 m/s.

If the car goes faster than this speed, friction cannot supply the force needed and the car moves in a straight line, tangent to the circle, as Newton's first law says.
`,
  ],
  cards: [
    ["Newton's Moon test", "Comparing the Moon's centripetal acceleration with g reduced by the inverse square law."],
    ["Field strength g", "The gravitational force per kilogram at a point, GM / r^2."],
    ["Free fall in orbit", "Astronauts feel weightless because they and the spacecraft fall together."],
    ["Centripetal force", "The net inward force needed for circular motion, m v^2 / r."],
    ["Maximum speed on a flat curve", "v = sqrt(mu g r), independent of the mass."],
    ["Orbital speed", "The speed needed to move in a circle around a planet, v = sqrt(GM / r)."],
    ["Period", "The time for one complete orbit or revolution."],
    ["Inverse square law", "A force that falls by a factor of four when the distance doubles."],
  ],
  closed: [
    [
      "At twice the Earth's radius from its center, the gravitational field strength is:",
      ["9.8 N/kg", "4.9 N/kg", "2.45 N/kg", "19.6 N/kg"],
      "C",
    ],
    [
      "On a flat curve of radius 50 m with mu = 0.60, the maximum speed is about:",
      ["8.6 m/s", "12 m/s", "17 m/s", "29 m/s"],
      "C",
    ],
    [
      "Why do astronauts in the ISS feel weightless?",
      [
        "There is no gravity at that height",
        "They are in free fall around the Earth with the station",
        "The Earth's gravity is reversed",
        "The station is too small to feel gravity",
      ],
      "B",
    ],
    [
      "The Moon's centripetal acceleration is about 2.7 x 10^-3 m/s2. Compared with g on Earth, this is about:",
      ["1/60 of g", "1/3600 of g", "1/6 of g", "The same as g"],
      "B",
    ],
    [
      "A heavy truck and a light car take the same flat curve. Which statement about the maximum speed is correct?",
      ["The truck's is higher", "The car's is higher", "They are the same", "The truck cannot turn"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "The Moon orbits at r = 3.84 x 10^8 m with a period of 2.36 x 10^6 s. Calculate its orbital speed and centripetal acceleration, and compare the acceleration with g/3600 to explain what this shows about gravity.",
      scheme: [
        "Calculates the speed as 2 pi r / T, about 1.02 x 10^3 m/s",
        "Calculates the acceleration as v squared / r, about 2.7 x 10^-3 m/s2",
        "States that this matches 9.8/3600, which is 2.72 x 10^-3 m/s2",
        "Concludes that gravity follows an inverse square law and is the force that keeps the Moon in orbit",
      ],
      model:
        "The speed is 2 pi r / T = 2 pi (3.84 x 10^8) / 2.36 x 10^6, about 1.02 x 10^3 m/s. The acceleration is v squared / r = 2.7 x 10^-3 m/s2. This matches 9.8/3600 = 2.72 x 10^-3 m/s2, because the Moon is about 60 times farther than the surface. So gravity follows an inverse square law, and the same force that makes things fall keeps the Moon in orbit.",
      answers: [
        [
          "full",
          "[[0|v = 2πr/T ≈ 1.02 × 10³ m/s.]] [[1|a = v²/r ≈ 2.7 × 10⁻³ m/s².]] [[2|9.8/3600 = 2.72 × 10⁻³ m/s², which is the same.]] [[3|That shows gravity gets weaker as 1/r² and the Earth's gravity is what holds the Moon in orbit.]]",
          "Full marks. This is exactly the reasoning of Newton's test.",
        ],
        [
          "full",
          "[[0|Speed = circumference/period ≈ 1020 m/s.]] [[1|Centripetal acceleration = v²/r = 0.0027 m/s².]] [[2|The inverse-square prediction is g/60² = 0.00272 m/s², matching.]] [[3|So the force on the Moon is Earth's gravity, following an inverse square law.]]",
          "All four marks, with a clear match of numbers.",
        ],
        [
          "partial",
          "[[0|The speed is 1.02 × 10³ m/s.]] [[1|a = v²/r = 2.7 × 10⁻³.]] It's different from g so the gravity at the Moon must be a different force.",
          "The acceleration agrees with g/3600. That shows the same force, weakened by distance, acts on the Moon.",
        ],
        [
          "partial",
          "[[2|It matches 9.8/3600.]] [[3|So gravity follows an inverse square law.]]",
          "The conclusion is right. Show the calculations of speed and acceleration that gave the 2.7 x 10^-3.",
          true,
        ],
        [
          "weak",
          "v = r/T = 3.84 × 10⁸ / 2.36 × 10⁶ = 163 m/s, so a = 163/3.84 × 10⁸ which is tiny.",
          "In a circle the distance traveled in one period is the circumference, 2 pi r. Use that to find the speed.",
        ],
        [
          "weak",
          "[[0|The speed is 1.02 × 10³ m/s.]] The Moon has no acceleration since the speed is constant.",
          "The direction of the velocity changes, so there is an acceleration toward the center, v squared / r.",
        ],
      ],
    },
    {
      prompt:
        "A car takes a flat curve of radius 50 m. Derive an expression for the maximum speed in terms of the coefficient of static friction, calculate it for mu = 0.60 and for mu = 0.30 (wet road), and explain why the mass of the car does not matter.",
      scheme: [
        "States that friction supplies the centripetal force, m v squared / r = mu m g at the limit",
        "Derives v max = sqrt(mu g r)",
        "Calculates 17.1 m/s for mu = 0.60 and 12.1 m/s for mu = 0.30",
        "Explains that the mass cancels, because both the required force and the available friction are proportional to it",
      ],
      model:
        "At the limit, friction supplies the centripetal force: m v squared / r = mu m g. So v max = the square root of (mu g r). With mu = 0.60, v max = 17.1 m/s. With mu = 0.30, v max = 12.1 m/s. The mass cancels because both the force needed and the friction available are proportional to the mass.",
      answers: [
        [
          "full",
          "[[0|Friction provides the centripetal force: mv²/r = μmg at the limit.]] [[1|So v = √(μgr).]] [[2|μ = 0.60 gives 17.1 m/s and μ = 0.30 gives 12.1 m/s.]] [[3|The mass cancels because both the force needed and the friction are proportional to mass.]]",
          "Full marks. The wet-road value shows why speed advisories drop in the rain.",
        ],
        [
          "full",
          "[[0|At the maximum speed, the centripetal force equals the maximum static friction μmg.]] [[1|Solving gives v_max = √(μgr).]] [[2|Dry road: √(0.60 × 9.8 × 50) = 17.1 m/s. Wet: √(0.30 × 9.8 × 50) = 12.1 m/s.]] [[3|The m on each side cancels, so a truck and a car have the same limit.]]",
          "All four marks, with a clear derivation.",
        ],
        [
          "partial",
          "[[0|Friction is the centripetal force.]] [[2|17.1 m/s for the dry road and 12.1 m/s for the wet road.]] The mass matters because a heavier car is harder to turn.",
          "A heavier car needs more force to turn, but it also has more friction available. The two cancel, so the limit is the same.",
        ],
        [
          "partial",
          "[[1|v = √(μgr)]] and [[3|the mass cancels]].",
          "Right. Explain where the formula comes from and calculate the speeds for the two road surfaces.",
          true,
        ],
        [
          "weak",
          "v = μgr = 0.60 × 9.8 × 50 = 294 m/s because the speed depends on the friction, gravity and radius.",
          "The formula has a square root: v squared / r = mu g. Taking the square root gives 17.1 m/s.",
        ],
        [
          "weak",
          "[[0|Friction provides the centripetal force.]] An outward centrifugal force pushes the car off the road if the speed is too high.",
          "No outward force acts on the car. If the friction is too small, the car moves in a straight line, as the first law predicts.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Conservation of momentum in one dimension, and the ballistic pendulum",
  note: `
## Objectives

Students will be able to:

1. use conservation of momentum and energy to predict the outcome of elastic, inelastic and explosive interactions;
2. design a device that reduces the force on an object during a collision, and test it.

## Materials

Air track or dynamics carts, motion sensors, putty and foam, eggs or masses, cardboard and straws, the practical sheet is not used this week (see Week 8), the worksheet.

## Starter (6 minutes)

Pose: "A 2.0 kg cart at 4.0 m/s hits a 1.0 kg cart at rest. Predict the speeds after the collision if they bounce perfectly." Record the guesses and revisit them.

## Main activity

1. Elastic collision: conserve both momentum and kinetic energy. Final speeds are 1.33 m/s and 5.33 m/s. Check the kinetic energy: 16 J before and 16 J after.
2. Inelastic collision: a ballistic pendulum with a 0.010 kg bullet and a 1.99 kg block. The block rises 0.20 m, so the speed just after impact is 1.98 m/s and the bullet's speed is about 400 m/s. Show that most of the kinetic energy is lost in the collision.
3. Recoil: a 60 kg skater pushes a 40 kg skater and they move apart with equal and opposite momenta.

## Checking for understanding

Ask: "Which quantities are conserved in each of the three types of collision?"

## Worksheet

An elastic collision, a ballistic pendulum problem and a recoil problem.
`,
  reading: [
    "Collisions: what is conserved and what is lost",
    `
In any collision where outside forces are negligible, momentum is conserved. But the kinetic energy depends on the kind of collision. In an **elastic collision**, both are conserved, for example between two steel balls or between air-track carts with springs. In a perfectly **inelastic collision**, the objects stick together. Momentum is conserved but kinetic energy is not.

Take a 2.0 kg cart at 4.0 m/s hitting a 1.0 kg cart at rest elastically. Momentum: 2.0 x 4.0 = 2.0 v1 + 1.0 v2. Energy: 1/2 (2.0)(16) = 1/2 (2.0) v1 squared + 1/2 (1.0) v2 squared. Solving the two equations gives v1 = 1.33 m/s and v2 = 5.33 m/s, both forward. The general results are v1 = ((m1 - m2) / (m1 + m2)) u and v2 = (2 m1 / (m1 + m2)) u. Check the kinetic energy afterward: 1/2 (2.0)(1.78) + 1/2 (1.0)(28.4) = 1.78 + 14.2 = 16 J. It is conserved. The lighter cart ends up faster than the incoming one, and the heavier one slows down but continues forward.

A **ballistic pendulum** measures a bullet's speed without a stopwatch. A bullet of 0.010 kg embeds in a 1.99 kg block hanging on strings, and the block-plus-bullet swings up 0.20 m. The collision itself is inelastic, so use momentum for it: 0.010 v = 2.00 V, where V is the speed just after the collision. The swing is a conservation of energy problem: 1/2 (2.00) V squared = 2.00 (9.8)(0.20), so V = the square root of (2 x 9.8 x 0.20), which is 1.98 m/s. Then v = 2.00 x 1.98/0.010 = 396 m/s, about 400 m/s. Notice that at the start, the bullet's kinetic energy was 1/2 (0.010)(396 squared), which is 784 J, but the block and bullet only have 1/2 (2.00)(1.98 squared), or 3.9 J after the collision. More than 99 percent of the energy turned into heat and deformation. If you tried to use energy conservation across the whole process, you would get the wrong answer.

Momentum also explains **recoil**. A 60 kg skater pushes a 40 kg skater, starting from rest. The total momentum remains zero, so the skaters move apart with equal and opposite momenta: if the 40 kg skater moves at 3.0 m/s, the 60 kg skater moves back at 2.0 m/s. The kinetic energy comes from the chemical energy in the skaters' muscles.
`,
  ],
  cards: [
    ["Elastic collision", "A collision in which both momentum and kinetic energy are conserved."],
    ["Inelastic collision", "A collision in which kinetic energy is not conserved."],
    ["Ballistic pendulum", "A device that finds a projectile's speed from how high a block swings after capturing it."],
    ["Recoil", "Objects pushing apart from rest with equal and opposite momenta."],
    ["Energy lost in a collision", "Becomes heat, sound and deformation."],
    ["1D elastic result", "v1 = ((m1 - m2) / (m1 + m2)) u for a target at rest."],
    ["Closed system", "A system with no net external force, so momentum is conserved."],
    ["Two-stage problem", "Use momentum for the collision, then energy for the swing."],
  ],
  closed: [
    [
      "A 2.0 kg cart at 4.0 m/s collides elastically with a 1.0 kg cart at rest. The final speed of the 1.0 kg cart is:",
      ["2.67 m/s", "4.0 m/s", "5.33 m/s", "8.0 m/s"],
      "C",
    ],
    [
      "A ballistic pendulum block (total 2.00 kg) rises 0.20 m. What is its speed just after impact?",
      ["0.20 m/s", "1.0 m/s", "1.98 m/s", "3.96 m/s"],
      "C",
    ],
    [
      "In the ballistic pendulum, which principle applies during the collision itself?",
      ["Conservation of kinetic energy", "Conservation of momentum", "Conservation of potential energy", "None"],
      "B",
    ],
    [
      "A 60 kg skater and a 40 kg skater push apart from rest. If the 40 kg skater moves at 3.0 m/s, the 60 kg skater moves at:",
      ["1.0 m/s", "2.0 m/s", "3.0 m/s", "4.5 m/s"],
      "B",
    ],
    [
      "In a perfectly inelastic collision, what is true?",
      ["Kinetic energy is conserved", "Momentum is not conserved", "The objects stick together and kinetic energy decreases", "The objects bounce apart"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A 0.010 kg bullet embeds in a 1.99 kg block that hangs from strings. The block and bullet rise 0.20 m. Find the speed of the bullet and the fraction of the bullet's kinetic energy that is lost in the collision.",
      scheme: [
        "Uses energy conservation for the swing to find the speed just after impact, 1.98 m/s",
        "Uses conservation of momentum in the collision to find the bullet speed, about 396 m/s",
        "Calculates the bullet's initial kinetic energy as about 784 J and the final as about 3.9 J",
        "Concludes that more than 99 percent of the energy is lost in the collision",
      ],
      model:
        "For the swing, 1/2 V squared = g h, so V = 1.98 m/s. In the collision, 0.010 v = 2.00 times 1.98, so v = 396 m/s. The bullet's initial kinetic energy is 1/2 times 0.010 times 396 squared, about 784 J. After the collision, the block and bullet have 1/2 times 2.00 times 1.98 squared, about 3.9 J. More than 99 percent of the energy is lost to heat and deformation.",
      answers: [
        [
          "full",
          "[[0|Swing: ½V² = gh gives V = √(2 × 9.8 × 0.20) = 1.98 m/s.]] [[1|Collision: 0.010v = 2.00(1.98) so v = 396 m/s.]] [[2|KE before = ½(0.010)(396²) ≈ 784 J and after = ½(2.00)(1.98²) ≈ 3.9 J.]] [[3|So over 99% of the energy is lost as heat and deformation.]]",
          "Full marks. The two-stage split, momentum then energy, is the whole trick.",
        ],
        [
          "full",
          "[[0|The speed just after impact comes from energy: V = 1.98 m/s.]] [[1|Momentum is conserved in the collision, so the bullet's speed is 2.00 × 1.98/0.010 = 396 m/s.]] [[2|Initial KE is about 784 J and final KE is about 3.9 J.]] [[3|About 99.5% of the kinetic energy is lost in the collision.]]",
          "All four marks, with a good reason for each principle.",
        ],
        [
          "partial",
          "[[0|V = 1.98 m/s.]] Using energy conservation again, the bullet's KE = 3.9 J, so v = √(2 × 3.9/0.010) = 28 m/s.",
          "Kinetic energy is not conserved in the collision, so you cannot use it there. Use momentum to find the bullet's speed.",
        ],
        [
          "partial",
          "[[1|The bullet's speed is 396 m/s]] and [[3|most of the energy is lost]].",
          "Right. Show the swing calculation and the two kinetic energies that support your conclusion.",
          true,
        ],
        [
          "weak",
          "The bullet's kinetic energy turns into the block's potential energy, so ½(0.010)v² = 2.00(9.8)(0.20) and v = 28 m/s.",
          "Energy is lost in the collision, so that equation is wrong. Use momentum for the collision and energy for the swing.",
        ],
        [
          "weak",
          "[[1|Momentum is conserved so v = 396 m/s.]] No energy is lost because energy is always conserved.",
          "Total energy is conserved, but kinetic energy turns into heat and deformation. Compare 784 J with 3.9 J.",
        ],
      ],
    },
    {
      prompt:
        "A 2.0 kg cart moving at 4.0 m/s makes a perfectly elastic head-on collision with a 1.0 kg cart at rest. Find the final velocities, and verify that momentum and kinetic energy are both conserved.",
      scheme: [
        "Finds the final velocity of the 2.0 kg cart as 1.33 m/s",
        "Finds the final velocity of the 1.0 kg cart as 5.33 m/s",
        "Verifies that the momentum before and after is 8.0 kg m/s",
        "Verifies that the kinetic energy before and after is 16 J",
      ],
      model:
        "Using the elastic collision results, v1 = (1/3)(4.0) = 1.33 m/s and v2 = (4/3)(4.0) = 5.33 m/s. The momentum after is 2.0 times 1.33 + 1.0 times 5.33 = 8.0 kg m/s, equal to the 8.0 before. The kinetic energy after is 1.78 + 14.2 = 16 J, equal to the 16 J before.",
      answers: [
        [
          "full",
          "[[0|v1 = (2−1)/(2+1) × 4.0 = 1.33 m/s.]] [[1|v2 = 2(2)/(3) × 4.0 = 5.33 m/s.]] [[2|Momentum before 2.0 × 4.0 = 8.0, and after 2.67 + 5.33 = 8.0.]] [[3|KE before = 16 J and after = 1.78 + 14.2 = 16 J.]]",
          "Full marks. Both conservation laws are verified numerically.",
        ],
        [
          "full",
          "[[0|The heavy cart continues forward at 1.33 m/s.]] [[1|The light cart is knocked forward at 5.33 m/s.]] [[2|Total momentum is 8.0 kg·m/s before and after.]] [[3|Total KE is 16 J before and after, so it's elastic.]]",
          "All four marks, and a clear description of the final motion.",
        ],
        [
          "partial",
          "[[0|v1 = 1.33 m/s.]] [[2|Momentum is conserved at 8.0.]] The second cart moves at 4.0 m/s, the same as the first one started.",
          "The lighter cart gets more speed than the incoming cart: 5.33 m/s. That is needed to conserve both momentum and kinetic energy.",
        ],
        [
          "partial",
          "[[1|The second cart moves at 5.33 m/s.]] [[3|The KE is 16 J before and after.]]",
          "Good. Also give the final speed of the first cart and check the momentum.",
          true,
        ],
        [
          "weak",
          "Both carts end up at 2.67 m/s because the momentum is shared equally.",
          "That would be the result if they stuck together, a perfectly inelastic collision. In an elastic collision they separate.",
        ],
        [
          "weak",
          "[[2|Momentum is conserved.]] The first cart stops and the second cart moves at 8.0 m/s.",
          "That conserves momentum but not kinetic energy: the second cart would have 32 J. An elastic collision must conserve both.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Impulse with changing forces, and conservation of mechanical energy",
  note: `
## Objectives

Students will be able to:

1. relate impulse to change in momentum, including from force-time graphs, and apply it to a car crash or a ball hit by a bat;
2. use a model to calculate how kinetic and potential energy trade off and how work by friction removes mechanical energy.

## Materials

Force-time graph printouts, a roller-coaster loop model, marbles, rulers, calculators, the quiz.

## Starter (6 minutes)

Show a force-time graph of a bat hitting a ball that rises from zero to 600 N and falls back to zero over 0.020 s. Ask: "How could you find the impulse from this graph?" Link to area.

## Main activity

1. Impulse is the area under the force-time graph. For a triangle, 1/2 x 600 N x 0.020 s = 6.0 N s, which for a 0.40 kg ball gives a velocity change of 15 m/s.
2. Energy and loops: for a car on a frictionless loop of radius R, the minimum speed at the top is the square root of gR, so the release height is at least 2.5R. For R = 5.0 m, h = 12.5 m and the top speed is 7.0 m/s.
3. Work by friction: a 1000 kg car moving at 20 m/s is stopped by a constant friction force of 8000 N. The distance is 25 m, found from the loss of 200,000 J of kinetic energy.

## Checking for understanding

Ask: "Why must the speed at the top of a loop be at least sqrt(gR)?" Look for gravity alone supplying the centripetal force.

## Quiz

Five questions on impulse and energy.
`,
  reading: [
    "Impulse from graphs, and energy through loops and skids",
    `
In a real collision the force is not constant. It rises as the objects deform, peaks, and falls back to zero. The impulse is the area under the force-time graph, because it adds up F times a small slice of time. A bat's force on a ball might rise to 600 N over 0.010 s and fall back to zero over the next 0.010 s. The graph is a triangle of base 0.020 s and height 600 N, so the area is 1/2 x 600 x 0.020, which is 6.0 N s. For a ball of mass 0.40 kg, the change in velocity is 6.0/0.40 = 15 m/s. The average force is the impulse divided by the contact time, 6.0/0.020 = 300 N, half the peak force.

The same idea explains why a helmet or an air bag helps. The impulse needed to stop the head is fixed by its mass and speed. The cushioning spreads the same area over a longer base, so the peak force is lower.

Energy gives a second way to analyze motion. In a frictionless system the sum of kinetic and potential energy is constant. Consider a roller-coaster car that enters a vertical loop of radius R. At the top of the loop, the car is upside down and the net force toward the center is the weight plus the normal force from the track. The minimum speed to stay on the track is when the normal force is zero and gravity alone provides the centripetal force: mg = m v squared / R, so v = the square root of gR. For R = 5.0 m, that is 7.0 m/s. Now find the release height h above the bottom of the loop. At the top of the loop the car is at a height 2R, so conservation of energy gives mgh = mg(2R) + 1/2 m v squared = mg(2R) + 1/2 m gR. Then h = 2R + R/2 = 2.5R, which is 12.5 m. If the car starts any lower, it leaves the track near the top.

When friction acts, mechanical energy is not conserved, and the work done by friction equals the energy removed. A 1000 kg car moving at 20 m/s has a kinetic energy of 200,000 J. A constant friction force of 8000 N does work equal to force times distance, so 8000 d = 200,000 and d = 25 m. This is the work-energy theorem: the net work done on an object equals the change in its kinetic energy. The energy has been turned into heat in the tires and the road.
`,
  ],
  cards: [
    ["Impulse from a graph", "The area under a force-time graph."],
    ["Average force", "Impulse divided by the contact time."],
    ["Minimum speed at the top of a loop", "v = sqrt(gR), when gravity alone supplies the centripetal force."],
    ["Release height for a loop", "At least 2.5 R above the bottom, with no friction."],
    ["Work", "Force times distance in the direction of the force, in joules."],
    ["Work-energy theorem", "The net work on an object equals its change in kinetic energy."],
    ["Peak force", "The largest force during a collision, higher than the average."],
    ["Conservation of mechanical energy", "KE + PE stays constant when only conservative forces act."],
  ],
  closed: [
    [
      "A force rises from 0 to 600 N and back to 0 over 0.020 s. What is the impulse?",
      ["6.0 N s", "12 N s", "300 N s", "12,000 N s"],
      "A",
    ],
    [
      "What is the minimum speed at the top of a vertical loop of radius 5.0 m?",
      ["3.5 m/s", "5.0 m/s", "7.0 m/s", "9.8 m/s"],
      "C",
    ],
    [
      "A frictionless loop has radius 5.0 m. The minimum release height is:",
      ["5.0 m", "10 m", "12.5 m", "25 m"],
      "C",
    ],
    [
      "A 1000 kg car at 20 m/s is stopped by an 8000 N friction force. How far does it go?",
      ["12.5 m", "25 m", "50 m", "100 m"],
      "B",
    ],
    [
      "The average force in the triangular force-time graph described above (peak 600 N) is:",
      ["150 N", "300 N", "600 N", "1200 N"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A bat exerts a force on a 0.40 kg ball that rises linearly from 0 to 600 N in 0.010 s and falls linearly to 0 in the next 0.010 s. Find the impulse, the average force, and the change in the ball's velocity.",
      scheme: [
        "Finds the impulse as the area of the triangle, 6.0 N s",
        "Finds the average force as 6.0 / 0.020 = 300 N",
        "Finds the change in velocity as 6.0 / 0.40 = 15 m/s",
        "Explains that the average force is half the peak force because the graph is triangular",
      ],
      model:
        "The impulse is the area of the triangle: 1/2 x 600 N x 0.020 s = 6.0 N s. The average force is 6.0/0.020 = 300 N. The change in velocity is impulse divided by mass, 6.0/0.40 = 15 m/s. The average force is half the peak because the force graph is triangular.",
      answers: [
        [
          "full",
          "[[0|Impulse is the area under the graph, ½ × 0.020 × 600 = 6.0 N·s.]] [[1|Average force = 6.0/0.020 = 300 N.]] [[2|Δv = J/m = 6.0/0.40 = 15 m/s.]] [[3|The average is half the peak since the graph is a triangle.]]",
          "Full marks. You tied the shape of the graph to the average.",
        ],
        [
          "full",
          "[[0|The area of the triangle gives the impulse: 6.0 N·s.]] [[1|The average force over the 0.020 s is 300 N.]] [[2|The velocity change is 15 m/s.]] [[3|A triangular pulse has an average of half its peak.]]",
          "All four marks, concise and correct.",
        ],
        [
          "partial",
          "[[0|The impulse is 6.0 N·s]] and [[2|the velocity change is 15 m/s]]. The average force is 600 N, the peak.",
          "The peak is the highest force. The average is the impulse divided by the contact time, 300 N.",
        ],
        [
          "partial",
          "[[1|The average force is 300 N]] [[3|because the graph is a triangle]].",
          "Good. Calculate the impulse as an area and use it to find the velocity change.",
          true,
        ],
        [
          "weak",
          "Impulse is 600 × 0.020 = 12 N·s, because impulse is force times time.",
          "The force is not constant at 600 N. It rises and falls, so use the area of the triangle, which is half of that.",
        ],
        [
          "weak",
          "[[0|The area of the triangle is 6.0 N·s.]] The velocity change is 6.0 × 0.40 = 2.4 m/s.",
          "The change in velocity is the impulse divided by the mass: 6.0 / 0.40 = 15 m/s.",
        ],
      ],
    },
    {
      prompt:
        "A roller-coaster car enters a vertical loop of radius 5.0 m. Find the minimum speed at the top, and the minimum release height above the bottom of the loop if friction is negligible. Explain how you know the car stays on the track at that speed.",
      scheme: [
        "Sets mg = m v squared / R at the top, with no normal force",
        "Finds the minimum speed at the top as 7.0 m/s",
        "Uses conservation of energy to find the release height of 12.5 m (2.5 R)",
        "Explains that at this speed gravity alone supplies the centripetal force, so the normal force is zero at the limit, and any lower speed would cause the car to leave the track",
      ],
      model:
        "At the top, in the limiting case, the normal force is zero and gravity alone supplies the centripetal force: mg = m v squared / R, so v = the square root of gR = 7.0 m/s. By conservation of energy, mgh = mg(2R) + 1/2 m v squared, so h = 2R + R/2 = 2.5R = 12.5 m. At this speed, gravity alone supplies the centripetal force; any slower and the car would leave the track.",
      answers: [
        [
          "full",
          "[[0|At the top the limit is when the normal force is zero, so mg = mv²/R.]] [[1|That gives v = √(gR) = 7.0 m/s.]] [[2|Energy: mgh = mg(2R) + ½mv², so h = 2.5R = 12.5 m.]] [[3|At that speed gravity alone gives the centripetal force. Any slower and the car would fall off the track.]]",
          "Full marks. The reasoning about the normal force going to zero is the key.",
        ],
        [
          "full",
          "[[0|The track can only push, so the minimum speed is when the track force is zero and weight alone is the centripetal force.]] [[1|v_min = √(9.8 × 5.0) = 7.0 m/s.]] [[2|Conservation of energy gives h = 2R + v²/2g = 10 + 2.5 = 12.5 m.]] [[3|If the speed were any lower, gravity would pull the car away from the track before the top.]]",
          "All four marks, with a good alternative form of the height.",
        ],
        [
          "partial",
          "[[0|mg = mv²/R at the top.]] [[1|v = 7.0 m/s.]] The release height is the same as the loop's top, 10 m.",
          "The car also needs kinetic energy at the top (1/2 v squared = 24.5 J/kg), so the height must be 12.5 m.",
        ],
        [
          "partial",
          "[[2|The release height is 12.5 m]] and [[3|any lower and it falls off]].",
          "Right. Show how you found the minimum speed at the top, since the height depends on it.",
          true,
        ],
        [
          "weak",
          "The car needs to start at 10 m because the top of the loop is 10 m high, and then the speed is 0 at the top.",
          "A car with zero speed at the top would fall off. It needs speed of at least 7.0 m/s there, which requires 12.5 m.",
        ],
        [
          "weak",
          "[[1|The minimum speed is 7.0 m/s.]] The car stays on the track because centrifugal force pushes it outward against the track.",
          "No outward force is needed. The track must push inward, and at the minimum speed that push is zero while gravity supplies the centripetal force.",
        ],
      ],
    },
  ],
};

writeCourse("honors-physics-grade-11.json", "Honors Physics", "Grade 11", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
