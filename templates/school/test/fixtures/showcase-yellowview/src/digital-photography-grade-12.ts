import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Digital Photography, Grade 12, Quarter 1. Standards: National Core Arts
 * Standards (visual arts: creating, presenting, responding, connecting), in
 * the school's own words. Camera settings, file sizes and prices are worked
 * out by hand; photographers and events named are real and the facts have
 * been checked. No practical write-ups: the shooting is assessed through the
 * portfolio, and the written work covers the ideas behind it.
 */

const w1: WeekInput = {
  topic: "Exposure, composition and light",
  note: `
## Objectives

Students will be able to:

1. operate a digital camera using aperture, shutter speed and ISO and explain how they work together;
2. use composition techniques such as the rule of thirds, leading lines and framing;
3. control light by shooting in different conditions and using natural and artificial sources.

## Materials

Cameras (manual-capable, including phones with manual apps), tripods, reflectors (white card, foil), a small LED lamp, a stop-table handout, the worksheet.

## Starter (6 minutes)

Hold up two photos of a running dog: one frozen sharp, one blurred. Ask: "What did the photographer change?" Introduce exposure.

## Main activity

1. Exposure triangle. Aperture: the opening in the lens, measured in f-numbers. A smaller f-number means a larger opening: f/1.4, f/2, f/2.8, f/4, f/5.6, f/8, f/11, f/16. Each step is one stop and halves the light. A large opening gives shallow depth of field (blurred background); a small opening gives deep depth of field. Shutter speed: how long the sensor is exposed (1/1000 s, 1/500, 1/250, 1/125, 1/60 ...); each step doubles or halves the light; fast speeds freeze motion, slow speeds blur it; a handheld rule is to use at least 1 / focal length (a 50 mm lens: 1/50 s or faster). ISO: the sensor's sensitivity (100, 200, 400, 800, 1600 ...); each doubling is one stop more sensitive, but adds noise (grain).
2. Equivalent exposures: f/8 at 1/125 s and ISO 100 gives the same exposure as f/5.6 at 1/250 s (one stop wider, one stop faster). To freeze a runner at 1/500 s from f/8 at 1/125 s, you need 2 more stops of light: open to f/4 (f/8 to f/5.6 to f/4) or raise ISO from 100 to 400 (100 to 200 to 400).
3. Composition: rule of thirds (place the subject on a line or an intersection), leading lines (roads, fences, rivers that guide the eye), framing (a doorway, branches or a window around the subject), fill the frame, negative space, symmetry, and changing the angle.
4. Light. Quality: hard (small, direct source, sharp shadows, such as midday sun) versus soft (large source relative to the subject, gradual shadows, such as an overcast sky or a window). Direction: front, side, back. Color: golden hour (the hour after sunrise and before sunset) gives low, warm, soft light; daylight is about 5500 K, while indoor tungsten bulbs are warmer, about 3200 K. Tools: a reflector bounces light into shadows; a diffuser softens; open shade avoids harsh sun.

## Worksheet

Equivalent exposure puzzles and a light log.
`,
  reading: [
    "How a camera makes a picture, and how to arrange it",
    `
A photograph is made of light, and your camera has three controls that decide how much of it reaches the sensor. Together they are called the **exposure triangle**.

**Aperture** is the opening in the lens, measured in **f-numbers**. The numbers seem backward: a **smaller** f-number means a **larger** opening. A typical series is f/1.4, f/2, f/2.8, f/4, f/5.6, f/8, f/11, f/16, and each step is one **stop**, which halves (going up) or doubles (going down) the light. Aperture also controls **depth of field**, the zone of the picture that looks sharp. A large opening such as f/2 gives a shallow depth of field and a softly blurred background, which is good for portraits. A small opening such as f/11 gives a deep depth of field, with foreground and background sharp, which suits landscapes.

**Shutter speed** is how long the sensor is exposed to light, written as fractions of a second: 1/1000, 1/500, 1/250, 1/125, 1/60 and so on. Each step doubles or halves the light. Fast speeds **freeze motion**; slow speeds **blur** it. When you hold the camera by hand, a safe rule is to use a speed of at least 1 divided by the focal length: with a 50 mm lens, 1/50 second or faster. **ISO** is the sensor's sensitivity. Each doubling (100, 200, 400, 800, 1600) is one stop more sensitive, which lets you shoot in dim light, but the picture gets more **noise**, a grainy look.

The three controls trade off against each other. For example, f/8 at 1/125 s and ISO 100 gives the same exposure as f/5.6 at 1/250 s: the aperture opens one stop (twice the light) and the shutter becomes one stop faster (half the time). Suppose you want to freeze a runner at 1/500 s. From 1/125 s, that is two stops faster (1/125 to 1/250 to 1/500), so you need two stops of light from somewhere else: open the aperture from f/8 to f/5.6 to f/4, or raise the ISO from 100 to 200 to 400, or a combination.

How you arrange the picture matters as much. The **rule of thirds** puts the subject on a line or intersection of an imaginary grid of nine parts. **Leading lines** such as roads, fences and rivers guide the eye. **Framing** uses a doorway, branches or a window around the subject. You can also **fill the frame**, use **negative space**, find symmetry, or simply change your **angle** by crouching or climbing.

Finally, learn to read **light**. **Hard light** from a small source, like the midday sun, makes sharp-edged shadows. **Soft light** from a large source, such as an overcast sky or a window, makes shadows gradual and flattering. Light at **golden hour** (the hour after sunrise and before sunset) is low, warm and soft. Daylight is about 5500 K in color temperature, while indoor tungsten bulbs, about 3200 K, are much warmer. A **reflector** bounces light into shadows, a diffuser softens it, and open shade avoids harsh sun. Good photographers wait for, and shape, the light.
`,
  ],
  cards: [
    ["Aperture", "The lens opening, measured in f-numbers."],
    ["Stop", "A doubling or halving of the light."],
    ["Depth of field", "The zone of the picture that looks sharp."],
    ["Shutter speed", "How long the sensor is exposed to light."],
    ["ISO", "The sensor's sensitivity to light."],
    ["Leading line", "A line that guides the eye through a photo."],
    ["Soft light", "Light from a large source with gradual shadows."],
    ["Golden hour", "The hour after sunrise and before sunset, with warm light."],
  ],
  closed: [
    [
      "Which aperture is the largest opening?",
      ["f/16", "f/8", "f/4", "f/1.4"],
      "D",
    ],
    [
      "Which is the same exposure as f/8 at 1/125 s and ISO 100?",
      ["f/5.6 at 1/250 s and ISO 100", "f/16 at 1/250 s and ISO 100", "f/8 at 1/500 s and ISO 100", "f/2 at 1/125 s and ISO 100"],
      "A",
    ],
    [
      "For a handheld shot with a 50 mm lens, a safe minimum shutter speed is about:",
      ["1/8 s", "1/15 s", "1/50 s", "1 s"],
      "C",
    ],
    [
      "What is the drawback of raising ISO?",
      ["More noise", "Less sharpness from the lens", "A smaller aperture", "Darker photos"],
      "A",
    ],
    [
      "Which light is softer?",
      ["Overcast sky", "Midday sun with no clouds", "A bare flashlight", "A single spotlight"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "You are photographing a cyclist and the camera's meter says the correct exposure is f/8 at 1/125 s, ISO 100. You want to freeze the motion at 1/500 s. Explain how many stops faster that is, then give two different combinations of settings that keep the same exposure (one changing aperture, one changing ISO), and say what you gain or lose in each.",
      scheme: [
        "States that 1/500 s is two stops faster than 1/125 s",
        "Gives f/4 at 1/500 s, ISO 100 as an equivalent exposure and says depth of field becomes shallower",
        "Gives f/8 at 1/500 s, ISO 400 as an equivalent exposure and says noise increases",
        "Explains the trade-off between sharpness of motion, depth of field and noise",
      ],
      model:
        "1/125 to 1/250 to 1/500 is two stops faster, so I need to add two stops of light. Option one: open the aperture two stops from f/8 to f/5.6 to f/4, giving f/4 at 1/500 s and ISO 100; the depth of field becomes shallower. Option two: raise ISO from 100 to 200 to 400, giving f/8 at 1/500 s and ISO 400; the depth of field stays the same but there is more noise. In each case I gain a frozen cyclist and pay with either depth of field or noise.",
      answers: [
        [
          "full",
          "[[0|1/125 to 1/250 to 1/500 is two stops faster, so I need two stops more light.]] [[1|Option one: f/4 at 1/500 s and ISO 100, which gives a shallower depth of field.]] [[2|Option two: f/8 at 1/500 s and ISO 400, which keeps the depth of field but adds more noise.]] [[3|Either way I freeze the cyclist, and I pay for it with a shallower depth of field or with more noise.]]",
          "Full marks. Two valid equivalents and an honest trade-off.",
        ],
        [
          "full",
          "[[0|It's two stops faster, since each step halves the time.]] [[1|I could open from f/8 to f/5.6 to f/4 at 1/500 s, but the background becomes blurrier and focusing gets trickier.]] [[2|Or I could keep f/8 and raise the ISO from 100 to 400, which keeps the depth of field but adds grain.]] [[3|The choice depends on whether I want a sharp background or the cleanest image.]]",
          "Full marks. Naming the focusing difficulty is a real consideration.",
        ],
        [
          "partial",
          "[[0|It is two stops faster.]] [[3|There is a trade-off.]] f/16 at 1/500 s and ISO 100 is equivalent, since the numbers are bigger.",
          "f/16 lets in less light. To keep the exposure, open the aperture to f/4 or raise the ISO.",
        ],
        [
          "partial",
          "[[1|f/4 at 1/500 s, ISO 100.]] [[2|f/8 at 1/500 s, ISO 400.]] It is one stop faster, so I only need one stop more light.",
          "From 1/125 to 1/500 is two stops: 1/250, then 1/500.",
          true,
        ],
        [
          "weak",
          "Just set the shutter to 1/500 and nothing else changes. The photo will be fine.",
          "A faster shutter gives less light, so the photo would be darker unless you compensate.",
        ],
        [
          "weak",
          "A stop means to stop taking photos.",
          "A stop is a doubling or halving of the light.",
        ],
      ],
    },
    {
      prompt:
        "You are photographing a portrait of a classmate outdoors. Describe how you would use light: choose a time or place, explain whether the light is hard or soft and why, where the subject should face, and how you would use a reflector. Then describe two composition techniques you would use and how each helps.",
      scheme: [
        "Chooses a time or place and explains the quality of light (hard or soft) with a reason",
        "Explains direction of the subject relative to the light",
        "Explains the use of a reflector to fill shadows",
        "Describes two composition techniques and how each helps",
      ],
      model:
        "I would shoot in open shade near a building during golden hour, because the large sky acts as a big source and gives soft light with gradual shadows. I would turn the subject so the light falls on the face from the side and slightly front. A white card reflector held below the chin would bounce light into the shadows. For composition, I would place the eyes on the upper third line to follow the rule of thirds, and frame the subject with branches or a doorway so that the eye is drawn to the face.",
      answers: [
        [
          "full",
          "[[0|I'd shoot in open shade near a building at golden hour, because the large sky is a big source, giving soft light with gradual shadows.]] [[1|I'd turn her so the light falls on the face from the side and slightly front.]] [[2|A white card held below the chin would bounce light into the shadows.]] [[3|For composition, I'd put her eyes on the upper third line, and frame her with branches so the eye is drawn to her face.]]",
          "Full marks. Light, direction, reflector and composition all work together.",
        ],
        [
          "full",
          "[[0|I'd use a big window or an overcast day, as both give soft light because the source is large compared with the face.]] [[1|I'd have him face the window at a slight angle, so one side is brighter and the other has a gentle shadow.]] [[2|A reflector or a piece of foil on the shadow side would lift the shadow and add a catchlight in his eyes.]] [[3|I'd use a leading line like the window frame to point to him, and fill the frame to focus on the face.]]",
          "Full marks. Mentioning the catchlight shows attention to portrait detail.",
        ],
        [
          "partial",
          "[[0|I'd shoot at noon in the sun.]] [[3|Use the rule of thirds.]] The light is soft at noon, and I don't need a reflector.",
          "Midday sun is hard light with sharp shadows. Choose open shade, overcast or golden hour.",
        ],
        [
          "partial",
          "[[1|Face her toward the light.]] [[2|Use a reflector.]] Soft light comes from a tiny source.",
          "Soft light comes from a large source relative to the subject.",
          true,
        ],
        [
          "weak",
          "Light does not matter. I would just use the flash in every photo.",
          "Light shapes a photo. Choose its quality and direction on purpose.",
        ],
        [
          "weak",
          "Composition is only for painters. Photographers just press the button.",
          "Composition guides the viewer's eye in photographs, too.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Many angles, choosing the best frame, and editing",
  note: `
## Objectives

Students will be able to:

1. photograph a subject from several angles and select the strongest image;
2. use editing software to crop, adjust exposure and correct color.

## Materials

Cameras, a subject to photograph (a bicycle, a plant, a building), computers with editing software (any), sample RAW and JPEG files, a culling worksheet, the quiz.

## Starter (6 minutes)

Give pairs one object and two minutes to take 20 photographs from as many angles as possible. Ask: "Which one do you like best and why? Did you find it in the first five?"

## Main activity

1. Shooting a subject from many angles: eye level, low, high, close up, wide, from behind, through something; move your feet before using the zoom; check the background; shoot vertical and horizontal; take a lot, then edit hard. The first idea is rarely the best.
2. Selecting (culling): review on a contact sheet or grid; give stars or flags; pick the strongest by asking: Is it sharp where it matters? Is the exposure right? Does the composition guide the eye? Does it have emotion or a story? Is it different from the others? Remove near-duplicates. Ask someone for a second opinion.
3. Editing basics: work non-destructively (keep the original; edits are instructions). Crop (straighten the horizon, remove distractions, change the aspect ratio, keep enough pixels). Exposure (the histogram shows tones: dark on the left, bright on the right; avoid clipping, where shadows or highlights lose all detail). White balance and color (correct a color cast; adjust saturation and contrast gently). Sharpen last; remove dust spots. RAW files keep more data than JPEG, so there is more room to adjust.
4. Example: a JPEG with a histogram bunched at the left is underexposed; raising exposure by 1 stop doubles the brightness values in linear terms.

## Quiz

Angles, culling and editing terms.
`,
  reading: [
    "Finding the picture, then finishing it",
    `
The first photograph you take of a subject is rarely your best. Experienced photographers explore a subject from many **angles** before they decide. Try **eye level**, then go **low** and look up, climb **high** and look down, move **close** for detail and step back for a wide view. Photograph from **behind** or **through** something, such as a window or fence. Move your feet before you use the zoom, since changing your position changes the relationship between objects, while zooming only changes the crop. Check the **background** for distractions such as poles sprouting from heads. Shoot in both **vertical** and **horizontal** orientations. Take plenty of frames, and then be strict about what you keep.

The process of choosing is called **culling**. View your images on a **contact sheet** or a grid, and use stars or flags to rank them. Ask of each one: *Is it sharp where it matters? Is the exposure right? Does the composition guide my eye? Does it have emotion, or a story? Is it different from the others?* Remove near-duplicates. It also helps to show your top picks to someone else, since a second opinion can reveal what you cannot see. The strongest image is often not the technically perfect one but the one that has something to say.

Then comes **editing**. Use **non-destructive** editing, which keeps your original file and stores your changes as instructions, so that you can always go back. **Cropping** can straighten a tilted horizon, remove distractions and improve the composition, but keep enough pixels for your intended use. For **exposure**, look at the **histogram**, a graph of the tones in your picture: dark tones are on the left and bright tones on the right. If the graph is bunched against the left side, the image is underexposed; if it is piled against the right, it is overexposed. Avoid **clipping**, where shadows or highlights are pure black or white and have lost all detail. Next, correct **white balance** to remove a color cast, such as an orange tint from indoor lights, and adjust contrast and saturation gently. **Sharpen** last, and clean dust spots. If you shoot in **RAW** format, the file keeps much more information than a **JPEG**, which gives you greater room to adjust exposure and color without damage.

Editing should serve the photograph, not replace it. Aim for an image that looks like what you saw and felt, and learn to stop before it looks overdone.
`,
  ],
  cards: [
    ["Culling", "Choosing the best images from many."],
    ["Contact sheet", "A grid of small images used to review a shoot."],
    ["Crop", "Trimming an image to improve composition."],
    ["Histogram", "A graph showing the distribution of tones in a photo."],
    ["Clipping", "Loss of detail in pure black or pure white areas."],
    ["White balance", "Adjusting color so that whites look neutral."],
    ["Non-destructive editing", "Editing that preserves the original file."],
    ["RAW", "A file format that keeps most of the sensor's data."],
  ],
  closed: [
    [
      "A histogram bunched against the left side suggests the photo is:",
      ["Underexposed", "Overexposed", "In focus", "Black and white"],
      "A",
    ],
    [
      "What does clipping mean?",
      ["Loss of all detail in pure black or white areas", "Cutting the photo with scissors", "Adding a border", "Sharpening"],
      "A",
    ],
    [
      "Which file keeps more information for editing?",
      ["RAW", "JPEG", "A screenshot", "A GIF"],
      "A",
    ],
    [
      "Why move your feet instead of only zooming?",
      ["It changes the relationship between objects", "Zooming is illegal", "It saves battery", "It makes the file smaller"],
      "A",
    ],
    [
      "What is culling?",
      ["Choosing the best images from many", "Taking more photos", "Printing", "Cleaning a lens"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "You have photographed an old bicycle against a brick wall from 30 positions. Describe at least four different angles or approaches you would try, then explain the questions you would ask to choose the best image, and how you would get a second opinion.",
      scheme: [
        "Describes at least four different angles or approaches",
        "Lists at least three selection questions (sharpness, exposure, composition, story, difference)",
        "Describes removing near-duplicates or ranking with stars",
        "Describes getting a second opinion and why it helps",
      ],
      model:
        "I would try eye level, a low angle looking up at the frame, a high angle from above, a close-up of the chain and a view through the spokes. To choose, I would ask whether it is sharp where it matters, whether the exposure is right, whether the composition guides the eye, and whether it tells a story or is different from the others. I would rank them with stars and delete near-duplicates. Then I would show my top three to a classmate, because a second opinion can reveal what I can't see.",
      answers: [
        [
          "full",
          "[[0|I'd try eye level, a low angle looking up at the frame, a high angle from above, a close-up of the chain, and a view through the spokes.]] [[1|I'd ask: is it sharp where it matters, is the exposure right, does the composition guide the eye, and does it tell a story or differ from the others?]] [[2|I'd rank with stars and delete near-duplicates.]] [[3|Then I'd show my top three to a classmate, because a second opinion can reveal what I can't see.]]",
          "Full marks. A clear method for finding the strongest frame.",
        ],
        [
          "full",
          "[[0|Angles: crouching low with the wall behind, shooting from above at the handlebars, a tight shot of the rusty bell, a wide shot with the street, and a shot from behind the saddle.]] [[1|I'd judge each for sharpness, exposure, composition and emotion, and whether it shows something new.]] [[2|On the contact sheet I'd flag the best, and cull the ones that are almost the same.]] [[3|A friend could tell me which one they notice first, which shows what the image says to a viewer.]]",
          "Full marks. Asking which image a viewer notices first is useful.",
        ],
        [
          "partial",
          "[[0|Eye level and low.]] [[3|Ask a friend.]] I would pick the first photo I took and not look at the others.",
          "The first image is rarely the best. Review all of them with clear questions.",
        ],
        [
          "partial",
          "[[1|I'd check sharpness and exposure.]] [[2|I'd rank with stars.]] I would keep every photo, including duplicates, to be safe.",
          "Cull near-duplicates so the best images stand out.",
          true,
        ],
        [
          "weak",
          "One angle is enough because the subject doesn't change.",
          "Different angles change the composition and meaning.",
        ],
        [
          "weak",
          "I would pick the one with the most filters.",
          "Choose by sharpness, composition and story, not by effects.",
        ],
      ],
    },
    {
      prompt:
        "A photo of a lakeside at sunset has a tilted horizon, a histogram bunched at the left side, and an orange color cast from the lights of a nearby building. Describe the editing steps you would take, in a sensible order, explaining why you would keep the original, what you would do about the exposure and clipping, and why you would sharpen last.",
      scheme: [
        "Explains keeping the original file with non-destructive editing",
        "Describes cropping and straightening the horizon",
        "Describes raising exposure using the histogram while avoiding clipping, and correcting the white balance",
        "Explains sharpening last",
      ],
      model:
        "I would work non-destructively so that the original stays safe. First I would crop and straighten the horizon. The histogram bunched at the left means the photo is underexposed, so I would raise the exposure until the graph spreads out, without piling up against the right edge, which would clip the highlights. Then I would correct the white balance to remove the orange cast. I would sharpen last, because the earlier steps change the pixels, and sharpening before them would add artifacts.",
      answers: [
        [
          "full",
          "[[0|I'd edit non-destructively so the original stays safe.]] [[1|First I'd crop and straighten the horizon.]] [[2|The histogram bunched at the left means it's underexposed, so I'd raise the exposure until it spreads out without piling at the right edge, which would clip the highlights, and I'd correct the white balance to remove the orange cast.]] [[3|I'd sharpen last, because earlier changes alter the pixels and sharpening before them could add artifacts.]]",
          "Full marks. The order of steps is sensible and each is explained.",
        ],
        [
          "full",
          "[[0|I'd keep the original file and work on a copy or with edits that can be undone.]] [[1|The horizon needs to be rotated level and the crop tightened to remove the distracting building.]] [[2|I'd brighten the exposure while watching the histogram so neither end clips, then correct the white balance to cool down the orange.]] [[3|The final step is sharpening, since it works best on a finished image.]]",
          "Full marks. Removing the distracting building by cropping is smart.",
        ],
        [
          "partial",
          "[[1|Straighten the horizon.]] [[3|Sharpen last.]] Overwrite the original so I save space, and push the exposure until everything is white.",
          "Keep the original and avoid clipping highlights to pure white.",
        ],
        [
          "partial",
          "[[2|Raise the exposure and fix the white balance.]] [[0|Keep the original.]] Sharpen first so that the rest looks better.",
          "Sharpen last, once the other edits are done.",
          true,
        ],
        [
          "weak",
          "Editing is cheating. I would leave the photo as it is.",
          "Basic edits such as cropping and exposure are normal parts of photography.",
        ],
        [
          "weak",
          "Add as many filters as possible until it looks different.",
          "Edit to serve the photo, not to hide it.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Telling a story in pictures, and making portraits with care",
  note: `
## Objectives

Students will be able to:

1. create a photo essay that tells a story in a series of images;
2. shoot portraits and consider lighting, posing and the subject's comfort.

## Materials

Cameras, tripods, reflectors, a story planning sheet, a shot list template, photo essay examples, model releases, the problem set.

## Starter (6 minutes)

Show six photos in two different orders. Ask: "Does the story change with the order? What do you feel in each?" Introduce sequencing.

## Main activity

1. Photo essay: a series of 8 to 12 photographs that tells a story or explores a topic. Plan: choose a story you can access (a family business, a team, a neighborhood), ask permission, make a shot list. Types of shots: establishing (the place), medium (people in context), detail (hands, objects), portrait (a person), action, and a closing image. Vary angles and distances. Sequence for flow and rhythm; write short captions that add information without repeating what the photo shows. Great essays show change, not just one moment.
2. Portraits: lighting (window light at about 45 degrees to the face for soft, shaped light; reflect light into shadows; avoid harsh overhead sun that makes dark eye sockets; catchlight in the eyes). Camera: longer focal length (about 85 mm on a full-frame camera) is flattering; f/2.8 to f/5.6 keeps the eyes sharp and blurs the background; focus on the nearest eye. Posing: relaxed shoulders; angle the body slightly; chin slightly forward and down; give the hands something to do; show the person, not a stiff pose; talk and wait for natural expression.
3. Subject's comfort: ask for consent; explain what you are doing and how the photos will be used; show the back of the camera; take breaks; be respectful of culture and personal boundaries; never force a pose; get a parent or guardian's permission for minors; delete on request when appropriate.

## Problem set

Plan an essay and a portrait session.
`,
  reading: [
    "Stories in a series, and people at ease",
    `
One photograph can be powerful, but a series can tell a **story**. A **photo essay** is a group of eight to twelve images that explores a topic or follows a story. Start by choosing a subject that you can reach and care about: a family business, a team, a street, a person's day. Ask for **permission**, and spend time before you shoot so that you understand your subject. Make a **shot list** so that you cover different kinds of pictures. An **establishing shot** shows the place. **Medium shots** show people in context. **Detail shots** capture hands, tools and objects. A **portrait** introduces a person. An **action** shot shows something happening, and a **closing image** gives a sense of ending. Vary your **angles** and **distances**, since a series of identical frames becomes dull.

The **sequence** of the images matters. Arranging them changes how the story feels, in the way that the order of sentences changes a paragraph. Look for flow, rhythm and contrast: alternate wide and close images, and begin and end with strong frames. Write short **captions** that add information, such as names, places and facts, without just describing what we can already see. The best essays show **change** or tension, not just a single moment.

**Portraits** require special attention. For **lighting**, soft light from a large window, with the subject turned about 45 degrees to it, shapes the face gently. A reflector or white card can fill the shadows. Avoid harsh overhead sun that casts dark shadows over the eyes. A small bright reflection in the eyes, a **catchlight**, makes a portrait look alive. For camera settings, a slightly longer lens, such as 85 mm on a full-frame camera, is flattering to faces, and an aperture from f/2.8 to f/5.6 keeps the eyes sharp while softening the background. **Focus on the nearest eye.** For **posing**, ask the subject to relax the shoulders, angle the body slightly toward the camera, bring the chin slightly forward and down, and give the hands something to do. Talk with the person and wait for a natural expression, since the best portrait shows who they are.

Above all, respect the **comfort of your subject**. Ask for **consent** and explain how the pictures will be used. Show them images on the back of the camera. Offer breaks, never force a pose, and be sensitive to culture and personal boundaries. For anyone under 18, get permission from a parent or guardian. A comfortable subject gives you a better photograph, and a trusting relationship.
`,
  ],
  cards: [
    ["Photo essay", "A series of photographs that tells a story."],
    ["Shot list", "A plan of the pictures you need."],
    ["Establishing shot", "A wide image that shows the place."],
    ["Detail shot", "A close image of hands, tools or objects."],
    ["Sequence", "The order of images in a series."],
    ["Catchlight", "A small bright reflection in the eyes."],
    ["Consent", "Permission given freely by the subject."],
    ["Caption", "Short text that adds information to a photo."],
  ],
  closed: [
    [
      "Which shot shows the place where a story happens?",
      ["Establishing shot", "Detail shot", "Closing image", "Selfie"],
      "A",
    ],
    [
      "About how many images does a typical photo essay have?",
      ["1", "3", "8 to 12", "200"],
      "C",
    ],
    [
      "On which part of a portrait subject should you focus?",
      ["The nearest eye", "The ear", "The background", "The shoes"],
      "A",
    ],
    [
      "What should you do before photographing a minor?",
      ["Get permission from a parent or guardian", "Nothing", "Hide the camera", "Delete the photos"],
      "A",
    ],
    [
      "A good caption should:",
      ["Add information without repeating the picture", "Repeat exactly what we see", "Be as long as possible", "Be blank"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Plan a photo essay of ten images about a local business (such as a family bakery). List the kinds of shots and give at least one specific image for each of five different types, explain how you would sequence the essay to start and end, and write one caption that adds information without repeating the picture. State how you would get permission.",
      scheme: [
        "Lists five different types of shots with a specific image for each",
        "Describes a sequence with a strong opening and a closing image",
        "Writes a caption that adds information beyond what is visible",
        "Describes asking permission and how the photos will be used",
      ],
      model:
        "Establishing: the bakery's storefront at dawn. Medium: the baker shaping loaves at the counter. Detail: flour-dusted hands. Portrait: the owner by the oven. Action: a customer receiving a warm loaf. I would open with the dark storefront and a glowing window, alternate wide and close images through the day, and end with the empty shop at night. Caption: \"Maria Lopez opens the shop at 4 a.m. every day to bake 120 loaves.\" I would ask the owner in person, explain the project and how the photos will be shared, and get her permission in writing.",
      answers: [
        [
          "full",
          "[[0|Establishing: the storefront at dawn. Medium: the baker shaping loaves. Detail: flour-dusted hands. Portrait: the owner by the oven. Action: a customer receiving a warm loaf.]] [[1|I'd open with the dark storefront and glowing window, alternate wide and close images through the day, and end with the empty shop at night.]] [[2|Caption: 'Maria Lopez opens the shop at 4 a.m. every day to bake 120 loaves.']] [[3|I'd ask the owner in person, explain how the photos will be shared and get her permission in writing.]]",
          "Full marks. The caption adds facts the picture cannot show.",
        ],
        [
          "full",
          "[[0|Establishing: the sign over the door. Medium: two workers frosting cakes. Detail: a hand piping icing. Portrait: the owner's grandson at the register. Action: a cake box being tied.]] [[1|The essay starts with the first light turning on and ends on the final customer of the day, with wide and close pictures alternating.]] [[2|Caption: 'The recipe for these cookies has been in the family since 1962.']] [[3|I'd visit first, explain the project, and ask the owner for permission and a release before shooting.]]",
          "Full marks. A caption with a date adds real information.",
        ],
        [
          "partial",
          "[[0|Six photos of the bread.]] [[3|I'd ask permission.]] The caption says 'bread,' and the order doesn't matter.",
          "Vary the types of shots, plan the sequence, and make captions that add information.",
        ],
        [
          "partial",
          "[[1|Open with the storefront and end at night.]] [[2|Caption with the name and time.]] I'd take the photos without asking since it's a public business.",
          "Ask for permission and explain how the photos will be used.",
          true,
        ],
        [
          "weak",
          "A photo essay is one photo with a lot of text.",
          "A photo essay is a series of images that tells a story.",
        ],
        [
          "weak",
          "I'd take identical wide shots ten times to be safe.",
          "Vary angles and distances so the essay stays interesting.",
        ],
      ],
    },
    {
      prompt:
        "You are photographing a portrait of a nervous classmate in a window-lit room. Describe your lighting setup (window direction, reflector, avoiding harsh light), your camera choices (lens length, aperture, focus point), your posing suggestions, and at least three things you would do to make the classmate comfortable and respect their consent.",
      scheme: [
        "Describes the lighting setup with a window at about 45 degrees and a reflector",
        "Describes camera choices: lens around 85 mm, f/2.8 to f/5.6, focus on the nearest eye",
        "Describes posing suggestions",
        "Describes at least three comfort and consent actions",
      ],
      model:
        "I would seat my classmate with the window at about 45 degrees to the face and use a white card to bounce light into the shadow side, avoiding overhead lights. I would use a lens around 85 mm at f/4 and focus on the nearest eye. I would suggest relaxed shoulders, a slight body angle and the chin a little forward and down. To keep my classmate comfortable, I would explain how the photo will be used and get consent, show the back of the camera, chat and take breaks, and never force a pose.",
      answers: [
        [
          "full",
          "[[0|I'd seat my classmate with the window at about 45 degrees to the face and bounce light into the shadow side with a white card, avoiding overhead lights.]] [[1|I'd use a lens around 85 mm at f/4 and focus on the nearest eye.]] [[2|I'd suggest relaxed shoulders, a slight body angle and the chin a little forward and down.]] [[3|I'd explain how the photo will be used and get consent, show the back of the camera, chat and take breaks, and never force a pose.]]",
          "Full marks. The setup, settings, posing and respect are all covered.",
        ],
        [
          "full",
          "[[0|The window is to one side, soft light shapes the face, and a foil reflector on the other side lifts the shadow and gives a catchlight.]] [[1|I'd shoot at about 85 mm, f/2.8 so the background blurs, and focus on the eye nearest the camera.]] [[2|I'd ask her to relax her shoulders, turn slightly, and give her hands something to hold.]] [[3|I'd ask what she's comfortable with, tell her how I'll share the images, let her review the shots, take breaks, and talk about something she enjoys.]]",
          "Full marks. Letting the subject review the shots builds trust.",
        ],
        [
          "partial",
          "[[0|Use the window.]] [[1|85 mm at f/4.]] I'd tell the classmate to stand stiff and not smile, and I wouldn't explain anything.",
          "Relaxed posing and clear communication help a nervous subject.",
        ],
        [
          "partial",
          "[[2|Relaxed shoulders and chin slightly down.]] [[3|Ask for consent.]] I'd use the harshest overhead light I can find.",
          "Harsh overhead light makes dark shadows over the eyes. Use soft window light.",
          true,
        ],
        [
          "weak",
          "A portrait is a quick snapshot. Preparing is a waste of time.",
          "A thoughtful setup and a relaxed subject make a better portrait.",
        ],
        [
          "weak",
          "Consent is not needed because we are friends.",
          "Always ask for consent and explain how the photo will be used.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Building a series, and trying long exposure, black and white and macro",
  note: `
## Objectives

Students will be able to:

1. create a series on a theme such as place, identity or light;
2. experiment with a technique such as long exposure, black and white, or macro.

## Materials

Cameras, tripods, remote shutter or timer, ND filters (if available) or a dark filter card, a macro lens or close-up filters (if available), a small reflector, the theme planning sheet, the worksheet.

## Starter (6 minutes)

Show a series of five photos of the same window at different times of the day. Ask: "What stays the same? What changes? What does the series say that one photo can't?"

## Main activity

1. Series on a theme: a series has a clear idea and a visual thread. Themes: place (a neighborhood, a route), identity (hands, objects, rooms, portraits that reveal who someone is), light (the same location at different times, window light, shadows). To build a series: choose a theme and write a sentence about it; decide on the visual thread (a consistent angle, a color, a viewpoint, a format); shoot many; select five to ten that work as a set; check variety within unity.
2. Long exposure: a slow shutter speed (1 second to 30 seconds) blurs moving water, clouds and car lights while the still parts stay sharp. Needs: a tripod, remote or timer, low ISO, small aperture; in daylight use an ND (neutral density) filter that blocks light. Calculation: a 10-stop ND filter multiplies the exposure time by 2 to the 10th power, 1024. A scene that needed 1/125 s needs about 1024/125 = 8.2 s with the filter. A 3-stop filter multiplies by 8: 1/60 s becomes 8/60, about 1/8 s.
3. Black and white: removes color so that tone, contrast, texture, shape and light matter; shoot RAW and convert; look for strong contrast and texture; use color filters (red darkens skies) or edit mixers; no 'gray, flat' images: aim for deep blacks and bright whites.
4. Macro: close-up photography (true macro is 1:1 magnification); very shallow depth of field, so use a smaller aperture (f/8 to f/16) and a tripod, focus carefully (move the camera, not the focus ring), diffuse light; subjects: leaves, insects, water drops, textures.

## Worksheet

Plan a series and test one technique.
`,
  reading: [
    "More than one picture, and new ways to see",
    `
A good **series** is more than a pile of pictures. It has a clear **idea** and a visual **thread** that ties the images together. Common themes are **place** (a neighborhood, a route you walk each day), **identity** (hands, rooms, objects or portraits that reveal who someone is) and **light** (one location at different times of day, window light, shadows). To build a series, first write one sentence about your theme. Then decide on the thread: a consistent angle, a color, a viewpoint or a format, such as always shooting from the doorway. Shoot many images, select five to ten that work as a set, and check for **variety within unity**: the pictures should feel related but not identical. Ask what the series says that a single picture cannot.

Trying a new **technique** is a good way to see differently. In **long exposure**, you use a slow shutter speed, from about one second to thirty seconds, so that moving subjects, such as water, clouds and car lights, blur into soft streaks while the still parts stay sharp. You need a **tripod**, a remote or the timer to avoid shaking, a low ISO and a small aperture. In bright daylight, the shutter would let in too much light, so photographers use a **neutral density (ND) filter**, a dark glass that reduces light without changing color. A 10-stop ND filter multiplies the exposure time by 2 to the power of 10, which is 1,024. A scene that needed 1/125 s now needs about 1,024 / 125, around 8.2 seconds, which will turn a waterfall into silk. A 3-stop filter multiplies the time by 8, so 1/60 s becomes 8/60 s, about 1/8 s.

In **black and white**, with the color removed, the viewer's eye turns to **tone, contrast, texture, shape and light**. Shoot in RAW and convert, since this gives you more control. Look for strong contrast and interesting textures. A red filter, or the matching color slider in your software, darkens a blue sky and makes clouds stand out. Avoid flat gray images: aim for deep blacks and bright whites, with a range of tones in between.

In **macro** photography, you get very close to small subjects, such as leaves, insects, water drops and textures. True macro means the subject appears on the sensor at life size, or **1:1**. At such close range, the **depth of field** is extremely shallow, only a sliver of the subject is sharp. Use a smaller aperture (f/8 to f/16), a tripod, soft light, and focus carefully, often by moving the camera slightly back and forth instead of turning the focus ring. Each technique teaches you something that you can bring back to your everyday work.
`,
  ],
  cards: [
    ["Series", "A group of related photos with a shared idea."],
    ["Visual thread", "A repeated feature that ties a series together."],
    ["Long exposure", "A slow shutter speed that blurs motion."],
    ["ND filter", "A filter that reduces light without changing color."],
    ["Macro", "Close-up photography of small subjects."],
    ["1:1 magnification", "The subject is life-size on the sensor."],
    ["Tonal range", "The span from dark to light tones."],
    ["Variety within unity", "Related images that are not identical."],
  ],
  closed: [
    [
      "A 10-stop ND filter multiplies exposure time by about:",
      ["10", "100", "1,024", "10,000"],
      "C",
    ],
    [
      "A 3-stop ND filter multiplies exposure time by:",
      ["3", "6", "8", "30"],
      "C",
    ],
    [
      "Why use a tripod for a long exposure?",
      ["To avoid camera shake during the long shutter time", "To make the picture darker", "To change colors", "To add noise"],
      "A",
    ],
    [
      "In macro photography, depth of field is:",
      ["Very shallow", "Very deep", "The same as a landscape", "Unlimited"],
      "A",
    ],
    [
      "Which is a good theme for a series?",
      ["Light at different times of day", "Nothing in particular", "Random photos", "A single frame"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A scene at a small waterfall meters at f/11, 1/60 s, ISO 100. You want a silky effect of about 1/4 second or longer. Calculate how many stops of ND filter would give about 1/4 s (starting from 1/60 s), and the exposure time with a 6-stop filter. Then list the equipment and settings you would use to avoid shake and keep the image sharp.",
      scheme: [
        "Calculates that 1/60 to 1/4 is about 15 times longer, so about 4 stops of ND (16 times)",
        "Calculates a 6-stop filter multiplies by 64, so 1/60 becomes about 1.07 s",
        "Lists a tripod and a remote or timer",
        "Lists low ISO and a small aperture, and explains why",
      ],
      model:
        "From 1/60 s to 1/4 s is 15 times longer, which is about 4 stops (a factor of 16). With a 6-stop filter the time is multiplied by 64, so 1/60 s becomes about 64/60, or 1.07 seconds. I would use a tripod and a remote or the 2-second timer to avoid shake, keep the ISO at 100 and the aperture small to keep exposure long and the image sharp.",
      answers: [
        [
          "full",
          "[[0|1/60 s to 1/4 s is about 15 times longer, which is about 4 stops (16 times).]] [[1|A 6-stop filter multiplies by 64, so 1/60 s becomes about 64/60, which is roughly 1.07 seconds.]] [[2|I'd mount the camera on a tripod and use a remote or the 2-second timer.]] [[3|I'd keep ISO 100 and a small aperture, which keep the exposure long and the image sharp.]]",
          "Full marks. The stop arithmetic and the equipment are right.",
        ],
        [
          "full",
          "[[0|Each stop doubles the time, so 4 stops is 16 times: 1/60 × 16 is about 1/4 s.]] [[1|With 6 stops it is 64 times, so about 1 second.]] [[2|A sturdy tripod and a remote release keep the camera still.]] [[3|Low ISO gives clean images, and f/11 or smaller maintains depth of field and allows the slow shutter.]]",
          "Full marks. Doubling for each stop is the heart of the method.",
        ],
        [
          "partial",
          "[[0|About 4 stops.]] [[2|Use a tripod.]] A 6-stop filter multiplies by 6, so 6/60 s, which is 0.1 s. Use a high ISO.",
          "Each stop doubles the time: 6 stops is 2 to the 6th power, which is 64. And use a low ISO.",
        ],
        [
          "partial",
          "[[1|About 1 second with 6 stops.]] [[3|Low ISO and a small aperture.]] 1/60 to 1/4 is about 2 times longer.",
          "1/4 is 15 times longer than 1/60, so about 4 stops.",
          true,
        ],
        [
          "weak",
          "Hold the camera by hand and shake it for the blur.",
          "A long exposure needs a steady camera so only the water blurs.",
        ],
        [
          "weak",
          "ND filters make the picture black and white.",
          "ND filters reduce light without changing color.",
        ],
      ],
    },
    {
      prompt:
        "Propose a series of six photographs on the theme of light in one location (such as your kitchen window). State your theme sentence, the visual thread, six planned images, and choose one technique (long exposure, black and white or macro) for at least one image, explaining what it adds. Say how you would check variety within unity.",
      scheme: [
        "States a clear theme sentence and a visual thread",
        "Lists six planned images with variety",
        "Chooses a technique for at least one image and explains what it adds",
        "Explains how to check variety within unity",
      ],
      model:
        "Theme: how morning light changes the kitchen. Thread: every photo is shot from the doorway at the same height. Images: dawn blue, first sun on the table, steam rising in a beam, midday flat light, golden evening, and a night shot with the lamp. I would shoot the steam in black and white to emphasize the beam's contrast against the dark. I would check variety within unity by laying all six side by side, making sure that they share the viewpoint but differ in time, color and mood.",
      answers: [
        [
          "full",
          "[[0|Theme: how morning light changes the kitchen. Thread: every photo is shot from the doorway at the same height.]] [[1|Images: dawn blue, first sun on the table, steam in a beam of light, flat midday, golden evening, and a night shot with the lamp.]] [[2|I'd shoot the steam in black and white to emphasize the beam's contrast against the dark.]] [[3|I'd lay all six side by side to make sure they share a viewpoint but differ in time, color and mood.]]",
          "Full marks. A clear thread with variety in time and mood.",
        ],
        [
          "full",
          "[[0|My theme is shadows through my window, and the thread is a square crop with the same corner of the room.]] [[1|Six photos: the 8 a.m. stripes, noon blur, a long afternoon shadow, a curtain moving, a plant's shadow, and dusk.]] [[2|For the curtain, a long exposure on a tripod would turn the movement into soft blur.]] [[3|I'd print all six small and check they feel like a family but don't repeat.]]",
          "Full marks. Choosing long exposure for the moving curtain fits the idea.",
        ],
        [
          "partial",
          "[[0|My theme is light.]] [[1|Six photos of light.]] I won't need a technique or any check, since they are all photos.",
          "Plan different images, choose a technique and check variety within unity.",
        ],
        [
          "partial",
          "[[2|Black and white for the steam.]] [[3|Check that they are related but different.]] The thread is that every photo is taken somewhere random.",
          "A visual thread ties the series together, such as a consistent viewpoint.",
          true,
        ],
        [
          "weak",
          "A series is six copies of the same picture.",
          "A series has related images with variety.",
        ],
        [
          "weak",
          "Techniques are for professionals only and I will never try one.",
          "Trying a technique helps you see differently.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Preparing images for print and web, presenting a portfolio, and critique",
  note: `
## Objectives

Students will be able to:

1. prepare images for print and for the web at the right size and resolution;
2. present a portfolio with titles and captions;
3. take part in a critique and give feedback using a shared vocabulary.

## Materials

Image files, editing software, a sample print on matte and glossy paper, ruler, calculators, portfolio layout templates, critique cards, the worksheet.

## Starter (6 minutes)

Show a photo that looks crisp on a phone and blurry on a large print. Ask: "Why does the same file look different?" Introduce pixels and resolution.

## Main activity

1. Print: resolution is measured in pixels per inch (ppi). A good print uses about 300 ppi. Pixels needed = print size in inches x ppi. An 8 by 10 inch print at 300 ppi needs 2,400 x 3,000 pixels, which is 7.2 megapixels. An 11 by 14 inch print needs 3,300 x 4,200 pixels (13.86 megapixels). A 24 megapixel camera makes a 6,000 x 4,000 pixel image, so at 300 ppi it prints 20 by 13.3 inches. Choose paper (matte reduces glare; glossy gives deeper blacks), soft-proof colors, and print a test.
2. Web: what matters is pixel dimensions, not ppi. Typical: 2,000 pixels on the long edge for full-screen viewing, 1,200 pixels for a web gallery; sRGB color space; JPEG quality 80 to 90 percent; keep file size under about 1 megabyte for fast loading; add alt text (a short description) for accessibility.
3. Portfolio: select 10 to 15 of your best images; sequence them with variety and flow; give each a title and a caption (what, where, why); include a short artist statement; present consistently in print or online; put the strongest first and last.
4. Critique with a shared vocabulary: composition, exposure, depth of field, tonal range, light quality, moment, narrative, intent. Use the pattern: describe, analyze, interpret, evaluate. Be specific and kind.

## Worksheet

Calculate sizes and plan a portfolio.
`,
  reading: [
    "The right size for the right use, and showing your best work",
    `
A digital photograph is made of **pixels**, tiny squares of color. How large you can print it, and how sharp it looks, depends on how many pixels you have. **Resolution** is measured in pixels per inch (**ppi**). For a good quality print, a common target is **300 ppi**. To find the pixels that you need, multiply the print size in inches by 300. An 8 by 10 inch print needs 2,400 by 3,000 pixels (8 x 300 and 10 x 300), which is 7.2 million pixels, or 7.2 **megapixels**. An 11 by 14 inch print needs 3,300 by 4,200 pixels, almost 13.9 megapixels. A 24-megapixel camera typically makes images 6,000 by 4,000 pixels, so at 300 ppi it can print 6,000 / 300 = 20 inches by 4,000 / 300 = 13.3 inches. Choose your **paper** too: matte paper reduces glare, while glossy gives deeper blacks and brighter color. Check your colors with a **soft proof**, a preview of how they will print, and make a small test print before a large one.

For the **web**, the rules are different. What matters is the **pixel dimensions**, since screens display pixels directly. A common size for full-screen viewing is about **2,000 pixels** on the long edge, and **1,200 pixels** for a web gallery. Use the **sRGB** color space, which most screens understand, and save as **JPEG** at 80 to 90 percent quality to keep the file under about **1 megabyte**, so that pages load quickly. Add **alt text**, a short description of the image, so that people who use screen readers can understand it.

A **portfolio** is a curated collection of your best work. Choose **10 to 15** images, sequence them with variety and flow, and put the strongest first and last. Give each a **title** and a **caption** (what, where and why, in a sentence or two). Add a brief **artist statement**. Present everything consistently, whether in a printed book or online.

Finally, learn to give and receive **critique** with a **shared vocabulary**: composition, exposure, depth of field, tonal range, quality of light, moment, narrative and intent. A reliable pattern is **describe, analyze, interpret, evaluate**. Be specific and kind ("The side light on the hands gives the picture texture. I wonder if cropping the left side would strengthen the focus"), and listen without defending when it is your work. A good critique helps you to see your picture the way others see it.
`,
  ],
  cards: [
    ["Pixel", "A tiny square of color in a digital image."],
    ["ppi", "Pixels per inch; a measure of print resolution."],
    ["Megapixel", "One million pixels."],
    ["sRGB", "A standard color space for screens."],
    ["Soft proof", "A screen preview of how a print will look."],
    ["Alt text", "A short description of an image for accessibility."],
    ["Portfolio", "A curated collection of your best work."],
    ["Caption", "Short text explaining what, where and why."],
  ],
  closed: [
    [
      "How many pixels wide is an 8-inch print at 300 ppi?",
      ["800", "1,800", "2,400", "3,000"],
      "C",
    ],
    [
      "A 6,000 by 4,000 pixel image at 300 ppi prints how wide on the long side?",
      ["10 inches", "13.3 inches", "20 inches", "30 inches"],
      "C",
    ],
    [
      "For the web, which matters most?",
      ["Pixel dimensions", "Print size in inches", "Paper type", "Frame style"],
      "A",
    ],
    [
      "What is alt text for?",
      ["Describing an image for people using screen readers", "Changing the color", "Making it print larger", "Hiding the image"],
      "A",
    ],
    [
      "Where should the strongest portfolio images go?",
      ["First and last", "Hidden in the middle", "Nowhere", "Only in the middle"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "You want to print a photo at 11 by 14 inches at 300 ppi. Calculate the pixel dimensions and megapixels needed (to two decimal places). Your camera makes 6,000 by 4,000 pixel images, so state whether the file has enough pixels for the long side, and what the largest print size at 300 ppi would be. Then say what size you would save the same photo for a web gallery and why.",
      scheme: [
        "Calculates the print as 3,300 by 4,200 pixels",
        "Calculates 13.86 megapixels",
        "Compares to the camera: 6,000 by 4,000 gives 20 by 13.3 inches, so the long side has enough pixels (but the 14 inch side of 4,200 exceeds 4,000 on the short side, so crop or print slightly smaller)",
        "Gives a web size such as 1,200 to 2,000 pixels on the long edge, sRGB, and explains why",
      ],
      model:
        "11 by 14 inches at 300 ppi is 3,300 by 4,200 pixels, which is 13.86 megapixels. The camera's 6,000 by 4,000 pixels is 24 megapixels, which prints 20 by 13.3 inches at 300 ppi. The 6,000 pixel side covers the 4,200 needed, but the 4,000 pixel side is slightly short of 4,200, so the photo needs a small crop to an 11 by 14 shape or a print at 11 by 13.3 inches. For the web gallery, I would resize to about 1,200 pixels on the long edge in sRGB, because screens show pixels directly and a smaller file loads faster.",
      answers: [
        [
          "full",
          "[[0|11 × 300 = 3,300 and 14 × 300 = 4,200, so 3,300 by 4,200 pixels.]] [[1|3,300 × 4,200 is 13.86 million, or 13.86 megapixels.]] [[2|The camera's 6,000 by 4,000 pixels prints 20 by 13.3 inches at 300 ppi, so it's enough, though a 4:3 shape means the 14-inch side needs a crop or a print of about 11 by 13.3 inches.]] [[3|For the web I'd resize to about 1,200 pixels on the long edge in sRGB, since screens show pixels directly and a smaller file loads faster.]]",
          "Full marks. Noticing the aspect ratio issue is an expert detail.",
        ],
        [
          "full",
          "[[0|At 300 ppi I need 3,300 × 4,200 pixels.]] [[1|That is 13.86 megapixels, a bit more than half of my camera's 24.]] [[2|The camera has plenty of pixels in total, giving up to 20 by 13.3 inches, though the 4,000-pixel side is a little short of 4,200, so I'd crop slightly.]] [[3|For the web I'd save at 2,000 pixels on the long side as a JPEG in sRGB under 1 MB.]]",
          "Full marks. Recognizing that a crop solves the shape mismatch is exactly right.",
        ],
        [
          "partial",
          "[[0|3,300 by 4,200 pixels.]] [[3|The web needs smaller files.]] 11 × 14 is 154 megapixels. The camera doesn't need to be checked.",
          "Multiply the pixel dimensions: 3,300 times 4,200 is 13.86 million, 13.86 megapixels.",
        ],
        [
          "partial",
          "[[1|13.86 megapixels.]] [[2|The camera can print 20 by 13.3 inches.]] The web size should be 6,000 pixels so it is huge.",
          "Web images are usually about 1,200 to 2,000 pixels so they load quickly.",
          true,
        ],
        [
          "weak",
          "Any photo can be printed at any size with no loss of quality.",
          "A print needs enough pixels. Too few produces a soft, blocky image.",
        ],
        [
          "weak",
          "ppi is the number of photos in a portfolio.",
          "ppi stands for pixels per inch, a measure of resolution.",
        ],
      ],
    },
    {
      prompt:
        "Plan a 12-image portfolio from your term's work. Describe how you would choose and sequence the images, write a title and a caption for one image (with what, where and why), and use the describe, analyze, interpret, evaluate pattern to write critique feedback for a classmate's portrait with side lighting and a blurred background.",
      scheme: [
        "Describes choosing and sequencing 12 images with variety and strong first and last",
        "Writes a title and a caption with what, where and why",
        "Writes critique that describes and analyzes with photographic vocabulary",
        "Interprets and evaluates, with a kind and specific suggestion",
      ],
      model:
        "I would select twelve images from different projects, alternate close and wide images, and place my strongest portrait first and my best landscape last. Title: \"Four A.M.\" Caption: \"Maria Lopez shapes loaves at her family's bakery in Dayton before dawn, to show the work behind the morning.\" Critique: \"I see a portrait lit from the side, with a blurred background. The shallow depth of field and side light give the face shape and isolate her. It feels calm and serious. It works well, and I wonder whether cropping a little of the empty left side would strengthen the focus.\"",
      answers: [
        [
          "full",
          "[[0|I'd select twelve images from different projects, alternate close and wide, and place my strongest portrait first and my best landscape last.]] [[1|Title: 'Four A.M.' Caption: 'Maria Lopez shapes loaves at her family's bakery in Dayton before dawn, to show the work behind the morning.']] [[2|Critique: I see a portrait lit from the side with a blurred background; the shallow depth of field and side light give the face shape and isolate her.]] [[3|It feels calm and serious, and it works well; I wonder whether cropping a little of the empty left side would strengthen the focus.]]",
          "Full marks. The critique moves through all four steps with kindness.",
        ],
        [
          "full",
          "[[0|I'd pick the twelve strongest, remove near-duplicates, mix subjects and put the most powerful one first and a quiet closing image last.]] [[1|Title: 'Waiting for the Bus.' Caption: 'A student waits at the corner of Third Street at dawn; the long exposure blurs the passing cars to show how time moves around her.']] [[2|Critique: the light comes from the left and the background is soft, so the eye goes straight to her face.]] [[3|It feels patient and lonely, and I think it succeeds; a slightly lower angle might give the figure more presence.]]",
          "Full marks. A specific suggestion that does not reduce praise.",
        ],
        [
          "partial",
          "[[0|I'd put twelve photos in any order.]] [[1|Title: 'Photo.' Caption: 'A photo.']] Critique: it's good. I don't need to describe or suggest anything.",
          "Use a title and caption that add information, and a specific critique.",
        ],
        [
          "partial",
          "[[2|I see side lighting and a blurred background.]] [[3|It feels calm.]] I'd say the portrait is terrible and the photographer should quit.",
          "Critique should be kind and specific, with a helpful suggestion.",
          true,
        ],
        [
          "weak",
          "A portfolio is the camera bag. It contains cameras, not photos.",
          "A portfolio is a collection of your best work.",
        ],
        [
          "weak",
          "Critique is just for saying whether you like a picture or not.",
          "A critique describes, analyzes, interprets and evaluates.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Showing your work, and studying Dorothea Lange and Ansel Adams",
  note: `
## Objectives

Students will be able to:

1. exhibit your work in a print or online show;
2. analyze the work of a documentary or fine art photographer and explain the choices.

## Materials

Prints and mats, an online gallery tool, a floor plan of the display area, labels, images of Dorothea Lange's Migrant Mother (1936) and Ansel Adams's Moonrise, Hernandez, New Mexico (1941), an analysis chart, the worksheet.

## Starter (6 minutes)

Show two photographs of a person and a mountain, one documentary and one landscape. Ask: "What is each photographer trying to do?"

## Main activity

1. Exhibiting: select images that work together; order them for flow; print consistently (same paper and size) and mat or mount; label (name, title, year, medium); hang at about eye level with even spacing and without glare; or build an online show with a clear layout, consistent image sizes, titles, captions, alt text and an artist statement. Invite an audience, welcome visitors, and collect feedback.
2. Documentary photographers record real people and events, often to raise awareness. Dorothea Lange (1895 to 1965) worked for the Farm Security Administration during the Great Depression. Her Migrant Mother (1936), made at a pea pickers' camp in Nipomo, California, shows a worried mother with her children turned away. Choices: close framing, direct emotion, natural light, her hands near her face, the children's turned heads that keep the face of the mother as focus; the photograph drew attention to the plight of farm workers.
3. Fine art photographers aim at beauty and expression. Ansel Adams (1902 to 1984) photographed the American West, including Yosemite. He co-founded Group f/64 in 1932 (with Edward Weston and Imogen Cunningham), which valued sharp focus and deep depth of field using small apertures such as f/64. Moonrise, Hernandez, New Mexico (1941) is a black-and-white photograph of a moonrise above a village and crosses. Choices: a wide tonal range from deep black sky to bright clouds, careful darkroom work, patience for the exact light, and a large-format camera.
4. Analysis: ask what the photographer chose (subject, framing, moment, light, focus, tonal range, cropping) and why; what the photograph is for; how it makes you feel; how the context shapes it.

## Worksheet

Exhibition plan and photographer analysis.
`,
  reading: [
    "Showing your work, and learning from two masters",
    `
Making photographs is only half the work; the other half is **sharing** them. An **exhibition**, whether in prints or online, gives your images an audience. Start by selecting the pictures that work together and arranging them so that they have flow. For a **print show**, print on the same paper at consistent sizes, **mat** or mount them, and make labels with your name, the title, the year and the medium. Hang the pictures at about **eye level**, space them evenly and check for glare from windows or lights. For an **online show**, choose a clear layout, keep image sizes consistent, add titles and captions, write **alt text** for each image, and include an artist statement. In both cases, invite an audience, welcome visitors and ask for feedback.

Looking at the work of masters shows how choices shape meaning. **Documentary photographers** record real people and events, often to inform or to move audiences to act. **Dorothea Lange** (1895 to 1965) worked for the Farm Security Administration during the Great Depression. Her photograph *Migrant Mother* (1936), made at a camp for pea pickers in Nipomo, California, shows a worried woman with her children, who have turned their faces away. Several choices make it powerful: Lange moved **close**, so the frame is filled by the family; she used natural light; the mother's hand rests near her face in a gesture of worry; and the children's turned heads keep our eyes on the mother's expression. The image drew national attention to the hardship of migrant farm workers.

**Fine art photographers** aim at beauty, expression and personal vision. **Ansel Adams** (1902 to 1984) photographed the American West, particularly Yosemite. In 1932 he co-founded **Group f/64** with Edward Weston and Imogen Cunningham, a group that valued sharp focus and deep **depth of field**, made with very small apertures such as f/64. His photograph *Moonrise, Hernandez, New Mexico* (1941), in black and white, shows a moon over a small village with crosses in the foreground. His choices include a **wide tonal range**, from the deep black sky to the bright clouds and moon; patience in waiting for the exact light; careful work in the **darkroom**; and a large-format camera that captured fine detail.

To **analyze** a photograph, ask: *What did the photographer choose (subject, framing, moment, light, focus, tonal range, crop), and why? What is it for? How does it make me feel? How does its context shape it?* Comparing a documentary photograph with a fine art photograph shows that both involve deliberate choices, but toward different purposes.
`,
  ],
  cards: [
    ["Exhibition", "A public display of photographs."],
    ["Documentary photography", "Photography that records real people and events."],
    ["Fine art photography", "Photography made for personal expression and beauty."],
    ["Dorothea Lange", "Photographer of Migrant Mother (1936)."],
    ["Ansel Adams", "Photographer of the American West and Moonrise, Hernandez (1941)."],
    ["Group f/64", "A 1932 group valuing sharp focus and deep depth of field."],
    ["Tonal range", "The span from deep black to bright white."],
    ["Farm Security Administration", "A U.S. agency that documented rural life in the 1930s."],
  ],
  closed: [
    [
      "Who made Migrant Mother in 1936?",
      ["Dorothea Lange", "Ansel Adams", "Edward Weston", "Annie Leibovitz"],
      "A",
    ],
    [
      "Group f/64 valued:",
      ["Sharp focus and deep depth of field", "Blurry effects", "Only color", "Selfies"],
      "A",
    ],
    [
      "Moonrise, Hernandez, New Mexico was made in:",
      ["1841", "1941", "2001", "1741"],
      "B",
    ],
    [
      "At about what height should works be hung?",
      ["Eye level", "On the floor", "Above the door", "At the ceiling"],
      "A",
    ],
    [
      "Which describes documentary photography?",
      ["Recording real people and events", "Making fantasy scenes", "Only portraits of celebrities", "Only landscapes"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Analyze Dorothea Lange's Migrant Mother (1936). Describe the photograph, identify at least three choices she made (such as framing, light, gesture, the children's turned heads), explain what each does for the viewer, and say what the photograph was for.",
      scheme: [
        "Describes the photograph accurately",
        "Identifies at least three choices",
        "Explains the effect of each choice on the viewer",
        "States the purpose (drawing attention to the hardship of migrant farm workers)",
      ],
      model:
        "The photograph shows a worried mother at a pea pickers' camp in Nipomo, California, with her children turned away from the camera. Lange moved close, so the family fills the frame and we feel nearer to them. She used natural light, which makes the scene feel real. The mother's hand near her face shows worry, and the children's turned heads keep our eyes on the mother's expression. The photograph was made for the Farm Security Administration, and it drew national attention to the hardship of migrant farm workers.",
      answers: [
        [
          "full",
          "[[0|The photograph shows a worried mother at a pea pickers' camp in Nipomo, California, with her children turned away from the camera.]] [[1|Lange moved close so the family fills the frame, used natural light, placed the mother's hand near her face, and the children's turned heads keep us on the mother.]] [[2|Being close makes us feel nearer to them, the natural light makes it feel real, and the hand and turned heads focus our attention on her worry.]] [[3|It was made for the Farm Security Administration and drew national attention to the hardship of migrant farm workers.]]",
          "Full marks. Each choice is linked to its effect.",
        ],
        [
          "full",
          "[[0|Migrant Mother shows a woman in a tent camp with two children leaning on her shoulders, all in worn clothing.]] [[1|Choices: a tight crop, soft natural light, the mother's hand at her mouth, and the children facing away.]] [[2|The tight crop creates intimacy, the hand shows anxiety, and the turned heads let the viewer imagine the children's feelings while staying on her face.]] [[3|Its purpose was to document and publicize the plight of farm workers during the Depression.]]",
          "Full marks. 'Imagine the children's feelings' is a thoughtful reading.",
        ],
        [
          "partial",
          "[[0|It's a picture of a woman and children.]] [[3|It was to show hardship.]] The photographer made no choices, she just clicked the button.",
          "Every photograph involves choices such as framing, light and moment.",
        ],
        [
          "partial",
          "[[1|Close framing and natural light.]] [[2|Close framing feels intimate.]] It was taken by Ansel Adams in Yosemite for fun.",
          "Migrant Mother was made by Dorothea Lange for the Farm Security Administration.",
          true,
        ],
        [
          "weak",
          "Documentary photos have no purpose, they are just pretty.",
          "Documentary photographs often aim to inform or move audiences to act.",
        ],
        [
          "weak",
          "It was made recently with a phone.",
          "Migrant Mother was made in 1936.",
        ],
      ],
    },
    {
      prompt:
        "Compare Lange's documentary approach with Ansel Adams's fine art approach in Moonrise, Hernandez, New Mexico (1941). Explain the purpose of each, two technical or aesthetic choices Adams made (such as tonal range, patience for light, darkroom, large format, or f/64 principles), and how you would apply what you learned from one of them in your own photography.",
      scheme: [
        "States the documentary purpose of Lange and the fine art purpose of Adams",
        "Explains one choice by Adams accurately (tonal range, patience, darkroom or large format)",
        "Explains a second choice or the Group f/64 principles",
        "Describes how the student would apply a lesson to their own photography",
      ],
      model:
        "Lange's purpose was to document real people and raise awareness of hardship, while Adams's purpose was to express the beauty and grandeur of landscape. In Moonrise, Adams used a wide tonal range, from a deep black sky to bright clouds and moon, and waited for the exact light. As a member of Group f/64 he valued sharp focus and deep depth of field with small apertures and a large-format camera. In my own work, I will practice waiting for the right light and checking my histogram to keep a full tonal range.",
      answers: [
        [
          "full",
          "[[0|Lange's purpose was to document real people and raise awareness of hardship; Adams's was to express the beauty and grandeur of the landscape.]] [[1|In Moonrise, Adams used a wide tonal range from a deep black sky to bright clouds and moon, and waited for the exact light.]] [[2|As part of Group f/64 he valued sharp focus and deep depth of field, using small apertures and a large-format camera.]] [[3|In my own work I'll practice waiting for the right light and check my histogram to keep a full tonal range.]]",
          "Full marks. The two approaches are contrasted and a lesson is applied.",
        ],
        [
          "full",
          "[[0|Lange documented a social problem for a government agency, while Adams made personal, artistic images of nature.]] [[1|Adams worked carefully in the darkroom to control tones from deep black to bright white.]] [[2|With Group f/64 he used small apertures so everything from foreground to the horizon was sharp.]] [[3|I'll apply his patience by returning to the same place at different times to wait for the best light, and use a small aperture for landscapes.]]",
          "Full marks. Returning to the same place for better light is practical.",
        ],
        [
          "partial",
          "[[0|Adams took pictures of mountains and Lange took pictures of people.]] [[3|I'll use what I learned.]] Adams used a blurry, soft focus to make it dreamy.",
          "Adams and Group f/64 valued sharp focus and deep depth of field.",
        ],
        [
          "partial",
          "[[1|Adams used a wide tonal range.]] [[2|Group f/64 was about sharp focus.]] Moonrise was made in 1841 and Lange's purpose was to make landscapes.",
          "Moonrise was made in 1941, and Lange documented people to raise awareness.",
          true,
        ],
        [
          "weak",
          "Both are the same kind of photography with the same purpose.",
          "Documentary and fine art photography often have different purposes.",
        ],
        [
          "weak",
          "I can't learn from other photographers because my camera is different.",
          "The ideas of light, patience and tone apply to any camera.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Editing ethics, and how photography changed the world",
  note: `
## Objectives

Students will be able to:

1. explain how an image can be altered and the ethical limits of editing;
2. describe how photography has changed society, from photojournalism to social media.

## Materials

Case studies (the 1982 National Geographic pyramids cover; the 2003 Los Angeles Times Iraq composite by Brian Walski), the National Press Photographers Association code of ethics (summary), before-and-after examples, a society-and-photography timeline, the quiz.

## Starter (6 minutes)

Show two versions of a landscape photo, one natural and one with an added dramatic sky. Ask: "Is the second one a lie? What if it appeared in a newspaper? In a gallery? In an ad?" Discuss context.

## Main activity

1. Ways images are altered: cropping, color and tone adjustments, dodging and burning (lightening and darkening), retouching (removing blemishes or objects), compositing (combining images), staging, and now AI-generated or AI-edited images. Some changes are routine and expected; others change what the picture claims about reality.
2. Ethical limits depend on context and honesty. Photojournalism and documentary work follow strict codes: the National Press Photographers Association code says to avoid altering the editorial content of photographs in ways that mislead. Cases: in 1982, National Geographic moved two Egyptian pyramids closer together by computer to fit a vertical cover; the editor later called it a mistake and the magazine changed its policy. In 2003, the photographer Brian Walski combined two frames of a British soldier in Iraq into one image for the Los Angeles Times; it was discovered and he was dismissed. Art and advertising allow more manipulation, but disclosure helps: label composites and AI-generated images; consider harm (misleading the public, body image).
3. Photography changed society: photojournalism brought distant events to viewers (the Civil War photographs of Mathew Brady's studio, 1860s); Lewis Hine's photographs of child laborers (about 1908 to 1918) for the National Child Labor Committee helped build support for child labor laws; war and protest images shaped public opinion (for example, Nick Ut's 1972 photograph from the Vietnam War); family snapshots democratized memory; smartphones and social media let anyone publish instantly, which spreads news and creativity quickly but also misinformation and privacy risks.

## Quiz

Alterations, cases and impact.
`,
  reading: [
    "What you may change in a photograph, and what photographs have changed",
    `
Every photograph is made by choices, but some **alterations** go further than others. Photographers **crop** to improve the frame and **adjust** brightness, contrast and color. In the darkroom, they used **dodging** (lightening) and **burning** (darkening) to guide the eye, and these remain common in editing software. **Retouching** removes blemishes, dust or objects. **Compositing** combines parts of several images into one. Staging arranges a scene before shooting, and today **AI tools** can generate or extensively alter images. Some changes are routine, and viewers expect them. Others change what the picture claims about reality.

Where is the **ethical limit**? It depends on the **context** and on **honesty**. In **photojournalism** and **documentary** work, readers trust that the image is a record, so the rules are strict. The code of ethics of the National Press Photographers Association says not to alter the editorial content of photographs in a way that misleads. Two famous cases show what is at stake. In **1982**, *National Geographic* used a computer to move two Egyptian pyramids closer together so that the picture would fit a vertical cover. The editor later admitted that it was a mistake, and the magazine changed its policy. In **2003**, the photographer **Brian Walski** combined two frames from Iraq, one of a British soldier and the other of civilians, into a single dramatic image for the *Los Angeles Times*. A reader noticed the duplicated figures, and Walski was dismissed. In **art** and **advertising**, viewers expect more manipulation, but honesty still matters: label composites and AI-generated images, and consider possible harm, such as misleading the public or creating unrealistic body images. A good test is: *Would the viewer feel deceived if they knew what I did?*

Photography has changed society in many ways. **Photojournalism** brought events from far away into people's homes, from the Civil War photographs published by **Mathew Brady's** studio in the 1860s to modern conflicts. **Lewis Hine's** photographs of child laborers, taken for the National Child Labor Committee from about 1908 to 1918, helped to build support for laws against child labor. Powerful images of war and protest, such as **Nick Ut's** 1972 photograph from the Vietnam War, shaped public opinion. **Snapshots** made it possible for ordinary families to keep their own memories. Now **smartphones and social media** allow anyone to publish instantly, which spreads news, creativity and connection very quickly, but also **misinformation** and risks to **privacy**. Every photographer today has a responsibility to think about what they share and how.
`,
  ],
  cards: [
    ["Dodging and burning", "Lightening and darkening parts of an image."],
    ["Retouching", "Removing blemishes or objects from an image."],
    ["Compositing", "Combining parts of several images into one."],
    ["Photojournalism", "Photography that reports news."],
    ["NPPA code of ethics", "Rules for press photographers about honesty."],
    ["Lewis Hine", "Photographer whose child labor images helped bring reform."],
    ["Misinformation", "False or misleading information."],
    ["Disclosure", "Telling viewers how an image was made or altered."],
  ],
  closed: [
    [
      "What did National Geographic do to its 1982 cover?",
      ["Moved two pyramids closer together", "Added color to a black-and-white photo", "Removed a person", "Added a moon"],
      "A",
    ],
    [
      "Lewis Hine's photographs of child laborers helped build support for:",
      ["Child labor laws", "Space flight", "Color film", "Postage stamps"],
      "A",
    ],
    [
      "Which is a good test for editing ethics?",
      ["Would the viewer feel deceived if they knew?", "Is it popular?", "Is it large?", "Is it colorful?"],
      "A",
    ],
    [
      "In photojournalism, altering a photo to mislead is:",
      ["Against ethics codes", "Encouraged", "Required", "Irrelevant"],
      "A",
    ],
    [
      "A downside of social media sharing is:",
      ["Misinformation and privacy risks", "No audience", "Slower news", "No images"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Explain the difference between acceptable edits and unethical alteration in photojournalism, using the 1982 National Geographic pyramids and the 2003 Brian Walski case as examples. Give two acceptable edits, say what made each case a violation, and explain how the rules differ for art or advertising.",
      scheme: [
        "Names two acceptable edits (such as cropping, exposure and color adjustments)",
        "Explains the National Geographic pyramids case as a violation",
        "Explains the Walski case as a violation of honesty",
        "Explains that art and advertising allow more manipulation but disclosure and harm still matter",
      ],
      model:
        "Acceptable edits in photojournalism include cropping and adjusting exposure or color, because they do not change what happened. National Geographic moved two pyramids closer together in 1982, which changed what the picture claimed about the real scene, and the magazine called it a mistake. In 2003, Brian Walski combined two frames into a single image for the Los Angeles Times, which misled readers about a moment that never happened, and he was dismissed. Art and advertising allow more manipulation because viewers expect it, but labeling composites and avoiding harm still matter.",
      answers: [
        [
          "full",
          "[[0|Acceptable edits in photojournalism include cropping and adjusting exposure or color, because they don't change what happened.]] [[1|National Geographic moving two pyramids closer in 1982 changed what the picture claimed about the real scene, and the magazine called it a mistake.]] [[2|In 2003 Brian Walski combined two frames into one image for the Los Angeles Times, which showed a moment that never happened, and he was dismissed.]] [[3|Art and advertising allow more manipulation because viewers expect it, but labeling composites and avoiding harm still matter.]]",
          "Full marks. The cases are described accurately and linked to honesty.",
        ],
        [
          "full",
          "[[0|Minor tone and color corrections and a straight crop are fine for news.]] [[1|Moving the pyramids was a violation, since the cover implied that this is how the scene looks.]] [[2|Walski's composite invented a moment by merging two photographs, so readers were deceived and the newspaper fired him.]] [[3|For art or advertising, viewers know the picture may be changed, but it's still best to disclose composites or AI and avoid harm like unrealistic body images.]]",
          "Full marks. Naming the harm in advertising is a thoughtful addition.",
        ],
        [
          "partial",
          "[[0|Cropping is okay.]] [[3|Art can be edited more.]] The pyramids case was fine because it looked better, and Walski did nothing wrong.",
          "Both cases involved changes that misled readers about reality.",
        ],
        [
          "partial",
          "[[1|National Geographic moved the pyramids in 1982.]] [[2|Walski combined two frames.]] Photojournalists may add anything to improve a photo.",
          "Photojournalism codes forbid altering the content in ways that mislead.",
          true,
        ],
        [
          "weak",
          "All editing is lying, so photographers should never edit at all.",
          "Routine edits like cropping and exposure are accepted. Misleading alterations are the problem.",
        ],
        [
          "weak",
          "There are no rules in photography, so anything goes.",
          "Photojournalism has strict ethical codes about altering images.",
        ],
      ],
    },
    {
      prompt:
        "Describe three ways that photography has changed society, using at least two specific examples from this week (such as Mathew Brady, Lewis Hine, Nick Ut or social media). Explain one benefit and one risk of today's instant sharing, and one habit you will use as a responsible photographer.",
      scheme: [
        "Describes three ways photography changed society",
        "Uses at least two accurate specific examples",
        "Explains one benefit and one risk of instant sharing",
        "States a responsible habit",
      ],
      model:
        "Photography brought distant events to viewers, as with Mathew Brady's Civil War photographs in the 1860s. It helped win reforms, as Lewis Hine's photographs of child laborers did for child labor laws. It also democratized memory, since snapshots let ordinary families record their lives. Instant sharing on social media spreads news and creativity quickly, but also spreads misinformation and risks to privacy. As a responsible photographer, I will ask permission and think about how a photo might be used before I post.",
      answers: [
        [
          "full",
          "[[0|Photography brought distant events to viewers, helped win reforms, and made family memory available to ordinary people through snapshots.]] [[1|Examples: Mathew Brady's Civil War photographs in the 1860s and Lewis Hine's photographs of child laborers, which helped build support for child labor laws.]] [[2|Instant sharing spreads news and creativity quickly, but also spreads misinformation and risks to privacy.]] [[3|As a responsible photographer I'll ask permission and think about how a photo might be used before I post.]]",
          "Full marks. Three effects, accurate examples and a responsible habit.",
        ],
        [
          "full",
          "[[0|It showed the public things they could not see, it influenced opinion about wars and injustice, and it made cameras available to everyone.]] [[1|Nick Ut's 1972 photo from the Vietnam War and Hine's child labor images are examples of images that shaped public opinion.]] [[2|Social media lets people share events right away, which is powerful, but false or edited images can spread just as fast.]] [[3|I'll check a photo's source before I share it and not post pictures of people without their consent.]]",
          "Full marks. Checking the source is a vital habit.",
        ],
        [
          "partial",
          "[[0|Photography made pictures.]] [[3|I'll be careful.]] Social media has only benefits, no risks, and nothing changed in society.",
          "Photography has changed society in many ways, and sharing has risks such as misinformation.",
        ],
        [
          "partial",
          "[[1|Lewis Hine photographed child laborers.]] [[2|Sharing spreads misinformation.]] Mathew Brady photographed the Vietnam War.",
          "Mathew Brady's studio photographed the Civil War in the 1860s.",
          true,
        ],
        [
          "weak",
          "Photography changed nothing. People always knew everything.",
          "Photographs brought distant events to people and shaped opinion.",
        ],
        [
          "weak",
          "I should post any photo I take immediately without thinking.",
          "Think about consent, privacy and accuracy before posting.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Copyright, permission and people's rights, and careers",
  note: `
## Objectives

Students will be able to:

1. explain copyright and permissions for images and the rights of the people photographed;
2. explore careers in photography and visual communication.

## Materials

Case scenarios, a simplified model release form, examples of Creative Commons licenses, a careers chart, calculators, the problem set.

## Starter (6 minutes)

Ask: "A classmate posts your photograph on a business page without asking. Is that okay? What would you want?" Collect reactions.

## Main activity

1. Copyright: in the United States, copyright protection begins automatically when you create an original photograph and fix it in a file; the photographer is the owner unless the work is made for an employer (work for hire) or the right is transferred in writing. The owner controls copying, sharing, selling and making derivative works. To use someone else's photo: get permission or a license, use images in the public domain, or use Creative Commons-licensed images following the terms (for example, giving credit). "Found on the internet" does not mean free to use. Fair use is limited and judged case by case. Registration with the Copyright Office is generally required before a US work owner can file a lawsuit. Put your name in metadata and add a credit.
2. Rights of people photographed: in public places in the US, people generally have no expectation of privacy, so you may usually photograph what is in public view, but using a person's image commercially (advertising, products) requires a signed model release. A property release applies to private property. Minors need a parent or guardian's consent. Ethics go beyond law: dignity, consent, sensitivity in difficult situations; ask yourself if the subject would object. Follow school and venue rules.
3. Careers: photojournalist, portrait and wedding photographer, commercial and product photographer, photo editor, social media content creator, drone and aerial photographer, museum photographer, forensic photographer, visual designer. Skills: technical, creative, communication, business (pricing, contracts), time management. Pricing example: a $1,200 job requiring 8 hours of shooting and 6 hours of editing is 14 hours of work, $85.71 an hour before expenses.

## Problem set

Cases about copyright and releases; compute a rate.
`,
  reading: [
    "Whose picture is it, and where can this lead?",
    `
Who owns a photograph? In the United States, **copyright** protection begins **automatically** the moment you create an original photograph and save it. The **photographer** is the owner, unless the work was made for an employer (called **work for hire**) or the rights were transferred in writing. The owner decides who may copy, share, sell or adapt the image. That means that if you want to use someone else's photo, you need **permission** or a **license**, or the image must be in the **public domain**. Some photographers share their work under **Creative Commons** licenses, which allow certain uses if you follow the terms, such as giving credit. The fact that you **found an image online** does not make it free to use. **Fair use** is a narrow exception that is judged case by case, so do not assume it applies. In the United States, the owner of a US work generally needs to **register** with the Copyright Office before filing a lawsuit. To protect your own work, add your name to the file's **metadata**, include a credit when you post, and keep your originals.

The **people in your photographs** have rights and deserve respect, too. In public places in the United States, people generally have no expectation of privacy, so you can usually photograph what is in public view. But if you want to use a person's image for **commercial** purposes, such as advertising or selling a product, you need a signed **model release**. For private property, a **property release** may be needed. Photographing **minors** requires the consent of a parent or guardian. Ethics goes beyond the law: think about **dignity**, **consent** and sensitivity, especially when people are grieving, hurt or vulnerable. Ask yourself: *Would the subject object to this picture, or how I will use it?* Follow the rules of your school and of any venue.

If you love photography, there are many **careers**. A **photojournalist** reports news in images. **Portrait** and **wedding** photographers serve individuals and families. **Commercial** and **product** photographers make images for advertising and online stores. A **photo editor** selects and prepares images for publications. **Content creators** produce visuals for brands and social media. Others work as **drone** photographers, **museum** photographers or **forensic** photographers who document evidence. Visual communication also includes graphic design and video. Whatever the path, you need technical and creative skill, strong communication, time management, and, for freelancers, **business skills**. For instance, if a client pays $1,200 for a job that takes 8 hours of shooting and 6 hours of editing, that is 14 hours, and $1,200 / 14 is about $85.71 an hour, before subtracting expenses such as equipment, insurance and travel. Knowing your costs and rights helps you to price your work fairly and protect it.
`,
  ],
  cards: [
    ["Copyright", "Legal ownership of an original work, beginning on creation."],
    ["Work for hire", "Work made for an employer, owned by the employer."],
    ["Public domain", "Works that anyone may use freely."],
    ["Creative Commons", "Licenses that allow certain uses of a work."],
    ["Model release", "A signed permission to use a person's image commercially."],
    ["Metadata", "Information stored in a file, such as the creator's name."],
    ["Photojournalist", "A photographer who reports news."],
    ["Freelancer", "A self-employed worker paid per project."],
  ],
  closed: [
    [
      "When does copyright protection of a photograph begin?",
      ["When it is created and saved", "When it is registered", "When it is sold", "After 20 years"],
      "A",
    ],
    [
      "What do you need to use a person's image in an advertisement?",
      ["A signed model release", "Nothing", "A frame", "A hat"],
      "A",
    ],
    [
      "A job pays $1,200 for 14 total hours. What is the hourly rate?",
      ["$60.00", "$85.71", "$100.00", "$120.00"],
      "B",
    ],
    [
      "Does finding an image online make it free to use?",
      ["No", "Yes, always", "Only on weekends", "Only for students"],
      "A",
    ],
    [
      "For photographing a minor, you should get:",
      ["Consent from a parent or guardian", "A tripod", "A bigger lens", "Nothing"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A business owner wants to use your portrait of a classmate in an advertisement for a gym. Explain who owns the copyright, what permissions are needed from the classmate and from you, what you would do if the classmate is 16, and how you would set the price if the job requires 3 hours of shooting and 5 hours of editing and you want to earn $40 an hour plus $60 for expenses.",
      scheme: [
        "Explains that the photographer owns the copyright and can license it",
        "Explains that a signed model release is needed from the classmate for commercial use",
        "Explains that a parent or guardian must consent for a 16-year-old",
        "Calculates the price as 8 hours x $40 = $320 plus $60 = $380",
      ],
      model:
        "As the photographer, I own the copyright, so I decide whether and how to license the image. The classmate must give a signed model release because it will be used in an advertisement. Since the classmate is 16, a parent or guardian must also sign. For the price, 3 plus 5 is 8 hours at $40 an hour, which is $320, plus $60 for expenses, so I would charge $380.",
      answers: [
        [
          "full",
          "[[0|As the photographer, I own the copyright, so I decide whether and how to license the image.]] [[1|The classmate must give a signed model release because it's an advertisement.]] [[2|Since the classmate is 16, a parent or guardian must sign as well.]] [[3|The work is 3 + 5 = 8 hours at $40, which is $320, plus $60 for expenses, so $380.]]",
          "Full marks. Rights, releases, the minor rule and the price are all correct.",
        ],
        [
          "full",
          "[[0|I hold the copyright as the creator, and the business needs a license from me.]] [[1|Because the photo will advertise a business, I need a signed release from my classmate.]] [[2|At 16, the classmate is a minor, so a parent or guardian has to consent too.]] [[3|8 hours × $40 = $320, plus $60 of expenses makes $380.]]",
          "Full marks. The license is the right way for the business to use it.",
        ],
        [
          "partial",
          "[[0|I own the copyright.]] [[3|The price is 8 × 40 = $320 plus $60, so $380.]] No release is needed because we're friends, and age doesn't matter.",
          "A commercial use needs a signed release, and a minor needs a parent or guardian's consent.",
        ],
        [
          "partial",
          "[[1|A model release is needed.]] [[2|A guardian must sign.]] The gym owns the copyright because it paid, and the price is $40.",
          "The photographer owns the copyright unless it is transferred in writing.",
          true,
        ],
        [
          "weak",
          "The photo is online, so the gym can use it for free.",
          "A photo online is still protected by copyright.",
        ],
        [
          "weak",
          "A model release is a type of fashion show.",
          "A model release is signed permission to use a person's image commercially.",
        ],
      ],
    },
    {
      prompt:
        "Choose two photography or visual communication careers (for example photojournalist, wedding photographer, product photographer, photo editor or content creator). For each, describe what the person does and two skills needed, and explain a rights or ethics issue that each must handle. Then say which interests you more and one step you can take this year.",
      scheme: [
        "Describes the first career and two skills accurately",
        "Describes the second career and two skills accurately",
        "Explains a rights or ethics issue for each career (copyright, release, honesty, consent)",
        "Says which interests the student and gives one concrete step",
      ],
      model:
        "A photojournalist reports news in images, needing quick thinking and honesty with the camera; the key ethics issue is not altering photos to mislead. A wedding photographer records one day for a family, needing people skills and reliable equipment; the key issue is the contract and who owns and may use the photos. I am more interested in photojournalism, and this year I can shoot for the school newspaper and build a portfolio.",
      answers: [
        [
          "full",
          "[[0|A photojournalist reports news in images, needing quick thinking and technical skill; the ethics issue is never altering photos to mislead.]] [[1|A wedding photographer records a family's day, needing people skills and reliable equipment.]] [[2|For the wedding photographer, the key issue is the contract and who owns and may use the photos, including releases for guests.]] [[3|I'm more interested in photojournalism, and this year I can shoot for the school newspaper and build a portfolio.]]",
          "Full marks. Both careers have skills and a relevant rights or ethics issue.",
        ],
        [
          "full",
          "[[0|A product photographer makes images for online stores, needing lighting skills and attention to detail.]] [[1|A photo editor chooses and prepares images for publications, needing a good eye and good communication.]] [[2|The product photographer must agree who owns the images in a contract, and the editor must check permissions and credit and avoid misleading edits.]] [[3|The editor job interests me more, so I'll volunteer to edit the yearbook photos.]]",
          "Full marks. Volunteering for the yearbook is a concrete step.",
        ],
        [
          "partial",
          "[[0|A photojournalist takes news photos.]] [[3|I'll practice.]] Photographers have no skills or rules to follow.",
          "Name two skills for each career and an ethics or rights issue.",
        ],
        [
          "partial",
          "[[1|A wedding photographer works with families and needs people skills.]] [[2|Ethics: don't alter photos to mislead.]] Photojournalists only work in studios.",
          "Photojournalists report news, often in the field.",
          true,
        ],
        [
          "weak",
          "There are no careers in photography. Everyone just uses their phone.",
          "Photography and visual communication offer many careers.",
        ],
        [
          "weak",
          "Freelancers have no costs, so all the pay is profit.",
          "Freelancers have expenses such as equipment, insurance and travel.",
        ],
      ],
    },
  ],
};

writeCourse(
  "digital-photography-grade-12.json",
  "Digital Photography",
  "Grade 12",
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
