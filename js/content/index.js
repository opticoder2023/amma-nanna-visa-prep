// Builds the content the app uses: the public question bank, optionally overlaid with a private family pack.
// Pure module: used by the app in the browser and by the build tools in Node.
import { CATS, DETAIL_LABELS, DETAIL_KEYS, QUESTIONS } from "./questions.js";
import { DICT } from "./dictionary.js";
import { CONTEXT } from "./context.js";

export { CATS, DETAIL_LABELS, DETAIL_KEYS };

const clone = o => JSON.parse(JSON.stringify(o));

export function emptyDetails(){
  return Object.fromEntries(DETAIL_KEYS.map(k => [k, {en:"", te:""}]));
}

/** pack: parsed family pack (or null). userDetails: edits made on this phone (override the pack). */
export function buildContent(pack, userDetails = {}){
  const questions = clone(QUESTIONS);
  const p = pack || {};
  for (const q of questions) {
    const c = {...(CONTEXT[q.id] || {}), ...((p.context || {})[q.id] || {})};
    if (c.ctx) q.ctx = c.ctx;
    q.vte = c.vte || [];
    if (p.answers && p.answers[q.id]) q.ans = clone(p.answers[q.id]);
    if (p.tips && p.tips[q.id] !== undefined) q.tip = p.tips[q.id];
  }
  const details = {...emptyDetails(), ...clone(p.details || {})};
  for (const [k, v] of Object.entries(userDetails || {})) if (v && (v.en || v.te)) details[k] = v;
  return {
    questions,
    qmap: Object.fromEntries(questions.map(q => [q.id, q])),
    dict: {...DICT, ...(p.dictionary || {})},
    details,
    labels: DETAIL_LABELS,
    cats: CATS,
    interview: p.interview || null,
    family: p.family || null
  };
}
