import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Geometry, Grade 10, Quarter 1. Standards: Common Core, High School Geometry
 * (G-CO, G-GPE, G-SRT), in the school's own words. Figures are described in
 * words and coordinates so every question can be read without a diagram.
 */

const w1: WeekInput = {
  topic: "Precise definitions and transformations of the plane",
  note: `
## Objectives

Students will be able to:

1. state precise definitions of angle, circle, perpendicular lines, parallel lines and line segment;
2. describe reflections, rotations and translations as functions that send each point to a new point;
3. draw the image of a figure under a rigid motion and describe a sequence of motions that maps one figure onto another.

## Materials

Graph paper, tracing paper, rulers, protractors, a coordinate grid on the board.

## Starter (8 minutes)

Ask students to define "circle" in one sentence without using the word "round." Collect three or four definitions on the board and test each by asking for a shape that fits it but is not a circle. Use the failures to say what a definition must do: name the exact thing and nothing else.

## Main activity

1. Plot triangle ABC with A(1, 1), B(4, 1) and C(1, 3). Reflect it across the y-axis on graph paper, then on tracing paper, and have students write the rule (x, y) goes to (-x, y).
2. Do the same for a translation, (x, y) goes to (x + 4, y - 3), and a 90-degree counterclockwise rotation about the origin, (x, y) goes to (-y, x).
3. Challenge: triangle ABC has been moved to A''(-1, -3), B''(-4, -3), C''(-1, -1). In pairs, find two motions that do it, in order.

## Checking for understanding

Mini whiteboards: "Where does (3, -2) go under a reflection across the y-axis?" Look for students who change the wrong coordinate.

## Exit ticket

Rotate P(3, 2) ninety degrees counterclockwise about the origin and write the rule you used.
`,
  reading: [
    "Moving shapes without changing them",
    `
Geometry begins with careful words. A line segment is the part of a line between two endpoints, and it has a length. An angle is two rays that share an endpoint, the vertex. A circle is the set of all points in a plane that are the same distance from a given point, the center. Notice how exact that is. "A round shape" would also describe an egg, but the definition of a circle lets you test any point: measure its distance to the center and see whether it matches the radius. Two lines are parallel if they are in the same plane and never meet, and two lines are perpendicular if they meet to form a right angle of 90 degrees.

A transformation is a rule that sends each point of the plane to another point. Think of it as a function whose inputs and outputs are points. Three transformations keep a figure the same size and shape. A translation slides every point the same distance in the same direction, for example (x, y) goes to (x + 4, y - 3). A reflection flips the plane over a line. Across the y-axis, (x, y) goes to (-x, y), so (3, -2) lands on (-3, -2). A rotation turns the plane about a point. A turn of 90 degrees counterclockwise about the origin sends (x, y) to (-y, x), so (4, 1) goes to (-1, 4).

Because these three keep every length and every angle, they are called rigid motions. If you apply one rigid motion after another, the result still keeps lengths and angles. This is how we describe getting from one figure to another. Take triangle ABC with A(1, 1), B(4, 1) and C(1, 3). Reflect it across the y-axis to get (-1, 1), (-4, 1) and (-1, 3). Then translate it down 4, so each y decreases by 4, to get (-1, -3), (-4, -3) and (-1, -1). Two moves in order took the first triangle to the second one.

Be careful about order. A reflection followed by a translation does not always land in the same place as the translation followed by the reflection, so a description of a sequence needs to say which motion comes first. A dilation, which stretches a figure, is not a rigid motion: it changes lengths, and you will meet it in a few weeks.
`,
  ],
  cards: [
    ["Line segment", "The part of a line between two endpoints, with a definite length."],
    ["Angle", "Two rays with a common endpoint called the vertex."],
    ["Circle", "The set of all points in a plane at the same distance from a given point, the center."],
    ["Perpendicular lines", "Two lines that meet at a right angle, 90 degrees."],
    ["Parallel lines", "Lines in the same plane that never meet."],
    ["Rigid motion", "A transformation that keeps all lengths and angles: a translation, reflection or rotation."],
    ["Image", "The figure that results after a transformation. If A moves, its image is written A'."],
    ["Sequence of transformations", "Two or more transformations performed one after another, in a stated order."],
  ],
  closed: [
    [
      "Which is the most precise definition of perpendicular lines?",
      [
        "Two lines that cross each other",
        "Two lines in a plane that never meet",
        "Two lines that are the same distance apart everywhere",
        "Two lines that meet to form a right angle of 90 degrees",
      ],
      "D",
    ],
    [
      "Point P(3, -2) is reflected across the y-axis. What are the coordinates of its image?",
      ["(3, 2)", "(-3, -2)", "(-3, 2)", "(2, -3)"],
      "B",
    ],
    [
      "A school map places the gym at A(1, 5). A translation sends every point (x, y) to (x + 4, y - 3). Where does the gym's image land?",
      ["(5, 2)", "(-3, 8)", "(5, 8)", "(-3, 2)"],
      "A",
    ],
    [
      "A rotation of 90 degrees counterclockwise about the origin sends (x, y) to (-y, x). What is the image of (4, 1)?",
      ["(1, -4)", "(-4, -1)", "(4, -1)", "(-1, 4)"],
      "D",
    ],
    [
      "Which transformation does NOT preserve distances between points?",
      ["A reflection across the x-axis", "A rotation about the origin", "A dilation with scale factor 2", "A translation 5 units to the right"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Triangle ABC has A(1, 1), B(4, 1) and C(1, 3). Its image after two rigid motions is A''(-1, -3), B''(-4, -3) and C''(-1, -1). Describe a sequence of two rigid motions that does this, and give the coordinates after the first motion.",
      scheme: [
        "Identifies a reflection across the y-axis as the first motion",
        "Gives the coordinates after the first motion: (-1, 1), (-4, 1), (-1, 3)",
        "Identifies a translation down 4 units as the second motion",
        "Says rigid motions keep lengths and angles, so the triangle's size and shape do not change",
      ],
      model:
        "First reflect the triangle across the y-axis, so (x, y) goes to (-x, y), giving A'(-1, 1), B'(-4, 1) and C'(-1, 3). Then translate every point down 4 units, so (x, y) goes to (x, y - 4), giving A''(-1, -3), B''(-4, -3) and C''(-1, -1). Both are rigid motions, so lengths and angles do not change and the final triangle is the same size and shape as the first.",
      answers: [
        [
          "full",
          "[[0|First I reflected it across the y-axis]] so the x's flip sign. [[1|That gives A'(-1, 1), B'(-4, 1), C'(-1, 3).]] [[2|Then I translated it down 4 units]] so (-1, 1) goes to (-1, -3). Both moves are rigid motions, so [[3|the side lengths and angles stay the same and the new triangle is the same size and shape]].",
          "Full marks. You gave the middle coordinates, which makes the order of the motions easy to check.",
        ],
        [
          "full",
          "Step 1 is [[0|a reflection over the y-axis, (x, y) goes to (-x, y)]]. [[1|After it the points are (-1, 1), (-4, 1) and (-1, 3).]] Step 2 is [[2|a translation of 0 right and 4 down, (x, y) goes to (x, y - 4)]]. [[3|Reflections and translations don't change lengths or angles, so the triangle is congruent to the original.]]",
          "All four marks. Writing each step as a rule for (x, y) is exactly how a transformation is described as a function.",
        ],
        [
          "partial",
          "[[0|Reflect over the y-axis]] then [[2|slide down 4]]. The triangle stays the same.",
          "Your motions are right. Give the coordinates after the first one, and say why the triangle stays the same: rigid motions keep lengths and angles.",
        ],
        [
          "partial",
          "[[0|It's reflected over the y-axis first.]] [[1|(-1, 1), (-4, 1), (-1, 3)]]. Then it's rotated 90 degrees and moved down.",
          "The reflection and its coordinates are right. A rotation is not needed for the second step. The move from (-1, 1) to (-1, -3) is just a slide down 4.",
          true,
        ],
        [
          "weak",
          "It was reflected over the x-axis, because the y's are negative now.",
          "Reflecting over the x-axis would turn (1, 1) into (1, -1), but the first coordinate changed sign from 1 to -1 too. Check what happens to each coordinate.",
        ],
        [
          "weak",
          "It's a dilation because the triangle moved to a different spot. [[3|It stays the same shape.]]",
          "A dilation changes the size, and this triangle is the same size. It was moved with a reflection and a translation. Your last sentence is true, and it is the reason.",
        ],
      ],
    },
    {
      prompt:
        "A rotation of 90 degrees counterclockwise about the origin is the function that sends (x, y) to (-y, x). Apply it to P(3, 2) and Q(5, -1). Then show that the distance between P' and Q' is the same as the distance between P and Q.",
      scheme: [
        "States the rule (x, y) goes to (-y, x)",
        "Finds P'(-2, 3) and Q'(1, 5)",
        "Finds PQ = square root of (2 squared + 3 squared) = square root of 13",
        "Finds P'Q' = square root of 13 as well and says the distance is preserved",
      ],
      model:
        "The rule is (x, y) goes to (-y, x). P(3, 2) goes to P'(-2, 3) and Q(5, -1) goes to Q'(1, 5). PQ = square root of (5 - 3)^2 + (-1 - 2)^2 = square root of 4 + 9 = square root of 13. P'Q' = square root of (1 - (-2))^2 + (5 - 3)^2 = square root of 9 + 4 = square root of 13. The distances are equal, as they must be for a rigid motion.",
      answers: [
        [
          "full",
          "[[0|The rule swaps the coordinates and changes the sign of the new first one: (x, y) goes to (-y, x).]] [[1|P' is (-2, 3) and Q' is (1, 5).]] PQ: the changes are 2 and -3, [[2|so PQ = square root of 4 + 9 = square root of 13]]. P'Q': the changes are 3 and 2, [[3|so P'Q' = square root of 9 + 4 = square root of 13, the same, so the rotation kept the distance]].",
          "Full marks. Computing both distances separately and comparing the answers is exactly how to show a motion preserves length.",
        ],
        [
          "full",
          "Using [[0|(x, y) goes to (-y, x)]], [[1|P(3, 2) becomes (-2, 3) and Q(5, -1) becomes (1, 5)]]. Distance formula on P and Q: [[2|(5 - 3)^2 = 4 and (-1 - 2)^2 = 9, 4 + 9 = 13, square root of 13]]. On the new points: (1 + 2)^2 = 9 and (5 - 3)^2 = 4. [[3|That's 13 too, so square root of 13 both times. Distance is preserved.]]",
          "All four marks. You kept the squares and the sums separate, which keeps the distance formula tidy.",
        ],
        [
          "partial",
          "[[0|The rule is (x, y) goes to (-y, x).]] [[1|P'(-2, 3) and Q'(1, 5).]] PQ is 5 - 3 = 2 and -1 - 2 = -3, so PQ = 2 + 3 = 5.",
          "The images are right. The distance formula squares each change, adds, and then takes the square root: the square root of 4 + 9, which is square root of 13, not 5.",
        ],
        [
          "partial",
          "[[2|PQ = square root of (5 - 3)^2 + (-1 - 2)^2 = square root of 13]]. P' is (2, -3) and Q' is (-1, -5), so P'Q' is also square root of 13.",
          "Your distances are correct, but the images should be (-2, 3) and (1, 5). Use (x, y) goes to (-y, x): the new x-coordinate is the negative of the old y. Your answer would be the 90-degree turn in the other direction.",
          true,
        ],
        [
          "weak",
          "It turns the point around so P' is (-3, -2) and Q' is (-5, 1).",
          "(x, y) goes to (-x, -y) is a half turn, 180 degrees. A quarter turn counterclockwise swaps the coordinates and negates the new first one.",
        ],
        [
          "weak",
          "[[0|(x, y) goes to (-y, x)]], so the distance gets bigger because the numbers get changed.",
          "You have the rule. But rotating does not change distances, which you can check with the distance formula on the original pair and the image pair.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Congruence in terms of rigid motions",
  note: `
## Objectives

Students will be able to:

1. use rigid motions to decide whether two figures are congruent;
2. use the definition of congruence in terms of rigid motions to show that two triangles are congruent and name their corresponding parts.

## Materials

Tracing paper, a set of triangle cutouts, graph paper, whiteboards, the quiz.

## Starter (8 minutes)

Put two triangles on the board, one at the lower left and one at the upper right, and ask: "Are these the same triangle?" Let students argue it. Then hand out tracing paper and have them test it. Ask what they did with the paper: slid it, turned it, flipped it. Those are the three rigid motions.

## Main activity

1. State the definition: two figures are congruent if some sequence of rigid motions maps one exactly onto the other.
2. Work an example with coordinates: triangle ABC with A(0, 0), B(4, 0), C(0, 3) and triangle DEF with D(2, 1), E(2, 5), F(-1, 1). Find a rotation and a translation that does it.
3. Corresponding parts: write the congruence statement with letters in matching order and list the pairs of equal sides and angles. Use triangle PQR congruent to triangle STU with PQ = 3x + 2 and ST = 5x - 6, and find x.

## Checking for understanding

Ask: "If two triangles have the same three angles, are they congruent?" Have students argue with a sketch and send them to the quiz.

## Quiz

Collect the quiz in the last ten minutes.
`,
  reading: [
    "What it means for two shapes to be the same",
    `
In everyday talk, "the same shape" can mean different things. In geometry we say two figures are congruent when one can be moved exactly on top of the other. The moves we allow are the rigid motions from last week: translations, reflections and rotations, in any order. If a sequence of rigid motions maps figure A onto figure B, then A and B are congruent. Because rigid motions keep every length and every angle, congruent figures have all their matching sides equal and all their matching angles equal.

Here is a coordinate example. Triangle ABC has A(0, 0), B(4, 0) and C(0, 3). Triangle DEF has D(2, 1), E(2, 5) and F(-1, 1). Rotate ABC 90 degrees counterclockwise about the origin, using (x, y) goes to (-y, x). The points go to (0, 0), (0, 4) and (-3, 0). Now translate 2 right and 1 up: (x, y) goes to (x + 2, y + 1). The points land on (2, 1), (2, 5) and (-1, 1), which are D, E and F. Two rigid motions carried one triangle onto the other, so triangle ABC is congruent to triangle DEF.

The order of the letters in a congruence statement matters. When we write triangle ABC congruent to triangle DEF, we are saying A matches D, B matches E and C matches F. So side AB equals side DE, side BC equals side EF, and angle B equals angle E. In the example, AB = 4 and DE = 4, AC = 3 and DF = 3. If you are given that triangle PQR is congruent to triangle STU, with PQ = 3x + 2 and ST = 5x - 6, then PQ and ST are corresponding sides, so 3x + 2 = 5x - 6, which gives x = 4, and each side is 14.

What if two triangles have the same angles but you do not know the sides? Think of a small triangle with angles 40, 60 and 80 degrees, and a large one with the same angles. Rigid motions cannot make the small one bigger, so they are not congruent. They have the same shape but not the same size, and later you will call them similar. Equal angles alone are not enough to prove congruence; you need information about lengths too.
`,
  ],
  cards: [
    ["Congruent figures", "Figures for which a sequence of rigid motions maps one exactly onto the other."],
    ["Corresponding parts", "The sides and angles that match when two figures are matched up, such as AB and DE."],
    ["Congruence statement", "A statement such as triangle ABC is congruent to triangle DEF, where the letters are in matching order."],
    ["CPCTC", "Corresponding parts of congruent triangles are congruent, a reason used after proving two triangles congruent."],
    ["Rigid motion", "A translation, reflection or rotation. It keeps lengths and angles."],
    ["Image", "The result of a transformation applied to a figure."],
    ["Same shape, different size", "Figures that are similar but not congruent, such as a 3-4-5 triangle and a 6-8-10 triangle."],
    ["Order of vertices", "In a congruence statement, the first letters match, the second letters match and the third letters match."],
  ],
  closed: [
    [
      "Which statement best defines congruent figures?",
      [
        "Figures that look alike",
        "Figures with a sequence of rigid motions that maps one onto the other",
        "Figures with the same perimeter",
        "Figures with the same number of sides",
      ],
      "B",
    ],
    [
      "Triangle ABC is congruent to triangle XYZ. Which angle must equal angle B?",
      ["Angle X", "Angle C", "Angle Z", "Angle Y"],
      "D",
    ],
    [
      "Triangle PQR is congruent to triangle STU. PQ = 3x + 2 and ST = 5x - 6. What is the length of ST?",
      ["4", "26", "14", "18"],
      "C",
    ],
    [
      "A triangle with vertices (1, 2), (3, 2) and (1, 5) is reflected across the x-axis. Is the image congruent to the original?",
      [
        "Yes, because a reflection is a rigid motion and keeps lengths and angles",
        "No, because the reflection reverses the order of the vertices",
        "Yes, but only if the image is rotated back to the original position",
        "There is not enough information without the side lengths",
      ],
      "A",
    ],
    [
      "Two triangles each have angles of 40, 60 and 80 degrees. Which statement is correct?",
      [
        "They must be congruent because the angles are equal",
        "They cannot be congruent because there is no right angle",
        "They must be congruent if they are in the same plane",
        "They might not be congruent, because they could be different sizes",
      ],
      "D",
    ],
  ],
  open: [
    {
      prompt:
        "Triangle ABC has A(0, 0), B(4, 0) and C(0, 3). Triangle DEF has D(2, 1), E(2, 5) and F(-1, 1). Show with a sequence of rigid motions that the triangles are congruent. Then name two pairs of corresponding sides and say why they are equal.",
      scheme: [
        "Rotates 90 degrees counterclockwise about the origin and finds (0, 0), (0, 4), (-3, 0)",
        "Translates 2 right and 1 up to reach D, E and F",
        "Concludes that rigid motions preserve lengths and angles, so triangle ABC is congruent to triangle DEF",
        "Names corresponding sides, such as AB = DE = 4 and AC = DF = 3",
      ],
      model:
        "Rotate triangle ABC 90 degrees counterclockwise about the origin, (x, y) goes to (-y, x), giving (0, 0), (0, 4) and (-3, 0). Then translate 2 right and 1 up, (x, y) goes to (x + 2, y + 1), giving (2, 1), (2, 5) and (-1, 1), which are D, E and F. Both are rigid motions, so lengths and angles are kept and triangle ABC is congruent to triangle DEF. The corresponding sides AB and DE are both 4, and AC and DF are both 3, since congruent figures have equal corresponding sides.",
      answers: [
        [
          "full",
          "[[0|First rotate 90 degrees counterclockwise about the origin. (x, y) goes to (-y, x), so A stays (0, 0), B goes to (0, 4) and C goes to (-3, 0).]] [[1|Then translate 2 right and 1 up and you get (2, 1), (2, 5) and (-1, 1), which is D, E, F.]] [[2|Rotations and translations keep lengths and angles, so the triangles are congruent.]] [[3|AB and DE are both 4, and AC and DF are both 3.]]",
          "Full marks. You showed where each vertex lands after each motion, so the whole sequence can be checked.",
        ],
        [
          "full",
          "I turned ABC a quarter turn counterclockwise around the origin: [[0|(0, 0), (0, 4), (-3, 0)]]. [[1|Then I slid it right 2 and up 1, giving D(2, 1), E(2, 5), F(-1, 1)]]. [[2|Since both of those are rigid motions, ABC is congruent to DEF]]. [[3|The matching sides AB and DE are 4 long, and BC and EF are 5 long, because congruent triangles have equal corresponding sides]].",
          "All four marks. BC and EF are 5 each, so your second pair is also correct.",
        ],
        [
          "partial",
          "[[0|Rotate 90 degrees about the origin to get (0, 0), (0, 4), (-3, 0).]] Then [[1|translate 2 right and 1 up to get D, E, F]]. They are congruent because they look the same.",
          "Your two motions are right. The reason is not that they look the same: rigid motions keep lengths and angles. Also name two pairs of corresponding sides.",
        ],
        [
          "partial",
          "[[2|The triangles are congruent because rigid motions keep lengths and angles]]. [[3|AB equals DE and AC equals DF.]] You can reflect it to get there.",
          "Your reasoning and your side pairs are right. But a reflection would not work alone. Describe the actual sequence with coordinates: the turn then the slide.",
          true,
        ],
        [
          "weak",
          "ABC is bigger than DEF so they are not congruent.",
          "Check the lengths. AB = 4 and DE = 4, and AC = 3 and DF = 3. The two triangles are in different places, but that does not matter for congruence.",
        ],
        [
          "weak",
          "[[3|AB and DE are equal]]. I think you reflect it over the x-axis.",
          "AB and DE are equal. A reflection over the x-axis would not move B to (2, 5). Try a quarter turn about the origin, then a slide.",
        ],
      ],
    },
    {
      prompt:
        "A student says, \"These two triangles both have angles of 40, 60 and 80 degrees, so they are congruent.\" Use the definition of congruence in terms of rigid motions to explain what is wrong. Give a specific example of two triangles that show the mistake.",
      scheme: [
        "States that congruent figures are those mapped onto each other by a sequence of rigid motions",
        "Says rigid motions preserve side lengths, so congruent triangles must have the same size",
        "Gives an example, such as a 3-4-5 triangle and a 6-8-10 triangle, with the same angles but different side lengths",
        "Says the triangles are the same shape but not the same size, so no rigid motion can map one onto the other",
      ],
      model:
        "Two figures are congruent when a sequence of rigid motions maps one onto the other. Rigid motions keep side lengths, so congruent triangles must have equal corresponding sides. Equal angles do not force equal sides. A 3-4-5 right triangle and a 6-8-10 right triangle have the same angles but different side lengths, so no rigid motion can map the small one onto the large one. They are the same shape but not the same size, so they are not congruent.",
      answers: [
        [
          "full",
          "[[0|Congruent means a bunch of rigid motions can move one triangle exactly on top of the other.]] [[1|Rigid motions don't change side lengths so congruent triangles have to be the same size.]] [[2|The student's rule isn't enough. A 3-4-5 triangle and a 6-8-10 triangle have the same angles but different sides.]] [[3|They are the same shape but one is bigger so no rigid motion can make them match.]]",
          "Full marks. The 3-4-5 and 6-8-10 pair is a clean counterexample.",
        ],
        [
          "full",
          "To be congruent you need [[0|a sequence of translations, reflections and rotations that maps one onto the other]]. [[1|Those motions never stretch anything, so the sides have to match]]. Example: [[2|a triangle with sides 5, 5, 5 and angles all 60 and one with sides 10, 10, 10, also all 60]]. [[3|Same shape, different size, so you can never slide or turn the little one to fit the big one.]]",
          "All four marks. An equilateral triangle is a good counterexample since the angles are all 60.",
        ],
        [
          "partial",
          "[[0|Congruent figures can be mapped onto each other by rigid motions.]] The two triangles have the same angles but they are probably different sizes, so they aren't congruent.",
          "You have the definition and the idea. Strengthen it with a specific example and the reason: rigid motions keep side lengths, so size cannot change.",
        ],
        [
          "partial",
          "[[2|A 3-4-5 triangle and a 6-8-10 triangle have the same angles]]. [[3|They are different sizes so they can't be congruent.]]",
          "Your example is strong. Add the definition, a sequence of rigid motions, and say that rigid motions keep lengths.",
          true,
        ],
        [
          "weak",
          "They have the same angles, so they must have the same sides, because it's the same triangle.",
          "Angles alone do not decide the side lengths. Triangles can be enlarged and still keep every angle. Try drawing a 3-4-5 and a 6-8-10 triangle.",
        ],
        [
          "weak",
          "The student is right, since if the angles match you can always rotate one onto the other.",
          "Rotating does not change size. If one triangle has longer sides, no rotation, reflection or slide can make it fit exactly over the smaller one.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Why SSS, SAS and ASA work, and proofs about lines and angles",
  note: `
## Objectives

Students will be able to:

1. explain how the SSS, SAS and ASA criteria follow from the definition of congruence;
2. prove theorems about lines and angles, such as vertical angles and the angles formed by a transversal.

## Materials

Straws or strips of paper cut to set lengths, protractors, whiteboards, a two-column proof template, the quiz.

## Starter (8 minutes)

Give each pair three straws: 3, 4 and 5 inches. Ask them to make a triangle and compare with the next pair. Everyone gets the same shape. Ask: "Could you make a different triangle with these three lengths?" Use that to discuss SSS: the sides alone fix the triangle, and so the angles.

## Main activity

1. Try to build a triangle with sides of 3 and 5 inches and a 40-degree angle between them, then one with a 40-degree angle not between them. Discuss why SAS needs the included angle.
2. Prove that vertical angles are congruent, writing statements and reasons in two columns. Use linear pairs, which sum to 180 degrees.
3. Parallel lines cut by a transversal: if the alternate interior angles are (4x + 8) and (6x - 22) degrees, find x and the angle measures. Name the theorem you used.

## Checking for understanding

Cold-call: "ASA or SAS? Where is the side relative to the angles?" Students must point to the figure.

## Quiz

Collect the quiz, then hand out the differentiated worksheet.
`,
  reading: [
    "Three ways to prove triangles congruent",
    `
You could check two triangles for congruence by measuring all six parts, three sides and three angles, but that is slow. It turns out that fewer measurements are enough. If all three sides of one triangle equal all three sides of another, the triangles are congruent. This is SSS, side-side-side. The reason is physical: three side lengths can be joined into only one triangle shape, so the angles come with them. If you move one triangle by rigid motions so that a pair of equal sides coincide, the third vertices must land on the same point, and the whole triangle matches.

Two other combinations work. SAS, side-angle-side, needs two sides and the angle between them. ASA, angle-side-angle, needs two angles and the side between them. The words "between" and "included" matter. Two sides and an angle that is not between them, called SSA, can give two different triangles, so SSA is not a valid test. Neither is AAA, which gives the same shape at any size.

Facts about lines and angles are proved with the same careful style. A proof is a chain of statements, each with a reason. For example, to show that vertical angles are congruent, let two lines cross at E, making angles AEC, CEB and BED. Angles AEC and CEB form a linear pair, so their measures add to 180 degrees. Angles CEB and BED also form a linear pair, so they add to 180 degrees. Therefore m(AEC) + m(CEB) = m(CEB) + m(BED), and subtracting m(CEB) from both sides gives m(AEC) = m(BED). The vertical angles are equal, and the argument works for any two crossing lines.

When two parallel lines are crossed by a transversal, special pairs of angles appear. Alternate interior angles are on opposite sides of the transversal and between the parallel lines, and they are congruent. Corresponding angles are in the same position at each crossing, and they are congruent. Consecutive interior angles are on the same side and add to 180 degrees. You can use these facts to write equations. If the alternate interior angles are (4x + 8) and (6x - 22) degrees, then 4x + 8 = 6x - 22, so x = 15 and each angle is 68 degrees. The two lines are only parallel if these angles match, so the same facts also work in reverse to prove lines parallel.
`,
  ],
  cards: [
    ["SSS", "Three pairs of equal sides make two triangles congruent."],
    ["SAS", "Two pairs of equal sides and the equal angles between them make two triangles congruent."],
    ["ASA", "Two pairs of equal angles and the equal side between them make two triangles congruent."],
    ["Included angle", "The angle formed by two sides, between them."],
    ["Linear pair", "Two adjacent angles whose outer rays form a straight line. Their measures add to 180 degrees."],
    ["Vertical angles", "The pairs of opposite angles formed by two crossing lines. They are congruent."],
    ["Transversal", "A line that crosses two or more other lines."],
    ["Alternate interior angles", "Angles between two lines on opposite sides of a transversal. They are congruent when the lines are parallel."],
  ],
  closed: [
    [
      "Which information proves triangle ABC congruent to triangle DEF by SAS?",
      [
        "AB = DE, BC = EF and angle A = angle D",
        "Angle A = angle D, angle B = angle E and angle C = angle F",
        "AB = DE, angle B = angle E and BC = EF",
        "AB = DE, angle A = angle D and angle C = angle F",
      ],
      "C",
    ],
    [
      "Two crossing lines form vertical angles of (3x + 10) degrees and (5x - 20) degrees. What is the measure of each angle?",
      ["15", "125", "70", "55"],
      "D",
    ],
    [
      "Lines l and m are parallel and are cut by a transversal. One angle at l measures 68 degrees. What is the measure of the consecutive interior angle at m, on the same side of the transversal?",
      ["68 degrees", "112 degrees", "22 degrees", "292 degrees"],
      "B",
    ],
    [
      "Two triangles have two pairs of equal angles and the side between those angles is also equal. Which criterion proves them congruent?",
      ["SAS", "SSS", "ASA", "AAA"],
      "C",
    ],
    [
      "Why can the SSS criterion be explained with the definition of congruence?",
      [
        "If the sides match, a rigid motion can place one triangle on the other and the angles come along",
        "Because equal sides always make equal angles by coincidence",
        "Because dilations change the sides to match",
        "Because the angles of any triangle sum to 180 degrees",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Lines AB and CD cross at point E. Prove that vertical angles AEC and BED are congruent. Write your proof as statements with reasons.",
      scheme: [
        "Says angles AEC and CEB form a linear pair, so their measures add to 180 degrees",
        "Says angles CEB and BED form a linear pair, so their measures add to 180 degrees",
        "Sets the two sums equal, since both equal 180 degrees",
        "Subtracts the shared angle CEB from both sides to get angle AEC equals angle BED",
      ],
      model:
        "Angles AEC and CEB are a linear pair, so m(AEC) + m(CEB) = 180 degrees. Angles CEB and BED are a linear pair, so m(CEB) + m(BED) = 180 degrees. Both sums equal 180, so m(AEC) + m(CEB) = m(CEB) + m(BED). Subtract m(CEB) from both sides: m(AEC) = m(BED). So the vertical angles are congruent.",
      answers: [
        [
          "full",
          "1. [[0|Angle AEC and angle CEB are a linear pair so they add up to 180.]] 2. [[1|Angle CEB and angle BED are also a linear pair so they add to 180.]] 3. [[2|So AEC + CEB = CEB + BED because both are 180.]] 4. [[3|Subtract CEB from both sides and AEC = BED.]] That means the vertical angles are congruent.",
          "Full marks. Each line follows from the one before it, and you gave a reason for each.",
        ],
        [
          "full",
          "Statement: m(AEC) + m(CEB) = 180. Reason: [[0|they form a linear pair along line AB]]. Statement: m(CEB) + m(BED) = 180. Reason: [[1|linear pair along line CD]]. Then [[2|they are equal to each other, both 180, by substitution]]. [[3|Taking away m(CEB) from each side leaves m(AEC) = m(BED), by the subtraction property of equality.]]",
          "All four marks. Naming the property of equality for the last step is the kind of precision a proof needs.",
        ],
        [
          "partial",
          "[[0|AEC and CEB are a linear pair, so 180.]] [[1|CEB and BED are a linear pair so 180.]] So the angles are equal because they are opposite each other.",
          "Your first two steps are right. 'Because they are opposite' is what you are trying to prove. Set the two 180 sums equal and subtract the shared angle.",
        ],
        [
          "partial",
          "[[2|Both pairs add to 180, so AEC + CEB = CEB + BED.]] [[3|Subtract CEB and AEC = BED.]]",
          "The key steps are right. Say which angles form the linear pairs, and why each sum is 180 degrees. Every statement needs a reason.",
          true,
        ],
        [
          "weak",
          "I measured them with a protractor and they were both 50 degrees, so they're congruent.",
          "A measurement checks one drawing but does not prove the fact for every pair of crossing lines. A proof uses the linear pair facts.",
        ],
        [
          "weak",
          "[[0|Linear pair so they add to 180]]. And vertical angles are always equal so they're congruent.",
          "That vertical angles are equal is what we are trying to prove, so it cannot be a reason. Use the second linear pair as well.",
        ],
      ],
    },
    {
      prompt:
        "Parallel lines p and q are cut by a transversal t. A pair of alternate interior angles measure (4x + 8) degrees and (6x - 22) degrees. Name the theorem you use, find x, and find the measure of each angle.",
      scheme: [
        "Names the theorem: alternate interior angles are congruent when the lines are parallel",
        "Sets up the equation 4x + 8 = 6x - 22",
        "Solves to get x = 15",
        "Finds both angles are 68 degrees and checks them",
      ],
      model:
        "Since p and q are parallel, alternate interior angles are congruent, so 4x + 8 = 6x - 22. Subtract 4x and add 22: 30 = 2x, so x = 15. Then 4(15) + 8 = 68 and 6(15) - 22 = 68. Both angles are 68 degrees, which confirms they match.",
      answers: [
        [
          "full",
          "[[0|Alternate interior angles are congruent when the lines are parallel.]] [[1|So 4x + 8 = 6x - 22.]] 30 = 2x so [[2|x = 15]]. [[3|4(15) + 8 = 68 and 6(15) - 22 = 90 - 22 = 68, so both angles are 68 degrees.]]",
          "Full marks. Substituting into both expressions checks your work.",
        ],
        [
          "full",
          "The theorem is [[0|the alternate interior angles theorem: parallel lines make equal alternate interior angles]]. Equation: [[1|4x + 8 = 6x - 22]]. Move things: 8 + 22 = 6x - 4x, 30 = 2x, [[2|x = 15]]. [[3|Each angle is 68 degrees. Both expressions give 68.]]",
          "All four marks. Your steps in solving are in a sensible order and you checked both.",
        ],
        [
          "partial",
          "[[0|Alternate interior angles are congruent.]] [[1|4x + 8 = 6x - 22]] so 2x = -14 and x = -7. Angle is -20.",
          "Your theorem and equation are right. When you moved terms, 8 + 22 = 30 gives 2x = 30. A negative angle should have told you to recheck.",
        ],
        [
          "partial",
          "4x + 8 = 6x - 22, so [[2|x = 15]] and [[3|both angles are 68 degrees]].",
          "The numbers are right. Name the theorem, alternate interior angles are congruent when the lines are parallel, and say why you can set the two expressions equal.",
          true,
        ],
        [
          "weak",
          "They add to 180 because they're on a line. 4x + 8 + 6x - 22 = 180 so 10x = 194 and x = 19.4.",
          "Alternate interior angles are equal, not supplementary. Consecutive interior angles are the pair that add to 180.",
        ],
        [
          "weak",
          "[[0|Alternate interior angles are the same]]. So x = 4 + 6 = 10 and the angle is 48.",
          "You named the right idea. Set the two full expressions equal, 4x + 8 = 6x - 22, and solve for x by collecting terms.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Constructions, the triangle angle sum and the midsegment",
  note: `
## Objectives

Students will be able to:

1. make formal constructions with a compass and straightedge and explain why they work;
2. prove theorems about triangles, including the angle sum and the midsegment theorem.

## Materials

Compasses, straightedges, unlined paper, protractors, a document camera for demonstrations.

## Starter (8 minutes)

Ask students to find the exact middle of a segment drawn on paper using only a compass and a straightedge with no marks. Allow five minutes of trial. Show that if you draw an arc from each end with the same radius, the arcs cross at two points that lie on the perpendicular bisector.

## Main activity

1. Construct the perpendicular bisector of a segment AB, with the compass opening more than half of AB. Write the reason it works: each of the two crossing points is the same distance from A as from B.
2. Construct an angle bisector, then check the halves with a protractor.
3. Prove the triangle angle sum. Draw the line through C parallel to AB and name the alternate interior angles. Then use the angle sum to find x when the angles are 3x, 4x + 5 and 2x - 5.

## Checking for understanding

Hold up your paper: "Show me the two crossing arcs and tell me what they are equidistant from." Look for compass openings that are too small.

## Exit ticket

In triangle ABC, M and N are the midpoints of AB and AC. If BC = 18 inches, find MN and explain how you know.
`,
  reading: [
    "Constructing and proving with only a compass and straightedge",
    `
Long before there were computers, geometers drew everything with two tools: a straightedge, which draws a straight line but has no numbers on it, and a compass, which draws circles and copies lengths. A construction is only correct if you can explain why it works, so each step must be justified by a definition or a theorem.

To construct the perpendicular bisector of segment AB, set the compass wider than half of AB. Put the point at A and draw an arc above and below the segment. Keep the same opening, place the point at B and draw two more arcs that cross the first ones. Draw the line through the two places where the arcs cross. Why does it work? Each crossing point is the same distance from A as from B, because both arcs have the same radius. Points that are equally far from A and B lie on the perpendicular bisector of AB, and two points are enough to draw a line. If the opening were less than half of AB, the arcs would not meet.

The angles of every triangle add to 180 degrees. Here is why. Take triangle ABC and draw a line through C that is parallel to AB. At C there are three angles along that line: one on the left, the angle C of the triangle, and one on the right, and together they form a straight angle of 180 degrees. The left angle is equal to angle A because they are alternate interior angles between the parallel lines. The right angle is equal to angle B for the same reason. So A + C + B = 180 degrees. You can use this to find missing angles. If the angles are 3x, 4x + 5 and 2x - 5 degrees, then 9x = 180 and x = 20, so the angles are 60, 85 and 35 degrees. An exterior angle of a triangle equals the sum of the two remote interior angles: if they are 48 and 65 degrees, the exterior angle is 113 degrees.

A midsegment joins the midpoints of two sides of a triangle. The midsegment theorem says that it is parallel to the third side and half its length. If M and N are the midpoints of AB and AC and BC is 18 inches, then MN is 9 inches and MN is parallel to BC. You can use this to write equations: if MN = 2x + 1 and BC = 5x - 4, then 2(2x + 1) = 5x - 4, so x = 6, MN = 13 and BC = 26.
`,
  ],
  cards: [
    ["Straightedge", "A tool that draws straight lines. In constructions it has no measurements."],
    ["Compass", "A tool that draws circles and arcs and can copy a length."],
    ["Perpendicular bisector", "A line that cuts a segment into two equal parts at a right angle."],
    ["Angle bisector", "A ray that divides an angle into two equal angles."],
    ["Triangle angle sum theorem", "The three angles of any triangle add to 180 degrees."],
    ["Exterior angle theorem", "An exterior angle of a triangle equals the sum of the two remote interior angles."],
    ["Midsegment", "A segment joining the midpoints of two sides of a triangle."],
    ["Midsegment theorem", "A midsegment is parallel to the third side and half as long."],
  ],
  closed: [
    [
      "When you construct the perpendicular bisector of segment AB, how should the compass opening compare to the length of AB?",
      ["Exactly half of AB", "Less than half of AB", "More than half of AB", "Any size, even very small"],
      "C",
    ],
    [
      "After placing arcs on both sides of an angle from its vertex, what is the next step in bisecting the angle?",
      [
        "From each arc point, draw arcs with the same radius that cross inside the angle, then draw a ray from the vertex through the crossing",
        "Draw a line connecting the two arc points on the sides",
        "Measure the angle with a protractor and divide by 2",
        "Draw a perpendicular to one side",
      ],
      "A",
    ],
    [
      "The angles of a triangle are 3x, 4x + 5 and 2x - 5 degrees. What is the measure of the largest angle?",
      ["35 degrees", "60 degrees", "20 degrees", "85 degrees"],
      "D",
    ],
    [
      "In triangle ABC, MN is a midsegment with MN = 2x + 1 and BC = 5x - 4. What is BC?",
      ["26", "13", "52", "6"],
      "A",
    ],
    [
      "The two remote interior angles of a triangle are 48 degrees and 65 degrees. What is the exterior angle at the third vertex?",
      ["17 degrees", "67 degrees", "133 degrees", "113 degrees"],
      "D",
    ],
  ],
  open: [
    {
      prompt:
        "Describe how to construct the perpendicular bisector of segment AB with a compass and straightedge, and explain why the line you draw is the perpendicular bisector.",
      scheme: [
        "Sets the compass wider than half of AB and draws arcs above and below from A",
        "Keeps the same opening and draws arcs from B that cross the first ones",
        "Draws a line through the two crossing points",
        "Explains that each crossing point is the same distance from A as from B, so it lies on the perpendicular bisector",
      ],
      model:
        "Open the compass wider than half of AB. Put the point on A and draw an arc above and below the segment. With the same opening, put the point on B and draw arcs that cross the first two. Use the straightedge to draw the line through the two crossing points. It works because each crossing point is the same distance from A as from B, since all four arcs have the same radius, and the points equally far from A and B lie on the perpendicular bisector. Two points determine the line.",
      answers: [
        [
          "full",
          "[[0|Open the compass more than half of AB, put the point on A, and draw an arc above and below.]] [[1|Don't change the compass, move to B and draw arcs that cross the first ones.]] [[2|Use the straightedge to draw a line through the two places where the arcs cross.]] [[3|It works because each crossing point is the same distance from A and from B (the same radius), and that means it is on the perpendicular bisector.]]",
          "Full marks. Saying the opening must be more than half of AB makes it clear you know why the arcs have to cross.",
        ],
        [
          "full",
          "Steps: [[0|compass wider than half the segment, arcs above and below from point A]]. [[1|Same radius from point B, arcs cross the first arcs at two points]]. [[2|Draw the line through those two crossing points.]] Why: [[3|every crossing point is equally far from A and B because the radius is the same, so the line through them is the perpendicular bisector, which is the set of points equally far from the endpoints]].",
          "All four marks. You named the property that every point on the bisector shares.",
        ],
        [
          "partial",
          "[[0|Make the compass bigger than half of AB and draw arcs from A.]] Do the same from B. [[2|Connect where they cross.]] It's the bisector because it goes through the middle.",
          "The steps are right. 'Through the middle' is not a reason. The reason is that every point where the arcs cross is the same distance from A and from B.",
        ],
        [
          "partial",
          "[[1|Use the same size circle from B and the arcs cross the first ones.]] [[3|It works because the crossing points are the same distance from A and B.]]",
          "Your reasoning is good. Add the first step, opening the compass more than half of AB and drawing arcs from A, and the last step, drawing the line.",
          true,
        ],
        [
          "weak",
          "Use a ruler to measure AB and divide by 2 and mark it and draw a line.",
          "A construction uses only a compass and an unmarked straightedge. Measuring is not allowed. Also a mark at the middle does not give you the right angle without more steps.",
        ],
        [
          "weak",
          "[[2|Draw a line through where the circles cross]]. It's perpendicular because it looks like it.",
          "The line is right. But 'it looks like it' is not a reason. Say that the compass kept the same radius, so each crossing point is equally far from A and B.",
        ],
      ],
    },
    {
      prompt:
        "Prove that the angles of a triangle add up to 180 degrees. In triangle ABC, draw a line through C parallel to AB, and explain each step.",
      scheme: [
        "Draws a line through C parallel to AB",
        "Says the angle on one side of C equals angle A and the angle on the other side equals angle B, because they are alternate interior angles",
        "Says the three angles at C along the line form a straight angle of 180 degrees",
        "Substitutes to conclude that angle A + angle B + angle C = 180 degrees",
      ],
      model:
        "Through C draw a line parallel to AB. The two angles it makes with the sides at C, one on each side of angle C, together with angle C form a straight angle of 180 degrees. The angle on the left equals angle A, and the angle on the right equals angle B, since they are alternate interior angles for parallel lines. Substituting, angle A + angle C + angle B = 180 degrees.",
      answers: [
        [
          "full",
          "[[0|Draw a line through C that's parallel to AB.]] [[1|The angle on the left of C equals A and the one on the right equals B because alternate interior angles are congruent for parallel lines.]] [[2|Those two with angle C make a straight line, so they add to 180.]] [[3|Substituting A and B for them, A + C + B = 180.]]",
          "Full marks. The substitution at the end is the step that connects everything.",
        ],
        [
          "full",
          "Step 1: [[0|Through point C, draw line l parallel to AB]]. Step 2: [[1|alternate interior angles, so the left angle at C equals angle A and the right angle equals angle B]]. Step 3: [[2|the three angles at C sit along a straight line so the sum is 180]]. Step 4: [[3|replace the outside angles with A and B, so A + B + C = 180]].",
          "All four marks. A numbered proof like this is easy to follow and check.",
        ],
        [
          "partial",
          "[[0|Draw a line through C parallel to AB.]] [[2|The angles at C add to 180 because they're on a line.]] So the triangle's angles are 180.",
          "The line and the straight angle are right. You skipped the link: the angles on the line equal A and B because they are alternate interior angles.",
        ],
        [
          "partial",
          "[[1|Those angles equal A and B since they're alternate interior angles.]] [[3|So A + B + C = 180.]]",
          "Good link and conclusion. Say first that you drew a parallel through C, and say that the three angles at C make a straight angle of 180 degrees.",
          true,
        ],
        [
          "weak",
          "I tore the corners off a paper triangle and put them together and they made a straight line.",
          "That is a nice way to see the fact, but a proof uses facts about parallel lines to show it for every triangle, not only one.",
        ],
        [
          "weak",
          "[[2|A straight line is 180 degrees]], so the triangle is too, because it has three sides.",
          "A straight angle is 180. To use it, build a line through C parallel to AB and show how the other two angles of the triangle get to C.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Isosceles triangles, points of concurrency and parallelograms",
  note: `
## Objectives

Students will be able to:

1. prove theorems about isosceles triangles and use the points of concurrency of a triangle;
2. prove theorems about parallelograms and use them to classify quadrilaterals;
3. use coordinates and the distance formula to find side lengths and perimeters of polygons.

## Materials

Paper triangles, rulers, scissors, graph paper, whiteboards, the differentiated worksheet.

## Starter (8 minutes)

Give each pair a paper triangle. Ask them to fold it so that one vertex lands on the opposite side's midpoint and mark the crease from that vertex, the median. After folding all three, ask what they notice: the three creases pass through one point. Name it the centroid and discuss its balance.

## Main activity

1. State and prove that base angles of an isosceles triangle are congruent, by drawing the angle bisector from the vertex and using SAS.
2. Parallelograms: prove that opposite sides are congruent by drawing a diagonal and using ASA. List the other properties: opposite angles equal, diagonals bisect each other.
3. Coordinates: plot P(0, 0), Q(6, 0) and R(3, 4) and find all three side lengths with the distance formula. Classify the triangle and give its perimeter.

## Checking for understanding

Name a quadrilateral and have students list which properties are always true, sometimes true and never true for it.

## Worksheet

Hand out the worksheet and the differentiated worksheet.
`,
  reading: [
    "Special triangles, special quadrilaterals",
    `
An isosceles triangle has two congruent sides, called legs, and the third side is the base. Its base angles, the two angles opposite the legs, are congruent. One proof draws the bisector of the vertex angle. This splits the triangle into two smaller triangles that share the bisector, have equal legs and have equal vertex angle halves. By SAS the two triangles are congruent, so the base angles are equal by corresponding parts. The converse is also true: if two angles of a triangle are equal, the sides opposite them are equal. If the vertex angle is 40 degrees, each base angle is (180 - 40) / 2 = 70 degrees.

Every triangle has special lines that meet at one point. The medians join a vertex to the midpoint of the opposite side, and they meet at the centroid, which is the balance point of the triangle. The centroid is two thirds of the way from each vertex to the opposite midpoint, so on a median 18 inches long it is 12 inches from the vertex. The perpendicular bisectors of the sides meet at the circumcenter, which is equally far from all three vertices, and the angle bisectors meet at the incenter, which is equally far from all three sides.

A parallelogram is a quadrilateral with both pairs of opposite sides parallel. To prove that opposite sides are congruent, draw the diagonal AC in parallelogram ABCD. The parallel sides make alternate interior angles equal at both ends of the diagonal, and the diagonal is shared, so triangle ABC is congruent to triangle CDA by ASA. By corresponding parts, AB equals CD and BC equals DA. The same pair of triangles shows opposite angles are equal, and consecutive angles add to 180 degrees, so if angle A is 65 degrees, angle B is 115 degrees. The diagonals bisect each other. A rectangle is a parallelogram with four right angles, and its diagonals are also equal. A rhombus has four equal sides and its diagonals are perpendicular.

On a coordinate grid the distance formula comes from the Pythagorean theorem. The distance between (x1, y1) and (x2, y2) is the square root of (x2 - x1)^2 + (y2 - y1)^2. From A(-2, 3) to B(4, 11), the changes are 6 and 8, so the distance is the square root of 36 + 64 = 10. For triangle PQR with P(0, 0), Q(6, 0) and R(3, 4), PQ = 6, PR = the square root of 9 + 16 = 5 and QR = the square root of 9 + 16 = 5, so the perimeter is 16 and the triangle is isosceles.
`,
  ],
  cards: [
    ["Isosceles triangle", "A triangle with at least two congruent sides. The angles opposite those sides are congruent."],
    ["Base angles", "The two angles opposite the equal sides of an isosceles triangle."],
    ["Median", "A segment from a vertex of a triangle to the midpoint of the opposite side."],
    ["Centroid", "The point where the three medians meet. It is two thirds of the way from each vertex."],
    ["Circumcenter", "The point where the perpendicular bisectors meet. It is equally far from the three vertices."],
    ["Parallelogram", "A quadrilateral with both pairs of opposite sides parallel."],
    ["Rhombus", "A parallelogram with four congruent sides. Its diagonals are perpendicular."],
    ["Distance formula", "The distance between two points is the square root of (x2 - x1)^2 + (y2 - y1)^2."],
  ],
  closed: [
    [
      "An isosceles triangle has a vertex angle of 40 degrees. What is each base angle?",
      ["40 degrees", "35 degrees", "140 degrees", "70 degrees"],
      "D",
    ],
    [
      "A median of a triangle is 18 inches long. How far is the centroid from the vertex along this median?",
      ["6 inches", "9 inches", "12 inches", "15 inches"],
      "C",
    ],
    [
      "In parallelogram ABCD, angle A measures 65 degrees. What is the measure of angle B?",
      ["115 degrees", "65 degrees", "25 degrees", "295 degrees"],
      "A",
    ],
    [
      "Which quadrilateral always has diagonals that are equal in length and bisect each other?",
      ["Rhombus", "Rectangle", "Kite", "Any parallelogram"],
      "B",
    ],
    [
      "What is the distance from A(-2, 3) to B(4, 11)?",
      ["14", "100", "8", "10"],
      "D",
    ],
  ],
  open: [
    {
      prompt:
        "Triangle PQR has P(0, 0), Q(6, 0) and R(3, 4). Use the distance formula to find the length of each side and the perimeter. Classify the triangle by its sides and say what that tells you about two of its angles.",
      scheme: [
        "Finds PQ = 6",
        "Finds PR = 5 and QR = 5 using the distance formula",
        "States the perimeter is 16 units",
        "Says the triangle is isosceles, since PR = QR, so the angles at P and Q are congruent",
      ],
      model:
        "PQ = 6 since both points are on the x-axis. PR = the square root of (3 - 0)^2 + (4 - 0)^2 = the square root of 25 = 5. QR = the square root of (3 - 6)^2 + (4 - 0)^2 = the square root of 25 = 5. The perimeter is 6 + 5 + 5 = 16 units. Since PR = QR, the triangle is isosceles, and the base angles at P and Q, opposite the equal sides, are congruent.",
      answers: [
        [
          "full",
          "[[0|PQ is just 6 because they're both on the x-axis.]] [[1|PR = square root of 3^2 + 4^2 = square root of 25 = 5, and QR = square root of (-3)^2 + 4^2 = 5 too.]] [[2|The perimeter is 6 + 5 + 5 = 16.]] [[3|Two sides are equal so it is isosceles, which means the angles at P and Q are equal.]]",
          "Full marks. Spotting that PQ is horizontal saved you the distance formula there.",
        ],
        [
          "full",
          "Side PQ: from 0 to 6 on the x-axis, [[0|length 6]]. Side PR: the changes are 3 and 4, [[1|so the distance is 5 (a 3-4-5 triangle), and QR has changes of 3 and 4 so it is also 5]]. [[2|Adding gives a perimeter of 16 units]]. [[3|PR = QR makes it isosceles, and the angles opposite the equal sides, at Q and at P, are congruent]].",
          "All four marks. Recognizing the 3-4-5 triangle is a handy shortcut.",
        ],
        [
          "partial",
          "[[0|PQ = 6]]. PR = 3 + 4 = 7 and QR = 3 + 4 = 7. Perimeter is 20. It's isosceles.",
          "The base is right, and isosceles is right for your answer, but PR is not 3 + 4. By the distance formula it is the square root of 9 + 16, which is 5.",
        ],
        [
          "partial",
          "[[1|PR = 5 and QR = 5]]. [[3|It's isosceles so the base angles are equal.]] The perimeter is 10.",
          "Your two long sides and your classification are right. Do not forget the base PQ = 6 in the perimeter: 6 + 5 + 5 = 16.",
          true,
        ],
        [
          "weak",
          "I think it's equilateral because it looks like all the sides are the same.",
          "Calculate it. PQ = 6 but PR = QR = 5, so only two sides match. It is isosceles, not equilateral.",
        ],
        [
          "weak",
          "[[0|PQ = 6]]. The distance formula is x2 - x1 + y2 - y1 so R is 3 + 4 = 7 away from P.",
          "PQ is right. The formula squares each change, adds them and takes the square root. It is not the sum of the changes.",
        ],
      ],
    },
    {
      prompt:
        "In parallelogram ABCD, draw the diagonal AC. Prove that opposite sides AB and CD are congruent. Give a reason for each step.",
      scheme: [
        "Uses AB parallel to DC and AD parallel to BC to say the alternate interior angles are congruent (BAC with DCA, and BCA with DAC)",
        "Says AC is shared by both triangles, so it is congruent to itself",
        "Concludes triangle ABC is congruent to triangle CDA by ASA",
        "Says AB equals CD because corresponding parts of congruent triangles are congruent",
      ],
      model:
        "Since AB is parallel to DC, angle BAC equals angle DCA (alternate interior angles). Since AD is parallel to BC, angle BCA equals angle DAC. Side AC is shared by both triangles. So triangle ABC is congruent to triangle CDA by ASA. Therefore AB = CD, because corresponding parts of congruent triangles are congruent.",
      answers: [
        [
          "full",
          "[[0|AB is parallel to DC and AD is parallel to BC, so the alternate interior angles are equal: angle BAC = angle DCA and angle BCA = angle DAC.]] [[1|AC is a side of both triangles, so AC = AC.]] [[2|That is ASA, so triangle ABC is congruent to triangle CDA.]] [[3|So AB = CD since corresponding parts of congruent triangles are congruent.]]",
          "Full marks. Each statement has a reason, and the shared diagonal is named.",
        ],
        [
          "full",
          "Because ABCD is a parallelogram, [[0|both pairs of opposite sides are parallel, so alternate interior angles are congruent at each end of AC]]. [[1|Diagonal AC belongs to both triangles, the reflexive property]]. [[2|Angle, side, angle, so ASA gives triangle ABC congruent to triangle CDA]]. [[3|CPCTC, so AB = CD (and BC = DA)]].",
          "All four marks. Naming the reflexive property and CPCTC is how a proof is expected to read.",
        ],
        [
          "partial",
          "[[1|AC is shared.]] [[2|Triangle ABC is congruent to triangle CDA by ASA.]] So AB equals CD.",
          "The triangles and ASA are right, but you did not say where the two pairs of angles come from. The parallel sides make alternate interior angles. Also use CPCTC.",
        ],
        [
          "partial",
          "[[0|The opposite sides are parallel so alternate interior angles are equal.]] And [[3|AB = CD by CPCTC]]. The triangles are the same.",
          "Name the two triangles and the criterion, ASA, and say that AC is shared. Without the congruence the CPCTC step has nothing to rely on.",
          true,
        ],
        [
          "weak",
          "Parallelograms have opposite sides that are equal, that is just a property. So AB = CD.",
          "That is the statement we need to prove, so it cannot be the reason. Use a diagonal to make two congruent triangles.",
        ],
        [
          "weak",
          "[[1|AC is in both triangles.]] I used SSS since there's three sides.",
          "You cannot use SSS here, because we do not yet know AB = CD, which is what we are proving. The parallel lines give the angles, so use ASA.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Slope criteria and coordinate proofs",
  note: `
## Objectives

Students will be able to:

1. use and explain the slope criteria for parallel and perpendicular lines;
2. use coordinates to prove simple geometric theorems algebraically.

## Materials

Graph paper, rulers, patty paper, whiteboards, the exit ticket.

## Starter (8 minutes)

Plot the points (2, 1), (6, 3), (3, 5). Ask students to find the slope of each pair, then say which, if any, are perpendicular. Many will guess by eye. Show that the product of the slopes is -1 for perpendicular lines, and that it is a check you can do with arithmetic.

## Main activity

1. Parallel lines have equal slopes. Write the line through (1, 5) parallel to y = 2x + 7.
2. Perpendicular lines have slopes that are negative reciprocals. Find the line through (2, -3) perpendicular to 2x - 5y = 10 by solving for y first.
3. Prove that triangle ABC with A(1, 2), B(5, 4) and C(3, 8) is a right triangle using slopes, and find its area. Then show quadrilateral with vertices (0, 0), (4, 1), (5, 5) and (1, 4) is a parallelogram.

## Checking for understanding

Exit ticket: "What is the midpoint of (-4, 7) and (6, -1)? What is the slope perpendicular to a slope of -3/4?"

## Worksheet

Collect the worksheet at the end of class.
`,
  reading: [
    "Using slopes to prove things about shapes",
    `
The slope of a line through (x1, y1) and (x2, y2) is the change in y divided by the change in x. Two facts about slopes let us prove geometric statements with algebra. First, two nonvertical lines are parallel exactly when their slopes are equal. Second, two nonvertical lines are perpendicular exactly when the product of their slopes is -1, which means each slope is the negative reciprocal of the other. The slopes 2 and -1/2 are perpendicular, and so are -3/4 and 4/3.

Why does this work? Draw a right triangle that shows a slope of 2 as a rise of 2 over a run of 1. Rotate it a quarter turn about its corner. The rise and run swap, and one of them changes direction, so the rise is now 1 and the run is -2, which gives a slope of -1/2. The rotation took a line to a perpendicular line, so the slopes have to be related that way. And two lines with the same slope are translations of each other, so they never meet.

You can use these facts to write equations. The line through (1, 5) parallel to y = 2x + 7 has slope 2, so y - 5 = 2(x - 1), which is y = 2x + 3. For the line through (2, -3) perpendicular to 2x - 5y = 10, solve the given line for y: -5y = -2x + 10, so y = (2/5)x - 2 and the slope is 2/5. The perpendicular slope is -5/2. Using the point, -3 = -5/2(2) + b, so b = 2, and the line is y = -5/2 x + 2.

A coordinate proof uses numbers in place of a picture. To show that triangle ABC with A(1, 2), B(5, 4) and C(3, 8) is a right triangle, find the slopes. Side AB has slope (4 - 2)/(5 - 1) = 1/2. Side BC has slope (8 - 4)/(3 - 5) = -2. The product is -1, so AB is perpendicular to BC, and the right angle is at B. Both legs have length the square root of 20, so the area is half of 20, which is 10 square units. To show that a quadrilateral is a parallelogram, show that both pairs of opposite sides have equal slopes. The midpoint of a segment from (x1, y1) to (x2, y2) is the average of the coordinates: for (-4, 7) and (6, -1) it is (1, 3). If a quadrilateral's diagonals share a midpoint, it is a parallelogram.
`,
  ],
  cards: [
    ["Slope", "The change in y divided by the change in x between two points on a line."],
    ["Parallel slopes", "Two nonvertical lines are parallel when they have the same slope."],
    ["Perpendicular slopes", "Two nonvertical lines are perpendicular when their slopes are negative reciprocals, with product -1."],
    ["Negative reciprocal", "The opposite sign and flipped fraction. The negative reciprocal of -3/4 is 4/3."],
    ["Midpoint formula", "The midpoint of two points has coordinates that are the averages of the endpoints' coordinates."],
    ["Coordinate proof", "A proof that places a figure on a grid and uses algebra, such as slopes and distances, to show a fact."],
    ["Point-slope form", "y - y1 = m(x - x1), the line with slope m through the point (x1, y1)."],
    ["Standard form", "Ax + By = C. Solve for y to read the slope."],
  ],
  closed: [
    [
      "Which line is parallel to y = 2x + 7 and passes through (1, 5)?",
      ["y = 2x + 3", "y = -1/2 x + 5.5", "y = 2x + 5", "y = -2x + 7"],
      "A",
    ],
    [
      "What is the slope of a line perpendicular to a line with slope -3/4?",
      ["-4/3", "3/4", "4/3", "-3/4"],
      "C",
    ],
    [
      "Lines 3x + 2y = 6 and 2x - 3y = 12 are graphed. What is true about them?",
      [
        "They are parallel because both have coefficients of 2 and 3",
        "They are the same line",
        "They are neither parallel nor perpendicular",
        "They are perpendicular, because the slopes -3/2 and 2/3 multiply to -1",
      ],
      "D",
    ],
    [
      "What is the midpoint of the segment from (-4, 7) to (6, -1)?",
      ["(5, 4)", "(1, 3)", "(2, 6)", "(-1, -3)"],
      "B",
    ],
    [
      "Quadrilateral ABCD has A(0, 0), B(4, 1), C(5, 5) and D(1, 4). Which evidence shows it is a parallelogram?",
      [
        "Both pairs of opposite sides have equal slopes",
        "Its diagonals have the same slope",
        "Its sides all have positive slopes",
        "Two of its sides have slope 4",
      ],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Triangle ABC has vertices A(1, 2), B(5, 4) and C(3, 8). Use slopes to prove that it has a right angle, say at which vertex, and then find its area.",
      scheme: [
        "Finds the slope of AB as 1/2",
        "Finds the slope of BC as -2",
        "Says the product of the slopes is -1, so AB is perpendicular to BC and the right angle is at B",
        "Finds the area is 10 square units, using legs of length the square root of 20",
      ],
      model:
        "The slope of AB is (4 - 2)/(5 - 1) = 1/2. The slope of BC is (8 - 4)/(3 - 5) = 4/(-2) = -2. The product is (1/2)(-2) = -1, so AB is perpendicular to BC and the right angle is at B. AB = the square root of (4^2 + 2^2) = the square root of 20, and BC = the square root of ((-2)^2 + 4^2) = the square root of 20. The area is (1/2)(the square root of 20)(the square root of 20) = (1/2)(20) = 10 square units.",
      answers: [
        [
          "full",
          "[[0|Slope of AB is (4 - 2)/(5 - 1) = 2/4 = 1/2.]] [[1|Slope of BC is (8 - 4)/(3 - 5) = 4/-2 = -2.]] [[2|1/2 times -2 is -1, so the sides are perpendicular, meaning a right angle at B.]] [[3|Both legs are the square root of 20, so the area is half of 20, which is 10.]]",
          "Full marks. The area step uses the two legs as base and height, which is the right idea for a right triangle.",
        ],
        [
          "full",
          "To check the sides at B: [[0|m(AB) = 2/4 = 0.5]] and [[1|m(BC) = 4/(-2) = -2]]. [[2|0.5 x -2 = -1 so they're negative reciprocals, which makes AB perpendicular to BC. The right angle is at B.]] Legs: AB = square root of 16 + 4 = square root of 20, BC = square root of 4 + 16 = square root of 20. [[3|Area = (1/2)(square root 20)(square root 20) = 10 square units.]]",
          "All four marks. Showing the legs as square roots then multiplying to a whole number is neat.",
        ],
        [
          "partial",
          "[[0|Slope AB = 1/2.]] [[1|Slope BC = -2.]] These are different so there's no right angle.",
          "Both slopes are right. Different slopes only tell you the sides are not parallel. Multiply them: 1/2 times -2 is -1, so they are perpendicular.",
        ],
        [
          "partial",
          "[[2|AB and BC have slopes that multiply to -1 so the right angle is at B.]] [[3|The area is 10.]]",
          "Your conclusion and area are right. Show the slope calculations, (4 - 2)/(5 - 1) and (8 - 4)/(3 - 5), and the legs that give the area.",
          true,
        ],
        [
          "weak",
          "AB has slope 4/2 = 2 and BC has slope -4/2 = -2. They're opposites so they're perpendicular.",
          "Slope is rise over run, so AB is 2 over 4, not 4 over 2. And perpendicular slopes are negative reciprocals, not opposites.",
        ],
        [
          "weak",
          "[[1|BC has a slope of -2.]] The angle at C is the right angle because it is the top point.",
          "BC's slope is right. A right angle is found by perpendicular sides, not by position. Find the slope of AB and multiply.",
        ],
      ],
    },
    {
      prompt:
        "Find the equation of the line through (2, -3) that is perpendicular to the line 2x - 5y = 10. Show how you find the slope of the given line and how you use it.",
      scheme: [
        "Solves 2x - 5y = 10 for y to find the slope 2/5",
        "Says the perpendicular slope is the negative reciprocal, -5/2",
        "Substitutes the point (2, -3) to find the intercept b = 2",
        "Writes the equation y = -5/2 x + 2",
      ],
      model:
        "Solve for y: -5y = -2x + 10, so y = (2/5)x - 2, and the slope is 2/5. The perpendicular slope is the negative reciprocal, -5/2. Use the point (2, -3): -3 = (-5/2)(2) + b, so -3 = -5 + b and b = 2. The equation is y = -5/2 x + 2.",
      answers: [
        [
          "full",
          "[[0|Subtract 2x: -5y = -2x + 10, then divide by -5 so y = (2/5)x - 2 and the slope is 2/5.]] [[1|The perpendicular slope flips it and changes the sign, -5/2.]] [[2|Plug in (2, -3): -3 = -5/2(2) + b so -3 = -5 + b and b = 2.]] [[3|y = -5/2 x + 2.]]",
          "Full marks. You divided each term by -5, which is where many students slip.",
        ],
        [
          "full",
          "Given line: 2x - 5y = 10 so [[0|-5y = -2x + 10, y = 2/5 x - 2, slope 2/5]]. [[1|Negative reciprocal is -5/2.]] Using point-slope: y + 3 = -5/2 (x - 2), so y = -5/2 x + 5 - 3, [[2|which has an intercept of 2]]. [[3|The line is y = -5/2 x + 2.]]",
          "All four marks. Point-slope form got you to the same intercept.",
        ],
        [
          "partial",
          "[[0|The slope of the line is 2/5.]] [[1|The perpendicular slope is -5/2.]] So the equation is y = -5/2 x - 3.",
          "Both slopes are right. The -3 is the y-coordinate of the point, not the intercept. Substitute (2, -3): -3 = -5 + b, so b = 2.",
        ],
        [
          "partial",
          "[[2|-3 = -5/2(2) + b so b = 2.]] [[3|y = -5/2 x + 2]]",
          "Your line is correct. Show how you got the slope of the original line, 2/5, by solving for y, and say why -5/2 is perpendicular.",
          true,
        ],
        [
          "weak",
          "The slope is 2 because of the 2x, and the perpendicular is -2, so y = -2x - 3.",
          "The slope is not the coefficient of x in standard form. Solve for y first, which gives 2/5. And perpendicular means negative reciprocal, not just the opposite sign.",
        ],
        [
          "weak",
          "[[1|The perpendicular slope is -5/2]] and I put the point in backwards, so -2 = -5/2(3) + b and the line is y = -5/2 x + 5.5.",
          "The slope is right. The point is (2, -3), so x is 2 and y is -3, not the other way round. Substitute that way and b comes out as 2.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Dilations and similarity transformations",
  note: `
## Objectives

Students will be able to:

1. verify the effects of a dilation on lines and segments;
2. use similarity transformations to decide whether two figures are similar.

## Materials

Graph paper, rulers, string and a marker for a stretched-string dilation, whiteboards, the differentiated worksheet.

## Starter (8 minutes)

Project a small photo and then a poster-size version of the same picture. Ask: "What stayed the same and what changed?" Record angles and shapes on one side and lengths on the other. Name the transformation: a dilation.

## Main activity

1. Define a dilation with center O and scale factor k: every point moves to a point on the ray from O, k times as far. Practice with center the origin: (x, y) goes to (kx, ky).
2. Dilate triangle A(2, 2), B(6, 2), C(2, 5) by a factor of 1.5 about the origin. Compute the images and compare side lengths and slopes before and after.
3. A dilation changes a line that does not pass through the center into a parallel line, and a line through the center maps to itself. Check this with slopes.
4. Define similar: a dilation followed by rigid motions. Decide if rectangles of 4 by 6 and 6 by 9 are similar.

## Checking for understanding

Ask for a quick check: "If AB is 5 and the scale factor is 2.5, how long is A'B'? What happens to the angles?"

## Worksheet

Hand out the worksheet and the differentiated worksheet.
`,
  reading: [
    "Dilations: same shape, new size",
    `
A dilation is a transformation that enlarges or shrinks a figure. It is defined by a center O and a scale factor k. Every point P goes to the point P' on the ray from O through P with OP' equal to k times OP. If k is greater than 1 the figure grows, and if k is between 0 and 1 it shrinks. When the center is the origin, the rule is simple: (x, y) goes to (kx, ky). With k = 3, the point (2, -1) goes to (6, -3).

Unlike translations, reflections and rotations, a dilation changes lengths. Every segment is multiplied by k: if AB = 5 and k = 2.5, then A'B' = 12.5. But dilations do keep angles and keep lines in the same direction. A line that does not pass through the center is sent to a parallel line, and a line through the center is sent to itself. You can check with slopes. Triangle A(2, 2), B(6, 2), C(2, 5) dilated by 1.5 about the origin becomes A'(3, 3), B'(9, 3) and C'(3, 7.5). The side AB is horizontal, and so is A'B'. The length AB = 4 and A'B' = 6, which is 4 times 1.5. Side AC is 3 long and A'C' is 4.5. Both AC and A'C' are vertical.

Two figures are similar if a sequence of transformations that includes a dilation, and any number of rigid motions, maps one onto the other. That means similar figures have equal corresponding angles and corresponding sides in the same ratio. Rectangles of 4 by 6 and 6 by 9 are similar since 6/4 = 1.5 and 9/6 = 1.5. Rectangles of 2 by 8 and 4 by 12 are not, because 4/2 = 2 but 12/8 = 1.5. Matching only one pair of sides is not enough.

Triangles with sides 6, 8, 10 and 9, 12, 15 are similar, since 9/6 = 12/8 = 15/10 = 1.5. A dilation with factor 1.5 maps the first onto a triangle congruent to the second. Notice that the perimeters are 24 and 36, a ratio of 1.5 as well. Lengths of corresponding parts, such as sides, perimeters and heights, all scale by k. But areas scale by k squared, which will matter later.
`,
  ],
  cards: [
    ["Dilation", "A transformation that enlarges or shrinks a figure from a center point by a scale factor."],
    ["Scale factor", "The number k by which every distance from the center is multiplied in a dilation."],
    ["Center of dilation", "The fixed point from which a dilation stretches or shrinks."],
    ["Dilation rule at the origin", "(x, y) goes to (kx, ky)."],
    ["Similar figures", "Figures related by a dilation followed by rigid motions: equal angles and proportional sides."],
    ["Corresponding sides ratio", "In similar figures, the ratios of matching side lengths are all equal to the scale factor."],
    ["Preserved by a dilation", "Angle measures and the direction of lines. Lengths change."],
    ["Scale factor and perimeter", "Perimeter of the image is k times the perimeter of the original."],
  ],
  closed: [
    [
      "A dilation with center at the origin and scale factor 3 is applied to the point (2, -1). What is the image?",
      ["(5, 2)", "(6, -3)", "(2/3, -1/3)", "(-6, 3)"],
      "B",
    ],
    [
      "Segment AB has length 5. It is dilated by a scale factor of 2.5. What is the length of A'B'?",
      ["12.5", "7.5", "2", "10"],
      "A",
    ],
    [
      "A line that does not pass through the center of a dilation is dilated. What is true about its image?",
      [
        "It is a line perpendicular to the original",
        "It is the same line",
        "It is a line parallel to the original",
        "It is a curve",
      ],
      "C",
    ],
    [
      "Which pair of rectangles are similar?",
      ["2 by 8 and 4 by 12", "3 by 5 and 6 by 9", "5 by 5 and 5 by 10", "4 by 6 and 6 by 9"],
      "D",
    ],
    [
      "A triangle has sides 6, 8 and 10. A similar triangle has a shortest side of 9. What is its perimeter?",
      ["24", "36", "27", "33"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Triangle ABC has A(2, 2), B(6, 2) and C(2, 5). It is dilated about the origin with scale factor 1.5. Find the images of the vertices, compare the lengths of AB and A'B' and of AC and A'C', and describe what is the same and what has changed.",
      scheme: [
        "Finds the images A'(3, 3), B'(9, 3) and C'(3, 7.5)",
        "Finds AB = 4 and A'B' = 6, which is 1.5 times as long",
        "Finds AC = 3 and A'C' = 4.5, which is 1.5 times as long",
        "Says the angles and the directions of the sides stay the same, but the lengths are multiplied by 1.5",
      ],
      model:
        "Multiply each coordinate by 1.5: A'(3, 3), B'(9, 3) and C'(3, 7.5). AB = 4 and A'B' = 9 - 3 = 6, which is 1.5 times 4. AC = 3 and A'C' = 7.5 - 3 = 4.5, which is 1.5 times 3. The sides are still horizontal and vertical, so the angles and directions are unchanged, but every length is multiplied by the scale factor 1.5.",
      answers: [
        [
          "full",
          "[[0|A' = (3, 3), B' = (9, 3), C' = (3, 7.5).]] [[1|AB is 4 and A'B' is 6, and 4 x 1.5 = 6.]] [[2|AC is 3 and A'C' is 4.5, which is 3 x 1.5.]] [[3|The right angle at A is still a right angle and the sides point the same way, but all the lengths got 1.5 times longer.]]",
          "Full marks. Naming what stayed the same and what changed is the point of the question.",
        ],
        [
          "full",
          "Using (x, y) goes to (1.5x, 1.5y): [[0|A'(3, 3), B'(9, 3), C'(3, 7.5)]]. [[1|AB = 6 - 2 = 4 and A'B' = 9 - 3 = 6, a ratio of 1.5]]. [[2|AC = 5 - 2 = 3, A'C' = 7.5 - 3 = 4.5, also a ratio of 1.5]]. [[3|Angles and directions are preserved (still horizontal and vertical, still a right angle) while lengths scale by 1.5]].",
          "All four marks. Calculating the ratio for two sides shows the scale factor is the same everywhere.",
        ],
        [
          "partial",
          "[[0|A'(3, 3), B'(9, 3), C'(3, 7.5).]] The triangle is bigger so everything is different now, even the angles.",
          "The images are right. A dilation keeps angles the same. Check the side lengths: AB = 4 and A'B' = 6, 1.5 times as long, and the right angle is still a right angle.",
        ],
        [
          "partial",
          "[[1|AB = 4, A'B' = 6]] and [[2|AC = 3, A'C' = 4.5]]. The images are (3.5, 3.5), (7.5, 3.5) and (3.5, 6.5).",
          "Your lengths are right, but the images are not. Add 1.5 does not dilate. Multiply each coordinate by 1.5: (3, 3), (9, 3) and (3, 7.5).",
          true,
        ],
        [
          "weak",
          "The triangle got moved 1.5 to the right and up so it's the same size.",
          "Moving over would be a translation. A dilation multiplies the coordinates, so the triangle changes size.",
        ],
        [
          "weak",
          "A' = (3.5, 3.5), B' = (7.5, 3.5), C' = (3.5, 6.5) because you add 1.5 to everything. [[3|The angles are the same.]]",
          "You are right that the angles stay the same. But the rule multiplies each coordinate by 1.5, and adding 1.5 is a translation, which cannot change the size.",
        ],
      ],
    },
    {
      prompt:
        "Triangle JKL has sides of 6, 8 and 10 inches. Triangle PQR has sides of 9, 12 and 15 inches. Decide whether they are similar and describe the transformations that show it. Also compare their perimeters.",
      scheme: [
        "Compares the ratios 9/6, 12/8 and 15/10, and finds each equals 1.5",
        "Says a dilation with scale factor 1.5 maps JKL onto a triangle congruent to PQR (then a rigid motion finishes it)",
        "Concludes the triangles are similar, with equal corresponding angles",
        "Finds the perimeters 24 and 36 and says the ratio is 1.5, the scale factor",
      ],
      model:
        "9/6 = 1.5, 12/8 = 1.5 and 15/10 = 1.5, so the corresponding sides are in the same ratio. A dilation with scale factor 1.5 maps triangle JKL onto a triangle with sides 9, 12 and 15, which is congruent to PQR, so a rigid motion finishes the job. Therefore the triangles are similar, and their corresponding angles are equal. The perimeters are 24 and 36, and 36/24 = 1.5, the same as the scale factor.",
      answers: [
        [
          "full",
          "[[0|9/6 = 1.5, 12/8 = 1.5, 15/10 = 1.5. All the same.]] [[1|So a dilation of 1.5 turns JKL into a triangle with the same sides as PQR, and then you can slide or turn it onto PQR.]] [[2|That makes them similar and the angles are equal.]] [[3|The perimeters are 24 and 36 and 36/24 = 1.5 so the perimeter scales by the same factor.]]",
          "Full marks. Linking the perimeter ratio to the scale factor shows how the pieces fit together.",
        ],
        [
          "full",
          "I divide the matching sides: [[0|9 over 6 is 1.5, 12 over 8 is 1.5, and 15 over 10 is 1.5]]. [[1|Dilate JKL by 1.5 about any point, then the new triangle is congruent to PQR (same side lengths), so a rigid motion matches them up.]] [[2|A dilation plus rigid motion means the triangles are similar]]. [[3|Perimeter of JKL is 24 and of PQR is 36, ratio 1.5]].",
          "All four marks. Choosing the long sides with the long and the short with the short was important, and you did.",
        ],
        [
          "partial",
          "[[0|9/6, 12/8 and 15/10 are all 1.5.]] [[2|So the triangles are similar.]] The perimeters are 24 and 36.",
          "The ratios and the conclusion are right. Say which transformations map one onto the other, and compare the perimeters: 36/24 is also 1.5.",
        ],
        [
          "partial",
          "[[1|You dilate by 1.5 and then use a rigid motion to match it.]] [[3|The perimeters are 24 and 36, 1.5 times.]] I think they are similar because the sides are close.",
          "Your transformations and perimeter comparison are right. 'Close' is not a reason: show the three ratios are equal, 9/6, 12/8 and 15/10.",
          true,
        ],
        [
          "weak",
          "9 - 6 = 3 and 12 - 8 = 4 and 15 - 10 = 5, so not the same, they are not similar.",
          "Similar triangles have sides in the same ratio, not the same difference. Divide: 9/6, 12/8 and 15/10 are all 1.5.",
        ],
        [
          "weak",
          "They are congruent because they're both right triangles.",
          "Congruent triangles have equal sides, and these do not: 6 versus 9. Both being right triangles does not decide it. Check whether the sides are proportional.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "The AA criterion and solving problems with similar and congruent triangles",
  note: `
## Objectives

Students will be able to:

1. use similarity to establish the AA criterion for two triangles;
2. use congruence and similarity criteria to solve problems and prove relationships in figures.

## Materials

Rulers, protractors, a meter stick and a sunny spot (or a flashlight), whiteboards, the quiz.

## Starter (8 minutes)

Have students draw two triangles with angles 40 and 70 degrees, one small and one large, then measure the sides and compare the ratios of corresponding sides. Ask: "Do we need to know the third angle?" Use the angle sum to see that two angles fix the third.

## Main activity

1. Explain AA with a dilation: if two triangles have two pairs of equal angles, dilate one so a pair of corresponding sides matches, and ASA shows they are congruent.
2. Work the proportion problems: ABC similar to DEF with AB = 6, DE = 15 and BC = 8, find EF. In triangle ABC with DE parallel to BC, AD = 4, DB = 6, AE = 6, find EC.
3. Shadow problems: use the fact that sunlight makes equal angles with the ground at the same moment, so the object and its shadow make similar triangles.

## Checking for understanding

Quick poll: "Always, sometimes, or never: similar triangles are congruent. Congruent triangles are similar." Give reasons.

## Quiz

Collect the quiz, then hand out the differentiated worksheet.
`,
  reading: [
    "Two angles are enough",
    `
When are two triangles similar? You might guess that you have to check all three angles and all three sides, but two angles are enough. This is the AA criterion: if two angles of one triangle are equal to two angles of another, the triangles are similar. Here is the reason. The angles of a triangle add to 180 degrees, so equal pairs of two angles force the third angles to be equal, too. Now dilate the first triangle by the scale factor that makes one of its sides equal to the matching side of the second triangle. The dilated triangle has the same two angles at the ends of that side, and the side itself matches, so by ASA it is congruent to the second one. A dilation followed by a rigid motion maps one triangle onto the other, so the triangles are similar.

Once triangles are similar, their corresponding sides are proportional, and that gives you equations. Suppose triangle ABC is similar to triangle DEF with AB = 6, DE = 15 and BC = 8. The scale factor from ABC to DEF is 15/6 = 2.5, so EF = 8 times 2.5 = 20. In a proportion, 6/15 = 8/EF gives the same answer. A common slip is to add instead of multiply, thinking that a side that is 9 longer in one place must be 9 longer everywhere.

A line parallel to one side of a triangle creates a smaller similar triangle. If DE is parallel to BC, with D on AB and E on AC, then angle A is shared and angle ADE equals angle ABC as corresponding angles, so triangle ADE is similar to triangle ABC. If AD = 4, DB = 6 and AE = 6, then AD/AB = 4/10 and AE/AC must also be 4/10, so AC = 15 and EC = 9.

Similar triangles let you measure things you cannot reach. At the same moment, a school flagpole casts a 24-foot shadow and a 6-foot student casts a 4-foot shadow. The sunlight comes in at the same angle for both, and both stand upright, so the triangles have two equal angles and are similar. Then h/6 = 24/4, so the flagpole is 36 feet tall. Remember the difference between the two ideas: congruent triangles are always similar, with a scale factor of 1, but similar triangles are congruent only when the scale factor is 1.
`,
  ],
  cards: [
    ["AA similarity", "If two angles of one triangle equal two angles of another, the triangles are similar."],
    ["Proportion", "An equation stating that two ratios are equal, such as 6/15 = 8/x."],
    ["Corresponding sides", "In similar triangles, the sides opposite equal angles. Their lengths are in the same ratio."],
    ["Scale factor between triangles", "The ratio of a side of one triangle to the matching side of the other."],
    ["Parallel line in a triangle", "A line parallel to one side makes a smaller triangle similar to the original."],
    ["Indirect measurement", "Finding a length that is hard to measure by using similar triangles and a proportion."],
    ["Congruent vs. similar", "Congruent figures are the same size and shape. Similar figures are the same shape and may differ in size."],
    ["Angle of elevation of the sun", "The angle sunlight makes with the ground. It is the same for all objects at the same time and place."],
  ],
  closed: [
    [
      "Triangle ABC has angles of 35 and 75 degrees. Which triangle is certainly similar to it?",
      [
        "A triangle with angles of 40 and 75 degrees",
        "A triangle with angles of 35 and 65 degrees",
        "A triangle with angles of 70 and 80 degrees",
        "A triangle with angles of 35 and 70 degrees",
      ],
      "D",
    ],
    [
      "Triangle ABC is similar to triangle DEF. AB = 6, DE = 15 and BC = 8. What is EF?",
      ["3.2", "17", "20", "48"],
      "C",
    ],
    [
      "A school flagpole casts a 24-foot shadow at the same time as a 6-foot student casts a 4-foot shadow. How tall is the flagpole?",
      ["16 feet", "28 feet", "144 feet", "36 feet"],
      "D",
    ],
    [
      "In triangle ABC, DE is parallel to BC with D on AB and E on AC. AD = 4, DB = 6 and AE = 6. What is EC?",
      ["9", "4", "12", "6"],
      "A",
    ],
    [
      "Which statement is true?",
      [
        "All similar triangles are congruent",
        "All congruent triangles are similar, but not all similar triangles are congruent",
        "No triangles can be both similar and congruent",
        "Triangles with equal perimeters are similar",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Explain why two triangles with two pairs of equal angles, angle A = angle D and angle B = angle E, must be similar. Use a dilation and a congruence criterion in your explanation.",
      scheme: [
        "Dilates triangle ABC by the scale factor DE/AB, so the image has a side equal to DE",
        "Says the image still has angle A and angle B, so it has two angles and the included side equal to triangle DEF",
        "Concludes the image is congruent to triangle DEF by ASA",
        "Concludes that a dilation followed by rigid motions maps ABC onto DEF, so the triangles are similar",
      ],
      model:
        "Dilate triangle ABC by the scale factor k = DE/AB, so that the image A'B' has the same length as DE. A dilation keeps angles, so angle A' = angle A = angle D and angle B' = angle B = angle E. Now triangle A'B'C' and triangle DEF have two equal angles and the included side equal, so they are congruent by ASA. A rigid motion maps A'B'C' onto DEF. So a dilation followed by a rigid motion maps ABC onto DEF, which means the triangles are similar.",
      answers: [
        [
          "full",
          "[[0|I scale triangle ABC by DE divided by AB so the new side A'B' is the same length as DE.]] [[1|Dilations keep angles, so A' = D and B' = E and the side between them is equal.]] [[2|That's ASA, so the dilated triangle is congruent to DEF.]] [[3|So a dilation and then a rigid motion take ABC to DEF, which is what similar means.]]",
          "Full marks. You used a dilation to turn a similarity problem into a congruence problem.",
        ],
        [
          "full",
          "Let k = DE/AB. [[0|Dilate ABC by k, so A'B' = k x AB = DE]]. [[1|Angles don't change under a dilation, so angle A' = angle A = angle D and angle B' = angle B = angle E]]. [[2|Triangle A'B'C' and DEF have angle, side, angle equal so they are congruent by ASA]]. [[3|There's a rigid motion taking A'B'C' to DEF, so ABC is mapped to DEF by a similarity transformation and they are similar]].",
          "All four marks. Defining k first makes each later step easy to check.",
        ],
        [
          "partial",
          "[[0|Dilate ABC so one side matches DE.]] Then [[2|they are congruent by ASA]]. That makes them similar.",
          "The plan is right. Say why the angles still match after the dilation, because a dilation keeps angles, and why that leaves the second triangle with two angles and the side between them.",
        ],
        [
          "partial",
          "[[1|Dilations keep angles the same, so the two angles still match.]] [[3|So it's a dilation and a rigid motion, which means similar.]]",
          "Your reasoning is good. Say how big the scale factor must be, DE/AB, and use ASA to get the congruence, which is the step connecting the two.",
          true,
        ],
        [
          "weak",
          "If two angles match the third has to match so they are the same triangle, which means they're congruent.",
          "Equal angles do not make triangles congruent, only similar, since the sizes can differ. The dilation is what handles the size.",
        ],
        [
          "weak",
          "[[3|They are similar by a dilation and rigid motion]] because AA says so.",
          "AA is the name of the criterion, not the reason it works. Show how to dilate first, so the triangles become congruent, then finish with a rigid motion.",
        ],
      ],
    },
    {
      prompt:
        "In triangle ABC, point D is on AB and point E is on AC, with DE parallel to BC. Given AD = 5, AB = 15 and DE = 4, show that triangle ADE is similar to triangle ABC and find BC.",
      scheme: [
        "Says angle A is shared by both triangles",
        "Says angle ADE equals angle ABC as corresponding angles, because DE is parallel to BC",
        "Concludes triangle ADE is similar to triangle ABC by AA",
        "Finds the scale factor AB/AD = 3 and BC = 3 x 4 = 12",
      ],
      model:
        "Both triangles share angle A. Since DE is parallel to BC, angle ADE and angle ABC are corresponding angles, so they are equal. By AA, triangle ADE is similar to triangle ABC. The scale factor from ADE to ABC is AB/AD = 15/5 = 3, so BC = 3 times DE = 12.",
      answers: [
        [
          "full",
          "[[0|Angle A is in both triangles so it's equal to itself.]] [[1|DE is parallel to BC so angle ADE and angle ABC are corresponding angles and they are equal.]] [[2|Two angles match, so the triangles are similar by AA.]] [[3|The scale factor is 15/5 = 3, so BC = 3 x 4 = 12.]]",
          "Full marks. Naming the corresponding angles is the step that uses the parallel lines.",
        ],
        [
          "full",
          "Triangle ADE and triangle ABC: [[0|they share angle A]]. [[1|Parallel lines give equal corresponding angles, ADE = ABC]]. [[2|By AA they are similar]]. [[3|So AB/AD = BC/DE, 15/5 = BC/4, which makes BC = 12]].",
          "All four marks. The proportion with the 15, 5 and 4 in the right places is correct.",
        ],
        [
          "partial",
          "[[0|Angle A is shared.]] [[2|So they're similar by AA.]] BC is 15/5 x 4 = 12.",
          "The shared angle and the answer are right. The second pair of angles comes from the parallel lines, as corresponding angles. Without it, AA is not complete.",
        ],
        [
          "partial",
          "[[1|DE parallel to BC means corresponding angles are equal.]] [[3|The ratio is 3 so BC = 12.]]",
          "Both of those steps are right. Say that angle A is shared, so that there are two pairs of equal angles, and conclude similar by AA.",
          true,
        ],
        [
          "weak",
          "They look like the same shape so they're similar. BC = 4 + 10 = 14.",
          "Looks are not enough, and sides are not added. After proving similarity, use the ratio AB/AD = 3 to multiply DE by 3.",
        ],
        [
          "weak",
          "[[0|They share angle A.]] DE is 4 and AD is 5 so BC is 15 - 5 + 4 = 14.",
          "Sharing angle A is a good start. The sides of similar triangles are proportional, not related by adding or subtracting. The scale factor from ADE to ABC is 15/5 = 3.",
        ],
      ],
    },
  ],
};

writeCourse("geometry-grade-10.json", "Geometry", "Grade 10", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
