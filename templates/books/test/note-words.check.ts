import assert from "node:assert/strict";
import { correctNote } from "../shared/note-words.js";
import { check, finish } from "./helpers.js";

const c = correctNote;

await check("the owner's examples read as written", () => {
  assert.equal(c("Transport for melallic bars"), "Transport for metallic bars");
  assert.equal(c("Fillel"), "Fillet");
  assert.equal(c("Filllet"), "Fillet");
  assert.equal(c("10 packs waler"), "10 packs water");
  assert.equal(c("TL:1k"), "TF:1k");
  assert.equal(c("For dala"), "For data");
  assert.equal(c("Carrols"), "Carrots");
  assert.equal(c("Lighl"), "Light");
  assert.equal(c("Gurlic"), "Garlic");
  assert.equal(c("Servielle"), "Serviette");
});

await check("a long shopping note comes out mostly right", () => {
  const read = c(
    "Pepper: Sk Ginger and Gurlic: 1k Onion: Sk Servielle. 3k Pepper for shewerrile. 2k Creyfisir 2k Bama: 12,0k Kelchup, 15k Snawarma cread: 4.5k Sausagie: 4.2k TF:1k Tolel: 53,3k",
  );
  for (const part of [
    "Pepper: 5k",
    "Ginger and Garlic: 1k",
    "Serviette",
    "Bama: 12.0k",
    "Ketchup, 15k",
    "Shawarma",
    "Sausage: 4.2k",
    "TF:1k",
    "Total: 53.3k",
  ])
    assert.ok(read.includes(part), `${part} in: ${read}`);
});

await check("other misreads from the notes", () => {
  assert.equal(
    c("5 packs waler, 3 packs coke, 2 packs Fanla, 1 pack sprile"),
    "5 packs water, 3 packs coke, 2 packs Fanta, 1 pack sprite",
  );
  assert.equal(
    c("31 bollle waler, 1 pack of lissues"),
    "31 bottle water, 1 pack of tissues",
  );
  assert.equal(
    c("1 pack mallina, 1 pack exolic"),
    "1 pack maltina, 1 pack exotic",
  );
  assert.equal(c("Kelchup. Bama, cnicken"), "Ketchup. Bama, chicken");
  assert.equal(c("Takeoul Carrols"), "Takeout Carrots");
  assert.equal(c("Starlink subscriplion"), "Starlink subscription");
  assert.equal(c("1D packs waler"), "10 packs water");
});

await check("right words, names and brands are left alone", () => {
  for (const ok of [
    "For chicken, chips and ketchup",
    "1 pack Hollandia, 1 pack Viju",
    "Payment to Ade for cleaning",
    "Balance for October Salary",
    "LOUNGE STOCK 5 packs chicken",
    "Gas control",
    "Paid Lois",
    "date taken from when it was sent",
    "starting the hall clearing",
  ])
    assert.equal(c(ok), ok);
});

await check("misreads seen often in these notes", () => {
  assert.equal(c("Cabbage: 4k Cartol 3k"), "Cabbage: 4k Carrot 3k");
  assert.equal(
    c("Shawarma bread: 3k far 2 packs"),
    "Shawarma bread: 3k for 2 packs",
  );
  assert.equal(c("Lomalo pasle"), "Tomato paste");
});

await finish();
