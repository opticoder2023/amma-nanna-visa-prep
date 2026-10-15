// The private family pack: an encrypted file made with tools/build_pack.py and loaded once per phone.
// It is decrypted here with the passphrase and kept only in this phone's storage (IndexedDB).
const DB = "amma-nanna-visa", STORE = "kv";

function db(){
  return new Promise((res, rej) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(STORE);
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  });
}
async function kv(mode, fn){
  const d = await db();
  return new Promise((res, rej) => {
    const tx = d.transaction(STORE, mode), st = tx.objectStore(STORE), r = fn(st);
    tx.oncomplete = () => res(r && r.result); tx.onerror = () => rej(tx.error);
  });
}
export const loadSaved = () => kv("readonly", st => st.get("pack")).catch(() => null);
export const savePack = pack => kv("readwrite", st => st.put(pack, "pack"));
export const removePack = () => kv("readwrite", st => st.delete("pack"));

const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));

/** Returns the pack object, or throws Error("passphrase") / Error("format"). */
export async function decryptPack(text, passphrase){
  let wrap;
  try { wrap = JSON.parse(text); } catch (e) { throw new Error("format"); }
  if (!wrap || wrap.format !== "amma-nanna-visa-pack-encrypted") throw new Error("format");
  const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(passphrase.normalize("NFC")), "PBKDF2", false, ["deriveKey"]);
  const key = await crypto.subtle.deriveKey(
    {name: "PBKDF2", hash: "SHA-256", salt: b64(wrap.kdf.salt), iterations: wrap.kdf.iterations},
    base, {name: "AES-GCM", length: 256}, false, ["decrypt"]);
  let plain;
  try { plain = await crypto.subtle.decrypt({name: "AES-GCM", iv: b64(wrap.iv)}, key, b64(wrap.data)); }
  catch (e) { throw new Error("passphrase"); }
  const pack = JSON.parse(new TextDecoder().decode(plain));
  if (pack.format !== "amma-nanna-visa-pack") throw new Error("format");
  return pack;
}
