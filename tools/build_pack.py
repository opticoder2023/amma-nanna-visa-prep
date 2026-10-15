#!/usr/bin/env python3
"""Builds the encrypted family pack (personal answers + their audio). Never commit its inputs or output.

  python3 tools/build_pack.py family/family.json family/audio family/out/kottana-family-pack.json

Prompts for a passphrase (or reads PACK_PASSPHRASE). Only clips the public app does not already
ship are embedded. The output is AES-256-GCM encrypted with a PBKDF2-SHA256 key.
"""
import base64, getpass, json, os, subprocess, sys
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

ITERATIONS = 310_000
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def main():
    if len(sys.argv) != 4: sys.exit(__doc__)
    src, audio_dir, out = sys.argv[1:]
    pack = json.load(open(src))
    needed = [json.loads(l) for l in subprocess.check_output(["node", os.path.join(ROOT, "tools/collect-texts.mjs"), src], text=True).splitlines()]
    public = {json.loads(l)["id"] for l in subprocess.check_output(["node", os.path.join(ROOT, "tools/collect-texts.mjs")], text=True).splitlines()}
    clips, missing = {"te": {}, "te-m": {}, "en": {}}, []
    for x in needed:
        if x["id"] in public: continue
        for d in (["te", "te-m"] if x["lang"] == "te" else [x["lang"]]):
            f = os.path.join(audio_dir, d, x["id"] + ".mp3")
            if os.path.exists(f): clips[d][x["id"]] = base64.b64encode(open(f, "rb").read()).decode()
            elif d != "te-m": missing.append(x)
    if missing:
        print(f"{len(missing)} personal clips are not recorded yet; run tools/make_audio.py first. Those lines fall back to the phone's voice.", file=sys.stderr)
    pack["format"] = "amma-nanna-visa-pack"
    pack["clips"] = clips
    pw = os.environ.get("PACK_PASSPHRASE") or getpass.getpass("Passphrase for the pack: ")
    if len(pw) < 8: sys.exit("Use a passphrase of at least 8 characters.")
    salt, iv = os.urandom(16), os.urandom(12)
    key = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt, iterations=ITERATIONS).derive(pw.encode())
    data = AESGCM(key).encrypt(iv, json.dumps(pack, ensure_ascii=False).encode(), None)
    b = lambda v: base64.b64encode(v).decode()
    os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
    json.dump({"format": "amma-nanna-visa-pack-encrypted", "v": 1,
               "kdf": {"name": "PBKDF2", "hash": "SHA-256", "iterations": ITERATIONS, "salt": b(salt)},
               "iv": b(iv), "data": b(data)}, open(out, "w"))
    print(f"Wrote {out}: " + ", ".join(f"{len(v)} {k}" for k, v in clips.items()) + f" personal clips, {os.path.getsize(out)//1024} KB")

if __name__ == "__main__":
    main()
