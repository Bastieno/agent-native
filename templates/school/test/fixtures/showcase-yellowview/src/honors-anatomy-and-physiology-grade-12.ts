import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Honors Anatomy and Physiology, Grade 12, Quarter 1. Same objectives as
 * Anatomy and Physiology, with clinical reasoning and quantitative
 * physiology (cardiac output, burn fluid calculation, sarcomere shortening,
 * conduction time, reaction time).
 */

const w1: WeekInput = {
  topic: "Regional terms, imaging, set points and positive feedback",
  note: `
## Objectives

Students will be able to:

1. use anatomical terms for position, planes, regions and body cavities to describe where structures lie and read a simple scan;
2. list the levels of organization and the eleven organ systems;
3. explain negative and positive feedback with set points, receptors, control centers and effectors.

## Materials

Torso model, CT and MRI slice images, sticky notes, thermometers, the quiz.

## Starter (7 minutes)

Show a transverse CT slice of the abdomen with no labels. Ask: "Which way are we looking, and how can we tell left from right?" Establish the convention that the patient's right is on the viewer's left and that the slice is viewed from the feet.

## Main activity

1. Directional terms and regional terms: abdominopelvic quadrants (RUQ, LUQ, RLQ, LLQ) and nine regions. Place the liver, stomach, appendix and spleen.
2. Imaging planes: sagittal, frontal and transverse. What each scan shows best (X-ray for bone, CT for detail, MRI for soft tissue).
3. Feedback: a negative loop has stimulus, receptor, control center, effector and response. Positive feedback amplifies: labor contractions and oxytocin, and blood clotting. Contrast the endpoints.
4. Set points and normal ranges: body temperature 36.5 to 37.5 degrees Celsius, blood glucose 70 to 100 mg/dL fasting.

## Checking for understanding

Ask: "Which quadrant is the appendix in, and why does pain there suggest appendicitis?"

## Quiz and problem set

Five quiz questions and a problem set on scans and feedback.
`,
  reading: [
    "Reading the body: regions, scans and feedback loops",
    `
Clinicians divide the abdomen into four quadrants by drawing a vertical and a horizontal line through the navel. The right upper quadrant (RUQ) holds most of the liver and the gallbladder. The left upper quadrant (LUQ) holds the stomach and the spleen. The right lower quadrant (RLQ) holds the appendix and part of the large intestine. The left lower quadrant (LLQ) holds the descending colon. Pain located in the RLQ prompts suspicion of appendicitis, while pain in the RUQ suggests gallbladder trouble. Anatomists use a finer map of nine regions, such as the epigastric region over the stomach and the hypogastric region over the bladder.

Medical images are slices of the body along a plane. A CT scan builds transverse slices from X-rays, and is read as if looking up from the patient's feet, so the patient's right appears on the left of the image. MRI uses magnetic fields and radio waves and shows soft tissues such as brain and muscle in fine detail, with no radiation. A plain X-ray is quick and good for bone, but flattens the three dimensions into one. Choosing the right scan is a matter of what must be seen.

At the center of physiology is the idea of control systems. Each system has a **set point**, the target value, and a **normal range** around it. Core body temperature is about 37 degrees Celsius with a range of 36.5 to 37.5. Fasting blood glucose is 70 to 100 mg/dL. A control system contains a **receptor** that detects the variable, a **control center** that compares it to the set point, and an **effector** that produces a response. In **negative feedback**, the response opposes the change. If blood glucose rises after a meal, receptors in the pancreas detect it, beta cells release insulin, and the liver and muscles take up glucose, so the level falls. Almost all homeostatic loops are negative because they keep a variable within range.

In **positive feedback**, the response amplifies the change, so the variable moves further from the starting point until an endpoint is reached. During labor, stretching of the cervix triggers the release of oxytocin from the pituitary, which strengthens contractions, which stretch the cervix more. The cycle stops with the birth of the baby. In blood clotting, activated platelets release chemicals that attract more platelets, which grows the clot until the vessel is sealed. Positive feedback loops are short, have clear endpoints, and are dangerous if they run out of control, as in a fever that keeps rising or in shock.

When a loop fails, disease follows. In type 1 diabetes, the pancreas does not produce insulin, so the negative feedback loop for glucose cannot close, and blood glucose stays high. Knowing which part of the loop has failed, receptor, control center or effector, helps explain the symptoms and suggests treatments.
`,
  ],
  cards: [
    ["Right upper quadrant", "The abdominal region that holds most of the liver and the gallbladder."],
    ["Right lower quadrant", "The abdominal region that holds the appendix."],
    ["CT scan", "An imaging method that builds transverse slices from X-rays."],
    ["MRI", "An imaging method using magnetic fields that shows soft tissue in detail."],
    ["Set point", "The target value that a control system works to maintain."],
    ["Effector", "The structure that carries out the response in a control system."],
    ["Positive feedback", "A loop in which the response amplifies the change until an endpoint."],
    ["Oxytocin", "A hormone that strengthens uterine contractions in labor."],
  ],
  closed: [
    [
      "Pain in the right lower quadrant would most suggest a problem with the:",
      ["Spleen", "Appendix", "Stomach", "Gallbladder"],
      "B",
    ],
    [
      "In a standard CT image, the patient's right side appears:",
      ["On the viewer's right", "On the viewer's left", "At the top", "At the bottom"],
      "B",
    ],
    [
      "Which imaging method is best for soft tissue like the brain and uses no radiation?",
      ["X-ray", "CT", "MRI", "Barium swallow"],
      "C",
    ],
    [
      "Which of these is an example of positive feedback?",
      ["Sweating when hot", "Insulin lowering glucose", "Oxytocin strengthening labor contractions", "Shivering when cold"],
      "C",
    ],
    [
      "In a control system, the structure that compares the variable with the set point is the:",
      ["Receptor", "Control center", "Effector", "Stimulus"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Compare negative and positive feedback. Give one example of each from the body, and explain why most homeostatic loops are negative.",
      scheme: [
        "States that negative feedback reverses the change and gives a correct example, such as insulin lowering glucose",
        "States that positive feedback amplifies the change and gives a correct example, such as labor contractions or clotting",
        "States that positive feedback loops have an endpoint",
        "Explains that negative feedback keeps a variable within a normal range, which is what homeostasis needs",
      ],
      model:
        "Negative feedback reverses a change, as when insulin lowers high blood glucose. Positive feedback amplifies a change, as when oxytocin strengthens labor contractions, which in turn release more oxytocin. A positive loop runs until an endpoint such as the birth of the baby. Most homeostatic loops are negative because they keep a variable within its normal range.",
      answers: [
        [
          "full",
          "[[0|Negative feedback reverses the change, like insulin bringing down blood glucose after a meal.]] [[1|Positive feedback makes the change bigger, like oxytocin strengthening contractions in labor.]] [[2|The positive loop stops at an endpoint, the birth.]] [[3|Most homeostatic loops are negative because they keep a variable inside its normal range.]]",
          "Full marks. The endpoint is what distinguishes safe positive feedback from runaway change.",
        ],
        [
          "full",
          "[[0|Negative: high temperature leads to sweating, which lowers temperature.]] [[1|Positive: clotting, because platelets attract more platelets.]] [[2|It ends when the vessel is sealed.]] [[3|Negative loops are the norm since homeostasis means holding conditions near a set point.]]",
          "All four marks, with accurate examples.",
        ],
        [
          "partial",
          "[[0|Negative feedback reverses a change, like sweating.]] [[1|Positive feedback amplifies, like labor.]]",
          "Good examples. Explain the endpoint of a positive loop and why negative loops are the most common.",
        ],
        [
          "partial",
          "[[1|Positive feedback is like clotting.]] [[3|Negative feedback keeps conditions stable.]] Positive feedback is good because it makes things positive.",
          "Positive does not mean good. It means the change is amplified, which can be dangerous without an endpoint.",
          true,
        ],
        [
          "weak",
          "Negative feedback is bad and positive feedback is good. For example, a fever is negative.",
          "The terms describe the direction of the response relative to the change, not good or bad. A normal fever response is a controlled loop.",
        ],
        [
          "weak",
          "[[0|Negative feedback reverses a change.]] Positive feedback is used for temperature and glucose.",
          "Temperature and glucose are held by negative feedback. Positive feedback is used for events like labor and clotting.",
        ],
      ],
    },
    {
      prompt:
        "A patient has severe pain in the right lower abdomen. Name the quadrant and the organ most likely involved, and explain which scan you would choose to look for inflammation of the organ, and why.",
      scheme: [
        "Names the right lower quadrant",
        "Names the appendix as the organ most likely involved",
        "Chooses CT (or ultrasound) as a scan that shows the soft tissue and inflammation",
        "Gives a reason, such as that a plain X-ray shows bone but not soft tissue well, or that CT gives detailed transverse slices",
      ],
      model:
        "The pain is in the right lower quadrant, and the organ most likely involved is the appendix. A CT scan would show the inflamed appendix in transverse slices. A plain X-ray is not suitable because it shows bone well but soft tissue poorly, while CT gives detailed slices of the abdomen.",
      answers: [
        [
          "full",
          "[[0|It is the right lower quadrant.]] [[1|The appendix is the likely organ.]] [[2|I would use a CT scan.]] [[3|It gives detailed transverse slices of soft tissue, while an X-ray mostly shows bone.]]",
          "Full marks. The scan is matched to the question being asked.",
        ],
        [
          "full",
          "[[0|RLQ pain.]] [[1|The appendix could be inflamed.]] [[2|A CT scan (or an ultrasound) would show swelling.]] [[3|A plain X-ray flattens the abdomen and does not show soft-tissue inflammation well.]]",
          "All four marks, and offering ultrasound is also reasonable, since it uses no radiation.",
        ],
        [
          "partial",
          "[[0|The right lower quadrant.]] [[1|The appendix.]] I would use an X-ray to see it.",
          "A plain X-ray shows soft tissue poorly. CT or ultrasound would show the inflammation better.",
        ],
        [
          "partial",
          "[[2|A CT scan]] [[3|shows detailed slices]]. The pain is in the left upper quadrant, which is the spleen.",
          "Left upper quadrant is not where the appendix is. It lies in the right lower quadrant.",
          true,
        ],
        [
          "weak",
          "The pain is on the right side so it is the right ventricle of the heart, and I would take an MRI of the leg.",
          "Use the abdominal quadrants and think of organs found there. The organ is the appendix.",
        ],
        [
          "weak",
          "[[2|I would choose a CT scan.]] The scan will show the pain itself as a bright spot.",
          "Scans show structure, such as swelling, and not pain. Name the quadrant and organ you suspect.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Organ systems in coordination: cardiac output and energy for exercise",
  note: `
## Objectives

Students will be able to:

1. describe how tissues combine to form organs and how organ systems interact, using cardiac output as an example;
2. link cellular respiration in muscle cells to the energy demands of exercise and recovery.

## Materials

Stopwatches, a 30 cm step or bench, a pulse chart, calculators, the practical sheet.

## Starter (6 minutes)

Ask: "At rest your heart pumps about as much blood each minute as you have in your body. How much blood is that, and how can we calculate it from your pulse?" Introduce cardiac output = heart rate x stroke volume.

## Main activity

1. Calculate cardiac output: 70 beats/min x 70 mL/beat = 4900 mL/min, about 4.9 L/min. During exercise 150 x 110 = 16,500 mL/min.
2. Fuel for muscle: ATP and creatine phosphate, glycolysis, aerobic respiration. Discuss the contribution of each over 10 s, 2 min and 30 min of exercise, and VO2 max.
3. Practical: the step test. Measure resting pulse, step for three minutes and measure the pulse immediately and each minute for five minutes. Calculate the recovery time and a fitness index.

## Checking for understanding

Ask: "How does regular training lower the resting heart rate but keep cardiac output the same?"

## Practical write-up

Collect with data, graph and interpretation.
`,
  reading: [
    "Cardiac output and the cost of movement",
    `
Organs are built from tissues, and organs cooperate in systems. The heart is a clear example. Cardiac muscle forms the wall, and the connective tissue of the valves and skeleton holds the structure. The lining, the endocardium, is epithelial and smooth, so blood flows without clotting, and nervous tissue in the conduction system keeps the beat. All these contribute to one function, pumping blood.

The measure of the heart's output is **cardiac output (CO)**, the volume pumped per minute. It equals the heart rate (HR) times the **stroke volume (SV)**, the volume pumped per beat. For a resting adult with a pulse of 70 beats per minute and a stroke volume of 70 mL, CO = 70 times 70, which is 4900 mL/min, about 4.9 L/min. During hard exercise, the pulse may rise to 150 and the stroke volume to 110 mL, so CO = 150 times 110, or 16,500 mL/min, more than three times the resting value. The extra blood flow delivers oxygen and glucose to the working muscles and removes carbon dioxide and heat. Blood vessels in muscles widen and those in the gut narrow, so the blood is redirected to where it is needed.

Training changes the picture. An endurance athlete's heart is larger and stronger, with a resting stroke volume of 100 mL or more, so a resting pulse of 49 gives the same output (4900 mL/min). This is why trained people have lower resting heart rates.

The muscle cell supplies its energy through several systems in sequence. In the first seconds, **stored ATP** and **creatine phosphate** provide energy, enough for about 10 seconds of maximal effort. After that, **glycolysis** breaks down glucose without oxygen to give 2 ATP and lactate. It is fast but limited, and supports effort for about a minute or two. For longer efforts, **aerobic respiration** in the mitochondria gives about 30 ATP per glucose and can also use fats. The maximal rate of oxygen use is called VO2 max, a measure of fitness.

After exercise, the body must return to its resting state. The extra oxygen taken in after exercise, the **excess post-exercise oxygen consumption**, is used to restore ATP and creatine phosphate, clear lactate and replace the oxygen stored in myoglobin. The heart rate takes minutes to return to the resting rate, and the faster it recovers, the fitter the person.
`,
  ],
  cards: [
    ["Cardiac output", "The volume of blood pumped by the heart per minute; heart rate times stroke volume."],
    ["Stroke volume", "The volume of blood pumped by the heart in one beat."],
    ["Endocardium", "The smooth epithelial lining of the heart chambers."],
    ["Creatine phosphate", "A store that quickly regenerates ATP in the first seconds."],
    ["Glycolysis", "Breakdown of glucose without oxygen, giving 2 ATP and lactate."],
    ["VO2 max", "The maximum rate at which the body can use oxygen."],
    ["Myoglobin", "A protein in muscle that stores oxygen."],
    ["Recovery heart rate", "How fast the pulse returns to its resting rate after exercise."],
  ],
  closed: [
    [
      "A resting pulse is 70 beats/min and the stroke volume is 70 mL. What is the cardiac output?",
      ["140 mL/min", "490 mL/min", "4900 mL/min", "49,000 mL/min"],
      "C",
    ],
    [
      "An athlete has a resting pulse of 49 and a cardiac output of 4900 mL/min. What is the stroke volume?",
      ["49 mL", "70 mL", "100 mL", "200 mL"],
      "C",
    ],
    [
      "Which energy source supports a maximal effort for about the first 10 seconds?",
      ["Aerobic respiration", "Stored ATP and creatine phosphate", "Fat metabolism", "Protein breakdown"],
      "B",
    ],
    [
      "During exercise, blood is redirected to muscles because vessels in the muscles:",
      ["Narrow", "Widen", "Close", "Stiffen"],
      "B",
    ],
    [
      "A person's pulse rises from 70 to 150 and stroke volume from 70 to 110 mL. The cardiac output rises to:",
      ["10,500 mL/min", "16,500 mL/min", "21,000 mL/min", "165,000 mL/min"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Calculate the cardiac output at rest (pulse 72, stroke volume 70 mL) and during exercise (pulse 156, stroke volume 112 mL). State the increase as a multiple and explain two ways the body uses the extra blood flow.",
      scheme: [
        "Calculates the resting cardiac output as 5040 mL/min",
        "Calculates the exercise cardiac output as 17,472 mL/min",
        "States the increase as a factor of about 3.5",
        "Explains uses of the extra flow, such as delivering oxygen and glucose and removing carbon dioxide and heat",
      ],
      model:
        "At rest CO = 72 times 70 = 5040 mL/min. During exercise CO = 156 times 112 = 17,472 mL/min, which is about 3.5 times the resting value. The extra flow delivers oxygen and glucose to the working muscles, and removes carbon dioxide and heat.",
      answers: [
        [
          "full",
          "[[0|At rest: 72 × 70 = 5040 mL/min.]] [[1|Exercise: 156 × 112 = 17,472 mL/min.]] [[2|That's about 3.5 times as much.]] [[3|The extra blood brings oxygen and glucose to the muscles and takes away carbon dioxide and heat.]]",
          "Full marks. The two uses cover both supply and removal.",
        ],
        [
          "full",
          "[[0|CO(rest) = HR × SV = 5.04 L/min.]] [[1|CO(exercise) = 17.5 L/min.]] [[2|The ratio is about 3.5.]] [[3|It supplies oxygen to the muscles for aerobic respiration, and removes CO₂ and heat.]]",
          "All four marks, with a clear ratio.",
        ],
        [
          "partial",
          "[[0|At rest CO is 5040 mL/min.]] [[1|With exercise it is 156 × 112 = 17,472.]] The increase is 17,472 − 5040 = 12,432 times.",
          "12,432 is the increase in mL/min, not a multiple. Divide 17,472 by 5040 to get about 3.5 times.",
        ],
        [
          "partial",
          "[[2|The output goes up 3.5 times.]] [[3|The muscles need more oxygen.]]",
          "Good. Show the two calculations and give a second use of the extra blood flow.",
          true,
        ],
        [
          "weak",
          "72 + 70 = 142 at rest and 156 + 112 = 268 in exercise, so it goes up by 126.",
          "Cardiac output is the product of heart rate and stroke volume, not the sum.",
        ],
        [
          "weak",
          "[[0|At rest the cardiac output is 5040 mL/min.]] During exercise it goes down because the heart gets tired.",
          "The cardiac output rises during exercise to meet the muscles' demand for oxygen.",
        ],
      ],
    },
    {
      prompt:
        "Explain why a 100 m sprint and a 10 km run rely on different energy systems in muscle, and what happens to lactate after the sprint. Include the approximate ATP yield of each pathway.",
      scheme: [
        "States that the sprint relies on stored ATP, creatine phosphate and glycolysis",
        "States that glycolysis yields only 2 ATP per glucose and produces lactate",
        "States that the long run relies on aerobic respiration yielding about 30 ATP per glucose",
        "States that lactate is later converted back to glucose in the liver or used as fuel, and the oxygen debt is repaid after the sprint",
      ],
      model:
        "A sprint is too short and intense for oxygen delivery to keep up, so it relies on stored ATP, creatine phosphate and glycolysis, which gives 2 ATP per glucose and produces lactate. A 10 km run relies on aerobic respiration, giving about 30 ATP per glucose. After the sprint, lactate is converted back to glucose in the liver or used as fuel, and the oxygen debt is repaid.",
      answers: [
        [
          "full",
          "[[0|A sprint uses stored ATP, creatine phosphate and then glycolysis because oxygen can't be delivered fast enough.]] [[1|Glycolysis gives only 2 ATP per glucose and makes lactate.]] [[2|The long run is aerobic, which gives about 30 ATP per glucose.]] [[3|After the sprint, lactate is turned back into glucose in the liver and I breathe hard to repay the oxygen debt.]]",
          "Full marks. You tied each energy system to its duration and yield.",
        ],
        [
          "full",
          "[[0|The first seconds use ATP and creatine phosphate, then anaerobic glycolysis.]] [[1|It is quick but only nets 2 ATP and makes lactate.]] [[2|A 10 km run is paced so that aerobic respiration (about 30 ATP per glucose) supplies most of the energy.]] [[3|Lactate is recycled by the liver and used for fuel, and the oxygen debt is repaid afterward.]]",
          "All four marks, with excellent detail on the recycling of lactate.",
        ],
        [
          "partial",
          "[[0|A sprint uses ATP and creatine phosphate and glycolysis.]] [[2|A long run uses aerobic respiration.]]",
          "Add the ATP yields (2 and about 30), and say what happens to the lactate afterward.",
        ],
        [
          "partial",
          "[[1|Glycolysis makes 2 ATP and lactate.]] [[3|The liver turns the lactate back into glucose.]] In the long run you use anaerobic respiration only.",
          "Long runs depend on aerobic respiration. Anaerobic glycolysis alone cannot sustain a long effort.",
          true,
        ],
        [
          "weak",
          "The sprint uses fat for fuel because it is the fastest, and lactate is a poison that stays in the muscle forever.",
          "Fat is used mostly in slow, aerobic work. Lactate is cleared within an hour or so and recycled as fuel.",
        ],
        [
          "weak",
          "[[2|The long run uses aerobic respiration.]] The sprint uses it too because breathing is the same for both.",
          "In a sprint oxygen delivery cannot keep up with demand, so the cells rely on glycolysis and stored ATP.",
        ],
      ],
    },
  ],
  practical: {
    title: "Step test and heart rate recovery",
    instructions:
      "Measure each student's resting pulse. Then step up and down on a 30 cm step at 24 steps per minute for three minutes. Measure the pulse immediately after and then each minute for five minutes. Graph the data, find the recovery time to within 10 beats of rest, and calculate the percent increase in pulse.",
    steps: [
      ["Sit quietly for three minutes and measure the pulse for 30 seconds, doubling it to get beats per minute."],
      ["Set the metronome at 96 beats per minute so that each step takes a beat, giving 24 full step cycles per minute."],
      ["Step up and down for three minutes.", "Stop at once if you feel dizzy, and let the teacher know."],
      ["Sit and measure the pulse immediately, and then every minute for five minutes."],
      ["Plot the pulse against time and find the time when the pulse is within 10 beats per minute of rest."],
      ["Calculate the percent increase of the highest pulse over rest and compare with a partner."],
    ],
    rubric: [
      ["Method: controlled step height and rate, repeated measurements", 4],
      ["Data and graph: table, labeled axes, recovery time found", 4],
      ["Interpretation: links recovery to cardiovascular fitness and oxygen debt", 4],
    ],
    writeUps: [
      [
        "full",
        "My resting pulse was 68 beats per minute. Immediately after the three-minute step test it was 142, an increase of 109 percent. At minutes one to five it was 118, 98, 84, 76 and 72. My pulse came within 10 beats of rest at about minute four. The graph falls quickly at first and then levels off. The heart rate stays raised after exercise because the body is repaying the oxygen debt, restoring ATP and clearing lactate. A faster recovery means a stronger heart and better fitness.",
        [4, 4, 4],
        "An excellent report: complete data, an accurate calculation of the percent increase, and a clear explanation of the recovery.",
      ],
      [
        "full",
        "We used a 30 cm step and a metronome at 96 bpm. Resting pulse: 74. After exercise: 150 (a 103% increase). Recovery readings: 124, 104, 90, 82, 78. The pulse took about 4.5 minutes to recover to within 10 beats of rest. During exercise, cardiac output rises to deliver oxygen for aerobic respiration, and afterward the oxygen debt must be repaid. My partner, who plays soccer, recovered in 3 minutes, which suggests a stronger heart with a higher stroke volume.",
        [4, 3, 4],
        "Very good. The graph with labeled axes was not described; include it with units to complete the data section.",
      ],
      [
        "partial",
        "My resting pulse was 70. After three minutes of stepping my pulse was 140, so it went up 100 percent. It came down slowly after that. At the end of five minutes it was still 80, so I had not fully recovered. I think it takes time to recover because my muscles used a lot of energy. I did not graph the data because there was no time left in the period.",
        [3, 2, 1],
        "Plot the data, find the recovery time, and explain the recovery using oxygen debt and fitness.",
      ],
      [
        "partial",
        "The pulse is a good measure of fitness. My partner recovered in three minutes and I took five. This shows that my partner is fitter than I am and that their heart is stronger. We used the step and the metronome. I did not write down the resting pulse or the pulse right after exercise, so I cannot calculate the percent increase.",
        [3, 1, 2],
        "Record every pulse reading, since the calculations depend on them. Your interpretation is sensible.",
      ],
      [
        "weak",
        "We did the step test and it made us tired. My pulse went up and then it went down again. I think the heart beats faster because it is excited about exercise. Some people were faster than others at stepping which might change the results, but I think it is okay.",
        [1, 0, 0],
        "Record the pulse at each time and control the stepping rate. The heart rate rises to meet the muscles' demand for oxygen, not from excitement.",
      ],
      [
        "weak",
        "My pulse was 70 at rest and 140 after the test, which is an increase of 70 percent because 140 minus 70 is 70. The heart rate goes up because the heart is a muscle and muscles get bigger when you use them. The recovery time was five minutes for everyone, which proves that everyone has the same fitness.",
        [1, 1, 0],
        "A rise of 70 beats on a base of 70 is a 100 percent increase. Recovery times differ among people, and the differences are informative.",
      ],
    ],
  },
};

const w3: WeekInput = {
  topic: "Chemistry of the body, the cell and tissue histology",
  note: `
## Objectives

Students will be able to:

1. describe the biological molecules of the body, pH and buffers, and the structure and function of the cell and its organelles, including membrane transport;
2. identify the four tissue types and their subtypes, matching each to structure and function.

## Materials

pH paper, baking soda and vinegar, bromothymol blue, prepared tissue slides, tissue key, the worksheet.

## Starter (6 minutes)

Ask: "Blood pH stays between 7.35 and 7.45. A drop to 7.0 is a medical emergency. Why such a narrow window?" Gather ideas about enzymes.

## Main activity

1. pH and buffers: pH 7 is neutral, each unit is a tenfold change in hydrogen ion concentration. The carbonic acid-bicarbonate buffer resists change in blood pH. Test a buffer and water with added acid.
2. Membrane transport in the body: osmosis in red blood cells, the sodium-potassium pump (3 Na+ out, 2 K+ in), facilitated diffusion of glucose.
3. Tissue subtypes: simple and stratified epithelia, loose and dense connective tissue, bone, cartilage, blood, three muscle types and neurons. Use a key to identify unknown slides.

## Checking for understanding

Ask: "A solution has pH 6 and another pH 8. Which has more hydrogen ions, and by how much?"

## Worksheet

pH calculations, transport, and tissue identification.
`,
  reading: [
    "pH, membranes and the architecture of tissues",
    `
Chemical reactions in the body depend on precise conditions. The measure of acidity is **pH**, the negative logarithm of the hydrogen ion concentration. Each unit is a tenfold change: a solution of pH 6 has ten times as many hydrogen ions as one of pH 7, and a hundred times as many as a solution of pH 8. Blood has a pH of 7.35 to 7.45, slightly basic. A fall below 7.35 is **acidosis** and a rise above 7.45 is **alkalosis**. Because the shape of enzymes depends on pH, even small deviations cause serious problems. The stomach, in contrast, has a pH around 2 because pepsin works best in acid.

How does blood keep its pH steady, even though metabolism makes acids all the time? It contains **buffers**, chemicals that take up or release hydrogen ions. The main one is the carbonic acid-bicarbonate system. If hydrogen ions increase, bicarbonate binds them and forms carbonic acid, which breaks into water and carbon dioxide that is exhaled. The lungs and kidneys also adjust the pH over minutes to days.

The cell membrane controls what moves in and out. **Osmosis** is the movement of water to the side with the higher solute concentration. A red blood cell in pure water takes up water, swells and bursts, while one in a concentrated salt solution loses water and shrinks. That is why intravenous fluids are made isotonic, at 0.9 percent salt. The **sodium-potassium pump** uses ATP to move three sodium ions out and two potassium ions in, maintaining the gradient that nerves and muscles use. Glucose enters most cells by **facilitated diffusion**, through carrier proteins, without ATP.

Tissue types have subtypes defined by structure. **Epithelium** is classified by cell shape and number of layers. Simple squamous epithelium, a single flat layer, lines the air sacs of the lungs and the blood capillaries where substances pass quickly. Stratified squamous epithelium, many layers, covers the skin and the lining of the mouth, which resists abrasion. Simple columnar epithelium lines the intestine and absorbs. **Connective tissue** includes loose tissue that packs around organs, dense tissue with strong collagen fibers in tendons, cartilage, bone and blood. **Muscle** is skeletal, cardiac or smooth. **Nervous tissue** consists of neurons and neuroglia.

To identify an unknown slide, ask a few questions in order. Are cells packed in a sheet? That suggests epithelium, and the shape and layers refine it. Are the cells scattered in a matrix? That suggests connective tissue. Long fibers with stripes? Muscle. Cells with long processes? Nervous tissue.
`,
  ],
  cards: [
    ["pH", "A measure of acidity; each unit is a tenfold change in hydrogen ion concentration."],
    ["Buffer", "A chemical system that resists changes in pH."],
    ["Acidosis", "Blood pH below 7.35."],
    ["Isotonic", "Having the same solute concentration as the cell; no net water movement."],
    ["Sodium-potassium pump", "A pump using ATP to move 3 Na+ out and 2 K+ in."],
    ["Facilitated diffusion", "Movement down a gradient through a carrier protein, with no ATP."],
    ["Simple squamous epithelium", "A single layer of flat cells, suited to rapid exchange."],
    ["Stratified squamous epithelium", "Many layers of flat cells, suited to resisting abrasion."],
  ],
  closed: [
    [
      "A solution of pH 6 has how many times more hydrogen ions than a solution of pH 8?",
      ["2 times", "10 times", "100 times", "1000 times"],
      "C",
    ],
    [
      "Which tissue lines the air sacs of the lungs for fast gas exchange?",
      ["Stratified squamous epithelium", "Simple squamous epithelium", "Dense connective tissue", "Smooth muscle"],
      "B",
    ],
    [
      "The sodium-potassium pump moves:",
      ["3 Na+ in and 2 K+ out", "3 Na+ out and 2 K+ in", "2 Na+ out and 3 K+ in", "Na+ and K+ in the same direction"],
      "B",
    ],
    [
      "A red blood cell is placed in pure water. What is most likely?",
      ["It shrinks", "It swells and may burst", "It stays the same", "It divides"],
      "B",
    ],
    [
      "Which system is the main blood buffer?",
      ["Carbonic acid-bicarbonate", "Hemoglobin-oxygen", "Insulin-glucagon", "Sodium-potassium"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Explain how the carbonic acid-bicarbonate buffer keeps blood pH stable when an acid, such as lactic acid, enters the blood. Name the roles of the lungs and the kidneys.",
      scheme: [
        "States that bicarbonate binds the extra hydrogen ions",
        "States that this forms carbonic acid, which breaks down into carbon dioxide and water",
        "States that the lungs exhale the carbon dioxide, removing the acid load",
        "States that the kidneys adjust hydrogen ion and bicarbonate excretion over a longer time",
      ],
      model:
        "Bicarbonate in the blood binds the extra hydrogen ions to form carbonic acid, which breaks down into carbon dioxide and water. The lungs exhale the carbon dioxide, removing the acid. The kidneys adjust the excretion of hydrogen ions and bicarbonate more slowly, over hours to days.",
      answers: [
        [
          "full",
          "[[0|Bicarbonate picks up the extra hydrogen ions.]] [[1|That makes carbonic acid, which then breaks into carbon dioxide and water.]] [[2|The lungs breathe out the carbon dioxide so the acid is removed.]] [[3|The kidneys also adjust how many hydrogen ions and bicarbonate ions they excrete, but more slowly.]]",
          "Full marks. The speed difference between the lungs and the kidneys is a nice detail.",
        ],
        [
          "full",
          "[[0|HCO₃⁻ binds H⁺ from the lactic acid.]] [[1|H₂CO₃ forms and breaks down to CO₂ and H₂O.]] [[2|Faster breathing gets rid of the CO₂.]] [[3|Over days, the kidneys excrete H⁺ and conserve bicarbonate.]]",
          "All four marks, using precise chemical forms.",
        ],
        [
          "partial",
          "[[0|Bicarbonate binds the hydrogen ions.]] [[2|The lungs breathe out carbon dioxide.]]",
          "Good. Include the carbonic acid step and the role of the kidneys.",
        ],
        [
          "partial",
          "[[1|Carbonic acid forms and breaks down.]] [[3|The kidneys adjust the excretion.]] The stomach gets rid of the extra acid.",
          "The stomach is not involved in blood buffering. The lungs breathe out the carbon dioxide.",
          true,
        ],
        [
          "weak",
          "The buffer destroys the acid so that it disappears from the blood.",
          "The acid is not destroyed. Hydrogen ions are bound by bicarbonate and later exhaled as carbon dioxide and water.",
        ],
        [
          "weak",
          "[[2|The lungs get rid of CO2.]] A buffer is a type of protein that makes blood thicker.",
          "A buffer is a chemical system that resists a change in pH. It does not make blood thicker.",
        ],
      ],
    },
    {
      prompt:
        "A slide shows a tissue with cells packed tightly in many layers, the top layers flat. Identify the tissue, give one body location, and explain how its structure suits the function. Contrast it with the lining of the small intestine.",
      scheme: [
        "Identifies the tissue as stratified squamous epithelium",
        "Gives a location, such as the epidermis or the lining of the mouth or esophagus",
        "Explains that many layers resist abrasion and protect underlying tissue",
        "Contrasts with the intestinal lining, a single layer of columnar cells specialized for absorption and secretion",
      ],
      model:
        "This is stratified squamous epithelium. It is found in the epidermis of the skin and in the lining of the mouth. The many layers resist abrasion and protect the underlying tissue. The small intestine is lined by a single layer of tall columnar cells, which is suited to absorption and secretion because nutrients only have to cross one cell layer.",
      answers: [
        [
          "full",
          "[[0|It is stratified squamous epithelium.]] [[1|It's found in the skin's epidermis and the mouth lining.]] [[2|Many layers means it can take a lot of rubbing without wearing through, so it protects what's below.]] [[3|The small intestine has a single layer of columnar cells, which is better for absorbing since nutrients cross only one layer.]]",
          "Full marks. The contrast shows that structure follows function.",
        ],
        [
          "full",
          "[[0|Stratified squamous epithelium.]] [[1|The esophagus and skin are examples.]] [[2|Lots of layers make it tough, and the surface cells can be sloughed off and replaced.]] [[3|Intestinal epithelium is simple columnar, a single layer, since absorption needs a thin barrier.]]",
          "All four marks, and the point about replaced cells is accurate.",
        ],
        [
          "partial",
          "[[0|Stratified squamous epithelium.]] [[1|It is in the skin.]]",
          "Explain why the many layers matter, and contrast with the intestinal lining.",
        ],
        [
          "partial",
          "[[2|Many layers protect from abrasion.]] [[3|The intestine has a single layer.]] The tissue is simple squamous.",
          "Many layers make it stratified, not simple. Name the tissue and its location.",
          true,
        ],
        [
          "weak",
          "It is connective tissue because it holds the layers of the body together, like the skin on a cut.",
          "Cells packed in a sheet with little matrix suggest epithelium. Connective tissue has scattered cells in a matrix.",
        ],
        [
          "weak",
          "[[3|The intestine has a single layer of cells for absorbing.]] The tissue on the slide is muscle because it is thick.",
          "Thickness comes from the number of layers of epithelial cells. Muscle has long fibers, often striped.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "The skin: structure, burn assessment and wound healing",
  note: `
## Objectives

Students will be able to:

1. describe the layers of the skin in detail and its roles in protection, temperature control and sensation;
2. explain how the skin heals after a cut or a burn, and estimate burn size by the rule of nines and the fluid needs of a burn patient.

## Materials

Rule of nines diagrams, a layered skin model, calculators, the worksheet.

## Starter (6 minutes)

Pose: "A person in a house fire has burns on both arms and the front of the chest. How would you estimate how much of their body surface is burned, and why does it matter?"

## Main activity

1. Layers in detail: the strata of the epidermis (corneum, lucidum, granulosum, spinosum, basale), the papillary and reticular dermis, glands, hair follicles and receptors (Meissner, Pacinian).
2. Burns: depth classification, and extent by the rule of nines (head 9, each arm 9, chest and abdomen 18, back 18, each leg 18, perineum 1). Fluid replacement using the Parkland formula: 4 mL x body mass in kg x percent burned, half in the first 8 hours.
3. Healing: inflammation, proliferation, maturation, role of stem cells, scarring.

## Checking for understanding

Ask: "Why do large burns cause shock?" Look for fluid loss.

## Worksheet

A burn extent estimate, a fluid calculation and a healing explanation.
`,
  reading: [
    "Skin in depth, and the arithmetic of a burn",
    `
The epidermis is built in five layers (strata) in thick skin. The deepest, the **stratum basale**, contains stem cells that divide constantly, and melanocytes. Cells move upward through the **stratum spinosum** and **stratum granulosum**, where they fill with keratin and die. In the thick skin of the palms and soles there is also a clear layer, the stratum lucidum. The surface layer, the **stratum corneum**, is dead, flattened and keratinized, and is shed in flakes. The whole journey takes about a month. The **dermis** has a thin papillary layer of loose connective tissue with capillaries and touch receptors (Meissner corpuscles), and a thick reticular layer of dense collagen with deep pressure receptors (Pacinian corpuscles), glands and hair follicles.

Burn injuries are assessed by depth and by extent. The depth is described as first-, second- or third-degree. The extent is the percentage of total body surface area (TBSA) burned, estimated by the **rule of nines** for adults: head and neck 9 percent, each arm 9 percent, the front of the trunk 18, the back of the trunk 18, each leg 18, and the perineum 1. A person with burns on both arms (18 percent) and the front of the chest and abdomen (18 percent) has about 36 percent TBSA burned.

Large burns are life-threatening mostly because of fluid loss. Burned capillaries leak plasma, and the skin no longer prevents evaporation, so the patient can go into **hypovolemic shock**. Fluid is replaced by an intravenous drip using a formula such as the **Parkland formula**: total fluid in the first 24 hours is 4 mL times body mass in kilograms times the percent TBSA burned, with half given in the first 8 hours. For a 70 kg adult with 20 percent TBSA burned, that is 4 times 70 times 20, which is 5600 mL in 24 hours, with 2800 mL in the first 8 hours, or 350 mL per hour. Only second- and third-degree burns are included in the percentage. Infection is the other major risk, since the barrier is lost.

Healing of a wound proceeds in overlapping phases. In **inflammation**, blood vessels widen and white blood cells clean the wound. In **proliferation**, fibroblasts make collagen, new capillaries form, and epidermal cells from the edges and from hair follicles migrate across the surface. In **maturation**, over months, the collagen is reorganized and the scar strengthens, to about 80 percent of the strength of normal skin. Deep wounds heal by scarring, which lacks glands and hair follicles, while superficial wounds regenerate because stem cells in the basal layer can rebuild the epidermis fully.
`,
  ],
  cards: [
    ["Stratum basale", "The deepest epidermal layer, where stem cells divide."],
    ["Stratum corneum", "The outer layer of dead keratinized cells."],
    ["Papillary layer", "The thin upper dermis with capillaries and touch receptors."],
    ["Rule of nines", "A method of estimating the percent of body surface burned in adults."],
    ["Parkland formula", "4 mL x kg x percent TBSA burned in 24 hours, half in the first 8 hours."],
    ["Hypovolemic shock", "Shock caused by loss of blood or fluid volume."],
    ["Fibroblast", "A cell that makes collagen in wound healing."],
    ["Maturation", "The final phase of healing, in which the scar is remodeled."],
  ],
  closed: [
    [
      "In the rule of nines, what percent does each adult leg represent?",
      ["9%", "13.5%", "18%", "36%"],
      "C",
    ],
    [
      "A 70 kg adult has 20% TBSA burned. By the Parkland formula, the fluid needed in 24 hours is:",
      ["1400 mL", "2800 mL", "5600 mL", "11,200 mL"],
      "C",
    ],
    [
      "Which layer contains the stem cells that regenerate the epidermis?",
      ["Stratum corneum", "Stratum basale", "Reticular dermis", "Hypodermis"],
      "B",
    ],
    [
      "Why are large burns dangerous in the first hours?",
      ["The body overheats", "Fluid loss can cause hypovolemic shock", "The bones soften", "Red blood cells multiply"],
      "B",
    ],
    [
      "Burns on both arms (18%) and the front of the trunk (18%) represent about what TBSA?",
      ["18%", "27%", "36%", "54%"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A 60 kg adult has second-degree burns on the front of the trunk, the whole of the left arm and the whole of the right leg. Estimate the TBSA using the rule of nines, calculate the fluid needed in the first 24 hours and in the first 8 hours by the Parkland formula.",
      scheme: [
        "Estimates the TBSA as 18 + 9 + 18 = 45 percent",
        "Calculates the 24 hour fluid as 4 x 60 x 45 = 10,800 mL",
        "Gives the first 8 hours as half, 5400 mL",
        "Gives units and notes the rate of about 675 mL per hour for the first 8 hours",
      ],
      model:
        "The front of the trunk is 18 percent, the left arm is 9 percent and the right leg is 18 percent, giving 45 percent TBSA. The Parkland formula gives 4 times 60 times 45 = 10,800 mL in 24 hours. Half, 5400 mL, is given in the first 8 hours, which is about 675 mL per hour.",
      answers: [
        [
          "full",
          "[[0|18% + 9% + 18% = 45% TBSA.]] [[1|Parkland: 4 × 60 × 45 = 10,800 mL in 24 hours.]] [[2|Half of that, 5400 mL, goes in during the first 8 hours.]] [[3|That is a rate of 675 mL per hour for the first 8 hours.]]",
          "Full marks. You added the units and converted to an hourly rate, as a clinician would.",
        ],
        [
          "full",
          "[[0|Trunk front 18 + arm 9 + leg 18 = 45% TBSA.]] [[1|4 mL × 60 kg × 45 = 10.8 L over 24 h.]] [[2|5.4 L in the first 8 h.]] [[3|About 675 mL/h at the start.]]",
          "All four marks, with a clear order.",
        ],
        [
          "partial",
          "[[0|45% TBSA.]] [[1|4 × 60 × 45 = 10,800 mL.]] All of the fluid should be given in the first 8 hours.",
          "Only half is given in the first 8 hours, which is 5400 mL. The other half is given over the next 16 hours.",
        ],
        [
          "partial",
          "[[2|5400 mL in 8 hours.]] [[3|675 mL per hour.]]",
          "Good. Show how you estimated the burn size and the 24-hour total.",
          true,
        ],
        [
          "weak",
          "The arm is 18%, the leg is 9% and the trunk is 9%, so 36%, and the fluid is 36 mL.",
          "In the rule of nines, an arm is 9 percent, a leg is 18 percent and the front of the trunk is 18 percent. The fluid is calculated in milliliters per kilogram per percent.",
        ],
        [
          "weak",
          "[[0|The TBSA is 45%.]] The Parkland formula is 45 × 60 = 2700 mL, with no need for the factor of 4.",
          "The Parkland formula includes 4 mL per kg per percent. That gives 10,800 mL.",
        ],
      ],
    },
    {
      prompt:
        "Describe the three phases of wound healing in a deep cut and explain why a deep wound forms a scar while a shallow scrape regenerates normal skin.",
      scheme: [
        "Describes inflammation, with white blood cells cleaning the wound",
        "Describes proliferation, with fibroblasts making collagen and epidermal cells migrating",
        "Describes maturation, with the collagen remodeled over months",
        "Explains that a shallow scrape regenerates because stem cells in the basal layer remain, whereas a deep wound destroys the dermis and is repaired with collagen scar tissue lacking glands and hair follicles",
      ],
      model:
        "In inflammation, blood vessels widen and white blood cells clear bacteria and debris. In proliferation, fibroblasts make collagen, new capillaries form and epidermal cells migrate across the wound. In maturation, the collagen is remodeled over months. A shallow scrape leaves stem cells in the basal layer, so the epidermis regenerates fully. A deep wound destroys part of the dermis and is repaired with collagen scar tissue, which has no glands or hair follicles.",
      answers: [
        [
          "full",
          "[[0|First is inflammation, where blood vessels widen and white blood cells clean up the wound.]] [[1|Then proliferation, where fibroblasts make collagen and the skin cells from the edges grow across.]] [[2|Finally maturation, when the scar is remodeled over months.]] [[3|A shallow scrape keeps the stem cells in the basal layer so it can regrow normally, but a deep wound destroys the dermis, and it is filled with collagen scar without glands or hair follicles.]]",
          "Full marks. The role of stem cells is the key to the contrast.",
        ],
        [
          "full",
          "[[0|Inflammation: swelling, white blood cells and cleanup.]] [[1|Proliferation: fibroblasts lay down collagen, new capillaries, epidermal migration.]] [[2|Maturation: collagen is rearranged and the scar strengthens.]] [[3|Superficial injuries leave basal stem cells to rebuild; deep ones lose dermis and heal with scar tissue that lacks hair and glands.]]",
          "All four marks, with a clear contrast.",
        ],
        [
          "partial",
          "[[0|First there is inflammation.]] [[1|Fibroblasts make collagen.]] [[2|The scar is remodeled.]]",
          "Name the phases, and explain why deep wounds scar while shallow ones regenerate.",
        ],
        [
          "partial",
          "[[3|A shallow scrape keeps the stem cells so it heals normally.]] [[1|Fibroblasts produce collagen.]] Maturation happens in a day.",
          "Maturation takes months. Describe inflammation as well.",
          true,
        ],
        [
          "weak",
          "The skin heals by the blood turning into new skin and the scab falling off after a day.",
          "Healing involves cells moving and dividing, and collagen formation. It takes days to months.",
        ],
        [
          "weak",
          "[[0|There is inflammation.]] Scars form because the body forgets how to make skin in deep wounds.",
          "Scars form because the dermis and stem cells are lost, and the gap is filled with collagen.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Bone remodeling, calcium homeostasis, joints and muscle tissue types",
  note: `
## Objectives

Students will be able to:

1. name the major bones, classify them by shape, and explain how bones grow, remodel and regulate calcium;
2. compare the structure and range of motion of fibrous, cartilaginous and synovial joints, with clinical examples;
3. compare skeletal, cardiac and smooth muscle by structure, control and location.

## Materials

Skeleton, long bone sections, bone density data, joint models, the worksheet and quiz.

## Starter (6 minutes)

Show a bone density chart for women aged 30, 50 and 70. Ask: "What is happening, and what could slow it?"

## Main activity

1. Anatomy of a long bone: diaphysis, epiphysis, compact and spongy bone, medullary cavity, periosteum. Bone cells and remodeling.
2. Calcium homeostasis: low blood calcium raises parathyroid hormone (PTH), which stimulates osteoclasts and kidney reabsorption; high calcium stimulates calcitonin, which promotes deposition. Discuss osteoporosis and its prevention (calcium, vitamin D, weight-bearing exercise).
3. Joint types with clinical links: sprain, dislocation, arthritis. Planes of motion at the hinge, ball-and-socket and pivot joints.
4. Compare the three muscle types in a table.

## Checking for understanding

Ask: "Why does an astronaut lose bone mass in space?"

## Worksheet and quiz

Calcium feedback loop, joint comparison and muscle table.
`,
  reading: [
    "A living skeleton",
    `
A long bone such as the femur has a shaft, the **diaphysis**, and two ends, the **epiphyses**. The outer surface is covered by the **periosteum**, a membrane that contains blood vessels and bone-forming cells. Under it lies **compact bone**, dense and strong, made of cylinders called osteons. The ends contain **spongy bone**, a lattice that is light and absorbs stress, and the central **medullary cavity** holds marrow. Red marrow makes blood cells and yellow marrow stores fat.

Bone is continually **remodeled**. Osteoclasts break down bone and release calcium, and osteoblasts build it. About 10 percent of the skeleton is replaced each year. Mechanical stress stimulates osteoblasts, so weight-bearing exercise strengthens bone, and astronauts lose bone mass in the weightlessness of space.

Bone is also a calcium store. The body keeps blood calcium within a narrow range, around 9 to 11 mg/dL, because calcium is needed for muscle contraction, nerve signaling and clotting. This is a negative feedback loop with two hormones. When blood calcium falls, the parathyroid glands release **parathyroid hormone (PTH)**. PTH stimulates osteoclasts to release calcium from bone, makes the kidneys retain calcium, and activates vitamin D, which increases the absorption of calcium from the intestine. When blood calcium rises, the thyroid releases **calcitonin**, which inhibits osteoclasts and promotes deposition in bone. In **osteoporosis**, bone loss exceeds formation, and the bones become porous and fragile. Risk factors are age, low estrogen after menopause, low calcium and vitamin D, and inactivity. Prevention includes adequate calcium and vitamin D, and weight-bearing exercise.

Joints are classified by structure. **Fibrous joints**, such as skull sutures, are immovable. **Cartilaginous joints**, such as intervertebral discs and the pubic symphysis, allow slight movement. **Synovial joints** are freely movable and have a joint cavity filled with synovial fluid, articular cartilage and a capsule reinforced by ligaments. Examples include the ball-and-socket (shoulder, hip), the hinge (elbow, knee) and the pivot (the joint between the first two vertebrae that lets you shake your head no). A **sprain** is damage to a ligament. A **dislocation** is when the bone ends are forced out of position. **Arthritis** is inflammation of a joint; in osteoarthritis, the articular cartilage wears away over time.

The three muscle tissues differ in structure and control. Skeletal muscle is multinucleate, striated and voluntary, attached to bones. Cardiac muscle is branched, striated, usually has one nucleus per cell, is joined by intercalated discs and is involuntary. Smooth muscle has spindle-shaped cells, a single nucleus, no striations, and is involuntary, in the walls of hollow organs.
`,
  ],
  cards: [
    ["Periosteum", "The membrane covering the outside of bone, with blood vessels and bone-forming cells."],
    ["Compact bone", "Dense bone made of osteons, forming the outer layer."],
    ["Spongy bone", "A lattice of bone that is light and absorbs stress."],
    ["Parathyroid hormone", "A hormone that raises blood calcium."],
    ["Calcitonin", "A hormone that lowers blood calcium by promoting bone deposition."],
    ["Osteoporosis", "A disease in which bone loss exceeds formation, making bones fragile."],
    ["Sprain", "Damage to a ligament."],
    ["Intercalated disc", "A junction between cardiac muscle cells that passes the signal quickly."],
  ],
  closed: [
    [
      "Which hormone is released when blood calcium falls?",
      ["Calcitonin", "Parathyroid hormone", "Insulin", "Glucagon"],
      "B",
    ],
    [
      "Astronauts lose bone mass in space mainly because:",
      ["Weightlessness reduces the mechanical stress on bone", "Space has no calcium", "Osteoblasts die in zero gravity", "They eat less"],
      "A",
    ],
    [
      "The joint between the first two vertebrae that allows you to shake your head is a:",
      ["Hinge joint", "Pivot joint", "Ball-and-socket joint", "Fibrous joint"],
      "B",
    ],
    [
      "A sprain is damage to a:",
      ["Bone", "Muscle", "Ligament", "Tendon"],
      "C",
    ],
    [
      "Which muscle type is multinucleate and voluntary?",
      ["Smooth", "Cardiac", "Skeletal", "All three"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Describe the negative feedback loop that regulates blood calcium when it falls below the normal range. Name the hormone, the organ that releases it and three target responses.",
      scheme: [
        "States that low calcium is detected by the parathyroid glands",
        "States that the parathyroid glands release PTH",
        "Gives two target responses of PTH, such as stimulating osteoclasts to release bone calcium and the kidneys to retain calcium",
        "States that vitamin D is activated to increase intestinal absorption, calcium rises, and PTH secretion falls",
      ],
      model:
        "The parathyroid glands detect the fall in blood calcium and release parathyroid hormone. PTH stimulates osteoclasts to release calcium from bone, and the kidneys to retain calcium. It also activates vitamin D, which increases absorption of calcium from the intestine. Blood calcium rises back to normal and PTH secretion falls, which is negative feedback.",
      answers: [
        [
          "full",
          "[[0|The parathyroid glands sense that blood calcium is low.]] [[1|They release parathyroid hormone, PTH.]] [[2|PTH makes osteoclasts release calcium from bone and makes the kidneys keep calcium.]] [[3|It also activates vitamin D so the intestine absorbs more, and when calcium is back to normal the PTH release stops.]]",
          "Full marks. The loop is complete, including the way it switches off.",
        ],
        [
          "full",
          "[[0|Low blood calcium is detected by the parathyroid glands.]] [[1|PTH is secreted.]] [[2|PTH increases bone resorption by osteoclasts and increases kidney reabsorption of calcium.]] [[3|Activated vitamin D improves intestinal absorption. As calcium returns to normal, PTH secretion falls.]]",
          "All four marks, with the response to PTH well described.",
        ],
        [
          "partial",
          "[[1|PTH is released.]] [[2|It makes bone release calcium.]]",
          "Name the gland that senses low calcium and add the other responses, including vitamin D.",
        ],
        [
          "partial",
          "[[0|The parathyroid detects the low calcium]] and releases calcitonin, which [[2|makes the bones release calcium]].",
          "Calcitonin lowers blood calcium. The hormone that raises it is PTH.",
          true,
        ],
        [
          "weak",
          "The pancreas releases insulin to bring the calcium up by moving it from the blood into the bones.",
          "Insulin controls glucose. Calcium is controlled by PTH and calcitonin, and low calcium triggers PTH.",
        ],
        [
          "weak",
          "[[2|The bones release calcium.]] This is positive feedback since the calcium is going up.",
          "The loop reverses the fall in calcium, so it is negative feedback. Name the hormone and the glands.",
        ],
      ],
    },
    {
      prompt:
        "A 68-year-old woman has a hip fracture from a minor fall. Explain the likely bone condition, two risk factors she may have, and two measures that could have lowered her risk.",
      scheme: [
        "Identifies osteoporosis as the likely condition",
        "Explains that bone loss exceeded formation, making bones porous and fragile",
        "Gives two risk factors, such as age, low estrogen after menopause, low calcium or vitamin D, or inactivity",
        "Gives two preventive measures, such as calcium and vitamin D intake and weight-bearing exercise",
      ],
      model:
        "She likely has osteoporosis, in which bone loss exceeds bone formation, so the bones are porous and fragile and break from a minor fall. Risk factors include age and the fall in estrogen after menopause, and low calcium and vitamin D or inactivity. Adequate calcium and vitamin D intake and regular weight-bearing exercise could have lowered her risk.",
      answers: [
        [
          "full",
          "[[0|It's probably osteoporosis.]] [[1|Her bones are losing more than they build, so they are porous and break easily.]] [[2|Risk factors are her age and low estrogen after menopause, and maybe low calcium and vitamin D.]] [[3|Getting enough calcium and vitamin D, and weight-bearing exercise like walking, would have helped.]]",
          "Full marks. Your prevention measures match the mechanism of bone remodeling.",
        ],
        [
          "full",
          "[[0|Osteoporosis.]] [[1|Osteoclast activity exceeds osteoblast activity, so bone density is low.]] [[2|Postmenopausal estrogen loss and inactivity are risk factors.]] [[3|Calcium, vitamin D and weight-bearing exercise throughout life protect against it.]]",
          "All four marks, with clear links between the risk factors and the mechanism.",
        ],
        [
          "partial",
          "[[0|She has osteoporosis.]] [[2|Age is a risk factor.]]",
          "Explain what is happening to the bone and add a second risk factor and two preventive measures.",
        ],
        [
          "partial",
          "[[3|Calcium and exercise help prevent it.]] [[1|Her bones are porous.]] It's caused by osteoarthritis.",
          "Osteoarthritis is a joint disease. Weak bones from loss of bone mass are osteoporosis.",
          true,
        ],
        [
          "weak",
          "She has arthritis, and the fall caused her hip to break because it hurts more with age.",
          "Arthritis is joint inflammation. A fracture from a minor fall suggests fragile bones, so osteoporosis.",
        ],
        [
          "weak",
          "[[3|She should rest in bed and avoid exercise.]] Her bones are too thick, which makes them break.",
          "Inactivity increases bone loss, and the problem is thin, porous bone. Weight-bearing exercise helps.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Sarcomere mechanics, motor units and muscle levers",
  note: `
## Objectives

Students will be able to:

1. explain how skeletal muscle contracts using the sliding filament model, with sarcomere calculations and the role of calcium and ATP;
2. name the major muscles of the body, describe the actions of prime movers, antagonists and synergists, and explain motor unit recruitment and levers.

## Materials

Muscle charts, a lever model (ruler on a fulcrum), spring scales, calculators, the quiz.

## Starter (6 minutes)

Pose: "A muscle fiber has 10,000 sarcomeres in a row, each 2.5 micrometers long. How long is the fiber? If every sarcomere shortens to 2.0 micrometers, how much shorter is the fiber?" Compute: 25 mm and 20 mm, a 20 percent shortening.

## Main activity

1. Sliding filament model with the numbers: sarcomere length at rest 2.5 micrometers, contraction shortens to about 2.0, and the filaments do not change length. Sketch the A band, I band and H zone.
2. Motor units: one motor neuron plus all the fibers it controls. Fine control has small units (few fibers); strong effort recruits more units. Twitch, summation and tetanus.
3. Lever systems: first-class (head on neck), second-class (calf raise) and third-class (biceps at the elbow). Third-class levers trade force for speed and range.
4. Revisit the main muscles and their actions.

## Checking for understanding

Ask: "Why does the biceps need a stronger force than the weight it lifts?"

## Quiz and problem set

Five quiz questions and a problem set with a sarcomere and a lever calculation.
`,
  reading: [
    "The mechanics of contraction",
    `
Skeletal muscle contraction can be described with numbers. A resting sarcomere is about 2.5 micrometers long. A muscle fiber with 10,000 sarcomeres in series is 25,000 micrometers, or 25 mm. If each sarcomere shortens to 2.0 micrometers during a contraction, the fiber becomes 10,000 times 2.0, or 20 mm, a shortening of 5 mm or 20 percent. The thick and thin filaments do not themselves get shorter. In the sarcomere, the **A band** is the length of the thick filaments and stays constant. The **I band** (thin filaments only) and the **H zone** (thick filaments only) get narrower as the thin filaments slide inward. The cross-bridge cycle needs ATP twice: once to power the stroke and once to release the head from actin. Calcium released from the sarcoplasmic reticulum binds a regulatory protein, troponin, to move tropomyosin off the binding sites on actin.

A single motor neuron and all the fibers it controls make a **motor unit**. In the muscles that control the eye, a motor unit may have fewer than ten fibers, which allows fine control. In the large muscles of the thigh, a unit may have thousands. A single impulse produces a brief **twitch**. If impulses arrive faster than the muscle can relax, the twitches add up (**summation**), and at a high frequency they fuse into a smooth sustained contraction called **tetanus**. The strength of a contraction is controlled by **recruitment**: adding more motor units. When you pick up a pen you use few units, and when you lift a heavy box you recruit many. Slow-twitch fibers, rich in mitochondria and myoglobin, resist fatigue and suit posture and endurance. Fast-twitch fibers contract rapidly and tire quickly, suited to sprinting.

The skeleton and muscles together form **levers**. A lever has a fulcrum (joint), an effort (muscle force) and a load. In a first-class lever, such as the head balanced on the neck, the fulcrum is between effort and load. In a second-class lever, such as standing on tiptoe, the load is between the fulcrum and effort. In a third-class lever, the most common in the body, the effort is between the fulcrum and the load, as the biceps pulls on the forearm about 4 cm from the elbow while a weight is held in the hand 35 cm from the elbow. The biceps force has to be much greater than the load: taking moments about the elbow, F times 4 = 50 N times 35, so F = 437 N, nearly nine times the weight lifted. What the body gains is speed and range of motion at the hand: a short contraction of the biceps moves the hand a long way.
`,
  ],
  cards: [
    ["A band", "The region of a sarcomere containing the thick filaments; constant in length."],
    ["I band", "The region containing only thin filaments; it narrows in contraction."],
    ["Troponin", "A regulatory protein that binds calcium and exposes the actin binding sites."],
    ["Motor unit", "A motor neuron and all the muscle fibers it controls."],
    ["Recruitment", "Increasing the force of contraction by activating more motor units."],
    ["Tetanus", "A smooth, sustained contraction caused by rapid stimulation."],
    ["Third-class lever", "A lever in which the effort lies between the fulcrum and the load."],
    ["Slow-twitch fiber", "A fatigue-resistant fiber rich in mitochondria and myoglobin."],
  ],
  closed: [
    [
      "A fiber has 10,000 sarcomeres of 2.5 micrometers each. How long is the fiber?",
      ["2.5 mm", "25 mm", "250 mm", "25 micrometers"],
      "B",
    ],
    [
      "When a sarcomere contracts, which region stays the same length?",
      ["I band", "H zone", "A band", "Whole sarcomere"],
      "C",
    ],
    [
      "Which type of motor unit would be found in muscles needing fine control, such as those of the eye?",
      ["Very large, thousands of fibers", "Small, with few fibers", "None", "A single giant fiber"],
      "B",
    ],
    [
      "Rapid stimulation that fuses twitches into a smooth sustained contraction is called:",
      ["Summation only", "Tetanus", "Rigor mortis", "A twitch"],
      "B",
    ],
    [
      "The biceps acting on the forearm is a:",
      ["First-class lever", "Second-class lever", "Third-class lever", "Not a lever"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A muscle fiber has 8000 sarcomeres, each 2.6 micrometers long at rest. Each shortens to 2.0 micrometers in a contraction. Calculate the length of the fiber before and after and the percent shortening, and state what happens to the lengths of the thick and thin filaments.",
      scheme: [
        "Calculates the resting length as 20.8 mm",
        "Calculates the contracted length as 16.0 mm",
        "Calculates the shortening as 4.8 mm, which is about 23 percent",
        "States that the filaments do not change length; they slide past each other",
      ],
      model:
        "At rest, 8000 times 2.6 micrometers is 20,800 micrometers, which is 20.8 mm. After contraction, 8000 times 2.0 is 16,000 micrometers, which is 16.0 mm. The shortening is 4.8 mm, about 23 percent of the original length. The thick and thin filaments do not change length; they slide past each other.",
      answers: [
        [
          "full",
          "[[0|At rest: 8000 × 2.6 μm = 20,800 μm = 20.8 mm.]] [[1|Contracted: 8000 × 2.0 μm = 16.0 mm.]] [[2|It shortens by 4.8 mm, which is 4.8/20.8 = 23%.]] [[3|The filaments themselves keep the same length; they slide over each other.]]",
          "Full marks. Dividing by the starting length gives the correct percent.",
        ],
        [
          "full",
          "[[0|Before: 20.8 mm.]] [[1|After: 16.0 mm.]] [[2|Shortening is 4.8 mm, about 23%.]] [[3|Sarcomeres shorten because the thin filaments slide inward, not because the filaments shrink.]]",
          "All four marks, with the key idea of sliding stated clearly.",
        ],
        [
          "partial",
          "[[0|Before 20.8 mm.]] [[1|After 16.0 mm.]] The shortening is 4.8/16.0 = 30%.",
          "Percent change uses the original length: 4.8 divided by 20.8 is 23 percent.",
        ],
        [
          "partial",
          "[[2|23% shorter]] and [[3|the filaments slide]].",
          "Good. Show the length before and after, with the calculations.",
          true,
        ],
        [
          "weak",
          "8000 + 2.6 = 8002.6 μm before and 8002.0 after, so it hardly changes. The filaments shrink.",
          "The fiber's length is the number of sarcomeres times the length of each. The filaments slide; they do not shrink.",
        ],
        [
          "weak",
          "[[0|8000 × 2.6 = 20,800 μm, or 20.8 mm.]] After contracting it is 2.0 mm because the sarcomeres get 10 times smaller.",
          "Each sarcomere shortens from 2.6 to 2.0 micrometers, not by a factor of ten. Recalculate 8000 times 2.0.",
        ],
      ],
    },
    {
      prompt:
        "A person holds a 50 N weight in the hand, 35 cm from the elbow. The biceps attaches 4 cm from the elbow. Calculate the force the biceps must exert to hold the arm still, and explain what this shows about third-class levers.",
      scheme: [
        "Applies the principle of moments about the elbow",
        "Calculates the force as 437.5 N (about 440 N)",
        "States that the muscle force is nearly nine times the load",
        "Explains that the third-class lever trades force for a large range and speed of movement at the hand",
      ],
      model:
        "Taking moments about the elbow: F times 4 cm = 50 N times 35 cm, so F = 437.5 N. The biceps force is nearly nine times the load. A third-class lever trades force for speed and range of motion: a short contraction of the muscle moves the hand through a large distance.",
      answers: [
        [
          "full",
          "[[0|Taking moments about the elbow, the clockwise and anticlockwise moments are equal.]] [[1|F × 4 = 50 × 35 so F = 437.5 N.]] [[2|The muscle has to pull about nine times harder than the weight.]] [[3|A third-class lever gives a large range and speed at the hand for a small muscle contraction, at the cost of force.]]",
          "Full marks. The explanation gives the trade-off, which is the core idea of the lever.",
        ],
        [
          "full",
          "[[0|Moments about the elbow must balance.]] [[1|F = (50 × 35)/4 ≈ 440 N.]] [[2|That's about nine times the load.]] [[3|The advantage is that the hand moves fast and far when the muscle shortens a little.]]",
          "All four marks. Rounding to 440 N is sensible for the data given.",
        ],
        [
          "partial",
          "[[0|Take moments about the elbow.]] [[1|F = 437.5 N.]] The biceps force is the same as the load because it is holding it still.",
          "The muscle force is much greater than the load, nearly nine times, because the muscle acts close to the elbow.",
        ],
        [
          "partial",
          "[[2|The biceps has to pull nine times harder.]] [[3|The lever gives range and speed at the hand.]]",
          "Good. Show the moments calculation that gives 437.5 N.",
          true,
        ],
        [
          "weak",
          "F = 50 + 35 + 4 = 89 N, because you add up the numbers in the problem.",
          "A lever problem uses moments: force times distance from the pivot. The moments must balance.",
        ],
        [
          "weak",
          "[[1|F = 50 × 35 / 4 = 437.5 N.]] That means the muscle is very efficient since it pulls so hard.",
          "A large required force shows that the arrangement is not efficient for force. The gain is in speed and range.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Neurophysiology: potentials, conduction speed, synapses and reflex testing",
  note: `
## Objectives

Students will be able to:

1. describe the structure of a neuron and how an action potential is generated and travels, including conduction time calculations;
2. explain synaptic transmission, summation and the reflex arc, and measure reaction time.

## Materials

Meter sticks, calculators, neuron model, reflex hammer (demonstration only), the practical sheet.

## Starter (6 minutes)

Pose: "A signal must travel 1.5 m from your toe to your brain. If the nerve conducts at 1 m/s, how long would it take? At 100 m/s?" Compute: 1.5 s and 15 ms. Ask what this says about myelin.

## Main activity

1. Resting potential and the Nernst idea: potassium leaks out, leaving the inside negative. Threshold is about -55 mV, the peak about +30 mV. Describe depolarization, repolarization and hyperpolarization.
2. Conduction speed and myelination: speed = distance / time. Compare myelinated (up to 120 m/s) and unmyelinated fibers (about 1 m/s). Discuss multiple sclerosis.
3. Synapses: excitatory and inhibitory neurotransmitters, summation of inputs, removal by enzymes and reuptake. Examples: acetylcholine and its blocking by curare, and SSRIs.
4. Practical: measure reaction time with the ruler-drop test using d = 1/2 g t squared, and compare with a reflex.

## Checking for understanding

Ask: "Why does a reflex take about 30 ms, and a reaction to a visual cue about 200 ms?"

## Practical write-up

Collect with data table and interpretation.
`,
  reading: [
    "Speed, summation and reaction time",
    `
A resting neuron is negative inside, at about -70 mV, because the membrane leaks more potassium out than sodium in and because the sodium-potassium pump keeps the gradients. When excitatory inputs depolarize the membrane to a **threshold** near -55 mV, voltage-gated sodium channels open, the voltage shoots up to about +30 mV, and then potassium channels open, so the voltage falls, often briefly below the resting level (**hyperpolarization**). During the **refractory period**, the neuron cannot fire again, which makes the impulse travel in one direction.

How fast does the signal travel? In an unmyelinated axon, the action potential spreads continuously and the speed is about 1 m/s. In a myelinated axon, it jumps from node to node, and speeds reach 120 m/s. The conduction time is distance divided by speed. For 1.5 m from the toe to the spinal cord and brain, an unmyelinated fiber would take 1.5 s, while a myelinated one at 100 m/s takes 0.015 s, or 15 ms. In multiple sclerosis the immune system attacks myelin in the central nervous system, so conduction slows or fails, causing weakness, vision problems and loss of coordination.

At a **synapse**, neurotransmitter release triggers a **postsynaptic potential** in the receiving neuron. Excitatory synapses (using glutamate, for example) depolarize the membrane, and inhibitory synapses (using GABA) hyperpolarize it. A neuron receives thousands of inputs. It adds them up: **temporal summation** is the adding of rapid signals from one synapse, and **spatial summation** is the adding of signals from many synapses at once. The neuron fires only if the sum reaches the threshold. Synaptic transmission is ended by enzymes, which break down the transmitter, or by reuptake into the terminal. Drugs act here. Curare blocks acetylcholine receptors at the neuromuscular junction, causing paralysis. Selective serotonin reuptake inhibitors (SSRIs) block the reuptake of serotonin, leaving more of it active in the synapse.

Reaction time shows the speed of a pathway. In the ruler drop test, a ruler is released and you catch it as soon as you see it fall. The distance d it fell gives the time by d = 1/2 g t squared, so t = the square root of (2d/g). If you catch it after 0.15 m, t = the square root of (0.30/9.8) = 0.175 s. Visual reactions need the eye, the visual cortex, the motor cortex and the muscles, so they take around 0.2 s. A **reflex** like the knee jerk, through the spinal cord alone, takes about 0.03 s.
`,
  ],
  cards: [
    ["Threshold", "The membrane voltage, about -55 mV, at which an action potential fires."],
    ["Hyperpolarization", "A membrane potential more negative than the resting potential."],
    ["Refractory period", "The time after firing during which a neuron cannot fire again."],
    ["Temporal summation", "Adding the effects of rapid successive signals at one synapse."],
    ["Spatial summation", "Adding the effects of signals from many synapses at once."],
    ["Multiple sclerosis", "A disease in which myelin in the CNS is damaged, slowing conduction."],
    ["SSRI", "A drug that blocks serotonin reuptake, leaving more serotonin in the synapse."],
    ["Reaction time", "The time between a stimulus and the response."],
  ],
  closed: [
    [
      "A signal travels 1.5 m along an unmyelinated axon at 1 m/s. How long does it take?",
      ["0.015 s", "0.15 s", "1.5 s", "15 s"],
      "C",
    ],
    [
      "A ruler is caught after falling 0.15 m. The reaction time is about (g = 9.8 m/s2):",
      ["0.05 s", "0.175 s", "0.50 s", "1.5 s"],
      "B",
    ],
    [
      "An inhibitory neurotransmitter such as GABA usually causes:",
      ["Depolarization", "Hyperpolarization", "No change", "A larger action potential"],
      "B",
    ],
    [
      "Why can an action potential only travel in one direction?",
      ["The axon only conducts one way", "The refractory period prevents backward firing", "Neurotransmitters point forward", "Myelin blocks it"],
      "B",
    ],
    [
      "Curare causes paralysis by:",
      ["Blocking acetylcholine receptors", "Destroying myelin", "Increasing sodium channels", "Blocking calcium entry in the heart"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A signal must travel 1.2 m from the foot to the spinal cord. Calculate the time taken in an unmyelinated fiber conducting at 1.0 m/s and in a myelinated fiber at 80 m/s. Explain how myelin increases speed and what happens in multiple sclerosis.",
      scheme: [
        "Calculates the unmyelinated time as 1.2 s",
        "Calculates the myelinated time as 0.015 s (15 ms)",
        "Explains that the impulse jumps from node to node in myelinated fibers (saltatory conduction)",
        "Explains that in multiple sclerosis myelin is damaged, so conduction slows or fails",
      ],
      model:
        "Time equals distance divided by speed. For the unmyelinated fiber, 1.2 / 1.0 = 1.2 s. For the myelinated fiber, 1.2 / 80 = 0.015 s, or 15 ms. In myelinated fibers the impulse jumps from node of Ranvier to node, which is much faster than continuous conduction. In multiple sclerosis the myelin is damaged, so conduction slows or fails.",
      answers: [
        [
          "full",
          "[[0|Unmyelinated: 1.2 m ÷ 1.0 m/s = 1.2 s.]] [[1|Myelinated: 1.2 ÷ 80 = 0.015 s = 15 ms.]] [[2|Myelin insulates the axon so the impulse jumps between the nodes of Ranvier, which is faster than traveling continuously.]] [[3|In MS the myelin is damaged so signals are slowed or blocked.]]",
          "Full marks. The speed difference is nearly 100-fold, which is why myelin matters.",
        ],
        [
          "full",
          "[[0|t = d/v = 1.2 s for the unmyelinated fiber.]] [[1|For 80 m/s, t = 0.015 s.]] [[2|Saltatory conduction lets the action potential leap between nodes.]] [[3|Multiple sclerosis destroys myelin in the CNS, slowing conduction and causing symptoms.]]",
          "All four marks, with precise terminology.",
        ],
        [
          "partial",
          "[[0|1.2 seconds for the unmyelinated fiber.]] [[1|0.015 seconds for the myelinated fiber.]]",
          "Explain how myelin speeds the signal, using the nodes, and what happens in multiple sclerosis.",
        ],
        [
          "partial",
          "[[2|The impulse jumps between nodes.]] [[3|MS damages myelin.]] The times are 1.2 and 15 seconds.",
          "Check the myelinated time: 1.2 divided by 80 is 0.015 s, not 15 s.",
          true,
        ],
        [
          "weak",
          "1.2 × 1.0 = 1.2 s and 1.2 × 80 = 96 s. Myelin slows the signal so it can be more careful.",
          "Time is distance divided by speed, and myelin increases the speed.",
        ],
        [
          "weak",
          "[[0|It takes 1.2 s unmyelinated.]] In MS the nerves grow too much myelin and become too fast.",
          "In multiple sclerosis the myelin is damaged, not overgrown, which slows or blocks the signals.",
        ],
      ],
    },
    {
      prompt:
        "Explain how a neuron decides whether to fire when it receives excitatory and inhibitory inputs. Include threshold, summation and the effect of an inhibitory neurotransmitter such as GABA.",
      scheme: [
        "States that excitatory inputs depolarize the membrane and inhibitory inputs hyperpolarize it",
        "States that the neuron sums the inputs (spatial and temporal summation)",
        "States that the neuron fires only if the sum reaches threshold, about -55 mV",
        "States that GABA hyperpolarizes the membrane, making it harder to reach threshold",
      ],
      model:
        "Excitatory inputs depolarize the membrane and inhibitory inputs hyperpolarize it. The neuron sums the inputs from many synapses at once (spatial) and in rapid succession (temporal). It fires only if the total reaches the threshold of about -55 mV. GABA hyperpolarizes the membrane, so it makes it harder to reach the threshold.",
      answers: [
        [
          "full",
          "[[0|Excitatory synapses depolarize the membrane and inhibitory ones hyperpolarize it.]] [[1|The neuron adds up all the inputs, from many synapses at once and from fast repeated signals.]] [[2|If the total reaches about −55 mV it fires an action potential.]] [[3|GABA makes the membrane more negative so it is harder to reach threshold.]]",
          "Full marks. Summation and threshold are both explained.",
        ],
        [
          "full",
          "[[0|Excitatory postsynaptic potentials push the voltage up and inhibitory ones push it down.]] [[1|Spatial and temporal summation add them together.]] [[2|Only if the sum reaches threshold does the neuron fire.]] [[3|GABA hyperpolarizes the neuron so it is less likely to fire.]]",
          "All four marks, concise and correct.",
        ],
        [
          "partial",
          "[[0|Excitatory inputs depolarize it and inhibitory inputs hyperpolarize it.]] [[2|It fires when it reaches threshold.]]",
          "Include summation and say how GABA affects the likelihood of firing.",
        ],
        [
          "partial",
          "[[1|The neuron adds all the inputs.]] [[3|GABA makes it more likely to fire.]]",
          "GABA is inhibitory: it hyperpolarizes the membrane, so it makes firing less likely.",
          true,
        ],
        [
          "weak",
          "A neuron fires every time it gets any signal, and GABA is a signal that makes it fire more.",
          "A neuron fires only when the summed inputs reach threshold, and GABA inhibits firing.",
        ],
        [
          "weak",
          "[[2|It fires at threshold.]] Summation means the neuron gets bigger when it gets more signals.",
          "Summation is the adding of the electrical effects of the inputs, not growth of the neuron.",
        ],
      ],
    },
  ],
  practical: {
    title: "Reaction time and reflex timing",
    instructions:
      "Use the ruler-drop test to measure the visual reaction time of each partner over ten trials. Convert the distance fallen to time using t = sqrt(2d/g). Then compare conditions: dominant and non-dominant hand, and with a distraction (counting backward by sevens). Present a table and graph, and discuss the pathway involved and how a reflex differs.",
    steps: [
      ["Hold a meter stick at the 100 cm end so that your partner's thumb and forefinger surround the zero mark without touching."],
      ["Release the ruler without warning and have your partner catch it. Record the distance fallen."],
      ["Repeat ten trials with the dominant hand, then ten with the other hand.", "Do not drop the ruler when your partner is not ready, to avoid injury to fingers."],
      ["Repeat with a distraction, such as counting backward from 100 by sevens."],
      ["Calculate the mean distance and the mean reaction time for each condition."],
      ["Compare conditions and explain the neural pathway involved in each."],
    ],
    rubric: [
      ["Method: ten trials, controlled conditions, random release", 4],
      ["Calculation and graph: correct use of t = sqrt(2d/g) and mean times", 4],
      ["Interpretation: pathway, effect of distraction and comparison with reflex", 4],
    ],
    writeUps: [
      [
        "full",
        "The mean distance fallen for the dominant hand was 17.2 cm, giving t = sqrt(2 x 0.172 / 9.8) = 0.187 s. For the non-dominant hand it was 19.5 cm, or 0.199 s, and with the distraction it was 24.1 cm, or 0.222 s. The visual signal must travel from the eye to the visual cortex, to the motor cortex, to the spinal cord and the hand muscles, which takes about 0.2 s. A reflex like the knee jerk only passes through the spinal cord and takes about 0.03 s. The distraction slows the response because the cortex is busy with the arithmetic.",
        [4, 4, 4],
        "An excellent report: well-controlled trials, correct calculations, and an explanation based on the pathway.",
      ],
      [
        "full",
        "I did ten trials per condition with my partner not knowing when I would drop the ruler. Means: dominant 15.8 cm (0.180 s), non-dominant 18.4 cm (0.194 s), distracted 22.0 cm (0.212 s). I used t = sqrt(2d/g). The extra delay with distraction probably comes from the brain processing the extra task. The reflex arc skips the brain, so a reflex is about six times faster. A source of error is that my partner could guess the timing after several trials, which made results look better.",
        [4, 3, 4],
        "Very good. A graph with labeled axes would complete the data section.",
      ],
      [
        "partial",
        "We dropped the ruler ten times for each hand. The dominant hand was a little faster than the other hand, and the distracted trials were slower than the normal trials. My partner caught it at about 17 cm on average for the dominant hand. I did not convert this to a time because I was not sure which formula to use for the falling ruler.",
        [3, 1, 2],
        "Use d = 1/2 g t squared to get t = sqrt(2d/g). For 17 cm that is about 0.19 s. Then compare the conditions in seconds.",
      ],
      [
        "partial",
        "Dominant: 0.187 s. Non-dominant: 0.199 s. With distraction: 0.222 s. We did ten trials each and I calculated the mean times using the formula. The reaction is slower with the distraction because it is harder to concentrate on two things at once, but I am not sure which parts of the brain are involved in it.",
        [3, 4, 1],
        "Your calculations are right. Describe the pathway: eye, visual cortex, motor cortex, spinal cord, muscle. A reflex skips the brain.",
      ],
      [
        "weak",
        "The ruler fell and my partner caught it. Sometimes they were fast and sometimes slow. The times were different each time. I think the reaction time depends on how awake you are, but we were all tired because it was the end of the day and there wasn't enough time.",
        [1, 0, 0],
        "Record the distance each time, convert to time, and compare conditions with numbers.",
      ],
      [
        "weak",
        "The reaction time is the same as the speed of the ruler, which is 9.8 m/s because that is how fast it falls. A reflex is the same as a reaction because both are fast. The distraction did not change anything because the brain is always the same speed.",
        [1, 0, 0],
        "The ruler accelerates at 9.8 m/s2, and the time depends on the distance it falls. A reflex is faster than a conscious reaction, and distraction slows the reaction.",
      ],
    ],
  },
};

const w8: WeekInput = {
  topic: "Brain regions, clinical neurology and the divisions of the nervous system",
  note: `
## Objectives

Students will be able to:

1. describe the main regions of the brain and the roles of the central and peripheral nervous systems, and link damage to symptoms;
2. use a model or case to report what the structures of an organ system show about their function.

## Materials

Brain atlas images, case study cards, sheep brain or model for reference, the worksheet and quiz.

## Starter (6 minutes)

Give a case: "A man has a stroke. He understands speech but cannot form words, and his right arm is weak." Ask students to predict the location of damage before the lesson, then revisit.

## Main activity

1. Functional areas of the cortex: primary motor (precentral gyrus), primary somatosensory (postcentral gyrus), Broca's area (speech production), Wernicke's area (comprehension), visual cortex (occipital lobe). Map the symptoms in the case to the left frontal lobe near Broca's area.
2. Deep structures and the brainstem: thalamus, hypothalamus, limbic system, cerebellum, medulla. Link damage to symptoms in short cases (cerebellar ataxia, medullary stroke).
3. Peripheral divisions: cranial nerves, somatic and autonomic. Compare sympathetic and parasympathetic effects in a table, including the pupil, heart, gut and bladder.
4. Brain death and why the brainstem matters.

## Checking for understanding

Ask: "What would damage to Wernicke's area do to speech?" Look for fluent but meaningless speech.

## Quiz

Five questions linking regions to symptoms.
`,
  reading: [
    "Where is the damage? Reading symptoms as a map",
    `
Because different parts of the brain have different jobs, doctors can often work out where the damage is from the symptoms. The cerebral cortex is organized into functional areas. The **primary motor cortex** in the precentral gyrus of the frontal lobe sends signals for voluntary movement, and the **primary somatosensory cortex** in the postcentral gyrus of the parietal lobe receives touch, pain and temperature information. Each is laid out as a map of the body, the "homunculus," with large areas for the hands and face. The **visual cortex** is in the occipital lobe and the **auditory cortex** in the temporal lobe. In most people, two areas in the left hemisphere handle language. **Broca's area**, in the frontal lobe, is needed to produce speech. Damage causes slow, effortful speech with understanding intact. **Wernicke's area**, in the temporal lobe, is needed to understand language. Damage causes fluent speech that has little meaning, and poor comprehension.

Because the pathways cross, a stroke in the left motor cortex causes weakness on the right side of the body. The man in the opening case, who understands but cannot form words and has a weak right arm, has probably had damage to the left frontal lobe, involving Broca's area and the adjacent motor cortex, for example through blockage of the left middle cerebral artery.

Deeper structures have specific roles. The **thalamus** relays sensory information to the cortex. The **hypothalamus** controls temperature, hunger, thirst, and hormones through the pituitary. The **limbic system**, including the amygdala and hippocampus, is involved in emotion and memory; damage to the hippocampus makes it hard to form new memories. The **cerebellum** coordinates movement. Damage causes ataxia, a staggering, unsteady gait, and a tremor on intended movement. The **brainstem** controls vital functions: the medulla regulates the heart and breathing, the pons relays signals and helps regulate breathing, and the midbrain controls some eye movements and reflexes. Because the brainstem controls breathing, its destruction is the basis for the legal definition of brain death.

The peripheral nervous system has twelve pairs of cranial nerves and thirty-one pairs of spinal nerves. The autonomic division works through two branches that usually have opposite effects. The sympathetic branch dilates the pupils, speeds up the heart, widens the airways, slows digestion and relaxes the bladder. The parasympathetic branch constricts the pupils, slows the heart, stimulates digestion and contracts the bladder. In health, the balance shifts according to the situation. Interpreting symptoms as a map of damage is the central skill of clinical neurology.
`,
  ],
  cards: [
    ["Primary motor cortex", "The area in the frontal lobe that sends signals for voluntary movement."],
    ["Primary somatosensory cortex", "The area in the parietal lobe that receives touch and pain information."],
    ["Broca's area", "The frontal lobe area needed to produce speech."],
    ["Wernicke's area", "The temporal lobe area needed to understand language."],
    ["Hippocampus", "A limbic structure needed to form new memories."],
    ["Ataxia", "Unsteady, uncoordinated movement, often from cerebellar damage."],
    ["Brain death", "Permanent loss of all brain function, including the brainstem."],
    ["Homunculus", "A map of the body on the motor or sensory cortex."],
  ],
  closed: [
    [
      "A person understands speech but cannot form words. Damage is most likely in:",
      ["Wernicke's area", "Broca's area", "The occipital lobe", "The cerebellum"],
      "B",
    ],
    [
      "A stroke in the left motor cortex causes weakness on the:",
      ["Left side", "Right side", "Both sides", "Neither side"],
      "B",
    ],
    [
      "A patient staggers when walking and has a tremor when reaching for a cup. Which structure is most likely damaged?",
      ["Hippocampus", "Cerebellum", "Thalamus", "Occipital lobe"],
      "B",
    ],
    [
      "Damage to the hippocampus most affects:",
      ["Vision", "Forming new memories", "Breathing", "Balance"],
      "B",
    ],
    [
      "Which action is a parasympathetic effect?",
      ["Dilating the pupils", "Speeding up the heart", "Stimulating digestion", "Widening the airways"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A woman has a stroke. Afterward she speaks fluently but her sentences make no sense, and she cannot understand what is said to her. Her movement is normal. Identify the area most likely damaged, the hemisphere and lobe, and contrast her speech problem with that caused by damage to Broca's area.",
      scheme: [
        "Identifies Wernicke's area",
        "Locates it in the temporal lobe of the left hemisphere",
        "Describes Wernicke's damage as fluent but meaningless speech with poor comprehension",
        "Contrasts with Broca's damage, which causes slow, effortful speech with comprehension intact",
      ],
      model:
        "The damage is most likely in Wernicke's area, in the temporal lobe of the left hemisphere. This causes fluent speech that makes little sense and poor comprehension. In contrast, damage to Broca's area in the frontal lobe causes slow, effortful speech with comprehension intact.",
      answers: [
        [
          "full",
          "[[0|It is Wernicke's area.]] [[1|It is in the temporal lobe of the left hemisphere.]] [[2|Damage there gives fluent speech that doesn't mean anything and she can't understand others.]] [[3|With Broca's area damage, speech is slow and effortful but the person understands.]]",
          "Full marks. The contrast between the two aphasias is clear.",
        ],
        [
          "full",
          "[[0|Wernicke's area is the likely site.]] [[1|It's in the left temporal lobe for most people.]] [[2|Patients speak smoothly but with nonsense words and don't comprehend.]] [[3|In Broca's aphasia comprehension is intact but speech is halting.]]",
          "All four marks, with the correct hemisphere and lobe.",
        ],
        [
          "partial",
          "[[0|Wernicke's area.]] [[2|Speech is fluent but does not make sense.]]",
          "Say where it is, and contrast with the effects of damage to Broca's area.",
        ],
        [
          "partial",
          "[[1|The temporal lobe.]] [[3|Broca's damage gives slow speech.]] The damage is in Broca's area.",
          "Her comprehension is poor and her speech is fluent, which points to Wernicke's area, not Broca's.",
          true,
        ],
        [
          "weak",
          "It is the cerebellum, because that controls speech and walking.",
          "The cerebellum coordinates movement. Language depends on areas of the cortex: Wernicke's area and Broca's area.",
        ],
        [
          "weak",
          "[[2|Her speech is fluent but meaningless.]] The occipital lobe is damaged, as it is the part that deals with words.",
          "The occipital lobe processes vision. Comprehension of language is in Wernicke's area in the temporal lobe.",
        ],
      ],
    },
    {
      prompt:
        "A cyclist hits their head and is found unresponsive and not breathing on their own. A scan shows damage to the base of the brain. Which structure is most likely involved, and why does its damage matter for the legal definition of brain death?",
      scheme: [
        "Identifies the brainstem (medulla)",
        "States that the medulla controls breathing and heart rate",
        "States that damage can stop spontaneous breathing, so the person cannot survive without support",
        "States that brain death includes irreversible loss of brainstem function, including the drive to breathe",
      ],
      model:
        "The brainstem, especially the medulla, is most likely involved. The medulla controls breathing and heart rate. Its damage stops spontaneous breathing, so the person cannot survive without a ventilator. Brain death is defined as the irreversible loss of all brain function, including the brainstem and its drive to breathe.",
      answers: [
        [
          "full",
          "[[0|It's the brainstem, the medulla.]] [[1|The medulla controls breathing and heart rate.]] [[2|If it's damaged the person can't breathe on their own and needs a ventilator.]] [[3|Brain death means the irreversible loss of all brain function, including the brainstem and the drive to breathe.]]",
          "Full marks. You linked the structure to its vital role and to the definition.",
        ],
        [
          "full",
          "[[0|Brainstem damage, especially the medulla oblongata.]] [[1|It runs the vital automatic functions of breathing and cardiovascular control.]] [[2|Without it spontaneous breathing stops.]] [[3|Because of this, loss of brainstem function is part of the criteria for brain death.]]",
          "All four marks, with careful wording.",
        ],
        [
          "partial",
          "[[0|The brainstem.]] [[2|They can't breathe on their own.]]",
          "Name the medulla and its functions, and explain the link to brain death.",
        ],
        [
          "partial",
          "[[1|The medulla controls breathing.]] [[3|Brain death is when the cerebrum stops working.]]",
          "Brain death includes loss of the brainstem too, not only the cerebrum. Name the structure and explain the breathing problem.",
          true,
        ],
        [
          "weak",
          "The cerebellum is damaged, and that is why the person cannot think or breathe.",
          "The cerebellum coordinates movement. Breathing is controlled by the medulla in the brainstem.",
        ],
        [
          "weak",
          "[[3|Brain death is when the brain stops working.]] The frontal lobe controls breathing and so it was damaged.",
          "The frontal lobe handles planning and voluntary movement. Breathing is controlled by the brainstem.",
        ],
      ],
    },
  ],
};

writeCourse(
  "honors-anatomy-and-physiology-grade-12.json",
  "Honors Anatomy and Physiology",
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
