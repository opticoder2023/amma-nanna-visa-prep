#!/usr/bin/env python3
"""Pre-records the app's voice clips.

  node tools/collect-texts.mjs > clips.jsonl
  python3 tools/make_audio.py clips.jsonl audio/ --lang te                 # female -> audio/te
  python3 tools/make_audio.py clips.jsonl audio/ --lang te --voice male    # male   -> audio/te-m

Telugu: AI4Bharat Indic-TTS FastPitch + HiFi-GAN (te.zip from github.com/AI4Bharat/Indic-TTS releases),
        unzipped to $TE_MODEL_DIR (default ~/tts/te).
English: Coqui TTS "tts_models/en/ljspeech/vits" (LJ Speech, public domain data; needs espeak-ng).
Clips already present are skipped, so re-running only records what changed.
"""
import argparse, json, os, re, subprocess, sys, tempfile, warnings
warnings.filterwarnings("ignore")

def load_te(model_dir):
    from TTS.utils.synthesizer import Synthesizer
    cfg = os.path.join(model_dir, "fastpitch", "config.json")
    spk = os.path.join(model_dir, "fastpitch", "speakers.pth")
    c = json.load(open(cfg))
    if c.get("speakers_file") != spk or c.get("model_args", {}).get("speakers_file", spk) != spk:
        c["speakers_file"] = spk
        if "model_args" in c: c["model_args"]["speakers_file"] = spk
        json.dump(c, open(cfg, "w"), indent=1)
    return Synthesizer(tts_checkpoint=os.path.join(model_dir, "fastpitch", "best_model.pth"), tts_config_path=cfg,
                       tts_speakers_file=spk, vocoder_checkpoint=os.path.join(model_dir, "hifigan", "best_model.pth"),
                       vocoder_config=os.path.join(model_dir, "hifigan", "config.json"), use_cuda=False)

def clean(t):
    """Collapse punctuation runs such as '?,' that leave empty fragments for the model."""
    t = re.sub(r"([?!.])\s*[,.]+", r"\1", t)
    return re.sub(r",\s*,+", ",", t).strip()

def is_word(t):
    """One or two words without sentence punctuation (dictionary entries, names)."""
    return len(t.split()) <= 2 and not re.search(r"[.?!]", t)

def voice_dir(lang, voice):
    """te = female Telugu, te-m = male Telugu, en = English."""
    return "te-m" if lang == "te" and voice == "male" else lang

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("clips"); ap.add_argument("outdir")
    ap.add_argument("--lang", required=True, choices=["te", "en"])
    ap.add_argument("--voice", default="female", choices=["female", "male"])
    ap.add_argument("--threads", type=int, default=1)
    a = ap.parse_args()
    import torch; torch.set_num_threads(a.threads)
    out = os.path.join(a.outdir, voice_dir(a.lang, a.voice)); os.makedirs(out, exist_ok=True)
    todo = [x for x in map(json.loads, open(a.clips)) if x["lang"] == a.lang and not os.path.exists(os.path.join(out, x["id"] + ".mp3"))]
    print(f"{a.lang}: {len(todo)} clips to record", flush=True)
    if not todo: return
    if a.lang == "te":
        syn = load_te(os.environ.get("TE_MODEL_DIR", os.path.expanduser("~/tts/te")))
        def say(t):
            # a little slower than the model's default; the app's speed setting adjusts from here
            syn.tts_model.length_scale = 1.25 if is_word(t) else 1.15
            return syn.tts(t, speaker_name=a.voice)
        save = syn.save_wav
    else:
        from TTS.api import TTS
        tts = TTS("tts_models/en/ljspeech/vits"); syn = tts.synthesizer
        def say(t):
            # recorded slowly on purpose (learners): single words slowest, sentences a little slow
            syn.tts_model.length_scale = 1.6 if is_word(t) else 1.25
            return syn.tts(t)
        save = syn.save_wav
    for i, x in enumerate(todo, 1):
        with tempfile.NamedTemporaryFile(suffix=".wav") as w:
            text = clean(x["say"])
            try:
                save(say(text), w.name)
            except Exception:
                try:  # very short fragments between punctuation can trip the model; retry as one phrase
                    save(say(re.sub(r"[?!.,]+", ",", text).strip(", ") + "."), w.name)
                except Exception as e:
                    print("FAILED", x["id"], x["say"], e, file=sys.stderr); continue
            # trim edge silence, normalise loudness, small mono mp3
            pre, post = (0.15, 0.35) if is_word(x["say"]) else (0.1, 0.3)
            # trim long silences but keep a little, so word endings are never clipped; then add breathing room
            af = ("silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.08,areverse,"
                  "silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.2,areverse,"
                  f"loudnorm=I=-18:TP=-2,adelay={int(pre * 1000)},apad=pad_dur={post}")
            subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", w.name, "-af", af,
                            "-ar", "22050", "-ac", "1", "-c:a", "libmp3lame", "-q:a", "7", os.path.join(out, x["id"] + ".mp3")], check=True)
        if i % 50 == 0: print(f"{a.lang}: {i}/{len(todo)}", flush=True)
    print(f"{a.lang}: done", flush=True)

if __name__ == "__main__":
    main()
