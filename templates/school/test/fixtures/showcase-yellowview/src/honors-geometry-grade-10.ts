import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Honors Geometry, Grade 10, Quarter 1. Standards: Common Core, High School
 * Geometry (G-CO, G-GPE, G-SRT), in the school's own words. The Honors course
 * goes deeper than Geometry: transformations as composed functions, congruence
 * criteria derived from rigid motions, and proofs written out in full,
 * including coordinate proofs. Figures are described in words and coordinates.
 */

const w1: WeekInput = {
  topic: "Definitions, transformations as functions, and composing motions",
  note: `
## Objectives

Students will be able to:

1. state definitions of angle, circle, perpendicular line, parallel line and line segment that are precise enough to prove things from;
2. describe reflections, rotations and translations as functions on points and compose them in a stated order;
3. map one figure onto another with a sequence of rigid motions and verify the sequence with coordinates.

## Materials

Graph paper, patty paper, rulers, a coordinate-plane poster, the quiz.

## Starter (10 minutes)

Write "Parallel lines are lines that never touch" on the board. Ask the class to find a counterexample. Let them struggle; some will name a floor line and a ceiling line that do not touch but are not parallel. Use it to show why a definition must say "in the same plane," and then to rewrite the definition of each of the five basic terms so it can be tested.

## Main activity

1. Build a table of rules: reflection across the y-axis (x, y) to (-x, y); across the line y = x, (x, y) to (y, x); rotations of 90 degrees counterclockwise, (-y, x), of 180 degrees, (-x, -y), and of 270 degrees, (y, -x).
2. Compose: translate by (x + 3, y - 1) and then reflect across the x-axis, applied to (1, 4). Then do it in the other order. Ask if the results agree.
3. Triangle PQR with P(2, 1), Q(5, 1), R(2, 4) is mapped onto P''(-2, 2), Q''(-2, 5), R''(1, 2). In groups, find two rigid motions and verify with a second vertex.

## Checking for understanding

Whiteboards: "Where does (3, 1) go under a translation 2 right and then a 90-degree counterclockwise rotation about the origin?" Collect and compare orders.

## Quiz

Collect the quiz in the last ten minutes.
`,
  reading: [
    "Definitions you can prove from, and motions you can compose",
    `
Proofs depend on definitions, so a definition has to be exact. Consider "parallel lines never touch." In three dimensions, a line along the floor and a line along the ceiling can fail to touch without being parallel, because they point in different directions. So the working definition adds the missing words: parallel lines are lines in the same plane that never intersect. In the same careful way, a line segment is the part of a line between two endpoints, an angle is two rays with a common endpoint, perpendicular lines are lines that form a right angle, and a circle is the set of all points in a plane at a given distance from a given point.

Transformations are functions whose inputs and outputs are points. A reflection across the y-axis sends (x, y) to (-x, y). A reflection across the line y = x swaps the coordinates: (x, y) goes to (y, x), so (-3, 5) goes to (5, -3). A rotation about the origin by 90 degrees counterclockwise sends (x, y) to (-y, x); by 180 degrees it sends (x, y) to (-x, -y); by 270 degrees counterclockwise, which is the same as 90 degrees clockwise, it sends (x, y) to (y, -x). So (2, -6) goes to (-6, -2) under a 270-degree rotation. A translation adds the same vector to every point.

Since each of these is a function, you can compose them. Writing "first f then g" means applying f to the point and then g to the result. Order matters. Translate by (x + 3, y - 1) and then reflect across the x-axis: (1, 4) goes to (4, 3) and then to (4, -3). Reflect first and the same point goes to (1, -4) and then (4, -5). The composition is not commutative in general. A rotation about the origin shows this clearly: translate (3, 1) two units right to (5, 1) and then rotate 90 degrees counterclockwise to (-1, 5), but rotating first gives (-1, 3) and translating then gives (1, 3).

To map one figure onto another, look at where one vertex goes and at how the figure is turned. Take P(2, 1), Q(5, 1), R(2, 4) and the target P''(-2, 2), Q''(-2, 5), R''(1, 2). Reflect across y = x to get (1, 2), (1, 5), (4, 2), then translate 3 left to get (-2, 2), (-2, 5), (1, 2). Check a second vertex and a length: PQ = 3 and P''Q'' = 3. Every function in the sequence preserves distance, so the composition does as well.
`,
  ],
  cards: [
    ["Coplanar", "Lying in the same plane. Parallel lines must be coplanar, or they could be skew."],
    ["Skew lines", "Lines that are not in the same plane. They never meet and are not parallel."],
    ["Composition of transformations", "Applying one transformation and then another. The order matters."],
    ["Reflection across y = x", "(x, y) goes to (y, x)."],
    ["Rotation 270 degrees counterclockwise", "(x, y) goes to (y, -x), the same as 90 degrees clockwise."],
    ["Rotation 180 degrees about the origin", "(x, y) goes to (-x, -y)."],
    ["Non-commutative", "A pair of operations whose result depends on the order, as with a translation and a rotation."],
    ["Preimage and image", "The original figure and the figure after the transformation."],
  ],
  closed: [
    [
      "A student defines parallel lines as \"two lines that never touch.\" Why is this not precise enough?",
      [
        "In space, two lines can fail to touch without being parallel, so the lines must be in the same plane",
        "Parallel lines do touch at one point",
        "The definition does not mention slope",
        "It is the definition of perpendicular lines",
      ],
      "A",
    ],
    [
      "What is the image of the point (-3, 5) under a reflection across the line y = x?",
      ["(-5, 3)", "(5, -3)", "(3, -5)", "(-3, -5)"],
      "B",
    ],
    [
      "What is the image of (2, -6) under a rotation of 270 degrees counterclockwise about the origin?",
      ["(6, 2)", "(-2, 6)", "(-6, -2)", "(6, -2)"],
      "C",
    ],
    [
      "The point (1, 4) is first translated by (x + 3, y - 1), then reflected across the x-axis. What is the final image?",
      ["(4, -5)", "(4, 3)", "(-4, 3)", "(4, -3)"],
      "D",
    ],
    [
      "The point (3, 1) is translated 2 units right and then rotated 90 degrees counterclockwise about the origin. Where does it end up?",
      ["(5, 1)", "(1, 3)", "(-1, 5)", "(-5, 1)"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Triangle PQR has P(2, 1), Q(5, 1) and R(2, 4). Its image after two rigid motions, the first of which is a reflection, is P''(-2, 2), Q''(-2, 5) and R''(1, 2). Describe the two motions as functions on points, give the coordinates after the first motion, and use a length to confirm your answer.",
      scheme: [
        "Identifies the first motion as a reflection across y = x, (x, y) to (y, x), and gives (1, 2), (1, 5), (4, 2)",
        "Identifies the second motion as a translation 3 units left, (x, y) to (x - 3, y)",
        "Verifies a vertex through both motions, such as R(2, 4) to (4, 2) to (1, 2)",
        "Confirms with a length, PQ = 3 and P''Q'' = 3, and says rigid motions preserve distance",
      ],
      model:
        "The first motion is a reflection across the line y = x, (x, y) goes to (y, x), which sends P, Q and R to (1, 2), (1, 5) and (4, 2). The second is a translation 3 units left, (x, y) goes to (x - 3, y), giving (-2, 2), (-2, 5) and (1, 2). Check R: (2, 4) goes to (4, 2) and then to (1, 2), which is R''. PQ = 5 - 2 = 3 and P''Q'' = 5 - 2 = 3 as well, as expected, because both motions are rigid and preserve distance.",
      answers: [
        [
          "full",
          "[[0|The reflection is across y = x so (x, y) becomes (y, x), and the triangle goes to (1, 2), (1, 5), (4, 2).]] [[1|Then it's a translation left 3, (x, y) to (x - 3, y).]] [[2|Check R: (2, 4) to (4, 2) to (1, 2), and that is R''.]] [[3|PQ = 3 and P''Q'' = 3, since both of the motions are rigid and keep distances.]]",
          "Full marks. Writing each motion as a rule for (x, y) is the notation this unit asks for.",
        ],
        [
          "full",
          "Motion 1: [[0|reflect over the line y = x, which swaps coordinates. P(2, 1) becomes (1, 2), Q becomes (1, 5), R becomes (4, 2)]]. Motion 2: [[1|translate by (-3, 0), all x-coordinates go down by 3]]. Check Q: [[2|(5, 1) goes to (1, 5) and then to (-2, 5), which matches Q'']]. Length check: [[3|PQ is 3 (horizontal) and P''Q'' runs from y = 2 to y = 5, also 3. Rigid motions preserve length so that fits]].",
          "All four marks. Checking a vertex the second way gives confidence that the motions are correct and in the right order.",
        ],
        [
          "partial",
          "[[0|First reflect across y = x so (2, 1) goes to (1, 2).]] Then slide it left 3 and up 2. PQ = 3 and P''Q'' = 3.",
          "The reflection is right. The second motion has no vertical part: (1, 2) to (-2, 2) only changes x. Sliding up 2 would put P'' at (-2, 4).",
        ],
        [
          "partial",
          "[[1|The second motion is a translation left 3.]] [[2|R(2, 4) goes to (4, 2) then (1, 2).]] The first motion is a rotation.",
          "Your translation and your check are right. The check R to (4, 2) is a swap of coordinates, which is a reflection across y = x, not a rotation. A 90-degree turn would give (-4, 2).",
          true,
        ],
        [
          "weak",
          "It's a reflection over the y-axis then a rotation, because the x's are negative.",
          "Reflecting over the y-axis sends (2, 1) to (-2, 1), but P'' is (-2, 2). The y-coordinate changed too, which is the sign of a swap. Test your guess on one vertex.",
        ],
        [
          "weak",
          "[[3|PQ = 3 and P''Q'' = 3 so they are congruent]]. It's a translation of 4 left and 1 up.",
          "Comparing the lengths is a good check. A translation moves all the points the same way, but P goes to (-2, 2) and Q to (-2, 5), which are not 4 left and 1 up from (2, 1) and (5, 1).",
        ],
      ],
    },
    {
      prompt:
        "Let T be the translation (x, y) to (x + 2, y) and R the rotation of 90 degrees counterclockwise about the origin, (x, y) to (-y, x). Find the image of the point (1, 3) when T is applied first and then R, and when R is applied first and then T. Explain why the two results differ.",
      scheme: [
        "Finds T then R: (1, 3) to (3, 3) to (-3, 3)",
        "Finds R then T: (1, 3) to (-3, 1) to (-1, 1)",
        "States that the results differ, so the order of the composition matters",
        "Explains that the rotation is about the origin, so it turns the translated point around the origin and also turns the translation itself",
      ],
      model:
        "T then R: (1, 3) goes to (3, 3), then R gives (-3, 3). R then T: (1, 3) goes to (-3, 1), then T gives (-1, 1). The results differ, so the order matters. The rotation turns everything about the origin, including the shift: if you translate first, the 2 units to the right get rotated into 2 units upward, but if you rotate first, the shift stays 2 units to the right of the rotated point.",
      answers: [
        [
          "full",
          "T first: (1, 3) to (3, 3), then rotating gives (-3, 3). [[0|That's (-3, 3).]] R first: (1, 3) turns to (-3, 1), then adding 2 to x gives [[1|(-1, 1)]]. [[2|The two answers are different, so you can't swap the order.]] [[3|The rotation is about the origin, so when you translate first the rotation also turns that shift of 2 into a shift upward]].",
          "Full marks. Noticing that the rotation turns the translation as well is the heart of why the order matters.",
        ],
        [
          "full",
          "Apply T then R: (1, 3) to (1 + 2, 3) = (3, 3) to (-3, 3), so [[0|the final point is (-3, 3)]]. Apply R then T: R gives (-3, 1), T gives (-3 + 2, 1) so [[1|(-1, 1)]]. [[2|(-3, 3) is not (-1, 1), so composition of a translation and a rotation is not commutative.]] [[3|After a rotation about the origin, all the directions are turned, including the direction of the slide, so sliding before the turn is not the same as sliding after it.]]",
          "All four marks. Your reasoning about directions being turned is a good conceptual explanation.",
        ],
        [
          "partial",
          "[[0|T then R: (3, 3) then (-3, 3).]] [[1|R then T: (-1, 1).]] They come out different because I did the math wrong.",
          "Both of your images are right. They differ because of the order, not because of a mistake. The rotation is about the origin, so it turns the slide too.",
        ],
        [
          "partial",
          "T then R is [[0|(-3, 3)]]. R then T is (1, 5) because you add 2 to the y. [[2|They're different so order matters.]]",
          "T then R is right and your conclusion is right. After R sends (1, 3) to (-3, 1), the translation changes x only: (-3 + 2, 1) = (-1, 1).",
          true,
        ],
        [
          "weak",
          "They'd both be (3, 3) then rotate. The order doesn't matter, translation and rotation are the same.",
          "Rotation about the origin and a translation do not commute. Try it: if R goes first, (1, 3) goes to (-3, 1) before any sliding.",
        ],
        [
          "weak",
          "[[2|The order matters]] because translations go first in math, always.",
          "The order matters, but not because of a rule that translations go first. Either order can be applied, and each gives a different point. Work both out to see.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Congruence through rigid motions, with proofs",
  note: `
## Objectives

Students will be able to:

1. use rigid motions to decide whether two figures are congruent;
2. use the definition of congruence in terms of rigid motions to show that two triangles are congruent, and explain why congruence is transitive.

## Materials

Graph paper, patty paper, a set of triangle coordinate cards, whiteboards, the problem set.

## Starter (8 minutes)

Give pairs two triangles on a grid, with vertices A(-2, 1), B(1, 1), C(-2, 5) and D(3, -2), E(3, 1), F(7, -2). Ask: "Are they congruent? Show me without measuring." Many will first compare side lengths. Push them to produce a sequence of motions that maps A to D, B to E and C to F.

## Main activity

1. Orientation: a reflection reverses the order of the vertices (clockwise becomes counterclockwise), but a rotation and a translation do not. The triangles above need a reflection. Find a sequence of three motions.
2. Write the formal definition: figures are congruent if a sequence of rigid motions maps one onto the other.
3. Prove that if triangle 1 is congruent to triangle 2 and triangle 2 to triangle 3, then triangle 1 is congruent to triangle 3. Use composition.
4. Algebra with congruent parts: if triangle ABC is congruent to triangle DEF and the angles at A and D are (5x - 7) and (3x + 15), find x.

## Checking for understanding

Ask for the invariants: "Name two things a rigid motion preserves and one thing it can change."

## Problem set

Collect the problem set the next day.
`,
  reading: [
    "Congruence is a function you can name",
    `
We say that two figures are congruent when a sequence of rigid motions maps one onto the other. This definition is a statement about the existence of a function, so to prove congruence you produce a sequence of moves, and to disprove it you show that no sequence can work, usually because a length or an angle differs. Rigid motions preserve distance and angle measure. They can change position, and a reflection can change orientation, meaning the direction in which the vertices are listed around the figure, from clockwise to counterclockwise.

Let us find a sequence. Triangle ABC has A(-2, 1), B(1, 1) and C(-2, 5). Triangle DEF has D(3, -2), E(3, 1) and F(7, -2). We check the lengths first: AB = 3 and DE = 3, AC = 4 and DF = 4, and BC and EF are both 5. The lengths match, so congruence is plausible. Now find the motions. Rotate 90 degrees clockwise about the origin, (x, y) to (y, -x): A goes to (1, 2), B to (1, -1) and C to (5, 2). In that image the side corresponding to AB points down, but in DEF the side DE points up, so one reflection is needed. Reflect across the x-axis, (x, y) to (x, -y): the points are (1, -2), (1, 1) and (5, -2). Finally translate 2 units right to reach (3, -2), (3, 1) and (7, -2), which are D, E and F. Three rigid motions took triangle ABC onto triangle DEF, so they are congruent.

Congruent triangles have equal corresponding parts, and that fact gives equations. If triangle ABC is congruent to triangle DEF and the angles at A and D measure (5x - 7) and (3x + 15) degrees, then 5x - 7 = 3x + 15, so x = 11 and each angle is 48 degrees.

Why is congruence transitive? Suppose f is a rigid motion that maps triangle 1 onto triangle 2, and g maps triangle 2 onto triangle 3. Then doing f and then g maps triangle 1 onto triangle 3. The composition of two rigid motions preserves distance and angles, because each does, so it is a rigid motion. Take f to be a translation 3 right and g a reflection across the x-axis. The point (1, 2) goes to (4, 2) and then to (4, -2). So triangle 1 is congruent to triangle 3. The same argument shows that if one triangle is congruent to a second, the second is congruent to the first, using the inverse of the motion.
`,
  ],
  cards: [
    ["Congruent", "Related by a sequence of rigid motions that maps one figure exactly onto the other."],
    ["Orientation", "The direction, clockwise or counterclockwise, in which a figure's vertices are listed. A reflection reverses it."],
    ["Invariant", "A property that a transformation does not change, such as distance under a rigid motion."],
    ["Composition of rigid motions", "A sequence of rigid motions. It is itself a rigid motion."],
    ["Transitive property of congruence", "If A is congruent to B and B is congruent to C, then A is congruent to C."],
    ["Symmetric property of congruence", "If A is congruent to B, then B is congruent to A."],
    ["Reflexive property of congruence", "Every figure is congruent to itself."],
    ["Corresponding parts", "The angles and sides that match when two congruent figures are placed one on the other."],
  ],
  closed: [
    [
      "A 90-degree clockwise rotation about the origin sends (x, y) to (y, -x). What is the image of C(-2, 5)?",
      ["(-5, -2)", "(5, 2)", "(-5, 2)", "(2, 5)"],
      "B",
    ],
    [
      "Which property of a figure can change under a reflection?",
      ["The length of each side", "The measure of each angle", "The orientation of the vertices (clockwise or counterclockwise)", "The area"],
      "C",
    ],
    [
      "Triangle ABC is congruent to triangle DEF. The measure of angle A is (5x - 7) degrees and angle D is (3x + 15) degrees. What is the measure of angle A?",
      ["11 degrees", "96 degrees", "28 degrees", "48 degrees"],
      "D",
    ],
    [
      "Triangle PQR has P(0, 0), Q(5, 0), R(0, 12). Triangle STU has S(1, 1), T(13, 1), U(1, 6). Are they congruent?",
      [
        "Yes, both have side lengths 5, 12 and 13, so a sequence of rigid motions can match them",
        "No, because ST is 12 and PQ is 5",
        "No, because triangle STU is oriented differently",
        "There is not enough information",
      ],
      "A",
    ],
    [
      "Triangle 1 is congruent to triangle 2 by a rigid motion f, and triangle 2 is congruent to triangle 3 by a rigid motion g. Why is triangle 1 congruent to triangle 3?",
      [
        "Because all triangles are congruent",
        "Because applying f and then g is a rigid motion that maps triangle 1 onto triangle 3",
        "Because triangle 2 is in the middle",
        "Because the angle sum is 180 degrees",
      ],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Triangle ABC has A(-2, 1), B(1, 1) and C(-2, 5). Triangle DEF has D(3, -2), E(3, 1) and F(7, -2). Find a sequence of rigid motions that maps A to D, B to E and C to F. Give the coordinates after each motion, confirm that the three side lengths match, and state your conclusion.",
      scheme: [
        "Rotates 90 degrees clockwise about the origin, (x, y) to (y, -x), giving (1, 2), (1, -1), (5, 2)",
        "Reflects across the x-axis, giving (1, -2), (1, 1), (5, -2)",
        "Translates 2 units right to reach D, E and F",
        "Confirms the lengths AB = DE = 3, AC = DF = 4 and BC = EF = 5, and concludes the triangles are congruent because a composition of rigid motions preserves distance and angle",
      ],
      model:
        "Rotate 90 degrees clockwise about the origin with (x, y) to (y, -x): A(-2, 1), B(1, 1), C(-2, 5) go to (1, 2), (1, -1), (5, 2). Reflect across the x-axis with (x, y) to (x, -y): (1, -2), (1, 1), (5, -2). Translate 2 units right, (x + 2, y): (3, -2), (3, 1), (7, -2), which are D, E and F. The side lengths are AB = DE = 3, AC = DF = 4 and BC = EF = 5, as they must be. A composition of rigid motions is a rigid motion that preserves distance and angle, so triangle ABC is congruent to triangle DEF.",
      answers: [
        [
          "full",
          "[[0|Rotate 90 degrees clockwise, (x, y) to (y, -x). A to (1, 2), B to (1, -1), C to (5, 2).]] [[1|Then reflect over the x-axis: (1, -2), (1, 1), (5, -2).]] [[2|Then slide right 2: (3, -2), (3, 1), (7, -2), which is D, E, F.]] [[3|AB = 3 = DE, AC = 4 = DF, BC = 5 = EF. All three motions are rigid so the triangles are congruent.]]",
          "Full marks. The coordinates after each step let anyone check your sequence.",
        ],
        [
          "full",
          "Step 1: [[0|a clockwise quarter turn, rule (y, -x), makes A'(1, 2), B'(1, -1), C'(5, 2)]]. In that image the short side points down but DE points up, so Step 2: [[1|reflect in the x-axis, giving (1, -2), (1, 1), (5, -2)]]. Step 3: [[2|translate (2, 0) so we get exactly D, E and F]]. Lengths: [[3|AB and DE are 3, AC and DF are 4, BC and EF are both 5 by the distance formula, and since rotations, reflections and translations are rigid, ABC is congruent to DEF]].",
          "All four marks. Explaining why the reflection was needed, from the direction of the short side, shows real understanding of orientation.",
        ],
        [
          "partial",
          "[[0|Rotate 90 degrees clockwise: (1, 2), (1, -1), (5, 2).]] Then [[2|translate 2 right and 4 down]] to get D, E, F. The sides match so they're congruent.",
          "The rotation is right. After it, you still need a reflection, since B' is below A' but E is above D. A translation alone would put E at (3, -5), not (3, 1).",
        ],
        [
          "partial",
          "[[3|The three side lengths match, 3, 4, 5, and the motions are rigid, so they are congruent.]] [[1|There's a reflection across the x-axis in there.]]",
          "The lengths and conclusion are good. Give the whole sequence: a quarter turn, the reflection and a translation, with coordinates at each stage.",
          true,
        ],
        [
          "weak",
          "You can't map them because ABC is oriented one way and DEF is the other way.",
          "A reflection reverses orientation, so that is exactly the move to add to the sequence. Different orientation does not rule out congruence.",
        ],
        [
          "weak",
          "It is a translation 5 right and 3 down. [[3|All the side lengths match.]]",
          "The side lengths do match, but a translation alone would keep AB horizontal, and DE is vertical. A turn is needed first.",
        ],
      ],
    },
    {
      prompt:
        "Triangle 1 is congruent to triangle 2 by a rigid motion f, and triangle 2 is congruent to triangle 3 by a rigid motion g. Prove that triangle 1 is congruent to triangle 3. Then give an example with f a translation 3 units right and g a reflection across the x-axis, and follow the point (1, 2).",
      scheme: [
        "Says f and g exist, with f mapping triangle 1 onto triangle 2 and g mapping triangle 2 onto triangle 3",
        "Says the composition of f and then g maps triangle 1 onto triangle 3",
        "Says the composition is a rigid motion, because each motion preserves distances and angles",
        "Gives the example: (1, 2) goes to (4, 2) and then to (4, -2)",
      ],
      model:
        "By definition there is a rigid motion f that maps triangle 1 onto triangle 2 and a rigid motion g that maps triangle 2 onto triangle 3. Applying f and then g maps triangle 1 onto triangle 3. The composition preserves distances and angle measures because f does and g does, so it is a rigid motion. Hence triangle 1 is congruent to triangle 3. For the example, the point (1, 2) goes to (4, 2) under f and then to (4, -2) under g.",
      answers: [
        [
          "full",
          "[[0|Since they're congruent there's a rigid motion f from triangle 1 to triangle 2 and one called g from triangle 2 to triangle 3.]] [[1|If I do f and then g, triangle 1 ends up on triangle 3.]] [[2|Distances and angles are kept by f and then kept by g, so the whole thing keeps them, which means it's a rigid motion.]] [[3|Example: (1, 2) to (4, 2) to (4, -2).]]",
          "Full marks. Your argument that the composition preserves distance is the step the whole proof depends on.",
        ],
        [
          "full",
          "Definition of congruence: [[0|rigid motions f (1 to 2) and g (2 to 3) exist]]. [[1|The composite g after f takes triangle 1 to triangle 3]]. [[2|If f keeps every distance and angle, and g keeps every distance and angle, then the composite keeps them too, so it is rigid]]. So triangle 1 is congruent to triangle 3. [[3|Following (1, 2): translate right 3 to (4, 2), reflect over the x-axis to (4, -2)]].",
          "All four marks. Using 'g after f' as the name for the composite is the notation to use.",
        ],
        [
          "partial",
          "[[0|There's a motion f and a motion g.]] [[1|Doing f then g puts triangle 1 on triangle 3]], so they are congruent.",
          "The composite idea is right. Say why that composite counts as a rigid motion: each step keeps distances and angles, so the whole sequence does.",
        ],
        [
          "partial",
          "[[3|(1, 2) goes to (4, 2) and then (4, -2).]] [[2|Both motions keep distances, so doing both keeps distances.]]",
          "Your example and the key reason are right. Start by stating that f and g exist by the definition, and say that g after f maps triangle 1 onto triangle 3.",
          true,
        ],
        [
          "weak",
          "It's the transitive property so it's true, that's what it's called.",
          "Naming a property is not a proof. The question asks you to show why it holds, using the definition of congruence through rigid motions.",
        ],
        [
          "weak",
          "[[3|(1, 2) goes to (4, 2) then to (4, -2)]]. The triangles are congruent because they are all triangles.",
          "Your example is right. But not all triangles are congruent, so you need the reason: composing f and g gives a rigid motion from triangle 1 to triangle 3.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Deriving SSS, SAS and ASA from rigid motions, and proofs about lines and angles",
  note: `
## Objectives

Students will be able to:

1. explain how the SSS, SAS and ASA criteria follow from the definition of congruence in terms of rigid motions;
2. prove theorems about lines and angles, such as vertical angles and the angles formed when a transversal crosses parallel lines, and use them in algebra.

## Materials

Patty paper, straws or strips of cardstock, protractors, a two-column proof template, the worksheet.

## Starter (8 minutes)

Hand out two triangles cut from cardstock that have equal sides AB = DE = 9, BC = EF = 7 and equal angles at B and E. Ask students to prove, without measuring anything else, that the triangles are congruent. They can use patty paper and the definition. Collect the steps: put B on E, line up the sides along one ray, and the angle matches the other.

## Main activity

1. Turn that into a proof for SAS: translate B onto E, rotate so that ray BA lies on ray ED, reflect if needed so that C and F are on the same side, and use the equal angle and equal sides to put C on F.
2. Discuss why SSA fails: sketch a 30-degree angle with a short side opposite it that can swing to two positions. Say why AAA also fails.
3. Prove vertical angles are congruent and that consecutive interior angles are supplementary when a transversal crosses parallel lines. Apply to algebra: consecutive interior angles of (9x - 4) and (6x + 4) degrees.

## Checking for understanding

Ask for the reason on a mystery step in a proof: "Angle 1 is congruent to angle 2 and angle 2 is congruent to angle 3, so angle 1 is congruent to angle 3." Look for the name of the property.

## Worksheet

Hand out the worksheet and collect it at the end of the lesson.
`,
  reading: [
    "Why a few measurements are enough",
    `
Last week you proved triangles congruent by finding a sequence of rigid motions. That is a lot of work, so geometers look for shortcuts, and they prove each shortcut from the definition. Take SAS. Suppose triangle ABC and triangle DEF have AB = DE, BC = EF and angle B equal to angle E. Translate the first triangle so that B lands on E. Rotate it about E so that ray BA lies along ray ED. Because AB = DE, the point A lands exactly on D. If C is on the wrong side of line ED, reflect across line ED, which does not move D or E. Now ray BC lies along ray EF, since the angle at B equals the angle at E, and since BC = EF the point C lands on F. All three vertices coincide, so the triangles are congruent. SSS and ASA can be argued in the same way: the given measurements force each remaining vertex into one place.

This also shows why some combinations fail. In SSA, the angle is not between the two sides. The side opposite the given angle can swing to two positions, so two different triangles can have the same two sides and the same non-included angle, and SSA proves nothing. AAA fixes the shape but not the size, so two equilateral triangles of different sizes share all three angles and are not congruent. For these reasons, the three valid criteria are SSS, SAS and ASA, and a related one, AAS, follows because the third angle is determined by the angle sum.

Parallel lines let us turn angle facts into equations. When parallel lines are cut by a transversal, corresponding angles are congruent, alternate interior angles are congruent, and consecutive interior angles are supplementary. Suppose consecutive interior angles measure (9x - 4) and (6x + 4) degrees. They add to 180, so 15x = 180, x = 12, and the angles are 104 and 76 degrees. To check, the vertical angle of the 104-degree angle is also 104, and it forms a linear pair with the 76-degree angle, which sums to 180. The converses are also true, so if alternate interior angles of (5x - 12) and (3x + 14) degrees are congruent, then x = 13 and the lines are parallel. Every claim in a proof needs a reason, and the properties of equality and congruence (reflexive, symmetric, transitive, substitution) are the glue that connects the steps.
`,
  ],
  cards: [
    ["SSA", "Two sides and a non-included angle. It does not prove congruence because two different triangles can fit."],
    ["AAS", "Two angles and a non-included side. It proves congruence, since the third angle is fixed by the angle sum."],
    ["Consecutive interior angles", "Angles on the same side of a transversal and between two lines. They are supplementary if the lines are parallel."],
    ["Converse of the alternate interior angles theorem", "If alternate interior angles are congruent, the lines are parallel."],
    ["Two-column proof", "A proof laid out as statements and the reasons that justify them."],
    ["Transitive property of congruence", "If angle 1 is congruent to angle 2 and angle 2 to angle 3, then angle 1 is congruent to angle 3."],
    ["Substitution property", "If two quantities are equal, one can be replaced by the other in an expression or equation."],
    ["Supplementary angles", "Two angles whose measures add to 180 degrees."],
  ],
  closed: [
    [
      "Which combination of corresponding parts does NOT guarantee that two triangles are congruent?",
      ["SAS", "ASA", "SSA", "SSS"],
      "C",
    ],
    [
      "Parallel lines are cut by a transversal. Consecutive interior angles measure (7x + 4) and (3x + 16) degrees. What is the measure of the smaller angle?",
      ["64 degrees", "116 degrees", "16 degrees", "180 degrees"],
      "A",
    ],
    [
      "Parallel lines a and b are cut by a transversal t. Angle 1 is above a and left of t and measures 112 degrees. Angle 5 is above b and left of t. Angle 7 is below b and right of t. Angle 8 is below b and left of t. What is the measure of angle 8?",
      ["112 degrees", "68 degrees", "22 degrees", "248 degrees"],
      "B",
    ],
    [
      "In a proof, angle 1 is congruent to angle 2 and angle 2 is congruent to angle 3, so angle 1 is congruent to angle 3. What is the reason?",
      ["Reflexive property of congruence", "Symmetric property of congruence", "Vertical angles theorem", "Transitive property of congruence"],
      "D",
    ],
    [
      "Alternate interior angles formed by two lines and a transversal measure (5x - 12) and (3x + 14) degrees. For which value of x are the lines parallel?",
      ["13", "22.25", "26", "1"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Triangle ABC and triangle DEF have AB = DE, angle B equal to angle E, and BC = EF. Use rigid motions to explain why SAS guarantees that the triangles are congruent.",
      scheme: [
        "Translates triangle ABC so that B lands on E",
        "Rotates about E so that ray BA lies along ray ED, and A lands on D because AB = DE",
        "Uses the equal angle at B and E (and a reflection across line ED if needed) to put ray BC along ray EF",
        "Says C lands on F because BC = EF, so all three vertices coincide and the triangles are congruent",
      ],
      model:
        "Translate triangle ABC so that B lands on E. Rotate it about E so that ray BA lies along ray ED. Since AB = DE, point A lands on D. If C is on the opposite side of line ED from F, reflect across line ED, which keeps D and E fixed. Because angle B equals angle E, ray BC now lies along ray EF, and since BC = EF, point C lands on F. All three vertices of triangle ABC coincide with D, E and F, so a sequence of rigid motions maps ABC onto DEF, and the triangles are congruent.",
      answers: [
        [
          "full",
          "[[0|First translate triangle ABC so that point B moves to point E.]] [[1|Then rotate around E until ray BA is on top of ray ED. Since AB = DE, A lands right on D.]] [[2|If C is on the other side of line ED, reflect over line ED, which leaves D and E where they are. Because the angles at B and E are equal, ray BC now falls on ray EF.]] [[3|BC = EF so C lands on F. Now every vertex matches, so a sequence of rigid motions maps ABC onto DEF.]]",
          "Full marks. Including the reflection for the case where C is on the other side makes your argument complete.",
        ],
        [
          "full",
          "Move B to E by a [[0|translation]]. Next, [[1|rotation about E so side BA goes along side ED, and because the lengths are equal A is on D]]. The angle at B is the same as the angle at E, so [[2|after a possible reflection over line DE, the other side of the angle BC lines up with EF]]. [[3|Since BC and EF have the same length, C ends on F]]. All three vertices match, so by definition the triangles are congruent.",
          "All four marks. You used each given piece of information in exactly one step, which is how SAS should read.",
        ],
        [
          "partial",
          "[[0|Slide it so B is on E.]] [[1|Turn it so BA is on ED, and A is on D because the lengths are equal.]] Then the triangles look the same so they're congruent.",
          "The first two moves are right. 'Look the same' needs to be replaced by the equal angle at B and E, which puts ray BC on ray EF, and the equal sides BC and EF, which put C on F.",
        ],
        [
          "partial",
          "[[2|The angle at B equals the angle at E so ray BC lies along ray EF.]] [[3|BC equals EF so C lands on F.]]",
          "Those two steps are right. Start the proof: translate B onto E, rotate so that BA lies on ED, and use AB = DE to land A on D. Without that the angle step has nothing to rest on.",
          true,
        ],
        [
          "weak",
          "SAS works because two sides and an angle is enough to measure the triangle. You don't need rigid motions.",
          "The question asks you to connect SAS to the definition of congruence, which uses rigid motions. Show how a sequence of motions places each vertex on its match.",
        ],
        [
          "weak",
          "[[0|Translate B to E]] and then dilate the triangle until it fits.",
          "You started well. A dilation changes size, which is not allowed in congruence. Because AB = DE, a rotation is enough to place A on D.",
        ],
      ],
    },
    {
      prompt:
        "Parallel lines a and b are cut by a transversal. A pair of consecutive interior angles measure (9x - 4) degrees and (6x + 4) degrees. Name the theorem you use, find x and both angle measures, and check your answer with a second angle fact.",
      scheme: [
        "States that consecutive interior angles are supplementary when the lines are parallel",
        "Writes the equation (9x - 4) + (6x + 4) = 180",
        "Solves to get x = 12, with angles of 104 and 76 degrees",
        "Checks with a second fact, such as the vertical angle of the 104-degree angle forming a linear pair with the 76-degree angle",
      ],
      model:
        "When parallel lines are cut by a transversal, consecutive interior angles are supplementary, so (9x - 4) + (6x + 4) = 180. That simplifies to 15x = 180, so x = 12. The angles are 9(12) - 4 = 104 degrees and 6(12) + 4 = 76 degrees. As a check, the angle vertical to the 104-degree angle is also 104 degrees, and it forms a linear pair with the 76-degree angle, and 104 + 76 = 180.",
      answers: [
        [
          "full",
          "[[0|When lines are parallel, consecutive interior angles are supplementary.]] [[1|(9x - 4) + (6x + 4) = 180]]. The -4 and +4 cancel so 15x = 180. [[2|x = 12, and the angles are 104 and 76.]] [[3|Check: the vertical angle to the 104 is 104, and it forms a linear pair with the 76, and 104 + 76 = 180.]]",
          "Full marks. The linear pair check uses a different theorem from the one you used to solve, so it is a real check.",
        ],
        [
          "full",
          "Theorem: [[0|consecutive interior angles of parallel lines add to 180 degrees]]. Equation: [[1|9x - 4 + 6x + 4 = 180]]. 15x = 180. [[2|x = 12, so the angles are 9(12) - 4 = 104 and 6(12) + 4 = 76]]. [[3|To check, a corresponding angle to the 76 is also 76, and next to the 104 it is a linear pair, which is 180]].",
          "All four marks. Using a corresponding angle in a check is another valid way.",
        ],
        [
          "partial",
          "[[0|They're supplementary.]] [[1|9x - 4 + 6x + 4 = 180]] so 15x = 176 and x = 11.7.",
          "Your theorem and equation are right. Combine -4 and +4, which cancel, to get 15x = 180 and x = 12, a whole number. Check by substitution before you trust a decimal.",
        ],
        [
          "partial",
          "[[2|x = 12, and the angles are 104 and 76.]] [[3|104 + 76 = 180.]]",
          "Your numbers are right. Name the theorem and write the equation, which come first. And the check should use a different fact, not just the sum you started from.",
          true,
        ],
        [
          "weak",
          "They're equal since they're from parallel lines. 9x - 4 = 6x + 4 so 3x = 8 and x = 2.67.",
          "Alternate interior and corresponding angles are equal. Consecutive interior angles are on the same side and add to 180, so the equation is a sum.",
        ],
        [
          "weak",
          "[[1|(9x - 4) + (6x + 4) = 180]] and that makes x = 12, 12 + 12 = 24 degrees each.",
          "Your equation is right. After you find x, you substitute it into each expression, not add it to itself. The angles are 104 and 76 degrees.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Constructions and their proofs, angle sums and the midsegment theorem",
  note: `
## Objectives

Students will be able to:

1. make formal constructions with a compass and straightedge and prove that each one works;
2. prove theorems about triangles, including the angle sum, the exterior angle theorem and the midsegment theorem, in synthetic and coordinate form.

## Materials

Compasses, straightedges, unlined paper, a document camera, graph paper, the worksheet.

## Starter (8 minutes)

Challenge: construct an equilateral triangle on a given segment AB with only a compass and straightedge. Give students five minutes. Take the answer, circles about A through B and about B through A, and ask the class to say why the third vertex gives an equilateral triangle. The reason, two radii of equal circles, is the model for every construction proof.

## Main activity

1. Construct the angle bisector of angle B and prove it by SSS. Mark P and Q on the two rays at equal distances, then arcs from P and Q to meet at R, and show triangles BPR and BQR are congruent.
2. Construct the perpendicular from a point P to a line, and say why PA = PB places P on the perpendicular bisector of AB.
3. Triangle angle facts: if the angles at A and B are (2x + 10) and (3x - 5) degrees and the exterior angle at C is (7x - 25) degrees, find x and the angle at C.
4. Coordinates: place triangle ABC with A(0, 0), B(2b, 0) and C(2c, 2d). Find the midpoints M of AC and N of BC and prove that MN is parallel to AB and half its length.

## Checking for understanding

Cold call: "What is the measure of angle AIB if I is the intersection of the bisectors of angles A and B and angle C is 70 degrees?"

## Worksheet

Collect the worksheet at the end of class.
`,
  reading: [
    "Every construction has a proof",
    `
A construction is a drawing made with only a compass and an unmarked straightedge, and it earns its place only if you can prove that it does what you claim. To build an equilateral triangle on segment AB, draw a circle centered at A through B and a circle centered at B through A. Let C be one of the points where they meet. Then AC is a radius of the first circle, so AC = AB. And BC is a radius of the second circle, so BC = AB. All three sides equal AB, so the triangle is equilateral.

To bisect angle B, draw an arc centered at B that meets the two rays at P and Q, so BP = BQ. From P and from Q draw arcs of the same radius that cross at a point R inside the angle. Draw ray BR. Triangles BPR and BQR have BP = BQ, PR = QR (the equal arcs) and the shared side BR, so they are congruent by SSS. Corresponding angles PBR and QBR are therefore equal, which means ray BR bisects the angle. The perpendicular from a point P to a line works the same way: an arc about P meets the line at A and B, so PA = PB, which puts P on the perpendicular bisector of AB. Constructing that bisector therefore gives the line through P that is perpendicular to AB.

The triangle facts you know lead to algebra. If the angles at A and B are (2x + 10) and (3x - 5) degrees and the exterior angle at C is (7x - 25) degrees, the exterior angle theorem says 7x - 25 = (2x + 10) + (3x - 5) = 5x + 5, so x = 15. The angles at A and B are both 40 degrees, the exterior angle is 80 degrees and the interior angle at C is 100 degrees. A neat fact follows when the bisectors of angles A and B meet at I. The angles in triangle ABI add to 180 degrees, so angle AIB = 180 - (A + B)/2. If angle C is 70 degrees then A + B = 110 and angle AIB = 180 - 55 = 125 degrees.

The midsegment theorem has a coordinate proof that works for any triangle. Put A at (0, 0), B at (2b, 0) and C at (2c, 2d). Using 2b and 2c keeps the midpoints free of fractions. The midpoint of AC is M(c, d) and the midpoint of BC is N(b + c, d). The slope of MN is 0, the same as the slope of AB, so they are parallel, and MN = (b + c) - c = b while AB = 2b. So MN is half of AB. Because the triangle was a general one, this proves the theorem for every triangle, which no single drawing can do.
`,
  ],
  cards: [
    ["Construction", "A figure drawn with only a compass and an unmarked straightedge."],
    ["Equidistant", "At the same distance from two points. Points equidistant from A and B lie on the perpendicular bisector of AB."],
    ["Angle bisector construction", "Arcs from two equal points on the rays cross at R. Ray BR bisects the angle, by SSS."],
    ["Exterior angle theorem", "An exterior angle of a triangle equals the sum of the two remote interior angles."],
    ["Incenter angle fact", "If the bisectors of angles A and B of a triangle meet at I, then angle AIB = 180 degrees minus half of (A + B)."],
    ["Midsegment theorem", "A segment joining the midpoints of two sides is parallel to the third side and half its length."],
    ["Coordinate proof", "A proof that places a general figure on a grid and uses algebra to prove a fact for all such figures."],
    ["Using 2b and 2c", "Choosing even coordinates so midpoints have no fractions."],
  ],
  closed: [
    [
      "Circles are drawn about A through B and about B through A. They meet at C. Why is triangle ABC equilateral?",
      [
        "Because the circles have different radii",
        "AC and BC are radii of circles of radius AB, so all three sides equal AB",
        "Because C is the midpoint of AB",
        "Because the angles of any triangle are equal",
      ],
      "B",
    ],
    [
      "In triangle ABC, angle A is (2x + 10) degrees, angle B is (3x - 5) degrees and the exterior angle at C is (7x - 25) degrees. What is the measure of the interior angle at C?",
      ["80 degrees", "40 degrees", "15 degrees", "100 degrees"],
      "D",
    ],
    [
      "Triangle ABC has A(2, 3), B(10, 5) and C(6, 11). M is the midpoint of AB and N is the midpoint of AC. What is the length of MN?",
      ["the square root of 13", "2 times the square root of 13", "13", "5"],
      "A",
    ],
    [
      "To construct the perpendicular from a point P to a line, an arc about P meets the line at A and B. Why does the perpendicular bisector of AB pass through P?",
      [
        "Because P is on the line",
        "Because AB is the shortest segment",
        "Because PA = PB, so P is equidistant from A and B",
        "Because the arc is a straight line",
      ],
      "C",
    ],
    [
      "In triangle ABC, angle C is 70 degrees. The bisectors of angles A and B meet at I. What is angle AIB?",
      ["110 degrees", "125 degrees", "145 degrees", "55 degrees"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Describe how to construct the bisector of angle B with a compass and straightedge, and prove that the ray you draw bisects the angle. Name the congruence criterion you use.",
      scheme: [
        "Draws an arc centered at B that meets the two rays at P and Q, so BP = BQ",
        "From P and Q draws arcs of equal radius that meet at R, so PR = QR, and draws ray BR",
        "Says triangles BPR and BQR are congruent by SSS, with BR shared",
        "Concludes angle PBR equals angle QBR as corresponding parts, so BR bisects the angle",
      ],
      model:
        "Draw an arc centered at B that meets the rays at P and Q, so BP = BQ. With the compass set to the same opening, draw arcs from P and from Q that cross at R inside the angle, so PR = QR, and draw ray BR. Triangles BPR and BQR have BP = BQ, PR = QR and the shared side BR, so they are congruent by SSS. Corresponding angles PBR and QBR are equal, so ray BR bisects angle B.",
      answers: [
        [
          "full",
          "[[0|Put the compass point on B and draw an arc that crosses both rays, at P and Q, so BP = BQ.]] [[1|Then from P and from Q draw arcs with the same radius that cross at R. PR = QR. Draw ray BR.]] Proof: [[2|triangle BPR and triangle BQR have BP = BQ, PR = QR and BR = BR, so they are congruent by SSS.]] [[3|So angle PBR = angle QBR by corresponding parts, which means BR cuts the angle in half.]]",
          "Full marks. Each equal pair of sides in the SSS argument comes from a specific step of the construction.",
        ],
        [
          "full",
          "Construction: [[0|an arc about B hits the sides at P and Q (equal radius)]]; [[1|arcs about P and Q with one compass setting meet at R, then draw the ray BR]]. Proof: BP = BQ from the first arc, PR = QR from the equal arcs, and BR is in both triangles, [[2|so by SSS the triangles are congruent]]. [[3|CPCTC says angle PBR and angle QBR are congruent, so BR bisects angle PBQ]].",
          "All four marks. Using CPCTC as the final reason is exactly how the proof is written.",
        ],
        [
          "partial",
          "[[0|Draw an arc from B across both sides.]] [[1|Make arcs from those points that cross, and draw a ray from B through the crossing.]] That's the bisector because it goes through the middle.",
          "The construction steps are right. 'Through the middle' is not a proof. Show two congruent triangles by SSS, which gives equal angles by corresponding parts.",
        ],
        [
          "partial",
          "[[2|Triangle BPR is congruent to triangle BQR by SSS.]] [[3|So the angles at B are equal and BR bisects angle B.]]",
          "Your proof is right. Start with the construction, and say where the three equal sides come from: BP = BQ, PR = QR and the shared BR.",
          true,
        ],
        [
          "weak",
          "Measure the angle with a protractor, divide by 2, and draw the ray at that angle.",
          "Constructions use only a compass and an unmarked straightedge, so measuring is not allowed. And a protractor is no proof for every angle.",
        ],
        [
          "weak",
          "[[2|They're congruent by SAS]] because the sides and one angle match. The bisector splits the angle.",
          "SAS does not apply here, since the angle at B is what we are trying to show is split. The three pairs of equal sides give SSS.",
        ],
      ],
    },
    {
      prompt:
        "Triangle ABC has A(0, 0), B(2b, 0) and C(2c, 2d), where b, c and d are positive numbers. Let M be the midpoint of AC and N the midpoint of BC. Prove with coordinates that MN is parallel to AB and that MN = AB / 2.",
      scheme: [
        "Finds the midpoints M(c, d) and N(b + c, d)",
        "Finds the slope of MN is 0 and the slope of AB is 0, so MN is parallel to AB",
        "Finds MN = (b + c) - c = b",
        "Finds AB = 2b, so MN = AB / 2, and says the argument holds for any triangle because the coordinates are general",
      ],
      model:
        "The midpoint of AC is M(c, d) and the midpoint of BC is N((2b + 2c)/2, (0 + 2d)/2) = (b + c, d). Both points have y-coordinate d, so MN is horizontal with slope 0, and AB lies on the x-axis with slope 0, so MN is parallel to AB. MN = (b + c) - c = b, and AB = 2b - 0 = 2b, so MN = AB / 2. Since b, c and d are arbitrary, this proves the midsegment theorem for every triangle.",
      answers: [
        [
          "full",
          "[[0|M = (0 + 2c)/2, (0 + 2d)/2 = (c, d) and N = ((2b + 2c)/2, (0 + 2d)/2) = (b + c, d).]] [[1|MN is horizontal because both have y = d, so its slope is 0, same as AB, which lies on the x-axis, so they're parallel.]] [[2|The length is (b + c) - c = b.]] [[3|AB = 2b, so MN is half of AB. Since b, c and d could be any numbers this holds for every triangle.]]",
          "Full marks. Your closing sentence about b, c and d being any numbers is what makes a coordinate proof general.",
        ],
        [
          "full",
          "Midpoints by averaging: [[0|M(c, d), N(b + c, d)]]. [[1|Same y means MN is horizontal, slope 0, and AB is on the x-axis with slope 0, so MN is parallel to AB]]. Distance along a horizontal line: [[2|MN = b + c - c = b]]. [[3|AB = 2b - 0 = 2b, so MN = (1/2)AB. The letters stand for any triangle so the theorem is proved in general]].",
          "All four marks. Each step is stated and can be checked line by line.",
        ],
        [
          "partial",
          "[[0|M is (c, d) and N is (b + c, d).]] They have the same y so [[1|MN is horizontal and parallel to AB]]. And MN = b + c.",
          "The midpoints and the parallel claim are right. The length of MN is the difference of x-coordinates, (b + c) - c = b, not their sum.",
        ],
        [
          "partial",
          "[[2|MN = b]] and [[3|AB = 2b so MN is half of AB]]. The midpoints are halfway.",
          "Your lengths are right. Show the midpoints, M(c, d) and N(b + c, d), and show the parallel part using slope. Both are needed.",
          true,
        ],
        [
          "weak",
          "I tried A(0, 0), B(4, 0), C(2, 6): MN came out half of AB so the theorem is proved.",
          "One example is a good check but not a proof. The question uses letters, b, c and d, so that the proof covers every triangle.",
        ],
        [
          "weak",
          "[[0|M is (c, d)]]. N is (c, d) too because C is the top. So MN is zero.",
          "M is right. N is the midpoint of BC, so it averages B(2b, 0) and C(2c, 2d), which gives (b + c, d), a different point from M.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Isosceles triangles, concurrency, parallelograms and polygons on the grid",
  note: `
## Objectives

Students will be able to:

1. prove theorems about isosceles triangles and the points of concurrency of a triangle;
2. prove theorems about parallelograms and use them, with converses, to classify quadrilaterals;
3. use coordinates, distance and slope to classify polygons and find perimeters.

## Materials

Graph paper, a compass, rulers, patty paper, the worksheet.

## Starter (8 minutes)

Ask students to draw any triangle, construct the perpendicular bisectors of two sides, and mark where they cross. Then have them draw a circle centered there passing through one vertex. The circle passes through the other two vertices as well. Ask: "Why must that be true?" Hold the question until the proof.

## Main activity

1. Prove that the perpendicular bisectors of the sides of a triangle are concurrent. Use the perpendicular bisector theorem and its converse. Name the point the circumcenter, and find it for a right triangle with legs on the axes, (0, 0), (8, 0), (0, 6).
2. Find the centroid of the triangle with vertices (1, 2), (7, 4), (4, 12) as the average of the coordinates, and check that it lies two thirds of the way along a median.
3. Parallelograms: list the conditions that guarantee a quadrilateral is a parallelogram and a one that does not. Find the fourth vertex of a parallelogram given three vertices.
4. Classify a quadrilateral from coordinates with the distance formula and slopes.

## Checking for understanding

True or false with a counterexample: "A quadrilateral with one pair of parallel sides is a parallelogram."

## Worksheet

Collect the worksheet at the end of class.
`,
  reading: [
    "Concurrency, converses and classifying shapes",
    `
In an isosceles triangle with congruent sides AB and AC, the base angles at B and C are congruent. The proof uses the midpoint M of BC: AM is common, AB = AC and BM = CM, so the triangles ABM and ACM are congruent by SSS, and the angles at B and C are corresponding parts. The converse holds too: if two angles are equal then the sides opposite them are equal. These facts give equations. If the base angles are (2x + 10) degrees and the vertex angle is (7x - 5) degrees, the angles sum to 180, so 11x + 15 = 180 and x = 15, giving base angles of 40 degrees and a vertex angle of 100 degrees.

The Perpendicular Bisector Theorem says that every point on the perpendicular bisector of a segment is the same distance from the endpoints. Its converse says that any point equidistant from the endpoints lies on the bisector. Together they prove that the three perpendicular bisectors of a triangle meet at one point. Let the bisectors of AB and BC meet at O. Then OA = OB and OB = OC, so OA = OC, so O is on the perpendicular bisector of AC as well. The point O, called the circumcenter, is the same distance from all three vertices, so it is the center of the circle through them. For a right triangle with vertices (0, 0), (8, 0) and (0, 6), the circumcenter is the midpoint of the hypotenuse, (4, 3). Other centers are different points: the centroid, where the medians meet, is the average of the vertices, so for (0, 0), (8, 0), (0, 6) it is (8/3, 2), and for (1, 2), (7, 4), (4, 12) it is (4, 6). The incenter, where the angle bisectors meet, is equally far from the three sides.

Parallelograms have many properties, and several of them also work as tests. A quadrilateral is a parallelogram if both pairs of opposite sides are parallel, or both pairs are congruent, or the diagonals bisect each other, or one pair of opposite sides is both parallel and congruent. One pair of parallel sides alone is not enough, since it also describes a trapezoid. Given A(0, 0), B(5, 2) and C(8, 6), the fourth vertex D of parallelogram ABCD is found by going from A the same way C is from B: D = A + C - B = (3, 4). Check that DC = (5, 2), the same as AB.

Coordinates can classify a shape. For A(1, 1), B(4, 5), C(9, 5) and D(6, 1), the distance formula gives AB = 5, BC = 5, CD = 5 and DA = 5, so all four sides are equal. The slopes of AB and DC are both 4/3 and BC and AD are both horizontal, so it is a parallelogram, and a rhombus. The diagonals AC and BD have slopes 1/2 and -2, whose product is -1, so they are perpendicular. It is not a square: AB has slope 4/3 and BC has slope 0, so they are not perpendicular. The perimeter is 20.
`,
  ],
  cards: [
    ["Perpendicular Bisector Theorem", "Every point on the perpendicular bisector of a segment is equidistant from its endpoints. The converse is also true."],
    ["Circumcenter", "The point where a triangle's perpendicular bisectors meet. It is the center of the circle through the three vertices."],
    ["Centroid", "The point where the medians meet. Its coordinates are the averages of the vertices' coordinates."],
    ["Incenter", "The point where the angle bisectors meet. It is equidistant from the three sides."],
    ["Converse of the base angles theorem", "If two angles of a triangle are congruent, the sides opposite them are congruent."],
    ["Parallelogram tests", "Opposite sides parallel, opposite sides congruent, diagonals bisecting each other, or one pair of sides parallel and congruent."],
    ["Fourth vertex of a parallelogram", "For A, B, C taken in order, D = A + C - B."],
    ["Rhombus", "A parallelogram with four congruent sides. Its diagonals are perpendicular."],
  ],
  closed: [
    [
      "An isosceles triangle has base angles of (2x + 10) degrees each and a vertex angle of (7x - 5) degrees. What is x?",
      ["12", "18", "20", "15"],
      "D",
    ],
    [
      "A right triangle has vertices (0, 0), (8, 0) and (0, 6). What are the coordinates of its circumcenter?",
      ["(4, 3)", "(8/3, 2)", "(2, 2)", "(0, 0)"],
      "A",
    ],
    [
      "What are the coordinates of the centroid of the triangle with vertices (1, 2), (7, 4) and (4, 12)?",
      ["(5, 6)", "(4, 6)", "(4, 18)", "(12, 18)"],
      "B",
    ],
    [
      "Parallelogram ABCD has A(0, 0), B(5, 2) and C(8, 6). What are the coordinates of D?",
      ["(13, 8)", "(3, -4)", "(3, 4)", "(-3, -4)"],
      "C",
    ],
    [
      "Which condition does NOT guarantee that a quadrilateral is a parallelogram?",
      [
        "Both pairs of opposite sides are congruent",
        "The diagonals bisect each other",
        "One pair of opposite sides is both parallel and congruent",
        "One pair of opposite sides is parallel",
      ],
      "D",
    ],
  ],
  open: [
    {
      prompt:
        "Prove that the perpendicular bisectors of sides AB and BC of triangle ABC meet at a point O that is equidistant from A, B and C, and that O also lies on the perpendicular bisector of AC. Cite the theorem you use at each step.",
      scheme: [
        "Lets the perpendicular bisectors of AB and BC meet at O, and says OA = OB by the Perpendicular Bisector Theorem",
        "Says OB = OC by the Perpendicular Bisector Theorem",
        "Concludes OA = OC by substitution (or transitivity), so O is equidistant from A, B and C",
        "Uses the converse of the Perpendicular Bisector Theorem to say O lies on the perpendicular bisector of AC, so all three bisectors meet at O",
      ],
      model:
        "Let the perpendicular bisectors of AB and BC meet at O. O is on the perpendicular bisector of AB, so OA = OB by the Perpendicular Bisector Theorem. O is on the perpendicular bisector of BC, so OB = OC. By transitivity OA = OC, so O is equidistant from A, B and C. By the converse of the Perpendicular Bisector Theorem, a point equidistant from A and C is on the perpendicular bisector of AC, so all three bisectors pass through O.",
      answers: [
        [
          "full",
          "[[0|Say the bisectors of AB and BC cross at O. Because O is on the bisector of AB, OA = OB by the Perpendicular Bisector Theorem.]] [[1|And since O is on the bisector of BC, OB = OC, same theorem.]] [[2|So OA = OB = OC, so OA = OC by the transitive property, and O is the same distance from all three.]] [[3|By the converse of the theorem, a point the same distance from A and C is on the perpendicular bisector of AC, so the third bisector goes through O too.]]",
          "Full marks. The converse is what turns equal distances into membership on the third bisector, and you named it.",
        ],
        [
          "full",
          "Take O where the first two bisectors meet. (1) [[0|O on the bisector of AB gives OA = OB (Perpendicular Bisector Theorem)]]. (2) [[1|O on the bisector of BC gives OB = OC (same theorem)]]. (3) [[2|OA = OC, by substitution, so O is equidistant from A, B, C]]. (4) [[3|The converse of the Perpendicular Bisector Theorem says a point equidistant from A and C lies on the bisector of AC. All three bisectors are concurrent at O]].",
          "All four marks. Numbering the steps and citing a reason for each is the right format.",
        ],
        [
          "partial",
          "[[0|O is on the bisector of AB, so OA = OB.]] [[1|O is on the bisector of BC, so OB = OC.]] So the bisectors meet at O and that's it.",
          "Your first two steps are right. Combine them: OA = OC. Then use the converse of the theorem to show O is also on the third bisector.",
        ],
        [
          "partial",
          "[[2|OA = OB and OB = OC so OA = OC.]] [[3|By the converse, O is on the bisector of AC.]]",
          "The logic is good. Say where OA = OB and OB = OC come from: O lies on the perpendicular bisectors of AB and BC, so the theorem gives each equality.",
          true,
        ],
        [
          "weak",
          "The three bisectors cross at the middle of the triangle, because that's what the circumcenter is, you can see it in the drawing.",
          "A drawing shows one triangle, but a proof must hold for any triangle. Use the theorem about points on a perpendicular bisector.",
        ],
        [
          "weak",
          "[[1|OB = OC]] because the triangle is isosceles. So all the sides are equal.",
          "This triangle is not assumed to be isosceles. OB = OC comes from O being on the bisector of BC. The theorem works for any triangle.",
        ],
      ],
    },
    {
      prompt:
        "Quadrilateral ABCD has A(1, 1), B(4, 5), C(9, 5) and D(6, 1). Use the distance formula and slopes to classify it as precisely as you can. Is it a square? Find its perimeter.",
      scheme: [
        "Finds all four sides equal to 5 using the distance formula",
        "Uses slopes (AB and DC both 4/3, BC and AD both 0) to show both pairs of opposite sides are parallel, so it is a parallelogram",
        "Finds the diagonal slopes 1/2 and -2, which multiply to -1, so the diagonals are perpendicular and the shape is a rhombus",
        "Shows it is not a square because adjacent sides AB and BC are not perpendicular, and gives a perimeter of 20",
      ],
      model:
        "AB = the square root of (3^2 + 4^2) = 5, BC = 5, CD = 5 and DA = 5, so all four sides are equal. Slopes: AB and DC both have slope 4/3, and BC and AD both have slope 0, so opposite sides are parallel and ABCD is a parallelogram with four equal sides, a rhombus. The diagonals AC and BD have slopes 1/2 and -2, and (1/2)(-2) = -1, so they are perpendicular, as in every rhombus. It is not a square, since AB (slope 4/3) and BC (slope 0) are not perpendicular, so the angles are not right angles. The perimeter is 4(5) = 20.",
      answers: [
        [
          "full",
          "[[0|AB = sqrt(9 + 16) = 5, BC = 9 - 4 = 5, CD = sqrt(9 + 16) = 5, DA = 6 - 1 = 5. All four sides are 5.]] [[1|The slopes of AB and DC are both 4/3, and BC and AD are both horizontal, so both pairs of opposite sides are parallel. It's a parallelogram.]] [[2|Diagonals AC has slope 4/8 = 1/2 and BD has slope -4/2 = -2, they multiply to -1, so they're perpendicular, which fits a rhombus.]] [[3|It isn't a square because AB with slope 4/3 isn't perpendicular to BC with slope 0. The perimeter is 4 x 5 = 20.]]",
          "Full marks. You tested each property with numbers, and used the slope test to rule out a square.",
        ],
        [
          "full",
          "Sides: [[0|AB 3 over, 4 up is 5; BC is 5 across; CD is 3 back, 4 down is 5; AD is 5 across. A shape with four equal sides is a rhombus]]. [[1|Opposite slopes: AB and DC are 4/3, BC and AD are 0, so it's a parallelogram too]]. [[2|The diagonals have slopes 1/2 and -2, product -1, perpendicular]]. [[3|Not a square, since the angle at B is between a slope-4/3 side and a flat side, so not 90 degrees. Perimeter = 20]].",
          "All four marks. Using the 3-4-5 shape for the sloped sides is quick and correct.",
        ],
        [
          "partial",
          "[[0|All four sides are 5.]] [[3|The perimeter is 20.]] I think it's a square because all the sides are equal.",
          "Your side lengths and perimeter are right. Equal sides give a rhombus, not necessarily a square. A square also needs right angles, and AB and BC are not perpendicular.",
        ],
        [
          "partial",
          "[[1|AB and DC both have slope 4/3 and BC and AD have slope 0, so it's a parallelogram.]] [[2|The diagonals' slopes are 1/2 and -2, perpendicular.]]",
          "The parallelogram test and the diagonal slopes are right. Find the side lengths: all four are 5, which makes it a rhombus, and use them to give the perimeter, 20.",
          true,
        ],
        [
          "weak",
          "It's a rectangle because it looks like it has two long sides and two short sides.",
          "Check with numbers. All four sides are 5, so there are no long and short sides. And the angle at B is not a right angle because the slopes 4/3 and 0 are not negative reciprocals.",
        ],
        [
          "weak",
          "[[3|The perimeter is 20]]. The slopes are 4 and 3 so it's perpendicular, and a square.",
          "The perimeter is right. The slopes are 4/3 and 0, not 4 and 3, and they are not perpendicular, because perpendicular slopes multiply to -1. So it is not a square.",
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

1. prove the slope criteria for parallel and perpendicular lines and use them to write equations and solve problems;
2. use coordinates to prove geometric theorems algebraically, including dividing a segment in a given ratio.

## Materials

Graph paper, rulers, patty paper, a quiz, whiteboards.

## Starter (8 minutes)

Draw two parallel lines on a grid, and have students make slope triangles on each. Ask: "Why must the rise over run be the same?" Let them discover that the two right triangles are similar by AA, because the lines are parallel and make equal angles with the horizontal.

## Main activity

1. Prove: parallel lines have equal slope, using similar slope triangles. Prove: perpendicular lines have slopes whose product is -1, using the rotation (x, y) to (-y, x) of the line through the origin and (a, b).
2. Write the perpendicular bisector of the segment from (-1, 3) to (5, 7): find the midpoint, the slope, and then the equation.
3. Divide a segment in a ratio: the point P that is one third of the way from A(-2, 1) to B(10, 10).
4. Coordinate proof: connect the midpoints of the sides of quadrilateral A(0, 0), B(8, 2), C(10, 10), D(2, 8), and show the result is a parallelogram.

## Checking for understanding

Ask for the area of the triangle with vertices A(1, 1), B(7, 3), C(3, 7) with the vector cross product or the shoelace method, and compare with a box-and-subtract method.

## Quiz

Collect the quiz in the last ten minutes.
`,
  reading: [
    "Why the slope rules are true, and what coordinates can prove",
    `
You may have been told that parallel lines have the same slope and perpendicular lines have slopes that multiply to -1. Those statements need proof, and the proofs use ideas you already have. To see why parallel lines have equal slopes, draw a horizontal line across two parallel lines and drop a vertical segment from one. You get two right triangles. The parallel lines make equal angles with the horizontal, so the triangles are similar by AA, and the ratio of vertical side to horizontal side, the rise over run, is the same in both. Equal slopes are the same thing as similar slope triangles.

For perpendicular lines, take the line through the origin and the point (a, b). Its slope is b/a. Rotate it 90 degrees counterclockwise about the origin using (x, y) to (-y, x). The point (a, b) goes to (-b, a), so the image line passes through the origin and (-b, a) and has slope a/(-b) = -a/b. A rotation of 90 degrees turns every line into a perpendicular line, so perpendicular lines have slopes that are negative reciprocals, with product (b/a)(-a/b) = -1. Any line can be translated so it passes through the origin, and translation does not change slope, so this covers every case.

With the slope rules you can write equations. The line through (0, 1) perpendicular to the line through (-3, 2) and (5, -2) has a given slope of -4/8 = -1/2, so the perpendicular slope is 2 and the line is y = 2x + 1. The perpendicular bisector of the segment from (-1, 3) to (5, 7) passes through the midpoint (2, 5). The segment has slope 4/6 = 2/3, so the bisector's slope is -3/2 and its equation is y - 5 = -3/2 (x - 2), or y = -3/2 x + 8.

To find the point that divides a segment from A to B in the ratio 1:2, which is one third of the way from A, add one third of the displacement to A. For A(-2, 1) and B(10, 10), the displacement is (12, 9), so P = (-2 + 4, 1 + 3) = (2, 4). The point two thirds of the way is (6, 7). The area of a triangle with vertices A(1, 1), B(7, 3) and C(3, 7) can be found from the vectors AB = (6, 2) and AC = (2, 6): half of |6 x 6 - 2 x 2| = half of 32 = 16.

A famous coordinate result: the midpoints of the sides of any quadrilateral form a parallelogram. For A(0, 0), B(8, 2), C(10, 10) and D(2, 8) the midpoints are (4, 1), (9, 6), (6, 9) and (1, 4). The slopes of the opposite sides of the new figure match in pairs, 1 and 1, and -1 and -1, so it is a parallelogram. In this example the slopes 1 and -1 multiply to -1, so it is a rectangle.
`,
  ],
  cards: [
    ["Slope triangle", "A right triangle drawn on a line using its rise and run. Slope triangles on parallel lines are similar."],
    ["Parallel slopes proof", "Equal angles with the horizontal make similar slope triangles, so rise over run matches."],
    ["Perpendicular slopes proof", "A 90-degree rotation sends (a, b) to (-b, a), so slopes b/a and -a/b multiply to -1."],
    ["Perpendicular bisector equation", "Use the midpoint of the segment and the negative reciprocal of its slope."],
    ["Dividing a segment in a ratio", "From A, add the fraction of the displacement to A. One third of the way: A + (1/3)(B - A)."],
    ["Area from vectors", "For a triangle with sides AB = (p, q) and AC = (r, s), the area is half of |ps - qr|."],
    ["Midpoint quadrilateral", "Joining the midpoints of the sides of any quadrilateral gives a parallelogram."],
    ["Generalizing a coordinate proof", "Use letters for coordinates so the proof covers every figure, not one example."],
  ],
  closed: [
    [
      "A line passes through (-3, 2) and (5, -2). Which equation gives the line through (0, 1) perpendicular to it?",
      ["y = -1/2 x + 1", "y = -2x + 1", "y = 2x + 1", "y = 2x - 1"],
      "C",
    ],
    [
      "Point P is one third of the way from A(-2, 1) to B(10, 10). What are its coordinates?",
      ["(6, 7)", "(2, 4)", "(4, 5.5)", "(1, 2)"],
      "B",
    ],
    [
      "Which fact is used to prove that two parallel lines have the same slope?",
      [
        "Parallel lines share one point",
        "Two points determine a line",
        "Slope is defined to be 1 for parallel lines",
        "The slope triangles drawn on the lines are similar by AA, so rise over run is equal",
      ],
      "D",
    ],
    [
      "What is the equation of the perpendicular bisector of the segment from (-1, 3) to (5, 7)?",
      ["y = -3/2 x + 8", "y = -3/2 x + 5", "y = 3/2 x + 2", "y = -2/3 x + 19/3"],
      "A",
    ],
    [
      "What is the area of the triangle with vertices A(1, 1), B(7, 3) and C(3, 7)?",
      ["32", "20", "16", "24"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Quadrilateral ABCD has A(0, 0), B(8, 2), C(10, 10) and D(2, 8). Find the midpoints E, F, G and H of AB, BC, CD and DA. Use slopes to show EFGH is a parallelogram, and say what the slopes tell you about the kind of parallelogram it is.",
      scheme: [
        "Finds the midpoints E(4, 1), F(9, 6), G(6, 9) and H(1, 4)",
        "Finds the slopes of EF and HG, both 1, so those sides are parallel",
        "Finds the slopes of FG and EH, both -1, so those sides are parallel, and concludes EFGH is a parallelogram",
        "Notes that slopes 1 and -1 multiply to -1, so adjacent sides are perpendicular and EFGH is a rectangle",
      ],
      model:
        "The midpoints are E(4, 1), F(9, 6), G(6, 9) and H(1, 4). Slope of EF = (6 - 1)/(9 - 4) = 1 and slope of HG = (9 - 4)/(6 - 1) = 1, so EF is parallel to HG. Slope of FG = (9 - 6)/(6 - 9) = -1 and slope of EH = (4 - 1)/(1 - 4) = -1, so FG is parallel to EH. Both pairs of opposite sides are parallel, so EFGH is a parallelogram. The slopes 1 and -1 multiply to -1, so adjacent sides are perpendicular and EFGH is a rectangle.",
      answers: [
        [
          "full",
          "[[0|E = (4, 1), F = (9, 6), G = (6, 9), H = (1, 4).]] EF has slope 5/5 = 1 and HG has slope 5/5 = 1, so [[1|they're parallel]]. FG: 3/(-3) = -1. EH: 3/(-3) = -1. [[2|Both pairs of opposite sides have the same slope, so EFGH is a parallelogram.]] [[3|Also 1 times -1 is -1, so the sides meet at right angles, and it's actually a rectangle.]]",
          "Full marks. Spotting the rectangle shows you looked past the minimum the question asked for.",
        ],
        [
          "full",
          "Averaging each pair of endpoints: [[0|E(4, 1), F(9, 6), G(6, 9), H(1, 4)]]. Slopes: [[1|EF = 1 and HG = 1]], so EF is parallel to HG. [[2|FG = -1 and EH = -1 so they are parallel too, which makes EFGH a parallelogram]]. [[3|Since 1 x (-1) = -1 neighboring sides are perpendicular, a rectangle in this case]].",
          "All four marks. You tested both pairs of opposite sides and checked the perpendicularity.",
        ],
        [
          "partial",
          "[[0|The midpoints are (4, 1), (9, 6), (6, 9) and (1, 4).]] EF and HG both have slope 1. So it's a parallelogram.",
          "The midpoints and the first pair of slopes are right. A parallelogram needs both pairs of opposite sides parallel, so also compare FG and EH, which both have slope -1.",
        ],
        [
          "partial",
          "[[2|Opposite sides have equal slopes so it's a parallelogram.]] [[3|The slopes are 1 and -1 so they're perpendicular, a rectangle.]]",
          "The conclusions are right. Show the work: the four midpoints and the slope calculations that give 1, 1, -1 and -1.",
          true,
        ],
        [
          "weak",
          "E is (8, 2) and F is (10, 10) because those are the corners. The slope EF is 4 so it's not a parallelogram.",
          "E and F should be the midpoints of the sides, found by averaging endpoints, not the corners themselves. E is (4, 1), the average of A and B.",
        ],
        [
          "weak",
          "[[0|The midpoints are (4, 1), (9, 6), (6, 9) and (1, 4).]] Joining them makes a random shape because ABCD isn't a parallelogram.",
          "You found the midpoints correctly. The surprising fact is that the midpoint quadrilateral is a parallelogram for any quadrilateral, even one like ABCD that is not itself a parallelogram. Check the slopes.",
        ],
      ],
    },
    {
      prompt:
        "Prove that if two nonvertical lines through the origin are perpendicular, their slopes multiply to -1. Use the line through the origin and the point (a, b), where a and b are not 0, and the rotation of 90 degrees counterclockwise about the origin, (x, y) to (-y, x).",
      scheme: [
        "Finds the slope of the line through (0, 0) and (a, b) is b/a",
        "Rotates (a, b) to (-b, a), so the image line passes through the origin and (-b, a)",
        "Finds the slope of the image line is a/(-b) = -a/b",
        "Multiplies the slopes to get (b/a)(-a/b) = -1, and says a 90-degree rotation makes the image line perpendicular to the original",
      ],
      model:
        "The line through (0, 0) and (a, b) has slope b/a. The rotation sends (a, b) to (-b, a), and the image of a line through the origin is a line through the origin, so the rotated line passes through (0, 0) and (-b, a). Its slope is a/(-b) = -a/b. A rotation of 90 degrees turns the line to a perpendicular line, and the product of the slopes is (b/a)(-a/b) = -1.",
      answers: [
        [
          "full",
          "[[0|The slope of the original line is b/a.]] [[1|Rotating (a, b) 90 degrees counterclockwise gives (-b, a), so the rotated line goes through the origin and (-b, a).]] [[2|Its slope is a divided by -b, which is -a/b.]] [[3|The rotation makes the line perpendicular to the first one, and (b/a) times (-a/b) = -1.]]",
          "Full marks. The proof shows exactly where the negative and the flipped fraction come from.",
        ],
        [
          "full",
          "Original: [[0|rise b over run a, slope b/a]]. Apply (x, y) to (-y, x): [[1|(a, b) goes to (-b, a) and (0, 0) stays at (0, 0)]]. [[2|The new slope is a/(-b), the negative reciprocal, -a/b]]. [[3|A quarter turn creates perpendicular lines, and multiplying, (b/a)(-a/b) = -ab/ab = -1]].",
          "All four marks. Noticing that the origin does not move is the detail that lets you describe the image line.",
        ],
        [
          "partial",
          "[[0|The slope is b/a.]] [[1|After rotating, (a, b) becomes (-b, a).]] Then the slopes multiply to -1 because that's the rule.",
          "The first two steps are right. 'That's the rule' is what you are asked to prove. Compute the new slope, a/(-b), and multiply the slopes.",
        ],
        [
          "partial",
          "[[2|The rotated line has slope a/(-b) = -a/b.]] [[3|So (b/a)(-a/b) = -1, and the lines are perpendicular.]]",
          "The last steps are right. Begin with the slope of the original line, b/a, and show how the point (a, b) moves under the rotation to (-b, a).",
          true,
        ],
        [
          "weak",
          "Perpendicular lines make an L, so one goes up and one goes across. That means the slopes multiply to -1.",
          "That's a picture, not a proof. Use the rotation: it moves (a, b) to a new point, from which you can compute the new slope.",
        ],
        [
          "weak",
          "[[0|The slope is b/a]]. The rotated slope is also b/a because rotating doesn't change slope.",
          "Rotation does change slope, unless the angle is 180 degrees. A 90-degree rotation sends (a, b) to (-b, a), whose slope is -a/b.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Dilations about any center and similarity transformations",
  note: `
## Objectives

Students will be able to:

1. verify the effects of a dilation about any center on lines and segments;
2. use similarity transformations to decide whether two figures are similar and to relate perimeter and area to the scale factor.

## Materials

Graph paper, rulers, string, a document camera, the problem set.

## Starter (8 minutes)

Ask: "A dilation about the origin sends (x, y) to (kx, ky). What do you do if the center is (-1, 0)?" Let pairs work it out, then develop the three-step method: subtract the center, scale, add the center back. Test with the center (2, 1), factor 3 and the point (4, 2).

## Main activity

1. Dilate triangle A(1, 2), B(5, 2), C(3, 6) about the center (-1, 0) with scale factor 2. Check that each A, A' and the center are collinear, that A'B' is parallel to AB, and that A'B' = 2AB.
2. Prove, with coordinates, that a dilation about the origin sends the line y = 2x + 3 to a parallel line, y = 2x + 6, when k = 2.
3. Perimeter and area: two similar triangles have perimeters 30 and 45. The small one has area 40. Find the large area and explain why area scales by k squared.
4. Decide which pairs of triangles are similar from their side lengths.

## Checking for understanding

Ask for the difference between "scale factor of lengths" and "scale factor of areas." Accept only an explanation with a base and height.

## Problem set

Collect the problem set the next day.
`,
  reading: [
    "Dilations about any point, and how size features scale",
    `
A dilation about a center C with scale factor k sends each point P to P' on ray CP with CP' = k times CP. When C is the origin the rule is (x, y) to (kx, ky). For another center, treat the center as a temporary origin: subtract the center's coordinates, scale, then add them back. With center (2, 1) and k = 3, the point (4, 2) is 2 right and 1 up from the center, so the image is 6 right and 3 up from it: (8, 4).

Dilate triangle A(1, 2), B(5, 2), C(3, 6) about the center (-1, 0) with k = 2. Point A is (2, 2) from the center, so A' is (4, 4) from it, which gives (3, 4). B is (6, 2) from the center, so B' = (-1 + 12, 0 + 4) = (11, 4). C is (4, 6) from the center, so C' = (-1 + 8, 12) = (7, 12). Now check the properties of a dilation. AB has length 4 and A'B' has length 8, twice as long. Both are horizontal, so A'B' is parallel to AB. And the center, A and A' all lie on a line of slope 1: the center to A has run 2 and rise 2, and the center to A' has run 4 and rise 4. In general a dilation sends a line to a parallel line, unless the line goes through the center, in which case it maps to itself. For the line y = 2x + 3 and the center at the origin with k = 2, the point (0, 3) goes to (0, 6) and the slope stays 2, so the image is y = 2x + 6.

A similarity transformation is a dilation followed by a sequence of rigid motions. Under it, angles stay equal and lengths scale by k. Triangles of 5, 7, 9 and 10, 14, 18 are similar with k = 2, but triangles of 5, 7, 9 and 10, 14, 19 are not, since 19 is not 2 times 9. Perimeters scale by k like any length. Areas scale by k squared. If a triangle has base b and height h, then the dilated triangle has base kb and height kh, so its area is (1/2)(kb)(kh) = k^2 times (1/2)bh. For triangles with perimeters 30 and 45, k = 1.5, so a small area of 40 becomes 40 x 2.25 = 90. For a scale of 3 to 5, an area of 18 becomes 18 x (5/3)^2 = 50. A common mistake is to scale the area by k, which would give 30.

Under a dilation by k about the origin, the length from (6, -9) to (12, 3) is the square root of (6^2 + 12^2), or 6 times the square root of 5. With k = 1/3, the image length is 2 times the square root of 5.
`,
  ],
  cards: [
    ["Dilation about a point", "A transformation that multiplies every distance from the center by the scale factor k."],
    ["Dilating about a center not at the origin", "Subtract the center, multiply by k, and add the center back."],
    ["Collinearity of center, point and image", "A point, its image and the center of the dilation always lie on one line."],
    ["Similarity transformation", "A dilation followed by a sequence of rigid motions."],
    ["Area and scale factor", "If lengths scale by k, areas scale by k squared."],
    ["Perimeter and scale factor", "Perimeters scale by k, like any length."],
    ["Image of a line", "A dilation sends a line not through the center to a parallel line, and a line through the center to itself."],
    ["Similar polygons", "Polygons with equal corresponding angles and corresponding sides in the same ratio."],
  ],
  closed: [
    [
      "A dilation has center (2, 1) and scale factor 3. What is the image of the point (4, 2)?",
      ["(12, 6)", "(6, 3)", "(8, 4)", "(10, 5)"],
      "C",
    ],
    [
      "A dilation about the origin with scale factor 1/3 is applied to the segment from (6, -9) to (12, 3). What is the length of the image?",
      [
        "2 times the square root of 5",
        "6 times the square root of 5",
        "18 times the square root of 5",
        "the square root of 60",
      ],
      "A",
    ],
    [
      "The line y = 2x + 3 is dilated about the origin with scale factor 2. What is the equation of its image?",
      ["y = 2x + 3", "y = 4x + 6", "y = x + 3", "y = 2x + 6"],
      "D",
    ],
    [
      "Two similar triangles have corresponding sides in the ratio 3 to 5. The smaller has an area of 18 square units. What is the area of the larger?",
      ["30 square units", "50 square units", "90 square units", "54 square units"],
      "B",
    ],
    [
      "Which pair of triangles, given by side lengths, is similar?",
      [
        "5, 7, 9 and 10, 14, 19",
        "3, 4, 5 and 6, 8, 11",
        "5, 7, 9 and 10, 14, 18",
        "2, 3, 4 and 4, 5, 6",
      ],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Triangle ABC has A(1, 2), B(5, 2) and C(3, 6). It is dilated about the center O(-1, 0) with scale factor 2. Find the images A', B' and C'. Then show that A'B' is parallel to AB and twice as long, and show that O, A and A' lie on one line.",
      scheme: [
        "Finds the images A'(3, 4), B'(11, 4) and C'(7, 12), by scaling the displacement from the center",
        "Shows A'B' = 8 = 2 times AB = 2 times 4",
        "Shows A'B' is parallel to AB, since both are horizontal with slope 0",
        "Shows O, A and A' are collinear, since the slope from O to A and from O to A' are both 1",
      ],
      model:
        "From the center O(-1, 0), A is displaced (2, 2), so A' is displaced (4, 4): A'(3, 4). B is displaced (6, 2), so B' is displaced (12, 4): B'(11, 4). C is displaced (4, 6), so C' is displaced (8, 12): C'(7, 12). AB = 5 - 1 = 4 and A'B' = 11 - 3 = 8, which is twice as long. Both are horizontal, so the slope of each is 0 and they are parallel. The slope from O to A is 2/2 = 1 and from O to A' is 4/4 = 1, so O, A and A' lie on one line.",
      answers: [
        [
          "full",
          "[[0|A is (2, 2) from O so A' is (4, 4) from O, which is (3, 4). B is (6, 2) from O so B' is (11, 4). C is (4, 6) away so C' is (7, 12).]] [[1|AB = 4 and A'B' = 11 - 3 = 8, which is 2 times 4.]] [[2|AB and A'B' are both horizontal, slope 0, so they are parallel.]] [[3|The slope from O to A is 2/2 = 1 and from O to A' is 4/4 = 1, so they're on one line.]]",
          "Full marks. Working from the displacement from the center, not from the origin, is the key idea.",
        ],
        [
          "full",
          "Subtract the center, double, add it back: [[0|A(1, 2) gives (2, 2), then (4, 4), then (3, 4); B gives (11, 4); C gives (7, 12)]]. [[1|A'B' = 8 and AB = 4, so A'B' = 2AB]]. [[2|Same y-coordinate for both, so both are horizontal and parallel]]. [[3|O(-1, 0), A(1, 2) have slope 1 and O, A'(3, 4) have slope 1, so O, A, A' are collinear]].",
          "All four marks. Your three-step recipe for the images is exactly right.",
        ],
        [
          "partial",
          "[[0|A'(3, 4), B'(11, 4), C'(7, 12).]] A'B' is 8 and AB is 4. They are parallel because they're both the same.",
          "Your images are right. Be specific: both segments are horizontal, so the slope of each is 0. Also show that O, A and A' are collinear using slopes.",
        ],
        [
          "partial",
          "[[1|A'B' = 8, AB = 4, double.]] [[3|The slopes from O to A and A' are both 1.]] A' is (2, 4), B' is (10, 4), C' is (6, 12).",
          "Your length and collinearity checks are good. Your images are off because you doubled the coordinates without using the center. Subtract (-1, 0) first, double, then add it back: A' = (3, 4).",
          true,
        ],
        [
          "weak",
          "A' is (2, 4), B' is (10, 4), C' is (6, 12). It's like using the origin.",
          "Using the origin would be correct only if the center were the origin. Here the center is (-1, 0), so find each point's displacement from it, double that, and add it to the center.",
        ],
        [
          "weak",
          "[[2|A'B' and AB are parallel since they're both horizontal]]. The triangle just gets moved over.",
          "Parallel is right. But a dilation about a center changes the size of the triangle, not just its position: A'B' is 8 and AB is 4.",
        ],
      ],
    },
    {
      prompt:
        "Triangle ABC is similar to triangle DEF with perimeters 30 inches and 45 inches. The area of triangle ABC is 40 square inches. Find the scale factor from ABC to DEF and the area of DEF, and explain why areas scale by the square of the scale factor.",
      scheme: [
        "Finds the scale factor 45/30 = 1.5",
        "Says areas scale by the square of the scale factor, k squared = 2.25",
        "Computes the area of DEF as 40 times 2.25 = 90 square inches",
        "Explains using base and height: both are multiplied by k, so the area (1/2)bh is multiplied by k times k",
      ],
      model:
        "Perimeters scale by the same factor as lengths, so k = 45/30 = 1.5. Areas scale by k squared, which is 2.25, so the area of DEF is 40 x 2.25 = 90 square inches. The reason is that the base and the height are both multiplied by k, so (1/2)(kb)(kh) = k^2 times (1/2)bh.",
      answers: [
        [
          "full",
          "[[0|The scale factor is 45 divided by 30 = 1.5.]] [[1|Areas change by the scale factor squared, 1.5 squared is 2.25.]] [[2|So the area of DEF is 40 x 2.25 = 90 square inches.]] [[3|That's because the base is k times as long and the height is k times as long, so area (1/2)(base)(height) gets multiplied by k twice.]]",
          "Full marks. Your base-and-height explanation is the reason the square appears.",
        ],
        [
          "full",
          "k = [[0|45/30 = 3/2]]. [[1|Area ratio is k^2 = 9/4]]. [[2|40 x 9/4 = 90 square inches for DEF]]. [[3|Why squared: if the base becomes kb and the height kh, the new area is half times kb times kh = k^2 times the old area. It's two dimensions]].",
          "All four marks. Using the fraction 9/4 makes the arithmetic clean.",
        ],
        [
          "partial",
          "[[0|k is 1.5.]] The area scales by 1.5 too so [[2|DEF is 40 x 2.25 = 90]].",
          "The scale factor is right, but the area does not scale by 1.5. It scales by 1.5 squared, which is 2.25. Your final number is right only by a lucky slip, so explain it.",
        ],
        [
          "partial",
          "[[1|Area scales by k squared.]] [[3|Because base and height both get multiplied by k.]] The area is 40 x 1.5 = 60.",
          "Your reason is right, but then you did not apply it. The factor to use is k squared, 1.5 x 1.5 = 2.25, so the area is 90.",
          true,
        ],
        [
          "weak",
          "The perimeters are 30 and 45 so DEF is 15 bigger, and the area is 40 + 15 = 55.",
          "Similar figures are related by multiplying, not adding. The scale factor is 45/30 = 1.5, and area is multiplied by its square.",
        ],
        [
          "weak",
          "[[0|45/30 = 1.5]]. Since it's similar the area is 1.5 times bigger so 60. I think areas scale like lengths.",
          "The scale factor is right. Areas have two dimensions. If the base and height are both multiplied by 1.5, the area is multiplied by 1.5 twice.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "AA and SAS similarity, right-triangle similarity and applications",
  note: `
## Objectives

Students will be able to:

1. use similarity to establish the AA criterion and use SAS and SSS similarity to decide whether triangles are similar;
2. use congruence and similarity criteria to solve problems and prove relationships in figures, including those with an altitude drawn to the hypotenuse.

## Materials

Rulers, protractors, a small mirror and tape for the reflection activity, whiteboards, the worksheet.

## Starter (8 minutes)

Draw a right triangle ABC with the right angle at C and drop the altitude CD to the hypotenuse. Ask: "How many triangles do you see? Which ones are similar?" Have students mark equal angles in three colors until they can see that all three triangles share angles.

## Main activity

1. Prove triangle ACD similar to triangle ABC by AA, and derive AC squared = AD x AB. Use it to find the altitude and legs for AD = 5, DB = 20.
2. SAS similarity: sides 6 and 9 with a 50-degree angle between them in one triangle, sides 8 and 12 with a 50-degree angle in the other. Check the ratios and say why the angle must be included.
3. Parallel lines in a triangle: AB = 10, AC = 14, AD = 4, DE parallel to BC. Find AE and then EC.
4. Reflection geometry: a mirror on the ground, eye height 5 feet, 8 feet from the mirror, 40 feet from the base of a tree. Find the height.

## Checking for understanding

Ask for "always, sometimes, never": two right triangles are similar; two isosceles triangles are similar; two equilateral triangles are similar.

## Worksheet

Collect the worksheet at the end of class.
`,
  reading: [
    "Similarity criteria and the altitude to the hypotenuse",
    `
There are three ways to show that two triangles are similar. AA says that two pairs of equal angles are enough, because the third pair then follows from the angle sum. SAS similarity says that if an angle of one triangle equals an angle of the other and the sides that include those angles are in proportion, the triangles are similar. SSS similarity says that if all three pairs of sides are in the same ratio, the triangles are similar. As with congruence, the angle in the SAS version has to be between the two sides, and the ratios have to match, so sides of 6 and 9 with a 50-degree angle between them and sides of 8 and 12 with a 50-degree angle between them give 8/6 = 12/9 = 4/3, and the triangles are similar.

One picture contains three similar triangles. In right triangle ABC with the right angle at C, draw the altitude CD to the hypotenuse AB. Triangle ACD and triangle ABC share angle A, and each has a right angle, at D and at C, so they are similar by AA. In the same way, triangle CBD is similar to triangle ABC. From triangle ACD similar to triangle ABC, corresponding sides give AC/AB = AD/AC, so AC squared = AD x AB. Similarly BC squared = BD x AB and CD squared = AD x DB. With AD = 5 and DB = 20 we have AB = 25, so AC squared = 5 x 25 = 125 and AC = 5 times the square root of 5, BC squared = 20 x 25 = 500, and CD squared = 100 so CD = 10. Check with the Pythagorean theorem: 125 + 500 = 625 = 25 squared. With AD = 4 and DB = 9, the altitude CD is the square root of 36, which is 6. With hypotenuse 25 and AD = 9, AC = the square root of 225 = 15.

A line parallel to one side of a triangle also produces similar triangles. If DE is parallel to BC with D on AB and E on AC, then triangle ADE is similar to triangle ABC. With AB = 10, AC = 14 and AD = 4, the ratio AD/AB = 0.4, so AE = 0.4 x 14 = 5.6 and EC = 14 - 5.6 = 8.4. Notice that the segment EC is not 0.4 x 14, a mistake that comes from mixing up the whole side with a part.

Similar triangles measure what you cannot reach. In a mirror problem, you stand so that you can see the top of a tree in a mirror on the ground. The light reflects with equal angles, and you and the tree both stand upright, so the two triangles are similar by AA. With eye height 5 feet, 8 feet from the mirror, and the mirror 40 feet from the tree, the height h satisfies h/40 = 5/8, so h = 25 feet. If you know perimeters of similar triangles, such as 36 and a side of 9 corresponding to 12, the scale factor 12/9 gives 48.
`,
  ],
  cards: [
    ["SAS similarity", "An angle equal and the two sides including it in proportion."],
    ["SSS similarity", "All three pairs of sides in the same ratio."],
    ["Altitude to the hypotenuse", "In a right triangle it splits the triangle into two triangles similar to each other and to the original."],
    ["Geometric mean (leg rule)", "Each leg squared equals the hypotenuse times the part of the hypotenuse next to that leg."],
    ["Altitude rule", "The altitude squared equals the product of the two parts of the hypotenuse."],
    ["Parallel segment in a triangle", "A segment parallel to one side gives a smaller triangle similar to the original."],
    ["Angle of reflection", "The angle a ray makes with the mirror when it reflects equals the angle of incidence, which creates similar triangles."],
    ["Similar perimeters", "Perimeters of similar triangles are in the same ratio as corresponding sides."],
  ],
  closed: [
    [
      "In right triangle ABC with the right angle at C, the altitude CD to the hypotenuse divides it so that AD = 4 and DB = 9. What is CD?",
      ["13", "6", "36", "6.5"],
      "B",
    ],
    [
      "In triangle ABC, point D is on AB and E is on AC with DE parallel to BC. AB = 10, AC = 14 and AD = 4. What is AE?",
      ["8.4", "9.8", "5.6", "3.6"],
      "C",
    ],
    [
      "Triangle ABC has AB = 6, AC = 9 and angle A = 50 degrees. Triangle DEF has DE = 8, DF = 12 and angle D = 50 degrees. Are the triangles similar?",
      [
        "Yes, by SAS similarity, since 8/6 = 12/9 and the included angles are equal",
        "No, since the sides are not equal",
        "No, since 8 - 6 is not equal to 12 - 9",
        "There is not enough information without the third side",
      ],
      "A",
    ],
    [
      "Triangle ABC is similar to triangle XYZ. The perimeter of ABC is 36, AB = 9 and XY = 12. What is the perimeter of XYZ?",
      ["45", "39", "27", "48"],
      "D",
    ],
    [
      "In right triangle ABC with the right angle at C, the hypotenuse AB is 25 and the altitude from C meets AB at D with AD = 9. What is AC?",
      ["16", "15", "20", "225"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "In right triangle ABC with the right angle at C, the altitude CD meets the hypotenuse AB at D. Prove that triangle ACD is similar to triangle ABC and that AC squared equals AD times AB. Then find AC when AD = 5 and DB = 20.",
      scheme: [
        "Says angle A is shared and angle ADC and angle ACB are both right angles",
        "Concludes triangle ACD is similar to triangle ABC by AA",
        "Writes the proportion AC/AB = AD/AC and cross-multiplies to get AC squared = AD x AB",
        "Finds AB = 25 and AC squared = 5 x 25 = 125, so AC = 5 times the square root of 5",
      ],
      model:
        "Triangles ACD and ABC share angle A, and angle ADC = angle ACB = 90 degrees, so they are similar by AA. Corresponding sides are in proportion: AC/AB = AD/AC. Cross-multiplying gives AC squared = AD x AB. With AD = 5 and DB = 20, AB = 25, so AC squared = 5 x 25 = 125 and AC = the square root of 125 = 5 times the square root of 5.",
      answers: [
        [
          "full",
          "[[0|Triangle ACD and triangle ABC both have angle A, and angle ADC and angle ACB are both 90 degrees.]] [[1|Two angles match, so they're similar by AA.]] [[2|Matching sides: AC/AB = AD/AC. Cross multiply and AC squared = AD x AB.]] [[3|AB = 5 + 20 = 25, so AC squared = 125 and AC = 5 times the square root of 5, about 11.2.]]",
          "Full marks. Adding AD and DB to get the hypotenuse before using the rule is the step that many students miss.",
        ],
        [
          "full",
          "Compare the triangles. [[0|They share angle A. Triangle ACD has a right angle at D and ABC has one at C.]] [[1|AA gives ACD similar to ABC]]. Which sides correspond: AC in ACD matches AB in ABC, and AD matches AC. [[2|So AC/AB = AD/AC, thus AC^2 = AD times AB]]. [[3|With AD = 5 and AB = 25, AC^2 = 125, AC = sqrt(125) = 5 sqrt(5)]].",
          "All four marks. Saying which sides correspond before writing the proportion avoids the usual mix-up.",
        ],
        [
          "partial",
          "[[0|They share angle A and each has a right angle.]] [[1|So they are similar.]] AC squared is AD + AB = 30, so AC = 5.5.",
          "The similarity argument is right. The proportion AC/AB = AD/AC cross-multiplies to a product, AC squared = AD x AB, not a sum. That is 125.",
        ],
        [
          "partial",
          "[[2|AC/AB = AD/AC so AC^2 = AD x AB.]] [[3|AC^2 = 5 x 25 = 125 so AC is 5 sqrt(5).]]",
          "The proportion and calculation are right. Show why the triangles are similar first: the shared angle A and the two right angles give AA.",
          true,
        ],
        [
          "weak",
          "They look similar. AC = 5 + 20 = 25.",
          "That is the length of the hypotenuse AB, not the leg AC. Prove the similarity by AA, then use AC squared = AD x AB.",
        ],
        [
          "weak",
          "[[0|They share angle A.]] So AC = AD = 5.",
          "A shared angle is a good start, but you need two pairs of equal angles for AA, and equal angles do not make equal sides. Use the proportion of sides.",
        ],
      ],
    },
    {
      prompt:
        "To measure a tree, a student places a small mirror on level ground 40 feet from the base of the tree and steps back to a point 8 feet from the mirror, where she can see the top of the tree in the mirror. Her eyes are 5 feet above the ground. Explain why two triangles are similar and find the height of the tree.",
      scheme: [
        "Says the angles at the mirror are equal, because light reflects at equal angles",
        "Says both the student and the tree are vertical, so each triangle has a right angle, and the triangles are similar by AA",
        "Writes the proportion 5/8 = h/40",
        "Solves to get h = 25 feet, with a unit",
      ],
      model:
        "Light reflects off the mirror at equal angles, so the angle between the line of sight and the ground at the mirror equals the angle between the ray from the treetop and the ground. The student and the tree are both vertical, so each triangle has a right angle. Two equal angles mean the triangles are similar by AA. Then 5/8 = h/40, so h = 5 x 40 / 8 = 25. The tree is 25 feet tall.",
      answers: [
        [
          "full",
          "[[0|Light bounces off the mirror at the same angle it hits, so the angles at the mirror are equal.]] [[1|The student and the tree both stand straight up, so both triangles have a right angle. That's two equal angles, so the triangles are similar by AA.]] [[2|Then eye height over distance is the same ratio: 5/8 = h/40.]] [[3|h = 25 feet.]]",
          "Full marks. The reason the two angles at the mirror are equal is what makes the whole method work.",
        ],
        [
          "full",
          "Triangle 1 is [[0|the student's eye, her feet and the mirror, triangle 2 the treetop, the tree base and the mirror, and the angle at the mirror is the same in both by the law of reflection]]. [[1|Both have a right angle at the ground, so AA makes them similar]]. Corresponding sides: [[2|height over distance, 5 to 8 and h to 40, so 5/8 = h/40]]. Multiply: [[3|h = 5 x 40 / 8 = 200 / 8 = 25 ft]].",
          "All four marks. Matching height with height and distance with distance is how to keep the proportion correct.",
        ],
        [
          "partial",
          "[[1|Both are right triangles so they're similar by AA.]] [[2|5/8 = h/40]] so h = 25.",
          "The setup is right, but a right angle is only one pair of angles. Say where the second pair comes from: the angles at the mirror are equal because light reflects at equal angles. And write the unit.",
        ],
        [
          "partial",
          "[[0|The angles at the mirror are equal because of how light reflects.]] [[3|The tree is 25 feet.]] I used 5 + 8 + 40.",
          "Your reflection fact and answer are good. The answer does not come from adding: write the proportion 5/8 = h/40 and solve it.",
          true,
        ],
        [
          "weak",
          "The tree is 40 + 5 = 45 feet because it's 40 feet away and her eyes are 5 feet high.",
          "Distance on the ground is not height. Use the similar triangles: the ratio of height to distance is 5 to 8 for the student, so the tree's height is 40 times that ratio.",
        ],
        [
          "weak",
          "[[2|5/8 = h/40]]. The triangles are similar since they look the same, so h = 40 x 8 / 5 = 64.",
          "Your proportion is right but the solving flipped it. Multiply both sides by 40: h = 40 x 5/8 = 25. A 64-foot tree would not fit the picture.",
        ],
      ],
    },
  ],
};

writeCourse("honors-geometry-grade-10.json", "Honors Geometry", "Grade 10", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
