import { buildContent, DETAIL_KEYS } from "./content/index.js";
import { makeScript, qType, myAnswers, tokVal, label, lookupWord } from "./speech-script.js";
import * as player from "./player.js";
import * as packStore from "./pack.js";

const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ICON = {
  spk:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path d="M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
  today:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/><circle cx="12" cy="15" r="1.6" fill="currentColor"/></svg>',
  cards:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="6" y="3.5" width="13" height="17" rx="2.5"/><path d="M3.5 7v11.5A2.5 2.5 0 0 0 6 21"/></svg>',
  mock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20V9l9-5 9 5v11"/><path d="M7 20v-7h10v7"/><path d="M7 16h10"/></svg>',
  dict:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3"/><path d="M9 8h6M9 11.5h4"/></svg>',
  list:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1.2" fill="currentColor"/><circle cx="4.5" cy="12" r="1.2" fill="currentColor"/><circle cx="4.5" cy="18" r="1.2" fill="currentColor"/></svg>',
  gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2.2"/><circle cx="10" cy="17" r="2.2"/></svg>',
  prev:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  next:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  lock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>'
};

/* ---------- per-phone settings (progress, who is practising, edited details) ---------- */
const KEY = "annVisaPrep.v2";
let store = {};
try { store = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { store = {}; }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} };
store.parent = store.parent || "amma";
store.progress = store.progress || {amma:{}, nanna:{}};
store.userDetails = store.userDetails || {};
store.voice = store.voice || "female";
// speed steps per language; older installs stored "slow"/"normal" for English
store.speedSteps = store.speedSteps || {en: store.speed === "normal" ? 3 : player.DEFAULT_STEP.en, te: player.DEFAULT_STEP.te};
delete store.speed; delete store.teSpeed;
player.setVoice(store.voice);
for (const [lang, n] of Object.entries(store.speedSteps)) player.setSpeedStep(lang, n);

let pack = null, C = buildContent(null, store.userDetails), S = makeScript(C, store.parent);
function rebuild(){ C = buildContent(pack, store.userDetails); S = makeScript(C, store.parent); USAGE = null; }

const state = {tab:"today", cur:null, filter:"all", q:"", practice:null, mock:null};
const learned = () => store.progress[store.parent] || (store.progress[store.parent] = {});
const isLearned = id => !!learned()[id];
const firstUnlearned = () => (C.questions.find(q => !isLearned(q.id)) || C.questions[0]).id;

/* ---------- speaking ---------- */
function clearHl(){ document.querySelectorAll(".speaking").forEach(el => el.classList.remove("speaking")); }
player.setHooks({
  onStart(){ const np = $("#np"); if (np) np.hidden = false; },
  onEnd(){ clearHl(); const np = $("#np"); if (np) np.hidden = true; },
  onItem(it){ clearHl(); if (!it.hl) return; const el = document.querySelector(it.hl); if (el) { el.classList.add("speaking"); const d = el.closest("details"); if (d) d.open = true; } }
});
const playKey = key => {
  if (key === "vsample") return player.play(S.qmean("q1"));
  if (key === "ensample") return player.play(S.en("What is the purpose of your visit?"));
  const [k, ...args] = key.split(":"); if (S[k]) player.play(S[k](...args));
};
const stopAll = () => player.stop();

/* ---------- small pieces ---------- */
function fill(text, mode){
  return esc(text).replace(/\{(\w+)\}/g, (_, k) => {
    const v = tokVal(C, store.parent, k);
    return v ? `<span class="filled">${esc(v[mode])}</span>` : `<span class="blank">${esc(label(C, k))}</span>`;
  });
}
const plain = text => text.replace(/\{(\w+)\}/g, (_, k) => { const v = tokVal(C, store.parent, k); return v ? v.en : "..."; });
const playBtn = (key, text, cls) => `<button class="btn ${cls || "primary"}" data-play="${esc(key)}">${ICON.play} ${text}</button>`;
const engBtns = text => `<button class="btn soft" data-say="${esc(text)}" data-rate="0.62">${ICON.spk} ఇంగ్లీష్ నెమ్మదిగా</button>
  <button class="btn soft" data-say="${esc(text)}" data-rate="0.95">${ICON.spk} మామూలు వేగం</button>`;

function glossHTML(en, gid){
  return `<div class="words" data-gloss="${gid}">` + en.split(/\s+/).map((piece, i) => {
    const t = piece.match(/\{(\w+)\}/);
    if (t) {
      const v = tokVal(C, store.parent, t[1]);
      return `<button class="w tok" data-i="${i}" ${v ? `data-play="tok:${t[1]}"` : "disabled"}><span class="e">${esc(v ? v.en : "____")}</span><span class="p">${esc(v ? v.pr : "")}</span><span class="m">${esc(label(C, t[1]))}</span></button>`;
    }
    const L = lookupWord(C.dict, piece); if (!L) return "";
    const d = L.d || ["", ""];
    return `<button class="w" data-i="${i}" data-play="w:${esc(L.core)}"><span class="e">${esc(L.core)}</span><span class="p">${esc(d[0])}</span><span class="m">${esc(d[1])}</span></button>`;
  }).join("") + `</div>`;
}
const whoLabel = q => ({ask:"ఆఫీసర్ అడుగుతారు", say:"మీరు చెప్పవచ్చు", hear:"ఆఫీసర్ చెప్పవచ్చు — అర్థం చేసుకోండి"})[qType(q)];
const chipsHTML = q => `<div class="chips"><span class="chip">${esc(C.cats[q.cat][0])}</span>${q.core ? `<span class="chip core">ముఖ్యం</span>` : ""}${isLearned(q.id) ? `<span class="chip done">నేర్చుకున్నారు</span>` : ""}</div>`;
const meaningHTML = q => `<div class="lines">
    <div class="line"><span class="lab">ఇలా చదవండి</span><span class="val pr">${esc(q.pr)}</span></div>
    <div class="line"><span class="lab">అర్థం</span><span class="val">${esc(q.te)}</span></div></div>`;

function answersHTML(q){
  if (!q.ans) return "";
  return `<div class="answers"><p class="who you">${qType(q) === "hear" ? "మీరు ఇలా చెప్పండి" : "మీ సమాధానం"}</p>` + myAnswers(q, store.parent).map((a, k) => `
    <div class="ans">
      ${a.l ? `<div class="opt">${esc(a.l)}</div>` : ""}
      <div class="aen">${fill(a.en, "en")}</div>
      <div class="lines">
        <div class="line"><span class="lab">ఇలా చదవండి</span><span class="val pr">${fill(a.pr, "pr")}</span></div>
        <div class="line"><span class="lab">అర్థం</span><span class="val">${fill(a.te, "te")}</span></div>
      </div>
      <div class="listen">${playBtn(`a:${q.id}:${k}`, "పూర్తిగా వినండి")}<button class="btn soft" data-say="${esc(plain(a.en))}" data-rate="0.62">${ICON.spk} ఇంగ్లీష్ నెమ్మదిగా</button></div>
      <details class="gloss"><summary>పదం పదం అర్థం</summary>${glossHTML(a.en, `a-${q.id}-${k}`)}</details>
    </div>`).join("") + `</div>`;
}
const ctxHTML = q => q.ctx ? `<div class="ctx"><div><p class="section-t">${qType(q) === "ask" ? "ఎందుకు అడుగుతారు?" : "ఎప్పుడు, ఎందుకు?"}</p><p>${esc(q.ctx)}</p></div>
    <button class="mini" aria-label="Listen" data-play="ctx:${q.id}">${ICON.spk}</button></div>` : "";
function varsHTML(q){
  if (!q.vars || !q.vars.length) return "";
  return `<div class="vars"><div class="vars-h"><p class="section-t">ఆఫీసర్ ఇలా కూడా అడగవచ్చు</p>${playBtn(`vall:${q.id}`, "అన్నీ వినండి", "soft")}</div>${q.vars.map((v, i) => `
    <div class="var" data-var="${q.id}-${i}">
      <div class="var-top"><div><div class="e">${esc(v[0])}</div><div class="p">${esc(v[1])}</div><div class="t">${esc(q.vte[i] || "")}</div></div>
        <button class="mini" aria-label="Listen" data-play="v:${q.id}:${i}">${ICON.spk}</button></div>
      <details class="gloss"><summary>పదం పదం అర్థం</summary>${glossHTML(v[0], `v-${q.id}-${i}`)}</details>
    </div>`).join("")}</div>`;
}
const tipHTML = q => q.tip ? `<div class="tip"><span>${esc(q.tip)}</span><button class="mini" aria-label="Listen" data-play="tip:${q.id}">${ICON.spk}</button></div>` : "";

function cardHTML(q){
  const idx = C.questions.indexOf(q), done = isLearned(q.id), n = C.questions.length;
  return `<article class="card">
    <div class="card-head">${chipsHTML(q)}<span class="count">${idx + 1} / ${n}</span></div>
    <p class="who ${qType(q) === "say" ? "you" : ""}">${whoLabel(q)}</p>
    <h1 class="qen">${esc(q.en)}</h1>
    ${meaningHTML(q)}
    ${playBtn(`q:${q.id}`, "పూర్తిగా వినండి — ఇంగ్లీష్, పదం పదం అర్థం, తెలుగు అర్థం", "primary big wide")}
    <div class="listen">${engBtns(q.en)}</div>
    <details class="gloss" open><summary>పదం పదం అర్థం (పదం నొక్కితే వినిపిస్తుంది)</summary>${glossHTML(q.en, "q-" + q.id)}</details>
    ${ctxHTML(q)}${varsHTML(q)}${answersHTML(q)}${tipHTML(q)}
    <button class="btn big wide ${done ? "soft" : "ok"}" data-act="learn" data-id="${q.id}">${done ? "నేర్చుకున్నట్టు తీసేయండి" : "✓ నేర్చుకున్నాను — తరువాతది"}</button>
    <div class="nav">
      <button class="btn" data-act="step" data-d="-1" ${idx === 0 ? "disabled" : ""}>${ICON.prev} ముందుది</button>
      <button class="btn" data-act="step" data-d="1" ${idx === n - 1 ? "disabled" : ""}>తరువాతది ${ICON.next}</button>
    </div>
  </article>`;
}

/* ---------- views ---------- */
function daysLeft(){
  if (!C.interview || !C.interview.date) return null;
  const t = new Date(); t.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((new Date(C.interview.date + "T00:00:00") - t) / 86400000));
}
function viewToday(){
  if (!state.cur || !C.qmap[state.cur]) state.cur = firstUnlearned();
  const q = C.qmap[state.cur];
  const n = Object.keys(learned()).filter(id => C.qmap[id]).length, pct = Math.round(n / C.questions.length * 100);
  const days = daysLeft(), place = C.interview && C.interview.place ? C.interview.place.te + " " : "";
  return `${pack ? "" : `<button class="setup" data-act="settings">${ICON.lock}<span><b>కుటుంబ వివరాలు ఇంకా లోడ్ చేయలేదు</b><small>Family pack not loaded: answers show blanks. Tap to load it.</small></span></button>`}
    <div class="stats">
      <div class="stat"><span class="k">${days === null ? "ఇంటర్వ్యూ తేదీ" : esc(place) + "ఇంటర్వ్యూకి ఇంకా"}</span><span class="v">${days === null ? "—" : `${days} <small>రోజులు</small>`}</span></div>
      <div class="stat"><span class="k">నేర్చుకున్నవి</span><span class="v">${n} <small>/ ${C.questions.length}</small></span><div class="bar"><i style="width:${pct}%"></i></div></div>
    </div>
    ${state.cur !== firstUnlearned() ? `<button class="btn soft wide" style="margin-bottom:12px" data-act="gotoday">ఈ రోజు ప్రశ్నకు వెళ్ళండి</button>` : ""}
    ${cardHTML(q)}`;
}
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
function startPractice(){
  let ids = C.questions.filter(q => isLearned(q.id)).map(q => q.id);
  if (ids.length < 5) ids = C.questions.filter(q => q.core).map(q => q.id);
  state.practice = {deck: shuffle(ids), i: 0, show: false, got: 0, again: 0};
}
function viewPractice(){
  if (!state.practice) startPractice();
  const P = state.practice;
  const head = `<div class="panel-h"><h2>ప్రాక్టీస్</h2><p>ఇంగ్లీష్ ప్రశ్న మాత్రమే. ముందు మీరే జవాబు చెప్పండి, తర్వాత చూడండి.</p></div>`;
  if (P.i >= P.deck.length) return head + `<div class="card center"><div class="big-num">${P.got}</div><p class="section-t">వచ్చినవి · మళ్ళీ చూడాల్సినవి ${P.again}</p>
      <button class="btn big primary" data-act="practice-restart">మళ్ళీ మొదలుపెట్టండి</button></div>`;
  const q = C.qmap[P.deck[P.i]];
  return head + `<article class="card">
    <div class="card-head">${chipsHTML(q)}<span class="count">${P.i + 1} / ${P.deck.length}</span></div>
    <p class="who">${whoLabel(q)}</p>
    <h1 class="qen">${esc(q.en)}</h1>
    <div class="listen">${engBtns(q.en)}</div>
    ${P.show ? `${meaningHTML(q)}${playBtn(`q:${q.id}`, "పూర్తిగా వినండి", "primary wide")}${answersHTML(q)}
      <div class="nav"><button class="btn big" data-act="rate" data-v="again">↻ మళ్ళీ చూడాలి</button>
      <button class="btn big ok" data-act="rate" data-v="got">✓ వచ్చింది</button></div>`
    : `<button class="btn big primary wide" data-act="reveal">అర్థం, సమాధానం చూపించు</button>`}
  </article>`;
}
function startMock(){
  const fixed = ["q1", "q2", "q3"].filter(id => C.qmap[id]);
  const pool = C.questions.filter(q => qType(q) === "ask" && !fixed.includes(q.id) && q.cat !== "start" && q.id !== "q5");
  const pick = shuffle([...shuffle(pool.filter(q => q.core)).slice(0, 5), ...shuffle(pool.filter(q => !q.core)).slice(0, 2)]).slice(0, 6).map(q => q.id);
  state.mock = {list: [...fixed, "q5", ...pick, "o4"].filter(id => C.qmap[id]), i: 0, te: false, ans: false};
}
function viewMock(){
  const head = `<div class="panel-h"><h2>మాక్ ఇంటర్వ్యూ</h2><p>నిజమైన కిటికీ దగ్గర లాగే: ఆఫీసర్ మాట్లాడతారు, మీరు గట్టిగా జవాబు చెప్పండి.</p></div>`;
  const M = state.mock;
  if (!M) return head + `<div class="card center"><p class="note">సుమారు 10 ప్రశ్నలు. ప్రతి రోజు ఒకసారి చేయండి. అమ్మా, నాన్న ఒకరికొకరు ఆఫీసర్‌లా అడగవచ్చు.</p>
      <button class="btn big primary" data-act="mock-start">${ICON.spk} ఇంటర్వ్యూ మొదలుపెట్టండి</button></div>`;
  if (M.i >= M.list.length) return head + `<div class="card center"><div class="big-num">✓</div><p class="section-t">ఇంటర్వ్యూ పూర్తయింది. చాలా బాగుంది!</p>
      <button class="btn big primary" data-act="mock-start">మళ్ళీ చేయండి</button></div>`;
  const q = C.qmap[M.list[M.i]];
  return head + `<div class="dots">${M.list.map((_, k) => `<i class="${k < M.i ? "on" : k === M.i ? "cur" : ""}"></i>`).join("")}</div>
  <article class="card">
    <div class="mock-q"><p class="who">ఆఫీసర్</p><h1 class="qen">${esc(q.en)}</h1></div>
    <div class="listen"><button class="btn primary" data-say="${esc(q.en)}" data-rate="0.95">${ICON.spk} మళ్ళీ వినండి</button>
      <button class="btn soft" data-say="${esc(q.en)}" data-rate="0.62">${ICON.spk} నెమ్మదిగా</button></div>
    ${M.te ? meaningHTML(q) + playBtn(`qmean:${q.id}`, "తెలుగు అర్థం మళ్ళీ వినండి", "soft") : ""}
    ${M.ans ? answersHTML(q) : ""}
    <div class="nav">${!M.te ? `<button class="btn" data-act="mock-te">తెలుగు అర్థం</button>` : ""}${!M.ans && q.ans ? `<button class="btn" data-act="mock-ans">సమాధానం</button>` : ""}</div>
    <button class="btn big ok wide" data-act="mock-next">తరువాత ప్రశ్న ${ICON.next}</button>
  </article>`;
}
let USAGE = null;
function usage(){
  if (USAGE) return USAGE;
  USAGE = {};
  const add = (t, id) => t.replace(/\{\w+\}/g, " ").split(/\s+/).forEach(w => { const L = lookupWord(C.dict, w); if (L && L.key) (USAGE[L.key] = USAGE[L.key] || new Set()).add(id); });
  C.questions.forEach(q => { add(q.en, q.id); (q.vars || []).forEach(v => add(v[0], q.id)); myAnswers(q, store.parent).forEach(a => add(a.en, q.id)); });
  return USAGE;
}
function dictRows(){
  const U = usage(), raw = state.q.trim(), s = raw.toLowerCase();
  const words = Object.keys(C.dict).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .filter(w => !s || w.toLowerCase().includes(s) || C.dict[w][0].includes(raw) || C.dict[w][1].includes(raw));
  let last = "", rows = "";
  for (const w of words) {
    const L = w[0].toUpperCase();
    if (L !== last && !s) { rows += `<div class="letter">${esc(L)}</div>`; last = L; }
    const n = U[w] ? U[w].size : 0;
    rows += `<div class="drow"><div><span class="e">${esc(w)}</span><span class="p">${esc(C.dict[w][0])}</span></div>
      <button class="mini" aria-label="Listen to ${esc(w)}" data-play="w:${esc(w)}">${ICON.spk}</button>
      <div class="m">${esc(C.dict[w][1])}${n ? ` <span class="u">· ${n} ప్రశ్నల్లో</span>` : ""}</div></div>`;
  }
  return rows || `<div class="empty">ఆ పదం లేదు</div>`;
}
const viewDict = () => `<div class="panel-h"><h2>నిఘంటువు</h2><p>ప్రశ్నలు, సమాధానాల్లో ఉన్న ${Object.keys(C.dict).length} ఇంగ్లీష్ పదాలు. స్పీకర్ నొక్కితే ఇంగ్లీష్ పదం, తర్వాత తెలుగు అర్థం వినిపిస్తాయి.</p></div>
    <input class="search" id="dsearch" type="search" placeholder="వెతకండి · Search (e.g. visit, ఇల్లు)" value="${esc(state.q)}">
    <div class="dlist" id="dlist">${dictRows()}</div>`;
function viewAll(){
  const cats = ["all", ...Object.keys(C.cats)];
  const list = C.questions.filter(q => state.filter === "all" || q.cat === state.filter);
  return `<div class="panel-h"><h2>అన్ని ప్రశ్నలు</h2><p>${C.questions.length} ప్రశ్నలు, మాటలు. ఏదైనా నొక్కితే పూర్తి వివరణ తెరుచుకుంటుంది.</p></div>
    <div class="filters">${cats.map(c => `<button data-act="filter" data-c="${c}" aria-pressed="${state.filter === c}">${c === "all" ? "అన్నీ" : esc(C.cats[c][0])}</button>`).join("")}</div>
    <div class="qlist">${list.map(q => `<button class="qrow" data-act="open" data-id="${q.id}">
      <span class="tick ${isLearned(q.id) ? "on" : ""}">${isLearned(q.id) ? "✓" : ""}</span>
      <span><div class="e">${esc(q.en)}</div><div class="t">${esc(q.te)}</div></span></button>`).join("")}</div>`;
}

/* ---------- settings: family pack + details ---------- */
const SPEED_LABELS = ["చాలా నెమ్మది", "నెమ్మది", "మధ్యస్థం", "మామూలు", "వేగం"];
const speedPicker = (lang, title, sample) => `<section class="packbox">
      <p class="fl">${ICON.spk} ${title}</p>
      <div class="steps" role="group" aria-label="${esc(title)}">${SPEED_LABELS.map((l, i) =>
        `<button data-act="speedstep" data-lang="${lang}" data-n="${i}" aria-pressed="${store.speedSteps[lang] === i}"><i style="height:${8 + i * 5}px"></i><span>${l}</span></button>`).join("")}</div>
      <button class="btn soft" data-play="${sample}">${ICON.play} వినండి · Listen</button>
    </section>`;
function openSettings(msg){
  const keys = DETAIL_KEYS.filter(k => C.labels[k]);
  $("#modal").innerHTML = `<div class="overlay" data-act="close-bg"><div class="sheet" role="dialog" aria-label="Settings">
    <h3>కుటుంబ వివరాలు</h3>
    <section class="packbox">
      <p class="fl">${ICON.lock} Family pack</p>
      ${pack ? `<p class="note ok-t">లోడ్ అయింది${pack.family ? ` · ${esc(pack.family)}` : ""}. Loaded on this phone only.</p>` : `<p class="note">The private answers file your son or daughter sends. Pick the file, type the passphrase, then tap Load. It stays on this phone and is never uploaded.</p>`}
      <input id="pack-file" type="file" accept=".json,.annvisa,application/json">
      <input id="pack-pass" type="password" autocomplete="off" placeholder="Passphrase">
      <div class="nav"><button class="btn primary" data-act="pack-load">లోడ్ చేయండి · Load</button>${pack ? `<button class="btn" data-act="pack-remove">తీసేయండి · Remove</button>` : ""}</div>
      ${msg ? `<p class="note ${msg.ok ? "ok-t" : "err-t"}">${esc(msg.text)}</p>` : ""}
    </section>
    <section class="packbox">
      <p class="fl">${ICON.spk} తెలుగు గొంతు · Telugu voice</p>
      <div class="seg wide-seg" role="group" aria-label="Telugu voice">
        <button data-act="voice" data-v="female" aria-pressed="${store.voice === "female"}">స్త్రీ గొంతు</button>
        <button data-act="voice" data-v="male" aria-pressed="${store.voice === "male"}">పురుష గొంతు</button>
      </div>
      <button class="btn soft" data-play="vsample">${ICON.play} వినండి · Listen</button>
    </section>
    ${speedPicker("te", "తెలుగు వేగం · Telugu speed", "vsample")}
    ${speedPicker("en", "ఇంగ్లీష్ వేగం · English speed", "ensample")}
    <details class="gloss"><summary>వివరాలు మార్చండి · Edit details on this phone</summary>
      <p class="note">ఇక్కడ మార్చినవి ఈ ఫోన్‌లో మాత్రమే. Changed details play with the phone's own voice until the pack is rebuilt.</p>
      <div class="fgrid">${keys.map(k => { const d = C.details[k] || {en:"", te:""}; return `<div class="field"><span class="fl">${esc(C.labels[k][0])}<small>${esc(C.labels[k][1])}</small></span>
        <div class="pair"><input id="f-${k}-en" lang="en" placeholder="English" value="${esc(d.en)}"><input id="f-${k}-te" lang="te" placeholder="తెలుగు" value="${esc(d.te)}"></div></div>`; }).join("")}</div>
      <div class="nav"><button class="btn primary" data-act="save-details">సేవ్ చేయండి</button></div>
    </details>
    <button class="btn big wide" data-act="close">మూసేయండి · Close</button>
  </div></div>`;
}
async function loadPackFromForm(){
  const f = $("#pack-file").files[0], pass = $("#pack-pass").value;
  if (!f || !pass) return openSettings({ok: false, text: "Pick the pack file and type the passphrase."});
  const btn = document.querySelector('[data-act="pack-load"]'); if (btn) { btn.disabled = true; btn.textContent = "…"; }
  try {
    const p = await packStore.decryptPack(await f.text(), pass);
    await packStore.savePack(p);
    usePack(p);
    openSettings({ok: true, text: "Loaded. కుటుంబ వివరాలు లోడ్ అయ్యాయి."});
  } catch (e) {
    openSettings({ok: false, text: e.message === "passphrase" ? "Wrong passphrase. పాస్‌వర్డ్ తప్పు." : "This is not a family pack file."});
  }
}
function usePack(p){ pack = p; player.setPackClips(p ? p.clips : null); rebuild(); state.practice = null; render(true); }

/* ---------- render + events ---------- */
const TABS = [["today", "ఈ రోజు", ICON.today], ["practice", "ప్రాక్టీస్", ICON.cards], ["mock", "మాక్ ఇంటర్వ్యూ", ICON.mock], ["dict", "నిఘంటువు", ICON.dict], ["all", "అన్నీ", ICON.list]];
function render(keepScroll){
  const views = {today: viewToday, practice: viewPractice, mock: viewMock, dict: viewDict, all: viewAll};
  $("#app").innerHTML = `<header class="top">
      <div class="brand"><b>Visa Interview Prep</b><span>B1/B2 వీసా ఇంటర్వ్యూ సాధన</span></div>
      <div class="top-r">
        <div class="seg" role="group" aria-label="Who is practising">
          <button data-act="parent" data-p="amma" aria-pressed="${store.parent === "amma"}">అమ్మ</button>
          <button data-act="parent" data-p="nanna" aria-pressed="${store.parent === "nanna"}">నాన్న</button>
        </div>
        <button class="iconbtn" data-act="settings" aria-label="Family pack and details">${ICON.gear}</button>
      </div></header>` + views[state.tab]();
  $("#tabs").innerHTML = TABS.map(t => `<button class="tab" data-act="tab" data-t="${t[0]}" ${state.tab === t[0] ? 'aria-current="page"' : ""}>${t[2]}<span>${t[1]}</span></button>`).join("");
  if (!keepScroll) window.scrollTo(0, 0);
}

document.addEventListener("click", e => {
  const pl = e.target.closest("[data-play]");
  if (pl) { playKey(pl.dataset.play); return; }
  const s = e.target.closest("[data-say]");
  if (s) { player.play([{t: s.dataset.say, l: "en", r: parseFloat(s.dataset.rate)}]); return; }
  const b = e.target.closest("[data-act]"); if (!b) return;
  const a = b.dataset.act;
  if (a === "close-bg" && e.target !== b) return;
  switch (a) {
    case "tab": state.tab = b.dataset.t; stopAll(); render(); break;
    case "stop": stopAll(); break;
    case "parent": store.parent = b.dataset.p; save(); S = makeScript(C, store.parent); USAGE = null; state.cur = null; state.practice = null; stopAll(); render(true); break;
    case "step": { stopAll(); const i = C.questions.findIndex(q => q.id === state.cur) + (+b.dataset.d); if (C.questions[i]) { state.cur = C.questions[i].id; render(); } break; }
    case "learn": { const id = b.dataset.id, L = learned();
      if (L[id]) { delete L[id]; save(); render(true); }
      else { L[id] = new Date().toISOString().slice(0, 10); save(); state.cur = firstUnlearned(); stopAll(); render(); }
      break; }
    case "gotoday": state.cur = firstUnlearned(); render(); break;
    case "open": state.cur = b.dataset.id; state.tab = "today"; render(); break;
    case "filter": state.filter = b.dataset.c; render(true); break;
    case "reveal": state.practice.show = true; render(true); break;
    case "rate": { const P = state.practice; if (b.dataset.v === "got") P.got++; else { P.again++; P.deck.push(P.deck[P.i]); } P.i++; P.show = false; stopAll(); render(); break; }
    case "practice-restart": startPractice(); render(); break;
    case "mock-start": startMock(); render(); player.play(S.en(C.qmap[state.mock.list[0]].en)); break;
    case "mock-te": state.mock.te = true; render(true); playKey("qmean:" + state.mock.list[state.mock.i]); break;
    case "mock-ans": state.mock.ans = true; render(true); break;
    case "mock-next": { stopAll(); const M = state.mock; M.i++; M.te = false; M.ans = false; render(); if (M.i < M.list.length) player.play(S.en(C.qmap[M.list[M.i]].en)); break; }
    case "settings": openSettings(); break;
    case "speedstep": { const lang = b.dataset.lang, n = +b.dataset.n;
      store.speedSteps[lang] = n; save(); player.setSpeedStep(lang, n); openSettings(); playKey(lang === "en" ? "ensample" : "vsample"); break; }
    case "voice": store.voice = b.dataset.v; save(); player.setVoice(store.voice); openSettings(); playKey("vsample"); break;
    case "close": case "close-bg": $("#modal").innerHTML = ""; break;
    case "pack-load": loadPackFromForm(); break;
    case "pack-remove": packStore.removePack().then(() => { usePack(null); openSettings({ok: true, text: "Removed from this phone."}); }); break;
    case "save-details": {
      for (const k of DETAIL_KEYS) {
        const en = $(`#f-${k}-en`), te = $(`#f-${k}-te`); if (!en) continue;
        const base = (pack && pack.details && pack.details[k]) || {en: "", te: ""};
        const v = {en: en.value.trim(), te: te.value.trim()};
        if (v.en === (base.en || "") && v.te === (base.te || "")) delete store.userDetails[k]; else store.userDetails[k] = v;
      }
      save(); rebuild(); $("#modal").innerHTML = ""; render(true); break; }
  }
});
document.addEventListener("input", e => { if (e.target.id === "dsearch") { state.q = e.target.value; $("#dlist").innerHTML = dictRows(); } });

render();
packStore.loadSaved().then(p => { if (p) usePack(p); });
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
