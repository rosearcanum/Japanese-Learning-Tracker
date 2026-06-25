/* ================================================================
   romaji.js
   Converts romaji (typed Latin letters) to hiragana/katakana so
   the site works without a Japanese keyboard.

   Used for:
   - Kanji reading practice (type "nichi" -> matches にち)
   - Search boxes (type "nihon" -> finds 日本 entries)
   - Practice question answers in grammar.js
================================================================ */

const ROMAJI_TO_KANA = (() => {
  const map = {
    // ── basic vowels ──
    a:"あ", i:"い", u:"う", e:"え", o:"お",
    // ── k ──
    ka:"か", ki:"き", ku:"く", ke:"け", ko:"こ",
    kya:"きゃ", kyu:"きゅ", kyo:"きょ",
    // ── g ──
    ga:"が", gi:"ぎ", gu:"ぐ", ge:"げ", go:"ご",
    gya:"ぎゃ", gyu:"ぎゅ", gyo:"ぎょ",
    // ── s ──
    sa:"さ", shi:"し", si:"し", su:"す", se:"せ", so:"そ",
    sha:"しゃ", shu:"しゅ", sho:"しょ",
    // ── z ──
    za:"ざ", ji:"じ", zi:"じ", zu:"ず", ze:"ぜ", zo:"ぞ",
    ja:"じゃ", ju:"じゅ", jo:"じょ",
    // ── t ──
    ta:"た", chi:"ち", ti:"ち", tsu:"つ", tu:"つ", te:"て", to:"と",
    cha:"ちゃ", chu:"ちゅ", cho:"ちょ",
    // ── d ──
    da:"だ", di:"ぢ", du:"づ", de:"で", do:"ど",
    // ── n ──
    na:"な", ni:"に", nu:"ぬ", ne:"ね", no:"の",
    nya:"にゃ", nyu:"にゅ", nyo:"にょ",
    // ── h ──
    ha:"は", hi:"ひ", fu:"ふ", hu:"ふ", he:"へ", ho:"ほ",
    hya:"ひゃ", hyu:"ひゅ", hyo:"ひょ",
    // ── b ──
    ba:"ば", bi:"び", bu:"ぶ", be:"べ", bo:"ぼ",
    bya:"びゃ", byu:"びゅ", byo:"びょ",
    // ── p ──
    pa:"ぱ", pi:"ぴ", pu:"ぷ", pe:"ぺ", po:"ぽ",
    pya:"ぴゃ", pyu:"ぴゅ", pyo:"ぴょ",
    // ── m ──
    ma:"ま", mi:"み", mu:"む", me:"め", mo:"も",
    mya:"みゃ", myu:"みゅ", myo:"みょ",
    // ── y ──
    ya:"や", yu:"ゆ", yo:"よ",
    // ── r ──
    ra:"ら", ri:"り", ru:"る", re:"れ", ro:"ろ",
    rya:"りゃ", ryu:"りゅ", ryo:"りょ",
    // ── w ──
    wa:"わ", wo:"を", wi:"ゐ", we:"ゑ",
    // ── n alone ──
    n:"ん", nn:"ん",
    // ── small tsu (handled via doubled consonant below) ──
    xtsu:"っ", xtu:"っ",
    // ── vu (for foreign loanwords) ──
    vu:"ゔ",
    // ── fu compounds ──
    fa:"ふぁ", fi:"ふぃ", fe:"ふぇ", fo:"ふぉ",
    // ── extended for loanwords ──
    wi2:"うぃ", we2:"うぇ", wo2:"うぉ",
    va:"ヴぁ", vi:"ヴぃ", ve:"ヴぇ", vo:"ヴぉ",
    tsa:"つぁ", tsi:"つぃ", tse:"つぇ", tso:"つぉ",
    she:"しぇ", je:"じぇ", che:"ちぇ",
    ti2:"てぃ", di2:"でぃ", tu2:"とぅ", du2:"どぅ",
  };
  return map;
})();

// Sorted keys, longest first, so "kya" matches before "ky" + "a"
const ROMAJI_KEYS = Object.keys(ROMAJI_TO_KANA).sort((a,b)=>b.length-a.length);

/**
 * Convert a romaji string to hiragana.
 * Handles: long vowels (ā -> aa), doubled consonants (tt -> っt),
 * particle え/は edge cases are NOT handled (use plain romaji rules).
 */
function romajiToHiragana(input){
  if(!input) return "";
  let s = input.toLowerCase().trim();
  // normalize macrons/circumflex long vowels to double vowels
  s = s.replace(/[āâ]/g,"aa").replace(/[īî]/g,"ii").replace(/[ūû]/g,"uu")
       .replace(/[ēê]/g,"ee").replace(/[ōô]/g,"oo");
  // n' before a vowel/y means standalone ん (e.g. "kon'i" -> こんい, not こに)
  s = s.replace(/n'(?=[aiueoy])/g, "\u0001");
  let out = "";
  let i = 0;
  while(i < s.length){
    if(s[i] === "\u0001"){ out += "ん"; i++; continue; }
    // doubled consonant -> small tsu + consonant (e.g. "tta" -> った)
    if(i+1 < s.length && s[i]===s[i+1] && /[bcdfghjklmpqrstvwxyz]/.test(s[i])){
      out += "っ";
      i++;
      continue;
    }
    // try 3-char, then 2-char, then 1-char matches
    let matched = false;
    for(const len of [3,2,1]){
      const chunk = s.slice(i, i+len);
      if(ROMAJI_TO_KANA[chunk]){
        out += ROMAJI_TO_KANA[chunk];
        i += len;
        matched = true;
        break;
      }
    }
    if(!matched){
      // unknown character (space, punctuation) - pass through
      out += s[i];
      i++;
    }
  }
  return out;
}

/** Convert hiragana to katakana (simple unicode shift) */
function hiraganaToKatakana(s){
  return (s||"").replace(/[\u3041-\u3096]/g, ch => String.fromCharCode(ch.charCodeAt(0)+0x60));
}

/**
 * Check whether a user's romaji/kana input matches a target kana string.
 * Tries: exact match, romaji-converted match, and katakana-converted match.
 * This is the core function other parts of the site call.
 */
function romajiMatches(userInput, targetKana){
  if(!userInput || !targetKana) return false;
  const trimmedInput = userInput.trim();
  const trimmedTarget = targetKana.trim();
  if(!trimmedInput) return false;

  // 1) direct match (user already typed kana, or exact romaji string match)
  if(trimmedInput === trimmedTarget) return true;

  // 2) convert user's romaji to hiragana and compare
  const asHiragana = romajiToHiragana(trimmedInput);
  if(asHiragana === trimmedTarget) return true;

  // 3) convert target kana to katakana and compare against converted input
  //    (covers cases where target is katakana, e.g. loanwords)
  const asKatakana = hiraganaToKatakana(asHiragana);
  if(asKatakana === trimmedTarget) return true;

  // 4) also try converting target FROM katakana to hiragana, compare
  const targetAsHiragana = trimmedTarget.replace(/[\u30a1-\u30f6]/g, ch => String.fromCharCode(ch.charCodeAt(0)-0x60));
  if(asHiragana === targetAsHiragana) return true;

  return false;
}

/**
 * Search-friendly normalizer: strips spaces/punctuation and converts
 * romaji to hiragana, for use in search boxes (kanji bank, etc).
 * Returns BOTH the raw lowercased input and its kana conversion,
 * so callers can check a target string against either form.
 */
function normalizeSearchInput(input){
  const raw = (input||"").toLowerCase().trim();
  const kana = romajiToHiragana(raw);
  const kata = hiraganaToKatakana(kana);
  return { raw, kana, kata };
}

/**
 * Test whether a target string (kanji reading, meaning, etc.) contains
 * a match for the search input, accounting for romaji.
 */
function searchMatches(searchInput, targetString){
  if(!searchInput) return true;
  if(!targetString) return false;
  const target = targetString.toLowerCase();
  const { raw, kana, kata } = normalizeSearchInput(searchInput);
  return target.includes(raw) || target.includes(kana) || target.includes(kata);
}

// Expose globally for other scripts
window.romajiToHiragana = romajiToHiragana;
window.hiraganaToKatakana = hiraganaToKatakana;
window.romajiMatches = romajiMatches;
window.normalizeSearchInput = normalizeSearchInput;
window.searchMatches = searchMatches;
