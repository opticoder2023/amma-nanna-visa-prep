// What the app says, in order. Pure functions: the app plays these items; tools/collect-texts.mjs
// walks the same functions to list every clip that must be pre-recorded. Keep both in sync by
// only ever changing spoken wording here.

export const qType = q => q.type || "ask";

/** Text as the Telugu voice should read it: drop English asides in brackets, soften separators. */
export const spokenTe = t => String(t).replace(/\([^)]*[A-Za-z][^)]*\)/g, "").replace(/[()]/g, ", ")
  .replace(/;/g, ", లేదా ").replace(/'/g, "").replace(/\s+/g, " ").replace(/\s+([,.?!])/g, "$1").trim();
export const splitSent = t => String(t || "").split(/(?<=[.?!])\s+/).filter(Boolean);

export const EN = (t, r) => ({t: String(t).trim(), l:"en", r: r || 0.9});
export const TE = t => ({t: spokenTe(t), l:"te"});
const teLines = t => splitSent(t).map(TE);

export function lookupWord(dict, piece){
  const core = piece.replace(/^[^\w]+|[^\w']+$/g, "").replace(/'$/, "");
  if (!core) return null;
  const key = dict[core] ? core : (dict[core.toLowerCase()] ? core.toLowerCase() : null);
  return {core, key, d: key ? dict[key] : null};
}

/** Value of a {token} for the parent who is practising. "my" tokens resolve to the nanna or amma value. */
export function tokVal(C, parent, key){
  if (key === "spouse") return parent === "amma" ? {en:"husband", pr:"హస్బెండ్", te:"భర్త"} : {en:"wife", pr:"వైఫ్", te:"భార్య"};
  const real = /^my[A-Z]/.test(key) ? parent + key.slice(2) : key;
  const d = C.details[real];
  if (!d || (!d.en && !d.te)) return null;
  return {en: d.en || d.te, pr: d.pr || d.te || d.en, te: d.te || d.en};
}
export const label = (C, key) => (C.labels[key] || C.labels[key.replace(/^my/, "nanna")] || [key])[0];
export const fillPlain = (C, parent, text, mode) =>
  text.replace(/\{(\w+)\}/g, (_, k) => { const v = tokVal(C, parent, k); return v ? v[mode] : label(C, k); });
export const myAnswers = (q, parent) => (q.ans || []).filter(a => !a.who || a.who === parent);

const WHO_SPOKEN = {ask:"ఆఫీసర్ ఇలా అడుగుతారు.", say:"మీరు ఇలా చెప్పవచ్చు.", hear:"ఆఫీసర్ ఇలా చెప్పవచ్చు."};

export function makeScript(C, parent){
  const meaning = core => { const L = lookupWord(C.dict, core); return L && L.d ? L.d[1] : ""; };
  function wordItems(en, gid){
    const out = [];
    en.split(/\s+/).forEach((piece, i) => {
      const hl = `[data-gloss="${gid}"] [data-i="${i}"]`;
      const t = piece.match(/\{(\w+)\}/);
      if (t) {
        const v = tokVal(C, parent, t[1]);
        if (v) { out.push({...EN(v.en, 0.75), hl, gap:150}); out.push(TE("అంటే, " + label(C, t[1]))); }
        return;
      }
      const L = lookupWord(C.dict, piece); if (!L) return;
      out.push({...EN(L.core, 0.75), hl, gap:150});
      if (L.d) out.push(TE("అంటే, " + L.d[1]));
    });
    return out;
  }
  const S = {
    q(id){ const q = C.qmap[id]; if (!q) return [];
      return [TE(WHO_SPOKEN[qType(q)]), EN(q.en, 0.75), TE("పదం పదం అర్థం."), ...wordItems(q.en, "q-" + id),
        TE("మొత్తం అర్థం."), TE(q.te), ...(q.ctx ? [TE(qType(q) === "ask" ? "ఎందుకు అడుగుతారు?" : "సందర్భం."), ...teLines(q.ctx)] : []),
        TE("ఇప్పుడు మళ్ళీ ఇంగ్లీష్‌లో వినండి."), EN(q.en)]; },
    qmean(id){ const q = C.qmap[id]; return [TE("అర్థం."), TE(q.te), ...teLines(q.ctx)]; },
    a(id, k){ const q = C.qmap[id]; const a = myAnswers(q, parent)[+k]; if (!a) return [];
      const en = fillPlain(C, parent, a.en, "en");
      return [TE(qType(q) === "hear" ? "మీరు ఇలా చెప్పండి." : "మీ సమాధానం."), EN(en, 0.75), TE("పదం పదం అర్థం."), ...wordItems(a.en, `a-${id}-${k}`),
        TE("మొత్తం అర్థం."), TE(fillPlain(C, parent, a.te, "te")), EN(en, 0.75), TE("ఇప్పుడు మీరు గట్టిగా చెప్పండి."), {pause:6000},
        TE("మళ్ళీ ఒకసారి వినండి."), EN(en)]; },
    // one alternative phrasing, explained like the main question
    v(id, i){ const q = C.qmap[id], v = q.vars[+i], mean = (q.vte || [])[+i] || q.te;
      return [{...EN(v[0], 0.75), hl:`[data-var="${id}-${i}"]`}, TE("పదం పదం అర్థం."), ...wordItems(v[0], `v-${id}-${i}`),
        TE("మొత్తం అర్థం."), TE(mean), EN(v[0])]; },
    // all alternatives back to back: English and meaning only, to keep it short
    vall(id){ const q = C.qmap[id]; return [TE("ఆఫీసర్ ఇదే ప్రశ్నను ఇలా కూడా అడగవచ్చు."),
      ...q.vars.flatMap((v, i) => [{...EN(v[0], 0.75), hl:`[data-var="${id}-${i}"]`}, TE("అంటే, " + ((q.vte || [])[i] || q.te))])]; },
    tip(id){ return teLines(C.qmap[id].tip); },
    ctx(id){ return teLines(C.qmap[id].ctx); },
    w(core){ const m = meaning(core); return [EN(core, 0.7), ...(m ? [TE("అంటే, " + m)] : [])]; },
    tok(k){ const v = tokVal(C, parent, k); return v ? [EN(v.en, 0.75), TE("అంటే, " + label(C, k))] : []; },
    en(text){ return [EN(text)]; }
  };
  return S;
}

/** Every item the app can speak for this parent (used to pre-record audio). */
export function allItems(C, parent){
  const S = makeScript(C, parent), out = [];
  for (const q of C.questions) {
    out.push(...S.q(q.id), ...S.qmean(q.id));
    myAnswers(q, parent).forEach((_, k) => out.push(...S.a(q.id, k)));
    (q.vars || []).forEach((v, i) => out.push(...S.v(q.id, i)));
    if (q.vars && q.vars.length) out.push(...S.vall(q.id));
    if (q.tip) out.push(...S.tip(q.id));
    if (q.ctx) out.push(...S.ctx(q.id));
  }
  for (const w of Object.keys(C.dict)) out.push(...S.w(w));
  for (const k of Object.keys(C.details)) out.push(...S.tok(k));
  return out.filter(it => it.t);
}

/** Stable clip id for a spoken text (cyrb53). Same function lives in tools/audio_lib.py. */
export function clipId(lang, text){
  const str = lang + "|" + text;
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 0x9E3779B1); h2 = Math.imul(h2 ^ ch, 0x5F356495);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 0x85EBCA6B) ^ Math.imul(h2 ^ (h2 >>> 13), 0xC2B2AE35);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 0x85EBCA6B) ^ Math.imul(h1 ^ (h1 >>> 13), 0xC2B2AE35);
  return (0x100000000 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(14, "0");
}
