import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Physical Education 10, Grade 10, Quarter 1. Standards: SHAPE America
 * National Standards for K-12 Physical Education, with a Health Education
 * week, in the school's own words. The year builds on Grade 9: planning with
 * FITT, the science of how the body responds, invasion games and a lifetime
 * activity, analysis, first aid and nutrition. No practical write-ups.
 */

const w1: WeekInput = {
  topic: "Reading your fitness results and planning with the FITT principle",
  note: `
## Objectives

Students will be able to:

1. compare your fitness results with healthy-range standards and identify strengths and goals;
2. design a personal fitness plan with a goal, a schedule and measures of progress;
3. apply the FITT principle to design a workout for strength or endurance.

## Materials

Individual fitness test results, a healthy-range table (illustrative values), plan templates, stopwatches, the worksheet.

## Starter (6 minutes)

Ask: "Two students want to get stronger. One lifts the same light weight every day, the other adds a little each week. Who improves more, and why?" Introduce progressive overload.

## Main activity

1. Healthy-range standards are the values at which most people of your age are likely to have a lower health risk. Compare each test result with its range and sort into strengths (in or above the range) and goals (below it). The standards are guides, not judgments of a person.
2. Plan: goal (SMART), schedule across a week, how progress is measured, and a review date.
3. FITT: Frequency (how often), Intensity (how hard), Time (how long), Type (what kind of activity). Example for endurance: 3 days a week, intensity 60 to 80 percent of heart-rate reserve, 30 minutes, jogging or cycling. Example for strength: 2 to 3 days a week with a day of rest between, 8 to 12 repetitions of a weight you can just manage, 2 to 3 sets, major muscle groups.
4. Heart-rate reserve (HRR) method: HRR = maximum - resting. Age 16: max 204; resting 64; HRR 140; 60 percent: 64 + 84 = 148; 80 percent: 64 + 112 = 176.
5. Progressive overload: raise the load slowly (about 10 percent a week) so the body adapts.

## Worksheet

Compare results, then write a FITT plan.
`,
  reading: [
    "Turning test results into a plan",
    `
After a fitness test, the numbers by themselves do not mean much. To make sense of them, compare each one with a **healthy-range standard**, a value at which most people of your age and sex are likely to have a lower risk of health problems. These standards are guides, not a verdict on who you are. If your mile time is in the healthy range and your push-ups are below it, then cardiorespiratory endurance is a **strength** and upper-body muscular endurance is a **goal**. Notice that most people have both. A good analysis also asks why: did you train for one and not the other? Was the test day unusual? Did you sleep well?

Next, write a **fitness plan**. A good plan has a **goal** (a SMART goal such as "do 20 push-ups in a minute in eight weeks"), a **schedule** that fits the days of your week, **measures of progress** (a log of weekly tests), and a **review date** when you decide to continue or change the plan.

The **FITT principle** helps to design the exercise itself. **F**requency is how often you exercise. **I**ntensity is how hard. **T**ime is how long each session lasts. **T**ype is the kind of exercise. For endurance, a beginner plan might be three days a week (frequency), at 60 to 80 percent of heart-rate reserve (intensity), for 30 minutes (time), by jogging or cycling (type). For strength, a plan might be two or three non-consecutive days a week so that muscles can recover (frequency), using a weight that you can lift 8 to 12 times with effort (intensity), for two or three sets of each major muscle group (time), with exercises such as squats, push-ups and rows (type).

A more precise way to set intensity uses the **heart-rate reserve**, the difference between your maximum and resting heart rates. For a 16-year-old, the estimated maximum is 220 - 16 = 204. If the resting rate is 64, the reserve is 204 - 64 = 140. The target zone from 60 to 80 percent is the resting rate plus 60 and 80 percent of the reserve: 64 + 0.60 x 140 = 148 and 64 + 0.80 x 140 = 176. So the zone is about 148 to 176 beats per minute. This is a bit higher than a simple percentage of the maximum, since it accounts for your fitness.

Finally, remember **progressive overload**: the body adapts only if it is asked to do a little more than it is used to. Increase the amount of weight, the number of repetitions or the minutes by about 10 percent a week, not suddenly. Too much too soon causes injuries, while too little leads to no change. Rest days are part of the plan, since muscles grow stronger during recovery.
`,
  ],
  cards: [
    ["Healthy-range standard", "A value linked to lower health risk for a given age."],
    ["FITT", "Frequency, intensity, time and type."],
    ["Heart-rate reserve", "Maximum heart rate minus resting heart rate."],
    ["Progressive overload", "Gradually increasing the demand on the body."],
    ["Frequency", "How often you exercise."],
    ["Intensity", "How hard you exercise."],
    ["Repetition", "One complete movement of an exercise."],
    ["Set", "A group of repetitions done without rest."],
  ],
  closed: [
    [
      "In FITT, the first T stands for:",
      ["Training", "Time", "Target", "Trial"],
      "B",
    ],
    [
      "What is heart-rate reserve for a 16-year-old with a maximum of 204 and a resting rate of 64?",
      ["64", "140", "204", "268"],
      "B",
    ],
    [
      "What does progressive overload mean?",
      ["Doing the same workout forever", "Gradually increasing the demand on the body", "Doing the hardest workout at once", "Never resting"],
      "B",
    ],
    [
      "How should strength training days be scheduled?",
      ["Every day on the same muscles", "With rest days between sessions for the same muscles", "Only once a month", "Right before sleeping"],
      "B",
    ],
    [
      "If a result is below the healthy range, it is best to treat it as:",
      ["A goal to work on", "A reason to quit", "A secret", "A fixed trait"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A 16-year-old has a resting heart rate of 64. Calculate her estimated maximum heart rate, her heart-rate reserve, and the 60 to 80 percent target zone using the reserve method. Then write an endurance workout using all four FITT parts.",
      scheme: [
        "Calculates the maximum as 204 and the reserve as 140",
        "Calculates the zone as about 148 to 176 beats per minute",
        "States frequency, intensity and time in the workout",
        "States the type of exercise and links intensity to the zone",
      ],
      model:
        "The estimated maximum is 220 minus 16, which is 204, and the reserve is 204 minus 64, which is 140. The 60 percent point is 64 plus 84, which is 148, and 80 percent is 64 plus 112, which is 176, so the zone is about 148 to 176. Workout: three days a week (frequency), keeping my heart rate in that zone (intensity), for 30 minutes (time), by jogging or cycling (type).",
      answers: [
        [
          "full",
          "[[0|Maximum is 220 - 16 = 204, so the reserve is 204 - 64 = 140.]] [[1|60 percent is 64 + 84 = 148 and 80 percent is 64 + 112 = 176, so the zone is about 148 to 176.]] [[2|Frequency: three days a week. Intensity: heart rate in that zone. Time: 30 minutes.]] [[3|Type: jogging or cycling, checking my pulse halfway to be sure I'm in the zone.]]",
          "Full marks. All four FITT parts and the zone are linked.",
        ],
        [
          "full",
          "[[0|Her maximum is 204 and her reserve is 140.]] [[1|The zone is 148 at the low end and 176 at the top.]] [[2|Frequency three times a week, 30 minutes each time, at an intensity that keeps her between 148 and 176.]] [[3|The type of exercise is cycling, because it's easy on the joints and she can keep the effort steady.]]",
          "Full marks. Explaining why the type fits is a thoughtful touch.",
        ],
        [
          "partial",
          "[[0|The maximum is 204 and the reserve is 140.]] [[2|Three days a week for 30 minutes.]] The zone is 60 to 80, so she should keep her heart rate between 60 and 80 beats.",
          "The zone is 148 to 176 beats per minute. 60 and 80 are percentages.",
        ],
        [
          "partial",
          "[[1|The zone is 148 to 176.]] [[3|Jogging is the type.]] The reserve is 204 + 64 = 268.",
          "Reserve is maximum minus resting: 204 minus 64.",
          true,
        ],
        [
          "weak",
          "She should exercise as hard as possible every day. No calculations are needed.",
          "A plan uses frequency, intensity, time and type, with rest days.",
        ],
        [
          "weak",
          "Heart-rate reserve is the same as resting heart rate, 64.",
          "Reserve is the difference between maximum and resting heart rates.",
        ],
      ],
    },
    {
      prompt:
        "A student's results are: mile 10:20 (healthy range: under 11:00), push-ups 9 in one minute (healthy range: 14 or more), sit-and-reach 9 inches (healthy range: 8 or more). Identify strengths and goals, then write a four-week FITT plan for strength to reach the push-up range, including how you would apply progressive overload.",
      scheme: [
        "Identifies the mile and sit-and-reach as strengths and push-ups as the goal",
        "Writes frequency and time for the plan",
        "Writes intensity and type with sets and repetitions",
        "Describes progressive overload with a specific small weekly increase",
      ],
      model:
        "Strengths: the mile, since 10:20 is under 11:00, and the sit-and-reach, since 9 is above 8. The goal is push-ups: 9 is below 14. Plan: three days a week on non-consecutive days (frequency), about 20 minutes (time), three sets at a challenging effort of incline or standard push-ups to near fatigue (intensity), with push-ups, planks and rows (type). Each week I add one repetition per set, or about 10 percent, which is progressive overload.",
      answers: [
        [
          "full",
          "[[0|Strengths: the mile (10:20 is under 11:00) and flexibility (9 inches is above 8). Goal: push-ups, since 9 is under 14.]] [[1|I'd train three days a week on non-consecutive days, for about 20 minutes.]] [[2|Three sets of push-ups close to fatigue, with planks and rows as well.]] [[3|Each week I'd add one repetition per set, which is progressive overload.]]",
          "Full marks. The plan targets the goal and grows gradually.",
        ],
        [
          "full",
          "[[0|The mile and the reach are in the healthy range, so those are strengths; upper-body endurance is my goal.]] [[1|Frequency: Monday, Wednesday, Friday, for 20 to 25 minutes.]] [[2|Intensity: sets of incline push-ups until it gets hard, then progress to the floor; type: push-ups, planks and band rows.]] [[3|In week two I add two repetitions, in week three another set, so the load goes up by small steps.]]",
          "Full marks. Starting with incline push-ups is a good progression.",
        ],
        [
          "partial",
          "[[0|Push-ups are my goal.]] [[1|I would train three days a week.]] Every week I would double the push-ups to get there faster.",
          "Doubling is too large an increase. Raise the load by about 10 percent a week.",
        ],
        [
          "partial",
          "[[2|Three sets of push-ups.]] [[3|Add one rep a week.]] The mile is the goal because it is below the range.",
          "The mile is in the healthy range, so it is a strength. Push-ups are the goal.",
          true,
        ],
        [
          "weak",
          "All three results are fine, so there is nothing to plan.",
          "Nine push-ups is below the range of 14. That is a goal.",
        ],
        [
          "weak",
          "I would do push-ups seven days a week until I can do 14.",
          "Muscles need rest days to recover and grow stronger.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Measuring body composition, and how the body responds to exercise",
  note: `
## Objectives

Students will be able to:

1. measure body composition or fitness using accepted methods and explain what the data shows;
2. explain how muscles and the cardiovascular system respond to exercise.

## Materials

Height and weight charts (privacy screens), tape measures, a BMI calculation sheet, a diagram of the heart, the worksheet and quiz.

## Starter (6 minutes)

Ask: "What happens in your body in the first 30 seconds of a sprint? What do you notice?" List: faster breathing, pounding heart, warmth, sweating.

## Main activity

1. Body composition tools and their limits (data stay private; no one compares numbers with others): BMI = weight in kilograms divided by height in meters squared. Example: 60 kg and 1.65 m gives 60 / 2.7225 = 22.0. BMI is a screening tool; it cannot tell muscle from fat, so an athlete with much muscle may have a high BMI. Waist circumference and skinfold measures give other information. For teens, results are compared on age-and-sex charts as percentiles. A single number does not describe health.
2. Cardiovascular response: heart rate rises; stroke volume (blood pushed out per beat) rises; cardiac output = heart rate x stroke volume. At rest: 70 beats x 70 mL = 4,900 mL, about 4.9 L per minute. During hard exercise: 150 beats x 100 mL = 15,000 mL, 15 L per minute. Breathing rate rises; blood vessels in the working muscles widen. Long-term training: lower resting heart rate, larger stroke volume.
3. Muscle response: during exercise muscles use stored energy and oxygen, produce heat and waste (lactic acid is a part of the story, not the cause of next-day soreness); resistance training causes tiny tears in muscle fibers that repair and grow back stronger (hypertrophy) with rest and protein; muscles also get better at using oxygen with endurance training.
4. Delayed-onset muscle soreness (DOMS) appears 24 to 48 hours after unfamiliar exercise and fades.

## Quiz

Body composition and the body's response.
`,
  reading: [
    "What the numbers mean, and what happens inside",
    `
**Body composition** describes how much of the body is fat and how much is lean tissue such as muscle and bone. Several tools estimate it, and all have limits. The most common is the **body mass index (BMI)**, found by dividing weight in kilograms by the square of height in meters. For a student who weighs 60 kg and is 1.65 m tall: 1.65 x 1.65 = 2.7225, and 60 / 2.7225 = 22.0. For teenagers, BMI is compared with charts for age and sex, and the result is given as a percentile. BMI is a quick **screening** tool, but it cannot tell muscle from fat, so a muscular athlete may have a high BMI without being unhealthy. **Waist circumference** and **skinfold** measurements give different information. No single number describes health, and body composition data are private: they should not be used to judge or compare people.

Exercise changes the body at once and over time. Consider the **cardiovascular system**. During exercise, muscles need more oxygen, so the heart beats faster and pumps more blood. The amount of blood pumped by the heart each minute is the **cardiac output**, equal to **heart rate x stroke volume**, where stroke volume is the blood pushed out with each beat. At rest, a heart might beat 70 times a minute with a stroke volume of 70 milliliters: 70 x 70 = 4,900 mL, about 4.9 liters a minute. During hard exercise, the rate might be 150 and the stroke volume 100 mL: 150 x 100 = 15,000 mL, or 15 liters a minute, more than three times as much. Breathing gets faster and deeper, and blood vessels in the working muscles widen, to deliver more oxygen. With regular endurance training, the heart becomes stronger, so stroke volume increases and the resting heart rate falls; the heart does the same job with fewer beats.

**Muscles** respond too. During activity they use stored energy and oxygen and produce heat, which is why you sweat. With **resistance training**, the stress causes tiny tears in the muscle fibers. During rest, with food and especially protein, the body repairs them and builds them back slightly thicker and stronger, called **hypertrophy**. That is why rest days matter. Endurance training also improves the muscles' ability to use oxygen. You may feel sore a day or two after trying something new; this **delayed-onset muscle soreness** is normal, lasts a few days, and is not caused by lactic acid, as many people think. Gentle movement, water and sleep help. Sharp pain, swelling or pain in a joint is different, and should be checked by a nurse or doctor.
`,
  ],
  cards: [
    ["Body composition", "The proportion of fat compared with lean tissue."],
    ["BMI", "Weight in kilograms divided by height in meters squared."],
    ["Percentile", "A ranking compared with others of the same age and sex."],
    ["Stroke volume", "The blood pushed out by the heart in one beat."],
    ["Cardiac output", "Heart rate multiplied by stroke volume."],
    ["Hypertrophy", "An increase in the size of muscle fibers."],
    ["DOMS", "Soreness one to two days after unfamiliar exercise."],
    ["Resistance training", "Exercise that makes muscles work against a load."],
  ],
  closed: [
    [
      "What is the BMI of a person weighing 60 kg and 1.65 m tall (1.65 squared is 2.7225)?",
      ["18.0", "22.0", "36.4", "99.0"],
      "B",
    ],
    [
      "Why can an athlete have a high BMI without being unhealthy?",
      ["BMI cannot tell muscle from fat", "BMI measures height only", "Athletes are exempt", "BMI is always wrong"],
      "A",
    ],
    [
      "Cardiac output equals:",
      ["Heart rate plus stroke volume", "Heart rate times stroke volume", "Stroke volume divided by heart rate", "Breathing rate times height"],
      "B",
    ],
    [
      "What happens to resting heart rate after months of endurance training?",
      ["It tends to fall", "It rises", "It stays at the maximum", "It disappears"],
      "A",
    ],
    [
      "Muscles grow stronger mainly when they:",
      ["Repair during rest with food", "Are exercised every minute", "Are never used", "Are stretched only"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "At rest a person's heart beats 70 times a minute with a stroke volume of 70 mL. During hard exercise it beats 150 times a minute with a stroke volume of 100 mL. Calculate cardiac output in liters per minute for each, say how many times greater it is during exercise (to one decimal place), and explain why the body needs this change.",
      scheme: [
        "Calculates the resting output as 4,900 mL, about 4.9 L per minute",
        "Calculates the exercise output as 15,000 mL, 15 L per minute",
        "Calculates the ratio as about 3.1 times",
        "Explains that working muscles need more oxygen and nutrients, which the extra blood flow delivers",
      ],
      model:
        "At rest, 70 times 70 mL is 4,900 mL, about 4.9 L per minute. During hard exercise, 150 times 100 mL is 15,000 mL, which is 15 L per minute. That is 15 divided by 4.9, about 3.1 times as much. The body needs this change because working muscles need much more oxygen and nutrients, and the extra blood flow delivers them and carries away waste.",
      answers: [
        [
          "full",
          "[[0|At rest: 70 × 70 mL = 4,900 mL, about 4.9 L a minute.]] [[1|During exercise: 150 × 100 mL = 15,000 mL, which is 15 L a minute.]] [[2|15 ÷ 4.9 is about 3.1 times greater.]] [[3|Working muscles need much more oxygen and nutrients, and the extra blood flow delivers them and carries waste away.]]",
          "Full marks. The calculations and the reason are both correct.",
        ],
        [
          "full",
          "[[0|Resting cardiac output is 4.9 liters per minute.]] [[1|Exercise output is 15 liters per minute.]] [[2|That's roughly three times as much, 3.1 times.]] [[3|The muscles use oxygen faster when working, so the heart moves more blood to supply them.]]",
          "Full marks. Linking supply to the muscles' demand is the key idea.",
        ],
        [
          "partial",
          "[[0|At rest it is 4.9 L per minute.]] [[3|Muscles need more oxygen.]] During exercise it is 150 + 100, which is 250 mL, so it hardly changes.",
          "Cardiac output is heart rate times stroke volume: 150 times 100 mL is 15,000 mL.",
        ],
        [
          "partial",
          "[[1|Exercise output is 15 L a minute.]] [[2|It is about 3.1 times greater.]] The heart changes only so the person can feel hot.",
          "The heart pumps more blood to deliver oxygen to working muscles, not to make you hot.",
          true,
        ],
        [
          "weak",
          "The heart beats the same during exercise, so nothing changes.",
          "Heart rate and stroke volume both rise during hard exercise.",
        ],
        [
          "weak",
          "Cardiac output is how fast a person runs, which I cannot calculate.",
          "Cardiac output is heart rate times stroke volume, the blood pumped per minute.",
        ],
      ],
    },
    {
      prompt:
        "Explain why BMI is a useful screening tool but not a complete measure of health, using the example of a muscular rugby player who is 1.80 m tall and weighs 95 kg (1.8 squared is 3.24). Calculate the BMI to one decimal place, and describe what other information would be needed. Then explain why body composition data should be kept private.",
      scheme: [
        "Calculates the BMI as 29.3",
        "Explains that BMI cannot tell muscle from fat so a muscular person may have a high BMI",
        "Names another measure, such as waist circumference, skinfold, fitness tests or a doctor's check",
        "Explains that body data are private to avoid judging or comparing people, or because it is sensitive personal information",
      ],
      model:
        "BMI is 95 divided by 3.24, which is 29.3. It can be high for this player because BMI cannot tell muscle from fat, and muscle is heavy. We would also need other information, such as waist circumference, fitness test results or a doctor's check. Body composition data should be private because they are sensitive personal information and people should not be judged or compared by them.",
      answers: [
        [
          "full",
          "[[0|BMI is 95 ÷ 3.24, which is 29.3.]] [[1|That looks high, but BMI can't tell muscle from fat, and the player's weight is mostly muscle.]] [[2|You'd also want waist circumference, fitness test results or a doctor's check.]] [[3|The data should be private because it's sensitive and people shouldn't be judged or compared by it.]]",
          "Full marks. The example shows the limit of BMI clearly.",
        ],
        [
          "full",
          "[[0|95 divided by 3.24 is 29.3.]] [[1|It is a screening tool, so a flag for a closer look; it doesn't separate muscle weight from fat weight.]] [[2|Skinfold measurements, waist size and how fit he is would add information.]] [[3|Everyone's body data is personal, so it shouldn't be shared or used to compare students.]]",
          "Full marks. Calling it a flag for a closer look is accurate.",
        ],
        [
          "partial",
          "[[0|The BMI is 29.3.]] [[3|The data should be private.]] A high BMI always means the player is unhealthy and must lose weight.",
          "A high BMI can result from muscle. Other measures are needed to judge health.",
        ],
        [
          "partial",
          "[[1|BMI cannot tell muscle from fat.]] [[2|Waist size is another measure.]] BMI is 95 × 3.24, which is 307.8.",
          "BMI is weight divided by height squared: 95 divided by 3.24.",
          true,
        ],
        [
          "weak",
          "BMI is perfect and tells everything about health, so no other measure is needed.",
          "BMI is only a screening tool and has limits.",
        ],
        [
          "weak",
          "Body data should be posted on the wall so that everyone can compare.",
          "Body data are sensitive and private. Comparing people can hurt them.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Reassessing the quarter, and the skills of an invasion game",
  note: `
## Objectives

Students will be able to:

1. complete a quarter reassessment and reflect on your progress toward your goal;
2. demonstrate fundamental movement skills for an invasion game, such as passing, cutting and shooting.

## Materials

Baseline sheets, fitness equipment, basketballs or ultimate discs, cones, a skills checklist, the worksheet, quiz and problem set.

## Starter (6 minutes)

Ask: "What is the difference between an invasion game and a net game?" Collect: in an invasion game, teams share a space, move the ball or disc into the opponent's territory, and defend their own goal.

## Main activity

1. Reassessment: repeat the baseline tests under the same conditions; compute change and percent change. Example: mile 9:50 to 9:20 is 30 seconds faster; push-ups 20 to 26 is +6, a 30 percent increase (6 / 20). Reflect with three questions: What changed? What helped or got in the way? What is my next goal?
2. Invasion-game skills (basketball): passing (chest pass: step, push, thumbs down; bounce pass: aim two-thirds of the way); cutting (a sudden change of direction to get open, e.g., a V-cut: step one way, plant, then go the other way); shooting (BEEF cues: balance, eyes on the target, elbow under the ball, follow through). Teach the principle, then practice drills: 3-person weave, cut and catch, form shooting from close range.
3. Track results: free throws, 6 of 10 at the start and 8 of 10 now is 80 percent.

## Problem set

Compute changes and write a reflection.
`,
  reading: [
    "How far you have come, and moving the ball to score",
    `
At the end of the quarter you will repeat the fitness tests from the beginning. To compare fairly, use the same equipment, test order and warm-up. Then work out the **change** in each. If your mile time went from 9:50 to 9:20, you are 30 seconds faster. If your push-ups went from 20 to 26, that is 6 more, and the **percent change** is the change divided by the starting value: 6 / 20 = 0.30, or a 30 percent increase. Look at the pattern rather than a single number. Some results may stay the same or drop, and there are many reasons: a poor night of sleep, an illness, a lack of practice at that exercise, or a goal that needed a different plan. A useful **reflection** asks three questions. What changed, and by how much? What helped, and what got in the way? What will my next goal be? A reflection that offers honest answers is more valuable than a perfect set of numbers.

The second half of the unit turns to **invasion games**, such as basketball, soccer, ultimate and hockey. In these games, teams share a space and try to move a ball or disc into the opponent's territory to score, while defending their own. Three skills matter in nearly all of them: passing, cutting and shooting.

**Passing** keeps the ball moving faster than any defender can run. In a **chest pass** (basketball), hold the ball at the chest, step toward the target, extend your arms and snap your wrists so that your thumbs point down. A **bounce pass** is aimed to hit the floor about two-thirds of the way to the receiver, and is useful to get past a defender. **Cutting** is a sudden change of direction used to get open to receive a pass. In a **V-cut**, you take a step in one direction to move your defender, plant your foot, and then explode the other way to the ball. A good cut is sharp, and the receiver gives the passer a clear target with the hands. **Shooting** is the skill that scores. A reliable form uses **BEEF**: **B**alance (feet shoulder-width, knees bent), **E**yes on the target (the back of the rim), **E**lbow under the ball and in line, and **F**ollow-through (wrist snapped, fingers pointing at the basket). Practice from close range first and move back as your form holds. Keep track of your results, for example free throws made: 6 of 10 in week one and 8 of 10 now is 80 percent, a clear sign of progress.
`,
  ],
  cards: [
    ["Percent change", "The change divided by the starting value, times 100."],
    ["Reflection", "Thinking about what changed and why."],
    ["Invasion game", "A game in which teams move a ball into the opponent's territory."],
    ["Chest pass", "A two-handed pass from the chest."],
    ["Bounce pass", "A pass that bounces once before reaching the receiver."],
    ["Cut", "A sudden change of direction to get open."],
    ["V-cut", "A cut that fakes one way and then goes the other."],
    ["BEEF", "Balance, eyes, elbow and follow-through for shooting."],
  ],
  closed: [
    [
      "Push-ups went from 20 to 26. What is the percent increase?",
      ["6 percent", "23 percent", "30 percent", "130 percent"],
      "C",
    ],
    [
      "What does the second E in BEEF stand for?",
      ["Eyes", "Elbow", "Energy", "Effort"],
      "B",
    ],
    [
      "Why use the same conditions when retesting?",
      ["To make the comparison fair", "To tire out the students", "To save time", "Because it is easier"],
      "A",
    ],
    [
      "A V-cut is used to:",
      ["Get open to receive a pass", "Slow the game", "Take a free throw", "Start a fight"],
      "A",
    ],
    [
      "Free throws went from 6 of 10 to 8 of 10. What is the new percentage?",
      ["8 percent", "60 percent", "80 percent", "100 percent"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "At the start of the quarter a student ran the mile in 9:50 and did 20 push-ups. At the end he ran 9:20 and did 26 push-ups. Calculate the change in each, the percent increase in push-ups, and write a short reflection covering what helped, what got in the way and a next goal.",
      scheme: [
        "Calculates the mile change as 30 seconds faster",
        "Calculates push-ups as +6 and a 30 percent increase",
        "Reflects on what helped or got in the way with a specific example",
        "States a next goal that is measurable",
      ],
      model:
        "The mile is 30 seconds faster. Push-ups went up 6, which is 6 divided by 20, a 30 percent increase. Running three mornings a week helped the mile, but my push-ups plateaued during the exam week because I slept badly. My next goal is to run the mile under 9:00 and do 30 push-ups in eight weeks.",
      answers: [
        [
          "full",
          "[[0|The mile improved from 9:50 to 9:20, so 30 seconds faster.]] [[1|Push-ups went up 6, and 6 ÷ 20 = 30 percent more.]] [[2|Running three mornings a week helped the mile, but my push-ups stalled in exam week when I slept badly.]] [[3|My next goal is a mile under 9:00 and 30 push-ups in eight weeks.]]",
          "Full marks. The reflection is honest and the new goal is measurable.",
        ],
        [
          "full",
          "[[0|He's 30 seconds faster in the mile.]] [[1|He did 6 more push-ups, which is a 30 percent increase.]] [[2|What helped was practicing push-ups after every run; what got in the way was missing two weeks with a sprained wrist.]] [[3|Next he wants 32 push-ups and a 9:00 mile by the end of the next quarter.]]",
          "Full marks. Naming the injury as an obstacle is useful reflection.",
        ],
        [
          "partial",
          "[[0|The mile is 30 seconds faster.]] [[3|Next goal: get better.]] Push-ups improved by 6 percent.",
          "6 more out of 20 is 30 percent. Also, make the next goal measurable.",
        ],
        [
          "partial",
          "[[1|Push-ups went up 30 percent.]] [[2|I slept badly in exams.]] The mile is 30 minutes faster.",
          "9:50 to 9:20 is 30 seconds faster, not 30 minutes.",
          true,
        ],
        [
          "weak",
          "Results do not matter. The quarter is over so I will stop exercising.",
          "A reflection looks at what changed and what comes next.",
        ],
        [
          "weak",
          "I improved by 26 percent because I did 26 push-ups.",
          "Percent change is the change divided by the starting value.",
        ],
      ],
    },
    {
      prompt:
        "Describe how to complete a good chest pass and a V-cut in basketball, then explain how a passer and a cutter work together to beat a defender. Finally, explain the BEEF cues for a jump shot or set shot, and why it helps to track your made shots.",
      scheme: [
        "Describes the chest pass technique accurately",
        "Describes the V-cut accurately (a step one way, plant and go the other way)",
        "Explains how the passer and cutter coordinate to get open and deliver the pass",
        "Explains the BEEF cues and why tracking shots shows progress",
      ],
      model:
        "For a chest pass, I hold the ball at my chest, step toward the target, extend my arms and snap my wrists so my thumbs point down. For a V-cut, I step one way to move my defender, plant my foot and cut the other way to the ball. The cutter gives a target with the hands, and the passer throws when the cutter breaks free. For shooting, BEEF is balance, eyes, elbow and follow-through. Tracking made shots, such as 8 of 10, shows progress in numbers.",
      answers: [
        [
          "full",
          "[[0|For a chest pass I hold the ball at my chest, step to the target, extend my arms and snap my wrists, thumbs down.]] [[1|For a V-cut I step one way to move my defender, plant, and cut the other way to the ball.]] [[2|The cutter shows a target with their hands, and the passer throws as soon as the cutter breaks free.]] [[3|BEEF means balance, eyes on the rim, elbow under the ball and follow-through; tracking made shots, like 8 of 10, shows progress.]]",
          "Full marks. The skills and teamwork are clearly connected.",
        ],
        [
          "full",
          "[[0|A chest pass starts at the chest, with a step and a push through, finishing with the thumbs pointing down.]] [[1|A V-cut is faking one direction, planting the foot and exploding the other way.]] [[2|The passer must see the cut and deliver the ball to the target hands, so timing matters.]] [[3|The shooting cues are balance, eyes, elbow and follow-through, and a shot chart shows if my form is improving.]]",
          "Full marks. Timing is the key link between passer and cutter.",
        ],
        [
          "partial",
          "[[0|A chest pass is thrown from the chest with a step.]] [[3|BEEF is balance, eyes, elbow and follow-through.]] A V-cut is walking in a V shape slowly, and the passer does not need to watch.",
          "A cut is a sudden change of direction, and the passer watches the cutter to deliver at the right moment.",
        ],
        [
          "partial",
          "[[1|A V-cut fakes one way and goes the other.]] [[2|Passer and cutter work together.]] BEEF is a type of sandwich.",
          "BEEF is a set of shooting cues: balance, eyes, elbow and follow-through.",
          true,
        ],
        [
          "weak",
          "You just throw the ball as hard as you can and hope someone catches it.",
          "A good pass has a target, a step and a snap of the wrists.",
        ],
        [
          "weak",
          "[[3|Tracking shots shows progress.]] Defenders cannot be beaten, so cutting is pointless.",
          "A well-timed cut moves the defender and creates an open passing lane.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "A lifetime activity, spacing and zone defense",
  note: `
## Objectives

Students will be able to:

1. demonstrate basic skills in a lifetime activity, such as badminton, pickleball or yoga;
2. use offensive and defensive tactics such as spacing and zone defense in a game.

## Materials

Pickleball paddles and plastic balls, nets or lines, yoga mats, cones, a basketball, pinnies, the skills checklist, the quiz, problem set and worksheet.

## Starter (6 minutes)

Ask: "What sports can a 70-year-old play with a 15-year-old?" Collect: pickleball, golf, swimming, walking, yoga. Discuss why these are called lifetime activities.

## Main activity

1. Pickleball: a paddle sport played on a small court. Serve underhand, diagonally, behind the baseline; the ball must bounce once on each side before volleys (two-bounce rule); no volleying in the non-volley zone ("kitchen," 7 feet from the net); only the serving team scores; games are to 11 points and must be won by 2. Skills: ready position, dink (soft shot over the net), drive, serve, and moving as a pair.
2. Yoga basics: breath-led movement; poses: mountain (stand tall), downward dog, warrior II, child's pose; keep the spine long, breathe slowly through the nose, hold for 5 breaths, never push into pain. Benefits: flexibility, balance, calm.
3. Tactics in a game: spacing (players stay a good distance apart so one defender cannot guard two); zone defense (each defender guards an area, not a person), e.g., a 2-3 zone in basketball (two at the top, three near the basket); strengths: protects the basket, needs less running; weaknesses: open outside shots and the gaps between defenders. Offense against a zone: pass quickly, move the ball side to side, find gaps, shoot from outside.

## Problem set

Rules and zone analysis.
`,
  reading: [
    "Activities for a lifetime, and thinking about space",
    `
Not every sport can be played at any age. A **lifetime activity** is one that you can enjoy for many years, often with people of all ages and abilities. Walking, swimming, cycling, golf, yoga, badminton and pickleball are examples. Learning the basics now gives you something to do long after school sports end.

**Pickleball** is played on a small court with paddles and a plastic ball with holes. The rules are simple but have some surprises. The serve is hit **underhand** and diagonally across the court, from behind the baseline. After the serve, the ball must **bounce once on each side** before anyone may hit it out of the air; this is the **two-bounce rule**. Near the net there is a **non-volley zone**, called "the kitchen," which extends 7 feet from the net on each side. You may not hit the ball out of the air while standing in this zone. Only the **serving team** scores points. A game is played to **11 points** and must be won by **2**. Core shots include the **serve**, the **drive** (a firm, flat shot) and the **dink**, a soft shot that drops just over the net, forcing the opponent to hit upward. Players keep a **ready position** with the paddle in front and move together as a pair.

**Yoga** combines movement, balance, stretching and breathing. Simple poses include **mountain** (standing tall, feet together, arms at the sides), **downward dog** (hands and feet on the floor, hips lifted into an inverted V), **warrior II** (a wide stance with the front knee bent and arms stretched out) and **child's pose** (kneeling and folding forward to rest). Move with your breath, breathing slowly through the nose, hold a pose for about five breaths, keep the spine long, and never push into pain. Regular practice can improve flexibility, balance and calm.

Games also teach tactics. **Spacing** means players keep a good distance from each other so that one defender cannot guard two attackers, and so that there is room to pass and cut. In a **zone defense**, each defender guards an area of the court rather than a particular player. A common basketball example is the **2-3 zone**: two defenders at the top and three near the basket. The zone protects the area near the basket and requires less running, but it can leave open shots from the outside and **gaps** between defenders. To attack a zone, move the ball quickly from side to side, pass into the gaps and take outside shots when open. Compare this with **man-to-man** defense, where each defender is responsible for one opponent. Neither is always better; the best choice depends on the opponent's strengths.
`,
  ],
  cards: [
    ["Lifetime activity", "An activity a person can enjoy at many ages."],
    ["Two-bounce rule", "The ball must bounce once on each side before volleys."],
    ["Kitchen", "The non-volley zone near the net in pickleball."],
    ["Dink", "A soft shot that drops just over the net."],
    ["Warrior II", "A yoga pose with a wide stance and bent front knee."],
    ["Spacing", "Keeping a useful distance between teammates."],
    ["Zone defense", "A defense in which each player guards an area."],
    ["2-3 zone", "A basketball zone with two defenders at the top and three near the basket."],
  ],
  closed: [
    [
      "In pickleball, which team can score points?",
      ["Either team", "Only the serving team", "Only the receiving team", "The team with the oldest player"],
      "B",
    ],
    [
      "A pickleball game is usually won at:",
      ["5 points", "11 points, ahead by 2", "21 points", "50 points"],
      "B",
    ],
    [
      "What does a zone defense assign each defender?",
      ["An opponent", "An area of the court", "The ball only", "The bench"],
      "B",
    ],
    [
      "Why are yoga poses held with slow breathing?",
      ["To improve balance, calm and flexibility", "To win points", "To run faster", "To avoid equipment"],
      "A",
    ],
    [
      "Which is a weakness of a zone defense?",
      ["Open outside shots", "Too much running", "No one near the basket", "It is illegal"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Explain the main rules of pickleball to someone who has never played: the serve, the two-bounce rule, the non-volley zone, who can score and how a game is won. Then describe the dink and when you would use it.",
      scheme: [
        "Describes the underhand diagonal serve",
        "Explains the two-bounce rule and the non-volley zone",
        "Explains that only the serving team scores and games go to 11, win by 2",
        "Describes the dink as a soft shot over the net and when it is useful",
      ],
      model:
        "The serve is hit underhand diagonally across the court from behind the baseline. After the serve, the ball must bounce once on each side before it can be volleyed, which is the two-bounce rule, and nobody may volley while standing in the non-volley zone, the kitchen, near the net. Only the serving team scores, and a game is played to 11 points and won by 2. A dink is a soft shot that drops just over the net; I use it when the opponents are at the net so that they must hit upward.",
      answers: [
        [
          "full",
          "[[0|The serve is underhand, diagonal, from behind the baseline.]] [[1|After the serve the ball must bounce once on each side before volleys (the two-bounce rule), and you can't volley while standing in the non-volley zone, or kitchen, by the net.]] [[2|Only the serving team scores, and a game is to 11 points, won by 2.]] [[3|A dink is a soft shot that drops just over the net; it's useful against opponents at the net, since they have to hit upward.]]",
          "Full marks. A clear explanation for a newcomer.",
        ],
        [
          "full",
          "[[0|You serve underhand across the court diagonally, behind the back line.]] [[1|Each side must let the ball bounce once before hitting it out of the air, and the area 7 feet from the net, the kitchen, is no place to volley.]] [[2|Points go only to the serving team, and you need 11, with a 2-point lead.]] [[3|The dink is a gentle shot just over the net, good when opponents are close to the net and I want to slow the rally.]]",
          "Full marks. 'Slow the rally' is a good tactical reason for the dink.",
        ],
        [
          "partial",
          "[[0|The serve is underhand and diagonal.]] [[2|Either team can score on every rally, and the game is to 21.]] The kitchen is where the food is. A dink is a hard smash.",
          "Only the serving team scores, to 11 points. A dink is a soft shot, and the kitchen is the non-volley zone.",
        ],
        [
          "partial",
          "[[1|The ball bounces once on each side first.]] [[3|A dink is soft.]] You may volley anywhere and the serve is overhand.",
          "The serve is underhand, and volleys are not allowed in the non-volley zone.",
          true,
        ],
        [
          "weak",
          "Pickleball is the same as tennis with a bigger court and the same rules.",
          "Pickleball has a smaller court and its own rules, such as the two-bounce rule.",
        ],
        [
          "weak",
          "I do not know the rules, so I would just play and see what happens.",
          "Knowing the rules makes the game fair and fun. Explain the main ones.",
        ],
      ],
    },
    {
      prompt:
        "Your team is playing basketball against a team that uses a 2-3 zone defense. Explain what a zone defense is, name one strength and one weakness, and describe three offensive tactics (including spacing) that you would use to attack it.",
      scheme: [
        "Defines a zone defense as each defender guarding an area",
        "Names a strength (such as protecting the basket) and a weakness (such as open outside shots or gaps)",
        "Describes spacing and quick ball movement as offensive tactics",
        "Describes a third tactic such as passing into gaps or shooting from outside",
      ],
      model:
        "In a zone defense each defender guards an area of the court rather than one player. A 2-3 zone protects the basket, but it can leave open outside shots and gaps between defenders. To attack it, we would spread out with good spacing so that defenders cannot cover two of us, move the ball quickly from side to side, and pass into the gaps or take open outside shots.",
      answers: [
        [
          "full",
          "[[0|A zone defense means each defender guards an area of the court, not one player.]] [[1|Strength: it protects the basket; weakness: it can leave open outside shots and gaps between defenders.]] [[2|We'd use spacing so no defender can cover two of us, and move the ball quickly side to side.]] [[3|We'd pass into the gaps, and shoot from the outside when we're open.]]",
          "Full marks. Each tactic is matched to a weakness of the zone.",
        ],
        [
          "full",
          "[[0|In a 2-3 zone, two defenders are at the top and three guard the basket area.]] [[1|It's good at stopping drives to the basket, but outside shooters and the gaps between players are weak points.]] [[2|We'd stand at a wide spacing and make quick passes across the top so the zone has to shift.]] [[3|Then we'd feed the ball into a gap at the free-throw line or shoot a three if the shooter is open.]]",
          "Full marks. Making the zone shift is the key idea.",
        ],
        [
          "partial",
          "[[0|Each defender guards an area.]] [[2|We should spread out.]] The zone has no weakness, so we cannot attack it.",
          "Every defense has weaknesses. Name one and plan a tactic to use it.",
        ],
        [
          "partial",
          "[[1|Zones leave open outside shots.]] [[3|Shoot from the outside.]] A zone is when each defender follows one player everywhere.",
          "That is man-to-man. In a zone, defenders guard areas.",
          true,
        ],
        [
          "weak",
          "Just dribble into the middle of the zone as hard as you can.",
          "Driving into a crowded zone is risky. Use quick passes and spacing instead.",
        ],
        [
          "weak",
          "Zone defense is a type of music, and I do not know it.",
          "A zone defense is a way of organizing defenders by area.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Analyzing performance, officiating and sportsmanship",
  note: `
## Objectives

Students will be able to:

1. analyze a game performance using a simple checklist and suggest improvements;
2. take on the role of referee or scorekeeper and apply the rules fairly;
3. demonstrate sportsmanship in winning, losing and disagreement.

## Materials

A game-analysis checklist, stat sheets, whistles, scoring cards, official-signal cards, the worksheet and problem set.

## Starter (6 minutes)

Show a stat line for a fictional team: 12 shots made out of 30 attempted, 14 turnovers, 9 assists. Ask: "What do these numbers say? What would you change?"

## Main activity

1. Game analysis: choose a few measurable things (shooting percentage, turnovers, passes before a shot, defensive stops, participation). Compute: 12 of 30 = 40 percent. Compare with a target (for example, 50 percent). Identify one strength and one fix, and design a practice to address it.
2. Officiating: the referee applies rules fairly and consistently; signals are clear, calls are made promptly; the scorekeeper keeps an accurate record of points, fouls and time, and confirms with captains at breaks. Officials do not take sides, and players accept decisions, asking questions politely through the captain.
3. Sportsmanship in winning (be gracious, no taunting), losing (congratulate, learn), and disagreement (calm voice, ask politely, accept the final call). Handshakes after a game.

## Problem set

Analyze a stat line and apply rules.
`,
  reading: [
    "Looking closely at a game, and keeping it fair",
    `
Coaches and athletes improve by studying performance, not by guessing. A simple **game analysis** begins by choosing a few things that you can measure and that matter to the outcome. In basketball you might track **shooting percentage**, **turnovers**, **assists**, **rebounds** and **defensive stops**. Suppose a team makes 12 of 30 shots. The shooting percentage is 12 / 30 = 0.40, or 40 percent. If your target is 50 percent, the team is below it. Look at the other numbers for the reasons: 14 turnovers means that the team gave the ball away 14 times, which cost many shots. With only 9 assists, perhaps players tried too many shots on their own. A good analysis names a **strength** (for instance, good rebounding), identifies one **problem** (turnovers), and suggests a **practice** to fix it (a passing drill under defensive pressure). Analysis should be about the team's performance, not blaming individuals.

Games also depend on **officials** who apply the rules fairly. A **referee** or umpire makes calls, signals them clearly and promptly, and treats both teams the same. He or she must know the rules well, stay in a good position to see the play, and stay calm when people disagree. A **scorekeeper** records points, fouls and time accurately and checks with team captains at breaks so that disputes are avoided. Being the official in a class game is a good way to learn that the job is hard. Calls will sometimes be wrong, but a fair official acts with honesty, not favoring friends.

**Sportsmanship** is how we behave toward teammates, opponents and officials. In **winning**, be gracious: do not taunt, and recognize the effort of the other team. In **losing**, congratulate the winners, avoid blaming others and ask what you can learn. In **disagreements**, speak calmly, ask politely (often through a captain), and accept the final decision. Shaking hands after a game shows respect for everyone who took part. These habits matter beyond sport: employers, teammates and friends value people who can win and lose with grace and who treat others fairly under pressure.
`,
  ],
  cards: [
    ["Game analysis", "Studying measurable parts of a performance."],
    ["Shooting percentage", "Shots made divided by shots attempted."],
    ["Turnover", "Losing the ball to the other team without a shot."],
    ["Assist", "A pass that leads directly to a score."],
    ["Official", "A referee or umpire who applies the rules."],
    ["Scorekeeper", "A person who records points, fouls and time."],
    ["Consistency", "Applying rules the same way every time."],
    ["Gracious", "Showing respect and good manners."],
  ],
  closed: [
    [
      "A team makes 12 of 30 shots. What is the shooting percentage?",
      ["12 percent", "30 percent", "40 percent", "60 percent"],
      "C",
    ],
    [
      "What should a referee do when two teams disagree?",
      ["Favor the team they know", "Apply the rules fairly and calmly", "Leave the game", "Flip a coin"],
      "B",
    ],
    [
      "What is a turnover?",
      ["Losing the ball to the other team without a shot", "A made basket", "A rebound", "A timeout"],
      "A",
    ],
    [
      "Which shows good sportsmanship after a loss?",
      ["Congratulating the winners", "Blaming the referee", "Leaving without a word", "Complaining loudly"],
      "A",
    ],
    [
      "Why should a scorekeeper check with captains at breaks?",
      ["To avoid disputes about the score", "To slow the game", "To change the rules", "To rest"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A team's stat line is 12 made shots out of 30 attempted, 14 turnovers, 9 assists and 11 rebounds. Calculate the shooting percentage, compare it with a 50 percent target, identify one strength and one weakness from the numbers, and design a practice activity to improve the weakness.",
      scheme: [
        "Calculates the shooting percentage as 40 percent and notes it is below 50 percent",
        "Identifies the turnovers as a weakness with a reason",
        "Identifies a strength such as rebounds or assists with a reason",
        "Designs a specific practice activity linked to the weakness",
      ],
      model:
        "12 divided by 30 is 40 percent, which is 10 points below the 50 percent target. A weakness is the 14 turnovers, which gave the other team the ball many times and cost shots. A strength is the 11 rebounds, which show good effort on the boards, and 9 assists show some teamwork. A practice to fix turnovers is a 3-on-2 passing drill under pressure where each give-away costs the offense a point.",
      answers: [
        [
          "full",
          "[[0|12 ÷ 30 = 40 percent, which is below the 50 percent target.]] [[1|The weakness is the 14 turnovers, which gave away many possible shots.]] [[2|A strength is the 11 rebounds, showing good effort, and 9 assists show some teamwork.]] [[3|To fix turnovers we could run a 3-on-2 passing drill where every give-away costs the offense a point.]]",
          "Full marks. The practice matches the problem you found.",
        ],
        [
          "full",
          "[[0|The percentage is 40, so 10 points under the goal.]] [[1|Turnovers at 14 are the biggest problem because each one is a lost chance to score.]] [[2|Their assists and rebounds show that they pass and fight for the ball.]] [[3|A practice could be a passing circuit with a defender in the middle, counting how many passes in a row without a mistake.]]",
          "Full marks. Counting mistake-free passes gives a clear measure.",
        ],
        [
          "partial",
          "[[0|The shooting percentage is 40 percent.]] [[2|The rebounds are a strength.]] The weakness is nothing, and no practice is needed.",
          "Fourteen turnovers is a clear weakness. Design a practice to address it.",
        ],
        [
          "partial",
          "[[1|Turnovers are the weakness.]] [[3|A passing drill would help.]] The percentage is 30 ÷ 12, which is 250 percent.",
          "Shooting percentage is made shots divided by attempted: 12 divided by 30.",
          true,
        ],
        [
          "weak",
          "The team lost because the players are bad. There is nothing to analyze.",
          "Analysis looks at measurable parts of the game and avoids blaming individuals.",
        ],
        [
          "weak",
          "[[2|Rebounds are a strength.]] The best fix is to shout at the players until they stop making mistakes.",
          "A good practice drill addresses the problem and builds skill.",
        ],
      ],
    },
    {
      prompt:
        "During a class game you are the referee. A player on your friend's team pushes an opponent, and your friend shouts, \"That was nothing!\" Explain what you should do, how you can stay fair, how the players should show sportsmanship, and what a scorekeeper contributes in this situation.",
      scheme: [
        "States that the referee applies the rule fairly and calls the foul regardless of friendship",
        "Describes staying calm and signaling clearly",
        "Describes players' sportsmanship, such as accepting the call or asking politely through the captain",
        "Describes the scorekeeper's role, recording the foul and score accurately",
      ],
      model:
        "I should call the foul because the rules apply to everyone, including my friend's team. I stay calm, make a clear signal and explain briefly if asked. The players should accept the call, and if they disagree they should ask politely through the captain. The scorekeeper records the foul and any free throws accurately and shares the totals with the captains at the break.",
      answers: [
        [
          "full",
          "[[0|I should call the foul, because the rules apply to everyone, even my friend's team.]] [[1|I'd stay calm, make a clear signal and give a short explanation if asked.]] [[2|The players should accept the call, or ask politely through the captain if they disagree.]] [[3|The scorekeeper records the foul and any free throws accurately and shares the totals with the captains at the break.]]",
          "Full marks. Fairness and calm are the core of officiating.",
        ],
        [
          "full",
          "[[0|A foul is a foul no matter whose friend it is, so I'd blow the whistle and call it.]] [[1|I'd signal clearly and not argue back, keeping my voice level.]] [[2|My friend should accept the decision, and if he has a question, ask the captain to talk to me at a break.]] [[3|The scorekeeper notes the foul, awards the points and checks the numbers with both captains.]]",
          "Full marks. Letting the captain raise questions keeps the game moving.",
        ],
        [
          "partial",
          "[[1|I'd stay calm and signal clearly.]] [[2|Players should accept the call.]] I would ignore the push because my friend is on that team. The scorekeeper has no job.",
          "A fair official calls fouls for every team. The scorekeeper records fouls and points.",
        ],
        [
          "partial",
          "[[0|I should call the foul.]] [[3|The scorekeeper records it.]] I would argue with my friend until they agree.",
          "Arguing slows the game. Signal the call and let the captain ask questions.",
          true,
        ],
        [
          "weak",
          "I would let my friend's team win because friends help each other.",
          "An official must be fair to both teams.",
        ],
        [
          "weak",
          "The referee does not matter. Players can decide what a foul is.",
          "A referee applies rules consistently so the game is fair.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "First aid for sports injuries, and how culture shapes games",
  note: `
## Objectives

Students will be able to:

1. practice basic first aid and describe how to respond to a sports injury;
2. describe how culture and community shape the games people play.

## Materials

A school first-aid kit (demonstration), ice packs, elastic wraps, scenario cards, a world map, examples of games from different cultures, the worksheet.

## Starter (6 minutes)

Ask: "A teammate rolls an ankle at practice. What are the first three things you do?" Collect ideas and note which are safe and which are not.

## Main activity

1. Safety first: stop play, check the scene, stay calm, get an adult or the nurse. Call 911 for: unconsciousness, difficulty breathing, severe bleeding, a suspected neck, back or head injury, seizures, or a bone sticking out. Do not move a person with a suspected head, neck or back injury.
2. Sprains and strains: RICE: Rest, Ice (15 to 20 minutes, with a cloth between ice and skin), Compression (an elastic wrap, snug but not tight), Elevation (above heart level).
3. Nosebleeds: sit up, lean slightly forward, pinch the soft part of the nose for 10 minutes. Cuts: wash hands, clean, apply pressure with clean cloth, bandage. Heat illness: move to shade, give water, cool the body, call for help if confused.
4. Concussion: signs (headache, dizziness, confusion, nausea, memory trouble); rule: "When in doubt, sit them out." Never return to play the same day; follow a doctor's plan.
5. Culture and community: games reflect environment, history and values. Lacrosse comes from Indigenous peoples of North America, including the Haudenosaunee, where it had spiritual and community meaning; basketball was invented in 1891 by James Naismith in Springfield, Massachusetts as an indoor winter game; cricket is popular across the Commonwealth; ice hockey grew in cold climates; soccer is played worldwide. Community: access to parks, cost, climate and traditions shape what people play.

## Worksheet

First-aid scenarios and a game from your community.
`,
  reading: [
    "When someone is hurt, and where games come from",
    `
Injuries happen in sports, and what you do in the first minutes matters. The first rule is **safety**: stop play, make sure the area is safe, stay calm and get help from an adult, coach or the school nurse. Some situations are emergencies. **Call 911** if a person is unconscious, has trouble breathing, is bleeding heavily, has a seizure, has a bone sticking through the skin, or may have a **head, neck or back injury**. Do not move someone with a suspected neck or back injury, since moving them can cause more harm.

A common injury is a **sprain** (a stretched or torn ligament, such as in a rolled ankle) or a **strain** (a stretched or torn muscle). The standard first aid is **RICE**. **Rest**: stop using the injured part. **Ice**: apply an ice pack for 15 to 20 minutes, with a cloth between the ice and the skin to prevent damage. **Compression**: wrap the area with an elastic bandage that is snug, but not so tight that fingers or toes tingle or turn pale. **Elevation**: raise the injury above the level of the heart to reduce swelling. If the person cannot put weight on the limb or the pain is severe, get medical care. For a **nosebleed**, have the person sit up, lean slightly forward and pinch the soft part of the nose for 10 minutes. For a **cut**, wash your hands, press a clean cloth on the wound to stop the bleeding, clean it, and cover it with a bandage. For **heat illness**, move the person to shade, give water if they are alert, cool them with wet cloths, and call for help if they are confused or faint.

A **concussion** is a brain injury caused by a blow to the head or body. Signs include headache, dizziness, confusion, nausea, sensitivity to light and trouble remembering. The rule is **"When in doubt, sit them out."** A player with a suspected concussion must stop playing at once, be checked by a medical professional, and not return to play the same day. Returning too early can cause serious harm.

The games people play are also shaped by **culture and community**. Lacrosse comes from Indigenous peoples of North America, including the Haudenosaunee, for whom the game had spiritual and community meaning long before it was a school sport. Basketball was invented in 1891 by James Naismith in Springfield, Massachusetts, as an indoor game for the cold winter months. Ice hockey grew where there is natural ice, cricket spread across countries once part of the British Empire, and soccer is played in nearly every country. Closer to home, what you play depends on your community's climate, parks, cost, traditions and what your family played. Learning about the origins of a game gives it more meaning, and shows how sport connects people.
`,
  ],
  cards: [
    ["Sprain", "A stretched or torn ligament."],
    ["Strain", "A stretched or torn muscle."],
    ["RICE", "Rest, ice, compression and elevation."],
    ["Concussion", "A brain injury caused by a blow to the head or body."],
    ["Compression", "A snug wrap that helps control swelling."],
    ["Heat illness", "Illness from overheating during activity."],
    ["Lacrosse", "A game that began with Indigenous peoples of North America."],
    ["Community", "A group of people in a shared place with shared resources."],
  ],
  closed: [
    [
      "What does the C in RICE stand for?",
      ["Cool", "Compression", "Carry", "Cover"],
      "B",
    ],
    [
      "How long should an ice pack be used at one time?",
      ["1 to 2 minutes", "15 to 20 minutes", "2 hours", "All night"],
      "B",
    ],
    [
      "A player may have a concussion. What should happen?",
      ["Return to play right away", "Stop playing and be checked by a medical professional", "Run laps", "Ignore it"],
      "B",
    ],
    [
      "When should you call 911?",
      ["For a suspected neck injury", "For a small scrape", "For a missed free throw", "For a tied score"],
      "A",
    ],
    [
      "Who invented basketball as an indoor winter game in 1891?",
      ["James Naismith", "Pierre de Coubertin", "Babe Ruth", "Walt Disney"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "During practice a teammate lands awkwardly and rolls an ankle. It is swollen and painful, but the teammate is alert and breathing normally. Describe the steps you would take, including RICE, how to use ice safely, and two signs that would mean you should get medical help right away.",
      scheme: [
        "Describes stopping play, keeping the person calm and getting an adult or nurse",
        "Describes RICE with rest, ice, compression and elevation",
        "Describes safe use of ice for 15 to 20 minutes with a cloth, and a wrap that is snug, not tight",
        "Names two signs for medical help, such as being unable to bear weight, severe pain, deformity or numbness",
      ],
      model:
        "I would stop play, keep my teammate calm and get the coach or nurse. Then use RICE: rest the ankle, ice it, apply a snug elastic wrap and raise it above the heart. Ice goes on for 15 to 20 minutes with a cloth between the ice and the skin, and the wrap must not be so tight that the toes tingle. Medical help is needed if my teammate cannot put weight on the foot, or if the ankle looks out of shape, or there is severe pain or numbness.",
      answers: [
        [
          "full",
          "[[0|I'd stop play, keep my teammate calm and get the coach or the nurse.]] [[1|Then RICE: rest the ankle, ice it, wrap it with an elastic bandage and raise it above the heart.]] [[2|Ice goes on for 15 to 20 minutes with a cloth between it and the skin, and the wrap should be snug, not tight.]] [[3|If they can't put weight on it, or it looks out of shape or goes numb, they need medical care.]]",
          "Full marks. The steps and the safety details are accurate.",
        ],
        [
          "full",
          "[[0|First I'd stop the practice, stay calm and call an adult to help.]] [[1|Rest, Ice, Compression, Elevation, in that order.]] [[2|A cloth goes under the ice pack and I'd leave it for 15 or 20 minutes; the wrap is snug but the toes shouldn't tingle or turn pale.]] [[3|Severe pain, deformity or not being able to stand on it means going to a doctor.]]",
          "Full marks. Checking the toes is a careful detail.",
        ],
        [
          "partial",
          "[[0|I'd get the nurse.]] [[1|Rest and ice the ankle.]] I would put the ice directly on the skin for an hour and tell them to walk it off.",
          "Ice should be used with a cloth for 15 to 20 minutes. Walking on a painful ankle can worsen the injury.",
        ],
        [
          "partial",
          "[[2|Ice for 15 to 20 minutes.]] [[3|Get a doctor if it looks out of shape.]] RICE stands for run, ice, cool, exercise.",
          "RICE stands for rest, ice, compression and elevation.",
          true,
        ],
        [
          "weak",
          "Pull on the ankle to put it back in place, and tell the player to keep playing.",
          "Never pull on an injury. Stop play and get help.",
        ],
        [
          "weak",
          "Do nothing. Ankle injuries heal by themselves and need no care.",
          "First aid can reduce swelling and prevent worse injury.",
        ],
      ],
    },
    {
      prompt:
        "Choose a game or sport that is popular in your community or family background (for example lacrosse, basketball, soccer, cricket or another). Describe where it came from or why it is popular, how your community's climate, resources or traditions have shaped it, and one way the game connects people.",
      scheme: [
        "Names a game and gives accurate information on its origin or popularity",
        "Explains how climate, space, cost or tradition shape how it is played locally",
        "Explains one way the game connects people or builds community",
        "Includes a personal or local example",
      ],
      model:
        "Basketball was invented in 1891 by James Naismith in Springfield, Massachusetts, as an indoor game for the cold winter. In my town, it is popular because it needs only a hoop and a ball, so it can be played in driveways and in the gym during Ohio's long winters. It connects people because our community fills the high school gym for games. My cousins and I play at the park nearly every weekend.",
      answers: [
        [
          "full",
          "[[0|Basketball was invented in 1891 by James Naismith in Springfield, Massachusetts, as an indoor winter game.]] [[1|It's popular in my town because it needs only a hoop and a ball, and our long Ohio winters make an indoor game useful.]] [[2|It connects people because the whole community fills the high school gym on game nights.]] [[3|My cousins and I play at the park nearly every weekend.]]",
          "Full marks. The origin links to the local climate.",
        ],
        [
          "full",
          "[[0|Soccer is played worldwide and is my family's favorite; my grandparents played it growing up in Brazil.]] [[1|It needs little equipment, so families anywhere can play it with a ball and an open space.]] [[2|It connects people across languages because the rules are the same everywhere, and strangers can join a pickup game.]] [[3|In my neighborhood we play at the field on Sunday afternoons with neighbors of all ages.]]",
          "Full marks. The family connection makes the answer personal.",
        ],
        [
          "partial",
          "[[0|Basketball is popular.]] [[3|I play with my cousins.]] It has nothing to do with where I live or my community.",
          "Think about how climate, space, cost and tradition shape the game where you live.",
        ],
        [
          "partial",
          "[[1|It needs only a ball so it's cheap.]] [[2|It brings people together.]] Basketball was invented by Babe Ruth in 1850.",
          "Basketball was invented by James Naismith in 1891. Check the facts.",
          true,
        ],
        [
          "weak",
          "Games have no history. They are the same everywhere and for everyone.",
          "Games grow out of the environment, history and values of communities.",
        ],
        [
          "weak",
          "I do not play any games and I do not know any, so I cannot answer.",
          "Choose a game you have seen or learned about and research its origins.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Challenge, connection and eating well",
  note: `
## Objectives

Students will be able to:

1. choose an activity that challenges you and describe its value for social connection;
2. explain the components of a balanced diet and read a nutrition label.

## Materials

Activity menu, a goal sheet, empty food packages or label photographs (invented), MyPlate-style plate diagrams, calculators, the worksheet and quiz.

## Starter (6 minutes)

Ask: "Think of something you were nervous to try and are glad you did. What did you learn?" Discuss the value of healthy challenge and the friends who help.

## Main activity

1. Challenge: choosing an activity just outside your comfort zone (a new sport, a longer distance, a class, a club) builds confidence; set a small first step. Social value: friendships, teamwork, belonging, mentors, volunteering as a coach; people who exercise with others tend to stick with it.
2. Balanced diet: fruits, vegetables, grains (at least half whole grains), protein foods, dairy or alternatives, and water; limit added sugar, saturated fat and sodium. Energy nutrients: carbohydrates 4 kcal per gram, protein 4, fat 9. Example bar: 10 g fat (90 kcal) + 25 g carbohydrate (100 kcal) + 5 g protein (20 kcal) = 210 kcal.
3. Nutrition label: serving size and servings per container; calories per serving; % Daily Value (5 percent or less is low, 20 percent or more is high); limit added sugars and sodium. Example: 1 cup serving, 3 servings per container, 120 calories per serving: eating the whole container is 360 calories.

## Quiz

Balanced diet and label reading.
`,
  reading: [
    "Trying something hard with others, and reading what is in your food",
    `
It is easy to stay with activities that we already do well. Yet some of the most valuable experiences come from a **healthy challenge**: an activity just outside your comfort zone, such as trying a new sport, running a longer distance, joining a club, or helping to coach younger students. Challenge builds **confidence**, because you learn that you can do hard things step by step. The trick is to choose a small first step, such as attending one practice, and to expect to be a beginner. The value is not only physical. Activity done with others gives **social connection**: friendships, teamwork, a sense of belonging, mentors and a purpose beyond yourself. People who exercise with a friend or a group tend to stick with it longer, because others expect them to show up.

What you eat powers all of this. A **balanced diet** includes foods from several groups: **fruits** and **vegetables**, **grains** (with at least half as whole grains), **protein foods** such as beans, fish, eggs, poultry and nuts, and **dairy** or fortified alternatives. Water is the best drink. Limit foods high in **added sugar**, **saturated fat** and **sodium** (salt). The three energy nutrients give different amounts of energy, measured in **calories** (kilocalories): carbohydrate and protein give 4 calories per gram, fat gives 9. A bar with 10 g of fat, 25 g of carbohydrate and 5 g of protein has 10 x 9 = 90, 25 x 4 = 100 and 5 x 4 = 20, a total of 210 calories.

The **nutrition facts label** helps you compare foods. Start at the top with the **serving size** and the **servings per container**, because all numbers on the label are for one serving. If a cereal has 120 calories per 1-cup serving and the container has 3 servings, eating the whole container gives you 3 x 120 = 360 calories. Next, check the **calories** and the **% Daily Value (%DV)**, which shows how much a serving adds to a day's needs for each nutrient. As a rule, **5 percent or less** is low and **20 percent or more** is high. Look for foods that are low in **added sugars**, **sodium** and **saturated fat**, and high in **fiber**, **calcium**, **iron** and **potassium**. Reading labels turns marketing claims into facts, and helps you to fuel your activity wisely.
`,
  ],
  cards: [
    ["Comfort zone", "Activities and situations that feel familiar and safe."],
    ["Social connection", "Friendship and belonging with other people."],
    ["Balanced diet", "Eating a variety of foods from all the main groups."],
    ["Calorie", "A unit of food energy."],
    ["Serving size", "The amount that the label's numbers describe."],
    ["% Daily Value", "How much a serving adds to a day's needs for a nutrient."],
    ["Added sugar", "Sugar put into a food during processing."],
    ["Sodium", "A part of salt; too much raises health risks."],
  ],
  closed: [
    [
      "How many calories are in one gram of fat?",
      ["4", "7", "9", "12"],
      "C",
    ],
    [
      "A cereal has 120 calories per serving and 3 servings per container. How many calories are in the whole container?",
      ["120", "240", "360", "480"],
      "C",
    ],
    [
      "On a label, a %DV of 20 percent or more is considered:",
      ["Low", "High", "Zero", "Unsafe to read"],
      "B",
    ],
    [
      "Which is a benefit of exercising with others?",
      ["You tend to stick with it longer", "You never get tired", "It is always cheaper", "You skip warm-ups"],
      "A",
    ],
    [
      "Which drink is best for hydration?",
      ["Soda", "Water", "Energy drink", "Sweet tea"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A snack bar label shows: 10 g fat, 25 g carbohydrate and 5 g protein per bar, 2 bars per package, and sodium 15 percent DV. Calculate the calories in one bar from the nutrients (fat 9, carbohydrate 4, protein 4 per gram), then in the whole package. Explain what the %DV tells you and one other thing you would check before choosing it.",
      scheme: [
        "Calculates one bar as 90 + 100 + 20 = 210 calories",
        "Calculates the package as 420 calories",
        "Explains that 15 percent DV of sodium is between low and high, a moderate amount of a day's limit in one serving",
        "Names another check, such as added sugars, fiber or serving size",
      ],
      model:
        "Fat gives 10 times 9, which is 90, carbohydrate 25 times 4, which is 100, and protein 5 times 4, which is 20, so one bar is 210 calories. The package has 2 bars, which is 420 calories. A sodium %DV of 15 percent means that a bar provides 15 percent of the day's limit, a moderate amount, not low or high. I would also check the added sugars and fiber.",
      answers: [
        [
          "full",
          "[[0|One bar: 10 × 9 = 90, 25 × 4 = 100, 5 × 4 = 20, which adds to 210 calories.]] [[1|The package has 2 bars, so 420 calories.]] [[2|A 15 percent DV for sodium means one bar gives 15 percent of the day's limit, which is moderate: not low, not high.]] [[3|I'd also check the added sugars and the fiber.]]",
          "Full marks. All calculations are correct.",
        ],
        [
          "full",
          "[[0|Fat 90 + carbs 100 + protein 20 = 210 calories a bar.]] [[1|Two bars means eating the whole package is 420 calories.]] [[2|15 percent DV is between the 5 percent low mark and the 20 percent high mark, so it's a moderate amount of sodium.]] [[3|Before choosing it, I'd look at the added sugar and compare it with another bar.]]",
          "Full marks. Comparing with another bar is a smart habit.",
        ],
        [
          "partial",
          "[[0|One bar is 210 calories.]] [[3|Check added sugar.]] The package is 210 calories because the label shows one bar. The %DV is the weight.",
          "A package has 2 servings, so double it. %DV shows the share of a day's needs.",
        ],
        [
          "partial",
          "[[1|The package is 420 calories.]] [[2|15 percent is moderate.]] One bar is 10 + 25 + 5, which is 40 calories.",
          "Multiply grams by the calories per gram: fat 9, carbohydrate 4, protein 4.",
          true,
        ],
        [
          "weak",
          "Nutrition labels are not useful. I would pick the bar with the best picture.",
          "A label gives facts about calories and nutrients. Use it to compare foods.",
        ],
        [
          "weak",
          "Fat has 4 calories per gram, so a bar has about 40 calories.",
          "Fat has 9 calories per gram, and carbohydrate and protein have 4.",
        ],
      ],
    },
    {
      prompt:
        "Describe an activity that would challenge you this semester (a new sport, a longer distance, a club, or coaching younger students). Explain your first small step, the social value you expect, one worry you may have and how you would handle it, and two food habits that would help you fuel the activity.",
      scheme: [
        "Describes a specific challenging activity",
        "Gives a first small step and expected social value",
        "Names a worry and a way to handle it",
        "Gives two helpful food habits for fueling activity",
      ],
      model:
        "I want to try the school's cross-country club, running three miles instead of one. My first step is going to one practice with a friend, and I expect to make new friends and have teammates who push me. I am worried about being the slowest, so I will remind myself that everybody starts as a beginner and run my own pace. To fuel it, I will drink water through the day and eat a balanced breakfast with whole grains and protein.",
      answers: [
        [
          "full",
          "[[0|I want to try the school's cross-country club and run three miles instead of one.]] [[1|My first step is going to one practice with a friend, and I expect to make new friends who push me.]] [[2|I'm worried about being the slowest, so I'll run at my own pace and remember that everyone begins as a beginner.]] [[3|I'll drink water through the day and eat a balanced breakfast with whole grains and protein.]]",
          "Full marks. A challenge, a plan and fuel for it.",
        ],
        [
          "full",
          "[[0|My challenge is coaching a team of third graders in basketball.]] [[1|I'll start by helping at one practice, and I expect to make friends with the other coaches and the kids.]] [[2|I'm nervous about speaking in front of a group, so I'll plan a drill beforehand and ask the head coach for tips.]] [[3|I'll eat a snack with carbohydrates before practice, like a banana, and a snack with protein afterward.]]",
          "Full marks. Planning the drill is a good way to handle nerves.",
        ],
        [
          "partial",
          "[[0|I'd try rock climbing.]] [[3|I'd eat well.]] I don't have any worries and the first step is to do the whole thing at once.",
          "Name a small first step and be specific about the food habits.",
        ],
        [
          "partial",
          "[[1|I'd go to one practice with a friend.]] [[2|I worry I'll be slowest, so I'd go at my own pace.]] No food habits matter.",
          "Food fuels activity. Give two habits such as water and a balanced breakfast.",
          true,
        ],
        [
          "weak",
          "I do not want any challenges. I will stay with what I already know.",
          "A healthy challenge builds confidence. Choose one small step outside your comfort zone.",
        ],
        [
          "weak",
          "[[3|I'll drink water.]] Activities with other people have no social value.",
          "Group activity builds friendship and keeps people motivated.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Judging fitness and food claims, and managing stress",
  note: `
## Objectives

Students will be able to:

1. evaluate fitness and nutrition claims in advertising;
2. describe strategies for managing stress through activity and relaxation.

## Materials

Sample ads (invented) for a supplement, a diet plan and a fitness gadget, a claims checklist, relaxation scripts, the worksheet, quiz and problem set.

## Starter (6 minutes)

Read an invented ad: "Lose 10 pounds in 7 days with no exercise! Doctors hate this one trick." Ask: "What would you want to know before believing this?"

## Main activity

1. Evaluating claims: ask who is selling, what evidence there is (peer-reviewed studies, not just testimonials), whether the claim is realistic (a steady loss of 1 to 2 pounds a week is typical for a safe plan), whether fine print contradicts the headline, and whether it uses fear or "secret" language. Dietary supplements are not approved by the FDA for effectiveness before they are sold. Warning signs: quick fixes, "miracle," before-and-after photos, celebrity endorsements, pressure to buy now.
2. Stress: the body's reaction to demands (fast heartbeat, tense muscles, worry). Short-term stress can help performance; long-term stress harms sleep, mood and health. Management through activity: exercise releases chemicals that improve mood and reduce tension; a 20-minute walk can help.
3. Relaxation techniques: box breathing (breathe in 4 counts, hold 4, out 4, hold 4); progressive muscle relaxation (tense and release each muscle group); stretching or yoga; a short mindful pause. Also: planning time, sleep, social support, limiting screens, asking for help.

## Problem set

Rate claims and build a stress plan.
`,
  reading: [
    "Don't believe the hype, and keeping calm",
    `
Messages about fitness and food are everywhere: "Lose 10 pounds in 7 days!" "Melt belly fat with this one pill!" "Get abs in two weeks with 5 minutes a day." Many are designed to sell, not to inform. Learning to **evaluate claims** protects your health and your money.

Ask several questions. **Who is selling this, and what do they gain?** An ad for a supplement is paid for by a company that makes it. **What is the evidence?** Look for results from well-designed studies published by independent scientists, not just **testimonials** and before-and-after photos, which can be edited or cherry-picked. **Is the claim realistic?** Safe, steady weight loss is usually about 1 to 2 pounds a week, so "10 pounds in 7 days" is a red flag. **What does the fine print say?** A headline may promise results, while small print says "results not typical" or "with diet and exercise." **Is it a quick fix or a miracle?** Words such as "secret," "miracle" or "doctors hate this" are warning signs, as is pressure to "buy now." It also helps to know that **dietary supplements** are not approved by the Food and Drug Administration for effectiveness before they are sold, so it is the buyer's job to be careful. Talk to a doctor, nurse or dietitian before using one. A famous person's endorsement is not evidence either; they are paid to say it.

Another part of health is handling **stress**, the body's reaction to demands: a pounding heart, tense muscles, a racing mind. A little stress can help you focus before a test or game. Long-lasting stress, however, can disrupt sleep, harm mood, cause headaches and stomach problems, and lower your immune defenses. Many strategies help. **Physical activity** is one of the best: exercise releases chemicals in the brain that improve mood, burns off tension and improves sleep, and even a 20-minute walk can help. **Relaxation techniques** calm the body directly. In **box breathing**, breathe in for 4 counts, hold for 4, breathe out for 4 and hold for 4, then repeat several times. In **progressive muscle relaxation**, tense a muscle group for five seconds and then release it, moving from the feet up to the face. Stretching, gentle yoga or a short mindful pause also help. Other habits matter: get enough **sleep**, **plan** your time so that tasks do not pile up, spend time with supportive friends, limit screen time before bed, and **ask for help** from a parent, teacher, counselor or doctor when stress feels too big. Managing stress is a skill, and you can practice it just like a jump shot.
`,
  ],
  cards: [
    ["Testimonial", "A personal story used as persuasion, not as scientific evidence."],
    ["Dietary supplement", "A product taken in addition to food; not approved for effectiveness before sale."],
    ["Red flag", "A warning sign of a misleading claim."],
    ["Fine print", "Small text that may qualify a headline claim."],
    ["Stress", "The body's reaction to demands or pressure."],
    ["Box breathing", "Breathing in, holding, out and holding, each for 4 counts."],
    ["Progressive muscle relaxation", "Tensing and releasing muscle groups in turn."],
    ["Support network", "People who can help when you are stressed."],
  ],
  closed: [
    [
      "Which claim is the biggest red flag?",
      ["Lose 10 pounds in 7 days with no effort", "Eat more vegetables", "Sleep 8 to 10 hours", "Walk 30 minutes a day"],
      "A",
    ],
    [
      "A typical safe rate of weight loss is about:",
      ["1 to 2 pounds a week", "10 pounds a week", "20 pounds a week", "None ever"],
      "A",
    ],
    [
      "In box breathing, each step lasts:",
      ["4 counts", "30 seconds", "10 minutes", "1 count"],
      "A",
    ],
    [
      "Why is a testimonial weak evidence?",
      ["It is one person's story and can be selected or edited", "It is always true", "It is a scientific study", "It is required by law"],
      "A",
    ],
    [
      "Which helps manage long-term stress?",
      ["Regular exercise and enough sleep", "Skipping meals", "Staying up late", "Avoiding friends"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Read this invented ad: \"Doctors hate this secret! Our SlimBurn pill melts 10 pounds in 7 days, no diet or exercise needed. Thousands of happy customers! Order in the next hour and get a free bottle.\" The small print says \"Results not typical. Not evaluated by the FDA.\" Evaluate the claim by naming at least four red flags and explain what a smart consumer would do instead.",
      scheme: [
        "Names the unrealistic result (10 pounds in 7 days) as a red flag",
        "Names the secret or miracle language and the pressure to buy within an hour",
        "Names reliance on testimonials and the small print contradicting the headline",
        "Explains the smart steps: check evidence, talk to a doctor or dietitian, focus on balanced eating and activity",
      ],
      model:
        "Red flags: 10 pounds in a week is far faster than the safe 1 to 2 pounds; the \"doctors hate this secret\" language; pressure to order within an hour; the claim of happy customers (testimonials) is not evidence; and the small print says results are not typical and that the FDA has not evaluated it, which contradicts the headline. A smart consumer would look for independent evidence, talk to a doctor or dietitian, and focus on balanced eating, activity and sleep.",
      answers: [
        [
          "full",
          "[[0|Losing 10 pounds in a week is much faster than the safe 1 to 2 pounds a week.]] [[1|The 'doctors hate this secret' wording and the order-within-an-hour pressure are classic warning signs.]] [[2|It relies on happy customers, which are testimonials, and the small print says results are not typical, which contradicts the headline.]] [[3|A smart consumer would look for independent evidence, talk to a doctor or dietitian, and focus on balanced eating and activity.]]",
          "Full marks. Each red flag is named and a safer alternative is offered.",
        ],
        [
          "full",
          "[[0|The result isn't realistic: no one safely loses 10 pounds in seven days with no effort.]] [[1|It uses secret and miracle language, plus a pushy deadline to make me buy fast.]] [[2|Testimonials aren't scientific evidence, and the fine print admits results are not typical and not evaluated by the FDA.]] [[3|Instead I'd ask a doctor, look for independent studies, and work on sleep, healthy food and exercise.]]",
          "Full marks. Pointing out the small print exposes the contradiction.",
        ],
        [
          "partial",
          "[[0|The 10 pounds in 7 days is too fast.]] [[3|I'd talk to a doctor.]] Thousands of customers means it works, and the deadline is a good reason to buy.",
          "Testimonials and urgent deadlines are warning signs, not proof.",
        ],
        [
          "partial",
          "[[1|The 'doctors hate this' language is a red flag.]] [[2|The fine print contradicts it.]] I'd buy it now to test if it works.",
          "Buying first is the pressure the ad wants. Check evidence and ask a professional.",
          true,
        ],
        [
          "weak",
          "The ad is true because it says doctors hate it, which means it works.",
          "That line is a marketing trick, not evidence.",
        ],
        [
          "weak",
          "All ads are lies, so nobody should trust any health information.",
          "Good information exists. Check the source and the evidence.",
        ],
      ],
    },
    {
      prompt:
        "Create a personal stress plan for a busy exam week. Include one activity strategy, two relaxation techniques (describing how to do each), two lifestyle habits and one person or resource you could ask for help. Explain how stress can both help and harm.",
      scheme: [
        "Describes an activity strategy such as a daily walk",
        "Describes two relaxation techniques with steps (for example, box breathing and progressive muscle relaxation)",
        "Names two lifestyle habits such as sleep and planning time",
        "Names a helper and explains how stress can both help and harm",
      ],
      model:
        "Activity: a 20-minute walk after school each day. Relaxation: box breathing, where I breathe in for 4, hold for 4, out for 4 and hold for 4; and progressive muscle relaxation, tensing each muscle group for five seconds and then releasing it. Habits: 8 to 10 hours of sleep and a study schedule with breaks. I can ask my school counselor for help. A little stress helps me focus on an exam, but long-lasting stress harms sleep and mood.",
      answers: [
        [
          "full",
          "[[0|Activity: a 20-minute walk after school every day.]] [[1|Relaxation: box breathing (in 4, hold 4, out 4, hold 4) and progressive muscle relaxation, tensing each muscle group for five seconds and then releasing it.]] [[2|Habits: 8 to 10 hours of sleep and a study schedule with breaks.]] [[3|My school counselor can help; a little stress helps me focus, but long-lasting stress harms sleep and mood.]]",
          "Full marks. Each technique is described in a way that someone could follow.",
        ],
        [
          "full",
          "[[0|I'll go for a run or a bike ride on three afternoons, which burns off tension.]] [[1|When I feel panicky I'll do box breathing, and before bed I'll stretch and release my muscles from my feet up.]] [[2|I'll plan my study time so it doesn't pile up, and turn off screens an hour before bed.]] [[3|I can talk to my coach or a parent; some stress sharpens my focus, but too much for too long makes me ill.]]",
          "Full marks. Matching each technique to a time of day makes it practical.",
        ],
        [
          "partial",
          "[[0|I'll run.]] [[3|I can ask my counselor.]] To relax I'll just think about relaxing, and I'll stay up late to study.",
          "Describe how to do two techniques, and protect your sleep.",
        ],
        [
          "partial",
          "[[1|Box breathing: in 4, hold 4, out 4, hold 4.]] [[2|Sleep and planning.]] Stress is always harmful and never helps.",
          "A little stress can help you focus, but long-lasting stress harms.",
          true,
        ],
        [
          "weak",
          "I do not get stressed, so I do not need a plan.",
          "Everyone feels stress sometimes. A plan prepares you for busy weeks.",
        ],
        [
          "weak",
          "[[3|I'll talk to a counselor.]] I'll ignore the stress until exams are over, and not sleep much.",
          "Ignoring stress and skipping sleep make it worse. Use healthy strategies.",
        ],
      ],
    },
  ],
};

writeCourse(
  "physical-education-10-grade-10.json",
  "Physical Education 10",
  "Grade 10",
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
