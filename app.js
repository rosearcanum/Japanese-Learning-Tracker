/* ══════════════════════════════════════════
   日本語 Study App — app.js
   Kanji: live from Jo-Mako's spreadsheet
   Lessons/vocab/quiz: Genki I Ch. 1-5
══════════════════════════════════════════ */

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const SHEET_ID  = "1056uW4iIObSuwptN5Xpbg0UbOy9ALvxMUIxQbl6QfUI";
const KANJI_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Kanji`;

// ─── KANJI DATA (filled by fetchKanji()) ─────────────────────────────────────
let KANJI_DATA = [];

// ─── CSV PARSER ──────────────────────────────────────────────────────────────
function parseCSV(text) {
  const rows = [];
  let row = [], field = "", inQuote = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i], next = text[i + 1];
    if (inQuote) {
      if (ch === '"' && next === '"') { field += '"'; i++; }
      else if (ch === '"') { inQuote = false; }
      else { field += ch; }
    } else {
      if (ch === '"') { inQuote = true; }
      else if (ch === ',') { row.push(field.trim()); field = ""; }
      else if (ch === '\n' || (ch === '\r' && next === '\n')) {
        row.push(field.trim()); rows.push(row); row = []; field = "";
        if (ch === '\r') i++;
      } else { field += ch; }
    }
  }
  if (field || row.length) { row.push(field.trim()); rows.push(row); }
  return rows;
}

function stripHTML(s) {
  return (s || "").replace(/<[^>]+>/g, " ").replace(/\s{2,}/g, " ").trim();
}

// Parse vocab strings like: "word 【reading】 meaning<br><br>word2..."
function parseVocab(str) {
  if (!str) return [];
  const clean = stripHTML(str);
  return clean.split(/\s{2,}/).filter(Boolean).slice(0, 3).map(entry => {
    const m = entry.match(/^(.+?)【(.+?)】\s*(.+)$/);
    return m ? [m[1].trim(), m[2].trim(), m[3].split(",")[0].trim()] : [entry.trim(), "", ""];
  }).filter(e => e[0]);
}

function rowToKanji(headers, cols) {
  const g = name => (cols[headers.indexOf(name)] || "").trim();
  const char = g("Kanji");
  if (!char || char === "Kanji") return null;
  return {
    char,
    on:      g("Reading On").replace(/、/g, "・") || "—",
    kun:     g("Reading Kun").replace(/、/g, "・") || "—",
    mean:    g("Keyword_KKLC") || g("Keyword_RTK") || "—",
    jlpt:    g("Info_JLPT") || "—",
    strokes: parseInt(g("Info_Stroke_Count")) || 0,
    freq2k:  g("Info_Frequency_Top2000") === "TRUE",
    freq5k:  g("Info_Frequency_Top5000") === "TRUE",
    examples:[...parseVocab(g("Vocab_On")), ...parseVocab(g("Vocab_Kun"))].slice(0, 4),
    story:   stripHTML(g("Story_Wanikani") || g("Story_KKLC") || g("Story_RTK") || "").slice(0, 400),
  };
}

// ─── FETCH ────────────────────────────────────────────────────────────────────
async function fetchKanji() {
  showKanjiLoading(true);
  try {
    const res = await fetch(KANJI_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const rows = parseCSV(text);
    if (rows.length < 2) throw new Error("Empty sheet");
    const headers = rows[0].map(h => h.trim());
    KANJI_DATA = rows.slice(1).map(r => rowToKanji(headers, r)).filter(Boolean);
    console.log(`✅ Loaded ${KANJI_DATA.length} kanji from Jo-Mako's sheet`);
  } catch (err) {
    console.warn("⚠️ Sheet fetch failed:", err.message, "— using fallback");
    KANJI_DATA = FALLBACK_KANJI;
  }
  showKanjiLoading(false);
  renderKanji();
  renderHome();
}

function showKanjiLoading(on) {
  const el = document.getElementById("kanji-today-grid");
  if (el && on) el.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;font-family:'DM Sans',sans-serif;color:var(--muted);">🌸 Loading kanji from Jo-Mako's sheet…</div>`;
}

// ─── FALLBACK KANJI ───────────────────────────────────────────────────────────
const FALLBACK_KANJI = [
  { char:"日", on:"ニチ・ジツ", kun:"ひ・か", mean:"sun, day", jlpt:"N5", strokes:4, freq2k:true, freq5k:true,
    examples:[["今日","きょう","today"],["日本","にほん","Japan"],["毎日","まいにち","every day"]], story:"Pictograph of the sun." },
  { char:"本", on:"ホン", kun:"もと", mean:"book, origin", jlpt:"N5", strokes:5, freq2k:true, freq5k:true,
    examples:[["日本語","にほんご","Japanese"],["本","ほん","book"],["本当","ほんとう","truth"]], story:"A tree with its roots marked." },
  { char:"人", on:"ジン・ニン", kun:"ひと", mean:"person", jlpt:"N5", strokes:2, freq2k:true, freq5k:true,
    examples:[["日本人","にほんじん","Japanese person"],["友人","ゆうじん","friend"]], story:"A person walking, seen from the side." },
  { char:"山", on:"サン", kun:"やま", mean:"mountain", jlpt:"N5", strokes:3, freq2k:true, freq5k:true,
    examples:[["富士山","ふじさん","Mt. Fuji"],["山","やま","mountain"]], story:"Three peaks of a mountain." },
  { char:"川", on:"セン", kun:"かわ", mean:"river", jlpt:"N5", strokes:3, freq2k:true, freq5k:true,
    examples:[["川","かわ","river"],["小川","おがわ","stream"]], story:"Three streams flowing together." },
  { char:"月", on:"ゲツ・ガツ", kun:"つき", mean:"moon, month", jlpt:"N5", strokes:4, freq2k:true, freq5k:true,
    examples:[["月曜日","げつようび","Monday"],["来月","らいげつ","next month"]], story:"A crescent moon." },
  { char:"火", on:"カ", kun:"ひ", mean:"fire", jlpt:"N5", strokes:4, freq2k:true, freq5k:true,
    examples:[["火曜日","かようび","Tuesday"],["花火","はなび","fireworks"]], story:"Flames rising upward." },
  { char:"水", on:"スイ", kun:"みず", mean:"water", jlpt:"N5", strokes:4, freq2k:true, freq5k:true,
    examples:[["水曜日","すいようび","Wednesday"],["水","みず","water"]], story:"Water flowing between banks." },
  { char:"木", on:"モク・ボク", kun:"き", mean:"tree, wood", jlpt:"N5", strokes:4, freq2k:true, freq5k:true,
    examples:[["木曜日","もくようび","Thursday"],["木","き","tree"]], story:"A tree with roots and branches." },
  { char:"金", on:"キン", kun:"かね", mean:"gold, money", jlpt:"N5", strokes:8, freq2k:true, freq5k:true,
    examples:[["金曜日","きんようび","Friday"],["お金","おかね","money"]], story:"Gold buried in the earth." },
];

// ─── LESSONS DATA ─────────────────────────────────────────────────────────────
const LESSONS = [
  {
    num:1, title:"あのう…", sub:"Excuse me…",
    topics:["これ・それ・あれ・どれ","Noun の Noun","～ね / ～よ","Counters"],
    grammar:[
      {p:"X は Y です", ex:"これはほんです。", tr:"This is a book."},
      {p:"X は Y じゃないです", ex:"それはほんじゃないです。", tr:"That is not a book."},
      {p:"X は Y ですか", ex:"あれはなんですか。", tr:"What is that over there?"},
      {p:"Noun の Noun", ex:"メアリーさんのほん", tr:"Mary's book"},
    ],
    vocab:[
      {jp:"これ",en:"this (near me)"},{jp:"それ",en:"that (near you)"},
      {jp:"あれ",en:"that (over there)"},{jp:"どれ",en:"which one"},
      {jp:"だれ",en:"who"},{jp:"なに",en:"what"},
      {jp:"いくら",en:"how much"},{jp:"ほん",en:"book"},
      {jp:"さいふ",en:"wallet"},{jp:"かさ",en:"umbrella"},
    ],
    kanjiChars:["日","本","人"],
    quiz:[
      {q:"How do you say 'This is a book'?",ch:["これはほんです。","それはほんです。","あれはほんです。","どれはほんです。"],a:0},
      {q:"What does じゃないです mean?",ch:["is","is not","is it?","this"],a:1},
      {q:"Which word means 'who'?",ch:["なに","どれ","だれ","いくら"],a:2},
      {q:"How is possession formed?",ch:["X は Y","Y の X","X の Y","X が Y"],a:2},
    ],
  },
  {
    num:2, title:"Oshimai no Mise", sub:"A restaurant",
    topics:["あります vs います","Location nouns","も (also)","どこ"],
    grammar:[
      {p:"X は Y に あります", ex:"ほんはつくえのうえにあります。", tr:"The book is on the desk."},
      {p:"X は Y に います", ex:"メアリーさんはどこにいますか。", tr:"Where is Mary?"},
      {p:"も (also)", ex:"わたしもがくせいです。", tr:"I am also a student."},
      {p:"Location + に", ex:"としょかんにいきます。", tr:"I will go to the library."},
    ],
    vocab:[
      {jp:"うえ",en:"above / on top"},{jp:"した",en:"below / under"},
      {jp:"まえ",en:"in front of"},{jp:"うしろ",en:"behind"},
      {jp:"なか",en:"inside"},{jp:"よこ",en:"beside"},
      {jp:"ちかく",en:"near"},{jp:"どこ",en:"where"},
      {jp:"あります",en:"exists (things)"},{jp:"います",en:"exists (people/animals)"},
    ],
    kanjiChars:["山","川","口","目","耳"],
    quiz:[
      {q:"Which verb is for living things?",ch:["あります","います","です","します"],a:1},
      {q:"'Under the table' — which location word?",ch:["うえ","まえ","した","なか"],a:2},
      {q:"How do you say 'also'?",ch:["は","が","も","を"],a:2},
      {q:"Where does location go in X は Y に あります?",ch:["End","Start","After に","After は"],a:2},
    ],
  },
  {
    num:3, title:"デートの約束", sub:"Making a date",
    topics:["ます form verbs","Verb groups","Time words","～ませんか"],
    grammar:[
      {p:"Verb + ます (present/future)", ex:"まいにちにほんごをべんきょうします。", tr:"I study Japanese every day."},
      {p:"Verb + ません (negative)", ex:"コーヒーをのみません。", tr:"I don't drink coffee."},
      {p:"～ませんか (invitation)", ex:"えいがをみませんか。", tr:"Won't you watch a movie with me?"},
      {p:"X を します", ex:"べんきょうをします。", tr:"I will study."},
    ],
    vocab:[
      {jp:"たべます",en:"eat"},{jp:"のみます",en:"drink"},
      {jp:"みます",en:"watch/see"},{jp:"きます",en:"come"},
      {jp:"いきます",en:"go"},{jp:"します",en:"do"},
      {jp:"かえります",en:"return home"},{jp:"おきます",en:"wake up"},
      {jp:"ねます",en:"sleep"},{jp:"よみます",en:"read"},
    ],
    kanjiChars:["火","水","木","金","土"],
    quiz:[
      {q:"Polite present/future ending?",ch:["ます","ません","ました","ませんか"],a:0},
      {q:"'Won't you eat?' uses which form?",ch:["たべます","たべません","たべませんか","たべました"],a:2},
      {q:"Destination particle for 'go to school'?",ch:["を","は","が","に"],a:3},
      {q:"Which means 'to read'?",ch:["みます","よみます","かきます","ききます"],a:1},
    ],
  },
  {
    num:4, title:"Mary's Home", sub:"Daily life & frequency",
    topics:["Frequency adverbs","Past tense ました","あります (have)","いつ"],
    grammar:[
      {p:"Frequency adverbs", ex:"よくえいがをみます。", tr:"I often watch movies."},
      {p:"Verb + ました (past)", ex:"きのうえいがをみました。", tr:"I watched a movie yesterday."},
      {p:"Verb + ませんでした (past neg.)", ex:"きのうべんきょうしませんでした。", tr:"I didn't study yesterday."},
      {p:"X があります (have)", ex:"じかんがありますか。", tr:"Do you have time?"},
    ],
    vocab:[
      {jp:"まいにち",en:"every day"},{jp:"たいてい",en:"usually"},
      {jp:"よく",en:"often"},{jp:"ときどき",en:"sometimes"},
      {jp:"あまり〜ない",en:"not much"},{jp:"ぜんぜん〜ない",en:"not at all"},
      {jp:"きのう",en:"yesterday"},{jp:"きょう",en:"today"},
      {jp:"あした",en:"tomorrow"},{jp:"いつ",en:"when"},
    ],
    kanjiChars:["上","下","中","大","小"],
    quiz:[
      {q:"'I watched TV yesterday' is:",ch:["テレビをみます","テレビをみました","テレビをみません","テレビをみませんでした"],a:1},
      {q:"Which means 'sometimes'?",ch:["よく","たいてい","ときどき","まいにち"],a:2},
      {q:"'I didn't eat' (past negative):",ch:["たべます","たべません","たべました","たべませんでした"],a:3},
      {q:"'Not at all' needs which verb form?",ch:["affirmative","negative","past","te-form"],a:1},
    ],
  },
  {
    num:5, title:"A Trip to Okinawa", sub:"Past & adjective conjugation",
    topics:["て-form conjunctions","～てから","い-adj past","な-adj past"],
    grammar:[
      {p:"Verb + て/で (sequential)", ex:"おきて、シャワーをあびます。", tr:"I wake up and take a shower."},
      {p:"X てから Y (after X, Y)", ex:"しゅくだいをしてからテレビをみます。", tr:"After doing homework, I watch TV."},
      {p:"い-adj past: ～かった", ex:"たのしかったです。", tr:"It was fun."},
      {p:"な-adj past: ～でした", ex:"きれいでした。", tr:"It was beautiful."},
    ],
    vocab:[
      {jp:"たのしい",en:"fun"},{jp:"きれい",en:"beautiful/clean"},
      {jp:"すごい",en:"amazing"},{jp:"おいしい",en:"delicious"},
      {jp:"たかい",en:"expensive/tall"},{jp:"やすい",en:"cheap"},
      {jp:"いきました",en:"went"},{jp:"みました",en:"saw"},
      {jp:"てから",en:"after doing ~"},{jp:"はじめて",en:"for the first time"},
    ],
    kanjiChars:["年","月","日","学","生"],
    quiz:[
      {q:"'It was delicious' — correct form?",ch:["おいしいです","おいしかったです","おいしくないです","おいしかったじゃないです"],a:1},
      {q:"X てから Y means:",ch:["X and Y","After X, Y","Before X, Y","X or Y"],a:1},
      {q:"な-adjective past ending:",ch:["かった","くない","でした","じゃない"],a:2},
      {q:"'It was beautiful' (きれい = な-adj):",ch:["きれいかったです","きれいでした","きれいくなかった","きれいじゃなかった"],a:1},
    ],
  },
];

// ─── FLASHCARDS ───────────────────────────────────────────────────────────────
const FLASHCARDS = [
  {f:"これ",b:"this (near speaker)",t:"L1"},{f:"それ",b:"that (near listener)",t:"L1"},
  {f:"あれ",b:"that (far from both)",t:"L1"},{f:"だれ",b:"who",t:"L1"},
  {f:"いくら",b:"how much",t:"L1"},{f:"X の Y",b:"Y belongs to X / describes X",t:"L1"},
  {f:"あります",b:"exists — inanimate things",t:"L2"},{f:"います",b:"exists — people & animals",t:"L2"},
  {f:"うえ",b:"above / on top of",t:"L2"},{f:"した",b:"below / under",t:"L2"},
  {f:"なか",b:"inside",t:"L2"},{f:"よこ",b:"beside / next to",t:"L2"},
  {f:"まえ",b:"in front of",t:"L2"},{f:"うしろ",b:"behind",t:"L2"},
  {f:"たべます",b:"to eat (ru-verb)",t:"L3"},{f:"のみます",b:"to drink (u-verb)",t:"L3"},
  {f:"いきます",b:"to go (u-verb)",t:"L3"},{f:"〜ませんか",b:"won't you…? — invitation",t:"L3"},
  {f:"〜ましょう",b:"let's…! — suggestion",t:"L3"},{f:"を",b:"direct object particle",t:"L3"},
  {f:"まいにち",b:"every day",t:"L4"},{f:"ときどき",b:"sometimes",t:"L4"},
  {f:"ぜんぜん〜ない",b:"not at all (needs negative verb)",t:"L4"},{f:"きのう",b:"yesterday",t:"L4"},
  {f:"〜ました",b:"did ~ — past affirmative",t:"L4"},{f:"〜ませんでした",b:"did not ~ — past negative",t:"L4"},
  {f:"あまり〜ない",b:"not very much (needs negative verb)",t:"L4"},{f:"よく",b:"often",t:"L4"},
  {f:"〜てから",b:"after doing ~",t:"L5"},{f:"たのしかった",b:"was fun — past of たのしい (い-adj)",t:"L5"},
  {f:"きれいでした",b:"was beautiful — past of きれい (な-adj)",t:"L5"},{f:"はじめて",b:"for the first time",t:"L5"},
  {f:"〜かった",b:"past tense ending for い-adjectives",t:"L5"},{f:"〜でした",b:"past tense ending for な-adj and nouns",t:"L5"},
];

// ─── RESOURCES ────────────────────────────────────────────────────────────────
const RESOURCES = {
  jomako: [
    { icon:"📊", title:"Jo-Mako's Japanese Spreadsheet", desc:"Main hub — anime, games, manga, VN vocab with Anki decks", url:"https://docs.google.com/spreadsheets/d/1IytlD4JjYO5-38wP6VbFNjHQDaDEsx4WWi2Rs-gaamk/edit" },
    { icon:"📈", title:"Jo-Mako's Frequency List", desc:"Japanese vocabulary ranked by frequency across anime, games, novels", url:"https://docs.google.com/spreadsheets/u/0/d/1z3Wc85VuDhjgjy1s_zgbGx2daaOoqm0s/htmlview" },
    { icon:"🈳", title:"Jo-Mako's Kanji Spreadsheet", desc:"Full kanji reference — readings, JLPT, mnemonics, stroke count, examples", url:"https://docs.google.com/spreadsheets/d/1idXxl-Wsrs_cj0jkqUAErBzYFG6OZPOTsgoNkaKSAvU/edit" },
  ],
  tools: [
    { icon:"🃏", title:"Anki", desc:"Spaced repetition flashcard app — gold standard for retention", url:"https://apps.ankiweb.net" },
    { icon:"📖", title:"Jisho.org", desc:"Best free Japanese dictionary with kanji search and JLPT tags", url:"https://jisho.org" },
    { icon:"🔊", title:"Forvo", desc:"Native speaker pronunciation for any Japanese word", url:"https://forvo.com/languages/ja/" },
    { icon:"💬", title:"HelloTalk", desc:"Language exchange — chat and call native Japanese speakers", url:"https://www.hellotalk.com" },
    { icon:"🎧", title:"Comprehensible Japanese", desc:"Beginner input videos — great for listening practice", url:"https://www.youtube.com/@cijapanese" },
    { icon:"✏️", title:"Jisho Kanji Draw", desc:"Draw a kanji you don't know to look it up", url:"https://jisho.org/#radical" },
  ],
  genki: [
    { icon:"📚", title:"Genki Self-Study Room", desc:"Official Genki exercises and audio from Japan Times", url:"https://genki.japantimes.co.jp/self" },
    { icon:"📝", title:"Cure Dolly (YouTube)", desc:"Organic Japanese grammar — excellent structural explanations", url:"https://www.youtube.com/@organicjapanesewithcuredol9357" },
    { icon:"🌐", title:"Tofugu Genki Guide", desc:"Community grammar notes and vocab lists per chapter", url:"https://www.tofugu.com/japanese/genki-textbook/" },
  ],
};

// ─── STATE ────────────────────────────────────────────────────────────────────
let state = {
  lessonsDone:      {},
  selectedLesson:   0,
  quizLessonIdx:    0,
  quizQIdx:         0,
  quizScore:        0,
  quizAnswered:     false,
  fcFilter:         "All",
  fcIdx:            0,
  fcFlipped:        false,
  fcKnown:          new Set(),
  kanjiLearned:     new Set(),
  selectedKanjiIdx: null,
  kanjiJlptFilter:  "All",
  journalEntries:   [],
  selectedMood:     "😊",
};

try {
  const s = JSON.parse(localStorage.getItem("jp-study") || "{}");
  if (s.lessonsDone)    state.lessonsDone    = s.lessonsDone;
  if (s.fcKnown)        state.fcKnown        = new Set(s.fcKnown);
  if (s.kanjiLearned)   state.kanjiLearned   = new Set(s.kanjiLearned);
  if (s.journalEntries) state.journalEntries = s.journalEntries;
} catch(e) {}

function save() {
  try {
    localStorage.setItem("jp-study", JSON.stringify({
      lessonsDone:    state.lessonsDone,
      fcKnown:        [...state.fcKnown],
      kanjiLearned:   [...state.kanjiLearned],
      journalEntries: state.journalEntries,
    }));
  } catch(e) {}
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
function nav(page) {
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.page === page));
  document.querySelectorAll(".page").forEach(p => p.classList.remove("visible"));
  document.getElementById("page-" + page).classList.add("visible");
  if (page === "home")      renderHome();
  if (page === "journal")   renderJournal();
  if (page === "resources") renderResources();
}
document.querySelectorAll(".nav-btn").forEach(btn => btn.addEventListener("click", () => nav(btn.dataset.page)));

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function todayKanjiIndices() {
  if (!KANJI_DATA.length) return [];
  const start    = new Date(new Date().getFullYear(), 0, 0);
  const dayOfYear = Math.floor((new Date() - start) / 86400000);
  const startIdx  = ((dayOfYear - 1) * 5) % KANJI_DATA.length;
  return Array.from({length: 5}, (_, i) => (startIdx + i) % KANJI_DATA.length);
}

function fmtDate(d) {
  return d.toLocaleDateString("en-US", {weekday:"long", month:"long", day:"numeric", year:"numeric"});
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function renderHome() {
  const total   = FLASHCARDS.length;
  const known   = state.fcKnown.size;
  const pct     = total ? Math.round((known / total) * 100) : 0;
  const lessons = Object.values(state.lessonsDone).filter(Boolean).length;

  document.getElementById("home-words").textContent        = `${known}/${total}`;
  document.getElementById("home-lessons").textContent      = `${lessons}/5`;
  document.getElementById("home-kanji-count").textContent  = state.kanjiLearned.size;
  document.getElementById("home-progress-bar").style.width = pct + "%";
  document.getElementById("home-progress-label").textContent = `${known} of ${total} cards marked known`;
  document.getElementById("home-kanji-date").textContent   = fmtDate(new Date());

  const strip = document.getElementById("home-kanji-preview");
  if (KANJI_DATA.length) {
    strip.innerHTML = todayKanjiIndices().map(i => {
      const k = KANJI_DATA[i];
      return `<div class="home-kanji-chip" onclick="nav('kanji')">
        ${k.char}
        <div class="chip-read">${k.kun.split("・")[0] !== "—" ? k.kun.split("・")[0] : k.on.split("・")[0]}</div>
      </div>`;
    }).join("");
  } else {
    strip.innerHTML = `<div style="font-family:'DM Sans',sans-serif;font-size:13px;color:var(--muted);">Loading kanji…</div>`;
  }

  document.getElementById("home-lessons-grid").innerHTML = LESSONS.map((l, i) => `
    <div class="card lesson-overview-card ${state.lessonsDone[i] ? "done" : ""}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div>
          <div style="font-family:'DM Sans',sans-serif;font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.09em;">Lesson ${l.num}</div>
          <div style="font-weight:700;font-size:15px;margin-top:3px;">${l.title}</div>
          <div style="font-family:'DM Sans',sans-serif;font-size:12px;color:var(--muted);font-style:italic;">${l.sub}</div>
        </div>
        ${state.lessonsDone[i] ? "<span style='font-size:20px;'>🌸</span>" : ""}
      </div>
    </div>`).join("");
}

// ─── LESSONS ──────────────────────────────────────────────────────────────────
function renderLessons() {
  document.getElementById("lesson-chips").innerHTML = LESSONS.map((l, i) => `
    <button class="chip ${i === state.selectedLesson ? "active" : ""}" onclick="selectLesson(${i})">
      ${state.lessonsDone[i] ? "🌸 " : ""}L${l.num}: ${l.title}
    </button>`).join("");
  renderLessonDetail();
}

function selectLesson(i) {
  state.selectedLesson = i;
  document.querySelectorAll("#lesson-chips .chip").forEach((c, j) => c.classList.toggle("active", j === i));
  document.querySelectorAll(".sub-tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".sub-tab-content").forEach(t => t.classList.remove("visible"));
  document.querySelector(".sub-tab[data-tab='grammar']").classList.add("active");
  document.getElementById("tab-grammar").classList.add("visible");
  renderLessonDetail();
}

function renderLessonDetail() {
  const l = LESSONS[state.selectedLesson];
  document.getElementById("ld-num").textContent   = `Lesson ${l.num}`;
  document.getElementById("ld-title").textContent = l.title;
  document.getElementById("ld-sub").textContent   = l.sub;
  document.getElementById("ld-topics").innerHTML  = l.topics.map(t => `<span class="pill">${t}</span>`).join("");

  const done = state.lessonsDone[state.selectedLesson];
  const btn  = document.getElementById("ld-mark-btn");
  btn.textContent = done ? "✅ Done!" : "Mark Complete";
  btn.className   = `btn ${done ? "btn-soft" : "btn-primary"}`;

  document.getElementById("tab-grammar").innerHTML = l.grammar.map(g => `
    <div class="grammar-item">
      <div class="grammar-point">${g.p}</div>
      <div class="grammar-ex">${g.ex}</div>
      <div class="grammar-trans">${g.tr}</div>
    </div>`).join("");

  document.getElementById("tab-vocab").innerHTML = `<div class="vocab-grid">${
    l.vocab.map(v => `<div class="vocab-item"><span class="vocab-jp">${v.jp}</span><span class="vocab-en">${v.en}</span></div>`).join("")
  }</div>`;

  // Look up kanji by character
  const lessonKanji = (l.kanjiChars || []).map(ch => KANJI_DATA.find(k => k.char === ch)).filter(Boolean);
  document.getElementById("tab-kanji-tab").innerHTML = lessonKanji.length
    ? `<div class="lesson-kanji-row">${lessonKanji.map(k => `
        <div class="lesson-kanji-card" onclick="nav('kanji')">
          <div class="lesson-kanji-char">${k.char}</div>
          <div style="font-weight:700;font-size:12px;">${k.on}</div>
          <div style="font-family:'DM Sans',sans-serif;font-size:11px;color:var(--muted);">${k.mean}</div>
          <span class="pill ${k.jlpt.toLowerCase()}" style="margin-top:6px;">${k.jlpt}</span>
        </div>`).join("")
      }</div>`
    : `<div style="font-family:'DM Sans',sans-serif;color:var(--muted);font-size:13px;">Kanji loading… go to the Kanji tab to study today's set.</div>`;
}

function markLessonDone() {
  state.lessonsDone[state.selectedLesson] = !state.lessonsDone[state.selectedLesson];
  save();
  renderLessons();
}

document.querySelectorAll(".sub-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".sub-tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".sub-tab-content").forEach(t => t.classList.remove("visible"));
    tab.classList.add("active");
    document.getElementById("tab-" + tab.dataset.tab).classList.add("visible");
  });
});

// ─── KANJI ────────────────────────────────────────────────────────────────────
function renderKanji() {
  if (!KANJI_DATA.length) return;
  document.getElementById("kanji-date-label").textContent = fmtDate(new Date());

  const todayIdx = todayKanjiIndices();
  document.getElementById("kanji-today-grid").innerHTML = todayIdx.map(ki => {
    const k       = KANJI_DATA[ki];
    const learned = state.kanjiLearned.has(ki);
    const active  = state.selectedKanjiIdx === ki;
    return `<div class="kanji-today-card ${learned ? "learned" : ""} ${active ? "active" : ""}" onclick="selectKanji(${ki})">
      <div class="ktc-badge">${learned ? "✅" : "&nbsp;"}</div>
      <div class="ktc-char">${k.char}</div>
      <div class="ktc-read">${k.on.split("・")[0]}</div>
      <div class="ktc-mean">${k.mean.split(",")[0]}</div>
    </div>`;
  }).join("");

  renderKanjiBank();
}

function selectKanji(ki) {
  state.selectedKanjiIdx = ki;
  const k = KANJI_DATA[ki];

  document.getElementById("kanji-detail-card").style.display = "block";
  document.getElementById("kd-char").textContent   = k.char;
  document.getElementById("kd-read").textContent   = `音: ${k.on}　訓: ${k.kun}`;
  document.getElementById("kd-mean").textContent   = k.mean;
  document.getElementById("kd-jlpt").textContent   = k.jlpt;
  document.getElementById("kd-jlpt").className     = `pill ${k.jlpt.toLowerCase()}`;
  document.getElementById("kd-stroke").textContent = `${k.strokes} strokes`;

  document.getElementById("kd-examples").innerHTML = k.examples.length
    ? k.examples.map(ex => `
        <div class="kanji-ex-item">
          <span class="kanji-ex-jp">${ex[0]}</span>
          ${ex[1] ? `<span class="kanji-ex-en"> (${ex[1]})` : ""}
          ${ex[2] ? ` — ${ex[2]}</span>` : "</span>"}
        </div>`).join("")
    : `<div style="font-family:'DM Sans',sans-serif;font-size:12px;color:var(--muted);">No examples available</div>`;

  const learned = state.kanjiLearned.has(ki);
  const btn = document.getElementById("kanji-learn-btn");
  btn.textContent = learned ? "✅ Learned!" : "Mark as Learned";

  document.getElementById("kanji-input").value      = "";
  document.getElementById("kanji-feedback").innerHTML = "";

  document.getElementById("kanji-detail-card").scrollIntoView({behavior:"smooth", block:"nearest"});
  renderKanji();
}

function checkKanji() {
  if (state.selectedKanjiIdx === null) return;
  const k     = KANJI_DATA[state.selectedKanjiIdx];
  const input = document.getElementById("kanji-input").value.trim().toLowerCase();
  if (!input) return;
  const allReadings = [...k.on.split("・"), ...k.kun.split("・")]
    .map(r => r.toLowerCase().replace(/[・。\s]/g, "").replace(/[（(].+?[)）]/g, ""));
  const correct = allReadings.some(r => r && input.replace(/\s/g, "") === r);
  document.getElementById("kanji-feedback").innerHTML = correct
    ? `<div class="feedback-box feedback-correct">✓ Correct! 音: ${k.on}　訓: ${k.kun}</div>`
    : `<div class="feedback-box feedback-wrong">Not quite — 音: ${k.on} / 訓: ${k.kun}</div>`;
}

function markKanjiLearned() {
  if (state.selectedKanjiIdx === null) return;
  const ki = state.selectedKanjiIdx;
  state.kanjiLearned.has(ki) ? state.kanjiLearned.delete(ki) : state.kanjiLearned.add(ki);
  save();
  document.getElementById("kanji-learn-btn").textContent = state.kanjiLearned.has(ki) ? "✅ Learned!" : "Mark as Learned";
  renderKanji();
}

function renderKanjiBank() {
  const search = (document.getElementById("kanji-search") || {}).value?.toLowerCase() || "";
  const jlpt   = state.kanjiJlptFilter;

  document.getElementById("kanji-jlpt-filters").innerHTML = ["All","N5","N4","N3","N2"].map(f =>
    `<button class="chip ${jlpt === f ? "active" : ""}" onclick="setKanjiFilter('${f}')">${f}</button>`).join("");

  const filtered = KANJI_DATA.filter(k => {
    const matchJlpt   = jlpt === "All" || k.jlpt === jlpt;
    const matchSearch = !search || k.char.includes(search) ||
      k.on.toLowerCase().includes(search) || k.kun.toLowerCase().includes(search) ||
      k.mean.toLowerCase().includes(search);
    return matchJlpt && matchSearch;
  });

  document.getElementById("kanji-bank-grid").innerHTML = filtered.map(k => {
    const ki      = KANJI_DATA.indexOf(k);
    const learned = state.kanjiLearned.has(ki);
    return `<div class="kanji-grid-item ${learned ? "learned" : ""}" onclick="selectKanji(${ki})" title="${k.on} / ${k.kun} — ${k.mean}">
      <div class="kanji-grid-char">${k.char}</div>
      <div class="kanji-grid-read">${k.on.split("・")[0]}</div>
      <div class="kanji-grid-mean">${k.mean.split(",")[0]}</div>
    </div>`;
  }).join("");
}

function setKanjiFilter(f) { state.kanjiJlptFilter = f; renderKanjiBank(); }
function filterKanjiBank()  { renderKanjiBank(); }

// ─── QUIZ ─────────────────────────────────────────────────────────────────────
function renderQuizChips() {
  document.getElementById("quiz-chips").innerHTML = LESSONS.map((l, i) =>
    `<button class="chip ${i === state.quizLessonIdx ? "active" : ""}" onclick="selectQuizLesson(${i})">L${l.num}</button>`).join("");
}

function selectQuizLesson(i) {
  state.quizLessonIdx = i; state.quizQIdx = 0; state.quizScore = 0; state.quizAnswered = false;
  renderQuizChips(); renderQuiz();
}

function renderQuiz() {
  const lesson = LESSONS[state.quizLessonIdx];
  const q      = lesson.quiz[state.quizQIdx];
  document.getElementById("quiz-card").style.display   = "block";
  document.getElementById("quiz-result").style.display = "none";
  document.getElementById("quiz-bar").style.width        = ((state.quizQIdx / lesson.quiz.length) * 100) + "%";
  document.getElementById("quiz-score-pill").textContent = "Score: " + state.quizScore;
  document.getElementById("quiz-q-num").textContent      = `Question ${state.quizQIdx + 1} of ${lesson.quiz.length}`;
  document.getElementById("quiz-question").textContent   = q.q;
  document.getElementById("quiz-next-row").style.display = "none";
  document.getElementById("quiz-choices").innerHTML = q.ch.map((c, i) =>
    `<button class="choice-btn" onclick="pickAnswer(${i})">${c}</button>`).join("");
  state.quizAnswered = false;
}

function pickAnswer(i) {
  if (state.quizAnswered) return;
  state.quizAnswered = true;
  const q = LESSONS[state.quizLessonIdx].quiz[state.quizQIdx];
  if (i === q.a) { state.quizScore++; document.querySelectorAll(".choice-btn")[i].classList.add("correct"); }
  else {
    document.querySelectorAll(".choice-btn")[i].classList.add("wrong");
    document.querySelectorAll(".choice-btn")[q.a].classList.add("correct");
  }
  document.querySelectorAll(".choice-btn").forEach(b => b.disabled = true);
  document.getElementById("quiz-next-row").style.display   = "flex";
  document.getElementById("quiz-score-pill").textContent   = "Score: " + state.quizScore;
}

function quizNext() {
  state.quizQIdx++;
  if (state.quizQIdx < LESSONS[state.quizLessonIdx].quiz.length) renderQuiz();
  else showQuizResult();
}

function showQuizResult() {
  const total = LESSONS[state.quizLessonIdx].quiz.length;
  document.getElementById("quiz-card").style.display   = "none";
  document.getElementById("quiz-result").style.display = "block";
  const icon = state.quizScore === total ? "🌸" : state.quizScore >= total / 2 ? "✨" : "💪";
  const msgs = {"🌸":"Perfect score! You know this lesson 🌸","✨":"Nice work! Review any missed ones.","💪":"Keep going — practice makes perfect!"};
  document.getElementById("qr-icon").textContent  = icon;
  document.getElementById("qr-score").textContent = `${state.quizScore}/${total}`;
  document.getElementById("qr-msg").textContent   = msgs[icon];
  document.getElementById("quiz-next-lesson-btn").disabled = state.quizLessonIdx >= 4;
}
function quizRestart()    { state.quizQIdx = 0; state.quizScore = 0; state.quizAnswered = false; renderQuiz(); }
function quizNextLesson() { selectQuizLesson(Math.min(state.quizLessonIdx + 1, 4)); }

// ─── FLASHCARDS ───────────────────────────────────────────────────────────────
function filtered() {
  return state.fcFilter === "All" ? FLASHCARDS : FLASHCARDS.filter(c => c.t === state.fcFilter);
}

function renderFCChips() {
  document.getElementById("fc-chips").innerHTML = ["All","L1","L2","L3","L4","L5"].map(t =>
    `<button class="chip ${t === state.fcFilter ? "active" : ""}" onclick="setFCFilter('${t}')">${t}</button>`).join("");
}

function setFCFilter(tag) { state.fcFilter = tag; state.fcIdx = 0; state.fcFlipped = false; renderFCChips(); renderFC(); }

function renderFC() {
  const cards = filtered();
  const card  = cards[state.fcIdx];
  if (!card) return;
  const fc = document.getElementById("flashcard");
  fc.classList.toggle("flipped", state.fcFlipped);
  document.getElementById("fc-tag").textContent           = card.t;
  document.getElementById("fc-content").textContent       = state.fcFlipped ? card.b : card.f;
  document.getElementById("fc-content").className         = state.fcFlipped ? "fc-back" : "fc-front";
  document.getElementById("fc-hint").textContent          = state.fcFlipped ? "← tap to flip back" : "tap to reveal →";
  document.getElementById("fc-known-badge").style.display = state.fcKnown.has(card.f) ? "block" : "none";
  document.getElementById("fc-prev").disabled             = state.fcIdx === 0;
  document.getElementById("fc-next").disabled             = state.fcIdx === cards.length - 1;
  document.getElementById("fc-stats").innerHTML = `
    <span class="pill green">✓ Known: ${state.fcKnown.size}</span>
    <span class="pill muted">Total: ${cards.length}</span>
    <span class="pill">${state.fcIdx + 1}/${cards.length}</span>`;
}

function flipCard() { state.fcFlipped = !state.fcFlipped; renderFC(); }

function fcMove(dir) {
  const cards = filtered();
  state.fcIdx = Math.max(0, Math.min(cards.length - 1, state.fcIdx + dir));
  state.fcFlipped = false; renderFC();
}

function fcKnow()  { const c = filtered()[state.fcIdx]; if (c) state.fcKnown.add(c.f);    save(); fcMove(1); }
function fcAgain() { const c = filtered()[state.fcIdx]; if (c) state.fcKnown.delete(c.f); save(); fcMove(1); }

// ─── JOURNAL ──────────────────────────────────────────────────────────────────
document.querySelectorAll(".mood-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".mood-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.selectedMood = btn.dataset.mood;
  });
});

function addJournalEntry() {
  const text = document.getElementById("journal-input").value.trim();
  if (!text) return;
  state.journalEntries.unshift({ id: Date.now(), date: fmtDate(new Date()), text, mood: state.selectedMood });
  save();
  document.getElementById("journal-input").value = "";
  renderJournal();
}

function renderJournal() {
  const el = document.getElementById("journal-entries");
  if (!state.journalEntries.length) {
    el.innerHTML = '<div class="empty-state">No entries yet — write your first one above! 🌸</div>';
    return;
  }
  el.innerHTML = state.journalEntries.map(e => `
    <div class="card entry-card">
      <div class="entry-header">
        <span class="entry-date">${e.date}</span>
        <span style="font-size:22px;">${e.mood}</span>
      </div>
      <div class="entry-text">${e.text.replace(/\n/g, "<br>")}</div>
    </div>`).join("");
}

// ─── RESOURCES ────────────────────────────────────────────────────────────────
function renderResources() {
  const mkCards = arr => arr.map(r => `
    <a class="resource-card" href="${r.url}" target="_blank" rel="noopener">
      <span class="resource-icon">${r.icon}</span>
      <div>
        <div class="resource-title">${r.title}</div>
        <div class="resource-desc">${r.desc}</div>
      </div>
    </a>`).join("");
  document.getElementById("jomako-links").innerHTML = mkCards(RESOURCES.jomako);
  document.getElementById("tool-links").innerHTML   = mkCards(RESOURCES.tools);
  document.getElementById("genki-links").innerHTML  = mkCards(RESOURCES.genki);
}

// ─── PETALS ───────────────────────────────────────────────────────────────────
function spawnPetals() {
  const c = document.getElementById("petals");
  for (let i = 0; i < 10; i++) {
    const p = document.createElement("div");
    p.className   = "petal";
    p.textContent = "🌸";
    p.style.left              = Math.random() * 100 + "vw";
    p.style.animationDuration = (9 + Math.random() * 12) + "s";
    p.style.animationDelay    = (Math.random() * 14) + "s";
    p.style.fontSize          = (10 + Math.random() * 10) + "px";
    c.appendChild(p);
  }
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
renderHome();
renderLessons();
renderQuizChips();
renderQuiz();
renderFCChips();
renderFC();
renderJournal();
renderResources();
spawnPetals();
fetchKanji(); // async — fetches from Jo-Mako's sheet then re-renders kanji + home
