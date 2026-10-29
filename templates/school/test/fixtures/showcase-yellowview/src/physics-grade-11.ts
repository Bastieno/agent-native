import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Physics, Grade 11, Quarter 1. Standards: Next Generation Science
 * Standards, HS-PS2 (forces and interactions), in the school's own words.
 * g is taken as 9.8 m/s^2 throughout.
 */

const w1: WeekInput = {
  topic: "Measurement, graphs and describing motion",
  note: `
## Objectives

Students will be able to:

1. design an investigation, collect data with uncertainty and graph it with a line of best fit;
2. communicate the results of a motion investigation in a short lab report;
3. distinguish distance from displacement and speed from velocity, and calculate each.

## Materials

Meter sticks, stopwatches, masking tape, graph paper, a toy car or battery cart, the practical sheet.

## Starter (7 minutes)

Ask a student to walk 4 floor tiles east and then 3 tiles back west. Ask: "How far did they walk? How far from where they started are they?" Put the two answers on the board and name them distance and displacement.

## Main activity

1. Define distance (a scalar, total path length) and displacement (a vector, straight-line change in position with direction). Work the Columbus bus example: a bus goes 12 km north and then 5 km south in half an hour. The distance is 17 km, the displacement is 7 km north, the average speed is 34 km/h and the average velocity is 14 km/h north.
2. Practical: in pairs, time a battery-powered car over 0.5, 1.0, 1.5, 2.0 and 2.5 m, three trials each, and record the spread of the times as the uncertainty.
3. Plot position against time, draw a line of best fit and find the slope as the velocity.

## Checking for understanding

Whiteboards: a runner completes one 400 m lap in 80 s. State the average speed and the average velocity.

## Collect

The graph and a four-sentence conclusion.
`,
  reading: [
    "Describing motion with numbers and graphs",
    `
Physics begins with measurement. Any measurement has a number, a unit and an uncertainty. If three students time the same cart over a meter and get 2.1 s, 2.3 s and 2.2 s, the best estimate of the time is the mean, 2.2 s, and the spread of the readings suggests an uncertainty of about 0.1 s. A good result is written 2.2 plus or minus 0.1 s.

Graphs reveal patterns that a table hides. When you plot position on the vertical axis against time on the horizontal axis, you draw a **line of best fit**, a smooth line that passes as close as possible to all the points and does not need to touch any of them. About half the points lie above it and half below. The **slope** of the line, the rise divided by the run, is the change in position per unit time, which is the velocity. A steeper line is a faster object. A horizontal line is an object at rest.

Be careful with the words. **Distance** is the total length of the path traveled and has no direction, so it is a scalar. **Displacement** is the straight-line change in position from start to finish, and it has a direction, so it is a vector. Suppose a bus travels 12 km north and then 5 km south. The distance is 17 km, but the displacement is only 7 km north. Likewise, **speed** is distance divided by time, and **velocity** is displacement divided by time. If the bus takes half an hour, its average speed is 17 km divided by 0.5 h, or 34 km/h. Its average velocity is 7 km north divided by 0.5 h, which is 14 km/h north. On a 400 m track, a runner who finishes one lap has run 400 m but has zero displacement, so the average velocity for the lap is zero even though the average speed is not.

When you report an investigation, write the lab report in order: the question, the method, the data table and graph, the analysis, and a conclusion. The conclusion should answer the question using numbers from the data, and should say how confident you are in the result given the uncertainty. A conclusion that says only "the graph shows the car moves" tells the reader nothing.
`,
  ],
  cards: [
    ["Distance", "The total length of the path traveled; a scalar."],
    ["Displacement", "The straight-line change in position, with direction; a vector."],
    ["Speed", "Distance divided by time."],
    ["Velocity", "Displacement divided by time, with direction."],
    ["Line of best fit", "A smooth line drawn to pass as close as possible to all the data points."],
    ["Slope", "Rise divided by run; on a position-time graph it equals the velocity."],
    ["Uncertainty", "The range of doubt in a measurement, such as plus or minus 0.1 s."],
    ["Scalar", "A quantity with size only, such as distance or speed."],
  ],
  closed: [
    [
      "A bus goes 12 km north and then 5 km south. What is its displacement?",
      ["17 km north", "7 km north", "7 km south", "60 km north"],
      "B",
    ],
    [
      "A runner completes one 400 m lap in 80 s. What is the average velocity for the lap?",
      ["5 m/s", "0 m/s", "400 m/s", "80 m/s"],
      "B",
    ],
    [
      "On a position-time graph, what does the slope of the line represent?",
      ["Acceleration", "Velocity", "Distance", "Mass"],
      "B",
    ],
    [
      "Three timings of a cart are 2.1 s, 2.3 s and 2.2 s. What is the best estimate of the time?",
      ["2.1 s", "2.2 s", "2.3 s", "6.6 s"],
      "B",
    ],
    [
      "Which of these is a vector?",
      ["Distance", "Speed", "Displacement", "Time"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A bus leaves a COTA stop, travels 12 km north, then 5 km south, and the whole trip takes 0.50 h. Calculate the distance, the displacement, the average speed and the average velocity.",
      scheme: [
        "Gives the distance as 17 km",
        "Gives the displacement as 7 km north",
        "Gives the average speed as 34 km/h",
        "Gives the average velocity as 14 km/h north, with direction",
      ],
      model:
        "The distance is 12 + 5 = 17 km. The displacement is 12 - 5 = 7 km north. The average speed is 17 km / 0.50 h = 34 km/h. The average velocity is 7 km north / 0.50 h = 14 km/h north.",
      answers: [
        [
          "full",
          "[[0|Distance is 12 + 5 = 17 km.]] [[1|Displacement is 12 − 5 = 7 km north.]] [[2|Average speed = 17/0.50 = 34 km/h.]] [[3|Average velocity = 7/0.50 = 14 km/h north.]]",
          "Full marks. You kept direction with the vector quantities and left it off the scalars.",
        ],
        [
          "full",
          "[[0|It traveled 17 km in total.]] [[1|But it only ended up 7 km north of the start.]] [[2|Its speed is 34 km/h.]] [[3|Its velocity is 14 km/h in the north direction.]]",
          "All four marks, and the plain wording makes the difference between the pairs clear.",
        ],
        [
          "partial",
          "[[0|The distance is 17 km.]] [[2|Average speed is 34 km/h.]] The displacement is 17 km and the velocity is 34 km/h.",
          "Displacement is not total path. The bus came back 5 km, so it is 7 km north, and the velocity is 14 km/h north.",
        ],
        [
          "partial",
          "[[1|Displacement is 7 km north]] and [[3|velocity is 14 km/h north]].",
          "Your vector answers are right. The question also asks for the distance and the average speed.",
          true,
        ],
        [
          "weak",
          "12 − 5 = 7 km for everything, and the speed is 7 km/h.",
          "Distance adds up every leg, and speed is distance divided by time. Calculate each quantity separately.",
        ],
        [
          "weak",
          "[[0|The distance is 17 km.]] The displacement is 17 km north because the bus ends up north.",
          "The distance is right. Displacement subtracts the 5 km the bus came back, so it is 7 km north.",
        ],
      ],
    },
    {
      prompt:
        "A student's position-time graph for a toy car is a straight line through the points (0 s, 0.0 m) and (4.0 s, 1.6 m). Find the velocity, state what the graph tells you about the motion, and say what a steeper line would mean.",
      scheme: [
        "Calculates the slope as 1.6 / 4.0",
        "Gives the velocity as 0.40 m/s with a unit",
        "States that the straight line means a constant velocity",
        "States that a steeper line means a greater velocity",
      ],
      model:
        "The slope is 1.6 m divided by 4.0 s, which is 0.40 m/s, so the velocity is 0.40 m/s. The straight line means the velocity is constant. A steeper line would mean a greater velocity.",
      answers: [
        [
          "full",
          "[[0|Slope = rise over run = 1.6 m / 4.0 s.]] [[1|That is 0.40 m/s.]] [[2|A straight line means the car moves at a constant velocity.]] [[3|A steeper line would be a faster car.]]",
          "Full marks. Reading the graph and the number together is exactly the skill.",
        ],
        [
          "full",
          "[[0|v = Δx/Δt = (1.6 − 0)/(4.0 − 0).]] [[1|v = 0.40 m/s.]] [[2|The line is straight so the velocity doesn't change.]] [[3|If the line were steeper, the velocity would be larger.]]",
          "All four marks, with a clear formula.",
        ],
        [
          "partial",
          "[[0|1.6 divided by 4.0]] = 0.4. The line is straight so [[2|it is a constant velocity]].",
          "You need the unit: 0.40 m/s. Also say what a steeper line would mean.",
        ],
        [
          "partial",
          "[[1|The velocity is 0.40 m/s.]] [[3|Steeper means faster.]]",
          "Both are right. Show the division that gives 0.40 and say what the straight line tells you.",
          true,
        ],
        [
          "weak",
          "The velocity is 4.0 × 1.6 = 6.4 m/s because you multiply the numbers on the graph.",
          "The slope is the rise divided by the run, so you divide the position change by the time.",
        ],
        [
          "weak",
          "[[2|The car goes at a constant speed.]] A steeper line means the car is farther away.",
          "A steeper line means a greater change in position every second, which is a greater velocity.",
        ],
      ],
    },
  ],
  practical: {
    title: "Position-time graph of a battery car",
    instructions:
      "Mark a straight track with tape at 0.5 m intervals up to 2.5 m. Time a battery-powered car over each distance, three trials each. Record the mean time and the spread, plot position against time with a line of best fit, and find the velocity from the slope.",
    steps: [
      ["Tape a meter-stick track and mark 0.5, 1.0, 1.5, 2.0 and 2.5 m from the start line."],
      ["Release the car at the start line and start the stopwatch the moment it crosses the line."],
      ["Stop the watch as the front of the car reaches each mark. Repeat to give three trials per distance.", "Keep feet and bags away from the track so the car does not hit them."],
      ["Calculate the mean time for each distance and note the highest and lowest times."],
      ["Plot position (m) against mean time (s) and draw a line of best fit."],
      ["Find the slope of your line and write a conclusion with the velocity and its uncertainty."],
    ],
    rubric: [
      ["Method and data: repeated trials, table with units", 4],
      ["Graph: labeled axes, scale and a sensible line of best fit", 4],
      ["Analysis: slope calculation and conclusion with uncertainty", 4],
    ],
    writeUps: [
      [
        "full",
        "We timed the car three times at each of five distances. The mean times were 1.6, 3.3, 4.8, 6.5 and 8.1 s for 0.5 to 2.5 m. The points on my graph fell close to a straight line. The slope was 2.5 m divided by 8.1 s, or 0.31 m/s. The spread in the times was about 0.2 s, which is roughly 3 percent. The car moves at a constant velocity of about 0.31 plus or minus 0.01 m/s.",
        [4, 4, 4],
        "An excellent report. The table, the graph and the slope agree with each other, and the uncertainty is stated.",
      ],
      [
        "full",
        "Question: does the car move at a constant velocity? Method: three trials at each of five marks. Data: table of means with units. Graph: position against time, line of best fit that passes through the origin. Analysis: slope = 2.0 m / 6.5 s = 0.31 m/s. The line is straight, so the velocity is constant. The biggest uncertainty is our reaction time at the stopwatch, about 0.2 s.",
        [4, 3, 4],
        "Very good. A graph needs both axes labeled with units and a scale, which is where the point was lost.",
      ],
      [
        "partial",
        "We timed the car for five distances and wrote the times in a table. The times went up as the distance went up. I drew a graph and a line through the points. The car moves at about 0.3 m/s I think. I did not do three trials for each distance because we ran out of time in class.",
        [2, 3, 2],
        "Repeated trials give the uncertainty. Show the slope calculation with units and state the uncertainty in the conclusion.",
      ],
      [
        "partial",
        "The car went 2.5 m in 8.1 s so the speed was 0.31 m/s. We did three trials for each distance and they were pretty close. I drew the graph with the distance on the bottom and the time up the side and joined the dots with a ruler between each pair of points.",
        [3, 1, 2],
        "Position goes on the vertical axis and time on the horizontal. A line of best fit is one smooth line, not a join of every dot.",
      ],
      [
        "weak",
        "We raced the car on the tape and it went fast. The stopwatch was hard to use. The car went about 2.5 m. I think the graph is going up because the car got faster and faster as it went along the floor.",
        [1, 0, 0],
        "Write the times in a table and find the slope. A straight line, not a curve, shows constant velocity; check whether yours was straight.",
      ],
      [
        "weak",
        "The slope of the graph was 8.1 and the unit is seconds because the time was on the side. The velocity of the car was 8.1 seconds. We did the experiment on the floor of the hallway and it was a lot of fun to do.",
        [1, 1, 0],
        "Velocity is the position change divided by the time change, in m/s. Pick two points on your line and divide.",
      ],
    ],
  },
};

const w2: WeekInput = {
  topic: "Motion graphs and the equations of constant acceleration",
  note: `
## Objectives

Students will be able to:

1. describe motion in one dimension using position, velocity and acceleration graphs;
2. apply the constant acceleration equations to solve problems.

## Materials

Dynamics carts, a ramp, a motion sensor or stopwatches, graph paper, the practical sheet.

## Starter (6 minutes)

Show three position-time graphs (straight, curved upward, flat) and ask students to act out each one while walking in the hallway. Name them: constant velocity, speeding up, at rest.

## Main activity

1. Link the three graphs: the slope of position-time is velocity, the slope of velocity-time is acceleration, and the area under velocity-time is displacement.
2. Introduce the equations: v = v0 + at, d = v0 t + 1/2 a t squared, v squared = v0 squared + 2ad. Practice with a car that starts from rest and accelerates at 3.0 m/s2 for 8.0 s (v = 24 m/s, d = 96 m), and a car braking from 20 m/s at 5.0 m/s2 (stopping distance 40 m).
3. Practical: release a cart on a ramp, time it over measured distances and find the acceleration from d = 1/2 a t squared.

## Checking for understanding

Ask: "A car's speed shows 20 m/s on the dashboard and its acceleration is zero. What does its velocity-time graph look like?"

## Practical write-up

Collect with a table and an acceleration calculation.
`,
  reading: [
    "From graphs to equations",
    `
Motion in a straight line can be described three ways: with words, with graphs, and with equations. On a **velocity-time graph**, the slope is the **acceleration**, the rate of change of velocity, in meters per second squared. A horizontal line means constant velocity and zero acceleration. A straight sloping line means constant acceleration. The area between the line and the time axis is the displacement. A car that goes from rest to 24 m/s in 8 s has a graph with a slope of 3.0 m/s2, and the area of the triangle, one half times 8 s times 24 m/s, is 96 m.

Those relationships can be written as three equations for constant acceleration. The first, v = v0 + at, gives the final velocity after a time t. The second, d = v0 t + 1/2 a t squared, gives the displacement. The third, v squared = v0 squared + 2ad, links the speeds and displacement without involving time, and is useful for stopping distances.

To use them, list what you know and what you want. Suppose a car starts from rest and accelerates at 3.0 m/s2 for 8.0 s. The initial velocity is 0, so v = 0 + 3.0 times 8.0, which is 24 m/s. The distance is 0 + 1/2 times 3.0 times 8.0 squared, which is 96 m. Now suppose the driver brakes at 5.0 m/s2 when moving at 20 m/s. The acceleration is negative since it points opposite to the motion, so use a = -5.0. The final speed is 0, so 0 = 20 squared + 2 times (-5.0) times d, giving d = 400 divided by 10, which is 40 m. The time to stop is 20 divided by 5.0, which is 4.0 s.

Notice that if the speed doubled to 40 m/s, the stopping distance would be 1600 divided by 10, or 160 m, four times larger. That is why stopping distance increases so quickly on the highway and why speed limits matter in the rain.

In a lab you can find the acceleration of a cart starting from rest on a ramp by timing it over a measured distance. Because v0 is zero, d = 1/2 a t squared, so a = 2d divided by t squared. If a cart rolls 1.20 m in 2.0 s, a = 2 times 1.20 divided by 4.0, which is 0.60 m/s2.
`,
  ],
  cards: [
    ["Acceleration", "The rate of change of velocity, in m/s2."],
    ["Velocity-time graph", "A graph whose slope is acceleration and whose area is displacement."],
    ["v = v0 + at", "The final velocity after constant acceleration for a time t."],
    ["d = v0 t + 1/2 a t^2", "The displacement under constant acceleration."],
    ["v^2 = v0^2 + 2ad", "A relation between speeds and displacement that does not use time."],
    ["Deceleration", "Acceleration in the direction opposite to the velocity, which reduces speed."],
    ["Constant acceleration", "Acceleration that does not change during the motion."],
    ["Stopping distance", "The distance a vehicle travels while braking to a stop."],
  ],
  closed: [
    [
      "A car starts from rest and accelerates at 3.0 m/s2 for 8.0 s. What is its final speed?",
      ["11 m/s", "24 m/s", "2.7 m/s", "192 m/s"],
      "B",
    ],
    [
      "A car moving at 20 m/s brakes at 5.0 m/s2 until it stops. How far does it travel?",
      ["4.0 m", "20 m", "40 m", "80 m"],
      "C",
    ],
    [
      "On a velocity-time graph, what does the area under the line represent?",
      ["Acceleration", "Displacement", "Time", "Force"],
      "B",
    ],
    [
      "If a car's speed doubles, its braking distance at the same deceleration becomes:",
      ["The same", "Two times as long", "Four times as long", "Half as long"],
      "C",
    ],
    [
      "A cart starts from rest and rolls 1.20 m in 2.0 s. What is its acceleration?",
      ["0.30 m/s2", "0.60 m/s2", "1.2 m/s2", "2.4 m/s2"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A car traveling at 25 m/s brakes with a constant deceleration of 5.0 m/s2. Calculate the time to stop and the stopping distance.",
      scheme: [
        "Uses a = -5.0 m/s2 with a final velocity of 0",
        "Calculates the time as 5.0 s",
        "Uses v squared = v0 squared + 2ad or d = v0 t + 1/2 a t squared",
        "Calculates the distance as 62.5 m with a unit",
      ],
      model:
        "The acceleration is -5.0 m/s2 and the final velocity is 0. From v = v0 + at, t = 25 / 5.0 = 5.0 s. From v squared = v0 squared + 2ad, 0 = 625 - 10d, so d = 62.5 m.",
      answers: [
        [
          "full",
          "[[0|Final speed is 0 and a = −5.0 m/s².]] [[1|0 = 25 − 5.0t so t = 5.0 s.]] [[2|0 = 25² + 2(−5.0)d]] [[3|so d = 625/10 = 62.5 m.]]",
          "Full marks. Using the negative acceleration for braking is the key to the signs.",
        ],
        [
          "full",
          "[[0|The car slows down so a is −5.0 and v is 0 at the end.]] [[1|t = (0 − 25)/(−5.0) = 5.0 s.]] [[2|d = 25(5.0) + ½(−5.0)(5.0)²]] [[3|= 125 − 62.5 = 62.5 m.]]",
          "All four marks. Using a different equation for the distance checks the answer.",
        ],
        [
          "partial",
          "[[1|t = 25/5.0 = 5.0 s.]] d = 25 × 5.0 = 125 m.",
          "That distance assumes the car stays at 25 m/s for the 5.0 s. It slows down, so the distance is 62.5 m.",
        ],
        [
          "partial",
          "[[0|a is −5.0.]] [[3|The distance is 62.5 m.]]",
          "Show the equation and the time to stop, since the question asks for it as well.",
          true,
        ],
        [
          "weak",
          "5.0 × 25 = 125 m and the time is 125 s.",
          "Multiplying the acceleration and the speed does not give a distance. Use v = v0 + at for the time first.",
        ],
        [
          "weak",
          "[[0|a = −5.0 m/s² since it's slowing.]] The time is 25 × 5 = 125 s, and the distance is 125 m.",
          "The sign is right. Time is the speed change divided by the acceleration: 25 / 5.0 = 5.0 s.",
        ],
      ],
    },
    {
      prompt:
        "A velocity-time graph for a bike is a straight line from 0 m/s at 0 s to 12 m/s at 6.0 s. Find the acceleration and the distance traveled in the 6.0 s, and say how you can find the distance from the graph.",
      scheme: [
        "Calculates the acceleration as 12 / 6.0 = 2.0 m/s2",
        "States the acceleration is constant because the line is straight",
        "Calculates the distance as 36 m",
        "States that the distance is the area under the velocity-time line",
      ],
      model:
        "The slope is 12 m/s divided by 6.0 s, so the acceleration is 2.0 m/s2, constant because the line is straight. The distance is the area under the line, one half times 6.0 s times 12 m/s, which is 36 m.",
      answers: [
        [
          "full",
          "[[0|a = 12/6.0 = 2.0 m/s².]] [[1|The line is straight so the acceleration is constant.]] [[2|Distance = ½ × 6.0 × 12 = 36 m.]] [[3|It's the area under the line, a triangle.]]",
          "Full marks. Both ways of finding the distance, area and equation, would agree.",
        ],
        [
          "full",
          "[[0|The slope is rise over run, 2.0 m/s².]] [[1|It's a straight line, so the bike has constant acceleration.]] [[2|The distance is 36 m.]] [[3|You get that from the area under the velocity-time graph.]]",
          "All four marks, in a few clear sentences.",
        ],
        [
          "partial",
          "[[0|The acceleration is 2.0 m/s².]] [[1|It's constant.]] The distance is 12 × 6.0 = 72 m.",
          "12 × 6.0 would be the area of a rectangle. The graph is a triangle, so the distance is half of that, 36 m.",
        ],
        [
          "partial",
          "[[2|The distance is 36 m]] and [[3|it's the area under the line]].",
          "Good. Find the acceleration from the slope as well, and say what the straight line tells you.",
          true,
        ],
        [
          "weak",
          "The acceleration is 12 m/s because that is where the line ends and the distance is 6.0 m.",
          "Acceleration is the slope, in m/s2, and it is the change in velocity divided by the time. The distance is the area under the line.",
        ],
        [
          "weak",
          "[[1|It's constant acceleration because the line is straight.]] The acceleration is 6.0 × 12 = 72 m/s².",
          "You have the right idea about the straight line. The acceleration is the slope, so divide 12 by 6.0.",
        ],
      ],
    },
  ],
  practical: {
    title: "Acceleration of a cart on a ramp",
    instructions:
      "Release a dynamics cart from rest at the top of a gently sloped ramp. Time its trip over 0.40, 0.80, 1.20, and 1.60 m, three trials each. Use d = 1/2 a t squared to find the acceleration for each distance and compare them to test whether the acceleration is constant.",
    steps: [
      ["Raise one end of the ramp about 10 cm on a book stack and mark the distances along the ramp."],
      ["Hold the cart at the top mark and release it without pushing."],
      ["Start the stopwatch on release and stop it as the front wheels reach each mark. Repeat for three trials.", "Stop the cart at the bottom with a block so it does not fall off the table."],
      ["Calculate the mean time for each distance."],
      ["Calculate a = 2d / t squared for each distance."],
      ["Compare the four values of a and write a conclusion about whether the acceleration is constant."],
    ],
    rubric: [
      ["Method and data: controlled release, repeated trials, table", 4],
      ["Calculation: correct use of a = 2d / t squared", 4],
      ["Conclusion: compares the values and discusses uncertainty", 4],
    ],
    writeUps: [
      [
        "full",
        "The mean times for 0.40, 0.80, 1.20 and 1.60 m were 1.0, 1.4, 1.7 and 2.0 s. Using a = 2d/t squared I found 0.80, 0.82, 0.83 and 0.80 m/s2. The four values agree within about 3 percent, so the acceleration is constant at about 0.81 m/s2. Reaction time at the stopwatch was the main uncertainty, about 0.1 s, which matters most for the shortest distance where the time is smallest.",
        [4, 4, 4],
        "An excellent report. You compared all four values, found them consistent, and explained which measurement the error affects most.",
      ],
      [
        "full",
        "Method: the cart started from rest at the top mark each time and we did three trials for each distance. The calculated accelerations were 0.78, 0.84, 0.79 and 0.82 m/s2, mean 0.81. Because v0 = 0 I used d = ½at², so a = 2d/t². The values are close to one another so the acceleration is constant. The differences come from the timing, because starting and stopping the watch by hand is not exact.",
        [4, 4, 3],
        "Very good. State the size of the uncertainty (such as 0.1 s) to complete the evaluation.",
      ],
      [
        "partial",
        "The cart took longer to go farther. I used a = 2d/t squared with d = 1.60 m and t = 2.0 s and got 0.80 m/s2. We timed the other distances too but I did not calculate them, so I cannot say yet if the acceleration stayed the same all the way down the ramp.",
        [3, 2, 1],
        "You need all four distances to test whether the acceleration is constant. Calculate them and compare.",
      ],
      [
        "partial",
        "We timed the cart three times at each distance and made a table. For 0.80 m the time was 1.4 s so the acceleration is 0.8 divided by 1.4 which is 0.57 m/s2. For 1.60 m the time was 2.0 s so 1.6 divided by 2.0 is 0.80. They are different so the acceleration changes.",
        [3, 1, 2],
        "The formula is a = 2d divided by t squared, not d divided by t. Use it, and your values will agree.",
      ],
      [
        "weak",
        "The cart rolled down the ramp and got faster. We used the stopwatch to time it. It was not easy to start and stop the watch exactly right. I think the acceleration was about 5 because the cart was going fast at the bottom of the ramp.",
        [1, 0, 0],
        "Record the times and calculate a from each. An acceleration of 5 m/s2 would be much too large for this gentle slope.",
      ],
      [
        "weak",
        "We measured the time and the distance for the cart and the acceleration is the distance divided by the time, which gives 0.8 m per second. The speed is the same all the way because the ramp is straight and so the acceleration is also constant and there was no uncertainty.",
        [1, 1, 0],
        "Distance divided by time gives speed, and acceleration needs the time squared. Every hand-timed measurement has an uncertainty.",
      ],
    ],
  },
};

const w3: WeekInput = {
  topic: "Free fall and vectors",
  note: `
## Objectives

Students will be able to:

1. analyze free fall and explain why objects of different masses fall together when air resistance is small;
2. add and resolve vectors graphically and by components.

## Materials

A bowling ball and a tennis ball, a feather and a coin in a tube (demo), rulers, protractors, graph paper, the worksheet.

## Starter (6 minutes)

Ask: "If I drop this bowling ball and this tennis ball from the same height, which hits first?" Take votes and record them. Then drop both from the top of a stool and let students see the result.

## Main activity

1. Free fall: with air resistance small, every object has the same acceleration, g = 9.8 m/s2 downward. A ball dropped from 19.6 m takes 2.0 s and hits at 19.6 m/s. Show the video of a feather and a hammer on the Moon.
2. Vectors: add 30 m east and 40 m north by drawing to scale and by the Pythagorean theorem (50 m at 53 degrees north of east).
3. Resolve a 100 N pull at 30 degrees above the horizontal into components: 87 N horizontal and 50 N vertical.

## Checking for understanding

Whiteboards: a ball is thrown straight up. What is its acceleration at the very top?

## Worksheet and quiz

Free-fall calculations and vector components.
`,
  reading: [
    "Falling together, and vectors with direction",
    `
For many years people believed that heavy objects fall faster than light ones. It seems sensible: a hammer falls faster than a feather. But the difference is caused by air resistance, which affects the feather far more than the hammer. When astronaut David Scott dropped a hammer and a feather on the Moon, where there is no air, they hit the ground at the same time.

In **free fall**, the only force acting on an object is gravity. Near the Earth's surface, every object in free fall accelerates downward at the same rate, g = 9.8 m/s2, no matter its mass. A heavier object has a greater force of gravity on it, but it also has more inertia, so the two effects cancel exactly. Each second, the downward speed increases by 9.8 m/s. A ball dropped from rest has a speed of 9.8 m/s after 1 s and 19.6 m/s after 2 s, and it has fallen 1/2 times 9.8 times 2.0 squared, which is 19.6 m. A ball thrown straight up slows by 9.8 m/s each second, stops at the top for an instant, and falls back. The acceleration is 9.8 m/s2 downward the whole time, even at the very top where the velocity is zero.

Many quantities have a direction as well as a size. These **vectors** are drawn as arrows. To add vectors graphically, draw the first arrow, and then draw the second starting at the tip of the first (tip to tail). The **resultant** is the arrow from the start of the first to the tip of the last. If you walk 30 m east and then 40 m north, the resultant has a magnitude found by the Pythagorean theorem: the square root of 30 squared plus 40 squared, which is 50 m. Its direction is the angle whose tangent is 40/30, which is 53 degrees north of east.

You can also break a vector into **components**. A 100 N pull on a wagon handle at 30 degrees above the horizontal has a horizontal component of 100 cos 30, which is 87 N, and a vertical component of 100 sin 30, which is 50 N. Only the horizontal part moves the wagon along the ground, while the vertical part lifts a little on it. Components make it possible to add vectors that are not at right angles to each other: add all the x-components, add all the y-components, and combine the two sums.
`,
  ],
  cards: [
    ["Free fall", "Motion in which gravity is the only force acting on an object."],
    ["g", "The acceleration due to gravity near Earth's surface, 9.8 m/s2 downward."],
    ["Air resistance", "A force from the air that opposes motion through it."],
    ["Vector", "A quantity with both size and direction."],
    ["Resultant", "The single vector that is the sum of two or more vectors."],
    ["Component", "The part of a vector along one axis, such as horizontal or vertical."],
    ["Tip-to-tail method", "Adding vectors by drawing each starting at the tip of the previous one."],
    ["Magnitude", "The size of a vector."],
  ],
  closed: [
    [
      "A ball is dropped from rest. What is its speed after 2.0 s, ignoring air resistance?",
      ["9.8 m/s", "19.6 m/s", "4.9 m/s", "39.2 m/s"],
      "B",
    ],
    [
      "A hammer and a feather are dropped on the Moon. Which statement is correct?",
      ["The hammer lands first", "The feather lands first", "They land at the same time", "Neither falls"],
      "C",
    ],
    [
      "A person walks 30 m east and then 40 m north. What is the magnitude of the displacement?",
      ["10 m", "35 m", "50 m", "70 m"],
      "C",
    ],
    [
      "What is the acceleration of a ball at the top of its path after being thrown straight up?",
      ["Zero", "9.8 m/s2 upward", "9.8 m/s2 downward", "19.6 m/s2 downward"],
      "C",
    ],
    [
      "A 100 N force acts at 30 degrees above horizontal. What is its horizontal component?",
      ["50 N", "87 N", "100 N", "173 N"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A stone is dropped from a bridge 19.6 m above a river. Ignoring air resistance, calculate the time it takes to reach the water and its speed on impact.",
      scheme: [
        "Identifies the initial velocity as zero and a = 9.8 m/s2",
        "Uses d = 1/2 a t squared to find t = 2.0 s",
        "Uses v = at to find the speed 19.6 m/s",
        "Gives units and states that the mass of the stone does not matter",
      ],
      model:
        "The stone starts from rest and accelerates at 9.8 m/s2. From d = 1/2 a t squared, 19.6 = 4.9 t squared, so t = 2.0 s. The speed is v = 9.8 times 2.0 = 19.6 m/s. The mass of the stone does not affect the result in free fall.",
      answers: [
        [
          "full",
          "[[0|It starts at rest and a = 9.8 m/s².]] [[1|19.6 = ½(9.8)t², so t² = 4 and t = 2.0 s.]] [[2|v = 9.8 × 2.0 = 19.6 m/s.]] [[3|The mass doesn't matter because all objects fall with the same acceleration.]]",
          "Full marks. Saying that mass does not matter addresses the free-fall idea directly.",
        ],
        [
          "full",
          "[[0|v0 = 0, a = 9.8 m/s² down.]] [[1|d = ½at² gives t = √(2 × 19.6 / 9.8) = 2.0 s.]] [[2|v = at = 19.6 m/s.]] [[3|A heavier stone would land at the same time, so mass isn't in the equations.]]",
          "All four marks, and a clean check that mass drops out.",
        ],
        [
          "partial",
          "[[0|It starts from rest, a = 9.8.]] [[1|t = 2.0 s.]] The speed is 19.6 m because that is the height.",
          "The speed is in m/s, not m. After 2.0 s the speed is 9.8 times 2.0 = 19.6 m/s, a number that happens to match the height here.",
        ],
        [
          "partial",
          "[[2|The speed is 19.6 m/s]] and [[3|it doesn't depend on the stone's mass]].",
          "Good. Show how you found the time, using d = 1/2 a t squared.",
          true,
        ],
        [
          "weak",
          "19.6 / 9.8 = 2.0 s and a heavy stone falls faster, so it would be less.",
          "Heavier objects do not fall faster when air resistance is small. Use d = 1/2 a t squared for the time.",
        ],
        [
          "weak",
          "[[0|It starts at rest.]] The speed is 9.8 m/s because that is g, and the time is 9.8 s.",
          "g is the acceleration, not the speed. The speed grows by 9.8 m/s every second.",
        ],
      ],
    },
    {
      prompt:
        "A student pulls a wagon with a force of 100 N at 30 degrees above the horizontal. Find the horizontal and vertical components, and explain which one makes the wagon move along the ground.",
      scheme: [
        "Calculates the horizontal component as 100 cos 30 = 87 N",
        "Calculates the vertical component as 100 sin 30 = 50 N",
        "States that the horizontal component moves the wagon along the ground",
        "States that the vertical component lifts on the wagon, reducing the force pressing it on the ground",
      ],
      model:
        "The horizontal component is 100 cos 30, which is 87 N. The vertical component is 100 sin 30, which is 50 N. The horizontal component moves the wagon along the ground. The vertical component pulls upward, which slightly reduces how hard the wagon presses on the ground.",
      answers: [
        [
          "full",
          "[[0|Horizontal = 100 cos 30° = 87 N.]] [[1|Vertical = 100 sin 30° = 50 N.]] [[2|The horizontal part pulls the wagon forward.]] [[3|The vertical part lifts up on the wagon a bit, so it presses less on the ground.]]",
          "Full marks. The effect of the vertical component on the contact with the ground connects to friction later.",
        ],
        [
          "full",
          "[[0|Fx = 100 × 0.866 = 87 N.]] [[1|Fy = 100 × 0.5 = 50 N.]] [[2|Only Fx moves it along the ground.]] [[3|Fy partly supports the wagon's weight so the ground pushes up less.]]",
          "All four marks, with correct values from the sine and cosine.",
        ],
        [
          "partial",
          "[[0|The horizontal is 87 N.]] [[1|The vertical is 50 N.]] The vertical one makes it move.",
          "The horizontal component moves the wagon along the ground. Say what the vertical component does.",
        ],
        [
          "partial",
          "[[2|The horizontal component moves it.]] [[3|The vertical one lifts it up a little.]]",
          "Good explanation. Calculate the two components with cosine and sine.",
          true,
        ],
        [
          "weak",
          "100 + 30 = 130 N for the horizontal and 100 − 30 = 70 N for the vertical.",
          "Components come from trigonometry, not from adding the angle to the force. Use cosine for the horizontal and sine for the vertical.",
        ],
        [
          "weak",
          "[[1|The vertical is 50 N.]] The horizontal is also 50 N because the angle is in the middle.",
          "At 30 degrees above the horizontal, the horizontal component is larger: 100 cos 30 is 87 N.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Projectile motion and Newton's second law",
  note: `
## Objectives

Students will be able to:

1. analyze projectile motion by treating the horizontal and vertical motions separately;
2. analyze data to support the claim that the net force on an object equals its mass times its acceleration.

## Materials

Two identical balls, a ramp and table edge, carbon paper, dynamics carts with hanging masses, motion sensors or stopwatches, the quiz.

## Starter (6 minutes)

Roll one ball off a table while dropping another from the same height at the same moment. Ask students to listen for the landing sound. Ask: "Why did they land together?"

## Main activity

1. Horizontal and vertical independence: a ball kicked horizontally at 10 m/s from a 19.6 m cliff falls for 2.0 s and lands 20 m from the base. A projectile launched at 20 m/s and 30 degrees has components 17.3 and 10 m/s, a flight time of 2.04 s and a range of 35.3 m.
2. Newton's second law: the net force equals mass times acceleration. Look at data of acceleration against hanging mass for a cart and find the proportional relationship.
3. Compute: a 1200 kg car with a net force of 3000 N accelerates at 2.5 m/s2.

## Checking for understanding

Ask: "At the top of its path, what is the horizontal velocity of a kicked football?" Wait for "unchanged."

## Quiz and problem set

Five quiz questions and a short problem set.
`,
  reading: [
    "Two motions at once, and what forces do",
    `
A thrown ball seems to follow a single curved path, but physicists find it easier to think of two separate motions. In the horizontal direction, no force acts on the ball (ignoring air resistance), so the horizontal velocity stays constant. In the vertical direction, gravity pulls the ball down, so it accelerates at 9.8 m/s2 downward. The two motions are **independent** of each other, and only time connects them. That is why a ball rolled off a table and a ball dropped from the same height hit the floor together.

Take a ball kicked horizontally at 10 m/s from the edge of a 19.6 m cliff. Its initial vertical velocity is zero, so the time to fall comes from 19.6 = 1/2 times 9.8 times t squared, which gives t = 2.0 s. During this time it moves forward at a constant 10 m/s, so it lands 10 times 2.0, or 20 m, from the base of the cliff.

When a projectile is launched at an angle, split the launch velocity into components. A ball launched at 20 m/s at 30 degrees above horizontal has a horizontal speed of 20 cos 30, which is 17.3 m/s, and a vertical speed of 20 sin 30, which is 10 m/s. The vertical motion goes up, stops and returns, so the time of flight on level ground is 2 times 10 divided by 9.8, about 2.04 s. The range is 17.3 times 2.04, which is 35.3 m.

Why does the ball accelerate? Newton's second law says the acceleration of an object is directly proportional to the **net force** acting on it and inversely proportional to its mass: F net = ma. The unit of force is the newton, the force that gives a 1 kg mass an acceleration of 1 m/s2. You can test this law with a cart pulled by a hanging mass: doubling the pulling force doubles the acceleration, and doubling the mass of the cart halves it. For a 1200 kg car, a net force of 3000 N gives an acceleration of 3000 divided by 1200, which is 2.5 m/s2. Notice the word net. If the engine pushes with 4000 N and friction and air resistance oppose with 1000 N, the net force is 3000 N. Only the net force determines the acceleration.
`,
  ],
  cards: [
    ["Projectile", "An object moving through the air under gravity alone."],
    ["Independence of motions", "Horizontal and vertical motions of a projectile do not affect each other."],
    ["Range", "The horizontal distance traveled by a projectile."],
    ["Time of flight", "The time a projectile spends in the air."],
    ["Newton's second law", "The net force on an object equals its mass times its acceleration."],
    ["Net force", "The vector sum of all forces acting on an object."],
    ["Newton (N)", "The force that gives a 1 kg mass an acceleration of 1 m/s2."],
    ["Proportional", "Describes two quantities that change in the same ratio."],
  ],
  closed: [
    [
      "A ball is kicked horizontally at 10 m/s from a 19.6 m cliff. How far from the base does it land?",
      ["10 m", "20 m", "19.6 m", "40 m"],
      "B",
    ],
    [
      "At the highest point of a projectile's path (ignoring air), the horizontal velocity is:",
      ["Zero", "Unchanged from the launch", "Equal to g", "Twice the launch value"],
      "B",
    ],
    [
      "A 1200 kg car has a net force of 3000 N. What is its acceleration?",
      ["0.40 m/s2", "2.5 m/s2", "4.0 m/s2", "3.6 x 10^6 m/s2"],
      "B",
    ],
    [
      "A cart's acceleration doubles when the pulling force doubles and the mass stays the same. This supports:",
      ["Acceleration is inversely proportional to force", "Acceleration is proportional to net force", "Mass is proportional to force", "Force is independent of mass"],
      "B",
    ],
    [
      "An engine pushes a car with 4000 N and the opposing forces total 1000 N. The net force is:",
      ["5000 N", "4000 N", "3000 N", "1000 N"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A soccer ball is kicked horizontally at 12 m/s from a platform 4.9 m high. Calculate the time it is in the air and the horizontal distance it travels. Explain why you can find the time using only the vertical motion.",
      scheme: [
        "Uses d = 1/2 a t squared with d = 4.9 m to find t = 1.0 s",
        "Calculates the horizontal distance as 12 m",
        "Explains the initial vertical velocity is zero because the kick is horizontal",
        "Explains the horizontal and vertical motions are independent, so the horizontal speed does not affect the fall time",
      ],
      model:
        "The ball has no initial vertical velocity, so 4.9 = 1/2 times 9.8 times t squared, giving t = 1.0 s. The horizontal speed is constant at 12 m/s, so the distance is 12 times 1.0 = 12 m. The time can be found from the vertical motion alone because the horizontal and vertical motions are independent.",
      answers: [
        [
          "full",
          "[[0|4.9 = ½(9.8)t² so t = 1.0 s.]] [[1|Horizontal distance = 12 × 1.0 = 12 m.]] [[2|The kick is horizontal, so the ball starts with no vertical speed.]] [[3|The horizontal and vertical motions are independent, so the 12 m/s doesn't change how long it falls.]]",
          "Full marks. You explained why the fall time does not depend on the forward speed.",
        ],
        [
          "full",
          "[[0|t = √(2 × 4.9/9.8) = 1.0 s.]] [[1|x = vt = 12 m/s × 1.0 s = 12 m.]] [[2|v0y = 0 since it's kicked horizontally.]] [[3|Gravity only affects the vertical motion, so the horizontal speed doesn't matter for the time.]]",
          "All four marks, and the independence is clearly stated.",
        ],
        [
          "partial",
          "[[0|t = 1.0 s.]] [[1|The distance is 12 m.]] I used 12 m/s to find the time because the ball moves forward.",
          "The fall time comes only from the vertical motion. The horizontal speed is used only to find the distance.",
        ],
        [
          "partial",
          "[[2|The initial vertical speed is zero.]] [[3|The horizontal motion is independent.]]",
          "Good reasoning. Now calculate the time and the distance with numbers.",
          true,
        ],
        [
          "weak",
          "12 / 4.9 = 2.4 s and the distance is 4.9 × 2.4 = 12 m.",
          "The time comes from the fall, using d = 1/2 a t squared with the 4.9 m height, not from dividing speed by height.",
        ],
        [
          "weak",
          "[[1|The distance is 12 m.]] The ball goes faster because it is kicked so it falls faster than if it were dropped.",
          "The ball falls in the same time as one dropped from the same height. The horizontal speed does not change the fall time.",
        ],
      ],
    },
    {
      prompt:
        "A student pulls a 2.0 kg cart with a net force of 5.0 N and measures an acceleration of 2.5 m/s2. Then she pulls a 4.0 kg cart with the same net force. Predict the second acceleration and explain how the results support Newton's second law.",
      scheme: [
        "Verifies the first result as a = F / m = 5.0 / 2.0 = 2.5 m/s2",
        "Predicts the second acceleration as 1.25 m/s2",
        "States that doubling the mass halves the acceleration for the same net force",
        "Concludes this fits acceleration being inversely proportional to mass (a = F/m)",
      ],
      model:
        "The first result is 5.0 N divided by 2.0 kg, which is 2.5 m/s2. For the 4.0 kg cart the acceleration should be 5.0 divided by 4.0, which is 1.25 m/s2. Doubling the mass with the same net force halves the acceleration, which supports a = F/m: acceleration is inversely proportional to mass.",
      answers: [
        [
          "full",
          "[[0|5.0 N / 2.0 kg = 2.5 m/s², which matches.]] [[1|For 4.0 kg, a = 5.0/4.0 = 1.25 m/s².]] [[2|Doubling the mass cut the acceleration in half.]] [[3|So acceleration is inversely proportional to mass, which is a = F/m.]]",
          "Full marks. You checked the measurement against the law before predicting.",
        ],
        [
          "full",
          "[[0|The law gives a = F/m = 2.5 m/s² for the first cart, so the data agree.]] [[1|The second should be 1.25 m/s².]] [[2|Twice the mass means half the acceleration for the same force.]] [[3|That fits Newton's second law with acceleration inversely proportional to mass.]]",
          "All four marks, with the data tied to the law.",
        ],
        [
          "partial",
          "[[1|The second acceleration will be 1.25 m/s².]] [[2|It's half because the mass is double.]]",
          "Good prediction. Verify the first measurement with F/m and state what law the pattern supports.",
        ],
        [
          "partial",
          "[[0|5.0/2.0 = 2.5, it matches.]] The second acceleration is 5.0 m/s² because the mass is bigger so it accelerates more.",
          "A larger mass accelerates less for the same force. Divide the force by 4.0 kg to get 1.25 m/s2.",
          true,
        ],
        [
          "weak",
          "The acceleration stays 2.5 m/s² because the force is the same and force is what causes acceleration.",
          "The force matters, but so does the mass. The same force on a larger mass gives a smaller acceleration.",
        ],
        [
          "weak",
          "[[3|It's F = ma.]] The second one is 2.5 × 4.0 = 10 m/s².",
          "F = ma is right, but you must solve for a. a = F / m = 5.0 / 4.0 = 1.25 m/s2.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Free-body diagrams, Newton's first and third laws, friction and inclines",
  note: `
## Objectives

Students will be able to:

1. draw free-body diagrams and find the net force on an object;
2. state and apply Newton's first and third laws to everyday situations;
3. calculate friction and tension and solve problems on inclined planes.

## Materials

Spring scales, wooden blocks, a ramp with adjustable angle, string and pulleys, the problem set.

## Starter (6 minutes)

Place a book on the desk. Ask: "How many forces act on it? Why doesn't it accelerate?" Draw the two vertical forces as arrows on the board and introduce the free-body diagram.

## Main activity

1. Draw free-body diagrams for a book at rest, a box pushed across the floor with friction, and an elevator accelerating upward.
2. Apply the first law (an object keeps its state of motion unless a net force acts) and the third law (forces come in equal and opposite pairs acting on different objects).
3. Solve: a 10 kg box pushed with 50 N and friction coefficient 0.30 (friction 29.4 N, net force 20.6 N, a = 2.06 m/s2). A 5.0 kg block on a frictionless 30 degree incline (a = g sin 30 = 4.9 m/s2). A 500 kg elevator accelerating upward at 2.0 m/s2 (tension 5900 N).

## Checking for understanding

Ask: "When you push on a wall, the wall pushes back. Why doesn't the wall accelerate?" Watch for different objects, balanced by other forces.

## Problem set and worksheet

Free-body diagrams and calculation problems.
`,
  reading: [
    "Forces, diagrams and the three laws",
    `
A **free-body diagram** shows a single object as a dot or box, with an arrow for each force acting on it. Draw only the forces on that object, not the forces it exerts on others. The usual forces are weight (the pull of gravity, mg, downward), the **normal force** (the push of a surface perpendicular to the surface), **friction** (parallel to the surface, opposing sliding), **tension** (a pull along a rope) and applied pushes or pulls. The net force is the vector sum of the arrows.

Newton's first law says an object stays at rest or keeps moving at constant velocity unless a net force acts on it. This property is called **inertia**. A book at rest on a desk has two forces, its weight down and the normal force up. They are equal and opposite, the net force is zero, and there is no acceleration. The same is true of a car cruising at constant speed on a straight road: the engine force is balanced by friction and air resistance. Newton's third law says that when object A pushes on object B, B pushes on A with a force of equal size in the opposite direction. The two forces act on different objects, so they never cancel each other in a free-body diagram. When you push a wall, the wall pushes you back equally. The wall does not accelerate because the ground and the building balance the force on it, while you move away if you are on wheels.

The **friction** force during sliding is f = μN, where μ is the coefficient of friction and N is the normal force. A 10 kg box on a level floor has N = mg = 98 N. If μ = 0.30, the friction is 29.4 N. If you push with 50 N, the net force is 50 minus 29.4, which is 20.6 N, and a = 20.6 divided by 10, which is 2.06 m/s2.

On an incline of angle θ, it helps to rotate the axes so that one is along the slope. Weight splits into mg sin θ along the slope and mg cos θ into it. For a 5.0 kg block on a frictionless slope at 30 degrees, the force down the slope is 5.0 times 9.8 times 0.50, which is 24.5 N, so a = g sin θ = 4.9 m/s2. For **tension**, an elevator of 500 kg accelerating upward at 2.0 m/s2 needs T minus mg equal to ma, so T = 500 times (9.8 + 2.0), which is 5900 N.
`,
  ],
  cards: [
    ["Free-body diagram", "A diagram showing all forces on a single object as arrows."],
    ["Normal force", "The force of a surface pushing perpendicular to the surface."],
    ["Friction", "A force parallel to a surface that opposes sliding."],
    ["Tension", "The pulling force along a rope or string."],
    ["Inertia", "The tendency of an object to keep its state of motion."],
    ["Newton's third law", "Forces come in equal and opposite pairs acting on different objects."],
    ["Coefficient of friction", "The ratio of the friction force to the normal force."],
    ["Incline", "A sloping surface; weight is resolved along and perpendicular to it."],
  ],
  closed: [
    [
      "A book rests on a table. The net force on it is:",
      ["Equal to its weight", "Zero", "Equal to the normal force", "Upward"],
      "B",
    ],
    [
      "A 10 kg box on a level floor has μ = 0.30. What is the friction force when it slides?",
      ["3.0 N", "29.4 N", "98 N", "300 N"],
      "B",
    ],
    [
      "A 5.0 kg block slides down a frictionless 30 degree incline. What is its acceleration?",
      ["2.5 m/s2", "4.9 m/s2", "8.5 m/s2", "9.8 m/s2"],
      "B",
    ],
    [
      "In Newton's third law pair, the two forces:",
      ["Act on the same object", "Are equal and opposite and act on different objects", "Always cancel", "Differ in size"],
      "B",
    ],
    [
      "A 500 kg elevator accelerates upward at 2.0 m/s2. The cable tension is:",
      ["4900 N", "5900 N", "1000 N", "6900 N"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A 10 kg box is pushed across a level floor with a 50 N horizontal force. The coefficient of kinetic friction is 0.30. Draw (describe) the free-body diagram and find the box's acceleration.",
      scheme: [
        "Lists the four forces: weight down, normal force up, applied force forward and friction backward",
        "Finds the normal force as 98 N and friction as 29.4 N",
        "Finds the net force as 20.6 N",
        "Calculates the acceleration as 2.06 m/s2",
      ],
      model:
        "The forces are weight 98 N down, the normal force 98 N up, the push of 50 N forward and friction backward. Friction is 0.30 times 98, which is 29.4 N. The net horizontal force is 50 minus 29.4 = 20.6 N. The acceleration is 20.6 divided by 10, which is 2.06 m/s2.",
      answers: [
        [
          "full",
          "[[0|Forces: weight down, normal up, push forward, friction backward.]] [[1|N = mg = 98 N so f = 0.30 × 98 = 29.4 N.]] [[2|Net force = 50 − 29.4 = 20.6 N.]] [[3|a = 20.6/10 = 2.06 m/s².]]",
          "Full marks. The friction depends on the normal force, which you found first.",
        ],
        [
          "full",
          "[[0|Four arrows: mg down, N up, 50 N right, friction left.]] [[1|Friction is μN = 0.30(98) = 29.4 N.]] [[2|The horizontal net force is 20.6 N.]] [[3|Acceleration = F/m = 2.06 m/s².]]",
          "All four marks, with a clear order.",
        ],
        [
          "partial",
          "[[0|Weight, normal, push and friction.]] [[1|Friction is 0.30 × 98 = 29.4 N.]] The acceleration is 50/10 = 5.0 m/s².",
          "The acceleration comes from the net force, not the push alone. Subtract the friction: 20.6 N divided by 10 kg is 2.06 m/s2.",
        ],
        [
          "partial",
          "[[2|The net force is 20.6 N]] and [[3|the acceleration is 2.06 m/s²]].",
          "The results are right. Show the forces and how you found the friction from the normal force.",
          true,
        ],
        [
          "weak",
          "The net force is 50 + 29.4 = 79.4 N so a = 7.94 m/s².",
          "Friction opposes the motion, so it is subtracted from the applied force, not added.",
        ],
        [
          "weak",
          "[[0|There's the weight, normal, push and friction.]] Friction is 0.30 × 10 = 3.0 N so the net force is 47 N.",
          "Friction is μ times the normal force, which is 98 N, not the mass. That gives 29.4 N.",
        ],
      ],
    },
    {
      prompt:
        "Two ice skaters stand at rest facing each other. Skater A (60 kg) pushes on skater B (40 kg). Use Newton's third law and second law to compare the forces and the accelerations of the two skaters.",
      scheme: [
        "States that B exerts a force on A equal in size and opposite in direction to A's force on B",
        "States that the forces act on different objects",
        "Uses a = F/m to say that the lighter skater has the greater acceleration",
        "Calculates or states that the ratio of accelerations is 3 to 2 (B accelerates 1.5 times as much)",
      ],
      model:
        "By Newton's third law, B pushes on A with a force equal in size and opposite in direction to A's push on B. The two forces act on different objects. Since a = F/m, the lighter skater B (40 kg) has a greater acceleration than A (60 kg): the ratio is 60 to 40, so B accelerates 1.5 times as much as A.",
      answers: [
        [
          "full",
          "[[0|The forces are equal in size and opposite in direction.]] [[1|They act on different skaters so they don't cancel.]] [[2|a = F/m, so the lighter skater B speeds up more.]] [[3|The ratio of accelerations is 60:40, so B's acceleration is 1.5 times A's.]]",
          "Full marks. You used both laws and gave the ratio.",
        ],
        [
          "full",
          "[[0|A pushes B with force F, and B pushes A with F in the opposite direction.]] [[1|Each force acts on a different object.]] [[2|Same force on a smaller mass gives a bigger acceleration, so B moves away faster.]] [[3|a_B / a_A = 60/40 = 1.5.]]",
          "All four marks, and a precise ratio.",
        ],
        [
          "partial",
          "[[0|The forces are equal and opposite.]] [[2|The lighter skater accelerates more.]]",
          "Say why the forces do not cancel, and give the ratio of accelerations.",
        ],
        [
          "partial",
          "[[1|The forces are on different skaters.]] The heavier skater pushes harder so she accelerates more.",
          "The push is the same on each because of the third law. The lighter skater accelerates more.",
          true,
        ],
        [
          "weak",
          "A pushes harder on B because A is heavier, so B gets pushed away and A hardly moves.",
          "Third-law forces are always equal. The accelerations differ because the masses differ.",
        ],
        [
          "weak",
          "[[1|The two forces cancel each other so nobody moves.]] The third law says that.",
          "The forces act on different skaters, so they cannot cancel. Each skater feels one force and accelerates.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Gravitation and circular motion",
  note: `
## Objectives

Students will be able to:

1. use the law of gravitation to describe forces between objects at a distance and explain weight;
2. describe uniform circular motion and identify the centripetal force in a given situation.

## Materials

Rubber stoppers on strings through plastic tubes, hanging masses, stopwatches, a bucket of water for the swing demo, the practical sheet.

## Starter (6 minutes)

Swing a bucket with a little water in it in a vertical circle. Ask: "Why does the water stay in the bucket?" Take ideas and record the words forces, inward and speed.

## Main activity

1. Present F = G m1 m2 / r squared. Discuss the inverse square law: doubling the distance cuts the force to a quarter. Compare weight (mg) on Earth (60 kg student: 588 N) and on the Moon (g = 1.6 m/s2, 96 N).
2. Uniform circular motion: constant speed, changing direction, so there is an acceleration toward the center, a = v squared / r. A 1000 kg car at 20 m/s on a curve of radius 50 m has an acceleration of 8.0 m/s2 and a centripetal force of 8000 N.
3. Practical: whirl a stopper of 0.020 kg on a string of 0.80 m and compare the calculated centripetal force with the weight of the hanging mass.

## Checking for understanding

Ask: "When a car goes around a bend, what provides the centripetal force?" Look for friction.

## Worksheet and practical write-up

Gravitation calculations, circular motion and the lab report.
`,
  reading: [
    "Gravity at a distance, and why things go in circles",
    `
Isaac Newton realized that the force that pulls an apple to the ground is the same one that keeps the Moon in orbit. The **law of universal gravitation** says that every pair of objects attracts each other with a force F = G m1 m2 / r squared, where m1 and m2 are the masses, r is the distance between their centers, and G is a very small constant, 6.67 times 10 to the power of -11 in SI units. The force is proportional to each mass and falls off with the square of the distance. If you double the distance, the force is one quarter as large. If you triple it, the force is one ninth.

Your **weight** is the gravitational force that a planet exerts on you. Near the surface it equals mg, where g is the field strength of the planet: 9.8 N/kg on Earth, and about 1.6 N/kg on the Moon. A 60 kg student weighs 588 N on Earth and 96 N on the Moon. The mass is still 60 kg. Mass is the amount of matter and is the same everywhere. Weight is a force and changes with the planet.

In **uniform circular motion**, an object moves around a circle at constant speed. Its velocity is always changing because the direction changes, so it is accelerating, even though the speed is constant. The acceleration points toward the center and is a = v squared / r. By Newton's second law, there must be a net force toward the center, called the **centripetal force**: F = m v squared / r. The word does not name a new type of force. It describes the role played by some other force. For a car turning, it is the friction between the tires and the road. For the Moon, it is gravity. For a stone whirled on a string, it is the tension.

For a 1000 kg car going around a curve of radius 50 m at 20 m/s, the acceleration is 400 divided by 50, which is 8.0 m/s2, and the centripetal force is 8000 N. If the road is icy and friction cannot supply that much, the car goes straight, tangent to the circle, as Newton's first law predicts. No outward force pushes the car. The sensation of being thrown outward is your body's inertia, trying to continue in a straight line.
`,
  ],
  cards: [
    ["Law of universal gravitation", "Every two masses attract with a force proportional to the product of the masses and inversely to the square of their distance."],
    ["Inverse square law", "A relationship in which doubling the distance cuts the force to a quarter."],
    ["Weight", "The gravitational force on an object; W = mg."],
    ["Mass", "The amount of matter in an object, the same everywhere."],
    ["Centripetal force", "The net force toward the center that keeps an object in circular motion."],
    ["Centripetal acceleration", "The acceleration toward the center, a = v^2 / r."],
    ["Uniform circular motion", "Motion in a circle at constant speed."],
    ["Tangent", "A straight line that touches a circle at one point, the direction of motion if the force stops."],
  ],
  closed: [
    [
      "If the distance between two masses is doubled, the gravitational force between them becomes:",
      ["Half", "A quarter", "Double", "The same"],
      "B",
    ],
    [
      "A 60 kg student travels to the Moon, where g = 1.6 N/kg. Her mass is:",
      ["10 kg", "60 kg", "96 kg", "588 kg"],
      "B",
    ],
    [
      "A 1000 kg car goes around a curve of radius 50 m at 20 m/s. What is the centripetal force?",
      ["400 N", "2000 N", "8000 N", "20,000 N"],
      "C",
    ],
    [
      "In uniform circular motion, the acceleration is directed:",
      ["Along the velocity", "Toward the center of the circle", "Away from the center", "Zero"],
      "B",
    ],
    [
      "What provides the centripetal force on a car turning on a flat road?",
      ["Gravity", "The normal force", "Friction between the tires and road", "The engine"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A 60 kg student stands on the Earth, where g = 9.8 N/kg, and on the Moon, where g = 1.6 N/kg. Find the student's mass and weight in each place and explain the difference between mass and weight.",
      scheme: [
        "States the mass is 60 kg in both places",
        "Calculates the weight on Earth as 588 N",
        "Calculates the weight on the Moon as 96 N",
        "Explains that mass is the amount of matter while weight is the gravitational force, which depends on the planet",
      ],
      model:
        "The student's mass is 60 kg on both the Earth and the Moon. The weight on Earth is 60 times 9.8 = 588 N and on the Moon is 60 times 1.6 = 96 N. Mass is the amount of matter, which does not change, while weight is the gravitational force and depends on the field strength of the planet.",
      answers: [
        [
          "full",
          "[[0|Mass is 60 kg everywhere.]] [[1|On Earth weight = 60 × 9.8 = 588 N.]] [[2|On the Moon weight = 60 × 1.6 = 96 N.]] [[3|Mass is how much matter there is and weight is the pull of gravity, which changes with the planet.]]",
          "Full marks. The difference between the two is stated clearly.",
        ],
        [
          "full",
          "[[0|Her mass doesn't change, 60 kg on both.]] [[1|Earth: W = mg = 588 N.]] [[2|Moon: W = 96 N, which is about one sixth.]] [[3|Weight is a force that depends on g, while mass is a property of the student.]]",
          "All four marks, with a good comparison.",
        ],
        [
          "partial",
          "[[1|On Earth she weighs 588 N.]] [[2|On the Moon she weighs 96 N.]] Her mass on the Moon is 10 kg.",
          "Mass does not change with location. It is 60 kg on the Moon too, and weight is the quantity that changes.",
        ],
        [
          "partial",
          "[[0|Mass is 60 kg in both places.]] [[3|Weight changes because gravity is different.]]",
          "Good explanation. Calculate the weights in newtons for both places.",
          true,
        ],
        [
          "weak",
          "On the Moon she would have 96 kg and on the Earth 588 kg. Mass and weight are the same thing.",
          "Mass is in kilograms and weight is a force in newtons. Mass stays 60 kg while weight changes.",
        ],
        [
          "weak",
          "[[1|On Earth the weight is 588 N.]] On the Moon there's no gravity so she weighs 0 N.",
          "The Moon has gravity, about one sixth of Earth's. The weight there is 60 × 1.6 = 96 N.",
        ],
      ],
    },
    {
      prompt:
        "A 1000 kg car rounds a flat curve of radius 50 m at 20 m/s. Calculate the centripetal acceleration and force, say what provides the force, and describe what happens if the road is icy.",
      scheme: [
        "Calculates the centripetal acceleration as 8.0 m/s2",
        "Calculates the centripetal force as 8000 N",
        "Identifies friction between tires and road as the source of the force",
        "Explains that on ice there is not enough friction, so the car continues in a straight line (Newton's first law)",
      ],
      model:
        "The acceleration is v squared over r, which is 400 divided by 50, or 8.0 m/s2. The centripetal force is 1000 times 8.0 = 8000 N. It is provided by friction between the tires and the road. On ice, friction cannot supply 8000 N, so the car goes straight along the tangent, as Newton's first law predicts.",
      answers: [
        [
          "full",
          "[[0|a = v²/r = 400/50 = 8.0 m/s².]] [[1|F = ma = 1000 × 8.0 = 8000 N.]] [[2|The force comes from friction between the tires and the road.]] [[3|On ice there isn't enough friction, so the car goes straight, which is Newton's first law.]]",
          "Full marks. Explaining the icy road with the first law avoids the idea of an outward force.",
        ],
        [
          "full",
          "[[0|Centripetal acceleration is 8.0 m/s² toward the center.]] [[1|The net force toward the center is 8000 N.]] [[2|Static friction on the tires provides it.]] [[3|If the road is icy the friction is too low, so the car keeps going in a straight line instead of turning.]]",
          "All four marks, in plain words.",
        ],
        [
          "partial",
          "[[0|a = 8.0 m/s².]] [[2|Friction provides the force.]] On ice the car gets thrown outward by centrifugal force.",
          "No outward force acts on the car. It moves in a straight line because the inward force is too small.",
        ],
        [
          "partial",
          "[[1|The force is 8000 N]] and [[3|on ice the car goes straight]].",
          "Good. Show the acceleration calculation and say what provides the 8000 N.",
          true,
        ],
        [
          "weak",
          "The acceleration is zero because the speed is constant, so there is no force.",
          "The velocity changes direction, so the car accelerates toward the center. The centripetal force is 8000 N.",
        ],
        [
          "weak",
          "[[2|Friction is the force.]] The force is 20 × 50 = 1000 N and the acceleration is 1 m/s².",
          "Use a = v squared divided by r. Friction is the right source, but 400 divided by 50 gives 8.0 m/s2.",
        ],
      ],
    },
  ],
  practical: {
    title: "Centripetal force on a whirled stopper",
    instructions:
      "Pass a string through a plastic tube and tie a rubber stopper of mass 0.020 kg to one end and a 0.100 kg hanging mass to the other. Whirl the stopper in a horizontal circle of radius 0.80 m so that the hanging mass stays still. Time 10 revolutions, calculate the speed and centripetal force, and compare it with the weight of the hanging mass.",
    steps: [
      ["Measure the mass of the stopper and of the hanging weight."],
      ["Set the radius at 0.80 m by placing a marker on the string just below the tube."],
      ["Whirl the stopper so the marker stays at the bottom of the tube. Time 10 revolutions with a partner.", "Wear goggles and keep other people well away from the circle."],
      ["Repeat the timing three times and take the mean period."],
      ["Calculate v = 2πr/T and F = mv²/r."],
      ["Compare F with the weight of the hanging mass, mg, and explain any difference."],
    ],
    rubric: [
      ["Method and safety: controlled radius, repeated timing", 4],
      ["Calculation: period, speed and centripetal force", 4],
      ["Conclusion: comparison with the weight and sources of error", 4],
    ],
    writeUps: [
      [
        "full",
        "Ten revolutions took 8.0 s on average, so the period was 0.80 s. The speed was 2 times pi times 0.80 divided by 0.80, which is 6.3 m/s. The centripetal force was 0.020 times 6.3 squared divided by 0.80, which is 0.99 N. The weight of the hanging mass was 0.100 times 9.8, or 0.98 N. The two agree within 1 percent, so the tension in the string supplies the centripetal force. Friction in the tube is the main error.",
        [4, 4, 4],
        "An excellent report: correct calculations, a close comparison, and a sensible source of error.",
      ],
      [
        "full",
        "We kept the radius at 0.80 m and did three timings of ten revolutions: 8.1, 7.9 and 8.0 s, so the mean period was 0.80 s. v = 2πr/T = 6.28 m/s. F = mv²/r = (0.020)(6.28²)/0.80 = 0.99 N. The weight of the 0.100 kg mass is 0.98 N, so the string tension equals the centripetal force. The results differ by about 1%, probably due to friction at the tube and our timing.",
        [4, 4, 3],
        "Very good. Say which direction the friction error would push your result for full marks in the evaluation.",
      ],
      [
        "partial",
        "We whirled the stopper and timed ten revolutions as 8.0 s. The speed was 6.3 m/s and the centripetal force was 0.99 N. The weight of the hanging mass was 0.98 N so they are about equal. I do not remember how I got the 6.3 so I cannot show the formula, and we only did one timing.",
        [2, 3, 2],
        "Show the formula for speed and repeat the timing. Your comparison is correct.",
      ],
      [
        "partial",
        "We measured the time for ten turns and found the period was 0.80 s. Then F = mv squared over r. I used v = 0.80 and got F = 0.020 × 0.64 / 0.80 = 0.016 N, which is not close to the weight of 0.98 N. I think the string must have stretched a lot during the experiment.",
        [3, 1, 1],
        "The speed is the circumference divided by the period, 2πr/T = 6.3 m/s, not the period itself. Recalculate and compare.",
      ],
      [
        "weak",
        "We spun the stopper around and it was hard to keep the marker in the same place. The hanging mass kept moving up and down. I think there was a centrifugal force pulling the stopper outward which is why the string was tight and the mass was held up.",
        [1, 0, 0],
        "There is no outward force. The string tension pulls inward. Time the revolutions and calculate F = mv squared over r.",
      ],
      [
        "weak",
        "The centripetal force is the same as the weight of the stopper, 0.020 × 9.8 = 0.20 N, because gravity is what makes things go in circles. We did not time the revolutions properly so I used the numbers from another group and I am not sure what they measured.",
        [0, 1, 1],
        "The stopper moves in a horizontal circle, so its weight is not the centripetal force. The string tension is. Use your own timing data.",
      ],
    ],
  },
};

const w7: WeekInput = {
  topic: "Momentum, collisions and designing for safety",
  note: `
## Objectives

Students will be able to:

1. use the conservation of momentum to predict the outcome of an interaction between two objects;
2. design a device that reduces the force on an object during a collision, and test it.

## Materials

Dynamics carts with Velcro, a track, eggs or mass models in zip bags, paper, foam, cardboard, straws, tape, a meter stick, the practical sheet.

## Starter (6 minutes)

Ask: "Why does a catcher pull the glove back as the ball arrives?" Take suggestions and keep them for later.

## Main activity

1. Define momentum p = mv. Show conservation with carts: a 2.0 kg cart at 3.0 m/s hits a 1.0 kg cart at rest, and they stick. Total momentum 6.0 kg m/s means a combined speed of 2.0 m/s.
2. Elastic and inelastic collisions: compare energy before and after.
3. Practical: design a container that protects a 60 g egg model dropped from 2.0 m. Use only the allowed materials. Test, redesign and record.

## Checking for understanding

Ask: "Why does an air bag reduce injury?" Look for longer time and smaller force.

## Practical write-up

Collect the design sketch, test data and evaluation.
`,
  reading: [
    "Momentum and the physics of safe landings",
    `
Newton described motion with a quantity he called the "quantity of motion," which we now call **momentum**. It is the product of an object's mass and velocity: p = mv, measured in kilogram meters per second. Like velocity, it is a vector. A 1000 kg car moving at 10 m/s has a momentum of 10,000 kg m/s, which is the same as a 10,000 kg truck moving at 1 m/s.

The key idea is the **conservation of momentum**. In a closed system, with no outside net force, the total momentum before an interaction equals the total momentum after it. Suppose a 2.0 kg cart moving at 3.0 m/s hits a 1.0 kg cart at rest, and they stick together. The total momentum before is 2.0 times 3.0 plus 0, which is 6.0 kg m/s. After the collision the combined mass is 3.0 kg, so 3.0 v = 6.0 and v = 2.0 m/s. A collision in which objects stick together is perfectly inelastic. Kinetic energy is not conserved. Before, it was 1/2 times 2.0 times 9.0, which is 9.0 J. After, it is 1/2 times 3.0 times 4.0, or 6.0 J. The missing 3.0 J went into deformation, sound and heat. In an **elastic** collision, such as billiard balls, both momentum and kinetic energy are conserved.

Now think about safety. The force on an object during a collision is linked to how quickly its momentum changes: F = change in momentum divided by time. If the momentum has to drop to zero, the change is fixed, so the only way to reduce the force is to increase the time over which it happens. This is why a catcher pulls the glove back, why gymnastics mats are soft, why cars have crumple zones and air bags, and why you bend your knees on landing. Stopping in 0.10 s instead of 0.010 s reduces the force by a factor of ten.

To design a protective device, first define the problem: a 60 g egg model dropped from 2.0 m reaches about 6.3 m/s, so its momentum is 0.38 kg m/s. Second, choose materials that deform and so extend the stopping time, such as foam, straws or paper structures. Third, test, measure and improve. A good test records the result, such as whether the egg survived, the height used, and the change you made between trials.
`,
  ],
  cards: [
    ["Momentum", "The product of mass and velocity, p = mv."],
    ["Conservation of momentum", "In a closed system, total momentum stays constant."],
    ["Elastic collision", "A collision in which kinetic energy is conserved."],
    ["Inelastic collision", "A collision in which kinetic energy is not conserved."],
    ["Perfectly inelastic collision", "A collision in which objects stick together."],
    ["Crumple zone", "A part of a car designed to deform and lengthen the time of a collision."],
    ["Closed system", "A group of objects with no net outside force acting on it."],
    ["Safety design", "Increasing collision time to reduce the force on an object."],
  ],
  closed: [
    [
      "A 2.0 kg cart at 3.0 m/s sticks to a 1.0 kg cart at rest. What is their speed afterward?",
      ["1.0 m/s", "2.0 m/s", "3.0 m/s", "6.0 m/s"],
      "B",
    ],
    [
      "What is the momentum of a 1000 kg car traveling at 10 m/s?",
      ["100 kg m/s", "1000 kg m/s", "10,000 kg m/s", "100,000 kg m/s"],
      "C",
    ],
    [
      "An air bag reduces injury mainly because it:",
      ["Reduces the momentum change", "Increases the time of the stop, reducing the force", "Makes the car heavier", "Increases the speed of the stop"],
      "B",
    ],
    [
      "Two carts collide and stick. Which quantity is conserved?",
      ["Kinetic energy", "Momentum", "Speed", "Both kinetic energy and momentum"],
      "B",
    ],
    [
      "A 60 g egg model is dropped from 2.0 m and reaches the floor at about 6.3 m/s. Its momentum is closest to:",
      ["0.06 kg m/s", "0.38 kg m/s", "3.8 kg m/s", "380 kg m/s"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A 1500 kg car moving at 12 m/s hits a stationary 1000 kg car, and they lock together. Find their speed just after the collision, and show that kinetic energy is not conserved.",
      scheme: [
        "Calculates the initial momentum as 18,000 kg m/s",
        "Calculates the final speed as 7.2 m/s using the combined mass of 2500 kg",
        "Calculates the initial kinetic energy as 108,000 J",
        "Calculates the final kinetic energy as 64,800 J and concludes it is not conserved",
      ],
      model:
        "The momentum before is 1500 times 12 = 18,000 kg m/s. After the collision the combined mass is 2500 kg, so v = 18,000 divided by 2500 = 7.2 m/s. The initial kinetic energy is 1/2 times 1500 times 144 = 108,000 J and the final is 1/2 times 2500 times 51.84 = 64,800 J, so kinetic energy is lost.",
      answers: [
        [
          "full",
          "[[0|p before = 1500 × 12 = 18,000 kg·m/s.]] [[1|After: 2500 v = 18,000 so v = 7.2 m/s.]] [[2|KE before = ½(1500)(12²) = 108,000 J.]] [[3|KE after = ½(2500)(7.2²) = 64,800 J, which is less, so the energy was not conserved.]]",
          "Full marks. The energy lost went into deformation, sound and heat.",
        ],
        [
          "full",
          "[[0|Momentum is conserved: 1500 × 12 = 18,000.]] [[1|The combined mass is 2500 kg so the speed is 18,000/2500 = 7.2 m/s.]] [[2|The initial kinetic energy is 108 kJ.]] [[3|The final is 64.8 kJ. Since they are different, kinetic energy was not conserved.]]",
          "All four marks, with a good check on the energy.",
        ],
        [
          "partial",
          "[[0|The momentum is 18,000.]] [[1|Dividing by 2500 gives 7.2 m/s.]] The kinetic energy is conserved because the mass is the same.",
          "Momentum is conserved, but kinetic energy is not in a collision where cars lock together. Compare 108,000 J with 64,800 J.",
        ],
        [
          "partial",
          "[[2|The initial KE is 108,000 J]] and [[3|the final is 64,800 J]].",
          "Good. Calculate the speed using conservation of momentum first, since the final energy depends on it.",
          true,
        ],
        [
          "weak",
          "The speed after is 12 m/s because the first car keeps its speed and pushes the other.",
          "The two cars move together with a smaller speed. Use conservation of momentum with the total mass.",
        ],
        [
          "weak",
          "[[0|The momentum is 18,000.]] After the collision it's 18,000 × 2500 = 45,000,000 so v = 45 million m/s.",
          "To find the speed, divide the momentum by the combined mass: 18,000 divided by 2500.",
        ],
      ],
    },
    {
      prompt:
        "Explain, using F = Δp/Δt, why a crumple zone and an air bag reduce the force on a driver in a crash, and compare the force when a 70 kg driver traveling at 15 m/s stops in 0.10 s and in 0.50 s.",
      scheme: [
        "Calculates the momentum change as 70 x 15 = 1050 kg m/s",
        "Calculates the force as 10,500 N for a 0.10 s stop",
        "Calculates the force as 2100 N for a 0.50 s stop",
        "Explains that the momentum change is fixed, so a longer stopping time gives a smaller force",
      ],
      model:
        "The driver's momentum change is 70 times 15 = 1050 kg m/s whichever way they stop. If the stop takes 0.10 s the force is 1050 / 0.10 = 10,500 N. If it takes 0.50 s the force is 1050 / 0.50 = 2100 N. The change in momentum is fixed, so a crumple zone and air bag that lengthen the time reduce the force.",
      answers: [
        [
          "full",
          "[[0|Δp = 70 × 15 = 1050 kg·m/s.]] [[1|With 0.10 s, F = 1050/0.10 = 10,500 N.]] [[2|With 0.50 s, F = 1050/0.50 = 2100 N.]] [[3|The momentum change is the same, so taking longer to stop makes the force smaller. That's what air bags and crumple zones do.]]",
          "Full marks. The five-fold reduction in force is a strong result.",
        ],
        [
          "full",
          "[[0|The driver's momentum goes from 1050 to 0.]] [[1|Hard stop: F = 10,500 N in 0.10 s.]] [[2|Soft stop: F = 2100 N in 0.50 s.]] [[3|Since F = Δp/Δt and Δp can't change, a bigger Δt gives a smaller force.]]",
          "All four marks, in the right order.",
        ],
        [
          "partial",
          "[[0|1050 kg·m/s is the momentum change.]] [[1|0.10 s gives 10,500 N.]] The air bag makes the stop quicker.",
          "An air bag makes the stop slower, which is what reduces the force. Calculate the force for 0.50 s too.",
        ],
        [
          "partial",
          "[[2|A 0.50 s stop gives 2100 N.]] [[3|A longer time means a smaller force.]]",
          "Good. Show the momentum change and the force for the 0.10 s stop so we can see the comparison.",
          true,
        ],
        [
          "weak",
          "The force is 70 × 15 = 1050 N in both cases because the mass and speed are the same.",
          "The momentum change is the same, but the force depends on how long the stop takes. Divide by the time.",
        ],
        [
          "weak",
          "[[3|A longer stop means a smaller force.]] That is because the air bag is soft, so it absorbs the energy and the momentum disappears.",
          "Momentum does not disappear; it goes to zero for the driver because of the force over time. The soft bag makes the time longer.",
        ],
      ],
    },
  ],
  practical: {
    title: "Designing a protective egg container",
    instructions:
      "Using only paper, straws, cardboard, foam and tape, with a total mass of no more than 80 g, build a container for a 60 g egg model. Drop it from 2.0 m, record whether the egg survives, and improve the design over three trials. Explain the result using momentum, time and force.",
    steps: [
      ["Define the problem: protect a 60 g egg model dropped from 2.0 m, with a container of 80 g or less."],
      ["Sketch your design and label the parts that will deform to lengthen the stopping time."],
      ["Build the container and measure its total mass on the balance."],
      ["Drop it from 2.0 m onto the floor mat and record whether the egg model survived and how much the container deformed.", "Stand clear of the drop zone and keep eyes away from the container."],
      ["Change one feature, rebuild, and test again. Repeat for three trials."],
      ["Write an evaluation using F = Δp/Δt to explain which feature made the biggest difference."],
    ],
    rubric: [
      ["Design and method: sketch, mass, controlled drop height", 4],
      ["Testing: three trials with results and changes recorded", 4],
      ["Evaluation: uses momentum, time and force with evidence", 4],
    ],
    writeUps: [
      [
        "full",
        "Our first container was a paper box with straws as springs and had a mass of 72 g. The egg model cracked on trial one, survived trial two after we lengthened the straws from 3 cm to 6 cm, and survived trial three with a foam pad added. The egg reaches the floor at 6.3 m/s, so its momentum is 0.38 kg m/s. Straws that crush over 6 cm take longer to stop it, and F equals the momentum change divided by the time, so the force is smaller.",
        [4, 4, 4],
        "An excellent report with a clear design, three recorded trials, and an evaluation based on F = Δp/Δt.",
      ],
      [
        "full",
        "Design: a cardboard cube holding the egg in a foam sling, with eight straws bent as crumple legs, total mass 76 g. Test 1: the legs buckled and the egg cracked. Test 2: we taped the legs in a cone and it survived. Test 3: it survived again. The impact lowers the egg's momentum from 0.38 kg m/s to zero, and the crushing legs lengthen the time, so the average force on the egg is smaller. A longer time reduces the force.",
        [4, 3, 4],
        "Very good. Include the mass for each version and the height for each test to complete the record.",
      ],
      [
        "partial",
        "We made a box out of cardboard with foam inside. The container weighed 70 g. We dropped it from 2.0 m and the egg did not break on the first try. I think the foam worked because it is soft and soft things are good for eggs. We did not do other tests because the first one worked.",
        [3, 1, 1],
        "Three trials with changes were required. Explain why soft helps, using the time of the stop and the force.",
      ],
      [
        "partial",
        "Our container was made of paper and straws and weighed 85 g, a bit over the limit. It was dropped three times and the egg broke on the second one. In the evaluation I think a larger parachute would help, because the air slows it down and the egg hits the floor slower and so the momentum is lower.",
        [2, 3, 1],
        "Check the mass limit. The ideas of lower speed and less momentum are sensible, but a parachute was not an allowed material here.",
      ],
      [
        "weak",
        "We built a container and dropped it. The egg broke. The container was too weak. Next time we should make a better one with more stuff on it. It was fun and our group worked well together on the project and the egg looked funny after the crash.",
        [1, 1, 0],
        "Describe what you built, give the mass, and explain what the crushed parts did to the time of the stop.",
      ],
      [
        "weak",
        "The egg breaks because of the momentum. To stop the egg breaking you have to take the momentum away with the container, so a very strong hard box is best. A solid box does not bend so none of the force can get in, which is why our box worked so well.",
        [1, 0, 0],
        "A hard box stops the egg quickly, so the force is large. Soft, crushable parts lengthen the time and reduce the force.",
      ],
    ],
  },
};

const w8: WeekInput = {
  topic: "Impulse and the trade of kinetic and potential energy",
  note: `
## Objectives

Students will be able to:

1. relate impulse to change in momentum and apply it to a car crash or a ball hit by a bat;
2. use a model to calculate how kinetic and potential energy trade off in a moving system.

## Materials

A force sensor or a table of force-time data, a roller-coaster track model with a marble, rulers, a stopwatch, the quiz.

## Starter (6 minutes)

Show a slow-motion video of a bat hitting a baseball. Ask: "How long is the ball in contact with the bat, and how big is the force?" Estimate together: about 0.001 s, thousands of newtons.

## Main activity

1. Define impulse J = FΔt = Δp. Work the baseball: a 0.15 kg ball changes velocity by 60 m/s in 0.0030 s, which needs 3000 N. Compare a car crash of a 1200 kg car stopping from 15 m/s in 0.10 s (180,000 N) and in 0.50 s (36,000 N).
2. Energy transfer: potential energy mgh and kinetic energy 1/2 mv squared. A 500 kg roller coaster at the top of a 20 m hill from rest reaches 19.8 m/s at the bottom. The total mechanical energy is 98,000 J.
3. Marble track: release from different heights, predict and measure the speed at the bottom.

## Checking for understanding

Ask: "At the bottom of the hill, where did the potential energy go?"

## Quiz

Five questions on impulse and energy.
`,
  reading: [
    "Impulse, and energy changing form",
    `
The force that acts on an object during a collision lasts only a short time, but it changes the object's momentum. The product of the force and the time it acts is called **impulse**: J = FΔt. The **impulse-momentum theorem** states that the impulse equals the change in momentum: FΔt = mΔv. It is Newton's second law written in a form that is useful for collisions, when the force is large and short and hard to measure directly.

Take a baseball of 0.15 kg that arrives at 30 m/s and leaves the bat at 30 m/s in the opposite direction. The change in velocity is 60 m/s, so the change in momentum is 0.15 times 60, which is 9.0 kg m/s. If the contact lasts 0.0030 s, the average force is 9.0 divided by 0.0030, which is 3000 N, about the weight of a small car. The bat's follow-through increases the contact time slightly, which increases the impulse and the speed of the ball.

In a car crash, a 1200 kg car moving at 15 m/s must lose all of its 18,000 kg m/s of momentum. If the car is stopped by a wall in 0.10 s, the average force is 180,000 N. A crumple zone that extends the time to 0.50 s reduces the force to 36,000 N. The same momentum change takes place, but the force is five times smaller.

Energy gives another way to analyze motion. **Gravitational potential energy** is mgh, the energy stored by lifting a mass m a height h. **Kinetic energy** is 1/2 mv squared, the energy of motion. In a system with only gravity doing work (friction ignored) the total mechanical energy is conserved, and energy trades between the two forms. A 500 kg roller-coaster car at the top of a 20 m hill, starting from rest, has a potential energy of 500 times 9.8 times 20, or 98,000 J. At the bottom, all of it becomes kinetic energy, so 1/2 times 500 times v squared is 98,000, giving v = 19.8 m/s. Notice that the mass cancels, so a car of any mass would reach the same speed. At the halfway height, 10 m, half of the energy is potential and half is kinetic, and the speed is 14 m/s.

Real systems lose some energy to friction and air resistance as heat, so a real coaster reaches a slightly lower speed. The total energy is still conserved, but not all of it remains mechanical.
`,
  ],
  cards: [
    ["Impulse", "The product of force and the time it acts, J = FΔt."],
    ["Impulse-momentum theorem", "The impulse on an object equals its change in momentum."],
    ["Gravitational potential energy", "The energy stored by an object's height, mgh."],
    ["Kinetic energy", "The energy of motion, 1/2 mv^2."],
    ["Mechanical energy", "The sum of kinetic and potential energy."],
    ["Conservation of energy", "Energy cannot be created or destroyed, only changed in form."],
    ["Joule (J)", "The unit of energy; one newton-meter."],
    ["Contact time", "The short time during which a collision force acts."],
  ],
  closed: [
    [
      "A 0.15 kg ball changes velocity by 60 m/s in 0.0030 s. What is the average force on it?",
      ["300 N", "3000 N", "9.0 N", "30,000 N"],
      "B",
    ],
    [
      "A 500 kg roller-coaster car at the top of a 20 m hill has what potential energy (g = 9.8 m/s2)?",
      ["10,000 J", "49,000 J", "98,000 J", "196,000 J"],
      "C",
    ],
    [
      "Ignoring friction, the speed of the car at the bottom of the 20 m hill is about:",
      ["10 m/s", "14 m/s", "19.8 m/s", "39.6 m/s"],
      "C",
    ],
    [
      "A longer stopping time for the same momentum change gives:",
      ["A larger force", "A smaller force", "The same force", "A larger impulse"],
      "B",
    ],
    [
      "A coaster car is at half the height of the first hill with no friction. Compared with the top, its total mechanical energy is:",
      ["Half", "A quarter", "The same", "Double"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A 1200 kg car traveling at 15 m/s stops in 0.50 s because of its crumple zone. Calculate the impulse and the average force. Then say what the force would be if it stopped in 0.10 s against a rigid wall.",
      scheme: [
        "Calculates the change in momentum as 18,000 kg m/s (impulse 18,000 N s)",
        "Calculates the force for 0.50 s as 36,000 N",
        "Calculates the force for 0.10 s as 180,000 N",
        "Explains that the shorter stopping time gives a larger force for the same impulse",
      ],
      model:
        "The change in momentum is 1200 times 15 = 18,000 kg m/s, so the impulse is 18,000 N s. The average force over 0.50 s is 18,000 divided by 0.50 = 36,000 N. Over 0.10 s it would be 180,000 N. The impulse is the same, so the shorter stopping time gives a force five times larger.",
      answers: [
        [
          "full",
          "[[0|Impulse = Δp = 1200 × 15 = 18,000 N·s.]] [[1|F = 18,000/0.50 = 36,000 N.]] [[2|With a rigid wall in 0.10 s, F = 18,000/0.10 = 180,000 N.]] [[3|The impulse is the same, so a shorter time means a larger force, five times as much.]]",
          "Full marks. The comparison shows the benefit of the crumple zone clearly.",
        ],
        [
          "full",
          "[[0|The momentum change is 18,000 kg·m/s, which equals the impulse.]] [[1|Over 0.50 s the force is 36,000 N.]] [[2|Over 0.10 s it'd be 180,000 N.]] [[3|Same impulse but a shorter time gives a much bigger force.]]",
          "All four marks, concise and correct.",
        ],
        [
          "partial",
          "[[0|The impulse is 18,000 N·s.]] [[1|The force is 36,000 N.]] The force with the wall is the same because the momentum is the same.",
          "The impulse is the same but the force is not. A shorter time requires a bigger force, 180,000 N.",
        ],
        [
          "partial",
          "[[2|The force with the wall is 180,000 N.]] [[3|It's larger because the time is shorter.]]",
          "Good. Also calculate the impulse and the force in the crumple-zone case.",
          true,
        ],
        [
          "weak",
          "1200 × 15 = 18,000 N for both stops because the force is mass times velocity.",
          "Mass times velocity is momentum, not force. Divide the impulse by the stopping time to get the force.",
        ],
        [
          "weak",
          "[[0|The impulse is 18,000 N·s.]] The force is 18,000 × 0.50 = 9000 N and 18,000 × 0.10 = 1800 N so the wall gives less force.",
          "You multiplied where you needed to divide: F = impulse / time. The shorter time gives the larger force.",
        ],
      ],
    },
    {
      prompt:
        "A 500 kg roller-coaster car starts from rest at the top of a 20 m hill. Ignoring friction, calculate its speed at the bottom and at the halfway height of 10 m. Explain the energy changes.",
      scheme: [
        "Calculates the potential energy at the top as 98,000 J",
        "Sets the kinetic energy at the bottom equal to this and finds a speed of 19.8 m/s",
        "Finds the speed at 10 m as about 14 m/s, where half the energy is kinetic",
        "Explains that potential energy changes into kinetic energy while the total mechanical energy stays constant (no friction)",
      ],
      model:
        "At the top, the potential energy is 500 times 9.8 times 20, which is 98,000 J. At the bottom this is all kinetic, so 1/2 times 500 times v squared = 98,000 and v = 19.8 m/s. At 10 m, half of it, 49,000 J, is kinetic, so v = 14 m/s. Potential energy changes into kinetic energy, and with no friction the total stays constant.",
      answers: [
        [
          "full",
          "[[0|PE at the top = mgh = 500(9.8)(20) = 98,000 J.]] [[1|At the bottom KE = 98,000 J, so v = √(2 × 98,000/500) = 19.8 m/s.]] [[2|At 10 m, half the energy is kinetic (49,000 J), so v = 14 m/s.]] [[3|The potential energy turns into kinetic energy and the total stays the same since there is no friction.]]",
          "Full marks. You tracked the energy at three heights.",
        ],
        [
          "full",
          "[[0|Total energy = 98,000 J.]] [[1|At the bottom all of it is KE, and ½mv² = 98,000 gives 19.8 m/s.]] [[2|At the halfway point 49,000 J is KE, so the speed is about 14 m/s.]] [[3|Energy changes form from potential to kinetic but the sum of the two doesn't change, assuming no friction.]]",
          "All four marks, with a good explanation of conservation.",
        ],
        [
          "partial",
          "[[0|PE = 98,000 J.]] [[1|The speed at the bottom is 19.8 m/s.]] At the halfway point the speed is half, 9.9 m/s.",
          "Speed is not proportional to height. At half the height, half the energy is kinetic, so the speed is about 14 m/s.",
        ],
        [
          "partial",
          "[[3|PE turns into KE.]] [[2|At the halfway height the speed is 14 m/s.]]",
          "Good. Calculate the total energy and the speed at the bottom.",
          true,
        ],
        [
          "weak",
          "The speed at the bottom is 20 m/s because the hill is 20 m high. At the halfway point it's 10 m/s.",
          "The numbers match by coincidence at the top, but speed comes from the energy: set 1/2 m v squared equal to mgh.",
        ],
        [
          "weak",
          "[[0|PE is mgh = 98,000 J.]] When the car goes down the energy is used up so there is none left at the bottom.",
          "Energy is not used up. The potential energy becomes kinetic energy as the car speeds up.",
        ],
      ],
    },
  ],
};

writeCourse("physics-grade-11.json", "Physics", "Grade 11", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
