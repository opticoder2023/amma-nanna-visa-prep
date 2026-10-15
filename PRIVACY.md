# Privacy

- **No accounts, no tracking, no analytics, no ads.** The app makes no network requests except loading its own files
  from this site. A Content-Security-Policy in `index.html` blocks connections to any other server.
- **Fonts and audio are served from this site**, so no third party (including Google) sees who opens the app.
- **Personal answers are not in this repository.** They are in an encrypted family pack
  (AES-256-GCM, key derived from a passphrase with PBKDF2-SHA256, 310,000 iterations) that is shared privately.
  The pack is decrypted on the phone and stored only in that phone's browser storage (IndexedDB). Nothing is uploaded.
  *Remove* in the app's settings deletes it from the phone.
- **Progress** (which questions are learned, who is practising) is stored only on the phone (localStorage).
- **Search engines** are asked not to index the site (`robots.txt`, `noindex`).
- **Safeguards for the maintainer:** `tools/privacy_check.py` runs before every commit (git hook) and on every push
  (GitHub Actions). It rejects family files, personal clips, emails, phone/passport/PAN/Aadhaar/DS-160 numbers,
  street addresses, birth dates, and any value from the local family pack.

Share the pack file and its passphrase through different channels (for example, the file on WhatsApp and the
passphrase by phone call).
