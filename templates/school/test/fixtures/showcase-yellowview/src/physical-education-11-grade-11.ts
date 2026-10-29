import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Physical Education 11, Grade 11, Quarter 1. Standards: SHAPE America
 * National Standards for K-12 Physical Education, with two Health Education
 * weeks, in the school's own words. The year moves from following a plan to
 * writing one: strength programs, energy systems and a 5K, lifetime sports,
 * strategy and video review, leadership, barriers, and health literacy.
 * No practical write-ups.
 */

const w1: WeekInput = {
  topic: "Writing a strength program, and lifting safely",
  note: `
## Objectives

Students will be able to:

1. review fitness assessment data and write a plan to address a weakness;
2. design a strength training program using appropriate exercises, sets and repetitions;
3. explain safe lifting technique and spotting.

## Materials

Last year's assessment records, program templates, light dumbbells and bars (or body weight), a squat rack with safety bars for demonstration, calculators, the quiz, problem set and worksheet.

## Starter (6 minutes)

Ask: "Why might two students do the same exercise and get different results?" Collect: load, repetitions, sets, rest, nutrition, sleep, technique.

## Main activity

1. Data to plan: find the weakest component from your results, set a measurable goal, choose exercises that train it.
2. Program design: choose exercises for all major muscle groups (legs, chest, back, shoulders, arms, core); pair push and pull; order big lifts first. Repetition ranges: about 1 to 6 for maximal strength, 8 to 12 for muscle size and strength, 12 or more for muscular endurance; 2 to 4 sets; rest 1 to 3 minutes between sets; train each muscle group 2 or 3 days a week with a day of rest in between.
3. Load: estimate a one-repetition maximum (1RM) without a max lift using the Epley formula: weight x (1 + repetitions / 30). Example: 100 lb for 8 reps gives 100 x 1.267 = 127 lb. A working weight at 70 percent is about 89 lb. Volume = sets x reps x weight: 3 x 10 x 80 lb = 2,400 lb.
4. Safe lifting: warm up; learn the movement with a light load; neutral spine; controlled tempo; breathe out on effort; use collars on bars; keep the area clear; never lift alone with heavy loads; do not sacrifice form for weight. Spotting: agree on signals and the number of repetitions, communicate, keep hands ready near the bar (not touching unless needed), help the lifter re-rack.

## Quiz

Program design and safety.
`,
  reading: [
    "From weakness to a plan, and lifting without getting hurt",
    `
Last year you tested your fitness and set goals. This year you take on the role of the planner. Start with your **data**: which component of fitness is weakest compared with the healthy range, and what are the reasons? If upper-body strength is low, then you need a **strength program**. A good plan names a **measurable goal**, picks **exercises** that train it, sets the **load**, and decides how progress will be recorded.

A balanced program includes exercises for all major muscle groups: legs (squats, lunges), chest (push-ups, bench press), back (rows, pull-ups), shoulders (overhead press), arms and the core (planks). Pair **push** and **pull** movements so that opposing muscles develop equally, and put the large, demanding lifts early in the session when you are fresh. How many repetitions you choose depends on your aim. About **1 to 6** repetitions with heavy loads builds maximal strength, **8 to 12** repetitions builds both size and strength, and **12 or more** with lighter loads improves muscular endurance. Most beginners do **2 to 4 sets** of each exercise, rest **1 to 3 minutes** between sets, and train each muscle group **2 or 3 days a week**, with a day of rest between, since muscles grow stronger during recovery.

How heavy should the weight be? A one-repetition maximum (1RM), the most you can lift once, is risky to test. Instead, you can estimate it with the **Epley formula**: 1RM = weight x (1 + repetitions / 30). If you lifted 100 pounds for 8 repetitions, the estimate is 100 x (1 + 8/30) = 100 x 1.267, or about 127 pounds. A working weight for building strength might be 70 percent of that: 0.70 x 127 = about 89 pounds. To track your **training volume**, multiply sets x repetitions x weight. Three sets of 10 repetitions at 80 pounds is 3 x 10 x 80 = 2,400 pounds. Increase the volume gradually, about 5 to 10 percent a week, to apply progressive overload.

**Safe lifting** keeps you training for years. Warm up first. Learn each movement with a light load until the form is correct. Keep your back in a **neutral spine** and move with control, not by jerking. Breathe out as you push or pull and in as you return. Fasten **collars** on bars so plates cannot slide, keep the floor clear, and never lift heavy loads alone. Do not let ego pick the weight; failing form is a signal to stop. A **spotter** helps with heavy lifts such as the bench press and squat. Before the set, agree on how many repetitions and what signal means "help." During the lift, keep your hands near the bar without touching it unless the lifter needs help, and help to re-rack the bar. Good communication prevents most accidents.
`,
  ],
  cards: [
    ["Strength program", "A written plan of exercises, sets, repetitions and progress."],
    ["Repetition range", "The number of reps chosen to match a goal."],
    ["Epley formula", "1RM estimate: weight x (1 + repetitions / 30)."],
    ["One-repetition maximum", "The most weight you can lift once."],
    ["Training volume", "Sets x repetitions x weight."],
    ["Neutral spine", "The natural, straight alignment of the back."],
    ["Spotter", "A partner who helps keep a lifter safe."],
    ["Push-pull pairing", "Training opposing muscle groups for balance."],
  ],
  closed: [
    [
      "Which repetition range best builds muscular endurance?",
      ["1 to 3", "4 to 6", "8 to 10", "12 or more"],
      "D",
    ],
    [
      "What is the volume of 3 sets of 10 repetitions at 80 pounds?",
      ["240 pounds", "800 pounds", "2,400 pounds", "24,000 pounds"],
      "C",
    ],
    [
      "What should a lifter and spotter agree on before a set?",
      ["The number of repetitions and a signal for help", "Who wins", "The music", "The time of the next class"],
      "A",
    ],
    [
      "Why pair push and pull exercises?",
      ["To develop opposing muscles evenly", "To save time only", "To avoid warm-up", "To lift heavier"],
      "A",
    ],
    [
      "What is a safe response when form breaks down?",
      ["Stop or lower the weight", "Add more weight", "Hold your breath", "Lift faster"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A student lifted 90 pounds for 6 repetitions on the bench press. Estimate her one-repetition maximum with the Epley formula, calculate a working weight at 70 percent of that, and calculate the volume of 3 sets of 8 repetitions at 85 pounds. Explain why estimating is safer than testing a true maximum.",
      scheme: [
        "Estimates the 1RM as 90 x 1.2 = 108 pounds",
        "Calculates 70 percent as about 76 pounds",
        "Calculates the volume as 3 x 8 x 85 = 2,040 pounds",
        "Explains that a true maximum is risky, with a high injury risk without a skilled spotter",
      ],
      model:
        "Using the formula, 90 times (1 plus 6 divided by 30) is 90 times 1.2, which is 108 pounds. Seventy percent of 108 is about 76 pounds. The volume of 3 sets of 8 repetitions at 85 pounds is 3 times 8 times 85, which is 2,040 pounds. Estimating is safer because a true one-repetition maximum puts the greatest possible load on the joints and muscles, which raises the risk of injury, especially without an experienced spotter.",
      answers: [
        [
          "full",
          "[[0|1RM ≈ 90 × (1 + 6/30) = 90 × 1.2 = 108 pounds.]] [[1|70 percent of 108 is about 76 pounds.]] [[2|Volume is 3 × 8 × 85 = 2,040 pounds.]] [[3|Estimating is safer because a true max puts the greatest possible load on the joints and muscles, which raises injury risk, especially without a skilled spotter.]]",
          "Full marks. Every figure is right and the safety reason is clear.",
        ],
        [
          "full",
          "[[0|The estimate is 90 × 1.2 = 108 pounds.]] [[1|A 70 percent working weight is 0.70 × 108 = 75.6, so about 76 pounds.]] [[2|Three sets of eight at 85 pounds is 2,040 pounds of volume.]] [[3|Trying a real max risks a strain or a dropped bar, so estimating from a lighter set is the safer way.]]",
          "Full marks. Rounding 75.6 to 76 is sensible.",
        ],
        [
          "partial",
          "[[0|The estimate is 108 pounds.]] [[3|Max lifts are risky.]] 70 percent of 108 is 108 - 70, which is 38 pounds. The volume is 3 + 8 + 85, which is 96.",
          "70 percent means 0.70 times 108. And volume multiplies sets, repetitions and weight.",
        ],
        [
          "partial",
          "[[1|About 76 pounds.]] [[2|The volume is 2,040.]] The estimate is 90 + 6, which is 96 pounds.",
          "The Epley formula is weight times (1 plus repetitions divided by 30).",
          true,
        ],
        [
          "weak",
          "She should lift as much as she can right away to find out. Estimating is a waste of time.",
          "A true maximum is risky. Estimating from a lighter set is safer.",
        ],
        [
          "weak",
          "The volume is the number of people in the weight room.",
          "Volume is sets times repetitions times weight lifted.",
        ],
      ],
    },
    {
      prompt:
        "A student's assessment shows strong endurance but weak upper-body pulling strength. Write a three-day-a-week program for four weeks: choose at least four exercises (with push and pull balance), the sets and repetitions, the rest, and how you will progress. Then explain three safe-lifting rules you will follow, including the role of a spotter.",
      scheme: [
        "Chooses at least four exercises with push and pull balance that target the weakness",
        "States sets, repetitions, rest and days with recovery between sessions",
        "Describes progression with a small, specific weekly increase",
        "Explains three safe-lifting rules including a spotter's role",
      ],
      model:
        "Monday, Wednesday and Friday: band or dumbbell rows, lat pulldowns or assisted pull-ups, push-ups, overhead press and planks. Three sets of 8 to 10 repetitions each with 90 seconds of rest, and rest days in between. Each week I add one repetition per set or about 5 percent more weight. Safety rules: warm up and keep a neutral spine, use collars and clear the area, and never lift heavy alone. A spotter agrees on the number of repetitions and a signal, stays ready near the bar and helps re-rack it.",
      answers: [
        [
          "full",
          "[[0|Exercises: dumbbell rows, assisted pull-ups, push-ups, overhead press and planks, so pull is emphasized and push is balanced.]] [[1|Monday, Wednesday and Friday, three sets of 8 to 10, resting 90 seconds, with recovery days between.]] [[2|Each week I add one repetition per set or about 5 percent more weight.]] [[3|I'll warm up and keep a neutral spine, use collars and a clear area, and a spotter will agree on the reps and a help signal and keep hands ready near the bar.]]",
          "Full marks. The plan targets the weakness and is safe.",
        ],
        [
          "full",
          "[[0|Seated cable rows, lat pulldowns, face pulls and push-ups, so I pull twice as often as I push to fix the weakness.]] [[1|Three days a week, three sets of 10 with 60 to 90 seconds' rest, and no lifting on the days in between.]] [[2|When I can do all 10 reps with good form, I add 5 pounds the next week.]] [[3|My rules: warm up first, never sacrifice form for weight, and use a spotter who knows my rep count and hand signal.]]",
          "Full marks. Adding weight only after good form is a safe rule.",
        ],
        [
          "partial",
          "[[0|Rows, pulldowns, push-ups and presses.]] [[2|Add weight each week.]] I'd lift every day and never use a spotter, and I'd lift as heavy as I can.",
          "Muscles need recovery, and spotters help prevent accidents. Plan rest days and safe rules.",
        ],
        [
          "partial",
          "[[1|Three sets of 8 to 10 on Monday, Wednesday and Friday.]] [[3|A spotter helps.]] I would only do push exercises because they are more fun.",
          "The weakness is in pulling strength, so include pulling exercises.",
          true,
        ],
        [
          "weak",
          "I do not need a program. I will just lift whatever feels good that day.",
          "A program makes progress measurable and balanced.",
        ],
        [
          "weak",
          "Safety rules are for beginners. Strong people can ignore them.",
          "Everyone benefits from safe lifting rules, especially with heavy loads.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Energy systems and planning a 5K week",
  note: `
## Objectives

Students will be able to:

1. explain how aerobic and anaerobic energy systems support different kinds of activity;
2. plan a week of training for a 5K run or similar event.

## Materials

Stopwatches, a measured track, pace charts, a training-week template, calculators, the problem set and worksheet.

## Starter (6 minutes)

Run a 10-second all-out sprint, then ask students to jog an easy 3 minutes. Ask: "Why could you sprint for 10 seconds but not for 10 minutes?" Introduce energy.

## Main activity

1. Energy: muscles use ATP (adenosine triphosphate). Three systems resupply it. Phosphocreatine (ATP-PC) system: immediate, powerful, lasts about 10 seconds (a 100 m sprint, a jump, a heavy lift). Anaerobic glycolysis: uses stored carbohydrate without oxygen, lasts from about 10 seconds to 2 minutes (a 400 m sprint), and produces byproducts that contribute to a burning feeling. Aerobic system: uses oxygen with carbohydrate and fat, supplies energy for activity longer than a couple of minutes at a steady pace (a 5K). In real activities, all three work together, with different shares.
2. A 5K is 5 kilometers, about 3.1 miles (3.107). Pace: time divided by distance. For a 30:00 finish, pace is 30 / 3.107 = 9.66 minutes, about 9:39 per mile.
3. A training week for a beginner: Monday easy 3 miles; Tuesday intervals (warm-up, 6 x 400 m fast with jog recovery, cool-down), about 3 miles total; Wednesday rest or cross-training; Thursday tempo (steady, comfortably hard) 3 miles; Friday rest; Saturday long run 4 miles; Sunday easy 2 miles. Total: 15 miles. Increase weekly volume by no more than about 10 percent: 16.5 miles the next week. Include a taper before race day (reduce volume for the last week), good sleep, hydration and food.

## Problem set

Compute paces and mileage; plan a week.
`,
  reading: [
    "Where the energy comes from, and training for a 5K",
    `
Every movement is powered by a molecule called **ATP** (adenosine triphosphate). Muscles store only enough for a few seconds of work, so they must constantly make more. The body has three energy systems for doing so, and each is best suited to a different kind of effort.

The **phosphocreatine system** (ATP-PC) is immediate and powerful. It uses a compound stored in the muscles and can supply energy for about **10 seconds**. A 100-meter sprint, a vertical jump or a single heavy lift relies on it. The **anaerobic glycolytic system** breaks down stored carbohydrate **without oxygen**. It provides energy for efforts lasting from about 10 seconds to **2 minutes**, such as a 400-meter sprint. It leads to byproducts that contribute to the burning feeling in tired muscles, which forces you to slow down. The **aerobic system** uses **oxygen** to break down carbohydrate and fat, and can supply energy for hours at a steady pace. It powers a 5K run, a long swim or a hike. In real life, no system works alone: all three are active at all times, but the share changes with the effort. A soccer player uses the aerobic system for the game's endurance, the anaerobic systems for sprints, and the phosphocreatine system for the explosive moment when the player strikes the ball.

A 5K race is 5 kilometers, which is about **3.1 miles** (3.107). **Pace** is the time per unit of distance: time divided by distance. If your goal is to finish in 30:00, your pace is 30 / 3.107 = 9.66 minutes per mile, or about 9:39. Knowing your goal pace helps you run evenly instead of starting too fast.

A beginner's training week balances work and recovery. For example: **Monday**, easy run, 3 miles. **Tuesday**, interval session: a warm-up, six repeats of 400 meters fast with a jog between, and a cool-down, about 3 miles in total. **Wednesday**, rest or cross-training such as cycling. **Thursday**, **tempo run**, 3 miles at a steady, comfortably hard pace. **Friday**, rest. **Saturday**, **long run**, 4 miles at an easy pace. **Sunday**, easy 2 miles. The week totals 3 + 3 + 3 + 4 + 2 = 15 miles. Increase total weekly distance by no more than about **10 percent** each week, so 15 miles becomes 16.5 miles. In the final week before the race, **taper**: reduce the distance so your legs are fresh. Throughout, sleep well, drink water and eat enough carbohydrate and protein to support your training.
`,
  ],
  cards: [
    ["ATP", "The molecule that supplies energy for muscle work."],
    ["Phosphocreatine system", "Immediate energy lasting about 10 seconds."],
    ["Anaerobic glycolysis", "Energy from carbohydrate without oxygen for up to about 2 minutes."],
    ["Aerobic system", "Energy using oxygen for longer, steady effort."],
    ["Pace", "Time per unit of distance."],
    ["Interval training", "Fast efforts alternated with recovery."],
    ["Tempo run", "A steady, comfortably hard run."],
    ["Taper", "Reducing training before an event to be fresh."],
  ],
  closed: [
    [
      "Which energy system mainly powers a 100-meter sprint?",
      ["Aerobic", "Phosphocreatine", "Fat only", "Protein only"],
      "B",
    ],
    [
      "Which system provides energy for a 5K run?",
      ["Phosphocreatine", "Aerobic", "Neither", "Only glycolysis"],
      "B",
    ],
    [
      "A 5K is about how many miles?",
      ["1.1", "2.1", "3.1", "5.0"],
      "C",
    ],
    [
      "Training of 15 miles a week rises by 10 percent. What is the new total?",
      ["16.0", "16.5", "17.0", "25.0"],
      "B",
    ],
    [
      "What is a taper?",
      ["Reducing training before a race", "Doubling mileage", "Skipping sleep", "A type of shoe"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Match each activity to the energy system that mainly supports it and explain why: (a) a 100 m sprint, (b) a 400 m race, (c) a 5K run. Then explain why a soccer game uses all three systems.",
      scheme: [
        "Matches the 100 m sprint to the phosphocreatine system and explains it lasts about 10 seconds",
        "Matches the 400 m race to anaerobic glycolysis and explains the 10 seconds to 2 minutes range",
        "Matches the 5K to the aerobic system and explains the use of oxygen for longer steady effort",
        "Explains that in soccer the aerobic system covers the game and the other two cover sprints and explosive actions",
      ],
      model:
        "A 100 m sprint mainly uses the phosphocreatine system because it lasts about 10 seconds and needs immediate, powerful energy. A 400 m race lasts under about 2 minutes and mainly uses anaerobic glycolysis. A 5K lasts many minutes at a steady pace, so the aerobic system with oxygen supports it. Soccer uses all three: the aerobic system for the endurance of 90 minutes, the anaerobic systems for repeated sprints, and the phosphocreatine system for explosive moments such as a shot or a jump.",
      answers: [
        [
          "full",
          "[[0|(a) The 100 m sprint is mostly phosphocreatine, because it needs immediate, powerful energy for about 10 seconds.]] [[1|(b) The 400 m is mostly anaerobic glycolysis, which covers about 10 seconds to 2 minutes without oxygen.]] [[2|(c) The 5K is mainly aerobic, since it lasts many minutes and uses oxygen at a steady pace.]] [[3|In soccer the aerobic system supports the 90 minutes, the anaerobic systems fuel sprints, and phosphocreatine powers explosive moments like a shot or a jump.]]",
          "Full marks. All three matches and the soccer example are correct.",
        ],
        [
          "full",
          "[[0|A 100 m sprint is the ATP-PC system; it's over in about ten seconds and needs power right away.]] [[1|The 400 m is glycolytic because it's too long for ATP-PC but too short and intense for aerobic, taking under two minutes.]] [[2|The 5K is aerobic, with oxygen, carbohydrate and fat supplying energy for a long steady effort.]] [[3|A soccer player uses all three at different moments: jogging, repeated sprints and explosive kicks.]]",
          "Full marks. The reasoning for the 400 m is well put.",
        ],
        [
          "partial",
          "[[0|The sprint is phosphocreatine.]] [[2|The 5K is aerobic.]] The 400 m is aerobic too, since it is a race. Soccer only uses the aerobic system.",
          "A 400 m lasts under about 2 minutes, which relies heavily on anaerobic glycolysis. Soccer uses all three.",
        ],
        [
          "partial",
          "[[1|The 400 m uses glycolysis.]] [[3|Soccer uses all three systems.]] The 100 m sprint is aerobic because you breathe.",
          "A 100 m sprint lasts about 10 seconds, so phosphocreatine supplies the energy.",
          true,
        ],
        [
          "weak",
          "All activities use the same energy and there are no differences.",
          "The three systems supply energy in different ways and for different durations.",
        ],
        [
          "weak",
          "Energy systems are about electricity, so they do not apply to the body.",
          "Energy systems describe how muscles make ATP.",
        ],
      ],
    },
    {
      prompt:
        "A beginner wants to run a 5K in 31:00. Calculate the target pace per mile (using 3.107 miles, to the nearest second), and plan one training week with at least five sessions, giving distances, one interval session, one long run, a taper plan for the week before the race, and the total mileage. Explain the 10 percent rule.",
      scheme: [
        "Calculates the pace as about 9:59 per mile (31 divided by 3.107 is 9.98 minutes)",
        "Lists at least five sessions with types and distances including an interval session and a long run",
        "States a correct total mileage that matches the listed sessions",
        "Explains the 10 percent rule and the taper",
      ],
      model:
        "31 minutes divided by 3.107 miles is 9.98 minutes, which is about 9:59 per mile. Week: Monday easy 3 miles; Tuesday intervals, 6 times 400 m with a warm-up and cool-down, 3 miles; Thursday tempo 3 miles; Saturday long run 4 miles; Sunday easy 2 miles. Total: 3 + 3 + 3 + 4 + 2 = 15 miles. The 10 percent rule says to raise the weekly mileage by no more than about 10 percent to avoid injury. In the week before the race I would taper, cutting the mileage so that my legs are fresh.",
      answers: [
        [
          "full",
          "[[0|31 ÷ 3.107 = 9.98 minutes, so about 9:59 per mile.]] [[1|Monday easy 3, Tuesday intervals (6 × 400 m with warm-up and cool-down, 3 miles in all), Thursday tempo 3, Saturday long run 4, Sunday easy 2.]] [[2|That totals 15 miles.]] [[3|The 10 percent rule limits weekly increases to avoid injury, and the week before the race I'd taper, cutting mileage to keep my legs fresh.]]",
          "Full marks. The week adds up, and the rule and the taper are explained.",
        ],
        [
          "full",
          "[[0|My target pace is roughly 10:00 per mile, since 31 minutes ÷ 3.1 miles is about 10.]] [[1|Plan: Mon 3 easy, Tue 6 × 400 m intervals (3 total), Thu 3 tempo, Sat 4 long, Sun 2 easy.]] [[2|Total mileage is 3 + 3 + 3 + 4 + 2 = 15.]] [[3|I'd raise the next week by no more than 10 percent, to 16.5, and cut back before race day to taper.]]",
          "Full marks. Rounding the pace to about 10:00 is acceptable.",
        ],
        [
          "partial",
          "[[0|The pace is 31 ÷ 5 = 6:12 per mile.]] [[1|Monday 3 miles, Wednesday intervals, Saturday long run 4 miles, Sunday 2, Friday 3.]] [[2|Total 15.]] I'd train hard all week with no taper.",
          "The 5K is 3.1 miles, not 5 miles. Also include a taper before the race.",
        ],
        [
          "partial",
          "[[2|15 miles total.]] [[3|The 10 percent rule prevents injury.]] The pace is 31 + 3.1, which is 34.1 minutes per mile.",
          "Pace is the time divided by the distance: 31 divided by 3.107.",
          true,
        ],
        [
          "weak",
          "I'll just run every day as fast as I can until the race.",
          "A plan balances hard days, easy days and rest.",
        ],
        [
          "weak",
          "The 10 percent rule means to run 10 percent of the race distance, which is 0.3 miles.",
          "The rule limits the weekly increase in training to about 10 percent.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Retesting, and lifetime sports: tennis, golf and bowling",
  note: `
## Objectives

Students will be able to:

1. carry out a personal fitness test again and compare with your baseline;
2. demonstrate competent skills in at least two lifetime activities, such as tennis, golf or bowling.

## Materials

Baseline sheets, stopwatches, racquets and balls, plastic golf clubs and balls, bowling lanes or a simulated setup, score sheets, the worksheet.

## Starter (6 minutes)

Ask: "What is the longest you could keep playing this sport: till 30, 50, 80?" Rank tennis, golf, bowling, football, swimming. Introduce the idea of a sport you can play for life.

## Main activity

1. Retest: repeat the quarter's baseline under the same conditions, compute change and percent change, reflect on the goal.
2. Tennis: grip (continental or eastern forehand), ready position, forehand and backhand (turn sideways, swing low to high, contact in front, follow through), serve (toss, reach, contact, follow through). Scoring: points 0, 15, 30, 40, game; at 40-40 it is deuce and a player must win two points in a row; first to 6 games (with a lead of 2) wins a set.
3. Golf: grip, stance, swing (backswing, downswing, follow through), putting. Scoring: strokes per hole relative to par: birdie (1 under), par, bogey (1 over), eagle (2 under); lowest total wins. A par-72 course played in 90 strokes is 18 over.
4. Bowling: ten frames; a strike (all ten pins on the first roll) scores 10 plus the next two rolls; a spare (all ten pins with two rolls) scores 10 plus the next roll; an open frame scores the pins knocked down. Example: strike, then 7 and 2: frame 1 = 10 + 7 + 2 = 19; frame 2 = 9; running total 28. Safety and etiquette in each sport.

## Worksheet

Compare results and practice scoring.
`,
  reading: [
    "A second look at fitness, and sports for a lifetime",
    `
This week begins with a repeat of your fitness tests. As before, compare under the **same conditions**: the same tests in the same order, with a similar warm-up. Work out the **change** and **percent change** for each, and note what helped and what held you back. Then ask a sharper question than last year: *Did my program work as I designed it?* If not, which part of the plan should change?

The rest of the week introduces three **lifetime sports**, which are activities you can enjoy for decades.

In **tennis**, the key strokes are the **forehand**, **backhand** and **serve**. Stand in a ready position with knees bent, turn sideways as the ball approaches, swing from low to high, make contact in front of your body and follow through across it. For the serve, toss the ball up, reach for it and hit it with a full extension. Scoring uses an unusual count: 0 is "love," then 15, 30, 40, and the fourth point wins the **game**. If both players reach 40, it is **deuce**, and a player must win two points in a row to win the game. The first to win six games, with a lead of at least two, wins the **set**.

In **golf**, the goal is to hit the ball into each hole using the fewest strokes. Use a relaxed **grip**, a balanced **stance** with feet shoulder-width apart, and a smooth swing: backswing, downswing and follow-through, while keeping your head still. Each hole has a **par**, the number of strokes an expert is expected to need. A score one stroke under par is a **birdie**, two under is an **eagle**, and one over is a **bogey**. The lowest total wins. A course with a par of 72 played in 90 strokes is 18 over par. Golf etiquette is important: stay quiet when others are hitting, repair divots, and keep pace with the group ahead.

In **bowling**, a game has ten **frames**. In each, a player gets up to two rolls to knock down ten pins. A **strike** (all ten pins on the first roll) scores 10 plus the pins knocked down by the next two rolls. A **spare** (all ten pins in two rolls) scores 10 plus the next roll. An **open frame** scores only the pins knocked down. Suppose you roll a strike, then a 7 and a 2. Frame one is 10 + 7 + 2 = 19, frame two is 7 + 2 = 9, and the running total is 28. Learning to score yourself makes the game more fun, and helps keep the game honest.
`,
  ],
  cards: [
    ["Deuce", "A tennis score of 40-40."],
    ["Set", "A group of games in tennis; first to six wins, by two."],
    ["Par", "The number of strokes an expert is expected to need on a golf hole."],
    ["Birdie", "A golf score of one stroke under par."],
    ["Bogey", "A golf score of one stroke over par."],
    ["Strike", "Knocking down all ten pins with the first roll."],
    ["Spare", "Knocking down all ten pins with two rolls."],
    ["Frame", "One of the ten turns in a game of bowling."],
  ],
  closed: [
    [
      "In bowling, a strike scores 10 plus:",
      ["Nothing", "The next roll", "The next two rolls", "The previous frame"],
      "C",
    ],
    [
      "A golfer takes 3 strokes on a par 4 hole. What is the score called?",
      ["Bogey", "Par", "Birdie", "Eagle"],
      "C",
    ],
    [
      "In tennis, what is the score called when both players have 40?",
      ["Love", "Deuce", "Set", "Match"],
      "B",
    ],
    [
      "A strike, then 7 and 2: what is frame one worth?",
      ["9", "10", "19", "29"],
      "C",
    ],
    [
      "A par-72 course is played in 90 strokes. How far over par is that?",
      ["9", "12", "18", "72"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Score this start to a bowling game: Frame 1: a strike. Frame 2: 7 then 2. Frame 3: a spare (6 then 4). Frame 4: 5 then 3. Give the score for each frame and the running total after four frames, explaining how strikes and spares are scored.",
      scheme: [
        "Explains that a strike scores 10 plus the next two rolls and a spare scores 10 plus the next roll",
        "Scores frame 1 as 19 and frame 2 as 9 (running total 28)",
        "Scores frame 3 as 15 (10 plus the 5 on the next roll) with running total 43",
        "Scores frame 4 as 8 for a running total of 51",
      ],
      model:
        "A strike scores 10 plus the next two rolls, and a spare scores 10 plus the next roll. Frame 1 is 10 + 7 + 2 = 19. Frame 2 is 9, so the running total is 28. Frame 3 is a spare, so 10 + 5 (the next roll) = 15, giving 43. Frame 4 is 5 + 3 = 8, so the total after four frames is 51.",
      answers: [
        [
          "full",
          "[[0|A strike is 10 plus the next two rolls, and a spare is 10 plus the next roll.]] [[1|Frame 1 is 10 + 7 + 2 = 19, and frame 2 is 9, which makes 28.]] [[2|Frame 3 is a spare, so 10 + 5 = 15, bringing the total to 43.]] [[3|Frame 4 is 5 + 3 = 8, so the total after four frames is 51.]]",
          "Full marks. Each frame is scored using the right bonus.",
        ],
        [
          "full",
          "[[0|Strikes add the next two rolls; spares add the next roll.]] [[1|After frame 1 (19) and frame 2 (9), the running score is 28.]] [[2|The spare in frame 3 uses the 5 from frame 4 as its bonus, so it's worth 15 and the total is 43.]] [[3|The open frame 4 is 8, for a running total of 51.]]",
          "Full marks. Using frame 4's first roll as the spare's bonus is correct.",
        ],
        [
          "partial",
          "[[0|A strike scores 10 and a spare scores 10.]] [[3|Frame 4 is 8.]] Frame 1 is 10, frame 2 is 9, frame 3 is 10, so the total is 37.",
          "Strikes and spares earn bonuses from later rolls. Frame 1 is 19 and frame 3 is 15.",
        ],
        [
          "partial",
          "[[1|Frame 1 is 19 and frame 2 is 9.]] [[2|Frame 3 is 15.]] The running total after four frames is 28 + 15 + 8, which is 43.",
          "28 plus 15 is 43 after frame 3, and adding frame 4's 8 gives 51.",
          true,
        ],
        [
          "weak",
          "You just add up the pins you knock down in each frame. Strikes have no bonus.",
          "A strike earns 10 plus the next two rolls, and a spare earns 10 plus the next roll.",
        ],
        [
          "weak",
          "The score of a game of bowling is the number of frames, 10.",
          "A bowling score is the total of all frame scores, up to 300.",
        ],
      ],
    },
    {
      prompt:
        "Choose two of tennis, golf and bowling and, for each, describe two key technique cues and how the sport is scored. Then explain why these are called lifetime activities and name one safety or etiquette habit for each sport you chose.",
      scheme: [
        "Gives two accurate technique cues for the first sport",
        "Gives two accurate technique cues for the second sport",
        "Describes the scoring of both sports accurately",
        "Explains lifetime activity and gives a safety or etiquette habit for each sport",
      ],
      model:
        "Tennis: turn sideways and swing low to high, making contact in front of the body. Scoring goes 15, 30, 40, game, with deuce at 40-40 requiring two points in a row. Golf: a relaxed grip and a balanced stance with a smooth swing. Scoring counts strokes against par and the lowest total wins. They are lifetime activities because people can play them at any age. In tennis, I clear the court of loose balls; in golf, I stay quiet when others hit.",
      answers: [
        [
          "full",
          "[[0|Tennis cues: turn sideways and swing low to high, making contact in front of the body.]] [[1|Golf cues: a relaxed grip and balanced stance, and a smooth swing that keeps the head still.]] [[2|Tennis is scored 15, 30, 40, game, with deuce at 40-40; golf counts strokes against par, and the lowest total wins.]] [[3|They're lifetime activities because people can play them at any age; in tennis I clear loose balls from the court, and in golf I stay quiet while others hit.]]",
          "Full marks. Two sports, correct cues, scoring and habits.",
        ],
        [
          "full",
          "[[0|Bowling cues: keep a straight arm swing and release the ball low with a follow-through toward the target.]] [[1|Tennis cues: ready position with bent knees, and follow through across the body.]] [[2|Bowling has ten frames with strikes and spares earning bonuses; tennis counts points 15, 30, 40, game, and first to six games wins a set.]] [[3|Both are lifetime sports since you can play with family at any age; in bowling I wait for the lane to clear before I roll, and in tennis I stay off a neighbor's court.]]",
          "Full marks. Both sports are described correctly.",
        ],
        [
          "partial",
          "[[0|In tennis, hit the ball.]] [[2|Golf is scored by strokes, lowest wins.]] Lifetime sports are only for old people and have no etiquette.",
          "Lifetime sports can be played at any age, and each has etiquette. Give two cues for each sport.",
        ],
        [
          "partial",
          "[[1|Golf needs a balanced stance.]] [[3|Lifetime sports can be played at any age.]] Tennis is scored by counting strokes.",
          "Tennis is scored by points 15, 30, 40 and game; golf counts strokes.",
          true,
        ],
        [
          "weak",
          "Lifetime sports are the ones I play only in this class and never again.",
          "Lifetime activities are those you can enjoy throughout life.",
        ],
        [
          "weak",
          "There is no scoring in these sports. You just have fun.",
          "Each of these sports has its own scoring system.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Transition, tempo and learning from video",
  note: `
## Objectives

Students will be able to:

1. use game strategy such as transition and tempo to gain an advantage;
2. analyze video of your own performance and set a specific improvement goal.

## Materials

Tablets or phones for filming (with permission), a skills-analysis sheet, cones, a ball, pinnies, the worksheet and quiz.

## Starter (6 minutes)

Show a 20-second clip of a fast break (or describe one). Ask: "Why is the offense hard to stop? Where were the defenders?" Introduce transition.

## Main activity

1. Transition: the moment possession changes. Transition offense (attack quickly while the defense is still unorganized, e.g., a 3-on-2 fast break) and transition defense (sprint back, protect the goal, stop the ball). Both teams are most vulnerable in transition.
2. Tempo: the speed at which a team plays. A fast tempo creates chances before the defense is set; a slow tempo conserves energy, controls the ball and allows the team to set plays. Changing tempo (speeding up after a defensive stop, slowing down with a lead) is a strategy. Match tempo to your players' strengths.
3. Video analysis: film with permission, from a stable position; choose 2 or 3 measurable skills (e.g., percent of serves in, passes completed, footwork); watch once for the whole, then again for details with the checklist; record counts. Example: 12 of 20 serves in is 60 percent. Set a goal: 15 of 20 (75 percent) in four weeks. Plan the practice: 10 minutes of serving with a target each day.
4. Feedback: describe what you see, not judge; compare with a model.

## Quiz

Strategy words and video analysis.
`,
  reading: [
    "Winning the moments between plays, and watching yourself",
    `
Games are often decided not in the set plays, but in the moments between them. **Transition** is the moment when possession changes: your team loses the ball and must defend, or wins it and may attack. These moments are important because both teams are most disorganized then. In **transition offense**, the team attacks quickly, before the defense is set. A classic example is the basketball **fast break**: three attackers run against two defenders (a 3-on-2). Quick passing, running wide lanes and finishing before help arrives give a good scoring chance. In **transition defense**, the team sprints back to protect the goal, communicates to find the nearest opponent and stops the ball, so that the other side cannot take advantage. Teams that lose focus when they give up the ball often concede easy points.

**Tempo** is the speed at which a team plays. A **fast tempo** wears out opponents and creates chances before the defense settles, but it can cause mistakes. A **slow tempo** keeps possession, uses the clock and lets the team set up plays, but it gives the defense time to organize. Smart teams change tempo on purpose: speeding up after a steal, or slowing down when they lead late in a game. The best tempo depends on the strengths of your players, such as speed, shooting and fitness.

One of the best ways to improve your own play is to **watch it**. With permission, have a partner film you from a steady position. Before you watch, choose **two or three measurable skills** to study: for example, the percent of serves that land in, the number of completed passes, or whether your feet are set when you shoot. Watch the clip once all the way through to see the big picture. Then watch again and **count** with your checklist. If you served 20 times and 12 were in, that is 12 / 20 = 60 percent. Compare your form with a model or a coach's description. Describe what you see, not what you feel about yourself: "My toss is drifting behind my head" is more useful than "I'm terrible."

Finally, set a **specific improvement goal** and plan how to practice. "Raise my serve percentage from 60 percent to 75 percent (15 of 20) in four weeks, by practicing 10 minutes of serves to a target each day." Film again at the end and compare. Elite athletes use video in just this way to turn small observations into steady gains.
`,
  ],
  cards: [
    ["Transition", "The moment when possession changes."],
    ["Fast break", "A quick attack before the defense is set."],
    ["Transition defense", "Getting back and organized after losing possession."],
    ["Tempo", "The speed at which a team plays."],
    ["Video analysis", "Studying a recording to improve performance."],
    ["Measurable skill", "A skill you can count or time."],
    ["Improvement goal", "A specific, measurable target for a skill."],
    ["Model", "An example of correct technique to compare against."],
  ],
  closed: [
    [
      "What is transition in a game?",
      ["The moment possession changes", "Half-time", "A timeout", "A substitution"],
      "A",
    ],
    [
      "12 of 20 serves land in. What is the percentage?",
      ["12 percent", "40 percent", "60 percent", "80 percent"],
      "C",
    ],
    [
      "When might a team slow the tempo on purpose?",
      ["When leading late in the game", "When far behind", "At the start only", "Never"],
      "A",
    ],
    [
      "Which is a good way to describe what you see in your video?",
      ["My toss drifts behind my head", "I'm terrible", "I hate it", "Nothing to see"],
      "A",
    ],
    [
      "A 3-on-2 fast break gives the offense:",
      ["An extra attacker against the defenders", "A disadvantage", "A free throw", "A timeout"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A student filmed 20 tennis serves. 12 landed in. Calculate the percentage, set a specific improvement goal for four weeks (including a target number out of 20), and describe a practice plan with one drill and how you will measure progress. Explain what you would look for on the video to find the cause of missed serves.",
      scheme: [
        "Calculates the percentage as 60 percent",
        "Sets a specific, measurable goal with a number and a deadline",
        "Describes a practice plan with a drill and a measurement method",
        "Names things to look for on the video, such as toss position, contact point or follow-through",
      ],
      model:
        "12 of 20 is 60 percent. My goal is 15 of 20, which is 75 percent, in four weeks. I would practice 10 minutes of serves aimed at a target each day, and film 20 serves at the end of each week to count them. On the video I would check my toss position, my contact point and whether I follow through, because a toss that drifts is a common cause of missed serves.",
      answers: [
        [
          "full",
          "[[0|12 ÷ 20 = 60 percent.]] [[1|Goal: 15 of 20, which is 75 percent, in four weeks.]] [[2|I'd practice 10 minutes of serves to a target each day, and film 20 serves every Friday to count the ones that land in.]] [[3|On the video I'd check my toss position, contact point and follow-through, since a drifting toss is a common cause of misses.]]",
          "Full marks. A number, a deadline and a way to measure.",
        ],
        [
          "full",
          "[[0|My serve percentage is 60.]] [[1|I want 16 of 20 (80 percent) by the end of the month.]] [[2|The drill is serving to a towel in the corner of the box, and I'll record a count of 20 each week.]] [[3|I'd look for where the ball is when I toss it, how high I reach, and whether I snap my wrist at contact.]]",
          "Full marks. Choosing a target in the box gives the drill a purpose.",
        ],
        [
          "partial",
          "[[0|60 percent.]] [[3|I'd look at my toss.]] My goal is to get better at serving, and I will practice sometimes.",
          "Make the goal measurable, with a number and a deadline, and plan the drill.",
        ],
        [
          "partial",
          "[[1|My goal is 75 percent in four weeks.]] [[2|I'll film 20 serves each week.]] The percentage is 20 ÷ 12, which is 167 percent.",
          "Percentage is serves in divided by serves attempted: 12 divided by 20.",
          true,
        ],
        [
          "weak",
          "Video is a waste of time. I can feel when I serve badly.",
          "Video shows details that are hard to feel. Use it to count and compare.",
        ],
        [
          "weak",
          "My goal is to be perfect at tennis. I do not need a plan.",
          "A good goal is specific and measurable, with a plan.",
        ],
      ],
    },
    {
      prompt:
        "Explain transition and tempo, using a team sport you know. Describe what a team should do in transition offense and transition defense, and when it should speed up or slow down its tempo. Give one reason why tempo should match a team's players.",
      scheme: [
        "Defines transition as the moment possession changes",
        "Describes transition offense (attack quickly) and transition defense (get back and stop the ball)",
        "Defines tempo and explains when to speed up or slow down",
        "Explains that tempo should suit the team's strengths, such as speed or fitness",
      ],
      model:
        "In basketball, transition is the moment possession changes. In transition offense, the team runs a fast break before the defense is set; in transition defense, it sprints back and stops the ball. Tempo is the speed at which a team plays. A team might speed up after a steal and slow down when leading late. The tempo should match the team's strengths: a fast, fit team can run, while a team with strong shooters might prefer to set plays.",
      answers: [
        [
          "full",
          "[[0|In basketball, transition is the moment possession changes.]] [[1|On offense the team runs a fast break before the defense is set; on defense it sprints back and stops the ball.]] [[2|Tempo is how fast a team plays: speed up after a steal, slow down when leading late.]] [[3|The tempo should suit the team's strengths: a fast, fit team can run, while a team of good shooters may prefer to set plays.]]",
          "Full marks. The definitions and the examples are accurate.",
        ],
        [
          "full",
          "[[0|In soccer, the transition is when we lose or win the ball.]] [[1|After winning it we pass forward fast to attack; after losing it we pressure the ball and drop back to protect the goal.]] [[2|Tempo is how quickly we play; we speed up when the other team is tired and slow down to keep the ball when we're ahead.]] [[3|If our players are quick, a fast tempo helps us, but a slower team should keep possession.]]",
          "Full marks. Linking tempo to fatigue is thoughtful.",
        ],
        [
          "partial",
          "[[0|Transition is when the ball changes teams.]] [[1|Attack fast and get back.]] Tempo is the music during the game, and it should always be as fast as possible.",
          "Tempo is the speed of play. Sometimes a slower tempo is smarter.",
        ],
        [
          "partial",
          "[[2|Speed up after a steal.]] [[3|Match the tempo to the players.]] Transition is the half-time break.",
          "Transition is the moment possession changes.",
          true,
        ],
        [
          "weak",
          "Strategy does not matter. The more talented team always wins.",
          "Strategy, such as transition and tempo, can give a team an advantage.",
        ],
        [
          "weak",
          "A fast break is breaking the equipment quickly.",
          "A fast break is a quick attack before the defense is organized.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Leading, cooperating and finding places to be active",
  note: `
## Objectives

Students will be able to:

1. lead a warm-up or small-group activity and give constructive feedback;
2. cooperate in a group challenge that requires communication and shared planning;
3. evaluate community resources for physical activity, such as parks, gyms and clubs.

## Materials

Leader planning cards, a feedback form, ropes, cones and planks for a group challenge, a community resource list (invented), the worksheet, quiz and problem set.

## Starter (6 minutes)

Ask: "Think of the best coach or teacher you have had. What did they do?" Collect: clear instructions, demonstration, patience, encouragement, fairness.

## Main activity

1. Leading: plan the activity (aim, time, equipment, safety), explain in one or two sentences, demonstrate, check understanding, watch the group, correct kindly and give praise; keep everyone involved. Constructive feedback: specific, kind, about the action not the person, with a next step (a "praise, question, suggestion" pattern).
2. Group challenge ("River crossing"): the group must cross a marked area using only three planks, no touching the floor, without losing a plank. Steps: understand the rules, share ideas, listen, make a plan, assign roles, try, reflect and adjust. Skills: clear communication, patience, shared decisions, encouraging each other.
3. Community resources: parks and trails (usually free), recreation centers, school facilities, gyms (e.g., $40 a month, $480 a year), clubs and leagues. Evaluate by cost, location and how to get there, hours, safety, accessibility, programs for your age and interests, and what other people say. Compare two options in a table.

## Problem set

Evaluate two resources and plan a short activity.
`,
  reading: [
    "Being the leader, working as one, and finding the right place",
    `
Good leaders do not just give orders. Think of a coach or teacher who helped you. They probably gave **clear instructions**, **showed** what to do, were **patient** and **encouraged** effort. When you **lead** a warm-up or a small-group activity, plan first: What is the aim? How long will it take? What equipment is needed? What safety issues are there? Then explain in one or two short sentences, **demonstrate**, check that everyone understands ("Show me the first move"), and watch the group while it works. Include everyone, correct kindly and give praise.

Feedback helps people improve, but only when it is **constructive**. This means it is **specific** ("Your knees were bent on the second squat"), **kind**, about the **action** and not the person, and gives a **next step** ("Try keeping your chest up"). A simple pattern is **praise, question, suggestion**: say what went well, ask a question to invite thinking ("How did that feel?"), and offer one idea to try. Avoid vague statements such as "That was bad" or sarcasm.

Some tasks cannot be done alone. In a **group challenge**, such as a "river crossing" where a team must cross a marked area using only three planks without touching the floor, success depends on **communication** and **shared planning**. Start by making sure that everyone understands the rules. Let each person offer ideas, and **listen** before deciding. Choose a plan, give people roles (someone moving the planks, someone guiding, someone watching safety), try it, and talk about what to change if it fails. Notice who is quiet and invite them in. Encourage each other, since mistakes are part of the challenge. Afterward, **reflect**: What worked? What would you do differently? How did we make decisions?

Being active for life also means knowing **where** to do it. Communities offer many **resources**: **parks and trails** (usually free), **recreation centers** with courts and classes, **school facilities** after hours, **gyms**, and **clubs and leagues**. When you evaluate a resource, consider the **cost** (a gym membership at $40 a month is $480 a year), the **location** and how you would get there, the **hours**, whether it is **safe** and **accessible**, and whether it has **programs** for your age and interests. Ask what other users say. Putting two options in a table can make the choice clearer: a free trail may be perfect for running, while a gym may be better for strength training in cold weather.
`,
  ],
  cards: [
    ["Constructive feedback", "Specific, kind advice that gives a next step."],
    ["Demonstrate", "Show how to do a movement."],
    ["Praise, question, suggestion", "A simple pattern for giving feedback."],
    ["Group challenge", "A task needing teamwork to solve."],
    ["Shared planning", "Making a plan with input from everyone."],
    ["Community resource", "A place or program in a community for activity."],
    ["Accessibility", "How easily all people can use a place."],
    ["Membership", "A fee that gives access to a gym or club."],
  ],
  closed: [
    [
      "Which feedback is constructive?",
      ["That was bad", "Your knees were bent on the second squat; try keeping your chest up", "You're hopeless", "Whatever"],
      "B",
    ],
    [
      "What is the first step of leading an activity?",
      ["Plan the aim, time, equipment and safety", "Start yelling", "Wait for others", "Leave"],
      "A",
    ],
    [
      "A gym costs $40 a month. What is the cost for a year?",
      ["$40", "$120", "$480", "$520"],
      "C",
    ],
    [
      "In a group challenge, what helps most?",
      ["Listening and sharing ideas", "One person deciding everything", "Silence", "Rushing"],
      "A",
    ],
    [
      "Which factor should you consider when evaluating a community resource?",
      ["Cost and location", "Only the color of the building", "The weather on another day", "Nothing"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "You are asked to lead a five-minute warm-up for a small group. Write your plan: the aim, four activities with times, and the safety checks. Then write two pieces of constructive feedback you might give a participant whose lunges have their knee going past the toes, using the praise, question, suggestion pattern.",
      scheme: [
        "States a clear aim and the time/equipment",
        "Lists four warm-up activities with times that fit about five minutes",
        "Includes safety checks such as space, footwear or stopping with pain",
        "Gives constructive feedback with praise, a question and a suggestion",
      ],
      model:
        "Aim: to raise body temperature and loosen the legs and arms before basketball, with no equipment, in five minutes. Slow jog 1 minute, walking lunges 1 minute, arm circles 1 minute, side shuffles 1 minute, high knees 1 minute. Safety: check the space is clear, make sure shoes are tied, and stop if anyone feels pain. Feedback: \"Your chest stayed up, which is great. How did that last lunge feel on your knee? Try stepping a little further so your knee stays over your ankle.\"",
      answers: [
        [
          "full",
          "[[0|Aim: raise body temperature and loosen the legs and arms before basketball, in five minutes with no equipment.]] [[1|Slow jog 1 minute, walking lunges 1 minute, arm circles 1 minute, side shuffles 1 minute and high knees 1 minute.]] [[2|Safety: check the space is clear, shoes are tied and anyone with pain should stop.]] [[3|Feedback: 'Your chest stayed up, which is great. How did that last lunge feel on your knee? Try stepping a bit further so your knee stays over your ankle.']]",
          "Full marks. A clear plan with safety and kind, specific feedback.",
        ],
        [
          "full",
          "[[0|The aim is to get the group's heart rates up and joints loose before a game, using five minutes and no equipment.]] [[1|One minute each of jogging in place, leg swings, arm circles, butt kicks and side shuffles.]] [[2|I'd check there's enough room, no loose items on the floor, and remind people to stop if anything hurts.]] [[3|To the participant I'd say: 'Nice depth on your lunges. Where do you feel it? Try a longer step so the knee stays over the ankle.']]",
          "Full marks. Asking 'where do you feel it' invites reflection.",
        ],
        [
          "partial",
          "[[0|To warm up the group.]] [[1|Jog, lunges, arm circles.]] There are no safety checks needed. Tell the person their lunges are wrong.",
          "Include safety checks, and give specific, kind feedback with a suggestion.",
        ],
        [
          "partial",
          "[[2|Check the space and shoes.]] [[3|Try a longer step.]] The warm-up has one activity for five minutes: sitting.",
          "A warm-up uses several movement activities to raise body temperature.",
          true,
        ],
        [
          "weak",
          "I would just tell everyone to do what they want. No plan is necessary.",
          "A leader plans the aim, activities and safety.",
        ],
        [
          "weak",
          "Feedback: you are doing it wrong and everyone can see.",
          "Constructive feedback is specific, kind and private enough to be helpful.",
        ],
      ],
    },
    {
      prompt:
        "Compare two options for being active after graduation: a gym that costs $40 a month and is open 5 a.m. to 11 p.m. but is a 15-minute drive away, and a free park trail a 10-minute walk from home that is lit only until dusk. Calculate the yearly cost of the gym, evaluate both using at least three criteria, and say which you would choose and why. Then describe one thing your group should do to make a decision together in a group challenge.",
      scheme: [
        "Calculates the gym cost as $480 a year",
        "Evaluates both options using at least three criteria (cost, location, hours, safety, programs)",
        "Makes a justified choice or a sensible combination",
        "Describes a group decision habit such as listening to everyone's ideas before choosing a plan",
      ],
      model:
        "The gym costs 40 times 12, which is $480 a year. The trail is free, a 10-minute walk, but it is lit only until dusk, so it is not safe after dark and is weather dependent. The gym is open long hours and has strength equipment but costs money and needs a drive. I would use the trail in daylight and the gym in winter or after dark, if I can afford it. In a group, I would listen to everyone's ideas before choosing a plan.",
      answers: [
        [
          "full",
          "[[0|The gym costs $40 × 12 = $480 a year.]] [[1|On cost the trail wins, being free; on location it is a 10-minute walk against a 15-minute drive; on hours the gym is open long and the trail only to dusk; on equipment the gym has strength machines.]] [[2|I'd use the trail in daylight and consider the gym in winter or after dark if I can afford it.]] [[3|In a group, I'd listen to everyone's ideas before we choose a plan.]]",
          "Full marks. Several criteria and a sensible combination.",
        ],
        [
          "full",
          "[[0|$480 a year for the gym.]] [[1|The trail is free, close and good for running, but it's dark after dusk and unsafe alone at night; the gym is open late and offers weights, but costs money and needs a car.]] [[2|I'd pick the trail now since I'm on a budget and add a gym when I have a job.]] [[3|In a group decision, I'd make sure everyone shares an idea and then we vote.]]",
          "Full marks. Considering safety after dark is a sound criterion.",
        ],
        [
          "partial",
          "[[0|The gym costs $480.]] [[3|We should all listen.]] The gym is better because it costs money so it must be good.",
          "Price alone does not show quality. Compare location, hours and safety.",
        ],
        [
          "partial",
          "[[1|The trail is free but dark after dusk.]] [[2|I'd choose the trail.]] The gym costs $40 for the whole year.",
          "$40 a month for 12 months is $480.",
          true,
        ],
        [
          "weak",
          "The cost does not matter and neither does safety or distance.",
          "Cost, location, hours and safety all affect whether you will use a resource.",
        ],
        [
          "weak",
          "I'd let the loudest group member decide for everyone.",
          "Good group decisions come from listening to everyone.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Barriers, plans after graduation, and staying active for life",
  note: `
## Objectives

Students will be able to:

1. analyze barriers to being active and describe ways to overcome them;
2. write a reflection on how physical activity fits into your plans after graduation.

## Materials

A barrier-and-solution organizer, an adult activity guideline summary, a reflection template, the quiz, problem set and worksheet.

## Starter (6 minutes)

Ask: "What is the main reason people stop exercising after high school?" Collect: no team, no time, cost, no one to do it with, motivation, injury.

## Main activity

1. Barriers: personal (low motivation, low confidence, injury), social (no one to exercise with, peer attitudes), environmental (no safe place, weather, transportation), resource (cost, equipment) and time (work, study, family). Solutions: SMART goals, scheduling, workout partners, free or low-cost options, home workouts, short sessions, tracking, rewards, adapting for injury, asking for help.
2. Guidelines: adults need at least 150 minutes of moderate activity a week (for example, 30 minutes on 5 days) plus muscle strengthening on 2 days; that is 150 / 5 = 30. Short bouts count: three 10-minute walks equal 30 minutes.
3. Reflection: where you will live, work or study; what activities you enjoy; what resources exist; what your barriers are; a simple plan with time, place and partner. Habit tools: put exercise in the calendar, attach it to another habit, prepare clothes the night before, start with two days a week.

## Quiz

Barriers and guidelines.
`,
  reading: [
    "Why people stop, and how you can keep going",
    `
Many young people are very active in school, because gym class, teams and recess provide structure. After graduation, that structure disappears, and activity levels often fall. Knowing the common **barriers** can help you plan for them.

Barriers come in several types. **Personal** barriers include low motivation, low confidence, tiredness or an injury. **Social** barriers include not having anyone to exercise with, or friends who do not value exercise. **Environmental** barriers include no safe place to walk or run, bad weather or no transportation. **Resource** barriers include the cost of a gym or equipment. And **time** barriers are common when you are balancing work, studies and family.

For each barrier there is a way around it. Set a **SMART goal** so that you know what you are aiming for. **Schedule** exercise as you would a class or work shift, and write it in your calendar. Find a **partner** or a group so that someone expects you to show up. Choose **free or low-cost** options: walking, running, bodyweight workouts, school or community fields. If time is short, break exercise into **short sessions**: three 10-minute walks add up to 30 minutes. **Track** your progress with a log or app, and reward yourself for consistency. If you are injured, **adapt**: replace running with swimming or upper-body work, and see a medical professional.

How much activity is enough? The adult guideline is at least **150 minutes** of moderate activity per week, such as brisk walking, plus **muscle-strengthening** activities on **2 days**. If you spread the 150 minutes over five days, that is 150 / 5 = 30 minutes a day. This is a minimum for good health; doing more brings additional benefits.

Your **reflection** should connect all this to your own plans. Where will you be a year after graduation: at a job, a college, an apprenticeship, the military or at home? What activities do you enjoy and what resources are nearby? What are your likely barriers, and what will you do about each? A realistic plan states a **time**, a **place** and, if possible, a **partner**: "Run with my roommate on Tuesday, Thursday and Saturday mornings at the campus track." Habits are easier when linked to something that you already do ("after my morning coffee"), when you prepare the night before (clothes and shoes by the door), and when you start small, such as two days a week, then build. Planning now will make it much more likely that you will be active for life.
`,
  ],
  cards: [
    ["Barrier", "Something that makes it harder to be active."],
    ["Moderate activity", "Activity that raises heart rate and breathing, like brisk walking."],
    ["Muscle strengthening", "Activities that work muscles against resistance."],
    ["Short bout", "A brief session that still counts toward the weekly total."],
    ["Workout partner", "Someone who exercises with you and keeps you accountable."],
    ["Habit stacking", "Linking a new habit to an existing one."],
    ["Adapt", "Change an activity to fit an injury or situation."],
    ["Reflection", "Thinking about how a plan fits your life."],
  ],
  closed: [
    [
      "The adult guideline for moderate activity is about:",
      ["30 minutes a week", "150 minutes a week", "500 minutes a week", "None"],
      "B",
    ],
    [
      "Three 10-minute walks in a day equal how many minutes?",
      ["10", "20", "30", "60"],
      "C",
    ],
    [
      "Which is an environmental barrier?",
      ["No safe place to walk", "Low confidence", "A busy schedule", "A gym fee"],
      "A",
    ],
    [
      "Which strategy helps with a lack of motivation?",
      ["A workout partner", "Skipping planning", "Staying inside", "Waiting"],
      "A",
    ],
    [
      "How many days a week should muscle-strengthening activities be done, per the adult guideline?",
      ["0", "1", "2", "7"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Name three barriers that a recent graduate working a full-time job might face to staying active, classifying each (personal, social, environmental, resource or time). For each, give a realistic solution. Then explain how 150 minutes of moderate activity a week could fit into a busy week.",
      scheme: [
        "Names and classifies three barriers correctly",
        "Gives a realistic solution for each barrier",
        "Shows how 150 minutes fits into a week, such as 30 minutes on 5 days or short bouts",
        "Includes at least one strategy such as scheduling, partner or habit stacking",
      ],
      model:
        "Time: long work hours, so I would schedule 30-minute walks on five days, written in my calendar. Resource: a gym costs $40 a month, so I would use free trails and bodyweight workouts. Social: no friends nearby who exercise, so I would join a community running group. 30 minutes on 5 days is 150 minutes, and three 10-minute walks count as 30. I will link the walk to lunch breaks.",
      answers: [
        [
          "full",
          "[[0|Time: long work hours. Resource: gym costs. Social: no friends nearby who exercise.]] [[1|For time I'd schedule 30-minute walks in my calendar; for cost I'd use free trails and bodyweight workouts; for social I'd join a community running group.]] [[2|30 minutes on 5 days is 150 minutes, and three 10-minute walks in a day also count.]] [[3|I'd link the walk to my lunch break, so it becomes a habit.]]",
          "Full marks. Barriers are classified and each has a realistic solution.",
        ],
        [
          "full",
          "[[0|Personal: I'm tired after work. Environmental: my neighborhood has no sidewalks. Time: I commute for an hour.]] [[1|I'd exercise before work when I have the most energy, drive to a park with a trail, and use the commute time for a podcast on a walk at lunch.]] [[2|Five 30-minute sessions make 150 minutes, or ten-minute bouts spread through the day.]] [[3|I'd put my shoes by the door the night before and ask a coworker to walk with me.]]",
          "Full marks. Preparing shoes and asking a coworker are practical and social.",
        ],
        [
          "partial",
          "[[0|Time is a barrier.]] [[2|30 minutes five days a week is 150.]] I'd just rely on motivation and skip planning. No other barriers exist.",
          "Name three barriers and plan for each, rather than relying on motivation.",
        ],
        [
          "partial",
          "[[1|Join a running group, and use free trails.]] [[3|Link walking to lunch.]] 150 minutes is 15 minutes per week.",
          "150 minutes per week is 30 minutes on five days.",
          true,
        ],
        [
          "weak",
          "There are no barriers after graduation because adults have more time.",
          "Adults face many barriers, such as work and family. Name three.",
        ],
        [
          "weak",
          "Exercise is only for school and not needed after.",
          "Activity benefits health at every age.",
        ],
      ],
    },
    {
      prompt:
        "Write a short reflection (about 120 words) on how physical activity fits into your plans after graduation. Include where you expect to be, one activity you will keep doing, one new activity you want to try, a barrier and how you will plan around it, and a specific weekly schedule with time, place and a partner.",
      scheme: [
        "States where the student expects to be after graduation",
        "Names an activity to continue and a new activity to try",
        "Names a barrier and a way around it",
        "Gives a specific weekly schedule with time, place and a partner",
      ],
      model:
        "After graduation, I plan to attend the community college and work part-time. I will keep playing basketball and want to try rock climbing at the campus gym. My barrier is a busy schedule, so I will put sessions in my calendar. Each week I will play basketball with my roommate on Tuesday and Thursday at 6 a.m. at the campus courts, and climb on Saturday with a friend from class.",
      answers: [
        [
          "full",
          "[[0|After graduation I'll attend the community college and work part-time.]] [[1|I'll keep playing basketball and try rock climbing at the campus gym.]] [[2|My barrier is a busy schedule, so I'll put each session in my calendar.]] [[3|Each week I'll play basketball with my roommate on Tuesday and Thursday at 6 a.m. at the campus courts, and climb on Saturday with a friend from class.]]",
          "Full marks. The schedule names the time, place and partner.",
        ],
        [
          "full",
          "[[0|In a year, I expect to be working at a warehouse and living at home.]] [[1|I want to keep running and try swimming at the community pool.]] [[2|Because of my shifts, I'll plan around my work schedule and use the evening runs when I'm off.]] [[3|Mondays and Wednesdays at 7 p.m., I'll run on the trail with my brother, and I'll swim on Sunday mornings with a neighbor.]]",
          "Full marks. Fitting around a shift schedule is realistic.",
        ],
        [
          "partial",
          "[[0|I'll be at college.]] [[1|I'll keep running.]] I don't have any barriers and I'll exercise sometimes, with whoever is around.",
          "Name a barrier and give a specific schedule with time, place and partner.",
        ],
        [
          "partial",
          "[[2|My barrier is cost, so I'll use free trails.]] [[3|Monday at 6 p.m. on the trail with a friend.]] I don't know where I'll be and don't want to try anything new.",
          "Say where you expect to be and one new activity you might try.",
          true,
        ],
        [
          "weak",
          "I will not exercise after graduation. I have no plans.",
          "A reflection links activity to your plans. Think of one realistic step.",
        ],
        [
          "weak",
          "I'll work out when I feel like it. I do not need a schedule.",
          "A specific schedule makes it much more likely that you will follow through.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Substances and performance, and healthy relationships and consent",
  note: `
## Objectives

Students will be able to:

1. describe how substance use affects performance and long-term health;
2. describe the components of healthy relationships and consent.

## Materials

Case-study cards, a healthy-versus-unhealthy relationship sorting activity, a consent definition card, a list of local and national helplines, the problem set and worksheet.

## Starter (6 minutes)

Ask: "What do the best athletes do the night before a big game?" Collect: sleep, eat well, hydrate, avoid alcohol. Link to why.

## Main activity

1. Substances and performance: alcohol impairs reaction time, balance, judgment and decision-making; dehydrates; disrupts sleep and slows recovery; the effects can last into the next day; underage drinking is illegal in Ohio (legal age is 21). Nicotine and vaping reduce lung function and endurance and are addictive. Marijuana affects attention, memory and coordination, and the developing brain. Performance-enhancing drugs such as anabolic steroids can damage the heart, liver and mood, are banned in sport, and are illegal without a prescription. Counterfeit pills may contain fentanyl, which can be lethal in very small amounts; never take a pill that did not come from a pharmacist or doctor. Naloxone can reverse an opioid overdose; call 911 immediately. Long-term: addiction, damage to organs and brain, mental health, school, jobs and legal consequences.
2. Healthy relationships: respect, trust, honesty, good communication, equality, support, healthy boundaries, enjoying time apart. Unhealthy signs: control, jealousy used to limit friends, putting down, pressure, isolating, threats, pushing or hitting.
3. Consent: clear, freely given agreement; it must be given by choice, specific to the activity, ongoing, and can be withdrawn at any time. Silence is not consent. A person cannot give consent if impaired by alcohol or drugs, asleep, or pressured or threatened. Respecting "no" is a requirement. Help: a trusted adult, school counselor, doctor, and national helplines. Everyone deserves safety.

## Problem set

Cases about substances and relationships.
`,
  reading: [
    "What substances do to the body and mind, and what respect looks like",
    `
Athletes who want to perform well pay attention to sleep, food and water. They also avoid substances that interfere with these. **Alcohol** slows reaction time, upsets balance, and weakens judgment, which raises the risk of injury and of unsafe decisions such as getting into a car with a driver who has been drinking. It also dehydrates the body, disrupts sleep, and slows recovery from exercise, and its effects can last into the next day. In Ohio, as in every state, the legal drinking age is **21**. **Nicotine**, including vaping, is addictive and reduces lung function and endurance. **Marijuana** can affect attention, memory and coordination, and it may harm the developing teenage brain. **Performance-enhancing drugs**, such as anabolic steroids, can damage the heart and liver and change mood; they are banned in sports and are illegal without a prescription. A serious modern danger is **counterfeit pills** made to look like prescription medicine but which may contain **fentanyl**, a powerful opioid that can be lethal in tiny amounts. Never take a pill that did not come from a pharmacist or doctor. If someone cannot be woken, is breathing slowly or has blue lips, **call 911** at once; the medicine **naloxone** can reverse an opioid overdose. Over time, substance use can lead to **addiction**, damage to organs and the brain, mental health problems, and trouble at school, at work and with the law. If you or someone you know needs help, talk to a trusted adult, school counselor or doctor.

Health is also about our relationships. A **healthy relationship**, with a friend, a partner or family member, is based on **respect**, **trust**, **honesty**, **good communication**, **equality** and **support**. Each person has **boundaries**, limits about what they are comfortable with, and the other person respects them. People in healthy relationships can spend time apart, have other friends, and disagree without fear. **Unhealthy** signs include controlling behavior (checking a phone, deciding who you may see), jealousy used to limit friends, putting you down, pressuring you, isolating you from others, threats, and pushing or hitting. These can be present in any gender combination, and they are never your fault.

**Consent** means a clear, freely given **yes** to an activity. It must be given by **choice**, be **specific** to the activity, be **ongoing**, and it can be **withdrawn at any time**; saying yes once does not mean yes always. **Silence is not consent.** A person cannot give consent if they are **impaired** by alcohol or drugs, asleep, or pressured or threatened. Respecting a "no," or a hesitation, is a requirement, not a favor. If you are in a relationship that feels unsafe, or if someone has hurt or pressured you, tell a trusted adult, school counselor or doctor, or call a national helpline. Everyone deserves to feel safe.
`,
  ],
  cards: [
    ["Impaired", "Having reduced ability to think or move well."],
    ["Fentanyl", "A powerful opioid that can be lethal in tiny amounts."],
    ["Naloxone", "A medicine that can reverse an opioid overdose."],
    ["Addiction", "A strong need to keep using something despite harm."],
    ["Healthy relationship", "One based on respect, trust, honesty and support."],
    ["Boundary", "A personal limit that others should respect."],
    ["Consent", "A clear, freely given agreement that can be withdrawn."],
    ["Coercion", "Pressure or threats used to make someone do something."],
  ],
  closed: [
    [
      "What is the legal drinking age in Ohio?",
      ["18", "19", "21", "25"],
      "C",
    ],
    [
      "Why are counterfeit pills dangerous?",
      ["They may contain fentanyl", "They are always harmless", "They cost less", "They taste bad"],
      "A",
    ],
    [
      "Which is a sign of an unhealthy relationship?",
      ["Respecting each other's boundaries", "Controlling who the other can see", "Honest talk", "Time apart"],
      "B",
    ],
    [
      "Consent can be:",
      ["Withdrawn at any time", "Given once for always", "Assumed from silence", "Given by a sleeping person"],
      "A",
    ],
    [
      "A person who is impaired by alcohol:",
      ["Cannot give consent", "Can give consent normally", "Is always sober", "Should be pressured"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A varsity athlete is invited to a party the night before a championship game and is offered a drink. Explain at least three ways alcohol could harm performance, explain why underage drinking is also a risk beyond sport, and give two ways the athlete could say no.",
      scheme: [
        "Explains at least three effects of alcohol on performance (slower reaction, dehydration, poor sleep, slow recovery)",
        "Explains legal or wider risks (illegal under 21, judgment, unsafe decisions, possible team consequences)",
        "Gives two ways to refuse",
        "Mentions the effects lasting into the next day or the importance of sleep and recovery",
      ],
      model:
        "Alcohol slows reaction time, dehydrates the body, disrupts sleep and slows recovery, and the effects can last into the next day. Beyond sport, drinking under 21 is illegal in Ohio, weakens judgment, and can lead to unsafe choices such as riding with an impaired driver, or to team penalties. The athlete could say, \"No thanks, I've got a game tomorrow,\" and suggest a different activity, or leave early with a friend. Good sleep the night before matters for the game.",
      answers: [
        [
          "full",
          "[[0|Alcohol slows reaction time, dehydrates the body, disrupts sleep and slows recovery.]] [[1|Beyond sport, it's illegal under 21 in Ohio, weakens judgment and could lead to unsafe choices like riding with an impaired driver, or to team penalties.]] [[2|She could say, 'No thanks, I've got a game tomorrow,' or suggest a different activity, or leave early with a friend.]] [[3|The effects last into the next day, and sleep the night before the game matters a lot.]]",
          "Full marks. Performance, wider risks and refusals are all covered.",
        ],
        [
          "full",
          "[[0|It would slow his reactions, dehydrate him, and wreck his sleep, so he'd perform worse.]] [[1|It's also illegal under 21, and judgment gets worse, so he could end up in a risky situation or lose his place on the team.]] [[2|He could say 'I'm good, I need to be rested,' and grab a soda, or just leave with a teammate.]] [[3|Since drinking affects recovery into the next day, the championship would suffer.]]",
          "Full marks. Choosing a non-alcoholic drink makes refusing easier.",
        ],
        [
          "partial",
          "[[0|Alcohol hurts sleep.]] [[2|Say no thanks.]] It is fine as long as you drink water too, and nothing bad can happen beyond sport.",
          "Alcohol is illegal under 21 and impairs judgment. Explain the wider risks.",
        ],
        [
          "partial",
          "[[1|It's illegal under 21.]] [[3|The effects last into the next day.]] Alcohol improves reaction time, which helps in games.",
          "Alcohol slows reaction time. Revise this point.",
          true,
        ],
        [
          "weak",
          "One drink never affects anything, so there is nothing to worry about.",
          "Even small amounts can affect sleep and recovery, and underage drinking is illegal.",
        ],
        [
          "weak",
          "The athlete should drink to fit in with everyone and not look weak.",
          "Refusing takes strength. Saying no firmly protects health.",
        ],
      ],
    },
    {
      prompt:
        "Describe four qualities of a healthy relationship and three warning signs of an unhealthy one. Then explain what consent means, why silence or being impaired cannot be consent, and what someone can do if they feel pressured or unsafe in a relationship.",
      scheme: [
        "Describes at least four qualities of a healthy relationship",
        "Describes at least three warning signs of an unhealthy relationship",
        "Explains consent as clear, freely given, specific, ongoing and withdrawable, and why silence or impairment is not consent",
        "Names what to do if pressured or unsafe, such as telling a trusted adult, counselor, doctor or helpline",
      ],
      model:
        "A healthy relationship has respect, trust, honesty, good communication and support, and each person's boundaries are respected. Warning signs include controlling who you can see, putting you down, pressuring you, isolating you from friends, or threats and violence. Consent is a clear, freely given yes that is specific, ongoing and can be withdrawn at any time. Silence is not consent, and a person who is impaired, asleep or pressured cannot give it. If you feel pressured or unsafe, talk to a trusted adult, a school counselor or a doctor, or call a national helpline.",
      answers: [
        [
          "full",
          "[[0|A healthy relationship has respect, trust, honesty, good communication and support, and boundaries are respected.]] [[1|Warning signs are controlling who you can see, putting you down, pressuring you, isolating you from friends, and threats or violence.]] [[2|Consent is a clear, freely given yes that is specific, ongoing and can be withdrawn; silence isn't consent, and someone impaired, asleep or pressured can't give it.]] [[3|If I felt pressured or unsafe, I'd talk to a trusted adult, the school counselor or a doctor, or call a national helpline.]]",
          "Full marks. All four parts are accurate and complete.",
        ],
        [
          "full",
          "[[0|Respect, honesty, trust, equality and being able to disagree safely are marks of a healthy relationship.]] [[1|Unhealthy signs include checking your phone, jealousy that limits your friends, and being pushed or threatened.]] [[2|Consent must be freely given by choice, for that specific thing, and a person can change their mind anytime; if someone is drunk or asleep, they can't consent, and silence isn't a yes.]] [[3|Anyone who feels unsafe can tell a trusted adult or counselor, and in an emergency call 911.]]",
          "Full marks. Including 911 for emergencies is a good addition.",
        ],
        [
          "partial",
          "[[0|Trust and respect.]] [[3|Tell a counselor.]] Silence means yes, and a person who has said yes once has said yes forever.",
          "Silence is not consent, and consent can be withdrawn at any time.",
        ],
        [
          "partial",
          "[[1|Controlling behavior and putting you down are warning signs.]] [[2|Consent must be freely given.]] An impaired person can give consent if they say yes loudly.",
          "A person who is impaired cannot give consent.",
          true,
        ],
        [
          "weak",
          "Relationships do not have rules. Anything goes if you love someone.",
          "Healthy relationships rely on respect and boundaries.",
        ],
        [
          "weak",
          "If someone is pressured, it is their own fault and they should stay quiet.",
          "Being pressured is never your fault. Tell a trusted adult.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Reliable health information, services, and mental health",
  note: `
## Objectives

Students will be able to:

1. explain how to access reliable health information and services;
2. describe the signs of stress, anxiety and depression and how to seek help.

## Materials

Sample web pages and claims (invented), a source evaluation checklist, a list of local health services (school nurse, counselor, clinics, urgent care), helpline information, the worksheet.

## Starter (6 minutes)

Ask: "You wake with a sore throat and a rash. Where do you look first, and why?" Collect: a search engine, a friend, a social media post, a parent, a nurse. Discuss what makes a source reliable.

## Main activity

1. Evaluating sources: who wrote it and what are their credentials; what is the purpose (inform or sell); is it recent; is it backed by evidence and citations; do other trusted sources agree. More reliable: government health sites (.gov), university and hospital sites (.edu, .org with medical review), professional organizations. Less reliable: social media posts, anonymous blogs, ads, testimonials. Cross-check at least two reliable sources. For personal medical concerns, ask a professional.
2. Services: school nurse and counselor; a primary care doctor for routine care and vaccines; urgent care for non-life-threatening problems that need quick attention; the emergency room (911) for life-threatening problems (trouble breathing, chest pain, heavy bleeding, severe injury); community clinics with lower costs; pharmacists; health insurance (premium, deductible) and how teens can get care, including confidential services depending on the state.
3. Stress, anxiety and depression: stress is a reaction to demands; anxiety is intense or constant worry with restlessness, racing heart or trouble sleeping; depression is a persistent low mood or loss of interest lasting more than two weeks with changes in sleep, appetite, energy, concentration, or feelings of hopelessness. These are common, medical conditions, not weakness, and they are treatable. Do not diagnose yourself or others; ask for help. Warning signs that need immediate help: thoughts of self-harm or suicide. Call or text 988 (Suicide and Crisis Lifeline) or call 911.
4. Ways to seek help: tell a trusted adult, school counselor, doctor; check in on a friend; listen without judging; do not keep a secret about safety.

## Worksheet

Evaluate a source and map your support network.
`,
  reading: [
    "Knowing where to look and where to turn",
    `
You will make many health decisions as an adult, and the information that you rely on matters. The internet has both excellent and terrible health advice, so you need to **evaluate sources**. Ask: **Who wrote this**, and do they have the right training? **What is the purpose**: to inform or to sell something? **How recent** is it, since medical advice changes? **What is the evidence**: does it cite studies or expert groups? **Do other reliable sources agree?** Government health websites (.gov), university and hospital sites (.edu, and many .org sites with medical review) and professional medical organizations are generally dependable. Social media posts, anonymous blogs, advertisements and testimonials are far less so. Check **at least two** reliable sources before you believe a claim. For concerns about your own health, a search is not a substitute for a professional.

Knowing the right **service** to use also saves time and money. The **school nurse** and **school counselor** are free and close. A **primary care doctor** handles routine care, check-ups and vaccines. **Urgent care** treats problems that need quick attention but are not life-threatening, such as a sprain or an ear infection. The **emergency room**, reached by calling **911**, is for life-threatening problems: trouble breathing, chest pain, heavy bleeding, severe injury or poisoning. **Community clinics** may charge less, and **pharmacists** can answer questions about medicines. Health **insurance** (with its premium and deductible) helps to pay for care, and many places offer help for people without it. Depending on the state and service, some care for teens may be confidential; ask the clinic.

Mental health is health. **Stress** is the body's reaction to demands. **Anxiety** goes further: intense or constant worry, restlessness, a racing heart, stomach problems or trouble sleeping that interferes with daily life. **Depression** is more than a bad day: a low mood or loss of interest in things you used to enjoy that lasts more than two weeks, often with changes in sleep, appetite, energy or concentration, or feelings of worthlessness or hopelessness. These conditions are common, they are medical, not a weakness or a choice, and they are **treatable** with counseling, medicine or both. You should not try to diagnose yourself or a friend; instead, ask for help from someone trained.

If you or someone you know has thoughts of **self-harm or suicide**, get help immediately: call or text **988**, the Suicide and Crisis Lifeline, or call **911** in an emergency. Never keep a friend's safety a secret. To help a friend who seems to be struggling, **check in** with them, **listen** without judging, tell them you care, and encourage them to speak to a trusted adult or counselor, going with them if they want. You can also tell an adult yourself. Reaching out is a sign of strength, and the sooner people get help, the sooner they tend to feel better.
`,
  ],
  cards: [
    ["Credentials", "Training and qualifications that show expertise."],
    ["Reliable source", "Information from a trustworthy, evidence-based origin."],
    ["Urgent care", "A clinic for problems needing quick care that are not life-threatening."],
    ["Emergency room", "Hospital care for life-threatening problems."],
    ["Anxiety", "Intense or constant worry that interferes with daily life."],
    ["Depression", "A persistent low mood or loss of interest lasting weeks."],
    ["988", "The Suicide and Crisis Lifeline, by call or text."],
    ["Support network", "People you can turn to for help."],
  ],
  closed: [
    [
      "Which source is most likely reliable for health information?",
      ["A government health website", "An anonymous blog", "A social media ad", "A friend's rumor"],
      "A",
    ],
    [
      "Which situation needs the emergency room (911)?",
      ["Chest pain and trouble breathing", "A mild cold", "A small scrape", "A sore muscle"],
      "A",
    ],
    [
      "How many reliable sources should you check before you believe a health claim?",
      ["None", "At least two", "Only one", "A hundred"],
      "B",
    ],
    [
      "What number can you call or text for the Suicide and Crisis Lifeline?",
      ["411", "611", "988", "999"],
      "C",
    ],
    [
      "Depression is best described as:",
      ["A persistent low mood or loss of interest, which is treatable", "A weakness", "A choice", "Something that cannot be treated"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "A student finds a social media post claiming that a herbal tea cures anxiety \"in one day\" and tells readers to stop seeing their doctor. Evaluate the post using at least four source-evaluation questions, say what you would do to check the claim, and explain who you would ask for help with anxiety.",
      scheme: [
        "Uses at least four questions: author, purpose, date, evidence, agreement",
        "Identifies red flags in the post (one-day cure, tells readers to stop seeing a doctor, selling)",
        "Describes checking at least two reliable sources such as a government or medical website",
        "Names who to ask for help, such as a school counselor, doctor or trusted adult",
      ],
      model:
        "Who wrote it, and do they have medical training? Is the purpose to inform or to sell tea? How recent is it, and does it cite evidence? Do other reliable sources agree? The red flags are a cure in one day and the advice to stop seeing a doctor. I would check at least two reliable sources, such as a government health site and a hospital website. For anxiety, I would ask the school counselor, my doctor or a trusted adult.",
      answers: [
        [
          "full",
          "[[0|I'd ask who wrote it and whether they have medical training, whether it's meant to inform or sell tea, how recent it is, and if there's evidence and other sources agree.]] [[1|The red flags are a one-day cure and telling people to stop seeing their doctor.]] [[2|I'd check at least two reliable sources, like a government health site and a hospital website.]] [[3|For anxiety, I'd ask the school counselor, my doctor or a trusted adult.]]",
          "Full marks. The questions, the red flags and the plan are all clear.",
        ],
        [
          "full",
          "[[0|First, who is the author and what are their credentials? Second, what do they gain, is it an ad? Third, is there a date, and do they cite studies?]] [[1|Promising a cure in a day and saying to skip the doctor are dangerous claims.]] [[2|I'd search a .gov site and a university medical site, and see if they say the same.]] [[3|I'd talk to a school counselor or a doctor, since anxiety is treatable.]]",
          "Full marks. Treating anxiety as treatable is accurate and encouraging.",
        ],
        [
          "partial",
          "[[0|Check who wrote it.]] [[3|Ask a doctor.]] The post must be true because lots of people liked it.",
          "Likes are not evidence. Check credentials, purpose and other reliable sources.",
        ],
        [
          "partial",
          "[[1|Telling people to skip the doctor is a red flag.]] [[2|Check a government site.]] Herbal teas are always safe and can replace therapy.",
          "Herbal products are not a replacement for professional help. Ask a counselor or doctor.",
          true,
        ],
        [
          "weak",
          "I would believe it and buy the tea. Social media has the best advice.",
          "Social media posts are often unreliable. Check the evidence.",
        ],
        [
          "weak",
          "Anxiety is made up, so I would not ask anyone for help.",
          "Anxiety is a real, common and treatable condition.",
        ],
      ],
    },
    {
      prompt:
        "A friend has seemed down for three weeks: sleeping much more, no longer going to practice, and saying that nothing matters. Describe the signs that suggest it could be depression (without diagnosing), what you would do and say, when you would seek immediate help, and which services or numbers are available.",
      scheme: [
        "Describes signs such as low mood, loss of interest, sleep changes and hopeless statements lasting weeks, without diagnosing",
        "Describes checking in and listening without judging, and encouraging the friend to talk to a trusted adult or counselor",
        "States when to get immediate help (talk of self-harm or suicide) and not to keep it secret",
        "Names services or numbers, such as 988, 911, school counselor, doctor",
      ],
      model:
        "Signs of concern are a low mood and loss of interest for more than two weeks, sleeping much more, stopping practice and saying nothing matters. I can't diagnose it, but I would check in, listen without judging, tell my friend I care, and encourage them to talk to the school counselor or another trusted adult. If my friend talks about self-harm or suicide, I would get help at once and not keep it a secret. I could call or text 988, call 911 in an emergency, or tell the school counselor.",
      answers: [
        [
          "full",
          "[[0|Signs of concern are a low mood and loss of interest lasting weeks, sleeping much more, quitting practice and saying nothing matters, though I can't diagnose it.]] [[1|I'd check in, listen without judging, tell my friend I care, and encourage them to talk to the school counselor or another trusted adult.]] [[2|If they ever talked about hurting themselves or suicide, I'd get help immediately and not keep it a secret.]] [[3|I could call or text 988, call 911 in an emergency, or tell the school counselor.]]",
          "Full marks. Caring, careful and clear about immediate help.",
        ],
        [
          "full",
          "[[0|They've been low for over two weeks, lost interest in the team, changed their sleep and sound hopeless, which are reasons to be concerned, not a diagnosis.]] [[1|I'd sit with them, listen, say I'm here for you, and offer to go with them to the counselor.]] [[2|Any mention of self-harm means I must tell an adult at once, even if they ask me to keep it secret.]] [[3|The school counselor, their doctor, the 988 line and 911 for emergencies are all available.]]",
          "Full marks. Offering to go with them is a practical, kind step.",
        ],
        [
          "partial",
          "[[0|They seem sad and have stopped going to practice.]] [[1|I'd listen to them.]] I would keep it a secret even if they talk about hurting themselves, because friends keep secrets.",
          "Safety concerns must never be kept secret. Tell a trusted adult or call 988.",
        ],
        [
          "partial",
          "[[2|If they talk about suicide I'd get help right away.]] [[3|988 is a number to call.]] I'd tell them they are just being dramatic and should snap out of it.",
          "Dismissing feelings can make someone feel worse. Listen with care.",
          true,
        ],
        [
          "weak",
          "It is not my business. My friend should handle it alone.",
          "Friends can help by checking in and connecting them with support.",
        ],
        [
          "weak",
          "I would diagnose my friend with depression and treat it myself.",
          "Only trained professionals can diagnose. Encourage your friend to see one.",
        ],
      ],
    },
  ],
};

writeCourse(
  "physical-education-11-grade-11.json",
  "Physical Education 11",
  "Grade 11",
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
