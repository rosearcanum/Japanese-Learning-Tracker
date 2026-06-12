/* ══════════════════════════════════════════
   日本語 Study App — app.js  v2
   Vocab: Marshall Yin / Genki I 3rd ed.
   Kanji: live from Jo-Mako's sheet
══════════════════════════════════════════ */

// ── Netlify Identity: redirect to admin after login confirmation ──
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => { document.location.href = "/admin/"; });
    }
  });
}

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const SHEET_ID  = "1056uW4iIObSuwptN5Xpbg0UbOy9ALvxMUIxQbl6QfUI";
const KANJI_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Kanji`;

let KANJI_DATA = [];

// ─── CSV / FETCH ──────────────────────────────────────────────────────────────
function parseCSV(text) {
  const rows = []; let row = [], field = "", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i], nx = text[i+1];
    if (inQ) {
      if (ch==='"'&&nx==='"'){field+='"';i++;}
      else if(ch==='"'){inQ=false;}
      else{field+=ch;}
    } else {
      if(ch==='"'){inQ=true;}
      else if(ch===','){row.push(field.trim());field="";}
      else if(ch==='\n'||(ch==='\r'&&nx==='\n')){row.push(field.trim());rows.push(row);row=[];field="";if(ch==='\r')i++;}
      else{field+=ch;}
    }
  }
  if(field||row.length){row.push(field.trim());rows.push(row);}
  return rows;
}
function stripHTML(s){return(s||"").replace(/<[^>]+>/g," ").replace(/\s{2,}/g," ").trim();}
function parseVocab(str){
  if(!str)return[];
  return stripHTML(str).split(/\s{2,}/).filter(Boolean).slice(0,3).map(e=>{
    const m=e.match(/^(.+?)【(.+?)】\s*(.+)$/);
    return m?[m[1].trim(),m[2].trim(),m[3].split(",")[0].trim()]:[e.trim(),"",""];
  }).filter(e=>e[0]);
}
function rowToKanji(h,c){
  const g=n=>(c[h.indexOf(n)]||"").trim();
  const char=g("Kanji");if(!char||char==="Kanji")return null;
  return{
    char,on:g("Reading On").replace(/、/g,"・")||"—",kun:g("Reading Kun").replace(/、/g,"・")||"—",
    mean:g("Keyword_KKLC")||g("Keyword_RTK")||"—",jlpt:g("Info_JLPT")||"—",
    strokes:parseInt(g("Info_Stroke_Count"))||0,
    freq2k:g("Info_Frequency_Top2000")==="TRUE",freq5k:g("Info_Frequency_Top5000")==="TRUE",
    examples:[...parseVocab(g("Vocab_On")),...parseVocab(g("Vocab_Kun"))].slice(0,4),
    story:stripHTML(g("Story_Wanikani")||g("Story_KKLC")||g("Story_RTK")||"").slice(0,500),
  };
}

async function fetchKanji(){
  showKanjiLoading(true);
  try{
    const res=await fetch(KANJI_URL);if(!res.ok)throw new Error("HTTP "+res.status);
    const text=await res.text();const rows=parseCSV(text);if(rows.length<2)throw new Error("Empty");
    const h=rows[0].map(x=>x.trim());
    KANJI_DATA=rows.slice(1).map(r=>rowToKanji(h,r)).filter(Boolean);
    console.log("✅ Loaded "+KANJI_DATA.length+" kanji");
  }catch(e){console.warn("⚠️ Kanji fetch failed:",e.message,"— using fallback");KANJI_DATA=FALLBACK_KANJI;}
  showKanjiLoading(false);renderKanji();renderHome();
}
function showKanjiLoading(on){
  const el=document.getElementById("kanji-today-grid");
  if(el&&on)el.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:40px;font-family:'DM Sans',sans-serif;color:var(--muted);">🌸 Loading kanji from Jo-Mako's sheet…</div>`;
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
      {jp:"今",read:"いま",en:"now",pos:"n."},
      {jp:"英語",read:"えいご",en:"English",pos:"n."},
      {jp:"学生",read:"がくせい",en:"student",pos:"n."},
      {jp:"高校",read:"こうこう",en:"high school",pos:"n."},
      {jp:"午後",read:"ごご",en:"P.M.",pos:"n."},
      {jp:"午前",read:"ごぜん",en:"A.M.",pos:"n."},
      {jp:"先生",read:"せんせい",en:"teacher",pos:"n."},
      {jp:"専門",read:"せんもん",en:"major / specialty",pos:"n."},
      {jp:"大学",read:"だいがく",en:"college / university",pos:"n."},
      {jp:"電話",read:"でんわ",en:"telephone",pos:"n."},
      {jp:"友達",read:"ともだち",en:"friend",pos:"n."},
      {jp:"名前",read:"なまえ",en:"name",pos:"n."},
      {jp:"日本",read:"にほん",en:"Japan",pos:"n."},
      {jp:"番号",read:"ばんごう",en:"number",pos:"n."},
      {jp:"留学生",read:"りゅうがくせい",en:"international student",pos:"n."},
      {jp:"私",read:"わたし",en:"I",pos:"n."},
    ],
    extraVocab:[
      {jp:"アメリカ",read:"アメリカ",en:"U.S.A.",pos:"n."},{jp:"中国",read:"ちゅうごく",en:"China",pos:"n."},
      {jp:"韓国",read:"かんこく",en:"Korea",pos:"n."},{jp:"経済",read:"けいざい",en:"economics",pos:"n."},
      {jp:"医者",read:"いしゃ",en:"doctor",pos:"n."},{jp:"会社員",read:"かいしゃいん",en:"office worker",pos:"n."},
      {jp:"主婦",read:"しゅふ",en:"housewife",pos:"n."},{jp:"弁護士",read:"べんごし",en:"lawyer",pos:"n."},
    ],
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
      {jp:"美味しい",read:"おいしい",en:"delicious",pos:"い-adj."},
      {jp:"魚",read:"さかな",en:"fish",pos:"n."},
      {jp:"肉",read:"にく",en:"meat",pos:"n."},
      {jp:"野菜",read:"やさい",en:"vegetable",pos:"n."},
      {jp:"鉛筆",read:"えんぴつ",en:"pencil",pos:"n."},
      {jp:"傘",read:"かさ",en:"umbrella",pos:"n."},
      {jp:"靴",read:"くつ",en:"shoes",pos:"n."},
      {jp:"財布",read:"さいふ",en:"wallet",pos:"n."},
      {jp:"辞書",read:"じしょ",en:"dictionary",pos:"n."},
      {jp:"自転車",read:"じてんしゃ",en:"bicycle",pos:"n."},
      {jp:"新聞",read:"しんぶん",en:"newspaper",pos:"n."},
      {jp:"時計",read:"とけい",en:"clock / watch",pos:"n."},
      {jp:"ノート",read:"ノート",en:"notebook",pos:"n."},
      {jp:"帽子",read:"ぼうし",en:"hat / cap",pos:"n."},
      {jp:"本",read:"ほん",en:"book",pos:"n."},
      {jp:"図書館",read:"としょかん",en:"library",pos:"n."},
      {jp:"郵便局",read:"ゆうびんきょく",en:"post office",pos:"n."},
      {jp:"銀行",read:"ぎんこう",en:"bank",pos:"n."},
      {jp:"いくら",read:"いくら",en:"how much",pos:"exp."},
      {jp:"高い",read:"たかい",en:"expensive / tall",pos:"い-adj."},
    ],
    extraVocab:[
      {jp:"ジーンズ",read:"ジーンズ",en:"jeans",pos:"n."},{jp:"テープ",read:"テープ",en:"tape",pos:"n."},
      {jp:"お手洗い",read:"おてあらい",en:"restroom",pos:"n."},{jp:"喫茶店",read:"きっさてん",en:"café",pos:"n."},
    ],
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
      {jp:"映画",read:"えいが",en:"movie",pos:"n."},{jp:"音楽",read:"おんがく",en:"music",pos:"n."},
      {jp:"雑誌",read:"ざっし",en:"magazine",pos:"n."},{jp:"スポーツ",read:"スポーツ",en:"sports",pos:"n."},
      {jp:"テレビ",read:"テレビ",en:"TV",pos:"n."},{jp:"お酒",read:"おさけ",en:"sake / alcohol",pos:"n."},
      {jp:"お茶",read:"おちゃ",en:"tea",pos:"n."},{jp:"コーヒー",read:"コーヒー",en:"coffee",pos:"n."},
      {jp:"朝御飯",read:"あさごはん",en:"breakfast",pos:"n."},{jp:"昼御飯",read:"ひるごはん",en:"lunch",pos:"n."},
      {jp:"晩御飯",read:"ばんごはん",en:"dinner",pos:"n."},{jp:"水",read:"みず",en:"water",pos:"n."},
      {jp:"家",read:"いえ",en:"home / house",pos:"n."},{jp:"学校",read:"がっこう",en:"school",pos:"n."},
      {jp:"朝",read:"あさ",en:"morning",pos:"n."},{jp:"明日",read:"あした",en:"tomorrow",pos:"n."},
      {jp:"今日",read:"きょう",en:"today",pos:"n."},{jp:"週末",read:"しゅうまつ",en:"weekend",pos:"n."},
      {jp:"毎日",read:"まいにち",en:"every day",pos:"adv."},
      {jp:"行く",read:"いく",en:"to go",pos:"u-v."},{jp:"帰る",read:"かえる",en:"to go back",pos:"u-v."},
      {jp:"聞く",read:"きく",en:"to listen / ask",pos:"u-v."},{jp:"飲む",read:"のむ",en:"to drink",pos:"u-v."},
      {jp:"話す",read:"はなす",en:"to speak",pos:"u-v."},{jp:"読む",read:"よむ",en:"to read",pos:"u-v."},
      {jp:"起きる",read:"おきる",en:"to get up",pos:"ru-v."},{jp:"食べる",read:"たべる",en:"to eat",pos:"ru-v."},
      {jp:"寝る",read:"ねる",en:"to sleep",pos:"ru-v."},{jp:"見る",read:"みる",en:"to see",pos:"ru-v."},
      {jp:"来る",read:"くる",en:"to come",pos:"irr-v."},{jp:"する",read:"する",en:"to do",pos:"irr-v."},
      {jp:"よく",read:"よく",en:"often",pos:"adv."},{jp:"ときどき",read:"ときどき",en:"sometimes",pos:"adv."},
      {jp:"たいてい",read:"たいてい",en:"usually",pos:"adv."},{jp:"あまり",read:"あまり",en:"not much",pos:"adv."},
      {jp:"全然",read:"ぜんぜん",en:"not at all",pos:"adv."},
    ],
    extraVocab:[
      {jp:"デート",read:"デート",en:"date",pos:"n."},{jp:"テニス",read:"テニス",en:"tennis",pos:"n."},
      {jp:"ビデオ",read:"ビデオ",en:"video",pos:"n."},{jp:"ハンバーガー",read:"ハンバーガー",en:"hamburger",pos:"n."},
    ],
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
      {jp:"アルバイト",read:"アルバイト",en:"part-time job",pos:"n."},{jp:"買い物",read:"かいもの",en:"shopping",pos:"n."},
      {jp:"犬",read:"いぬ",en:"dog",pos:"n."},{jp:"お土産",read:"おみやげ",en:"souvenir",pos:"n."},
      {jp:"子供",read:"こども",en:"child",pos:"n."},{jp:"ご飯",read:"ごはん",en:"rice / meal",pos:"n."},
      {jp:"写真",read:"しゃしん",en:"photo",pos:"n."},{jp:"机",read:"つくえ",en:"desk",pos:"n."},
      {jp:"手紙",read:"てがみ",en:"letter",pos:"n."},{jp:"猫",read:"ねこ",en:"cat",pos:"n."},
      {jp:"パン",read:"パン",en:"bread",pos:"n."},{jp:"人",read:"ひと",en:"person",pos:"n."},
      {jp:"公園",read:"こうえん",en:"park",pos:"n."},{jp:"病院",read:"びょういん",en:"hospital",pos:"n."},
      {jp:"本屋",read:"ほんや",en:"bookstore",pos:"n."},{jp:"町",read:"まち",en:"town / city",pos:"n."},
      {jp:"昨日",read:"きのう",en:"yesterday",pos:"n."},{jp:"先週",read:"せんしゅう",en:"last week",pos:"n."},
      {jp:"月曜日",read:"げつようび",en:"Monday",pos:"n."},{jp:"火曜日",read:"かようび",en:"Tuesday",pos:"n."},
      {jp:"水曜日",read:"すいようび",en:"Wednesday",pos:"n."},{jp:"木曜日",read:"もくようび",en:"Thursday",pos:"n."},
      {jp:"金曜日",read:"きんようび",en:"Friday",pos:"n."},
      {jp:"会う",read:"あう",en:"to meet",pos:"u-v."},{jp:"ある",read:"ある",en:"there is (things)",pos:"u-v."},
      {jp:"買う",read:"かう",en:"to buy",pos:"u-v."},{jp:"書く",read:"かく",en:"to write",pos:"u-v."},
      {jp:"待つ",read:"まつ",en:"to wait",pos:"u-v."},{jp:"わかる",read:"わかる",en:"to understand",pos:"u-v."},
      {jp:"いる",read:"いる",en:"there is (people/animals)",pos:"ru-v."},
      {jp:"右",read:"みぎ",en:"right",pos:"n."},{jp:"左",read:"ひだり",en:"left",pos:"n."},
      {jp:"前",read:"まえ",en:"front",pos:"n."},{jp:"後ろ",read:"うしろ",en:"back / behind",pos:"n."},
      {jp:"中",read:"なか",en:"inside",pos:"n."},{jp:"上",read:"うえ",en:"on / above",pos:"n."},
      {jp:"下",read:"した",en:"under / below",pos:"n."},{jp:"隣",read:"となり",en:"next to",pos:"n."},
      {jp:"間",read:"あいだ",en:"between",pos:"n."},
    ],
    extraVocab:[
      {jp:"バス停",read:"バスてい",en:"bus stop",pos:"n."},{jp:"ホテル",read:"ホテル",en:"hotel",pos:"n."},
      {jp:"デパート",read:"デパート",en:"department store",pos:"n."},{jp:"スーパー",read:"スーパー",en:"supermarket",pos:"n."},
    ],
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
      {jp:"海",read:"うみ",en:"sea",pos:"n."},{jp:"切手",read:"きって",en:"postal stamp",pos:"n."},
      {jp:"切符",read:"きっぷ",en:"ticket",pos:"n."},{jp:"宿題",read:"しゅくだい",en:"homework",pos:"n."},
      {jp:"食べ物",read:"たべもの",en:"food",pos:"n."},{jp:"誕生日",read:"たんじょうび",en:"birthday",pos:"n."},
      {jp:"テスト",read:"テスト",en:"test",pos:"n."},{jp:"天気",read:"てんき",en:"weather",pos:"n."},
      {jp:"飲み物",read:"のみもの",en:"drink",pos:"n."},{jp:"飛行機",read:"ひこうき",en:"airplane",pos:"n."},
      {jp:"部屋",read:"へや",en:"room",pos:"n."},{jp:"休み",read:"やすみ",en:"holiday / rest",pos:"n."},
      {jp:"旅行",read:"りょこう",en:"travel",pos:"n."},
      {jp:"新しい",read:"あたらしい",en:"new",pos:"い-adj."},{jp:"暑い",read:"あつい",en:"hot (weather)",pos:"い-adj."},
      {jp:"忙しい",read:"いそがしい",en:"busy",pos:"い-adj."},{jp:"大きい",read:"おおきい",en:"large",pos:"い-adj."},
      {jp:"面白い",read:"おもしろい",en:"interesting",pos:"い-adj."},{jp:"怖い",read:"こわい",en:"frightening",pos:"い-adj."},
      {jp:"寒い",read:"さむい",en:"cold",pos:"い-adj."},{jp:"楽しい",read:"たのしい",en:"fun",pos:"い-adj."},
      {jp:"小さい",read:"ちいさい",en:"small",pos:"い-adj."},{jp:"古い",read:"ふるい",en:"old",pos:"い-adj."},
      {jp:"難しい",read:"むずかしい",en:"difficult",pos:"い-adj."},{jp:"安い",read:"やすい",en:"cheap",pos:"い-adj."},
      {jp:"綺麗",read:"きれい",en:"beautiful / clean",pos:"な-adj."},{jp:"元気",read:"げんき",en:"healthy / fine",pos:"な-adj."},
      {jp:"静か",read:"しずか",en:"quiet",pos:"な-adj."},{jp:"好き",read:"すき",en:"to like",pos:"な-adj."},
      {jp:"嫌い",read:"きらい",en:"to dislike",pos:"な-adj."},{jp:"暇",read:"ひま",en:"free / not busy",pos:"な-adj."},
      {jp:"賑やか",read:"にぎやか",en:"lively",pos:"な-adj."},
      {jp:"泳ぐ",read:"およぐ",en:"to swim",pos:"u-v."},{jp:"乗る",read:"のる",en:"to ride",pos:"u-v."},
      {jp:"出かける",read:"でかける",en:"to go out",pos:"ru-v."},
      {jp:"一緒に",read:"いっしょに",en:"together",pos:"adv."},{jp:"とても",read:"とても",en:"very",pos:"adv."},
      {jp:"大丈夫",read:"だいじょうぶ",en:"it's okay",pos:"な-adj."},
    ],
    extraVocab:[
      {jp:"バス",read:"バス",en:"bus",pos:"n."},{jp:"僕",read:"ぼく",en:"I (men's speech)",pos:"n."},
      {jp:"サーフィン",read:"サーフィン",en:"surfing",pos:"n."},{jp:"優しい",read:"やさしい",en:"kind",pos:"い-adj."},
    ],
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
      {jp:"お金",read:"おかね",en:"money",pos:"n."},{jp:"お風呂",read:"おふろ",en:"bath",pos:"n."},
      {jp:"漢字",read:"かんじ",en:"kanji",pos:"n."},{jp:"教科書",read:"きょうかしょ",en:"textbook",pos:"n."},
      {jp:"今週",read:"こんしゅう",en:"this week",pos:"n."},{jp:"次",read:"つぎ",en:"next",pos:"n."},
      {jp:"テレビゲーム",read:"テレビゲーム",en:"video game",pos:"n."},{jp:"電気",read:"でんき",en:"electricity / light",pos:"n."},
      {jp:"電車",read:"でんしゃ",en:"train",pos:"n."},{jp:"荷物",read:"にもつ",en:"baggage",pos:"n."},
      {jp:"窓",read:"まど",en:"window",pos:"n."},{jp:"夜",read:"よる",en:"night",pos:"n."},
      {jp:"来週",read:"らいしゅう",en:"next week",pos:"n."},{jp:"来年",read:"らいねん",en:"next year",pos:"n."},
      {jp:"大変",read:"たいへん",en:"tough / hard",pos:"な-adj."},
      {jp:"遊ぶ",read:"あそぶ",en:"to play",pos:"u-v."},{jp:"急ぐ",read:"いそぐ",en:"to hurry",pos:"u-v."},
      {jp:"返す",read:"かえす",en:"to return (thing)",pos:"u-v."},{jp:"消す",read:"けす",en:"to turn off / erase",pos:"u-v."},
      {jp:"座る",read:"すわる",en:"to sit down",pos:"u-v."},{jp:"立つ",read:"たつ",en:"to stand up",pos:"u-v."},
      {jp:"使う",read:"つかう",en:"to use",pos:"u-v."},{jp:"手伝う",read:"てつだう",en:"to help",pos:"u-v."},
      {jp:"入る",read:"はいる",en:"to enter",pos:"u-v."},{jp:"持つ",read:"もつ",en:"to carry / hold",pos:"u-v."},
      {jp:"休む",read:"やすむ",en:"to rest / be absent",pos:"u-v."},
      {jp:"開ける",read:"あける",en:"to open",pos:"ru-v."},{jp:"教える",read:"おしえる",en:"to teach / tell",pos:"ru-v."},
      {jp:"降りる",read:"おりる",en:"to get off",pos:"ru-v."},{jp:"借りる",read:"かりる",en:"to borrow",pos:"ru-v."},
      {jp:"閉める",read:"しめる",en:"to close",pos:"ru-v."},{jp:"つける",read:"つける",en:"to turn on",pos:"ru-v."},
      {jp:"忘れる",read:"わすれる",en:"to forget",pos:"ru-v."},
      {jp:"後で",read:"あとで",en:"later on",pos:"adv."},{jp:"すぐ",read:"すぐ",en:"right away",pos:"adv."},
      {jp:"ゆっくり",read:"ゆっくり",en:"slowly",pos:"adv."},
    ],
    extraVocab:[
      {jp:"おばあさん",read:"おばあさん",en:"grandmother",pos:"n."},{jp:"ページ",read:"ページ",en:"page",pos:"n."},
      {jp:"市民病院",read:"しみんびょういん",en:"municipal hospital",pos:"n."},
    ],
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
      {jp:"子供",read:"こども",en:"child",pos:"n."},{jp:"女の子",read:"おんなのこ",en:"girl",pos:"n."},
      {jp:"男の子",read:"おとこのこ",en:"boy",pos:"n."},{jp:"彼女",read:"かのじょ",en:"girlfriend / she",pos:"n."},
      {jp:"彼",read:"かれ",en:"boyfriend / he",pos:"n."},{jp:"家族",read:"かぞく",en:"family",pos:"n."},
      {jp:"兄弟",read:"きょうだい",en:"siblings",pos:"n."},{jp:"眼鏡",read:"めがね",en:"glasses",pos:"n."},
      {jp:"背",read:"せ",en:"height / back",pos:"n."},{jp:"髪",read:"かみ",en:"hair",pos:"n."},
      {jp:"着物",read:"きもの",en:"kimono",pos:"n."},{jp:"スーツ",read:"スーツ",en:"suit",pos:"n."},
      {jp:"似合う",read:"にあう",en:"to suit / look good on",pos:"u-v."},
      {jp:"着る",read:"きる",en:"to wear (upper body)",pos:"ru-v."},{jp:"はく",read:"はく",en:"to wear (lower body)",pos:"u-v."},
      {jp:"かぶる",read:"かぶる",en:"to wear (head)",pos:"u-v."},{jp:"かける",read:"かける",en:"to wear (glasses)",pos:"ru-v."},
      {jp:"太る",read:"ふとる",en:"to be fat",pos:"u-v."},{jp:"痩せる",read:"やせる",en:"to be thin",pos:"ru-v."},
      {jp:"長い",read:"ながい",en:"long",pos:"い-adj."},{jp:"短い",read:"みじかい",en:"short (length)",pos:"い-adj."},
      {jp:"若い",read:"わかい",en:"young",pos:"い-adj."},
    ],
    extraVocab:[
      {jp:"ひとりっこ",read:"ひとりっこ",en:"only child",pos:"n."},{jp:"一人",read:"ひとり",en:"one person",pos:"n."},
      {jp:"二人",read:"ふたり",en:"two people",pos:"n."},
    ],
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
      {jp:"アパート",read:"アパート",en:"apartment",pos:"n."},{jp:"お菓子",read:"おかし",en:"sweets",pos:"n."},
      {jp:"お寺",read:"おてら",en:"temple",pos:"n."},{jp:"神社",read:"じんじゃ",en:"shrine",pos:"n."},
      {jp:"特産品",read:"とくさんひん",en:"local specialty",pos:"n."},{jp:"場所",read:"ばしょ",en:"place",pos:"n."},
      {jp:"物",read:"もの",en:"thing",pos:"n."},{jp:"お土産",read:"おみやげ",en:"souvenir",pos:"n."},
      {jp:"春",read:"はる",en:"spring",pos:"n."},{jp:"夏",read:"なつ",en:"summer",pos:"n."},
      {jp:"秋",read:"あき",en:"fall / autumn",pos:"n."},{jp:"冬",read:"ふゆ",en:"winter",pos:"n."},
      {jp:"有名",read:"ゆうめい",en:"famous",pos:"な-adj."},{jp:"大切",read:"たいせつ",en:"important / precious",pos:"な-adj."},
      {jp:"贈る",read:"おくる",en:"to give (a gift)",pos:"u-v."},{jp:"もらう",read:"もらう",en:"to receive",pos:"u-v."},
      {jp:"あげる",read:"あげる",en:"to give",pos:"ru-v."},{jp:"くれる",read:"くれる",en:"to give (to me)",pos:"ru-v."},
    ],
    extraVocab:[
      {jp:"どうぞ",read:"どうぞ",en:"please (go ahead)",pos:"exp."},{jp:"どうも",read:"どうも",en:"thank you / indeed",pos:"exp."},
    ],
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
      {jp:"歌舞伎",read:"かぶき",en:"kabuki",pos:"n."},{jp:"着物",read:"きもの",en:"kimono",pos:"n."},
      {jp:"経験",read:"けいけん",en:"experience",pos:"n."},{jp:"外国",read:"がいこく",en:"foreign country",pos:"n."},
      {jp:"比較",read:"ひかく",en:"comparison",pos:"n."},{jp:"乗り物",read:"のりもの",en:"vehicle",pos:"n."},
      {jp:"山",read:"やま",en:"mountain",pos:"n."},{jp:"海",read:"うみ",en:"sea",pos:"n."},
      {jp:"川",read:"かわ",en:"river",pos:"n."},{jp:"花",read:"はな",en:"flower",pos:"n."},
      {jp:"有名",read:"ゆうめい",en:"famous",pos:"な-adj."},{jp:"便利",read:"べんり",en:"convenient",pos:"な-adj."},
      {jp:"危ない",read:"あぶない",en:"dangerous",pos:"い-adj."},{jp:"重い",read:"おもい",en:"heavy",pos:"い-adj."},
      {jp:"軽い",read:"かるい",en:"light (weight)",pos:"い-adj."},
    ],
    extraVocab:[
      {jp:"カラオケ",read:"カラオケ",en:"karaoke",pos:"n."},{jp:"スキー",read:"スキー",en:"skiing",pos:"n."},
      {jp:"マラソン",read:"マラソン",en:"marathon",pos:"n."},
    ],
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
      {jp:"計画",read:"けいかく",en:"plan",pos:"n."},{jp:"冬休み",read:"ふゆやすみ",en:"winter vacation",pos:"n."},
      {jp:"夏休み",read:"なつやすみ",en:"summer vacation",pos:"n."},{jp:"予定",read:"よてい",en:"schedule / plan",pos:"n."},
      {jp:"準備",read:"じゅんび",en:"preparation",pos:"n."},{jp:"空港",read:"くうこう",en:"airport",pos:"n."},
      {jp:"チケット",read:"チケット",en:"ticket",pos:"n."},{jp:"パスポート",read:"パスポート",en:"passport",pos:"n."},
      {jp:"練習する",read:"れんしゅうする",en:"to practice",pos:"irr-v."},{jp:"決める",read:"きめる",en:"to decide",pos:"ru-v."},
      {jp:"楽しむ",read:"たのしむ",en:"to enjoy",pos:"u-v."},{jp:"始まる",read:"はじまる",en:"to begin",pos:"u-v."},
      {jp:"終わる",read:"おわる",en:"to end / finish",pos:"u-v."},
      {jp:"もうすぐ",read:"もうすぐ",en:"soon",pos:"adv."},{jp:"もう",read:"もう",en:"already",pos:"adv."},
      {jp:"まだ",read:"まだ",en:"still / not yet",pos:"adv."},
    ],
    extraVocab:[
      {jp:"ホームステイ",read:"ホームステイ",en:"home stay",pos:"n."},{jp:"留学する",read:"りゅうがくする",en:"to study abroad",pos:"irr-v."},
    ],
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
      {jp:"道",read:"みち",en:"road / way",pos:"n."},{jp:"角",read:"かど",en:"corner",pos:"n."},
      {jp:"交差点",read:"こうさてん",en:"intersection",pos:"n."},{jp:"信号",read:"しんごう",en:"traffic light",pos:"n."},
      {jp:"橋",read:"はし",en:"bridge",pos:"n."},{jp:"駅",read:"えき",en:"station",pos:"n."},
      {jp:"地図",read:"ちず",en:"map",pos:"n."},{jp:"方向",read:"ほうこう",en:"direction",pos:"n."},
      {jp:"曲がる",read:"まがる",en:"to turn",pos:"u-v."},{jp:"渡る",read:"わたる",en:"to cross",pos:"u-v."},
      {jp:"通る",read:"とおる",en:"to pass through",pos:"u-v."},{jp:"続く",read:"つづく",en:"to continue",pos:"u-v."},
      {jp:"近い",read:"ちかい",en:"near",pos:"い-adj."},{jp:"遠い",read:"とおい",en:"far",pos:"い-adj."},
    ],
    extraVocab:[
      {jp:"まっすぐ",read:"まっすぐ",en:"straight",pos:"adv."},{jp:"ここ",read:"ここ",en:"here",pos:"n."},
      {jp:"そこ",read:"そこ",en:"there",pos:"n."},{jp:"あそこ",read:"あそこ",en:"over there",pos:"n."},
    ],
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
      {jp:"アニメ",read:"アニメ",en:"anime",pos:"n."},{jp:"マンガ",read:"マンガ",en:"manga",pos:"n."},
      {jp:"ゲーム",read:"ゲーム",en:"game",pos:"n."},{jp:"歌手",read:"かしゅ",en:"singer",pos:"n."},
      {jp:"人気",read:"にんき",en:"popularity",pos:"n."},{jp:"文化",read:"ぶんか",en:"culture",pos:"n."},
      {jp:"言葉",read:"ことば",en:"word / language",pos:"n."},{jp:"意味",read:"いみ",en:"meaning",pos:"n."},
      {jp:"説明",read:"せつめい",en:"explanation",pos:"n."},{jp:"発音",read:"はつおん",en:"pronunciation",pos:"n."},
      {jp:"好む",read:"このむ",en:"to prefer",pos:"u-v."},{jp:"流行る",read:"はやる",en:"to be popular / trendy",pos:"u-v."},
      {jp:"紹介する",read:"しょうかいする",en:"to introduce",pos:"irr-v."},
      {jp:"人気がある",read:"にんきがある",en:"to be popular",pos:"exp."},{jp:"世界中",read:"せかいじゅう",en:"throughout the world",pos:"n."},
    ],
    extraVocab:[
      {jp:"コスプレ",read:"コスプレ",en:"cosplay",pos:"n."},{jp:"声優",read:"せいゆう",en:"voice actor",pos:"n."},
      {jp:"サブカルチャー",read:"サブカルチャー",en:"subculture",pos:"n."},
    ],
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
    {icon:"🌐",title:"Marshall Yin — Genki Vocab",desc:"Per-lesson vocab lists matching Genki I 3rd edition",url:"https://marshallyin.com/genki-1-vocabulary/"},
    {icon:"🗣",title:"Genki Conjugation Drill",desc:"Practice verb and adjective conjugation interactively",url:"https://drills.vajeon.org/"},
  ],
};

// ─── STATE ────────────────────────────────────────────────────────────────────
let state={
  lessonsDone:{},selectedLesson:0,
  quizLessonIdx:0,quizQIdx:0,quizScore:0,quizAnswered:false,
  fcFilter:"All",fcIdx:0,fcFlipped:false,fcKnown:new Set(),
  kanjiLearned:new Set(),selectedKanjiIdx:null,kanjiJlptFilter:"All",
  journalEntries:[],selectedMood:"😊",
  studiedDays:new Set(),
  grammarDone:{},
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
  if(s.anki)state.anki=s.anki;
}catch(e){}

function save(){
  try{
    localStorage.setItem("jp-study-v2",JSON.stringify({
      lessonsDone:state.lessonsDone,fcKnown:[...state.fcKnown],
      kanjiLearned:[...state.kanjiLearned],journalEntries:state.journalEntries,
      studiedDays:[...state.studiedDays],grammarDone:state.grammarDone,anki:state.anki,
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
function todayKanjiIndices(){
  if(!KANJI_DATA.length)return[];
  const start=new Date(new Date().getFullYear(),0,0);
  const doy=Math.floor((new Date()-start)/86400000);
  const s=((doy-1)*5)%KANJI_DATA.length;
  return Array.from({length:5},(_,i)=>(s+i)%KANJI_DATA.length);
}
function fmtDate(d){return d.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});}
function todayKey(){const d=new Date();return`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function renderHome(){
  const total=FLASHCARDS.length,known=state.fcKnown.size,pct=total?Math.round(known/total*100):0;
  const lessons=Object.values(state.lessonsDone).filter(Boolean).length;
  document.getElementById("home-words").textContent=`${known}/${total}`;
  document.getElementById("home-lessons").textContent=`${lessons}/12`;
  document.getElementById("home-kanji-count").textContent=state.kanjiLearned.size;
  document.getElementById("home-progress-bar").style.width=pct+"%";
  document.getElementById("home-progress-label").textContent=`${known} of ${total} vocab words marked known`;
  document.getElementById("home-kanji-date").textContent=fmtDate(new Date());
  const strip=document.getElementById("home-kanji-preview");
  if(KANJI_DATA.length){
    strip.innerHTML=todayKanjiIndices().map(i=>{const k=KANJI_DATA[i];
      return`<div class="home-kanji-chip" onclick="nav('kanji')">${k.char}<div class="chip-read">${(k.kun!=="—"?k.kun:k.on).split("・")[0]}</div></div>`;
    }).join("");
  }else{strip.innerHTML=`<div style="font-family:'DM Sans',sans-serif;font-size:13px;color:var(--muted);">Loading kanji…</div>`;}
  document.getElementById("home-lessons-grid").innerHTML=LESSONS.map((l,i)=>`
    <div class="card lesson-overview-card ${state.lessonsDone[i]?"done":""}" onclick="selectLesson(${i});nav('lessons');">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div>
          <div style="font-family:'DM Sans',sans-serif;font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.09em;">Lesson ${l.num}</div>
          <div style="font-weight:700;font-size:14px;margin-top:2px;">${l.title}</div>
          <div style="font-family:'DM Sans',sans-serif;font-size:12px;color:var(--muted);font-style:italic;">${l.sub}</div>
          <div style="font-family:'DM Sans',sans-serif;font-size:11px;color:var(--pink4);margin-top:4px;">${l.vocab.length} words</div>
        </div>
        ${state.lessonsDone[i]?"<span style='font-size:20px;'>🌸</span>":""}
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
    ?`<div style="font-family:'DM Sans',sans-serif;font-size:12px;color:var(--muted);margin-bottom:10px;">Additional / supplementary vocabulary for this chapter</div>
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
          <div style="font-family:'DM Sans',sans-serif;font-size:11px;color:var(--muted);">${k.mean}</div>
          <span class="pill ${k.jlpt.toLowerCase()}" style="margin-top:6px;">${k.jlpt}</span>
        </div>`).join("")
      }</div>`
    :`<div style="font-family:'DM Sans',sans-serif;color:var(--muted);font-size:13px;padding:12px 0;">Kanji loading from sheet… go to the Kanji tab to study today's set.</div>`;

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
    :`<div style="font-family:'DM Sans',sans-serif;font-size:12px;color:var(--muted);">No examples available</div>`;
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
  state.kanjiLearned.has(ki)?state.kanjiLearned.delete(ki):state.kanjiLearned.add(ki);
  save();
  document.getElementById("kanji-learn-btn").textContent=state.kanjiLearned.has(ki)?"✅ Learned!":"Mark as Learned";
  renderKanji();
}

function renderKanjiBank(){
  const search=(document.getElementById("kanji-search")||{}).value?.toLowerCase()||"";
  const jlpt=state.kanjiJlptFilter;
  document.getElementById("kanji-jlpt-filters").innerHTML=["All","N5","N4","N3","N2"].map(f=>
    `<button class="chip ${jlpt===f?"active":""}" onclick="setKanjiFilter('${f}')">${f}</button>`).join("");
  const filtered=KANJI_DATA.filter(k=>{
    const mj=jlpt==="All"||k.jlpt===jlpt;
    const ms=!search||k.char.includes(search)||k.on.toLowerCase().includes(search)||k.kun.toLowerCase().includes(search)||k.mean.toLowerCase().includes(search);
    return mj&&ms;
  });
  document.getElementById("kanji-bank-grid").innerHTML=filtered.map(k=>{
    const ki=KANJI_DATA.indexOf(k),learned=state.kanjiLearned.has(ki);
    return`<div class="kanji-grid-item ${learned?"learned":""}" onclick="selectKanji(${ki})" title="${k.on} / ${k.kun} — ${k.mean}">
      <div class="kanji-grid-char">${k.char}</div>
      <div class="kanji-grid-read">${k.on.split("・")[0]}</div>
      <div class="kanji-grid-mean">${k.mean.split(",")[0]}</div>
    </div>`;
  }).join("");
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
function fcKnow(){const c=filtered()[state.fcIdx];if(c)state.fcKnown.add(c.f);save();fcMove(1);}
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
  const mature=parseInt(a.mature)||0,today=parseInt(a.today)||241;
  const known=state.fcKnown.size,totalFC=FLASHCARDS.length;
  const lessonsN=Object.values(state.lessonsDone).filter(Boolean).length;
  const studyRate=a.days&&31?Math.round(parseInt(a.days)/31*100):51;

  // Stat cards
  document.getElementById("stats-cards").innerHTML=[
    {icon:"📱",val:a.today||"241",label:"Cards Studied Today",sub:"Anki session"},
    {icon:"🧠",val:a.mature?a.mature+"%":"89%",label:"Mature Retention",sub:"cards ≥ 21 day interval"},
    {icon:"📅",val:a.days?`${a.days}/31`:"16/31",label:"Days Studied",sub:"this month (51%)"},
  ].map(s=>`<div class="card stat-card"><div class="stat-icon">${s.icon}</div><div class="stat-val">${s.val}</div><div class="stat-label">${s.label}</div><div style="font-family:'DM Sans',sans-serif;font-size:11px;color:var(--muted);margin-top:2px;">${s.sub}</div></div>`).join("");

  // Progress bars
  document.getElementById("stats-bars-inner").innerHTML=[
    {label:"Anki deck (mature)",pct:Math.round((totalCards-newCards)/totalCards*100),col:"pink"},
    {label:"App vocab known",pct:totalFC?Math.round(known/totalFC*100):0,col:"pink"},
    {label:"Genki I lessons",pct:Math.round(lessonsN/12*100),col:"green"},
    {label:"Study consistency",pct:studyRate,col:"green"},
    {label:"Again rate (lower=better)",pct:Math.round(parseFloat(a.again)||10.79),col:"pink"},
  ].map(b=>`
    <div class="stat-bar-row">
      <div class="stat-bar-label">${b.label}</div>
      <div class="progress-wrap-${b.col==="green"?"green":"sm"}" style="flex:1;">
        <div class="progress-bar-${b.col==="green"?"green":"sm"}" style="width:${b.pct}%"></div>
      </div>
      <div class="stat-bar-pct">${b.pct}%</div>
    </div>`).join("");

  // Lesson vocab breakdown
  document.getElementById("stats-lesson-breakdown").innerHTML=LESSONS.map((l,i)=>{
    const lCards=FLASHCARDS.filter(c=>c.t===`L${l.num}`);
    const lKnown=lCards.filter(c=>state.fcKnown.has(c.f)).length;
    const pct=lCards.length?Math.round(lKnown/lCards.length*100):0;
    return`<div class="lesson-stat-row">
      <div class="lesson-stat-name ${state.lessonsDone[i]?"" :""}">L${l.num}: ${l.title}</div>
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
  const streak=calcStreak(year,month,now.getDate());
  document.getElementById("streak-label").textContent=`🔥 Current streak: ${streak} day${streak===1?"":"s"}`;
}

function toggleStudyDay(key,el){
  if(state.studiedDays.has(key)){state.studiedDays.delete(key);el.classList.remove("studied");}
  else{state.studiedDays.add(key);el.classList.add("studied");}
  save();
  const now=new Date();
  document.getElementById("streak-label").textContent=`🔥 Current streak: ${calcStreak(now.getFullYear(),now.getMonth(),now.getDate())} days`;
}

function calcStreak(year,month,today){
  let streak=0,d=today;
  while(d>=1){
    if(state.studiedDays.has(`${year}-${month}-${d}`))streak++;else break;
    d--;
  }
  return streak;
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
    <div class="card entry-card">
      <div class="entry-header"><span class="entry-date">${e.date}</span><span style="font-size:22px;">${e.mood}</span></div>
      <div class="entry-text">${e.text.replace(/\n/g,"<br>")}</div>
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
  const introEl=document.getElementById("grammar-intro");
  if(!pointsEl||!introEl)return;
  if(!data){
    introEl.innerHTML=`<div class="grammar-intro-text">📖 In-depth grammar with practice questions is available for Lessons 1–6 so far. Lesson ${grammarLesson}'s detailed write-up is coming soon — for now, see the <b>Grammar Summary</b> tab above for this lesson's key points.</div>`;
    pointsEl.innerHTML="";
    return;
  }
  introEl.innerHTML=`
    <div style="font-weight:700;font-size:15px;margin-bottom:8px;">Lesson ${grammarLesson} — Overview</div>
    <div class="grammar-intro-text">${data.intro}</div>`;

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
  state.studiedDays.add(todayKey());
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
fetchKanji();

// ── Expose cross-file functions globally (so content-loader.js can call them) ──
window.mergeCustomDecks = mergeCustomDecks;
window.renderFCChips = renderFCChips;
window.renderFC = renderFC;
window.renderLessonDetail = renderLessonDetail;
