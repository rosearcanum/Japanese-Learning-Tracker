/* ══════════════════════════════════════════
   日本語 Study App — app.js  v3
   Vocab: Genki I 3rd ed. official word index (886 words)
   Kanji: static dataset from Jo-Mako's spreadsheet (3,014 entries)
         — baked in via kanji-data.js, no live fetch needed
══════════════════════════════════════════ */

// ── Netlify Identity: redirect to admin after login confirmation ──
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => { document.location.href = "/admin/"; });
    }
  });
}

// ─── KANJI DATA — loaded from the static kanji-data.js file ──────────────────
let KANJI_DATA = [];

function loadKanjiData(){
  showKanjiLoading(true);
  try{
    if(window.KANJI_DATA_FULL && window.KANJI_DATA_FULL.length){
      KANJI_DATA = window.KANJI_DATA_FULL;
      console.log("✅ Loaded "+KANJI_DATA.length+" kanji from static dataset");
    } else {
      console.warn("⚠️ kanji-data.js not found or empty — using fallback");
      KANJI_DATA = FALLBACK_KANJI;
    }
  }catch(e){
    console.warn("⚠️ Kanji data load failed:",e.message,"— using fallback");
    KANJI_DATA = FALLBACK_KANJI;
  }
  showKanjiLoading(false);renderKanji();renderHome();
}
function showKanjiLoading(on){
  const el=document.getElementById("kanji-today-grid");
  if(el&&on)el.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:40px;font-size:12px;color:var(--ink-soft);">🌸 Loading kanji…</div>`;
}

const FALLBACK_KANJI=[
  {char:"日",on:"ニチ・ジツ",kun:"ひ・か",mean:"sun, day",jlpt:"N5",strokes:4,freq2k:true,freq5k:true,examples:[["今日","きょう","today"],["日本","にほん","Japan"]],story:"Pictograph of the sun."},
  {char:"本",on:"ホン",kun:"もと",mean:"book, origin",jlpt:"N5",strokes:5,freq2k:true,freq5k:true,examples:[["本","ほん","book"],["日本語","にほんご","Japanese"]],story:"A tree with its roots marked — the origin."},
  {char:"人",on:"ジン・ニン",kun:"ひと",mean:"person",jlpt:"N5",strokes:2,freq2k:true,freq5k:true,examples:[["人","ひと","person"],["日本人","にほんじん","Japanese person"]],story:"A person walking, seen from the side."},
  {char:"山",on:"サン",kun:"やま",mean:"mountain",jlpt:"N5",strokes:3,freq2k:true,freq5k:true,examples:[["山","やま","mountain"],["富士山","ふじさん","Mt. Fuji"]],story:"Three peaks of a mountain."},
  {char:"川",on:"セン",kun:"かわ",mean:"river",jlpt:"N5",strokes:3,freq2k:true,freq5k:true,examples:[["川","かわ","river"],["小川","おがわ","stream"]],story:"Three streams flowing together."},
];

// ─── LESSONS DATA (all 12 Genki I chapters) ───────────────────────────────────
// vocab: {jp, read, en, pos} — sourced from Marshall Yin + Genki 3rd ed.
const LESSONS = [
  {
    num:1, title:"あのう…", sub:"Excuse me… / Greetings",
    topics:["X は Y です","じゃないです / じゃありません","～か (question)","Noun の Noun","Numbers"],
    grammar:[
      {p:"X は Y です", ex:"メアリーさんはがくせいです。", tr:"Mary is a student."},
      {p:"X は Y じゃないです", ex:"やまださんはがくせいじゃないです。", tr:"Mr. Yamada is not a student."},
      {p:"X は Y ですか", ex:"せんせいですか。", tr:"Are you a teacher?"},
      {p:"Noun の Noun", ex:"にほんごのせんせい", tr:"Japanese language teacher"},
    ],
    vocab:[
      {jp:"アジア研究",read:"アジアけんきゅう",en:"Asian studies",pos:"n."},
      {jp:"あのう",read:"あのう",en:"um . . .",pos:"exp."},
      {jp:"アメリカ",read:"アメリカ",en:"U.S.A.",pos:"n."},
      {jp:"イギリス",read:"イギリス",en:"Britain",pos:"n."},
      {jp:"医者",read:"いしゃ",en:"doctor",pos:"n."},
      {jp:"一時",read:"いちじ",en:"one o’clock",pos:"n."},
      {jp:"一年生",read:"いちねんせい",en:"first-year student",pos:"n."},
      {jp:"一分",read:"いっぷん",en:"one minute",pos:"n."},
      {jp:"今",read:"いま",en:"now",pos:"adv."},
      {jp:"妹",read:"いもうと",en:"younger sister",pos:"n."},
      {jp:"インド",read:"インド",en:"India",pos:"n."},
      {jp:"エジプト",read:"エジプト",en:"Egypt",pos:"n."},
      {jp:"オーストラリア",read:"オーストラリア",en:"Australia",pos:"n."},
      {jp:"お母さん",read:"おかあさん",en:"mother",pos:"n."},
      {jp:"お父さん",read:"おとうさん",en:"father",pos:"n."},
      {jp:"弟",read:"おとうと",en:"younger brother",pos:"n."},
      {jp:"お兄さん",read:"おにいさん",en:"older brother",pos:"n."},
      {jp:"お姉さん",read:"おねえさん",en:"older sister",pos:"n."},
      {jp:"会社員",read:"かいしゃいん",en:"office worker",pos:"n."},
      {jp:"学生",read:"がくせい",en:"student",pos:"n."},
      {jp:"カナダ",read:"カナダ",en:"Canada",pos:"n."},
      {jp:"韓国",read:"かんこく",en:"Korea",pos:"n."},
      {jp:"看護師",read:"かんごし",en:"nurse",pos:"n."},
      {jp:"九分",read:"きゅうふん",en:"nine minutes",pos:"n."},
      {jp:"九時",read:"くじ",en:"nine o’clock",pos:"n."},
      {jp:"経済",read:"けいざい",en:"economics",pos:"n."},
      {jp:"～語",read:"～ご",en:". . . language",pos:"suf."},
      {jp:"高校",read:"こうこう",en:"high school",pos:"n."},
      {jp:"高校生",read:"こうこうせい",en:"high school student",pos:"n."},
      {jp:"国際関係",read:"こくさいかんけい",en:"international relations",pos:"n."},
      {jp:"午後",read:"ごご",en:"p.m.",pos:"n."},
      {jp:"五時",read:"ごじ",en:"five o’clock",pos:"n."},
      {jp:"午前",read:"ごぜん",en:"a.m.",pos:"n."},
      {jp:"五分",read:"ごふん",en:"five minutes",pos:"n."},
      {jp:"コンピューター",read:"コンピューター",en:"computer",pos:"n."},
      {jp:"～歳",read:"～さい",en:". . . years old",pos:"suf."},
      {jp:"～さん",read:"～さん",en:"Mr./Ms. . . .",pos:"suf."},
      {jp:"三時",read:"さんじ",en:"three o’clock",pos:"n."},
      {jp:"三十分",read:"さんじっぷん/さんじゅっぷん",en:"thirty minutes",pos:"n."},
      {jp:"三分",read:"さんぷん",en:"three minutes",pos:"n."},
      {jp:"～時",read:"～じ",en:"o’clock",pos:"suf."},
      {jp:"七時",read:"しちじ",en:"seven o’clock",pos:"n."},
      {jp:"十分",read:"じっぷん",en:"ten minutes",pos:"n."},
      {jp:"十一時",read:"じゅういちじ",en:"eleven o’clock",pos:"n."},
      {jp:"十一分",read:"じゅういっぷん",en:"eleven minutes",pos:"n."},
      {jp:"十九分",read:"じゅうきゅうふん",en:"nineteen minutes",pos:"n."},
      {jp:"十五分",read:"じゅうごふん",en:"fifteen minutes",pos:"n."},
      {jp:"十三分",read:"じゅうさんぷん",en:"thirteen minutes",pos:"n."},
      {jp:"十時",read:"じゅうじ",en:"ten o’clock",pos:"n."},
      {jp:"十七分",read:"じゅうななふん",en:"seventeen minutes",pos:"n."},
      {jp:"十二時",read:"じゅうにじ",en:"twelve o’clock",pos:"n."},
      {jp:"十二分",read:"じゅうにふん",en:"twelve minutes",pos:"n."},
      {jp:"十八分",read:"じゅうはちふん/じゅうはっぷん",en:"eighteen minutes",pos:"n."},
      {jp:"十四分",read:"じゅうよんぷん",en:"fourteen minutes",pos:"n."},
      {jp:"十六分",read:"じゅうろっぷん",en:"sixteen minutes",pos:"n."},
      {jp:"十分",read:"じゅっぷん",en:"ten minutes",pos:"n."},
      {jp:"主婦",read:"しゅふ",en:"housewife",pos:"n."},
      {jp:"～人",read:"～じん",en:". . . people",pos:"suf."},
      {jp:"政治",read:"せいじ",en:"politics",pos:"n."},
      {jp:"生物学",read:"せいぶつがく",en:"biology",pos:"n."},
      {jp:"専攻",read:"せんこう",en:"major",pos:"n."},
      {jp:"先生",read:"せんせい",en:"teacher; Professor . . .",pos:"n."},
      {jp:"そうです",read:"そうです",en:"That’s right.",pos:"exp."},
      {jp:"そうですか",read:"そうですか",en:"I see.; Is that so?",pos:"exp."},
      {jp:"大学",read:"だいがく",en:"college; university",pos:"n."},
      {jp:"大学院生",read:"だいがくいんせい",en:"graduate student",pos:"n."},
      {jp:"大学生",read:"だいがくせい",en:"college student",pos:"n."},
      {jp:"中国",read:"ちゅうごく",en:"China",pos:"n."},
      {jp:"電話",read:"でんわ",en:"telephone",pos:"n."},
      {jp:"友だち",read:"ともだち",en:"friend",pos:"n."},
      {jp:"七分",read:"ななふん",en:"seven minutes",pos:"n."},
      {jp:"何",read:"なに/なん",en:"what",pos:"n."},
      {jp:"名前",read:"なまえ",en:"name",pos:"n."},
      {jp:"何",read:"なん/なに",en:"what",pos:"n."},
      {jp:"二時",read:"にじ",en:"two o’clock",pos:"n."},
      {jp:"二十分",read:"にじっぷん",en:"twenty minutes",pos:"n."},
      {jp:"二時半",read:"にじはん",en:"half past two",pos:"n."},
      {jp:"二十分",read:"にじゅっぷん",en:"twenty minutes",pos:"n."},
      {jp:"二分",read:"にふん",en:"two minutes",pos:"n."},
      {jp:"日本",read:"にほん",en:"Japan",pos:"n."},
      {jp:"日本語",read:"にほんご",en:"Japanese language",pos:"n."},
      {jp:"日本人",read:"にほんじん",en:"Japanese people",pos:"n."},
      {jp:"～年生",read:"～ねんせい",en:". . . year student",pos:"suf."},
      {jp:"はい",read:"はい",en:"yes",pos:"exp."},
      {jp:"八時",read:"はちじ",en:"eight o’clock",pos:"n."},
      {jp:"八分",read:"はちふん",en:"eight minutes",pos:"n."},
      {jp:"八分",read:"はっぷん",en:"eight minutes",pos:"n."},
      {jp:"半",read:"はん",en:"half",pos:"suf."},
      {jp:"～番",read:"～ばん",en:"number . . .",pos:"suf."},
      {jp:"番号",read:"ばんごう",en:"number",pos:"n."},
      {jp:"ビジネス",read:"ビジネス",en:"business",pos:"n."},
      {jp:"フィリピン",read:"フィリピン",en:"Philippines",pos:"n."},
      {jp:"文学",read:"ぶんがく",en:"literature",pos:"n."},
      {jp:"弁護士",read:"べんごし",en:"lawyer",pos:"n."},
      {jp:"四時",read:"よじ",en:"four o’clock",pos:"n."},
      {jp:"四分",read:"よんぷん",en:"four minutes",pos:"n."},
      {jp:"留学生",read:"りゅうがくせい",en:"international student",pos:"n."},
      {jp:"歴史",read:"れきし",en:"history",pos:"n."},
      {jp:"六時",read:"ろくじ",en:"six o’clock",pos:"n."},
      {jp:"六分",read:"ろっぷん",en:"six minutes",pos:"n."},
      {jp:"私",read:"わたし",en:"I",pos:"n."}
    ],
    extraVocab:[],
    kanjiChars:["日","本","人","私","今"],
    quiz:[
      {q:"How do you say 'Mary is a student'?",ch:["メアリーさんはがくせいです。","メアリーさんはがくせいじゃないです。","メアリーさんはせんせいです。","メアリーさんはがくせいですか。"],a:0},
      {q:"What does じゃないです mean?",ch:["is","is not","is it?","and"],a:1},
      {q:"Which word means 'friend'?",ch:["ともだち","なまえ","せんもん","いま"],a:0},
      {q:"How do you form possession (X's Y)?",ch:["X は Y","Y の X","X の Y","X が Y"],a:2},
    ],
  },
  {
    num:2, title:"Buy me that one!", sub:"Shopping / Demonstratives",
    topics:["これ / それ / あれ / どれ","この / その / あの / どの","ここ / そこ / あそこ","～円","Counters"],
    grammar:[
      {p:"これ / それ / あれ", ex:"これはいくらですか。", tr:"How much is this?"},
      {p:"この + Noun", ex:"このかさはいくらですか。", tr:"How much is this umbrella?"},
      {p:"～円です", ex:"さんぜんえんです。", tr:"It's 3,000 yen."},
      {p:"Noun も", ex:"それもおいしいです。", tr:"That is also delicious."},
    ],
    vocab:[
      {jp:"あそこ",read:"あそこ",en:"over there",pos:"n."},
      {jp:"あの",read:"あの",en:"that . . . (over there)",pos:"pre."},
      {jp:"あれ",read:"あれ",en:"that one (over there)",pos:"n."},
      {jp:"いくら",read:"いくら",en:"how much",pos:"n."},
      {jp:"いす",read:"いす",en:"chair",pos:"n."},
      {jp:"いらっしゃいませ",read:"いらっしゃいませ",en:"Welcome (to our store).",pos:"exp."},
      {jp:"英語",read:"えいご",en:"English language",pos:"n."},
      {jp:"～円",read:"～えん",en:". . . yen",pos:"suf."},
      {jp:"おいしい",read:"おいしい",en:"delicious",pos:"い-adj."},
      {jp:"おねがいします（～を）",read:"おねがいします（～を）",en:". . . , please.",pos:"exp."},
      {jp:"カーテン",read:"カーテン",en:"curtain",pos:"n."},
      {jp:"傘",read:"かさ",en:"umbrella",pos:"n."},
      {jp:"かばん",read:"かばん",en:"bag",pos:"n."},
      {jp:"銀行",read:"ぎんこう",en:"bank",pos:"n."},
      {jp:"ください（～を）",read:"ください（～を）",en:"Please give me . . .",pos:"exp."},
      {jp:"靴",read:"くつ",en:"shoes",pos:"n."},
      {jp:"消しゴム",read:"けしゴム",en:"eraser",pos:"n."},
      {jp:"黒板",read:"こくばん",en:"blackboard",pos:"n."},
      {jp:"ここ",read:"ここ",en:"here",pos:"n."},
      {jp:"この",read:"この",en:"this . . .",pos:"pre."},
      {jp:"これ",read:"これ",en:"this one",pos:"n."},
      {jp:"コンビニ",read:"コンビニ",en:"convenience store",pos:"n."},
      {jp:"財布",read:"さいふ",en:"wallet",pos:"n."},
      {jp:"魚",read:"さかな",en:"fish",pos:"n."},
      {jp:"ジーンズ",read:"ジーンズ",en:"jeans",pos:"n."},
      {jp:"辞書",read:"じしょ",en:"dictionary",pos:"n."},
      {jp:"自転車",read:"じてんしゃ",en:"bicycle",pos:"n."},
      {jp:"じゃあ",read:"じゃあ",en:"then . . . ; if that is the case, . . .",pos:"exp."},
      {jp:"新聞",read:"しんぶん",en:"newspaper",pos:"n."},
      {jp:"スマホ",read:"スマホ",en:"smartphone; mobile",pos:"n."},
      {jp:"そこ",read:"そこ",en:"there",pos:"n."},
      {jp:"その",read:"その",en:"that . . .",pos:"pre."},
      {jp:"それ",read:"それ",en:"that one",pos:"n."},
      {jp:"高い",read:"たかい",en:"expensive; high",pos:"い-adj."},
      {jp:"だれ",read:"だれ",en:"who",pos:"n."},
      {jp:"机",read:"つくえ",en:"desk",pos:"n."},
      {jp:"Ｔシャツ",read:"ティーシャツ",en:"T-shirt",pos:"n."},
      {jp:"電気",read:"でんき",en:"electricity; light",pos:"n."},
      {jp:"ドア",read:"ドア",en:"door",pos:"n."},
      {jp:"トイレ",read:"トイレ",en:"toilet; restroom",pos:"n."},
      {jp:"どうぞ",read:"どうぞ",en:"Please.; Here it is.",pos:"exp."},
      {jp:"どうも",read:"どうも",en:"Thank you.",pos:"exp."},
      {jp:"時計",read:"とけい",en:"watch; clock",pos:"n."},
      {jp:"どこ",read:"どこ",en:"where",pos:"n."},
      {jp:"図書館",read:"としょかん",en:"library",pos:"n."},
      {jp:"どの",read:"どの",en:"which . . .",pos:"pre."},
      {jp:"どれ",read:"どれ",en:"which one",pos:"n."},
      {jp:"とんかつ",read:"とんかつ",en:"pork cutlet",pos:"n."},
      {jp:"肉",read:"にく",en:"meat",pos:"n."},
      {jp:"ノート",read:"ノート",en:"notebook",pos:"n."},
      {jp:"ペン",read:"ペン",en:"pen",pos:"n."},
      {jp:"帽子",read:"ぼうし",en:"hat; cap",pos:"n."},
      {jp:"本",read:"ほん",en:"book",pos:"n."},
      {jp:"窓",read:"まど",en:"window",pos:"n."},
      {jp:"メニュー",read:"メニュー",en:"menu",pos:"n."},
      {jp:"野菜",read:"やさい",en:"vegetable",pos:"n."},
      {jp:"郵便局",read:"ゆうびんきょく",en:"post office",pos:"n."}
    ],
    extraVocab:[],
    kanjiChars:["円","本","魚","高","食"],
    quiz:[
      {q:"Which word means 'this one' (near speaker)?",ch:["それ","あれ","これ","どれ"],a:2},
      {q:"'This umbrella' in Japanese?",ch:["そのかさ","あのかさ","このかさ","どのかさ"],a:2},
      {q:"Which means 'expensive'?",ch:["おいしい","たかい","やすい","ふるい"],a:1},
      {q:"Which word means 'how much'?",ch:["いくつ","いくら","なんさい","なんじ"],a:1},
    ],
  },
  {
    num:3, title:"デートの約束", sub:"Making a date / Verb conjugation",
    topics:["ます form verbs (present/future)","Verb groups ru / u","Time expressions","～ませんか / ～ましょう"],
    grammar:[
      {p:"Verb + ます (present/future)", ex:"まいにちにほんごをべんきょうします。", tr:"I study Japanese every day."},
      {p:"Verb + ません (negative)", ex:"コーヒーをのみません。", tr:"I don't drink coffee."},
      {p:"～ませんか (invitation)", ex:"えいがをみませんか。", tr:"Won't you watch a movie with me?"},
      {p:"～ましょう (suggestion)", ex:"いっしょにたべましょう。", tr:"Let's eat together."},
    ],
    vocab:[
      {jp:"アイスクリーム",read:"アイスクリーム",en:"ice cream",pos:"n."},
      {jp:"朝",read:"あさ",en:"morning",pos:"n."},
      {jp:"朝ご飯",read:"あさごはん",en:"breakfast",pos:"n."},
      {jp:"明日",read:"あした",en:"tomorrow",pos:"n."},
      {jp:"あまり ＋ negative",read:"あまり ＋ negative",en:"not much",pos:"adv."},
      {jp:"いい",read:"いい",en:"good",pos:"い-adj."},
      {jp:"家",read:"いえ",en:"home; house",pos:"n."},
      {jp:"行く",read:"いく",en:"to go",pos:"u-v."},
      {jp:"いつ",read:"いつ",en:"when",pos:"n."},
      {jp:"うち",read:"うち",en:"home; house; my place",pos:"n."},
      {jp:"映画",read:"えいが",en:"movie",pos:"n."},
      {jp:"ええ",read:"ええ",en:"yes",pos:"exp."},
      {jp:"起きる",read:"おきる",en:"to get up",pos:"ru-v."},
      {jp:"お酒",read:"おさけ",en:"sake; alcoholic drink",pos:"n."},
      {jp:"お茶",read:"おちゃ",en:"green tea",pos:"n."},
      {jp:"音楽",read:"おんがく",en:"music",pos:"n."},
      {jp:"帰る",read:"かえる",en:"to go back; to return",pos:"u-v."},
      {jp:"学校",read:"がっこう",en:"school",pos:"n."},
      {jp:"カフェ",read:"カフェ",en:"cafe",pos:"n."},
      {jp:"聞く",read:"きく",en:"to listen; to hear",pos:"u-v."},
      {jp:"今日",read:"きょう",en:"today",pos:"n."},
      {jp:"来る",read:"くる",en:"to come",pos:"irr-v."},
      {jp:"コーヒー",read:"コーヒー",en:"coffee",pos:"n."},
      {jp:"～ごろ",read:"～ごろ",en:"at about . . .",pos:"suf."},
      {jp:"今晩",read:"こんばん",en:"tonight",pos:"n."},
      {jp:"酒",read:"さけ",en:"sake; alcohol",pos:"n."},
      {jp:"雑誌",read:"ざっし",en:"magazine",pos:"n."},
      {jp:"週末",read:"しゅうまつ",en:"weekend",pos:"n."},
      {jp:"スポーツ",read:"スポーツ",en:"sports",pos:"n."},
      {jp:"する",read:"する",en:"to do",pos:"irr-v."},
      {jp:"全然",read:"ぜんぜん ＋ negative",en:"not at all",pos:"adv."},
      {jp:"そうですね",read:"そうですね",en:"That’s right.; Let me see.",pos:"exp."},
      {jp:"たいてい",read:"たいてい",en:"usually",pos:"adv."},
      {jp:"食べる",read:"たべる",en:"to eat",pos:"ru-v."},
      {jp:"茶",read:"ちゃ",en:"green tea",pos:"n."},
      {jp:"ちょっと",read:"ちょっと",en:"a little",pos:"adv."},
      {jp:"デート",read:"デート",en:"date (romantic, not calendar)",pos:"n."},
      {jp:"テニス",read:"テニス",en:"tennis",pos:"n."},
      {jp:"でも",read:"でも",en:"but",pos:"exp."},
      {jp:"テレビ",read:"テレビ",en:"TV",pos:"n."},
      {jp:"どうですか",read:"どうですか",en:"How about . . . ?; How is . . . ?",pos:"exp."},
      {jp:"時々",read:"ときどき",en:"sometimes",pos:"adv."},
      {jp:"土曜日",read:"どようび",en:"Saturday",pos:"n."},
      {jp:"日曜日",read:"にちようび",en:"Sunday",pos:"n."},
      {jp:"寝る",read:"ねる",en:"to sleep; to go to sleep",pos:"ru-v."},
      {jp:"飲む",read:"のむ",en:"to drink",pos:"u-v."},
      {jp:"話す",read:"はなす",en:"to speak; to talk",pos:"u-v."},
      {jp:"早い",read:"はやい",en:"early",pos:"い-adj."},
      {jp:"晩ご飯",read:"ばんごはん",en:"dinner",pos:"n."},
      {jp:"ハンバーガー",read:"ハンバーガー",en:"hamburger",pos:"n."},
      {jp:"昼ご飯",read:"ひるごはん",en:"lunch",pos:"n."},
      {jp:"勉強する",read:"べんきょうする",en:"to study",pos:"irr-v."},
      {jp:"毎日",read:"まいにち",en:"every day",pos:"n."},
      {jp:"毎晩",read:"まいばん",en:"every night",pos:"n."},
      {jp:"水",read:"みず",en:"water",pos:"n."},
      {jp:"見る",read:"みる",en:"to see; to look at; to watch",pos:"ru-v."},
      {jp:"よく",read:"よく",en:"often; much",pos:"adv."},
      {jp:"読む",read:"よむ",en:"to read",pos:"u-v."}
    ],
    extraVocab:[],
    kanjiChars:["水","食","飲","見","聞"],
    quiz:[
      {q:"Polite present / future verb ending?",ch:["ます","ません","ました","ませんか"],a:0},
      {q:"'Won't you drink coffee?' uses which form?",ch:["のみます","のみません","のみませんか","のみましょう"],a:2},
      {q:"Which means 'Let's ~'?",ch:["〜ませんか","〜ましょう","〜ません","〜ます"],a:1},
      {q:"Which verb group does 食べる belong to?",ch:["u-verb","ru-verb","irregular","neither"],a:1},
    ],
  },
  {
    num:4, title:"Mary's Home", sub:"Existence / Location / Past tense",
    topics:["X が あります / います","Location words","Past tense of verbs","Days of the week"],
    grammar:[
      {p:"X は Y に あります (location of things)", ex:"ほんはつくえのうえにあります。", tr:"The book is on the desk."},
      {p:"X は Y に います (location of people)", ex:"ねこはどこにいますか。", tr:"Where is the cat?"},
      {p:"Verb + ました (past)", ex:"きのうえいがをみました。", tr:"I watched a movie yesterday."},
      {p:"Verb + ませんでした (past neg.)", ex:"べんきょうしませんでした。", tr:"I didn't study."},
    ],
    vocab:[
      {jp:"間",read:"あいだ",en:"between",pos:"n."},
      {jp:"会う",read:"あう",en:"to meet; to see (a person)",pos:"u-v."},
      {jp:"あさって",read:"あさって",en:"the day after tomorrow",pos:"n."},
      {jp:"あなた",read:"あなた",en:"you",pos:"n."},
      {jp:"ある",read:"ある",en:"there is . . .",pos:"u-v."},
      {jp:"アルバイト",read:"アルバイト",en:"part-time job",pos:"n."},
      {jp:"一月",read:"いちがつ",en:"January",pos:"n."},
      {jp:"一時間",read:"いちじかん",en:"one hour",pos:"n."},
      {jp:"五日",read:"いつか",en:"the fifth day of a month",pos:"n."},
      {jp:"犬",read:"いぬ",en:"dog",pos:"n."},
      {jp:"いる",read:"いる",en:"(a person) is in . . . ; stays at . . .",pos:"ru-v."},
      {jp:"上",read:"うえ",en:"on",pos:"n."},
      {jp:"後ろ",read:"うしろ",en:"back",pos:"n."},
      {jp:"お寺",read:"おてら",en:"temple",pos:"n."},
      {jp:"おととい",read:"おととい",en:"the day before yesterday",pos:"n."},
      {jp:"おととし",read:"おととし",en:"the year before last",pos:"n."},
      {jp:"買い物",read:"かいもの",en:"shopping",pos:"n."},
      {jp:"買う",read:"かう",en:"to buy",pos:"u-v."},
      {jp:"書く",read:"かく",en:"to write",pos:"u-v."},
      {jp:"火曜日",read:"かようび",en:"Tuesday",pos:"n."},
      {jp:"昨日",read:"きのう",en:"yesterday",pos:"n."},
      {jp:"去年",read:"きょねん",en:"last year",pos:"n."},
      {jp:"金曜日",read:"きんようび",en:"Friday",pos:"n."},
      {jp:"九月",read:"くがつ",en:"September",pos:"n."},
      {jp:"～ぐらい",read:"～ぐらい",en:"about (approximate measurement)",pos:"suf."},
      {jp:"クラス",read:"クラス",en:"class",pos:"n."},
      {jp:"ゲーム",read:"ゲーム",en:"game",pos:"n."},
      {jp:"月曜日",read:"げつようび",en:"Monday",pos:"n."},
      {jp:"公園",read:"こうえん",en:"park",pos:"n."},
      {jp:"五月",read:"ごがつ",en:"May",pos:"n."},
      {jp:"九日",read:"ここのか",en:"the ninth day of a month",pos:"n."},
      {jp:"今年",read:"ことし",en:"this year",pos:"n."},
      {jp:"子供",read:"こども",en:"child",pos:"n."},
      {jp:"ご飯",read:"ごはん",en:"rice; meal",pos:"n."},
      {jp:"ごめんなさい",read:"ごめんなさい",en:"I’m sorry.",pos:"exp."},
      {jp:"今月",read:"こんげつ",en:"this month",pos:"n."},
      {jp:"今週",read:"こんしゅう",en:"this week",pos:"n."},
      {jp:"再来月",read:"さらいげつ",en:"the month after next",pos:"n."},
      {jp:"再来週",read:"さらいしゅう",en:"the week after next",pos:"n."},
      {jp:"再来年",read:"さらいねん",en:"the year after next",pos:"n."},
      {jp:"三月",read:"さんがつ",en:"March",pos:"n."},
      {jp:"四月",read:"しがつ",en:"April",pos:"n."},
      {jp:"～時間",read:"～じかん",en:". . . hours",pos:"suf."},
      {jp:"下",read:"した",en:"under",pos:"n."},
      {jp:"七月",read:"しちがつ",en:"July",pos:"n."},
      {jp:"写真",read:"しゃしん",en:"picture; photograph",pos:"n."},
      {jp:"十一月",read:"じゅういちがつ",en:"November",pos:"n."},
      {jp:"十一日",read:"じゅういちにち",en:"the eleventh day of a month",pos:"n."},
      {jp:"十月",read:"じゅうがつ",en:"October",pos:"n."},
      {jp:"十二月",read:"じゅうにがつ",en:"December",pos:"n."},
      {jp:"十四日",read:"じゅうよっか",en:"the fourteenth day of a month",pos:"n."},
      {jp:"水曜日",read:"すいようび",en:"Wednesday",pos:"n."},
      {jp:"スーパー",read:"スーパー",en:"supermarket",pos:"n."},
      {jp:"先月",read:"せんげつ",en:"last month",pos:"n."},
      {jp:"先週",read:"せんしゅう",en:"last week",pos:"n."},
      {jp:"それから",read:"それから",en:"and then",pos:"adv."},
      {jp:"だから",read:"だから",en:"so; therefore",pos:"adv."},
      {jp:"たくさん",read:"たくさん",en:"many; a lot",pos:"adv."},
      {jp:"近く",read:"ちかく",en:"near; nearby",pos:"n."},
      {jp:"一日",read:"ついたち",en:"the first day of a month",pos:"n."},
      {jp:"寺",read:"てら",en:"temple",pos:"n."},
      {jp:"～と",read:"～と",en:"together with (a person); and",pos:"part."},
      {jp:"どうして",read:"どうして",en:"why",pos:"adv."},
      {jp:"十日",read:"とおか",en:"the tenth day of a month",pos:"n."},
      {jp:"時",read:"とき",en:"when . . . ; at the time of . . .",pos:"n."},
      {jp:"隣",read:"となり",en:"next",pos:"n."},
      {jp:"撮る",read:"とる",en:"to take (a picture)",pos:"u-v."},
      {jp:"中",read:"なか",en:"inside",pos:"n."},
      {jp:"七日",read:"なのか",en:"the seventh day of a month",pos:"n."},
      {jp:"二か月前",read:"にかげつまえ",en:"two months ago",pos:"n."},
      {jp:"二月",read:"にがつ",en:"February",pos:"n."},
      {jp:"二週間前",read:"にしゅうかんまえ",en:"two weeks ago",pos:"n."},
      {jp:"二十四日",read:"にじゅうよっか",en:"the twenty-fourth day of a month",pos:"n."},
      {jp:"猫",read:"ねこ",en:"cat",pos:"n."},
      {jp:"バス停",read:"バスてい",en:"bus stop",pos:"n."},
      {jp:"八月",read:"はちがつ",en:"August",pos:"n."},
      {jp:"二十日",read:"はつか",en:"the twentieth day of a month",pos:"n."},
      {jp:"花",read:"はな",en:"flower",pos:"n."},
      {jp:"パン",read:"パン",en:"bread",pos:"n."},
      {jp:"左",read:"ひだり",en:"left",pos:"n."},
      {jp:"人",read:"ひと",en:"person",pos:"n."},
      {jp:"一人で",read:"ひとりで",en:"alone",pos:"adv."},
      {jp:"病院",read:"びょういん",en:"hospital",pos:"n."},
      {jp:"二日",read:"ふつか",en:"the second day of a month",pos:"n."},
      {jp:"ホテル",read:"ホテル",en:"hotel",pos:"n."},
      {jp:"本屋",read:"ほんや",en:"bookstore",pos:"n."},
      {jp:"前",read:"まえ",en:"front",pos:"n."},
      {jp:"町",read:"まち",en:"town; city",pos:"n."},
      {jp:"待つ",read:"まつ",en:"to wait",pos:"u-v."},
      {jp:"右",read:"みぎ",en:"right",pos:"n."},
      {jp:"三日",read:"みっか",en:"the third day of a month",pos:"n."},
      {jp:"六日",read:"むいか",en:"the sixth day of a month",pos:"n."},
      {jp:"木曜日",read:"もくようび",en:"Thursday",pos:"n."},
      {jp:"もしもし",read:"もしもし",en:"Hello? (used on the phone)",pos:"exp."},
      {jp:"八日",read:"ようか",en:"the eighth day of a month",pos:"n."},
      {jp:"四日",read:"よっか",en:"the fourth day of a month",pos:"n."},
      {jp:"来月",read:"らいげつ",en:"next month",pos:"n."},
      {jp:"来週",read:"らいしゅう",en:"next week",pos:"n."},
      {jp:"来年",read:"らいねん",en:"next year",pos:"n."},
      {jp:"レストラン",read:"レストラン",en:"restaurant",pos:"n."},
      {jp:"レポート",read:"レポート",en:"(term) paper",pos:"n."},
      {jp:"六月",read:"ろくがつ",en:"June",pos:"n."},
      {jp:"わかる",read:"わかる",en:"to understand",pos:"u-v."}
    ],
    extraVocab:[],
    kanjiChars:["月","火","水","木","金"],
    quiz:[
      {q:"Which verb is used for living things?",ch:["あります","います","です","します"],a:1},
      {q:"'I met a friend yesterday' — verb form?",ch:["あいます","あいません","あいました","あっています"],a:2},
      {q:"Which word means 'between'?",ch:["うえ","した","となり","あいだ"],a:3},
      {q:"Which means 'to understand'?",ch:["わかる","おわる","かかる","さわる"],a:0},
    ],
  },
  {
    num:5, title:"A Trip to Okinawa", sub:"Adjectives / て-form / Describing things",
    topics:["い-adjectives","な-adjectives","Adjective + Noun","て-form for sequence","〜てから"],
    grammar:[
      {p:"い-adj + です", ex:"おきなわはあついです。", tr:"Okinawa is hot."},
      {p:"い-adj past: ～かった", ex:"たのしかったです。", tr:"It was fun."},
      {p:"な-adj + です", ex:"おきなわはきれいです。", tr:"Okinawa is beautiful."},
      {p:"Verb + て (sequential)", ex:"おきて、シャワーをあびます。", tr:"I wake up and take a shower."},
    ],
    vocab:[
      {jp:"新しい",read:"あたらしい",en:"new",pos:"い-adj."},
      {jp:"熱い",read:"あつい",en:"hot (thing)",pos:"い-adj."},
      {jp:"暑い",read:"あつい",en:"hot (weather)",pos:"い-adj."},
      {jp:"忙しい",read:"いそがしい",en:"busy (people/days)",pos:"い-adj."},
      {jp:"一緒に",read:"いっしょに",en:"together",pos:"adv."},
      {jp:"海",read:"うみ",en:"sea",pos:"n."},
      {jp:"Ｌサイズ",read:"エルサイズ",en:"size L",pos:"n."},
      {jp:"大きい",read:"おおきい",en:"large",pos:"い-adj."},
      {jp:"お土産",read:"おみやげ",en:"souvenir",pos:"n."},
      {jp:"面白い",read:"おもしろい",en:"interesting; funny",pos:"い-adj."},
      {jp:"泳ぐ",read:"およぐ",en:"to swim",pos:"u-v."},
      {jp:"かっこいい",read:"かっこいい",en:"good-looking",pos:"い-adj."},
      {jp:"聞く",read:"きく",en:"to ask",pos:"u-v."},
      {jp:"嫌い",read:"きらい（な）",en:"disgusted with; to dislike",pos:"な-adj."},
      {jp:"きれい（な）",read:"きれい（な）",en:"beautiful; clean",pos:"な-adj."},
      {jp:"果物",read:"くだもの",en:"fruit",pos:"n."},
      {jp:"元気",read:"げんき（な）",en:"healthy; energetic",pos:"な-adj."},
      {jp:"怖い",read:"こわい",en:"frightening",pos:"い-adj."},
      {jp:"サーフィン",read:"サーフィン",en:"surfing",pos:"n."},
      {jp:"寒い",read:"さむい",en:"cold (weather)",pos:"い-adj."},
      {jp:"静か",read:"しずか（な）",en:"quiet",pos:"な-adj."},
      {jp:"宿題",read:"しゅくだい",en:"homework",pos:"n."},
      {jp:"好き",read:"すき（な）",en:"fond of; to like",pos:"な-adj."},
      {jp:"すごく",read:"すごく",en:"extremely",pos:"adv."},
      {jp:"大嫌い",read:"だいきらい（な）",en:"to hate",pos:"な-adj."},
      {jp:"大丈夫",read:"だいじょうぶ",en:"It’s okay.; Not to worry.; Everything is under control.",pos:"exp."},
      {jp:"大好き",read:"だいすき（な）",en:"very fond of; to love",pos:"な-adj."},
      {jp:"楽しい",read:"たのしい",en:"fun",pos:"い-adj."},
      {jp:"食べ物",read:"たべもの",en:"food",pos:"n."},
      {jp:"誕生日",read:"たんじょうび",en:"birthday",pos:"n."},
      {jp:"小さい",read:"ちいさい",en:"small",pos:"い-adj."},
      {jp:"つまらない",read:"つまらない",en:"boring",pos:"い-adj."},
      {jp:"出かける",read:"でかける",en:"to go out",pos:"ru-v."},
      {jp:"テスト",read:"テスト",en:"test",pos:"n."},
      {jp:"天気",read:"てんき",en:"weather",pos:"n."},
      {jp:"とても",read:"とても",en:"very",pos:"adv."},
      {jp:"どんな",read:"どんな",en:"what kind of . . .",pos:"pre."},
      {jp:"にぎやか（な）",read:"にぎやか（な）",en:"lively",pos:"な-adj."},
      {jp:"飲み物",read:"のみもの",en:"drink",pos:"n."},
      {jp:"乗る",read:"のる",en:"to ride; to board",pos:"u-v."},
      {jp:"バス",read:"バス",en:"bus",pos:"n."},
      {jp:"暇",read:"ひま（な）",en:"not busy; free (time)",pos:"な-adj."},
      {jp:"古い",read:"ふるい",en:"old (thing)",pos:"い-adj."},
      {jp:"部屋",read:"へや",en:"room",pos:"n."},
      {jp:"僕",read:"ぼく",en:"I (used by men)",pos:"n."},
      {jp:"～枚",read:"～まい",en:"[counter for flat objects]",pos:"suf."},
      {jp:"土産",read:"みやげ",en:"souvenir",pos:"n."},
      {jp:"難しい",read:"むずかしい",en:"difficult",pos:"い-adj."},
      {jp:"やさしい",read:"やさしい",en:"easy (problem); kind (person)",pos:"い-adj."},
      {jp:"安い",read:"やすい",en:"inexpensive; cheap (thing)",pos:"い-adj."},
      {jp:"休み",read:"やすみ",en:"holiday; day off; absence",pos:"n."},
      {jp:"やる",read:"やる",en:"to do; to perform",pos:"u-v."},
      {jp:"旅行",read:"りょこう",en:"travel",pos:"n."}
    ],
    extraVocab:[],
    kanjiChars:["海","天","新","古","楽"],
    quiz:[
      {q:"Past tense of おもしろい (interesting)?",ch:["おもしろいでした","おもしろかったです","おもしろじゃなかったです","おもしろくないです"],a:1},
      {q:"きれい is what type of adjective?",ch:["い-adjective","な-adjective","noun","adverb"],a:1},
      {q:"'It was fun' in Japanese?",ch:["たのしいです","たのしかったです","たのしくないです","たのしくなかったです"],a:1},
      {q:"Which means 'difficult'?",ch:["むずかしい","いそがしい","あたらしい","こわい"],a:0},
    ],
  },
  {
    num:6, title:"〜てください", sub:"Requests / て-form uses / Must & must not",
    topics:["て-form of verbs","〜てください","〜てもいいですか","〜てはいけません","〜なければなりません"],
    grammar:[
      {p:"〜てください (please do)", ex:"ちょっとまってください。", tr:"Please wait a moment."},
      {p:"〜てもいいですか (may I?)", ex:"ここにすわってもいいですか。", tr:"May I sit here?"},
      {p:"〜てはいけません (must not)", ex:"たばこをすってはいけません。", tr:"You must not smoke."},
      {p:"〜なければなりません (must)", ex:"しゅくだいをしなければなりません。", tr:"I must do my homework."},
    ],
    vocab:[
      {jp:"開ける",read:"あける",en:"to open (something)",pos:"ru-v."},
      {jp:"遊ぶ",read:"あそぶ",en:"to play; to spend time pleasantly",pos:"u-v."},
      {jp:"後で",read:"あとで",en:"later on",pos:"adv."},
      {jp:"急ぐ",read:"いそぐ",en:"to hurry",pos:"u-v."},
      {jp:"エアコン",read:"エアコン",en:"air conditioner",pos:"n."},
      {jp:"お金",read:"おかね",en:"money",pos:"n."},
      {jp:"教える",read:"おしえる",en:"to teach; to instruct",pos:"ru-v."},
      {jp:"降りる",read:"おりる",en:"to get off",pos:"ru-v."},
      {jp:"返す",read:"かえす",en:"to return (a thing)",pos:"u-v."},
      {jp:"角",read:"かど",en:"corner",pos:"n."},
      {jp:"金",read:"かね",en:"money",pos:"n."},
      {jp:"借りる",read:"かりる",en:"to borrow",pos:"ru-v."},
      {jp:"漢字",read:"かんじ",en:"kanji; Chinese character",pos:"n."},
      {jp:"北",read:"きた",en:"north",pos:"n."},
      {jp:"教科書",read:"きょうかしょ",en:"textbook",pos:"n."},
      {jp:"国",read:"くに",en:"country; place of origin",pos:"n."},
      {jp:"消す",read:"けす",en:"to turn off; to erase",pos:"u-v."},
      {jp:"結構です",read:"けっこうです",en:"That would be fine.; That wouldn’t be necessary.",pos:"exp."},
      {jp:"死ぬ",read:"しぬ",en:"to die",pos:"u-v."},
      {jp:"閉める",read:"しめる",en:"to close (something)",pos:"ru-v."},
      {jp:"シャワー",read:"シャワー",en:"shower",pos:"n."},
      {jp:"シャワーを浴びる",read:"シャワーをあびる",en:"to take a shower",pos:"ru-v."},
      {jp:"信号",read:"しんごう",en:"traffic light",pos:"n."},
      {jp:"すぐ",read:"すぐ",en:"right away",pos:"adv."},
      {jp:"座る",read:"すわる",en:"to sit down",pos:"u-v."},
      {jp:"大変",read:"たいへん（な）",en:"tough (situation)",pos:"な-adj."},
      {jp:"立つ",read:"たつ",en:"to stand up",pos:"u-v."},
      {jp:"たばこを吸う",read:"たばこをすう",en:"to smoke",pos:"u-v."},
      {jp:"使う",read:"つかう",en:"to use",pos:"u-v."},
      {jp:"次",read:"つぎ",en:"next",pos:"n."},
      {jp:"つける",read:"つける",en:"to turn on",pos:"ru-v."},
      {jp:"連れてくる",read:"つれてくる",en:"to bring (a person)",pos:"irr-v."},
      {jp:"手伝う",read:"てつだう",en:"to help",pos:"u-v."},
      {jp:"電車",read:"でんしゃ",en:"train",pos:"n."},
      {jp:"電話する",read:"でんわする",en:"to call",pos:"irr-v."},
      {jp:"西",read:"にし",en:"west",pos:"n."},
      {jp:"荷物",read:"にもつ",en:"baggage",pos:"n."},
      {jp:"入る",read:"はいる",en:"to enter",pos:"u-v."},
      {jp:"パソコン",read:"パソコン",en:"personal computer",pos:"n."},
      {jp:"東",read:"ひがし",en:"east",pos:"n."},
      {jp:"左側",read:"ひだりがわ",en:"left side",pos:"n."},
      {jp:"一つ目",read:"ひとつめ",en:"first",pos:"n."},
      {jp:"二つ目",read:"ふたつめ",en:"second",pos:"n."},
      {jp:"ページ",read:"ページ",en:"page",pos:"n."},
      {jp:"本当ですか",read:"ほんとうですか",en:"Really?",pos:"exp."},
      {jp:"曲がる",read:"まがる",en:"to turn (right/left)",pos:"u-v."},
      {jp:"まっすぐ",read:"まっすぐ",en:"straight",pos:"adv."},
      {jp:"右側",read:"みぎがわ",en:"right side",pos:"n."},
      {jp:"三つ目",read:"みっつめ",en:"third",pos:"n."},
      {jp:"南",read:"みなみ",en:"south",pos:"n."},
      {jp:"持つ",read:"もつ",en:"to carry; to hold",pos:"u-v."},
      {jp:"持ってくる",read:"もってくる",en:"to bring (a thing)",pos:"irr-v."},
      {jp:"休む",read:"やすむ",en:"to be absent (from); to rest",pos:"u-v."},
      {jp:"ゆっくり",read:"ゆっくり",en:"slowly; leisurely; unhurriedly",pos:"adv."},
      {jp:"夜",read:"よる",en:"night",pos:"n."},
      {jp:"忘れる",read:"わすれる",en:"to forget; to leave behind",pos:"ru-v."},
      {jp:"渡る",read:"わたる",en:"to cross",pos:"u-v."}
    ],
    extraVocab:[],
    kanjiChars:["電","車","来","週","漢"],
    quiz:[
      {q:"'Please open the window' in Japanese?",ch:["まどをあけてもいいですか。","まどをあけてください。","まどをあけてはいけません。","まどをあけなければなりません。"],a:1},
      {q:"〜てもいいですか means:",ch:["Please do ~","You must not ~","May I ~?","You must ~"],a:2},
      {q:"Which means 'to forget'?",ch:["かりる","おしえる","わすれる","つける"],a:2},
      {q:"'You must not smoke' uses which form?",ch:["〜てください","〜てもいいです","〜てはいけません","〜なければなりません"],a:2},
    ],
  },
  {
    num:7, title:"Family Picture", sub:"〜ている / Describing people",
    topics:["〜ている (ongoing actions/states)","Describing appearance","Counters for people","〜が vs を"],
    grammar:[
      {p:"〜ている (ongoing action)", ex:"たろうさんはテレビをみています。", tr:"Taro is watching TV."},
      {p:"〜ている (resultant state)", ex:"けっこんしています。", tr:"I am married (and currently so)."},
      {p:"〜が (subject in relative clause)", ex:"めがねをかけているひと", tr:"The person wearing glasses"},
      {p:"Describing with て-form + います", ex:"かみがながいです。", tr:"Her hair is long."},
    ],
    vocab:[
      {jp:"足",read:"あし",en:"leg; foot",pos:"n."},
      {jp:"頭",read:"あたま",en:"head",pos:"n."},
      {jp:"頭がいい",read:"あたまがいい",en:"bright; smart; clever",pos:"い-adj."},
      {jp:"兄",read:"あに",en:"(my) older brother",pos:"n."},
      {jp:"姉",read:"あね",en:"(my) older sister",pos:"n."},
      {jp:"歌",read:"うた",en:"song",pos:"n."},
      {jp:"歌う",read:"うたう",en:"to sing",pos:"u-v."},
      {jp:"おじいさん",read:"おじいさん",en:"grandfather; old man",pos:"n."},
      {jp:"お尻",read:"おしり",en:"buttocks",pos:"n."},
      {jp:"男の人",read:"おとこのひと",en:"man",pos:"n."},
      {jp:"おなか",read:"おなか",en:"stomach",pos:"n."},
      {jp:"おばあさん",read:"おばあさん",en:"grandmother; old woman",pos:"n."},
      {jp:"女の人",read:"おんなのひと",en:"woman",pos:"n."},
      {jp:"～が",read:"～が",en:". . . , but",pos:"part."},
      {jp:"会社",read:"かいしゃ",en:"company",pos:"n."},
      {jp:"顔",read:"かお",en:"face",pos:"n."},
      {jp:"かける（眼鏡を）",read:"かける（めがねを）",en:"to put on (glasses)",pos:"ru-v."},
      {jp:"家族",read:"かぞく",en:"family",pos:"n."},
      {jp:"肩",read:"かた",en:"shoulder",pos:"n."},
      {jp:"かぶる",read:"かぶる",en:"to put on (a hat)",pos:"u-v."},
      {jp:"髪",read:"かみ",en:"hair",pos:"n."},
      {jp:"かわいい",read:"かわいい",en:"cute",pos:"い-adj."},
      {jp:"兄弟",read:"きょうだい",en:"brothers and sisters",pos:"n."},
      {jp:"着る",read:"きる",en:"to put on (clothes above your waist)",pos:"ru-v."},
      {jp:"口",read:"くち",en:"mouth",pos:"n."},
      {jp:"首",read:"くび",en:"neck",pos:"n."},
      {jp:"車",read:"くるま",en:"car",pos:"n."},
      {jp:"結婚する",read:"けっこんする",en:"to get married",pos:"irr-v."},
      {jp:"サークル",read:"サークル",en:"club activity",pos:"n."},
      {jp:"知っています",read:"しっています",en:"I know",pos:"exp."},
      {jp:"食堂",read:"しょくどう",en:"cafeteria; dining commons",pos:"n."},
      {jp:"尻",read:"しり",en:"buttocks",pos:"n."},
      {jp:"知りません",read:"しりません",en:"I do not know",pos:"exp."},
      {jp:"知る",read:"しる",en:"to get to know",pos:"u-v."},
      {jp:"親切",read:"しんせつ（な）",en:"kind",pos:"な-adj."},
      {jp:"住む",read:"すむ",en:"to live",pos:"u-v."},
      {jp:"背が高い",read:"せがたかい",en:"tall (stature)",pos:"い-adj."},
      {jp:"背が低い",read:"せがひくい",en:"short (stature)",pos:"い-adj."},
      {jp:"背中",read:"せなか",en:"back (body)",pos:"n."},
      {jp:"父",read:"ちち",en:"(my) father",pos:"n."},
      {jp:"手",read:"て",en:"hand; arm",pos:"n."},
      {jp:"デパート",read:"デパート",en:"department store",pos:"n."},
      {jp:"長い",read:"ながい",en:"long",pos:"い-adj."},
      {jp:"何も",read:"なにも ＋ negative",en:"not . . . anything",pos:"adv."},
      {jp:"～人",read:"～にん",en:"[counter for people]",pos:"suf."},
      {jp:"歯",read:"は",en:"tooth",pos:"n."},
      {jp:"はく",read:"はく",en:"to put on (items below your waist)",pos:"u-v."},
      {jp:"働く",read:"はたらく",en:"to work",pos:"u-v."},
      {jp:"鼻",read:"はな",en:"nose",pos:"n."},
      {jp:"母",read:"はは",en:"(my) mother",pos:"n."},
      {jp:"速い",read:"はやい",en:"fast",pos:"い-adj."},
      {jp:"一人",read:"ひとり",en:"one person",pos:"exp."},
      {jp:"二人",read:"ふたり",en:"two people",pos:"exp."},
      {jp:"太っています",read:"ふとっています",en:"to be on the heavy side",pos:"exp."},
      {jp:"太る",read:"ふとる",en:"to gain weight; overweight",pos:"u-v."},
      {jp:"別に",read:"べつに ＋ negative",en:"nothing in particular",pos:"adv."},
      {jp:"便利",read:"べんり（な）",en:"convenient",pos:"な-adj."},
      {jp:"眉毛",read:"まゆげ",en:"eyebrow",pos:"n."},
      {jp:"短い",read:"みじかい",en:"short (length)",pos:"い-adj."},
      {jp:"耳",read:"みみ",en:"ear",pos:"n."},
      {jp:"胸",read:"むね",en:"breast",pos:"n."},
      {jp:"目",read:"め",en:"eye",pos:"n."},
      {jp:"眼鏡",read:"めがね",en:"glasses",pos:"n."},
      {jp:"もちろん",read:"もちろん",en:"of course",pos:"adv."},
      {jp:"やせています",read:"やせています",en:"to be thin",pos:"exp."},
      {jp:"やせる",read:"やせる",en:"to lose weight",pos:"ru-v."},
      {jp:"指",read:"ゆび",en:"finger",pos:"n."},
      {jp:"よかったら",read:"よかったら",en:"if you like",pos:"adv."}
    ],
    extraVocab:[],
    kanjiChars:["家","族","兄","姉","弟"],
    quiz:[
      {q:"〜ています for an ongoing action means:",ch:["was doing","will do","is doing / has done","did"],a:2},
      {q:"'She is wearing glasses' — which verb?",ch:["はく","かぶる","きる","かける"],a:3},
      {q:"Which means 'young'?",ch:["ながい","みじかい","わかい","ふとい"],a:2},
      {q:"'I am married (currently)' uses which form?",ch:["けっこんします","けっこんしました","けっこんしています","けっこんしていました"],a:2},
    ],
  },
  {
    num:8, title:"A Gift for My Host Family", sub:"Short forms / Plain form",
    topics:["Plain / short forms of verbs","Plain form in casual speech","Verb short form + と思います","〜でしょう"],
    grammar:[
      {p:"Plain present affirmative", ex:"たべる。", tr:"(I) eat. / will eat."},
      {p:"〜と思います (I think that)", ex:"おもしろいとおもいます。", tr:"I think it's interesting."},
      {p:"〜ないと思います (I don't think)", ex:"くるとおもいます。", tr:"I think (he) will come."},
      {p:"〜でしょう (probably)", ex:"あしたはあめでしょう。", tr:"It will probably rain tomorrow."},
    ],
    vocab:[
      {jp:"アボカド",read:"アボカド",en:"avocado",pos:"n."},
      {jp:"雨",read:"あめ",en:"rain",pos:"n."},
      {jp:"洗う",read:"あらう",en:"to wash",pos:"u-v."},
      {jp:"アレルギー",read:"アレルギー",en:"allergy",pos:"n."},
      {jp:"言う",read:"いう",en:"to say",pos:"u-v."},
      {jp:"いちご",read:"いちご",en:"strawberry",pos:"n."},
      {jp:"いつも",read:"いつも",en:"always",pos:"adv."},
      {jp:"いる",read:"いる",en:"to need",pos:"u-v."},
      {jp:"ううん",read:"ううん",en:"uh-uh; no",pos:"exp."},
      {jp:"うん",read:"うん",en:"uh-huh; yes",pos:"exp."},
      {jp:"運転する",read:"うんてんする",en:"to drive",pos:"irr-v."},
      {jp:"遅く",read:"おそく",en:"(do something) late",pos:"adv."},
      {jp:"遅くなる",read:"おそくなる",en:"to be late",pos:"u-v."},
      {jp:"お風呂",read:"おふろ",en:"bath",pos:"n."},
      {jp:"お風呂に入る",read:"おふろにはいる",en:"to take a bath",pos:"u-v."},
      {jp:"思う",read:"おもう",en:"to think",pos:"u-v."},
      {jp:"カメラ",read:"カメラ",en:"camera",pos:"n."},
      {jp:"カラオケ",read:"カラオケ",en:"karaoke",pos:"n."},
      {jp:"乾杯",read:"かんぱい",en:"Cheers! (a toast)",pos:"exp."},
      {jp:"気温",read:"きおん",en:"temperature (weather)",pos:"n."},
      {jp:"キャベツ",read:"キャベツ",en:"cabbage",pos:"n."},
      {jp:"牛肉",read:"ぎゅうにく",en:"beef",pos:"n."},
      {jp:"きゅうり",read:"きゅうり",en:"cucumber",pos:"n."},
      {jp:"切る",read:"きる",en:"to cut",pos:"u-v."},
      {jp:"曇り",read:"くもり",en:"cloudy weather",pos:"n."},
      {jp:"今朝",read:"けさ",en:"this morning",pos:"n."},
      {jp:"残念（ですね）",read:"ざんねん（ですね）",en:"That’s too bad.",pos:"exp."},
      {jp:"仕事",read:"しごと",en:"job; work; occupation",pos:"n."},
      {jp:"じゃがいも",read:"じゃがいも",en:"potato",pos:"n."},
      {jp:"上手",read:"じょうず（な）",en:"skillful; good at . . .",pos:"な-adj."},
      {jp:"すいか",read:"すいか",en:"watermelon",pos:"n."},
      {jp:"捨てる",read:"すてる",en:"to throw away",pos:"ru-v."},
      {jp:"スペイン",read:"スペイン",en:"Spain",pos:"n."},
      {jp:"洗濯する",read:"せんたくする",en:"to do laundry",pos:"irr-v."},
      {jp:"掃除する",read:"そうじする",en:"to clean",pos:"irr-v."},
      {jp:"たまねぎ",read:"たまねぎ",en:"onion",pos:"n."},
      {jp:"作る",read:"つくる",en:"to make",pos:"u-v."},
      {jp:"天気予報",read:"てんきよほう",en:"weather forecast",pos:"n."},
      {jp:"～度",read:"～ど",en:". . . degrees (temperature)",pos:"suf."},
      {jp:"どう",read:"どう",en:"how",pos:"adv."},
      {jp:"所",read:"ところ",en:"place",pos:"n."},
      {jp:"トマト",read:"トマト",en:"tomato",pos:"n."},
      {jp:"鶏肉",read:"とりにく",en:"chicken",pos:"n."},
      {jp:"なす",read:"なす",en:"eggplant",pos:"n."},
      {jp:"夏",read:"なつ",en:"summer",pos:"n."},
      {jp:"何か",read:"なにか",en:"something",pos:"n."},
      {jp:"～について",read:"～について",en:"about . . . ; concerning . . .",pos:"part."},
      {jp:"にんじん",read:"にんじん",en:"carrot",pos:"n."},
      {jp:"パーティー",read:"パーティー",en:"party",pos:"n."},
      {jp:"バーベキュー",read:"バーベキュー",en:"barbecue",pos:"n."},
      {jp:"はし",read:"はし",en:"chopsticks",pos:"n."},
      {jp:"始める",read:"はじめる",en:"to begin",pos:"ru-v."},
      {jp:"ハラルフード",read:"ハラルフード",en:"halal",pos:"n."},
      {jp:"晴れ",read:"はれ",en:"sunny weather",pos:"n."},
      {jp:"ピーナッツ",read:"ピーナッツ",en:"peanut",pos:"n."},
      {jp:"袋",read:"ふくろ",en:"bag; sack; plastic/paper bag",pos:"n."},
      {jp:"豚肉",read:"ぶたにく",en:"pork",pos:"n."},
      {jp:"ぶどう",read:"ぶどう",en:"grape",pos:"n."},
      {jp:"冬",read:"ふゆ",en:"winter",pos:"n."},
      {jp:"降る（雨/雪が）",read:"ふる（あめ/ゆきが）",en:"(rain/snow) falls",pos:"u-v."},
      {jp:"風呂",read:"ふろ",en:"bath",pos:"n."},
      {jp:"風呂に入る",read:"ふろにはいる",en:"to take a bath",pos:"u-v."},
      {jp:"下手",read:"へた（な）",en:"clumsy; poor at . . .",pos:"な-adj."},
      {jp:"ホームステイ",read:"ホームステイ",en:"homestay; living with a local family",pos:"n."},
      {jp:"毎週",read:"まいしゅう",en:"every week",pos:"n."},
      {jp:"まだ ＋ negative",read:"まだ ＋ negative",en:"not . . . yet",pos:"adv."},
      {jp:"みかん",read:"みかん",en:"mandarin orange",pos:"n."},
      {jp:"みんなで",read:"みんなで",en:"all (of the people) together",pos:"n."},
      {jp:"持っていく",read:"もっていく",en:"to take (a thing)",pos:"u-v."},
      {jp:"もも",read:"もも",en:"peach",pos:"n."},
      {jp:"有名",read:"ゆうめい（な）",en:"famous",pos:"な-adj."},
      {jp:"雪",read:"ゆき",en:"snow",pos:"n."},
      {jp:"料理する",read:"りょうりする",en:"to cook",pos:"irr-v."},
      {jp:"りんご",read:"りんご",en:"apple",pos:"n."}
    ],
    extraVocab:[],
    kanjiChars:["春","夏","秋","冬","有"],
    quiz:[
      {q:"Plain form of たべます?",ch:["たべ","たべる","たべた","たべない"],a:1},
      {q:"〜と思います means:",ch:["I want to","I think that","I should","I must"],a:1},
      {q:"Which means 'to receive'?",ch:["あげる","くれる","もらう","おくる"],a:2},
      {q:"Which season is なつ?",ch:["spring","summer","fall","winter"],a:1},
    ],
  },
  {
    num:9, title:"Kabuki", sub:"Past experiences / Want to / Comparisons",
    topics:["〜たことがあります (experience)","〜たいです (want to)","Comparisons (〜より / いちばん)","Adverbs from adjectives"],
    grammar:[
      {p:"〜たことがあります (have done before)", ex:"かぶきをみたことがあります。", tr:"I have seen kabuki before."},
      {p:"〜たいです (want to)", ex:"にほんにいきたいです。", tr:"I want to go to Japan."},
      {p:"A は B より〜 (A is more ~ than B)", ex:"とうきょうはおおさかよりおおきいです。", tr:"Tokyo is bigger than Osaka."},
      {p:"いちばん〜 (the most)", ex:"なつがいちばんすきです。", tr:"I like summer the most."},
    ],
    vocab:[
      {jp:"青い",read:"あおい",en:"blue",pos:"い-adj."},
      {jp:"青信号",read:"あおしんごう",en:"green light",pos:"n."},
      {jp:"赤い",read:"あかい",en:"red",pos:"い-adj."},
      {jp:"いい子",read:"いいこ",en:"good child",pos:"n."},
      {jp:"意地悪",read:"いじわる（な）",en:"mean-spirited",pos:"な-adj."},
      {jp:"五つ",read:"いつつ",en:"five",pos:"n."},
      {jp:"色",read:"いろ",en:"color",pos:"n."},
      {jp:"運動する",read:"うんどうする",en:"to exercise",pos:"irr-v."},
      {jp:"踊る",read:"おどる",en:"to dance",pos:"u-v."},
      {jp:"お弁当",read:"おべんとう",en:"boxed lunch",pos:"n."},
      {jp:"覚える",read:"おぼえる",en:"to memorize",pos:"ru-v."},
      {jp:"オレンジ",read:"オレンジ",en:"orange",pos:"n."},
      {jp:"終わる",read:"おわる",en:"(something) ends",pos:"u-v."},
      {jp:"顔が青い",read:"かおがあおい",en:"to look pale",pos:"い-adj."},
      {jp:"歌舞伎",read:"かぶき",en:"Kabuki; traditional Japanese theatrical art",pos:"n."},
      {jp:"～から",read:"～から",en:"from . . .",pos:"part."},
      {jp:"黄色い",read:"きいろい",en:"yellow",pos:"い-adj."},
      {jp:"ギター",read:"ギター",en:"guitar",pos:"n."},
      {jp:"金色",read:"きんいろ",en:"gold",pos:"n."},
      {jp:"銀色",read:"ぎんいろ",en:"silver",pos:"n."},
      {jp:"薬",read:"くすり",en:"medicine",pos:"n."},
      {jp:"薬を飲む",read:"くすりをのむ",en:"to take medicine",pos:"u-v."},
      {jp:"グリーン",read:"グリーン",en:"green",pos:"n."},
      {jp:"グレー",read:"グレー",en:"gray",pos:"n."},
      {jp:"黒い",read:"くろい",en:"black",pos:"い-adj."},
      {jp:"ゴールド",read:"ゴールド",en:"gold",pos:"n."},
      {jp:"九つ",read:"ここのつ",en:"nine",pos:"n."},
      {jp:"紺色",read:"こんいろ",en:"navy",pos:"n."},
      {jp:"コンサート",read:"コンサート",en:"concert",pos:"n."},
      {jp:"今度",read:"こんど",en:"near future",pos:"n."},
      {jp:"作文",read:"さくぶん",en:"essay; composition",pos:"n."},
      {jp:"寂しい",read:"さびしい",en:"lonely",pos:"い-adj."},
      {jp:"散歩する",read:"さんぽする",en:"to take a walk",pos:"irr-v."},
      {jp:"試験",read:"しけん",en:"exam",pos:"n."},
      {jp:"シルバー",read:"シルバー",en:"silver",pos:"n."},
      {jp:"白い",read:"しろい",en:"white",pos:"い-adj."},
      {jp:"白黒",read:"しろくろ",en:"black and white",pos:"n."},
      {jp:"スキー",read:"スキー",en:"ski",pos:"n."},
      {jp:"是非",read:"ぜひ",en:"by all means",pos:"adv."},
      {jp:"そう",read:"そう",en:"(I think) so",pos:"adv."},
      {jp:"単語",read:"たんご",en:"word; vocabulary",pos:"n."},
      {jp:"チケット",read:"チケット",en:"ticket",pos:"n."},
      {jp:"茶色い",read:"ちゃいろい",en:"brown",pos:"い-adj."},
      {jp:"手紙",read:"てがみ",en:"letter",pos:"n."},
      {jp:"出る",read:"でる",en:"to appear; to attend; to exit",pos:"ru-v."},
      {jp:"十",read:"とお",en:"ten",pos:"n."},
      {jp:"ところで",read:"ところで",en:"by the way",pos:"adv."},
      {jp:"七つ",read:"ななつ",en:"seven",pos:"n."},
      {jp:"人気がある",read:"にんきがある",en:"to be popular",pos:"u-v."},
      {jp:"灰色",read:"はいいろ",en:"gray",pos:"n."},
      {jp:"始まる",read:"はじまる",en:"(something) begins",pos:"u-v."},
      {jp:"ピアノ",read:"ピアノ",en:"piano",pos:"n."},
      {jp:"弾く",read:"ひく",en:"to play (a string instrument or piano)",pos:"u-v."},
      {jp:"ピザ",read:"ピザ",en:"pizza",pos:"n."},
      {jp:"一つ",read:"ひとつ",en:"one",pos:"n."},
      {jp:"病気",read:"びょうき",en:"illness; sickness",pos:"n."},
      {jp:"ピンク",read:"ピンク",en:"pink",pos:"n."},
      {jp:"二つ",read:"ふたつ",en:"two",pos:"n."},
      {jp:"ベージュ",read:"ベージュ",en:"beige",pos:"n."},
      {jp:"弁当",read:"べんとう",en:"boxed lunch",pos:"n."},
      {jp:"～まで",read:"～まで",en:"to (a place/a time)",pos:"part."},
      {jp:"水色",read:"みずいろ",en:"light blue",pos:"n."},
      {jp:"三つ",read:"みっつ",en:"three",pos:"n."},
      {jp:"緑",read:"みどり",en:"green",pos:"n."},
      {jp:"みんな",read:"みんな",en:"all",pos:"adv."},
      {jp:"六つ",read:"むっつ",en:"six",pos:"n."},
      {jp:"紫",read:"むらさき",en:"purple",pos:"n."},
      {jp:"メール",read:"メール",en:"e-mail",pos:"n."},
      {jp:"もう",read:"もう",en:"already",pos:"adv."},
      {jp:"もらう",read:"もらう",en:"to get (from somebody)",pos:"u-v."},
      {jp:"八つ",read:"やっつ",en:"eight",pos:"n."},
      {jp:"四つ",read:"よっつ",en:"four",pos:"n."},
      {jp:"若い",read:"わかい",en:"young",pos:"い-adj."}
    ],
    extraVocab:[],
    kanjiChars:["花","山","川","外","国"],
    quiz:[
      {q:"〜たことがあります expresses:",ch:["future plans","past experience","ongoing action","desire"],a:1},
      {q:"'I want to eat sushi' in Japanese?",ch:["すしがすきです","すしをたべます","すしをたべたいです","すしをたべました"],a:2},
      {q:"'Tokyo is bigger than Osaka' uses which pattern?",ch:["〜がいちばん","〜より〜","〜ほど〜ない","〜とおなじ"],a:1},
      {q:"Which means 'convenient'?",ch:["ゆうめい","べんり","あぶない","たいせつ"],a:1},
    ],
  },
  {
    num:10, title:"Winter Vacation Plans", sub:"Giving reasons / Before & after / Describing plans",
    topics:["〜から (because)","〜前に / 〜後で","〜ために (in order to)","Verb plain form + つもりです"],
    grammar:[
      {p:"〜から (because)", ex:"ねむいから、ねます。", tr:"I'll sleep because I'm sleepy."},
      {p:"〜前に (before ~)", ex:"ねるまえに、はをみがきます。", tr:"I brush my teeth before sleeping."},
      {p:"〜後で (after ~)", ex:"しゅくだいのあとで、テレビをみます。", tr:"After homework, I watch TV."},
      {p:"〜つもりです (plan to)", ex:"にほんにいくつもりです。", tr:"I plan to go to Japan."},
    ],
    vocab:[
      {jp:"秋",read:"あき",en:"fall",pos:"n."},
      {jp:"暖かい",read:"あたたかい",en:"warm",pos:"い-adj."},
      {jp:"歩いて",read:"あるいて",en:"on foot",pos:"adv."},
      {jp:"～行き",read:"～いき",en:"bound for . . .",pos:"suf."},
      {jp:"一号車",read:"いちごうしゃ",en:"Car No. 1",pos:"n."},
      {jp:"一番",read:"いちばん",en:"best",pos:"adv."},
      {jp:"入口",read:"いりぐち",en:"entrance",pos:"n."},
      {jp:"駅",read:"えき",en:"station",pos:"n."},
      {jp:"往復",read:"おうふく",en:"round trip",pos:"n."},
      {jp:"お金持ち",read:"おかねもち",en:"rich person",pos:"n."},
      {jp:"遅い",read:"おそい",en:"slow; late",pos:"い-adj."},
      {jp:"～か～",read:"～か～",en:"or",pos:"part."},
      {jp:"改札",read:"かいさつ",en:"gate",pos:"n."},
      {jp:"階段",read:"かいだん",en:"stairs",pos:"n."},
      {jp:"かかる",read:"かかる",en:"to take (amount of time/money)",pos:"u-v."},
      {jp:"学割",read:"がくわり",en:"student discount",pos:"n."},
      {jp:"～か月",read:"～かげつ",en:"for . . . months",pos:"suf."},
      {jp:"片道",read:"かたみち",en:"one way",pos:"n."},
      {jp:"金持ち",read:"かねもち",en:"rich person",pos:"n."},
      {jp:"簡単",read:"かんたん（な）",en:"easy; simple",pos:"な-adj."},
      {jp:"季節",read:"きせつ",en:"season",pos:"n."},
      {jp:"切符売り場",read:"きっぷうりば",en:"ticket vending area",pos:"n."},
      {jp:"決める",read:"きめる",en:"to decide",pos:"ru-v."},
      {jp:"急行",read:"きゅうこう",en:"express",pos:"n."},
      {jp:"牛乳",read:"ぎゅうにゅう",en:"milk",pos:"n."},
      {jp:"ケーキ",read:"ケーキ",en:"cake",pos:"n."},
      {jp:"～後",read:"～ご",en:"in . . . time; after . . .",pos:"suf."},
      {jp:"交通系ICカード",read:"こうつうけいアイシーカード",en:"rechargeable card such as Suica, Icoca, Pasmo, etc.",pos:"n."},
      {jp:"このごろ",read:"このごろ",en:"these days",pos:"adv."},
      {jp:"ごろごろする",read:"ごろごろする",en:"to chill out at home; to stay home do nothing",pos:"irr-v."},
      {jp:"サッカー",read:"サッカー",en:"soccer",pos:"n."},
      {jp:"時間",read:"じかん",en:"time",pos:"n."},
      {jp:"指定席",read:"していせき",en:"reserved seat",pos:"n."},
      {jp:"次発",read:"じはつ",en:"departing second",pos:"n."},
      {jp:"～週間",read:"～しゅうかん",en:"for . . . weeks",pos:"suf."},
      {jp:"自由席",read:"じゆうせき",en:"general admission seat",pos:"n."},
      {jp:"終電",read:"しゅうでん",en:"last train (of the day)",pos:"n."},
      {jp:"乗車券",read:"じょうしゃけん",en:"(boarding) ticket",pos:"n."},
      {jp:"新幹線",read:"しんかんせん",en:"Shinkansen;  “Bullet Train”",pos:"n."},
      {jp:"すし",read:"すし",en:"sushi",pos:"n."},
      {jp:"涼しい",read:"すずしい",en:"cool (weather)",pos:"い-adj."},
      {jp:"生活",read:"せいかつ",en:"life; living",pos:"n."},
      {jp:"世界",read:"せかい",en:"world",pos:"n."},
      {jp:"先発",read:"せんぱつ",en:"departing first",pos:"n."},
      {jp:"地下鉄",read:"ちかてつ",en:"subway",pos:"n."},
      {jp:"ツアー",read:"ツアー",en:"tour",pos:"n."},
      {jp:"次は～",read:"つぎは～",en:"next (stop), . . .",pos:"exp."},
      {jp:"冷たい",read:"つめたい",en:"cold (things/people)",pos:"い-adj."},
      {jp:"～で",read:"～で",en:"by (means of transportation); with (a tool)",pos:"part."},
      {jp:"定期券",read:"ていきけん",en:"commuter’s pass",pos:"n."},
      {jp:"出口",read:"でぐち",en:"exit",pos:"n."},
      {jp:"手袋",read:"てぶくろ",en:"gloves",pos:"n."},
      {jp:"天ぷら",read:"てんぷら",en:"tempura",pos:"n."},
      {jp:"動物園",read:"どうぶつえん",en:"zoo",pos:"n."},
      {jp:"どうやって",read:"どうやって",en:"how; by what means",pos:"adv."},
      {jp:"年上",read:"としうえ",en:"someone older",pos:"n."},
      {jp:"どちら",read:"どちら",en:"which",pos:"n."},
      {jp:"特急",read:"とっきゅう",en:"super express",pos:"n."},
      {jp:"どっち",read:"どっち",en:"which",pos:"n."},
      {jp:"どのぐらい",read:"どのぐらい",en:"how much; how long",pos:"exp."},
      {jp:"泊まる",read:"とまる",en:"to stay (at a hotel, etc.)",pos:"u-v."},
      {jp:"なる",read:"なる",en:"to become",pos:"u-v."},
      {jp:"眠い",read:"ねむい",en:"sleepy",pos:"い-adj."},
      {jp:"～年",read:"～ねん",en:". . . years",pos:"suf."},
      {jp:"乗り換え",read:"のりかえ",en:"transfer",pos:"n."},
      {jp:"売店",read:"ばいてん",en:"shop; stand",pos:"n."},
      {jp:"早く/速く",read:"はやく",en:"(do something) early; fast",pos:"adv."},
      {jp:"春",read:"はる",en:"spring",pos:"n."},
      {jp:"～番線",read:"～ばんせん",en:"track number . . .",pos:"suf."},
      {jp:"飛行機",read:"ひこうき",en:"airplane",pos:"n."},
      {jp:"美容院",read:"びよういん",en:"beauty parlor",pos:"n."},
      {jp:"普通",read:"ふつう",en:"local (train)",pos:"n."},
      {jp:"船",read:"ふね",en:"ship; boat",pos:"n."},
      {jp:"～方面",read:"～ほうめん",en:"serving . . . areas",pos:"suf."},
      {jp:"ホーム",read:"ホーム",en:"platform",pos:"n."},
      {jp:"野球",read:"やきゅう",en:"baseball",pos:"n."},
      {jp:"有名人",read:"ゆうめいじん",en:"celebrity",pos:"n."},
      {jp:"予約",read:"よやく",en:"reservation",pos:"n."},
      {jp:"料理",read:"りょうり",en:"cooking; dish",pos:"n."},
      {jp:"旅行する",read:"りょこうする",en:"to travel",pos:"irr-v."},
      {jp:"練習する",read:"れんしゅうする",en:"to practice",pos:"irr-v."}
    ],
    extraVocab:[],
    kanjiChars:["冬","休","空","港","決"],
    quiz:[
      {q:"〜から at the end of a clause means:",ch:["before","after","because","although"],a:2},
      {q:"'I plan to go to Japan' uses:",ch:["〜たいです","〜つもりです","〜でしょう","〜たことがあります"],a:1},
      {q:"'Before sleeping' in Japanese?",ch:["ねたあとで","ねるまえに","ねてから","ねたから"],a:1},
      {q:"Which means 'already'?",ch:["まだ","もう","すぐ","また"],a:1},
    ],
  },
  {
    num:11, title:"After the Vacation", sub:"〜と / Describing results / Potential form",
    topics:["Verb plain form + と (if/when)","Potential form (can do)","〜し (listing reasons)","〜そうです (looks like)"],
    grammar:[
      {p:"〜と (when/if)", ex:"みぎにまがると、えきがあります。", tr:"If you turn right, there is the station."},
      {p:"Potential form (can do)", ex:"にほんごがはなせます。", tr:"I can speak Japanese."},
      {p:"〜し (listing reasons)", ex:"やすいし、おいしいし、すきです。", tr:"It's cheap, delicious, so I like it."},
      {p:"〜そうです (looks like)", ex:"あめがふりそうです。", tr:"It looks like it will rain."},
    ],
    vocab:[
      {jp:"後",read:"（〜の）あと",en:"after (an event)",pos:"exp."},
      {jp:"意味",read:"いみ",en:"meaning",pos:"n."},
      {jp:"うそをつく",read:"うそをつく",en:"to tell a lie",pos:"u-v."},
      {jp:"宇宙飛行士",read:"うちゅうひこうし",en:"astronaut",pos:"n."},
      {jp:"お菓子",read:"おかし",en:"snack; sweets",pos:"n."},
      {jp:"お正月",read:"おしょうがつ",en:"New Year’s",pos:"n."},
      {jp:"おなかがすく",read:"おなかがすく",en:"to become hungry",pos:"u-v."},
      {jp:"お祭り",read:"おまつり",en:"festival",pos:"n."},
      {jp:"おもちゃ",read:"おもちゃ",en:"toy",pos:"n."},
      {jp:"温泉",read:"おんせん",en:"spa; hot spring",pos:"n."},
      {jp:"外国",read:"がいこく",en:"foreign country",pos:"n."},
      {jp:"飼う",read:"かう",en:"to own (a pet)",pos:"u-v."},
      {jp:"菓子",read:"かし",en:"snack; sweets",pos:"n."},
      {jp:"歌手",read:"かしゅ",en:"singer",pos:"n."},
      {jp:"かたい言い方",read:"かたいいいかた",en:"bookish expression",pos:"n."},
      {jp:"かっこ",read:"かっこ",en:"parenthesis",pos:"n."},
      {jp:"川",read:"かわ",en:"river",pos:"n."},
      {jp:"キャンプ",read:"キャンプ",en:"camp",pos:"n."},
      {jp:"教師",read:"きょうし",en:"schoolteacher",pos:"n."},
      {jp:"共通語",read:"きょうつうご",en:"common language",pos:"n."},
      {jp:"～行目",read:"～ぎょうめ",en:"line number . . .",pos:"suf."},
      {jp:"くだけた言い方",read:"くだけたいいかた",en:"colloquial expression",pos:"n."},
      {jp:"警察官",read:"けいさつかん",en:"police officer",pos:"n."},
      {jp:"けんかする",read:"けんかする",en:"to have a fight; to quarrel",pos:"irr-v."},
      {jp:"研究者",read:"けんきゅうしゃ",en:"researcher",pos:"n."},
      {jp:"答／答え",read:"こたえ",en:"answer",pos:"n."},
      {jp:"こちら",read:"こちら",en:"this person (polite)",pos:"n."},
      {jp:"今学期",read:"こんがっき",en:"this semester",pos:"n."},
      {jp:"作家",read:"さっか",en:"writer",pos:"n."},
      {jp:"サボる",read:"サボる",en:"to cut (classes)",pos:"u-v."},
      {jp:"シェフ",read:"シェフ",en:"chef",pos:"n."},
      {jp:"質問",read:"しつもん",en:"question",pos:"n."},
      {jp:"締め切り",read:"しめきり",en:"deadline",pos:"n."},
      {jp:"ジャーナリスト",read:"ジャーナリスト",en:"journalist",pos:"n."},
      {jp:"社長",read:"しゃちょう",en:"president of a company",pos:"n."},
      {jp:"授業",read:"じゅぎょう",en:"class",pos:"n."},
      {jp:"出身",read:"しゅっしん",en:"coming from",pos:"n."},
      {jp:"紹介する",read:"しょうかいする",en:"to introduce",pos:"irr-v."},
      {jp:"正月",read:"しょうがつ",en:"New Year’s",pos:"n."},
      {jp:"消防士",read:"しょうぼうし",en:"firefighter",pos:"n."},
      {jp:"将来",read:"しょうらい",en:"future",pos:"n."},
      {jp:"神社",read:"じんじゃ",en:"shrine",pos:"n."},
      {jp:"スポーツ選手",read:"スポーツせんしゅ",en:"athlete",pos:"n."},
      {jp:"そして",read:"そして",en:"and then",pos:"adv."},
      {jp:"ダイエットする",read:"ダイエットする",en:"to go on a diet",pos:"irr-v."},
      {jp:"大統領",read:"だいとうりょう",en:"president of a country",pos:"n."},
      {jp:"～だけ",read:"～だけ",en:"just . . . ; only . . .",pos:"suf."},
      {jp:"例えば",read:"たとえば",en:"for example",pos:"adv."},
      {jp:"遅刻する",read:"ちこくする",en:"to be late (for an appointment)",pos:"irr-v."},
      {jp:"疲れる",read:"つかれる",en:"to get tired",pos:"ru-v."},
      {jp:"つり",read:"つり",en:"fishing",pos:"n."},
      {jp:"ていねいな言い方",read:"ていねいないいかた",en:"polite expression",pos:"n."},
      {jp:"～点",read:"～てん",en:". . . points",pos:"suf."},
      {jp:"ドライブ",read:"ドライブ",en:"drive",pos:"n."},
      {jp:"取る",read:"とる",en:"to take (a class); to get (a grade)",pos:"u-v."},
      {jp:"習う",read:"ならう",en:"to learn",pos:"u-v."},
      {jp:"登る",read:"のぼる",en:"to climb",pos:"u-v."},
      {jp:"俳優",read:"はいゆう",en:"actor; actress",pos:"n."},
      {jp:"走る",read:"はしる",en:"to run",pos:"u-v."},
      {jp:"ばつ",read:"ばつ",en:"× (wrong)",pos:"n."},
      {jp:"発音",read:"はつおん",en:"pronunciation",pos:"n."},
      {jp:"ビール",read:"ビール",en:"beer",pos:"n."},
      {jp:"久しぶり",read:"ひさしぶり",en:"it has been a long time",pos:"exp."},
      {jp:"美術館",read:"びじゅつかん",en:"art museum",pos:"n."},
      {jp:"二人ずつ",read:"ふたりずつ",en:"two people each",pos:"exp."},
      {jp:"文法",read:"ぶんぽう",en:"grammar",pos:"n."},
      {jp:"方言",read:"ほうげん",en:"dialect",pos:"n."},
      {jp:"ほかに",read:"ほかに",en:"anything else",pos:"adv."},
      {jp:"ホストファミリー",read:"ホストファミリー",en:"host family",pos:"n."},
      {jp:"まあまあ",read:"まあまあ",en:"okay; so-so",pos:"exp."},
      {jp:"祭り",read:"まつり",en:"festival",pos:"n."},
      {jp:"まる",read:"まる",en:"○ (correct)",pos:"n."},
      {jp:"漫画家",read:"まんがか",en:"cartoonist",pos:"n."},
      {jp:"湖",read:"みずうみ",en:"lake",pos:"n."},
      {jp:"もっと",read:"もっと",en:"more",pos:"adv."},
      {jp:"山",read:"やま",en:"mountain",pos:"n."},
      {jp:"やめる",read:"やめる",en:"to quit",pos:"ru-v."},
      {jp:"夢",read:"ゆめ",en:"dream",pos:"n."},
      {jp:"来学期",read:"らいがっき",en:"next semester",pos:"n."},
      {jp:"留学する",read:"りゅうがくする",en:"to study abroad",pos:"irr-v."},
      {jp:"ルームメイト",read:"ルームメイト",en:"roommate",pos:"n."},
      {jp:"例",read:"れい",en:"example",pos:"n."},
      {jp:"練習",read:"れんしゅう",en:"exercise",pos:"n."}
    ],
    extraVocab:[],
    kanjiChars:["道","橋","駅","地","図"],
    quiz:[
      {q:"Potential form of たべる is:",ch:["たべます","たべられます","たべています","たべましょう"],a:1},
      {q:"〜と in directions / conditions means:",ch:["because","when / if","although","while"],a:1},
      {q:"Which means 'intersection'?",ch:["はし","みち","こうさてん","かど"],a:2},
      {q:"〜そうです expresses:",ch:["past experience","hearsay","appearance / looks like","ability"],a:2},
    ],
  },
  {
    num:12, title:"Japanese Pop Culture", sub:"〜んです / Conditionals / Passive",
    topics:["〜んです (explanatory んだ)","〜ば conditionals","Passive voice","〜てあげる/もらう/くれる"],
    grammar:[
      {p:"〜んです (explanation / emphasis)", ex:"あたまがいたいんです。", tr:"The thing is, I have a headache."},
      {p:"〜れば/〜えば conditional", ex:"おかねがあれば、かいます。", tr:"If I have money, I'll buy it."},
      {p:"Passive voice: 〜られます", ex:"せんせいにほめられました。", tr:"I was praised by the teacher."},
      {p:"〜てあげます (do for someone)", ex:"おしえてあげます。", tr:"I will teach (for you)."},
    ],
    vocab:[
      {jp:"甘い",read:"あまい",en:"sweet",pos:"い-adj."},
      {jp:"歩く",read:"あるく",en:"to walk",pos:"u-v."},
      {jp:"痛い",read:"いたい",en:"hurt; painful",pos:"い-adj."},
      {jp:"痛み止め",read:"いたみどめ",en:"painkiller",pos:"n."},
      {jp:"インフルエンザ",read:"インフルエンザ",en:"influenza",pos:"n."},
      {jp:"多い",read:"おおい",en:"there are many . . .",pos:"い-adj."},
      {jp:"お大事に",read:"おだいじに",en:"Get well soon.",pos:"exp."},
      {jp:"お手洗い",read:"おてあらい",en:"restroom",pos:"n."},
      {jp:"同じ",read:"おなじ",en:"same",pos:"adv."},
      {jp:"風邪",read:"かぜ",en:"cold",pos:"n."},
      {jp:"風邪をひく",read:"かぜをひく",en:"to catch a cold",pos:"u-v."},
      {jp:"彼女",read:"かのじょ",en:"she; girlfriend",pos:"n."},
      {jp:"花粉症",read:"かふんしょう",en:"hay fever",pos:"n."},
      {jp:"彼",read:"かれ",en:"he; boyfriend",pos:"n."},
      {jp:"彼氏",read:"かれし",en:"boyfriend",pos:"n."},
      {jp:"眼科",read:"がんか",en:"ophthalmologist",pos:"n."},
      {jp:"切符",read:"きっぷ",en:"train ticket",pos:"n."},
      {jp:"気分が悪い",read:"きぶんがわるい",en:"not to feel well; to feel sick",pos:"い-adj."},
      {jp:"興味がある",read:"きょうみがある",en:"to be interested (in)",pos:"u-v."},
      {jp:"緊張する",read:"きんちょうする",en:"to get nervous",pos:"irr-v."},
      {jp:"くしゃみ",read:"くしゃみ",en:"sneeze",pos:"n."},
      {jp:"けが",read:"けが",en:"injury",pos:"n."},
      {jp:"外科",read:"げか",en:"surgeon",pos:"n."},
      {jp:"下痢",read:"げり",en:"diarrhea",pos:"n."},
      {jp:"元気がない",read:"げんきがない",en:"don’t look well",pos:"exp."},
      {jp:"抗生物質",read:"こうせいぶっしつ",en:"antibiotic",pos:"n."},
      {jp:"骨折する",read:"こっせつする",en:"to break (a bone)",pos:"irr-v."},
      {jp:"産婦人科",read:"さんふじんか",en:"obstetrician and gynecologist",pos:"n."},
      {jp:"試合",read:"しあい",en:"match; game",pos:"n."},
      {jp:"歯科",read:"しか",en:"dentist",pos:"n."},
      {jp:"耳鼻科",read:"じびか",en:"otorhinolaryngologist; ENT doctor",pos:"n."},
      {jp:"ジュース",read:"ジュース",en:"juice",pos:"n."},
      {jp:"手術",read:"しゅじゅつ",en:"operation",pos:"n."},
      {jp:"食後",read:"しょくご",en:"after meals",pos:"n."},
      {jp:"心配する",read:"しんぱいする",en:"to worry",pos:"irr-v."},
      {jp:"素敵",read:"すてき（な）",en:"nice",pos:"な-adj."},
      {jp:"整形外科",read:"せいけいげか",en:"orthopedic surgeon",pos:"n."},
      {jp:"成績",read:"せいせき",en:"grade (on a test, etc.)",pos:"n."},
      {jp:"生理",read:"せいり",en:"period",pos:"n."},
      {jp:"せき",read:"せき",en:"cough",pos:"n."},
      {jp:"せきが出る",read:"せきがでる",en:"to cough",pos:"ru-v."},
      {jp:"狭い",read:"せまい",en:"narrow; not spacious",pos:"い-adj."},
      {jp:"それに",read:"それに",en:"moreover, . . .",pos:"adv."},
      {jp:"～代",read:"～だい",en:"charge; fee",pos:"suf."},
      {jp:"体温計",read:"たいおんけい",en:"thermometer",pos:"n."},
      {jp:"多分",read:"たぶん",en:"probably; maybe",pos:"adv."},
      {jp:"卵",read:"たまご",en:"egg",pos:"n."},
      {jp:"注射",read:"ちゅうしゃ",en:"injection",pos:"n."},
      {jp:"できるだけ",read:"できるだけ",en:"as much as possible",pos:"adv."},
      {jp:"点滴",read:"てんてき",en:"intravenous feeding",pos:"n."},
      {jp:"内科",read:"ないか",en:"physician",pos:"n."},
      {jp:"なくす",read:"なくす",en:"to lose",pos:"u-v."},
      {jp:"二三日",read:"にさんにち",en:"for two to three days",pos:"n."},
      {jp:"熱がある",read:"ねつがある",en:"to have a fever",pos:"u-v."},
      {jp:"喉",read:"のど",en:"throat",pos:"n."},
      {jp:"喉が渇く",read:"のどがかわく",en:"to become thirsty",pos:"u-v."},
      {jp:"吐く",read:"はく",en:"to throw up",pos:"u-v."},
      {jp:"初めて",read:"はじめて",en:"for the first time",pos:"adv."},
      {jp:"発疹",read:"はっしん",en:"rash",pos:"n."},
      {jp:"鼻水",read:"はなみず",en:"runny nose",pos:"n."},
      {jp:"払う",read:"はらう",en:"to pay",pos:"u-v."},
      {jp:"皮膚科",read:"ひふか",en:"dermatologist",pos:"n."},
      {jp:"広い",read:"ひろい",en:"wide; spacious",pos:"い-adj."},
      {jp:"服",read:"ふく",en:"clothes",pos:"n."},
      {jp:"二日酔い",read:"ふつかよい",en:"hangover",pos:"n."},
      {jp:"プレゼント",read:"プレゼント",en:"present",pos:"n."},
      {jp:"便秘",read:"べんぴ",en:"constipation",pos:"n."},
      {jp:"ホームシック",read:"ホームシック",en:"homesickness",pos:"n."},
      {jp:"保険証",read:"ほけんしょう",en:"health insurance certificate",pos:"n."},
      {jp:"虫歯",read:"むしば",en:"bad tooth",pos:"n."},
      {jp:"めまいがする",read:"めまいがする",en:"to feel dizzy",pos:"irr-v."},
      {jp:"もうすぐ",read:"もうすぐ",en:"very soon; in a few moments/days",pos:"adv."},
      {jp:"物",read:"もの",en:"thing (concrete object)",pos:"n."},
      {jp:"やけどをする",read:"やけどをする",en:"to burn oneself",pos:"irr-v."},
      {jp:"用事",read:"ようじ",en:"business to take care of",pos:"n."},
      {jp:"レントゲン",read:"レントゲン",en:"X-ray",pos:"n."},
      {jp:"別れる",read:"わかれる",en:"to break up; to separate",pos:"ru-v."},
      {jp:"悪い",read:"わるい",en:"bad",pos:"い-adj."}
    ],
    extraVocab:[],
    kanjiChars:["文","化","言","葉","世"],
    quiz:[
      {q:"〜んです is used to:",ch:["give a command","express hearsay","explain or emphasize a situation","express ability"],a:2},
      {q:"Passive form of 食べる is:",ch:["たべさせる","たべられる","たべさせられる","たべてもらう"],a:1},
      {q:"Which means 'culture'?",ch:["ぶんか","にんき","いみ","ことば"],a:0},
      {q:"〜てあげます means:",ch:["to do for someone (upward)","to receive an action","to do something together","to ask someone to do"],a:0},
    ],
  },
];

// ─── FLASHCARD DECK (built from LESSONS vocab) ────────────────────────────────
function buildFlashcards(){
  const cards=[];
  LESSONS.forEach(l=>{
    l.vocab.forEach(v=>{
      cards.push({f:v.jp,b:`${v.read} — ${v.en}`,sub:v.read,t:`L${l.num}`,pos:v.pos});
    });
  });
  return cards;
}
let FLASHCARDS=buildFlashcards();

// Merge custom decks published via admin panel into the flashcard pool
function mergeCustomDecks(){
  const base=buildFlashcards();
  const custom=[];
  (window.CUSTOM_DECKS||[]).forEach(deck=>{
    deck.cards.forEach(c=>{
      custom.push({
        f:c.front,
        b:(c.reading?c.reading+" — ":"")+(c.back||""),
        sub:c.reading||"",
        t:deck.tag||"Custom",
        pos:""
      });
    });
  });
  FLASHCARDS=[...base,...custom];
  if(typeof renderFCChips==="function")renderFCChips();
  if(typeof renderFC==="function")renderFC();
}

// ─── RESOURCES ────────────────────────────────────────────────────────────────
const RESOURCES={
  jomako:[
    {icon:"📊",title:"Jo-Mako's Japanese Spreadsheet",desc:"Main hub — anime, games, manga, VN vocab with Anki decks",url:"https://docs.google.com/spreadsheets/d/1IytlD4JjYO5-38wP6VbFNjHQDaDEsx4WWi2Rs-gaamk/edit"},
    {icon:"📈",title:"Jo-Mako's Frequency List",desc:"Japanese vocabulary ranked by frequency across anime, games, novels",url:"https://docs.google.com/spreadsheets/u/0/d/1z3Wc85VuDhjgjy1s_zgbGx2daaOoqm0s/htmlview"},
    {icon:"🈳",title:"Jo-Mako's Kanji Spreadsheet",desc:"Full kanji reference — JLPT, mnemonics, stroke count, examples",url:"https://docs.google.com/spreadsheets/d/1idXxl-Wsrs_cj0jkqUAErBzYFG6OZPOTsgoNkaKSAvU/edit"},
    {icon:"📖",title:"Genki Vocabulary Index (3rd ed.)",desc:"Full Genki I & II vocabulary index with parts of speech and lesson numbers",url:"https://docs.google.com/spreadsheets/d/1LvkY5vxgrt2rBTHXwHKPLZ3bbnEdedH-/edit?gid=1137479501"},
  ],
  tools:[
    {icon:"🃏",title:"Anki",desc:"Spaced repetition — gold standard for retention",url:"https://apps.ankiweb.net"},
    {icon:"📖",title:"Jisho.org",desc:"Best free Japanese dictionary with kanji search and JLPT tags",url:"https://jisho.org"},
    {icon:"🔊",title:"Forvo",desc:"Native speaker pronunciation for any Japanese word",url:"https://forvo.com/languages/ja/"},
    {icon:"💬",title:"HelloTalk",desc:"Language exchange — chat and call native Japanese speakers",url:"https://www.hellotalk.com"},
    {icon:"🎧",title:"Comprehensible Japanese",desc:"Beginner input videos — great for listening practice",url:"https://www.youtube.com/@cijapanese"},
    {icon:"✏️",title:"Jisho Kanji Draw",desc:"Draw a kanji you don't know to look it up instantly",url:"https://jisho.org/#radical"},
  ],
  genki:[
    {icon:"📚",title:"Genki Self-Study Room",desc:"Official Genki exercises and audio from Japan Times",url:"https://genki.japantimes.co.jp/self"},
    {icon:"📝",title:"Cure Dolly (YouTube)",desc:"Organic Japanese grammar — excellent structural explanations",url:"https://www.youtube.com/@organicjapanesewithcuredol9357"},
    {icon:"📐",title:"Tae Kim's Guide to Japanese",desc:"Builds grammar from fundamentals — explains WHERE polite forms come from, not just how to use them",url:"https://guidetojapanese.org/learn/"},
    {icon:"🌐",title:"Marshall Yin — Genki Vocab",desc:"Per-lesson vocab lists matching Genki I 3rd edition",url:"https://marshallyin.com/genki-1-vocabulary/"},
    {icon:"🗣",title:"Genki Conjugation Drill",desc:"Practice verb and adjective conjugation interactively",url:"https://drills.vajeon.org/"},
  ],
};

// ─── STATE ────────────────────────────────────────────────────────────────────
let state={
  lessonsDone:{},selectedLesson:0,
  quizLessonIdx:0,quizQIdx:0,quizScore:0,quizAnswered:false,
  fcFilter:"All",fcIdx:0,fcFlipped:false,fcKnown:new Set(),
  kanjiLearned:new Set(),selectedKanjiIdx:null,kanjiJlptFilter:"N5",
  journalEntries:[],selectedMood:"😊",
  studiedDays:new Set(),
  grammarDone:{},
  quizHistory:[],          // [{lesson, score, total, date}]
  kanjiLearnLog:{},        // {dateKey: count} kanji learned per day
  dailyActivity:{},        // {dateKey: {cards, kanji, quizzes, grammar}}
  anki:{today:"",again:"",mature:"",new:"",total:"",days:""},
};

try{
  const s=JSON.parse(localStorage.getItem("jp-study-v2")||"{}");
  if(s.lessonsDone)state.lessonsDone=s.lessonsDone;
  if(s.fcKnown)state.fcKnown=new Set(s.fcKnown);
  if(s.kanjiLearned)state.kanjiLearned=new Set(s.kanjiLearned);
  if(s.journalEntries)state.journalEntries=s.journalEntries;
  if(s.studiedDays)state.studiedDays=new Set(s.studiedDays);
  if(s.grammarDone)state.grammarDone=s.grammarDone;
  if(s.quizHistory)state.quizHistory=s.quizHistory;
  if(s.kanjiLearnLog)state.kanjiLearnLog=s.kanjiLearnLog;
  if(s.dailyActivity)state.dailyActivity=s.dailyActivity;
  if(s.anki)state.anki=s.anki;
}catch(e){}

function save(){
  try{
    localStorage.setItem("jp-study-v2",JSON.stringify({
      lessonsDone:state.lessonsDone,fcKnown:[...state.fcKnown],
      kanjiLearned:[...state.kanjiLearned],journalEntries:state.journalEntries,
      studiedDays:[...state.studiedDays],grammarDone:state.grammarDone,
      quizHistory:state.quizHistory,kanjiLearnLog:state.kanjiLearnLog,dailyActivity:state.dailyActivity,
      anki:state.anki,
    }));
  }catch(e){}
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function nav(page){
  document.querySelectorAll(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("visible"));
  document.getElementById("page-"+page).classList.add("visible");
  if(page==="home")renderHome();
  if(page==="lessons"){renderGrammarChips();renderGrammar();}
  if(page==="blog"){if(window.renderBlog)window.renderBlog();renderJournal();}
  if(page==="stats"){loadAnkiInputs();renderStats();}
  if(page==="journal")renderJournal();
  if(page==="resources")renderResources();
}
document.querySelectorAll(".nav-btn").forEach(btn=>btn.addEventListener("click",()=>nav(btn.dataset.page)));

// ─── HELPERS ──────────────────────────────────────────────────────────────────
// Indices ordered N5 → N4 → N3 → N2 → N1 → unrated, so daily rotation
// ramps up in difficulty instead of hitting random JLPT levels.
let KANJI_DIFFICULTY_ORDER = [];
function buildDifficultyOrder(){
  const order = ["N5","N4","N3","N2","N1","—"];
  KANJI_DIFFICULTY_ORDER = KANJI_DATA
    .map((k,i)=>i)
    .sort((a,b)=> order.indexOf(KANJI_DATA[a].jlpt) - order.indexOf(KANJI_DATA[b].jlpt));
}

function todayKanjiIndices(){
  if(!KANJI_DATA.length)return[];
  if(!KANJI_DIFFICULTY_ORDER.length)buildDifficultyOrder();
  const start=new Date(new Date().getFullYear(),0,0);
  const doy=Math.floor((new Date()-start)/86400000);
  const s=((doy-1)*5)%KANJI_DIFFICULTY_ORDER.length;
  return Array.from({length:5},(_,i)=>KANJI_DIFFICULTY_ORDER[(s+i)%KANJI_DIFFICULTY_ORDER.length]);
}
function fmtDate(d){return d.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});}
function todayKey(){const d=new Date();return`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;}

// Central activity logger — call when the user does something
function logActivity(type,amount){
  const k=todayKey();
  state.studiedDays.add(k);
  if(!state.dailyActivity[k])state.dailyActivity[k]={cards:0,kanji:0,quizzes:0,grammar:0};
  if(state.dailyActivity[k][type]!==undefined)state.dailyActivity[k][type]+=(amount||1);
  save();
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function renderHome(){
  const total=FLASHCARDS.length,known=state.fcKnown.size,pct=total?Math.round(known/total*100):0;
  const lessons=Object.values(state.lessonsDone).filter(Boolean).length;
  document.getElementById("home-words").textContent=`${known}/${total}`;
  document.getElementById("home-lessons").textContent=`${lessons}/12`;
  document.getElementById("home-kanji-count").textContent=state.kanjiLearned.size;
  // sidebar mirrors
  const sbWords=document.getElementById("sb-words"); if(sbWords)sbWords.textContent=`${known}/${total}`;
  const sbLessons=document.getElementById("sb-lessons"); if(sbLessons)sbLessons.textContent=`${lessons}/12`;
  const sbKanji=document.getElementById("sb-kanji"); if(sbKanji)sbKanji.textContent=state.kanjiLearned.size;
  document.getElementById("home-progress-bar").style.width=pct+"%";
  document.getElementById("home-progress-label").textContent=`${known} of ${total} vocab words marked known`;
  document.getElementById("home-kanji-date").textContent=fmtDate(new Date());
  const strip=document.getElementById("home-kanji-preview");
  if(KANJI_DATA.length){
    strip.innerHTML=todayKanjiIndices().map(i=>{const k=KANJI_DATA[i];
      return`<div class="home-kanji-chip" onclick="nav('kanji')">${k.char}<div class="chip-read">${(k.kun!=="—"?k.kun:k.on).split("・")[0]}</div></div>`;
    }).join("");
  }else{strip.innerHTML=`<div style="font-size:12px;color:var(--ink-soft);">Loading kanji…</div>`;}
  document.getElementById("home-lessons-grid").innerHTML=LESSONS.map((l,i)=>`
    <div class="panel lesson-overview-card ${state.lessonsDone[i]?"done":""}" onclick="selectLesson(${i});nav('lessons');">
      <div class="panel-body" style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div>
          <div style="font-size:9px;color:var(--ink-soft);text-transform:uppercase;letter-spacing:.07em;">Lesson ${l.num}</div>
          <div style="font-weight:500;font-size:13px;margin-top:2px;">${l.title}</div>
          <div style="font-size:11px;color:var(--ink-soft);font-style:italic;">${l.sub}</div>
          <div style="font-size:10px;color:var(--sakura-pink-dk);margin-top:4px;">${l.vocab.length} words</div>
        </div>
        ${state.lessonsDone[i]?"<span style='font-size:18px;'>🌸</span>":""}
      </div>
    </div>`).join("");
}

// ─── LESSONS ──────────────────────────────────────────────────────────────────
function renderLessons(){
  document.getElementById("lesson-chips").innerHTML=LESSONS.map((l,i)=>`
    <button class="chip ${i===state.selectedLesson?"active":""}" onclick="selectLesson(${i})">
      ${state.lessonsDone[i]?"🌸 ":""}L${l.num}
    </button>`).join("");
  renderLessonDetail();
}

function selectLesson(i){
  state.selectedLesson=i;
  grammarLesson=LESSONS[i].num; // sync deep grammar to this lesson
  document.querySelectorAll("#lesson-chips .chip").forEach((c,j)=>c.classList.toggle("active",j===i));
  document.querySelectorAll(".sub-tab").forEach(t=>t.classList.remove("active"));
  document.querySelectorAll(".sub-tab-content").forEach(t=>t.classList.remove("visible"));
  document.querySelector(".sub-tab[data-tab='grammar']").classList.add("active");
  document.getElementById("tab-grammar").classList.add("visible");
  renderLessonDetail();
  if(typeof renderGrammar==="function")renderGrammar();
}

function renderLessonDetail(){
  const l=LESSONS[state.selectedLesson];
  document.getElementById("ld-num").textContent=`Lesson ${l.num}`;
  document.getElementById("ld-title").textContent=l.title;
  document.getElementById("ld-sub").textContent=l.sub;
  document.getElementById("ld-topics").innerHTML=l.topics.map(t=>`<span class="pill">${t}</span>`).join("");
  const done=state.lessonsDone[state.selectedLesson];
  const btn=document.getElementById("ld-mark-btn");
  btn.textContent=done?"✅ Done!":"Mark Complete";
  btn.className=`btn ${done?"btn-soft":"btn-primary"}`;

  document.getElementById("tab-grammar").innerHTML=l.grammar.map(g=>`
    <div class="grammar-item">
      <div class="grammar-point">${g.p}</div>
      <div class="grammar-ex">${g.ex}</div>
      <div class="grammar-trans">${g.tr}</div>
    </div>`).join("");

  document.getElementById("tab-vocab").innerHTML=`<div class="vocab-grid">${
    l.vocab.map(v=>`<div class="vocab-item">
      <div><div class="vocab-jp">${v.jp}</div><div class="vocab-read">${v.read}</div></div>
      <div style="text-align:right;"><div class="vocab-en">${v.en}</div><div class="vocab-pos">${v.pos}</div></div>
    </div>`).join("")
  }</div>`;

  document.getElementById("tab-extra-vocab").innerHTML=l.extraVocab&&l.extraVocab.length
    ?`<div style="font-size:11px;color:var(--ink-soft);margin-bottom:10px;">Additional / supplementary vocabulary for this chapter</div>
      <div class="vocab-grid">${l.extraVocab.map(v=>`<div class="vocab-item">
        <div><div class="vocab-jp">${v.jp}</div><div class="vocab-read">${v.read}</div></div>
        <div style="text-align:right;"><div class="vocab-en">${v.en}</div><div class="vocab-pos">${v.pos}</div></div>
      </div>`).join("")}</div>`
    :`<div class="empty-state" style="padding:24px;">No extra vocab for this lesson.</div>`;

  const lk=(l.kanjiChars||[]).map(ch=>KANJI_DATA.find(k=>k.char===ch)).filter(Boolean);
  document.getElementById("tab-kanji-tab").innerHTML=lk.length
    ?`<div class="lesson-kanji-row">${lk.map(k=>`
        <div class="lesson-kanji-card" onclick="nav('kanji')">
          <div class="lesson-kanji-char">${k.char}</div>
          <div style="font-weight:700;font-size:12px;">${k.on}</div>
          <div style="font-size:10px;color:var(--ink-soft);">${k.mean}</div>
          <span class="pill ${k.jlpt.toLowerCase()}" style="margin-top:6px;">${k.jlpt}</span>
        </div>`).join("")
      }</div>`
    :`<div style="color:var(--ink-soft);font-size:12px;padding:12px 0;">Kanji loading from sheet… go to the Kanji tab to study today's set.</div>`;

  // My Notes tab (loaded from /content/lessons via content-loader)
  const notesEl=document.getElementById("tab-notes-tab");
  if(notesEl&&typeof window.renderLessonNotesFor==="function"){
    notesEl.innerHTML=window.renderLessonNotesFor(l.num);
  }else if(notesEl){
    notesEl.innerHTML='<div class="empty-state" style="padding:24px;">Loading notes…</div>';
  }
}

function markLessonDone(){
  state.lessonsDone[state.selectedLesson]=!state.lessonsDone[state.selectedLesson];
  save();renderLessons();
}

document.querySelectorAll(".sub-tab").forEach(tab=>{
  tab.addEventListener("click",()=>{
    document.querySelectorAll(".sub-tab").forEach(t=>t.classList.remove("active"));
    document.querySelectorAll(".sub-tab-content").forEach(t=>t.classList.remove("visible"));
    tab.classList.add("active");
    document.getElementById("tab-"+tab.dataset.tab).classList.add("visible");
  });
});

// ─── KANJI ────────────────────────────────────────────────────────────────────
function renderKanji(){
  if(!KANJI_DATA.length)return;
  document.getElementById("kanji-date-label").textContent=fmtDate(new Date());
  const todayIdx=todayKanjiIndices();
  document.getElementById("kanji-today-grid").innerHTML=todayIdx.map(ki=>{
    const k=KANJI_DATA[ki],learned=state.kanjiLearned.has(ki),active=state.selectedKanjiIdx===ki;
    return`<div class="kanji-today-card ${learned?"learned":""} ${active?"active":""}" onclick="selectKanji(${ki})">
      <div class="ktc-badge">${learned?"✅":"&nbsp;"}</div>
      <div class="ktc-char">${k.char}</div>
      <div class="ktc-read">${k.on.split("・")[0]}</div>
      <div class="ktc-mean">${k.mean.split(",")[0]}</div>
    </div>`;
  }).join("");
  renderKanjiBank();
}

function selectKanji(ki){
  state.selectedKanjiIdx=ki;const k=KANJI_DATA[ki];
  document.getElementById("kanji-detail-card").style.display="block";
  document.getElementById("kd-char").textContent=k.char;
  document.getElementById("kd-read").textContent=`音: ${k.on}　訓: ${k.kun}`;
  document.getElementById("kd-mean").textContent=k.mean;
  document.getElementById("kd-jlpt").textContent=k.jlpt;
  document.getElementById("kd-jlpt").className=`pill ${k.jlpt.toLowerCase()}`;
  document.getElementById("kd-stroke").textContent=`${k.strokes} strokes`;
  document.getElementById("kd-examples").innerHTML=k.examples.length
    ?k.examples.map(ex=>`<div class="kanji-ex-item"><span class="kanji-ex-jp">${ex[0]}</span>${ex[1]?` <span class="kanji-ex-en">(${ex[1]})`:""} ${ex[2]?`— ${ex[2]}</span>`:""}</div>`).join("")
    :`<div style="font-size:11px;color:var(--ink-soft);">No examples available</div>`;
  const storyEl=document.getElementById("kd-story"),storyBtn=document.getElementById("kd-story-btn");
  if(k.story){storyEl.textContent=k.story;storyBtn.style.display="inline-block";}
  else{storyEl.style.display="none";storyBtn.style.display="none";}
  const learned=state.kanjiLearned.has(ki);
  document.getElementById("kanji-learn-btn").textContent=learned?"✅ Learned!":"Mark as Learned";
  document.getElementById("kanji-input").value="";
  document.getElementById("kanji-feedback").innerHTML="";
  document.getElementById("kanji-detail-card").scrollIntoView({behavior:"smooth",block:"nearest"});
  renderKanji();
}

function toggleStory(){
  const el=document.getElementById("kd-story"),btn=document.getElementById("kd-story-btn");
  const vis=el.style.display==="block";
  el.style.display=vis?"none":"block";
  btn.textContent=vis?"Show mnemonic":"Hide mnemonic";
}

function checkKanji(){
  if(state.selectedKanjiIdx===null)return;
  const k=KANJI_DATA[state.selectedKanjiIdx];
  const input=document.getElementById("kanji-input").value.trim().toLowerCase();
  if(!input)return;
  const all=[...k.on.split("・"),...k.kun.split("・")].map(r=>r.toLowerCase().replace(/[・。\s（(].*/g,"").trim()).filter(Boolean);
  const ok=all.some(r=>r&&input.replace(/\s/g,"")===r);
  document.getElementById("kanji-feedback").innerHTML=ok
    ?`<div class="feedback-box feedback-correct">✓ Correct! 音: ${k.on}　訓: ${k.kun}</div>`
    :`<div class="feedback-box feedback-wrong">Not quite — 音: ${k.on} / 訓: ${k.kun}</div>`;
}

function markKanjiLearned(){
  if(state.selectedKanjiIdx===null)return;
  const ki=state.selectedKanjiIdx;
  if(state.kanjiLearned.has(ki)){
    state.kanjiLearned.delete(ki);
  }else{
    state.kanjiLearned.add(ki);
    const k=todayKey();
    state.kanjiLearnLog[k]=(state.kanjiLearnLog[k]||0)+1;
    logActivity("kanji",1);
  }
  save();
  document.getElementById("kanji-learn-btn").textContent=state.kanjiLearned.has(ki)?"✅ Learned!":"Mark as Learned";
  renderKanji();
}

function renderKanjiBank(){
  const search=(document.getElementById("kanji-search")||{}).value?.toLowerCase()||"";
  const jlpt=state.kanjiJlptFilter;
  document.getElementById("kanji-jlpt-filters").innerHTML=["All","N5","N4","N3","N2","N1"].map(f=>
    `<button class="chip ${jlpt===f?"active":""}" onclick="setKanjiFilter('${f}')">${f}</button>`).join("");

  const MAX_RESULTS=300; // cap rendering so the page stays fast with 3,000+ kanji
  let count=0, shown=0;
  const cards=[];
  for(let ki=0; ki<KANJI_DATA.length; ki++){
    const k=KANJI_DATA[ki];
    const mj=jlpt==="All"||k.jlpt===jlpt;
    if(!mj)continue;
    const ms=!search||k.char.includes(search)||k.on.toLowerCase().includes(search)||k.kun.toLowerCase().includes(search)||k.mean.toLowerCase().includes(search);
    if(!ms)continue;
    count++;
    if(shown>=MAX_RESULTS)continue;
    shown++;
    const learned=state.kanjiLearned.has(ki);
    cards.push(`<div class="kanji-grid-item ${learned?"learned":""}" onclick="selectKanji(${ki})" title="${k.on} / ${k.kun} — ${k.mean}">
      <div class="kanji-grid-char">${k.char}</div>
      <div class="kanji-grid-read">${k.on.split("・")[0]}</div>
      <div class="kanji-grid-mean">${k.mean.split(",")[0]}</div>
    </div>`);
  }
  document.getElementById("kanji-bank-grid").innerHTML=cards.join("");

  const noteEl=document.getElementById("kanji-bank-note");
  if(noteEl){
    noteEl.textContent = count>MAX_RESULTS
      ? `Showing ${MAX_RESULTS} of ${count} matches — narrow with the search box or a JLPT filter to see more.`
      : `${count} kanji found.`;
  }
}
function setKanjiFilter(f){state.kanjiJlptFilter=f;renderKanjiBank();}
function filterKanjiBank(){renderKanjiBank();}

// ─── QUIZ ─────────────────────────────────────────────────────────────────────
function renderQuizChips(){
  document.getElementById("quiz-chips").innerHTML=LESSONS.map((l,i)=>
    `<button class="chip ${i===state.quizLessonIdx?"active":""}" onclick="selectQuizLesson(${i})">L${l.num}</button>`).join("");
}
function selectQuizLesson(i){state.quizLessonIdx=i;state.quizQIdx=0;state.quizScore=0;state.quizAnswered=false;renderQuizChips();renderQuiz();}
function renderQuiz(){
  const l=LESSONS[state.quizLessonIdx],q=l.quiz[state.quizQIdx];
  document.getElementById("quiz-card").style.display="block";
  document.getElementById("quiz-result").style.display="none";
  document.getElementById("quiz-bar").style.width=(state.quizQIdx/l.quiz.length*100)+"%";
  document.getElementById("quiz-score-pill").textContent="Score: "+state.quizScore;
  document.getElementById("quiz-q-num").textContent=`Question ${state.quizQIdx+1} of ${l.quiz.length}`;
  document.getElementById("quiz-question").textContent=q.q;
  document.getElementById("quiz-next-row").style.display="none";
  document.getElementById("quiz-choices").innerHTML=q.ch.map((c,i)=>`<button class="choice-btn" onclick="pickAnswer(${i})">${c}</button>`).join("");
  state.quizAnswered=false;
}
function pickAnswer(i){
  if(state.quizAnswered)return;state.quizAnswered=true;
  const q=LESSONS[state.quizLessonIdx].quiz[state.quizQIdx];
  if(i===q.a){state.quizScore++;document.querySelectorAll(".choice-btn")[i].classList.add("correct");}
  else{document.querySelectorAll(".choice-btn")[i].classList.add("wrong");document.querySelectorAll(".choice-btn")[q.a].classList.add("correct");}
  document.querySelectorAll(".choice-btn").forEach(b=>b.disabled=true);
  document.getElementById("quiz-next-row").style.display="flex";
  document.getElementById("quiz-score-pill").textContent="Score: "+state.quizScore;
}
function quizNext(){state.quizQIdx++;if(state.quizQIdx<LESSONS[state.quizLessonIdx].quiz.length)renderQuiz();else showQuizResult();}
function showQuizResult(){
  const t=LESSONS[state.quizLessonIdx].quiz.length;
  // record quiz attempt in history
  state.quizHistory.push({lesson:LESSONS[state.quizLessonIdx].num,score:state.quizScore,total:t,date:new Date().toISOString()});
  if(state.quizHistory.length>200)state.quizHistory=state.quizHistory.slice(-200);
  logActivity("quizzes",1);
  document.getElementById("quiz-card").style.display="none";document.getElementById("quiz-result").style.display="block";
  const icon=state.quizScore===t?"🌸":state.quizScore>=t/2?"✨":"💪";
  const msgs={"🌸":"Perfect score! You know this lesson well 🌸","✨":"Nice work! Review any missed ones.","💪":"Keep going — practice makes perfect!"};
  document.getElementById("qr-icon").textContent=icon;document.getElementById("qr-score").textContent=`${state.quizScore}/${t}`;
  document.getElementById("qr-msg").textContent=msgs[icon];
  document.getElementById("quiz-next-lesson-btn").disabled=state.quizLessonIdx>=11;
}
function quizRestart(){state.quizQIdx=0;state.quizScore=0;state.quizAnswered=false;renderQuiz();}
function quizNextLesson(){selectQuizLesson(Math.min(state.quizLessonIdx+1,11));}

// ─── FLASHCARDS ───────────────────────────────────────────────────────────────
function filtered(){return state.fcFilter==="All"?FLASHCARDS:FLASHCARDS.filter(c=>c.t===state.fcFilter);}
function renderFCChips(){
  const customTags=[...new Set((window.CUSTOM_DECKS||[]).map(d=>d.tag||"Custom"))];
  const tags=["All",...LESSONS.map(l=>`L${l.num}`),...customTags];
  document.getElementById("fc-chips").innerHTML=tags.map(t=>
    `<button class="chip ${t===state.fcFilter?"active":""}" onclick="setFCFilter('${t}')">${t}</button>`).join("");
}
function setFCFilter(tag){state.fcFilter=tag;state.fcIdx=0;state.fcFlipped=false;renderFCChips();renderFC();}
function renderFC(){
  const cards=filtered(),card=cards[state.fcIdx];if(!card)return;
  const fc=document.getElementById("flashcard");
  fc.classList.toggle("flipped",state.fcFlipped);
  document.getElementById("fc-tag").textContent=card.t;
  document.getElementById("fc-content").textContent=state.fcFlipped?card.b:card.f;
  document.getElementById("fc-content").className=state.fcFlipped?"fc-back":"fc-front";
  document.getElementById("fc-hint").textContent=state.fcFlipped?"← tap to flip back":"tap to reveal →";
  document.getElementById("fc-known-badge").style.display=state.fcKnown.has(card.f)?"block":"none";
  document.getElementById("fc-prev").disabled=state.fcIdx===0;
  document.getElementById("fc-next").disabled=state.fcIdx===cards.length-1;
  document.getElementById("fc-stats").innerHTML=`
    <span class="pill green">✓ Known: ${state.fcKnown.size}</span>
    <span class="pill muted">Total: ${cards.length}</span>
    <span class="pill">${state.fcIdx+1}/${cards.length}</span>`;
}
function flipCard(){state.fcFlipped=!state.fcFlipped;renderFC();}
function fcMove(dir){const c=filtered();state.fcIdx=Math.max(0,Math.min(c.length-1,state.fcIdx+dir));state.fcFlipped=false;renderFC();}
function fcKnow(){const c=filtered()[state.fcIdx];if(c){state.fcKnown.add(c.f);logActivity("cards",1);}save();fcMove(1);}
function fcAgain(){const c=filtered()[state.fcIdx];if(c)state.fcKnown.delete(c.f);save();fcMove(1);}

// ─── STATS ────────────────────────────────────────────────────────────────────
function saveAnki(){
  state.anki={
    today:document.getElementById("anki-today").value,
    again:document.getElementById("anki-again").value,
    mature:document.getElementById("anki-mature").value,
    new:document.getElementById("anki-new").value,
    total:document.getElementById("anki-total").value,
    days:document.getElementById("anki-days").value,
  };
  save();renderStats();
}
function loadAnkiInputs(){
  ["today","again","mature","new","total","days"].forEach(k=>{
    const el=document.getElementById("anki-"+k);if(el)el.value=state.anki[k]||"";
  });
}

function renderStats(){
  const a=state.anki;
  const totalCards=parseInt(a.total)||1749,newCards=parseInt(a.new)||1309;
  const known=state.fcKnown.size,totalFC=FLASHCARDS.length;
  const lessonsN=Object.values(state.lessonsDone).filter(Boolean).length;
  const studyRate=a.days?Math.round(parseInt(a.days)/31*100):0;
  const kanjiLearned=state.kanjiLearned.size;
  const totalDays=state.studiedDays.size;
  const streak=calcStreak();
  // quiz average
  const qh=state.quizHistory;
  const quizAvg=qh.length?Math.round(qh.reduce((s,q)=>s+(q.score/q.total),0)/qh.length*100):0;

  // Stat cards — now from real tracked data
  document.getElementById("stats-cards").innerHTML=[
    {icon:"🔥",val:streak,label:"Day Streak",sub:`${totalDays} days total`},
    {icon:"🃏",val:`${known}`,label:"Vocab Mastered",sub:`of ${totalFC} cards`},
    {icon:"🖊",val:kanjiLearned,label:"Kanji Learned",sub:"all-time"},
    {icon:"🌟",val:qh.length?quizAvg+"%":"—",label:"Quiz Average",sub:`${qh.length} quizzes taken`},
    {icon:"📚",val:`${lessonsN}/12`,label:"Lessons Done",sub:"Genki I"},
    {icon:"📖",val:Object.keys(state.grammarDone||{}).length,label:"Grammar Points",sub:"practiced"},
  ].map(s=>`<div class="panel stat-block"><div class="stat-icon">${s.icon}</div><div class="stat-val">${s.val}</div><div class="stat-label">${s.label}</div><div style="font-size:10px;color:var(--ink-soft);margin-top:2px;">${s.sub}</div></div>`).join("");

  // Progress bars
  document.getElementById("stats-bars-inner").innerHTML=[
    {label:"Vocab mastered",pct:totalFC?Math.round(known/totalFC*100):0,col:"pink"},
    {label:"Genki I lessons",pct:Math.round(lessonsN/12*100),col:"green"},
    {label:"Quiz accuracy (avg)",pct:quizAvg,col:"pink"},
    {label:"Anki deck matured",pct:Math.round((totalCards-newCards)/totalCards*100),col:"pink"},
    {label:"Anki days this month",pct:studyRate,col:"green"},
  ].map(b=>`
    <div class="stat-bar-row">
      <div class="stat-bar-label">${b.label}</div>
      <div class="progress-wrap-${b.col==="green"?"green":"sm"}" style="flex:1;">
        <div class="progress-bar-${b.col==="green"?"green":"sm"}" style="width:${b.pct}%"></div>
      </div>
      <div class="stat-bar-pct">${b.pct}%</div>
    </div>`).join("");

  // 14-day activity sparkline
  renderActivitySparkline();

  // Lesson vocab breakdown
  document.getElementById("stats-lesson-breakdown").innerHTML=LESSONS.map((l,i)=>{
    const lCards=FLASHCARDS.filter(c=>c.t===`L${l.num}`);
    const lKnown=lCards.filter(c=>state.fcKnown.has(c.f)).length;
    const pct=lCards.length?Math.round(lKnown/lCards.length*100):0;
    return`<div class="lesson-stat-row">
      <div class="lesson-stat-name">L${l.num}: ${l.title}</div>
      <div class="lesson-stat-count">${lKnown}/${lCards.length}</div>
      <div class="progress-wrap-sm" style="flex:1;">
        <div class="progress-bar-sm" style="width:${pct}%"></div>
      </div>
      <div class="stat-bar-pct">${pct}%</div>
      ${state.lessonsDone[i]?"<span style='margin-left:8px;'>🌸</span>":""}
    </div>`;
  }).join("");

  renderCalendar();
}

// 14-day activity bar chart
function renderActivitySparkline(){
  const host=document.getElementById("stats-activity");
  if(!host)return;
  const days=[];
  const d=new Date();d.setDate(d.getDate()-13);
  let max=1;
  for(let i=0;i<14;i++){
    const key=`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    const a=state.dailyActivity[key]||{cards:0,kanji:0,quizzes:0,grammar:0};
    const total=(a.cards||0)+(a.kanji||0)+(a.quizzes||0)+(a.grammar||0);
    days.push({label:d.getDate(),total,studied:state.studiedDays.has(key)});
    if(total>max)max=total;
    d.setDate(d.getDate()+1);
  }
  host.innerHTML=`
    <div style="font-weight:700;font-size:14px;margin-bottom:12px;">Last 14 Days Activity</div>
    <div class="spark-row">
      ${days.map(x=>{
        const h=Math.max(4,Math.round((x.total/max)*60));
        const col=x.total>0?"var(--sakura-pink)":(x.studied?"var(--sakura-pink-lt)":"var(--line-soft)");
        return `<div class="spark-col" title="${x.total} actions">
          <div class="spark-bar" style="height:${h}px;background:${col};"></div>
          <div class="spark-label">${x.label}</div>
        </div>`;
      }).join("")}
    </div>`;
}

function renderCalendar(){
  const now=new Date(),year=now.getFullYear(),month=now.getMonth();
  const days=new Date(year,month+1,0).getDate();
  const firstDay=new Date(year,month,1).getDay();
  const dayNames=["S","M","T","W","T","F","S"];
  let html=`<div class="cal-grid">${dayNames.map(d=>`<div class="cal-header">${d}</div>`).join("")}`;
  for(let i=0;i<firstDay;i++)html+=`<div class="cal-day empty"></div>`;
  for(let d=1;d<=days;d++){
    const key=`${year}-${month}-${d}`,studied=state.studiedDays.has(key),isToday=d===now.getDate();
    html+=`<div class="cal-day ${studied?"studied":""} ${isToday?"today":""}" onclick="toggleStudyDay('${key}',this)">${d}</div>`;
  }
  html+="</div>";
  document.getElementById("study-calendar").innerHTML=html;
  const streak=calcStreak();
  document.getElementById("streak-label").textContent=`🔥 Current streak: ${streak} day${streak===1?"":"s"}  ·  🏆 Best: ${longestStreak()} days`;
}

function toggleStudyDay(key,el){
  if(state.studiedDays.has(key)){state.studiedDays.delete(key);el.classList.remove("studied");}
  else{state.studiedDays.add(key);el.classList.add("studied");}
  save();
  document.getElementById("streak-label").textContent=`🔥 Current streak: ${calcStreak()} days  ·  🏆 Best: ${longestStreak()} days`;
}

function calcStreak(){
  // Count consecutive days back from today that are in studiedDays
  let streak=0;
  const d=new Date();
  for(let i=0;i<400;i++){
    const key=`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if(state.studiedDays.has(key))streak++;
    else if(i>0)break;        // allow today to be empty without breaking
    else if(i===0){/* today empty, keep checking yesterday */}
    d.setDate(d.getDate()-1);
  }
  return streak;
}
function longestStreak(){
  // Convert studiedDays to sorted timestamps, find longest consecutive run
  const days=[...state.studiedDays].map(k=>{const[y,m,d]=k.split("-").map(Number);return new Date(y,m,d).getTime();}).sort((a,b)=>a-b);
  let best=0,cur=0,prev=null;
  for(const t of days){
    if(prev!==null&&t-prev===86400000)cur++;
    else cur=1;
    if(cur>best)best=cur;
    prev=t;
  }
  return best;
}

// ─── JOURNAL ──────────────────────────────────────────────────────────────────
document.querySelectorAll(".mood-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".mood-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");state.selectedMood=btn.dataset.mood;
  });
});
function addJournalEntry(){
  const text=document.getElementById("journal-input").value.trim();if(!text)return;
  state.journalEntries.unshift({id:Date.now(),date:fmtDate(new Date()),text,mood:state.selectedMood});
  // auto-mark today as studied
  state.studiedDays.add(todayKey());
  save();document.getElementById("journal-input").value="";renderJournal();
}
function renderJournal(){
  const el=document.getElementById("journal-entries");
  if(!state.journalEntries.length){el.innerHTML='<div class="empty-state">No private notes yet 🌸</div>';return;}
  el.innerHTML=state.journalEntries.map(e=>`
    <div class="panel entry-card">
      <div class="panel-body">
        <div class="entry-header"><span class="entry-date">${e.date}</span><span style="font-size:22px;">${e.mood}</span></div>
        <div class="entry-text">${e.text.replace(/\n/g,"<br>")}</div>
      </div>
    </div>`).join("");
}

// ─── RESOURCES ────────────────────────────────────────────────────────────────
function renderResources(){
  const mk=arr=>arr.map(r=>`
    <a class="resource-card" href="${r.url}" target="_blank" rel="noopener">
      <span class="resource-icon">${r.icon}</span>
      <div><div class="resource-title">${r.title}</div><div class="resource-desc">${r.desc}</div></div>
    </a>`).join("");
  document.getElementById("jomako-links").innerHTML=mk(RESOURCES.jomako);
  document.getElementById("tool-links").innerHTML=mk(RESOURCES.tools);
  document.getElementById("genki-links").innerHTML=mk(RESOURCES.genki);
}

// ─── GRAMMAR PAGE ─────────────────────────────────────────────────────────────
let grammarLesson=1;

function renderGrammarChips(){
  // Grammar now follows the selected lesson; chip row removed.
  const el=document.getElementById("grammar-lesson-chips");
  if(!el)return; // element no longer exists in merged layout
  const G=window.GRAMMAR||{};
  const lessons=Object.keys(G).map(Number).sort((a,b)=>a-b);
  el.innerHTML=lessons.map(n=>
    `<button class="chip ${n===grammarLesson?"active":""}" onclick="selectGrammarLesson(${n})">L${n}</button>`).join("");
}

function selectGrammarLesson(n){
  grammarLesson=n;
  renderGrammarChips();
  renderGrammar();
  window.scrollTo({top:0,behavior:"smooth"});
}

function renderGrammar(){
  const G=window.GRAMMAR||{};
  const data=G[grammarLesson];
  const pointsEl=document.getElementById("grammar-points");
  const introWin=document.getElementById("grammar-intro");
  const introEl=introWin?introWin.querySelector(".panel-body"):introWin;
  if(!pointsEl||!introEl)return;
  if(!data){
    introEl.innerHTML=`<div class="grammar-intro-text">📖 In-depth grammar with practice questions is available for Lessons 1–6 so far. Lesson ${grammarLesson}'s detailed write-up is coming soon — for now, see the <b>Grammar Summary</b> tab above for this lesson's key points.</div>`;
    pointsEl.innerHTML="";
    return;
  }
  const introTitle=introWin?introWin.querySelector(".panel-title"):null;
  if(introTitle)introTitle.textContent=`lesson ${grammarLesson} — overview`;
  introEl.innerHTML=`<div class="grammar-intro-text">${data.intro}</div>`;

  pointsEl.innerHTML=data.points.map((p,pi)=>{
    const done=state.grammarDone&&state.grammarDone[p.id];
    return`
    <div class="gp-card">
      <div class="gp-header" onclick="toggleGP(${pi})" id="gp-header-${pi}">
        <div>
          <div class="gp-title">${p.title} ${done?'<span class="gp-progress-badge">✓ practiced</span>':''}</div>
          <div class="gp-summary">${p.summary}</div>
        </div>
        <span class="gp-toggle" id="gp-toggle-${pi}">+</span>
      </div>
      <div class="gp-body" id="gp-body-${pi}">
        ${p.sections.map(s=>`<div class="gp-section"><div class="gp-section-h">${s.h}</div><div class="gp-section-t">${s.t}</div></div>`).join("")}
        <div class="gp-examples">
          <div class="gp-section-h">Examples</div>
          ${p.examples.map(e=>`<div class="gp-example"><div class="gp-example-jp">${e.jp}</div><div class="gp-example-en">${e.en}</div></div>`).join("")}
        </div>
        ${p.notes&&p.notes.length?`<div class="gp-notes"><div class="gp-notes-title">⚠️ Key notes</div>${p.notes.map(n=>`<div class="gp-note">${n}</div>`).join("")}</div>`:""}
        <div class="gp-practice">
          <div class="gp-practice-title">✏️ Practice (${p.practice.length} questions)</div>
          ${p.practice.map((q,qi)=>renderPracticeQ(p.id,pi,qi,q)).join("")}
        </div>
      </div>
    </div>`;
  }).join("");
}

function renderPracticeQ(pointId,pi,qi,q){
  const id=`prac-${grammarLesson}-${pi}-${qi}`;
  const typeLabel={mc:"Multiple Choice",fill:"Fill in the blank",translate:"Translation",order:"Word order"}[q.type]||"Practice";
  let inner="";
  if(q.type==="mc"){
    inner=`<div class="practice-choices">${q.choices.map((c,ci)=>
      `<button class="practice-choice" id="${id}-c${ci}" onclick="answerMC('${id}',${ci},${q.a},'${pointId}')">${c}</button>`).join("")}</div>`;
  }else{
    inner=`<div class="practice-input-row">
      <input type="text" id="${id}-input" placeholder="Type your answer…"/>
      <button class="btn btn-primary" onclick="answerText('${id}','${pointId}')">Check</button>
    </div>`;
  }
  return`
    <div class="practice-q" id="${id}">
      <div class="practice-q-type">${typeLabel}</div>
      <div class="practice-q-text">${q.q}</div>
      ${inner}
      <div class="practice-explain" id="${id}-explain"></div>
    </div>`;
}

// store correct data for text questions on the fly
function getPracticeQ(pointId,qi){
  const data=(window.GRAMMAR||{})[grammarLesson];
  if(!data)return null;
  for(const p of data.points){if(p.id===pointId)return p.practice[qi];}
  return null;
}

function toggleGP(pi){
  const body=document.getElementById("gp-body-"+pi);
  const tog=document.getElementById("gp-toggle-"+pi);
  const hdr=document.getElementById("gp-header-"+pi);
  const open=body.classList.contains("open");
  body.classList.toggle("open",!open);
  tog.classList.toggle("open",!open);
  tog.textContent=open?"+":"×";
  hdr.classList.toggle("open",!open);
}

function answerMC(id,chosen,correct,pointId){
  // disable all
  let ci=0;
  while(document.getElementById(id+"-c"+ci)){
    const btn=document.getElementById(id+"-c"+ci);
    btn.disabled=true;
    if(ci===correct)btn.classList.add("correct");
    if(ci===chosen&&chosen!==correct)btn.classList.add("wrong");
    ci++;
  }
  const qi=parseInt(id.split("-")[3]);
  const q=getPracticeQ(pointId,qi);
  const ex=document.getElementById(id+"-explain");
  ex.classList.add("show",chosen===correct?"correct":"wrong");
  ex.textContent=(chosen===correct?"✓ Correct! ":"✗ Not quite. ")+(q&&q.ex?q.ex:"");
  markGrammarPracticed(pointId);
}

function normalizeJP(s){
  return (s||"").trim().replace(/[。、\s]/g,"").toLowerCase();
}

function answerText(id,pointId){
  const qi=parseInt(id.split("-")[3]);
  const q=getPracticeQ(pointId,qi);
  if(!q)return;
  const input=document.getElementById(id+"-input").value;
  const norm=normalizeJP(input);
  const accepts=[q.answer,...(q.accept||[])].map(normalizeJP);
  const ok=accepts.some(a=>a&&norm===a);
  const ex=document.getElementById(id+"-explain");
  ex.className="practice-explain show "+(ok?"correct":"wrong");
  ex.innerHTML=(ok?"✓ Correct! ":`✗ Not quite. The answer is <b>${q.answer}</b>. `)+(q.ex?q.ex:"");
  markGrammarPracticed(pointId);
}

function markGrammarPracticed(pointId){
  if(!state.grammarDone)state.grammarDone={};
  state.grammarDone[pointId]=true;
  logActivity("grammar",1);
  save();
}

// ─── PETALS ───────────────────────────────────────────────────────────────────
function spawnPetals(){
  const c=document.getElementById("petals");
  for(let i=0;i<10;i++){
    const p=document.createElement("div");p.className="petal";p.textContent="🌸";
    p.style.left=Math.random()*100+"vw";p.style.animationDuration=(9+Math.random()*12)+"s";
    p.style.animationDelay=(Math.random()*14)+"s";p.style.fontSize=(10+Math.random()*10)+"px";
    c.appendChild(p);
  }
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
renderHome();
renderLessons();
renderGrammarChips();
renderGrammar();
renderQuizChips();
renderQuiz();
renderFCChips();
renderFC();
renderJournal();
renderResources();
spawnPetals();
loadKanjiData();

// ── Expose cross-file functions globally (so content-loader.js can call them) ──
window.mergeCustomDecks = mergeCustomDecks;
window.renderFCChips = renderFCChips;
window.renderFC = renderFC;
window.renderLessonDetail = renderLessonDetail;
