/* ══════════════════════════════════════════
   日本語 Study App — app.js
   Data sourced from JLPT N5/N4 frequency
   (mirrors Jo-Mako kanji ordering)
══════════════════════════════════════════ */

// ─── KANJI DATA (100 kanji, JLPT N5→N4, frequency-ordered) ──────────────────
// Fields: char, on, kun, mean, jlpt, strokes, examples[[word, reading, en]]
const KANJI_DATA = [
  // ── N5 ──
  { char:"日", on:"ニチ・ジツ", kun:"ひ・か", mean:"sun, day", jlpt:"N5", strokes:4,
    examples:[["今日","きょう","today"],["日本","にほん","Japan"],["毎日","まいにち","every day"]] },
  { char:"本", on:"ホン", kun:"もと", mean:"book, origin", jlpt:"N5", strokes:5,
    examples:[["日本語","にほんご","Japanese"],["本","ほん","book"],["本当","ほんとう","truth"]] },
  { char:"人", on:"ジン・ニン", kun:"ひと", mean:"person", jlpt:"N5", strokes:2,
    examples:[["日本人","にほんじん","Japanese person"],["友人","ゆうじん","friend"],["人","ひと","person"]] },
  { char:"山", on:"サン", kun:"やま", mean:"mountain", jlpt:"N5", strokes:3,
    examples:[["富士山","ふじさん","Mt. Fuji"],["山","やま","mountain"],["山田","やまだ","Yamada (surname)"]] },
  { char:"川", on:"セン", kun:"かわ", mean:"river", jlpt:"N5", strokes:3,
    examples:[["川","かわ","river"],["川口","かわぐち","Kawaguchi"],["小川","おがわ","stream"]] },
  { char:"月", on:"ゲツ・ガツ", kun:"つき", mean:"moon, month", jlpt:"N5", strokes:4,
    examples:[["月曜日","げつようび","Monday"],["月","つき","moon"],["一月","いちがつ","January"]] },
  { char:"火", on:"カ", kun:"ひ・ほ", mean:"fire", jlpt:"N5", strokes:4,
    examples:[["火曜日","かようび","Tuesday"],["火","ひ","fire"],["花火","はなび","fireworks"]] },
  { char:"水", on:"スイ", kun:"みず", mean:"water", jlpt:"N5", strokes:4,
    examples:[["水曜日","すいようび","Wednesday"],["水","みず","water"],["水泳","すいえい","swimming"]] },
  { char:"木", on:"モク・ボク", kun:"き・こ", mean:"tree, wood", jlpt:"N5", strokes:4,
    examples:[["木曜日","もくようび","Thursday"],["木","き","tree"],["木村","きむら","Kimura"]] },
  { char:"金", on:"キン・コン", kun:"かね・かな", mean:"gold, money", jlpt:"N5", strokes:8,
    examples:[["金曜日","きんようび","Friday"],["お金","おかね","money"],["金色","きんいろ","gold color"]] },
  { char:"土", on:"ド・ト", kun:"つち", mean:"earth, soil", jlpt:"N5", strokes:3,
    examples:[["土曜日","どようび","Saturday"],["土","つち","soil"],["土地","とち","land"]] },
  { char:"口", on:"コウ・ク", kun:"くち", mean:"mouth, entrance", jlpt:"N5", strokes:3,
    examples:[["口","くち","mouth"],["入口","いりぐち","entrance"],["出口","でぐち","exit"]] },
  { char:"目", on:"モク・ボク", kun:"め・ま", mean:"eye", jlpt:"N5", strokes:5,
    examples:[["目","め","eye"],["目的","もくてき","purpose"],["注目","ちゅうもく","attention"]] },
  { char:"耳", on:"ジ", kun:"みみ", mean:"ear", jlpt:"N5", strokes:6,
    examples:[["耳","みみ","ear"],["耳鼻科","じびか","ENT clinic"]] },
  { char:"手", on:"シュ", kun:"て・た", mean:"hand", jlpt:"N5", strokes:4,
    examples:[["手","て","hand"],["手紙","てがみ","letter"],["上手","じょうず","skillful"]] },
  { char:"足", on:"ソク", kun:"あし・た", mean:"foot, leg, enough", jlpt:"N5", strokes:7,
    examples:[["足","あし","foot/leg"],["足りる","たりる","to be enough"],["遠足","えんそく","excursion"]] },
  { char:"力", on:"リョク・リキ", kun:"ちから", mean:"power, force", jlpt:"N5", strokes:2,
    examples:[["力","ちから","power"],["努力","どりょく","effort"],["電力","でんりょく","electric power"]] },
  { char:"上", on:"ジョウ・ショウ", kun:"うえ・かみ・あ", mean:"above, up", jlpt:"N5", strokes:3,
    examples:[["上","うえ","above"],["上手","じょうず","skillful"],["上げる","あげる","to raise"]] },
  { char:"下", on:"カ・ゲ", kun:"した・しも・お", mean:"below, down", jlpt:"N5", strokes:3,
    examples:[["下","した","below"],["下手","へた","unskillful"],["地下","ちか","underground"]] },
  { char:"中", on:"チュウ", kun:"なか", mean:"middle, inside", jlpt:"N5", strokes:4,
    examples:[["中","なか","inside"],["中国","ちゅうごく","China"],["中学校","ちゅうがっこう","middle school"]] },
  { char:"大", on:"ダイ・タイ", kun:"おお", mean:"big, large", jlpt:"N5", strokes:3,
    examples:[["大学","だいがく","university"],["大切","たいせつ","important"],["大きい","おおきい","big"]] },
  { char:"小", on:"ショウ", kun:"ちい・こ・お", mean:"small, little", jlpt:"N5", strokes:3,
    examples:[["小さい","ちいさい","small"],["小学校","しょうがっこう","elementary school"],["小説","しょうせつ","novel"]] },
  { char:"子", on:"シ・ス", kun:"こ", mean:"child", jlpt:"N5", strokes:3,
    examples:[["子供","こども","child"],["女子","じょし","girl"],["男子","だんし","boy"]] },
  { char:"女", on:"ジョ・ニョ", kun:"おんな・め", mean:"woman, female", jlpt:"N5", strokes:3,
    examples:[["女","おんな","woman"],["女性","じょせい","female"],["女子","じょし","girl"]] },
  { char:"男", on:"ダン・ナン", kun:"おとこ", mean:"man, male", jlpt:"N5", strokes:7,
    examples:[["男","おとこ","man"],["男性","だんせい","male"],["男子","だんし","boy"]] },
  { char:"学", on:"ガク", kun:"まな", mean:"study, learning", jlpt:"N5", strokes:8,
    examples:[["学校","がっこう","school"],["大学","だいがく","university"],["学生","がくせい","student"]] },
  { char:"校", on:"コウ", kun:"", mean:"school", jlpt:"N5", strokes:10,
    examples:[["学校","がっこう","school"],["高校","こうこう","high school"],["校長","こうちょう","principal"]] },
  { char:"先", on:"セン", kun:"さき", mean:"ahead, previous", jlpt:"N5", strokes:6,
    examples:[["先生","せんせい","teacher"],["先週","せんしゅう","last week"],["先","さき","ahead"]] },
  { char:"生", on:"セイ・ショウ", kun:"い・う・お・は・なま", mean:"life, birth", jlpt:"N5", strokes:5,
    examples:[["学生","がくせい","student"],["先生","せんせい","teacher"],["誕生日","たんじょうび","birthday"]] },
  { char:"年", on:"ネン", kun:"とし", mean:"year", jlpt:"N5", strokes:6,
    examples:[["今年","ことし","this year"],["毎年","まいとし","every year"],["年齢","ねんれい","age"]] },
  // N5 continued
  { char:"国", on:"コク・ゴク", kun:"くに", mean:"country, nation", jlpt:"N5", strokes:8,
    examples:[["日本国","にほんこく","Japan"],["国語","こくご","national language"],["外国","がいこく","foreign country"]] },
  { char:"語", on:"ゴ", kun:"かた", mean:"language, word", jlpt:"N5", strokes:14,
    examples:[["日本語","にほんご","Japanese"],["英語","えいご","English"],["語る","かたる","to talk"]] },
  { char:"食", on:"ショク", kun:"た・く", mean:"eat, food", jlpt:"N5", strokes:9,
    examples:[["食べる","たべる","to eat"],["食堂","しょくどう","cafeteria"],["食事","しょくじ","meal"]] },
  { char:"飲", on:"イン", kun:"の", mean:"drink", jlpt:"N5", strokes:12,
    examples:[["飲む","のむ","to drink"],["飲み物","のみもの","drink"],["飲食","いんしょく","food and drink"]] },
  { char:"見", on:"ケン", kun:"み", mean:"see, look", jlpt:"N5", strokes:7,
    examples:[["見る","みる","to see"],["見物","けんぶつ","sightseeing"],["意見","いけん","opinion"]] },
  { char:"聞", on:"ブン・モン", kun:"き・き", mean:"hear, ask", jlpt:"N5", strokes:14,
    examples:[["聞く","きく","to listen/ask"],["新聞","しんぶん","newspaper"],["聞こえる","きこえる","to be heard"]] },
  { char:"言", on:"ゲン・ゴン", kun:"い・こと", mean:"say, word", jlpt:"N5", strokes:7,
    examples:[["言う","いう","to say"],["言葉","ことば","word/language"],["方言","ほうげん","dialect"]] },
  { char:"読", on:"ドク・トク", kun:"よ", mean:"read", jlpt:"N5", strokes:14,
    examples:[["読む","よむ","to read"],["読書","どくしょ","reading"],["読者","どくしゃ","reader"]] },
  { char:"書", on:"ショ", kun:"か", mean:"write", jlpt:"N5", strokes:10,
    examples:[["書く","かく","to write"],["教科書","きょうかしょ","textbook"],["辞書","じしょ","dictionary"]] },
  { char:"買", on:"バイ", kun:"か", mean:"buy", jlpt:"N5", strokes:12,
    examples:[["買う","かう","to buy"],["買い物","かいもの","shopping"],["売買","ばいばい","buying and selling"]] },
  // ── N4 ──
  { char:"会", on:"カイ・エ", kun:"あ", mean:"meet, society", jlpt:"N4", strokes:6,
    examples:[["会う","あう","to meet"],["会社","かいしゃ","company"],["社会","しゃかい","society"]] },
  { char:"社", on:"シャ", kun:"やしろ", mean:"company, shrine", jlpt:"N4", strokes:7,
    examples:[["会社","かいしゃ","company"],["社会","しゃかい","society"],["社長","しゃちょう","company president"]] },
  { char:"電", on:"デン", kun:"", mean:"electricity", jlpt:"N4", strokes:13,
    examples:[["電話","でんわ","telephone"],["電車","でんしゃ","train"],["電気","でんき","electricity"]] },
  { char:"話", on:"ワ", kun:"はな・はなし", mean:"talk, story", jlpt:"N4", strokes:13,
    examples:[["話す","はなす","to speak"],["電話","でんわ","telephone"],["会話","かいわ","conversation"]] },
  { char:"来", on:"ライ", kun:"く・き・こ", mean:"come", jlpt:"N4", strokes:7,
    examples:[["来る","くる","to come"],["来週","らいしゅう","next week"],["来年","らいねん","next year"]] },
  { char:"行", on:"コウ・ギョウ", kun:"い・ゆ・おこな", mean:"go, conduct", jlpt:"N4", strokes:6,
    examples:[["行く","いく","to go"],["旅行","りょこう","travel"],["行動","こうどう","action"]] },
  { char:"帰", on:"キ", kun:"かえ", mean:"return home", jlpt:"N4", strokes:10,
    examples:[["帰る","かえる","to return home"],["帰国","きこく","returning to one's country"]] },
  { char:"出", on:"シュツ・スイ", kun:"で・だ", mean:"exit, appear", jlpt:"N4", strokes:5,
    examples:[["出る","でる","to exit"],["出口","でぐち","exit"],["出発","しゅっぱつ","departure"]] },
  { char:"入", on:"ニュウ", kun:"い・はい", mean:"enter", jlpt:"N4", strokes:2,
    examples:[["入る","はいる","to enter"],["入口","いりぐち","entrance"],["入学","にゅうがく","school enrollment"]] },
  { char:"時", on:"ジ", kun:"とき", mean:"time, hour", jlpt:"N4", strokes:10,
    examples:[["時間","じかん","time"],["何時","なんじ","what time"],["時計","とけい","clock"]] },
  { char:"間", on:"カン・ケン", kun:"あいだ・ま", mean:"between, interval", jlpt:"N4", strokes:12,
    examples:[["時間","じかん","time"],["間","あいだ","between"],["人間","にんげん","human being"]] },
  { char:"今", on:"コン・キン", kun:"いま", mean:"now, present", jlpt:"N4", strokes:4,
    examples:[["今","いま","now"],["今日","きょう","today"],["今週","こんしゅう","this week"]] },
  { char:"週", on:"シュウ", kun:"", mean:"week", jlpt:"N4", strokes:11,
    examples:[["今週","こんしゅう","this week"],["来週","らいしゅう","next week"],["先週","せんしゅう","last week"]] },
  { char:"友", on:"ユウ", kun:"とも", mean:"friend", jlpt:"N4", strokes:4,
    examples:[["友達","ともだち","friend"],["友人","ゆうじん","friend (formal)"],["親友","しんゆう","best friend"]] },
  { char:"好", on:"コウ", kun:"す・この", mean:"like, fond of", jlpt:"N4", strokes:6,
    examples:[["好き","すき","to like"],["好物","こうぶつ","favorite food"],["好む","このむ","to prefer"]] },
  { char:"新", on:"シン", kun:"あたら・あら・にい", mean:"new", jlpt:"N4", strokes:13,
    examples:[["新しい","あたらしい","new"],["新聞","しんぶん","newspaper"],["新幹線","しんかんせん","bullet train"]] },
  { char:"古", on:"コ", kun:"ふる・ひさ", mean:"old, ancient", jlpt:"N4", strokes:5,
    examples:[["古い","ふるい","old"],["古典","こてん","classic"],["中古","ちゅうこ","used/secondhand"]] },
  { char:"高", on:"コウ", kun:"たか", mean:"tall, expensive, high", jlpt:"N4", strokes:10,
    examples:[["高い","たかい","tall/expensive"],["高校","こうこう","high school"],["高速","こうそく","high speed"]] },
  { char:"安", on:"アン", kun:"やす・おだ", mean:"cheap, peaceful", jlpt:"N4", strokes:6,
    examples:[["安い","やすい","cheap"],["安心","あんしん","peace of mind"],["安全","あんぜん","safety"]] },
  { char:"長", on:"チョウ", kun:"なが", mean:"long, leader", jlpt:"N4", strokes:8,
    examples:[["長い","ながい","long"],["校長","こうちょう","principal"],["社長","しゃちょう","company president"]] },
  { char:"多", on:"タ", kun:"おお", mean:"many, much", jlpt:"N4", strokes:6,
    examples:[["多い","おおい","many"],["多分","たぶん","probably"],["多様","たよう","diverse"]] },
  { char:"少", on:"ショウ", kun:"すく・すこ", mean:"few, a little", jlpt:"N4", strokes:4,
    examples:[["少ない","すくない","few"],["少し","すこし","a little"],["少年","しょうねん","boy/youth"]] },
  { char:"毎", on:"マイ", kun:"", mean:"every, each", jlpt:"N4", strokes:6,
    examples:[["毎日","まいにち","every day"],["毎週","まいしゅう","every week"],["毎年","まいとし","every year"]] },
  { char:"半", on:"ハン", kun:"なか", mean:"half", jlpt:"N4", strokes:5,
    examples:[["半分","はんぶん","half"],["一時半","いちじはん","1:30"],["半年","はんとし","half a year"]] },
  { char:"分", on:"ブン・フン・ブ", kun:"わ", mean:"minute, understand, part", jlpt:"N4", strokes:4,
    examples:[["五分","ごふん","5 minutes"],["自分","じぶん","oneself"],["分かる","わかる","to understand"]] },
  { char:"何", on:"カ", kun:"なに・なん", mean:"what, how many", jlpt:"N4", strokes:7,
    examples:[["何","なに","what"],["何時","なんじ","what time"],["何曜日","なんようび","what day of the week"]] },
  { char:"円", on:"エン", kun:"まる", mean:"yen, circle", jlpt:"N4", strokes:4,
    examples:[["円","えん","yen"],["一万円","いちまんえん","10,000 yen"],["円","まる","circle"]] },
  { char:"花", on:"カ・ケ", kun:"はな", mean:"flower", jlpt:"N4", strokes:7,
    examples:[["花","はな","flower"],["花火","はなび","fireworks"],["花見","はなみ","flower viewing"]] },
  { char:"名", on:"メイ・ミョウ", kun:"な", mean:"name, famous", jlpt:"N4", strokes:6,
    examples:[["名前","なまえ","name"],["有名","ゆうめい","famous"],["名刺","めいし","business card"]] },
  { char:"父", on:"フ", kun:"ちち・とう", mean:"father", jlpt:"N4", strokes:4,
    examples:[["父","ちち","(my) father"],["お父さん","おとうさん","father"],["父親","ちちおや","father"]] },
  { char:"母", on:"ボ", kun:"はは・かあ", mean:"mother", jlpt:"N4", strokes:5,
    examples:[["母","はは","(my) mother"],["お母さん","おかあさん","mother"],["母国","ぼこく","mother country"]] },
  { char:"兄", on:"ケイ・キョウ", kun:"あに", mean:"older brother", jlpt:"N4", strokes:5,
    examples:[["兄","あに","(my) older brother"],["お兄さん","おにいさん","older brother"],["兄弟","きょうだい","siblings"]] },
  { char:"姉", on:"シ", kun:"あね", mean:"older sister", jlpt:"N4", strokes:8,
    examples:[["姉","あね","(my) older sister"],["お姉さん","おねえさん","older sister"]] },
  { char:"弟", on:"ダイ・テイ・デ", kun:"おとうと", mean:"younger brother", jlpt:"N4", strokes:7,
    examples:[["弟","おとうと","younger brother"],["兄弟","きょうだい","siblings"]] },
  { char:"妹", on:"マイ", kun:"いもうと", mean:"younger sister", jlpt:"N4", strokes:8,
    examples:[["妹","いもうと","younger sister"],["姉妹","しまい","sisters"]] },
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
    kanjiIdx:[0,1,2],
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
    kanjiIdx:[3,4,10,11,12],
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
    kanjiIdx:[33,34,35,36,37],
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
    kanjiIdx:[50,51,52,53,54],
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
    kanjiIdx:[10,11,20,21,30],
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
  {f:"いくら",b:"how much",t:"L1"},{f:"X の Y",b:"Y of X — possession/description",t:"L1"},
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
  {f:"あまり〜ない",b:"not very/much (needs negative verb)",t:"L4"},{f:"よく",b:"often",t:"L4"},
  {f:"〜てから",b:"after doing ~",t:"L5"},{f:"たのしかった",b:"was fun — past of たのしい (い-adj)",t:"L5"},
  {f:"きれいでした",b:"was beautiful — past of きれい (な-adj)",t:"L5"},{f:"はじめて",b:"for the first time",t:"L5"},
  {f:"〜かった",b:"past tense of い-adjectives",t:"L5"},{f:"〜でした",b:"past tense of な-adj / nouns",t:"L5"},
];

// ─── RESOURCES DATA ───────────────────────────────────────────────────────────
const RESOURCES = {
  jomako: [
    { icon:"📊", title:"Jo-Mako's Japanese Spreadsheet", desc:"Main hub — anime, games, manga, VN, movies with Anki decks and readability files", url:"https://docs.google.com/spreadsheets/d/1IytlD4JjYO5-38wP6VbFNjHQDaDEsx4WWi2Rs-gaamk/edit" },
    { icon:"📈", title:"Jo-Mako's Frequency List", desc:"Japanese vocabulary ranked by frequency across anime, games, novels, and more", url:"https://docs.google.com/spreadsheets/d/1z3Wc85VuDhjgjy1s_zgbGx2daaOoqm0s/htmlview" },
    { icon:"🈳", title:"Jo-Mako's Kanji Spreadsheet", desc:"Complete kanji reference — readings, meanings, components, JLPT level, stroke count, examples", url:"https://docs.google.com/spreadsheets/d/1idXxl-Wsrs_cj0jkqUAErBzYFG6OZPOTsgoNkaKSAvU/edit" },
    { icon:"🎴", title:"Jo-Mako's Kana Deck", desc:"Hiragana and katakana Anki deck with updated card style", url:"https://jo-mako.com" },
  ],
  tools: [
    { icon:"🃏", title:"Anki", desc:"Spaced repetition flashcard app — the gold standard for vocab retention", url:"https://apps.ankiweb.net" },
    { icon:"📖", title:"Jisho.org", desc:"Best free Japanese dictionary — kanji search, example sentences, JLPT tags", url:"https://jisho.org" },
    { icon:"🔊", title:"Forvo", desc:"Native speaker pronunciation for any Japanese word", url:"https://forvo.com/languages/ja/" },
    { icon:"📱", title:"Takoboto", desc:"Offline Japanese dictionary app — great for mobile", url:"https://takoboto.jp" },
    { icon:"💬", title:"HelloTalk", desc:"Language exchange — text and call native Japanese speakers", url:"https://www.hellotalk.com" },
    { icon:"🎧", title:"Comprehensible Japanese", desc:"Beginner-friendly input videos on YouTube", url:"https://www.youtube.com/@cijapanese" },
  ],
  genki: [
    { icon:"📚", title:"Genki Self-Study Room", desc:"Official Genki exercises and audio from the Japan Times", url:"https://genki.japantimes.co.jp/self" },
    { icon:"🌐", title:"Genki Online Companion", desc:"Community-made grammar notes and vocab lists for every Genki chapter", url:"https://www.tofugu.com/japanese/genki-textbook/" },
    { icon:"✏️", title:"Jisho Kanji Drawing", desc:"Draw a kanji you don't know to look it up instantly", url:"https://jisho.org/#radical" },
    { icon:"📝", title:"Cure Dolly (YouTube)", desc:"Organic Japanese grammar from scratch — excellent structural explanation", url:"https://www.youtube.com/@organicjapanesewithcuredol9357" },
  ],
};

// ─── STATE ────────────────────────────────────────────────────────────────────
let state = {
  lessonsDone:   {},
  selectedLesson: 0,
  quizLessonIdx:  0,
  quizQIdx:       0,
  quizScore:      0,
  quizAnswered:   false,
  fcFilter:       "All",
  fcIdx:          0,
  fcFlipped:      false,
  fcKnown:        new Set(),
  kanjiLearned:   new Set(),
  selectedKanjiIdx: null,
  kanjiJlptFilter: "All",
  journalEntries: [],
  selectedMood:   "😊",
};

// Load persisted state
try {
  const s = JSON.parse(localStorage.getItem("jp-study") || "{}");
  if (s.lessonsDone)   state.lessonsDone   = s.lessonsDone;
  if (s.fcKnown)       state.fcKnown       = new Set(s.fcKnown);
  if (s.kanjiLearned)  state.kanjiLearned  = new Set(s.kanjiLearned);
  if (s.journalEntries)state.journalEntries= s.journalEntries;
} catch(e){}

function save() {
  try {
    localStorage.setItem("jp-study", JSON.stringify({
      lessonsDone:   state.lessonsDone,
      fcKnown:       [...state.fcKnown],
      kanjiLearned:  [...state.kanjiLearned],
      journalEntries:state.journalEntries,
    }));
  } catch(e){}
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

document.querySelectorAll(".nav-btn").forEach(btn =>
  btn.addEventListener("click", () => nav(btn.dataset.page))
);

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function todayKanjiGroup() {
  // 5 per day, cycling through KANJI_DATA by day-of-year
  const start = new Date(new Date().getFullYear(), 0, 0);
  const dayOfYear = Math.floor((new Date() - start) / 86400000);
  const startIdx = ((dayOfYear - 1) * 5) % KANJI_DATA.length;
  const indices = [];
  for (let i = 0; i < 5; i++) indices.push((startIdx + i) % KANJI_DATA.length);
  return indices;
}

function fmt(d) {
  return d.toLocaleDateString("en-US", {weekday:"long", month:"long", day:"numeric", year:"numeric"});
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function renderHome() {
  const total   = FLASHCARDS.length;
  const known   = state.fcKnown.size;
  const pct     = total ? Math.round((known/total)*100) : 0;
  const lessons = Object.values(state.lessonsDone).filter(Boolean).length;

  document.getElementById("home-words").textContent       = `${known}/${total}`;
  document.getElementById("home-lessons").textContent     = `${lessons}/5`;
  document.getElementById("home-kanji-count").textContent = state.kanjiLearned.size;
  document.getElementById("home-progress-bar").style.width= pct+"%";
  document.getElementById("home-progress-label").textContent = `${known} of ${total} cards marked known`;
  document.getElementById("home-kanji-date").textContent  = fmt(new Date());

  // Today's kanji strip
  const strip = document.getElementById("home-kanji-preview");
  const todayIdx = todayKanjiGroup();
  strip.innerHTML = todayIdx.map(i => {
    const k = KANJI_DATA[i];
    return `<div class="home-kanji-chip" onclick="nav('kanji')">
      ${k.char}
      <div class="chip-read">${k.kun.split("・")[0] || k.on.split("・")[0]}</div>
    </div>`;
  }).join("");

  // Lesson grid
  document.getElementById("home-lessons-grid").innerHTML = LESSONS.map((l,i) => `
    <div class="card lesson-overview-card ${state.lessonsDone[i]?"done":""}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div>
          <div style="font-family:'DM Sans',sans-serif;font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.09em;">Lesson ${l.num}</div>
          <div style="font-weight:700;font-size:15px;margin-top:3px;">${l.title}</div>
          <div style="font-family:'DM Sans',sans-serif;font-size:12px;color:var(--muted);font-style:italic;">${l.sub}</div>
        </div>
        ${state.lessonsDone[i]?"<span style='font-size:20px;'>🌸</span>":""}
      </div>
    </div>`).join("");
}

// ─── LESSONS ──────────────────────────────────────────────────────────────────
function renderLessons() {
  document.getElementById("lesson-chips").innerHTML = LESSONS.map((l,i) => `
    <button class="chip ${i===state.selectedLesson?"active":""}" onclick="selectLesson(${i})">
      ${state.lessonsDone[i]?"🌸 ":""}L${l.num}: ${l.title}
    </button>`).join("");
  renderLessonDetail();
}

function selectLesson(i) {
  state.selectedLesson = i;
  document.querySelectorAll("#lesson-chips .chip").forEach((c,j) => c.classList.toggle("active", j===i));
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
  const btn = document.getElementById("ld-mark-btn");
  btn.textContent = done ? "✅ Done!" : "Mark Complete";
  btn.className   = `btn ${done?"btn-soft":"btn-primary"}`;

  document.getElementById("tab-grammar").innerHTML = l.grammar.map(g => `
    <div class="grammar-item">
      <div class="grammar-point">${g.p}</div>
      <div class="grammar-ex">${g.ex}</div>
      <div class="grammar-trans">${g.tr}</div>
    </div>`).join("");

  document.getElementById("tab-vocab").innerHTML = `<div class="vocab-grid">${
    l.vocab.map(v => `<div class="vocab-item"><span class="vocab-jp">${v.jp}</span><span class="vocab-en">${v.en}</span></div>`).join("")
  }</div>`;

  document.getElementById("tab-kanji-tab").innerHTML = `<div class="lesson-kanji-row">${
    (l.kanjiIdx || []).slice(0,5).map(ki => {
      const k = KANJI_DATA[ki];
      if (!k) return "";
      return `<div class="lesson-kanji-card">
        <div class="lesson-kanji-char">${k.char}</div>
        <div style="font-weight:700;font-size:13px;">${k.on}</div>
        <div style="font-family:'DM Sans',sans-serif;font-size:12px;color:var(--muted);">${k.mean}</div>
        <span class="pill ${k.jlpt.toLowerCase()}" style="margin-top:6px;">${k.jlpt}</span>
      </div>`;
    }).join("")
  }</div>`;
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
  document.getElementById("kanji-date-label").textContent = fmt(new Date());

  const todayIdx = todayKanjiGroup();
  document.getElementById("kanji-today-grid").innerHTML = todayIdx.map((ki, pos) => {
    const k = KANJI_DATA[ki];
    const learned = state.kanjiLearned.has(ki);
    const active  = state.selectedKanjiIdx === ki;
    return `<div class="kanji-today-card ${learned?"learned":""} ${active?"active":""}" onclick="selectKanji(${ki})">
      ${learned?"<div class='ktc-badge'>✅</div>":"<div class='ktc-badge'>&nbsp;</div>"}
      <div class="ktc-char">${k.char}</div>
      <div class="ktc-read">${k.on.split("・")[0]}</div>
      <div class="ktc-mean">${k.mean.split(",")[0]}</div>
    </div>`;
  }).join("");

  // Render bank
  renderKanjiBank();
}

function selectKanji(ki) {
  state.selectedKanjiIdx = ki;
  const k = KANJI_DATA[ki];
  document.getElementById("kanji-detail-card").style.display = "block";
  document.getElementById("kd-char").textContent = k.char;
  document.getElementById("kd-read").textContent = `音: ${k.on}　訓: ${k.kun || "—"}`;
  document.getElementById("kd-mean").textContent = k.mean;
  document.getElementById("kd-jlpt").textContent = k.jlpt;
  document.getElementById("kd-jlpt").className   = `pill ${k.jlpt.toLowerCase()}`;
  document.getElementById("kd-stroke").textContent = `${k.strokes} strokes`;
  document.getElementById("kd-examples").innerHTML = k.examples.map(ex => `
    <div class="kanji-ex-item">
      <span class="kanji-ex-jp">${ex[0]}</span>
      <span class="kanji-ex-en"> (${ex[1]}) — ${ex[2]}</span>
    </div>`).join("");

  const learned = state.kanjiLearned.has(ki);
  const btn = document.getElementById("kanji-learn-btn");
  btn.textContent = learned ? "✅ Learned!" : "Mark as Learned";
  btn.className   = `btn ${learned?"btn-soft":"btn-soft"}`;

  document.getElementById("kanji-input").value = "";
  document.getElementById("kanji-feedback").innerHTML = "";

  // Scroll detail into view
  document.getElementById("kanji-detail-card").scrollIntoView({behavior:"smooth", block:"nearest"});

  // Refresh today grid to show active
  renderKanji();
}

function checkKanji() {
  if (state.selectedKanjiIdx === null) return;
  const k = KANJI_DATA[state.selectedKanjiIdx];
  const input = document.getElementById("kanji-input").value.trim();
  if (!input) return;
  const allReadings = [...k.on.split("・"), ...k.kun.split("・")].map(r => r.toLowerCase().replace(/[・。]/g,""));
  const correct = allReadings.some(r => input.toLowerCase().replace(/[・。]/g,"") === r);
  const fb = document.getElementById("kanji-feedback");
  fb.innerHTML = correct
    ? `<div class="feedback-box feedback-correct">✓ Correct! 音: ${k.on}　訓: ${k.kun||"—"}</div>`
    : `<div class="feedback-box feedback-wrong">Not quite. Readings: 音 ${k.on} / 訓 ${k.kun||"—"}</div>`;
}

function markKanjiLearned() {
  if (state.selectedKanjiIdx === null) return;
  const ki = state.selectedKanjiIdx;
  if (state.kanjiLearned.has(ki)) {
    state.kanjiLearned.delete(ki);
  } else {
    state.kanjiLearned.add(ki);
  }
  save();
  const k = KANJI_DATA[ki];
  const learned = state.kanjiLearned.has(ki);
  document.getElementById("kanji-learn-btn").textContent = learned ? "✅ Learned!" : "Mark as Learned";
  renderKanji();
}

function renderKanjiBank() {
  const search = (document.getElementById("kanji-search")||{}).value?.toLowerCase() || "";
  const jlpt   = state.kanjiJlptFilter;

  // JLPT filter buttons
  const filterEl = document.getElementById("kanji-jlpt-filters");
  if (filterEl) {
    filterEl.innerHTML = ["All","N5","N4","N3"].map(f => `
      <button class="chip ${jlpt===f?"active":""}" onclick="setKanjiFilter('${f}')">${f}</button>`).join("");
  }

  const filtered = KANJI_DATA.filter((k,i) => {
    const matchJlpt = jlpt==="All" || k.jlpt===jlpt;
    const matchSearch = !search || k.char.includes(search) ||
      k.on.toLowerCase().includes(search) || k.kun.toLowerCase().includes(search) ||
      k.mean.toLowerCase().includes(search);
    return matchJlpt && matchSearch;
  });

  document.getElementById("kanji-bank-grid").innerHTML = filtered.map((k,_) => {
    const ki = KANJI_DATA.indexOf(k);
    const learned = state.kanjiLearned.has(ki);
    return `<div class="kanji-grid-item ${learned?"learned":""}" onclick="selectKanji(${ki})" title="${k.on} / ${k.kun} — ${k.mean}">
      <div class="kanji-grid-char">${k.char}</div>
      <div class="kanji-grid-read">${k.on.split("・")[0]}</div>
      <div class="kanji-grid-mean">${k.mean.split(",")[0]}</div>
    </div>`;
  }).join("");
}

function setKanjiFilter(f) {
  state.kanjiJlptFilter = f;
  renderKanjiBank();
}

function filterKanjiBank() { renderKanjiBank(); }

// ─── QUIZ ─────────────────────────────────────────────────────────────────────
function renderQuizChips() {
  document.getElementById("quiz-chips").innerHTML = LESSONS.map((l,i) => `
    <button class="chip ${i===state.quizLessonIdx?"active":""}" onclick="selectQuizLesson(${i})">L${l.num}</button>`).join("");
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

  document.getElementById("quiz-bar").style.width      = ((state.quizQIdx/lesson.quiz.length)*100)+"%";
  document.getElementById("quiz-score-pill").textContent= "Score: "+state.quizScore;
  document.getElementById("quiz-q-num").textContent    = `Question ${state.quizQIdx+1} of ${lesson.quiz.length}`;
  document.getElementById("quiz-question").textContent = q.q;
  document.getElementById("quiz-next-row").style.display = "none";

  document.getElementById("quiz-choices").innerHTML = q.ch.map((c,i) =>
    `<button class="choice-btn" onclick="pickAnswer(${i})">${c}</button>`).join("");
  state.quizAnswered = false;
}

function pickAnswer(i) {
  if (state.quizAnswered) return;
  state.quizAnswered = true;
  const q = LESSONS[state.quizLessonIdx].quiz[state.quizQIdx];
  if (i===q.a) { state.quizScore++; document.querySelectorAll(".choice-btn")[i].classList.add("correct"); }
  else {
    document.querySelectorAll(".choice-btn")[i].classList.add("wrong");
    document.querySelectorAll(".choice-btn")[q.a].classList.add("correct");
  }
  document.querySelectorAll(".choice-btn").forEach(b => b.disabled=true);
  document.getElementById("quiz-next-row").style.display = "flex";
  document.getElementById("quiz-score-pill").textContent = "Score: "+state.quizScore;
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
  const icon = state.quizScore===total ? "🌸" : state.quizScore>=total/2 ? "✨" : "💪";
  const msgs = { "🌸":"Perfect score! You know this lesson 🌸","✨":"Nice work! Review missed ones and try again.","💪":"Keep going — practice makes perfect!" };
  document.getElementById("qr-icon").textContent  = icon;
  document.getElementById("qr-score").textContent = `${state.quizScore}/${total}`;
  document.getElementById("qr-msg").textContent   = msgs[icon];
  document.getElementById("quiz-next-lesson-btn").disabled = state.quizLessonIdx>=4;
}
function quizRestart()   { state.quizQIdx=0; state.quizScore=0; state.quizAnswered=false; renderQuiz(); }
function quizNextLesson(){ selectQuizLesson(Math.min(state.quizLessonIdx+1,4)); }

// ─── FLASHCARDS ───────────────────────────────────────────────────────────────
function filtered() {
  return state.fcFilter==="All" ? FLASHCARDS : FLASHCARDS.filter(c=>c.t===state.fcFilter);
}

function renderFCChips() {
  document.getElementById("fc-chips").innerHTML = ["All","L1","L2","L3","L4","L5"].map(t =>
    `<button class="chip ${t===state.fcFilter?"active":""}" onclick="setFCFilter('${t}')">${t}</button>`).join("");
}

function setFCFilter(tag) {
  state.fcFilter=tag; state.fcIdx=0; state.fcFlipped=false;
  renderFCChips(); renderFC();
}

function renderFC() {
  const cards = filtered();
  const card  = cards[state.fcIdx];
  if (!card) return;

  const fc = document.getElementById("flashcard");
  fc.classList.toggle("flipped", state.fcFlipped);
  document.getElementById("fc-tag").textContent            = card.t;
  document.getElementById("fc-content").textContent        = state.fcFlipped ? card.b : card.f;
  document.getElementById("fc-content").className          = state.fcFlipped ? "fc-back" : "fc-front";
  document.getElementById("fc-hint").textContent           = state.fcFlipped ? "← tap to flip back" : "tap to reveal →";
  document.getElementById("fc-known-badge").style.display  = state.fcKnown.has(card.f) ? "block" : "none";
  document.getElementById("fc-prev").disabled              = state.fcIdx===0;
  document.getElementById("fc-next").disabled              = state.fcIdx===cards.length-1;

  document.getElementById("fc-stats").innerHTML = `
    <span class="pill green">✓ Known: ${state.fcKnown.size}</span>
    <span class="pill muted">Total: ${cards.length}</span>
    <span class="pill">${state.fcIdx+1}/${cards.length}</span>`;
}

function flipCard() { state.fcFlipped=!state.fcFlipped; renderFC(); }

function fcMove(dir) {
  const cards=filtered();
  state.fcIdx=Math.max(0,Math.min(cards.length-1,state.fcIdx+dir));
  state.fcFlipped=false; renderFC();
}

function fcKnow() {
  const card=filtered()[state.fcIdx];
  if (card) state.fcKnown.add(card.f);
  save(); fcMove(1);
}

function fcAgain() {
  const card=filtered()[state.fcIdx];
  if (card) state.fcKnown.delete(card.f);
  save(); fcMove(1);
}

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
  state.journalEntries.unshift({
    id: Date.now(),
    date: fmt(new Date()),
    text,
    mood: state.selectedMood,
  });
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
      <div class="entry-text">${e.text.replace(/\n/g,"<br>")}</div>
    </div>`).join("");
}

// ─── RESOURCES ────────────────────────────────────────────────────────────────
function renderResources() {
  const mkCards = (arr) => arr.map(r => `
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
  const container = document.getElementById("petals");
  for (let i=0; i<10; i++) {
    const p = document.createElement("div");
    p.className = "petal";
    p.textContent = "🌸";
    p.style.left = Math.random()*100+"vw";
    p.style.animationDuration  = (9+Math.random()*12)+"s";
    p.style.animationDelay     = (Math.random()*14)+"s";
    p.style.fontSize = (10+Math.random()*10)+"px";
    container.appendChild(p);
  }
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
renderHome();
renderLessons();
renderKanji();
renderQuizChips();
renderQuiz();
renderFCChips();
renderFC();
renderJournal();
renderResources();
spawnPetals();
