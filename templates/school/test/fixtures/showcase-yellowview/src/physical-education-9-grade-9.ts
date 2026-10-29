import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Physical Education 9, Grade 9, Quarter 1. Standards: SHAPE America National
 * Standards for K-12 Physical Education (motor skills, tactics, fitness,
 * responsibility, value of activity) with a Health Education week, in the
 * school's own words. No practical write-ups: the skills are assessed by
 * observation, and the written work covers the ideas behind them.
 */

const w1: WeekInput = {
  topic: "The five parts of fitness, a baseline test and a SMART goal",
  note: `
## Objectives

Students will be able to:

1. explain the five components of health-related fitness and give an example of each;
2. complete a baseline fitness assessment, including aerobic capacity, strength and flexibility, and record the results;
3. set a personal SMART fitness goal and write a plan for reaching it.

## Materials

Stopwatches, a measured track or cones for a one-mile walk or run, mats, a sit-and-reach box, recording sheets, the quiz.

## Starter (6 minutes)

Ask: "Who is fitter, a marathon runner or a weightlifter?" Take both sides, then reveal that fitness has several parts and each person is stronger in some than others.

## Main activity

1. The five components: cardiorespiratory endurance (the heart and lungs keep working during long activity), muscular strength (the most force a muscle can produce once), muscular endurance (repeating a movement many times), flexibility (the range of motion at a joint), and body composition (the share of the body that is fat compared with muscle, bone and other tissue).
2. Baseline tests, done safely with a short warm-up: timed one-mile walk or run, push-ups in one minute, curl-ups in one minute, and sit-and-reach. Record results in a fitness log without comparing students with each other.
3. SMART goals: specific, measurable, achievable, relevant, time-bound. Example: "Lower my mile time from 10:30 to 9:30 in 8 weeks by running three days a week and adding 5 minutes every two weeks."
4. A plan includes the activities, how often, how long, how to track progress, and a way to adjust.

## Checking for understanding

Ask: "Which component does a plank hold mostly test, strength or endurance?"

## Quiz

The five components and goal setting.
`,
  reading: [
    "What fitness is made of, and how to aim at a goal",
    `
People often think of fitness as one thing: being able to run fast, or being strong. In fact, health-related fitness has **five components**, and each affects how well your body works in daily life.

**Cardiorespiratory endurance** is the ability of your heart, blood vessels and lungs to supply the muscles with oxygen during long activity. A good example is jogging a mile without stopping. **Muscular strength** is the greatest force a muscle or group of muscles can produce in a single effort, such as lifting a heavy box once. **Muscular endurance** is the ability of muscles to keep working or to repeat a movement many times: doing 20 push-ups in a row or holding a plank for a minute. **Flexibility** is the range of motion at a joint, such as reaching toward your toes in the sit-and-reach test. **Body composition** is the proportion of your body made up of fat compared with muscle, bone and other lean tissue. A healthy body needs some fat, so the goal is a healthy range, not the lowest number. Each component protects health: stronger hearts and lungs reduce the risk of disease, strong muscles protect joints and bones, and flexibility lowers the risk of some injuries.

Before you can improve, you need to know where you start. A **baseline assessment** is a set of tests done at the start. This quarter you will do a timed one-mile walk or run for cardiorespiratory endurance, push-ups in one minute for muscular endurance of the upper body, curl-ups in one minute for abdominal endurance, and the sit-and-reach for flexibility. A short warm-up comes first to reduce the risk of injury. The aim is to compare your results with **your own** later results, not with another student, since bodies develop at different rates.

Next, set a **SMART goal**. SMART stands for **specific** (clear exactly what), **measurable** (a number you can check), **achievable** (hard but possible), **relevant** (it matters to you) and **time-bound** (a deadline). "Get fitter" is not SMART. "Lower my mile time from 10:30 to 9:30 in eight weeks" is. A **plan** shows how: running three days a week, adding five minutes of running every two weeks, strength work on two other days, and a chart to track the times. Include a day to rest, because muscles grow stronger during recovery. If you do not see progress after a few weeks, adjust the plan rather than giving up. A good goal and a written plan turn good intentions into habits.
`,
  ],
  cards: [
    ["Cardiorespiratory endurance", "The ability of the heart and lungs to fuel long activity."],
    ["Muscular strength", "The most force a muscle can produce in one effort."],
    ["Muscular endurance", "The ability to repeat a movement many times."],
    ["Flexibility", "The range of motion at a joint."],
    ["Body composition", "The proportion of fat compared with lean tissue."],
    ["Baseline", "Your starting measurement, used for later comparison."],
    ["SMART goal", "Specific, measurable, achievable, relevant and time-bound."],
    ["Warm-up", "Light activity to prepare the body before exercise."],
  ],
  closed: [
    [
      "Which component does a one-mile run mainly test?",
      ["Flexibility", "Cardiorespiratory endurance", "Muscular strength", "Body composition"],
      "B",
    ],
    [
      "Doing 20 push-ups in a row mainly shows:",
      ["Muscular endurance", "Flexibility", "Body composition", "Reaction time"],
      "A",
    ],
    [
      "Which goal is SMART?",
      ["Get fitter", "Lower my mile time from 10:30 to 9:30 in eight weeks", "Run more someday", "Be the best"],
      "B",
    ],
    [
      "Why do we compare a baseline with our own later results instead of with other students?",
      ["Bodies develop at different rates", "Teachers prefer it", "Tests are different each day", "Comparisons are not allowed"],
      "A",
    ],
    [
      "The sit-and-reach test measures:",
      ["Strength", "Flexibility", "Speed", "Balance"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Name the five components of health-related fitness and give a different everyday or sport example of each. Then say which one you think you most need to improve and why.",
      scheme: [
        "Names all five components correctly",
        "Gives a correct example for at least three components",
        "Gives a correct example for every component, distinguishing strength from endurance",
        "Chooses a component to improve and gives a personal reason",
      ],
      model:
        "The five components are cardiorespiratory endurance, muscular strength, muscular endurance, flexibility and body composition. Examples: jogging a mile without stopping, lifting a heavy box once, doing 20 push-ups, reaching toward the toes, and the share of the body that is fat compared with muscle. I most need to improve flexibility, because I get stiff hamstrings after soccer practice.",
      answers: [
        [
          "full",
          "[[0|The five are cardiorespiratory endurance, muscular strength, muscular endurance, flexibility and body composition.]] [[1|Examples: jogging a mile without stopping, lifting one heavy box, and reaching toward the toes.]] [[2|Strength is one maximum effort like a single heavy lift, endurance is repeating, like 20 push-ups, and body composition is the share of fat compared with muscle.]] [[3|I most need to improve flexibility, because my hamstrings get stiff after soccer.]]",
          "Full marks. You separated strength from endurance clearly.",
        ],
        [
          "full",
          "[[0|Cardiorespiratory endurance, muscular strength, muscular endurance, flexibility, body composition.]] [[1|Swimming laps is cardiorespiratory endurance, and a yoga stretch shows flexibility.]] [[2|Squatting a heavy weight once is strength; holding a plank for a minute is muscular endurance; body composition is the proportion of fat and lean tissue.]] [[3|I need to improve cardiorespiratory endurance because I get out of breath on the stairs.]]",
          "Full marks. Each example fits its component exactly.",
        ],
        [
          "partial",
          "[[0|The five are endurance, strength, flexibility, speed and balance.]] [[3|I need to improve strength.]] Examples: running is strength and stretching is endurance.",
          "Speed and balance are skill-related. Body composition is the fifth health-related component, and the examples are switched.",
        ],
        [
          "partial",
          "[[1|Running a mile is cardiorespiratory endurance and reaching your toes is flexibility.]] [[3|I need to work on flexibility.]] Body composition means how much you weigh.",
          "Body composition is the proportion of fat compared with lean tissue, not weight alone.",
          true,
        ],
        [
          "weak",
          "Fitness is only being able to run fast. The other parts are not important.",
          "Fitness has five health-related components. Name all of them.",
        ],
        [
          "weak",
          "I do not need to improve anything because I am already perfect at all five.",
          "Everyone can improve in at least one component. Choose one and say why.",
        ],
      ],
    },
    {
      prompt:
        "Write a SMART goal based on a fitness test you have taken (for example, push-ups in one minute or the mile). State your baseline, your target, the deadline, and then write a weekly plan with at least three activities, how often, and one way to track progress and one way you will adjust the plan if you do not improve.",
      scheme: [
        "States a baseline and a measurable target with a deadline",
        "Shows the goal is specific, achievable and relevant to the student",
        "Writes a weekly plan with at least three activities and how often",
        "Includes a tracking method and a way to adjust the plan",
      ],
      model:
        "Goal: raise my one-minute push-ups from 12 to 20 in eight weeks, because upper-body endurance helps me in swimming. Plan: push-ups on Monday, Wednesday and Friday (three sets of as many as I can); a 20-minute jog on Tuesday and Thursday; a rest day on Sunday. I will record my maximum on Fridays in my log. If I have not improved after three weeks, I will add a fourth set or an extra session.",
      answers: [
        [
          "full",
          "[[0|My baseline is 12 push-ups in a minute. My goal is 20 in eight weeks.]] [[1|It's specific and achievable, and relevant because upper-body endurance helps my swimming.]] [[2|Plan: push-ups Monday, Wednesday and Friday, three sets each; a 20-minute jog Tuesday and Thursday; rest on Sunday.]] [[3|I'll record my best set each Friday, and if I haven't improved after three weeks I'll add a set or another session.]]",
          "Full marks. The plan includes rest, tracking and a way to adjust.",
        ],
        [
          "full",
          "[[0|Baseline mile: 10:30. Target: 9:30 by the end of the quarter, in eight weeks.]] [[1|It's one specific minute off, realistic for me, and it matters because I want to make the soccer team.]] [[2|Three runs a week (two easy, one with intervals), plus two days of leg strength, and one full rest day.]] [[3|I'll time myself every second Friday, and if there's no improvement I'll lengthen the interval day or sleep more.]]",
          "Full marks. Each part of the goal is measurable and linked to your life.",
        ],
        [
          "partial",
          "[[0|I want to do more push-ups.]] [[2|I'll do push-ups three days a week, and run twice.]] I will track it by remembering, and I will not change the plan.",
          "Give your baseline, a number and a deadline. Track progress in a log and be ready to adjust.",
        ],
        [
          "partial",
          "[[0|From 12 to 20 push-ups in eight weeks.]] [[3|I'll keep a log and adjust.]] The plan: just try harder each day.",
          "A plan lists the activities and how often you will do them.",
          true,
        ],
        [
          "weak",
          "My goal is to get in shape. I will exercise sometimes.",
          "A SMART goal has a number and a deadline. 'Get in shape' is not measurable.",
        ],
        [
          "weak",
          "[[0|I will run a mile in 5 minutes by tomorrow.]] I do not need a plan.",
          "The goal should be achievable and time-bound, and a plan shows how you will reach it.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Heart rate and building a circuit workout",
  note: `
## Objectives

Students will be able to:

1. take and record resting and exercise heart rate and explain what it shows;
2. design and carry out a short circuit workout that uses large muscle groups.

## Materials

Stopwatches, heart-rate recording sheets, cones, mats, stations signs, jump ropes, the quiz.

## Starter (6 minutes)

Ask students to find a pulse at the wrist or neck, count for 15 seconds while seated, and multiply by four. Compare across the class and ask why numbers differ.

## Main activity

1. Heart rate: the number of heartbeats per minute. Resting heart rate (taken after sitting quietly) is lower in people who are more fit. Exercise heart rate rises with effort. Count for 15 seconds and multiply by 4. Example: 18 beats in 15 seconds is 72 beats per minute; right after jogging, 30 beats in 15 seconds is 120.
2. Estimated maximum heart rate: 220 minus age. For age 15, that is 205 beats per minute. A moderate-to-vigorous target zone is about 60 to 80 percent of the maximum: 123 to 164 beats per minute.
3. Circuit training: a set of stations, each working a different muscle group, done one after another with short rest. Use large muscle groups: legs (squats), chest and arms (push-ups), back (rows with a band), core (planks), whole body (jumping jacks). Example: 30 seconds on, 15 seconds off, around six stations, repeated twice.
4. Teams design a circuit, run it, record heart rates before, during and after, and reflect.

## Quiz

Heart rate and circuit design.
`,
  reading: [
    "Listening to your heart, and putting a workout together",
    `
Your heart is a muscle, and its rate tells you how hard it is working. **Heart rate** is the number of times the heart beats in a minute. You can feel it as a **pulse**, using two fingers (not the thumb) on the inside of the wrist or the side of the neck. To save time, count the beats for **15 seconds** and multiply by 4. If you count 18 beats in 15 seconds, your heart rate is 18 x 4 = 72 beats per minute.

Your **resting heart rate** is measured after sitting quietly for several minutes. A typical teenager's resting rate is often between 60 and 100 beats per minute, and it tends to be lower in people with good cardiorespiratory fitness, because a stronger heart pushes out more blood with each beat. Over weeks of regular exercise, many people see their resting rate fall. Your **exercise heart rate** rises as you work harder, since the muscles need more oxygen. If you jog and count 30 beats in 15 seconds, your rate is 120 beats per minute.

A rough way to find the highest rate you can reach is **220 minus your age**. For a 15-year-old, that is 205 beats per minute. This is an estimate that varies between individuals. To improve fitness safely, aim for a **target zone** of about **60 to 80 percent** of the maximum. For age 15: 0.60 x 205 = 123 and 0.80 x 205 = 164, so the zone is about 123 to 164 beats per minute. Working inside this zone for 20 to 30 minutes strengthens the heart without overworking it. If you feel dizzy, have chest pain or cannot talk at all, stop and tell your teacher.

One effective way to train is **circuit training**. A circuit is a series of **stations**, each working a different part of the body. You spend a set time at each, move to the next with short rests, and complete the whole circuit once or twice. Because the stations alternate, one muscle group rests while another works, which keeps the heart rate up. Good circuits use **large muscle groups**, which demand more oxygen: **legs** (squats, lunges), **chest and arms** (push-ups), **back** (band rows), **core** (planks) and **whole body** (jumping jacks, step-ups). A beginner might do 30 seconds of work and 15 seconds of rest at each of six stations, twice. When your team designs a circuit, balance the muscle groups, order the stations so that the same muscles are not used twice in a row, think about space and safety, and plan how you will measure your heart rate before, during and after. Afterwards, discuss what felt hard and how to adjust the circuit.
`,
  ],
  cards: [
    ["Heart rate", "The number of heartbeats per minute."],
    ["Pulse", "The beat you can feel in an artery, such as at the wrist."],
    ["Resting heart rate", "Heart rate after sitting quietly."],
    ["Target zone", "The heart-rate range for improving fitness safely."],
    ["Maximum heart rate", "An estimate of the highest rate: 220 minus age."],
    ["Circuit training", "A series of stations working different muscle groups."],
    ["Large muscle group", "A big muscle area, such as the legs, chest or back."],
    ["Recovery", "Rest that lets the heart rate and muscles settle."],
  ],
  closed: [
    [
      "You count 18 beats in 15 seconds. What is your heart rate?",
      ["18", "36", "72", "90"],
      "C",
    ],
    [
      "What is the estimated maximum heart rate for a 15-year-old?",
      ["185", "195", "205", "220"],
      "C",
    ],
    [
      "What is 60 percent of 205, to the nearest whole number?",
      ["103", "123", "133", "164"],
      "B",
    ],
    [
      "Why are large muscle groups used in a circuit?",
      ["They raise the heart rate by needing more oxygen", "They are easier to see", "They need no rest", "They avoid sweating"],
      "A",
    ],
    [
      "What often happens to resting heart rate after weeks of regular exercise?",
      ["It tends to fall", "It always rises", "It stops", "It matches maximum"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A 16-year-old counts 17 beats in 15 seconds at rest and 38 beats in 15 seconds right after a jog. Calculate both heart rates, estimate the maximum heart rate and the 60 to 80 percent target zone, and say whether the jog was inside the zone and what the resting rate suggests.",
      scheme: [
        "Calculates the resting heart rate as 68 and the exercise heart rate as 152",
        "Calculates the estimated maximum as 204 beats per minute",
        "Calculates the target zone as about 122 to 163 and decides 152 is inside it",
        "Interprets the resting rate as within a normal range and typical of a reasonably fit teen (without making a medical claim)",
      ],
      model:
        "The resting rate is 17 times 4, which is 68 beats per minute, and the jog rate is 38 times 4, which is 152. The estimated maximum is 220 minus 16, which is 204. The 60 to 80 percent zone is about 122 to 163, so 152 is inside it. A resting rate of 68 is within the normal range and is a reasonable sign of good fitness, although only a doctor can judge health.",
      answers: [
        [
          "full",
          "[[0|Resting: 17 × 4 = 68. After the jog: 38 × 4 = 152.]] [[1|Maximum: 220 - 16 = 204.]] [[2|The zone is 60 to 80 percent, about 122 to 163, so 152 is inside it.]] [[3|68 is a normal resting rate and fits someone fairly fit, though a doctor would judge actual health.]]",
          "Full marks. Each figure is right and the interpretation is careful.",
        ],
        [
          "full",
          "[[0|Her rates are 68 at rest and 152 after the jog.]] [[1|The estimated maximum is 204 beats per minute.]] [[2|60 percent is 122 and 80 percent is 163, and 152 falls between them, so she's working in her target zone.]] [[3|The resting rate of 68 is in the normal teen range and suggests decent cardiorespiratory fitness.]]",
          "Full marks. Checking the jog against the zone answers the question.",
        ],
        [
          "partial",
          "[[0|Resting is 68 and the jog is 152.]] [[3|68 is a normal resting rate.]] The maximum is 16 + 220 = 236, so the zone is 142 to 189.",
          "Maximum heart rate is 220 minus age, not plus age. Recalculate the zone.",
        ],
        [
          "partial",
          "[[1|The maximum is 204.]] [[2|152 is in the zone.]] The resting rate is 17 and the jog rate is 38, since those are the counts.",
          "Multiply each 15-second count by 4 to get beats per minute.",
          true,
        ],
        [
          "weak",
          "Heart rate cannot be measured by counting. You need a machine.",
          "You can count your pulse for 15 seconds and multiply by 4.",
        ],
        [
          "weak",
          "A resting rate of 68 means the teen is sick, because it should be 200.",
          "A resting rate of 60 to 100 is typical. 200 is near the maximum.",
        ],
      ],
    },
    {
      prompt:
        "Design a circuit with six stations for your team. List each station, which large muscle group it works, how long you work and rest, and how many rounds. Explain why you ordered the stations as you did, and how you will check your heart rate during the circuit.",
      scheme: [
        "Lists six stations, each with a muscle group",
        "States work time, rest time and number of rounds",
        "Explains the order, such as alternating muscle groups so one rests while another works",
        "Describes how to check heart rate (pulse count for 15 seconds at the end of a round) and compare it with the target zone",
      ],
      model:
        "Stations: squats (legs), push-ups (chest and arms), band rows (back), jumping jacks (whole body), planks (core), lunges (legs). Work 30 seconds, rest 15 seconds, two rounds. I alternate upper body, lower body and core so that a muscle group rests while another works, and jumping jacks keep the heart rate up. At the end of each round I will count my pulse for 15 seconds, multiply by 4 and check it against my target zone.",
      answers: [
        [
          "full",
          "[[0|Stations: squats (legs), push-ups (chest and arms), band rows (back), jumping jacks (whole body), planks (core), lunges (legs).]] [[1|We work 30 seconds, rest 15 seconds, and do two rounds.]] [[2|I alternate lower, upper and core so that one muscle group rests while another works, which keeps the heart rate up.]] [[3|At the end of each round I count my pulse for 15 seconds, multiply by 4, and compare it with my target zone.]]",
          "Full marks. The order and the heart-rate check are well explained.",
        ],
        [
          "full",
          "[[0|Step-ups (legs), push-ups (chest), dumbbell rows (back), mountain climbers (core and whole body), wall sits (legs) and band pulls (shoulders and back).]] [[1|Forty seconds on, 20 seconds off, three rounds.]] [[2|I put wall sits after step-ups only with a station between so that the legs get a break.]] [[3|I'll take my pulse right after round two, and see if I'm inside 60 to 80 percent of my maximum.]]",
          "Full marks. Spacing the leg stations is a smart design choice.",
        ],
        [
          "partial",
          "[[0|Squats, push-ups, planks, jumping jacks, rows and lunges.]] [[1|30 seconds, rest 15, two rounds.]] I ordered them randomly. I will not check my heart rate.",
          "Explain the order so that muscle groups alternate, and plan to check your pulse.",
        ],
        [
          "partial",
          "[[2|Alternating upper and lower body gives rest.]] [[3|I'll count my pulse.]] The circuit has three stations that all work the legs.",
          "List six stations that work different muscle groups.",
          true,
        ],
        [
          "weak",
          "A circuit is when you run in a circle. No stations are needed.",
          "A circuit is a series of stations, each working a different muscle group.",
        ],
        [
          "weak",
          "[[1|Work 30 seconds, rest 15.]] I would do only arm curls at every station.",
          "Use large muscle groups across different stations, not only the arms.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Reassessing fitness, and warming up and cooling down",
  note: `
## Objectives

Students will be able to:

1. reassess your fitness at the end of the quarter and compare it with your baseline;
2. perform a dynamic warm-up and cool-down with correct form.

## Materials

Baseline recording sheets, stopwatches, mats, a measured track, the sit-and-reach box, a warm-up station chart, the worksheet.

## Starter (6 minutes)

Ask: "Why do we stretch after exercise but swing our legs before?" Collect ideas; introduce dynamic and static stretching.

## Main activity

1. Dynamic warm-up (5 to 10 minutes): movement-based, raising body temperature and moving joints through their range: jogging, walking lunges, leg swings, arm circles, high knees, butt kicks, side shuffles. Purpose: raise heart rate, loosen joints, prepare muscles, lower injury risk. Form: tall posture, control, no bouncing, increase range gradually.
2. Cool-down (5 minutes): slow jog or walk, then static stretches held 15 to 30 seconds without bouncing (hamstrings, quadriceps, calves, shoulders). Purpose: bring the heart rate down gradually, reduce stiffness.
3. Reassessment: repeat the same tests as the baseline under the same conditions. Calculate change. Example: mile 10:30 to 9:50 is 40 seconds faster; push-ups 12 to 18 is +6, which is a 50 percent increase.
4. Reflect: was the goal met? What worked? What is the next goal?

## Worksheet

Compare results and write a reflection.
`,
  reading: [
    "Getting ready, getting back to normal, and measuring progress",
    `
A good workout has three parts: a warm-up, the main activity and a cool-down. Skipping the first or last raises the risk of soreness and injury.

A **dynamic warm-up** uses movement to prepare the body. It usually takes five to ten minutes. Start with light activity, such as a slow jog, to raise your body temperature and heart rate. Then move the joints through their full range: **walking lunges**, **leg swings**, **arm circles**, **high knees**, **butt kicks** and **side shuffles**. These increase blood flow to the muscles, loosen the joints and rehearse the movements you will use. Use good form: stand tall, keep your core steady, move with control and do not bounce at the end of the motion. Increase your range a little with each repetition. Long, still stretches held before exercise, called **static stretches**, can leave muscles less ready for fast work, so save them for after.

The **cool-down** helps the body return to its resting state. Do five minutes of slow jogging or walking, so that the heart rate falls gradually instead of suddenly. Then do **static stretches**, holding each one for 15 to 30 seconds without bouncing: hamstrings, quadriceps, calves, shoulders and back. A stretch should feel like a gentle pull, never sharp pain. Cooling down reduces stiffness and gives you time to breathe and recover.

At the end of the quarter, you will take the **same fitness tests** that you took at the start. For a fair comparison, repeat them in the same order, with the same equipment, and a similar warm-up. Then compare. Suppose your mile time went from 10:30 to 9:50. That is 40 seconds faster. If your push-ups went from 12 to 18, that is 6 more, an increase of 6 / 12 = 50 percent. Not every number will improve, and that is normal; sleep, stress, illness and the day's weather can change results. Look for trends and what you learned. Then reflect: Did you meet your SMART goal? Which parts of your plan worked best? What got in the way? What will your next goal be? Setting a new goal keeps the habit going after the quarter ends.
`,
  ],
  cards: [
    ["Dynamic warm-up", "Movement-based preparation that raises heart rate and loosens joints."],
    ["Static stretch", "A stretch held still for 15 to 30 seconds."],
    ["Cool-down", "Slow activity and stretching after exercise."],
    ["Lunge", "A step forward, lowering the back knee."],
    ["Leg swing", "A controlled swing of a leg to loosen the hip."],
    ["Reassessment", "Repeating a test to see how much you have changed."],
    ["Trend", "The general direction of results over time."],
    ["Reflection", "Thinking about what worked and what to change."],
  ],
  closed: [
    [
      "Which is a dynamic warm-up movement?",
      ["Holding a hamstring stretch for a minute", "Walking lunges", "Sitting still", "Lying down"],
      "B",
    ],
    [
      "When are static stretches usually done?",
      ["Before the warm-up", "During a sprint", "After exercise during the cool-down", "Never"],
      "C",
    ],
    [
      "Push-ups improved from 12 to 18. What is the percentage increase?",
      ["6 percent", "33 percent", "50 percent", "150 percent"],
      "C",
    ],
    [
      "Why repeat fitness tests under the same conditions?",
      ["So the comparison is fair", "To make them harder", "To save time", "Because the rules say so"],
      "A",
    ],
    [
      "How long should each static stretch be held?",
      ["1 to 2 seconds", "15 to 30 seconds", "5 minutes", "As long as it hurts"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "At the start of the quarter a student ran the mile in 10:30, did 12 push-ups and reached 8 inches on the sit-and-reach. At the end she ran 9:50, did 18 push-ups and reached 10 inches. Calculate the change in each, say what the percentage increase in push-ups is, and write a short reflection naming one thing that probably helped and one new goal.",
      scheme: [
        "Calculates the mile change as 40 seconds faster",
        "Calculates push-ups as +6, a 50 percent increase, and sit-and-reach as +2 inches",
        "States that all three measures improved",
        "Writes a reflection naming a plausible helpful habit and a new SMART-style goal",
      ],
      model:
        "The mile is 40 seconds faster. Push-ups rose by 6, which is 6 divided by 12, or a 50 percent increase. The sit-and-reach improved by 2 inches. All three measures improved. Running three days a week probably helped the mile, and daily stretching the reach. My next goal is to run the mile in under 9:30 in eight weeks.",
      answers: [
        [
          "full",
          "[[0|The mile went from 10:30 to 9:50, so 40 seconds faster.]] [[1|Push-ups went up 6, which is 50 percent more, and the reach went up 2 inches.]] [[2|So she improved on all three tests.]] [[3|Running three days a week probably helped the mile, and her next goal could be a mile under 9:30 in eight weeks.]]",
          "Full marks. The reflection gives a cause and a measurable next goal.",
        ],
        [
          "full",
          "[[0|She is 40 seconds quicker in the mile.]] [[1|She did 6 more push-ups, an increase of 6 ÷ 12 = 50 percent, and she reaches 2 inches further.]] [[2|Every result got better.]] [[3|Stretching after each workout probably helped her flexibility; next she might aim for 25 push-ups in eight weeks.]]",
          "Full marks. Dividing by the baseline is the right percentage method.",
        ],
        [
          "partial",
          "[[0|The mile is 40 seconds faster.]] [[2|Everything improved.]] Push-ups rose 6, which is a 6 percent increase. She should stop now.",
          "6 out of 12 is 50 percent. Also, a new goal keeps progress going.",
        ],
        [
          "partial",
          "[[1|Push-ups are up 6, or 50 percent.]] [[3|A new goal is needed.]] The mile is 10:30 minus 9:50, which is 4 minutes.",
          "10:30 minus 9:50 is 40 seconds, not 4 minutes.",
          true,
        ],
        [
          "weak",
          "The test results show nothing, because tests are not important.",
          "Comparing results shows progress. Calculate each change.",
        ],
        [
          "weak",
          "She got worse in everything, since the numbers are bigger.",
          "A faster mile time is smaller, and more push-ups is better. All three improved.",
        ],
      ],
    },
    {
      prompt:
        "Describe a complete five-minute dynamic warm-up and a five-minute cool-down for a basketball class. Name at least three warm-up movements and two static stretches, explain the purpose of each part, and explain why static stretching is usually saved for after exercise.",
      scheme: [
        "Names at least three dynamic warm-up movements",
        "Names a cool-down with slow movement and at least two static stretches with hold times",
        "Explains the purpose of the warm-up and the cool-down",
        "Explains that static stretching before fast work can leave muscles less ready, so it is saved for after",
      ],
      model:
        "Warm-up: slow jog, walking lunges, leg swings and arm circles, then side shuffles. Cool-down: slow walk, then hamstring and calf stretches held 20 seconds each. The warm-up raises body temperature and heart rate and loosens the joints; the cool-down brings the heart rate down gradually and reduces stiffness. Static stretching is saved for after because long still stretches before fast work can leave the muscles less ready.",
      answers: [
        [
          "full",
          "[[0|Warm-up: a slow jog, then walking lunges, leg swings, arm circles and side shuffles.]] [[1|Cool-down: a slow walk, then hamstring and calf stretches held about 20 seconds each.]] [[2|The warm-up raises body temperature and heart rate and loosens the joints; the cool-down lowers the heart rate gradually and reduces stiffness.]] [[3|Long still stretches before fast play can leave the muscles less ready, so we save them for after.]]",
          "Full marks. The two parts and their purposes are clear.",
        ],
        [
          "full",
          "[[0|We'd do high knees, butt kicks, arm circles and lunges with a twist.]] [[1|For the cool-down, we'd walk a lap and then hold a quad stretch and a shoulder stretch for 30 seconds each.]] [[2|The warm-up prepares our muscles to work and lowers injury risk, while the cool-down helps the body return to rest.]] [[3|Static stretching first may make muscles less ready for fast moves, so we do it afterward.]]",
          "Full marks. All movements fit their phase of the workout.",
        ],
        [
          "partial",
          "[[0|Jogging, lunges and arm circles.]] [[2|The warm-up prepares the body.]] The cool-down is skipping to rest and static stretches go before the game.",
          "Cool-down includes slow movement and stretches afterward. Static stretches are done after exercise.",
        ],
        [
          "partial",
          "[[1|A slow walk and a hamstring stretch held 20 seconds.]] [[3|Static stretching is saved for after.]] A warm-up is only sitting down.",
          "A dynamic warm-up uses movement such as lunges and leg swings.",
          true,
        ],
        [
          "weak",
          "Warming up is a waste of time. I would just start playing.",
          "A warm-up prepares the body and reduces injury risk.",
        ],
        [
          "weak",
          "[[1|Stretches held 20 seconds.]] I would bounce hard in each stretch to make it work.",
          "Bouncing can strain muscles. Hold stretches gently and still.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Net-game skills and striking and fielding skills",
  note: `
## Objectives

Students will be able to:

1. demonstrate the basic skills of a net game, such as serving and volleying, with control;
2. perform the basic skills of a striking or fielding game.

## Materials

Volleyballs or badminton rackets and shuttlecocks, nets, softballs, bats, gloves, cones, a skill checklist, the worksheet.

## Starter (6 minutes)

Pairs toss a ball back and forth with only underhand throws. Ask: "What makes a toss easy to catch? Where do your eyes, hands and feet go?" Link to key cues.

## Main activity

1. Net game (volleyball): ready position (feet shoulder-width apart, knees bent, hands in front); underhand serve (step with the opposite foot, contact with the heel of the hand or closed fist below the waist, follow through to the target); forearm pass or bump (platform of joined forearms, contact on the forearms, legs do the work); overhead set (hands form a triangle above the forehead, fingertips, extend legs and arms); the volley (keeping the ball in play with up to three contacts).
2. Striking game (softball): grip, stance (feet shoulder-width, knees bent), eyes on the ball, step, rotate hips, swing level, follow through. Fielding: ready position, glove down, move to the ball, watch the ball into the glove, throw with a step toward the target.
3. Practice with partners, using a skill checklist and giving peer feedback. Count successful repetitions, e.g., 7 out of 10 serves in the target zone.

## Worksheet

Skill cues and a self-assessment.
`,
  reading: [
    "Control first, power later",
    `
Many games have things in common. In **net games** such as volleyball and badminton, players send the ball or shuttle over a net so that the opponent cannot return it. In **striking and fielding games** such as softball, one team hits a ball and runs while the other team fields it. In both kinds, success depends on a few basic skills done with control. Power comes later.

Start with the **ready position**: feet about shoulder-width apart, knees bent, weight on the balls of the feet, hands in front, eyes on the ball. From this position, you can move in any direction quickly.

In volleyball, the **underhand serve** starts the rally. Hold the ball in your non-hitting hand at waist level, step forward with the foot opposite your hitting arm, swing the arm from the shoulder, hit the ball below the waist with the heel of the hand or a closed fist, and follow through toward your target. The **forearm pass**, or bump, is used to receive a serve. Join your hands so that your forearms form a flat **platform**, keep your arms straight, and let the ball bounce off the forearms, not the hands. Move your feet to get under the ball and use your legs, not a swing, to direct it. The **overhead set** is used to pass the ball to a teammate to attack. Make a triangle with the thumbs and fingers above your forehead, contact the ball with the fingertips, and extend your legs and arms together. A **volley** means keeping the ball in the air; a team may use up to three contacts before sending the ball over: pass, set, hit.

In softball, a good **batting stance** has feet shoulder-width apart, knees slightly bent, hands together on the bat, and eyes on the pitcher. As the ball arrives, step toward it, rotate the hips, swing the bat level, and follow through. **Fielding** a ground ball means getting in front of it, keeping the glove low with the fingers down, watching the ball into the glove, then taking a step toward the target and throwing. Practice with a partner and use a checklist of cues. Count your successful repetitions, such as 7 out of 10 serves landing in the target zone, so that you can see progress. Receive feedback kindly and give it to your partner with specific, positive words: "Your arms were straight on that bump. Try to bend your knees more."
`,
  ],
  cards: [
    ["Ready position", "Feet shoulder-width apart, knees bent, eyes on the ball."],
    ["Underhand serve", "A serve hit below the waist with the heel of the hand."],
    ["Forearm pass (bump)", "Passing with a flat platform of joined forearms."],
    ["Overhead set", "A pass with the fingertips above the forehead."],
    ["Volley", "Keeping the ball in play in the air."],
    ["Follow-through", "Continuing the motion after contact."],
    ["Batting stance", "The balanced position taken to hit a pitch."],
    ["Platform", "The flat surface made by the forearms."],
  ],
  closed: [
    [
      "In the forearm pass, the ball should contact:",
      ["The fingertips", "The flat platform of the forearms", "The elbows", "The palms of open hands"],
      "B",
    ],
    [
      "How many contacts may a volleyball team use before sending the ball over the net?",
      ["One", "Two", "Three", "Five"],
      "C",
    ],
    [
      "In an underhand serve, you step forward with the foot:",
      ["Opposite your hitting arm", "Same as your hitting arm", "Neither", "Both together"],
      "A",
    ],
    [
      "When fielding a ground ball, the glove should be:",
      ["High above the head", "Low, in front of the body", "Behind the back", "On the ground behind you"],
      "B",
    ],
    [
      "What is the best kind of peer feedback?",
      ["Specific and positive with a suggestion", "Loud and critical", "None at all", "Only about the score"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Describe the key cues for a good forearm pass (bump) in volleyball, from ready position to follow-through. Then explain two common mistakes beginners make and how a partner could correct each one.",
      scheme: [
        "Describes the ready position and platform of joined forearms with straight arms",
        "Describes moving the feet to get under the ball and contacting on the forearms",
        "Names a common mistake and a correction (for example, swinging the arms, correct by using the legs)",
        "Names a second common mistake and a correction (for example, bending the elbows or hitting with the hands)",
      ],
      model:
        "I start in ready position, feet shoulder-width apart and knees bent. I join my hands to make a flat platform with straight arms, move my feet to get under the ball, and let it contact my forearms. A common mistake is swinging the arms, so a partner could remind me to use my legs and keep the arms still. Another is bending the elbows or hitting with the hands, so my partner could tell me to straighten my arms and make the platform flat.",
      answers: [
        [
          "full",
          "[[0|I start in ready position, then join my hands to make a flat platform with straight arms.]] [[1|I move my feet to get under the ball and let it contact my forearms, using my legs to direct it.]] [[2|A common mistake is swinging the arms; my partner could remind me to bend my knees and keep the arms still.]] [[3|Another is bending my elbows or hitting with my hands, so my partner could tell me to straighten my arms and make a flat platform.]]",
          "Full marks. Both mistakes come with a useful correction.",
        ],
        [
          "full",
          "[[0|Feet shoulder-width apart, knees bent, thumbs together, arms straight.]] [[1|Get under the ball, let it hit the middle of the forearms, and push with the legs.]] [[2|Beginners swing at the ball and send it out of control; a partner can say 'let the ball come to you and use your legs.']] [[3|They also bend their elbows, so the platform tilts and the ball shoots sideways; the partner can tell them to straighten and keep it flat.]]",
          "Full marks. You explained why the mistake changes the ball's path.",
        ],
        [
          "partial",
          "[[0|Keep your arms together and straight.]] [[2|Don't swing the arms.]] Hit the ball with the palms, using as much force as possible.",
          "The ball should contact the forearms, and control matters more than force.",
        ],
        [
          "partial",
          "[[1|Move your feet under the ball.]] [[3|Straighten the arms.]] Stand with your feet together and stay still.",
          "Use a ready position with feet shoulder-width apart and knees bent.",
          true,
        ],
        [
          "weak",
          "You just hit the ball any way you can. There are no key cues.",
          "A forearm pass has clear cues. Describe the position and contact.",
        ],
        [
          "weak",
          "[[2|Don't swing the arms.]] Mistakes should never be corrected by a partner, because that is rude.",
          "Peer feedback helps if it is specific, kind and positive.",
        ],
      ],
    },
    {
      prompt:
        "Explain the steps of a good softball swing from stance to follow-through, and the steps for fielding a ground ball and throwing to first base. Then describe how you could count your practice results to see if you are improving.",
      scheme: [
        "Describes the batting stance and keeping eyes on the ball",
        "Describes the step, hip rotation, level swing and follow-through",
        "Describes fielding in front of the ball with the glove low, watching it into the glove and throwing with a step toward the target",
        "Describes a way to count results, such as the number of successful repetitions out of ten",
      ],
      model:
        "In the stance, my feet are shoulder-width apart, knees bent, hands together, eyes on the pitcher. I step toward the pitch, rotate my hips, swing level and follow through. To field a ground ball, I get in front of it, keep my glove low, watch the ball into the glove, then step toward first base and throw. To track progress, I could count how many of ten swings make good contact, or how many of ten throws reach first base on target, and compare week to week.",
      answers: [
        [
          "full",
          "[[0|Stance: feet shoulder-width apart, knees bent, hands together on the bat, eyes on the pitcher.]] [[1|Then I step toward the pitch, rotate my hips, swing level and follow through.]] [[2|For fielding I get in front of the ball, keep the glove low, watch it into the glove, then step toward first and throw.]] [[3|I'd count how many of ten swings or throws are good, and compare each week.]]",
          "Full marks. Each step is in order and counting gives evidence.",
        ],
        [
          "full",
          "[[0|I stand balanced with knees bent and I keep my eyes on the ball the whole way.]] [[1|My hips turn, my bat stays level, and I finish with the bat past my front shoulder.]] [[2|With a grounder, I move my feet, put the glove down, catch it in front of me, and step and throw to first.]] [[3|I'd keep a chart of successful hits out of 10 each practice so I can see progress.]]",
          "Full marks. A practice chart is a good way to see improvement.",
        ],
        [
          "partial",
          "[[0|Keep your eyes on the ball.]] [[3|Count the hits out of ten.]] Swing as hard as you can and don't worry about the follow-through.",
          "A level swing with a full follow-through gives more control. Describe each step.",
        ],
        [
          "partial",
          "[[2|Get in front of the ball with your glove low.]] [[1|Rotate your hips when you swing.]] Throw without stepping so it's faster.",
          "Step toward the target when throwing to add accuracy and power.",
          true,
        ],
        [
          "weak",
          "Stand anywhere and close your eyes when you swing. It's about luck.",
          "Keeping your eyes on the ball is a key cue for hitting.",
        ],
        [
          "weak",
          "There's no need to measure progress. I will just feel that I improved.",
          "Counting results gives real evidence of improvement.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Tactics, understanding a team sport, and safe, respectful play",
  note: `
## Objectives

Students will be able to:

1. apply simple offensive and defensive tactics in a small-sided game;
2. explain the rules, scoring and strategy of a team sport in your own words;
3. follow safety rules and equipment procedures, and show respect for teammates and officials.

## Materials

Pinnies, cones for a small court, a ball, whiteboards for sketching plays, a safety checklist, the worksheet and quiz.

## Starter (6 minutes)

Play a 3-versus-3 keep-away for two minutes. Ask: "What did your team do to keep the ball? What did the defenders do?" Collect ideas on the board.

## Main activity

1. Offensive tactics: create space (spread out, move without the ball), pass and move, use width and depth, make quick decisions, support the player with the ball. Defensive tactics: stay between the opponent and the goal, communicate, mark space as well as players, recover quickly after losing the ball.
2. Small-sided game: 4-versus-4 on a small court. Practice a tactic (for example, "every pass must be followed by a move into open space") and review.
3. Teach the rules: choose a team sport (basketball). Explain the object, positions, how scoring works (2 points inside the arc, 3 outside, 1 for each free throw), the clock, common violations (traveling, double dribble, fouls) and a simple strategy (fast break, zone or man-to-man defense).
4. Safety and respect: check the space and equipment, remove hazards, wear proper shoes, use equipment only as intended, stop at the whistle, call fouls honestly, shake hands, accept decisions by officials, and encourage teammates.

## Quiz

Tactics, rules and safety.
`,
  reading: [
    "Thinking while moving, and playing fair",
    `
In team games, the best players do not simply run fast; they make good decisions. **Tactics** are the choices a team makes to gain an advantage. Tactics are used in **offense**, when your team has the ball, and in **defense**, when it does not.

Good **offensive tactics** begin with creating **space**. Spread out so that defenders cannot cover everybody, and move into open areas, even when you do not have the ball. Move after you pass, since a player who stands still is easy to guard. Use the full **width** of the court to stretch the defense and the **depth** to pass forward. Make quick decisions: look up, see who is open, and pass or shoot. Always give the ball handler at least one **passing option**. Good **defensive tactics** include staying between the opponent and the goal, talking to your teammates ("I've got ball, you take left!"), guarding open space as well as players, and recovering quickly when the ball changes sides. In a small-sided game, such as 4 versus 4, everyone touches the ball often and the effects of tactics are easy to see. A coach might set a rule such as "after every pass, move to a new spot," and the team reviews what happened.

To play any sport you must understand its **rules**, **scoring** and **strategy**. Take basketball. The object is to score more points than the other team. A shot made inside the three-point arc counts 2 points, outside the arc 3 points, and a free throw 1 point. A player must dribble while moving; **traveling** (moving without dribbling) and a **double dribble** (starting a dribble again after stopping) are violations. A **foul** is illegal contact. Strategies include the **fast break**, running quickly to score before the defense sets up, and defensive plans such as **man-to-man**, where each defender guards one player, or **zone**, where each guards an area. Being able to explain a sport in your own words shows that you understand it.

Finally, a good game depends on **safety** and **respect**. Before play, check that the space is free of hazards, equipment is in good condition, and you wear proper shoes. Use equipment only for its purpose. Stop immediately at a whistle. Play within the rules, call your own fouls honestly, and accept the decisions of officials without arguing, since they have a hard job. Encourage teammates, including those less skilled, and shake hands with opponents. Winning matters less than playing well and fairly. These habits make games safer, and more fun, for everyone.
`,
  ],
  cards: [
    ["Tactic", "A choice a team makes to gain an advantage."],
    ["Create space", "Move so that defenders cannot cover everyone."],
    ["Man-to-man", "A defense where each player guards one opponent."],
    ["Zone defense", "A defense where each player guards an area."],
    ["Fast break", "Moving the ball quickly to score before the defense sets."],
    ["Traveling", "Moving with the ball without dribbling."],
    ["Foul", "Illegal contact or action under the rules."],
    ["Sportsmanship", "Fair, respectful behavior in games."],
  ],
  closed: [
    [
      "Which is a good offensive tactic?",
      ["Standing still after you pass", "Moving into open space after you pass", "Hiding behind a defender", "Never passing"],
      "B",
    ],
    [
      "In basketball, a shot made outside the three-point arc is worth:",
      ["1 point", "2 points", "3 points", "4 points"],
      "C",
    ],
    [
      "In man-to-man defense, each defender:",
      ["Guards an area", "Guards one opponent", "Stays by the bench", "Guards the ball only"],
      "B",
    ],
    [
      "What should you do when the whistle blows?",
      ["Keep playing", "Stop immediately", "Argue", "Throw the ball"],
      "B",
    ],
    [
      "Moving with the ball without dribbling is called:",
      ["A double dribble", "Traveling", "A foul shot", "A fast break"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Your team is playing a 4-versus-4 small-sided basketball game and is having trouble keeping the ball. Describe three offensive tactics that would help and one defensive tactic for when you lose the ball. Explain why each would work.",
      scheme: [
        "Describes creating space or spreading out and why it helps",
        "Describes moving after a pass or moving without the ball and why it helps",
        "Describes giving the ball handler a passing option or making quick decisions and why it helps",
        "Describes a defensive tactic such as recovering quickly or staying between the opponent and the goal",
      ],
      model:
        "We should spread out to create space, so defenders cannot cover everyone. We should move after every pass, since a still player is easy to guard. The ball handler should always have a passing option so the pass is not forced. When we lose the ball, we should recover quickly and stay between our opponent and the basket, so they cannot score easily.",
      answers: [
        [
          "full",
          "[[0|First, spread out to create space; defenders can't cover everyone if we're not bunched up.]] [[1|Second, move after every pass; a player standing still is easy to guard.]] [[2|Third, give the ball handler a passing option, so they aren't forced into a bad pass.]] [[3|On defense, when we lose the ball, recover fast and stay between our opponent and the basket so they can't score easily.]]",
          "Full marks. Each tactic has a reason attached.",
        ],
        [
          "full",
          "[[0|We should use the whole court's width so defenders have to stretch out.]] [[1|After passing, cut to an open spot; that makes the defender follow and opens space for others.]] [[2|Look up before we dribble so we can make a quick decision, and always have a teammate in a position to receive a pass.]] [[3|If we lose it, talk to teammates and pick up the nearest opponent right away.]]",
          "Full marks. Communicating on defense is an important tactic.",
        ],
        [
          "partial",
          "[[0|Spread out to create space.]] [[3|Recover quickly on defense.]] Stand still after passing so you are ready to receive it again.",
          "Moving after a pass is better because a still player is easy to guard.",
        ],
        [
          "partial",
          "[[1|Move after passing.]] [[2|Always give a passing option.]] Everyone should crowd around the ball to help.",
          "Crowding the ball reduces space. Spread out to create room.",
          true,
        ],
        [
          "weak",
          "Just dribble as hard as you can and shoot. Tactics are not needed.",
          "Tactics help the whole team keep the ball and score.",
        ],
        [
          "weak",
          "[[3|Recover quickly.]] Defense only matters at the end of the game.",
          "Defense matters throughout the game, whenever the other team has the ball.",
        ],
      ],
    },
    {
      prompt:
        "Choose a team sport (for example basketball, volleyball or soccer) and explain its object, how it is scored, two rules or violations, and one strategy. Then describe three safety or respect habits you would show during a class game.",
      scheme: [
        "States the object of the game accurately",
        "Explains how scoring works",
        "Explains two rules or violations and one strategy",
        "Describes three safety or respect habits",
      ],
      model:
        "Basketball: the object is to score more points than the other team by shooting the ball through the hoop. A basket inside the arc is 2 points, outside the arc is 3, and a free throw is 1. Traveling and double dribbling are violations. One strategy is the fast break. In class, I would check the court for hazards, stop at the whistle, and congratulate the other team after the game.",
      answers: [
        [
          "full",
          "[[0|Basketball: the object is to score more points than the other team by getting the ball through the hoop.]] [[1|A basket inside the arc is 2 points, outside the arc 3, and a free throw 1.]] [[2|Traveling and double dribbling are violations, and a good strategy is the fast break.]] [[3|In class I would check the floor for hazards, stop at the whistle and congratulate the other team.]]",
          "Full marks. All parts are correct and personal habits are included.",
        ],
        [
          "full",
          "[[0|Volleyball: the object is to ground the ball on the opponent's side of the net.]] [[1|A team scores a point on every rally, and wins a set at 25 points, ahead by two.]] [[2|A team may touch the ball only three times, and a player can't hit it twice in a row; one strategy is pass, set, spike.]] [[3|I'd wear proper shoes, call my own touches honestly and encourage my teammates.]]",
          "Full marks. Rally scoring is described correctly.",
        ],
        [
          "partial",
          "[[0|In soccer you try to score goals.]] [[3|I will be respectful and stop at the whistle.]] Scoring is when everyone gets a point, and there are no rules.",
          "Explain how scoring works and name two rules or violations.",
        ],
        [
          "partial",
          "[[1|Each goal is one point.]] [[2|Offside is a rule.]] The object is to run the most.",
          "The object is to score more goals than the other team.",
          true,
        ],
        [
          "weak",
          "Sports don't have rules. You just play however you want.",
          "Rules make the game fair and safe. Name two.",
        ],
        [
          "weak",
          "[[3|Stop at the whistle.]] Arguing with the officials is the best way to win.",
          "Respecting officials is part of good sportsmanship.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Resolving conflict and the benefits of activity",
  note: `
## Objectives

Students will be able to:

1. work with a team to resolve a conflict about the rules of a game;
2. describe how regular activity benefits physical, mental and social health.

## Materials

Conflict scenario cards, a "steps to resolve" chart, a health-benefits graphic organizer, the worksheet, the quiz.

## Starter (6 minutes)

Role-play a disagreement: "I think the ball was out." "No, it touched the line." Ask how it should be settled, and why it is easy for a friendly game to turn unfriendly.

## Main activity

1. Resolving conflict: stay calm, let each person state their view with "I" statements, listen without interrupting, find the facts, think of options, choose a fair solution (replay the point, rock-paper-scissors for a tie, ask the teacher or an official, agree to a house rule before the game), and shake hands. Avoid shouting, blaming, quitting or taking sides.
2. Benefits of regular activity. Physical: stronger heart, lungs, muscles and bones, healthier weight, better sleep, lower risk of disease. Mental: lower stress and anxiety, better mood and focus, higher self-confidence. Social: friendships, teamwork, communication, leadership, belonging.
3. Recommendation: young people should get about 60 minutes of moderate to vigorous activity most days. Example: 60 minutes a day for 7 days is 420 minutes a week, and 5 days a week is 300 minutes.

## Quiz

Resolving conflict and health benefits.
`,
  reading: [
    "When we disagree, and why we move",
    `
Even friendly games produce disagreements: Was the ball in or out? Was that a foul? Whose turn is it? **Conflict** is a normal part of playing together, and the way we handle it matters more than the disagreement. Without a plan, a small dispute can grow into shouting, hurt feelings and an ended game.

Use a few steps. First, **stay calm**: take a breath and lower your voice. Second, let each person **state their view** using "I" statements ("I thought the ball touched the line") instead of accusations ("You always cheat"). Third, **listen** without interrupting, and repeat what you heard to show that you understood. Fourth, look for **facts**: was there a line judge, a replay or a witness who saw it clearly? Fifth, think of **options**. A fair solution might be to **replay the point**, to flip a coin or play rock-paper-scissors when the facts are unclear, to ask the teacher or an official to decide, or to follow a **house rule** you agreed on before the game began, such as "if it's a tie, the serve is replayed." Finally, agree, shake hands and move on. Avoid blaming, mocking, quitting, or taking sides with friends. Agreeing on rules beforehand prevents many conflicts, and accepting the decision of an official, even when you disagree, is part of sportsmanship.

Games also give us a reason to be active, and regular activity benefits **physical, mental and social health**. **Physically**, activity strengthens the heart, lungs, muscles and bones, helps maintain a healthy weight, improves sleep and lowers the risk of many diseases. **Mentally**, it reduces stress and anxiety, lifts mood, sharpens focus and builds self-confidence, since each improvement is proof of effort. **Socially**, team activities help you make friends, practice cooperation and communication, and feel that you belong.

Health experts recommend that young people get about **60 minutes** of moderate to vigorous physical activity on most days. At 60 minutes a day for 7 days, that is 420 minutes a week; for 5 days, it is 300 minutes. The 60 minutes need not be at one time: a walk to school, a gym class, a game with friends and a bike ride can add up. If you are not yet reaching the goal, add a little each week. The most useful activity is the one that you enjoy and will keep doing.
`,
  ],
  cards: [
    ["Conflict", "A disagreement between people."],
    ["\"I\" statement", "A way of speaking about your own view without blaming."],
    ["House rule", "A rule players agree on before a game."],
    ["Sportsmanship", "Fair, respectful behavior in games."],
    ["Official", "A referee or umpire who applies the rules."],
    ["Moderate to vigorous activity", "Exercise that raises the heart rate and breathing."],
    ["Self-confidence", "Belief in your own ability."],
    ["Stress", "The body's response to demands or pressure."],
  ],
  closed: [
    [
      "Which is an \"I\" statement?",
      ["You always cheat", "I thought the ball touched the line", "That was a terrible call", "Everyone knows you're wrong"],
      "B",
    ],
    [
      "How much activity do young people need on most days?",
      ["10 minutes", "30 minutes", "60 minutes", "5 hours"],
      "C",
    ],
    [
      "How many minutes is 60 minutes a day for 5 days?",
      ["120", "300", "420", "600"],
      "B",
    ],
    [
      "A fair way to settle an unclear point is to:",
      ["Replay the point", "Quit the game", "Shout louder", "Ignore the rules"],
      "A",
    ],
    [
      "Which is a mental-health benefit of exercise?",
      ["Lower stress and better mood", "Higher homework load", "Less sleep", "More arguing"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "During a volleyball game two teammates disagree about whether a serve was in. They begin to shout and one threatens to quit. Describe the steps the team should take to resolve it, using at least one \"I\" statement, and give two fair solutions. Then say how a house rule agreed before the game could have prevented the conflict.",
      scheme: [
        "Describes staying calm and listening before deciding",
        "Includes a correct \"I\" statement",
        "Gives two fair solutions such as replaying the point, asking the teacher or officials, or coin flip",
        "Explains that a house rule agreed in advance avoids the dispute",
      ],
      model:
        "First, take a breath and stay calm, then let each person speak while the other listens without interrupting. One could say, \"I thought the ball touched the line.\" Two fair solutions are to replay the point or to ask the teacher to decide. A house rule agreed before the game, such as \"a disputed point is replayed,\" would have settled it without an argument.",
      answers: [
        [
          "full",
          "[[0|First everyone should breathe and stay calm, then each person speaks while the other listens without interrupting.]] [[1|One could say, 'I thought the ball touched the line,' instead of blaming.]] [[2|Two fair solutions are to replay the point or ask the teacher to decide.]] [[3|If we'd agreed beforehand that a disputed point is replayed, there would have been no argument.]]",
          "Full marks. Calm steps, a good statement and a prevention idea.",
        ],
        [
          "full",
          "[[0|They should stop, lower their voices and listen to each other.]] [[1|'I felt the serve was out because it landed past the line' is a good I statement.]] [[2|They could flip a coin and replay the serve, or ask the teacher to make the call.]] [[3|Setting a rule before the game, such as 'ties are replayed,' stops this kind of fight.]]",
          "Full marks. You explained both the fix and the prevention.",
        ],
        [
          "partial",
          "[[0|They should stay calm.]] [[2|Replay the point.]] You always cheat is a good thing to say, and house rules do not help.",
          "'You always cheat' blames. Use an 'I' statement, and explain how a house rule helps.",
        ],
        [
          "partial",
          "[[1|I thought it was in.]] [[3|A rule agreed beforehand would help.]] The one who shouts the loudest should win.",
          "The loudest voice is not a fair solution. Replay the point or ask an official.",
          true,
        ],
        [
          "weak",
          "The player who is upset should quit. That solves it.",
          "Quitting does not solve the conflict. Use fair steps instead.",
        ],
        [
          "weak",
          "Conflict means someone is bad, so the teacher should punish both.",
          "Disagreements are normal. Calm steps can resolve them.",
        ],
      ],
    },
    {
      prompt:
        "A student says, \"I don't see why I should play sports. I'm not on a team.\" Respond with at least two physical, one mental and one social benefit of regular activity, and calculate the weekly minutes if she is active 45 minutes on 4 days and compare it with the recommendation of 60 minutes on most days (300 minutes over 5 days).",
      scheme: [
        "Gives at least two correct physical benefits",
        "Gives a mental health benefit",
        "Gives a social benefit",
        "Calculates 180 minutes and compares it with the 300-minute guideline, noting she is 120 minutes short",
      ],
      model:
        "Activity strengthens the heart and lungs and the muscles and bones, which are physical benefits. It reduces stress and improves mood, which is a mental benefit, and it helps people to make friends and feel they belong, a social benefit. At 45 minutes on 4 days she is active 180 minutes a week. The guideline is 300 minutes over 5 days, so she is 120 minutes short, but she can build up with short walks or games with friends.",
      answers: [
        [
          "full",
          "[[0|Activity strengthens the heart, lungs and bones, and helps you sleep better.]] [[1|Mentally, it lowers stress and improves mood.]] [[2|Socially, it helps you make friends and feel you belong, even outside a team.]] [[3|45 × 4 = 180 minutes a week, which is 120 minutes short of the 300-minute guideline, so she can add walks or games with friends.]]",
          "Full marks. You answered with benefits and a calculation.",
        ],
        [
          "full",
          "[[0|You don't have to be on a team: exercise builds stronger muscles and a healthier heart.]] [[1|It also boosts your mood and focus and helps you feel more confident.]] [[2|Walking or biking with friends is social too.]] [[3|She gets 180 minutes a week, and the guideline is 300, so she needs about 120 more.]]",
          "Full marks. Pointing out non-team activities answers the student's worry.",
        ],
        [
          "partial",
          "[[0|It makes your muscles stronger.]] [[1|It reduces stress.]] She gets 45 + 4 = 49 minutes, which is enough.",
          "Multiply 45 minutes by 4 days to get 180. Compare it with 300.",
        ],
        [
          "partial",
          "[[2|It helps you make friends.]] [[3|She is 120 minutes short.]] Sports only help if you are on a team.",
          "Activity helps whether or not you are on a team. Walks, bike rides and games all count.",
          true,
        ],
        [
          "weak",
          "Exercise has no benefits, so she is right to skip it.",
          "Exercise has physical, mental and social benefits. Name some.",
        ],
        [
          "weak",
          "[[1|It lowers stress.]] 180 minutes is more than 300, so she is fine.",
          "180 is less than 300. She is 120 minutes short.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Finding activities you enjoy, and sleep, food and stress",
  note: `
## Objectives

Students will be able to:

1. reflect on the activities you enjoy and how you might continue them outside school;
2. describe the effects of sleep, nutrition and stress on health and performance.

## Materials

Activity interest survey, a community activity list (parks, recreation center, clubs), a sleep and food log, stress-management cards, the worksheet and quiz.

## Starter (6 minutes)

Ask: "What was the most fun you had moving your body this quarter? What made it fun?" Collect: friends, competition, music, being outdoors, learning a skill.

## Main activity

1. Enjoyment and lifelong activity: people stay active when it is fun, fits their schedule, is affordable and offers friends. Options: team sports, individual sports, dance, hiking, cycling, swimming, martial arts, yoga, walking a dog. Barriers: time, cost, transport, confidence, weather; solutions: free options, partner up, short sessions, a schedule.
2. Sleep: teenagers need about 8 to 10 hours a night. Too little hurts attention, mood, memory, reaction time and athletic performance, and raises injury risk. Habits: consistent bedtime, screens off before bed, no caffeine late in the day.
3. Nutrition: balanced foods (fruits, vegetables, whole grains, protein, dairy or alternatives), water for hydration, limits on sugary drinks. Eat before activity for energy and after for recovery; drink water before, during and after.
4. Stress: effects (tense muscles, headaches, poor sleep, irritability); management (exercise, deep breathing, talking to someone, planning time, breaks, enough sleep).

## Quiz

Sleep, nutrition and stress.
`,
  reading: [
    "Staying active for life, and what fuels it",
    `
One goal of physical education is to help you stay active long after high school. People keep exercising when the activity is **enjoyable**, fits their **schedule**, is **affordable** and gives them a reason to be with other people. Think about what you liked this quarter. Was it the competition, the music, the outdoors, learning a new skill, or doing something with friends? Options for lifelong activity include team sports, individual sports such as swimming or running, dance, hiking, cycling, martial arts, yoga and even walking a dog. Many communities have parks, trails and recreation centers that offer low-cost programs.

Everyone faces **barriers**: lack of time, cost, transportation, low confidence or bad weather. Plan around them. If time is short, do three 15-minute sessions rather than one long one. If cost is a barrier, choose free options such as walking, running or bodyweight workouts. Ask a friend to join you so that you hold each other accountable. Keep a schedule, as you would for a class.

Activity works best with the right fuel and rest. **Sleep** is crucial. Teenagers need about **8 to 10 hours** a night. When you do not sleep enough, your attention, memory, mood and reaction time suffer, and athletes tend to perform worse and get injured more easily. To sleep better, go to bed and wake at about the same time every day, turn off screens before bed, avoid caffeine in the afternoon and keep your room dark and quiet.

**Nutrition** gives you energy and materials for growth and repair. Eat a variety of **fruits and vegetables, whole grains, protein foods** (such as beans, eggs, fish or chicken) and **dairy or alternatives**. Drink **water** before, during and after activity to stay hydrated, and limit sugary drinks, which give a quick burst of energy followed by a drop. A small snack with carbohydrates an hour before exercise can help, and a snack with protein afterwards helps muscles recover. Skipping meals can make you tired and unable to focus.

Finally, **stress** is the body's reaction to pressure, such as exams, arguments or a busy schedule. A little stress can motivate you, but too much causes tense muscles, headaches, stomach problems, poor sleep and irritability. Healthy ways to manage stress include exercise, **deep breathing**, talking to a friend or trusted adult, planning your time, taking short breaks and getting enough sleep. If stress feels overwhelming, ask a school counselor for help. Taking care of sleep, food and stress is part of training; it is as important as the workout itself.
`,
  ],
  cards: [
    ["Lifelong activity", "Physical activity a person keeps doing through life."],
    ["Barrier", "Something that makes it harder to be active."],
    ["Hydration", "Having enough water in the body."],
    ["Balanced diet", "Eating a variety of foods from all the main groups."],
    ["Sleep hygiene", "Habits that help you fall asleep and stay asleep."],
    ["Stress", "The body's reaction to pressure or demands."],
    ["Deep breathing", "Slow, deep breaths that calm the body."],
    ["Recovery", "Rest and food that help the body repair after exercise."],
  ],
  closed: [
    [
      "About how many hours of sleep do teenagers need each night?",
      ["4 to 5", "6 to 7", "8 to 10", "12 to 14"],
      "C",
    ],
    [
      "Which is a good way to handle a lack of time for exercise?",
      ["Skip exercise", "Do three 15-minute sessions", "Wait for a holiday", "Only exercise on weekends"],
      "B",
    ],
    [
      "Which helps you sleep better?",
      ["Drinking caffeine late in the day", "A regular bedtime and screens off", "Staying up late", "Sleeping in the afternoon"],
      "B",
    ],
    [
      "Which is a healthy way to manage stress?",
      ["Skipping sleep", "Deep breathing and exercise", "Ignoring it", "Arguing with friends"],
      "B",
    ],
    [
      "Why drink water before, during and after activity?",
      ["To stay hydrated", "To lose weight quickly", "To slow down", "To avoid sleep"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Choose an activity you enjoyed this quarter. Explain what you enjoyed about it, and describe a realistic plan to continue it outside school, including where, when and with whom, one barrier you might face and how you would deal with it.",
      scheme: [
        "Names an activity and says what the student enjoyed about it",
        "Describes where, when and with whom for the plan",
        "Names a realistic barrier",
        "Describes a practical way to overcome the barrier",
      ],
      model:
        "I enjoyed volleyball because I liked the teamwork and learning to serve. I will play at the recreation center with two friends on Saturday mornings. A barrier is that I don't have a ride, so I will carpool with a friend, or walk and meet them there.",
      answers: [
        [
          "full",
          "[[0|I enjoyed volleyball because of the teamwork and learning to serve.]] [[1|I'll play at the recreation center with two friends on Saturday mornings.]] [[2|A barrier is transportation, since I don't have a ride.]] [[3|I'll carpool with a friend or walk with them, and bring a snack so I have energy.]]",
          "Full marks. The plan is specific and the barrier has a fix.",
        ],
        [
          "full",
          "[[0|I loved the circuit workout because the music kept me going and I could see my progress.]] [[1|I'll do a circuit in my garage after school on Tuesdays and Thursdays, with my brother.]] [[2|My problem is that I get tired and skip it.]] [[3|I'll put it on my calendar like a class and ask my brother to hold me to it.]]",
          "Full marks. Treating exercise like a class is a good tactic.",
        ],
        [
          "partial",
          "[[0|I enjoyed basketball.]] [[2|A barrier is time.]] I will play sometime. I do not need to do anything about time.",
          "Make the plan specific: where, when and with whom. And say how you will handle the barrier.",
        ],
        [
          "partial",
          "[[1|I'll jog around my neighborhood on Mondays and Wednesdays.]] [[3|I'll set a reminder on my phone.]] I did not enjoy anything this quarter.",
          "Think of an activity or part of one that you enjoyed and name it.",
          true,
        ],
        [
          "weak",
          "I will not do any activity after the quarter ends, because school is over.",
          "Lifelong activity continues beyond class. Choose something you can keep doing.",
        ],
        [
          "weak",
          "[[0|I liked volleyball.]] There are no barriers to anything, so there is nothing to plan.",
          "Most people face barriers such as time, cost or transport. Name one and plan for it.",
        ],
      ],
    },
    {
      prompt:
        "A student sleeps 5 hours on school nights, skips breakfast, drinks a sugary soda at lunch and feels stressed about exams. Explain how each of these may affect her health and performance in class and in sport, and give one specific recommendation for each.",
      scheme: [
        "Explains the effects of too little sleep and recommends 8 to 10 hours with a regular bedtime",
        "Explains the effect of skipping breakfast and recommends a balanced meal",
        "Explains the effect of sugary drinks and recommends water",
        "Explains the effects of stress and recommends a healthy coping strategy",
      ],
      model:
        "Five hours of sleep hurts attention, memory, mood and sports performance, and raises injury risk, so she should aim for 8 to 10 hours with a regular bedtime. Skipping breakfast can leave her tired and unable to focus, so she should eat a balanced meal with protein and whole grains. A sugary soda gives a quick burst and then a drop in energy, so she should drink water. Exam stress can cause tension and poor sleep, so she could plan her time, take breaks and use deep breathing or exercise.",
      answers: [
        [
          "full",
          "[[0|Five hours of sleep hurts her attention, memory, mood and sports performance and raises her injury risk; she should aim for 8 to 10 hours with a regular bedtime.]] [[1|Skipping breakfast leaves her tired and unfocused, so she should eat something balanced with protein and whole grains.]] [[2|A sugary soda gives a quick burst and then a crash, so water is a better choice.]] [[3|Stress can cause tense muscles and poor sleep; she could plan her study time, take breaks and use deep breathing or exercise.]]",
          "Full marks. Each habit is paired with a specific, practical change.",
        ],
        [
          "full",
          "[[0|Too little sleep slows reaction time and weakens memory, so she should switch off screens early and keep a regular bedtime.]] [[1|Without breakfast she'll find it harder to concentrate by mid-morning, so toast with eggs or yogurt with fruit would help.]] [[2|The soda raises blood sugar fast and then drops it, so she should carry a water bottle.]] [[3|Exam stress can be eased by a study schedule with breaks, a walk, and talking to a counselor or friend.]]",
          "Full marks. Offering specific foods makes the advice easy to follow.",
        ],
        [
          "partial",
          "[[0|She needs more sleep.]] [[3|She should manage her stress.]] Breakfast does not matter and soda is a good source of energy.",
          "Skipping breakfast can reduce focus, and soda's energy fades quickly. Revise those two.",
        ],
        [
          "partial",
          "[[1|She should eat a balanced breakfast.]] [[2|She should drink water.]] Five hours is plenty for a teenager.",
          "Teenagers need about 8 to 10 hours of sleep a night.",
          true,
        ],
        [
          "weak",
          "None of these affect performance. Only practice matters.",
          "Sleep, food and stress all affect health and performance. Explain each.",
        ],
        [
          "weak",
          "Stress is always good, so she should add more of it.",
          "A little stress can motivate, but too much harms health. Suggest a coping strategy.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Media, peers and risky substances",
  note: `
## Objectives

Students will be able to:

1. analyze the influence of media and peers on health behaviors;
2. identify the risks of tobacco, alcohol and vaping and strategies for refusing them.

## Materials

Sample ads and social media posts (fictional), refusal-skills role-play cards, a "myth versus fact" chart, the problem set and worksheet.

## Starter (6 minutes)

Display a fictional ad for an energy drink showing athletes. Ask: "What is this ad telling you? What is it not telling you?" Discuss who made it and why.

## Main activity

1. Media influence: advertising, influencers, shows and games shape ideas of what is normal, attractive or healthy. Questions to ask: Who made this? What do they want? What is left out? Is the claim backed by evidence? Peers influence behavior through example, invitations and pressure, but also in positive ways; most teens do not vape or drink, even if it seems that everyone does.
2. Risks of tobacco, alcohol and vaping: nicotine is highly addictive and affects the developing brain (attention, memory, mood); vapes can contain nicotine and other chemicals that harm the lungs; alcohol impairs judgment, balance and reaction time, slows brain development, and is illegal under age 21; combined with driving, it leads to crashes; all can harm sports performance and sleep, and cost money. Laws: purchase of tobacco and vape products is restricted to people 21 and over in the US.
3. Refusal strategies: say no clearly and firmly; give a short reason ("I'm training"); suggest something else; leave; use humor; have an exit plan; find a trusted adult. Practice in role-plays.
4. Where to find help: parents, school counselor, school nurse, doctor, national helplines.

## Problem set

Analyze an ad and practice refusal skills.
`,
  reading: [
    "What shapes our choices, and how to say no",
    `
We make health choices every day, and those choices are influenced by what we see and who we are with. **Media**, including advertisements, influencers, TV shows, video games and social media, shapes our ideas of what is normal, attractive or healthy. Media creators often have a goal: to sell something, to gain followers, or to entertain. A smart viewer asks questions. **Who made this? What do they want me to do? What is left out? Is there evidence for the claim?** An ad for an energy drink may show athletes who look strong and happy, but it will not mention the sugar and caffeine, or that the athletes train for years. Photos may be edited, and influencers are often paid to promote products.

**Peers** also have a strong influence. Friends affect our behavior by example, by invitations and sometimes by pressure. Peer influence is not always negative: friends can motivate you to practice, study and try new activities. But it can also lead to risky choices. A helpful fact is that most teens do not smoke, vape or drink alcohol, even though social media might make it seem that everyone does. Feeling that "everyone does it" is often wrong.

Tobacco, alcohol and vaping carry serious risks for young people. **Nicotine**, found in cigarettes and in many vapes, is highly **addictive**, and it can affect the developing teenage brain, harming attention, memory and mood. Vaping devices can also contain other chemicals that irritate and damage the lungs, and they can make it harder to breathe during sports. **Alcohol** impairs judgment, balance and reaction time, can interfere with brain development, and is illegal for people under 21. Drinking and driving causes deadly crashes. These substances also cost money, disrupt sleep, and reduce athletic performance. In the United States, the law restricts the purchase of tobacco and vape products to people 21 and over.

How can you say no? Practice **refusal skills**. Say **no clearly and firmly** ("No thanks."). Give a **short reason** that does not invite debate ("I'm in training," "I don't want to."). **Suggest something else** ("Let's go play basketball instead."). Use **humor**, or **leave** the situation if the pressure continues. Having an **exit plan**, such as a code word with a parent for a ride home, makes it easier. If you or a friend is struggling, talk to a trusted adult: a parent, the **school counselor**, the **school nurse**, a doctor, or a national helpline. Asking for help is a sign of strength. Knowing that you have choices, and practicing what to say, helps you act on your values when it matters.
`,
  ],
  cards: [
    ["Media literacy", "Asking critical questions about messages from media."],
    ["Peer influence", "The effect friends have on what you do."],
    ["Nicotine", "An addictive drug found in tobacco and many vapes."],
    ["Addiction", "A strong need to keep using a substance despite harm."],
    ["Impaired judgment", "A reduced ability to think and decide well."],
    ["Refusal skill", "A way of saying no to a risky offer."],
    ["Exit plan", "A prepared way to leave a situation safely."],
    ["Trusted adult", "A responsible adult you can talk to for help."],
  ],
  closed: [
    [
      "Which question helps you think critically about an ad?",
      ["Who made this and what do they want?", "What color is it?", "How long is it?", "Who is my friend?"],
      "A",
    ],
    [
      "Why is nicotine a particular risk for teenagers?",
      ["It is addictive and can affect the developing brain", "It improves memory", "It has no effects", "It is legal for everyone"],
      "A",
    ],
    [
      "Which is a good refusal strategy?",
      ["Say no firmly and suggest something else", "Say maybe", "Argue for an hour", "Give in quietly"],
      "A",
    ],
    [
      "Most teens:",
      ["Do not vape or drink alcohol", "All vape", "All drink", "Never go to school"],
      "A",
    ],
    [
      "Who is a trusted adult for help?",
      ["A school counselor", "A stranger online", "An advertiser", "Nobody"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A fictional ad for a vape shows smiling friends at a party and the words \"Everyone's doing it. Join in.\" Analyze the ad using at least three critical questions, explain how it uses peer pressure, and explain two facts the ad leaves out.",
      scheme: [
        "Uses at least three critical questions such as who made it, what do they want and what is left out",
        "Explains the peer pressure technique (everyone is doing it, fitting in)",
        "Identifies a left-out fact such as addiction to nicotine",
        "Identifies a second left-out fact such as lung harm, cost, or that most teens do not vape or that sales are age-restricted",
      ],
      model:
        "Who made this? A vape company, which wants to sell more. What do they want me to do? Buy and use the vape. What is left out? The risks. The ad uses peer pressure by saying everyone is doing it, so it makes me feel left out if I don't. It leaves out that nicotine is addictive and can affect the teenage brain, and that vapes can harm the lungs. Most teens do not vape, and it is illegal to sell them to anyone under 21.",
      answers: [
        [
          "full",
          "[[0|Who made it? A vape company that wants to sell more. What do they want? For me to buy it. What's left out? The risks and the facts.]] [[1|It uses peer pressure: 'Everyone's doing it' makes me feel I'll be left out if I don't.]] [[2|It leaves out that nicotine is addictive and can affect the teenage brain.]] [[3|It also leaves out lung harm, and that most teens don't vape and that it's illegal to sell to anyone under 21.]]",
          "Full marks. Critical questions and two missing facts.",
        ],
        [
          "full",
          "[[0|I'd ask who paid for the ad, what they hope I'll do, and what they aren't telling me.]] [[1|'Everyone's doing it' is a bandwagon appeal; it pressures me to fit in.]] [[2|The ad doesn't say nicotine is highly addictive.]] [[3|It also doesn't say that vapes can harm the lungs, or that most teens don't use them.]]",
          "Full marks. Naming the bandwagon technique shows media literacy.",
        ],
        [
          "partial",
          "[[0|A vape company made it to sell more.]] [[2|It leaves out that nicotine is addictive.]] The ad is accurate because everyone really is doing it.",
          "Most teens do not vape. 'Everyone's doing it' is a pressure technique, not a fact.",
        ],
        [
          "partial",
          "[[1|It makes you want to fit in.]] [[3|It leaves out lung harm.]] Ads always tell the whole truth.",
          "Ads show only what helps sell the product. Ask what is left out.",
          true,
        ],
        [
          "weak",
          "The ad is just a picture of friends and has no message.",
          "Every ad has a message. Ask who made it and what they want.",
        ],
        [
          "weak",
          "[[0|They want to sell.]] Vaping is harmless, so nothing is missing.",
          "Vaping carries risks such as nicotine addiction and lung harm.",
        ],
      ],
    },
    {
      prompt:
        "At a party, a friend offers you a vape and says, \"Just try it, don't be boring.\" Write what you would say and do, using at least three refusal strategies, and explain two risks that support your choice. Then name two trusted adults or resources you could turn to if the pressure continued.",
      scheme: [
        "Writes a clear, firm refusal",
        "Uses at least three refusal strategies such as a short reason, suggesting an alternative, humor or leaving",
        "Explains two correct risks such as addiction, brain effects, lung harm or cost",
        "Names two trusted adults or resources",
      ],
      model:
        "I would say, \"No thanks, I'm good.\" I would give a short reason, \"I'm training for the team,\" suggest something else, \"Let's go play basketball,\" and leave if he kept pushing. Nicotine is addictive and can affect my developing brain, and vapes can harm the lungs and my sports performance. If the pressure continued I could talk to a parent or the school counselor.",
      answers: [
        [
          "full",
          "[[0|I'd say 'No thanks, I'm good' in a firm, calm voice.]] [[1|I'd add a short reason like 'I'm training,' suggest we go play basketball instead, and leave if he kept pushing.]] [[2|My reasons are that nicotine is addictive and affects my developing brain, and vapes can harm my lungs and my sports.]] [[3|If the pressure continued, I'd talk to a parent or the school counselor.]]",
          "Full marks. Three strategies, two risks and two helpers.",
        ],
        [
          "full",
          "[[0|'Nope, not for me.' I'd say it with a smile so it isn't awkward.]] [[1|I'd use humor ('I'm saving my lungs for the mile'), offer a different activity and walk away if he kept going.]] [[2|Nicotine is addictive, and vaping can make it harder to breathe when I play sports.]] [[3|My older cousin and the school nurse are people I can ask for help.]]",
          "Full marks. Humor and a clear exit make saying no easier.",
        ],
        [
          "partial",
          "[[0|I'd say no.]] [[3|I'd talk to my mom.]] I'd say yes just once because it can't hurt, and I'd not give a reason.",
          "Nicotine is addictive even after a little. Add refusal strategies and explain the risks.",
        ],
        [
          "partial",
          "[[1|I'd say I'm training and leave.]] [[2|Nicotine is addictive.]] There are no adults who can help with this.",
          "Parents, school counselors, school nurses and doctors can help.",
          true,
        ],
        [
          "weak",
          "I'd take it so I don't look boring, because friends matter most.",
          "Real friends respect your choice. Practice a firm refusal.",
        ],
        [
          "weak",
          "[[0|I'd say no.]] Vapes are safe because they have no smoke.",
          "Vapes can contain nicotine and chemicals that harm the lungs.",
        ],
      ],
    },
  ],
};

writeCourse(
  "physical-education-9-grade-9.json",
  "Physical Education 9",
  "Grade 9",
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
