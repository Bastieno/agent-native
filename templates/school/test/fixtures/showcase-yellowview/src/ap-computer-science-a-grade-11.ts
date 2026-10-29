import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * AP Computer Science A, Grade 11, Quarter 1. Units 1 to 4 of the AP
 * Computer Science A course framework (Java) plus programming practices,
 * written fresh in the school's own words. All code in the answers has been
 * traced by hand.
 */

const w1: WeekInput = {
  topic: "Variables, expressions and calling methods",
  note: `
## Objectives

Students will be able to:

1. declare and initialize variables of primitive and reference types;
2. evaluate expressions with arithmetic operators, integer division and casting;
3. call methods on objects, including String methods, and use the Math class.

## Materials

A computer lab with a Java environment, a tracing worksheet, a card sort of primitive and reference types, the worksheet.

## Starter (7 minutes)

Write on the board: int a = 7; int b = 2; System.out.println(a / b); Ask students to predict the output. Many say 3.5. Run it and get 3. Ask: "Why?" Introduce integer division.

## Main activity

1. Types: primitive (int, double, boolean, char) and reference (String, arrays, objects). A variable declaration names a type and a name; initialization gives a value. Constants with final. Variables hold values; reference variables hold references to objects, and null means no object.
2. Operators: + - * / %; integer division truncates (7 / 2 is 3); % gives the remainder (7 % 2 is 1); mixed int and double expressions give double; casting: (double) 7 / 2 is 3.5, (int) 3.9 is 3. Compound operators: +=, ++, --. Order of operations.
3. Methods: calling a method on an object (s.length()), static methods on a class (Math.sqrt(16.0), Math.pow(2, 3), Math.abs(-4), Math.random()). String methods: length(), substring(a, b), indexOf(str), charAt(i), equals(other). Index starts at 0, and substring(a, b) includes a but excludes b.

## Checking for understanding

Whiteboards: evaluate 17 / 5, 17 % 5 and (double) 17 / 5.

## Worksheet

Expression tracing and String method practice.
`,
  reading: [
    "What the computer really does with numbers and Strings",
    `
A Java program stores data in **variables**. Each variable has a **type**, a **name** and a value. To **declare** a variable, give the type and the name; to **initialize** it, give it a value: \`int score = 90;\` Java has **primitive types** that store a value directly: **int** (whole numbers), **double** (decimal numbers), **boolean** (true or false) and **char** (a single character). **Reference types**, such as **String** and arrays, store a reference to an object in memory. A reference variable that points to nothing holds **null**, and calling a method on null causes an error. A value that should never change can be declared with **final**.

Arithmetic uses + - * / and %. Two rules often surprise beginners. First, when both operands are **int**, division is **integer division**: the decimal part is thrown away. So 7 / 2 is 3, not 3.5, and 1 / 2 is 0. Second, the **remainder** operator % gives what is left after division: 7 % 2 is 1 and 17 % 5 is 2. These work together: 17 / 5 is 3 and 17 % 5 is 2, because 5 * 3 + 2 = 17. When an expression mixes int and double, the int is promoted to double, so 7 / 2.0 is 3.5. A **cast** changes a type: (double) 7 / 2 casts the 7 to 7.0 first, so the result is 3.5, but (double) (7 / 2) divides first and gives 3.0. Casting a double to int truncates: (int) 3.9 is 3 and (int) -3.9 is -3. Java follows the usual order of operations, and parentheses change it. The compound operators shorten code: x += 3 means x = x + 3, and x++ adds one.

You will often call **methods**. An instance method is called on an object with the dot operator: if String s = "Columbus"; then s.length() is 8. Strings are indexed from **0**, so the characters of "Columbus" are C(0) o(1) l(2) u(3) m(4) b(5) u(6) s(7). s.charAt(7) is 's'. s.indexOf("u") is 3, the index of the first match, and it returns -1 if there is no match. s.substring(0, 3) is "Col": it starts at index 0 and stops **before** index 3. s.substring(3) returns "umbus", from index 3 to the end. To compare Strings for equal content, use s.equals("Columbus"), not ==, because == compares references. The **Math** class has static methods that you call on the class name: Math.sqrt(16.0) is 4.0, Math.pow(2, 3) is 8.0, Math.abs(-4) is 4. Math.random() returns a double from 0.0 up to but not including 1.0, so (int) (Math.random() * 6) + 1 simulates a die roll.
`,
  ],
  cards: [
    ["int / double / boolean / char", "The main primitive types in Java."],
    ["Integer division", "Division of two ints, which discards the decimal part."],
    ["% (remainder)", "The remainder after division: 17 % 5 is 2."],
    ["Cast", "Changing a value's type, such as (double) 7."],
    ["null", "The value of a reference that points to no object."],
    ["substring(a, b)", "The part of a String from index a up to but not including b."],
    ["indexOf(str)", "The index of the first match, or -1 if none."],
    ["equals", "The method that compares the content of two Strings."],
  ],
  closed: [
    [
      "What does the expression 17 / 5 evaluate to in Java?",
      ["3.4", "3", "4", "2"],
      "B",
    ],
    [
      "What does 17 % 5 evaluate to?",
      ["2", "3", "3.4", "5"],
      "A",
    ],
    [
      "What does (double) 7 / 2 evaluate to?",
      ["3", "3.5", "3.0", "4"],
      "B",
    ],
    [
      "If String s = \"Columbus\"; what does s.substring(0, 3) return?",
      ["\"Colu\"", "\"Col\"", "\"olu\"", "\"Co\""],
      "B",
    ],
    [
      "Which should you use to compare two Strings for the same characters?",
      ["==", "equals", "=", "compare"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Trace this code and give the output of each println. int a = 17; int b = 5; System.out.println(a / b); System.out.println(a % b); System.out.println((double) a / b); System.out.println((double) (a / b)); Explain why the last two differ.",
      scheme: [
        "Gives 3 for a / b because both are int, so integer division discards the decimal",
        "Gives 2 for a % b as the remainder",
        "Gives 3.4 for (double) a / b because the cast happens first, so the division is done as doubles",
        "Gives 3.0 for (double) (a / b) and explains that the integer division happens first and then the result is cast",
      ],
      model:
        "a / b is 3 because integer division discards the decimal. a % b is 2, the remainder. (double) a / b is 3.4 because the cast applies to a first, so the division is done with doubles. (double) (a / b) is 3.0 because the parentheses make the integer division happen first, giving 3, and then 3 is cast to 3.0.",
      answers: [
        [
          "full",
          "[[0|a / b prints 3 because both are ints, so integer division drops the .4.]] [[1|a % b prints 2 since 17 = 5 × 3 + 2.]] [[2|(double) a / b prints 3.4 because the cast happens first, so it's 17.0 / 5.]] [[3|(double) (a / b) prints 3.0 because the parentheses force 17 / 5 = 3 first, and then 3 becomes 3.0.]]",
          "Full marks. The order of the cast and the division is the heart of this question.",
        ],
        [
          "full",
          "[[0|Output 1 is 3: int divided by int is an int.]] [[1|Output 2 is 2: the remainder of 17 divided by 5.]] [[2|Output 3 is 3.4: the cast applies to a, so b is promoted to double.]] [[3|Output 4 is 3.0: the integer division is done first inside the parentheses, and then the int result 3 is cast to a double.]]",
          "Full marks. You explained the promotion of b to double, which is the key idea.",
        ],
        [
          "partial",
          "[[0|a / b is 3.]] [[1|a % b is 2.]] (double) a / b is 3.4 and (double) (a / b) is also 3.4 because the cast makes it a double.",
          "In the last one the integer division happens first inside the parentheses, so the result is 3.0, not 3.4.",
        ],
        [
          "partial",
          "[[2|(double) a / b is 3.4.]] [[3|(double) (a / b) is 3.0 because of the parentheses.]] a / b is 3.4 and a % b is 3.",
          "Both a and b are int, so a / b is 3. The remainder a % b is 2.",
          true,
        ],
        [
          "weak",
          "a / b prints 3.4, a % b prints 3.4, and the other two print 3.4 as well.",
          "Integer division gives 3 and % gives the remainder 2. Only one of the outputs is 3.4.",
        ],
        [
          "weak",
          "[[1|a % b prints 2.]] The others print 3, 3 and 3 because Java always rounds.",
          "Java truncates integer division and does not round, and the cast changes the type of the result in some cases.",
        ],
      ],
    },
    {
      prompt:
        "Given String s = \"Columbus\"; give the value of each: s.length(), s.charAt(7), s.indexOf(\"u\"), s.substring(3, 6), s.substring(5). Then write one statement that stores the first three characters of s in a new String variable named start.",
      scheme: [
        "Gives s.length() as 8 and s.charAt(7) as 's'",
        "Gives s.indexOf(\"u\") as 3 (the first match)",
        "Gives s.substring(3, 6) as \"umb\" and s.substring(5) as \"bus\"",
        "Writes String start = s.substring(0, 3); correctly",
      ],
      model:
        "s.length() is 8, and s.charAt(7) is 's'. s.indexOf(\"u\") is 3 because the first u is at index 3. s.substring(3, 6) is \"umb\" and s.substring(5) is \"bus\". The statement is String start = s.substring(0, 3);",
      answers: [
        [
          "full",
          "[[0|s.length() is 8 and s.charAt(7) is 's'.]] [[1|s.indexOf(\"u\") is 3, the first u.]] [[2|s.substring(3, 6) is \"umb\" and s.substring(5) is \"bus\".]] [[3|String start = s.substring(0, 3);]]",
          "Full marks. All the index arithmetic is correct.",
        ],
        [
          "full",
          "The letters are C0 o1 l2 u3 m4 b5 u6 s7. [[0|So length is 8 and charAt(7) is s.]] [[1|indexOf(\"u\") finds index 3.]] [[2|substring(3, 6) takes indexes 3, 4 and 5, which is \"umb\", and substring(5) is \"bus\".]] [[3|For the first three characters I'd write String start = s.substring(0, 3);]]",
          "Full marks. Writing out the index of each letter is a good strategy.",
        ],
        [
          "partial",
          "[[0|length is 8, charAt(7) is s.]] indexOf(\"u\") is 6 because it is the last u. [[2|substring(3, 6) is \"umb\", substring(5) is \"bus\".]] [[3|String start = s.substring(0, 3);]]",
          "indexOf returns the first match, which is index 3, not 6.",
        ],
        [
          "partial",
          "[[1|indexOf(\"u\") is 3.]] [[3|String start = s.substring(0, 3);]] length is 7, charAt(7) is s, substring(3, 6) is \"umbu\".",
          "The length is 8, and substring(3, 6) excludes index 6, so it is \"umb\".",
          true,
        ],
        [
          "weak",
          "length is 9, charAt(7) is u, indexOf is 4, substring(3, 6) is \"mbu\", substring(5) is \"us\".",
          "Write out the index of each letter starting from 0. Then use the rules for each method.",
        ],
        [
          "weak",
          "[[3|String start = s.substring(0, 3);]] I do not know the others because strings are hard.",
          "Index each letter from 0, then apply each method one by one.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Constructors, classes and conditional statements",
  note: `
## Objectives

Students will be able to:

1. create objects with constructors and describe the parts of a class;
2. write conditional statements using boolean expressions and relational operators.

## Materials

A provided Student class, a computer lab, a tracing worksheet, the quiz.

## Starter (6 minutes)

Show a class diagram for Student with name and grade and ask: "What is a class? What is an object?" Use the cookie cutter and cookie analogy: the class is the cutter, objects are the cookies.

## Main activity

1. Class and object: a class defines the data (instance variables) and behavior (methods) of a type. An object is an instance. Create objects with new and a constructor: Student s = new Student("Ana", 11); The constructor has the same name as the class and no return type. Use null for no object; two variables can reference the same object.
2. Calling methods on objects: s.getName(), s.setGrade(12). Parameters and return values; void methods.
3. Relational operators: ==, !=, <, >, <=, >=. Boolean expressions evaluate to true or false. if, if-else, else if. Comparing Strings: equals, not ==. Common errors: = versus ==; missing braces; dangling else.
4. Write a method that returns a letter grade: if (score >= 90) return "A"; else if (score >= 80) return "B"; and so on.

## Checking for understanding

Whiteboards: trace the output for score = 85 in an if / else if chain.

## Quiz

Constructors, objects and conditionals.
`,
  reading: [
    "Making objects, and making decisions",
    `
Java programs are organized into **classes**. A class is a blueprint: it describes the **instance variables** (the data each object stores) and the **methods** (what the object can do). An **object** is one instance of the class, created with the keyword **new** and a **constructor**:

    Student s = new Student("Ana", 11);

A **constructor** has the same name as the class and no return type. It sets up the object's instance variables, here the name and the grade. The variable s holds a **reference** to the object. If you write Student t = s; then t and s refer to the **same** object, so a change made through one is seen through the other. A reference may also be **null**, which means it points to no object; calling a method on a null reference causes a NullPointerException.

You call a method on an object with the dot operator: s.getName() returns the name, and s.setGrade(12) changes the grade. A method can have **parameters**, values passed in; a **return value** of a given type, which it sends back with the return statement; or the keyword **void** if it returns nothing. The method signature, such as public int getGrade(), tells you the name, the parameters and the return type.

Programs make decisions with **conditional statements**. A **boolean expression** evaluates to true or false, and uses **relational operators**: == (equal), != (not equal), <, >, <= and >=. A single = is assignment, so writing if (x = 5) is an error; use if (x == 5). An **if** statement runs a block only when the condition is true. An **if-else** chooses between two blocks. An **else if** chain picks the first condition that is true and skips the rest:

    if (score >= 90) { grade = "A"; }
    else if (score >= 80) { grade = "B"; }
    else if (score >= 70) { grade = "C"; }
    else { grade = "F"; }

If score is 85, the first condition is false, the second is true, so grade is "B" and the remaining conditions are not checked. Notice that order matters: if the conditions were written in the opposite order (>= 70 first), a score of 95 would get a "C". Use braces for every block, even with one statement, to prevent mistakes. When comparing Strings, always use **equals**: if (answer.equals("yes")). The == operator compares references, so two Strings with the same characters may not be ==.
`,
  ],
  cards: [
    ["Class", "A blueprint that defines the data and behavior of a type of object."],
    ["Object", "An instance of a class, created with new."],
    ["Constructor", "A special method that initializes a new object; has the class name and no return type."],
    ["Instance variable", "A variable that each object stores its own copy of."],
    ["Method signature", "The name, parameters and return type of a method."],
    ["==", "Relational operator that tests whether two values are equal."],
    ["else if chain", "A series of conditions in which only the first true one runs."],
    ["NullPointerException", "Error from calling a method on a null reference."],
  ],
  closed: [
    [
      "Which statement creates a Student object?",
      ["Student s = Student(\"Ana\", 11);", "Student s = new Student(\"Ana\", 11);", "new s = Student(\"Ana\", 11);", "Student s = new(\"Ana\", 11);"],
      "B",
    ],
    [
      "If score is 85, what is grade after this chain: if (score >= 90) grade = \"A\"; else if (score >= 80) grade = \"B\"; else grade = \"C\";",
      ["A", "B", "C", "It is not assigned"],
      "B",
    ],
    [
      "What is wrong with if (x = 5)?",
      ["Nothing", "It uses assignment instead of comparison", "It needs a semicolon", "It should use equals"],
      "B",
    ],
    [
      "Student t = s; where s is a Student object. After t.setGrade(12), what is s.getGrade()?",
      ["The original grade", "12", "null", "An error"],
      "B",
    ],
    [
      "Which compares the content of two Strings?",
      ["s1 == s2", "s1.equals(s2)", "s1 = s2", "s1 != s2"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a method public static String letterGrade(int score) that returns \"A\" for 90 or above, \"B\" for 80 to 89, \"C\" for 70 to 79, and \"F\" otherwise. Then trace the return values for scores 95, 85, 70 and 69, and explain why the order of the conditions matters.",
      scheme: [
        "Writes a correct if / else if / else chain with the right relational operators",
        "Returns a String in each branch and the method compiles as written",
        "Traces the return values correctly: A, B, C and F",
        "Explains that the first true condition runs and the rest are skipped, so reversing the order would give the wrong grade",
      ],
      model:
        "public static String letterGrade(int score) { if (score >= 90) { return \"A\"; } else if (score >= 80) { return \"B\"; } else if (score >= 70) { return \"C\"; } else { return \"F\"; } } For 95 the result is A, for 85 it is B, for 70 it is C and for 69 it is F. The order matters because the first true condition runs and the rest are skipped; if >= 70 came first, 95 would return C.",
      answers: [
        [
          "full",
          `[[0|if (score >= 90) { return "A"; } else if (score >= 80) { return "B"; } else if (score >= 70) { return "C"; } else { return "F"; }]] [[1|Every branch returns a String, so the method always returns a value.]] [[2|95 gives A, 85 gives B, 70 gives C, 69 gives F.]] [[3|The order matters because the chain stops at the first true condition, so if I put >= 70 first, a 95 would get a C.]]`,
          "Full marks. The method is correct, and your explanation of the order is exactly right.",
        ],
        [
          "full",
          `public static String letterGrade(int score) { [[0|if (score >= 90) return "A"; if (score >= 80) return "B"; if (score >= 70) return "C"; return "F";]] } [[1|Each return exits the method, so no else is needed, and every path returns a String.]] [[2|Tracing: 95 returns A, 85 returns B, 70 returns C, 69 returns F.]] [[3|If the checks were reversed, 95 would meet >= 70 first and return C, so I go from highest to lowest.]]`,
          "Full marks. Using early returns without else is a valid and clean alternative.",
        ],
        [
          "partial",
          `[[0|if (score >= 90) { return "A"; } else if (score >= 80) { return "B"; } else if (score >= 70) { return "C"; } else { return "F"; }]] [[2|95 is A, 85 is B, 70 is C, 69 is F.]] The order doesn't matter because Java checks all of them.`,
          "Java stops at the first true condition in an else if chain, so the order matters. Explain what would happen with a reversed order.",
        ],
        [
          "partial",
          `[[3|The order matters because the first true condition runs.]] [[2|95 is A, 85 is B, 70 is C, 69 is F.]] if (score > 90) return "A"; else if (score > 80) return "B";`,
          "Using > instead of >= would give a wrong result for 90 and 80. The boundary values need >=.",
          true,
        ],
        [
          "weak",
          `if (score = 90) return "A"; if (score = 80) return "B"; return "F";`,
          "A single = is assignment. Use >= to compare, and include all the grades.",
        ],
        [
          "weak",
          `[[2|95 is A, 85 is B, 70 is C, 69 is F.]] I would write the method as void and print the grade.`,
          "The method must return a String, so its return type is String and each branch uses return.",
        ],
      ],
    },
    {
      prompt:
        "Explain the difference between a class and an object, using Student as an example. Then explain what happens in memory in this code and what is printed: Student a = new Student(\"Ana\", 11); Student b = a; b.setGrade(12); System.out.println(a.getGrade());",
      scheme: [
        "Explains that a class is a blueprint and an object is an instance created from it",
        "Explains that new Student(\"Ana\", 11) creates one object and a refers to it",
        "Explains that b = a copies the reference, so both variables refer to the same object",
        "States that 12 is printed because setGrade through b changes the one shared object",
      ],
      model:
        "A class is a blueprint that describes the data and behavior of students, and an object is one specific student created from it. new Student(\"Ana\", 11) creates one object, and a refers to it. b = a copies the reference, so a and b refer to the same object. b.setGrade(12) changes that shared object, so 12 is printed.",
      answers: [
        [
          "full",
          `[[0|A class is the blueprint for Student, and an object is one particular student, created from the class.]] [[1|new Student("Ana", 11) makes one object, and a points to it.]] [[2|Student b = a copies the reference, not the object, so a and b both point to the same Student.]] [[3|b.setGrade(12) changes that shared object, so a.getGrade() prints 12.]]`,
          "Full marks. The distinction between copying a reference and copying an object is the key point.",
        ],
        [
          "full",
          `[[0|Student is the class: it defines what every student has (a name and a grade). Ana is an object, an instance.]] [[1|The first line creates one Student and stores its reference in a.]] [[2|The second line makes b a second name for the same object, with no new object created.]] [[3|So when b changes the grade to 12, a sees it, and the output is 12.]]`,
          "Full marks. 'A second name for the same object' is a good way to put it.",
        ],
        [
          "partial",
          `[[0|A class is a blueprint and an object is an instance.]] [[1|a refers to the new Student object.]] b is a copy of the object so the grade of a stays 11 and it prints 11.`,
          "b = a copies the reference, not the object, so there is only one Student. Setting b's grade changes a's too.",
        ],
        [
          "partial",
          `[[2|b and a refer to the same object.]] [[3|12 is printed.]] A class is an object that has many classes inside.`,
          "A class is the blueprint, and objects are instances of it. Rewrite the first part.",
          true,
        ],
        [
          "weak",
          `A class and an object are the same thing. The output is 11 because a is a different variable from b.`,
          "A class is a blueprint and an object is an instance. The variables share the same object, so the output is 12.",
        ],
        [
          "weak",
          `[[1|a refers to the object.]] Two new Student objects are made so the output is 11.`,
          "Only one object is created, because b = a does not use new.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Compound conditions, De Morgan's laws and loops",
  note: `
## Objectives

Students will be able to:

1. combine conditions with and, or and not, and apply De Morgan's laws;
2. write while and for loops and trace their output.

## Materials

Truth table worksheet, loop tracing tables, a computer lab, the problem set.

## Starter (6 minutes)

Ask: "A student can go to the dance if they have a ticket and are not suspended. Write that as a Java condition." Discuss && and !, and compare answers on the board.

## Main activity

1. Logical operators: && (and), || (or), ! (not). Truth tables. Short-circuit evaluation: in a && b, if a is false, b is not evaluated; in a || b, if a is true, b is not evaluated. Example: if (d != 0 && n / d > 2) avoids division by zero.
2. De Morgan's laws: !(a && b) is equivalent to !a || !b; !(a || b) is equivalent to !a && !b. Apply: !(x > 5 || y < 3) is the same as x <= 5 && y >= 3. Simplify and check with truth tables.
3. while loops: initialize, test, update. Infinite loops. Off-by-one errors. for loops: for (int i = 0; i < 5; i++). Trace tables for variables. Example: sum of 0 to 4 is 10; for (int i = 1; i <= 10; i += 3) runs for i = 1, 4, 7 and 10, which is 4 times.

## Checking for understanding

Whiteboards: apply De Morgan's law to !(a && !b).

## Problem set

Simplify conditions and trace loops.
`,
  reading: [
    "And, or, not, and repeating work",
    `
Conditions can be combined with three **logical operators**: **&&** (and), **||** (or) and **!** (not). The expression a && b is true only if both are true; a || b is true if at least one is true; !a reverses the value. A student can attend the dance if hasTicket && !suspended. In Java, && and || use **short-circuit evaluation**: in a && b, if a is false, Java does not evaluate b because the result must be false; in a || b, if a is true, b is skipped. This is useful for safety: if (d != 0 && n / d > 2) never divides by zero, because when d is 0 the first condition is false and the division is skipped. Writing the conditions in the opposite order would crash.

**De Morgan's laws** show how to distribute a not: **!(a && b)** is equivalent to **!a || !b**, and **!(a || b)** is equivalent to **!a && !b**. In words: not both means at least one is false; not either means both are false. Apply them to relational expressions by reversing each operator: **!(x > 5 || y < 3)** becomes **x <= 5 && y >= 3**. Check with a truth table or a test value: if x = 4 and y = 10, the original is !(false || false), which is true; the new form is (4 <= 5) && (10 >= 3), which is true. The laws let you simplify complicated conditions and make code easier to read.

Loops repeat statements. A **while** loop has a condition that is tested before every pass:

    int count = 0;
    int i = 1;
    while (i <= 10) {
        count++;
        i += 3;
    }

A while loop needs three parts: an initialization (i = 1), a test (i <= 10) and an update (i += 3). If the update is missing, the loop never ends, which is an **infinite loop**. Trace the code: i = 1 (count 1), i = 4 (count 2), i = 7 (count 3), i = 10 (count 4), and then i = 13 fails the test. So count ends as 4. A **for** loop packs the three parts into one line:

    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += i;
    }

The loop variable i takes the values 0, 1, 2, 3 and 4, and sum becomes 0 + 1 + 2 + 3 + 4 = 10. Notice that i < 5 stops before 5. Using <= would run one more time, which is a common **off-by-one error**. To trace a loop, make a table of the variables and update it line by line, which prevents most mistakes.
`,
  ],
  cards: [
    ["&& / || / !", "Logical and, or, not."],
    ["Short-circuit evaluation", "Skipping the second operand when the first determines the result."],
    ["De Morgan's law", "!(a && b) equals !a || !b, and !(a || b) equals !a && !b."],
    ["while loop", "A loop that repeats while its condition is true."],
    ["for loop", "A loop with initialization, test and update in one line."],
    ["Infinite loop", "A loop whose condition never becomes false."],
    ["Off-by-one error", "A loop that runs one time too many or too few."],
    ["Trace table", "A table tracking variable values line by line."],
  ],
  closed: [
    [
      "Which expression is equivalent to !(x > 5 || y < 3)?",
      ["x <= 5 && y >= 3", "x <= 5 || y >= 3", "x < 5 && y > 3", "x > 5 && y < 3"],
      "A",
    ],
    [
      "What is the value of sum after: int sum = 0; for (int i = 0; i < 5; i++) { sum += i; }",
      ["5", "10", "15", "4"],
      "B",
    ],
    [
      "How many times does the body run? for (int i = 1; i <= 10; i += 3)",
      ["3", "4", "5", "10"],
      "B",
    ],
    [
      "In if (d != 0 && n / d > 2), what happens when d is 0?",
      ["Division by zero crashes", "The condition is false and n / d is not evaluated", "The condition is true", "Compile error"],
      "B",
    ],
    [
      "Which loop never ends? int i = 0; while (i < 5) { System.out.println(i); }",
      ["It ends after 5 passes", "It is an infinite loop because i is never updated", "It ends after 4 passes", "It does not compile"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Use De Morgan's laws to rewrite each condition without a leading not, then verify one with test values: (1) !(a > 0 && b > 0) (2) !(x == 3 || y == 4). Explain how short-circuit evaluation protects this code: if (count != 0 && total / count > 10).",
      scheme: [
        "Rewrites (1) as a <= 0 || b <= 0",
        "Rewrites (2) as x != 3 && y != 4",
        "Verifies one rewrite with test values correctly",
        "Explains that when count is 0 the first condition is false, so total / count is not evaluated and no division by zero occurs",
      ],
      model:
        "(1) !(a > 0 && b > 0) becomes a <= 0 || b <= 0. (2) !(x == 3 || y == 4) becomes x != 3 && y != 4. Check (1) with a = 2 and b = -1: the original is !(true && false), which is true; the rewrite is false || true, which is true. In the last code, when count is 0 the first condition is false, so total / count is not evaluated, and there is no division by zero.",
      answers: [
        [
          "full",
          `[[0|(1) becomes a <= 0 || b <= 0.]] [[1|(2) becomes x != 3 && y != 4.]] [[2|Check (1) with a = 2 and b = -1: original !(true && false) is true, and the new one (false || true) is true.]] [[3|In the last code, if count is 0, count != 0 is false, so the && short-circuits and total / count never runs, which avoids dividing by zero.]]`,
          "Full marks. The verification with test values is exactly what De Morgan questions reward.",
        ],
        [
          "full",
          `[[0|!(a > 0 && b > 0) is a <= 0 || b <= 0: flip each operator and change && to ||.]] [[1|!(x == 3 || y == 4) is x != 3 && y != 4.]] [[2|Test x = 3, y = 5: original !(true || false) = false; new (false && true) = false. They match.]] [[3|With count equal to 0 the left side of && is false, so Java skips the division and avoids an ArithmeticException.]]`,
          "Full marks. Naming ArithmeticException is a nice detail.",
        ],
        [
          "partial",
          `[[0|(1) is a <= 0 || b <= 0.]] [[1|(2) is x != 3 || y != 4.]] The division is safe because Java checks total first.`,
          "In (2) the not of an or becomes an and: x != 3 && y != 4. Explain that the first condition (count != 0) is checked first.",
        ],
        [
          "partial",
          `[[2|Test a = 2, b = -1: both give true.]] [[3|Short-circuit stops the division when count is 0.]] (1) is a < 0 && b < 0.`,
          "Flipping a > 0 gives a <= 0, and the && becomes ||. The rewrite is a <= 0 || b <= 0.",
          true,
        ],
        [
          "weak",
          `(1) is a < 0 && b < 0 and (2) is x != 3 && y == 4. The division always runs.`,
          "Use De Morgan's laws carefully: negate each part and switch the operator. The && stops evaluation when its first part is false.",
        ],
        [
          "weak",
          `[[3|When count is 0, total / count isn't evaluated.]] De Morgan's law means to remove all the nots and leave the rest the same.`,
          "De Morgan's law flips each comparison and changes && to || or the reverse.",
        ],
      ],
    },
    {
      prompt:
        "Trace this code and give the final values of count and i: int count = 0; int i = 1; while (i <= 10) { count++; i += 3; } Then rewrite the loop as a for loop that does the same thing, and explain how an off-by-one error could occur if the test were i < 10.",
      scheme: [
        "Traces the values of i as 1, 4, 7 and 10 in the loop",
        "States the final count as 4 and the final i as 13",
        "Writes an equivalent for loop: for (int i = 1; i <= 10; i += 3) { count++; }",
        "Explains that with i < 10 the pass with i = 10 would be skipped, so count would be 3",
      ],
      model:
        "The loop body runs when i is 1, 4, 7 and 10. After the last pass, i is 13, which fails the test. The final count is 4 and the final i is 13. The equivalent for loop is for (int i = 1; i <= 10; i += 3) { count++; }. With i < 10 the pass with i = 10 would be skipped, so count would be 3, an off-by-one error.",
      answers: [
        [
          "full",
          `[[0|The body runs with i = 1, 4, 7 and 10.]] [[1|After the last pass i becomes 13, which fails the test, so count is 4 and i is 13.]] [[2|The for loop is for (int i = 1; i <= 10; i += 3) { count++; }]] [[3|If the test were i < 10, then i = 10 would not run and count would be 3, an off-by-one error.]]`,
          "Full marks. Including the final value of i shows you traced the update after the last pass.",
        ],
        [
          "full",
          `Trace table: i is 1 then count 1; i is 4 then count 2; i is 7 then count 3; i is 10 then count 4. [[0|The loop runs for i = 1, 4, 7 and 10.]] [[1|Then i is 13, the loop ends, and the final values are count = 4 and i = 13.]] [[2|As a for loop: int count = 0; for (int i = 1; i <= 10; i += 3) { count++; }]] [[3|With i < 10, the case i = 10 fails the test, so the loop would run only 3 times.]]`,
          "Full marks. The trace table is a model of clear tracing.",
        ],
        [
          "partial",
          `[[0|i takes the values 1, 4, 7 and 10.]] [[1|count is 4, and i is 10 at the end.]] [[2|for (int i = 1; i <= 10; i += 3) { count++; }]] With i < 10 nothing changes.`,
          "The update runs after the last pass, so i ends as 13. And with i < 10 the pass for i = 10 is skipped, so count would be 3.",
        ],
        [
          "partial",
          `[[1|count is 4 and i is 13.]] [[3|With i < 10, count would be 3.]] The loop runs for i = 1, 2, 3, 4, and so on up to 10.`,
          "i increases by 3 each pass, so it takes the values 1, 4, 7 and 10 only.",
          true,
        ],
        [
          "weak",
          `The loop runs 10 times, so count is 10 and i is 10. A for loop cannot do the same thing.`,
          "i changes by 3 each pass, not 1, so the body runs fewer than 10 times. A for loop can do the same.",
        ],
        [
          "weak",
          `[[2|for (int i = 1; i <= 10; i += 3) { count++; }]] The loop is infinite because i never changes.`,
          "The update i += 3 changes i every pass, so the loop does end.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "Nested loops and algorithms with loops and conditions",
  note: `
## Objectives

Students will be able to:

1. use nested loops to produce patterns and process data;
2. develop and trace algorithms that use loops and conditions.

## Materials

Graph paper for patterns, tracing tables, a computer lab, the worksheet.

## Starter (6 minutes)

Write the pattern on the board: *, **, *** (a right triangle with 3 rows). Ask: "What loop would print this? How many times does each row repeat?" Draft a solution together.

## Main activity

1. Nested loops: the inner loop runs completely for each pass of the outer loop. Pattern: for (int i = 1; i <= 3; i++) { for (int j = 1; j <= i; j++) { System.out.print("*"); } System.out.println(); } prints one star, then two, then three: six stars in total. Count executions: outer n times, inner m times each gives n times m for a rectangle, but a triangle gives 1 + 2 + 3 = 6.
2. Multiplication table: for i = 1 to 3 and j = 1 to 3 print i * j with spaces.
3. Common algorithms: count how many values meet a condition (count even numbers from 1 to 20: 10), sum, find the maximum (initialize to the first value or to Integer.MIN_VALUE), average (sum / count with double casting), check if a number is prime by testing divisors up to its square root, reverse a String by traversing from the end.
4. Tracing: use a table with columns for i, j, output.

## Checking for understanding

Ask: "How many times does System.out.print run in two nested loops of 4 and 5 passes?"

## Worksheet

Patterns and algorithm tracing.
`,
  reading: [
    "Loops inside loops, and loops that solve problems",
    `
A **nested loop** is a loop inside another loop. For each pass of the outer loop, the inner loop runs through all its passes. Look at this code:

    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= i; j++) {
            System.out.print("*");
        }
        System.out.println();
    }

When i is 1, the inner loop runs j = 1 only, printing one star. When i is 2, j runs 1 and 2, printing two stars. When i is 3, j runs 1, 2 and 3, printing three stars. The println moves to a new line after each row. The output is a right triangle:

    *
    **
    ***

The total number of stars is 1 + 2 + 3 = 6. To count how many times an inner statement runs, think about it for each outer value. If both loops ran a fixed number of times, such as an outer loop of 4 passes and an inner loop of 5, the inner statement would run 4 times 5, or 20 times. Because the inner loop limit depends on i, the count here is a sum, not a product. To trace nested loops, make a table with columns for i, j and the output, and write a row for each pass of the inner loop.

Loops are also used to build **algorithms**. To **count** items that meet a condition, use a counter and an if statement: to count the even numbers from 1 to 20,

    int count = 0;
    for (int n = 1; n <= 20; n++) {
        if (n % 2 == 0) {
            count++;
        }
    }

gives 10. To find a **maximum**, start with the first value as the maximum and update it whenever you find a larger one; do not start the maximum at 0 if the data may be negative. To compute an **average**, find the sum and divide by the count, but remember integer division: use (double) sum / count. To test whether a number n is **prime**, try divisors from 2 up to the square root of n; if one divides evenly (n % d == 0), the number is not prime. To **reverse a String**, loop from the last index down to 0 and build a new String with charAt. Always test an algorithm with simple data, including the boundaries, such as an empty list or a list with a single value.
`,
  ],
  cards: [
    ["Nested loop", "A loop inside another loop; the inner loop runs fully for each outer pass."],
    ["Right triangle pattern", "Rows with 1, 2, 3... stars, produced by an inner loop limited by i."],
    ["Counter", "A variable that counts how many times a condition occurs."],
    ["Accumulator", "A variable that adds up values in a loop."],
    ["Maximum algorithm", "Keep the largest value seen so far."],
    ["Prime test", "Check divisors from 2 up to the square root."],
    ["Average", "(double) sum / count."],
    ["Boundary case", "A test value at the edge of the allowed range, such as an empty list."],
  ],
  closed: [
    [
      "How many stars are printed by the triangle code with i from 1 to 3 and j from 1 to i?",
      ["3", "6", "9", "12"],
      "B",
    ],
    [
      "An outer loop runs 4 times and an inner loop runs 5 times each. How many times does the inner statement run?",
      ["9", "16", "20", "25"],
      "C",
    ],
    [
      "How many even numbers are counted from 1 to 20?",
      ["5", "10", "15", "20"],
      "B",
    ],
    [
      "To compute the average of ints without losing the decimal part, write:",
      ["sum / count", "(double) sum / count", "sum % count", "(double) (sum / count)"],
      "B",
    ],
    [
      "Why should a maximum algorithm not start the maximum at 0 for any data?",
      ["0 is too large", "The data may all be negative", "0 is not an int", "It would run too fast"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Trace this code and give its exact output: for (int i = 1; i <= 3; i++) { for (int j = 1; j <= 3; j++) { System.out.print(i * j + \" \"); } System.out.println(); } Then say how many times the print statement executes, and how the output would change if the inner loop were j <= i.",
      scheme: [
        "Gives the first row as 1 2 3",
        "Gives the second and third rows as 2 4 6 and 3 6 9",
        "States that the print statement executes 9 times",
        "Explains that with j <= i the rows would have 1, 2 and 3 values (1 / 2 4 / 3 6 9), so it executes 6 times",
      ],
      model:
        "The output is three rows: 1 2 3, then 2 4 6, then 3 6 9. The print statement executes 3 times 3, which is 9 times. If the inner loop were j <= i, the rows would be 1; then 2 4; then 3 6 9, and the print would execute 1 + 2 + 3 = 6 times.",
      answers: [
        [
          "full",
          `[[0|The first row is 1 2 3.]] [[1|The second row is 2 4 6 and the third row is 3 6 9.]] [[2|The print runs 3 × 3 = 9 times.]] [[3|With j <= i, row one has 1, row two has 2 4 and row three has 3 6 9, so the print runs 1 + 2 + 3 = 6 times.]]`,
          "Full marks. You traced all rows and recognized the change from a product to a sum.",
        ],
        [
          "full",
          `i = 1: j goes 1, 2, 3 so [[0|it prints 1 2 3]]. i = 2: [[1|2 4 6]]. i = 3: 3 6 9. [[2|That's 9 prints in total.]] [[3|If the inner limit is i, the rows get shorter: 1; 2 4; 3 6 9, which means 6 prints.]]`,
          "Full marks. The trace for each value of i is clear.",
        ],
        [
          "partial",
          `[[0|The first row is 1 2 3.]] [[1|Then 2 4 6 and 3 6 9.]] The print runs 3 times. With j <= i it runs 3 times too.`,
          "The inner statement runs 3 times for each of the 3 outer passes, so 9 times. With j <= i it runs 6 times.",
        ],
        [
          "partial",
          `[[2|The print runs 9 times.]] [[3|With j <= i it runs 6 times.]] The output is 1 2 3, 4 5 6 and 7 8 9.`,
          "The output multiplies i and j, so the rows are 1 2 3, 2 4 6 and 3 6 9.",
          true,
        ],
        [
          "weak",
          `The output is 1 2 3 on one line and it stops. The print runs once.`,
          "The nested loop prints three rows, and the inner statement runs 9 times.",
        ],
        [
          "weak",
          `[[2|The print runs 9 times.]] The output is all the numbers 1 to 9 in a row.`,
          "The output is the products of i and j in three rows, not the numbers 1 to 9.",
        ],
      ],
    },
    {
      prompt:
        "Write a code segment that counts how many numbers from 1 to 50 are divisible by 3 or by 5, and prints the count. Then trace what the algorithm would give for the range 1 to 15, and explain why the number 15 is counted only once.",
      scheme: [
        "Initializes a counter and uses a for loop from 1 to 50 inclusive",
        "Uses a correct condition with ||, such as n % 3 == 0 || n % 5 == 0",
        "Gives 7 for the range 1 to 15 (3, 5, 6, 9, 10, 12, 15)",
        "Explains that 15 satisfies both conditions but the || makes one condition true, so count++ runs once",
      ],
      model:
        "int count = 0; for (int n = 1; n <= 50; n++) { if (n % 3 == 0 || n % 5 == 0) { count++; } } System.out.println(count); For 1 to 15, the numbers are 3, 5, 6, 9, 10, 12 and 15, so the count is 7. The number 15 is divisible by both, but it is counted once because the if statement runs count++ once per number.",
      answers: [
        [
          "full",
          `[[0|int count = 0; for (int n = 1; n <= 50; n++) {]] [[1|if (n % 3 == 0 || n % 5 == 0) { count++; } } System.out.println(count);]] [[2|For 1 to 15, the matches are 3, 5, 6, 9, 10, 12 and 15, so the count is 7.]] [[3|15 is divisible by both 3 and 5, but the if is evaluated once for each n, so count++ runs only once for 15.]]`,
          "Full marks. The code is correct, and you listed the matches.",
        ],
        [
          "full",
          `[[0|I'd start count at 0 and loop n from 1 through 50 with n <= 50.]] [[1|Inside, if (n % 3 == 0 || n % 5 == 0) count++;]] [[2|Tracing 1 to 15: 3, 5, 6, 9, 10, 12, 15 gives 7.]] [[3|The || is one test per number, so even though 15 is a multiple of both, it adds just one to the count.]]`,
          "Full marks. You included the boundary 50 with <=.",
        ],
        [
          "partial",
          `[[0|int count = 0; for (int n = 1; n <= 50; n++)]] if (n % 3 == 0 && n % 5 == 0) { count++; } [[2|For 1 to 15 the count is 7.]]`,
          "Using && would count only multiples of both. You need || to count numbers divisible by 3 or by 5.",
        ],
        [
          "partial",
          `[[1|if (n % 3 == 0 || n % 5 == 0) count++;]] [[3|15 is counted once.]] for (int n = 1; n < 50; n++) with count = 1 to start. For 1 to 15 the count is 8.`,
          "Start count at 0, use n <= 50, and recount 1 to 15: 3, 5, 6, 9, 10, 12 and 15 make 7.",
          true,
        ],
        [
          "weak",
          `int count = 50 / 3 + 50 / 5; System.out.println(count); That gives the right answer in all cases.`,
          "Dividing 50 by 3 and 5 double counts the multiples of 15. A loop with an or condition counts each number once.",
        ],
        [
          "weak",
          `[[2|For 1 to 15, it is 7.]] I would use a while loop with no variable that changes.`,
          "A while loop must update its variable or it never ends. Use a for loop or update n.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "Writing classes: encapsulation, this and static",
  note: `
## Objectives

Students will be able to:

1. write a class with private instance variables, constructors and accessor and mutator methods;
2. explain the scope of variables and the meaning of the this keyword;
3. write static methods and variables and say when to use them.

## Materials

A starter BankAccount class, a computer lab, a scope diagram, the worksheet.

## Starter (6 minutes)

Ask: "Why shouldn't a bank account let any code set the balance directly?" Collect ideas (security, rules such as no negative deposits). Introduce encapsulation.

## Main activity

1. Class design: private instance variables, public methods. Constructors (overloaded), accessors (getBalance) and mutators (setName), and behavior methods that enforce rules (deposit only if amount > 0).
2. Scope: local variables exist only inside their method or block; parameters; instance variables exist as long as the object does. Shadowing: when a parameter has the same name as an instance variable, this.balance refers to the instance variable. this also passes the current object.
3. Static: a static variable belongs to the class, one copy shared by all objects (a counter of accounts); a static method is called on the class (BankAccount.getCount()) and cannot use instance variables directly. Math methods are static. Use static for utilities and shared data.
4. Write and test a BankAccount class with a static counter.

## Checking for understanding

Ask: "Why is the keyword this needed in public Student(String name) { this.name = name; }?"

## Worksheet

Writing a class and tracing static behavior.
`,
  reading: [
    "Protecting data, and what belongs to the class",
    `
A good class hides its data and shows only what is needed. This is called **encapsulation**. The instance variables are declared **private**, so code outside the class cannot read or change them directly. The class offers **public methods** to work with the data. Here is a small class:

    public class BankAccount {
        private String owner;
        private double balance;
        private static int count = 0;

        public BankAccount(String owner, double balance) {
            this.owner = owner;
            this.balance = balance;
            count++;
        }

        public double getBalance() { return balance; }

        public void deposit(double amount) {
            if (amount > 0) {
                balance += amount;
            }
        }

        public static int getCount() { return count; }
    }

The **constructor** sets up a new object. A class can have more than one constructor (**overloading**), each with a different list of parameters. **Accessor** methods (also called getters) return the value of an instance variable, such as getBalance. **Mutator** methods (setters) change it, and a good mutator can **enforce rules**: deposit changes the balance only if the amount is positive. By controlling access, the class can keep its data valid.

The keyword **this** refers to the current object. In the constructor, the parameter owner has the same name as the instance variable owner. Inside the constructor, the plain name owner refers to the parameter, which **shadows** the instance variable. Writing this.owner = owner; assigns the parameter's value to the object's instance variable. Without this, owner = owner; would assign the parameter to itself and leave the instance variable unchanged.

**Scope** is the region of code where a variable can be used. A **local variable** or a parameter exists only inside its method or block, and disappears when the method ends. An **instance variable** exists as long as the object does, and each object has its own copy. A **static variable** such as count belongs to the **class**, not to any object: there is one copy, shared by all objects. Each time the constructor runs, count++ adds one, so after creating three accounts, BankAccount.getCount() returns 3. A **static method** belongs to the class and is called with the class name. Because it does not belong to an object, a static method cannot use instance variables or this directly. Use static for utility methods (Math.sqrt) and for data that is shared by all objects, such as a counter.
`,
  ],
  cards: [
    ["Encapsulation", "Hiding data with private variables and exposing public methods."],
    ["Accessor (getter)", "A method that returns an instance variable's value."],
    ["Mutator (setter)", "A method that changes an instance variable's value."],
    ["this", "A reference to the current object."],
    ["Shadowing", "A parameter or local variable hiding an instance variable of the same name."],
    ["Static variable", "A variable shared by the whole class; one copy."],
    ["Static method", "A method called on the class, which cannot use instance variables directly."],
    ["Overloading", "Having several constructors or methods with different parameters."],
  ],
  closed: [
    [
      "Why are instance variables declared private?",
      ["To make the code run faster", "To protect the data from being changed directly outside the class", "Because Java requires it", "To make them static"],
      "B",
    ],
    [
      "In a constructor with a parameter named owner and an instance variable owner, what does this.owner = owner; do?",
      ["Assigns the parameter to itself", "Assigns the parameter value to the instance variable", "Creates a new variable", "Deletes the variable"],
      "B",
    ],
    [
      "After creating three BankAccount objects (each constructor runs count++ on a static count starting at 0), what does BankAccount.getCount() return?",
      ["0", "1", "3", "It depends on each object"],
      "C",
    ],
    [
      "Which can a static method use directly?",
      ["Instance variables", "The this keyword", "Static variables", "Any non-static method"],
      "C",
    ],
    [
      "What is a mutator method?",
      ["A method that returns an instance variable", "A method that changes an instance variable", "A constructor", "A static method"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a class Student with private instance variables name (String) and grade (int), a constructor that takes both, an accessor getGrade, and a mutator setGrade that only changes the grade if the new value is between 9 and 12 inclusive. Explain how the keyword this is used in your constructor.",
      scheme: [
        "Declares name and grade as private instance variables",
        "Writes a constructor with both parameters that assigns them to the instance variables",
        "Writes getGrade correctly and setGrade with a condition checking 9 to 12 inclusive",
        "Explains that this distinguishes the instance variable from a parameter with the same name",
      ],
      model:
        "public class Student { private String name; private int grade; public Student(String name, int grade) { this.name = name; this.grade = grade; } public int getGrade() { return grade; } public void setGrade(int newGrade) { if (newGrade >= 9 && newGrade <= 12) { grade = newGrade; } } } In the constructor, this.name refers to the instance variable and name to the parameter, because the parameter shadows the instance variable.",
      answers: [
        [
          "full",
          `public class Student { [[0|private String name; private int grade;]] [[1|public Student(String name, int grade) { this.name = name; this.grade = grade; }]] [[2|public int getGrade() { return grade; } public void setGrade(int newGrade) { if (newGrade >= 9 && newGrade <= 12) { grade = newGrade; } }]] } [[3|In the constructor, this.name is the instance variable and name is the parameter, which has the same name and would hide the variable without this.]]`,
          "Full marks. The setter enforces the rule with the correct inclusive range.",
        ],
        [
          "full",
          `[[0|The class has private String name and private int grade.]] [[1|The constructor Student(String name, int grade) sets this.name = name and this.grade = grade.]] [[2|getGrade returns grade. setGrade(int g) checks if (g >= 9 && g <= 12) before assigning.]] [[3|The word this is needed because the parameter name would shadow the instance variable, so name = name would do nothing.]]`,
          "Full marks. Naming the failure of name = name shows you understand shadowing.",
        ],
        [
          "partial",
          `[[0|private String name; private int grade;]] [[1|public Student(String name, int grade) { this.name = name; this.grade = grade; }]] public void setGrade(int g) { grade = g; } [[3|This is for the current object.]]`,
          "The mutator must check that the grade is between 9 and 12 before changing it. Add the condition and the accessor.",
        ],
        [
          "partial",
          `[[2|setGrade checks if (newGrade >= 9 && newGrade <= 12).]] [[3|this refers to the instance variable.]] public String name; public int grade; Student(name, grade) { name = name; grade = grade; }`,
          "Instance variables should be private, and name = name assigns the parameter to itself. Use this.name = name.",
          true,
        ],
        [
          "weak",
          `public static String name; public static int grade; public static void setGrade() {}`,
          "Instance variables should not be static, since each student has their own name and grade. Write the constructor, getter and setter.",
        ],
        [
          "weak",
          `[[0|private String name; private int grade;]] I would use public variables so that other classes can change them directly, because it is easier.`,
          "Private variables with public methods protect the data. A mutator can enforce rules.",
        ],
      ],
    },
    {
      prompt:
        "Given the BankAccount class in the reading (static count starting at 0, incremented in the constructor), trace the output of: BankAccount a = new BankAccount(\"Ana\", 100.0); BankAccount b = new BankAccount(\"Ben\", 50.0); a.deposit(25.0); b.deposit(-10.0); System.out.println(a.getBalance()); System.out.println(b.getBalance()); System.out.println(BankAccount.getCount()); Explain each result.",
      scheme: [
        "Gives a.getBalance() as 125.0 because 25.0 was deposited",
        "Gives b.getBalance() as 50.0 because the negative deposit is rejected by the if statement",
        "Gives BankAccount.getCount() as 2 because the constructor ran twice and count is shared by the class",
        "Explains that balance is an instance variable (separate for each object) while count is a static variable (one shared copy)",
      ],
      model:
        "The output is 125.0, then 50.0, then 2. a.deposit(25.0) adds to Ana's balance, giving 125.0. b.deposit(-10.0) does nothing because the amount is not positive, so Ben's balance stays 50.0. The constructor ran twice, so the shared static count is 2. Balance is an instance variable, with a separate copy for each object, but count is static, with one shared copy.",
      answers: [
        [
          "full",
          `[[0|a's balance is 125.0 since 25.0 was deposited into 100.0.]] [[1|b's balance is 50.0 because deposit ignores amounts that aren't positive.]] [[2|getCount prints 2, since the constructor ran twice and incremented the same count.]] [[3|Each object has its own balance (an instance variable), but count is static, so it's one shared value for the whole class.]]`,
          "Full marks. The distinction between the two kinds of variables is stated clearly.",
        ],
        [
          "full",
          `Output: 125.0, 50.0, 2. [[0|Ana's account goes from 100.0 to 125.0.]] [[1|Ben's -10.0 fails the amount > 0 test so he still has 50.0.]] [[2|Two objects were created, so count went 0 to 1 to 2.]] [[3|balance belongs to each object, while the static count belongs to the BankAccount class.]]`,
          "Full marks. Tracing count from 0 to 1 to 2 shows exactly how the static variable behaves.",
        ],
        [
          "partial",
          `[[0|125.0.]] [[1|50.0.]] The count prints 1 because each object has its own count.`,
          "count is static, so there is only one copy, shared by all objects. It was incremented twice, so it is 2.",
        ],
        [
          "partial",
          `[[2|The count is 2.]] [[3|Count is static so it is shared.]] b's balance is 40.0 because -10.0 was added.`,
          "The deposit method adds only positive amounts, so the -10.0 is ignored and b's balance is 50.0.",
          true,
        ],
        [
          "weak",
          `The output is 100.0, 50.0 and 0 because deposits do not change anything.`,
          "The deposit of 25.0 is valid and changes Ana's balance, and the constructor has run twice.",
        ],
        [
          "weak",
          `[[0|a is 125.0.]] b is 40.0 and the count is 3 since there are two accounts and one deposit.`,
          "Count is only incremented in the constructor, so it is 2. The negative deposit is rejected.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "Documenting classes and one-dimensional arrays",
  note: `
## Objectives

Students will be able to:

1. document a class with comments and preconditions and postconditions;
2. create and traverse a one-dimensional array.

## Materials

A class with missing documentation, an array tracing worksheet, a computer lab, the worksheet.

## Starter (6 minutes)

Show a method with no comments: public static int f(int[] a). Ask: "What does this do? What can you pass? What does it return?" Discuss why documentation matters when others use your code.

## Main activity

1. Documentation: comments (// and /* */), Javadoc (/** ... */) with @param and @return. Precondition: what must be true before the method is called (for example, "arr has at least one element"). Postcondition: what is true after (for example, "returns the largest value in arr").
2. Arrays: a fixed-size ordered collection of elements of one type. Declare and create: int[] arr = new int[5]; or with an initializer: int[] arr = {4, 8, 15, 16, 23, 42}; length is a field (arr.length, no parentheses). Indices 0 to length - 1. Default values: 0 for int, 0.0 for double, false for boolean, null for references.
3. Traversal: for loop with index; enhanced for (for (int x : arr)), which cannot change elements. ArrayIndexOutOfBoundsException when the index is outside 0 to length - 1. Examples: sum of the array above is 108; largest is 42; count values greater than 10.

## Checking for understanding

Ask: "What is arr.length for int[] arr = new int[8]? What is the last index?"

## Worksheet

Writing preconditions and traversing arrays.
`,
  reading: [
    "Explaining your code, and storing many values",
    `
Code is read far more often than it is written, so good programmers **document** it. A comment starting with // runs to the end of the line, and /* ... */ can cover several lines. A **Javadoc** comment, starting with /**, describes a method for other programmers and uses tags such as **@param** for each parameter and **@return** for the value returned. Two ideas help to describe a method precisely. A **precondition** is something that must be true **before** the method is called for it to work correctly. A **postcondition** is something that is true **after** the method runs, assuming the precondition was met. For example:

    /**
     * Returns the largest value in arr.
     * Precondition: arr.length > 0
     * Postcondition: arr is unchanged; the value returned is the maximum
     * @param arr the array to search
     * @return the largest value in arr
     */
    public static int largest(int[] arr)

If a caller breaks the precondition, for example by passing an empty array, the method is not required to work, and the caller is to blame. Writing preconditions makes explicit who is responsible for what.

An **array** stores a fixed number of values of the same type in order. You create one with new, giving the size, or with a list of values:

    int[] arr = new int[5];               // five zeros
    int[] scores = {4, 8, 15, 16, 23, 42};

Each element is accessed by its **index**, starting at 0. For scores, scores[0] is 4 and scores[5] is 42. The number of elements is **scores.length**, which is 6; notice that it is a field, with no parentheses (unlike a String's length()). The valid indices are 0 up to **length - 1**. Using scores[6] or scores[-1] causes an **ArrayIndexOutOfBoundsException** at run time. New arrays are filled with default values: 0 for int, 0.0 for double, false for boolean and null for objects.

To **traverse** an array, use a for loop with the index:

    int sum = 0;
    for (int i = 0; i < scores.length; i++) {
        sum += scores[i];
    }

For scores, sum is 4 + 8 + 15 + 16 + 23 + 42 = 108. The test i < scores.length stops at index 5; using <= would go one past the end and crash. You can also use the **enhanced for loop**: for (int x : scores) { sum += x; }. It is simpler, but it does not give you the index, and changing x does not change the array. To find the largest value, start with the first element and update when you find a bigger one. To count values above 10, use a counter and an if. These patterns appear again and again.
`,
  ],
  cards: [
    ["Precondition", "What must be true before a method is called."],
    ["Postcondition", "What is true after a method finishes."],
    ["Javadoc", "A documentation comment that begins with /**."],
    ["Array index", "The position of an element, starting at 0."],
    ["arr.length", "The number of elements; a field without parentheses."],
    ["ArrayIndexOutOfBoundsException", "Error when an index is outside 0 to length - 1."],
    ["Enhanced for loop", "A loop that visits each element without using an index."],
    ["Default values", "0, 0.0, false, or null for new array elements."],
  ],
  closed: [
    [
      "What is the last valid index of int[] arr = new int[8]?",
      ["7", "8", "9", "0"],
      "A",
    ],
    [
      "What is the sum of int[] scores = {4, 8, 15, 16, 23, 42}?",
      ["96", "104", "108", "112"],
      "C",
    ],
    [
      "What causes an ArrayIndexOutOfBoundsException?",
      ["Using an index below 0 or at or above length", "Using the enhanced for loop", "Creating an empty array", "Using a final variable"],
      "A",
    ],
    [
      "What is a precondition?",
      ["What must be true before a method is called", "What the method returns", "A comment about the author", "A type of loop"],
      "A",
    ],
    [
      "What are the default values in new int[3]?",
      ["null, null, null", "0, 0, 0", "1, 1, 1", "false, false, false"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Write a method public static int countAbove(int[] arr, int limit) that returns how many elements of arr are greater than limit. Include a Javadoc-style comment with a precondition and a postcondition. Then trace countAbove(new int[] {4, 8, 15, 16, 23, 42}, 10) and give the result.",
      scheme: [
        "Writes a correct traversal of the array using index i and arr.length",
        "Uses a counter and an if statement with arr[i] > limit",
        "Includes a precondition and a postcondition in the comment",
        "Traces the call correctly: the elements greater than 10 are 15, 16, 23 and 42, so the result is 4",
      ],
      model:
        "/** Returns the number of elements of arr greater than limit. Precondition: arr is not null. Postcondition: arr is unchanged. */ public static int countAbove(int[] arr, int limit) { int count = 0; for (int i = 0; i < arr.length; i++) { if (arr[i] > limit) { count++; } } return count; } For the given array and a limit of 10, the elements 15, 16, 23 and 42 are above 10, so the result is 4.",
      answers: [
        [
          "full",
          `/** Counts elements above limit. Precondition: arr is not null. Postcondition: arr is unchanged and the count is returned. */ public static int countAbove(int[] arr, int limit) { int count = 0; [[0|for (int i = 0; i < arr.length; i++) {]] [[1|if (arr[i] > limit) { count++; } }]] return count; } [[2|The comment states the precondition (arr is not null) and the postcondition (arr is unchanged).]] [[3|Trace: 4 and 8 are not above 10; 15, 16, 23 and 42 are, so it returns 4.]]`,
          "Full marks. Correct code, clear documentation and a correct trace.",
        ],
        [
          "full",
          `public static int countAbove(int[] arr, int limit) { int count = 0; [[0|for (int value : arr) {]] [[1|if (value > limit) count++; }]] return count; } /** Precondition: arr is not null. Postcondition: returns the number of elements greater than limit; arr unchanged. */ [[2|The documentation includes both conditions.]] [[3|With limit 10 the matching values are 15, 16, 23 and 42, so the answer is 4.]]`,
          "Full marks. The enhanced for loop is a good choice because you do not need the index.",
        ],
        [
          "partial",
          `[[0|for (int i = 0; i <= arr.length; i++)]] [[1|if (arr[i] > limit) count++;]] The result is 4 for the example.`,
          "The test i <= arr.length goes one past the end and causes an ArrayIndexOutOfBoundsException. Use i < arr.length. Add the documentation.",
        ],
        [
          "partial",
          `[[2|Precondition: arr is not null. Postcondition: returns the count.]] [[3|The result is 4.]] int count = arr.length; for (int i = 0; i < arr.length; i++) { if (arr[i] > limit) count++; }`,
          "count should start at 0, not arr.length. Otherwise the answer would be 10.",
          true,
        ],
        [
          "weak",
          `return arr.length - limit; That returns how many are greater than the limit.`,
          "arr.length minus the limit has no relation to how many elements are greater than limit. You need to check each element.",
        ],
        [
          "weak",
          `[[3|The result is 4.]] I would not need comments because the method is short.`,
          "Documenting preconditions and postconditions is required for this task and is good practice.",
        ],
      ],
    },
    {
      prompt:
        "Explain what happens, and why, when this code runs: int[] a = new int[4]; for (int i = 0; i <= a.length; i++) { a[i] = i * 2; } Then state the contents of the array just before the error, and write the corrected loop.",
      scheme: [
        "States that a.length is 4, so the valid indices are 0 to 3",
        "States that the loop runs with i = 4, which is out of bounds, and throws an ArrayIndexOutOfBoundsException",
        "States the array contents just before the error as 0, 2, 4, 6",
        "Writes the corrected loop with i < a.length",
      ],
      model:
        "The array has length 4, so the valid indices are 0 to 3. The loop test i <= a.length lets i be 4, and a[4] is out of bounds, so an ArrayIndexOutOfBoundsException is thrown. Just before the error the array holds 0, 2, 4, 6. The corrected loop is for (int i = 0; i < a.length; i++).",
      answers: [
        [
          "full",
          `[[0|The array has 4 elements, so the valid indices are 0 to 3.]] [[1|The test i <= a.length lets i reach 4, and a[4] doesn't exist, so it throws an ArrayIndexOutOfBoundsException.]] [[2|Just before the error the array contains 0, 2, 4, 6.]] [[3|The fix is for (int i = 0; i < a.length; i++) { a[i] = i * 2; }]]`,
          "Full marks. You found the off-by-one error and described the state of the array.",
        ],
        [
          "full",
          `[[0|With length 4, the last index is 3.]] [[1|On the fifth pass i is 4, which is out of range, so the program crashes at run time with an ArrayIndexOutOfBoundsException.]] [[2|By then a[0] through a[3] were set to 0, 2, 4 and 6.]] [[3|I'd change <= to <, so the loop stops at i = 3.]]`,
          "Full marks. Saying 'on the fifth pass' is a clear way to explain the extra iteration.",
        ],
        [
          "partial",
          `[[0|The length is 4 and the last index is 3.]] [[3|Use i < a.length.]] The array becomes 0, 2, 4, 6, 8 and then it finishes without any error.`,
          "There is no a[4], so the code crashes when i is 4. The array holds 0, 2, 4, 6 just before the error.",
        ],
        [
          "partial",
          `[[1|It throws an ArrayIndexOutOfBoundsException.]] [[2|0, 2, 4, 6 is the content before the error.]] The array has 5 elements because the loop runs 5 times.`,
          "The array has 4 elements because new int[4] sets the size. The loop's extra pass is the bug.",
          true,
        ],
        [
          "weak",
          `Nothing goes wrong. The program makes the array bigger when i is 4.`,
          "Java arrays have a fixed size and do not grow. Access beyond the end causes an error.",
        ],
        [
          "weak",
          `[[3|Change it to i < a.length.]] The error is a compile error because <= is not allowed.`,
          "The code compiles. The error is found at run time.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "ArrayList, searching and sorting",
  note: `
## Objectives

Students will be able to:

1. use an ArrayList to add, remove and search for elements;
2. write algorithms for searching and sorting.

## Materials

A computer lab, playing cards for a physical sorting demo, trace tables, the quiz.

## Starter (6 minutes)

Hand five students index cards with numbers in random order and ask them to sort themselves without talking. Discuss the strategies they used (swapping, inserting, picking the smallest) and connect them to algorithms.

## Main activity

1. ArrayList: import java.util.ArrayList; ArrayList<String> list = new ArrayList<String>(); methods: add(x), add(i, x), get(i), set(i, x), remove(i) (by index) and remove(obj), size(), contains(x), indexOf(x). Size changes; only objects (use Integer, Double). Traversal with a for loop or enhanced for. Pitfall: removing while traversing forward skips elements; traverse backward or adjust the index.
2. Searching: sequential (linear) search checks each element in order; works on any list. Binary search requires a sorted array; compare with the middle and discard half each time. For {2, 5, 8, 12, 16, 23, 38} searching for 23: low = 0, high = 6, mid = 3 (12 < 23), low = 4, mid = 5 (23 found): 2 comparisons.
3. Sorting: selection sort (find the minimum of the unsorted part and swap it to the front) and insertion sort (insert each element into its place in the sorted part). Trace selection sort on {5, 2, 9, 1}: [1, 2, 9, 5], then [1, 2, 9, 5], then [1, 2, 5, 9].

## Checking for understanding

Ask: "Why can't binary search be used on an unsorted array?"

## Quiz

ArrayList methods, search and sort traces.
`,
  reading: [
    "Lists that grow, and finding and ordering things",
    `
An array has a fixed size, but many programs need a collection that can grow and shrink. Java's **ArrayList** does that. It holds objects of one type, written in angle brackets:

    ArrayList<String> names = new ArrayList<String>();
    names.add("Ana");        // [Ana]
    names.add("Ben");        // [Ana, Ben]
    names.add(1, "Cal");     // [Ana, Cal, Ben]
    names.remove(0);         // [Cal, Ben]

The main methods are **add(x)** (to the end), **add(i, x)** (insert at index i, shifting the rest), **get(i)**, **set(i, x)** (replace and return the old value), **remove(i)** (remove by index) and **remove(obj)**, **size()** (the count; a method, unlike the length field of an array), **contains(x)** and **indexOf(x)**. An ArrayList can hold only objects, so for numbers use the wrapper classes Integer and Double. A danger: if you remove elements while traversing forward with an index, the elements shift left and you can skip the next element. A common solution is to traverse from the end to the start.

**Searching** is finding an element. A **sequential search** (linear search) checks each element in order, from the first to the last, and stops when it finds the target. It works on any list but may need to check them all. **Binary search** is much faster but needs a **sorted** array. It compares the target with the middle element: if equal, it is found; if the target is larger, the lower half is discarded; if smaller, the upper half is discarded. Each step halves the remaining range. For {2, 5, 8, 12, 16, 23, 38}, searching for 23: low = 0, high = 6, mid = 3 (the value is 12, less than 23), so low becomes 4; mid = (4 + 6) / 2 = 5 (the value is 23), found after 2 comparisons. A sequential search would need 6.

**Sorting** puts elements in order. In **selection sort**, you find the smallest value in the unsorted part and swap it with the first unsorted position, and repeat. For {5, 2, 9, 1}: the minimum of the whole array is 1, swapped with 5 gives {1, 2, 9, 5}; the minimum of the rest (starting at index 1) is 2, already in place, {1, 2, 9, 5}; the minimum of the last two is 5, swapped with 9 gives {1, 2, 5, 9}. In **insertion sort**, you take each element and slide it left into its place among the already sorted elements. Both take time proportional to the square of the number of elements, which is fine for small lists, though faster algorithms exist for large data.
`,
  ],
  cards: [
    ["ArrayList", "A resizable list of objects."],
    ["size()", "The number of elements in an ArrayList."],
    ["remove(i)", "Removes the element at index i and shifts the rest left."],
    ["Sequential search", "Checking each element in order."],
    ["Binary search", "Repeatedly halving a sorted array to find a target."],
    ["Selection sort", "Repeatedly swapping the minimum of the unsorted part to the front."],
    ["Insertion sort", "Inserting each element into its place in the sorted part."],
    ["Wrapper class", "Integer or Double, an object form of a primitive."],
  ],
  closed: [
    [
      "After names = [Ana, Ben] and names.add(1, \"Cal\"), what is the list?",
      ["[Cal, Ana, Ben]", "[Ana, Cal, Ben]", "[Ana, Ben, Cal]", "[Ana, Cal]"],
      "B",
    ],
    [
      "Binary search for 23 in {2, 5, 8, 12, 16, 23, 38}: what is the first mid value?",
      ["5", "8", "12", "16"],
      "C",
    ],
    [
      "What must be true to use binary search?",
      ["The array is sorted", "The array has fewer than 10 elements", "The array contains only ints", "The array is an ArrayList"],
      "A",
    ],
    [
      "Selection sort on {5, 2, 9, 1}: what is the array after the first pass?",
      ["{1, 2, 9, 5}", "{2, 5, 9, 1}", "{1, 5, 2, 9}", "{5, 2, 1, 9}"],
      "A",
    ],
    [
      "Which method gives the number of elements in an ArrayList?",
      ["length", "length()", "size()", "count()"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Trace selection sort on the array {5, 2, 9, 1} and show the array after each pass. Then describe in words what each pass does, and state how many swaps were made in total.",
      scheme: [
        "Shows {1, 2, 9, 5} after the first pass (1 swapped with 5)",
        "Shows {1, 2, 9, 5} after the second pass (2 already in place)",
        "Shows {1, 2, 5, 9} after the third pass (5 swapped with 9) as the sorted result",
        "Describes that each pass finds the minimum of the unsorted part and swaps it into the next position, and counts 2 swaps that moved elements (or 3 swap operations if counting self-swaps)",
      ],
      model:
        "Pass 1: the minimum of the whole array is 1, swapped with 5, giving {1, 2, 9, 5}. Pass 2: the minimum of the rest is 2, already in position, so the array is {1, 2, 9, 5}. Pass 3: the minimum of the last two is 5, swapped with 9, giving {1, 2, 5, 9}. Each pass finds the minimum of the unsorted part and puts it in the next position. Two swaps moved elements.",
      answers: [
        [
          "full",
          `[[0|Pass 1: min is 1, swap with 5: {1, 2, 9, 5}.]] [[1|Pass 2: min of {2, 9, 5} is 2, already in place: {1, 2, 9, 5}.]] [[2|Pass 3: min of {9, 5} is 5, swap with 9: {1, 2, 5, 9}.]] [[3|Each pass finds the smallest value in the unsorted part and swaps it to the next position; two swaps changed the array.]]`,
          "Full marks. Each pass is described, and the pass that changes nothing is noted.",
        ],
        [
          "full",
          `Start {5, 2, 9, 1}. [[0|After pass 1 (index 0 gets the minimum 1): {1, 2, 9, 5}.]] [[1|After pass 2 (index 1 gets 2): {1, 2, 9, 5}, no change.]] [[2|After pass 3 (index 2 gets 5): {1, 2, 5, 9}, sorted.]] [[3|The idea: repeatedly select the minimum of what's left and place it at the front of the unsorted part, which took 2 real swaps.]]`,
          "Full marks. Noting which index receives the minimum each pass is clear.",
        ],
        [
          "partial",
          `[[0|After pass 1: {1, 2, 9, 5}.]] [[2|After pass 3: {1, 2, 5, 9}.]] After pass 2 it is {1, 2, 5, 9} too. Each pass finds the maximum.`,
          "Selection sort as shown finds the minimum, not the maximum. After pass 2, 9 and 5 are still unsorted: {1, 2, 9, 5}.",
        ],
        [
          "partial",
          `[[3|Each pass finds the minimum and swaps it to the front of the unsorted part.]] [[1|After pass 2, {1, 2, 9, 5}.]] After pass 1 it is {2, 5, 9, 1}.`,
          "In pass 1 the minimum, 1, is swapped with the first element 5, giving {1, 2, 9, 5}.",
          true,
        ],
        [
          "weak",
          `The array is sorted after one pass: {1, 2, 5, 9}. Selection sort is the fastest sort.`,
          "One pass only places one element. You need several passes, and selection sort is not the fastest.",
        ],
        [
          "weak",
          `[[2|The final array is {1, 2, 5, 9}.]] The steps are random because sorting is random.`,
          "Selection sort follows exact steps: find the minimum of the unsorted part, swap it into place.",
        ],
      ],
    },
    {
      prompt:
        "Compare sequential search and binary search. Trace a binary search for 23 in {2, 5, 8, 12, 16, 23, 38} and count the comparisons. Explain what must be true about the array, and why a sequential search of the same array takes more comparisons.",
      scheme: [
        "Describes sequential search as checking each element in order and binary search as halving the range",
        "Traces binary search: mid = 3 (12), then mid = 5 (23), found after 2 comparisons",
        "States that binary search requires a sorted array",
        "States that sequential search would take 6 comparisons for 23 and explains that binary search discards half the range each step",
      ],
      model:
        "Sequential search checks each element in order, and binary search compares the target with the middle element and discards half of the range. For 23, mid = 3 is 12 (too small), so low = 4; mid = 5 is 23, found after 2 comparisons. Binary search needs a sorted array. A sequential search would check 2, 5, 8, 12, 16 and 23, which is 6 comparisons, because it removes only one element per step, while binary search discards half.",
      answers: [
        [
          "full",
          `[[0|Sequential search checks each element in order; binary search compares with the middle and throws away half.]] [[1|Trace: low 0, high 6, mid 3 holds 12, which is less than 23, so low = 4; mid = 5 holds 23, found after 2 comparisons.]] [[2|The array has to be sorted for binary search to work.]] [[3|A sequential search would need 6 comparisons for 23, because it eliminates only one element at a time while binary search halves the range.]]`,
          "Full marks. The trace follows the low, high and mid values exactly.",
        ],
        [
          "full",
          `[[0|In a linear search you start at index 0 and move up; in a binary search you jump to the middle and decide which half could hold the target.]] [[1|First mid = (0 + 6) / 2 = 3, value 12 < 23, so search 4 to 6; mid = 5, value 23, found: 2 comparisons.]] [[2|It only works when the data are sorted, because we assume everything left of the middle is smaller.]] [[3|The linear search reaches 23 on the sixth comparison, so binary search is faster because each step cuts the possibilities in half.]]`,
          "Full marks. Explaining why sorted order is needed is a strong addition.",
        ],
        [
          "partial",
          `[[0|Sequential checks each one, binary halves.]] [[1|Binary search finds 23 in 2 comparisons.]] Binary search works on any array. A sequential search takes the same number of comparisons.`,
          "Binary search requires a sorted array, and sequential search would take 6 comparisons to find 23, not 2.",
        ],
        [
          "partial",
          `[[2|The array must be sorted.]] [[3|Sequential search needs 6 comparisons.]] Binary search finds 23 in 3 comparisons: 12, 16, 23.`,
          "After comparing 12, the lower half is discarded and the next mid is index 5, which is 23. So it takes 2 comparisons.",
          true,
        ],
        [
          "weak",
          `Both searches do the same thing in the same way and always need the same number of comparisons.`,
          "They work differently. Binary search halves the range and needs sorted data.",
        ],
        [
          "weak",
          `[[1|Binary search finds 23 in 2 comparisons.]] It works by checking every element until it finds 23.`,
          "That describes sequential search. Binary search compares with the middle element and discards half.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "Debugging and the impacts of computing",
  note: `
## Objectives

Students will be able to:

1. debug a program by reading error messages and tracing values;
2. discuss the ethical and social impacts of a computing innovation.

## Materials

Programs with planted bugs (a compile error, a run-time error, a logic error), sample error messages, a short case on facial recognition in schools, the problem set.

## Starter (6 minutes)

Show a program that prints 7 instead of 3.5 for an average. Ask: "Is that a compile error, a run-time error or a logic error? How do you know?"

## Main activity

1. Three kinds of errors: syntax/compile-time errors (missing semicolon, undeclared variable, type mismatch such as int x = 3.5; the compiler reports the line); run-time errors/exceptions (ArrayIndexOutOfBoundsException, NullPointerException, ArithmeticException for / by zero, StringIndexOutOfBoundsException); logic errors (the program runs but gives the wrong result, such as integer division or an off-by-one).
2. Reading an error message: the exception type, the message, and the stack trace line numbers. Debugging strategy: reproduce, locate (read the first line of the stack trace), trace with a table or println statements, form a hypothesis, fix one thing, retest. Test with boundary and typical cases.
3. Impacts of computing: benefits and harms of an innovation for different groups. Example: facial recognition for school entry. Benefits (security, convenience). Harms (privacy, bias with higher error rates for some groups, surveillance, data breaches). Questions: Who benefits? Who is harmed? Who decides? What data are collected and who owns them? Laws and consent.

## Checking for understanding

Ask: "Which of these errors would the compiler catch: missing semicolon, dividing by zero, wrong formula?"

## Problem set

Debug three programs and write an impact analysis.
`,
  reading: [
    "Finding and fixing mistakes, and asking who a program affects",
    `
Every programmer writes bugs. What separates beginners from experts is how they find and fix them. Start by naming the kind of error. A **compile-time error** (syntax error) is caught by the compiler before the program runs: a missing semicolon, a misspelled variable, or a type mismatch such as \`int x = 3.5;\`. The compiler tells you the line, and you must fix it before the program will run. A **run-time error** happens while the program runs and causes an **exception**. Common ones are the **ArrayIndexOutOfBoundsException** (an index outside 0 to length - 1), the **NullPointerException** (using a method on a null reference), the **ArithmeticException** with the message "/ by zero" (integer division by zero) and the **StringIndexOutOfBoundsException** (a bad index in charAt or substring). A **logic error** does not stop the program, but the result is wrong: a program that prints 7 for the average of 5 and 10 and 2 has used integer division (17 / 3 gives 5, not the expected 5.67), or a loop that counts one too many times has an off-by-one error. The compiler cannot catch logic errors, so you must test.

Read error messages carefully. A message such as

    Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5
        at Main.sum(Main.java:12)

tells you the exception type, the index (5), the array length (5), and the line number (12). The first line of the stack trace that is in your code is the place to look. Then follow a strategy. **Reproduce** the problem with specific input. **Trace** the code by hand with a table of variable values, or add temporary **System.out.println** statements to see the values. Form a **hypothesis** about the cause, change one thing at a time, and **retest**, including boundary cases such as an empty array, a single element, and the first and last positions.

Programming also has consequences for people. Every computing innovation has **benefits** and **harms**, and these fall differently on different groups. Take a school that adopts **facial recognition** to open the doors. Benefits may include faster entry, no lost ID cards and the ability to alert staff to unauthorized visitors. Harms may include **privacy** concerns about the storage of students' faces, possible **bias** if the system makes more mistakes for some skin tones or ages, the chance that data are **breached**, and a growing culture of **surveillance**. Good analysis asks: Who benefits? Who is harmed or left out? Who decides, and who can opt out? What data are collected, who owns them and for how long are they kept? What laws and consent rules apply? A computer scientist's job includes asking such questions before a system is built, not only after.
`,
  ],
  cards: [
    ["Compile-time error", "A syntax or type error found by the compiler."],
    ["Run-time error (exception)", "An error that happens while the program runs."],
    ["Logic error", "A mistake that makes the program produce wrong results without crashing."],
    ["Stack trace", "The list of method calls and line numbers when an exception occurs."],
    ["NullPointerException", "Error from calling a method on a null reference."],
    ["ArithmeticException", "Error from integer division by zero."],
    ["Boundary case", "A test at the edge of the allowed input."],
    ["Algorithmic bias", "Systematically different results for different groups of people."],
  ],
  closed: [
    [
      "Which error is found by the compiler?",
      ["Dividing by zero", "A missing semicolon", "An off-by-one error", "An infinite loop"],
      "B",
    ],
    [
      "A program prints 5 for the average of 5, 10 and 2 because it uses sum / count with ints. This is a:",
      ["Compile-time error", "Run-time error", "Logic error", "Syntax error"],
      "C",
    ],
    [
      "What does \"Index 5 out of bounds for length 5\" tell you?",
      ["The array has 6 elements", "The code used index 5, but valid indices are 0 to 4", "The array is null", "The code has a syntax error"],
      "B",
    ],
    [
      "Which is a good first step in debugging?",
      ["Change several things at once", "Reproduce the problem and trace values", "Delete the program", "Ignore the error message"],
      "B",
    ],
    [
      "Which is a possible harm of facial recognition in schools?",
      ["Privacy concerns and bias", "Faster entry", "No lost ID cards", "Visitor alerts"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "This method is supposed to return the average of an int array as a double: public static double average(int[] arr) { int sum = 0; for (int i = 0; i <= arr.length; i++) { sum += arr[i]; } return sum / arr.length; } Identify two bugs, name the type of error for each, say what happens for the input {5, 10, 2}, and write a corrected method.",
      scheme: [
        "Identifies the loop test i <= arr.length as a run-time error (ArrayIndexOutOfBoundsException)",
        "Identifies sum / arr.length as a logic error caused by integer division",
        "Explains what would happen with {5, 10, 2}: the exception occurs at i = 3, before any value is returned",
        "Writes a corrected method using i < arr.length and (double) sum / arr.length",
      ],
      model:
        "The first bug is the loop test i <= arr.length, a run-time error: when i is 3, arr[3] is out of bounds, so an ArrayIndexOutOfBoundsException is thrown. The second bug is sum / arr.length, a logic error from integer division, which would give 5 instead of 5.67. With {5, 10, 2}, the exception happens at i = 3 before anything is returned. The corrected method uses i < arr.length and returns (double) sum / arr.length.",
      answers: [
        [
          "full",
          `[[0|Bug 1 is i <= arr.length, which is a run-time error: when i is 3 the array only has indices 0 to 2, so it throws an ArrayIndexOutOfBoundsException.]] [[1|Bug 2 is sum / arr.length, a logic error, because int divided by int drops the decimal part.]] [[2|For {5, 10, 2} the method crashes at i = 3 and never returns; even if the loop were fixed it would return 5 instead of 5.666...]] [[3|The fix: for (int i = 0; i < arr.length; i++) { sum += arr[i]; } return (double) sum / arr.length;]]`,
          "Full marks. Two bugs, both correctly classified, with a working fix.",
        ],
        [
          "full",
          `[[0|The loop goes one too far: when i equals arr.length, arr[i] is out of bounds (a run-time error).]] [[1|The return statement divides two ints (a logic error), so the average of 17 and 3 elements would be 5, not 5.67.]] [[2|With {5, 10, 2}, the exception is thrown on the fourth pass, so no value is returned.]] [[3|Corrected: change <= to < and return (double) sum / arr.length.]]`,
          "Full marks. Naming the fourth pass shows a precise trace.",
        ],
        [
          "partial",
          `[[0|The loop test i <= arr.length is a compile-time error.]] [[1|Integer division is a logic error.]] [[3|The fix is i < arr.length and (double) sum / arr.length.]]`,
          "The loop bug compiles fine and fails when the program runs, so it is a run-time error. Say what happens with {5, 10, 2}.",
        ],
        [
          "partial",
          `[[1|sum / arr.length gives integer division.]] [[2|The program crashes for {5, 10, 2}.]] The bug is that sum should be a double, and the loop is fine.`,
          "The loop is also wrong: i <= arr.length goes past the end. Changing sum to double alone would not fix that.",
          true,
        ],
        [
          "weak",
          `There are no bugs. The method works because it uses a for loop.`,
          "There are two bugs: the loop limit and the integer division.",
        ],
        [
          "weak",
          `[[3|Use (double) sum / arr.length.]] The error is that sum is an int and Java doesn't allow ints in a for loop.`,
          "Ints are allowed. The loop's limit, not the type of sum, is the main problem.",
        ],
      ],
    },
    {
      prompt:
        "A school proposes using a facial recognition system to unlock doors for students and staff. Write a short analysis: name two benefits, two harms or risks, which groups are affected differently, and two questions the school should ask before adopting it. End with a recommendation.",
      scheme: [
        "Names two benefits, such as speed and the lack of lost ID cards or security alerts",
        "Names two harms or risks, such as privacy, data breaches, bias or surveillance",
        "Identifies at least one group that is affected differently, such as students with higher error rates, students without consent or staff",
        "Asks two relevant questions and gives a reasoned recommendation",
      ],
      model:
        "Benefits: it is fast and removes lost ID cards, and it can alert staff to unauthorized visitors. Harms: students' faces are sensitive data that could be breached, and the system may be less accurate for some skin tones, creating bias. Students and families who cannot opt out are affected differently from staff who have chosen the job. The school should ask who owns the data and for how long they are kept, and whether there is an alternative. I would recommend not adopting it until accuracy is tested across groups and an opt-out is available.",
      answers: [
        [
          "full",
          `[[0|Benefits: it is fast and nobody loses an ID card, and it could alert staff to someone who isn't allowed in.]] [[1|Risks: students' faces are sensitive data that could be breached, and it could be less accurate for some skin tones, which is bias.]] [[2|Students who can't opt out are affected differently, and so are students the system misidentifies.]] [[3|The school should ask who owns the data and how long they're kept, and whether there's a non-facial option. I'd recommend waiting until it's tested for accuracy across groups and there's an opt-out.]]`,
          "Full marks. A balanced analysis with specific questions and a reasoned recommendation.",
        ],
        [
          "full",
          `[[0|It would speed up entry and reduce the cost of replacing cards.]] [[1|But face data could be stolen in a breach, and constant scanning feels like surveillance.]] [[2|Some groups, such as students with darker skin, may be misidentified more often, so they face more problems.]] [[3|Questions: What law and consent rules apply, and who decides? I'd recommend a pilot with parent consent, a free alternative like a card, and an independent accuracy test.]]`,
          "Full marks. Suggesting a pilot with consent and an alternative is a practical conclusion.",
        ],
        [
          "partial",
          `[[0|It's fast and secure.]] [[1|It might invade privacy.]] Everyone is affected the same way. I recommend using it.`,
          "Different groups are affected differently, for example through bias in accuracy. Support your recommendation with questions the school should ask.",
        ],
        [
          "partial",
          `[[1|There are risks of data breaches and bias.]] [[3|The school should ask who owns the data.]] The benefits are that students will like technology.`,
          "Name two specific benefits, such as speed or security, and say which groups are affected differently.",
          true,
        ],
        [
          "weak",
          `Technology is always good and it can never be harmful, so the school should install it.`,
          "Every innovation has benefits and harms. Analyze both for different groups.",
        ],
        [
          "weak",
          `[[2|Students would be affected.]] Facial recognition is evil and the school must never use it, with no questions to ask.`,
          "A strong analysis weighs benefits and harms and asks questions, rather than rejecting without reasons.",
        ],
      ],
    },
  ],
};

writeCourse(
  "ap-computer-science-a-grade-11.json",
  "AP Computer Science A",
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
