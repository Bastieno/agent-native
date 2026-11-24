import assert from "node:assert/strict";
import { check, finish } from "./helpers.js";

// Lounge stock by menu group (the owner's answers, 2026-11-24): Water, Soft
// drinks, Energy drinks, Beer, Bitters, Liquors, Meals, Shawarma; general
// items (nylon, serviette, transport) are Shared; what can't be placed is
// Not sorted. A note with an amount on each line is split line by line.
const { splitStock, saleGroup } = await import("../server/lib/stock-split.js");
const { parseNarration } = await import("../shared/narration.js");

const k = (naira: number) => naira * 100;
const asMap = (s: { parts: { group: string; amount: number }[] }) =>
  Object.fromEntries(s.parts.map((p) => [p.group, p.amount]));

await check(
  "a tagged narration files under its group, general items shared",
  () => {
    const note = [
      "SHAWARMA",
      "Bama: 12.6k for 3 bottles",
      "Ketchup: 15k for 3 bottles",
      "Chicken fillet: 15k for 3 packs",
      "Cabbage: 4k",
      "Carrot: 2k",
      "Shawarma bread: 3k",
      "Nylon: 3k",
      "Tf: 1k",
      "Total: 55.6k",
    ].join("\n");
    const s = splitStock(note, k(55600));
    assert.deepEqual(asMap(s), { shawarma: k(51600), shared: k(4000) });
    assert.equal(s.mismatch, false);
  },
);

await check("the tag is read as a stock group", () => {
  const p = parseNarration("SHAWARMA\nBama: 12.6k");
  assert.equal(p?.category, "Food & drink stock");
  assert.equal(p?.business, "lounge");
  for (const tag of [
    "WATER",
    "SOFT",
    "ENERGY",
    "BEER",
    "BITTERS",
    "LIQUOR",
    "MEALS",
  ])
    assert.equal(
      parseNarration(`${tag} 3 packs`)?.category,
      "Food & drink stock",
      tag,
    );
});

await check("a mixed note is split line by line", () => {
  const s = splitStock("48k chicken, 13.7k chips, 3k shawarma bread", k(64700));
  assert.deepEqual(asMap(s), { meals: k(61700), shawarma: k(3000) });
  assert.equal(s.mismatch, false);
});

await check("what the lines don't cover is not sorted, and flagged", () => {
  const s = splitStock("48k chicken, 13.7k chips, 3k shawarma bread", k(70000));
  assert.deepEqual(asMap(s), {
    meals: k(61700),
    shawarma: k(3000),
    unsorted: k(5300),
  });
  assert.equal(s.mismatch, true);
});

await check(
  "lines adding up to more than was paid are scaled to the payment",
  () => {
    const s = splitStock("18k pepper, 3k shawarma bread, 4k indomie", k(20000));
    const m = asMap(s);
    assert.equal(m.meals + m.shawarma, k(20000));
    assert.equal(s.mismatch, true);
  },
);

await check("an item nobody listed is not sorted", () => {
  const s = splitStock("10k chicken, 2k sticker", k(12000));
  assert.deepEqual(asMap(s), { meals: k(10000), unsorted: k(2000) });
});

await check("chicken fillet is shawarma, other chicken is meals", () => {
  assert.deepEqual(asMap(splitStock("Chicken fillet: 30k", k(30000))), {
    shawarma: k(30000),
  });
  assert.deepEqual(asMap(splitStock("For chicken", k(23500))), {
    meals: k(23500),
  });
});

await check("gas and pepper go with the rest of the note", () => {
  assert.deepEqual(asMap(splitStock("Gas 15k, indomie 9.7k", k(24700))), {
    meals: k(24700),
  });
  assert.deepEqual(asMap(splitStock("Ketchup 30k, pepper 5k", k(35000))), {
    shawarma: k(35000),
  });
  assert.deepEqual(asMap(splitStock("Pepper for shawarma 2k", k(2000))), {
    shawarma: k(2000),
  });
  assert.deepEqual(asMap(splitStock("For gas", k(15000))), {
    unsorted: k(15000),
  });
  assert.deepEqual(asMap(splitStock("For pepper", k(5000))), {
    meals: k(5000),
  });
  assert.deepEqual(asMap(splitStock("MEALS gas refill", k(15000))), {
    meals: k(15000),
  });
});

await check(
  "a note without amounts goes to its one group, else not sorted",
  () => {
    assert.deepEqual(asMap(splitStock("10 packs water", k(14500))), {
      water: k(14500),
    });
    assert.deepEqual(
      asMap(splitStock("2 crates origin, 1 crate heineken", k(30000))),
      {
        beer: k(30000),
      },
    );
    assert.deepEqual(
      asMap(splitStock("5 packs water, 1 pack exotic", k(21750))),
      {
        unsorted: k(21750),
      },
    );
    assert.deepEqual(asMap(splitStock("For drinks", k(105500))), {
      unsorted: k(105500),
    });
    assert.deepEqual(asMap(splitStock(null, k(5000))), { unsorted: k(5000) });
  },
);

await check("drinks are told apart", () => {
  const one = (note: string) => Object.keys(asMap(splitStock(note, k(1000))));
  assert.deepEqual(one("A pack of Monster"), ["energy"]);
  assert.deepEqual(one("1 pack red bull"), ["energy"]);
  assert.deepEqual(one("1 carton origin bitter"), ["bitters"]);
  assert.deepEqual(one("Black bullet"), ["energy"]);
  assert.deepEqual(one("1 pack smirnoff double black"), ["energy"]);
  assert.deepEqual(one("1 crate smirnoff ice"), ["beer"]);
  assert.deepEqual(one("For liquor"), ["liquor"]);
  assert.deepEqual(one("2 bottles red label"), ["liquor"]);
  assert.deepEqual(one("1 pack maltina"), ["soft"]);
  assert.deepEqual(one("2 packs coke"), ["soft"]);
});

await check("a float is never sorted", () => {
  assert.deepEqual(
    asMap(splitStock("10k chicken", k(10000), { float: true })),
    {
      unsorted: k(10000),
    },
  );
});

await check("comma amounts", () => {
  assert.deepEqual(asMap(splitStock("4.9k chips, 2,5k red cup", k(7400))), {
    meals: k(4900),
    shared: k(2500),
  });
  assert.deepEqual(asMap(splitStock("Chicken 15,000", k(15000))), {
    meals: k(15000),
  });
});

await check("sale items are grouped by name and Moniebook category", () => {
  const cases: [string, string | null, string | null][] = [
    ["WATER", "Drinks", "water"],
    ["Discounted water", "Water", "water"],
    ["Coke", "Drinks", "soft"],
    ["MALTA GUINNESS", "Drinks", "soft"],
    ["SOFT DRINKS", "Drinks", "soft"],
    ["MONSTER", "Drinks", "energy"],
    ["POWER HORSE", "Drinks", "energy"],
    ["ORIGIN BEER", "Drinks", "beer"],
    ["GUINNESS MEDIUM STOUT", "Drinks", "beer"],
    ["Smirnoff Double Black Can", "Drinks", "energy"],
    ["SMIRNOFF BIG", "Drinks", "beer"],
    ["ORIGIN BITTER", "Drinks", "bitters"],
    ["Black Bullet", "Drinks", "energy"],
    ["Black Bullet", "Energy drinks", "energy"],
    ["RED LABEL", "Liquors", "liquor"],
    ["Chicken and Chips (Bundled)", "Meals", "meals"],
    ["Shawarma with Extra Chicken", "Meals", "shawarma"],
    ["Combo 2 Chicken and Chips + 1 Shawarma", "Meals", "meals"],
    ["Double Sausage Shawarma (Bundled)", "Shawarma", "shawarma"],
    ["Heineken", "Beer", "beer"],
    ["More", "Beer", "beer"],
    ["HUB MONTHLY SUBSCRIPTION PREMIUM", "Subscription", null],
    ["Something", null, null],
  ];
  for (const [item, cat, want] of cases)
    assert.equal(saleGroup(item, cat), want, item);
});

await check("what isn't priced takes the rest of the payment", () => {
  assert.deepEqual(
    asMap(splitStock("5 packs of chicken, 1k delivery fee", k(25000))),
    {
      meals: k(24000),
      shared: k(1000),
    },
  );
  const s = splitStock("3 packs sausages, 4k cabbage. 3k bread", k(13000));
  assert.deepEqual(asMap(s), { shawarma: k(13000) });
  assert.equal(s.mismatch, false);
});

await check("transport fare misread off a slip is still shared", () => {
  for (const tf of [
    "1k If",
    "800 I",
    "1I:1k",
    "11:1k",
    "500 t",
    "1k tr",
    "Tl: 1k",
    "1k U",
  ])
    assert.deepEqual(
      asMap(splitStock(`24k chicken, ${tf}`, k(25000))).shared > 0,
      true,
      tf,
    );
});

await check("misread letters and run-together words", () => {
  assert.deepEqual(asMap(splitStock("5 packs слiскen", k(23500))), {
    meals: k(23500),
  });
  assert.deepEqual(asMap(splitStock("Кelспuр. 28k", k(28000))), {
    shawarma: k(28000),
  });
  assert.deepEqual(asMap(splitStock("2chips, 1 butter", k(12530))), {
    meals: k(12530),
  });
  assert.deepEqual(asMap(splitStock("22k for 4 packs of filel", k(22000))), {
    shawarma: k(22000),
  });
  assert.deepEqual(
    asMap(splitStock("9.7k indomie, 5.6k eggs, 9.5k soag", k(24800))),
    { meals: k(24800) },
  );
  assert.deepEqual(asMap(splitStock("4 imperal blue, 1 lawson", k(35000))), {
    liquor: k(35000),
  });
  assert.deepEqual(
    asMap(splitStock("Sherwama bread: 3 packs (4.5k)", k(4500))),
    { shawarma: k(4500) },
  );
});

await check("staff meals and odd notes wait for the owner", () => {
  for (const note of [
    "For Lunch",
    "For Food",
    "1 pizza",
    "For engine oil",
    "Refund on drinks",
  ])
    assert.deepEqual(
      Object.keys(asMap(splitStock(note, k(3000)))),
      ["unsorted"],
      note,
    );
});

await check("an item said to be for a group goes there", () => {
  assert.deepEqual(
    asMap(
      splitStock("Chicken for meal: 24k / Chicken for shawarma: 30k", k(54000)),
    ),
    { meals: k(24000), shawarma: k(30000) },
  );
});

// Mixed drink lists without amounts (the owner's answer, 2026-11-24): shared
// by quantity times each group's Moniebook cost price, as an estimate.
const costs = { water: 20000, soft: 40000, beer: 100000, energy: 150000 };

await check(
  "a mixed drinks list is split by cost price, as an estimate",
  () => {
    const s = splitStock("10 packs water, 2 packs coke", k(28000), {
      groupCosts: costs,
    });
    // water 10 x 200 = 2000, soft 2 x 400 = 800: 5/7 and 2/7 of the payment.
    assert.deepEqual(asMap(s), { water: k(20000), soft: k(8000) });
    assert.equal(s.estimated, true);
    assert.equal(s.mismatch, false);
  },
);

await check("quantities default to one and the parts add up", () => {
  const s = splitStock("2 origin, 1 Heineken, 1 maltina, fayrouz", k(100285), {
    groupCosts: costs,
  });
  const m = asMap(s);
  assert.equal(m.beer + m.soft, k(100285));
  assert.ok(m.beer > m.soft);
  assert.equal(s.estimated, true);
});

await check("ice in a drinks list is Smirnoff Ice", () => {
  const m = asMap(
    splitStock("1 big ice, 2 trophy, 1 maltina", k(50000), {
      groupCosts: costs,
    }),
  );
  assert.deepEqual(Object.keys(m).sort(), ["beer", "soft"]);
});

await check(
  "without a cost price, or with food in it, it stays not sorted",
  () => {
    assert.deepEqual(
      asMap(splitStock("10 packs water, 2 packs coke", k(28000))),
      { unsorted: k(28000) },
    );
    assert.deepEqual(
      asMap(splitStock("1 bitter, 2 coke", k(10000), { groupCosts: costs })),
      { unsorted: k(10000) },
    );
    assert.deepEqual(
      asMap(
        splitStock("Chicken, Chips, Cabbage", k(65000), { groupCosts: costs }),
      ),
      { unsorted: k(65000) },
    );
    assert.deepEqual(
      asMap(splitStock("For drinks", k(65000), { groupCosts: costs })),
      { unsorted: k(65000) },
    );
  },
);

// More is a beer (the owner, 2026-11-24).
await check("Chivita Active is a soft drink and More a beer", () => {
  const m = asMap(
    splitStock("2 packs coke, 1 active, 1 More, 5 packs water", k(47450), {
      groupCosts: costs,
    }),
  );
  assert.deepEqual(Object.keys(m).sort(), ["beer", "soft", "water"]);
});

await finish();
