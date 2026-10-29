import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Physical Education 12, Grade 12, Quarter 1. Standards: SHAPE America
 * National Standards for K-12 Physical Education, with two Health Education
 * weeks, in the school's own words. The senior course is about the first year
 * after graduation: a plan without a gym, training with data, teaching a skill,
 * running a tournament, leading peers, a wellness plan, first aid and CPR, and
 * managing health care and food on a budget. No practical write-ups.
 */

const w1: WeekInput = {
  topic: "An adult fitness goal, a plan without a gym, and judging products",
  note: `
## Objectives

Students will be able to:

1. assess your personal fitness and set an adult-level fitness goal for the year;
2. create a fitness plan you can follow after graduation without a gym;
3. evaluate a fitness program or product for safety and effectiveness.

## Materials

Individual fitness records, a bodyweight exercise menu, resistance bands (if available), example ads for a product (invented), calculators, the worksheet and quiz.

## Starter (6 minutes)

Ask: "You move into an apartment with no gym nearby and a small budget. What do you do for fitness?" List: walk, run, bodyweight, stairs, cycling, videos, a club.

## Main activity

1. Adult-level goals focus on lasting health and capacity: the adult guideline is 150 minutes of moderate activity a week plus muscle strengthening on 2 days. Combine it with a performance target that matters to you (a 10K, 25 push-ups, hiking a mountain trail). A yearly goal needs milestones every month or two.
2. A plan without a gym: bodyweight exercises (push-ups, squats, lunges, planks, glute bridges, pull-ups on a bar or door-frame bar), resistance bands, stairs and hills, running, walking, cycling, free online videos from reputable sources, community fields and trails, a pair of adjustable dumbbells if a budget allows. A sample week: three walking or running days (30 minutes), two bodyweight strength days (20 minutes), one longer outdoor activity, and rest.
3. Evaluating a program or product: who benefits from the claim; what evidence supports it; how risky is it; is the cost fair? Use cost per use: a $120 device used 3 times a week for 8 weeks (24 uses) costs $5 each use; a free alternative may do the same. Check safety: recalls (the Consumer Product Safety Commission), proper instruction, whether a beginner can do it safely, and whether it promises spot reduction (the claim that you can burn fat from one area, which is not supported by evidence).

## Quiz

Plans and product claims.
`,
  reading: [
    "A fitness year you can keep up, wherever you live",
    `
You started high school learning what fitness is. In your last year, the goal is to leave with a plan that you can follow anywhere. Begin by looking at your own **assessment results**: strengths, weaknesses and trends. Then set an **adult-level goal** for the year. At this stage, goals focus on lasting health and capability, not on a grade. Adults are advised to get at least **150 minutes** of moderate activity each week, plus muscle-strengthening on **2 days**. Add a performance target that excites you: finishing a 10K, doing 25 push-ups, hiking a mountain trail or swimming a mile. Break the year into milestones, such as a checkpoint every two months, so that you can adjust as you go.

After graduation, you may not have a school gym, equipment or a coach. A good plan works **without a gym**. **Bodyweight exercises** need no equipment: push-ups, squats, lunges, planks and glute bridges, plus pull-ups on a bar or a sturdy door-frame bar. **Resistance bands** are cheap and easy to carry. Stairs, hills, parks, trails and sidewalks are free for walking, running and cycling. Reputable videos from medical or university sources can teach routines. A sample week could be three 30-minute walking or running days, two 20-minute bodyweight strength sessions, one longer outdoor activity such as a hike, and one rest day. Put it on your calendar and link each session to a time and a place.

You will also be sold fitness products and programs. To **evaluate** one, ask questions. **Who benefits from the claim?** A company that sells a device wants you to buy it. **What is the evidence?** Look for studies by independent experts, not just testimonials and before-and-after photos. **Is it safe?** Check whether a beginner can use it safely, whether instructions are clear, and whether the product has been recalled; the Consumer Product Safety Commission lists recalls. **Is the claim realistic?** Be suspicious of "spot reduction," the idea that you can burn fat from one part of the body with a particular exercise, because the evidence does not support it. **Is the cost fair?** Use **cost per use**. A $120 device used three times a week for eight weeks is used 24 times, so the cost is $120 / 24 = $5 per use. If bodyweight exercises give a similar result for free, the device may not be worth it. Smart consumers compare alternatives before paying.
`,
  ],
  cards: [
    ["Adult guideline", "150 minutes of moderate activity weekly plus 2 days of strength work."],
    ["Milestone", "A checkpoint on the way to a larger goal."],
    ["Bodyweight exercise", "Exercise that uses your own weight as resistance."],
    ["Resistance band", "An elastic band used for strength exercises."],
    ["Cost per use", "The price divided by the number of times used."],
    ["Spot reduction", "The unsupported idea of burning fat from one body area."],
    ["Testimonial", "A personal story, not scientific evidence."],
    ["Recall", "A notice that a product is unsafe and should not be used."],
  ],
  closed: [
    [
      "A $120 device is used 24 times. What is the cost per use?",
      ["$2", "$5", "$12", "$24"],
      "B",
    ],
    [
      "The adult guideline for moderate activity is about:",
      ["30 minutes a week", "150 minutes a week", "600 minutes a week", "none"],
      "B",
    ],
    [
      "Which exercise needs no equipment?",
      ["Push-ups", "Leg press machine", "Bench press", "Cable row"],
      "A",
    ],
    [
      "Spot reduction claims that:",
      ["You can burn fat from one area with a particular exercise", "Exercise burns calories", "Muscles need rest", "Sleep matters"],
      "A",
    ],
    [
      "Where can you check whether a fitness product has been recalled?",
      ["The Consumer Product Safety Commission", "A friend's opinion", "The product's own ad", "Social media comments"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Design a one-week, no-gym fitness plan for a graduate who lives in an apartment, works full time and has a small budget. Include at least five sessions with the activity, the length and the place; make sure that it meets the guideline of 150 minutes of moderate activity and has strength work on 2 days. Show that the minutes add up.",
      scheme: [
        "Lists at least five sessions with activity, length and place",
        "Includes strength work on two days using bodyweight or bands",
        "Shows moderate activity of at least 150 minutes adding up correctly",
        "Is realistic for the budget and schedule, with a rest day or a habit tip",
      ],
      model:
        "Monday: 30-minute brisk walk on the neighborhood trail. Tuesday: 20-minute bodyweight strength at home (push-ups, squats, planks). Wednesday: 30-minute jog at the park. Thursday: 20-minute bodyweight strength with bands. Friday: rest. Saturday: 60-minute hike at the nature preserve. Sunday: 30-minute bike ride. Moderate activity: 30 + 30 + 60 + 30 = 150 minutes. Strength on two days. It costs almost nothing, and I will put each session in my calendar.",
      answers: [
        [
          "full",
          "[[0|Monday: 30-minute brisk walk on the trail. Tuesday: 20 minutes of bodyweight strength at home. Wednesday: 30-minute jog at the park. Thursday: 20 minutes of bodyweight and band strength. Saturday: 60-minute hike. Sunday: 30-minute bike ride.]] [[1|Strength is on Tuesday and Thursday with push-ups, squats and planks.]] [[2|Moderate minutes: 30 + 30 + 60 + 30 = 150.]] [[3|It costs almost nothing, Friday is rest, and I'll put each session in my calendar.]]",
          "Full marks. The minutes add up and the plan is realistic.",
        ],
        [
          "full",
          "[[0|Tuesday, Thursday and Saturday I'll walk the stairs and neighborhood for 40 minutes each; Monday and Wednesday I'll do 25 minutes of bodyweight circuits at home; Sunday is a 45-minute bike ride.]] [[1|The strength days are Monday and Wednesday with squats, lunges, push-ups and planks.]] [[2|Moderate: 40 × 3 = 120 plus the 45-minute bike ride is 165 minutes, above the 150 guideline.]] [[3|Friday is my rest day, the gear is free, and I'll lay out my shoes the night before.]]",
          "Full marks. Going above the minimum is fine and the arithmetic is right.",
        ],
        [
          "partial",
          "[[0|Monday walk 30, Wednesday jog 30, Saturday hike 60.]] [[3|It is cheap.]] That is 150 minutes and I don't need any strength work.",
          "30 plus 30 plus 60 is 120, not 150. Add sessions and include strength work on two days.",
        ],
        [
          "partial",
          "[[1|Strength on Tuesday and Thursday.]] [[2|30 + 30 + 60 + 30 = 150.]] The plan is to buy an expensive machine for my apartment.",
          "A no-gym plan uses free or low-cost activities. Describe sessions and places.",
          true,
        ],
        [
          "weak",
          "I will go to the gym every day. A plan without a gym is impossible.",
          "Bodyweight exercise, walking and running work without a gym.",
        ],
        [
          "weak",
          "I'll exercise whenever I feel like it. No schedule or minutes are needed.",
          "A plan with sessions and minutes makes it much easier to follow.",
        ],
      ],
    },
    {
      prompt:
        "An ad for the \"CoreBlaster 3000\" (price $150) says: \"Melt belly fat with just 5 minutes a day! Doctors recommend it! Order now - only 50 left!\" You would use it 5 days a week for 6 months (26 weeks). Calculate the cost per use, identify at least three problems with the claims, and explain how you would check safety and effectiveness before buying.",
      scheme: [
        "Calculates uses as 130 and the cost per use as about $1.15",
        "Identifies the spot-reduction claim as unsupported",
        "Identifies the other warning signs, such as vague doctors, pressure to order now or no evidence",
        "Describes checking safety and effectiveness: recalls, independent evidence, reviews from reputable sources, free alternatives",
      ],
      model:
        "5 days a week for 26 weeks is 130 uses, so $150 divided by 130 is about $1.15 per use. The claim that it melts belly fat is spot reduction, which the evidence does not support. Doctors recommend it is vague with no named expert, and only 50 left puts pressure on me to order now, with no evidence given. I would check the Consumer Product Safety Commission for recalls, look for independent evidence, and compare with free alternatives such as planks.",
      answers: [
        [
          "full",
          "[[0|5 days × 26 weeks = 130 uses, so $150 ÷ 130 is about $1.15 per use.]] [[1|'Melt belly fat' is spot reduction, which the evidence doesn't support.]] [[2|'Doctors recommend it' names no one, and 'only 50 left' is pressure to order now, and there's no evidence given.]] [[3|I'd check the Consumer Product Safety Commission for recalls, look for independent studies, and compare it to free exercises like planks.]]",
          "Full marks. The calculation and the red flags are both right.",
        ],
        [
          "full",
          "[[0|It would be used 130 times, which makes it about $1.15 each time.]] [[1|You can't choose where you lose fat, so the main claim is false.]] [[2|Other problems are the unnamed doctors, the made-up scarcity, and the 5-minute promise with no proof.]] [[3|Before buying I'd search for recalls and independent reviews, and I'd try planks and crunches for free first.]]",
          "Full marks. Trying a free alternative first is the smartest check.",
        ],
        [
          "partial",
          "[[0|The cost per use is $150 ÷ 26, which is $5.77.]] [[1|Spot reduction isn't supported.]] The ad is trustworthy because it mentions doctors. Safety checks are unnecessary.",
          "Uses are 5 days times 26 weeks. And 'doctors' without names is a warning sign.",
        ],
        [
          "partial",
          "[[2|The deadline pressure is a red flag.]] [[3|Check for recalls.]] It will burn belly fat in five minutes, as the ad says.",
          "The evidence does not support burning fat from one area.",
          true,
        ],
        [
          "weak",
          "Buy it right away, because only 50 are left and the price might go up.",
          "Pressure to order now is a classic warning sign.",
        ],
        [
          "weak",
          "Cost per use means the cost of using it once, which is $150.",
          "Cost per use is the price divided by the number of uses.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Progression for a 5K, and making sense of fitness data",
  note: `
## Objectives

Students will be able to:

1. design a training plan for a specific goal such as a 5K run, using progression;
2. use technology such as heart-rate monitors or apps to monitor activity and interpret the data.

## Materials

Sample app screenshots or printouts (invented data), heart-rate zone charts, a plan template, calculators, the worksheet, quiz and problem set.

## Starter (6 minutes)

Ask: "Who has a watch or a phone that counts steps? What does it tell you that you couldn't know otherwise, and what does it get wrong?"

## Main activity

1. Progression: increase demand gradually. A beginner run/walk plan over 8 weeks: week 1: 8 repeats of 1 minute running and 2 minutes walking (24 minutes in total, 8 minutes running); week 2: 2 minutes running and 2 minutes walking; continue lengthening the running parts; by weeks 7 and 8, run continuously for 25 to 30 minutes. Three sessions a week with rest days. Cutback week: reduce volume every 3 to 4 weeks. Listen to the body; sharp pain means stop. The 10 percent guide for weekly distance. Example: weekly distance 12, 13, 14.5 miles, then a cutback week of 10.
2. Technology: heart-rate monitors (chest straps are more accurate than wrist sensors during intense exercise), watches and phone apps (GPS for distance and pace, cadence, calories estimate, sleep tracking, recovery). Interpret: pace = time / distance (4.0 miles in 38:00 is 9:30 per mile); average heart rate; time in zone (22 minutes of a 30-minute run in the target zone is 73 percent); trends over weeks, not single values.
3. Limits and cautions: sensors can be inaccurate, calorie counts are estimates, devices are not medical advice, GPS data is private and can reveal where you live and run, and obsession with numbers can reduce enjoyment. Use data to answer questions you ask, not as a judge of your worth.

## Quiz

Progression and data interpretation.
`,
  reading: [
    "Building up sensibly, and reading what your watch tells you",
    `
Any goal, whether a 5K, a first pull-up or a long hike, rests on the principle of **progression**: you ask the body to do a little more than it is used to, wait for it to adapt, and then repeat. If you jump too fast, you risk injury and burnout. If you do not progress, you stay the same.

A common beginner plan for a 5K uses **run/walk intervals** over about eight weeks, with three sessions a week and rest days in between. In week 1, a runner might do eight repeats of 1 minute of running and 2 minutes of walking: a 24-minute session with 8 minutes of running. In week 2, the runs might grow to 2 minutes with 2 minutes of walking. Over the following weeks, the running segments get longer and the walking shorter, until in weeks 7 and 8 the runner can run continuously for 25 to 30 minutes, which is enough to finish a 5K. Every three or four weeks, a **cutback week** with less volume lets the body consolidate its gains. A guide for increasing weekly distance is about **10 percent** a week. A runner who covers 12 miles, then 13, then 14.5 might follow with a cutback week of 10. **Listen to your body**: tiredness is normal, but sharp or lasting pain means stop and get advice.

**Technology** can help to measure progress. A **heart-rate monitor** shows how hard your body is working. Chest straps are generally more accurate than wrist sensors, especially at high intensity. Watches and phone apps use **GPS** to measure distance and pace, and many estimate cadence (steps per minute), calories burned and sleep. To get value from the numbers, you need to **interpret** them. **Pace** is time divided by distance, so 4.0 miles in 38:00 is 38 / 4 = 9.5 minutes, or 9:30 per mile. An average heart rate tells you the overall effort, while **time in zone** tells you if you worked in the target range: if you spent 22 minutes of a 30-minute run in your zone, that is 22 / 30, about 73 percent. Look for **trends** across weeks, not a single day's value: if your pace for the same heart rate improves over a month, your fitness is rising.

Be aware of the **limits**. Sensors can be wrong, particularly on the wrist or in the cold. Calorie numbers are estimates, and devices are not medical advice. Sharing GPS routes can reveal where you live and when you are alone, so check your privacy settings. And watch your mindset: if chasing numbers makes exercise stressful, take a break from tracking. Data should answer your questions, not decide how you feel about yourself.
`,
  ],
  cards: [
    ["Progression", "Gradually increasing the demand on the body."],
    ["Run/walk interval", "Alternating running and walking to build endurance."],
    ["Cutback week", "A lighter week to let the body adapt."],
    ["Pace", "Time per unit of distance."],
    ["Time in zone", "How long heart rate stayed in the target range."],
    ["GPS", "A satellite system used to measure location and distance."],
    ["Cadence", "Steps per minute."],
    ["Trend", "The direction of results over weeks."],
  ],
  closed: [
    [
      "A runner covers 4.0 miles in 38:00. What is the pace per mile?",
      ["8:30", "9:00", "9:30", "10:00"],
      "C",
    ],
    [
      "22 minutes of a 30-minute run were in the heart-rate zone. About what percent is that?",
      ["22 percent", "55 percent", "73 percent", "92 percent"],
      "C",
    ],
    [
      "What is the purpose of a cutback week?",
      ["To let the body adapt before building further", "To skip training", "To try a race", "To double the distance"],
      "A",
    ],
    [
      "Which device is generally more accurate for heart rate during hard exercise?",
      ["Chest strap", "Guessing", "Phone case", "Headphones"],
      "A",
    ],
    [
      "Why check privacy settings on a running app?",
      ["GPS data can reveal where you live and run", "Apps are always private", "It makes you faster", "Batteries last longer"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Design an eight-week run/walk plan for a complete beginner aiming for a continuous 5K. Describe week 1, week 4 and week 8, how you apply progression, a cutback week, and how the plan handles sharp pain or illness. Use specific minutes.",
      scheme: [
        "Describes week 1 with specific run and walk minutes",
        "Describes weeks 4 and 8 with longer running segments leading to continuous running",
        "Describes progression and a cutback week",
        "Describes how the plan handles pain or illness (stop, rest, seek advice)",
      ],
      model:
        "Week 1: three sessions of 8 repeats of 1 minute running and 2 minutes walking. Week 4: 5 minutes running and 1 minute walking, 4 repeats. Week 8: a continuous 30-minute run. I raise the running time each week, and in week 5 I cut back to a shorter session so that my body adapts. If I feel sharp pain or have a fever, I stop and rest, and see a doctor if it continues, instead of pushing on.",
      answers: [
        [
          "full",
          "[[0|Week 1: three sessions of 8 repeats of 1 minute running and 2 minutes walking.]] [[1|Week 4: 4 repeats of 5 minutes running and 1 minute walking; week 8: a continuous 30-minute run.]] [[2|Each week I lengthen the running time a little, and in week 5 I cut back to a shorter session so my body can adapt.]] [[3|If I feel sharp pain or have a fever I stop and rest, and see a doctor if it continues.]]",
          "Full marks. Specific minutes and a sensible safety rule.",
        ],
        [
          "full",
          "[[0|Week 1 is 1 minute of running and 2 minutes of walking, repeated 8 times, three days a week.]] [[1|By week 4 I run for 5 minutes at a time, and by week 8 I run 25 to 30 minutes without stopping.]] [[2|Progression is a little more running each week, and every fourth week is easier to consolidate the gains.]] [[3|Sharp pain or illness means I rest, and I would not push through it.]]",
          "Full marks. The easier fourth week is a well-placed cutback.",
        ],
        [
          "partial",
          "[[0|Week 1: run for 1 minute and walk 2 minutes, eight times.]] [[3|I'd stop if it hurts.]] In week 8, I'd run a marathon, and I would never take an easier week.",
          "Week 8 is a continuous 5K, and cutback weeks help the body adapt.",
        ],
        [
          "partial",
          "[[1|Week 8 is a continuous 30-minute run.]] [[2|There is a cutback in week 5.]] In week 1, I'd run 30 minutes at once to save time.",
          "Beginners start with short run segments and long walking segments.",
          true,
        ],
        [
          "weak",
          "Just run a 5K on day one and see what happens.",
          "Progression builds endurance safely. Start with run/walk intervals.",
        ],
        [
          "weak",
          "Pain is a sign of progress, so run harder when it hurts.",
          "Sharp or lasting pain is a warning sign. Stop and get advice.",
        ],
      ],
    },
    {
      prompt:
        "A runner's watch reports for one run: distance 3.5 miles, time 33:15, average heart rate 152, and 24 minutes in her 140 to 165 target zone. Her max heart rate is 200. Calculate her pace per mile (to the nearest second), the percentage of the run in the zone, and interpret the numbers. Then give two limits of the watch data.",
      scheme: [
        "Calculates the pace as about 9:30 per mile (33.25 / 3.5 = 9.5)",
        "Calculates time in zone as 24 of 33.25 minutes, about 72 percent",
        "Interprets the numbers, such as that she worked in a moderate to hard aerobic range and that trends matter",
        "Gives two valid limits of the data (sensor error, calorie estimates, privacy, obsession)",
      ],
      model:
        "33:15 is 33.25 minutes, and divided by 3.5 miles it is 9.5 minutes, which is 9:30 per mile. Time in zone is 24 divided by 33.25, which is about 72 percent. An average of 152 is within her 140 to 165 zone, so she worked at a solid aerobic effort for most of the run. The next step is to compare these numbers with her previous runs to see the trend. Limits: wrist sensors can be inaccurate, and GPS data can reveal where she runs.",
      answers: [
        [
          "full",
          "[[0|33:15 is 33.25 minutes, and 33.25 ÷ 3.5 = 9.5, so 9:30 per mile.]] [[1|24 ÷ 33.25 is about 72 percent of the run in the zone.]] [[2|An average of 152 sits inside her 140 to 165 zone, so it was a solid aerobic effort; I'd compare it with earlier runs to see the trend.]] [[3|Limits: wrist sensors can be inaccurate, and GPS data can reveal where she runs.]]",
          "Full marks. Pace, time in zone, interpretation and limits are all correct.",
        ],
        [
          "full",
          "[[0|Her pace is 9:30 per mile.]] [[1|About 72 percent of the time she was in the zone.]] [[2|Her average of 152 is in the target range, so she trained at the right intensity, and what matters is whether it gets easier over the weeks.]] [[3|Calorie numbers are only estimates, and focusing too much on the numbers can take the fun out of running.]]",
          "Full marks. Two sensible limits and a trend-based reading.",
        ],
        [
          "partial",
          "[[0|The pace is 33 ÷ 3.5, which is 9.43 minutes.]] [[2|The average is in the zone.]] The percentage in zone is 24 percent, and watches are always right.",
          "Convert 33:15 to 33.25 minutes, and divide 24 by the total run time. Also watches can be wrong.",
        ],
        [
          "partial",
          "[[1|About 72 percent in the zone.]] [[3|GPS can reveal where she lives.]] The pace is 3.5 ÷ 33.25, which is 0.105 mph.",
          "Pace is time divided by distance: 33.25 divided by 3.5.",
          true,
        ],
        [
          "weak",
          "The data are useless, because numbers cannot tell anything about a run.",
          "Data can reveal trends and effort when interpreted carefully.",
        ],
        [
          "weak",
          "Her heart rate of 152 means she is unhealthy, because it should be 70.",
          "70 is a resting rate. During a run, 152 can be a normal exercise rate.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Retesting against your goals, and teaching a skill to someone else",
  note: `
## Objectives

Students will be able to:

1. re-test your fitness at the end of the quarter and compare it with your goals;
2. demonstrate advanced skills in a chosen activity and teach the basics to a peer.

## Materials

Goal sheets from week 1, fitness testing equipment, activity equipment (chosen by students), a teaching plan template, an observation checklist, the quiz, problem set and worksheet.

## Starter (6 minutes)

Ask: "Think of something you can do well. Could you teach it to a beginner in ten minutes? What would you teach first?" Discuss.

## Main activity

1. Retest and compare with goals: percent of goal reached = result / goal x 100. Example: goal 25 push-ups, result 22, so 22 / 25 = 88 percent of the goal. Mile goal 8:30, result 8:45 (15 seconds short); progress from 9:30 to 8:45 is 45 seconds out of 570 seconds, about 7.9 percent faster. Reflect: partly met goals still show progress; analyze what helped; reset the goal; consider whether the goal was realistic.
2. Teaching a skill: choose one skill; break it into 2 to 4 key cues; teach in steps: explain (short, one idea at a time), demonstrate (from the side and front, slowly then at speed), practice (the learner tries while you watch), feedback (specific and kind, one correction at a time), and progress (make it harder when ready). Start simple; use whole-part-whole (show the whole skill, practice parts, put it back together). Check safety. Adapt to the learner's level.
3. Advanced skills: show your chosen activity at a higher level (for example, a jump shot off the dribble, a flip turn in swimming, or a tennis kick serve) with clear form and control.

## Quiz

Percent of goal and teaching steps.
`,
  reading: [
    "How close did you get, and how to teach what you know",
    `
At the end of the quarter, you will repeat your fitness tests and compare the results with the goals that you set at the beginning. One helpful number is the **percent of your goal reached**: result divided by goal, times 100. If your goal was 25 push-ups and you did 22, you reached 22 / 25 = 88 percent of your goal. Suppose your mile goal was 8:30, and you ran 8:45. You are 15 seconds short, but compared with your starting time of 9:30 (570 seconds), you improved by 45 seconds, and 45 / 570 is about 7.9 percent faster. A goal that is only partly met still shows real progress. The important part is to ask why. What helped? Which weeks did you train consistently? Did something get in the way? Was the goal realistic? Then **reset** your goal: keep it if you are close, raise it if you beat it, or break it into smaller steps if it was too ambitious.

Another sign of mastery is being able to **teach**. When you teach a skill, you see it more clearly. Choose one skill from an activity you know well, such as a jump shot, a swimming flip turn, a tennis serve or a yoga pose. Decide on **two to four key cues**, the most important points, and avoid overloading a beginner. Then teach in steps. **Explain** briefly, one idea at a time. **Demonstrate** it slowly, then at normal speed, and from more than one angle. Let the learner **practice** while you watch. Give **feedback** that is specific and kind, correcting one thing at a time: "Good follow-through. Next, try bending your knees more." When the learner is ready, **progress** to a harder version. A useful pattern is **whole-part-whole**: show the whole skill, practice the parts, then put it back together. Throughout, check **safety** and adapt to the learner's level and mood.

You will also show **advanced skills** of your own in the chosen activity, with clear form and control. A good performance is not only about difficulty. It is about doing the skill correctly and consistently. Afterward, ask your partner what they learned and what was confusing. Teaching and learning from each other is a powerful way to make skills last, and it prepares you to introduce friends, family or coworkers to activities you love long after high school.
`,
  ],
  cards: [
    ["Percent of goal", "Result divided by goal, times 100."],
    ["Reset a goal", "Adjusting a goal based on results."],
    ["Key cue", "A short, important point that guides a skill."],
    ["Demonstrate", "Show a skill clearly."],
    ["Whole-part-whole", "Show the whole skill, practice parts, put it together."],
    ["Specific feedback", "A comment that points to one exact action."],
    ["Progression", "Making a skill gradually harder."],
    ["Consistency", "Doing a skill correctly time after time."],
  ],
  closed: [
    [
      "A goal is 25 push-ups and the result is 22. What percent of the goal was reached?",
      ["22 percent", "78 percent", "88 percent", "112 percent"],
      "C",
    ],
    [
      "Which is the best first step when teaching a skill?",
      ["Give ten corrections at once", "Explain one or two key cues briefly", "Say nothing", "Leave"],
      "B",
    ],
    [
      "Which feedback is the most helpful?",
      ["Good follow-through; try bending your knees more", "That was bad", "No", "Just do better"],
      "A",
    ],
    [
      "A mile goal of 8:30 and a result of 8:45 means the runner is:",
      ["15 seconds short of the goal", "15 minutes short", "Ahead of the goal", "Exactly on goal"],
      "A",
    ],
    [
      "Whole-part-whole teaching means:",
      ["Show the whole skill, practice parts, put it back together", "Teach only the end", "Skip the demo", "Do it once"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "At the start of the term a student ran the mile in 9:30 (570 seconds) and set a goal of 8:30. Her retest is 8:45. Her push-up goal was 25 and her retest is 22. Calculate the seconds still needed on the mile, the percent faster she became (to one decimal place), and the percent of the push-up goal reached. Then write a short reflection and a reset goal.",
      scheme: [
        "Calculates 15 seconds short of the mile goal",
        "Calculates the improvement as 45 seconds, about 7.9 percent faster",
        "Calculates 88 percent of the push-up goal",
        "Writes a reflection naming what helped or hindered and a reset goal",
      ],
      model:
        "She is 15 seconds short of 8:30. She improved by 45 seconds from 9:30, and 45 divided by 570 is about 7.9 percent faster. For push-ups, 22 divided by 25 is 88 percent of the goal. Running three mornings a week helped, but missing two weeks with a cold got in the way. Next term, I will reset to an 8:30 mile and 25 push-ups, adding weekly checks so that I don't lose training weeks.",
      answers: [
        [
          "full",
          "[[0|She still needs 15 seconds to reach 8:30.]] [[1|She improved by 45 seconds, and 45 ÷ 570 is about 7.9 percent faster.]] [[2|22 ÷ 25 is 88 percent of the push-up goal.]] [[3|Running three mornings a week helped, but missing two weeks with a cold got in the way; next term she'll keep the goals at 8:30 and 25 and check weekly.]]",
          "Full marks. All the numbers are right and the reset is sensible.",
        ],
        [
          "full",
          "[[0|She's 15 seconds short on the mile.]] [[1|She got faster by 45 seconds out of 570, which is 7.9 percent.]] [[2|She reached 88 percent of her push-up goal.]] [[3|Consistency helped her most; the goals are close, so she should keep them and add a short weekly test to stay on track.]]",
          "Full marks. Keeping a close goal is a sound choice.",
        ],
        [
          "partial",
          "[[0|She's 15 seconds short.]] [[3|She should keep going.]] She improved by 45 percent. The push-ups were 22 percent of the goal.",
          "45 seconds out of 570 is about 7.9 percent. 22 out of 25 is 88 percent.",
        ],
        [
          "partial",
          "[[1|About 7.9 percent faster.]] [[2|88 percent of her goal.]] She has to give up because she missed both goals.",
          "Partly met goals show progress. Reflect and reset instead of giving up.",
          true,
        ],
        [
          "weak",
          "The results do not matter because she missed both goals.",
          "Results show progress even when goals are not fully met.",
        ],
        [
          "weak",
          "She is 8:45 seconds short of her goal.",
          "8:45 is her time. She is 15 seconds slower than the 8:30 goal.",
        ],
      ],
    },
    {
      prompt:
        "Choose a skill you could teach a beginner (for example, a jump shot, a swimming flip turn or a tennis serve). List two or three key cues, then describe how you would teach it in five steps (explain, demonstrate, practice, feedback, progress), including one example of specific, kind feedback and one safety check.",
      scheme: [
        "Chooses a skill and lists two or three accurate key cues",
        "Describes explain and demonstrate steps clearly",
        "Describes practice, feedback and progress, with an example of specific and kind feedback",
        "Includes a relevant safety check",
      ],
      model:
        "Skill: the tennis serve. Key cues: toss the ball up in front, reach up to hit it, and follow through across the body. I explain these three cues in a minute, then demonstrate slowly and at normal speed. The learner practices ten serves while I watch. My feedback: \"Your toss was steady. Try reaching higher at contact.\" When ready, I progress to aiming at a target. For safety, I check that the court is clear of loose balls and that the learner has warmed up the shoulder.",
      answers: [
        [
          "full",
          "[[0|Skill: the tennis serve. Cues: toss in front, reach up at contact, and follow through across the body.]] [[1|I explain these in a minute, then demonstrate slowly and at full speed.]] [[2|The learner serves ten times while I watch; I say, 'Your toss was steady. Try reaching higher at contact,' and then move to aiming at a target.]] [[3|For safety I clear loose balls from the court and check that the shoulder is warmed up.]]",
          "Full marks. The five steps are clear and the feedback is specific.",
        ],
        [
          "full",
          "[[0|I'd teach the free throw with three cues: feet set, elbow under the ball, follow through.]] [[1|I explain each cue in a sentence and demonstrate slowly from the side and the front.]] [[2|The learner shoots ten while I watch, and I give feedback: 'Great balance. Now keep your elbow under the ball.' When ready, they shoot from further back.]] [[3|The safety check is a clear space under the basket and no one running through.]]",
          "Full marks. Demonstrating from two angles helps the learner.",
        ],
        [
          "partial",
          "[[0|I'd teach the serve with the toss.]] [[3|I'd check the court.]] I'd tell the learner to watch me and not give any feedback.",
          "Feedback is a key step. Give specific, kind comments.",
        ],
        [
          "partial",
          "[[1|I'd explain and demonstrate slowly.]] [[2|Feedback: nice toss, reach higher.]] There are no cues to teach because it is obvious.",
          "Choose two or three key cues to focus the learner's attention.",
          true,
        ],
        [
          "weak",
          "I'd just tell the beginner to try it and figure it out alone.",
          "Teaching includes explaining, demonstrating, watching, giving feedback and progressing.",
        ],
        [
          "weak",
          "A beginner should learn every detail at once to save time.",
          "Too many cues overload a beginner. Focus on two or three.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Running a tournament, and reading a team's strategy",
  note: `
## Objectives

Students will be able to:

1. plan and run a small tournament, including the rules, schedule and scoring;
2. analyze the strategies of a professional or collegiate team in a game.

## Materials

A tournament planning sheet, brackets, a round-robin grid, scoreboards, whistles, a video clip of a collegiate or professional game (or a written game summary), the problem set and worksheet.

## Starter (6 minutes)

Ask: "If six teams want to play, how would you decide who plays whom, and who wins?" Collect formats.

## Main activity

1. Formats: single elimination (a loss ends your tournament; 8 teams need 7 games and 3 rounds; a bracket with byes if the number of teams is not a power of 2); double elimination (a team is out after two losses); round robin (every team plays every other; number of games = n(n - 1)/2, so 6 teams play 15 games). Pool play followed by a bracket is common.
2. Planning: rules (game length, scoring, substitutions, tie-breakers), roles (referees, scorekeepers, timekeeper, a tournament director), the schedule (courts, game length, rest time). Example: 15 games on 3 courts, 20 minutes each, is 15 / 3 = 5 rounds, or 5 x 20 = 100 minutes, plus 5-minute changeovers. Scoring and standings: 2 points for a win, 1 for a tie, 0 for a loss; tie-breakers by head-to-head, then point difference. Safety and fair play, publish the schedule in advance.
3. Analyzing team strategy: identify the strategy (such as pressing defense, pick-and-roll, a zone, a fast tempo), why it fits the team's personnel, how the opponent responds, and results (turnovers forced, points per possession); evidence from film or stats; your own suggestion.

## Problem set

Plan a bracket and analyze a game.
`,
  reading: [
    "Making a competition work, and studying how teams win",
    `
Organizing a **tournament** is a leadership skill. First, choose a **format**. In a **single-elimination** tournament, a loss ends a team's run, which is fast but means half of the teams play just once. Eight teams need 7 games (4 + 2 + 1) in 3 rounds; if the number of teams is not a power of two, some teams get a **bye**, a free pass to the next round. In **double elimination**, a team is out after two losses, which is fairer but longer. In a **round robin**, every team plays every other team, which gives everyone many games. The number of games is n(n - 1)/2: with 6 teams that is 6 x 5 / 2 = 15 games. Many tournaments use **pool play** first, followed by a bracket for the top teams.

Next, plan the details. Write down the **rules**: game length, how points are scored, how substitutions work, and how ties are settled. Assign **roles**: referees, scorekeepers, a timekeeper and a tournament director who settles disputes. Build the **schedule** from the time and space available. If 15 games are to be played on 3 courts, with each game lasting 20 minutes, the games can be done in 15 / 3 = 5 rounds, and 5 x 20 = 100 minutes, plus a few minutes between rounds to change over. Publish the schedule beforehand so that players know when to arrive and warm up. Decide on **standings**: for example, 2 points for a win, 1 for a tie and 0 for a loss, with tie-breakers such as the result of the game between the teams and then the point difference. Emphasize safety and fair play, and remember that a tournament should be fun for everyone, including those who lose early.

Studying how skilled teams play is another way to learn about tactics. When you **analyze a team's strategy** in a professional or collegiate game, work through a few steps. Identify the **strategy**: for example, a full-court press, a pick-and-roll offense, a zone defense or a fast tempo. Ask **why** it suits that team's players: a team with quick guards may press, and a team with a dominant big player may feed the ball inside. Observe how the **opponent responds** and how the strategy changes over the game. Look for **evidence**: turnovers forced, points per possession, shot locations, or how often the plan was used. Finally, make a **suggestion**: if you were the coach of the other team, what adjustment would you try? An analysis backed by evidence is much more convincing than an opinion.
`,
  ],
  cards: [
    ["Single elimination", "A format where one loss ends your tournament."],
    ["Bye", "A free pass to the next round."],
    ["Round robin", "A format where every team plays every other team."],
    ["Pool play", "Groups of teams playing each other before a bracket."],
    ["Tie-breaker", "A rule used to rank teams that have equal records."],
    ["Standings", "The ranking of teams by results."],
    ["Full-court press", "A defense applied across the whole court."],
    ["Pick-and-roll", "A play where a screen is set and the screener moves to the basket."],
  ],
  closed: [
    [
      "How many games does a single-elimination tournament with 8 teams need?",
      ["4", "7", "8", "16"],
      "B",
    ],
    [
      "How many games does a round robin of 6 teams have?",
      ["6", "12", "15", "30"],
      "C",
    ],
    [
      "15 games on 3 courts need how many rounds?",
      ["3", "5", "12", "15"],
      "B",
    ],
    [
      "What is a bye?",
      ["A free pass to the next round", "A forfeit", "A penalty", "A tie-breaker"],
      "A",
    ],
    [
      "Which evidence supports an analysis of a pressing defense?",
      ["Turnovers forced", "The team's color", "The coach's age", "Ticket price"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Plan a tournament for 6 teams in a one-hour class using two courts, with 12-minute games. Choose a format, calculate the number of games, the number of rounds, and the total playing time. Say whether it fits in the hour, and describe the scoring and tie-breakers and two roles needed.",
      scheme: [
        "Chooses a format (such as round robin) and calculates 15 games for 6 teams",
        "Calculates the rounds on two courts as 8 (15 / 2 rounded up) and the total playing time",
        "States clearly whether it fits in one hour, with a reasonable alternative",
        "Describes scoring, tie-breakers and two roles",
      ],
      model:
        "A round robin gives 6 times 5 divided by 2, which is 15 games. On two courts that is 15 divided by 2, or 8 rounds when rounded up. At 12 minutes each, 8 rounds take 96 minutes, which does not fit in an hour. Instead I would play two pools of three teams (3 games each, 6 in total, 3 rounds of 12 minutes, which is 36 minutes) followed by a 12-minute final, 48 minutes in total. Scoring is 2 points for a win, 1 for a tie, with head-to-head as the tie-breaker. Roles: referees and a scorekeeper.",
      answers: [
        [
          "full",
          "[[0|A round robin for 6 teams is 6 × 5 ÷ 2 = 15 games.]] [[1|On two courts that's 8 rounds, and at 12 minutes each it's 96 minutes.]] [[2|That doesn't fit in an hour, so I'd use two pools of three (6 games in 3 rounds, 36 minutes) and a 12-minute final, which is 48 minutes.]] [[3|Scoring: 2 for a win and 1 for a tie, with head-to-head as the tie-breaker; roles: referees and a scorekeeper.]]",
          "Full marks. You checked the time and adjusted the format.",
        ],
        [
          "full",
          "[[0|A full round robin means 15 games.]] [[1|Two courts means 8 rounds, which is 96 minutes of games.]] [[2|That's too long for an hour, so I'd run single elimination: 5 games in 3 rounds (2 first-round games with two byes, 2 semifinals and the final), about 36 minutes.]] [[3|Winners score 2 points, with a coin flip as the last tie-breaker; I need a timekeeper and referees.]]",
          "Full marks. A smaller format that fits the time is a sound choice.",
        ],
        [
          "partial",
          "[[0|A round robin is 6 × 5 = 30 games.]] [[3|I need referees.]] It will fit in the hour because games are quick.",
          "Each game is counted once: 6 times 5 divided by 2 is 15. Check the total time.",
        ],
        [
          "partial",
          "[[1|8 rounds, 96 minutes.]] [[2|It does not fit, so use pools.]] There's no need for scoring rules or roles.",
          "Scoring, tie-breakers and roles are part of the plan.",
          true,
        ],
        [
          "weak",
          "Just let teams play whoever they want. A plan is not needed.",
          "A tournament needs a format, schedule, rules and roles.",
        ],
        [
          "weak",
          "A round robin means a game on a round table.",
          "A round robin is a format where every team plays every other team.",
        ],
      ],
    },
    {
      prompt:
        "A collegiate women's basketball team uses a full-court press, forcing 18 turnovers in a game against a team that handles the ball poorly, and scoring 14 of its 70 points off fast breaks. Analyze the strategy: explain why it suits that team and how the opponent could respond, use the evidence, and suggest an adjustment if you coached the opponent.",
      scheme: [
        "Identifies the strategy as a full-court press",
        "Explains why it suits the team, such as quick, fit guards",
        "Uses the evidence (18 turnovers, 14 fast-break points) to support the analysis",
        "Explains the opponent's response or an adjustment, such as breaking the press with quick passes or a second ball handler",
      ],
      model:
        "The team used a full-court press. It suits a team with quick, fit guards who can pressure the ball for the whole game. The evidence is 18 forced turnovers and 14 of 70 points scoring on fast breaks, which is 20 percent. As the opponent's coach, I would add a second ball handler and use quick passes ahead to break the press, so that we do not lose the ball in the backcourt.",
      answers: [
        [
          "full",
          "[[0|The team used a full-court press.]] [[1|It suits them if they have quick, fit guards who can pressure the ball for the whole game.]] [[2|The evidence is 18 forced turnovers and 14 of 70 points on fast breaks, which is 20 percent.]] [[3|As the other coach I'd add a second ball handler and use quick passes ahead to break the press.]]",
          "Full marks. The evidence supports the claim and the adjustment is realistic.",
        ],
        [
          "full",
          "[[0|Their strategy is the full-court press.]] [[1|It works best with athletic, fast players who tire the opponent over 40 minutes.]] [[2|18 turnovers gave them extra possessions and 14 fast-break points, one-fifth of their 70, show it turned into scores.]] [[3|To counter it, I'd spread my players, pass quickly to a teammate near half court and get the ball over the line before the trap closes.]]",
          "Full marks. 'One-fifth' is the same as 20 percent.",
        ],
        [
          "partial",
          "[[0|They pressed.]] [[2|There were 18 turnovers.]] The strategy won because the team was lucky. The opponent cannot do anything.",
          "Opponents can adapt, for example with quick passes and a second ball handler.",
        ],
        [
          "partial",
          "[[1|It suits fast guards.]] [[3|Add a second ball handler.]] 14 of 70 is 14 percent.",
          "14 out of 70 is 20 percent.",
          true,
        ],
        [
          "weak",
          "The analysis is not possible without being a professional coach.",
          "Anyone can analyze using evidence such as turnovers and points.",
        ],
        [
          "weak",
          "The team won because it had better uniforms.",
          "Strategy and evidence explain results, not uniforms.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Peer leadership, resolving conflict, and the cost of community activity",
  note: `
## Objectives

Students will be able to:

1. serve as a peer leader, setting expectations for safety and fair play;
2. resolve a conflict in a group by listening, negotiating and agreeing to a plan;
3. identify community opportunities for lifelong activity and compare costs and access.

## Materials

Leader role cards, conflict scenarios, a negotiation planner, a list of community options with costs (invented), calculators, the worksheet.

## Starter (6 minutes)

Ask: "What is the difference between a boss and a leader?" Collect: a leader earns trust, sets an example, listens, shares credit.

## Main activity

1. Peer leadership: set expectations at the start (safety rules, fair play, respect, inclusion), model the behavior you ask for, notice when someone is left out, correct kindly and in private when possible, and praise effort. A short expectations talk covers: what we're doing, how to stay safe, how we treat each other, and what to do if something goes wrong.
2. Conflict resolution: stop and cool down; each person states their view while the other listens (paraphrase back); identify interests (what each person needs) not just positions (what each person demands); brainstorm options; negotiate a compromise or a creative solution; agree on a plan with who does what; check back later. Example: two teams want the same court at lunch: interests are playing time and fairness; solution: a schedule alternating days.
3. Community opportunities: public parks and trails, city recreation leagues, YMCA or other community centers, adult clubs (running, cycling, hiking), college or workplace facilities, free community events. Compare cost and access: $45 a month at a community center is $540 a year; a city league at $60 per season with 4 seasons a year is $240 a year if you play all four; a free park run costs $0. Access: distance, hours, transportation, accessibility, welcome for beginners, scholarships.

## Worksheet

Lead a mini-session, resolve a case, and compare options.
`,
  reading: [
    "Setting the tone, settling disagreements, and finding a place to play",
    `
A **leader** is not the person who gives the most orders. A leader earns trust, sets an example, listens, and helps a group to do well. As a **peer leader** in a class game or activity, start by setting **expectations**. Say what you will do, how to stay **safe**, how you will treat one another (**fair play** and respect), and what to do if something goes wrong. Keep it short and clear. Then **model** the behavior that you are asking for: if you want people to be positive, be positive. Notice who is being left out and include them. When you need to correct someone, do it kindly and, if possible, privately. Praise effort and good sportsmanship.

Disagreements will arise, and good leaders help the group to solve them. Start by letting everyone **cool down**. Then have each person **state their view** while the other listens, and ask the listener to **paraphrase**, to repeat in their own words what they heard. Look beyond what people demand (their **positions**) to what they need (their **interests**). For example, two groups both want the court at lunch. Their positions are "We were here first!" and "We booked it!" but their interests are playing time and fairness. With that in mind, it is easier to **brainstorm options**: alternate days, split the court, or sign up in advance. Choose a **compromise** or a creative solution that meets both needs, **agree on a plan** about who does what and when, and **check back** later to see if it works. Negotiation is about finding a solution that people can accept, not about winning.

After graduation, you will have to find your own places to be active. Communities offer many options: **public parks and trails**, **city recreation leagues**, **community centers** and the YMCA, **adult clubs** for running, cycling or hiking, college and workplace facilities, and free events. When comparing, look at **cost** and **access**. A community center at $45 a month costs 45 x 12 = $540 a year. A city league at $60 per season costs $240 a year if you play in all four seasons (4 x 60). A free park run costs nothing. Access includes distance, hours, transportation, whether the facility is accessible and welcoming to beginners, and whether scholarships or sliding-scale fees are available. The best option is the one that fits your budget and that you will actually use.
`,
  ],
  cards: [
    ["Peer leader", "A person who guides classmates by example and clear expectations."],
    ["Expectations", "Clear statements of how a group will behave."],
    ["Paraphrase", "Repeat what someone said in your own words."],
    ["Position", "What a person says they want."],
    ["Interest", "The need behind a person's position."],
    ["Compromise", "A solution in which each side gives something up."],
    ["Access", "How easy it is to reach and use a facility."],
    ["Sliding-scale fee", "A fee that depends on what a person can afford."],
  ],
  closed: [
    [
      "A community center costs $45 a month. What is the yearly cost?",
      ["$45", "$135", "$450", "$540"],
      "D",
    ],
    [
      "What is the difference between a position and an interest?",
      ["A position is what someone demands; an interest is the need behind it", "They are the same", "An interest is louder", "A position is hidden"],
      "A",
    ],
    [
      "A city league costs $60 a season. What is the cost for four seasons?",
      ["$60", "$120", "$240", "$480"],
      "C",
    ],
    [
      "Which is a good way for a peer leader to correct someone?",
      ["Kindly and, when possible, privately", "By shouting", "By ignoring", "In front of everyone"],
      "A",
    ],
    [
      "Why paraphrase in a conflict?",
      ["To show you understood the other person", "To win the argument", "To end the talk", "To confuse them"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Two groups both want the gym at lunch: group A says \"We were here first!\" and group B says \"We signed up for it!\" Use the steps of conflict resolution to settle it. Identify each group's position and interest, describe how you would get each side to listen, and propose a solution and a plan for checking that it works.",
      scheme: [
        "States the positions of both groups and their underlying interests",
        "Describes cooling down and listening or paraphrasing",
        "Proposes a solution that meets both interests",
        "Describes a plan with specifics and a check-back",
      ],
      model:
        "Group A's position is \"We were here first\" and group B's is \"We signed up.\" Their shared interests are guaranteed playing time and fairness. I would let everyone calm down, then ask each group to explain while the other listens and paraphrases. A solution is to alternate days, with group A on Monday, Wednesday and Friday and group B on Tuesday and Thursday, and to use a sign-up sheet. We will check in after two weeks to see if it is fair.",
      answers: [
        [
          "full",
          "[[0|Group A's position is 'we were here first' and group B's is 'we signed up'; both really want guaranteed playing time and fairness.]] [[1|I'd let everyone cool down, then have each group explain while the other listens and paraphrases.]] [[2|A solution is to alternate days: A on Monday, Wednesday and Friday, B on Tuesday and Thursday.]] [[3|We'd use a sign-up sheet and check in after two weeks to see if it's fair.]]",
          "Full marks. Interests, listening, a compromise and a follow-up.",
        ],
        [
          "full",
          "[[0|They are arguing positions, but what both need is fair access to the gym.]] [[1|I'd ask each to say what they heard the other say before responding.]] [[2|We could split the gym in half, or take turns by week.]] [[3|We'd write the schedule on the whiteboard, and I'd meet both captains on Friday to see if it's working.]]",
          "Full marks. Having both captains check back keeps the plan alive.",
        ],
        [
          "partial",
          "[[0|They both want the gym.]] [[3|We'll write a plan.]] Group A should get it because they were there first, and group B must leave.",
          "A compromise that meets both interests is fairer than choosing a winner.",
        ],
        [
          "partial",
          "[[1|Let them cool down and listen.]] [[2|Alternate days.]] I'd tell them to stop arguing and not make a plan to check it.",
          "A check-back confirms that the solution works.",
          true,
        ],
        [
          "weak",
          "Let them fight it out, because the strongest group should win.",
          "Fighting isn't a fair solution. Use listening and negotiation.",
        ],
        [
          "weak",
          "Close the gym so that nobody can use it.",
          "Shutting down the space doesn't meet either group's needs.",
        ],
      ],
    },
    {
      prompt:
        "A graduate has three options for staying active: a community center at $45 a month, a city recreation league at $60 per season (4 seasons a year, she would play in three of them), and a free park run every Saturday. Calculate the yearly cost of each, compare them on access and fit, and recommend one or a combination. Then write a three-point expectations talk that she could give as a peer leader of the park group.",
      scheme: [
        "Calculates $540, $180 and $0 correctly",
        "Compares the options on access or fit (distance, hours, welcome for beginners, variety)",
        "Recommends an option or a combination with a reason",
        "Writes three clear expectations (safety, fair play or respect, and what to do if something goes wrong)",
      ],
      model:
        "The community center costs 45 times 12, which is $540 a year. The league is 60 times 3, which is $180. The park run is free. The park run is free and close, but it is only once a week; the league offers games and social contact in three seasons; the center offers year-round access but costs the most. I would recommend the park run plus the league, for $180 in total. Expectations: we warm up and stay on the path for safety; we encourage everyone, including beginners; and if someone is hurt, we stop and get help.",
      answers: [
        [
          "full",
          "[[0|Center: 45 × 12 = $540. League: 60 × 3 = $180. Park run: $0.]] [[1|The park run is free but only weekly; the league gives games and social contact; the center is open year-round but costs the most.]] [[2|I'd recommend the park run plus the league for $180 a year, which gives variety at a modest cost.]] [[3|Expectations: warm up and stay on the path for safety; encourage everyone, including beginners; and if someone is hurt, we stop and get help.]]",
          "Full marks. The calculations, comparison, recommendation and talk are complete.",
        ],
        [
          "full",
          "[[0|The yearly costs are $540, $180 and nothing.]] [[1|The center has the best hours but costs the most, the league is social but seasonal, and the park run is free and welcoming to beginners.]] [[2|I'd start with the park run and add the league in the seasons I can afford, spending only $180.]] [[3|My talk: 1) we stretch and run safely, 2) we cheer for everybody and nobody is left behind, 3) if there's an injury, we stop and call for help.]]",
          "Full marks. Starting free and adding the league is a sensible plan.",
        ],
        [
          "partial",
          "[[0|The center is $45, the league $60 and the park run $0.]] [[3|We should be safe.]] I'd choose the center because it's the most expensive so it must be best.",
          "Convert to yearly costs and compare access and fit, not just price.",
        ],
        [
          "partial",
          "[[1|The park run is free and welcoming.]] [[2|Choose the park run and the league.]] The league costs 60 × 12 = $720.",
          "She plays three seasons: 60 times 3 is $180.",
          true,
        ],
        [
          "weak",
          "Cost doesn't matter. Pick any option.",
          "Cost and access determine whether an option is realistic.",
        ],
        [
          "weak",
          "Expectations aren't needed in a free group. Everyone knows what to do.",
          "Clear expectations keep a group safe and fair.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Activity and stress at college or work, and your wellness plan",
  note: `
## Objectives

Students will be able to:

1. describe the role of physical activity in managing stress at college or work;
2. write a personal health and wellness plan for the first year after high school.

## Materials

A wellness-plan template with six areas, a weekly time-planning grid, a stress-signs checklist, the worksheet and quiz.

## Starter (6 minutes)

Ask: "What do you think will be your biggest source of stress next year?" Collect: money, workload, new people, time, homesickness, deadlines.

## Main activity

1. Stress and activity: physical activity helps by burning off stress hormones, releasing mood-lifting chemicals, improving sleep and giving a break and a sense of control. Even a 10-minute walk helps. Use activity as a tool: before an exam, after a long shift, when angry, during a break. Time-blocking: schedule exercise like a class.
2. Time budget: a week has 168 hours. Example: sleep 56 (8 hours x 7), classes and study or work 50, meals and personal care 21, activity 3, travel and chores 14, social and free time 24: total 168. Show that 3 hours of activity (180 minutes) is possible.
3. Wellness plan, six areas: physical activity (150 minutes plus 2 days strength), sleep (7 to 9 hours for adults), nutrition (regular meals, water), mental health (stress habits, a counselor or trusted person, a check-in), social connections (friends, groups), health care (insurance, check-ups, vaccines). For each: a goal, an action, a schedule and a way to measure.

## Quiz

Stress and the plan.
`,
  reading: [
    "Keeping steady when life gets busy",
    `
Starting college, a job or an apprenticeship will bring new freedoms and new stresses: money, a heavy workload, new people, strict deadlines and homesickness. Physical activity is one of the most effective tools for coping. When you exercise, your body burns off stress hormones, your brain releases chemicals that lift your mood, your sleep improves, and you gain a break from worries and a feeling of control. Even a **10-minute walk** can help. Use activity on purpose: before an exam to calm nerves, after a long shift to unwind, when you feel angry, or during a study break. The trick is to make it a **habit** by treating exercise like a class or a shift, with a set time in your calendar.

Is there really time? A week has **168 hours**. Imagine a busy student's week: sleep 56 hours (8 per night), classes and study or work 50, meals and personal care 21, travel and chores 14, activity 3, and social and free time 24. These add up to 56 + 50 + 21 + 14 + 3 + 24 = 168. Even in this packed week, 3 hours of activity (180 minutes) fits and exceeds the 150-minute guideline. A calendar makes visible where the time goes and where you can find 30 minutes.

A **wellness plan** brings the pieces together. It covers six areas. **Physical activity:** at least 150 minutes of moderate activity and 2 days of strength work each week. **Sleep:** 7 to 9 hours a night for adults. **Nutrition:** regular meals with a variety of foods, and water. **Mental health:** habits that manage stress, someone you can talk to, and the school counselor or a doctor if you feel overwhelmed. **Social connections:** friends, clubs and teams, since isolation harms health. **Health care:** insurance, a doctor you can see, check-ups and vaccines. For each area, write a **goal**, an **action**, a **schedule** and a way to **measure** it, for example: "Sleep: be in bed by 11 p.m. on weeknights; set a phone alarm for 10:30; track with a sleep log." Review your plan each month, and change it when your life changes. A realistic plan that you can keep is better than an ambitious one that you abandon.
`,
  ],
  cards: [
    ["Stress hormone", "A chemical the body releases under pressure."],
    ["Time-blocking", "Scheduling activities at set times in your calendar."],
    ["Wellness plan", "A written plan covering the main areas of health."],
    ["Sleep need", "Adults need about 7 to 9 hours a night."],
    ["Support person", "Someone you can talk to when stressed."],
    ["Check-up", "A routine visit to a doctor to prevent problems."],
    ["Social connection", "Having friends and groups that support you."],
    ["Review", "Checking and updating a plan regularly."],
  ],
  closed: [
    [
      "How many hours are in a week?",
      ["84", "112", "168", "200"],
      "C",
    ],
    [
      "How much sleep do adults need?",
      ["4 to 5 hours", "5 to 6 hours", "7 to 9 hours", "12 hours"],
      "C",
    ],
    [
      "How does exercise help with stress?",
      ["It burns off stress hormones and lifts mood", "It adds stress", "It stops sleep", "It does nothing"],
      "A",
    ],
    [
      "A wellness plan area for a doctor, insurance and vaccines is:",
      ["Health care", "Sleep", "Social", "Nutrition"],
      "A",
    ],
    [
      "Why treat exercise like a class?",
      ["Scheduling makes it a habit", "To lose points", "To avoid homework", "To skip sleep"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Build a 168-hour weekly time budget for a first-year college student who sleeps 8 hours a night. Allocate hours for sleep, classes and study, meals and personal care, travel and chores, physical activity, and free and social time. Show that the total is 168, show where the 150 minutes of activity fits, and explain two ways exercise will help the student cope with stress.",
      scheme: [
        "Allocates hours to at least six categories, including sleep as 56",
        "Shows the categories total exactly 168",
        "Shows where 150 minutes (2.5 hours) or more of activity fits",
        "Explains two ways exercise helps with stress",
      ],
      model:
        "Sleep 56, classes and study 50, meals and personal care 21, travel and chores 14, physical activity 3 and free and social time 24. The total is 56 + 50 + 21 + 14 + 3 + 24 = 168. Three hours is 180 minutes, so five 30-minute sessions plus 30 minutes of extra strength fit the 150-minute guideline. Exercise helps with stress because it burns off stress hormones and lifts mood, and it improves sleep.",
      answers: [
        [
          "full",
          "[[0|Sleep 56, classes and study 50, meals and personal care 21, travel and chores 14, physical activity 3, free and social time 24.]] [[1|56 + 50 + 21 + 14 + 3 + 24 = 168.]] [[2|Three hours is 180 minutes, which is five 30-minute sessions plus extra, so it fits the 150-minute guideline.]] [[3|Exercise burns off stress hormones and lifts my mood, and it helps me sleep better.]]",
          "Full marks. The total is exactly 168 and the minutes check out.",
        ],
        [
          "full",
          "[[0|Sleep 56, class 15, study 25, meals and hygiene 21, commuting and chores 12, exercise 4, free and social time 35.]] [[1|56 + 15 + 25 + 21 + 12 + 4 + 35 = 168.]] [[2|Four hours is 240 minutes, so I'd do three 45-minute runs and two 30-minute strength sessions, above the 150 guideline.]] [[3|Running clears my head after a hard class, and it gives me a break from deadlines.]]",
          "Full marks. Splitting class and study is a clear refinement.",
        ],
        [
          "partial",
          "[[0|Sleep 56, class 50, meals 21, chores 14, exercise 3.]] [[3|Exercise reduces stress.]] That totals 168 even without free time, and 3 hours is 18 minutes.",
          "Those add up to 144, not 168. Also 3 hours is 180 minutes.",
        ],
        [
          "partial",
          "[[1|The total is 168.]] [[2|Five 30-minute sessions fit.]] Sleep should be 4 hours so I have more time.",
          "Adults need 7 to 9 hours of sleep; use 56 hours for 8 hours a night.",
          true,
        ],
        [
          "weak",
          "There is no time for exercise in college, so skip it.",
          "A weekly budget shows that time for activity can be found.",
        ],
        [
          "weak",
          "A week has 100 hours, so I can't fit everything.",
          "A week has 168 hours (24 × 7).",
        ],
      ],
    },
    {
      prompt:
        "Write a personal health and wellness plan for your first year after high school, covering physical activity, sleep, nutrition, mental health, social connections and health care. For each area give one goal and one specific action (with a time or amount). Then say how you will review the plan.",
      scheme: [
        "Gives a goal and specific action for physical activity and sleep",
        "Gives a goal and specific action for nutrition and mental health",
        "Gives a goal and specific action for social connections and health care",
        "Describes a way to review and adjust the plan",
      ],
      model:
        "Activity: 150 minutes a week, running three mornings and strength twice. Sleep: in bed by 11 p.m. on weeknights for 7 to 9 hours. Nutrition: cook three dinners a week and drink water with meals. Mental health: a 10-minute walk after a stressful day and meeting the counselor if I feel overwhelmed. Social: join one club and call my family on Sundays. Health care: stay on my parents' insurance, book a check-up and get a flu shot. I will review the plan on the first Sunday of each month.",
      answers: [
        [
          "full",
          "[[0|Activity: 150 minutes a week with three morning runs and two strength sessions. Sleep: in bed by 11 p.m. on weeknights for 7 to 9 hours.]] [[1|Nutrition: cook three dinners a week and drink water with meals. Mental health: a 10-minute walk after a stressful day, and see a counselor if I feel overwhelmed.]] [[2|Social: join one club and call my family on Sundays. Health care: stay on my parents' insurance, book a check-up and get a flu shot.]] [[3|I'll review the plan on the first Sunday of each month and adjust it.]]",
          "Full marks. Every area has a specific, measurable action.",
        ],
        [
          "full",
          "[[0|Exercise: walk 30 minutes five days a week; sleep: 8 hours, phone off by 10:30 p.m.]] [[1|Food: breakfast every day and a vegetable at dinner; mental health: weekly check-in with a friend and meet the counselor if stress piles up.]] [[2|Social: eat dinner with coworkers twice a week; health care: find a clinic near work and keep my insurance card in my wallet.]] [[3|Every month I'll check how I did and change what isn't working.]]",
          "Full marks. Keeping the insurance card handy is a practical detail.",
        ],
        [
          "partial",
          "[[0|Exercise and sleep are important.]] [[3|I'll review it sometimes.]] I'll eat whatever and I do not need friends or a doctor.",
          "Each area needs a goal and a specific action, including nutrition, social and health care.",
        ],
        [
          "partial",
          "[[1|Cook three dinners a week and take walks.]] [[2|Join a club and get a check-up.]] I'll sleep 3 hours a night to get more done.",
          "Adults need 7 to 9 hours of sleep to function well.",
          true,
        ],
        [
          "weak",
          "I do not need a plan. Health will take care of itself.",
          "A plan makes healthy habits easier to keep.",
        ],
        [
          "weak",
          "My plan is to be healthy.",
          "'Healthy' is not specific. State actions with times or amounts.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "First aid, CPR, and how fatigue and drugs cloud judgment",
  note: `
## Objectives

Students will be able to:

1. describe how to prevent and respond to injuries and common emergencies, including CPR;
2. analyze how alcohol, drugs and sleep loss affect decision-making and safety.

## Materials

CPR manikins and trainers (if available) or pillows for practice, an AED trainer (if available), first-aid scenario cards, a decision-making case set, the worksheet, quiz and problem set.

## Starter (6 minutes)

Ask: "You see a person collapse at a track meet. What is the first thing you do?" Collect answers; reinforce: check the scene, check the person, call 911.

## Main activity

1. Prevention: warm up, use proper gear, follow rules, stay hydrated, know the area.
2. Emergency steps: check the scene is safe; check responsiveness (tap and shout); call 911 (or have someone call and bring an AED); check breathing.
3. Hands-only CPR for an adult who collapses and is not breathing normally: push hard and fast in the center of the chest at 100 to 120 compressions per minute, about 2 inches deep, allow the chest to rise fully, do not stop until help arrives or an AED is ready. The beat of a song at about 110 beats per minute helps. AED: turn it on, follow the voice prompts, attach pads, stand clear. Choking (adult, conscious): ask "Are you choking?"; give abdominal thrusts (and back blows as taught); call 911 if it does not clear.
4. Other emergencies: severe bleeding (direct pressure with a cloth, do not remove), severe allergic reaction (use an epinephrine auto-injector if available, call 911), seizure (clear the area, protect the head, time it, do not put anything in the mouth, call 911 if it lasts over 5 minutes), heat stroke (call 911, cool the body), poisoning (Poison Control 1-800-222-1222).
5. Decision-making: alcohol and drugs slow reaction time, impair judgment and lower inhibitions; sleep loss does too. Roughly, being awake for 17 to 19 hours can impair performance as much as a blood alcohol level of 0.05, and 24 hours as much as about 0.10. Drowsy driving causes crashes. Plans: a designated sober driver, a call to a trusted adult, no riding with an impaired driver, sleep before driving.

## Problem set

Emergency steps and decision cases.
`,
  reading: [
    "When seconds count, and when the mind isn't at its best",
    `
Many injuries can be **prevented**: warm up before activity, wear the right gear, follow the rules, drink enough water and know your surroundings. But emergencies still happen, and the actions of a bystander can save a life. The first rule is to stay calm and follow a sequence. **Check the scene** to be sure that it is safe for you. **Check the person**: tap them and shout, "Are you okay?" If they do not respond, **call 911**, or tell a specific person to call and to bring an **AED** (automated external defibrillator) if one is nearby. Then check whether the person is breathing normally.

If an adult collapses and is not breathing normally, begin **hands-only CPR**. Place the heel of one hand in the center of the chest, with your other hand on top. Push **hard and fast** at a rate of **100 to 120 compressions per minute**, pushing down about **2 inches** and letting the chest come back up fully each time. A song with a beat of about 110 beats per minute can help you keep the rhythm. Do not stop until help arrives, the person starts to move, or an AED is ready. When an AED arrives, **turn it on and follow its voice prompts**: attach the pads, make sure nobody is touching the person, and let it analyze. AEDs are designed for untrained people, and they will not shock someone who does not need it. For an adult who is **choking** and cannot speak or breathe, ask "Are you choking?", then give **abdominal thrusts** (and back blows as taught in your training), and call 911 if the object does not come out.

Other emergencies call for different actions. For **severe bleeding**, press firmly on the wound with a clean cloth, and add more cloth on top rather than removing it. For a **severe allergic reaction** (swelling, trouble breathing), use an **epinephrine auto-injector** if one is available and call 911. For a **seizure**, clear the area, protect the head, time the seizure, put nothing in the person's mouth, and call 911 if it lasts more than five minutes. For **heat stroke** (confusion, hot skin), call 911 and cool the person with water and shade. For **poisoning**, call **Poison Control at 1-800-222-1222**. Courses from the Red Cross or American Heart Association teach these skills with practice.

Emergencies are also influenced by judgment. **Alcohol and drugs** slow reaction time, impair judgment and lower inhibitions, so people take risks they would normally avoid. **Sleep loss** has similar effects: staying awake for 17 to 19 hours can impair performance about as much as a blood alcohol level of 0.05, and 24 hours without sleep about as much as 0.10, which is above the legal driving limit of 0.08. **Drowsy driving** causes many crashes. You can plan ahead: choose a **designated sober driver**, never ride with an impaired driver, call a trusted adult for a ride, and sleep before a long drive. Making the plan before you need it is much easier than making a decision when you are tired or impaired.
`,
  ],
  cards: [
    ["AED", "A device that can shock the heart back into a normal rhythm."],
    ["Hands-only CPR", "Chest compressions without rescue breaths."],
    ["Compression rate", "100 to 120 compressions per minute."],
    ["Abdominal thrusts", "Pushes below the ribs to clear a choking object."],
    ["Epinephrine", "A medicine for severe allergic reactions."],
    ["Poison Control", "A free helpline for poisoning: 1-800-222-1222."],
    ["Impairment", "Reduced ability to think or react well."],
    ["Drowsy driving", "Driving while very tired, which is dangerous."],
  ],
  closed: [
    [
      "What is the compression rate for hands-only CPR?",
      ["40 to 60 per minute", "60 to 80 per minute", "100 to 120 per minute", "200 per minute"],
      "C",
    ],
    [
      "About how deep should adult chest compressions be?",
      ["Half an inch", "1 inch", "2 inches", "5 inches"],
      "C",
    ],
    [
      "What should you do first if a person collapses?",
      ["Check the scene and then check the person, calling 911", "Give them water", "Move them", "Leave"],
      "A",
    ],
    [
      "Which is a danger of 24 hours without sleep?",
      ["Impairment similar to a blood alcohol level of about 0.10", "Better judgment", "Faster reflexes", "No effect"],
      "A",
    ],
    [
      "What should you do with an AED?",
      ["Turn it on and follow the voice prompts", "Hide it", "Wait a day", "Take out the battery"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "At a gym, an adult collapses, does not respond when you tap and shout, and is not breathing normally. List the steps you take in order, including calling for help and the AED, and describe how to do hands-only CPR, with the rate and depth.",
      scheme: [
        "Checks that the scene is safe and checks responsiveness",
        "Calls 911 (or directs someone to) and asks for an AED",
        "Describes hands-only CPR with the hand position in the center of the chest",
        "States the rate (100 to 120 a minute) and depth (about 2 inches), and says to continue until help or the AED arrives and follow its prompts",
      ],
      model:
        "I check that the scene is safe and tap and shout to see if the person responds. Then I call 911 or tell a specific person to call and to bring an AED. I start hands-only CPR, placing the heel of my hand in the center of the chest with my other hand on top. I push hard and fast at 100 to 120 compressions a minute, about 2 inches deep, letting the chest rise fully. I continue until help arrives, and when the AED arrives I turn it on and follow its voice prompts.",
      answers: [
        [
          "full",
          "[[0|First I check that the scene is safe, and tap and shout to check for a response.]] [[1|Then I call 911 or point to a specific person to call and bring an AED.]] [[2|I begin hands-only CPR with the heel of one hand in the center of the chest and the other hand on top.]] [[3|I push hard and fast, 100 to 120 a minute and about 2 inches deep, until help arrives, and use the AED by following its voice prompts.]]",
          "Full marks. The order and the numbers are exactly right.",
        ],
        [
          "full",
          "[[0|Make sure it's safe, then shake their shoulders and shout.]] [[1|When they don't respond, I send someone to call 911 and fetch the AED.]] [[2|I kneel beside them and put my hands, one on top of the other, on the center of their chest.]] [[3|I press down about 2 inches at 100 to 120 times a minute, to a song beat like 110, and let the chest rise between pushes, until help or the AED arrives.]]",
          "Full marks. Using a song beat is a good memory aid.",
        ],
        [
          "partial",
          "[[0|Check if they respond.]] [[2|Put hands on the chest.]] I would push gently at 20 times a minute and not call anyone.",
          "Push hard and fast, 100 to 120 per minute, and call 911 right away.",
        ],
        [
          "partial",
          "[[1|Call 911 and get the AED.]] [[3|Push about 2 inches deep at 100 to 120 a minute.]] I'd put my hands on the person's stomach.",
          "Place your hands in the center of the chest.",
          true,
        ],
        [
          "weak",
          "I would wait for a professional and do nothing until they arrive.",
          "Immediate CPR greatly improves survival. Start while help is on the way.",
        ],
        [
          "weak",
          "Give the person a glass of water to wake them up.",
          "A person who is not responding must not be given anything to drink. Call 911.",
        ],
      ],
    },
    {
      prompt:
        "A student has been awake for 20 hours studying for finals and is offered a ride home by a friend who has been drinking. A second friend says she'll drive herself home after studying all night. Explain how sleep loss and alcohol affect decisions and safety, why each choice is risky, and what plan the student could make instead.",
      scheme: [
        "Explains alcohol's effects on reaction time and judgment",
        "Explains the effects of sleep loss, such as impairment comparable to alcohol and drowsy driving",
        "Explains why both choices are risky",
        "Describes a safer plan, such as a sober driver, a call to a trusted adult or a ride service, or sleeping before driving",
      ],
      model:
        "Alcohol slows reaction time and impairs judgment. Being awake for about 20 hours impairs performance about as much as a blood alcohol level of 0.05 and increases the risk of drowsy driving. Riding with a friend who has been drinking, and driving after an all-nighter, are both risky, since both drivers have slow reactions and poor judgment. A safer plan is to call a parent or a trusted adult for a ride or use a ride service, pick a sober driver, and sleep before anyone drives.",
      answers: [
        [
          "full",
          "[[0|Alcohol slows reaction time and impairs judgment.]] [[1|Being awake for 20 hours impairs performance about as much as a blood alcohol level of 0.05, and drowsy driving causes many crashes.]] [[2|Both choices are risky because in both cases the driver has slow reactions and poor judgment.]] [[3|A safer plan is to call a parent or a ride service, pick a sober driver, and sleep before driving.]]",
          "Full marks. The two risks are compared and a plan is given.",
        ],
        [
          "full",
          "[[0|A driver who has been drinking reacts more slowly and takes risks they normally wouldn't.]] [[1|After about 20 hours awake, someone is impaired in a way that is similar to being slightly drunk, and may even fall asleep at the wheel.]] [[2|So riding with the first friend or letting the second drive herself are both dangerous.]] [[3|Plan: call a trusted adult for a ride, take a ride service, or nap and wait until the driver is rested and sober.]]",
          "Full marks. Naming a nap as an option is practical.",
        ],
        [
          "partial",
          "[[0|Alcohol slows reaction time.]] [[3|Call a parent.]] Sleep loss does not matter for driving, and the second friend is fine to drive.",
          "Sleep loss impairs driving and causes drowsy-driving crashes.",
        ],
        [
          "partial",
          "[[1|Being awake 20 hours impairs like alcohol.]] [[2|Both are risky.]] The friend who drank is fine because they only had a few drinks.",
          "Even a few drinks impair reaction time and judgment.",
          true,
        ],
        [
          "weak",
          "Both friends are safe drivers. I'd take the ride and not worry.",
          "Alcohol and sleep loss both impair driving. Make a safer plan.",
        ],
        [
          "weak",
          "Coffee will fix tiredness and drinking completely, so everyone can drive.",
          "Caffeine does not remove impairment from alcohol or severe sleep loss.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Managing health care and insurance, and eating well on a budget",
  note: `
## Objectives

Students will be able to:

1. make a plan for managing your health care and insurance as an adult;
2. describe the influences on healthy eating and plan a week of low-cost meals.

## Materials

Sample insurance card and summary (invented), a glossary of insurance terms, a cost calculator, grocery store ad prices (invented), a weekly meal planner, the quiz, problem set and worksheet.

## Starter (6 minutes)

Ask: "You wake up with a high fever at 11 p.m. in a new town. What do you do?" Collect: urgent care, emergency room, telemedicine, call a nurse line. Discuss how to decide.

## Main activity

1. Health insurance terms: premium (monthly payment), deductible (what you pay before insurance pays), copay (a fixed fee for a visit), coinsurance (a percentage you pay after the deductible), out-of-pocket maximum (the most you pay in a year), in-network (providers that have agreements with your plan; cheaper). Example: deductible $1,000, coinsurance 20 percent, bill $3,000: you pay $1,000 + 20% of $2,000 ($400) = $1,400 and the insurer pays $1,600. Options: stay on a parent's plan until age 26, a job's plan, school plan, or marketplace and Medicaid based on eligibility.
2. Managing care: find a primary care doctor; keep your insurance card and a list of medicines and allergies; know where urgent care and the nearest ER are; schedule yearly check-ups and vaccines; use preventive care that is often covered; keep records; question bills and ask for itemized statements.
3. Healthy eating influences: cost, time and cooking skill, culture and family traditions, food access (distance from a grocery store), advertising, peers, stress, and knowledge. Strategies: plan meals, buy staples (rice, beans, oats, eggs, frozen vegetables, bananas, canned tomatoes), compare unit prices, cook in batches. Example budget: $35 for 21 meals (3 meals x 7 days) is $35 / 21 = $1.67 per meal.

## Quiz

Insurance terms and costs; a low-cost week.
`,
  reading: [
    "Being your own health manager, and feeding yourself well for less",
    `
As an adult, you become the manager of your own health care. Most of what you need to know begins with **health insurance**, which helps to pay for medical care. Learn the key terms. The **premium** is the amount you pay each month to have insurance. The **deductible** is what you pay for care in a year before insurance begins to pay. A **copay** is a fixed fee for a service, such as a $25 doctor visit. **Coinsurance** is a percentage that you pay after you meet the deductible. The **out-of-pocket maximum** is the most you will pay in a year, after which the plan covers 100 percent of covered care. **In-network** providers have agreements with your plan and cost less than **out-of-network** providers. Here is an example: your deductible is $1,000, your coinsurance is 20 percent and you receive a $3,000 bill. You pay the first $1,000, plus 20 percent of the remaining $2,000, which is $400, so you pay $1,400 and the insurer pays $1,600.

Where does coverage come from? Many young adults can stay on a **parent's plan until age 26**. Others get insurance through a job, a college, the health insurance marketplace or Medicaid, depending on income and eligibility. When you choose, compare premiums with deductibles and check whether your doctors are in-network.

Good management also means habits. Find a **primary care doctor** so that you have someone who knows your history. Keep your **insurance card** and a list of your medicines and allergies where you can find them. Know where the nearest **urgent care** and **emergency room** are, and when to use each. Schedule yearly **check-ups** and keep your vaccines current, since many preventive services are covered. Keep your **records**, and if a bill seems wrong, ask for an itemized statement and call to question it.

Staying healthy also depends on what you eat, and many **influences** shape food choices: **cost**, **time** and cooking skill, **culture** and family traditions, **access** to grocery stores, advertising, friends, stress and knowledge. You cannot control all of them, but you can plan. Make a weekly **menu**, build meals around low-cost staples such as rice, beans, oats, eggs, frozen vegetables, bananas and canned tomatoes, compare **unit prices**, and **cook in batches** so that leftovers become lunches. A budget of $35 for the 21 meals of a week (3 meals x 7 days) is $35 / 21, about $1.67 per meal. Combining a grain, a protein and a vegetable at most meals provides a balanced diet at a low price.
`,
  ],
  cards: [
    ["Premium", "The monthly amount paid to have insurance."],
    ["Deductible", "What you pay in a year before insurance begins to pay."],
    ["Copay", "A fixed fee for a service."],
    ["Coinsurance", "The percentage you pay after the deductible."],
    ["Out-of-pocket maximum", "The most you pay in a year for covered care."],
    ["In-network", "Providers with agreements with your plan."],
    ["Preventive care", "Check-ups and vaccines that prevent illness."],
    ["Batch cooking", "Cooking a large amount to eat over several meals."],
  ],
  closed: [
    [
      "A deductible is $1,000, coinsurance is 20 percent, and the bill is $3,000. How much do you pay?",
      ["$600", "$1,000", "$1,400", "$3,000"],
      "C",
    ],
    [
      "Until what age can many young adults stay on a parent's health plan?",
      ["18", "21", "26", "35"],
      "C",
    ],
    [
      "$35 for 21 meals is about how much per meal?",
      ["$0.80", "$1.67", "$3.50", "$5.00"],
      "B",
    ],
    [
      "What is a copay?",
      ["A fixed fee for a service", "A monthly payment", "The yearly maximum", "A kind of vaccine"],
      "A",
    ],
    [
      "Which is a low-cost staple for balanced meals?",
      ["Beans", "Imported candy", "Energy drinks", "Take-out sushi"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A plan has a $1,500 deductible, 20 percent coinsurance and a $4,000 out-of-pocket maximum. You have an emergency room bill of $5,000. Calculate how much you pay and how much the insurer pays. Then list four steps for managing your health care as a new adult.",
      scheme: [
        "Calculates the amount after the deductible as $3,500 and 20 percent of it as $700",
        "Calculates your total as $2,200 and the insurer's share as $2,800",
        "Notes that $2,200 is below the $4,000 out-of-pocket maximum",
        "Lists four sensible management steps",
      ],
      model:
        "I pay the $1,500 deductible first. The remaining $3,500 has 20 percent coinsurance, which is $700. My total is $2,200 and the insurer pays $2,800. This is below the $4,000 out-of-pocket maximum, so it applies fully. Steps: find a primary care doctor, keep my insurance card and a list of my medicines, know where urgent care and the ER are, and schedule a yearly check-up.",
      answers: [
        [
          "full",
          "[[0|I pay the $1,500 deductible, then 20 percent of the remaining $3,500, which is $700.]] [[1|My total is $2,200 and the insurer pays $2,800.]] [[2|$2,200 is below the $4,000 out-of-pocket maximum, so the maximum doesn't change anything here.]] [[3|Steps: find a primary care doctor, keep my insurance card and medicine list, know where urgent care and the ER are, and schedule a yearly check-up.]]",
          "Full marks. All of the amounts and the steps are correct.",
        ],
        [
          "full",
          "[[0|$5,000 minus the $1,500 deductible is $3,500, and 20 percent of that is $700.]] [[1|So I pay $1,500 + $700 = $2,200, and the plan pays $2,800.]] [[2|I haven't reached the $4,000 maximum.]] [[3|To manage my care I'd choose a regular doctor, keep records and my card, learn which clinics are in-network, and get my vaccines on time.]]",
          "Full marks. Checking the maximum is an important step.",
        ],
        [
          "partial",
          "[[0|The remainder after the deductible is $3,500.]] [[3|Keep my insurance card and get a check-up.]] I pay 20 percent of $5,000, which is $1,000, and the insurer pays the rest.",
          "You pay the deductible first, then coinsurance on the remainder: $1,500 + $700.",
        ],
        [
          "partial",
          "[[1|I pay $2,200.]] [[2|It is below the maximum.]] The insurer pays $5,000 because I have insurance.",
          "The insurer pays only $2,800 after your deductible and coinsurance.",
          true,
        ],
        [
          "weak",
          "I pay nothing, because insurance covers everything.",
          "Insurance has costs: a deductible and coinsurance.",
        ],
        [
          "weak",
          "The out-of-pocket maximum is how much the insurer pays.",
          "It is the most you pay in a year.",
        ],
      ],
    },
    {
      prompt:
        "Plan a week of low-cost meals for one person on a $35 budget (21 meals). Name staple foods, show how you balance a grain, a protein and a vegetable, estimate costs that total no more than $35, and state the cost per meal. Then explain two influences that make healthy eating harder and how you would handle each.",
      scheme: [
        "Names staples that fit a balanced diet (grain, protein, vegetable)",
        "Shows estimated costs for at least four items that total $35 or less",
        "States the cost per meal correctly",
        "Explains two influences on food choices and a way to handle each",
      ],
      model:
        "Staples: rice $4, dried beans $3, oats $4, eggs $5, frozen vegetables $6, bananas $3, canned tomatoes $4 and peanut butter $4, for a total of $33. That is 33 divided by 21, about $1.57 per meal. Each dinner combines rice, beans or eggs, and a vegetable. Influences: time and cooking skill, which I handle by batch cooking on Sunday; and advertising for fast food, which I handle by making a shopping list and sticking to it.",
      answers: [
        [
          "full",
          "[[0|Staples: rice, dried beans, oats, eggs, frozen vegetables, bananas, canned tomatoes and peanut butter, with a grain, a protein and a vegetable at most meals.]] [[1|Costs: rice $4, beans $3, oats $4, eggs $5, vegetables $6, bananas $3, tomatoes $4, peanut butter $4, which totals $33.]] [[2|$33 ÷ 21 is about $1.57 per meal.]] [[3|Time and cooking skill is an influence, so I'd batch cook on Sunday; fast-food ads are another, so I'd stick to a shopping list.]]",
          "Full marks. The total is within budget and the arithmetic is right.",
        ],
        [
          "full",
          "[[0|I'd build meals from rice, lentils, eggs, oats and frozen broccoli and carrots so that every dinner has a grain, a protein and a vegetable.]] [[1|Rice $3, lentils $3, eggs $5, oats $4, frozen vegetables $7, bananas $3, bread $3, peanut butter $4, which is $32.]] [[2|$32 divided by 21 is $1.52 a meal.]] [[3|Cost and distance to a grocery store can make healthy eating hard, so I'd compare unit prices and stock up on staples; stress also leads to take-out, so I'd keep easy meals like eggs and rice ready.]]",
          "Full marks. Lentils are a cheap protein, and the plan stays under $35.",
        ],
        [
          "partial",
          "[[0|Rice, beans and vegetables.]] [[3|Advertising is an influence.]] The cost is $35 per meal. I don't need to make a plan for a budget.",
          "$35 is for the whole week of 21 meals, about $1.67 per meal.",
        ],
        [
          "partial",
          "[[1|Rice $4, beans $3, eggs $5, vegetables $6, oats $4 total $22.]] [[2|That is about $1 a meal.]] I will eat only candy because it is cheap.",
          "A balanced diet needs a grain, a protein and a vegetable.",
          true,
        ],
        [
          "weak",
          "Healthy eating always costs more than $35 a week, so it's impossible.",
          "Staples such as beans, rice and frozen vegetables make healthy eating possible on a small budget.",
        ],
        [
          "weak",
          "I'd eat out for every meal because it saves time.",
          "Eating out for all meals costs far more than a $35 week.",
        ],
      ],
    },
  ],
};

writeCourse(
  "physical-education-12-grade-12.json",
  "Physical Education 12",
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
