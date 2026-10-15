#!/usr/bin/env python3
"""Restores the private family sources from an encrypted family pack (e.g. in a new workspace).

  python3 tools/unpack_pack.py kottana-family-pack.json family/

Writes family/family.json and family/audio/{te,te-m,en}/*.mp3 (git-ignored). Asks for the passphrase
(or reads PACK_PASSPHRASE). Then edit family/family.json and rebuild with tools/build_pack.py.
"""
import base64, getpass, json, os, sys
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

def main():
    if len(sys.argv) != 3: sys.exit(__doc__)
    src, out = sys.argv[1:]
    w = json.load(open(src))
    if w.get("format") != "amma-nanna-visa-pack-encrypted": sys.exit("Not an encrypted family pack.")
    pw = os.environ.get("PACK_PASSPHRASE") or getpass.getpass("Passphrase: ")
    b = base64.b64decode
    key = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=b(w["kdf"]["salt"]), iterations=w["kdf"]["iterations"]).derive(pw.encode())
    try: pack = json.loads(AESGCM(key).decrypt(b(w["iv"]), b(w["data"]), None))
    except Exception: sys.exit("Wrong passphrase.")
    clips = pack.pop("clips", {})
    os.makedirs(out, exist_ok=True)
    json.dump(pack, open(os.path.join(out, "family.json"), "w"), ensure_ascii=False, indent=1)
    n = 0
    for d, items in clips.items():
        os.makedirs(os.path.join(out, "audio", d), exist_ok=True)
        for cid, data in items.items():
            open(os.path.join(out, "audio", d, cid + ".mp3"), "wb").write(b(data)); n += 1
    print(f"Restored {os.path.join(out, 'family.json')} and {n} personal clips.")

if __name__ == "__main__":
    main()
