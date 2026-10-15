# అమ్మ-నాన్న వీసా సాధన · Amma Nanna Visa Prep

Daily practice for a US B1/B2 visitor-visa interview, made for Telugu speakers who are learning English.
One question at a time: the officer's English question, how to say it in Telugu letters, its Telugu
meaning, a word-by-word dictionary, why the officer asks it, other ways it may be asked, and your answer.
Everything can be **listened to**: English and Telugu audio is pre-recorded and built into the app,
so it does not depend on the phone's own voices and works offline.

**Install on a phone**
- Android (Chrome): open the site → ⋮ menu → *Install app* / *Add to Home screen*.
- iPhone (Safari): open the site → Share → *Add to Home Screen*.

**Your family's answers (private)**
The public app ships with example answers only. Your real answers live in an encrypted
*family pack* file that is never put on GitHub:
1. Open the app → ⚙ (top right) → *Family pack*.
2. Pick the pack file you were sent, type the passphrase, tap *Load*.
The pack is decrypted on the phone and kept only there. See [PRIVACY.md](PRIVACY.md).

## For the maintainer
```
git config core.hooksPath tools/hooks          # once: privacy check before every commit
node tools/collect-texts.mjs > /tmp/public.jsonl
python3 tools/make_audio.py /tmp/public.jsonl audio --lang te   # Telugu female voice (AI4Bharat model)
python3 tools/make_audio.py /tmp/public.jsonl audio --lang te --voice male   # Telugu male voice
python3 tools/make_audio.py /tmp/public.jsonl audio --lang en   # English clips
node tools/build_site.mjs                       # refresh audio index + offline cache
python3 tools/privacy_check.py                  # must pass before pushing
```
Family pack (local only, in the git-ignored `family/` folder):
```
node tools/collect-texts.mjs family/family.json > /tmp/family.jsonl
python3 tools/make_audio.py /tmp/family.jsonl family/audio --lang te
python3 tools/make_audio.py /tmp/family.jsonl family/audio --lang te --voice male
python3 tools/make_audio.py /tmp/family.jsonl family/audio --lang en
python3 tools/build_pack.py family/family.json family/audio family/out/family-pack.json
```
Restore the private sources in a fresh workspace from the pack you already have:
```
python3 tools/unpack_pack.py family-pack.json family/
```
`main` is protected: publish changes through a branch and pull request; the Privacy check must pass before merging.

Content lives in `js/content/` (questions, dictionary, context); spoken wording in `js/speech-script.js`.

This app is a practice aid, not legal or immigration advice. Answers must always be truthful and match the DS-160.
