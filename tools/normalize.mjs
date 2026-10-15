// Turns display text into what the voices can actually pronounce.
// The Telugu voice only knows Telugu letters, so digits and English words are spelled out in Telugu.
const UNITS = ["సున్నా","ఒకటి","రెండు","మూడు","నాలుగు","ఐదు","ఆరు","ఏడు","ఎనిమిది","తొమ్మిది","పది","పదకొండు","పన్నెండు","పదమూడు","పద్నాలుగు","పదిహేను","పదహారు","పదిహేడు","పద్దెనిమిది","పంతొమ్మిది"];
const TENS = ["","","ఇరవై","ముప్పై","నలభై","యాభై","అరవై","డెబ్బై","ఎనభై","తొంభై"];
const ONE = {"ఒకటి":"ఒక"};
function below100(n){ if (n < 20) return UNITS[n]; const t = Math.floor(n/10), u = n%10; return TENS[t] + (u ? " " + UNITS[u] : ""); }
function below1000(n){
  if (n < 100) return below100(n);
  const h = Math.floor(n/100), r = n%100;
  const head = h === 1 ? (r ? "నూట" : "వంద") : UNITS[h] + (r ? " వందల" : " వందలు");
  return head + (r ? " " + below100(r) : "");
}
export function teNumber(n){
  if (n === 0) return UNITS[0];
  if (n >= 1100 && n <= 1999) { const r = n % 100; return "పంతొమ్మిది వందల" + (r ? " " + below100(r) : "").replace(/^ /," "); }
  const parts = [];
  const lakh = Math.floor(n/100000); n %= 100000;
  const thou = Math.floor(n/1000); n %= 1000;
  if (lakh) parts.push((ONE[below100(lakh)] || below100(lakh)) + (thou || n ? " లక్షల" : " లక్షలు"));
  if (thou) parts.push(thou === 1 ? "వెయ్యి" : below100(thou) + (n ? " వేల" : " వేలు"));
  if (n) parts.push(below1000(n));
  return parts.join(" ").replace(/^ఒక లక్షల/, "ఒక లక్షా").replace(/^ఒక లక్షలు/, "ఒక లక్ష");
}
const ordinal = w => w.replace(/[ుి]$/, "") + "వ";
const LETTERS = {A:"ఎ",B:"బి",C:"సి",D:"డి",E:"ఇ",F:"ఎఫ్",G:"జి",H:"హెచ్",I:"ఐ",J:"జె",K:"కె",L:"ఎల్",M:"ఎమ్",N:"ఎన్",O:"ఓ",P:"పి",Q:"క్యూ",R:"ఆర్",S:"ఎస్",T:"టి",U:"యు",V:"వి",W:"డబ్ల్యూ",X:"ఎక్స్",Y:"వై",Z:"జెడ్"};
const SPECIAL_TE = {"H-1B":"హెచ్ వన్ బి","DS-160":"డి ఎస్ వన్ సిక్స్టీ","US":"యు ఎస్"};

export function sayTe(text, dict){
  let s = text;
  for (const [k, v] of Object.entries(SPECIAL_TE)) s = s.split(k).join(v);
  s = s.replace(/=/g, " అంటే ");
  s = s.replace(/(\d[\d,]*)\s*వ(?=[^ా-్]|$)/g, (_, d) => ordinal(teNumber(+d.replace(/,/g, ""))));
  s = s.replace(/\d[\d,]*/g, d => teNumber(+d.replace(/,/g, "")));
  s = s.replace(/[A-Za-z][A-Za-z']*/g, w => {
    const d = dict[w] || dict[w.toLowerCase()];
    if (d && d[0]) return d[0];
    if (/^[A-Z]{2,}$/.test(w)) return w.split("").map(c => LETTERS[c]).join(" ");
    return w.split("").map(c => LETTERS[c.toUpperCase()] || "").join(" ");
  });
  s = s.replace(/(వే|లక్ష|వంద)లు (?=[\u0C00-\u0C7F])/g, "$1ల ");
  return s.replace(/[-–—]/g, " ").replace(/\s+/g, " ").replace(/\s+([,.?!])/g, "$1").trim();
}
const SPECIAL_EN = {"H-1B":"H one B","DS-160":"D S one sixty","US":"U.S."};
export function sayEn(text){
  let s = text;
  for (const [k, v] of Object.entries(SPECIAL_EN)) s = s.replace(new RegExp("\\b" + k.replace(/[.-]/g, "\\$&") + "\\b", "g"), v);
  return s;
}
