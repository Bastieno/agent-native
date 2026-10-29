import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Art II, Grade 10, Quarter 1. Standards: National Core Arts Standards (visual
 * arts), in the school's own words. The course builds on Art I with a body of
 * work around a theme, perspective and figure drawing, painting methods,
 * sculpture and mixed media, risk, exhibition, and a closer reading of artists
 * from different cultures. Artists named are real and the facts have been
 * checked; none of the works used in Art I are repeated. No practical
 * write-ups.
 */

const w1: WeekInput = {
  topic: "A body of work, linear perspective and drawing the figure",
  note: `
## Objectives

Students will be able to:

1. develop a body of work around a theme, with sketches that show your process;
2. use linear perspective to create the illusion of space in a drawing;
3. draw the human figure and face with accurate proportion.

## Materials

Sketchbooks, drawing paper, rulers, pencils (HB, 2B, 4B), erasers, a mannequin or posed model (a classmate), mirrors, a slide of a Renaissance perspective study, the worksheet.

## Starter (6 minutes)

Show a photograph of a long hallway or railroad tracks. Ask: "Why do the lines seem to meet, though we know they are parallel? How can a flat drawing show depth?"

## Main activity

1. A body of work: a group of related works that develop one theme (for example, "borders" or "inheritance"). Steps: choose a theme you care about; list questions about it; make sketches that explore different subjects and viewpoints; choose three to five pieces that build on one another; keep process pages (thumbnails, notes, tests) to show how the ideas developed.
2. Linear perspective (developed in Florence in the early 1400s by Filippo Brunelleschi, described in writing by Leon Battista Alberti in 1435): the horizon line is at the viewer's eye level; in one-point perspective, parallel lines going away from you (orthogonals) converge at a single vanishing point on the horizon; objects of the same size look smaller farther away; the fronts of boxes facing you stay square. In two-point perspective, two vanishing points on the horizon are used for a corner view. Practice: draw a hallway in one-point perspective, then a cube in two-point.
3. Figure and face proportions: an adult figure is about 7.5 heads tall (artists often idealize to 8); the figure's halfway point is near the hips; the arms reach to mid-thigh; the elbow is level with the waist; the knee is halfway between hip and foot. Face: the eyes sit halfway down the head; the width of the face is about five eye-widths; the bottom of the nose is halfway between the eyes and the chin; the ears are between the brow line and the bottom of the nose. For a 12 inch tall figure of 7.5 heads, each head is 12 / 7.5 = 1.6 inches. Use gesture first, then build shapes, then refine.

## Worksheet

Plan a body of work, then draw a perspective hallway and a figure.
`,
  reading: [
    "One idea explored many ways, with depth and people drawn truthfully",
    `
In Art I you made individual pieces. In Art II you begin to think like a working artist who develops a **body of work**: a group of related works that explore one **theme**. A theme might be "borders," "inheritance," "waiting" or "the places I belong." To build a body of work, first choose a theme that you care about and write **questions** about it: What does it look like? Who is affected? What is a surprising way to show it? Then make many **sketches**, exploring different subjects and viewpoints. From these, choose three to five pieces that build on one another, so that the series says more than any one piece. Keep your **process pages**, such as thumbnails, notes and tests, because they show how your ideas developed, and they will be part of your portfolio.

To draw a convincing space, learn **linear perspective**, a system developed in Florence in the early 1400s by the architect Filippo Brunelleschi and described in writing by Leon Battista Alberti in 1435. It is based on what your eyes see. The **horizon line** is at the level of the viewer's eyes. In **one-point perspective**, lines that go away from you, called **orthogonals** (such as the edges of a hallway or railroad tracks), appear to converge at one **vanishing point** on the horizon. Objects of the same size look smaller as they get farther away. Surfaces that face you directly, such as the end wall of the hallway, stay square. In **two-point perspective**, used when you look at the corner of a building or a box, there are two vanishing points on the horizon, and the vertical edges stay vertical. Practice by drawing a hallway in one-point perspective with a ruler, and then a cube in two-point perspective.

Drawing the **figure** convincingly depends on **proportion**. An adult is about **7.5 heads tall** (artists often idealize this to 8). The halfway point of the body is near the hips; the arms reach to about mid-thigh; the elbow lines up with the waist; and the knee is about halfway between the hip and the foot. For a figure drawn 12 inches tall, each head is 12 / 7.5 = 1.6 inches. Faces also follow a pattern: the **eyes** sit about **halfway** down the head, not near the top; the face is about **five eye-widths** wide; the bottom of the nose is about halfway between the eyes and the chin; and the ears sit between the brow line and the bottom of the nose. These are guidelines, since real people vary. Start with a quick **gesture**, build the main shapes, check the proportions by measuring against the head, and then refine. Practicing both skills together lets you place believable people inside a believable space.
`,
  ],
  cards: [
    ["Body of work", "A group of related works exploring one theme."],
    ["Theme", "A central idea an artist explores."],
    ["Horizon line", "The line at the viewer's eye level in a perspective drawing."],
    ["Vanishing point", "The spot on the horizon where parallel lines seem to meet."],
    ["Orthogonal", "A receding line that leads to a vanishing point."],
    ["One-point perspective", "Perspective with a single vanishing point."],
    ["Proportion", "The size relationships among parts."],
    ["Process pages", "Sketches and notes that show how a work developed."],
  ],
  closed: [
    [
      "In linear perspective, the horizon line is at the level of:",
      ["The viewer's eyes", "The floor", "The ceiling", "The artist's pencil"],
      "A",
    ],
    [
      "How tall is an adult figure, in heads, in classic proportion?",
      ["About 3.5", "About 5.5", "About 7.5", "About 12"],
      "C",
    ],
    [
      "On a face, where are the eyes located?",
      ["Near the top of the head", "About halfway down the head", "At the chin", "At the ears"],
      "B",
    ],
    [
      "How tall is each head if a 7.5-head figure is drawn 12 inches tall?",
      ["1.2 inches", "1.6 inches", "2 inches", "7.5 inches"],
      "B",
    ],
    [
      "Why keep process pages?",
      ["They show how your ideas developed", "To fill the book", "To throw away", "They are never needed"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Propose a body of work of three to five pieces around a theme of your choice. State the theme, three questions you would ask about it, a brief description of each piece (subject, viewpoint and how it builds on the last), and the process pages you would keep.",
      scheme: [
        "States a clear, personal theme",
        "Lists at least three questions that open up the theme",
        "Describes at least three pieces with a subject and viewpoint that build on each other",
        "Names process pages to keep, such as thumbnails, notes and tests",
      ],
      model:
        "Theme: \"the places I belong.\" Questions: Where do I feel at home? Who is there? What does the place sound and smell like? Piece 1: a one-point perspective drawing of the hallway outside my family's apartment. Piece 2: a close-up of my hands making dinner in the kitchen. Piece 3: a portrait of my grandmother in her chair, with the same window light as the kitchen. I will keep thumbnails, notes about each place, and tests of the light.",
      answers: [
        [
          "full",
          "[[0|My theme is 'the places I belong.']] [[1|My questions are: where do I feel at home, who is there, and what does the place sound and smell like?]] [[2|Piece one is a one-point perspective drawing of the hallway outside our apartment; piece two is a close-up of my hands making dinner; piece three is a portrait of my grandmother in her chair under the same window light as the kitchen.]] [[3|I'll keep my thumbnails, notes about each place and tests of the light.]]",
          "Full marks. The pieces build on one another through the shared light.",
        ],
        [
          "full",
          "[[0|My theme is waiting.]] [[1|I'd ask: what does waiting look like, who waits in my life, and what does time feel like when you wait?]] [[2|First, a bus stop in deep perspective at dusk; second, a figure study of my brother asleep on a couch waiting for dinner; third, a close-up of a phone waiting for a message.]] [[3|My process pages would hold gesture sketches, notes on mood, and three tests for the evening colors.]]",
          "Full marks. The three subjects look at one theme from different distances.",
        ],
        [
          "partial",
          "[[0|My theme is nature.]] [[3|I'll keep sketches.]] The pieces are a tree, a tree and another tree. Questions are not needed.",
          "A body of work explores a theme from different viewpoints. Add questions and different subjects.",
        ],
        [
          "partial",
          "[[1|Questions about home and family.]] [[2|A hallway, hands and a portrait.]] The theme is anything, so I will decide later, and I won't keep process pages.",
          "Choose a theme and keep process pages to show how your ideas developed.",
          true,
        ],
        [
          "weak",
          "A body of work is one big painting. I only need one piece.",
          "A body of work is a group of related pieces on a theme.",
        ],
        [
          "weak",
          "I would copy pictures from the internet for all of them.",
          "A body of work comes from your own questions and sketches.",
        ],
      ],
    },
    {
      prompt:
        "Explain how to draw a hallway in one-point perspective: the horizon line, the vanishing point, the orthogonals, how to show doors getting smaller, and what stays square. Then give the proportions that help you draw a standing figure in the hallway: how many heads tall, and the head height if the figure is 9 inches tall (to one decimal place).",
      scheme: [
        "Explains the horizon line at eye level and a single vanishing point on it",
        "Explains the orthogonals converging at the vanishing point and objects shrinking with distance, with the end wall staying square",
        "States that the figure is about 7.5 heads tall",
        "Calculates the head height as 9 / 7.5 = 1.2 inches",
      ],
      model:
        "I draw a horizon line at eye level and place one vanishing point on it. The edges of the floor, walls and ceiling are orthogonals drawn from the corners toward the vanishing point. Doors farther down the hallway are drawn smaller by the converging lines, and the end wall facing me stays square. A standing adult is about 7.5 heads tall, so a figure drawn 9 inches tall has a head of 9 divided by 7.5, which is 1.2 inches.",
      answers: [
        [
          "full",
          "[[0|I draw a horizon line at eye level and put one vanishing point on it.]] [[1|The edges of the floor, walls and ceiling are orthogonals that run toward the vanishing point, doors farther away get smaller, and the end wall facing me stays square.]] [[2|A standing adult is about 7.5 heads tall.]] [[3|For a 9-inch figure, each head is 9 ÷ 7.5 = 1.2 inches.]]",
          "Full marks. The method and the calculation are both correct.",
        ],
        [
          "full",
          "[[0|First the horizon line goes across at the viewer's eye level, and a single dot on it is the vanishing point.]] [[1|With a ruler I draw lines from the corners to the dot; the doors get smaller as they approach it, and the wall at the end stays a flat rectangle.]] [[2|The classic figure is 7.5 heads tall.]] [[3|If it's 9 inches tall, 9 divided by 7.5 gives a head of 1.2 inches.]]",
          "Full marks. Using a ruler for the orthogonals is the right habit.",
        ],
        [
          "partial",
          "[[0|A horizon line and a vanishing point.]] [[3|9 ÷ 7.5 is 1.2 inches.]] The lines go in random directions and the figure is 3.5 heads tall.",
          "Orthogonals converge at the vanishing point, and an adult is about 7.5 heads tall.",
        ],
        [
          "partial",
          "[[1|The lines converge and doors shrink.]] [[2|7.5 heads tall.]] The head is 9 × 7.5, which is 67.5 inches.",
          "Divide the figure's height by 7.5: 9 divided by 7.5.",
          true,
        ],
        [
          "weak",
          "Perspective is only for architects. Artists just guess.",
          "Linear perspective is a system artists use to show depth.",
        ],
        [
          "weak",
          "The vanishing point is at the bottom of the page, where the paper ends.",
          "The vanishing point is on the horizon line at eye level.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Composition and painting in layers",
  note: `
## Objectives

Students will be able to:

1. use composition techniques such as the rule of thirds and a focal point to guide the viewer;
2. paint with acrylic or watercolor using layering and glazing.

## Materials

Viewfinders (cardboard frames), grid overlays, watercolor paper, acrylic paint, watercolor paint, brushes, palettes, water containers, glazing medium (optional), paper towels, a hair dryer, the worksheet.

## Starter (6 minutes)

Show the same still life photographed twice: centered and cropped with the main object off-center. Ask: "Which holds your attention, and why?"

## Main activity

1. Composition: choose a format and crop (use a viewfinder); establish a focal point with contrast, size, color or detail; use the rule of thirds (on an 18 by 12 inch canvas, the vertical lines are at 6 and 12 inches and the horizontal lines at 4 and 8 inches; the four intersections are good focal-point places); lead the eye with lines, overlap, repeated shapes or a path of value; balance a heavy shape with several lighter ones; leave rest areas.
2. Watercolor: transparent; work light to dark; plan whites (the paper), because white paint is not used for highlights; wet-on-wet (soft blended edges), wet-on-dry (crisp edges); layer by letting each wash dry; glaze (a thin transparent layer that changes the color beneath).
3. Acrylic: water-based but dries to a plastic film that is permanent and water-resistant; can be opaque or thinned; layer opaque to transparent, dark to light or light to dark; glazing with a medium or thinned paint makes a luminous color; let layers dry; keep brushes wet and wash them immediately.
4. Make a small painting with a planned focal point and at least three layers. Reflect on what each layer added.

## Worksheet

Thirds map and layer plan.
`,
  reading: [
    "Leading the eye, and building color one layer at a time",
    `
A good painting makes decisions about where you should look. This is **composition**, the planned arrangement of everything in the picture. First, decide on the **format** and the **crop**. A cardboard **viewfinder**, a frame with a window, helps you to choose what to include and what to leave out. Next, establish a **focal point**, the place where the eye lands first. You can create one with the strongest **contrast**, the largest shape, the brightest color or the most detail. A helpful guide is the **rule of thirds**. Divide the picture with two vertical and two horizontal lines into nine equal parts. On a canvas 18 inches wide and 12 inches tall, the vertical lines are at 6 and 12 inches (18 / 3 = 6) and the horizontal lines at 4 and 8 inches (12 / 3 = 4). The four places where the lines cross are strong positions for a focal point, since a centered subject can look static. Then guide the eye with **lines**, overlapping shapes, a path of value or repeated shapes, and balance a heavy shape with several lighter ones. Leave some quiet **rest areas** so that the focal point has room.

Paint is applied in **layers**, and the type of paint determines the method. **Watercolor** is **transparent**: the light comes through the paint from the white paper. For this reason you work from **light to dark** and you plan the **whites** by leaving the paper unpainted, since you cannot cover a dark area with light paint. In **wet-on-wet**, you paint onto a wet surface, and the colors bleed together with soft edges. In **wet-on-dry**, you paint on dry paper, and the edges are crisp. To build color, let each wash **dry** before adding the next. A **glaze** is a thin, transparent layer over dry paint that changes the color beneath: a yellow glaze over blue shifts it toward green, and keeps a glowing depth that mixing on the palette can't match.

**Acrylic** paint is mixed with water but dries into a **permanent plastic film** that is waterproof once dry. It can be used thickly and opaquely or thinned into a transparent wash. You can layer **opaque** over **transparent** or the other way, and glazing with thinned paint or a **glazing medium** gives luminous results. Let each layer dry completely (a hair dryer helps), keep brushes wet while working, and **wash them right away**, since dry acrylic ruins brushes. As you complete your small painting, plan **at least three layers**, such as a thin underpainting, a middle layer of main colors, and a final layer of glazes and details. Afterward, write what each layer added. Seeing what each step contributes helps you decide how to build your next painting.
`,
  ],
  cards: [
    ["Composition", "The planned arrangement of elements in a work."],
    ["Focal point", "The place that draws the eye first."],
    ["Rule of thirds", "Dividing a picture into nine parts to place the focal point."],
    ["Viewfinder", "A frame used to choose a crop."],
    ["Wet-on-wet", "Painting onto a wet surface for soft, blended edges."],
    ["Wet-on-dry", "Painting on dry paper for crisp edges."],
    ["Glaze", "A thin, transparent layer that changes the color beneath."],
    ["Underpainting", "A first layer of paint that sets values or colors."],
  ],
  closed: [
    [
      "On an 18 by 12 inch canvas, where do the vertical rule-of-thirds lines fall?",
      ["At 3 and 6 inches", "At 6 and 12 inches", "At 9 inches only", "At 4 and 8 inches"],
      "B",
    ],
    [
      "In watercolor, how do you make a white highlight?",
      ["Leave the paper unpainted", "Add white paint at the end", "Use black", "Use a pencil"],
      "A",
    ],
    [
      "Which method produces soft, blended edges?",
      ["Wet-on-wet", "Wet-on-dry", "Dry brush only", "Scratching"],
      "A",
    ],
    [
      "Why wash acrylic brushes right away?",
      ["Dry acrylic becomes a permanent plastic film", "It saves paint", "It is a rule of watercolor", "The water is warm"],
      "A",
    ],
    [
      "What is a glaze?",
      ["A thin transparent layer that changes the color beneath", "A thick opaque layer", "A type of paper", "A pencil"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "You are painting an 18 by 12 inch picture of a red bicycle leaning against a blue door. Using the rule of thirds, give the coordinates (in inches from the left and the bottom) of the four intersections, choose where to place the focal point and why, and name two other composition techniques you would use to lead the eye to it.",
      scheme: [
        "Calculates the thirds lines at 6 and 12 inches across and 4 and 8 inches up",
        "Lists the four intersections correctly: (6,4), (12,4), (6,8), (12,8)",
        "Chooses one for the bicycle and explains why with a reason about contrast or balance",
        "Names two other techniques such as lines, overlap, value path or color contrast",
      ],
      model:
        "The vertical lines are at 6 and 12 inches and the horizontal lines at 4 and 8 inches. The intersections are (6, 4), (12, 4), (6, 8) and (12, 8). I would place the red bicycle's front wheel near (12, 4), the lower right intersection, since the red against the blue door has the strongest contrast, and the off-center position feels natural. I would lead the eye with the diagonal line of the handlebars toward the wheel and keep the door's value darker around the bicycle.",
      answers: [
        [
          "full",
          "[[0|The vertical thirds lines are at 6 and 12 inches, and the horizontal ones at 4 and 8 inches.]] [[1|The intersections are (6,4), (12,4), (6,8) and (12,8).]] [[2|I'd put the red front wheel near (12,4) because red against the blue door is the strongest contrast, and the off-center spot feels natural.]] [[3|I'd lead the eye with the diagonal of the handlebars toward the wheel, and keep the door darker around the bike.]]",
          "Full marks. The coordinates are right and the placement is reasoned.",
        ],
        [
          "full",
          "[[0|18 ÷ 3 = 6 and 12 ÷ 3 = 4, so the lines are at 6 and 12 across and 4 and 8 up.]] [[1|That gives the four crossing points: (6,4), (12,4), (6,8) and (12,8).]] [[2|The bike's red seat and front wheel would sit near (6,8), the upper left, with the blue door filling the right to balance it.]] [[3|Overlapping the bike in front of the door and a path of lighter value across the floor would lead the eye there.]]",
          "Full marks. Balancing the bike with the door is a good compositional move.",
        ],
        [
          "partial",
          "[[0|The lines are at 6 and 12 inches and 4 and 8 inches.]] [[3|Use lines to lead the eye.]] I'd put the bicycle exactly in the center, since the center is the strongest place.",
          "A centered subject can look static. Choose an intersection for the focal point.",
        ],
        [
          "partial",
          "[[1|The intersections are (6,4), (12,4), (6,8), (12,8).]] [[2|The bicycle goes at (12,4).]] The lines are at 9 and 18 inches.",
          "Divide each dimension by 3: 18 divided by 3 is 6, and 12 divided by 3 is 4.",
          true,
        ],
        [
          "weak",
          "Composition doesn't matter. I'd just paint the bike anywhere.",
          "Composition decides where viewers look. Plan it.",
        ],
        [
          "weak",
          "The rule of thirds is a rule that you must never break, in any art.",
          "It is a guide, not a law; artists break it on purpose.",
        ],
      ],
    },
    {
      prompt:
        "Plan a small acrylic or watercolor painting with at least three layers. Name your medium and subject, describe each layer (what you paint, how thick or thin, and what it adds), explain how you use glazing, and describe two safe-studio or care habits for the paint you chose.",
      scheme: [
        "Names a medium and subject",
        "Describes at least three layers and what each adds",
        "Explains the use of a glaze and its effect",
        "Describes two care or studio habits (letting layers dry, washing brushes, planning whites)",
      ],
      model:
        "I will use watercolor to paint a bowl of oranges. Layer 1: a pale yellow wash over the whole fruit, leaving white paper for the highlights. Layer 2: orange wet-on-dry for the form, with darker orange in the shadow sides. Layer 3: a thin glaze of red-brown over the shadows to deepen them. The glaze adds glowing depth that I cannot get by mixing on the palette. I will let each layer dry completely and keep the highlights unpainted from the start.",
      answers: [
        [
          "full",
          "[[0|I'll paint a bowl of oranges in watercolor.]] [[1|Layer 1 is a pale yellow wash over the fruit, leaving white paper for the highlights; layer 2 is orange wet-on-dry for the form, darker in the shadows; layer 3 is a thin glaze of red-brown over the shadows to deepen them.]] [[2|The glaze adds glowing depth that I can't get by mixing on the palette.]] [[3|I'll let each layer dry completely and keep the highlights as unpainted paper from the start.]]",
          "Full marks. Each layer has a clear job and the care habits are right.",
        ],
        [
          "full",
          "[[0|My acrylic painting will show a window with a plant.]] [[1|First an underpainting of thin blue-gray for the light and dark pattern, then a middle layer of opaque greens and terracotta, then final details in thicker paint.]] [[2|I'll glaze a thin yellow over the leaves in the light to make them glow.]] [[3|I'll let each layer dry with a hair dryer and wash my brushes right away because dry acrylic is permanent.]]",
          "Full marks. The glaze is placed where it will help the light.",
        ],
        [
          "partial",
          "[[0|Watercolor of fruit.]] [[1|One layer of orange.]] I will not need a glaze, and I'll paint white highlights on top at the end.",
          "Watercolor highlights come from unpainted paper. Plan at least three layers.",
        ],
        [
          "partial",
          "[[2|A glaze deepens the shadow.]] [[3|Wash brushes right away.]] I will paint the second layer while the first is wet, always.",
          "Wet-on-wet is a choice for soft edges. Letting layers dry keeps crisp edges and clean color.",
          true,
        ],
        [
          "weak",
          "One thick layer of paint is enough and the best way.",
          "Layering builds depth and color that one thick layer cannot.",
        ],
        [
          "weak",
          "I'd leave the brushes in the water overnight and wash later.",
          "Leaving brushes in water ruins them; wash acrylic right away.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Sculpture from all sides, and mixed media",
  note: `
## Objectives

Students will be able to:

1. work in a three-dimensional medium and consider the piece from all sides;
2. experiment with mixed media and combine materials to express an idea.

## Materials

Wire, aluminum foil, newspaper and masking tape for armatures, plaster bandage or papier-mache materials, clay, hot glue guns (teacher supervised), cardboard, collage papers, acrylic gel medium and PVA glue, found objects, dust masks, a gallery of images (Alexander Calder, Henry Moore, Romare Bearden, Robert Rauschenberg), the worksheet.

## Starter (6 minutes)

Place a sculpture or a simple object on a turntable. Ask students to sketch it from the front and then from behind. Ask: "How does it change when you walk around it?"

## Main activity

1. Sculpture considered from all sides: a freestanding sculpture has no single front; check balance and stability (a wide base, a low center of gravity); consider silhouette (the outline from each side); positive and negative space (spaces through the form); texture; and how light and shadow change with the angle. Methods: additive (building up with clay, wire or papier-mache), subtractive (carving away) and assemblage (joining found objects). An armature is an internal frame that supports the form. Artists: Henry Moore (reclining figures with holes to open the form), Alexander Calder (mobiles that move; wire and sheet metal, 1930s onward).
2. Mixed media: combining materials such as paint, paper, fabric, ink and found objects. Match materials to the idea (what does each say?); check that the adhesive suits the materials (PVA or gel medium for paper, heavy gel or hot glue for heavy objects); build in layers; keep a unifying element (color, shape or theme). Artists: Romare Bearden (collages of Harlem life, 1960s, from cut and torn paper and photographs); Robert Rauschenberg (combines, such as Monogram, 1955 to 1959, with a stuffed goat and a tire).
3. Safe procedures: ventilate when using adhesives or sprays; use dust masks for plaster dust; hot glue is hot, work on a heatproof surface, and use under supervision; cut away from the body; wash hands; do not eat in the studio.

## Worksheet

Sketch the piece from three sides and plan the materials.
`,
  reading: [
    "A work with no back, and a work made of many things",
    `
A painting has one front, but a **freestanding sculpture** can be seen from every side, so it must work from **all angles**. When you design a sculpture, walk around it and sketch it from the front, side and back. Check **balance and stability**: a wide base and a low center of gravity keep it from tipping. Look at the **silhouette**, the outline you see from each side, and ask whether it is interesting from every direction. Think about **positive space**, the solid form, and **negative space**, the openings in and around it. The British sculptor **Henry Moore** made reclining figures with holes through the forms, so that the space became part of the sculpture. **Light and shadow** change as you move, and texture adds interest. Alexander Calder, an American sculptor, introduced **mobiles** in the 1930s: hanging forms of wire and sheet metal, balanced so that the air makes them move, so the sculpture changes in time as well as from side to side.

There are three common methods. In **additive** sculpture you build up the form, with clay, wire or papier-mâché. In **subtractive** sculpture you remove material, as in carving. In **assemblage** you join existing or found objects. Many sculptures use an **armature**, an internal frame of wire, foil or rolled newspaper that supports the form, with clay or plaster bandage over it. A good armature saves material and prevents collapse.

**Mixed media** combines different materials in one work: paint, paper, fabric, ink, photographs and found objects. The key is to choose each material for what it **says**. **Romare Bearden** made collages of Harlem life in the 1960s from cut and torn paper and photographs, and the layered pieces feel like the busy, rhythmic city he depicted. **Robert Rauschenberg** made "combines," such as *Monogram* (1955 to 1959), which joined a stuffed goat and a tire with paint, to blur the line between painting and sculpture. To make mixed media last, match your **adhesive** to the materials: PVA glue or gel medium for paper, heavier gel medium or hot glue for heavy objects. Build in **layers**, and use a unifying element, such as a repeated color or shape, so that the work feels like a whole instead of a pile.

**Safety** matters in 3D work. Work in a ventilated area when you use adhesives or sprays. Wear a **dust mask** when sanding or mixing plaster. **Hot glue** can burn, so use a heatproof surface and work with supervision. Cut away from your body, wash your hands, and never eat in the studio.
`,
  ],
  cards: [
    ["Freestanding sculpture", "A sculpture that can be seen from all sides."],
    ["Silhouette", "The outline of a form."],
    ["Additive", "Building up a form by adding material."],
    ["Subtractive", "Making a form by removing material."],
    ["Assemblage", "A sculpture made by joining found objects."],
    ["Armature", "An internal frame that supports a sculpture."],
    ["Mobile", "A balanced sculpture that moves in the air."],
    ["Mixed media", "A work made from more than one kind of material."],
  ],
  closed: [
    [
      "Which method of sculpture removes material?",
      ["Additive", "Subtractive", "Assemblage", "Collage"],
      "B",
    ],
    [
      "What is an armature?",
      ["An internal frame supporting a sculpture", "A kind of glue", "A museum guard", "A paint"],
      "A",
    ],
    [
      "Who introduced mobiles in the 1930s?",
      ["Alexander Calder", "Henry Moore", "Romare Bearden", "Claude Monet"],
      "A",
    ],
    [
      "What safety item should you wear when sanding plaster?",
      ["A dust mask", "A hat", "Sandals", "Nothing"],
      "A",
    ],
    [
      "Why choose each material in mixed media for what it says?",
      ["Because materials carry meaning", "Because it is free", "To fill space", "Because it is required"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Plan a freestanding sculpture of an animal made with a wire and foil armature covered with plaster bandage. Describe how it will look from the front, the side and the back, explain how you will make it stable, how you will use positive and negative space, and two safety habits.",
      scheme: [
        "Describes the sculpture from at least three sides",
        "Explains how stability will be achieved (a wide base, low center of gravity, supports)",
        "Explains the use of positive and negative space (such as openings between the legs or through the body)",
        "Names two safety habits (dust mask, ventilation, wash hands, supervised hot glue)",
      ],
      model:
        "My heron has a long neck and a tall, thin body. From the front, it is a narrow vertical shape; from the side, the curved neck forms an S; from the back, the tail feathers fan out. For stability, I will set it on a wide base with the heavy body low and the legs anchored with wire. The opening between the legs and the curve of the neck create negative space. I will wear a dust mask when working with plaster dust and wash my hands afterward.",
      answers: [
        [
          "full",
          "[[0|My heron is a narrow vertical shape from the front, an S-curve from the side because of the neck, and a fan of tail feathers from the back.]] [[1|For stability, I'll set it on a wide base with the heavy body low and the legs anchored with wire.]] [[2|The opening between the legs and the curve of the neck give negative space.]] [[3|I'll wear a dust mask around plaster dust and wash my hands afterward.]]",
          "Full marks. Each side is considered and stability is planned.",
        ],
        [
          "full",
          "[[0|From the front the fox is a triangle with ears at the top, from the side it's a long curve from nose to tail, and from behind it's a round shape with the tail wrapped around.]] [[1|To keep it from tipping I'd make the feet wide and the body low, and attach the wire legs to a wooden base.]] [[2|There is negative space between the legs and under the curve of the tail.]] [[3|I'd work in a ventilated space and use the hot glue only with the teacher watching.]]",
          "Full marks. Planning the silhouette from three sides is the heart of 3D design.",
        ],
        [
          "partial",
          "[[0|It looks good from the front.]] [[3|Wear a mask.]] The back doesn't matter since people only look at the front, and stability is not a problem.",
          "A freestanding sculpture is seen from all sides and must be stable.",
        ],
        [
          "partial",
          "[[1|A wide base makes it stable.]] [[2|There is negative space between the legs.]] I won't need any safety habits for plaster.",
          "Plaster dust can be harmful. Use a dust mask and wash your hands.",
          true,
        ],
        [
          "weak",
          "A sculpture is flat, like a painting, so I only need one view.",
          "A freestanding sculpture has many views and must work from all of them.",
        ],
        [
          "weak",
          "I'd make it as heavy on top as possible so it looks powerful.",
          "A top-heavy sculpture tips easily; keep the weight low and the base wide.",
        ],
      ],
    },
    {
      prompt:
        "Plan a mixed-media collage about a place that matters to you, using at least four materials. For each material, say what it suggests, explain which adhesive you would use for the heaviest piece and for paper, and what element would unify the work. Then describe how Romare Bearden's collages show materials supporting meaning.",
      scheme: [
        "Names at least four materials and what each suggests",
        "Chooses suitable adhesives for paper and for a heavy object",
        "Names a unifying element such as color, shape or theme",
        "Explains how Bearden's cut-and-torn paper collages of Harlem life support the meaning",
      ],
      model:
        "My collage is about my grandmother's porch. Torn paper from old newspaper suggests the passing of time; scraps of lace suggest home and handwork; a real key suggests belonging; acrylic paint in warm yellows suggests the evening light. I would use PVA glue or gel medium for the paper and lace, and a heavy gel medium or hot glue for the key. Warm yellow repeated across the work unifies it. Romare Bearden's collages of cut and torn paper and photographs of Harlem make layered, rhythmic scenes that feel like the busy life of the neighborhood.",
      answers: [
        [
          "full",
          "[[0|My collage is about my grandmother's porch, with torn newspaper for the passing of time, lace for home and handwork, a real key for belonging, and warm yellow paint for evening light.]] [[1|PVA glue or gel medium for the paper and lace, and heavy gel medium or hot glue for the key.]] [[2|Repeating warm yellow across the whole piece would unify it.]] [[3|Bearden's collages of cut and torn paper and photographs make layered, rhythmic scenes that feel like the busy life of Harlem, so the materials support the meaning.]]",
          "Full marks. Materials, adhesives, unity and Bearden are all connected.",
        ],
        [
          "full",
          "[[0|For a collage about my neighborhood, I'd use bus transfers (travel), fabric from my mom's scarf (family), photographs I took (real places) and ink drawing (my own hand).]] [[1|I'd glue the paper and photos with gel medium and attach the thicker fabric and a small bolt with hot glue or strong gel medium.]] [[2|A repeated red thread would tie everything together.]] [[3|Bearden used cut paper and photographs to build a lively picture of Harlem life; the layering felt like the rhythm of the street.]]",
          "Full marks. The repeated thread is a clever unifier.",
        ],
        [
          "partial",
          "[[0|Paper, paint, fabric and a key.]] [[3|Bearden used collage.]] I'd use one glue for everything, and the work doesn't need anything to unify it.",
          "Choose adhesives to match the materials and add a unifying element.",
        ],
        [
          "partial",
          "[[1|Gel medium for paper, hot glue for the key.]] [[2|Repeat a color.]] Bearden used only oil paint on large canvases.",
          "Bearden is known for collages of cut and torn paper and photographs.",
          true,
        ],
        [
          "weak",
          "Mixed media is a pile of stuff. Anything goes with no thought.",
          "Mixed media uses materials for what they say and needs a unifying idea.",
        ],
        [
          "weak",
          "A collage doesn't need glue. It stays together by itself.",
          "Choose an adhesive that suits your materials so the work lasts.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Taking a risk, starting from a mistake, and a weekly sketchbook",
  note: `
## Objectives

Students will be able to:

1. create a work that takes a risk or begins with a mistake, and reflect on what you learned;
2. maintain a sketchbook with weekly experiments and reflections.

## Materials

Ink, brushes, water, large paper, sketchbooks, scrap paper, tools for unusual mark-making (sticks, sponges, string), a spill-and-find activity, the quiz.

## Starter (6 minutes)

Drop a small amount of ink on wet paper. Ask: "What do you see in it? What could you make from this?" Pass around some blots.

## Main activity

1. Risk in art: choosing a method, subject or scale that you have not tried and that might fail. Examples: working very large or very small, using a tool you have not mastered, working without erasing, painting a subject that feels personal, or using an unfamiliar color range. Henri Matisse, unable to stand at an easel after surgery in the 1940s, began making large works by cutting painted paper with scissors ("drawing with scissors") and produced the book Jazz in 1947.
2. Beginning with a mistake: do not erase; ask "what is it now?" A spill becomes a lake or a creature; a crooked line becomes a horizon; a smeared area becomes a shadow. Steps: pause, look at the mistake as a shape, invite it into the plan, build around it, and push one change to make it look intentional.
3. Reflect with questions: What was the risk? What happened? What did I learn? What would I try again? A growth mindset sees mistakes as information.
4. Sketchbook: a weekly experiment (a new material, a technique, a limit such as three colors, or a different viewpoint) and a weekly reflection (three to four sentences). By week 8, eight experiments.

## Quiz

Risk, mistakes and reflection.
`,
  reading: [
    "Why the best work sometimes starts with the worst moment",
    `
Most people are afraid of mistakes, and many students erase at the first sign of trouble. Yet working artists often say that their most interesting work came from taking a **risk** or from a mistake they refused to erase.

A **risk** in art means choosing something you have not tried and that might not work. You might work much **larger** or **smaller** than usual, use a tool you have not mastered, draw **without erasing**, tackle a subject that feels personal, or limit yourself to an unfamiliar set of colors. The French artist **Henri Matisse** offers an example. After surgery in the 1940s, he could no longer stand at an easel for long, so he took up a new method: cutting shapes from paper painted in bright colors, which he called "drawing with scissors." He made large cut-paper works and, in 1947, the book *Jazz*. A limit turned into a new way to make art.

A **mistake** can also be a beginning. If your ink spills, don't just wipe it away: ask, "What is it now?" A spill might become a lake, a cloud or a creature. A crooked line might become a horizon. A smear might become a shadow. Follow these steps: **pause**, **look** at the mistake as a shape, **invite** it into the plan, **build around it**, and then make one deliberate change so that it looks purposeful. For example, a grayish blot of ink on wet paper may remind you of a bird. Add a beak, an eye and a branch, and the accident becomes the main subject.

After you take a risk, **reflect**. Ask: *What was the risk? What happened? What did I learn? What would I try again?* A person with a **growth mindset** sees mistakes as information, not as proof of failure. Writing your answers helps you to turn a single experience into a lasting skill.

In this unit you will also keep a **sketchbook** with a **weekly experiment** and a short **reflection**. An experiment might be a new material (drawing with a stick and ink), a technique (blind contour), a limit (only three colors) or a new viewpoint (drawing your room from the floor). Write three or four sentences about what you tried and learned. By the end of the term, you will have eight experiments, a record of how you grew, and ideas for your larger works.
`,
  ],
  cards: [
    ["Risk", "Trying something that might not work."],
    ["Mistake as a beginning", "Using an accident as the start of a new idea."],
    ["Growth mindset", "Seeing mistakes as information for learning."],
    ["Experiment", "A trial of a new material, method or idea."],
    ["Reflection", "Thinking about what happened and what you learned."],
    ["Cut-out", "A shape cut from painted paper."],
    ["Limit", "A rule that narrows your choices to spark creativity."],
    ["Intentional", "Done on purpose."],
  ],
  closed: [
    [
      "What did Matisse start doing after surgery in the 1940s?",
      ["Cutting shapes from painted paper", "Stopping all art", "Making video games", "Carving marble"],
      "A",
    ],
    [
      "What is the first step with a mistake?",
      ["Pause and look at it as a shape", "Throw the paper away", "Hide it", "Blame someone"],
      "A",
    ],
    [
      "A growth mindset sees mistakes as:",
      ["Information for learning", "Proof of failure", "Reasons to quit", "Secrets"],
      "A",
    ],
    [
      "Which is a risk in art?",
      ["Working much larger than usual", "Copying exactly", "Never trying new things", "Only using pencil"],
      "A",
    ],
    [
      "How many weekly experiments will you have after 8 weeks?",
      ["2", "4", "8", "16"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "You spill a dark blot of ink on a nearly finished landscape drawing. Describe the steps you would take to turn the mistake into part of the work. Explain what you see in the blot, what you add to make it intentional, and what you would reflect on afterward.",
      scheme: [
        "Describes pausing and looking at the blot as a shape",
        "Names what the blot could become, with a reason",
        "Describes at least two additions that make it intentional",
        "Writes reflection questions or lessons learned",
      ],
      model:
        "I would pause and look at the blot as a shape instead of wiping it. Its long, rounded form reminds me of a storm cloud over the hills. I would add soft hatching around its edges and a few raindrop lines falling below so that it looks like a deliberate storm, and darken the landscape's shadows to match its mood. Afterward I would reflect on the risk of keeping it, what I learned about reading accidents as shapes, and what I would try again.",
      answers: [
        [
          "full",
          "[[0|I'd pause and look at the blot as a shape instead of wiping it.]] [[1|Its long, rounded form reminds me of a storm cloud over the hills.]] [[2|I'd add soft hatching around its edges and falling rain lines below it, and darken the shadows in the landscape to match the mood.]] [[3|Afterward I'd reflect on what the risk was, what I learned about reading accidents as shapes, and what I'd try again.]]",
          "Full marks. The accident becomes the focal point of the piece.",
        ],
        [
          "full",
          "[[0|First I wouldn't rush; I'd turn the drawing around to see the blot as a shape.]] [[1|Sideways it looks like a crow with spread wings.]] [[2|I'd add an eye, a beak and a branch below, then repeat the dark ink in a few crows far away so that it feels planned.]] [[3|My reflection would ask: what was the risk, what happened, what did I learn, and would I use accidents on purpose next time?]]",
          "Full marks. Repeating the dark in other places makes it look deliberate.",
        ],
        [
          "partial",
          "[[0|I'd look at it.]] [[3|I'd write what I learned.]] I would cover it with white paint and pretend it never happened.",
          "Covering it hides the chance for a new idea. Invite the mistake into the plan.",
        ],
        [
          "partial",
          "[[1|It looks like a cloud.]] [[2|I'd add rain lines.]] I'd start over on a new sheet, since mistakes ruin work.",
          "Mistakes can be the start of ideas. Try building around it first.",
          true,
        ],
        [
          "weak",
          "I'd throw the drawing in the trash. A mistake means failure.",
          "A growth mindset treats a mistake as information, not failure.",
        ],
        [
          "weak",
          "I'd erase the ink with a pencil eraser, though ink cannot be erased.",
          "Ink can't be erased. Look for a way to use it.",
        ],
      ],
    },
    {
      prompt:
        "Design a weekly sketchbook experiment for each of three different weeks of the term. For each experiment, state the week's challenge (a material, a technique, a limit or a viewpoint), what you hope to learn, and write a model three-sentence reflection for one of them.",
      scheme: [
        "Describes three distinct experiments (material, technique, limit or viewpoint)",
        "States what each is designed to teach",
        "Writes a reflection of three sentences with what was tried",
        "The reflection includes what was learned and what to try next",
      ],
      model:
        "Week 1: draw my room from the floor, a new viewpoint, to learn how perspective changes. Week 2: draw with a stick and ink, a new material, to learn to commit to marks. Week 3: use only three colors, a limit, to learn about value and mixing. Reflection for week 2: \"I drew my shoes with a stick dipped in ink. The lines were uneven, but I liked the energy. Next time I will practice varying the line thickness by pressing harder.\"",
      answers: [
        [
          "full",
          "[[0|Week 1: draw my room from the floor (viewpoint). Week 2: draw with a stick and ink (material). Week 3: use only three colors (limit).]] [[1|They teach me how perspective changes, how to commit to marks, and how to mix and use value.]] [[2|Reflection: 'I drew my shoes with a stick dipped in ink. The lines were uneven, but I liked the energy.']] [[3|'Next time I will practice varying the line thickness by pressing harder.']]",
          "Full marks. Three different kinds of experiment and a useful reflection.",
        ],
        [
          "full",
          "[[0|Week 1: blind contour of my hand (technique). Week 2: draw with my non-dominant hand (limit). Week 3: draw the same chair from above and below (viewpoint).]] [[1|The goals are to learn to observe closely, to loosen my control, and to see how viewpoint changes shape.]] [[2|Reflection: 'Drawing with my left hand felt clumsy, and the lines wobbled. I noticed I paid more attention to each line.']] [[3|'Next I'll try it on a more detailed drawing to see if the attention carries over.']]",
          "Full marks. Each experiment targets a different skill.",
        ],
        [
          "partial",
          "[[0|Week 1: draw. Week 2: draw. Week 3: draw.]] [[2|Reflection: I tried a drawing.]] I hope to learn nothing in particular.",
          "Make each experiment different and state what it should teach.",
        ],
        [
          "partial",
          "[[1|These teach me to observe.]] [[3|Next time I'll try pressing harder.]] The reflection has no description of what I tried.",
          "A reflection says what you tried, what you noticed, and what to try next.",
          true,
        ],
        [
          "weak",
          "I'll do the same experiment every week because it is easiest.",
          "Different experiments each test a different skill.",
        ],
        [
          "weak",
          "Experiments are a waste of time. I'd rather copy photographs.",
          "Experiments help you discover new methods and ideas.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Mounting an exhibition, writing about your intent, and critique with shared words",
  note: `
## Objectives

Students will be able to:

1. select, mount and display a group of works for an exhibition;
2. write an artist statement that describes your intent and process;
3. give and receive critique in small groups using a shared vocabulary.

## Materials

Finished works, mat board, foam board, hanging hardware or removable mounting strips, rulers, tape measures, labels, a floor plan of the display wall, critique cards, the problem set.

## Starter (6 minutes)

Show a photo of a gallery wall where works hang at different heights and spacing, and another where they are evenly arranged. Ask: "How does arrangement change how you see the works?"

## Main activity

1. Selecting: choose works that relate to one another (theme, color, technique); pick the strongest, not all; consider variety within unity; prepare each piece (clean, mat or mount, label). Sequence them to tell a story or build rhythm.
2. Hanging: museums commonly center works at about 57 inches from the floor, roughly average eye level. If a work is 20 inches tall, then the bottom is at 47 inches and the top at 67 inches. Spacing: for four works, each 16 inches wide, on a 120-inch wall: 4 x 16 = 64 inches of art; 120 - 64 = 56 inches of space; with 5 equal spaces (two ends and three gaps), each is 56 / 5 = 11.2 inches. Check level, keep labels in a consistent place (to the right, at the same height), and light without glare.
3. Artist statement: a short text (about 100 to 150 words) in your voice; state your intent (what you wanted to explore and why), your process (materials, methods, key decisions, problems solved), and what you want the viewer to notice or feel. Avoid vague claims such as "my art is about everything"; use concrete details.
4. Shared vocabulary for critique: use the elements and principles of design by name (value, contrast, emphasis, rhythm). A structure such as the Critical Response Process by Liz Lerman: statements of meaning (viewers tell what they found meaningful), artist as questioner (the artist asks questions), neutral questions (viewers ask questions with no opinion hidden inside), and opinion time (offered only with permission). The artist listens, then decides what to use.

## Problem set

Hang a wall and write a statement.
`,
  reading: [
    "Showing your work well, and talking about it with care",
    `
An **exhibition** is more than hanging pictures on a wall. It is a chance to share a body of work with a public, and the choices you make affect how viewers see it. Start by **selecting** works that relate to each other through a theme, a color family or a technique. Choose the **strongest** pieces rather than everything you made, and look for variety within unity, so that the group feels connected but not repetitive. Prepare each piece: clean it, **mat or mount** it, and make a **label**. Then **sequence** them so that the group builds rhythm or tells a story.

**Hanging** is part of the craft. Museums commonly place the **center** of a work at about **57 inches** from the floor, close to average eye level. A work 20 inches tall will therefore have its bottom edge at 57 - 10 = 47 inches and its top at 67 inches. To space works evenly, do some arithmetic. Suppose you have four works, each 16 inches wide, on a wall 120 inches wide. The art covers 4 x 16 = 64 inches, leaving 120 - 64 = 56 inches. With five equal spaces (a space at each end plus three gaps between the works), each space is 56 / 5 = 11.2 inches. Use a level, put each label in the same place (often to the right of the work, at the same height) and light the wall so that there is no glare.

An **artist statement** helps viewers to enter your work. Write about 100 to 150 words in your own voice. Explain your **intent**: what you wanted to explore and why. Describe your **process**: materials, methods, and key decisions or problems you solved. Say what you hope the viewer will **notice or feel**. Use concrete details ("I used torn newspaper because my grandmother read it every morning") rather than vague claims ("My art is about everything").

Finally, a good **critique** needs a **shared vocabulary**, so that everyone means the same thing when they say "value," "contrast" or "emphasis." One useful structure is the **Critical Response Process** developed by Liz Lerman. In the first step, viewers offer **statements of meaning**, telling what they found meaningful or interesting. In the second, the **artist asks questions** about the work. In the third, viewers ask **neutral questions**, meaning that the question has no opinion hidden in it ("What led you to use red here?" rather than "Why didn't you use blue?"). In the last step, viewers may give **opinions**, but only if the artist agrees. The artist listens without defending, and then decides what to use.
`,
  ],
  cards: [
    ["Exhibition", "A public display of works of art."],
    ["Sequence", "The order in which works are arranged."],
    ["Eye level (57 inches)", "The usual height for the center of a hung artwork."],
    ["Artist statement", "A short text about the artist's intent and process."],
    ["Intent", "What the artist wanted to explore or express."],
    ["Neutral question", "A question with no opinion hidden inside."],
    ["Critical Response Process", "A four-step critique method by Liz Lerman."],
    ["Shared vocabulary", "Common terms everyone uses the same way."],
  ],
  closed: [
    [
      "At about what height do museums commonly center works?",
      ["30 inches", "57 inches", "80 inches", "100 inches"],
      "B",
    ],
    [
      "Four works of 16 inches each on a 120 inch wall leave how many inches of space?",
      ["56", "64", "104", "120"],
      "A",
    ],
    [
      "Which is a neutral question?",
      ["What led you to use red here?", "Why didn't you use blue?", "Don't you think this is too dark?", "Isn't it messy?"],
      "A",
    ],
    [
      "What does an artist statement include?",
      ["Intent, process and what to notice", "Only the price", "Only the date", "Grades"],
      "A",
    ],
    [
      "When are opinions given in the Critical Response Process?",
      ["Last, with the artist's permission", "First", "Never", "Without asking"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "You are hanging five works, each 14 inches wide and 18 inches tall, on a wall 150 inches wide. Calculate the equal spacing (to one decimal place) for the two ends and four gaps, state the height of the bottom and the top edges if the centers go at 57 inches, and describe two other decisions for a good display (labels, light, sequence).",
      scheme: [
        "Calculates the total width as 70 inches and the remaining space as 80 inches",
        "Calculates six equal spaces of 13.3 inches (80 divided by 6)",
        "Calculates the bottom edge as 48 inches and the top as 66 inches",
        "Describes two other decisions such as consistent label placement, glare-free light or sequence",
      ],
      model:
        "Five works at 14 inches is 70 inches. The remaining 150 minus 70 is 80 inches, divided into six equal spaces (two ends and four gaps), so each is 80 divided by 6, about 13.3 inches. With the center at 57 inches and an 18 inch height, the bottom edge is 57 minus 9, which is 48 inches, and the top edge is 66 inches. I would put labels to the right of each work at the same height, light the wall without glare, and order the works so that the colors flow.",
      answers: [
        [
          "full",
          "[[0|Five works at 14 inches is 70 inches of art, which leaves 80 inches.]] [[1|With two ends and four gaps there are six spaces, so 80 ÷ 6 is about 13.3 inches each.]] [[2|With the center at 57 inches and a height of 18 inches, the bottom edge is 48 inches and the top is 66 inches.]] [[3|I'd place labels to the right at the same height, light the wall to avoid glare, and sequence the works so the colors flow.]]",
          "Full marks. The arithmetic and the display decisions are sound.",
        ],
        [
          "full",
          "[[0|The art takes up 5 × 14 = 70 inches, so 150 - 70 = 80 inches of space remains.]] [[1|Six spaces share it, so each is 13.3 inches.]] [[2|57 minus half of 18 is 48 for the bottom, and 57 plus 9 is 66 for the top.]] [[3|Labels would be in the same spot for each piece, I'd check for glare from the window, and I'd put the two warm pieces together at the start.]]",
          "Full marks. Checking for window glare is a thoughtful extra.",
        ],
        [
          "partial",
          "[[0|The art takes up 70 inches.]] [[3|Keep labels in the same place.]] There are five spaces, so each is 16 inches, and the bottoms go at 57 inches.",
          "Two ends and four gaps make six spaces. Center, not bottom, goes at 57 inches.",
        ],
        [
          "partial",
          "[[1|80 divided by 6 is 13.3.]] [[2|Bottom 48, top 66.]] The art takes up 14 + 18 = 32 inches.",
          "Total art width is 5 times 14, which is 70 inches.",
          true,
        ],
        [
          "weak",
          "Just hang them anywhere. Art speaks for itself.",
          "Careful arrangement helps viewers see the works at their best.",
        ],
        [
          "weak",
          "Hang the works at the ceiling to save space.",
          "Works are best centered at eye level, about 57 inches.",
        ],
      ],
    },
    {
      prompt:
        "Write a 100-word artist statement for a piece of your choice (invent the details) that states your intent, your process and what you hope the viewer notices. Then show how a group critique using the Critical Response Process would begin: give one statement of meaning, one question from the artist, and one neutral question from a viewer.",
      scheme: [
        "States the artist's intent clearly with a reason",
        "Describes the process with concrete materials or decisions",
        "States what the viewer should notice or feel",
        "Gives a statement of meaning, an artist's question and a neutral question that fit the Critical Response Process",
      ],
      model:
        "Statement: \"This drawing shows my grandfather's workbench. I wanted to explore how objects hold memory. I used charcoal and an eraser to pull light from the dark, and I placed the hammer near the lower right so the eye travels across the bench. I hope viewers notice the light on the worn handle.\" Critique: a statement of meaning, \"The light on the handle made me think of someone who used it every day.\" Artist's question: \"Does the dark background help the handle stand out?\" Neutral question: \"What led you to place the hammer at the lower right?\"",
      answers: [
        [
          "full",
          "[[0|Statement: 'This drawing shows my grandfather's workbench. I wanted to explore how objects hold memory.']] [[1|'I used charcoal and an eraser to pull light from the dark, and placed the hammer near the lower right so the eye travels across the bench.']] [[2|'I hope viewers notice the light on the worn handle.']] [[3|Critique: statement of meaning, 'The light on the handle made me think of someone who used it every day.' Artist's question: 'Does the dark background help the handle stand out?' Neutral question: 'What led you to place the hammer at the lower right?']]",
          "Full marks. The statement is concrete and the questions are in the right form.",
        ],
        [
          "full",
          "[[0|My intent was to show how waiting feels at a bus stop on a winter evening, because I wait there every day.]] [[1|I painted in layers of blue acrylic with a thin yellow glaze for the streetlight, and I kept the figure small to show how alone it feels.]] [[2|I want viewers to feel the cold and notice the glow of the light.]] [[3|A viewer might say, 'The glow felt warm in a cold scene.' I'd ask, 'Is the figure too small?' and a viewer might ask neutrally, 'How did you decide the size of the figure?']]",
          "Full marks. The questions stay open and non-judgmental.",
        ],
        [
          "partial",
          "[[0|My art is about everything.]] [[3|A viewer says: 'I like it.']] I used materials, and the viewer should feel whatever.",
          "Be concrete about your intent and process, and form a neutral question.",
        ],
        [
          "partial",
          "[[1|I used charcoal and an eraser.]] [[2|I hope people notice the light.]] A neutral question is 'Why didn't you use color? It looks boring.'",
          "A neutral question has no opinion hidden inside. Rephrase it as 'What led you to choose charcoal?'",
          true,
        ],
        [
          "weak",
          "An artist statement is not needed. The work explains itself.",
          "A statement helps viewers understand your intent and process.",
        ],
        [
          "weak",
          "In a critique, the artist must defend every choice loudly.",
          "In a critique the artist listens and decides what to use.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Symbols across cultures, and reading a contemporary portrait",
  note: `
## Objectives

Students will be able to:

1. analyze how artists from different cultures use symbols and imagery;
2. interpret the meaning of a contemporary artwork using evidence from the work.

## Materials

Images of: an Adinkra cloth with the Sankofa symbol (Akan people of Ghana); a calavera print by Jose Guadalupe Posada (La Calavera Catrina, early 1900s, Mexico); Hokusai's The Great Wave off Kanagawa (about 1831, Japan); Kehinde Wiley's portrait of Barack Obama (2018, National Portrait Gallery); an evidence chart; the worksheet.

## Starter (6 minutes)

Show a heart symbol, a skull, and a dove. Ask: "What do these mean? Do they mean the same everywhere?" Discuss that symbols depend on culture.

## Main activity

1. Symbols: an image that stands for an idea. Examples: Adinkra symbols of the Akan people (Ghana) are stamped on cloth; Sankofa shows a bird looking backward with an egg in its beak, meaning "learn from the past." In Mexico, calaveras (skulls) are used humorously in Day of the Dead imagery to celebrate lives and remind that death is part of life; Posada's Catrina (early 1900s) is an elegant skeleton in a fancy hat, a social comment about vanity. In Japan, Hokusai's Great Wave (about 1831) shows a huge wave and small boats with Mount Fuji, a symbol of permanence, in the distance, contrasting nature's power and stability.
2. Interpreting a contemporary work with evidence: Kehinde Wiley's portrait of Barack Obama (2018) shows him seated in a chair against a wall of leafy greenery with flowers. The flowers include chrysanthemums (the official flower of Chicago), jasmine (Hawaii, where he was born) and African blue lilies (his Kenyan father's heritage). His pose is leaning forward, serious, with arms resting on his knees. Interpretation: the flowers tell the story of his life; the pose shows thoughtful focus. Method: look for evidence (what is in the work), connect it to knowledge (what do the symbols mean?), reach an interpretation (what is the work saying?), and check against other details.
3. Keep your claims tied to what you can see. Use "The work shows... which suggests..."

## Worksheet

Chart evidence for two works.
`,
  reading: [
    "Pictures that stand for ideas, and reading a portrait for evidence",
    `
A **symbol** is an image that stands for an idea. Because symbols depend on the culture in which they are used, the same image can mean different things to different people. Artists around the world use them with great skill.

Among the Akan people of Ghana, **Adinkra symbols** are stamped on cloth, each with a meaning. **Sankofa** is shown as a bird that looks backward while its feet face forward, holding an egg in its beak. It means "go back and get it," or **learn from the past** to move forward. In Mexico, skeleton figures called **calaveras** appear in Day of the Dead celebrations. Rather than being frightening, they are playful, and remind people to honor those who have died and that death is part of life. The printmaker **José Guadalupe Posada** created *La Calavera Catrina* in the early 1900s: an elegant skeleton wearing a fancy hat, which poked fun at people who put on airs. In Japan, **Katsushika Hokusai's** *The Great Wave off Kanagawa* (about 1831) shows an enormous wave about to crash over fishing boats, while Mount Fuji, a symbol of permanence, stands small and calm in the distance. The contrast suggests both the power of nature and its stillness.

Reading a **contemporary** artwork uses the same skills. In 2018, the painter **Kehinde Wiley** made the official portrait of former President **Barack Obama** for the National Portrait Gallery. Instead of a traditional office, the president is seated in a chair, leaning forward with his arms resting on his knees, against a wall of leafy greenery filled with flowers. To **interpret** it, start with **evidence**: what is in the picture? Next, connect it to what you know. The flowers are not random: **chrysanthemums** are the official flower of Chicago, where his political career began; **jasmine** stands for Hawaii, where he was born; and **African blue lilies** refer to his father's home in Kenya. Together, the flowers tell the story of his life. His forward-leaning, serious pose suggests thoughtful focus. A possible interpretation: the portrait presents a leader as a person shaped by many places, not as a figure surrounded by symbols of power.

When you interpret, keep your claims **tied to evidence**. Use sentences such as "The work shows..., which suggests..." If a detail does not fit your idea, revise the idea. Multiple interpretations may be possible, but some are better supported than others.
`,
  ],
  cards: [
    ["Symbol", "An image that stands for an idea."],
    ["Sankofa", "An Akan symbol meaning to learn from the past."],
    ["Adinkra", "Symbols of the Akan people of Ghana, stamped on cloth."],
    ["Calavera", "A playful skull or skeleton image in Mexican tradition."],
    ["La Calavera Catrina", "Posada's elegantly dressed skeleton from the early 1900s."],
    ["The Great Wave", "Hokusai's print of a wave, with Mount Fuji, about 1831."],
    ["Evidence", "Details in the work that support an interpretation."],
    ["Interpretation", "An explanation of what a work means, based on evidence."],
  ],
  closed: [
    [
      "The Sankofa symbol means:",
      ["Learn from the past", "Run fast", "Be silent", "Count the stars"],
      "A",
    ],
    [
      "In Kehinde Wiley's portrait of Barack Obama, what do the jasmine flowers refer to?",
      ["Hawaii", "Kenya", "Chicago", "Paris"],
      "A",
    ],
    [
      "Who created La Calavera Catrina?",
      ["Jose Guadalupe Posada", "Hokusai", "Kehinde Wiley", "Leonardo da Vinci"],
      "A",
    ],
    [
      "In The Great Wave off Kanagawa, which mountain is in the distance?",
      ["Mount Fuji", "Mount Everest", "Mount Rushmore", "Mount Kenya"],
      "A",
    ],
    [
      "A good interpretation is tied to:",
      ["Evidence in the work", "A guess", "The artist's age", "The price"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Interpret Kehinde Wiley's 2018 portrait of Barack Obama using evidence. Describe at least three details you can see (the pose, the background, the flowers), say what each of the three flowers refers to, and write an interpretation of what the portrait says about the person that is tied to those details.",
      scheme: [
        "Describes at least three visible details",
        "Correctly identifies chrysanthemums (Chicago), jasmine (Hawaii) and African blue lilies (Kenya)",
        "Explains what the pose suggests",
        "Writes an interpretation tied to the evidence",
      ],
      model:
        "The portrait shows Obama seated in a chair, leaning forward with his arms on his knees, against a wall of green leaves filled with flowers. The chrysanthemums are the flower of Chicago, the jasmine refers to Hawaii where he was born, and the African blue lilies refer to his father's home in Kenya. The forward-leaning pose looks serious and thoughtful. My interpretation is that the portrait shows a leader shaped by many places, and presents him as a thoughtful person, instead of a figure surrounded by symbols of power.",
      answers: [
        [
          "full",
          "[[0|It shows Obama seated, leaning forward with his arms on his knees, against a wall of green leaves filled with flowers.]] [[1|The chrysanthemums are the flower of Chicago, the jasmine refers to Hawaii where he was born, and the African blue lilies refer to his father's home in Kenya.]] [[2|The forward-leaning pose looks serious and thoughtful.]] [[3|My interpretation is that the portrait shows a leader shaped by many places, and presents him as a thoughtful person rather than surrounding him with symbols of power.]]",
          "Full marks. Every claim is tied to something visible.",
        ],
        [
          "full",
          "[[0|The details I see are the chair, the intense forward pose, and a dense background of leaves and flowers instead of an office.]] [[1|Chrysanthemums stand for Chicago, jasmine for Hawaii and African blue lilies for Kenya.]] [[2|Leaning forward with focused eyes suggests concentration and seriousness.]] [[3|The flowers suggest that his identity was formed by three places, so the portrait tells a life story, not just his office.]]",
          "Full marks. 'A life story, not just his office' is a strong reading.",
        ],
        [
          "partial",
          "[[0|He is sitting in a chair.]] [[3|It shows a person.]] The flowers are random and have no meaning. He looks angry because of his posture.",
          "The flowers refer to Chicago, Hawaii and Kenya. A forward lean suggests focus.",
        ],
        [
          "partial",
          "[[1|Chrysanthemums are for Chicago, jasmine for Hawaii.]] [[2|The pose looks thoughtful.]] The blue lilies refer to France and the portrait shows a king.",
          "The African blue lilies refer to Kenya, his father's home. The portrait shows a president.",
          true,
        ],
        [
          "weak",
          "It means whatever I want. There is no way to be wrong.",
          "Interpretations should be tied to evidence in the work.",
        ],
        [
          "weak",
          "I cannot interpret it because I am not an artist.",
          "Anyone can interpret by looking carefully and using evidence.",
        ],
      ],
    },
    {
      prompt:
        "Choose two works from Sankofa (Adinkra), La Calavera Catrina or The Great Wave. For each, describe the imagery, explain what the symbol or imagery means in its culture, and what message it carries. Then compare how the two use imagery differently, and explain why symbols can change meaning across cultures.",
      scheme: [
        "Describes the imagery and meaning of the first work accurately",
        "Describes the imagery and meaning of the second work accurately",
        "Compares how the two use imagery differently",
        "Explains that symbols depend on the culture (the same image can mean different things)",
      ],
      model:
        "Sankofa shows a bird looking backward with an egg in its beak, a symbol of the Akan people of Ghana meaning to learn from the past. La Calavera Catrina is an elegant skeleton in a fancy hat by Posada, using the Mexican tradition of the calavera to joke about vanity while reminding that death comes to all. Sankofa uses a simple, serious symbol to teach, while Posada uses humor and a human-like figure to make a social comment. Symbols depend on culture: a skull may be frightening in one place, but playful and honoring in another.",
      answers: [
        [
          "full",
          "[[0|Sankofa is a bird looking backward with an egg in its beak, an Akan symbol from Ghana that means to learn from the past.]] [[1|La Calavera Catrina is an elegant skeleton in a fancy hat by Posada, using the Mexican calavera tradition to joke about vanity and remind us that death comes to all.]] [[2|Sankofa uses a simple, serious symbol to teach a value, while Posada uses humor and a human-like figure to make a social comment.]] [[3|Symbols depend on culture: a skull may be frightening in one place and playful and honoring in another.]]",
          "Full marks. Both works and the cultural point are accurate.",
        ],
        [
          "full",
          "[[0|The Great Wave shows a huge wave about to crash on small boats, with Mount Fuji tiny and calm behind; it contrasts nature's power with its stillness.]] [[1|Sankofa, an Adinkra symbol, is a bird looking back while moving forward, meaning that learning from the past helps the future.]] [[2|Hokusai makes a dramatic picture of a scene, whereas Sankofa is a compact symbol used on cloth to carry a saying.]] [[3|A wave might mean danger in one culture, but in Japan, with Mount Fuji, the picture also expresses permanence; meanings depend on culture.]]",
          "Full marks. The contrast between a scene and a compact symbol is well observed.",
        ],
        [
          "partial",
          "[[0|Sankofa is a bird.]] [[3|Symbols differ by culture.]] La Calavera Catrina is a scary monster and the Great Wave shows a calm lake.",
          "Catrina is a playful skeleton, and the Great Wave shows a huge, threatening wave.",
        ],
        [
          "partial",
          "[[1|Catrina jokes about vanity.]] [[2|Sankofa uses a simple symbol.]] Sankofa is from Mexico and means to run.",
          "Sankofa is from the Akan people of Ghana and means to learn from the past.",
          true,
        ],
        [
          "weak",
          "All symbols mean the same thing everywhere.",
          "Symbols depend on culture and can mean different things in different places.",
        ],
        [
          "weak",
          "Symbols are decorations without meaning.",
          "Symbols carry ideas and values in their cultures.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Two works on one theme, and a movement in its time",
  note: `
## Objectives

Students will be able to:

1. compare two artworks that address the same theme in different ways;
2. research an art movement and explain how it responded to its historical context.

## Materials

Images of Francisco Goya's The Third of May 1808 (1814) and Pablo Picasso's Guernica (1937); a comparison chart; images and short texts about Dada (Marcel Duchamp's Fountain, 1917; Hannah Hoch's photomontage) and the Harlem Renaissance (Aaron Douglas); a timeline; the worksheet.

## Starter (6 minutes)

Show two photographs of the same city street, one from morning and one at night. Ask: "Same subject, different pictures. What changed, and why?" Introduce comparing artworks on a theme.

## Main activity

1. Comparing two works on one theme (war's suffering): Goya's The Third of May 1808 (1814) shows Spanish civilians facing a French firing squad at night, lit by a lantern; a man in a white shirt with arms raised is the focal point; realistic figures, strong light and dark contrast, and emotion. Picasso's Guernica (1937) is a huge black, white and gray painting (about 11 feet by 25 feet) responding to the bombing of the Basque town of Guernica during the Spanish Civil War; it uses fractured, Cubist forms, a screaming horse, a bull, a mother with a child, and no color to express chaos and grief. Compare: subject, style, color, scale, viewpoint, mood, how each shows suffering. Both are protest images against violence.
2. Researching a movement: ask what the movement was, when and where it began, who the key artists were, what was happening in the world, how artists responded, and what its legacy is. Example, Dada: begun in 1916 in Zurich (Cabaret Voltaire) in the middle of World War I by artists who rejected the logic and nationalism they blamed for the war; used nonsense, chance, collage and ready-made objects such as Duchamp's Fountain (1917, a urinal signed R. Mutt); questioned what art is. Example, the Harlem Renaissance: 1920s to 1930s in New York, a flowering of Black art, literature and music after the Great Migration; Aaron Douglas's murals blended African-inspired imagery and modern design.
3. Citing sources and separating fact from opinion.

## Worksheet

Compare two works and research a movement.
`,
  reading: [
    "Same subject, different answers, and art as a response to its age",
    `
Two artists can address the same **theme** and make works that look nothing alike. Comparing them shows how choices of style, color and viewpoint change what a work says. A classic pair is **Francisco Goya's** *The Third of May 1808* (1814) and **Pablo Picasso's** *Guernica* (1937). Both show the suffering of ordinary people in war, and both are protests against violence.

Goya shows a night scene in Madrid in which Spanish civilians face a **French firing squad**. A lantern on the ground lights the scene brightly, and a man in a white shirt, with his arms flung wide, is the **focal point**. The soldiers are faceless and lined up, while the victims are individual and expressive. Goya paints in a **realistic** style, with strong **contrast** between light and dark, to make you feel the terror of a particular moment. Picasso responded to the bombing of the Basque town of Guernica during the Spanish Civil War. His painting is enormous, about 11 feet by 25 feet, and painted only in **black, white and gray**. He uses **fractured, Cubist forms**: a screaming horse, a bull, a mother holding a dead child, broken limbs. There is no single moment or place; it expresses **chaos and grief** in general. To compare, ask about **subject, style, color, scale, viewpoint and mood**, and decide how each shows suffering. Goya's work makes an event feel real and immediate; Picasso's makes the experience of war feel overwhelming and universal.

Art also responds to its **historical context**. When you research a **movement**, ask: *What was it? When and where did it begin? Who were the key artists? What was happening in the world? How did artists respond? What was its legacy?* Take **Dada**. It began in 1916 in Zurich, Switzerland, in the middle of **World War I**. Its artists rejected the logic, patriotism and "reason" that they believed had led to the war's slaughter. They used nonsense, chance, collage and **ready-made** objects. Marcel Duchamp's *Fountain* (1917) was a urinal signed "R. Mutt," and raised the question: what makes something art? Another example is the **Harlem Renaissance** of the 1920s and 1930s in New York, a flowering of Black art, literature and music, which grew in part from the Great Migration. The painter **Aaron Douglas** blended African-inspired imagery with modern design in his murals.

As you research, **cite your sources** and separate **facts** (dates, places, names) from **opinions** (judgments such as "the best work"). A movement is easiest to understand when you can explain its response to events: the art is a conversation with its time.
`,
  ],
  cards: [
    ["Theme", "A central idea addressed in a work."],
    ["Realism", "A style that shows things as they appear."],
    ["Cubism", "A style that breaks forms into fragmented shapes."],
    ["Protest art", "Art that speaks against injustice or violence."],
    ["Dada", "An early 1900s movement that rejected the logic behind war."],
    ["Ready-made", "An ordinary object presented as art."],
    ["Harlem Renaissance", "A 1920s and 1930s flowering of Black art and writing in New York."],
    ["Historical context", "The events and conditions of a work's time."],
  ],
  closed: [
    [
      "Guernica is painted mainly in:",
      ["Black, white and gray", "Bright rainbow colors", "Gold only", "Red only"],
      "A",
    ],
    [
      "Where did Dada begin in 1916?",
      ["Zurich", "Tokyo", "Chicago", "Cairo"],
      "A",
    ],
    [
      "Goya's The Third of May 1808 shows:",
      ["Civilians facing a firing squad", "A picnic", "A mountain", "A queen"],
      "A",
    ],
    [
      "Which is a fact rather than an opinion?",
      ["Fountain was shown in 1917", "Guernica is the best painting", "Dada is boring", "Goya is overrated"],
      "A",
    ],
    [
      "Why cite sources when researching?",
      ["So readers can check your facts", "To make the paper longer", "To hide your work", "It is not needed"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Compare Goya's The Third of May 1808 and Picasso's Guernica. Use at least four points of comparison (such as subject, style, color, scale, viewpoint or mood), explain how each shows suffering, and say what the two works share.",
      scheme: [
        "Compares two points accurately (for example, realistic style versus fractured Cubist forms)",
        "Compares two more points accurately (for example, color/light versus black, white and gray; or scale)",
        "Explains how each work shows suffering",
        "States what they share, such as being protests against violence",
      ],
      model:
        "Goya's style is realistic, while Picasso's is fractured and Cubist. Goya uses strong light and dark contrast and a lantern for drama, while Picasso uses only black, white and gray in a huge painting about 11 by 25 feet. Goya shows one moment, civilians facing a firing squad, so you feel the terror of a particular event; Picasso shows a screaming horse, a bull and a mother with a child to express chaos and grief in general. Both are protests against the suffering that violence causes ordinary people.",
      answers: [
        [
          "full",
          "[[0|Goya's style is realistic, while Picasso's is fractured and Cubist.]] [[1|Goya uses strong light and dark with a lantern for drama, while Picasso uses only black, white and gray on a huge canvas about 11 by 25 feet.]] [[2|Goya shows one moment, civilians facing a firing squad, so we feel a specific terror; Picasso uses a screaming horse, a bull and a mother with a child to express chaos and grief in general.]] [[3|Both are protests against the suffering that violence causes ordinary people.]]",
          "Full marks. Four points of comparison and a shared purpose.",
        ],
        [
          "full",
          "[[0|Subject: Goya shows a firing squad executing civilians in Madrid; Picasso responds to the bombing of the Basque town of Guernica.]] [[1|Color and scale: Goya uses dark night with a bright lantern; Picasso uses no color at all, and the canvas is enormous.]] [[2|Goya makes suffering personal, with a man in white, arms wide; Picasso makes it universal, with broken bodies and a screaming horse.]] [[3|What they share is that both protest violence against ordinary people.]]",
          "Full marks. Personal versus universal is a strong comparison.",
        ],
        [
          "partial",
          "[[0|Goya is realistic.]] [[3|Both are protests.]] Picasso uses bright colors, and Goya's painting is the same size as Guernica.",
          "Guernica is black, white and gray, and it is far larger than Goya's painting.",
        ],
        [
          "partial",
          "[[1|Goya uses a lantern for drama.]] [[2|Picasso expresses chaos.]] Guernica shows a French firing squad in Madrid.",
          "The firing squad is in Goya's painting; Guernica responds to a bombing.",
          true,
        ],
        [
          "weak",
          "They are the same because they are both paintings.",
          "Compare specific choices such as style, color and scale.",
        ],
        [
          "weak",
          "Picasso painted Guernica in the 1700s as a joke.",
          "Guernica was painted in 1937 as a response to a bombing.",
        ],
      ],
    },
    {
      prompt:
        "Research and explain a movement (Dada or the Harlem Renaissance). State what and when and where it began, name a key artist or work, describe the historical context, explain how the movement responded to it, and say how you would show your sources and separate fact from opinion.",
      scheme: [
        "States what, when and where the movement began",
        "Names a key artist or work accurately",
        "Describes the historical context and how artists responded",
        "Describes citing sources and separating fact from opinion",
      ],
      model:
        "Dada began in 1916 in Zurich, Switzerland, in the middle of World War I. A key work is Marcel Duchamp's Fountain (1917), a urinal signed R. Mutt. The artists rejected the logic and nationalism they blamed for the war, and used nonsense, chance, collage and ready-made objects to question what art is. In my report, I would list my sources, such as a museum website and an encyclopedia, state dates and names as facts, and label judgments like \"the most shocking work\" as opinions.",
      answers: [
        [
          "full",
          "[[0|Dada began in 1916 in Zurich, Switzerland, in the middle of World War I.]] [[1|A key work is Marcel Duchamp's Fountain (1917), a urinal signed R. Mutt.]] [[2|The artists rejected the logic and nationalism they blamed for the war, and used nonsense, chance, collage and ready-made objects to question what art is.]] [[3|I'd list my sources, such as a museum website and an encyclopedia, state dates and names as facts, and label judgments like 'the most shocking work' as opinions.]]",
          "Full marks. The context and the response are connected.",
        ],
        [
          "full",
          "[[0|The Harlem Renaissance was a flowering of Black art, literature and music in New York in the 1920s and 1930s.]] [[1|Aaron Douglas painted murals that blended African-inspired imagery with modern design.]] [[2|It grew in part from the Great Migration, when many Black Americans moved north, and artists celebrated Black identity and history.]] [[3|I'd cite a museum page and a library source, give dates as facts and keep my opinion on which works I like separate.]]",
          "Full marks. Linking the movement to the Great Migration is the key context.",
        ],
        [
          "partial",
          "[[0|Dada began in 1916.]] [[3|I'd list my sources.]] It was a reaction to a cooking show, and there was nothing happening in the world.",
          "Dada responded to World War I. Describe the historical context.",
        ],
        [
          "partial",
          "[[1|Fountain by Marcel Duchamp.]] [[2|Artists used ready-made objects.]] Dada began in Tokyo in 1950.",
          "Dada began in 1916 in Zurich, Switzerland.",
          true,
        ],
        [
          "weak",
          "Art movements have nothing to do with history.",
          "Movements respond to the events and conditions of their time.",
        ],
        [
          "weak",
          "I'd copy a paragraph from the internet and not say where it came from.",
          "Always cite sources and write in your own words.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Art that changes minds, and finding the arts around you",
  note: `
## Objectives

Students will be able to:

1. describe how art can influence social or political ideas;
2. identify local arts opportunities, such as galleries, classes and public art.

## Materials

Images of protest and public art (Shepard Fairey's Hope poster, 2008; Diego Rivera's Detroit Industry murals, 1932 to 1933; Claes Oldenburg and Coosje van Bruggen's Free Stamp in Cleveland, 1991), a local arts directory (invented for the exercise but with real Ohio institutions), a community-map worksheet, the worksheet.

## Starter (6 minutes)

Ask: "Think of a poster, mural or song that changed how you think about something. What did it do?" Collect examples.

## Main activity

1. Art and ideas: art can raise awareness (documenting a problem), persuade (posters), give voice to groups who are overlooked, bring communities together (murals), and honor memory (monuments). Examples: Diego Rivera's Detroit Industry murals (1932 to 1933, Detroit Institute of Arts) show workers in an auto factory and celebrate industrial labor; Shepard Fairey's Hope poster (2008) used a stylized portrait and three words to support a campaign; Picasso's Guernica (1937) turned the world's attention to a bombing. Considering ethics: who is represented, who speaks, what is the message, and does it respect people?
2. Art in your community: galleries and museums (the Cleveland Museum of Art and the Toledo Museum of Art offer free general admission; the Columbus Museum of Art, the Cincinnati Art Museum and Wexner Center for the Arts), arts districts (Columbus's Short North holds a Gallery Hop on the first Saturday of each month), public art (Cleveland's Free Stamp, a giant sculpture of a rubber stamp at Willard Park), classes (community centers, libraries, parks departments, community colleges), community art programs and festivals, and school clubs.
3. Make a plan: choose one place to visit, one class to try and one way to contribute (volunteer, display work, join a club).

## Worksheet

Analyze an art-and-ideas example and map local opportunities.
`,
  reading: [
    "When pictures change minds, and where to find art nearby",
    `
Art does more than decorate. Throughout history, artists have used pictures to **influence ideas**. Art can **raise awareness** of a problem that people had not noticed, **persuade** people to act, **give voice** to groups that are often overlooked, **bring a community together**, or **honor memory**.

Consider a few examples. **Diego Rivera's** *Detroit Industry* murals (1932 to 1933), painted on the walls of the Detroit Institute of Arts, show workers in an automobile factory in monumental scale, and honor the dignity of industrial labor at a time of economic crisis. **Shepard Fairey's** *Hope* poster (2008) used a stylized portrait in red, white and blue with a single word to support a presidential campaign, and spread worldwide through posters and the internet. **Picasso's** *Guernica* (1937) brought the world's attention to the bombing of a town. Each used visual power to move people's thoughts and feelings. A thoughtful viewer also asks ethical questions: *Who is represented, and who is speaking for them? What is the message? Is the image fair and truthful? Does it respect the people shown?* Persuasive images can also mislead, so check the claims behind them.

You do not have to look far to find art in your own community. Ohio has excellent **museums and galleries**. The **Cleveland Museum of Art** and the **Toledo Museum of Art** offer free general admission. The **Columbus Museum of Art**, the **Cincinnati Art Museum** and the **Wexner Center for the Arts** at The Ohio State University show both historic and contemporary work. **Arts districts**, such as Columbus's **Short North**, hold a **Gallery Hop** on the first Saturday of each month, when galleries open their doors to visitors. **Public art** is everywhere: in Cleveland's Willard Park stands *Free Stamp*, a giant sculpture of a rubber stamp by Claes Oldenburg and Coosje van Bruggen (1991), which is a playful landmark. You can also find **classes** at community centers, public libraries, parks departments and community colleges, and **school art clubs**, festivals and community mural projects.

To make this practical, write a short plan. Choose **one place to visit** (a museum or gallery), **one class or workshop to try**, and **one way to contribute**: volunteering, displaying your work in a library or café, or joining a club. Arts involvement is a lifelong source of friends, ideas and satisfaction, and it keeps your own work growing.
`,
  ],
  cards: [
    ["Raise awareness", "Draw attention to an issue people had overlooked."],
    ["Persuade", "Convince people to believe or act."],
    ["Mural", "A large painting made directly on a wall."],
    ["Public art", "Art placed in open spaces for everyone to see."],
    ["Gallery Hop", "A monthly evening when Short North galleries open to the public."],
    ["Free Stamp", "A Cleveland sculpture of a giant rubber stamp."],
    ["Ethics", "Questions of right and wrong in how people are shown."],
    ["Community class", "A lesson offered by a local organization."],
  ],
  closed: [
    [
      "Diego Rivera's Detroit Industry murals celebrate:",
      ["Industrial labor", "A royal wedding", "Space travel", "Ancient Greece"],
      "A",
    ],
    [
      "Which Ohio museums offer free general admission?",
      ["Cleveland and Toledo", "None", "Only Cincinnati", "Only Columbus"],
      "A",
    ],
    [
      "When does the Short North Gallery Hop take place?",
      ["The first Saturday of each month", "Every day", "Once a year", "Every Monday"],
      "A",
    ],
    [
      "Which question is an ethical question about a persuasive image?",
      ["Who is represented and does it respect them?", "What size is it?", "Who framed it?", "How old is the paper?"],
      "A",
    ],
    [
      "Free Stamp is a sculpture of a:",
      ["Giant rubber stamp", "Horse", "Bridge", "Lighthouse"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Choose one example of art that influenced social or political ideas (Rivera's Detroit Industry murals, Fairey's Hope poster or Picasso's Guernica). Describe what it shows, the idea it promoted or the awareness it raised, how its visual choices made it effective, and one ethical question a viewer should ask about it.",
      scheme: [
        "Describes accurately what the work shows",
        "Explains the idea it promoted or the awareness it raised",
        "Explains a visual choice that made it effective",
        "Asks a relevant ethical question",
      ],
      model:
        "Picasso's Guernica is a huge black, white and gray painting of a screaming horse, a bull and a mother with a dead child. It raised awareness of the bombing of the town of Guernica and of the suffering that war causes civilians. The lack of color and the fractured forms make the scene feel chaotic and grim, and its large size makes viewers feel surrounded. A viewer should ask: Does the image respect the real victims it represents, and who decides how their suffering is shown?",
      answers: [
        [
          "full",
          "[[0|Picasso's Guernica is a huge black, white and gray painting of a screaming horse, a bull and a mother with a dead child.]] [[1|It raised awareness of the bombing of the town of Guernica and of the suffering that war causes civilians.]] [[2|The lack of color and fractured forms make the scene chaotic and grim, and its large size surrounds the viewer.]] [[3|A viewer should ask whether the image respects the real victims it represents, and who decides how their suffering is shown.]]",
          "Full marks. The visual choices are tied to the message.",
        ],
        [
          "full",
          "[[0|Diego Rivera's Detroit Industry murals show workers at machines inside a car factory on a monumental scale.]] [[1|They honor the dignity of industrial labor during hard economic times.]] [[2|The big scale and the heroic poses make the workers look important, which is why the murals influence how viewers think about labor.]] [[3|An ethical question is who is represented and who is left out, and whether the factory scene presents the whole truth of the work.]]",
          "Full marks. Asking who is left out is a thoughtful ethical question.",
        ],
        [
          "partial",
          "[[0|Hope is a poster of a man.]] [[2|The colors are red, white and blue.]] It had no effect on anyone and there are no ethical questions.",
          "The poster spread widely and supported a campaign. Explain the idea and ask an ethical question.",
        ],
        [
          "partial",
          "[[1|Guernica raised awareness of a bombing.]] [[3|Does it respect the victims?]] It is a small colorful painting.",
          "Guernica is huge, about 11 by 25 feet, and painted in black, white and gray.",
          true,
        ],
        [
          "weak",
          "Art can't change anyone's ideas. It's only decoration.",
          "Artists have used images to raise awareness and influence ideas throughout history.",
        ],
        [
          "weak",
          "Persuasive images are always true because they are art.",
          "Persuasive images can mislead. Check the claims.",
        ],
      ],
    },
    {
      prompt:
        "Write a personal plan to be part of the arts in your community. Name one place to visit, one class or workshop to try, one way to contribute, and one public artwork you could look at, using real Ohio examples. Explain what you hope to get from each and one barrier you might face and how you would handle it.",
      scheme: [
        "Names a real place to visit and what the student hopes to gain",
        "Names a class or workshop and a way to contribute",
        "Names a public artwork or district with accurate information",
        "Names a barrier and a realistic solution",
      ],
      model:
        "I would visit the Cleveland Museum of Art, which has free general admission, to study how artists use light. I would try a Saturday drawing class at the public library and contribute by displaying my best piece at the library's teen art night. I could visit Free Stamp in Willard Park, Cleveland, to see how public art uses scale and humor. A barrier is transportation, so I would go with my cousin who drives, or ask my parents to plan a family day trip.",
      answers: [
        [
          "full",
          "[[0|I'd visit the Cleveland Museum of Art, which has free general admission, to study how artists use light.]] [[1|I'd try a Saturday drawing class at the public library and contribute by displaying my best piece at the library's teen art night.]] [[2|I could also see Free Stamp at Willard Park in Cleveland to learn how public art uses scale and humor.]] [[3|A barrier is transportation, so I'd go with my cousin who drives, or ask my parents to plan a family day trip.]]",
          "Full marks. The places are real and the plan is realistic.",
        ],
        [
          "full",
          "[[0|I'd go to the Short North Gallery Hop in Columbus on the first Saturday to see how local artists show their work.]] [[1|I'd take a community college workshop on printmaking and volunteer to help with the next school art show.]] [[2|Another stop would be the Columbus Museum of Art for a closer look at works we studied.]] [[3|The cost of workshops may be a barrier, so I'd ask about scholarships or use free library classes first.]]",
          "Full marks. Looking for scholarships and free classes is practical.",
        ],
        [
          "partial",
          "[[0|I'd visit a museum.]] [[3|Transportation could be a problem.]] I would not take a class or contribute, and no public art exists near me.",
          "Add a class, a way to contribute and a named public artwork.",
        ],
        [
          "partial",
          "[[1|I'd take a class at the library.]] [[2|Free Stamp is in Toledo.]] A barrier would be that I have no barriers.",
          "Free Stamp is in Willard Park, Cleveland. Think about real barriers, such as transportation or cost.",
          true,
        ],
        [
          "weak",
          "There's no art in my community, so there is nothing to plan.",
          "Most communities have galleries, classes or public art. Look for them.",
        ],
        [
          "weak",
          "I'd skip a plan and wait until art finds me.",
          "A plan makes it far more likely that you will take part.",
        ],
      ],
    },
  ],
};

writeCourse("art-ii-grade-10.json", "Art II", "Grade 10", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
