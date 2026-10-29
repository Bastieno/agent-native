import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Art I, Grade 9, Quarter 1. Standards: National Core Arts Standards (visual
 * arts: creating, presenting, responding, connecting), in the school's own
 * words. Artists named are real and the facts have been checked; Ohio museums
 * and artists are used for local context. No practical write-ups: the studio
 * work is assessed by observation and portfolio, and the written work covers
 * the ideas behind it.
 */

const w1: WeekInput = {
  topic: "The elements of art, finding ideas, and drawing what you see",
  note: `
## Objectives

Students will be able to:

1. use the elements of art, including line, shape, color, value and texture, to make a composition;
2. generate ideas for an artwork through sketching, brainstorming and visual research;
3. create a line drawing from observation using contour and gesture.

## Materials

Sketchbooks, pencils (HB, 2B), erasers, drawing paper, found objects (shoes, plants, tools), timers, magazines and printed images for visual research, the problem set.

## Starter (6 minutes)

Ask students to look at a shoe for 30 seconds, then draw it without looking at the paper. Ask: "What did your eyes notice that you had not seen before?"

## Main activity

1. Elements of art: line (a mark made by a moving point; thick, thin, straight, curved), shape (a flat, enclosed area; geometric or organic), color (hue, value and intensity), value (lightness or darkness), texture (how a surface feels or looks like it feels), space (positive and negative) and form (a three-dimensional object).
2. Generating ideas: brainstorm a word web from a theme (for example, "home"), make thumbnail sketches (small, quick), collect visual research (photographs, objects, other artists' work), combine ideas, and choose one to develop.
3. Observational drawing: contour drawing follows the edges of a form with a slow, continuous line, eyes on the object; gesture drawing captures movement and energy with quick, loose lines in 30 seconds to 2 minutes. Practice: 10 gesture drawings of a classmate in poses, then a 10-minute contour drawing of a shoe.
4. Making a composition: using a limited set of elements on purpose, such as a drawing that uses only line and value of a plant.

## Problem set

Name the elements in an artwork and plan a composition.
`,
  reading: [
    "The building blocks of a picture, and how to start one",
    `
Every artwork, from a stick drawing to a famous painting, is built from a small set of ingredients called the **elements of art**. Learning to see them helps you to make your own work and to talk about the work of others.

**Line** is a mark made by a moving point. Lines can be thick or thin, straight or curved, smooth or jagged, and they can show direction, edges and mood. **Shape** is a flat area enclosed by a line or a change in color. Shapes can be **geometric** (circles, squares, triangles) or **organic** (irregular, like a leaf). **Color** has three properties: its **hue** (the name, such as red), its **value** (how light or dark) and its **intensity** (how bright or dull). **Value** is the lightness or darkness of any color, from white through grays to black, and it is used to make objects look solid. **Texture** is the way a surface feels, or looks as if it feels: rough, smooth, fuzzy or bumpy. **Space** is the area around and between things; the objects are the **positive space** and the empty areas are the **negative space**. **Form** is a three-dimensional object with height, width and depth, such as a sculpture, or a shape made to look solid by shading.

A good artwork begins with an idea. To **generate ideas**, begin by **brainstorming**. Write a theme such as "home" in the middle of a page, and add words that connect to it: kitchen, porch, noise, a dog, a quilt. Then make **thumbnail sketches**, small, quick drawings, each about the size of a stamp, to try out several compositions. Do not erase; the point is quantity. Collect **visual research**: photographs, real objects and examples of how other artists have solved similar problems. Combine the best parts and choose one idea to develop. Sketchbooks are a place to be messy.

Drawing from life trains you to see. In a **contour drawing**, you follow the edges of an object with a slow, continuous line, keeping your eyes on the object and your pencil moving, imagining that it is touching the edge. In a **blind contour**, you do not look at the paper. The drawing may look strange, but you will learn to observe. A **gesture drawing** is the opposite: quick and loose, capturing the movement and energy of a pose in 30 seconds to 2 minutes, using the whole arm. Start a drawing session with gestures to warm up, and then spend ten minutes on a careful contour drawing. When you combine your skills, you can make a composition that uses the elements on purpose: for instance, a plant drawn with only line and value. Notice that restricting your tools can lead to more creative choices.
`,
  ],
  cards: [
    ["Line", "A mark made by a moving point."],
    ["Shape", "A flat area enclosed by a line or color change."],
    ["Value", "The lightness or darkness of a color."],
    ["Texture", "How a surface feels or looks like it feels."],
    ["Negative space", "The empty area around and between objects."],
    ["Thumbnail sketch", "A small, quick drawing used to plan."],
    ["Contour drawing", "A slow drawing that follows the edges of a form."],
    ["Gesture drawing", "A quick drawing that captures movement."],
  ],
  closed: [
    [
      "Which element of art describes how light or dark something is?",
      ["Line", "Value", "Texture", "Shape"],
      "B",
    ],
    [
      "An organic shape is best described as:",
      ["A perfect circle", "An irregular, natural-looking shape", "A square", "A straight line"],
      "B",
    ],
    [
      "A gesture drawing is mainly used to:",
      ["Capture movement and energy quickly", "Show every small detail", "Use only an eraser", "Copy a photograph exactly"],
      "A",
    ],
    [
      "The empty area around an object is called:",
      ["Positive space", "Negative space", "Form", "Hue"],
      "B",
    ],
    [
      "Why make several thumbnail sketches?",
      ["To try out several ideas before choosing one", "To avoid drawing", "To save paper", "To finish at once"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Choose a simple object such as a shoe, a plant or a mug. Describe how you would use at least four elements of art (line, shape, value, texture, space) in a drawing of it, giving a specific way each would appear. Then explain how a contour drawing and a gesture drawing would be different for the same object.",
      scheme: [
        "Describes a specific use of line in the drawing",
        "Describes specific uses of two other elements, such as shape, value, texture or space",
        "Describes a fourth element used on purpose",
        "Explains the difference: contour is slow and careful along edges, gesture is quick and shows movement",
      ],
      model:
        "For a shoe, I would use a thick, firm line for the outer edge and thin lines for laces. The main shape of the sole would be an organic oval, with the toe as a rounded shape. I would show value by shading the inside of the shoe dark, and texture by short cross-hatching on the leather. A contour drawing follows every edge slowly and carefully, while a gesture drawing of the same shoe would be quick, loose lines showing how it tilts and its weight.",
      answers: [
        [
          "full",
          "[[0|For a shoe I'd use a thick, firm line for the outer edge and thin lines for the laces.]] [[1|The sole would be an organic oval shape, and the inside of the shoe would be shaded dark to show value.]] [[2|I'd show the texture of the leather with short cross-hatching, and leave the paper around the shoe as negative space.]] [[3|A contour drawing would follow each edge slowly and carefully, while a gesture drawing would be quick, loose lines showing how the shoe tilts and its weight.]]",
          "Full marks. Each element is placed in a specific part of the drawing.",
        ],
        [
          "full",
          "[[0|My plant would have curved, flowing lines for the stems and thinner, sharper lines for the leaf veins.]] [[1|The leaves are organic shapes, and I would darken the shadows under the leaves to give them value and make them look round.]] [[2|Rubbing the pencil sideways would show the rough texture of the pot, and the white around the plant would be negative space.]] [[3|A contour of the plant would take ten slow minutes on every edge; a gesture would take thirty seconds and show how the plant leans.]]",
          "Full marks. The contrast between the two drawing types is clear.",
        ],
        [
          "partial",
          "[[0|I'd use lines.]] [[3|A gesture drawing is quicker than a contour drawing.]] I'd use shape and color, though I only have a pencil. Texture is not part of art.",
          "Texture is an element of art. Give specific uses for at least four elements.",
        ],
        [
          "partial",
          "[[1|The mug would be a cylinder shape, shaded with darker value on one side.]] [[2|Texture on the handle.]] A contour drawing is quick and a gesture drawing is slow.",
          "It is the other way round: contour drawing is slow, gesture drawing is quick.",
          true,
        ],
        [
          "weak",
          "I'd just copy what I see. There is no need to plan the elements.",
          "Using elements on purpose makes a drawing stronger. Plan specific uses.",
        ],
        [
          "weak",
          "Elements of art are the periodic table's elements, like iron and oxygen.",
          "Elements of art are line, shape, color, value, texture, space and form.",
        ],
      ],
    },
    {
      prompt:
        "Using the theme \"home,\" describe how you would generate ideas for an artwork: your brainstorming, the thumbnails you would make, the visual research you would collect, and how you would choose one idea. Then explain what a blind contour drawing is and one benefit of practicing it.",
      scheme: [
        "Describes brainstorming with a word web and specific related words",
        "Describes making several thumbnail sketches without erasing",
        "Describes collecting visual research and choosing an idea with a reason",
        "Defines blind contour drawing and gives a benefit such as improved observation",
      ],
      model:
        "I would write \"home\" in the middle of a page and connect words such as porch, kitchen, dog and quilt. Then I would make six thumbnail sketches, each a different composition, without erasing. I would collect photos of my porch, a real quilt and look at paintings of interiors. I would choose the porch because it has the most interesting shapes and light. A blind contour drawing follows the edges of an object with a continuous line while looking only at the object; it trains me to observe closely.",
      answers: [
        [
          "full",
          "[[0|I'd write 'home' in the center and connect words like porch, kitchen, dog and quilt.]] [[1|Then I'd make six small thumbnail sketches of different compositions without erasing.]] [[2|I'd gather photos of my porch, a real quilt, and paintings of interiors, and choose the porch because it has the most interesting shapes and light.]] [[3|A blind contour drawing follows the edges of an object with one continuous line while I look only at the object, which trains me to observe more closely.]]",
          "Full marks. The process is complete and the choice is explained.",
        ],
        [
          "full",
          "[[0|My word web would include words like noise, warm, kitchen table and grandmother's chair.]] [[1|I'd draw eight thumbnails, each about the size of a stamp, trying a close-up, a wide view and a view from above.]] [[2|For research I'd photograph the table and look at how van Gogh painted his bedroom, then pick the close-up of the chair since it feels the most personal.]] [[3|A blind contour is drawing an object's edges without looking at the paper; it makes me slow down and really see.]]",
          "Full marks. Choosing the most personal idea gives the work meaning.",
        ],
        [
          "partial",
          "[[0|I'd brainstorm words like porch and kitchen.]] [[3|A blind contour is drawn without looking at the paper.]] I'd make one big drawing right away and erase it until perfect, with no research.",
          "Several small thumbnails and visual research give you better choices than one large drawing.",
        ],
        [
          "partial",
          "[[1|Six thumbnails without erasing.]] [[2|Research with photos.]] A blind contour is when you close your eyes completely and scribble.",
          "In a blind contour you look at the object, not the paper, and draw one slow, continuous line.",
          true,
        ],
        [
          "weak",
          "I'd wait for inspiration and not plan anything.",
          "Brainstorming and sketching help you find ideas deliberately.",
        ],
        [
          "weak",
          "Visual research is cheating, so I'd never look at another image.",
          "Artists collect references and examples. It is a normal, important step.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Making things look solid with value, and mixing colors",
  note: `
## Objectives

Students will be able to:

1. use value and shading to show form in a still-life drawing;
2. mix tints, shades and tones using a color wheel and use them in a painting.

## Materials

Pencils (2H, HB, 2B, 4B), blending stumps, still-life objects (a sphere, a cup, a pear), a lamp for a single light source, tempera or acrylic paint in primaries plus white and black, palettes, brushes, color wheel handouts, water cups, the worksheet.

## Starter (6 minutes)

Shine a lamp on a ball. Ask: "Where is it brightest? Where is it darkest? Is there any light on the dark side?" Collect observations.

## Main activity

1. Value: a scale from white to black, usually shown in 5 to 9 steps. Showing form: with one light source, a round form has a highlight (brightest spot), light areas, a midtone, a core shadow (darkest part of the form), reflected light (a little light bouncing back into the shadow on the lower edge), and a cast shadow on the surface. Shading techniques: hatching (parallel lines), cross-hatching (crossing lines), stippling (dots), blending (smooth). Tips: press lightly at first; work from light to dark; squint to see big values.
2. Color theory: primary colors (red, yellow, blue), secondary colors (orange, green, violet: mix two primaries), tertiary colors (a primary mixed with a neighboring secondary). Complementary colors sit opposite each other (red-green, blue-orange, yellow-violet) and make strong contrast; mixed together they produce a dull neutral. Analogous colors are neighbors (blue, blue-green, green).
3. Mixing: a tint is a color plus white; a shade is a color plus black; a tone is a color plus gray (or its complement). Add dark to light slowly: a little black darkens a lot. Painting task: mix a nine-step range of one color from tint to shade and use it in a small painting of the still-life.

## Worksheet

Value scale and color mixing recipes.
`,
  reading: [
    "Light, dark and the colors in between",
    `
How does a flat sheet of paper show a round apple? Mostly through **value**, the lightness or darkness of a color. Artists often draw a **value scale**, a strip of boxes that goes from white, through steps of gray, to black. Five to nine steps are enough for most drawings.

Place a ball under a single lamp, and you will see that its surface is not one tone. The **highlight** is the brightest spot, where the light strikes directly. Around it are **light** areas, then a **midtone**. Where the surface turns away from the light, the **core shadow** is the darkest part of the form. Beneath that, along the bottom edge, there is often a little **reflected light** that bounces back from the surface the ball is resting on; it is lighter than the core shadow, and it is what keeps the shape round instead of flat. On the table, the ball casts a **cast shadow** away from the light. By placing these values with care, you make a flat drawing look solid.

Use shading techniques to build the values. **Hatching** uses sets of parallel lines; **cross-hatching** layers lines in crossing directions to get darker tones; **stippling** uses dots; **blending** smooths the graphite with a stump or finger. Press **lightly** to begin, work from **light to dark**, and squint your eyes so that you see large masses of value rather than details.

Color has its own system. The **primary colors**, red, yellow and blue, cannot be made by mixing others. Mixing two primaries gives a **secondary color**: orange, green or violet. A primary mixed with a neighboring secondary gives a **tertiary color**, such as red-orange. On a **color wheel**, colors that sit opposite each other are **complementary**: red and green, blue and orange, yellow and violet. Placed side by side, complements make each other look brighter, but mixed together they make a dull neutral. **Analogous colors** sit next to one another, such as blue, blue-green and green, and make a calm harmony.

To change a color's value, mix. A **tint** is a color plus white; a **shade** is a color plus black; a **tone** is a color plus gray or a little of its complement. Always add the darker paint to the lighter one, and very slowly, since a little black will change the color a lot. A useful exercise is to mix a **nine-step range** of one hue, from the lightest tint to the darkest shade. You can then paint a small still life using only that one color's range, and see how value alone can describe form.
`,
  ],
  cards: [
    ["Highlight", "The brightest spot where light strikes directly."],
    ["Core shadow", "The darkest part of the form, away from the light."],
    ["Reflected light", "Light bouncing into the shadow side."],
    ["Cast shadow", "The shadow an object throws on a surface."],
    ["Cross-hatching", "Layered crossing lines used to build darker value."],
    ["Complementary colors", "Colors opposite each other on the color wheel."],
    ["Tint", "A color plus white."],
    ["Shade", "A color plus black."],
  ],
  closed: [
    [
      "Which pair of colors is complementary?",
      ["Red and green", "Red and orange", "Blue and green", "Yellow and orange"],
      "A",
    ],
    [
      "What do you add to a color to make a tint?",
      ["Black", "White", "Its neighbor", "Water only"],
      "B",
    ],
    [
      "Which part of a ball is usually the darkest on its surface?",
      ["Highlight", "Core shadow", "Midtone", "Reflected light"],
      "B",
    ],
    [
      "What is reflected light for?",
      ["It makes a form look round instead of flat", "It adds a highlight", "It removes shading", "It cancels shadows"],
      "A",
    ],
    [
      "Mixing blue and yellow makes:",
      ["Orange", "Green", "Violet", "Brown"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "You are shading a pear lit by one lamp from the upper left. Describe where each of these would appear and how you would draw it: highlight, midtone, core shadow, reflected light and cast shadow. Then name two shading techniques and say how each builds value.",
      scheme: [
        "Places the highlight on the upper left, near the light",
        "Describes the midtone and core shadow on the side turning away, with the core shadow darkest",
        "Places the reflected light along the lower edge and the cast shadow on the table to the lower right",
        "Names two shading techniques and explains how each builds value",
      ],
      model:
        "The highlight would be on the upper left where the light hits the pear most directly. The midtone is a medium gray beyond it, and the core shadow is the darkest band on the right side where the surface turns away. A little reflected light would appear along the lower edge, lighter than the core shadow, and the cast shadow would fall on the table to the lower right. I would build values by cross-hatching, layering crossing lines to get darker, and blending with a stump for smooth transitions.",
      answers: [
        [
          "full",
          "[[0|The highlight is on the upper left of the pear, where the lamp hits it most directly.]] [[1|The midtone is a medium gray next to it, and the core shadow is the darkest band on the right where the surface turns away.]] [[2|A little reflected light sits along the lower edge, lighter than the core shadow, and the cast shadow falls on the table toward the lower right.]] [[3|I'd build the values with cross-hatching, adding more layers to get darker, and blend with a stump for smooth transitions.]]",
          "Full marks. Every part is placed in relation to the light.",
        ],
        [
          "full",
          "[[0|Since the light is at the upper left, I'd leave a small spot of white paper there for the highlight.]] [[1|Moving right, it gets to a midtone, then to the core shadow, the darkest part, near the right edge.]] [[2|Below the core shadow I'd lighten a thin strip for reflected light, and add a cast shadow stretching right onto the table.]] [[3|I'd use hatching with close lines for darker areas and stippling for a soft, speckled look, pressing lightly at first.]]",
          "Full marks. Leaving the paper white for the highlight is a good habit.",
        ],
        [
          "partial",
          "[[0|The highlight is the brightest spot at the upper left.]] [[3|I'd use cross-hatching.]] The core shadow is the lightest part, and there is no shadow on the table.",
          "The core shadow is the darkest part of the form, and an object casts a shadow on its surface.",
        ],
        [
          "partial",
          "[[1|There's a midtone and a core shadow.]] [[2|There is reflected light at the bottom.]] The highlight is on the side away from the lamp.",
          "The highlight is on the side facing the light, which is the upper left.",
          true,
        ],
        [
          "weak",
          "I'd just color the pear gray with no changes. Shading isn't needed.",
          "Changes in value make the pear look round.",
        ],
        [
          "weak",
          "The cast shadow is a shadow inside the pear, like the core shadow.",
          "A cast shadow falls on the surface, away from the object.",
        ],
      ],
    },
    {
      prompt:
        "You have red, yellow, blue, white and black paint. Explain how to mix: (a) orange, (b) a tint of green, (c) a shade of violet, and (d) a tone of blue. Then name a complementary pair you could use to make a still life look lively, and a pair of analogous colors to make a calm one, and explain what happens if you mix a complementary pair together.",
      scheme: [
        "Explains how to mix orange from red and yellow and a tint of green from blue, yellow and white",
        "Explains how to mix a shade of violet and a tone of blue (using black or gray, or a bit of orange)",
        "Names a complementary pair and an analogous pair correctly and links them to lively or calm effects",
        "Explains that mixing complements gives a dull neutral",
      ],
      model:
        "Orange is red plus yellow. A tint of green is blue plus yellow, with white added. A shade of violet is red plus blue, then a little black added. A tone of blue is blue with a little gray, or with a touch of orange. For a lively still life I could use blue and orange, which are complements and make each other brighter. For a calm one I could use blue and green, which are neighbors. Mixing complements together makes a dull neutral, like brown or gray.",
      answers: [
        [
          "full",
          "[[0|Orange is red plus yellow. A tint of green is blue plus yellow, then white added.]] [[1|A shade of violet is red plus blue with a little black, and a tone of blue is blue with a bit of gray or a touch of orange.]] [[2|Blue and orange are complements and make a lively contrast; blue and green are analogous neighbors and make a calm harmony.]] [[3|Mixing complements together makes a dull neutral like brown or gray.]]",
          "Full marks. All four recipes and the color relationships are right.",
        ],
        [
          "full",
          "[[0|I'd mix red and yellow for orange, and make light green by mixing blue and yellow and adding white.]] [[1|For a shade of violet I'd mix red and blue and add a little black; for a tone of blue I'd add a speck of orange, its complement.]] [[2|Red and green would make a lively pair, and yellow with orange would make a calm, warm pair.]] [[3|If I mix complements, they cancel each other's brightness and turn muddy brown or gray.]]",
          "Full marks. Using orange to tone blue is a painter's trick.",
        ],
        [
          "partial",
          "[[0|Orange is red plus yellow.]] [[3|Mixing complements makes a neutral.]] A tint is a color plus black and a shade is a color plus white.",
          "A tint is a color plus white; a shade is a color plus black.",
        ],
        [
          "partial",
          "[[1|Violet shade with black.]] [[2|Blue and orange are complements.]] Mixing complements makes an extra bright color.",
          "Mixing complements gives a dull neutral, not a brighter color.",
          true,
        ],
        [
          "weak",
          "You cannot mix colors. You must buy each color separately.",
          "Mixing primaries makes secondary colors, and white and black change value.",
        ],
        [
          "weak",
          "Orange is blue plus yellow, and green is red plus yellow.",
          "Orange is red plus yellow; green is blue plus yellow.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Principles of design, and trying printmaking and clay safely",
  note: `
## Objectives

Students will be able to:

1. apply the principles of design, such as balance, contrast and emphasis, to a composition;
2. create a work in a new medium, such as printmaking or clay, following safe procedures.

## Materials

Paper and pencils, cut paper for composition studies, soft-cut printing blocks and linoleum cutters with bench hooks, water-based block-printing ink, brayers, clay (low-fire), slip, scoring tools, water cups, aprons, safety handouts, the worksheet.

## Starter (6 minutes)

Show two posters, one crowded and chaotic and one clear with a focus. Ask: "Which pulls your eye first? Why?" Introduce emphasis.

## Main activity

1. Principles of design (how the elements are arranged): balance (symmetrical, asymmetrical, radial), contrast (differences in value, color, size, texture), emphasis (a focal point that catches the eye first), movement (the path the eye follows), pattern and repetition, rhythm, proportion/scale and unity (the feeling that everything belongs together). Rule of thirds: divide a rectangle into three parts across and down; place the focal point near an intersection. Try three cut-paper compositions of the same shapes.
2. Relief printmaking: carve a design in a soft block; the raised surface prints, the carved part stays white; the print is a mirror image, so text must be reversed. Process: draw, transfer, carve, ink with a brayer (thin, even layer), print by pressing paper, pull the print, repeat. Edition numbering (for example 3/10). Safety: always cut away from your body and hands; use a bench hook; keep the free hand behind the tool; one tool at a time; clean up ink with water at the sink.
3. Clay: pinch, coil and slab methods. Wedge clay to remove air bubbles. Join pieces by scoring both surfaces, applying slip (clay and water) and pressing together. Keep thickness even, about a half inch, and hollow thick pieces so they do not explode in the kiln. Dry slowly. Greenware is fired once (bisque) and again with glaze. Safety: wet-clean, not sweep dust; wash hands; do not eat or drink in the studio.

## Worksheet

Compose, carve and build safely.
`,
  reading: [
    "Arranging a picture so it works, and trying new materials",
    `
If the elements of art are the ingredients, the **principles of design** are the recipe: the ways in which an artist arranges those ingredients so that the whole thing works.

**Balance** is a feeling that the weights in an artwork are evenly distributed. **Symmetrical** balance is a mirror image on either side of the center; **asymmetrical** balance uses different elements that still feel equal, such as a large dark shape on one side and several small light shapes on the other; **radial** balance spreads from a center like the spokes of a wheel. **Contrast** is a difference between elements: light against dark, rough against smooth, large against small, or a warm color against a cool one. Contrast makes things stand out. **Emphasis** is a **focal point**, the place where the eye lands first. Artists create emphasis with the strongest contrast, the biggest shape or the brightest color. **Movement** is the path that the eye follows through the work, often along lines. **Pattern** and **repetition** use repeated elements, and **rhythm** is the beat they create. **Proportion** or scale compares the sizes of parts, and **unity** is the feeling that everything belongs together. The **rule of thirds** can help: divide the rectangle into thirds across and down and place the focal point near one of the intersections rather than in the exact center. To experiment, cut several shapes from paper and arrange them in three different compositions, then ask which has the most effective emphasis.

New materials teach new thinking. In **relief printmaking**, you carve a design into a soft block. The raised parts, the ones you do not carve away, will take ink and print; the carved parts stay white. Because the print is a **mirror image**, any lettering must be carved backward. Roll a thin, even layer of ink on the block with a **brayer**, lay paper on it, press, and **pull** the print. Repeat to make an **edition**, numbered like 3/10, meaning the third print of ten. Keep safety first: always cut **away** from your body and your hands, use a **bench hook** to hold the block, keep your free hand behind the tool and use one tool at a time.

With **clay**, there are three basic hand-building methods: **pinch** pots, **coils** of rolled clay, and **slabs** rolled flat. Knead (**wedge**) the clay first to remove air bubbles, which can make the piece explode in the kiln. To join two pieces, **score** (scratch) both surfaces, brush on **slip** (clay thinned with water) and press them together. Keep the walls about a half inch thick and hollow out any thick parts, and let your piece dry slowly. The first firing, called **bisque**, hardens the clay; glaze is then applied and the piece is fired again. In the studio, clean up with a wet sponge instead of sweeping, because dry clay dust is harmful to breathe, wash your hands, and never eat or drink in the studio.
`,
  ],
  cards: [
    ["Balance", "An even distribution of visual weight."],
    ["Contrast", "A difference between elements that makes them stand out."],
    ["Emphasis", "A focal point that catches the eye first."],
    ["Rule of thirds", "Dividing a rectangle into thirds to place the focal point."],
    ["Relief print", "A print made from the raised surface of a carved block."],
    ["Brayer", "A roller used to spread ink."],
    ["Score and slip", "Scratch both clay surfaces and join with clay-water paste."],
    ["Bisque", "The first firing of clay."],
  ],
  closed: [
    [
      "Which principle of design is a focal point that catches the eye first?",
      ["Pattern", "Emphasis", "Balance", "Rhythm"],
      "B",
    ],
    [
      "In a relief print, which parts of the block print?",
      ["The carved-away parts", "The raised parts that are not carved", "Nothing", "Only the edges"],
      "B",
    ],
    [
      "Why wedge clay?",
      ["To remove air bubbles", "To make it wet", "To color it", "To make it heavy"],
      "A",
    ],
    [
      "What is the safest direction to cut when carving a block?",
      ["Toward your hand", "Toward your body", "Away from your body and hands", "Straight up"],
      "C",
    ],
    [
      "A print numbered 3/10 is:",
      ["The third print in an edition of ten", "Three prints of ten blocks", "Thirty percent finished", "Ten prints of three"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "You are designing a poster with a large dark circle, three small light triangles and a thin line. Explain how you would use balance, contrast and emphasis to arrange them: where would you place the shapes, what kind of balance would you create, what would be the focal point and why. Use the rule of thirds.",
      scheme: [
        "Chooses a kind of balance (such as asymmetrical) and places the shapes accordingly",
        "Uses contrast between the dark and light shapes or sizes",
        "Identifies the focal point (such as the large dark circle) and says why it draws the eye",
        "Uses the rule of thirds by placing the focal point near an intersection",
      ],
      model:
        "I would use asymmetrical balance: the large dark circle on the left third balanced by the three small light triangles spread on the right. Contrast of dark against light and large against small makes each shape stand out. The focal point is the dark circle because it is the largest and darkest, and I would place it near the left upper intersection of the rule of thirds. The thin line would lead the eye from the circle across to the triangles.",
      answers: [
        [
          "full",
          "[[0|I'd use asymmetrical balance, with the large dark circle on the left and the three small light triangles spread over the right.]] [[1|The dark against light and large against small give contrast, so each shape stands out.]] [[2|The focal point would be the circle since it's the largest and darkest.]] [[3|By the rule of thirds, I'd put it near the upper left intersection, and use the thin line to lead the eye toward the triangles.]]",
          "Full marks. The arrangement and the reasons all fit together.",
        ],
        [
          "full",
          "[[0|The balance would be asymmetrical: one heavy circle on one side is balanced by three light triangles spaced out on the other.]] [[1|Dark and light create a strong contrast, and the difference in size adds more.]] [[2|The circle is the emphasis, because the eye goes to the biggest, darkest shape first.]] [[3|I'd place it a third of the way across and down, near an intersection, and curve the line from it to the triangles to create movement.]]",
          "Full marks. The line creating movement shows the principles working together.",
        ],
        [
          "partial",
          "[[0|I'd put the circle in the middle.]] [[1|Light and dark make contrast.]] The thin line is the focal point because it is the longest, and the rule of thirds says to center everything.",
          "The rule of thirds suggests placing the focal point near an intersection, not the exact center.",
        ],
        [
          "partial",
          "[[2|The circle is the focal point.]] [[3|Use the upper left intersection.]] Balance means that all shapes must be the same size.",
          "Asymmetrical balance can use different sizes that still feel equal.",
          true,
        ],
        [
          "weak",
          "I'd scatter the shapes randomly everywhere. A plan is not needed.",
          "Arranging shapes on purpose makes a stronger composition.",
        ],
        [
          "weak",
          "The principles of design are the rules of a school and have nothing to do with pictures.",
          "The principles of design describe how artists arrange the elements.",
        ],
      ],
    },
    {
      prompt:
        "Describe how to make a safe, successful relief print and a joined clay piece. For the print: the steps and two safety rules, and why lettering must be carved backward. For the clay: why wedge, how to join two pieces, why thickness matters, and two studio safety rules.",
      scheme: [
        "Describes steps for the relief print (draw, carve, ink with a brayer, print) and why lettering is reversed",
        "Gives two safety rules for carving (cut away from the body, use a bench hook)",
        "Explains wedging, scoring and slip, and even thickness",
        "Gives two clay studio safety rules (wet cleaning, no eating and drinking, wash hands)",
      ],
      model:
        "For a print I draw my design, carve away the areas that should stay white, roll a thin layer of ink with a brayer, and press paper on the block. The print is a mirror image, so lettering must be carved backward. I always cut away from my body and hands and use a bench hook. For clay, I wedge it to remove air bubbles, join pieces by scoring both surfaces and adding slip, and keep walls even at about half an inch so that they dry and fire without cracking or exploding. I clean up with a wet sponge instead of sweeping, and never eat or drink in the studio.",
      answers: [
        [
          "full",
          "[[0|For a print I draw the design, carve away the parts that should stay white, roll a thin layer of ink with a brayer and press paper onto the block; lettering has to be carved backward because the print is a mirror image.]] [[1|I cut away from my body and hands and use a bench hook.]] [[2|For clay, I wedge it to remove air bubbles, join pieces by scoring and adding slip, and keep walls an even half inch so they dry and fire without cracking.]] [[3|In the studio I clean with a wet sponge instead of sweeping and never eat or drink.]]",
          "Full marks. All the steps and four safety points are covered.",
        ],
        [
          "full",
          "[[0|The print process is draw, transfer, carve, ink with a brayer, and press the paper; the block flips the image so words must be reversed on the block.]] [[1|My safety rules are to keep the free hand behind the tool and always carve away from myself.]] [[2|With clay I wedge first, score and slip the join, and hollow out thick areas so air can't trap and burst the piece in the kiln.]] [[3|I wash my hands after, and wipe the tables wet since dry clay dust is bad to breathe.]]",
          "Full marks. Hollowing thick parts is an important kiln-safety detail.",
        ],
        [
          "partial",
          "[[0|Carve the block and press it on paper.]] [[3|Wash your hands.]] Cut toward your hand to be more precise, and pieces are joined by only pressing, with no scoring.",
          "Always cut away from your hands, and score and slip the surfaces to join clay.",
        ],
        [
          "partial",
          "[[1|Cut away from the body.]] [[2|Wedge the clay.]] Letters on a print will come out the right way, so carve them normally.",
          "A relief print is a mirror image, so letters must be carved backward.",
          true,
        ],
        [
          "weak",
          "Safety rules are not needed for art. Nobody ever gets hurt.",
          "Carving tools are sharp and clay dust is harmful, so safety rules matter.",
        ],
        [
          "weak",
          "Clay can be any thickness, and air bubbles help it dry faster.",
          "Thick clay and air bubbles can make pieces crack or explode in the kiln.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Sketchbook habits, reflecting on growth, and revising after feedback",
  note: `
## Objectives

Students will be able to:

1. keep a sketchbook of daily drawings and reflect on your growth;
2. revise a work after feedback and explain the changes you made.

## Materials

Sketchbooks, pencils and pens, a sketchbook prompt list, sticky notes for feedback, a feedback form, a work in progress from earlier weeks, the worksheet.

## Starter (6 minutes)

Hold up two drawings of the same object drawn a month apart (teacher sample). Ask: "What changed? How can you tell?" Discuss what practice does.

## Main activity

1. Sketchbook habits: draw something every day (even five minutes); mix observation, imagination and experiments; date each page; draw from life (your hand, a shoe, a view from a window); try prompts; do not tear out "bad" pages; include notes about what you tried and learned. Twenty drawings in a month is progress you can see.
2. Reflecting on growth: compare an early and a late drawing; name what is stronger (proportions, shading, line quality); name what is still hard; set a next goal. Use a short reflection pattern: What I did, what changed, what I'll try next.
3. Feedback and revision: ask for specific feedback ("Where does your eye go first?"); receive it without arguing; sort feedback into useful now, later and not for this piece; decide on two or three changes; make the changes; compare before and after; explain what you changed and why. Revising is a normal part of an artist's process, not a sign of failure.
4. Critique habit: describe what you see, ask what the artist intended, suggest kindly.

## Worksheet

Reflect on two sketchbook pages and plan a revision.
`,
  reading: [
    "Practicing every day, and making the work better",
    `
Artists get better in the same way that athletes and musicians do: by regular practice. The simplest tool for that is the **sketchbook**. A sketchbook is not a place for finished masterpieces; it is a place to practice seeing, to try ideas, and to make mistakes without worry. A good habit is to draw something **every day**, even for just five minutes. Mix **observation** (your hand, a shoe, the view from a window), **imagination** (a creature, a made-up place) and **experiments** (a new tool, a different style). Write the **date** on each page and add short notes about what you tried and what you learned. Do not tear out "bad" pages; they show how far you have come. If you draw twenty times in a month, you will see a difference. If you are stuck, use a prompt: "draw your breakfast," "draw the shoes of three people," "draw something in your bag."

To see progress, you must **reflect**. Choose an early page and a late page of your sketchbook and compare them. What is stronger now? Perhaps your **proportions** are better, your **shading** makes objects look rounder, or your **lines** are more confident. What is still hard? Perhaps hands, or perspective. Then set a **next goal**. A simple reflection pattern is: *What I did. What changed. What I will try next.* Writing it down turns a vague feeling of improvement into evidence.

Improving a finished piece involves **feedback** and **revision**. Feedback is information from other people about how they experience your work. Ask for **specific** feedback, not just "Is it good?" Questions like "Where does your eye go first?" or "What do you think is happening here?" show whether your work does what you want. Listen without arguing, and take notes. Then **sort** the comments: which are useful now, which could be useful later, and which don't suit this piece. Decide on **two or three changes** to make; trying to fix everything often makes a work worse. Make the changes, then compare the **before** and **after**. Finally, explain in a sentence or two what you changed and why: "My classmate said the eye went to the corner, so I darkened the center and softened the edge." Revising is a normal part of an artist's process. Professional artists make many versions of a piece before they are satisfied, and learning to improve your work is as important as the first attempt.
`,
  ],
  cards: [
    ["Sketchbook", "A book for practicing drawing and trying ideas."],
    ["Observation", "Drawing from real things you can see."],
    ["Reflection", "Thinking about what you did and what changed."],
    ["Feedback", "Information from others about your work."],
    ["Specific feedback", "Comments about particular parts of the work."],
    ["Revision", "Making changes to improve a work."],
    ["Before and after", "Comparing a work with its earlier version."],
    ["Next goal", "A skill you plan to improve next."],
  ],
  closed: [
    [
      "What is the main purpose of a sketchbook?",
      ["To practice and try ideas", "To display finished art", "To avoid drawing", "To impress others"],
      "A",
    ],
    [
      "Which question asks for specific feedback?",
      ["Is it good?", "Where does your eye go first?", "Do you like me?", "Is it done?"],
      "B",
    ],
    [
      "How many changes is it wise to make in one revision?",
      ["Everything", "Two or three", "None", "One hundred"],
      "B",
    ],
    [
      "Why date each sketchbook page?",
      ["To see your growth over time", "To hide it", "To lose it", "To sell it"],
      "A",
    ],
    [
      "Revising a work is:",
      ["A normal part of an artist's process", "A sign of failure", "Not allowed", "Only for beginners"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Compare a drawing from the start of the term with one from week four. Imagine the early one has stiff lines and flat shading, and the later one has smoother lines and clear value changes. Write a short reflection using the pattern: what I did, what changed, what I will try next. Name two things that are stronger, one thing that is still hard, and a next goal with a specific practice plan.",
      scheme: [
        "Describes what the student did with specific detail",
        "Names two specific strengths in the later drawing",
        "Names one thing that is still difficult",
        "Sets a next goal with a specific practice plan",
      ],
      model:
        "What I did: I drew the same shoe on the first day and again in week four. What changed: my lines are smoother and more confident, and my shading now has clear light and dark values so the shoe looks round. What is still hard: getting the proportions of the laces right. Next I will practice drawing laces for five minutes each day in my sketchbook and compare after two weeks.",
      answers: [
        [
          "full",
          "[[0|What I did: I drew the same shoe on the first day and again in week four.]] [[1|What changed: my lines are smoother and more confident, and my shading has clear light and dark values so the shoe looks round.]] [[2|Something still hard is getting the proportions of the laces right.]] [[3|Next I'll draw laces for five minutes each day in my sketchbook and compare after two weeks.]]",
          "Full marks. A specific reflection with a measurable plan.",
        ],
        [
          "full",
          "[[0|At the start I drew my mug with stiff outlines and no shadow; in week four I drew it again.]] [[1|Now I vary my line thickness and I use a range from light to dark, so the mug has form.]] [[2|The ellipse at the top of the mug is still hard to get even.]] [[3|My goal is to fill one sketchbook page with ellipses three days a week, then redraw the mug at the end of the month.]]",
          "Full marks. Practicing the ellipse directly targets the difficulty.",
        ],
        [
          "partial",
          "[[0|I drew a shoe twice.]] [[3|Next I will get better.]] Nothing changed and nothing is hard.",
          "A reflection names real changes and a real challenge. Compare the two drawings carefully.",
        ],
        [
          "partial",
          "[[1|My lines are smoother and my shading shows light and dark.]] [[2|Proportions are hard.]] My next goal is to be perfect.",
          "A goal should be specific, with a practice plan.",
          true,
        ],
        [
          "weak",
          "I do not need to reflect. I can just see that it's better.",
          "Writing down changes turns a feeling into evidence.",
        ],
        [
          "weak",
          "My early drawing was terrible so I threw it away.",
          "Keep early work. It shows your growth.",
        ],
      ],
    },
    {
      prompt:
        "A classmate says about your still-life painting: \"The eye goes to the corner, the colors feel muddy, and the shadow is too light.\" Describe how you would sort this feedback, choose two or three changes, carry them out (say what you would do), and write a sentence explaining your revision. Then say how you would respond to the feedback in the moment.",
      scheme: [
        "Describes sorting the feedback and choosing two or three changes",
        "Describes specific changes for at least two of the comments (for example, darken the center and soften the corner; keep colors clean; darken the shadow)",
        "Writes a sentence explaining the revision with the reason",
        "Describes responding to feedback calmly by listening and thanking, not arguing",
      ],
      model:
        "I would listen and take notes without arguing, and thank my classmate. I would sort the comments and choose all three because they affect the main idea. I would darken and sharpen the center to pull the eye in and soften the corner, keep my colors clean by rinsing the brush and mixing fewer colors, and deepen the shadow. My explanation: \"My classmate said the eye went to the corner, so I darkened the center, softened the edge, and deepened the shadow so the objects feel solid.\"",
      answers: [
        [
          "full",
          "[[0|I'd listen, take notes and thank my classmate, then sort the comments and choose all three because they affect the main focus.]] [[1|I'd darken and sharpen the center and soften the corner, keep colors clean by rinsing the brush and mixing fewer colors, and deepen the shadow.]] [[2|My explanation: 'My classmate said the eye went to the corner, so I darkened the center, softened the edge and deepened the shadow so the objects feel solid.']] [[3|In the moment I wouldn't argue; I'd ask questions like 'Where does your eye go next?']]",
          "Full marks. The sorting, the changes and the explanation are specific.",
        ],
        [
          "full",
          "[[0|I'd sort the feedback into do now and do later, and decide that the corner and the shadow are the two most important changes.]] [[1|I'd tone down the bright corner with a glaze of the background color and darken the shadow with a mix of blue and brown.]] [[2|I'd write: 'Because the eye went to the corner, I toned it down and strengthened the shadow to push attention to the pears.']] [[3|I'd say thank you and take notes, not defend my choices.]]",
          "Full marks. Choosing the two most important changes is good judgment.",
        ],
        [
          "partial",
          "[[0|I'd listen to them.]] [[3|I'd say thanks.]] I would change everything at once, and not compare it with the original.",
          "Choose two or three changes, and compare before and after.",
        ],
        [
          "partial",
          "[[1|I'd darken the shadow.]] [[2|I'd explain the changes in a sentence.]] I'd tell them they are wrong because it's my painting.",
          "Arguing blocks learning. Listen first and then decide.",
          true,
        ],
        [
          "weak",
          "I would ignore all feedback because it's my art and no one else counts.",
          "Feedback shows how others experience the work and can improve it.",
        ],
        [
          "weak",
          "I'd start a new painting and never fix this one.",
          "Revising a work is a normal and valuable process.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Presenting work, talking in a critique, and documenting it",
  note: `
## Objectives

Students will be able to:

1. prepare a finished work for display with a title, label and presentation;
2. take part in a class critique by describing, analyzing and offering feedback on a peer's work;
3. document your artwork with photographs and an artist statement.

## Materials

Finished two-dimensional works, mat board and a mat cutter (teacher), rulers, label templates, a critique protocol chart, cameras or tablets, a white or gray backdrop, an artist statement guide, the quiz.

## Starter (6 minutes)

Display one drawing taped crooked on a wall and another matted and labeled. Ask: "Which looks like finished work? What is different?"

## Main activity

1. Presenting: clean the work (erase smudges); choose a title that adds meaning; make a label with the artist's name, title, medium, date and year or grade level; mount or mat. A mat is a border: an 8 by 10 inch artwork with a 2 inch mat on every side needs an outer size of (8 + 4) by (10 + 4) = 12 by 14 inches. Hang at eye level; keep spacing consistent; protect work from damage.
2. Critique (a four-step method): describe (what do you see? no opinions); analyze (how are the elements and principles used?); interpret (what is the work about? what mood or idea?); evaluate (how well does it work, and why?). Give feedback that is specific, kind and helpful: use "I see..., I wonder..., I suggest..." or praise-question-suggestion. Artists listen without defending, then ask questions.
3. Documenting: photograph work in even natural light (near a window, not direct sun), straight on, with the camera parallel to the work, no glare or shadows, fill the frame, include a neutral background, take several shots, and label files. Write an artist statement (3 to 6 sentences): what you made, how (materials, process), why (idea or inspiration), what you want viewers to notice.

## Quiz

Presenting, critique steps, documentation.
`,
  reading: [
    "Showing work with care, talking about it, and recording it",
    `
Finishing a work is not just making the last mark. How you **present** it affects how viewers see it. Begin by cleaning up: erase stray smudges, trim loose edges and check for any damage. Choose a **title** that adds meaning rather than saying "Untitled" or "Drawing 1." Next, make a **label**: the artist's name, the title, the **medium** (such as "graphite on paper" or "linocut on paper"), the date, and often the grade or course. Then **mount** or **mat** the work. A mat is a border of board that frames the artwork and gives the eye a place to rest. If your artwork is 8 inches by 10 inches and you want a 2-inch mat on all sides, add 2 inches on each side of both dimensions: 8 + 2 + 2 = 12 and 10 + 2 + 2 = 14, so the outside size is 12 by 14 inches. When you hang a group of works, put them at **eye level**, keep the spaces between them consistent, and align edges.

A **critique** is a structured conversation about art that helps the artist and the viewers learn. A four-step method is helpful. First, **describe**: what do you see? Stick to facts, such as "a red chair in the left foreground" with no opinions. Second, **analyze**: how are the elements and principles of design used? "The dark background contrasts with the light chair." Third, **interpret**: what is the work about, and what mood or idea does it express? "It feels lonely to me because the chair is small and alone." Fourth, **evaluate**: how well does the work achieve its aim, and why? Good feedback is **specific, kind and helpful**. Try "I see..., I wonder..., I suggest..." or praise-question-suggestion. If your own work is being discussed, **listen** without defending it, take notes, and ask questions of the group.

Finally, **document** your work. A good photograph of a flat artwork is taken in even, natural light, such as near a window but not in direct sun, which can cause glare. Hold the camera **straight on**, parallel to the work, so that the edges do not slant. Fill the frame, use a plain background, take several shots and choose the best. Label the files with your name, title and date. An **artist statement** is a short piece of writing, three to six sentences, that tells the viewer **what** you made, **how** you made it (materials and process), **why** (the idea or inspiration) and what you hope viewers will **notice**. Write in your own voice, without complicated jargon. Together, a clear photograph and a statement form a record that you can add to a portfolio for college, scholarships or a job.
`,
  ],
  cards: [
    ["Medium", "The material used to make a work, such as graphite or clay."],
    ["Label", "A card giving the artist, title, medium and date."],
    ["Mat", "A board border around an artwork."],
    ["Critique", "A structured conversation about a work of art."],
    ["Describe", "State what you see, without opinions."],
    ["Interpret", "Say what the work means or expresses."],
    ["Artist statement", "A short text by the artist about the work."],
    ["Portfolio", "A collection of an artist's best work."],
  ],
  closed: [
    [
      "A 8 by 10 inch artwork has a 2 inch mat on every side. What is the outside size?",
      ["10 by 12", "12 by 14", "8 by 10", "16 by 20"],
      "B",
    ],
    [
      "Which critique step states only facts about what you see?",
      ["Describe", "Evaluate", "Interpret", "Suggest"],
      "A",
    ],
    [
      "Where should the camera be when photographing a flat artwork?",
      ["Straight on, parallel to the work", "At a steep angle", "Under the work", "Behind it"],
      "A",
    ],
    [
      "Which lighting is best for photographing artwork?",
      ["Even natural light without glare", "A flash straight on", "Direct sun on glossy paper", "Total darkness"],
      "A",
    ],
    [
      "What does an artist statement include?",
      ["What, how and why the work was made", "Only the price", "A list of friends", "A grade"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Use the four steps of critique (describe, analyze, interpret, evaluate) to discuss a classmate's still-life painting of three pears on a table, with a dark background and light falling from the left. Write one sentence for each step, and then rewrite the evaluation as kind, specific feedback using praise, question and suggestion.",
      scheme: [
        "Writes a factual description with no opinions",
        "Writes an analysis that names elements or principles (such as value contrast, emphasis)",
        "Writes an interpretation about mood or meaning",
        "Writes an evaluation and rewrites it as praise, question and suggestion",
      ],
      model:
        "Describe: three pears sit on a table against a dark background, with light coming from the left. Analyze: the strong contrast between the light pears and the dark background makes the pears the focal point. Interpret: the dark space and single light gives a quiet, calm mood. Evaluate: the painting works well because the eye goes to the pears. As feedback: \"The contrast makes the pears stand out. What time of day did you imagine? You could try adding a cast shadow to ground them on the table.\"",
      answers: [
        [
          "full",
          "[[0|Describe: three pears sit on a table against a dark background, with light coming from the left.]] [[1|Analyze: the strong value contrast between the light pears and the dark background makes the pears the focal point.]] [[2|Interpret: the dark space and single light give a quiet, calm mood.]] [[3|Feedback: 'The contrast makes the pears stand out. What time of day did you imagine? Try adding a cast shadow to ground them on the table.']]",
          "Full marks. Each step is separate and the feedback is kind and specific.",
        ],
        [
          "full",
          "[[0|I see three pears in a row on a flat table and a dark wall behind, lit from the left.]] [[1|The artist uses contrast of light and dark and puts the biggest pear near the middle for emphasis.]] [[2|It feels still and quiet, like a room in the evening.]] [[3|I'd say, 'I like the light on the biggest pear. I wonder what the shadows on the right might add. I suggest deepening them to make the forms rounder.']]",
          "Full marks. 'I like, I wonder, I suggest' is a handy pattern.",
        ],
        [
          "partial",
          "[[0|There are three pears.]] [[2|It feels calm.]] It is good, and I like it because I like fruit. That is all the feedback needed.",
          "Feedback should be specific: name an element or principle and give a suggestion.",
        ],
        [
          "partial",
          "[[1|The contrast makes the pears the focal point.]] [[3|Try adding a cast shadow.]] The painting is boring and the artist has no talent.",
          "Critique should be kind and focus on the work, not on the artist's talent.",
          true,
        ],
        [
          "weak",
          "I will say the painting is bad. A critique is just for pointing out faults.",
          "A critique describes, analyzes, interprets and evaluates, with kind suggestions.",
        ],
        [
          "weak",
          "I do not need to look carefully; I'll just say 'nice.'",
          "Careful looking is the first step of a critique.",
        ],
      ],
    },
    {
      prompt:
        "Prepare your finished 9 by 12 inch drawing for display and recording. Calculate the outside size of a mat with a 2.5 inch border on all sides. Write a complete label (all five parts), explain how you would photograph it, and write a three-to-five-sentence artist statement for a drawing of your grandmother's hands.",
      scheme: [
        "Calculates the outside size as 14 by 17 inches",
        "Writes a label with name, title, medium, date and course or grade",
        "Explains how to photograph it (even light, straight on, no glare)",
        "Writes a statement that tells what, how, why and what to notice",
      ],
      model:
        "A 9 by 12 inch drawing with a 2.5 inch mat on each side has an outside size of (9 + 5) by (12 + 5), which is 14 by 17 inches. Label: Maria Lopez, \"Her Hands,\" graphite on paper, October 2026, Art I. I would photograph it near a window in even light, with the camera straight on to avoid slanted edges and no flash to avoid glare. Statement: \"This drawing shows my grandmother's hands. I used soft graphite and cross-hatching to show her wrinkles. I made it because her hands have done so much for our family. I hope viewers notice the care in each line.\"",
      answers: [
        [
          "full",
          "[[0|The mat makes it (9 + 5) by (12 + 5), so the outside size is 14 by 17 inches.]] [[1|Label: Maria Lopez, 'Her Hands,' graphite on paper, October 2026, Art I.]] [[2|I'd photograph it near a window in even light with the camera straight on and no flash.]] [[3|Statement: 'This drawing shows my grandmother's hands. I used soft graphite and cross-hatching to show her wrinkles because her hands have done so much for our family. I hope viewers notice the care in each line.']]",
          "Full marks. The size is correct and the statement has what, how and why.",
        ],
        [
          "full",
          "[[0|2.5 inches on each side adds 5 inches to each dimension, giving 14 by 17.]] [[1|The label has my name, the title 'Grandma's Hands,' the medium (charcoal on paper), the date and my course.]] [[2|I'd shoot it straight on in soft window light without direct sun, filling the frame.]] [[3|My statement: 'I drew my grandmother's hands in charcoal to show how work shapes a life. I smudged the background so the hands stand out. I want viewers to notice the lines on her knuckles.']]",
          "Full marks. The statement connects the idea and the process.",
        ],
        [
          "partial",
          "[[0|The outside size is 9 by 12 plus 2.5, so 11.5 by 14.5.]] [[2|Photograph it near a window.]] The label is just my name. The statement is 'I like it.'",
          "Add the border to both sides: 5 inches to each dimension. The label has five parts.",
        ],
        [
          "partial",
          "[[1|Label: name, title, medium, date and course.]] [[3|The statement says what, how and why.]] The outside size is 9 × 12 × 2.5.",
          "A mat adds the border to each side: 9 plus 5 by 12 plus 5, which is 14 by 17.",
          true,
        ],
        [
          "weak",
          "Presentation does not matter. I'd tape it to the wall as it is.",
          "Clean presentation helps viewers see the work as finished.",
        ],
        [
          "weak",
          "I'd take the photo at an angle with a flash so that it shines.",
          "A flash and an angle cause glare and slanted edges. Shoot straight on in even light.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Looking closely at artists: Van Gogh, Seurat and Jacob Lawrence",
  note: `
## Objectives

Students will be able to:

1. describe, analyze, interpret and evaluate a work by a historical or contemporary artist;
2. compare the style of two artists and explain what makes each distinctive.

## Materials

Large reproductions or projected images of Vincent van Gogh's The Starry Night (1889), Georges Seurat's A Sunday on La Grande Jatte (1884 to 1886) and a panel from Jacob Lawrence's The Migration Series (1940 to 1941); a comparison chart; the problem set.

## Starter (6 minutes)

Show The Starry Night for 30 seconds. Ask: "What do you see? Where does your eye go? What mood does it create?" Collect responses before giving any background.

## Main activity

1. Four steps for a single work (Starry Night): describe (a night sky with swirling blue and yellow, a village with a church spire, a tall dark cypress tree in the foreground); analyze (thick, directional brushstrokes, strong contrast of blue and yellow-orange complementary colors, curving lines create movement); interpret (energy, wonder, emotion; Van Gogh painted it from memory and imagination while at an asylum in Saint-Remy, France); evaluate (how well do the brushwork and color express feeling?).
2. Style comparison: Seurat used pointillism, thousands of tiny dots of pure color placed side by side so that the eye blends them from a distance (optical mixing), with careful planning and a calm, still, ordered scene; Van Gogh used thick, expressive brushstrokes and intense color, fast and emotional. Both belong to Post-Impressionism and both worked in France in the 1880s.
3. Jacob Lawrence (1917 to 2000): The Migration Series, 60 small panels with captions about the Great Migration, when many Black Americans moved from the rural South to Northern cities such as Chicago and Cleveland for jobs and to escape segregation and violence. Style: flat, bold shapes, limited colors, angular figures, strong rhythm, and storytelling.
4. Ohio connection: see these kinds of works in the Cleveland Museum of Art, the Columbus Museum of Art, the Cincinnati Art Museum or the Toledo Museum of Art.

## Problem set

Analyze one work and compare two artists.
`,
  reading: [
    "How to look at art, and what makes an artist distinctive",
    `
Looking at art well takes time. A useful method has four steps. **Describe** what you see, using facts. **Analyze** how the artist used the elements and principles of design. **Interpret** what the work expresses or means. **Evaluate** how well it succeeds. Try it with Vincent van Gogh's *The Starry Night* (1889). To **describe**: a night sky filled with swirling blue and yellow, a small village with a church spire below, and a tall, dark cypress tree in the foreground. To **analyze**: thick, directional brushstrokes follow the curves of the sky; blue and yellow-orange are near **complements**, so they make strong contrast; curving lines create **movement** across the picture. To **interpret**: the sky feels full of energy, wonder and emotion. Van Gogh painted it from memory and imagination while staying at an asylum in Saint-Rémy, France. To **evaluate**: the brushwork and color convey feeling very powerfully, even if the village looks calm compared with the sky.

Comparing two artists helps you see what makes each **distinctive**. Georges Seurat was also a French painter of the 1880s and, like Van Gogh, is called a **Post-Impressionist**. But his style was very different. In *A Sunday on La Grande Jatte* (1884 to 1886), he used **pointillism**: thousands of tiny dots of pure color placed side by side. From a distance, the viewer's eye mixes the dots, a process called **optical mixing**. His scene of people relaxing by a river is planned with care, and looks still, calm and ordered. Van Gogh, on the other hand, worked quickly with thick, **expressive brushstrokes** and intense color to show emotion. One artist reasoned his way across the canvas dot by dot, the other let feeling lead the brush. Both changed how people thought about painting.

Not all famous artists lived in Europe in the 1800s. **Jacob Lawrence** (1917 to 2000), an American artist, painted *The Migration Series* in 1940 and 1941: **60 small panels** with captions that tell the story of the **Great Migration**, when many Black Americans left the rural South for Northern cities such as Chicago and Cleveland, seeking jobs and an escape from segregation and violence. His style uses **flat, bold shapes**, a limited set of colors, angular figures and a strong rhythm, so each panel reads clearly like a page of a story. Lawrence shows how art can document history.

You can study works like these in person. Museums in Ohio, including the **Cleveland Museum of Art**, the **Columbus Museum of Art**, the **Cincinnati Art Museum** and the **Toledo Museum of Art**, have large collections. Before you visit, choose one work, and practice the four steps in front of it. The longer you look, the more you will see.
`,
  ],
  cards: [
    ["Post-Impressionism", "Late 1800s art that built on Impressionism with personal styles."],
    ["Pointillism", "Painting with small dots of pure color."],
    ["Optical mixing", "The eye blending colors placed side by side."],
    ["Expressive brushwork", "Visible, energetic strokes that convey emotion."],
    ["Great Migration", "The movement of many Black Americans from the rural South to Northern cities."],
    ["Distinctive style", "Features that make an artist's work recognizable."],
    ["Series", "A group of related works on one subject."],
    ["Interpret", "Say what a work means or expresses."],
  ],
  closed: [
    [
      "Which artist is known for pointillism?",
      ["Vincent van Gogh", "Georges Seurat", "Jacob Lawrence", "Claude Monet"],
      "B",
    ],
    [
      "Jacob Lawrence's The Migration Series tells the story of:",
      ["The Great Migration", "A voyage to Mars", "The invention of paint", "A royal wedding"],
      "A",
    ],
    [
      "Which describes Van Gogh's style in The Starry Night?",
      ["Thick, swirling expressive brushstrokes", "Tiny dots of color", "Flat, photographic surfaces", "No color"],
      "A",
    ],
    [
      "In the four-step method, which step states facts about what you see?",
      ["Describe", "Evaluate", "Interpret", "Predict"],
      "A",
    ],
    [
      "Optical mixing happens when:",
      ["The eye blends small dots of color from a distance", "Paint is mixed on a palette", "Colors are erased", "A camera is used"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Choose one of the three works discussed (Van Gogh's The Starry Night, Seurat's A Sunday on La Grande Jatte, or a panel from Lawrence's The Migration Series). Use the four steps to write about it: describe, analyze (naming at least two elements or principles), interpret, and evaluate with a reason.",
      scheme: [
        "Describes the work accurately using facts",
        "Analyzes using at least two elements or principles of design with evidence",
        "Interprets the meaning or mood with a reason",
        "Evaluates how well the work succeeds, with a reason",
      ],
      model:
        "The Starry Night: I see a night sky with swirling blue and yellow, a small village with a church spire, and a tall dark cypress in front. The brushstrokes are thick and follow the curves of the sky, and blue and yellow-orange are near complements, creating contrast and movement. It feels full of energy and wonder; Van Gogh painted it from memory, so it expresses emotion more than a literal scene. It succeeds because the swirling strokes make the viewer feel the sky's motion.",
      answers: [
        [
          "full",
          "[[0|In The Starry Night I see a night sky of swirling blue and yellow, a small village with a church spire, and a tall dark cypress tree in front.]] [[1|The brushstrokes are thick and follow the curves of the sky, and blue against yellow-orange gives strong contrast, while the curving lines create movement.]] [[2|It feels full of energy and wonder, and since Van Gogh painted it from memory, it expresses emotion more than a literal scene.]] [[3|It succeeds because the swirling strokes make me feel the sky's motion.]]",
          "Full marks. All four steps are present and each is supported.",
        ],
        [
          "full",
          "[[0|In A Sunday on La Grande Jatte I see many people in a park by a river, some standing and some sitting, in sunlit and shaded areas.]] [[1|Seurat used tiny dots of pure color, and the strong horizontal and vertical shapes of the figures create a feeling of order and stillness.]] [[2|It feels calm and almost frozen in time, as if the people are posing, showing a quiet Sunday afternoon.]] [[3|It works because the dots make the light glow, though the figures seem a little stiff.]]",
          "Full marks. A balanced evaluation includes strengths and a limit.",
        ],
        [
          "partial",
          "[[0|I see a painting of the sky.]] [[3|It is good.]] It has no elements or colors worth mentioning, and I don't know what it means.",
          "Name the elements, such as color and line, and say what the work expresses.",
        ],
        [
          "partial",
          "[[1|It uses blue and yellow-orange and curving lines.]] [[2|It feels energetic.]] The painting is made of tiny dots, as in pointillism.",
          "The Starry Night uses thick brushstrokes. Pointillism is Seurat's technique.",
          true,
        ],
        [
          "weak",
          "I do not know anything about art so I cannot say anything.",
          "You can describe what you see, then use evidence for the other steps.",
        ],
        [
          "weak",
          "The artists painted these to match their living room furniture.",
          "These works express ideas and feelings, and in Lawrence's case, history.",
        ],
      ],
    },
    {
      prompt:
        "Compare the styles of Vincent van Gogh and Georges Seurat. Explain what makes each distinctive in technique and mood, one thing they share, and then explain why Jacob Lawrence's style (flat, bold shapes) suits the story he tells in The Migration Series.",
      scheme: [
        "Explains Van Gogh's distinctive technique and mood (expressive, thick strokes, emotion)",
        "Explains Seurat's distinctive technique and mood (pointillism, ordered, calm)",
        "Names something they share, such as Post-Impressionism or working in France in the 1880s",
        "Explains how Lawrence's flat, bold shapes suit a clear narrative series",
      ],
      model:
        "Van Gogh used thick, expressive brushstrokes and intense color to convey emotion and energy. Seurat used pointillism, tiny dots of pure color planned carefully to create a calm, ordered scene. They share being Post-Impressionists who worked in France in the 1880s. Lawrence's flat, bold shapes and limited colors suit The Migration Series because each small panel reads clearly, like a page of a story, which helps viewers follow a history of many people.",
      answers: [
        [
          "full",
          "[[0|Van Gogh used thick, expressive brushstrokes and intense color to convey emotion and energy.]] [[1|Seurat used pointillism, tiny dots of pure color planned carefully to make a calm, ordered scene.]] [[2|They share being Post-Impressionists who worked in France in the 1880s.]] [[3|Lawrence's flat, bold shapes and limited colors suit The Migration Series because each panel reads clearly like a page of a story.]]",
          "Full marks. The comparison is balanced and the Lawrence point is connected to the story.",
        ],
        [
          "full",
          "[[0|Van Gogh painted quickly with swirling, visible strokes and strong color, so his work feels emotional and alive.]] [[1|Seurat worked slowly with dots that blend in the viewer's eye, so his scenes feel still and ordered.]] [[2|Both were Post-Impressionists in France who changed how painting could look.]] [[3|Lawrence used simple, flat shapes and bold colors so that a viewer can read each panel's message at a glance, which fits a story told in sixty images.]]",
          "Full marks. Reading each panel at a glance is exactly the strength of the style.",
        ],
        [
          "partial",
          "[[0|Van Gogh used thick brushstrokes.]] [[3|Lawrence's shapes are clear.]] Seurat and Van Gogh painted exactly the same way, and have nothing in common.",
          "Seurat's pointillism differs from Van Gogh's brushwork, though both were Post-Impressionists.",
        ],
        [
          "partial",
          "[[1|Seurat used dots.]] [[2|They were both Post-Impressionists.]] Lawrence painted in the 1700s in France.",
          "Jacob Lawrence was an American artist who painted The Migration Series in 1940 and 1941.",
          true,
        ],
        [
          "weak",
          "All paintings look the same, so styles don't exist.",
          "Artists have distinctive styles that you can describe.",
        ],
        [
          "weak",
          "Lawrence's shapes are flat because he did not know how to paint better.",
          "His flat, bold shapes were a deliberate choice to tell a story clearly.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "How materials carry meaning, and how art reflects its time",
  note: `
## Objectives

Students will be able to:

1. explain how an artist's choices of materials affect the meaning of the work;
2. describe how art reflects the culture and time in which it was made.

## Materials

Images of works made with different materials (Aminah Robinson's mixed-media works, a bronze sculpture, a fresco), pieces of cloth, clay, charcoal and paper for hands-on comparison, a gallery-walk worksheet, the worksheet.

## Starter (6 minutes)

Pass around a rough burlap scrap, a smooth glossy paper and a soft cotton rag. Ask: "If you drew a memory on each, how would it feel different?"

## Main activity

1. Materials and meaning: material choices can add meaning beyond the image. Examples: charcoal can feel raw and moody; bronze feels permanent and heroic; cloth and thread suggest family, home and handwork. Aminah Robinson (1940 to 2015) of Columbus, Ohio, used cloth, buttons, beads and found objects to tell stories about her community's history, in her work and in books such as the RagGonNon series. The use of rags and scraps connected to family and memory. Questions to ask: What is it made of? Why might the artist have chosen it? What would change if it were made of something else?
2. Art and its time: art reflects what people believed, needed and experienced. Examples: Serpent Mound in Adams County, Ohio, an earthwork about 1,300 feet long in the shape of a serpent, was made by Indigenous peoples of the region long ago; it shows cultural and perhaps spiritual meanings tied to the land. Jacob Lawrence's Migration Series reflects the 1910s to 1940s and the Great Migration. Ancient Egyptian tomb paintings show beliefs about the afterlife. Propaganda posters of the 1940s reflect war-time goals.
3. Ask: Who made this? When? What was happening? Who was it for? What does it tell us about the values of its time?

## Worksheet

Gallery walk: materials and times.
`,
  reading: [
    "What things are made of, and when they were made",
    `
When an artist begins a work, one of the first decisions is the **material**, and it is never neutral. The material is part of the message. **Charcoal** can feel raw, smudged and moody. **Bronze** feels strong, permanent and heroic, so it has often been used for statues of important people. **Watercolor** can feel light and fleeting. **Cloth** and **thread** suggest home, family and handwork. When you look at an artwork, ask: *What is it made of? Why might the artist have chosen it? What would change if it were made of something else?*

The Ohio artist **Aminah Robinson** (1940 to 2015) of Columbus is a good example. She used **cloth, buttons, beads, thread and found objects** to build richly detailed works that tell the stories of her community, including its history, families and neighborhood life. Her use of rags and scraps connected to family and memory: the materials themselves had been used and loved before they became art. She also made books, such as the *RagGonNon* series, full of drawings and fabric. If the same stories had been painted in a single flat color on canvas, they might have felt less personal and less rooted in the handwork of the people she honored.

Art also reflects the **culture and time** in which it was made. It records what people believed, needed and experienced. In Adams County, Ohio, **Serpent Mound** is an earthwork about 1,300 feet long in the form of a winding snake, made by Indigenous peoples of the region long ago. Its size and its shape, set into the land, point to cultural and perhaps spiritual meanings tied to the landscape. Jacob Lawrence's *Migration Series* reflects the hopes and hardships of the Great Migration, painted in 1940 and 1941, while the events were still within living memory. Ancient Egyptian **tomb paintings** show beliefs about life after death. American **posters from the 1940s** urged people to buy war bonds and conserve resources, reflecting the goals of wartime.

To study a work in its time, ask: *Who made this? When? What was happening in the world? Who was it for? What does it tell us about the values of that time?* Then ask what **you** would make today to show your own time and community, and what materials would best carry that meaning.
`,
  ],
  cards: [
    ["Medium", "The material an artist uses."],
    ["Mixed media", "Artwork made from more than one material."],
    ["Found object", "An existing object used in an artwork."],
    ["Aminah Robinson", "A Columbus, Ohio artist who used cloth and found objects."],
    ["Serpent Mound", "An Ohio earthwork shaped like a serpent."],
    ["Culture", "The beliefs, customs and arts of a group of people."],
    ["Context", "The time and place in which a work was made."],
    ["Symbol", "An image or object that stands for an idea."],
  ],
  closed: [
    [
      "Which material most strongly suggests permanence and heroism?",
      ["Chalk", "Bronze", "Tissue paper", "Watercolor"],
      "B",
    ],
    [
      "Aminah Robinson often used which materials?",
      ["Cloth, buttons and found objects", "Only marble", "Only digital tools", "Only watercolor"],
      "A",
    ],
    [
      "Serpent Mound is located in which state?",
      ["Ohio", "Texas", "Maine", "Oregon"],
      "A",
    ],
    [
      "Why does the time a work was made matter?",
      ["It shows what people believed and experienced", "It changes the colors", "It makes works larger", "It does not matter"],
      "A",
    ],
    [
      "Which question helps you find meaning in a material?",
      ["Why might the artist have chosen it?", "What does it cost?", "Who sells it?", "How heavy is it?"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Explain how the choice of materials adds meaning to Aminah Robinson's cloth-and-found-object works. Then imagine you want to make a work about your own family's kitchen. Choose a material, explain what it would suggest, and say what would change if you made it in another material.",
      scheme: [
        "Explains that Robinson's cloth, buttons and found objects connect to family, memory and community",
        "Chooses a material for the kitchen work",
        "Explains what that material suggests",
        "Explains how the meaning would change with a different material",
      ],
      model:
        "Aminah Robinson used cloth, buttons, thread and found objects, which already carried the feeling of home and handwork, so her works about her community felt personal and rooted in memory. For my family's kitchen, I would use scraps of my grandmother's old aprons and dish towels, which suggest warmth, daily work and family history. If I made it in shiny plastic or sleek metal, it would feel cold and modern, and would lose the sense of generations of use.",
      answers: [
        [
          "full",
          "[[0|Aminah Robinson used cloth, buttons, thread and found objects, which already suggest family, memory and handwork, so her stories about her community felt personal.]] [[1|For my family's kitchen I'd use scraps of my grandmother's old aprons and dish towels.]] [[2|They suggest warmth, daily work and family history.]] [[3|If I made it in shiny plastic or sleek metal it would feel cold and modern and lose the feeling of generations of use.]]",
          "Full marks. The material choice is personal and the comparison is clear.",
        ],
        [
          "full",
          "[[0|Robinson's rags and buttons were objects people had used, so they carried memory and linked her art to real families.]] [[1|I'd make my kitchen piece from a collage of recipe cards, pieces of a cutting board and flour sack cloth.]] [[2|These say that the kitchen is a place of work, sharing and tradition.]] [[3|If I painted it in neon colors on a smooth canvas, it would feel like an advertisement and not a family memory.]]",
          "Full marks. Recipe cards are a personal and meaningful material.",
        ],
        [
          "partial",
          "[[0|She used cloth and buttons.]] [[1|I'd use cloth for the kitchen.]] The material doesn't matter, so it would mean the same in any material.",
          "Material choices change meaning. Explain what your material suggests.",
        ],
        [
          "partial",
          "[[2|Cloth suggests home and handwork.]] [[3|Metal would feel cold.]] Aminah Robinson used only marble and bronze.",
          "Robinson used cloth, buttons, thread and found objects.",
          true,
        ],
        [
          "weak",
          "Materials are chosen only because they are cheap. They have no meaning.",
          "Artists choose materials for the meaning they carry as well as cost.",
        ],
        [
          "weak",
          "I do not have a family kitchen so I can't make an artwork about it.",
          "Choose any place that matters to you and think about how materials suggest meaning.",
        ],
      ],
    },
    {
      prompt:
        "Choose two works from different times or cultures discussed this week (Serpent Mound, Jacob Lawrence's Migration Series, an Egyptian tomb painting, or a 1940s poster). For each, say what it tells us about the beliefs, needs or experiences of the people of its time. Then explain how you would ask questions about a work you see in a museum to understand its time.",
      scheme: [
        "Names the first work and explains what it shows about its time or culture",
        "Names the second work and explains what it shows about its time or culture",
        "Makes an accurate comparison or connection between the two",
        "Lists at least three useful questions to ask (who made it, when, what was happening, who it was for)",
      ],
      model:
        "Serpent Mound, a huge earthwork in Adams County, Ohio, shows that Indigenous peoples of the region made art tied to the land, with cultural and perhaps spiritual meanings. Jacob Lawrence's Migration Series shows the hopes and hardships of Black Americans during the Great Migration of the early 1900s. Both works are tied to the experience of a community, but one is a landscape work made long ago and the other tells a recent history in panels. In a museum, I would ask: Who made this? When was it made? What was happening then? Who was it for? What does it show about their values?",
      answers: [
        [
          "full",
          "[[0|Serpent Mound, a huge earthwork in Adams County, Ohio, shows that Indigenous peoples of the region made art tied to the land, with cultural and perhaps spiritual meanings.]] [[1|Jacob Lawrence's Migration Series shows the hopes and hardships of Black Americans during the Great Migration.]] [[2|Both are tied to a community's experience, but one is a landscape work made long ago and the other tells a recent history in panels.]] [[3|In a museum I'd ask: who made this, when, what was happening then, who was it for, and what does it show about their values?]]",
          "Full marks. A clear comparison and useful questions.",
        ],
        [
          "full",
          "[[0|An Egyptian tomb painting shows beliefs about life after death, since it was made to help the person in the next world.]] [[1|A 1940s poster urging people to buy war bonds shows the needs of a country at war.]] [[2|Both were made to serve a purpose for their society, one spiritual and one practical.]] [[3|I'd ask who made it, when, what was happening, who the audience was and what values it shows.]]",
          "Full marks. 'Serve a purpose for their society' links both works well.",
        ],
        [
          "partial",
          "[[0|Serpent Mound is a snake.]] [[3|I'd ask who made it.]] The Migration Series was painted in ancient Egypt. Art doesn't show anything about its time.",
          "The Migration Series was painted in 1940 and 1941, and art does reflect its time.",
        ],
        [
          "partial",
          "[[1|The Migration Series shows the Great Migration.]] [[2|Both reflect a community.]] Serpent Mound is in Texas and was built last year.",
          "Serpent Mound is in Adams County, Ohio, and was made long ago.",
          true,
        ],
        [
          "weak",
          "Art is just decoration and doesn't say anything about people.",
          "Art records beliefs, needs and experiences of its time.",
        ],
        [
          "weak",
          "I'd ask only how much the work costs.",
          "Questions about maker, date and context help you understand the work.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Art that speaks to other subjects, and careers in the arts",
  note: `
## Objectives

Students will be able to:

1. make a work that responds to an issue or idea from another subject area;
2. identify careers in the arts and the skills each requires.

## Materials

Poster paper, markers, colored pencils, pencils, a list of topics from other classes (science, history, English), a careers chart, tablets for research, the worksheet.

## Starter (6 minutes)

Ask: "What is something you learned in another class this term that you would like to show in a picture?" List: the water cycle, a historical event, a character from a novel, a math pattern.

## Main activity

1. Art connects with other subjects. Examples: a poster on water conservation (science); a map-style illustration of a historical migration (social studies); a visual portrait of a character in a novel (English); a symmetrical design based on geometry (math). Steps: choose an idea, research accurate facts, plan the visuals (thumbnails), choose elements and principles that support the message (for example, contrast to emphasize a warning), make the work, and add a short caption that explains the link. Check accuracy and credit sources.
2. Careers: graphic designer (designs logos, packaging, websites; skills: typography, layout, software, client communication); illustrator (images for books and media; drawing, storytelling, deadlines); art teacher (teaches art; patience, planning, art knowledge, a teaching license); museum curator (cares for and exhibits collections; research, writing, art history, advanced degrees common); architect (designs buildings; drawing, math, licensing, long degree); animator (moving images; drawing, timing, software); art therapist (uses art to support mental health; art skills plus counseling training, graduate degree); conservator (repairs and preserves artworks; chemistry, patience, fine motor skills); industrial designer; photographer.
3. Skills across careers: creativity, observation, communication, problem solving, time management, digital tools, collaboration, and a portfolio.

## Worksheet

Plan a cross-subject piece and research a career.
`,
  reading: [
    "Art beyond the art room, and where it can lead",
    `
Art is not isolated from other subjects; it is a way to show and understand them. When you make a work that responds to an issue or idea from another class, you practice **connecting**. A poster on **water conservation** puts science into a picture. A map-style illustration of a **historical migration** brings history to life. A portrait of a **character in a novel** shows how you interpret the story. A **symmetrical design** built from geometric shapes shows mathematics at work. Artists often begin this way: with something they want to say about the world.

A good cross-subject piece follows a few steps. **Choose** an idea that interests you. **Research** the facts so that your message is accurate; if your poster says that a leaking faucet wastes water, find a real figure and note the source. **Plan** the visuals with thumbnail sketches. Then choose the **elements and principles** that support your message: bold contrast to make a warning stand out, a calm blue palette to show clean water, a clear focal point so that viewers see the main idea first. **Make** the work, and add a short **caption** that explains the link: what the work says and which subject it comes from. Credit your sources, and double-check your facts.

The arts also offer many careers, and they are more varied than people think. A **graphic designer** creates logos, packaging, posters and websites, using skills in typography, layout and software, and in communicating with clients. An **illustrator** makes images for books, magazines and games, and needs strong drawing, storytelling and the ability to meet deadlines. An **art teacher** helps others to learn; this requires art knowledge, patience, planning and, in public schools, a teaching license. A **museum curator** researches, cares for and exhibits collections, and often has an advanced degree in art history. An **architect** designs buildings with drawing, math and years of study and licensing. An **animator** creates moving images, using drawing, timing and software. An **art therapist** uses art to support mental health, with art skills and a graduate degree in counseling. A **conservator** repairs and preserves artworks and needs chemistry knowledge and fine motor skill.

Different as these jobs are, they share skills: **creativity**, careful **observation**, clear **communication**, **problem solving**, **time management**, use of **digital tools** and the ability to **collaborate**. Most also require a **portfolio**, a collection of your best work. The work you do in Art I, with your sketchbook, your finished pieces and your artist statements, is the start of one.
`,
  ],
  cards: [
    ["Cross-curricular", "Connecting ideas from more than one subject."],
    ["Caption", "Short text explaining a work."],
    ["Graphic designer", "A person who designs logos, packaging and layouts."],
    ["Illustrator", "A person who makes images for books and media."],
    ["Curator", "A person who researches and exhibits collections."],
    ["Conservator", "A person who repairs and preserves artworks."],
    ["Art therapist", "A trained professional who uses art for mental health."],
    ["Portfolio", "A collection of an artist's best work."],
  ],
  closed: [
    [
      "Which career repairs and preserves artworks?",
      ["Conservator", "Illustrator", "Animator", "Architect"],
      "A",
    ],
    [
      "A poster on water conservation connects art with which subject?",
      ["Science", "Gym only", "Music only", "Lunch"],
      "A",
    ],
    [
      "Why research facts before making a poster on a science topic?",
      ["So the message is accurate", "To make it longer", "To avoid drawing", "To hide the topic"],
      "A",
    ],
    [
      "Which skill do nearly all arts careers share?",
      ["Communication", "Only juggling", "Mining", "Plumbing"],
      "A",
    ],
    [
      "A portfolio is:",
      ["A collection of your best work", "A kind of paint", "A museum room", "A school bag"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Plan an artwork that responds to an idea from another subject (for example, a poster on water conservation for science, or an illustration of a historical event). State the idea and the facts you would research, describe your composition using at least two elements or principles of design and why, and write a two-sentence caption that explains the connection.",
      scheme: [
        "States a clear idea from another subject with a fact to research",
        "Describes the composition and uses at least two elements or principles of design",
        "Explains why those choices support the message",
        "Writes a two-sentence caption explaining the connection",
      ],
      model:
        "Idea: a poster on water conservation for science class. I would research how much water a leaking faucet wastes in a day and cite the source. The composition has a large drop at the center as the focal point (emphasis) and uses contrast between a bright blue drop and a dark gray background. These choices draw attention to the problem. Caption: \"A leaking faucet can waste gallons of water a day. This poster connects art and science by showing how small leaks add up.\"",
      answers: [
        [
          "full",
          "[[0|Idea: a poster on water conservation for science, and I'd research how much water a leaking faucet wastes in a day and note the source.]] [[1|I'd put a large blue drop in the center for emphasis, against a dark gray background for contrast.]] [[2|The contrast and the central focal point make viewers see the problem first.]] [[3|Caption: 'A leaking faucet can waste gallons of water a day. This poster connects art and science by showing how small leaks add up.']]",
          "Full marks. The research, design choices and caption fit together.",
        ],
        [
          "full",
          "[[0|I'd make an illustration of the Great Migration for history, researching the routes from the South to Cleveland and Chicago.]] [[1|I'd use arrows as strong lines to create movement and repeat small train shapes for rhythm.]] [[2|Movement and repetition show many people traveling over time.]] [[3|Caption: 'Many families left the South for Northern cities in search of work. This map-style piece links art and social studies by showing the routes they traveled.']]",
          "Full marks. Movement and rhythm suit a story of travel.",
        ],
        [
          "partial",
          "[[0|A poster about water.]] [[3|Caption: art and science.]] I will not research anything or choose any design, just draw whatever.",
          "Research and design choices make the message accurate and clear.",
        ],
        [
          "partial",
          "[[1|A big blue drop with contrast.]] [[2|It draws attention.]] The idea is a poster about nothing in particular.",
          "Choose a specific idea from another subject and the facts you will check.",
          true,
        ],
        [
          "weak",
          "Art has nothing to do with other subjects, so this is impossible.",
          "Art can express and explain ideas from any subject.",
        ],
        [
          "weak",
          "I will copy a poster from the internet without credit.",
          "Make your own work and credit the sources of facts.",
        ],
      ],
    },
    {
      prompt:
        "Choose two careers in the arts (for example graphic designer, illustrator, art teacher, curator, architect, animator, art therapist or conservator). For each, describe what the person does and name two skills needed. Then explain which skills the two careers have in common and name two things you can do now in Art I to prepare.",
      scheme: [
        "Describes the first career accurately with two skills",
        "Describes the second career accurately with two skills",
        "Identifies at least one shared skill, such as creativity or communication",
        "Names two things to do now, such as building a portfolio and keeping a sketchbook",
      ],
      model:
        "A graphic designer creates logos, packaging and websites, using skills in layout and software, and in communicating with clients. A conservator repairs and preserves artworks, needing chemistry knowledge and fine motor skill. Both need careful observation and attention to detail. Now in Art I, I can keep my sketchbook daily and build a portfolio of my best finished work with artist statements.",
      answers: [
        [
          "full",
          "[[0|A graphic designer creates logos, packaging and websites, using skills in layout and software and in communicating with clients.]] [[1|A conservator repairs and preserves artworks, needing chemistry knowledge and fine motor skill.]] [[2|Both need careful observation and attention to detail.]] [[3|In Art I I can keep my sketchbook daily and build a portfolio of my best finished work with artist statements.]]",
          "Full marks. The careers and the shared skill are accurate.",
        ],
        [
          "full",
          "[[0|An art teacher plans lessons and helps students learn, so patience and art knowledge matter, plus a teaching license.]] [[1|An animator makes moving images, using drawing and timing skills and software.]] [[2|Both need creativity and clear communication.]] [[3|To prepare I can keep drawing in my sketchbook every day and start a portfolio with my best pieces.]]",
          "Full marks. Naming the license shows research.",
        ],
        [
          "partial",
          "[[0|An illustrator draws pictures.]] [[3|I can keep a sketchbook.]] Both careers need no skills or training, and anyone can do them.",
          "Name two skills for each career and one shared skill.",
        ],
        [
          "partial",
          "[[1|An architect designs buildings using drawing and math.]] [[2|Both need creativity.]] An architect repairs old paintings.",
          "A conservator repairs old paintings; an architect designs buildings.",
          true,
        ],
        [
          "weak",
          "There are no careers in art, so I'd have to do something else.",
          "There are many careers in the arts, such as design, teaching and animation.",
        ],
        [
          "weak",
          "A portfolio is a bag for carrying lunch, and I don't need one.",
          "A portfolio is a collection of your best work.",
        ],
      ],
    },
  ],
};

writeCourse("art-i-grade-9.json", "Art I", "Grade 9", {
  1: w1,
  2: w2,
  3: w3,
  4: w4,
  5: w5,
  6: w6,
  7: w7,
  8: w8,
});
