import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Computer Science Principles, Grade 9, Quarter 1. Standards: CSTA K-12
 * Computer Science Standards (computing systems, algorithms and programming,
 * data and analysis, networks and the internet, impacts of computing), in the
 * school's own words. Code is in Python and has been traced by hand.
 */

const w1: WeekInput = {
  topic: "How a computer works, troubleshooting, and a first program",
  note: `
## Objectives

Students will be able to:

1. describe the parts of a computer, including hardware, software and the operating system, and how they work together;
2. troubleshoot a simple computing problem using a systematic approach;
3. write a program in a block or text language that uses sequence, variables and output.

## Materials

A disassembled computer or labeled photographs, a laptop for each pair, a troubleshooting flowchart, a Python environment, the quiz.

## Starter (7 minutes)

Hold up a laptop and ask: "What happens between the moment you press a key and the letter appears on the screen?" List the steps students suggest on the board, then reorder them into input, processing, storage and output.

## Main activity

1. Hardware: the CPU (processor) carries out instructions, RAM is short-term memory that is lost when the power goes off, storage (SSD or hard drive) keeps data permanently, input devices (keyboard, mouse, microphone) and output devices (screen, speakers). Software: programs that tell the hardware what to do. The operating system (Windows, macOS, ChromeOS, Android) manages hardware resources and runs applications.
2. Troubleshooting: define the problem, reproduce it, check the simple things first (power, cables, restart), change one thing at a time, test, and record what worked. Practice on a scenario: a laptop will not connect to school Wi-Fi.
3. First program in Python: a program is a sequence of instructions run from top to bottom. Variables store values. print displays output. Example: name = "Ana", age = 14, print("Hello", name), print(age + 1).

## Checking for understanding

Ask: "If a computer has plenty of storage but runs slowly with many programs open, which component may be the limit?"

## Quiz

Hardware, software and a first program.
`,
  reading: [
    "Inside the machine, fixing it, and telling it what to do",
    `
Every computer, from a phone to a school laptop, follows the same pattern: input, processing, storage and output. **Hardware** is the physical equipment. The **CPU** (central processing unit) is the brain that carries out instructions, billions of them each second. **RAM** (random access memory) is the computer's short-term workspace; it holds the programs and files that you are using right now, and everything in it is lost when the power goes off. **Storage**, such as a solid-state drive (SSD), keeps your files permanently, even when the device is off. **Input devices** such as a keyboard, mouse, camera and microphone send data in, and **output devices** such as the screen and speakers present results. **Software** is the set of programs that tell the hardware what to do. The most important software is the **operating system (OS)**, such as Windows, macOS, ChromeOS or Android. It manages the hardware (memory, files, devices), provides the screen that you see, and runs other programs, called **applications**. When you open a browser, the OS loads it from storage into RAM, and the CPU runs its instructions. A computer with plenty of storage but little RAM may run slowly when many programs are open, since there is not enough short-term space.

When something goes wrong, use a systematic approach to **troubleshoot**. First, **define the problem** clearly: "My laptop will not connect to the school Wi-Fi" is better than "the internet is broken." Next, **reproduce** it: does it happen every time? Does it happen to other devices? Then **check the simple things first**: is Wi-Fi turned on, is airplane mode off, is the device within range? Restarting often fixes problems because it clears RAM and reloads the OS. **Change one thing at a time** and test after each change, so that you know what worked. If nothing works, **ask for help** with a clear description of what you tried. Finally, **record** the solution so that you can fix it faster next time.

Computers do exactly what the instructions say. A **program** is a sequence of instructions, run from top to bottom. In Python, you can write:

    name = "Ana"
    age = 14
    print("Hello", name)
    print(age + 1)

The first two lines create **variables**, named places that store values. A variable name, age, stores the number 14. The **print** command sends output to the screen. The first print shows Hello Ana. The second print calculates age + 1, which is 15, and shows 15. Because the instructions run in order, changing the order changes the result: if print(age + 1) came before age = 14, the program would fail, since age would not exist yet. Programs follow three basic building blocks: **sequence** (steps in order), **selection** (choices) and **iteration** (repetition). This week we use sequence, and next week we add the others.
`,
  ],
  cards: [
    ["CPU", "The processor that carries out instructions."],
    ["RAM", "Short-term memory that is lost when the power goes off."],
    ["Storage", "Long-term memory for files, such as an SSD."],
    ["Operating system", "Software that manages the hardware and runs applications."],
    ["Troubleshoot", "Find and fix a problem step by step."],
    ["Variable", "A named place that stores a value."],
    ["print", "A command that displays output."],
    ["Sequence", "Instructions run one after another in order."],
  ],
  closed: [
    [
      "Which component loses its data when the power is turned off?",
      ["SSD", "RAM", "Hard drive", "Operating system"],
      "B",
    ],
    [
      "What is the main job of an operating system?",
      ["To store photos", "To manage hardware and run applications", "To connect to the internet only", "To make the screen bright"],
      "B",
    ],
    [
      "What is the best first step in troubleshooting a laptop that will not connect to Wi-Fi?",
      ["Buy a new laptop", "Check simple things such as whether Wi-Fi is on and airplane mode is off", "Change five settings at once", "Delete all files"],
      "B",
    ],
    [
      "What does this print? age = 14, then print(age + 1)",
      ["14", "15", "age + 1", "141"],
      "B",
    ],
    [
      "Why change only one thing at a time when troubleshooting?",
      ["It is faster", "So you know which change fixed the problem", "It uses less power", "Computers require it"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A student's laptop is very slow whenever she has a video call, a browser with 20 tabs and a game open at the same time, but it is fast when she uses one program. Explain which hardware component is most likely the limit and why, and describe what the operating system does in this situation. Suggest two things she could try.",
      scheme: [
        "Identifies RAM as the likely limit because it holds all the running programs",
        "Explains that with many programs the RAM fills up and the computer slows down",
        "Explains that the OS manages memory and shares the CPU among the applications",
        "Suggests two reasonable fixes, such as closing programs or tabs, restarting, or adding more RAM",
      ],
      model:
        "RAM is the most likely limit, because it holds all the programs that are running. With a video call, 20 tabs and a game, the RAM fills up and the computer slows down. The operating system manages the memory and shares the CPU among the applications, so when memory runs short it has to work harder. She could close tabs and programs she is not using, restart the laptop, or upgrade the RAM.",
      answers: [
        [
          "full",
          "[[0|The most likely limit is RAM, because it holds every program that is running.]] [[1|With a call, 20 tabs and a game, the RAM fills up and everything slows down.]] [[2|The operating system manages the memory and shares the CPU among all the programs, so it has to work harder when memory is short.]] [[3|She could close tabs and programs she isn't using, or restart the laptop to clear the RAM; adding more RAM would also help.]]",
          "Full marks. The explanation links the symptom to the right component.",
        ],
        [
          "full",
          "[[0|RAM is the bottleneck: it's the short-term memory that keeps running programs.]] [[1|Each program and tab takes memory, so with a lot open, there isn't enough, which makes the whole laptop slow.]] [[2|The OS allocates the memory and CPU time to each application, and it struggles when it has to share a small amount.]] [[3|Two fixes: close what she isn't using, and upgrade the RAM if it keeps happening.]]",
          "Full marks. Using the word bottleneck is accurate.",
        ],
        [
          "partial",
          "[[0|The RAM is the limit.]] [[3|She could close some tabs and restart.]] The hard drive is full so the laptop is slow.",
          "Storage space does not usually slow a laptop when many programs are running; RAM does. Explain what the OS does.",
        ],
        [
          "partial",
          "[[2|The OS manages memory and shares the CPU.]] [[3|She could restart the laptop.]] The monitor is too small so it slows down.",
          "The screen size does not slow the computer. Identify RAM as the limit and explain why.",
          true,
        ],
        [
          "weak",
          "The laptop is just old and nothing can be done.",
          "The pattern, slow with many programs and fast with one, points to a specific limit, RAM. Name it and suggest fixes.",
        ],
        [
          "weak",
          "[[3|She could close programs.]] The CPU is the same as the RAM, they are both the brain.",
          "The CPU carries out instructions and RAM holds the programs and data in use. They are different components.",
        ],
      ],
    },
    {
      prompt:
        "Trace this program and write exactly what it prints: name = \"Ana\", age = 14, print(\"Hello\", name), age = age + 1, print(\"Next year you will be\", age). Then explain what happens to the variable age on the line age = age + 1, and what error occurs if the line print(age) is moved above the line age = 14.",
      scheme: [
        "States that the first print shows Hello Ana",
        "States that the second print shows Next year you will be 15",
        "Explains that age = age + 1 takes the current value 14, adds 1 and stores the result 15 back in the variable",
        "Explains that moving print(age) above the line that creates it causes an error because the variable does not exist yet",
      ],
      model:
        "The program prints Hello Ana and then Next year you will be 15. On the line age = age + 1, the computer takes the current value of age, 14, adds 1, and stores the result, 15, back in age. If print(age) were above age = 14, there would be an error because age would not exist yet when that line runs.",
      answers: [
        [
          "full",
          "[[0|The first print shows Hello Ana.]] [[1|The second print shows Next year you will be 15.]] [[2|On age = age + 1 the computer reads 14, adds 1, and stores 15 back into age.]] [[3|If print(age) came before age = 14, the program would give an error, because the variable hasn't been created yet.]]",
          "Full marks. The order of instructions is the key point.",
        ],
        [
          "full",
          "Output: [[0|Hello Ana]] then [[1|Next year you will be 15]]. [[2|The line age = age + 1 updates the variable: it takes the old value, 14, and replaces it with 15.]] [[3|If I moved print(age) to the top, Python would say age isn't defined, since programs run from top to bottom.]]",
          "Full marks. 'Not defined' is the exact kind of message Python gives.",
        ],
        [
          "partial",
          "[[0|It prints Hello Ana.]] [[1|Then it prints Next year you will be 15.]] age = age + 1 is wrong because a number can't equal itself plus 1. Moving the line has no effect.",
          "In programming, = means assign, not equal. And the order matters: using a variable before it exists causes an error.",
        ],
        [
          "partial",
          "[[2|age = age + 1 updates age to 15.]] [[3|Moving print above would cause an error.]] The program prints Hello and then 14.",
          "The first print shows Hello Ana, and the second shows 15 because age was changed before it was printed.",
          true,
        ],
        [
          "weak",
          "It prints Ana and 14 and the program has no error however I order the lines.",
          "The program prints Hello Ana and 15. Order matters because instructions run from top to bottom.",
        ],
        [
          "weak",
          "[[1|It prints Next year you will be 15.]] The line age = age + 1 doesn't do anything; it is just a comment.",
          "It is an instruction that changes the value of age.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Making choices and repeating actions",
  note: `
## Objectives

Students will be able to:

1. use conditionals to make a program respond to different inputs;
2. use loops to repeat actions and simplify a program.

## Materials

Laptops with Python, a grading-program starter file, loop tracing tables, the problem set.

## Starter (6 minutes)

Ask: "How does a vending machine decide what to do when you press B4? How does it know when to stop dispensing?" Collect ideas about choices and repetition.

## Main activity

1. Conditionals: if, elif, else. Conditions use comparison operators (==, !=, <, >, <=, >=) and Boolean operators (and, or, not). Example: score = 72; if score >= 90: grade = "A"; elif score >= 80: grade = "B"; elif score >= 70: grade = "C"; else: grade = "F". Output: C. Indentation shows which lines belong to which branch.
2. Input: name = input("Name? ") and converting with int(). A program that reads a number and says whether it is even.
3. Loops: for i in range(3): print(i) prints 0, 1, 2. while loops repeat while a condition is true; an infinite loop never ends. A loop to add 1 through 5: total = 0; for n in range(1, 6): total = total + n; print(total) shows 15. Compare to writing the line five times.
4. Write a program: ask for a number and print a countdown to 1.

## Checking for understanding

Whiteboards: what does for i in range(1, 4): print(i * 2) print?

## Problem set

Trace conditionals and loops.
`,
  reading: [
    "Programs that decide and repeat",
    `
Real programs respond to different situations and repeat tasks without getting tired. Two building blocks make this possible: **selection** and **iteration**.

**Selection** means the program chooses among actions based on a condition. In Python, you use **if**, **elif** (short for "else if") and **else**:

    score = 72
    if score >= 90:
        grade = "A"
    elif score >= 80:
        grade = "B"
    elif score >= 70:
        grade = "C"
    else:
        grade = "F"
    print(grade)

The program tests each condition in order and runs the first block whose condition is true, skipping the rest. With score 72, the first two tests are false and the third is true, so grade is "C" and the program prints C. The **indented** lines belong to the branch above them, so indentation matters in Python. A condition is a **Boolean** expression that is true or false, and it uses comparison operators: == (equal; a single = would assign), != (not equal), <, >, <=, >=. You can combine conditions with **and**, **or** and **not**: if age >= 13 and age <= 19 tests for a teenager. Programs can also take **input** from the user: age = int(input("How old are you? ")) reads text and converts it to a whole number. A program might then print "teen" if the age is between 13 and 19, and "not a teen" otherwise.

**Iteration** means repeating. A **for** loop repeats a set number of times:

    for i in range(3):
        print(i)

The function range(3) produces 0, 1 and 2, so this prints three lines: 0, 1 and 2. Notice that range starts at 0 and stops before 3. To start at 1, use range(1, 4), which gives 1, 2 and 3. A loop can also build up a result. This program adds the numbers from 1 to 5:

    total = 0
    for n in range(1, 6):
        total = total + n
    print(total)

The value of total grows 1, 3, 6, 10, and finally 15. A **while** loop repeats as long as a condition is true:

    count = 3
    while count > 0:
        print(count)
        count = count - 1

It prints 3, 2 and 1. If we forget the line count = count - 1, the condition stays true forever and the program never stops, which is an **infinite loop**. Loops make programs shorter and easier to change: to add the numbers from 1 to 1000, you only change one number, not write a thousand lines. Together, selection, iteration and sequence are enough to build any program.
`,
  ],
  cards: [
    ["if / elif / else", "Python keywords for choosing among branches."],
    ["Boolean", "A value that is true or false."],
    ["==", "The comparison operator for equality (not assignment)."],
    ["for loop", "A loop that repeats a set number of times."],
    ["range(3)", "The numbers 0, 1 and 2."],
    ["while loop", "A loop that repeats while a condition is true."],
    ["Infinite loop", "A loop whose condition never becomes false."],
    ["Indentation", "Spaces that show which lines belong to a block."],
  ],
  closed: [
    [
      "What does this print? score = 72, then the if / elif / else chain with >= 90, >= 80, >= 70 and else",
      ["A", "B", "C", "F"],
      "C",
    ],
    [
      "What does for i in range(3): print(i) print?",
      ["1 2 3", "0 1 2", "0 1 2 3", "3 2 1"],
      "B",
    ],
    [
      "What value is total after: total = 0; for n in range(1, 6): total = total + n",
      ["5", "10", "15", "21"],
      "C",
    ],
    [
      "Which loop never ends? count = 3; while count > 0: print(count)",
      ["It ends after 3 passes", "It is an infinite loop because count is never changed", "It ends after 4 passes", "It does not run"],
      "B",
    ],
    [
      "Which operator tests whether two values are equal in a condition?",
      ["=", "==", "=>", "!="],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a Python program that asks the user for a temperature in degrees Fahrenheit and prints \"Freezing\" if it is below 32, \"Cold\" if it is below 60, \"Warm\" if it is below 85, and \"Hot\" otherwise. Then say what it prints for 45 and for 90, and explain why the order of the conditions matters.",
      scheme: [
        "Reads the input and converts it to a number with int() or float()",
        "Uses an if / elif / else chain with correct comparison operators",
        "States the output for 45 is Cold and for 90 is Hot",
        "Explains that conditions are tested in order and the first true block runs, so the order from lowest to highest keeps the logic right",
      ],
      model:
        "temp = int(input(\"Temperature? \")). if temp < 32: print(\"Freezing\"). elif temp < 60: print(\"Cold\"). elif temp < 85: print(\"Warm\"). else: print(\"Hot\"). For 45 it prints Cold and for 90 it prints Hot. The order matters because the chain stops at the first true condition, so a value of 20 would match every test, but only the first needs to run.",
      answers: [
        [
          "full",
          `[[0|temp = int(input("Temperature? "))]] [[1|if temp < 32: print("Freezing") elif temp < 60: print("Cold") elif temp < 85: print("Warm") else: print("Hot")]] [[2|For 45 it prints Cold, and for 90 it prints Hot.]] [[3|The order matters because Python runs the first true branch and skips the rest, so if I put temp < 85 first, 20 would print Warm.]]`,
          "Full marks. The program is correct, and your example shows the effect of the wrong order.",
        ],
        [
          "full",
          `[[0|I'd read the number with temp = float(input("Enter degrees F: ")) so that decimals work.]] [[1|Then if temp < 32 prints Freezing, elif temp < 60 prints Cold, elif temp < 85 prints Warm, else prints Hot.]] [[2|45 is not below 32 but is below 60, so it prints Cold; 90 fails all three tests so the else prints Hot.]] [[3|Conditions are checked from the top, and the first one that is true wins, so they have to go from the smallest limit to the largest.]]`,
          "Full marks. Using float is a good choice since temperatures can have decimals.",
        ],
        [
          "partial",
          `[[0|temp = int(input("Temperature? "))]] if temp < 32: print("Freezing") if temp < 60: print("Cold") if temp < 85: print("Warm") else: print("Hot") [[2|45 prints Cold and 90 prints Hot.]]`,
          "Using separate if statements instead of elif means several can run: 20 would print Freezing, Cold and Warm. Use elif so only one runs.",
        ],
        [
          "partial",
          `[[1|if temp < 32 ... elif temp < 60 ... elif temp < 85 ... else Hot]] [[3|The first true condition runs.]] temp = input("Temperature? ") and then compare temp < 32.`,
          "input() gives text, so compare after converting it with int() or float().",
          true,
        ],
        [
          "weak",
          `print("Freezing") print("Cold") print("Warm") print("Hot") That prints every word and covers all cases.`,
          "A conditional prints only the right word for the temperature. Use if, elif and else.",
        ],
        [
          "weak",
          `[[2|45 prints Cold.]] if temp = 32: print("Freezing") because = tests if it is equal.`,
          "A single = assigns a value. Use == to test equality, and < to test below.",
        ],
      ],
    },
    {
      prompt:
        "Trace each loop and write what it prints: (a) for i in range(1, 4): print(i * 2) (b) count = 3, then while count > 0: print(count), count = count - 1. Then write a for loop that prints the numbers from 10 down to 1, and explain why a loop is better than writing ten print statements.",
      scheme: [
        "Traces (a) correctly as 2, 4, 6",
        "Traces (b) correctly as 3, 2, 1",
        "Writes a correct countdown, such as for n in range(10, 0, -1): print(n)",
        "Explains that a loop is shorter, easier to change and less likely to contain mistakes than repeated statements",
      ],
      model:
        "(a) range(1, 4) gives 1, 2, 3, so it prints 2, 4 and 6. (b) It prints 3, 2 and 1, then count becomes 0 and the loop stops. A countdown is for n in range(10, 0, -1): print(n). A loop is shorter, easier to change (to count from 100, change one number) and less likely to have a typing mistake than ten print statements.",
      answers: [
        [
          "full",
          `(a) [[0|It prints 2, 4 and 6, since i is 1, 2 and 3.]] (b) [[1|It prints 3, 2 and 1, and stops when count reaches 0.]] [[2|for n in range(10, 0, -1): print(n)]] [[3|A loop is shorter, easy to change if I want to count from 100, and has fewer chances for typing errors than ten separate prints.]]`,
          "Full marks. Both traces are right and the countdown uses a negative step correctly.",
        ],
        [
          "full",
          `(a) [[0|range(1, 4) is 1, 2, 3, so the output is 2, 4, 6.]] (b) [[1|count starts at 3, prints 3, then 2, then 1, then count is 0 and the test fails.]] [[2|A countdown: n = 10, while n > 0: print(n), n = n - 1.]] [[3|The loop saves typing, and changing the starting number changes the whole program with one edit, which means fewer mistakes.]]`,
          "Full marks. Using a while loop for the countdown is also correct.",
        ],
        [
          "partial",
          `(a) [[0|2, 4, 6.]] (b) [[1|3, 2, 1.]] for n in range(10, 1): print(n) A loop is better because it looks neat.`,
          "range(10, 1) gives nothing because the default step is +1. Use a step of -1: range(10, 0, -1). And explain why loops help.",
        ],
        [
          "partial",
          `(a) 1, 2, 3. (b) [[1|3, 2, 1.]] [[2|for n in range(10, 0, -1): print(n)]] [[3|Loops are shorter.]]`,
          "In (a) the print shows i * 2, so the output is 2, 4, 6, not 1, 2, 3.",
          true,
        ],
        [
          "weak",
          `(a) 1 2 3 4 (b) 3 2 1 0 and the countdown is print(10 to 1).`,
          "Trace each pass of the loop carefully, and write a real loop for the countdown.",
        ],
        [
          "weak",
          `[[3|Loops are better because they are shorter.]] I would just write ten print statements because it's simple.`,
          "Ten print statements are harder to change and more error-prone. Use a loop.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Breaking problems down, procedures and designing before coding",
  note: `
## Objectives

Students will be able to:

1. break a problem into smaller parts and write a procedure for each;
2. design an algorithm in pseudocode or a flowchart before coding it.

## Materials

A flowchart template, index cards for sorting, a computer lab, the worksheet.

## Starter (6 minutes)

Ask: "How would you give instructions to someone to make a peanut butter sandwich so exactly that a robot could follow them?" Take a literal-minded approach to student instructions and show the gaps.

## Main activity

1. Decomposition: break a large problem into smaller sub-problems. Example: a program that makes a school lunch order total: get the items, find the prices, add them up, add tax, print the receipt.
2. Procedures (functions): a named block of code that can be reused. def area(width, height): return width * height. Parameters are inputs; return gives back a value. Call it with arguments: print(area(3, 4)) shows 12. Procedures reduce repetition and make a program easier to test.
3. Design before coding: pseudocode (plain-language steps) and flowcharts (ovals for start/end, rectangles for steps, diamonds for decisions). Example: Should I bring an umbrella? Check the forecast; if the chance of rain is above 40 percent, bring it; otherwise, do not.
4. Translate the design into Python and compare.

## Checking for understanding

Ask: "What does area(5, 2) return? What is the parameter and what is the argument?"

## Worksheet

A flowchart and a procedure.
`,
  reading: [
    "Big problems in small pieces",
    `
Most real programs are too large to write in one go, so programmers use **decomposition**: they break a big problem into smaller **sub-problems**, solve each one, and combine them. Imagine you are designing a program that totals a student's cafeteria order. You could break it down into: (1) get the items, (2) look up each price, (3) add the prices, (4) add the sales tax, and (5) print the receipt. Each part is simpler than the whole and can be written, tested and fixed on its own. Decomposition also lets a team divide the work.

In programming, each sub-problem is often written as a **procedure**, also called a **function**: a named block of code that performs a task and can be reused. In Python:

    def area(width, height):
        return width * height

    print(area(3, 4))
    print(area(5, 2))

The word **def** defines the procedure. **width** and **height** are **parameters**, the inputs that the procedure expects. The **return** statement sends back the result. When we **call** area(3, 4), the numbers 3 and 4 are the **arguments**, and the procedure returns 12; the second call returns 10. We write the rule once and use it many times, which reduces repetition and mistakes, and if we need to change the rule, we change it in one place. Procedures also make programs easier to read, because a name such as calculate_tax tells you what the code does.

Before you write code, it helps to **design the algorithm** first. An algorithm is a step-by-step set of instructions for solving a problem. You can write it in **pseudocode**, plain-language steps that are not tied to a particular programming language:

    Check the chance of rain
    If the chance is more than 40 percent
        Bring an umbrella
    Else
        Leave the umbrella at home

A **flowchart** shows the same logic as a diagram. An oval marks the start and the end, a rectangle marks an action, and a diamond marks a decision with two exits, "yes" and "no." Arrows show the order. Designing first helps you to catch missing steps and unclear decisions before you spend time on code, and helps others understand your plan. When you translate the design into Python, each decision becomes an if statement and each repeated step becomes a loop. A good test of an algorithm is to ask a friend to follow it exactly. If they get confused, add details.
`,
  ],
  cards: [
    ["Decomposition", "Breaking a problem into smaller sub-problems."],
    ["Procedure (function)", "A named block of code that performs a task and can be reused."],
    ["Parameter", "An input variable in a procedure's definition."],
    ["Argument", "The actual value passed to a procedure when it is called."],
    ["return", "A statement that sends a value back from a procedure."],
    ["Algorithm", "A step-by-step set of instructions for solving a problem."],
    ["Pseudocode", "Plain-language steps describing an algorithm."],
    ["Flowchart", "A diagram of an algorithm using ovals, rectangles and diamonds."],
  ],
  closed: [
    [
      "What does print(area(5, 2)) show if area returns width * height?",
      ["7", "10", "52", "25"],
      "B",
    ],
    [
      "In area(3, 4), the numbers 3 and 4 are:",
      ["Parameters", "Arguments", "Return values", "Variables of the loop"],
      "B",
    ],
    [
      "In a flowchart, what shape shows a decision?",
      ["Oval", "Rectangle", "Diamond", "Circle"],
      "C",
    ],
    [
      "Why is decomposition useful?",
      ["It makes problems smaller and easier to solve and test", "It makes programs longer", "It removes the need to test", "It is required by Python"],
      "A",
    ],
    [
      "Which of these is an example of pseudocode?",
      ["If chance of rain is more than 40 percent, bring an umbrella", "def umbrella():", "print(umbrella)", "An oval and an arrow"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Break down the problem of totaling a cafeteria order into at least four sub-problems. Then write a Python procedure total_with_tax(subtotal) that adds 7.5 percent sales tax and returns the total, and say what it returns for 10.00.",
      scheme: [
        "Lists at least four sensible sub-problems (get items, find prices, add them, apply tax, print receipt)",
        "Writes a procedure with a parameter and a return statement",
        "Computes the tax correctly using 0.075 (or 1.075)",
        "States that total_with_tax(10.00) returns 10.75",
      ],
      model:
        "Sub-problems: get the items, look up each price, add the prices for the subtotal, add the tax, and print the receipt. def total_with_tax(subtotal): return subtotal * 1.075. For 10.00 it returns 10.75, since the tax is 0.75.",
      answers: [
        [
          "full",
          `[[0|The sub-problems are: get the items, look up each price, add the prices to get a subtotal, add the sales tax, and print the receipt.]] [[1|def total_with_tax(subtotal): return subtotal + subtotal * 0.075]] [[2|The tax is 7.5 percent, which is 0.075 as a decimal.]] [[3|total_with_tax(10.00) returns 10.75.]]`,
          "Full marks. The decomposition is sensible and the function is correct.",
        ],
        [
          "full",
          `[[0|Decomposition: 1) ask for each item, 2) find its price, 3) keep a running subtotal, 4) compute tax, 5) show the total.]] [[1|def total_with_tax(subtotal): return subtotal * 1.075]] [[2|Multiplying by 1.075 adds 7.5 percent in one step.]] [[3|For 10.00 the result is 10.75.]]`,
          "Full marks. Multiplying by 1.075 is an efficient way to add tax.",
        ],
        [
          "partial",
          `[[0|The parts are get the items, find prices and add them up and print.]] [[1|def total_with_tax(subtotal): return subtotal * 0.075]] The result for 10.00 is 0.75.`,
          "That returns only the tax, not the total. The total is the subtotal plus the tax: 10.75.",
        ],
        [
          "partial",
          `[[2|7.5 percent is 0.075.]] [[3|The answer for 10.00 is 10.75.]] def total_with_tax(subtotal): print(subtotal + 0.075)`,
          "A procedure that returns a value should use return, and the tax should be a percent of the subtotal: subtotal * 0.075.",
          true,
        ],
        [
          "weak",
          `The problem is too big to break down. I would write the whole program in one big piece.`,
          "Decomposition makes a big problem manageable. List the smaller parts.",
        ],
        [
          "weak",
          `[[1|def total_with_tax(subtotal): return subtotal + 7.5]] For 10.00 it returns 17.5.`,
          "7.5 percent is not the same as adding 7.5 dollars. The tax is 0.075 times the subtotal.",
        ],
      ],
    },
    {
      prompt:
        "Design an algorithm in pseudocode for deciding whether to bring an umbrella: check the chance of rain; bring the umbrella if it is more than 40 percent, or if the forecast says storms; otherwise do not. Describe how this would look as a flowchart, and write it as a Python function should_bring_umbrella(chance, storms) that returns True or False.",
      scheme: [
        "Writes clear pseudocode with a check, a decision and both outcomes",
        "Describes the flowchart with a start oval, a decision diamond with yes and no paths, and an end oval",
        "Writes a Python function with a correct condition using or",
        "Returns True or False correctly, such as return chance > 40 or storms",
      ],
      model:
        "Pseudocode: check the chance of rain and the forecast; if the chance is more than 40 or storms are forecast, bring the umbrella; else, do not. The flowchart has a start oval, a diamond asking whether the chance is more than 40 or storms are forecast, with a yes arrow to a bring-umbrella rectangle and a no arrow to a leave-it rectangle, and an end oval. In Python: def should_bring_umbrella(chance, storms): return chance > 40 or storms.",
      answers: [
        [
          "full",
          `[[0|Pseudocode: Get the chance of rain and the forecast. If the chance is more than 40 or storms are forecast, bring the umbrella. Otherwise, leave it at home.]] [[1|Flowchart: a start oval, then a diamond asking "chance more than 40 or storms?" with a yes arrow to "bring umbrella" and a no arrow to "leave umbrella," and an end oval.]] [[2|def should_bring_umbrella(chance, storms): return chance > 40 or storms]] [[3|It returns True when either is true and False otherwise.]]`,
          "Full marks. The design, the diagram and the code all match.",
        ],
        [
          "full",
          `[[0|Steps: 1. Read chance and storms. 2. If chance > 40 or storms is true, say bring it. 3. Else say don't bring it.]] [[1|The flowchart starts with an oval, has a diamond for the decision with yes and no exits, a rectangle on each path and an end oval.]] [[2|def should_bring_umbrella(chance, storms): if chance > 40 or storms: return True else: return False]] [[3|It returns True or False depending on the condition.]]`,
          "Full marks. The long version with if and else is equivalent to the short one.",
        ],
        [
          "partial",
          `[[0|Pseudocode: if rain is likely, bring the umbrella.]] [[1|The flowchart has a diamond for the decision.]] def should_bring_umbrella(chance, storms): return chance > 40 and storms`,
          "The problem says 'or', so use or in the code. Your pseudocode should mention both conditions.",
        ],
        [
          "partial",
          `[[2|def should_bring_umbrella(chance, storms): return chance > 40 or storms]] [[3|It returns True or False.]] The flowchart is a list of numbers.`,
          "A flowchart is a diagram with ovals, rectangles, diamonds and arrows. Describe it.",
          true,
        ],
        [
          "weak",
          `Just look outside and decide. There is no need for pseudocode or a flowchart.`,
          "The point is to practice designing an algorithm that anyone, or a computer, can follow.",
        ],
        [
          "weak",
          `[[2|def should_bring_umbrella(chance, storms): return chance > 40 or storms]] I would write the code first and then do the flowchart afterwards.`,
          "Designing before coding catches missing steps early.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Testing, debugging and pair programming",
  note: `
## Objectives

Students will be able to:

1. test and debug a program with a range of test cases;
2. work with a partner using pair programming, with a driver and a navigator.

## Materials

Programs with planted bugs, a test case table template, role cards (driver and navigator), a timer, the worksheet.

## Starter (6 minutes)

Show a function is_even(n) that is claimed to work. Ask: "How would you convince me that it works? How many inputs would you try?" Collect test ideas: 4, 7, 0, -2.

## Main activity

1. Testing: choose test cases that cover normal cases, boundary cases (0, 1, the largest and smallest allowed values) and unusual or invalid cases. For def is_even(n): return n % 2 == 0, test 4 (True), 7 (False), 0 (True), -2 (True). Record expected and actual results in a table. A program can pass some tests and still have a bug.
2. Debugging: kinds of errors in Python: syntax errors (the program will not run, message shows the line), runtime errors (division by zero, using a variable that does not exist), logic errors (wrong answer). Strategy: read the error message, trace the code, add print statements, change one thing at a time. Example logic error: for i in range(1, 5) was meant to print 1 to 5 but prints 1 to 4 (off by one); fix with range(1, 6).
3. Pair programming: the driver types, the navigator reviews and thinks ahead; switch roles every 10 minutes. Good practices: talk through the plan, ask questions politely, share the keyboard fairly.
4. Debug a program in pairs and record the bugs found.

## Checking for understanding

Ask: "Why test with 0 as well as with 4 and 7?"

## Worksheet

A test table and a bug report.
`,
  reading: [
    "Trying to break your own program, and working side by side",
    `
A program that works once may fail on the next input, so programmers **test** carefully. A **test case** is an input together with the output you expect. A good set of test cases includes **normal cases**, typical inputs; **boundary cases**, inputs at the edge of what is allowed, such as 0, 1 or the largest number the program should accept; and **unusual cases**, such as an empty list or a negative number. Consider a function that checks whether a number is even:

    def is_even(n):
        return n % 2 == 0

The % operator gives the remainder after division, so n % 2 is 0 for even numbers. A test table might be:

    Input   Expected   Actual
    4       True       True
    7       False      False
    0       True       True
    -2      True       True

All pass, which gives us confidence. Notice that we included 0 and a negative number, which a beginner might forget. Testing can show the presence of bugs but cannot prove their absence, so test widely.

When a test fails, you **debug**. Python reports **syntax errors** before the program runs: a missing colon after an if line, or a missing quotation mark. The message shows the line number. A **runtime error** occurs while the program runs, such as dividing by zero or using a variable that has not been created. A **logic error** is the trickiest, because the program runs without a message but gives the wrong answer. Suppose a loop was meant to print the numbers from 1 to 5:

    for i in range(1, 5):
        print(i)

It prints 1, 2, 3 and 4, because range stops before the end value. It is an **off-by-one error**. The fix is range(1, 6). To find bugs, read the error message carefully, **trace** the code by hand with sample values, add temporary **print** statements to see the values of variables, and **change one thing at a time**. After a fix, run all your tests again to make sure you did not break something else.

Professional programmers often work in pairs, a practice called **pair programming**. One person is the **driver**, who types the code; the other is the **navigator**, who reviews each line, thinks ahead, spots mistakes and suggests ideas. They **switch roles** regularly, about every ten minutes. Pair programming works best when both partners talk through the plan, ask questions politely, listen to each other, and share the keyboard fairly. Studies have found that pairs often produce code with fewer bugs, and both partners learn from each other.
`,
  ],
  cards: [
    ["Test case", "An input and the output you expect."],
    ["Boundary case", "A test at the edge of the allowed input, such as 0."],
    ["Syntax error", "A mistake in the program's form, found before it runs."],
    ["Runtime error", "An error that happens while the program runs."],
    ["Logic error", "A mistake that makes the program give wrong results without a message."],
    ["Off-by-one error", "A loop that runs one time too many or too few."],
    ["Driver", "The pair programmer who types the code."],
    ["Navigator", "The pair programmer who reviews and plans ahead."],
  ],
  closed: [
    [
      "Which input is a boundary case when testing is_even?",
      ["4", "7", "0", "123456"],
      "C",
    ],
    [
      "What does for i in range(1, 5): print(i) print?",
      ["1 2 3 4 5", "1 2 3 4", "0 1 2 3 4", "2 3 4 5"],
      "B",
    ],
    [
      "A program runs without error messages but gives the wrong answer. This is a:",
      ["Syntax error", "Runtime error", "Logic error", "Compile error"],
      "C",
    ],
    [
      "In pair programming, the navigator:",
      ["Types all the code", "Reviews each line and thinks ahead", "Leaves the room", "Only watches"],
      "B",
    ],
    [
      "After fixing a bug, you should:",
      ["Assume everything works", "Run all your tests again", "Delete the tests", "Rename the program"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A function is meant to return the larger of two numbers: def larger(a, b): if a > b: return a else: return a. Create a test table with at least four test cases (including a case where b is larger and a case where they are equal), predict the actual result of each, and identify which tests fail and what the bug is. Then write the corrected function.",
      scheme: [
        "Includes at least four varied test cases, including b larger and a tie",
        "Gives correct expected results and predicted actual results for the buggy code",
        "Identifies which tests fail (the ones where b is larger) and the bug (the else branch returns a)",
        "Writes the corrected function returning b in the else branch (or using max)",
      ],
      model:
        "Test cases: larger(5, 3) expected 5, actual 5; larger(3, 5) expected 5, actual 3; larger(4, 4) expected 4, actual 4; larger(-2, -7) expected -2, actual -2; larger(-7, -2) expected -2, actual -7. The tests where b is larger fail, because the else branch returns a instead of b. The corrected function is def larger(a, b): if a > b: return a else: return b.",
      answers: [
        [
          "full",
          `[[0|Tests: (5, 3) expected 5; (3, 5) expected 5; (4, 4) expected 4; (-2, -7) expected -2; (-7, -2) expected -2.]] [[1|The buggy code gives 5, 3, 4, -2 and -7 as actual results.]] [[2|The tests (3, 5) and (-7, -2) fail because the else branch returns a instead of b.]] [[3|The corrected function: def larger(a, b): if a > b: return a else: return b.]]`,
          "Full marks. Your tests include cases that expose the bug and a tie.",
        ],
        [
          "full",
          `[[0|I'd test normal cases (10, 2) and (2, 10), a tie (6, 6), a negative pair (-1, -9) and a case with zero (0, 5).]] [[1|Expected: 10, 10, 6, -1, 5. Actual with the bug: 10, 2, 6, -1, 0.]] [[2|The failures are (2, 10) and (0, 5), where b is larger; the bug is that the else part returns a.]] [[3|Fix: change the else to return b, or just return max(a, b).]]`,
          "Full marks. Including zero as a boundary case is a good habit.",
        ],
        [
          "partial",
          `[[0|Tests: (5, 3), (3, 5), (4, 4), (1, 9).]] [[1|Buggy results: 5, 3, 4, 1.]] All pass so there is no bug. The corrected function is the same.`,
          "Compare the actual result with what is expected: for (3, 5) the function returns 3, not 5. That test fails.",
        ],
        [
          "partial",
          `[[2|The bug is in the else branch, which returns a.]] [[3|The fix is to return b.]] I tested only (5, 3) and it passed.`,
          "One test is not enough, and it happened to be the case that hides the bug. Add cases where b is larger.",
          true,
        ],
        [
          "weak",
          `The function is correct. I do not need test cases because the code looks fine.`,
          "A function that looks fine can still have a bug. A test table can expose it.",
        ],
        [
          "weak",
          `[[0|Test (5, 3).]] The bug is that if is spelled wrong. The fix is to rewrite it in a different language.`,
          "The bug is a logic error: the else branch returns the wrong variable.",
        ],
      ],
    },
    {
      prompt:
        "Describe how you and a partner would use pair programming to write a function count_vowels(word) that returns the number of vowels in a word. Explain the roles of the driver and the navigator, when you would switch, and two test cases you would use (with expected results) to check the function.",
      scheme: [
        "Describes the driver's role as typing the code",
        "Describes the navigator's role as reviewing, planning and spotting mistakes",
        "States when to switch roles (regularly, every ten minutes or after a part is finished)",
        "Gives two valid test cases with correct expected results (for example, count_vowels(\"banana\") is 3 and count_vowels(\"rhythm\") is 0)",
      ],
      model:
        "The driver types the code while the navigator reviews each line, plans the next step and spots mistakes. We would switch roles about every ten minutes or after finishing one part. Test cases: count_vowels(\"banana\") should be 3, and count_vowels(\"rhythm\") should be 0. We would also test an empty string, which should give 0.",
      answers: [
        [
          "full",
          `[[0|The driver types the code on the keyboard.]] [[1|The navigator reads each line as it's typed, thinks about the next step and notices mistakes.]] [[2|We'd switch roles about every ten minutes, or when we finish a part like the loop.]] [[3|Tests: count_vowels("banana") should return 3, and count_vowels("rhythm") should return 0.]]`,
          "Full marks. The roles are accurate and your test cases include a case with no vowels.",
        ],
        [
          "full",
          `[[0|One of us is the driver and types while talking about what the line does.]] [[1|The other, the navigator, checks the logic, suggests ideas and watches for syntax errors.]] [[2|After we write the loop we swap, and we swap again every ten minutes so that we both get practice.]] [[3|We'd test "education", which has 5 vowels, and "" the empty string, which has 0.]]`,
          "Full marks. 'education' has e, u, a, i, o: five vowels, so the expected result is correct.",
        ],
        [
          "partial",
          `[[0|The driver types.]] [[1|The navigator watches.]] We would never switch because one person is better. [[3|Test "banana" for 3.]]`,
          "Switching roles is a key part of pair programming so both partners learn. Add a second test case, including one with no vowels.",
        ],
        [
          "partial",
          `[[2|We switch every ten minutes.]] [[3|Test "banana" for 3 and "rhythm" for 0.]] The navigator types and the driver watches.`,
          "The driver types and the navigator reviews. You have the roles reversed.",
          true,
        ],
        [
          "weak",
          `Pair programming means two people on two computers writing the same thing. Tests are not needed.`,
          "Pair programming uses one computer with two roles. Tests help check that the function works.",
        ],
        [
          "weak",
          `[[3|Test "banana" for 3.]] The navigator should type everything because they are the boss.`,
          "The driver types. The navigator reviews and plans ahead.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Binary, spreadsheets and drawing conclusions from data",
  note: `
## Objectives

Students will be able to:

1. explain how numbers, text and images are represented in binary;
2. collect data in a spreadsheet and display it in a chart;
3. use data to find a pattern and draw a conclusion, and note what the data cannot show.

## Materials

Binary place-value cards, a spreadsheet tool, a class survey on sleep hours, color mixing tool for RGB, the worksheet.

## Starter (6 minutes)

Ask: "A light switch has two states. How many different messages can you send with three switches?" Work out 2 x 2 x 2 = 8 and introduce bits.

## Main activity

1. Binary: a bit is 0 or 1; a byte is 8 bits. Place values 128, 64, 32, 16, 8, 4, 2, 1. Convert 1011 to decimal: 8 + 2 + 1 = 11. Convert 13 to binary: 1101. The largest 8-bit number is 255, so a byte has 256 values.
2. Text: characters are numbers. In ASCII, A is 65 (01000001) and a is 97. Unicode includes many languages and emoji.
3. Images: a pixel's color is stored as three numbers (red, green, blue) from 0 to 255, so 24 bits per pixel; a 100 by 100 image has 10,000 pixels, or 240,000 bits (30,000 bytes) if uncompressed.
4. Spreadsheets: enter survey data on hours of sleep for 20 students; compute the mean with =AVERAGE; make a bar chart or histogram. Pattern: most students sleep 6 to 8 hours. Draw a conclusion with care: the data show the pattern for this class, but cannot show why, or whether other students are similar.

## Checking for understanding

Whiteboards: convert 110 binary to decimal, and 9 to binary.

## Worksheet

Binary conversions and a data analysis.
`,
  reading: [
    "Everything is numbers, and numbers can tell stories",
    `
Computers store all information as **bits**, binary digits that are either 0 or 1. A bit is like a light switch that is off or on. Eight bits make a **byte**. Binary works like decimal, but with powers of 2 instead of powers of 10. The place values from the right are 1, 2, 4, 8, 16, 32, 64, 128. To convert the binary number 1011 to decimal, add the place values where there is a 1: 8 + 0 + 2 + 1 = 11. To convert 13 to binary, find the place values that add to 13: 8 + 4 + 1, so the number is 1101. The largest number that can fit in one byte is 11111111, which is 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255, so a byte can represent 256 different values (0 to 255). With n bits you can make 2 to the power of n different patterns: three bits give 8.

**Text** is stored by assigning each character a number. In the ASCII code, the capital letter A is 65, B is 66, and the lowercase letter a is 97. The number 65 in binary is 01000001. A word is stored as a series of such numbers. **Unicode** extends the idea to thousands of characters, including those of many languages and emoji.

**Images** are made of tiny squares called **pixels**. The color of each pixel is stored as three numbers, for red, green and blue (RGB), each from 0 to 255. Pure red is (255, 0, 0), white is (255, 255, 255), and black is (0, 0, 0). Each pixel needs three bytes, or 24 bits. A small image 100 pixels wide and 100 tall has 10,000 pixels, so it needs 30,000 bytes without compression.

Once data are collected, a **spreadsheet** helps to organize and analyze them. Suppose a class records the hours of sleep of 20 students: most are 6, 7 or 8 hours, and a few are 5 or 9. In a spreadsheet you can put the values in a column, find the **mean** with =AVERAGE(A2:A21), the highest with =MAX and the lowest with =MIN, and make a **chart**, such as a bar chart showing how many students slept 5, 6, 7, 8 or 9 hours. The chart shows a **pattern**: the middle of the distribution, 7 hours, is the most common.

Be careful when drawing **conclusions**. You can say: "In this class, most students sleep 6 to 8 hours, with a mean of 7.1." You cannot say that all teenagers sleep 7 hours, because the sample is small and from one class. The data also cannot show **why** students sleep as they do, or whether the amount of sleep affects their grades, unless you collect other data and design the study to test it. A good analyst states the pattern, gives the numbers, and names the limits of the data.
`,
  ],
  cards: [
    ["Bit", "A binary digit: 0 or 1."],
    ["Byte", "Eight bits."],
    ["Binary place values", "1, 2, 4, 8, 16, 32, 64, 128 from the right."],
    ["ASCII", "A code that assigns numbers to characters, such as A = 65."],
    ["Pixel", "A tiny square of color in an image."],
    ["RGB", "Red, green and blue values from 0 to 255 that set a pixel's color."],
    ["Mean", "The sum of the values divided by how many there are."],
    ["Sample", "The group of data points actually collected."],
  ],
  closed: [
    [
      "What is the binary number 1011 in decimal?",
      ["9", "10", "11", "13"],
      "C",
    ],
    [
      "How is 13 written in binary?",
      ["1011", "1101", "1110", "1001"],
      "B",
    ],
    [
      "How many different values can one byte (8 bits) store?",
      ["8", "128", "255", "256"],
      "D",
    ],
    [
      "Pure red in RGB is:",
      ["(0, 0, 255)", "(255, 0, 0)", "(0, 255, 0)", "(255, 255, 255)"],
      "B",
    ],
    [
      "A class of 20 students has a mean of 7.1 hours of sleep. Which conclusion is justified?",
      ["All teenagers sleep 7.1 hours", "In this class, the mean was 7.1 hours", "Sleep causes good grades", "Teens are sleep deprived"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Convert the binary number 10110 to decimal, showing the place values, and convert the decimal number 37 to binary. Then explain how many different patterns can be made with 5 bits, and how the letter A is stored.",
      scheme: [
        "Converts 10110 to 22 with place values 16 + 4 + 2",
        "Converts 37 to 100101 with place values 32 + 4 + 1",
        "States that 5 bits can make 2 to the power of 5, which is 32 patterns",
        "Explains that a character is stored as a number, A being 65 in ASCII, or 01000001",
      ],
      model:
        "10110 is 16 + 0 + 4 + 2 + 0 = 22. 37 is 32 + 4 + 1, so it is 100101. With 5 bits there are 2 to the power of 5, which is 32 different patterns. The letter A is stored as the number 65 in ASCII, which is 01000001 in binary.",
      answers: [
        [
          "full",
          "[[0|10110 = 16 + 4 + 2 = 22.]] [[1|37 = 32 + 4 + 1, so it is 100101.]] [[2|With 5 bits you can make 2^5 = 32 patterns.]] [[3|The letter A is stored as a number, 65 in ASCII, which is 01000001 in binary.]]",
          "Full marks. All conversions are correct and the place values are shown.",
        ],
        [
          "full",
          "Place values 16 8 4 2 1 give [[0|1 0 1 1 0 = 16 + 4 + 2, which is 22]]. For 37: [[1|32 fits, then 4 and 1, so 100101]]. [[2|Five bits give 2 × 2 × 2 × 2 × 2 = 32 patterns.]] [[3|Computers store text as numbers, so A is 65 (01000001).]]",
          "Full marks. Writing out the multiplication for the patterns is clear.",
        ],
        [
          "partial",
          "[[0|10110 is 22.]] [[2|There are 32 patterns.]] 37 is 110101 and A is stored as a picture of the letter.",
          "Check 37: 32 + 4 + 1 is 100101. And text is stored as numbers, not pictures: A is 65.",
        ],
        [
          "partial",
          "[[1|37 is 100101.]] [[3|A is stored as the number 65.]] 10110 is 26 and 5 bits make 10 patterns.",
          "10110 = 16 + 4 + 2 = 22, and 5 bits make 2 to the 5th power, which is 32 patterns.",
          true,
        ],
        [
          "weak",
          "10110 is ten thousand one hundred ten. 37 in binary is 37. A is stored as an A.",
          "Binary uses place values of 1, 2, 4, 8, 16... and text is stored as numbers.",
        ],
        [
          "weak",
          "[[2|There are 32 patterns.]] Binary is just random zeros and ones that the computer makes up.",
          "Binary follows a place-value system, so every pattern has a specific value.",
        ],
      ],
    },
    {
      prompt:
        "A class of 20 students records hours of sleep: 5, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 9, 9, 6. Find the mean, describe the most common value and the pattern in the data, then write a conclusion that states what the data show and two things the data cannot show.",
      scheme: [
        "Calculates the sum as 142 and the mean as 7.1",
        "States that the most common value is 7 (7 students)",
        "Describes the pattern, such as most students sleep 6 to 8 hours",
        "States two limits, such as the data cannot show why students sleep this much, or that other classes are the same",
      ],
      model:
        "The sum is 142 and with 20 students the mean is 7.1 hours. The most common value is 7 hours, with seven students. The pattern is that most students sleep between 6 and 8 hours. The data cannot show why students sleep this much, or whether students in other classes or schools sleep the same, because they are from one class.",
      answers: [
        [
          "full",
          "[[0|The sum is 142, so the mean is 142 ÷ 20 = 7.1 hours.]] [[1|The most common value is 7 hours, with 7 students.]] [[2|The pattern is that most students sleep 6 to 8 hours, with a few at 5 and 9.]] [[3|The data can't show why they sleep this much, or whether other classes are the same, because it's one small class.]]",
          "Full marks. The mean is correct and the limits are specific.",
        ],
        [
          "full",
          "[[0|Adding all the values gives 142, so the mean is 7.1.]] [[1|The mode is 7, which appears seven times.]] [[2|The values cluster in the middle: 6, 7 and 8 hours cover most of the class.]] [[3|The data show only this class. They don't show why, or if more sleep causes better grades, or how all teenagers sleep.]]",
          "Full marks. 'Mode' is the correct statistical word for the most common value.",
        ],
        [
          "partial",
          "[[1|The most common value is 7.]] [[2|Most students sleep 6 to 8 hours.]] The mean is 7.5. The data prove that all teens sleep 7 hours.",
          "The mean is 142 / 20 = 7.1. And a small class sample cannot show how all teens sleep.",
        ],
        [
          "partial",
          "[[0|The mean is 7.1.]] [[3|The data can't show why.]] The most common value is 8 and most students sleep 9 hours.",
          "The most common value is 7, and most students sleep 6 to 8 hours. Describe the pattern accurately.",
          true,
        ],
        [
          "weak",
          "The mean is 20 because there are 20 students. The data show everything about sleep.",
          "The mean is the total hours divided by the number of students. Data from one class show only that class.",
        ],
        [
          "weak",
          "[[1|The most common value is 7.]] The data show that sleep makes students get good grades, which proves a cause.",
          "The data contain only sleep hours, so they can't show an effect on grades.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Packets, IP addresses, DNS and protocols",
  note: `
## Objectives

Students will be able to:

1. describe how information is sent across the internet in packets;
2. explain the roles of IP addresses, DNS and protocols.

## Materials

An envelope-and-puzzle packet activity, a network map of the school, a command-line or website to look up a domain's IP address (teacher demo), the quiz.

## Starter (6 minutes)

Cut a short message into numbered strips. Send the strips by different "routes" around the room to a receiver. Ask: "How does the receiver know the order? What if one strip is lost?"

## Main activity

1. Packets: a message is split into small packets. Each has a header (source and destination addresses, a sequence number) and a piece of data. Routers read the headers and forward packets toward the destination; packets may take different paths and arrive out of order; the destination reassembles them using the sequence numbers. If a packet is lost, the protocol asks for it again.
2. IP addresses: every device on a network has an address. IPv4 uses four numbers from 0 to 255 (for example, 192.168.1.1); there are about 4.3 billion possible addresses (2 to the power of 32), so IPv6 was created with far more. Public and private addresses.
3. DNS (Domain Name System): the internet's phone book that translates a name such as example.com to an IP address. Steps: the browser asks a DNS server; the server returns the address; the browser connects.
4. Protocols: agreed rules for communication. TCP/IP: IP delivers packets; TCP checks that they all arrive and puts them in order. HTTP/HTTPS for web pages (the S is for secure). Without shared protocols, devices could not talk to each other.

## Checking for understanding

Ask: "Why are messages split into packets instead of sent whole?"

## Quiz

Packets, addresses, DNS and protocols.
`,
  reading: [
    "How a message crosses the world",
    `
When you send a photo or open a web page, the data do not travel as a single piece. The internet splits the data into small chunks called **packets**. Each packet carries two things: a piece of the data and a **header**, which includes the address of the sender, the address of the destination, and a **sequence number** that says where the packet belongs in the whole message. Think of a long letter cut into many numbered postcards, each with a to-and-from address.

The packets travel through a network of **routers**, devices that read the header of each packet and forward it a step closer to its destination. Different packets of the same message may take different **routes**, depending on which paths are fast or busy at that moment, so they may arrive out of order. At the destination, the packets are **reassembled** into the correct order by using the sequence numbers. If one packet is lost on the way, the receiver notices that a number is missing and asks the sender to send that packet again. This design has major advantages: the network can send many people's packets over the same lines, and if one path fails, packets can go another way, so the internet is **fault-tolerant**.

To send packets to the right place, every device on a network needs an address, called an **IP address**. In the older system, IPv4, an address has four numbers from 0 to 255, separated by dots, such as 192.168.1.1. Each number is one byte, so the whole address is 32 bits, which allows about 4.3 billion addresses. That is not enough for all the phones, laptops, cameras and appliances in the world, so a newer system, **IPv6**, uses 128 bits and allows a vastly larger number of addresses.

People remember names better than numbers, so there is also the **Domain Name System (DNS)**. DNS works like a phone book: when you type a web address such as example.com, your browser asks a DNS server for the matching IP address, then uses the address to connect to the right server.

All of this works because devices follow shared rules called **protocols**. The **IP** protocol handles addressing and routing the packets. The **TCP** protocol checks that all the packets arrived, in order, and requests any that are missing; together they are called TCP/IP. **HTTP** is the protocol that web browsers and servers use to exchange web pages, and **HTTPS** is its secure version, which encrypts the data so that others cannot read them. A protocol is like a language that both sides agree to speak. Without shared protocols, a laptop made by one company could not talk to a server made by another.
`,
  ],
  cards: [
    ["Packet", "A small chunk of data with a header, sent across a network."],
    ["Header", "The part of a packet with addresses and a sequence number."],
    ["Router", "A device that forwards packets toward their destination."],
    ["IP address", "A number that identifies a device on a network."],
    ["IPv4", "Addresses of four numbers from 0 to 255; about 4.3 billion possible."],
    ["DNS", "The system that translates names into IP addresses."],
    ["Protocol", "An agreed set of rules for communication."],
    ["HTTPS", "The secure version of HTTP for web pages."],
  ],
  closed: [
    [
      "Why are messages split into packets?",
      ["To make them slower", "So many messages can share the network and lost parts can be resent", "Because computers cannot read long messages", "To hide the message"],
      "B",
    ],
    [
      "What does DNS do?",
      ["Translates names such as example.com into IP addresses", "Encrypts web pages", "Stores your passwords", "Makes the Wi-Fi faster"],
      "A",
    ],
    [
      "How many numbers make up an IPv4 address?",
      ["2", "4", "6", "8"],
      "B",
    ],
    [
      "How does the destination put the packets back in order?",
      ["It guesses", "It uses the sequence numbers in the headers", "It asks the user", "It sorts them by size"],
      "B",
    ],
    [
      "The S in HTTPS stands for:",
      ["Speed", "Secure", "Server", "Simple"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Describe what happens, step by step, when you send a 3 MB photo to a friend over the internet. Use the terms packet, header, router, sequence number and reassemble. Explain what happens if one packet is lost, and why the internet is designed this way.",
      scheme: [
        "States that the photo is split into packets, each with a header containing addresses and a sequence number",
        "States that routers read the headers and forward the packets, possibly along different routes",
        "States that the destination uses the sequence numbers to reassemble the packets in order",
        "Explains that a lost packet is detected and re-sent, and that this design shares the network and tolerates failures",
      ],
      model:
        "The photo is split into many packets, each with a header holding the sender and destination addresses and a sequence number. Routers read the headers and forward the packets, possibly along different routes. At the friend's device, the packets are reassembled in order using the sequence numbers. If one is lost, the receiver notices the missing number and asks for it to be sent again. The design lets many users share the network and keeps working if one path fails.",
      answers: [
        [
          "full",
          "[[0|The photo is split into many small packets, and each one has a header with the sender's and receiver's addresses and a sequence number.]] [[1|Routers read each header and send the packet along toward my friend, and different packets can take different routes.]] [[2|At my friend's device, the packets are reassembled in order by using the sequence numbers.]] [[3|If a packet is lost, the missing number is noticed and the packet is resent; splitting into packets lets many people share the network and keeps it working if a path fails.]]",
          "Full marks. All the terms are used correctly and the design reasons are given.",
        ],
        [
          "full",
          "[[0|Step 1: the 3 MB file is chopped into packets with headers that say where they are from, where they are going and which part they are.]] [[1|Step 2: routers examine the headers and forward the packets, which might go different ways because of traffic.]] [[2|Step 3: they arrive, maybe out of order, and my friend's device sorts them with the sequence numbers and reassembles the photo.]] [[3|If one is lost, TCP asks for it again. This is useful because one slow or broken path doesn't stop everything.]]",
          "Full marks. Mentioning TCP is correct, as it handles resending.",
        ],
        [
          "partial",
          "[[0|The photo is split into packets with headers.]] [[1|Routers send the packets to my friend.]] If a packet is lost, the whole photo fails and I must start again.",
          "The receiver can ask for just the missing packet. Describe how packets are reassembled using the sequence numbers.",
        ],
        [
          "partial",
          "[[2|The packets are reassembled with sequence numbers.]] [[3|A lost packet is re-sent.]] The photo is sent as one piece and a router keeps it safe.",
          "The photo is split into packets, not sent as one piece. Describe the header and the routers' role.",
          true,
        ],
        [
          "weak",
          "The photo travels in a straight line from my computer to my friend's, like a cable between us.",
          "The data travel as packets through many routers, not along a single direct line.",
        ],
        [
          "weak",
          "[[1|Routers forward packets.]] The sequence number tells how big the packet is.",
          "The sequence number tells the order of the packet in the message.",
        ],
      ],
    },
    {
      prompt:
        "Explain what happens when you type a web address like example.com into a browser. Include the roles of DNS, the IP address, and protocols (TCP/IP and HTTPS). Then explain why a protocol is like a language.",
      scheme: [
        "Explains that the browser asks a DNS server to translate the name into an IP address",
        "Explains that the browser uses the IP address to connect to the server and send requests in packets",
        "Names the roles of TCP/IP (delivering and ordering packets) and HTTPS (secure web page transfer)",
        "Explains that a protocol is like a language because both sides must follow the same rules in order to understand each other",
      ],
      model:
        "The browser asks a DNS server to translate example.com into an IP address. It then uses the IP address to connect to the web server, and the request and the response are sent as packets. IP delivers the packets, TCP makes sure they all arrive in order, and HTTPS exchanges the web page securely. A protocol is like a language because both sides must follow the same rules so they can understand each other.",
      answers: [
        [
          "full",
          "[[0|The browser asks a DNS server for the IP address that belongs to the name example.com.]] [[1|Then it uses that IP address to connect to the web server and send a request in packets.]] [[2|IP delivers the packets, TCP checks that they all arrive in order, and HTTPS carries the web page securely.]] [[3|A protocol is like a language because both computers must follow the same rules, or they couldn't understand each other.]]",
          "Full marks. Each step and each protocol is placed correctly.",
        ],
        [
          "full",
          "[[0|DNS is the phone book: it looks up example.com and returns its IP address.]] [[1|My browser connects to that address and asks for the page, and the server's response comes back as packets.]] [[2|TCP/IP handles delivery and ordering, and HTTPS encrypts the page so that others on the network cannot read it.]] [[3|Protocols are like languages: if a device didn't speak the same one, the message would be gibberish.]]",
          "Full marks. 'Gibberish' is a vivid way of making the language analogy.",
        ],
        [
          "partial",
          "[[0|DNS turns the name into an IP address.]] [[2|HTTPS is secure.]] A protocol is a type of computer virus. TCP is for the search.",
          "A protocol is a set of agreed rules, not a virus. Explain how the browser uses the IP address after DNS.",
        ],
        [
          "partial",
          "[[1|The browser connects to the IP address and sends packets.]] [[3|Both sides need the same rules like a language.]] DNS keeps the web page secure.",
          "DNS translates names into IP addresses. HTTPS is the protocol that secures the page.",
          true,
        ],
        [
          "weak",
          "The browser already knows where every website is, so nothing happens when I type the name.",
          "The browser doesn't know in advance; it asks DNS for the IP address.",
        ],
        [
          "weak",
          "[[3|A protocol is like a language.]] The IP address is the name of the website like example.com.",
          "The IP address is a number. The name is the domain name, which DNS translates.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Staying secure, and the benefits and harms of an innovation",
  note: `
## Objectives

Students will be able to:

1. describe basic cybersecurity practices, including strong passwords and two-factor authentication;
2. describe a computing innovation and its benefits and harms for different groups.

## Materials

A password-strength activity (with invented passwords only), examples of phishing messages (fictional), a two-column chart for benefits and harms, the problem set.

## Starter (6 minutes)

Display three invented passwords: "password123", "Ana2010", and "blue-tractor-lamp-seven". Ask: "Which would be hardest to guess, and why?" Discuss length, predictability and reuse.

## Main activity

1. Passwords: long is better than complex; a passphrase of four unrelated words is strong and memorable; never reuse a password; use a password manager; do not share passwords. Why short and common passwords are cracked: attackers try common passwords and every combination up to a length.
2. Two-factor authentication (2FA): something you know (a password) plus something you have (your phone or a security key) or are (fingerprint). Even if a password is stolen, the attacker needs the second factor.
3. Phishing: messages that pretend to be from a trusted source to steal information; signs (urgency, odd sender address, unexpected links, requests for passwords). Other practices: updates, avoiding unknown downloads, caution on public Wi-Fi, HTTPS.
4. Computing innovation: ride-sharing apps, smart speakers or social media recommendations. Benefits and harms: who gains, who loses, who is left out. Complete a chart for one innovation.

## Checking for understanding

Ask: "Why does two-factor authentication help even if someone steals your password?"

## Problem set

Rate passwords, identify phishing signs, and complete the benefit and harm chart.
`,
  reading: [
    "Protecting your accounts, and weighing a new technology",
    `
Many people believe that a strong password has to be a jumble like "Xk9#qL". In fact, the length of a password matters more than strange characters. Attackers use programs that guess millions of passwords per second, trying common passwords first ("password123," "qwerty," a name and a birth year), then every combination up to a certain length. A short or predictable password falls quickly. A **passphrase** of four or more unrelated words, such as "blue-tractor-lamp-seven," is both long and easy to remember, so it is much stronger. Never **reuse** a password: if one site is breached and the attacker finds your password there, they will try it on your email, your school account and your bank. A **password manager** can create and store a different strong password for every account, so you need to remember only one. Never share your password, not even with a friend.

A second protection is **two-factor authentication (2FA)**, also called multi-factor authentication. It requires two different kinds of proof that it is you: something you **know** (a password), plus something you **have** (a code sent to your phone, an app, or a security key), or something you **are** (a fingerprint or a face scan). With 2FA, a criminal who steals your password still cannot get in without the second factor. Turning it on for your email and school accounts is one of the most effective things you can do.

Another common attack is **phishing**: a message that pretends to be from a trusted source, such as a bank, a teacher or a streaming service, to trick you into giving a password or clicking a harmful link. Warning signs include **urgency** ("Your account will be closed in one hour!"), a sender address that looks slightly wrong, a link whose address does not match the company, unexpected attachments, poor grammar, and requests for passwords or codes. When in doubt, do not click; go to the company's website yourself or contact the sender through a different channel. Other habits help too: install **updates**, which fix security flaws; download apps only from trusted sources; be careful on **public Wi-Fi**; and look for **HTTPS** in the address of the websites on which you enter personal information.

Technology also raises larger questions. Every **computing innovation** has benefits and harms, and they are often shared unequally. Take a **ride-sharing app**. Benefits: riders get convenient, trackable rides and drivers get flexible work. Harms: drivers may lack benefits and job security, traditional taxi drivers may lose income, riders without smartphones or bank cards may be left out, and the company collects data on where people go. When you evaluate an innovation, ask: Who benefits? Who is harmed or left out? Who decides, and who profits? What data are collected? Understanding both sides helps you to use technology wisely and to design it more fairly.
`,
  ],
  cards: [
    ["Passphrase", "A long password made of several unrelated words."],
    ["Password reuse", "Using the same password on several sites, which is risky."],
    ["Password manager", "A tool that creates and stores strong passwords."],
    ["Two-factor authentication", "Using two kinds of proof, such as a password and a phone code."],
    ["Phishing", "A message that pretends to be trusted to steal information."],
    ["Software update", "A new version that fixes security flaws."],
    ["Computing innovation", "A new program, device or system that changes how people do things."],
    ["Digital divide", "Unequal access to technology among groups."],
  ],
  closed: [
    [
      "Which password is the strongest?",
      ["password123", "Ana2010", "blue-tractor-lamp-seven", "qwerty"],
      "C",
    ],
    [
      "Why is reusing the same password on many sites risky?",
      ["It makes the sites slow", "If one site is breached, attackers can try the password on your other accounts", "It breaks the accounts", "It is illegal"],
      "B",
    ],
    [
      "Two-factor authentication helps because:",
      ["It makes passwords unnecessary", "A thief with your password still needs the second factor", "It speeds up logging in", "It blocks all viruses"],
      "B",
    ],
    [
      "Which is a sign of a phishing email?",
      ["It is from a known friend and is expected", "It creates urgency and asks for your password", "It has no links", "It is addressed to you by name and has a real signature"],
      "B",
    ],
    [
      "Which question best examines the harms of a computing innovation?",
      ["How fast is it?", "Who is harmed or left out?", "What color is the app?", "How much does the app weigh?"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A student gets an email: \"URGENT: Your school account will be deleted in one hour unless you click this link and enter your password.\" The sender's address is school-help@acc0unt-verify.example. Identify three phishing signs, explain what the student should do, and explain two other practices (one about passwords, one about two-factor authentication) that would protect the account even if the student made a mistake.",
      scheme: [
        "Identifies the urgency as a phishing sign",
        "Identifies the odd sender address (acc0unt-verify) or the request for a password through a link as signs",
        "States that the student should not click, and should go to the school website or contact the school directly",
        "Explains that a unique strong password and two-factor authentication would limit the damage if the password were stolen",
      ],
      model:
        "The signs are the urgency (one hour), the odd sender address with a zero in place of an o, and the request to enter a password through a link. The student should not click, and should go to the school's website or contact the school office directly. A unique strong password limits the damage because it is not used on other sites, and two-factor authentication means that a thief with the password still needs the second factor.",
      answers: [
        [
          "full",
          "[[0|The message creates urgency by saying the account will be deleted in one hour.]] [[1|The sender address is odd, with a zero in 'acc0unt-verify,' and it asks me to type my password through a link.]] [[2|I shouldn't click; I should go to the school's website myself or contact the school office another way.]] [[3|A strong unique password limits the damage because it's not used on other sites, and two-factor authentication means a thief with my password still needs my phone.]]",
          "Full marks. Three signs, a safe response and two layers of protection.",
        ],
        [
          "full",
          "[[0|Signs: urgency, since it gives me just one hour.]] [[1|The email domain doesn't look like the real school, and it asks for a password.]] [[2|I'd delete or report it, and log in through the school's official page if I want to check my account.]] [[3|If I did enter my password, a passphrase that I use nowhere else and 2FA would keep the thief from getting into the account or my other accounts.]]",
          "Full marks. Reporting the email is a good extra step.",
        ],
        [
          "partial",
          "[[0|The message says urgent.]] [[2|I should not click and should go to the school website.]] The email is real because it mentions the school. Passwords are not important.",
          "Anyone can mention a school. Name more phishing signs, and explain the protection from a strong password and 2FA.",
        ],
        [
          "partial",
          "[[1|The sender address looks wrong and it asks for a password.]] [[3|2FA protects the account.]] I should click the link to check whether it is a real message.",
          "Clicking the link is risky. Go to the school's website directly, or ask the school office.",
          true,
        ],
        [
          "weak",
          "It must be real because it says my account will be deleted. I should enter my password quickly.",
          "Urgency and a request for a password are warning signs of phishing. Do not click.",
        ],
        [
          "weak",
          "[[3|Two-factor authentication helps.]] There are no signs it is fake, because all emails look like this.",
          "There are several signs: urgency, an odd address, and a request for a password.",
        ],
      ],
    },
    {
      prompt:
        "Choose a computing innovation (a ride-sharing app, a smart speaker, or social media recommendations). Describe what it does, then complete an analysis with two benefits, two harms, and at least two groups affected differently. End with one question that a designer should ask before releasing it.",
      scheme: [
        "Describes the innovation and what it does accurately",
        "Gives two benefits",
        "Gives two harms or risks and names two groups affected differently",
        "Asks a relevant question for the designer, such as what data are collected or who might be left out",
      ],
      model:
        "A ride-sharing app lets people request a car from a phone and pays drivers per trip. Benefits: convenient rides and flexible work for drivers. Harms: drivers may lack benefits, and the company collects location data. Riders without smartphones or bank cards may be left out, while drivers and taxi companies are affected in different ways. A designer should ask what data are collected and how they are protected.",
      answers: [
        [
          "full",
          "[[0|A ride-sharing app lets you request a car from your phone, and the driver is paid per trip.]] [[1|Benefits: it's convenient and trackable for riders, and it gives drivers flexible work.]] [[2|Harms: drivers can lack benefits and job security, and riders' locations are collected. Taxi drivers lose income, and people without smartphones or cards are left out.]] [[3|A designer should ask what data are collected and how they are protected.]]",
          "Full marks. A balanced analysis with several groups.",
        ],
        [
          "full",
          "[[0|A smart speaker listens for a wake word and answers questions or plays music by voice.]] [[1|Benefits: it helps people with disabilities who find screens hard, and it is hands-free in the kitchen.]] [[2|Harms: it may record private conversations by mistake, and children's voices could be stored. Families who can afford it get the benefits, while others don't, and people with accents may be understood less well.]] [[3|A designer should ask what is recorded, who can hear it and how to delete it.]]",
          "Full marks. The point about accents shows awareness of bias.",
        ],
        [
          "partial",
          "[[0|A ride-sharing app gets you a car.]] [[1|It is convenient and cheap.]] Nobody is harmed. A designer should ask how to make more money.",
          "Look for harms and groups affected, such as drivers or people without smartphones. Ask a question about people, not only profit.",
        ],
        [
          "partial",
          "[[2|Drivers lose benefits and riders' locations are collected.]] [[3|What data are collected?]] The app is a car that drives itself.",
          "A ride-sharing app connects riders with drivers. Describe what it does and give two benefits.",
          true,
        ],
        [
          "weak",
          "Technology is always good, so there are no harms, and everyone benefits equally.",
          "Every innovation has benefits and harms that fall differently on different groups.",
        ],
        [
          "weak",
          "[[0|A smart speaker answers questions.]] It is bad because it is technology, and people should never use it.",
          "A careful analysis weighs benefits and harms, not just rejects or accepts.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Privacy, your digital footprint and a project for a real user",
  note: `
## Objectives

Students will be able to:

1. explain issues of privacy and the digital footprint;
2. create a small project that solves a problem for a real user and present it.

## Materials

A digital footprint audit sheet, privacy policy excerpts (simplified), a project planning template, a rubric, laptops, the worksheet.

## Starter (6 minutes)

Ask: "If a college admissions officer searched your name today, what would they find? What would you want them to find?" Discuss that information posted online can last.

## Main activity

1. Digital footprint: active data (what you post), passive data (what is collected about you: location, browsing history, device information). Data persist, can be copied, and can be searched by employers, schools and others. Privacy settings, location sharing, tracking cookies, privacy policies, data brokers. Practical habits: think before posting, check settings, use strong privacy options, ask permission before sharing photos of others.
2. Privacy and ethics: who has the right to collect data? What is consent? Trade-offs between convenience and privacy.
3. Project: identify a real user (a classmate, family member, or community member) and a small problem, interview them, design a solution (a Python program such as a quiz, a budgeting calculator or a schedule helper, or a spreadsheet tool), build and test it with the user, and present: the problem, the design, a demonstration, one test result and what you would improve.
4. Plan the project with a timeline.

## Checking for understanding

Ask: "What is the difference between data you post and data collected about you?"

## Worksheet

A digital footprint audit and a project plan.
`,
  reading: [
    "The trail you leave, and building something for someone",
    `
Each time you use a phone or a computer, you leave a trail of information, your **digital footprint**. Some of it is **active**: the photos, messages, comments and videos that you choose to post. Some of it is **passive**: information collected about you without you doing anything special, such as your location, the sites you visit, what you search for, what you watch, and details about your device. Companies use these data to personalize ads and recommendations, and some sell them to **data brokers**. Several features of digital data make privacy challenging. Data **persist**: even if you delete a post, someone may have copied it or taken a screenshot. Data can be **copied** and shared widely and quickly. Data can be **searched**: colleges, employers and strangers may find information about you years later. Information also combines: small pieces, such as a school name, a photo of a street sign and a post about a practice schedule, can together reveal where you are.

You can manage your footprint. **Think before you post**: would you be comfortable if a future employer, a grandparent and a stranger saw this? **Check your privacy settings** on every app, and limit who can see your posts and your location. Turn off **location sharing** when it is not needed. **Ask permission** before posting photos of others. Read the key parts of **privacy policies**, which explain what data an app collects and with whom they are shared, even though they can be long. Use strong passwords and 2FA, and periodically search for your own name to see what is public. Privacy is not only a personal matter. It raises questions of **ethics**: Who has the right to collect data about you? What does **consent** mean when an app is hard to use unless you agree? Is the convenience of free services worth the loss of privacy? There are no simple answers, but informed users make better choices.

The last part of the unit puts everything you have learned to work. You will design a project that solves a problem for a **real user**. Start by finding a person with a need: a classmate who forgets assignments, a parent who wants to track a budget, or a coach who wants to organize practice schedules. **Interview** them to understand the problem: What do they do now? What is hard? What would help? Then **design** a solution using what you have learned: break the problem into parts, plan an algorithm, and choose a tool, such as a Python program (a quiz, a calculator or a reminder), or a spreadsheet with formulas and a chart. **Build** it, **test** it with the user, and improve it based on their feedback. When you **present**, explain the problem and the user, show the design, demonstrate the project, report at least one test result ("my partner could add an assignment in under 10 seconds"), and say what you would improve with more time. Considering the user's needs, privacy and accessibility makes your project better, and shows the real purpose of computing: solving problems for people.
`,
  ],
  cards: [
    ["Digital footprint", "The trail of data you leave when you use technology."],
    ["Active data", "Information you choose to post."],
    ["Passive data", "Information collected about you without special action."],
    ["Data broker", "A company that collects and sells personal data."],
    ["Persistence", "Data staying online even after you delete them."],
    ["Privacy policy", "A document describing what data an app collects and how it is used."],
    ["Consent", "Agreement to the collection or use of your data."],
    ["Real user", "A person who will actually use what you build."],
  ],
  closed: [
    [
      "Which is passive data?",
      ["A photo you post", "Your location collected by an app", "A comment you write", "A video you upload"],
      "B",
    ],
    [
      "Why is it hard to completely remove something once you post it?",
      ["Data persist and can be copied", "Websites do not allow deletion", "Computers cannot delete files", "It is illegal"],
      "A",
    ],
    [
      "Which is the first step in a project for a real user?",
      ["Start coding", "Interview the user to understand the problem", "Choose the color", "Present the project"],
      "B",
    ],
    [
      "Which habit best protects your privacy?",
      ["Share your location with every app", "Check privacy settings and limit who can see your posts", "Post your address", "Use one password everywhere"],
      "B",
    ],
    [
      "In a project presentation, a test result might be:",
      ["I think it is cool", "My partner added an assignment in under 10 seconds", "It took a long time", "I like Python"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A student posts a photo of their new car in front of the school with the license plate visible, writes \"Leaving practice at 5:30 every day!\", and has location sharing on. Explain how the pieces of information together create a privacy risk, name two kinds of data (active and passive), and give three specific actions that would reduce the risk.",
      scheme: [
        "Explains that the pieces together reveal where the student is and when, which creates a risk",
        "Identifies the photo and caption as active data and the location sharing as passive data",
        "Gives one action, such as turning off location sharing",
        "Gives two further actions, such as hiding the license plate, not posting a regular schedule, or limiting who can see the post",
      ],
      model:
        "The photo shows the school and the license plate, and the caption gives a daily time, so together they reveal where the student will be and when, which is a risk. The photo and caption are active data; the location sharing is passive data. The student could turn off location sharing, hide the license plate, avoid posting a regular schedule, or make the post visible to friends only.",
      answers: [
        [
          "full",
          "[[0|Together the photo, the plate and the 5:30 time tell a stranger where the student will be every day, which is a safety risk.]] [[1|The photo and caption are active data, and the location sharing is passive data collected by the app.]] [[2|The student should turn off location sharing.]] [[3|They should also blur the license plate, avoid posting a regular schedule, and limit the post to friends.]]",
          "Full marks. You combined the pieces and gave three actions.",
        ],
        [
          "full",
          "[[0|Each piece seems harmless, but combined they show where the student is and when, which someone could use to follow them.]] [[1|What they posted on purpose is active data; what the app collects through location is passive data.]] [[2|Turning off location sharing for this app would stop the passive tracking.]] [[3|Covering the plate, not announcing a daily time and making the account private would all cut the risk.]]",
          "Full marks. Calling the combination a way to follow someone is accurate.",
        ],
        [
          "partial",
          "[[1|The photo and caption are active data.]] [[2|Turn off location sharing.]] It is safe because the post is only a photo of a car. The caption doesn't matter.",
          "The caption reveals a daily time, and the school and plate add to it. Explain how these combine.",
        ],
        [
          "partial",
          "[[0|The pieces together show where the student is.]] [[3|Blur the plate and make the post private.]] Active data is what the app collects secretly.",
          "Active data is what you post. Passive data is what is collected about you. Fix the definitions.",
          true,
        ],
        [
          "weak",
          "There is no risk because it is the student's own car and school.",
          "Combining details can reveal where someone is and when. That creates a safety risk.",
        ],
        [
          "weak",
          "[[2|Turn off location sharing.]] Deleting the post removes it from the internet forever, so that's all that is needed.",
          "Deleted posts may already be copied or captured. Think before posting.",
        ],
      ],
    },
    {
      prompt:
        "Plan a small project for a real user. Identify the user and their problem, describe how you will learn about the need (an interview), name the solution you will build and the tool you will use, give one way you will test it with the user, and describe one privacy or accessibility consideration.",
      scheme: [
        "Identifies a specific user and a specific problem",
        "Describes an interview or questions to learn about the need",
        "Names a feasible solution and tool (a Python program or a spreadsheet) and one test with the user",
        "Describes one privacy or accessibility consideration",
      ],
      model:
        "User: my teammate Jordan, who forgets assignment due dates. I will interview Jordan about how they currently track work and what is hardest. I will build a Python program that stores assignments and prints those due this week, and test it by having Jordan add three assignments and checking they appear correctly. Privacy: the data stay on Jordan's computer and are not shared; accessibility: use large text and clear messages.",
      answers: [
        [
          "full",
          "[[0|My user is my teammate Jordan, who forgets due dates for assignments.]] [[1|I'll interview Jordan about how they track work now and what is most frustrating.]] [[2|I'll build a Python program that stores assignments and lists the ones due this week, and test it by having Jordan add three assignments and check the list.]] [[3|The data will stay on Jordan's computer and not be shared, and I'll use clear messages and large text.]]",
          "Full marks. A specific user, need, test and consideration.",
        ],
        [
          "full",
          "[[0|My user is my grandmother, who wants to track her monthly spending.]] [[1|I'll ask her how she does it now, what categories she uses and what she finds hard.]] [[2|I'll build a spreadsheet with formulas that total each category and a chart, and test it by having her enter last month's bills and checking the totals.]] [[3|The spreadsheet will use a large font and no online sharing, so her financial information stays private.]]",
          "Full marks. Choosing a spreadsheet for this user and need is sensible.",
        ],
        [
          "partial",
          "[[0|My user is my friend.]] [[1|I'll ask what they need.]] I'll build an app and test it by myself. [[3|It will have large text.]]",
          "Name the specific user and problem, and test the solution with the user, not only yourself.",
        ],
        [
          "partial",
          "[[2|I'll build a Python quiz and test it with the user.]] [[3|It will keep the user's scores private.]] My user is everyone in the world.",
          "A real user is a specific person. Pick one and describe the problem you will solve for them.",
          true,
        ],
        [
          "weak",
          "I'll make a game because games are fun. I don't need a user or an interview.",
          "The project should solve a problem for a real user, learned through an interview.",
        ],
        [
          "weak",
          "[[0|My user has a problem.]] I'll finish the project the night before it is due and I won't test it.",
          "Testing with the user and a timeline are part of the plan.",
        ],
      ],
    },
  ],
};

writeCourse(
  "computer-science-principles-grade-9.json",
  "Computer Science Principles",
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
