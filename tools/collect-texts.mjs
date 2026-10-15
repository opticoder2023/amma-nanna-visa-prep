// Lists every clip the app can play, as JSON lines {id, lang, text}.
//   node tools/collect-texts.mjs              -> public clips (no family pack)
//   node tools/collect-texts.mjs family.json  -> clips needed once that (unencrypted) pack is loaded
import { readFileSync } from "node:fs";
import { buildContent } from "../js/content/index.js";
import { allItems, clipId } from "../js/speech-script.js";
import { sayTe, sayEn } from "./normalize.mjs";

const packPath = process.argv[2];
const pack = packPath ? JSON.parse(readFileSync(packPath, "utf8")) : null;
const C = buildContent(pack);
const seen = new Set();
for (const parent of ["amma", "nanna"]) {
  for (const it of allItems(C, parent)) {
    const id = clipId(it.l, it.t);
    if (seen.has(id)) continue;
    seen.add(id);
    const say = it.l === "te" ? sayTe(it.t, C.dict) : sayEn(it.t);
    process.stdout.write(JSON.stringify({id, lang: it.l, text: it.t, say}) + "\n");
  }
}
