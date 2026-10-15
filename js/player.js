// Plays a spoken script: pre-recorded clips first (family pack, then the app's own audio),
// the phone's built-in voice only as a last resort for text that has no clip (e.g. details typed on the phone).
import { clipId } from "./speech-script.js";
import { PUBLIC_CLIPS } from "../audio/index.js";

const builtIn = Object.fromEntries(Object.entries(PUBLIC_CLIPS).map(([k, v]) => [k, new Set(v)]));
const packUrls = { te: new Map(), "te-m": new Map(), en: new Map() };
let teDir = "te";
/** "female" (default) or "male" Telugu voice; falls back to the other voice when a clip is missing. */
export function setVoice(v){ teDir = v === "male" ? "te-m" : "te"; }
const audio = new Audio();
audio.preload = "auto";
try { audio.preservesPitch = true; } catch (e) {}

let enVoice = null, teVoice = null;
function pickVoices(){
  try {
    const vs = speechSynthesis.getVoices();
    enVoice = vs.find(v => v.lang === "en-US" && /Google US|Samantha|Aria|Jenny/i.test(v.name)) || vs.find(v => v.lang === "en-US") || null;
    teVoice = vs.find(v => /^te/i.test(v.lang)) || null;
  } catch (e) {}
}
try { pickVoices(); speechSynthesis.onvoiceschanged = pickVoices; } catch (e) {}

/** clips: {"te": {id: base64 mp3}, "te-m": {...}, "en": {...}} from the family pack. */
export function setPackClips(clips){
  for (const m of Object.values(packUrls)) { for (const u of m.values()) URL.revokeObjectURL(u); m.clear(); }
  for (const [dir, set] of Object.entries(clips || {})) {
    if (!packUrls[dir]) continue;
    for (const [id, b64] of Object.entries(set)) {
      const bin = atob(b64), bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      packUrls[dir].set(id, URL.createObjectURL(new Blob([bytes], {type: "audio/mpeg"})));
    }
  }
}
function urlFor(it){
  const id = clipId(it.l, it.t);
  const dirs = it.l === "te" ? [teDir, teDir === "te" ? "te-m" : "te"] : [it.l];
  for (const d of dirs) if (packUrls[d] && packUrls[d].has(id)) return packUrls[d].get(id);
  for (const d of dirs) if (builtIn[d] && builtIn[d].has(id)) return `audio/${d}/${id}.mp3`;
  return null;
}
export const hasClip = it => !!urlFor(it);

let runId = 0;
let hooks = { onStart(){}, onEnd(){}, onItem(){} };
export function setHooks(h){ hooks = {...hooks, ...h}; }

export function stop(){
  runId++;
  try { audio.pause(); } catch (e) {}
  try { speechSynthesis.cancel(); } catch (e) {}
  hooks.onEnd();
}

export function play(items){
  stop();
  const id = runId; let i = 0;
  hooks.onStart();
  const next = () => {
    if (id !== runId) return;
    if (i >= items.length) { hooks.onEnd(); return; }
    const it = items[i++];
    hooks.onItem(it);
    if (it.pause) { setTimeout(next, it.pause); return; }
    if (!it.t) { next(); return; }
    let done = false;
    const fin = () => { if (done || id !== runId) return; done = true; setTimeout(next, it.gap != null ? it.gap : 300); };
    const url = urlFor(it);
    if (url) {
      audio.onended = fin; audio.onerror = fin;
      audio.src = url;
      audio.playbackRate = it.l === "en" ? Math.max(0.6, Math.min(1.1, (it.r || 0.9) / 0.9)) : 1;
      const p = audio.play(); if (p && p.catch) p.catch(fin);
      return;
    }
    try {
      const u = new SpeechSynthesisUtterance(it.t);
      if (it.l === "te") { u.lang = "te-IN"; if (teVoice) u.voice = teVoice; u.rate = 0.9; }
      else { u.lang = "en-US"; if (enVoice) u.voice = enVoice; u.rate = it.r || 0.9; }
      u.onend = fin; u.onerror = fin;
      speechSynthesis.speak(u);
    } catch (e) { fin(); }
  };
  next();
}
