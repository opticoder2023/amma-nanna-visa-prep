#!/usr/bin/env python3
"""Blocks personal family data from reaching the public repository.

Runs as a git pre-commit hook (tools/hooks/pre-commit, checks staged files) and in GitHub Actions
(checks every tracked file). Fails when it finds:
  * anything under family/ or any family-pack file
  * emails, phone numbers, passport / PAN / Aadhaar / DS-160-style numbers, street addresses, birth dates
  * any value from your local family/family.json (names, places, employer...) — local runs only
  * an audio clip that is not one of the app's public clips (a personal clip copied into audio/)

  python3 tools/privacy_check.py            # all tracked files
  python3 tools/privacy_check.py --staged   # files staged for commit
"""
import json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEXT_EXT = {".js", ".mjs", ".py", ".html", ".css", ".json", ".webmanifest", ".md", ".txt", ".yml", ".yaml", ".sh", ""}
SKIP_TEXT = {"tools/privacy_check.py"}  # contains the patterns themselves

PATTERNS = {
    "email address": re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"),
    "phone number": re.compile(r"(?<![\w.])(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}|\d{5}[\s-]?\d{5})(?![\w.])"),
    "passport number": re.compile(r"\b[A-Z]{1,2}\d{7}\b"),
    "PAN number": re.compile(r"\b[A-Z]{5}\d{4}[A-Z]\b"),
    "Aadhaar number": re.compile(r"\b\d{4}\s\d{4}\s\d{4}\b"),
    "DS-160 / application id": re.compile(r"\bAA00[A-Z0-9]{6}\b"),
    "visa fee receipt": re.compile(r"\bIND[A-Z0-9]{8}\b"),
    "street address": re.compile(r"\b\d{2,5}\s+(?:N|S|E|W|NE|NW|SE|SW|North|South|East|West|Northeast|Northwest|Southeast|Southwest)\s+\d{1,3}(?:st|nd|rd|th)\b", re.I),
    "date of birth": re.compile(r"\b(?:0?[1-9]|[12]\d|3[01])(?:st|nd|rd|th)?\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+(?:19[2-9]\d)\b"),
}
ALLOW = [re.compile(r"noreply@anthropic\.com")]

def tracked(staged):
    if staged:
        out = subprocess.check_output(["git", "diff", "--cached", "--name-only", "--diff-filter=ACMR"], cwd=ROOT, text=True)
    else:
        out = subprocess.check_output(["git", "ls-files"], cwd=ROOT, text=True)
    return [f for f in out.splitlines() if f]

def family_terms():
    p = os.path.join(ROOT, "family", "family.json")
    if not os.path.exists(p): return []
    pack = json.load(open(p))
    terms = set()
    def add(v):
        for part in re.split(r"[,]", v or ""):
            part = part.strip()
            if len(part) >= 4 and not part.isdigit(): terms.add(part)
    for v in pack.get("details", {}).values(): add(v.get("en")); add(v.get("te"))
    add(pack.get("family"))
    for w in pack.get("dictionary", {}): add(w)
    generic = {"about", "Andhra Pradesh", "ఆంధ్రప్రదేశ్", "teacher", "టీచర్", "product manager", "ప్రోడక్ట్ మేనేజర్", "one month", "ఒక నెల"}
    return sorted(t for t in terms if t not in generic)

def public_clip_ids():
    out = subprocess.check_output(["node", os.path.join(ROOT, "tools", "collect-texts.mjs")], cwd=ROOT, text=True)
    return {json.loads(l)["id"] for l in out.splitlines()}

def main():
    staged = "--staged" in sys.argv
    files = tracked(staged)
    terms = family_terms()
    problems = []
    audio = [f for f in files if re.match(r"audio/(te|te-m|en)/[0-9a-f]+\.mp3$", f)]
    if audio:
        pub = public_clip_ids()
        for f in audio:
            if os.path.basename(f)[:-4] not in pub:
                problems.append((f, "audio clip that is not part of the public app (personal clip?)"))
    for f in files:
        if f.startswith("family/") or "family-pack" in f or f.endswith(".annvisa"):
            problems.append((f, "private family file")); continue
        if f in SKIP_TEXT or os.path.splitext(f)[1] not in TEXT_EXT: continue
        path = os.path.join(ROOT, f)
        if not os.path.isfile(path): continue
        try: text = open(path, encoding="utf-8").read()
        except UnicodeDecodeError: continue
        if "amma-nanna-visa-pack-encrypted" in text and '"data"' in text and f.endswith(".json"):
            problems.append((f, "encrypted family pack")); continue
        for name, rx in PATTERNS.items():
            for m in rx.finditer(text):
                if any(a.search(m.group(0)) for a in ALLOW): continue
                problems.append((f, f"{name}: {m.group(0)!r}"))
        for t in terms:
            if t in text: problems.append((f, f"family detail: {t!r}"))
    if problems:
        print("Privacy check FAILED. These would make personal data public:\n")
        for f, why in problems: print(f"  {f}: {why}")
        print("\nMove personal content into family/family.json (never committed) and rebuild the pack.")
        sys.exit(1)
    print(f"Privacy check passed ({len(files)} files{', with family terms' if terms else ''}).")

if __name__ == "__main__":
    main()
