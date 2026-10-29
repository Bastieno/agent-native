import { writeCourse, type WeekInput } from "../../../sim/showcase/author.js";

/**
 * Introduction to Business, Grade 9, Quarter 1. Standards: National Business
 * Education Standards (business foundations, entrepreneurship, marketing,
 * management and ethics, finance and accounting), in the school's own words.
 * Examples are Ohio small businesses; every figure has been checked by hand.
 */

const w1: WeekInput = {
  topic: "Why businesses exist and how they are organized",
  note: `
## Objectives

Students will be able to:

1. explain how businesses meet needs and wants and why they exist;
2. compare sole proprietorships, partnerships and corporations;
3. describe the role of business in the economy, including jobs, taxes and innovation.

## Materials

Local business flyers or photos (a bakery, a hardware store, a regional chain), a comparison chart template, the problem set.

## Starter (6 minutes)

Ask: "Think of a business within a mile of the school. What need or want does it meet? Who works there? Who owns it?" List answers on the board.

## Main activity

1. Needs and wants: needs are things required to live (food, shelter, clothing); wants are things we would like. Businesses exist to meet them and to earn a profit for their owners.
2. Forms of ownership: a sole proprietorship has one owner who keeps all profit and is personally responsible for debts; a partnership has two or more owners who share profit and responsibility; a corporation is a separate legal entity owned by shareholders, whose liability is limited to what they invested.
3. Role in the economy: businesses provide jobs, pay taxes that fund schools and roads, and create innovations.

## Checking for understanding

Ask: "If a lawn-care business owned by one person is sued, who pays?"

## Problem set

Classify businesses and match them to ownership forms.
`,
  reading: [
    "What businesses are for, and who owns them",
    `
A **business** is an organization that provides goods or services in order to earn a profit. Businesses exist because people have **needs**, things required to live such as food, shelter and clothing, and **wants**, things that people would like but could live without, such as a new video game or concert tickets. A grocery store meets a need; a theater meets a want. Many products do both: a family needs transportation, but wants a particular kind of car. Owners take a risk, put in money and time, and hope to earn **profit**, the money left after all costs are paid.

Owners choose a legal **form of ownership**. In a **sole proprietorship**, one person owns and runs the business. It is easy and cheap to start, and the owner keeps all the profit and makes all the decisions. The drawback is **unlimited liability**: the owner is personally responsible for the business's debts, so if the business is sued or cannot pay a loan, the owner's savings and property could be at risk. A neighborhood lawn-care service run by one person is typically a sole proprietorship. In a **partnership**, two or more people share ownership, money, skills, work and profit. Partners can combine strengths, but they may disagree, and in a general partnership each partner can be responsible for the debts the other creates. A **corporation** is a separate legal entity that is owned by **shareholders** who buy stock. Its main advantage is **limited liability**: shareholders can lose what they invested, but not their personal property. A corporation can also raise a lot of money by selling shares and continues to exist if an owner leaves. The drawbacks are that it is more costly and complicated to set up, and a corporation's profits may be taxed, and then the shareholders are taxed again on dividends.

Businesses of all sizes matter to the wider economy. They provide **jobs**, and wages that workers spend at other businesses. They pay **taxes** that fund public services such as schools, roads and fire stations. They bring **innovation**, new products and better ways of working, as competing businesses try to serve customers better. When a new factory or store opens in a town, it can bring jobs and tax revenue, though it may also raise questions about traffic or competition for existing shops. Understanding these relationships helps us to see why communities care about the health of their local businesses.
`,
  ],
  cards: [
    ["Business", "An organization that provides goods or services to earn a profit."],
    ["Need", "Something required to live, such as food or shelter."],
    ["Want", "Something people would like but could live without."],
    ["Profit", "Money left after all costs are paid."],
    ["Sole proprietorship", "A business with one owner who keeps the profit and bears the risk."],
    ["Partnership", "A business owned by two or more people who share profit and responsibility."],
    ["Corporation", "A separate legal entity owned by shareholders."],
    ["Limited liability", "Owners can lose only what they invested, not personal property."],
  ],
  closed: [
    [
      "Which is a need rather than a want?",
      ["Concert tickets", "Basic food", "A designer jacket", "A video game"],
      "B",
    ],
    [
      "Which form of ownership has unlimited personal liability for one owner?",
      ["Sole proprietorship", "Corporation", "Shareholder group", "Public company"],
      "A",
    ],
    [
      "What is the main advantage of a corporation for its owners?",
      ["It is the cheapest to start", "Limited liability", "No taxes at all", "One person decides everything"],
      "B",
    ],
    [
      "Which is a way that businesses help the economy?",
      ["They provide jobs and pay taxes", "They remove competition", "They stop innovation", "They lower wages"],
      "A",
    ],
    [
      "Profit is:",
      ["All the money a business receives", "Money left after costs are paid", "The price of the product", "A loan from a bank"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "Two friends in Dayton want to open a bike repair shop. Compare a partnership with a sole proprietorship for them. Give one advantage and one disadvantage of a partnership, and explain why they might later consider forming a corporation.",
      scheme: [
        "States one valid advantage of a partnership, such as shared money, skills or work",
        "States one valid disadvantage, such as disagreements, shared profit or shared responsibility for debts",
        "Explains that a corporation offers limited liability so personal property is protected",
        "Links the choice to the shop's situation, such as growth or risk of being sued",
      ],
      model:
        "A partnership lets the friends share the money, skills and work, which a single owner would have to supply alone. The disadvantage is that they must share the profit and may disagree, and each may be responsible for debts the other creates. As the shop grows, they might form a corporation because limited liability would protect their homes and savings if the shop were sued or could not pay its debts.",
      answers: [
        [
          "full",
          "[[0|A partnership lets the two of them share the cost of tools, the work and their different skills.]] [[1|The disadvantage is that they split the profit and might disagree, and each could be responsible for debts the other makes.]] [[2|If the shop grows, a corporation would give them limited liability, so their savings and homes would be protected.]] [[3|That matters for a repair shop, since a customer could sue over a faulty brake repair.]]",
          "Full marks. The brake example links liability to this business.",
        ],
        [
          "full",
          "[[0|Advantage of a partnership: two people bring more money and skills than one, for example one fixes bikes and the other does the books.]] [[1|Disadvantage: profit is shared and arguments can slow decisions; partners may also be liable for each other's debts.]] [[2|A corporation would limit what they could lose to what they invested.]] [[3|They would do this when the shop gets bigger and the risk of debts or a lawsuit is larger.]]",
          "Full marks. Dividing the roles shows how skills combine.",
        ],
        [
          "partial",
          "[[0|A partnership lets them share work and money.]] [[2|A corporation protects personal property.]] There are no disadvantages because they are friends.",
          "Even friends can disagree, and they split the profit. Name a real disadvantage and link it to the shop.",
        ],
        [
          "partial",
          "[[1|They would have to share the profit.]] [[3|The shop could grow.]] A corporation is owned by one person who keeps everything.",
          "A corporation is owned by shareholders and offers limited liability. Explain that protection.",
          true,
        ],
        [
          "weak",
          "A partnership and a sole proprietorship are the same thing, so it doesn't matter which they choose.",
          "A sole proprietorship has one owner; a partnership has two or more. Compare them.",
        ],
        [
          "weak",
          "They should form a corporation because corporations never pay taxes.",
          "Corporations do pay taxes, and the main benefit is limited liability.",
        ],
      ],
    },
    {
      prompt:
        "A new distribution warehouse opens near Columbus and hires 200 workers. Explain three ways it affects the local economy, and one possible downside for the community.",
      scheme: [
        "Explains that it creates jobs and wages",
        "Explains that wages are spent at other local businesses",
        "Explains that the warehouse pays taxes that fund public services",
        "Names a plausible downside, such as traffic, noise or pressure on other businesses",
      ],
      model:
        "The warehouse creates 200 jobs, which pay wages. The workers spend those wages at local shops, restaurants and landlords, which supports other businesses. The warehouse also pays property and other taxes that help to fund schools and roads. A downside could be heavier truck traffic and noise on local streets.",
      answers: [
        [
          "full",
          "[[0|It creates 200 jobs, so 200 people have wages.]] [[1|Those workers spend money at nearby stores, restaurants and on rent, which helps other businesses.]] [[2|The warehouse pays taxes that help to pay for schools, roads and the fire department.]] [[3|The downside is more truck traffic and noise on local roads.]]",
          "Full marks. Three effects and a realistic downside.",
        ],
        [
          "full",
          "[[0|First, the jobs give families an income.]] [[1|Second, the workers' spending supports restaurants, shops and landlords nearby.]] [[2|Third, taxes from the warehouse fund public services.]] [[3|On the other hand, it might crowd the roads and draw workers away from smaller local employers.]]",
          "Full marks. Competition for workers is a thoughtful downside.",
        ],
        [
          "partial",
          "[[0|It creates jobs.]] [[2|It pays taxes.]] Nothing else happens, and there are no downsides.",
          "Think about where the wages go, and what can go wrong, such as traffic.",
        ],
        [
          "partial",
          "[[1|People spend their wages in town.]] [[3|There might be more traffic.]] The warehouse is paid by the government and creates no jobs.",
          "The warehouse hires 200 workers, so it does create jobs. Revise your first sentence.",
          true,
        ],
        [
          "weak",
          "A warehouse does not affect the town at all because it just stores boxes.",
          "Hiring workers and paying taxes affect the whole town. Explain those effects.",
        ],
        [
          "weak",
          "It is bad because new businesses always hurt a town.",
          "Businesses bring both benefits and costs. Name specific ones.",
        ],
      ],
    },
  ],
};

const w2: WeekInput = {
  topic: "Scarcity, supply and demand, and presenting an idea",
  note: `
## Objectives

Students will be able to:

1. explain scarcity, supply and demand as they apply to a small business;
2. present a business pitch to a panel and respond to questions.

## Materials

A lemonade-stand price simulation with cards, a pitch template, a timer, the worksheet.

## Starter (6 minutes)

Run a mini auction for one cookie. Then offer a second cookie to everyone. Ask: "Why did the price people were willing to pay change?"

## Main activity

1. Scarcity: resources are limited but wants are unlimited, so businesses and buyers must choose. Opportunity cost is the next best thing given up.
2. Demand: how much buyers want at each price; the quantity demanded rises as price falls. Supply: how much sellers offer; the quantity supplied rises as price rises. The equilibrium price is where they meet.
3. A bakery example: if flour prices rise, the cost of bread rises and supply falls; if a festival brings visitors, demand rises.
4. Pitch practice: a 90-second pitch with the problem, the solution, the customers and the ask, followed by two questions from a panel.

## Checking for understanding

Ask: "What happens to the price of umbrellas on a rainy day, and why?"

## Worksheet

Predict price changes and prepare a pitch.
`,
  reading: [
    "Choosing with limited resources, and finding the right price",
    `
Every business faces **scarcity**: resources such as money, time, workers and materials are limited, while people's wants are not. Because of scarcity, we must make choices, and each choice has an **opportunity cost**, the value of the next best thing we give up. If a student spends Saturday working at a car wash, the opportunity cost is the other thing that student could have done with that day. A bakery that uses its only oven to make cookies cannot at the same time use it for bread.

Prices in a market are set by **demand** and **supply**. Demand is how much of a product buyers are willing and able to buy at different prices. Usually, as the price **falls**, the quantity demanded **rises**, since more people think it is a good deal. Supply is how much sellers are willing to offer at different prices. As the price **rises**, the quantity supplied usually **rises**, because producing is more profitable. The **equilibrium price** is the price at which the quantity buyers want equals the quantity sellers offer. If a bakery prices a loaf too high, many loaves go unsold and the baker must lower the price. If the price is too low, the bread sells out fast, which signals that the baker could charge more.

Things other than price shift supply and demand. Suppose a street festival comes to a small Ohio town: demand for food rises, so a food truck can sell more at each price. If the price of flour rises, bakers' costs rise and some offer fewer loaves, so supply falls and the equilibrium price goes up. If a new competitor opens down the street, the bakery's customers may split, and its demand falls. A small business that watches these forces can plan inventory and prices better.

Good ideas also need to be explained to others. A **business pitch** is a short talk in which you persuade an audience, such as investors, a bank or a panel of judges. A strong pitch has four parts: the **problem** (who has it and why it matters), your **solution** (what you will sell), the **customers** (who will buy and why), and the **ask** (what you need, such as a loan of $2,000 to buy equipment). Keep it short, speak clearly, use a real example, and be ready for questions. Panelists often ask, "How do you know people will pay?" or "What if a competitor copies you?" A calm, honest answer based on evidence, such as a survey of 30 classmates, is more convincing than confidence alone.
`,
  ],
  cards: [
    ["Scarcity", "Limited resources set against unlimited wants."],
    ["Opportunity cost", "The value of the next best choice you give up."],
    ["Demand", "How much buyers want to buy at different prices."],
    ["Supply", "How much sellers offer at different prices."],
    ["Equilibrium price", "The price where the quantity demanded equals the quantity supplied."],
    ["Business pitch", "A short talk persuading an audience to support an idea."],
    ["The ask", "What you need from the audience, such as a loan."],
    ["Competitor", "Another business selling to the same customers."],
  ],
  closed: [
    [
      "What happens to the quantity demanded when the price falls, other things equal?",
      ["It rises", "It falls", "It stays the same", "It disappears"],
      "A",
    ],
    [
      "A street festival brings many visitors to a town. What happens to demand for food trucks?",
      ["It falls", "It rises", "It does not change", "Supply rises"],
      "B",
    ],
    [
      "What is an opportunity cost?",
      ["The price of a product", "The next best thing given up", "A kind of tax", "A bank fee"],
      "B",
    ],
    [
      "If flour becomes more expensive, bakeries are likely to:",
      ["Offer more loaves", "Offer fewer loaves at the old price", "Give bread away", "Stop paying taxes"],
      "B",
    ],
    [
      "Which part of a pitch states what you need from the audience?",
      ["The problem", "The solution", "The ask", "The customers"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "A bakery in Cincinnati sells 100 loaves a day at $4. A flood closes the main road to the bakery and the price of flour rises by 20 percent. Using the ideas of demand and supply, explain what is likely to happen to the quantity sold, to costs, and to the price, and what the owner could do.",
      scheme: [
        "Explains that the road closure reduces customers, so demand falls",
        "Explains that higher flour prices raise costs and reduce supply or profit",
        "Predicts a likely effect on price or quantity with a reason",
        "Suggests a reasonable action, such as delivery, a promotion or adjusting the price",
      ],
      model:
        "With the road closed, fewer customers can reach the bakery, so demand falls and fewer loaves are sold. A 20 percent rise in flour costs raises the cost of each loaf, which cuts profit and may reduce how many loaves the baker offers. The owner may have to raise the price a little to cover the costs, but with less demand a big rise could lose more customers. She could offer delivery or a discount for pickups.",
      answers: [
        [
          "full",
          "[[0|With the road closed, fewer customers can get there, so demand falls and she'll sell fewer than 100 loaves.]] [[1|Flour is 20 percent dearer, so each loaf costs more to make and her profit shrinks.]] [[2|She may need to raise the price a bit, but with fewer customers a big increase could lose even more of them.]] [[3|She could offer delivery or a pickup discount to keep customers.]]",
          "Full marks. You balanced the cost rise against falling demand.",
        ],
        [
          "full",
          "[[0|Demand drops because the flood blocks access to the shop.]] [[1|Costs go up because flour is more expensive, so supply is squeezed.]] [[2|Price might rise slightly, though the lower demand means the quantity sold will fall.]] [[3|She could sell through a delivery app or at a farmers' market while the road is closed.]]",
          "Full marks. Selling elsewhere is a creative response.",
        ],
        [
          "partial",
          "[[1|Flour costs more.]] [[3|She could deliver bread.]] The flood increases demand because everyone is hungry.",
          "A closed road reduces customers. Explain why demand falls, not rises.",
        ],
        [
          "partial",
          "[[0|Demand falls because fewer people can come.]] [[2|The price should go up.]] Costs go down because there is less to bake.",
          "The flour price rose, so costs go up. Revise the cost sentence.",
          true,
        ],
        [
          "weak",
          "Nothing will change, because bakeries always sell 100 loaves.",
          "Demand and costs both change here. Explain each effect.",
        ],
        [
          "weak",
          "She should close forever because the flood ends the business.",
          "A temporary problem has temporary responses, such as delivery. Suggest one.",
        ],
      ],
    },
    {
      prompt:
        "Write a 90-second pitch (about 120 words) for a business that sells reusable water bottles with a school logo. Include the problem, the solution, the customers and the ask, and write down one question a panelist might ask along with your answer.",
      scheme: [
        "States a clear problem, such as waste or students lacking bottles",
        "Describes the solution and the product",
        "Identifies the customers and why they would buy",
        "Includes a specific ask and a sensible question with an answer",
      ],
      model:
        "Every day our school throws away hundreds of plastic bottles, and many students have nothing to refill at the fountains. We will sell reusable steel bottles printed with the school logo. Our customers are the 900 students and their families, who already buy spirit wear. We are asking for a $1,500 loan to order the first 100 bottles. A panelist might ask, \"How do you know students will buy?\" We surveyed 40 students and 28 said they would pay $12.",
      answers: [
        [
          "full",
          "[[0|Our school throws away hundreds of plastic bottles every week, and many students forget to bring water.]] [[1|We will sell reusable steel bottles printed with the school logo.]] [[2|Our customers are the 900 students and their families, who already buy spirit wear.]] [[3|We ask for a $1,500 loan for the first 100 bottles. If asked how we know they will sell, we surveyed 40 students and 28 would pay $12.]]",
          "Full marks. A pitch with a figure and survey evidence.",
        ],
        [
          "full",
          "[[0|Plastic bottles pile up in our school and the fountains are barely used.]] [[1|Our product is a durable bottle with the school logo that students will want to carry.]] [[2|We will sell to students, parents and teachers, especially through sports teams.]] [[3|We need $1,200 to start. A panelist might ask about price; we would answer that $14 covers our cost of $9 with profit.]]",
          "Full marks. The price answer shows you understand profit.",
        ],
        [
          "partial",
          "[[1|We will sell reusable bottles.]] [[2|Students will buy them.]] There is no problem to solve. We do not need any money.",
          "A good pitch states the problem and a specific ask. Add both.",
        ],
        [
          "partial",
          "[[0|There is a lot of plastic waste.]] [[3|We need $1,500, and a panelist may ask how we know students will buy.]] The product is a type of shoe.",
          "Describe the bottle as the solution and who will buy it.",
          true,
        ],
        [
          "weak",
          "Buy our bottles. They are the best. Everyone should buy them now.",
          "A pitch needs a problem, a solution, customers and an ask, not only enthusiasm.",
        ],
        [
          "weak",
          "I do not know what a panelist would ask, so I will not answer any questions.",
          "Preparing for questions is part of a pitch. Write one and answer it.",
        ],
      ],
    },
  ],
};

const w3: WeekInput = {
  topic: "Careers in business and the entrepreneur's toolkit",
  note: `
## Objectives

Students will be able to:

1. research a career in business and describe the education it requires;
2. describe the traits and skills of successful entrepreneurs.

## Materials

Career-profile handouts (accountant, marketing manager, small business owner, human resources specialist), a laptop for each pair, the worksheet.

## Starter (6 minutes)

Ask: "Name a job that exists in every business, no matter what it sells." Collect: someone who handles money, someone who finds customers, someone who manages people.

## Main activity

1. Career clusters in business: finance and accounting, marketing and sales, management, human resources, entrepreneurship, administration.
2. Research a career: tasks, typical education (certificate, associate's degree, bachelor's degree, certification such as CPA), skills, and how the job might change with technology.
3. Entrepreneur traits: creativity, persistence, risk tolerance (not recklessness), self-motivation, willingness to learn from failure. Skills: communication, money management, selling, planning.
4. A short self-assessment: which traits do I have and which will I build?

## Checking for understanding

Ask: "Is taking a risk the same as being careless? Give an example."

## Worksheet

A career profile and a trait self-assessment.
`,
  reading: [
    "Jobs in business, and what it takes to start one",
    `
Almost every business, from a three-person bakery to a national chain, needs people to do several kinds of work. **Finance and accounting** workers keep records, pay bills, prepare taxes and help owners to understand their money. **Marketing and sales** workers find customers and persuade them to buy. **Management** workers plan the work and lead teams. **Human resources** specialists hire, train and support employees. **Administrative** workers keep an office running. **Entrepreneurs** start their own businesses, and take on all of these roles at first.

Each career has different **education and training** requirements. A bookkeeper may need a high school diploma and a short certificate course, along with skill in spreadsheet software. An accountant usually needs a four-year bachelor's degree, and may earn a **certification** such as Certified Public Accountant (CPA), which requires passing a national exam. A marketing manager often has a bachelor's degree and experience. A human resources specialist may have a bachelor's degree in business or psychology. Some paths begin with a two-year associate's degree at a community college, such as those in Ohio, and continue with a bachelor's degree later. To research a career, look for the tasks people do each day, the education required, the skills that matter, the typical pay range, and how the job may change as technology, such as automation and artificial intelligence, grows. Sources include the U.S. Bureau of Labor Statistics' Occupational Outlook Handbook, an interview with a worker, or a visit to a company.

What makes a good **entrepreneur**? Research and experience suggest several traits. **Creativity** helps to see problems that others miss. **Persistence** keeps an owner going after a setback; many successful businesses failed once before. **Self-motivation** matters because no boss is there to assign work. Entrepreneurs also need **calculated risk-taking**: willingness to take a chance only after weighing the odds and planning for a loss, which is different from being careless. **Adaptability** lets owners change course when customers' needs change. In addition to traits, entrepreneurs need skills they can learn: **communication**, **selling**, **managing money** and **planning**. Nobody has every trait at the start. A useful exercise is to rate yourself honestly and choose two to build, for example, by joining a club, practicing a presentation, or keeping a budget for a month.
`,
  ],
  cards: [
    ["Entrepreneur", "A person who starts and runs a business and takes the risk."],
    ["Certification", "A credential earned by passing an exam, such as CPA."],
    ["Associate's degree", "A two-year college degree."],
    ["Persistence", "Continuing to work after setbacks."],
    ["Calculated risk", "A chance taken after weighing the odds and planning."],
    ["Human resources", "The part of a business that hires, trains and supports staff."],
    ["Adaptability", "Willingness to change plans when circumstances change."],
    ["Occupational Outlook Handbook", "A federal guide to careers, pay and training."],
  ],
  closed: [
    [
      "Which worker keeps records and prepares tax information for a business?",
      ["Accountant", "Human resources specialist", "Delivery driver", "Receptionist"],
      "A",
    ],
    [
      "What does a CPA certification require?",
      ["Passing a national exam", "Owning a business", "A high school diploma only", "Ten years of retail work"],
      "A",
    ],
    [
      "A calculated risk is:",
      ["Doing something without thinking", "A chance taken after weighing the odds and planning for a loss", "Avoiding every chance", "Copying someone else"],
      "B",
    ],
    [
      "Which source gives federal information about careers, pay and training?",
      ["A rumor", "The Occupational Outlook Handbook", "A social media post", "A product label"],
      "B",
    ],
    [
      "Which trait helps an entrepreneur continue after a business fails once?",
      ["Persistence", "Carelessness", "Impatience", "Secrecy"],
      "A",
    ],
  ],
  open: [
    {
      prompt:
        "Choose one business career (such as accountant, marketing manager, human resources specialist or bookkeeper). Describe what a person in that job does, the education or training usually needed, two skills that matter, and one way technology may change the job.",
      scheme: [
        "Describes accurately what a person in the chosen job does",
        "States a realistic education or training path",
        "Names two relevant skills",
        "Gives a reasonable way technology may change the job",
      ],
      model:
        "An accountant keeps financial records, prepares reports and taxes, and advises owners about their money. Most accountants earn a four-year bachelor's degree, and many take the CPA exam. Important skills are attention to detail and strong spreadsheet and math skills. Software is automating routine bookkeeping, so accountants may spend more time on advice and analysis.",
      answers: [
        [
          "full",
          "[[0|An accountant keeps a business's financial records, prepares tax forms and reports, and advises the owner about money.]] [[1|Most have a four-year bachelor's degree in accounting and many pass the CPA exam.]] [[2|They need attention to detail and good spreadsheet and math skills.]] [[3|Software now handles routine bookkeeping, so accountants will spend more time on analysis and advice.]]",
          "Full marks. The profile is accurate and complete.",
        ],
        [
          "full",
          "[[0|A human resources specialist recruits, interviews and trains employees and handles questions about pay and benefits.]] [[1|They usually have a bachelor's degree in business or psychology, and some earn an HR certification.]] [[2|Communication and fairness matter, since they deal with people's problems.]] [[3|Online hiring tools and software that screens resumes are changing how they find candidates.]]",
          "Full marks. Mentioning resume screening shows research.",
        ],
        [
          "partial",
          "[[0|A marketing manager works on advertising.]] [[2|Creativity and communication matter.]] No education is required, and technology will never change the job.",
          "Most marketing managers have a degree, and technology changes advertising a lot. Revise those two points.",
        ],
        [
          "partial",
          "[[1|An accountant usually has a bachelor's degree.]] [[3|Software is automating bookkeeping.]] Accountants spend all day playing games.",
          "Describe the real tasks an accountant does: records, reports and taxes.",
          true,
        ],
        [
          "weak",
          "Business jobs are all the same, so I do not need to choose one.",
          "Business jobs differ a lot in tasks and training. Choose one and describe it.",
        ],
        [
          "weak",
          "A bookkeeper needs a doctorate and writes computer games.",
          "Bookkeepers often need a diploma or certificate and keep financial records.",
        ],
      ],
    },
    {
      prompt:
        "Choose two traits of successful entrepreneurs and explain why each matters. Then rate yourself honestly on both, and describe one concrete step you could take this semester to build the one you rated lower.",
      scheme: [
        "Names a first trait and explains why it matters",
        "Names a second trait and explains why it matters",
        "Gives an honest self-rating with a reason or example",
        "Describes a specific, realistic step to build the weaker trait",
      ],
      model:
        "Persistence matters because most new businesses face setbacks, and an owner who quits too soon never finds out if the idea works. Calculated risk-taking matters because owners must invest without a guarantee, but they should plan for a loss. I am persistent, as I kept practicing trumpet through a year of mistakes, but I rate myself lower on risk-taking, since I avoid new things. This semester I will run for a student council position to practice taking a planned chance.",
      answers: [
        [
          "full",
          "[[0|Persistence matters because new businesses face setbacks, and an owner who quits too soon never learns if the idea works.]] [[1|Calculated risk-taking matters because owners invest with no guarantee, so they need to weigh the odds and plan for a loss.]] [[2|I'm persistent; I practiced trumpet for a year through many mistakes, but I rate myself lower on risk-taking because I avoid new things.]] [[3|This semester I'll run for student council to practice taking a planned chance.]]",
          "Full marks. An honest rating and a concrete step.",
        ],
        [
          "full",
          "[[0|Creativity matters because entrepreneurs have to find problems other people miss.]] [[1|Self-motivation matters because nobody tells an owner what to do each day.]] [[2|I'm creative, but I only give myself a 2 out of 5 on self-motivation because I often wait for deadlines.]] [[3|My step is to set a weekly schedule for my homework and ask a friend to check it every Friday.]]",
          "Full marks. A weekly check with a friend is specific and realistic.",
        ],
        [
          "partial",
          "[[0|Persistence is important.]] [[1|Creativity is important.]] I am perfect at both. I do not need to improve.",
          "Rate yourself honestly and choose a step to build the weaker trait.",
        ],
        [
          "partial",
          "[[2|I am low on self-motivation.]] [[3|I will do better.]] Traits do not matter if you have money.",
          "Traits matter for every owner. Explain why and make the step specific.",
          true,
        ],
        [
          "weak",
          "Entrepreneurs are born, not made, so nobody can build these traits.",
          "Many traits and skills can be practiced and developed. Choose a step.",
        ],
        [
          "weak",
          "Risk means doing anything without thinking, and every entrepreneur should be reckless.",
          "Entrepreneurs take calculated risks after weighing the odds.",
        ],
      ],
    },
  ],
};

const w4: WeekInput = {
  topic: "From a customer's problem to a one-page business plan",
  note: `
## Objectives

Students will be able to:

1. identify a problem a customer has and propose a business idea to solve it;
2. write a one-page business plan that includes a mission, customers and a budget.

## Materials

A one-page plan template, sample plans (a dog-walking service, a tutoring business), calculators, the worksheet.

## Starter (6 minutes)

Ask: "What is something that annoys you or your family that someone could be paid to fix?" Collect problems: late buses, messy garages, forgotten homework, too-small clothing sizes.

## Main activity

1. Start with the customer: who has the problem, how often, what do they do now, and would they pay to solve it?
2. Idea check: is it something people want, can I make it, can I make money?
3. The one-page plan: mission statement (one sentence on what the business does and for whom); the customers; the product and price; start-up costs and a budget; a simple goal for the first month.
4. Budget: start-up costs against available money. Example: a dog-walking business needs leashes and bags ($25), flyers ($15), and a phone plan share ($0 because it is already owned), a total of $40.

## Checking for understanding

Ask: "Why is 'everyone' a weak answer to 'who are your customers?'"

## Worksheet

Write a one-page plan.
`,
  reading: [
    "Starting with someone who has a problem",
    `
The best businesses start with a person who has a problem. Before choosing a product, think about **who** the customer is, **what** frustrates them, **how often** it happens, and **what they do now** to deal with it. An elderly neighbor may not be able to shovel snow, and she pays a neighbor teenager $20 each time. A busy family wants help walking their dog on weekdays. A younger student needs help with reading. Each of these is a problem that people might pay to solve. A good idea passes three tests: people **want** it, you **can** deliver it, and you can **make money** from it.

Once you have an idea, write a **business plan**. A professional plan can run to dozens of pages, but a **one-page plan** is a useful start. It has four main parts.

The **mission statement** is one sentence that says what the business does, and for whom. Example: "We walk dogs for busy families in Westerville so that pets get exercise while owners are at work."

The **customers** section describes a specific group. "Everyone" is a weak answer, because no business can serve everyone and your marketing will have no focus. "Families in our neighborhood with dogs and adults who work away from home" is specific, and you can figure out where to find them. You could ask how many such families live within a mile.

The **product and price** section says exactly what you sell and what it costs. Check whether the price covers your costs and leaves a profit. A 30-minute walk for $10 might seem fair; if you do four a day, five days a week, that is $200 a week.

The **budget** lists the **start-up costs**, the money you need before you earn your first dollar, and the sources of that money. A dog-walker may need leashes and waste bags ($25) and flyers ($15), for $40 in total. If you have $50 in savings, you can fund the start-up yourself. If the costs were $400, you would need a loan or an investor. A short goal ("get five regular customers in the first month") lets you check whether the plan is working.

A plan is not a promise. It is a tool to think clearly, and it should be updated as you learn what customers really want.
`,
  ],
  cards: [
    ["Mission statement", "One sentence saying what a business does and for whom."],
    ["Target customer", "The specific group a business aims to serve."],
    ["Start-up costs", "Money needed before the business earns its first dollar."],
    ["Budget", "A plan for how money will be received and spent."],
    ["Business plan", "A document describing a business idea and how it will work."],
    ["Goal", "A measurable result to reach, such as five customers in a month."],
    ["Price", "The amount a customer pays for a product or service."],
    ["Investor", "A person who supplies money for a share of the business."],
  ],
  closed: [
    [
      "Which is the best description of a target customer?",
      ["Everyone", "Families near us with dogs and adults who work away from home", "Anyone with money", "People who like us"],
      "B",
    ],
    [
      "A dog walker spends $25 on leashes and bags and $15 on flyers. What are the start-up costs?",
      ["$25", "$15", "$40", "$50"],
      "C",
    ],
    [
      "What does a mission statement do?",
      ["Lists all the costs", "Says what the business does and for whom", "Sets the price of one item", "Names the investors"],
      "B",
    ],
    [
      "Which test shows that an idea may make money?",
      ["People want it, you can deliver it, and it earns a profit", "It is popular on social media", "It is easy to explain", "It has a catchy name"],
      "A",
    ],
    [
      "A dog walker charges $10 for a 30-minute walk and does 4 walks a day, 5 days a week. What is the weekly revenue?",
      ["$40", "$100", "$200", "$400"],
      "C",
    ],
  ],
  open: [
    {
      prompt:
        "Write a one-page plan summary for a tutoring business run by a ninth grader for fifth graders. Include a mission statement, a specific description of the customers, the price, and a start-up budget with at least three items and a total. Then state one goal for the first month.",
      scheme: [
        "Writes a one-sentence mission that says what and for whom",
        "Describes specific customers rather than everyone",
        "States a price and lists at least three start-up items with a correct total",
        "States a measurable first-month goal",
      ],
      model:
        "Mission: We help fifth graders in our neighborhood to improve their reading and math so that they feel confident in school. Customers: parents of fifth graders at the elementary school nearby who want help after school. Price: $12 for a 45-minute session. Start-up budget: flashcards and workbooks $18, flyers $12, a folder system $5, for a total of $35. Goal: sign up four regular students in the first month.",
      answers: [
        [
          "full",
          "[[0|Mission: We help fifth graders in our neighborhood to improve their reading and math so that they feel confident in school.]] [[1|Customers: parents of fifth graders at Maple Elementary who want help after school.]] [[2|Price is $12 for a 45-minute session. Start-up: workbooks $18, flyers $12, folders $5, for a total of $35.]] [[3|Goal: four regular students in the first month.]]",
          "Full marks. The total is correct and the goal is measurable.",
        ],
        [
          "full",
          "[[0|Our mission is to give fifth graders in our apartment complex friendly math help so that they catch up.]] [[1|The customers are parents in the complex who work late and can't help with homework.]] [[2|We charge $10 per session. Costs: printing $10, a whiteboard $15, pencils $5, which makes $30.]] [[3|Our goal is six sessions in the first month.]]",
          "Full marks. Reaching parents in one complex is specific.",
        ],
        [
          "partial",
          "[[0|We help students.]] [[2|Price $12, costs $20 for workbooks and $10 for flyers, for a total of $30.]] My customers are everybody.",
          "Describe specific customers and say what you do and for whom in the mission.",
        ],
        [
          "partial",
          "[[1|Customers are parents of fifth graders nearby.]] [[3|My goal is to get a lot of money.]] The price is free and the start-up costs are zero.",
          "A goal should be measurable, and a price should cover costs. Revise both.",
          true,
        ],
        [
          "weak",
          "I will just tutor whoever shows up. I don't need a plan.",
          "A plan helps you decide on customers, price and costs before you start.",
        ],
        [
          "weak",
          "Mission: Make a million dollars. Customers: the whole world.",
          "A mission says what you do and for whom, and customers should be specific.",
        ],
      ],
    },
    {
      prompt:
        "Evaluate this idea: a student plans to sell homemade candles at $8 each. Materials cost $3 per candle, and start-up equipment costs $60. Calculate the profit per candle, and how many candles must be sold to pay back the equipment. Then say whether you think the idea is worth trying and why.",
      scheme: [
        "Calculates the profit per candle as $5",
        "Calculates 12 candles to pay back $60",
        "Gives a reasoned judgment on whether the idea is worth trying",
        "Names a consideration such as demand, time or competition",
      ],
      model:
        "The profit on each candle is $8 minus $3, which is $5. To pay back $60 of equipment, the student must sell $60 divided by $5, which is 12 candles. The idea seems worth trying if the student can find 12 buyers, since that is a modest number, but the student should check demand and the time needed to make each candle.",
      answers: [
        [
          "full",
          "[[0|Profit per candle is $8 - $3 = $5.]] [[1|To pay back $60, the student must sell 60 ÷ 5 = 12 candles.]] [[2|I think it's worth trying, because 12 candles is a modest number to sell.]] [[3|But the student should check demand first, for example by asking friends and family, and think about how long each candle takes to make.]]",
          "Full marks. Both calculations are right and the caution is sensible.",
        ],
        [
          "full",
          "[[0|Each candle makes $5 profit after the $3 materials.]] [[1|It takes 12 candles to cover the $60 equipment, because 12 × 5 = 60.]] [[2|It's worth a try because after the 12th candle all the money is profit.]] [[3|The risk is that there are already many candle sellers, so the student should find out how they would stand out.]]",
          "Full marks. Considering competition is a good business instinct.",
        ],
        [
          "partial",
          "[[0|Profit is $5 per candle.]] [[2|It is worth trying.]] It would take 60 candles to cover the equipment, since the price is $8.",
          "Divide the $60 equipment cost by the $5 profit per candle, which gives 12 candles, not 60.",
        ],
        [
          "partial",
          "[[1|It takes 12 candles.]] [[3|Check demand first.]] The profit per candle is $11 because $8 plus $3.",
          "Profit is the price minus the cost: $8 minus $3 is $5.",
          true,
        ],
        [
          "weak",
          "Profit is $8 per candle because that is the price, and the equipment is free.",
          "Subtract the $3 materials to find profit, and count the $60 equipment.",
        ],
        [
          "weak",
          "It cannot work because candles are cheap. Nobody ever makes money selling anything.",
          "Work out the numbers first. Profit of $5 each can pay back the equipment.",
        ],
      ],
    },
  ],
};

const w5: WeekInput = {
  topic: "The four Ps, surveys and advertising",
  note: `
## Objectives

Students will be able to:

1. explain the four Ps of marketing: product, price, place and promotion;
2. conduct a short survey of potential customers and summarize the results;
3. design an advertisement and explain how it appeals to a target audience.

## Materials

Real product packaging (a school cafeteria snack, a local brand), a survey template, tally sheets, poster paper, the quiz.

## Starter (6 minutes)

Hold up a snack. Ask: "What decisions did the company make before this reached your hand?" List: what it is, how much it costs, where it is sold, how you heard about it.

## Main activity

1. The four Ps: product (what is sold and its features), price (what the customer pays), place (where and how it is sold), promotion (how customers learn about it).
2. Market research: a survey with clear questions (not leading), a sample, tally and percentages. Example: 40 classmates asked about a new smoothie: 28 would buy at $4. 28 out of 40 is 70 percent.
3. Target audience and advertising: the message, the image and the medium (social media, posters, local radio). Appeals: price, quality, convenience, belonging. Truth in advertising.
4. Design a poster for a smoothie stand.

## Quiz

The four Ps and survey results.
`,
  reading: [
    "Getting the right product to the right people",
    `
**Marketing** is everything a business does to understand its customers and to bring them a product they want. Marketers often use the **four Ps**, a framework for decisions.

**Product** is what you sell: its features, quality, design and packaging. A smoothie stand might sell three fruit blends in recyclable cups. **Price** is what customers pay. It must cover costs and give a profit, but also feel fair compared with competitors. If a smoothie costs $2 to make and sells for $4, the profit is $2. **Place** is where and how customers can buy: a stand at the school, a store, a website, or a delivery service. It should be convenient for the target customers. **Promotion** is how you tell them about the product: posters, social media, flyers, free samples, word of mouth. The four Ps work together; a great product in an inconvenient place, or a fair price with no promotion, will struggle.

To decide on the four Ps, businesses do **market research**. A short **survey** asks potential customers what they think. Good survey questions are clear and **not leading**. "Would you buy a smoothie at school for $4?" is fair, while "Wouldn't you agree that our amazing smoothies are a great deal?" pushes people toward a yes. A good survey also asks a **sample** that resembles the target customers; asking only your best friends gives a biased result. After the survey, **tally** the answers and turn them into percentages. If 40 classmates answer and 28 say they would buy at $4, then 28 out of 40 is 70 percent. You can also ask what flavors they prefer and how much they would pay. The results guide decisions, but a survey only shows what people say they would do, which may differ from what they actually do.

An **advertisement** tries to persuade the **target audience**. Think about who they are and where they spend time: a teen audience may see social media, while parents may see flyers at the school. A good ad has a clear **message** (the one thing to remember), an attention-grabbing **image** and a **call to action** ("Try one at lunch Friday"). Ads use **appeals** such as low price, quality, convenience, health or belonging to a group. Advertising must be **truthful**: claims that cannot be proven, such as "the healthiest drink in Ohio," can mislead customers and may break the law. Honest ads build trust, and trust brings repeat customers.
`,
  ],
  cards: [
    ["Marketing", "Understanding customers and bringing them a product they want."],
    ["Four Ps", "Product, price, place and promotion."],
    ["Market research", "Gathering information about customers and competitors."],
    ["Leading question", "A survey question that pushes toward a particular answer."],
    ["Sample", "The group of people actually surveyed."],
    ["Target audience", "The group an advertisement is aimed at."],
    ["Call to action", "A request telling the audience what to do next."],
    ["Truth in advertising", "The rule that ad claims must not mislead."],
  ],
  closed: [
    [
      "Which of the four Ps is about where a product is sold?",
      ["Product", "Price", "Place", "Promotion"],
      "C",
    ],
    [
      "Which survey question is leading?",
      ["Would you buy a smoothie for $4?", "Wouldn't you agree our amazing smoothies are a great deal?", "Which flavor do you prefer?", "How often do you buy a drink at lunch?"],
      "B",
    ],
    [
      "In a survey of 40 students, 28 would buy. What percentage is that?",
      ["28 percent", "60 percent", "70 percent", "80 percent"],
      "C",
    ],
    [
      "A smoothie costs $2 to make and sells for $4. What is the profit per smoothie?",
      ["$1", "$2", "$4", "$6"],
      "B",
    ],
    [
      "Which is a call to action?",
      ["Our smoothies are great", "Try one at lunch Friday", "Made with fruit", "Since 2026"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A student surveys 50 classmates about a new smoothie stand. 35 say they would buy a smoothie at $4, 10 say they would buy at $3 but not $4, and 5 would not buy at any price. Calculate what percentage would buy at $4 and what percentage would buy at $3 or higher. Then say what price you would choose and give one reason to be cautious about the results.",
      scheme: [
        "Calculates 70 percent for those who would buy at $4",
        "Calculates 90 percent who would buy at $3 or more",
        "Chooses a price with a justification linked to the figures",
        "Gives a valid caution, such as people saying they would buy but not actually buying, or the sample being only classmates",
      ],
      model:
        "35 out of 50 is 70 percent who would buy at $4. 35 plus 10 is 45 out of 50, which is 90 percent who would buy at $3 or higher. I would choose $4 if the profit at $3 is too small, since 70 percent is a large group, but I would choose $3 if volume matters more. A caution is that people may say they would buy but then not do so, and classmates may not represent all customers.",
      answers: [
        [
          "full",
          "[[0|35 ÷ 50 = 70 percent would buy at $4.]] [[1|35 + 10 = 45, and 45 ÷ 50 = 90 percent would buy at $3 or more.]] [[2|I'd choose $4, since 70 percent is a lot of buyers and the extra dollar adds to profit on each smoothie.]] [[3|But I'd be cautious because what people say in a survey isn't always what they do, and classmates may not represent all customers.]]",
          "Full marks. Both percentages are right and the caution is valid.",
        ],
        [
          "full",
          "[[0|70 percent said yes at $4.]] [[1|90 percent would pay $3 or more, since 45 of 50 said so.]] [[2|I would pick $3 at first to get more customers, then try raising it later.]] [[3|The survey is only classmates, and people often say they will buy things they never do.]]",
          "Full marks. Starting lower and testing a rise is a reasonable plan.",
        ],
        [
          "partial",
          "[[0|35 out of 50 is 70 percent.]] [[2|I would choose $4.]] At $3 or higher it is 10 percent, since only 10 said $3. The survey is perfect.",
          "At $3 or higher includes the 35 who would pay $4, so it is 45 out of 50, which is 90 percent.",
        ],
        [
          "partial",
          "[[1|45 out of 50 is 90 percent.]] [[3|People may not buy.]] At $4, 35 percent would buy because 35 is the number.",
          "Divide by the total of 50: 35 out of 50 is 70 percent, not 35 percent.",
          true,
        ],
        [
          "weak",
          "The percentages are 35 and 10. I would choose $10 because that is a nice number.",
          "Percentages are out of 100. Divide each count by 50 and multiply by 100.",
        ],
        [
          "weak",
          "A survey is always right, so there is nothing to be careful about.",
          "Surveys show what people say, and the sample may be biased. Give a caution.",
        ],
      ],
    },
    {
      prompt:
        "Design a poster advertisement (describe it in words) for a smoothie stand at a high school. Identify the target audience, the message, the image, the call to action and one appeal it uses. Explain one way that you would keep the ad truthful.",
      scheme: [
        "Identifies the target audience and a medium that suits it",
        "States a clear message and describes the image",
        "Includes a call to action and names an appeal such as price, health or convenience",
        "Explains how the ad stays truthful, such as only claiming what can be shown",
      ],
      model:
        "The target audience is students at lunch, so a poster by the cafeteria suits it. The message is fresh fruit smoothies for $4 between classes, and the image is a bright photo of a strawberry-banana smoothie with a student drinking it. The call to action is \"Try one at lunch Friday.\" The appeal is convenience and taste. To keep it truthful, I would say only that they are made with real fruit, which I can show, and not claim they are the healthiest drink in Ohio.",
      answers: [
        [
          "full",
          "[[0|The audience is students at lunch, so I'd put the poster by the cafeteria doors.]] [[1|The message is: fresh fruit smoothies for $4. The image is a bright photo of a strawberry-banana smoothie.]] [[2|It says 'Try one at lunch Friday' as the call to action, and it appeals to convenience and taste.]] [[3|To keep it truthful I'd only say 'made with real fruit,' which I can show, and not 'healthiest in Ohio.']]",
          "Full marks. The poster is specific and its claims can be backed up.",
        ],
        [
          "full",
          "[[0|My target audience is athletes who want a quick snack, so I'd also post it on the team's group chat.]] [[1|The message is 'Fuel up in five minutes' with a picture of a runner holding a smoothie.]] [[2|The call to action is 'Stop by after practice,' using the appeals of convenience and health.]] [[3|I'd list the real ingredients, so that nothing misleads anyone.]]",
          "Full marks. Choosing a medium that suits the audience is smart.",
        ],
        [
          "partial",
          "[[1|The image is a smoothie and the message is that they are good.]] [[2|Try one today.]] The audience is everybody and the ad can say whatever sells.",
          "Name a specific audience and keep the ad truthful. Claims you cannot prove can mislead.",
        ],
        [
          "partial",
          "[[0|The audience is students.]] [[3|Only claim what is true.]] There is no message or call to action.",
          "State the one message to remember and what you want people to do.",
          true,
        ],
        [
          "weak",
          "I'd write the ad in tiny letters so that it is not annoying.",
          "An ad should catch attention and be easy to read.",
        ],
        [
          "weak",
          "Best smoothie in the world! Cures everything! Everyone must buy!",
          "These claims can't be proven. A truthful ad builds trust.",
        ],
      ],
    },
  ],
};

const w6: WeekInput = {
  topic: "How managers lead, and how businesses behave ethically",
  note: `
## Objectives

Students will be able to:

1. describe the functions of management: planning, organizing, leading and controlling;
2. explain business ethics and give examples of ethical and unethical choices.

## Materials

A scenario set (a restaurant manager, a bakery owner), ethics case cards, the problem set.

## Starter (6 minutes)

Ask: "If a restaurant manager got sick for a week, what jobs would not get done?" List: schedules, orders, training, checking quality.

## Main activity

1. Four functions of management: planning (setting goals and deciding how to reach them), organizing (arranging people and resources), leading (guiding and motivating employees), controlling (checking results against goals and correcting).
2. Example: a pizza restaurant. Plan: sell 200 pizzas on Friday. Organize: schedule five cooks and two drivers. Lead: brief the team and encourage them. Control: compare sales and wait times with the goal; adjust.
3. Ethics: principles of right and wrong. Honesty with customers, fair treatment of workers, safe products, honest records, environmental care. Unethical choices: hiding a product flaw, false advertising, discrimination, falsifying records.
4. Ethics test: Is it legal? Is it fair? Would I be comfortable if everyone knew?

## Checking for understanding

Ask: "Can a choice be legal but unethical? Give an example."

## Problem set

Sort tasks by management function and judge cases.
`,
  reading: [
    "Running a team, and doing the right thing",
    `
Every business, from a pizza shop to a hospital, needs **managers**: people who direct the work of others so that goals are met. Management is often described as four connected functions.

**Planning** means setting goals and deciding how to reach them. A pizza restaurant's manager might set a goal to sell 200 pizzas on Friday, the busiest night, and decide how much dough and cheese to order. **Organizing** means arranging people, tools and money to carry out the plan: scheduling five cooks and two delivery drivers, and assigning each a job. **Leading** means guiding and motivating employees: explaining the goal, giving clear instructions, encouraging the team, and settling disagreements. **Controlling** means checking results against the goal and correcting problems. If the manager notices that delivery times average 50 minutes instead of the 30-minute target, she might add a driver or change the route. The functions form a cycle: the results of controlling inform the next plan.

Managers also face questions of **ethics**, the principles of right and wrong that guide behavior. Many ethical choices in business concern honesty and fairness. **Ethical** choices include telling customers the truth about a product, paying workers fairly, keeping safe working conditions, keeping honest financial records and protecting the environment. **Unethical** choices include hiding a known safety problem, advertising false claims, treating employees unfairly because of who they are, or falsifying records to hide losses. Some unethical acts are also illegal, but not all: a company could legally dump a product that it knows is poor quality on customers who cannot easily compare, and it would still be unfair.

How can you decide? A simple test asks three questions. Is it **legal**? Is it **fair** to everyone affected? Would I be comfortable if everyone **knew** what I did? If the answer to any is no, think again. Ethics matter for practical reasons too: customers return to businesses they trust, good employees stay with fair employers, and scandals can destroy a business quickly. A bakery that is found to be selling old bread as fresh may lose its customers for good. Ethical businesses do not just avoid punishment; they build a reputation that lasts.
`,
  ],
  cards: [
    ["Planning", "Setting goals and deciding how to reach them."],
    ["Organizing", "Arranging people and resources to carry out a plan."],
    ["Leading", "Guiding and motivating employees."],
    ["Controlling", "Checking results against goals and correcting problems."],
    ["Ethics", "Principles of right and wrong that guide behavior."],
    ["Falsify", "To change records to hide the truth."],
    ["Reputation", "What customers and the public think of a business."],
    ["Fairness", "Treating all those affected honestly and equally."],
  ],
  closed: [
    [
      "A manager schedules five cooks and two drivers for Friday night. Which function is this?",
      ["Planning", "Organizing", "Leading", "Controlling"],
      "B",
    ],
    [
      "A manager compares delivery times with the 30-minute target and adds a driver. Which function is this?",
      ["Planning", "Organizing", "Leading", "Controlling"],
      "D",
    ],
    [
      "Which action is unethical?",
      ["Telling customers the truth about a product", "Hiding a known safety problem", "Paying workers fairly", "Keeping honest records"],
      "B",
    ],
    [
      "Which question is part of a simple ethics test?",
      ["Is it cheap?", "Would I be comfortable if everyone knew?", "Is it popular?", "Is it fast?"],
      "B",
    ],
    [
      "Can a choice be legal but unethical?",
      ["No, never", "Yes, some legal choices are still unfair", "Only if it is cheap", "Only for big companies"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A manager at a pizza restaurant sets a goal of 200 pizzas on Friday. Give one example of each of the four management functions that she might do that day, using the pizza restaurant context.",
      scheme: [
        "Gives a specific planning example, such as setting the goal or ordering dough",
        "Gives an organizing example, such as scheduling staff or assigning tasks",
        "Gives a leading example, such as briefing and encouraging the team",
        "Gives a controlling example, such as checking times against the target and adjusting",
      ],
      model:
        "Planning: she sets the goal of 200 pizzas and orders enough dough and cheese. Organizing: she schedules five cooks and two drivers and assigns each a station. Leading: she briefs the team before the rush and encourages them when it gets busy. Controlling: she checks that delivery times are within 30 minutes, and adds a driver if they are slow.",
      answers: [
        [
          "full",
          "[[0|Planning: she sets the goal of 200 pizzas and orders enough dough and cheese for it.]] [[1|Organizing: she schedules five cooks and two drivers and gives each a station.]] [[2|Leading: she briefs the team before the rush and keeps their spirits up when it's busy.]] [[3|Controlling: she checks delivery times against the 30-minute target and adds a driver if they're slow.]]",
          "Full marks. All four functions are separate and specific.",
        ],
        [
          "full",
          "[[0|She plans by forecasting the Friday rush from last month's sales and ordering supplies.]] [[1|She organizes by making a schedule and putting the fastest cook on the oven.]] [[2|She leads by explaining the goal, thanking people and settling a disagreement between two drivers.]] [[3|She controls by watching sales and wait times and fixing problems as they appear.]]",
          "Full marks. Using last month's sales for planning is realistic.",
        ],
        [
          "partial",
          "[[0|She sets the goal of 200 pizzas.]] [[3|She checks the delivery times.]] She also organizes by leading and leads by organizing. These are the same thing.",
          "The functions are different. Organizing arranges resources, and leading guides and motivates people.",
        ],
        [
          "partial",
          "[[1|She schedules five cooks.]] [[2|She encourages her team.]] Controlling is when the manager tells everyone what to do all day.",
          "Controlling means checking results against goals and correcting problems.",
          true,
        ],
        [
          "weak",
          "The manager just makes pizzas, so she does none of the four functions.",
          "A manager directs the work of others using the four functions.",
        ],
        [
          "weak",
          "Planning, organizing, leading and controlling are all the same job, so I only need one example.",
          "Each function is different. Give a separate example for each.",
        ],
      ],
    },
    {
      prompt:
        "A bakery owner discovers that a batch of bread contains a nut ingredient that is not listed on the label. Selling it all would bring in $300. Apply the three-question ethics test, say what she should do, and explain how this choice protects the business over time.",
      scheme: [
        "Applies the test: addresses whether it is legal, fair and comfortable if known",
        "Identifies the safety risk to customers with allergies",
        "Says she should not sell it or should relabel it and tell customers",
        "Explains that honesty protects reputation and customer trust over time",
      ],
      model:
        "Selling it unlabeled would probably break food labeling law, would be unfair to customers with nut allergies, and she would not be comfortable if customers knew. The unlisted nut is a serious safety risk because an allergic reaction could be life-threatening. She should pull the batch, or relabel it correctly and tell customers. Giving up $300 now protects her reputation and keeps customers' trust, which is worth much more than one batch.",
      answers: [
        [
          "full",
          "[[0|Applying the test: selling it unlabeled is probably illegal, unfair to customers, and she wouldn't be comfortable if they all knew.]] [[1|The unlisted nut could cause a dangerous allergic reaction.]] [[2|She should pull the batch, or relabel it properly and tell customers.]] [[3|Losing $300 now protects her reputation, and trust is worth far more than one batch.]]",
          "Full marks. The safety point is the heart of the case.",
        ],
        [
          "full",
          "[[0|It fails every question: it's likely illegal, it's unfair to buyers, and she'd hate for it to be public.]] [[1|People with nut allergies could be seriously hurt.]] [[2|The right choice is to throw the batch away or label it correctly and warn customers.]] [[3|A bakery depends on trust, so one honest decision protects years of sales.]]",
          "Full marks. 'Depends on trust' captures the long-term logic.",
        ],
        [
          "partial",
          "[[0|It is not fair.]] [[2|She should not sell it.]] Allergies are not a real problem and trust doesn't matter if the bread tastes good.",
          "Allergic reactions can be life-threatening, and trust affects future sales. Revise those points.",
        ],
        [
          "partial",
          "[[1|Nuts can be dangerous.]] [[3|Trust protects the business.]] She should sell it and hope that nobody notices.",
          "Hoping nobody notices fails the 'comfortable if everyone knew' question. Decide what she should do.",
          true,
        ],
        [
          "weak",
          "She should sell it all because $300 is a lot of money for a small bakery.",
          "An unlisted allergen is a safety risk. Money doesn't justify it.",
        ],
        [
          "weak",
          "It is the customers' job to ask about ingredients, so it is not the owner's problem.",
          "The business is responsible for accurate labels and safe products.",
        ],
      ],
    },
  ],
};

const w7: WeekInput = {
  topic: "Employees and employers, and counting revenue, costs and profit",
  note: `
## Objectives

Students will be able to:

1. describe the rights and responsibilities of employees and employers;
2. calculate revenue, costs and profit for a simple business.

## Materials

A summary of basic workplace rules (minimum wage, safety, anti-discrimination), a sample pay stub, calculators, the worksheet.

## Starter (6 minutes)

Show a sample pay stub for a teen with gross pay and deductions. Ask: "Why is the amount paid lower than hours times the hourly rate?"

## Main activity

1. Employer responsibilities: pay at least the minimum wage, provide a safe workplace, avoid discrimination, keep records, follow work-hour rules for minors. Employee responsibilities: arrive on time, do the job honestly, follow safety rules, treat others respectfully.
2. Employee rights: fair pay, a safe place, freedom from discrimination, and the right to report problems without punishment.
3. Pay: gross pay is hours times rate; deductions such as payroll taxes lower it to net pay. Example: 12 hours at $12 = $144 gross.
4. Business arithmetic: revenue = price times quantity; costs = fixed + variable; profit = revenue - costs. Example: a lawn business sells 20 cuts at $30 = $600 revenue; costs = $90 gas and equipment + $180 helper pay = $270; profit = $330.

## Worksheet

Calculate pay and profit.
`,
  reading: [
    "A fair workplace, and the arithmetic of a business",
    `
A business works when employers and employees each do their part. **Employers** have responsibilities. They must pay at least the legal **minimum wage**, provide a **safe workplace**, avoid **discrimination** in hiring, pay, promotion and firing, keep accurate records and follow the laws on working hours and conditions, which are stricter for workers under 18. **Employees** also have responsibilities: arriving on time, doing the job honestly and carefully, following safety rules, treating coworkers and customers respectfully and protecting the employer's property and private information. Employees have **rights** too: fair pay for the hours worked, a safe place, freedom from discrimination and harassment, and the right to report problems without being punished.

Pay is calculated in two steps. **Gross pay** is the total earned before anything is taken out: hours worked times the hourly rate. A student who works 12 hours at $12 an hour earns a gross pay of 12 x 12 = $144. **Deductions**, such as payroll taxes, are subtracted, leaving **net pay**, which is the amount you take home. If $14 is deducted, net pay is $130. Knowing the difference prevents surprises when the first paycheck arrives.

Owners must also understand the numbers of their own business. **Revenue** is the money that comes in from sales: price times the quantity sold. **Costs** are the money that goes out. **Fixed costs**, such as rent, stay the same however much you sell. **Variable costs**, such as ingredients or fuel, rise with the quantity. **Profit** is revenue minus total costs. If the profit is negative, it is a **loss**. Consider a student lawn business. In a month the student mows 20 lawns at $30 each, so revenue is 20 x 30 = $600. Costs are $90 for gas and equipment upkeep and $180 to pay a helper, a total of $270. Profit is 600 - 270 = $330. The **break-even point** is the quantity at which revenue equals total costs. If a lawn is sold for $30 and each one costs $13.50 in gas and helper pay, each lawn leaves $16.50 to cover any fixed costs, such as a $99 mower payment, and the student breaks even after 6 lawns. Revenue is not profit, and a business that looks busy can still lose money if costs are higher than sales.
`,
  ],
  cards: [
    ["Minimum wage", "The lowest hourly pay an employer may legally pay."],
    ["Discrimination", "Unfair treatment because of who a person is."],
    ["Gross pay", "Total earnings before deductions."],
    ["Net pay", "Take-home pay after deductions."],
    ["Revenue", "Money received from sales: price times quantity."],
    ["Fixed cost", "A cost that stays the same however much is sold."],
    ["Variable cost", "A cost that changes with the quantity sold."],
    ["Profit", "Revenue minus total costs."],
  ],
  closed: [
    [
      "A student works 12 hours at $12 an hour. What is the gross pay?",
      ["$24", "$120", "$144", "$156"],
      "C",
    ],
    [
      "Gross pay is $144 and deductions are $14. What is the net pay?",
      ["$130", "$158", "$144", "$14"],
      "A",
    ],
    [
      "A lawn business mows 20 lawns at $30. What is the revenue?",
      ["$50", "$300", "$600", "$6,000"],
      "C",
    ],
    [
      "Revenue is $600 and total costs are $270. What is the profit?",
      ["$330", "$870", "$270", "$600"],
      "A",
    ],
    [
      "Which cost stays the same however much is sold?",
      ["Ingredients", "Rent", "Fuel per lawn", "Packaging"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A 16-year-old works 15 hours in a week at a bakery for $13 an hour. $18 is deducted for payroll taxes. Calculate the gross pay and net pay. Then name two responsibilities the bakery has as an employer and one responsibility the student has.",
      scheme: [
        "Calculates gross pay as $195",
        "Calculates net pay as $177",
        "Names two valid employer responsibilities",
        "Names one valid employee responsibility",
      ],
      model:
        "Gross pay is 15 times $13, which is $195. Net pay is $195 minus $18, which is $177. The bakery must pay at least the minimum wage and provide a safe workplace; it must also follow the rules on hours for workers under 18. The student must arrive on time and do the work honestly and carefully.",
      answers: [
        [
          "full",
          "[[0|Gross pay is 15 × $13 = $195.]] [[1|Net pay is $195 - $18 = $177.]] [[2|The bakery must pay at least the minimum wage and keep a safe workplace, and follow the hours rules for under-18 workers.]] [[3|The student must arrive on time and do the work honestly.]]",
          "Full marks. Both pay figures are correct.",
        ],
        [
          "full",
          "[[0|Gross: 15 hours times $13 an hour comes to $195.]] [[1|Net: after the $18 deduction, she takes home $177.]] [[2|The employer must avoid discrimination and keep the kitchen safe, for example with proper oven training.]] [[3|The employee should follow food safety rules like washing hands.]]",
          "Full marks. Food safety is a relevant responsibility in a bakery.",
        ],
        [
          "partial",
          "[[0|Gross pay is $195.]] [[3|The student should arrive on time.]] Net pay is $213 because the deductions are added. The employer has no responsibilities.",
          "Deductions are subtracted from gross pay. And employers have several legal responsibilities.",
        ],
        [
          "partial",
          "[[1|Net pay would be $177.]] [[2|The employer must provide a safe workplace and pay the minimum wage.]] Gross pay is 15 + 13 = $28.",
          "Gross pay is hours times the rate: 15 times $13.",
          true,
        ],
        [
          "weak",
          "Gross pay is $13 because that is the rate. Net pay is $18.",
          "Multiply hours by rate, then subtract the deductions.",
        ],
        [
          "weak",
          "Employers can do anything, and employees have no rights because they are young.",
          "Workers of all ages have rights, and employers have legal duties.",
        ],
      ],
    },
    {
      prompt:
        "A student sells 40 handmade bracelets at $6 each. Materials cost $2 per bracelet, and a booth fee at the craft fair is $50. Calculate the revenue, the total costs, and the profit. Identify which cost is fixed and which is variable, and say how many bracelets she needs to sell to break even.",
      scheme: [
        "Calculates revenue as $240",
        "Calculates total costs as $130 and profit as $110",
        "Identifies the booth fee as fixed and materials as variable",
        "Calculates the break-even point as 13 bracelets (50 divided by 4, rounded up)",
      ],
      model:
        "Revenue is 40 times $6, which is $240. Materials cost 40 times $2, which is $80, plus the $50 booth fee, so total costs are $130 and profit is $110. The booth fee is fixed and the materials are variable. Each bracelet leaves $4 after materials, so to cover the $50 fee she needs 50 divided by 4 which is 12.5, so 13 bracelets.",
      answers: [
        [
          "full",
          "[[0|Revenue is 40 × $6 = $240.]] [[1|Materials are 40 × $2 = $80; adding the $50 fee makes costs $130, so profit is $240 - $130 = $110.]] [[2|The booth fee is fixed and the materials are variable.]] [[3|Each bracelet leaves $4 after materials, so $50 ÷ $4 = 12.5, which means she must sell 13 to break even.]]",
          "Full marks. Rounding up to 13 is the correct final step.",
        ],
        [
          "full",
          "[[0|She earns $240 in revenue.]] [[1|Costs are $80 for materials plus $50 for the booth, which is $130, so she profits $110.]] [[2|The fee is a fixed cost because it doesn't change, and materials are variable because they go up with each bracelet.]] [[3|She makes $4 on each bracelet toward the fee, so she needs 13 to break even, since 12 would give only $48.]]",
          "Full marks. Checking that 12 is not enough is a careful touch.",
        ],
        [
          "partial",
          "[[0|Revenue is $240.]] [[2|The fee is fixed and the materials are variable.]] Total costs are $80, so profit is $160. Break even is 50 bracelets.",
          "Total costs include the $50 booth fee as well as materials: $130 in all.",
        ],
        [
          "partial",
          "[[1|Profit is $110.]] [[3|She needs 13 to break even.]] Revenue is 6 + 40 = $46.",
          "Revenue is the price times the number sold: 40 times $6 is $240.",
          true,
        ],
        [
          "weak",
          "Revenue and profit are the same, $240, because all the money is mine.",
          "Profit is revenue minus costs, so the costs must come out.",
        ],
        [
          "weak",
          "Fixed costs go up with every bracelet and variable costs never change.",
          "It is the other way around: fixed costs stay constant and variable costs rise with quantity.",
        ],
      ],
    },
  ],
};

const w8: WeekInput = {
  topic: "The income statement, and how a business is funded",
  note: `
## Objectives

Students will be able to:

1. prepare a simple income statement;
2. explain how businesses obtain funding, including loans and investors.

## Materials

An income statement template, sample sales and expense lists, a loan-payment illustration, calculators, the worksheet.

## Starter (6 minutes)

Ask: "A food truck made $9,000 last month. Is the owner rich?" Discuss what has to be subtracted before knowing how the business really did.

## Main activity

1. Income statement: shows revenue, costs and profit for a period. Format: Revenue; minus cost of goods sold = gross profit; minus operating expenses (rent, wages, utilities, advertising) = net income before tax.
2. Example: a food truck in one month. Sales $9,000. Cost of goods sold (ingredients) $3,200. Gross profit $5,800. Expenses: wages $2,400, truck loan payment $900, fuel $600, permits $250. Total expenses $4,150. Net income $1,650.
3. Funding: owner's savings, family and friends, bank loans (borrowed money repaid with interest), investors (give money for a share of ownership), crowdfunding, grants. Compare debt (must repay, owner keeps control) and equity (no repayment but shared ownership).
4. Simple interest: a $5,000 loan at 8 percent a year for 1 year costs $400 in interest.

## Worksheet

Prepare an income statement and recommend a funding source.
`,
  reading: [
    "Reading the scorecard, and finding the money",
    `
At the end of each month or year, an owner needs to know: did the business make money? The **income statement** answers that question. It shows the business's revenue, costs and profit over a period of time. It starts with **revenue**, the total sales. Next it subtracts the **cost of goods sold (COGS)**, the direct cost of the products sold, such as ingredients. The result is **gross profit**. Then it subtracts **operating expenses**, the other costs of running the business, such as wages, rent, fuel, permits, utilities and advertising. The final line is **net income**, also called net profit, the money left after everything.

Here is a food truck's income statement for one month. Sales were $9,000. Ingredients cost $3,200, so the gross profit is 9,000 - 3,200 = $5,800. Operating expenses were wages $2,400, the truck loan payment $900, fuel $600 and permits $250, a total of $4,150. Net income is 5,800 - 4,150 = $1,650. Though the truck took in $9,000, the owner kept $1,650 after all costs, which is a very different picture from the sales figure alone. If the net income had been negative, it would have been a loss.

To start or grow, a business needs money, and there are several sources. **Owner's savings** carry no repayment, but they are limited and risky. **Family and friends** may lend or give money, though it can strain relationships if the business struggles. A **bank loan** provides borrowed money that must be repaid with **interest**, the fee for using money. With simple interest, a $5,000 loan at 8 percent a year costs 5,000 x 0.08 = $400 in interest for one year, so the borrower repays $5,400. Lenders may ask for proof that the business can repay, such as a business plan. **Investors** give money in exchange for a share of ownership, often called equity. The owner does not have to repay them on a schedule, but gives up part of the profit and some control. **Crowdfunding** collects small amounts from many supporters, and **grants** are gifts, often from governments or foundations, for particular purposes.

In choosing, owners compare **debt** (borrowing: repay with interest but keep full ownership) with **equity** (selling a share: no required repayment but shared ownership and profit). The right choice depends on how much money is needed, how fast the business can repay, and how much control the owner wants to keep.
`,
  ],
  cards: [
    ["Income statement", "A report of revenue, costs and profit over a period."],
    ["Cost of goods sold", "The direct cost of the products that were sold."],
    ["Gross profit", "Revenue minus cost of goods sold."],
    ["Operating expenses", "Costs of running the business, such as wages and rent."],
    ["Net income", "What is left after all costs and expenses."],
    ["Interest", "The fee paid for borrowing money."],
    ["Investor", "A person who provides money in exchange for part ownership."],
    ["Equity", "A share of ownership in a business."],
  ],
  closed: [
    [
      "Sales are $9,000 and cost of goods sold is $3,200. What is the gross profit?",
      ["$5,800", "$12,200", "$3,200", "$6,800"],
      "A",
    ],
    [
      "Gross profit is $5,800 and operating expenses are $4,150. What is the net income?",
      ["$9,950", "$1,650", "$4,150", "$5,800"],
      "B",
    ],
    [
      "What is the simple interest for one year on a $5,000 loan at 8 percent?",
      ["$40", "$400", "$800", "$4,000"],
      "B",
    ],
    [
      "Which funding source gives money in exchange for part ownership?",
      ["A bank loan", "An investor", "A grant", "Owner's savings"],
      "B",
    ],
    [
      "Which of these is an operating expense?",
      ["Ingredients sold", "Rent", "Revenue", "Gross profit"],
      "B",
    ],
  ],
  open: [
    {
      prompt:
        "A smoothie stand had sales of $5,000 in a month. The cost of goods sold was $1,800. Operating expenses were wages $1,200, rent $500 and advertising $150. Prepare an income statement showing revenue, gross profit, total operating expenses and net income, and comment on how the business performed.",
      scheme: [
        "States revenue as $5,000 and gross profit as $3,200",
        "Calculates total operating expenses as $1,850",
        "Calculates net income as $1,350",
        "Comments sensibly on performance, such as it was profitable and what the biggest cost was",
      ],
      model:
        "Revenue was $5,000. Subtracting the cost of goods sold of $1,800 gives a gross profit of $3,200. Operating expenses were 1,200 plus 500 plus 150, a total of $1,850. Net income was 3,200 minus 1,850, which is $1,350. The business made a profit, about 27 percent of sales, and wages were the biggest expense.",
      answers: [
        [
          "full",
          "[[0|Revenue $5,000; cost of goods sold $1,800; gross profit $3,200.]] [[1|Operating expenses: wages $1,200 + rent $500 + advertising $150 = $1,850.]] [[2|Net income = $3,200 - $1,850 = $1,350.]] [[3|The business was profitable, keeping about 27 percent of sales, and wages were the biggest expense.]]",
          "Full marks. The statement is laid out correctly.",
        ],
        [
          "full",
          "[[0|Sales of $5,000 less ingredients of $1,800 leaves a gross profit of $3,200.]] [[1|Expenses add up to $1,850.]] [[2|That leaves net income of $1,350 for the month.]] [[3|It made a profit, so the stand is working, though the owner could look at wages and whether more advertising might raise sales.]]",
          "Full marks. Suggesting what to examine next adds value.",
        ],
        [
          "partial",
          "[[0|Gross profit is $3,200.]] [[3|The stand made a profit.]] Net income is $3,200 because expenses don't need to be subtracted.",
          "Net income comes after operating expenses are subtracted from gross profit.",
        ],
        [
          "partial",
          "[[1|Expenses are $1,850.]] [[2|Net income is $1,350.]] Gross profit is $6,800, since I added the cost of goods sold to the sales.",
          "Gross profit is revenue minus cost of goods sold, so $5,000 minus $1,800.",
          true,
        ],
        [
          "weak",
          "The stand made $5,000 profit because that is the sales figure.",
          "Sales are revenue, not profit. Costs and expenses must be subtracted.",
        ],
        [
          "weak",
          "An income statement lists what the business owns. It has nothing to do with revenue.",
          "An income statement reports revenue, costs and profit for a period.",
        ],
      ],
    },
    {
      prompt:
        "A student with a thriving lawn business needs $5,000 for a trailer and a second mower. Compare two funding options: a bank loan at 8 percent simple interest for one year, and an investor who would give $5,000 for 20 percent of the business. Calculate the cost of the loan, explain the trade-off, and recommend one option with a reason.",
      scheme: [
        "Calculates the loan interest as $400 and total repayment as $5,400",
        "Explains that the investor requires no repayment but takes 20 percent of ownership and profit",
        "Explains the trade-off between debt (repay, keep control) and equity (share ownership)",
        "Recommends one option with a sensible reason",
      ],
      model:
        "The loan costs 5,000 times 0.08, which is $400 interest, so she repays $5,400 in a year. The investor needs no repayment, but takes 20 percent of the business and its future profit. The trade-off is that debt must be repaid but she keeps full ownership, while equity has no repayment but means sharing ownership. If the business is profitable enough to repay $5,400, I would recommend the loan, since giving up 20 percent could cost far more as the business grows.",
      answers: [
        [
          "full",
          "[[0|The loan interest is $5,000 × 0.08 = $400, so she repays $5,400.]] [[1|The investor needs no repayment, but takes 20 percent of the business and its profit.]] [[2|The trade-off is that debt has to be repaid but she keeps full ownership, while equity has no repayment but shared ownership.]] [[3|I'd recommend the loan, because the business is thriving and 20 percent of its future profit could be worth far more than $400.]]",
          "Full marks. The recommendation is tied to the business's strength.",
        ],
        [
          "full",
          "[[0|The loan costs $400 in interest, for $5,400 in total.]] [[1|The investor takes a fifth of the business with no payments to make.]] [[2|With debt the risk is the repayment; with equity the cost is a permanent share of the profit.]] [[3|If sales were uncertain, I'd choose the investor to avoid payments, but for a thriving business I'd borrow.]]",
          "Full marks. Explaining when the other option wins shows judgment.",
        ],
        [
          "partial",
          "[[0|Interest is $400.]] [[3|I recommend the loan.]] The investor takes over the whole business and the owner loses everything.",
          "The investor takes 20 percent, not the whole business. Explain the real trade-off.",
        ],
        [
          "partial",
          "[[1|The investor takes 20 percent.]] [[2|Debt must be repaid.]] The interest is $40 because 8 percent of $5,000 is $40.",
          "8 percent of $5,000 is $400. Recalculate the interest and the repayment.",
          true,
        ],
        [
          "weak",
          "Both options are free money, so it doesn't matter which she picks.",
          "A loan costs interest and an investor takes a share of ownership.",
        ],
        [
          "weak",
          "She should steal the money because it is faster than a loan.",
          "Stealing is illegal and unethical. Choose between the two funding options.",
        ],
      ],
    },
  ],
};

writeCourse(
  "introduction-to-business-grade-9.json",
  "Introduction to Business",
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
