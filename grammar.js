/* ══════════════════════════════════════════════════════════════════
   日本語 Study App — grammar.js
   Original in-depth grammar lessons for Genki I, Lessons 1–6.
   Written from scratch — explanations, examples, and practice.
   Each grammar point:
     { id, title, summary, sections[], examples[], notes[], practice[] }
   Practice types: 'mc' (multiple choice), 'fill', 'translate', 'order'
══════════════════════════════════════════════════════════════════ */

window.GRAMMAR = {

// ════════════════════════════════ LESSON 1 ════════════════════════════════
1: {
  intro: "Lesson 1 introduces the most fundamental sentence structure in Japanese: how to say 'X is Y' using the topic particle は and the copula です. You'll also learn how to ask questions with か, link nouns with の, and the all-important concept that Japanese frequently drops words that are understood from context.",
  points: [
    {
      id:"1-1", title:"X は Y です — The basic sentence",
      summary:"The single most important pattern in beginner Japanese. は marks the topic, です acts like 'is/am/are'.",
      sections:[
        {h:"How it works", t:"A Japanese sentence of the form 「X は Y です」 means roughly 'As for X, it is Y.' The は (written は but pronounced 'wa' when it's the particle) marks X as the topic — the thing you're talking about. です comes at the very end and functions like the English verb 'to be' (is/am/are). Japanese word order is Topic–Comment, and the verb-like です always comes last."},
        {h:"Why は is not quite 'subject'", t:"English has a grammatical subject. Japanese has a topic, which is a looser idea: 'the thing under discussion.' は doesn't say X *does* something — it says 'here's what we're talking about, now here's a comment about it.' This is why は is best understood as 'as for ~' rather than a subject marker."},
        {h:"です is polite", t:"です is the polite present-tense copula. It makes your speech appropriately formal for talking with people you don't know well, teachers, or in public. There's a casual equivalent (だ) you'll meet in Lesson 8, but for now everything ends in です."},
        {h:"Going deeper: は is a 'topic flag', not glue", t:"Here's the mental model that makes everything click later (this is the Tae Kim way of seeing it): は doesn't connect two words like English 'is' connects 'I' and 'student'. Instead, は is a flag you plant on a noun that announces 'OK, here is the topic — everything after this is commentary about it.' That's why a Japanese sentence can be just 「がくせいです」 with no topic at all: if everyone already knows what you're talking about, you don't need to flag it again. English forces a subject ('I am', 'it is'); Japanese only flags a topic when it's actually needed."},
        {h:"Why this matters down the road", t:"Because は merely flags a topic, the SAME noun can be the topic of very different kinds of comments. 「メアリーさんは アメリカじんです」 (Mary is American) and later 「メアリーさんは すしを たべます」 (Mary eats sushi) both flag Mary with は, even though one comment is a description and the other is an action. The topic-comment structure stays identical — only the comment changes. Once you see は this way, the whole language feels more consistent."},
      ],
      examples:[
        {jp:"わたしは がくせいです。", read:"わたしは がくせいです。", en:"I am a student. (As for me, [I'm a] student.)"},
        {jp:"メアリーさんは アメリカじんです。", read:"メアリーさんは アメリカじんです。", en:"Mary is American."},
        {jp:"たけしさんは にほんじんです。", read:"たけしさんは にほんじんです。", en:"Takeshi is Japanese."},
        {jp:"せんせいは にほんじんです。", read:"せんせいは にほんじんです。", en:"The teacher is Japanese."},
      ],
      notes:[
        "は as a particle is ALWAYS pronounced 'wa', never 'ha', even though it's written with the hiragana は.",
        "There are no articles (a/an/the) in Japanese, and nouns don't change for singular/plural. がくせい can mean 'a student' or 'students' depending on context.",
        "さん is a polite suffix added to people's names (like Mr./Ms.). Never add さん to your own name.",
      ],
      practice:[
        {type:"mc", q:"How do you say 'I am a student'?", choices:["わたしは がくせいです。","わたしを がくせいです。","がくせいは わたしです。","わたしは がくせいか。"], a:0, ex:"は marks the topic (わたし = I), がくせい (student) is the comment, です closes the sentence."},
        {type:"mc", q:"The particle は is pronounced…", choices:["ha","wa","ba","pa"], a:1, ex:"When は is used as a particle, it is always pronounced 'wa'."},
        {type:"fill", q:"Fill in the blank: メアリーさん＿ アメリカじんです。", answer:"は", ex:"は marks Mary as the topic of the sentence."},
        {type:"translate", q:"Translate to Japanese (use です): 'Takeshi is Japanese.'", answer:"たけしさんは にほんじんです。", accept:["たけしさんはにほんじんです","たけしさんはにほんじんです。"], ex:"Topic (たけしさん) + は + comment (にほんじん) + です."},
      ],
    },
    {
      id:"1-2", title:"Question sentences with か",
      summary:"Turn any statement into a yes/no question by adding か to the end. No word-order change needed.",
      sections:[
        {h:"How it works", t:"To ask a yes/no question, you simply add the particle か to the end of a statement. Unlike English, you do NOT rearrange the words. 「がくせいです」 (You are a student) becomes 「がくせいですか」 (Are you a student?). In casual writing か often replaces the question mark, though you can write both."},
        {h:"Question words", t:"For information questions (who, what, etc.), you put the question word where the answer would go, and still end with か. なん/なに = what, だれ = who, いくつ = how many, なんさい = how old. The structure stays Topic は [question word] ですか."},
        {h:"Answering", t:"Answer はい (yes) or いいえ (no), then often restate. はい、がくせいです。 = Yes, I'm a student. いいえ、がくせいじゃないです。 = No, I'm not a student."},
      ],
      examples:[
        {jp:"たけしさんは がくせいですか。", read:"たけしさんは がくせいですか。", en:"Is Takeshi a student?"},
        {jp:"メアリーさんは せんせいですか。", read:"メアリーさんは せんせいですか。", en:"Is Mary a teacher?"},
        {jp:"これは なんですか。", read:"これは なんですか。", en:"What is this?"},
        {jp:"あのひとは だれですか。", read:"あのひとは だれですか。", en:"Who is that person?"},
      ],
      notes:[
        "Intonation rises at the end of a か question, just like English.",
        "なに and なん both mean 'what'. Use なん before です and counters (なんですか), なに elsewhere.",
        "You don't need a question mark when using か, but it's fine to add one.",
      ],
      practice:[
        {type:"mc", q:"How do you turn 「がくせいです」 into a question?", choices:["Rearrange to ですがくせい","Add か → がくせいですか","Add を → がくせいをです","Add は → がくせいはです"], a:1, ex:"Just append か. No reordering in Japanese."},
        {type:"fill", q:"Complete the question 'What is this?': これは なん＿＿。", answer:"ですか", accept:["ですか","です か"], ex:"これは (this) + なん (what) + ですか."},
        {type:"mc", q:"Which means 'Who is that person?'", choices:["あのひとは なんですか。","あのひとは だれですか。","だれは あのひとですか。","あのひとを だれですか。"], a:1, ex:"だれ = who; the question word sits where the answer would go."},
        {type:"translate", q:"Translate: 'Is Mary a teacher?'", answer:"メアリーさんは せんせいですか。", accept:["メアリーさんはせんせいですか","メアリーさんはせんせいですか。"], ex:"Statement + か."},
      ],
    },
    {
      id:"1-3", title:"The negative: じゃないです / じゃありません",
      summary:"To say 'X is not Y', replace です with じゃないです (casual-polite) or じゃありません (more formal).",
      sections:[
        {h:"How it works", t:"The negative of です is formed by replacing it. 「がくせいです」 (is a student) → 「がくせいじゃないです」 (is not a student). Both じゃないです and じゃありません mean the same thing; じゃありません is slightly more formal. There's also ではありません, an even more formal written form (では is the same じゃ, just less contracted)."},
        {h:"The three registers", t:"From most casual to most formal: じゃない (casual) < じゃないです / じゃありません (polite) < ではありません (formal/written). At your level, じゃないです is the natural everyday polite choice."},
      ],
      examples:[
        {jp:"わたしは せんせいじゃないです。", read:"わたしは せんせいじゃないです。", en:"I am not a teacher."},
        {jp:"たけしさんは アメリカじんじゃないです。", read:"たけしさんは アメリカじんじゃないです。", en:"Takeshi is not American."},
        {jp:"これは わたしの ほんじゃありません。", read:"これは わたしの ほんじゃありません。", en:"This is not my book."},
      ],
      notes:[
        "じゃ is a contraction of では. You'll hear both; じゃ is more conversational.",
        "Negative answers: いいえ、がくせいじゃないです。 = No, I'm not a student.",
      ],
      practice:[
        {type:"mc", q:"How do you say 'I am not a teacher'?", choices:["わたしは せんせいです。","わたしは せんせいじゃないです。","わたしは せんせいですか。","わたしは せんせいでした。"], a:1, ex:"Replace です with じゃないです to negate."},
        {type:"fill", q:"Negate this: たけしさんは アメリカじん＿＿＿＿＿。 (use じゃ…)", answer:"じゃないです", accept:["じゃないです","じゃありません"], ex:"Both じゃないです and じゃありません are correct polite negatives."},
        {type:"translate", q:"Translate: 'This is not my book.' (の = possessive)", answer:"これは わたしの ほんじゃないです。", accept:["これはわたしのほんじゃないです","これはわたしのほんじゃありません","これはわたしのほんじゃないです。"], ex:"これは + わたしの (my) + ほん + じゃないです."},
      ],
    },
    {
      id:"1-4", title:"Noun の Noun — linking nouns",
      summary:"の connects two nouns where the first one modifies the second: possession, type, affiliation, and more.",
      sections:[
        {h:"How it works", t:"の links two nouns in the order [modifier] の [main noun]. The noun BEFORE の describes or owns the noun AFTER の. わたしの ほん = my book (the book that is mine). にほんごの せんせい = Japanese[-language] teacher (a teacher of Japanese). The main noun always comes second."},
        {h:"It's more than possession", t:"English 'of' or apostrophe-s only covers some uses. の also expresses: type/category (にほんごの ほん = a Japanese book), affiliation (だいがくの がくせい = a university student), and origin. Think of の as 'the ___ that relates to ___'."},
        {h:"Chaining", t:"You can chain の: わたしの だいがくの せんせい = my university's teacher / the teacher at my university. Read right-to-left to find the head noun, then work outward."},
      ],
      examples:[
        {jp:"わたしの なまえ", read:"わたしの なまえ", en:"my name"},
        {jp:"にほんごの せんせい", read:"にほんごの せんせい", en:"Japanese[-language] teacher"},
        {jp:"だいがくの がくせい", read:"だいがくの がくせい", en:"a college student"},
        {jp:"メアリーさんの でんわばんごう", read:"メアリーさんの でんわばんごう", en:"Mary's phone number"},
      ],
      notes:[
        "Order matters: にほんごの せんせい (Japanese teacher) ≠ せんせいの にほんご (the teacher's Japanese).",
        "The head/main noun is always the one AFTER の.",
      ],
      practice:[
        {type:"mc", q:"How do you say 'my name'?", choices:["なまえの わたし","わたしの なまえ","わたしは なまえ","なまえは わたし"], a:1, ex:"[owner] の [thing]: わたし の なまえ."},
        {type:"mc", q:"What does にほんごの せんせい mean?", choices:["the teacher's Japanese","a Japanese-language teacher","Japan's teacher","teach Japanese"], a:1, ex:"The head noun is せんせい (teacher); にほんご describes what kind."},
        {type:"fill", q:"Link these: メアリーさん ＿ でんわばんごう (Mary's phone number)", answer:"の", ex:"の connects the owner (Mary) to the thing (phone number)."},
        {type:"translate", q:"Translate: 'a college student' (college = だいがく)", answer:"だいがくの がくせい", accept:["だいがくのがくせい"], ex:"だいがく の がくせい — affiliation use of の."},
      ],
    },
    {
      id:"1-5", title:"Dropping words: the topic and 'you'",
      summary:"Japanese omits anything understood from context — especially the topic and the word for 'you'.",
      sections:[
        {h:"How it works", t:"Once a topic is established (or obvious), Japanese drops it. If someone asks 「がくせいですか」 (Are you a student?), you can just answer 「はい、がくせいです」 — no わたしは needed, because it's understood. This is not lazy; it's how natural Japanese works. Over-using わたし sounds stiff and unnatural."},
        {h:"Avoid あなた", t:"あなた technically means 'you', but Japanese speakers usually avoid it. Instead they use the person's name + さん, their title (せんせい), or simply drop it. Saying あなたは… repeatedly can sound blunt or even rude. Use names."},
      ],
      examples:[
        {jp:"A: がくせいですか。　B: はい、がくせいです。", read:"がくせいですか。 はい、がくせいです。", en:"A: Are you a student? B: Yes, I am (a student)."},
        {jp:"たけしさんは せんせいですか。", read:"たけしさんは せんせいですか。", en:"Takeshi, are you a teacher? (using name instead of 'you')"},
      ],
      notes:[
        "Dropping the topic is the DEFAULT in conversation once it's clear who/what you mean.",
        "Use [name]さん or a title instead of あなた when addressing someone.",
      ],
      practice:[
        {type:"mc", q:"Someone asks 「がくせいですか」. The most natural 'Yes, I am' is:", choices:["はい、わたしは がくせいです。","はい、がくせいです。","はい、あなたは がくせいです。","はい、です がくせい。"], a:1, ex:"The topic (わたし) is understood and dropped — just answer がくせいです."},
        {type:"mc", q:"To address Takeshi as 'you', the most natural choice is:", choices:["あなた","たけしさん","きみ","おまえ"], a:1, ex:"Japanese uses the person's name + さん rather than あなた."},
      ],
    },
  ],
},

// ════════════════════════════════ LESSON 2 ════════════════════════════════
2: {
  intro: "Lesson 2 is about pointing at things and shopping. You'll learn the これ/それ/あれ (ko-so-a-do) demonstrative system, how to attach この/その/あの directly to nouns, location words ここ/そこ/あそこ, the particle も ('also'), and how to handle numbers and prices.",
  points: [
    {
      id:"2-1", title:"これ・それ・あれ・どれ — the ko-so-a-do system",
      summary:"A four-way demonstrative system based on distance from the speaker and listener.",
      sections:[
        {h:"The logic", t:"Japanese demonstratives work on a three-zone system plus a question word: こ (ko) = near the speaker; そ (so) = near the listener; あ (a) = far from both; ど (do) = the question 'which'. これ = this one (by me), それ = that one (by you), あれ = that one (over there, away from us both), どれ = which one?"},
        {h:"These are pronouns", t:"これ/それ/あれ/どれ stand alone as nouns meaning 'this one / that one / etc.' You use them when the thing itself is obvious and you don't need to name it. これは ほんです = This is a book."},
      ],
      examples:[
        {jp:"これは ほんです。", read:"これは ほんです。", en:"This (near me) is a book."},
        {jp:"それは わたしの かさです。", read:"それは わたしの かさです。", en:"That (near you) is my umbrella."},
        {jp:"あれは えきです。", read:"あれは えきです。", en:"That (over there) is the station."},
        {jp:"どれが メアリーさんの かばんですか。", read:"どれが メアリーさんの かばんですか。", en:"Which one is Mary's bag?"},
      ],
      notes:[
        "Memorize them as a set: こ-そ-あ-ど (ko-so-a-do). This pattern repeats across many word families.",
        "これ etc. replace a noun. They cannot directly attach to one (you can't say これほん).",
      ],
      practice:[
        {type:"mc", q:"You're holding a pen and want to say 'This is a pen.' Which word?", choices:["これ","それ","あれ","どれ"], a:0, ex:"こ = near the speaker, so これ for something you're holding."},
        {type:"mc", q:"Something near the LISTENER uses which word?", choices:["これ","それ","あれ","どれ"], a:1, ex:"そ (so) = near the listener → それ."},
        {type:"fill", q:"___は えきです。 (That over there is the station)", answer:"あれ", ex:"あ = far from both speaker and listener → あれ."},
        {type:"translate", q:"Translate: 'Which one is Mary's bag?' (bag = かばん, use が)", answer:"どれが メアリーさんの かばんですか。", accept:["どれがメアリーさんのかばんですか","どれがメアリーさんのかばんですか。"], ex:"どれ (which) + が, because question words take が, not は."},
      ],
    },
    {
      id:"2-2", title:"この・その・あの・どの + Noun",
      summary:"Unlike これ/それ/あれ, these MUST attach to a noun: この ほん = this book.",
      sections:[
        {h:"The difference from これ", t:"これ stands alone ('this one'). この must be followed by a noun ('this ___'). この ほん = this book; その くつ = those shoes (near you); あの ひと = that person (over there); どの かばん = which bag? You cannot say この by itself, and you cannot say これ ほん."},
        {h:"Same ko-so-a-do logic", t:"The distance meanings are identical to これ/それ/あれ/どれ — only the grammar (attaches to a noun vs. stands alone) is different."},
      ],
      examples:[
        {jp:"この ほんは いくらですか。", read:"この ほんは いくらですか。", en:"How much is this book?"},
        {jp:"その かさは わたしのです。", read:"その かさは わたしのです。", en:"That umbrella (by you) is mine."},
        {jp:"あの ひとは せんせいです。", read:"あの ひとは せんせいです。", en:"That person (over there) is a teacher."},
        {jp:"どの くつが いいですか。", read:"どの くつが いいですか。", en:"Which shoes are good?"},
      ],
      notes:[
        "Rule of thumb: これ/それ/あれ = pronoun ('this one'); この/その/あの = adjective ('this ___ noun').",
        "わたしの with nothing after it means 'mine' — the noun is dropped but understood.",
      ],
      practice:[
        {type:"mc", q:"Which is correct for 'this book'?", choices:["これ ほん","この ほん","ここ ほん","これは ほん"], a:1, ex:"この attaches directly to a noun: この ほん."},
        {type:"mc", q:"What's wrong with 「これ ほんです」?", choices:["Nothing","これ can't attach to a noun; use この ほん","It needs を","ほん should come first"], a:1, ex:"これ is a standalone pronoun; to modify ほん you need この."},
        {type:"fill", q:"___ ひとは せんせいです。 (That person over there)", answer:"あの", ex:"Far from both = あ → あの + noun."},
        {type:"translate", q:"Translate: 'How much is this book?' (how much = いくら)", answer:"この ほんは いくらですか。", accept:["このほんはいくらですか","このほんはいくらですか。"], ex:"この ほん (this book) + は + いくら + ですか."},
      ],
    },
    {
      id:"2-3", title:"ここ・そこ・あそこ・どこ — places",
      summary:"The ko-so-a-do system applied to locations: here, there, over there, where?",
      sections:[
        {h:"How it works", t:"For places: ここ = here (where I am), そこ = there (where you are), あそこ = over there (away from us both — note it's あそこ, not あこ), どこ = where? These are nouns and take は/が/を like any noun. トイレは どこですか = Where is the bathroom?"},
        {h:"Polite variants", t:"There's a more formal set: こちら/そちら/あちら/どちら, which also mean 'this way/that way' and are used for directions and politely for people. For now, ここ/そこ/あそこ/どこ are your everyday words."},
      ],
      examples:[
        {jp:"トイレは どこですか。", read:"トイレは どこですか。", en:"Where is the bathroom?"},
        {jp:"ぎんこうは あそこです。", read:"ぎんこうは あそこです。", en:"The bank is over there."},
        {jp:"メアリーさんは ここです。", read:"メアリーさんは ここです。", en:"Mary is here."},
      ],
      notes:[
        "Note the irregular form: it's あそこ (a-so-ko), not あこ.",
        "どこですか is the standard way to ask where something is.",
      ],
      practice:[
        {type:"mc", q:"Which means 'over there' (far from both)?", choices:["ここ","そこ","あそこ","どこ"], a:2, ex:"あ-zone for places is the irregular あそこ."},
        {type:"fill", q:"トイレは ___ですか。 (Where is the bathroom?)", answer:"どこ", ex:"どこ = where."},
        {type:"translate", q:"Translate: 'The bank is over there.' (bank = ぎんこう)", answer:"ぎんこうは あそこです。", accept:["ぎんこうはあそこです","ぎんこうはあそこです。"], ex:"ぎんこう + は + あそこ + です."},
      ],
    },
    {
      id:"2-4", title:"The particle も — 'also / too'",
      summary:"も replaces は (or を) to mean 'also'. It signals the comment applies to this item too.",
      sections:[
        {h:"How it works", t:"When something shares the same comment as a previously mentioned item, replace its は with も ('also/too'). A: わたしは がくせいです (I'm a student). B: わたしも がくせいです (I'm also a student). Notice も takes the place of は — you don't say わたしはも."},
        {h:"With negatives", t:"も also works in negative sentences to mean 'not… either'. にくも たべません = I don't eat meat either."},
      ],
      examples:[
        {jp:"わたしも がくせいです。", read:"わたしも がくせいです。", en:"I am also a student."},
        {jp:"これも わたしのです。", read:"これも わたしのです。", en:"This is also mine."},
        {jp:"たけしさんも にほんじんです。", read:"たけしさんも にほんじんです。", en:"Takeshi is also Japanese."},
      ],
      notes:[
        "も REPLACES は. Never write はも or もは.",
        "も attaches to the noun that shares the comment, not necessarily the subject.",
      ],
      practice:[
        {type:"mc", q:"A says 'I'm a student.' B is also a student. How does B respond?", choices:["わたしは がくせいです。","わたしも がくせいです。","わたしはも がくせいです。","わたしを がくせいです。"], a:1, ex:"も replaces は to mean 'also'."},
        {type:"mc", q:"What's wrong with 「たけしさんはも にほんじんです」?", choices:["Nothing","も replaces は — you can't have both","It needs を","にほんじん is misspelled"], a:1, ex:"Use either は or も, never both together."},
        {type:"fill", q:"これ___ わたしのです。 (This is also mine)", answer:"も", ex:"も = also, replacing は."},
      ],
    },
    {
      id:"2-5", title:"Numbers, prices, and いくら",
      summary:"Counting, reading prices in 円 (yen), and asking 'how much?' with いくら.",
      sections:[
        {h:"Big-number structure", t:"Japanese groups large numbers by 万 (10,000), not by thousand like English. So 10,000 = いちまん (1 man), 50,000 = ごまん, 100,000 = じゅうまん (10 man). This trips up English speakers because the comma grouping is different. Prices end in えん (yen): せんえん = 1,000 yen; ごせんえん = 5,000 yen."},
        {h:"Asking the price", t:"いくら = 'how much'. これは いくらですか = How much is this? The answer: 〜えんです. これは さんぜんえんです = This is 3,000 yen. Watch for sound changes: さんぜん (3,000) and はっぴゃく (800) shift sounds."},
      ],
      examples:[
        {jp:"これは いくらですか。", read:"これは いくらですか。", en:"How much is this?"},
        {jp:"せんえんです。", read:"せんえんです。", en:"It's 1,000 yen."},
        {jp:"その かばんは ごせんえんです。", read:"その かばんは ごせんえんです。", en:"That bag is 5,000 yen."},
      ],
      notes:[
        "Japanese counts in units of 万 (10,000). 100,000 is じゅうまん (10 × 10,000), not 'hundred thousand'.",
        "Sound changes are common: 300 = さんびゃく, 600 = ろっぴゃく, 800 = はっぴゃく.",
      ],
      practice:[
        {type:"mc", q:"How do you ask 'How much is this?'", choices:["これは どこですか。","これは いくらですか。","これは なんですか。","これは だれですか。"], a:1, ex:"いくら = how much."},
        {type:"mc", q:"In Japanese, 10,000 is one unit called…", choices:["せん","まん","ひゃく","おく"], a:1, ex:"Japanese groups large numbers by 万 (man = 10,000)."},
        {type:"translate", q:"Translate: 'It's 1,000 yen.'", answer:"せんえんです。", accept:["せんえんです","せんえんです。","1000えんです"], ex:"せん (1,000) + えん (yen) + です."},
      ],
    },
  ],
},

// ════════════════════════════════ LESSON 3 ════════════════════════════════
3: {
  intro: "Lesson 3 brings verbs to life. You'll learn the polite ます-form, the crucial distinction between る-verbs and う-verbs, particles を (object), に (time/destination), へ (direction), and で (place of action), plus how to invite someone with ませんか and suggest with ましょう.",
  points: [
    {
      id:"3-1", title:"Verb classes: る-verbs, う-verbs, irregular",
      summary:"Every Japanese verb belongs to one of three groups. Knowing the group tells you how to conjugate.",
      sections:[
        {h:"Why this matters", t:"Japanese verbs conjugate by group, so before you can change a verb's tense or form you must know which class it belongs to. There are exactly three: る-verbs (Group 2), う-verbs (Group 1), and two irregulars (する, くる)."},
        {h:"る-verbs (Group 2)", t:"These end in る where the syllable before る is an 'i' or 'e' sound. たべる (taberu, eat), みる (miru, see), ねる (neru, sleep). To make the polite form, drop る and add ます: たべる → たべます."},
        {h:"う-verbs (Group 1)", t:"These end in any u-sound (う, く, ぐ, す, つ, ぬ, ぶ, む, る). For the polite form, change the final u-sound to its 'i' equivalent and add ます: のむ (nomu) → のみます; かく (kaku) → かきます; はなす → はなします."},
        {h:"The tricky overlap", t:"Some verbs end in る but are actually う-verbs (e.g. かえる 'to return' → かえります, not かえます). You learn these as exceptions. A る-verb has an i/e sound before る AND conjugates by dropping る; when in doubt, memorize the verb's group as you learn it."},
        {h:"Irregulars", t:"Only two: する (to do) → します, and くる (to come) → きます. Memorize them directly."},
      ],
      examples:[
        {jp:"たべる → たべます", read:"たべる → たべます", en:"eat (る-verb): drop る, add ます"},
        {jp:"のむ → のみます", read:"のむ → のみます", en:"drink (う-verb): mu → mi + ます"},
        {jp:"かく → かきます", read:"かく → かきます", en:"write (う-verb): ku → ki + ます"},
        {jp:"する → します　／　くる → きます", read:"する → します　／　くる → きます", en:"do / come (irregular)"},
      ],
      notes:[
        "る-verbs: drop る, add ます. う-verbs: final u → i, add ます.",
        "かえる (return), はいる (enter), はしる (run) LOOK like る-verbs but are う-verbs. Learn them as exceptions.",
      ],
      practice:[
        {type:"mc", q:"What is the polite (ます) form of たべる?", choices:["たべます","たべります","たべるます","たびます"], a:0, ex:"る-verb: drop る, add ます → たべます."},
        {type:"mc", q:"What is the polite form of のむ (う-verb)?", choices:["のむます","のみます","のります","のめます"], a:1, ex:"う-verb: mu → mi, then add ます → のみます."},
        {type:"mc", q:"Which verb is irregular?", choices:["たべる","のむ","くる","かく"], a:2, ex:"くる (to come) is one of the two irregular verbs; its polite form is きます."},
        {type:"fill", q:"Polite form of かく (to write): ____", answer:"かきます", ex:"う-verb: ku → ki + ます."},
      ],
    },
    {
      id:"3-2", title:"The を particle — direct object",
      summary:"を marks the direct object — the thing the verb acts on. Pronounced 'o'.",
      sections:[
        {h:"How it works", t:"を attaches to the noun that receives the action of the verb. パンを たべます = I eat bread (bread is what gets eaten). コーヒーを のみます = I drink coffee. The pattern is [object] を [verb]. を is written with its own hiragana but pronounced 'o'."},
        {h:"Object vs topic", t:"Don't confuse を with は. は marks the topic ('as for…'), を marks what the verb directly affects. わたしは パンを たべます = As for me, I eat bread. Here わたし is the topic, パン is the object."},
      ],
      examples:[
        {jp:"パンを たべます。", read:"パンを たべます。", en:"I eat bread."},
        {jp:"コーヒーを のみます。", read:"コーヒーを のみます。", en:"I drink coffee."},
        {jp:"テレビを みます。", read:"テレビを みます。", en:"I watch TV."},
        {jp:"にほんごを はなします。", read:"にほんごを はなします。", en:"I speak Japanese."},
      ],
      notes:[
        "を is pronounced 'o', and is used ONLY as the object particle.",
        "Pattern: [object] を [verb]. The object comes before the verb.",
      ],
      practice:[
        {type:"mc", q:"How do you say 'I drink coffee'?", choices:["コーヒーは のみます。","コーヒーを のみます。","コーヒーに のみます。","コーヒーが のみます。"], a:1, ex:"を marks コーヒー as the direct object of のみます."},
        {type:"fill", q:"テレビ＿ みます。 (I watch TV)", answer:"を", ex:"を marks the object (TV) of the verb 'watch'."},
        {type:"translate", q:"Translate: 'I eat bread.' (bread = パン, eat = たべます)", answer:"パンを たべます。", accept:["パンをたべます","パンをたべます。"], ex:"[object] パン + を + [verb] たべます."},
      ],
    },
    {
      id:"3-3", title:"Particles に, へ, and で — time, destination, place",
      summary:"に marks time and destination; へ marks direction; で marks the place where an action happens.",
      sections:[
        {h:"に for specific time", t:"に attaches to specific time expressions (clock times, days, dates): しちじに おきます = I get up at 7:00; にちようびに いきます = I go on Sunday. Relative time words (きょう today, あした tomorrow, まいにち every day) do NOT take に."},
        {h:"に / へ for destination", t:"Both に and へ mark where you're going with motion verbs (いく go, くる come, かえる return). がっこうに いきます or がっこうへ いきます = I go to school. に emphasizes the destination as an endpoint; へ emphasizes direction. They're nearly interchangeable here. へ as a particle is pronounced 'e'."},
        {h:"で for place of action", t:"で marks WHERE an action takes place (not the destination): としょかんで べんきょうします = I study AT the library. Compare: としょかんに いきます (go TO the library) vs としょかんで よみます (read AT the library). Destination → に/へ; location of activity → で."},
      ],
      examples:[
        {jp:"しちじに おきます。", read:"しちじに おきます。", en:"I get up at 7:00. (specific time → に)"},
        {jp:"がっこうに いきます。", read:"がっこうに いきます。", en:"I go to school. (destination → に)"},
        {jp:"うちで テレビを みます。", read:"うちで テレビを みます。", en:"I watch TV at home. (place of action → で)"},
        {jp:"あした きます。", read:"あした きます。", en:"I'll come tomorrow. (relative time → NO に)"},
      ],
      notes:[
        "No に on relative time words: きょう, あした, まいにち, etc.",
        "Destination = に/へ (with motion verbs). Place of an action = で.",
        "へ as a particle is pronounced 'e'.",
      ],
      practice:[
        {type:"mc", q:"Which sentence correctly says 'I study at the library'?", choices:["としょかんに べんきょうします。","としょかんで べんきょうします。","としょかんを べんきょうします。","としょかんは べんきょうします。"], a:1, ex:"で marks the place where an action occurs."},
        {type:"mc", q:"Which time word does NOT take に?", choices:["しちじ (7:00)","にちようび (Sunday)","あした (tomorrow)","くじ (9:00)"], a:2, ex:"Relative time words like あした don't take に; specific clock times and days do."},
        {type:"fill", q:"がっこう＿ いきます。 (I go to school — destination)", answer:"に", accept:["に","へ"], ex:"Destination with a motion verb takes に or へ."},
        {type:"translate", q:"Translate: 'I watch TV at home.' (home = うち, TV = テレビ)", answer:"うちで テレビを みます。", accept:["うちでテレビをみます","うちでテレビをみます。"], ex:"Place of action うち + で, object テレビ + を, verb みます."},
      ],
    },
    {
      id:"3-4", title:"Negative and the ません form",
      summary:"Make a polite verb negative by changing ます to ません.",
      sections:[
        {h:"How it works", t:"To negate a polite verb, replace ます with ません. たべます (eat) → たべません (don't eat). のみます → のみません. This is the polite present/future negative: 'don't / won't do'."},
        {h:"With frequency adverbs", t:"Words like あまり (not much) and ぜんぜん (not at all) pair with the negative: コーヒーを あまり のみません = I don't drink coffee much. ぜんぜん たべません = I don't eat (it) at all."},
      ],
      examples:[
        {jp:"あさごはんを たべません。", read:"あさごはんを たべません。", en:"I don't eat breakfast."},
        {jp:"コーヒーを のみません。", read:"コーヒーを のみません。", en:"I don't drink coffee."},
        {jp:"ぜんぜん テレビを みません。", read:"ぜんぜん テレビを みません。", en:"I don't watch TV at all."},
      ],
      notes:[
        "ます → ません for negative. The verb stem stays the same.",
        "あまり and ぜんぜん require a negative verb to complete their meaning.",
      ],
      practice:[
        {type:"mc", q:"What is the negative of たべます?", choices:["たべません","たべませんか","たべました","たべないです"], a:0, ex:"ます → ません gives the polite negative."},
        {type:"fill", q:"コーヒーを のみ____。 (I don't drink coffee)", answer:"ません", ex:"Replace ます with ません."},
        {type:"translate", q:"Translate: 'I don't watch TV at all.' (at all = ぜんぜん)", answer:"ぜんぜん テレビを みません。", accept:["ぜんぜんテレビをみません","ぜんぜんテレビをみません。","テレビをぜんぜんみません"], ex:"ぜんぜん pairs with the negative verb みません."},
      ],
    },
    {
      id:"3-5", title:"Inviting and suggesting: ませんか / ましょう",
      summary:"ませんか politely invites ('won't you…?'); ましょう suggests doing together ('let's…').",
      sections:[
        {h:"ませんか — invitation", t:"Adding か to the negative ません creates a soft invitation: 'Won't you…?' / 'Would you like to…?' えいがを みませんか = Would you like to watch a movie (with me)? It's softer and more polite than a direct request because the negative phrasing leaves room to decline."},
        {h:"ましょう — let's", t:"ましょう replaces ます to suggest doing something together: 'Let's…'. たべましょう = Let's eat. いっしょに いきましょう = Let's go together. Add か (ましょうか) to mean 'Shall we…?' — offering or checking."},
      ],
      examples:[
        {jp:"えいがを みませんか。", read:"えいがを みませんか。", en:"Would you like to watch a movie (with me)?"},
        {jp:"いっしょに たべましょう。", read:"いっしょに たべましょう。", en:"Let's eat together."},
        {jp:"テニスを しましょうか。", read:"テニスを しましょうか。", en:"Shall we play tennis?"},
      ],
      notes:[
        "ませんか = invitation ('won't you…?'). More polite, leaves room to say no.",
        "ましょう = 'let's…'. ましょうか = 'shall we…?'",
      ],
      practice:[
        {type:"mc", q:"How do you invite someone with 'Won't you watch a movie?'", choices:["えいがを みます。","えいがを みません。","えいがを みませんか。","えいがを みましょう。"], a:2, ex:"ませんか makes a soft invitation."},
        {type:"mc", q:"Which means 'Let's eat together'?", choices:["たべます","たべましょう","たべませんか","たべません"], a:1, ex:"ましょう = let's (do together)."},
        {type:"translate", q:"Translate: 'Shall we play tennis?' (tennis = テニス, play = します)", answer:"テニスを しましょうか。", accept:["テニスをしましょうか","テニスをしましょうか。"], ex:"ましょうか = 'shall we…?'"},
      ],
    },
  ],
},

// ════════════════════════════════ LESSON 4 ════════════════════════════════
4: {
  intro: "Lesson 4 covers existence and location with あります/います, the past tense of both verbs and the copula, position words (うえ, した, なか…), the connector で and the と particle ('with/and'), plus たくさん for quantity.",
  points: [
    {
      id:"4-1", title:"あります and います — existence",
      summary:"Two verbs for 'there is/exists': あります for inanimate things, います for living things.",
      sections:[
        {h:"The core split", t:"Japanese uses two different verbs for existence depending on whether the thing is alive. あります for inanimate objects and plants (books, desks, buildings). います for animate beings that move on their own (people, animals). ねこが います = There is a cat. ほんが あります = There is a book."},
        {h:"The pattern", t:"The thing that exists is marked with が: [place]に [thing]が あります/います. つくえの うえに ほんが あります = There is a book on the desk. To ask where something is, use [thing]は どこですか or [thing]は どこに ありますか."},
      ],
      examples:[
        {jp:"つくえの うえに ほんが あります。", read:"つくえの うえに ほんが あります。", en:"There is a book on the desk."},
        {jp:"きょうしつに がくせいが います。", read:"きょうしつに がくせいが います。", en:"There are students in the classroom."},
        {jp:"ねこは どこに いますか。", read:"ねこは どこに いますか。", en:"Where is the cat?"},
      ],
      notes:[
        "あります = inanimate (things, plants). います = animate (people, animals).",
        "The existing thing is marked with が; the location with に.",
        "Fish and insects for sale/food can sometimes take あります, but living animals take います.",
      ],
      practice:[
        {type:"mc", q:"Which verb for 'There is a cat'?", choices:["あります","います","です","します"], a:1, ex:"A cat is alive → います."},
        {type:"mc", q:"Which verb for 'There is a book'?", choices:["あります","います","いります","おります"], a:0, ex:"A book is inanimate → あります."},
        {type:"fill", q:"きょうしつに がくせいが ____。 (There are students in the classroom)", answer:"います", ex:"Students are animate → います."},
        {type:"translate", q:"Translate: 'There is a book on the desk.' (desk = つくえ, on = うえ)", answer:"つくえの うえに ほんが あります。", accept:["つくえのうえにほんがあります","つくえのうえにほんがあります。"], ex:"Location つくえの うえ + に, thing ほん + が, verb あります."},
      ],
    },
    {
      id:"4-2", title:"Position words: うえ, した, なか, まえ, うしろ…",
      summary:"Express relative position by linking a noun with の to a position word.",
      sections:[
        {h:"How it works", t:"Position words are nouns. To say 'on the desk' you build [reference noun] の [position word]: つくえの うえ = the top of the desk / on the desk. Then add に for location: つくえの うえに. Common ones: うえ (above/on), した (below/under), なか (inside), まえ (front), うしろ (behind), となり (next to), みぎ (right), ひだり (left), あいだ (between)."},
        {h:"あいだ (between)", t:"For 'between A and B', use AとBの あいだ: ぎんこうと ゆうびんきょくの あいだ = between the bank and the post office."},
      ],
      examples:[
        {jp:"いすの したに ねこが います。", read:"いすの したに ねこが います。", en:"There is a cat under the chair."},
        {jp:"ぎんこうの となりに ほんやが あります。", read:"ぎんこうの となりに ほんやが あります。", en:"There is a bookstore next to the bank."},
        {jp:"AとBの あいだ", read:"AとBの あいだ", en:"between A and B"},
      ],
      notes:[
        "Structure: [noun] の [position word] (＋に for location).",
        "'Between A and B' = A と B の あいだ.",
      ],
      practice:[
        {type:"mc", q:"How do you say 'under the chair'? (chair = いす)", choices:["いすの うえ","いすの した","いすの なか","いすの まえ"], a:1, ex:"した = below/under."},
        {type:"fill", q:"ぎんこうの ____に ほんやが あります。 (next to the bank)", answer:"となり", ex:"となり = next to."},
        {type:"translate", q:"Translate the phrase 'between A and B'", answer:"AとBの あいだ", accept:["AとBのあいだ","aとbのあいだ"], ex:"A と B の あいだ — あいだ means 'between'."},
      ],
    },
    {
      id:"4-3", title:"Past tense: ました / ませんでした / でした",
      summary:"Verbs: ます→ました (past), ません→ませんでした (past negative). Copula: です→でした.",
      sections:[
        {h:"Verb past tense", t:"For polite verbs: ます → ました (did), ません → ませんでした (didn't). きのう えいがを みました = I watched a movie yesterday. べんきょうしませんでした = I didn't study."},
        {h:"Copula past tense", t:"です → でした (was/were). がくせいでした = (I) was a student. The negative past of です is じゃありませんでした / じゃなかったです = was not."},
      ],
      examples:[
        {jp:"きのう えいがを みました。", read:"きのう えいがを みました。", en:"I watched a movie yesterday."},
        {jp:"きのう べんきょうしませんでした。", read:"きのう べんきょうしませんでした。", en:"I didn't study yesterday."},
        {jp:"がくせいでした。", read:"がくせいでした。", en:"(I) was a student."},
      ],
      notes:[
        "Verb past: ました (did) / ませんでした (didn't).",
        "Copula past: でした (was) / じゃありませんでした (was not).",
      ],
      practice:[
        {type:"mc", q:"Past tense of みます (watch)?", choices:["みました","みませんでした","みましょう","みません"], a:0, ex:"ます → ました for past affirmative."},
        {type:"mc", q:"'I didn't study yesterday' uses which verb form?", choices:["べんきょうします","べんきょうしました","べんきょうしません","べんきょうしませんでした"], a:3, ex:"Past negative: ません → ませんでした."},
        {type:"fill", q:"きのう えいがを み____。 (I watched a movie yesterday)", answer:"ました", ex:"Past affirmative ました."},
        {type:"translate", q:"Translate: '(I) was a student.' (student = がくせい)", answer:"がくせいでした。", accept:["がくせいでした","がくせいでした。"], ex:"です → でした for the past copula."},
      ],
    },
    {
      id:"4-4", title:"The と particle — 'and' (nouns) & 'with'",
      summary:"と joins nouns into a complete list ('A and B') and marks the person you do something with.",
      sections:[
        {h:"'And' between nouns", t:"と connects nouns as an exhaustive 'and': ほんと ノート = a book and a notebook (just those two). Unlike や (which implies 'among others'), と means the list is complete."},
        {h:"'With' someone", t:"と also marks accompaniment: ともだちと いきます = I go with a friend. たけしさんと たべます = I eat with Takeshi. Often paired with いっしょに (together): ともだちと いっしょに = together with a friend."},
      ],
      examples:[
        {jp:"ほんと ノートを かいました。", read:"ほんと ノートを かいました。", en:"I bought a book and a notebook."},
        {jp:"ともだちと えいがを みました。", read:"ともだちと えいがを みました。", en:"I watched a movie with a friend."},
        {jp:"たけしさんと いっしょに いきます。", read:"たけしさんと いっしょに いきます。", en:"I'll go together with Takeshi."},
      ],
      notes:[
        "と = complete 'and' between nouns (vs や = incomplete list).",
        "と also = 'with (a person)', often + いっしょに.",
      ],
      practice:[
        {type:"mc", q:"How do you say 'a book and a notebook'?", choices:["ほんも ノート","ほんと ノート","ほんは ノート","ほんを ノート"], a:1, ex:"と joins nouns as 'and'."},
        {type:"fill", q:"ともだち___ えいがを みました。 (with a friend)", answer:"と", ex:"と marks the person you did the action with."},
        {type:"translate", q:"Translate: 'I go with Takeshi.' (use と, go = いきます)", answer:"たけしさんと いきます。", accept:["たけしさんといきます","たけしさんといきます。"], ex:"たけしさん + と (with) + いきます."},
      ],
    },
  ],
},

// ════════════════════════════════ LESSON 5 ════════════════════════════════
5: {
  intro: "Lesson 5 introduces adjectives — both い-adjectives and な-adjectives — and how they conjugate for tense and negation. You'll also learn likes/dislikes with 好き/嫌い, the quantity word あまり, comparison with 〜ましょう review, and the very useful 〜が好きです pattern.",
  points: [
    {
      id:"5-1", title:"い-adjectives vs な-adjectives",
      summary:"Japanese has two adjective types that conjugate differently. Knowing which is which is essential.",
      sections:[
        {h:"い-adjectives", t:"These end in い in their dictionary form: たかい (expensive), おいしい (delicious), たのしい (fun), あたらしい (new). They can directly precede a noun: たかい ほん = an expensive book. With です they simply add です: たかいです."},
        {h:"な-adjectives", t:"These do NOT end in い (or if they do, they're irregular like きれい). Examples: きれい (pretty), しずか (quiet), げんき (healthy), ひま (free). When a な-adjective modifies a noun, you insert な: きれいな はな = a pretty flower; しずかな まち = a quiet town."},
        {h:"The key test", t:"To attach to a noun: い-adjective attaches directly (たかい ほん); な-adjective needs な (きれいな はな). Beware きれい and きらい — they END in い but are な-adjectives (they need な and conjugate like な-adjectives)."},
      ],
      examples:[
        {jp:"たかい ほん", read:"たかい ほん", en:"an expensive book (い-adj, direct)"},
        {jp:"きれいな はな", read:"きれいな はな", en:"a pretty flower (な-adj, needs な)"},
        {jp:"この まちは しずかです。", read:"この まちは しずかです。", en:"This town is quiet."},
      ],
      notes:[
        "い-adj attaches directly to a noun; な-adj inserts な before the noun.",
        "きれい and きらい look like い-adjectives but are な-adjectives — a common trap.",
      ],
      practice:[
        {type:"mc", q:"How do you say 'a pretty flower'? (pretty = きれい, flower = はな)", choices:["きれい はな","きれいな はな","きれいの はな","きれいい はな"], a:1, ex:"きれい is a な-adjective, so it needs な before the noun."},
        {type:"mc", q:"Which is an い-adjective?", choices:["きれい","しずか","たかい","げんき"], a:2, ex:"たかい ends in い and conjugates as an い-adjective. きれい/しずか/げんき are な-adjectives."},
        {type:"fill", q:"しずか__ まち (a quiet town)", answer:"な", ex:"しずか is a な-adjective → needs な."},
      ],
    },
    {
      id:"5-2", title:"Conjugating い-adjectives",
      summary:"い-adjectives change their ending for negative and past — they don't rely on です for tense.",
      sections:[
        {h:"Present", t:"Affirmative: [adj]です — たかいです (is expensive). Negative: drop い, add くないです — たかくないです (is not expensive). Notice です stays but the adjective itself carries the negation."},
        {h:"Past", t:"Affirmative past: drop い, add かったです — たかかったです (was expensive). Negative past: drop い, add くなかったです — たかくなかったです (was not expensive). The です never becomes でした for い-adjectives — the tense is built into the adjective."},
        {h:"The いい exception", t:"いい (good) is irregular. It uses よ- as its base in conjugation: よくないです (not good), よかったです (was good), よくなかったです (was not good). Never いかったです."},
      ],
      examples:[
        {jp:"この ほんは たかいです。", read:"この ほんは たかいです。", en:"This book is expensive."},
        {jp:"この ほんは たかくないです。", read:"この ほんは たかくないです。", en:"This book is not expensive."},
        {jp:"りょこうは たのしかったです。", read:"りょこうは たのしかったです。", en:"The trip was fun."},
        {jp:"てんきは よくなかったです。", read:"てんきは よくなかったです。", en:"The weather was not good."},
      ],
      notes:[
        "い-adj negative: ～くないです. Past: ～かったです. Past negative: ～くなかったです.",
        "い-adjectives never use でした. Don't say たかいでした.",
        "いい conjugates from よ-: よかったです, よくないです.",
      ],
      practice:[
        {type:"mc", q:"How do you say 'was fun' from たのしい?", choices:["たのしいでした","たのしかったです","たのしくなかったです","たのしです"], a:1, ex:"い-adj past: drop い, add かったです."},
        {type:"mc", q:"Negative of たかい (expensive)?", choices:["たかくないです","たかいじゃないです","たかいでした","たかません"], a:0, ex:"い-adj negative: drop い, add くないです."},
        {type:"mc", q:"'Was good' (from いい) is:", choices:["いかったです","よかったです","いいでした","よくないです"], a:1, ex:"いい is irregular — it conjugates from よ-: よかったです."},
        {type:"fill", q:"てんきは よく____です。 (the weather was not good)", answer:"なかった", ex:"いい → past negative よくなかったです."},
      ],
    },
    {
      id:"5-3", title:"Conjugating な-adjectives",
      summary:"な-adjectives conjugate like nouns — they use です/でした and じゃないです, not い-endings.",
      sections:[
        {h:"Present", t:"Affirmative: [adj]です — きれいです (is pretty). Negative: [adj]じゃないです — きれいじゃないです (is not pretty). Exactly like a noun + です."},
        {h:"Past", t:"Affirmative past: [adj]でした — きれいでした (was pretty). Negative past: じゃなかったです / じゃありませんでした — きれいじゃなかったです (was not pretty). Because な-adjectives behave like nouns, they take でした for the past, unlike い-adjectives."},
      ],
      examples:[
        {jp:"へやは きれいです。", read:"へやは きれいです。", en:"The room is clean."},
        {jp:"へやは きれいじゃないです。", read:"へやは きれいじゃないです。", en:"The room is not clean."},
        {jp:"まちは しずかでした。", read:"まちは しずかでした。", en:"The town was quiet."},
      ],
      notes:[
        "な-adjectives conjugate like nouns: です / でした / じゃないです / じゃなかったです.",
        "Contrast: な-adj past = でした, but い-adj past = かったです.",
      ],
      practice:[
        {type:"mc", q:"'The town was quiet' (しずか = な-adj):", choices:["しずかかったです","しずかでした","しずくなかったです","しずかいでした"], a:1, ex:"な-adjectives use でした for the past, like nouns."},
        {type:"mc", q:"Negative of きれい (な-adj):", choices:["きれくないです","きれいじゃないです","きれかったです","きれいません"], a:1, ex:"な-adjectives negate with じゃないです, like nouns."},
        {type:"fill", q:"へやは きれい______。 (the room is not clean)", answer:"じゃないです", accept:["じゃないです","じゃありません"], ex:"な-adjective negative pattern."},
      ],
    },
    {
      id:"5-4", title:"〜が好きです — likes and dislikes",
      summary:"好き (like) and 嫌い (dislike) are な-adjectives; the thing liked is marked with が, not を.",
      sections:[
        {h:"How it works", t:"In Japanese, 'to like' is expressed with the な-adjective 好き (すき), and the thing you like is marked with が (not を): わたしは すしが すきです = I like sushi. Literally 'as for me, sushi is likeable.' Same with きらい (dislike), だいすき (love), だいきらい (really dislike)."},
        {h:"Why が, not を", t:"好き is an adjective, not a verb, so there's no direct object to mark with を. The thing liked is the grammatical subject of 'is likeable', hence が. This catches many learners — remember 好き takes が."},
      ],
      examples:[
        {jp:"わたしは すしが すきです。", read:"わたしは すしが すきです。", en:"I like sushi."},
        {jp:"たけしさんは やさいが きらいです。", read:"たけしさんは やさいが きらいです。", en:"Takeshi dislikes vegetables."},
        {jp:"おんがくが だいすきです。", read:"おんがくが だいすきです。", en:"I love music."},
      ],
      notes:[
        "好き and 嫌い are な-adjectives and take が for the thing liked/disliked.",
        "Strength: だいすき (love) > すき (like) > きらい (dislike) > だいきらい (hate).",
      ],
      practice:[
        {type:"mc", q:"How do you say 'I like sushi'?", choices:["すしを すきです。","すしが すきです。","すしは すきます。","すしに すきです。"], a:1, ex:"好き takes が for the thing liked."},
        {type:"mc", q:"Why is が used instead of を with 好き?", choices:["好き is a verb","好き is an adjective, so there's no object","を is never used","It's a typo"], a:1, ex:"好き is a な-adjective, not a verb — the liked thing is marked with が."},
        {type:"translate", q:"Translate: 'I love music.' (music = おんがく, love = だいすき)", answer:"おんがくが だいすきです。", accept:["おんがくがだいすきです","おんがくがだいすきです。","わたしはおんがくがだいすきです"], ex:"おんがく + が + だいすきです."},
      ],
    },
  ],
},

// ════════════════════════════════ LESSON 6 ════════════════════════════════
6: {
  intro: "Lesson 6 is a milestone: the て-form. This single form unlocks requests, permission, prohibition, sequencing actions, and (later) the progressive. You'll learn how to build the て-form from each verb group, then use it for 〜てください, 〜てもいいですか, and 〜てはいけません.",
  points: [
    {
      id:"6-1", title:"The て-form — how to build it",
      summary:"The te-form is the Swiss-army knife of Japanese verbs. Each verb group forms it differently.",
      sections:[
        {h:"Why it matters", t:"The て-form itself isn't a tense — it's a connecting form that many grammar patterns attach to. Mastering how to make it is the single most important conjugation skill in beginning Japanese, because dozens of later structures build on it."},
        {h:"る-verbs", t:"Easiest: drop る, add て. たべる → たべて; みる → みて; ねる → ねて."},
        {h:"う-verbs — the sound groups", t:"う-verbs change based on their final syllable: ｜う/つ/る → って (かう→かって, まつ→まって, とる→とって) ｜ ぬ/ぶ/む → んで (しぬ→しんで, あそぶ→あそんで, のむ→のんで) ｜ く → いて (かく→かいて) ｜ ぐ → いで (いそぐ→いそいで) ｜ す → して (はなす→はなして). The famous exception: いく → いって (not いいて)."},
        {h:"Irregulars", t:"する → して; くる → きて. Memorize directly."},
        {h:"The te-form song (Marie's class version)", t:"This is the version your class uses, sung to 'This Old Man (Knick-knack Paddy-whack)': ♪ Oh い ち り (×2) — Oh い ち り to って ♪ Oh み に び (×2) — Oh み に び to んで ♪ き to いて ♪ ぎ to いで ♪ し to して ♪ And きて、して ♪ いきます is いって ♪ Now I know my te-forms ♪ — Note this version reads the verb's ます-stem ending (い・ち・り for って group, etc.) rather than the dictionary-form ending. Both ways work; pick whichever clicks. When stumped on a quiz, sing the line silently and the answer drops out."},
        {h:"Why mastering THIS unlocks everything", t:"It's worth pausing on why teachers make such a big deal of the て-form. Almost every useful thing you'll want to say past this point hangs off it: requests (てください), permission (てもいいです), prohibition (てはいけません), ongoing actions (ています — Lesson 7), sequences (て、…), and many more across Genki II. If your て-forms are automatic, all of those come almost for free. If they're shaky, every one of those structures stays slow. So this is the one conjugation genuinely worth over-practicing until it's reflexive."},
      ],
      examples:[
        {jp:"たべる → たべて", read:"たべる → たべて", en:"eat (る-verb): drop る, add て"},
        {jp:"かう → かって", read:"かう → かって", en:"buy (う/つ/る group → って)"},
        {jp:"のむ → のんで", read:"のむ → のんで", en:"drink (ぬ/ぶ/む group → んで)"},
        {jp:"かく → かいて　／　いく → いって", read:"かく → かいて　／　いく → いって", en:"write → かいて; go → いって (exception!)"},
      ],
      notes:[
        "る-verbs: drop る + て. Irregulars: して, きて.",
        "う-verb endings: う/つ/る→って, ぬ/ぶ/む→んで, く→いて, ぐ→いで, す→して.",
        "Big exception: いく → いって.",
      ],
      practice:[
        {type:"mc", q:"て-form of たべる?", choices:["たべて","たべって","たべで","たべいて"], a:0, ex:"る-verb: drop る, add て."},
        {type:"mc", q:"て-form of のむ (drink)?", choices:["のみて","のんで","のって","のいて"], a:1, ex:"む belongs to the ぬ/ぶ/む group → んで."},
        {type:"mc", q:"て-form of かく (write)?", choices:["かくて","かって","かいて","かいで"], a:2, ex:"く → いて."},
        {type:"mc", q:"What is the て-form of いく (go)?", choices:["いいて","いって","いきて","いくて"], a:1, ex:"いく is the famous exception: いって, not いいて."},
        {type:"fill", q:"て-form of かう (buy): ____", answer:"かって", ex:"う/つ/る group → って."},
        // ── Class verb drill (every verb from JPN1121 Class 8) ──
        {type:"fill", q:"⚡ Quick drill: まちます (wait) →", answer:"まって", ex:"ち is in the って group."},
        {type:"fill", q:"⚡ Quick drill: わかります (understand) →", answer:"わかって", ex:"り is in the って group."},
        {type:"fill", q:"⚡ Quick drill: よみます (read) →", answer:"よんで", ex:"み is in the んで group."},
        {type:"fill", q:"⚡ Quick drill: あそびます (play) →", answer:"あそんで", ex:"び is in the んで group."},
        {type:"fill", q:"⚡ Quick drill: しにます (die) →", answer:"しんで", ex:"に is in the んで group."},
        {type:"fill", q:"⚡ Quick drill: ききます (listen) →", answer:"きいて", ex:"き → いて."},
        {type:"fill", q:"⚡ Quick drill: およぎます (swim) →", answer:"およいで", ex:"ぎ → いで."},
        {type:"fill", q:"⚡ Quick drill: いそぎます (hurry) →", answer:"いそいで", ex:"ぎ → いで."},
        {type:"fill", q:"⚡ Quick drill: はなします (speak) →", answer:"はなして", ex:"し → して."},
        {type:"fill", q:"⚡ Quick drill: けします (turn off) →", answer:"けして", ex:"し → して."},
        {type:"fill", q:"⚡ Quick drill: かえします (return a thing) →", answer:"かえして", ex:"し → して — don't confuse with かえります (return home → かえって)!"},
        {type:"fill", q:"⚡ Quick drill: きます (come) →", answer:"きて", ex:"Irregular — memorize."},
        {type:"fill", q:"⚡ Quick drill: します (do) →", answer:"して", ex:"Irregular — memorize."},
        {type:"fill", q:"⚡ Quick drill: べんきょうします (study) →", answer:"べんきょうして", ex:"する compound → して."},
        // ── る-verbs from class ──
        {type:"fill", q:"⚡ あけます (open) →", answer:"あけて", ex:"る-verb: drop る, add て."},
        {type:"fill", q:"⚡ しめます (close) →", answer:"しめて", ex:"る-verb."},
        {type:"fill", q:"⚡ つけます (turn on) →", answer:"つけて", ex:"る-verb."},
        {type:"fill", q:"⚡ あびます (take a shower) →", answer:"あびて", ex:"る-verb."},
        {type:"fill", q:"⚡ でかけます (go out) →", answer:"でかけて", ex:"る-verb."},
        // ── Trap verbs (う-verbs that look like る-verbs) ──
        {type:"mc", q:"⚠️ TRAP: て-form of かえります (return home)?", choices:["かえて","かえって","かえりて","かいって"], a:1, ex:"かえる LOOKS like a る-verb but is actually an う-verb! り → って."},
        {type:"mc", q:"⚠️ TRAP: て-form of すわります (sit down)?", choices:["すわて","すわって","すわりて","すわいて"], a:1, ex:"すわる is a う-verb. り → って."},
        {type:"mc", q:"⚠️ TRAP: て-form of たちます (stand up)?", choices:["たちて","たって","たいて","たちって"], a:1, ex:"ち → って."},
        {type:"mc", q:"⚠️ TRAP: て-form of もちます (hold/carry)?", choices:["もちて","もって","もいて","もちって"], a:1, ex:"ち → って."},
        // ── Te-form usage ──
        {type:"translate", q:"Translate: 'Please open the door.' (door = ドア, open = あける)", answer:"ドアを あけてください。", accept:["ドアをあけてください","ドアをあけてください。"], ex:"あけて + ください = 'please open'."},
        {type:"translate", q:"Translate: 'Please hurry.' (hurry = いそぐ)", answer:"いそいでください。", accept:["いそいでください"], ex:"いそぐ → いそいで (ぎ→いで) + ください."},
        {type:"translate", q:"Translate: 'Please wait.' (wait = まつ)", answer:"まってください。", accept:["まってください"], ex:"まつ → まって (ち→って) + ください."},
      ],
    },
    {
      id:"6-2", title:"〜てください — making requests",
      summary:"Attach ください to the て-form to politely ask someone to do something.",
      sections:[
        {h:"How it works", t:"て-form + ください = 'please do ___'. ちょっと まってください = Please wait a moment. みてください = Please look. It's polite and very common — for instructions, asking favors, or giving directions."},
        {h:"Softening", t:"It's a polite request but still somewhat direct (a soft command). For extra politeness you'll later learn other forms, but 〜てください is your standard go-to at this level."},
      ],
      examples:[
        {jp:"ちょっと まってください。", read:"ちょっと まってください。", en:"Please wait a moment."},
        {jp:"きょうかしょを よんでください。", read:"きょうかしょを よんでください。", en:"Please read the textbook."},
        {jp:"なまえを かいてください。", read:"なまえを かいてください。", en:"Please write your name."},
      ],
      notes:[
        "Pattern: [verb て-form] + ください = 'please do ___'.",
        "Requires a correct て-form, so it's great practice for building て-forms.",
      ],
      practice:[
        {type:"mc", q:"How do you say 'Please wait'? (wait = まつ)", choices:["まちてください","まってください","まつください","まってくたさい"], a:1, ex:"まつ → まって (つ→って), then + ください."},
        {type:"fill", q:"きょうかしょを よん____ください。 (please read the textbook)", answer:"で", ex:"よむ → よんで (む group), then + ください."},
        {type:"translate", q:"Translate: 'Please write your name.' (name=なまえ, write=かく)", answer:"なまえを かいてください。", accept:["なまえをかいてください","なまえをかいてください。"], ex:"かく → かいて + ください."},
      ],
    },
    {
      id:"6-3", title:"〜てもいいです — granting permission",
      summary:"て-form + もいいです means 'may / it's okay to'. Add か to ask permission.",
      sections:[
        {h:"How it works", t:"て-form + もいいです = 'you may ___ / it's okay to ___'. ここに すわってもいいです = You may sit here. To ASK permission, add か: しゃしんを とってもいいですか = May I take a photo?"},
        {h:"Answering", t:"To grant: はい、いいです or どうぞ (go ahead). To refuse, you often use the prohibition form (next point) or a softer ちょっと…  (it's a bit…)."},
      ],
      examples:[
        {jp:"ここに すわってもいいですか。", read:"ここに すわってもいいですか。", en:"May I sit here?"},
        {jp:"しゃしんを とってもいいです。", read:"しゃしんを とってもいいです。", en:"You may take photos."},
        {jp:"トイレに いってもいいですか。", read:"トイレに いってもいいですか。", en:"May I go to the bathroom?"},
      ],
      notes:[
        "て-form + もいいです(か) = permission ('may I…?').",
        "Grant with どうぞ; soften a refusal with ちょっと….",
      ],
      practice:[
        {type:"mc", q:"How do you ask 'May I sit here?' (sit = すわる)", choices:["すわてもいいですか","すわってもいいですか","すわるもいいですか","すわりもいいですか"], a:1, ex:"すわる → すわって (う/つ/る group), + もいいですか."},
        {type:"fill", q:"しゃしんを とっ____もいいですか。 (May I take a photo?)", answer:"て", ex:"とる → とって, then もいいですか."},
        {type:"translate", q:"Translate: 'May I go to the bathroom?' (bathroom=トイレ, go=いく)", answer:"トイレに いってもいいですか。", accept:["トイレにいってもいいですか","トイレにいってもいいですか。"], ex:"いく → いって (exception) + もいいですか."},
      ],
    },
    {
      id:"6-4", title:"〜てはいけません — prohibition",
      summary:"て-form + はいけません means 'must not / may not'. The opposite of permission.",
      sections:[
        {h:"How it works", t:"て-form + はいけません = 'you must not ___ / ___ is not allowed'. ここで たばこを すってはいけません = You must not smoke here. It's a firm prohibition, used for rules. In casual speech it contracts to 〜ちゃいけない / 〜じゃいけない."},
        {h:"As an answer", t:"It's the natural negative response to a 〜てもいいですか question: 'May I…?' → いいえ、〜てはいけません ('No, you must not')."},
      ],
      examples:[
        {jp:"ここで たばこを すってはいけません。", read:"ここで たばこを すってはいけません。", en:"You must not smoke here."},
        {jp:"ここに はいってはいけません。", read:"ここに はいってはいけません。", en:"You must not enter here."},
        {jp:"しゃしんを とってはいけません。", read:"しゃしんを とってはいけません。", en:"You must not take photos."},
      ],
      notes:[
        "て-form + はいけません = prohibition ('must not').",
        "It's the firm 'no' answer to 〜てもいいですか.",
      ],
      practice:[
        {type:"mc", q:"How do you say 'You must not smoke here'? (smoke = すう)", choices:["すってはいけません","すいてはいけません","すうてはいけません","すってもいいです"], a:0, ex:"すう → すって (う group) + はいけません."},
        {type:"mc", q:"〜てはいけません expresses:", choices:["permission","prohibition","invitation","a request"], a:1, ex:"It marks something that must NOT be done."},
        {type:"translate", q:"Translate: 'You must not enter here.' (enter=はいる, here=ここ, use に)", answer:"ここに はいってはいけません。", accept:["ここにはいってはいけません","ここにはいってはいけません。"], ex:"はいる is a う-verb exception → はいって, then はいけません."},
      ],
    },
    {
      id:"6-5", title:"〜て、〜 — connecting actions in sequence",
      summary:"The て-form links verbs/clauses: 'do X, and (then) Y'. It chains a sequence.",
      sections:[
        {h:"How it works", t:"Ending a clause in the て-form and continuing means 'and (then)': おきて、シャワーを あびます = I wake up and take a shower. The actions happen in order. Only the FINAL verb shows the tense; the て-form clauses borrow their tense from it."},
        {h:"Also for reasons / manner", t:"て-form linking can also imply a light cause or manner ('and so'): あさごはんを たべて、がっこうへ いきます = I eat breakfast and (then) go to school. It's the everyday way to connect what would be separate English sentences."},
      ],
      examples:[
        {jp:"あさ おきて、シャワーを あびます。", read:"あさ おきて、シャワーを あびます。", en:"I wake up in the morning and take a shower."},
        {jp:"あさごはんを たべて、がっこうへ いきます。", read:"あさごはんを たべて、がっこうへ いきます。", en:"I eat breakfast and go to school."},
        {jp:"ともだちに あって、えいがを みました。", read:"ともだちに あって、えいがを みました。", en:"I met a friend and watched a movie."},
      ],
      notes:[
        "Only the final verb carries the tense; earlier て-form clauses inherit it.",
        "Order matters — actions are understood to happen in the sequence given.",
      ],
      practice:[
        {type:"mc", q:"'I wake up and take a shower' — how is おきる connected?", choices:["おきます、シャワー…","おきて、シャワーを あびます","おきると、シャワー…","おきてから シャワー"], a:1, ex:"て-form (おきて) links the first action to the next."},
        {type:"fill", q:"あさごはんを たべ__、がっこうへ いきます。 (eat breakfast and go to school)", answer:"て", ex:"たべる → たべて connects the two actions."},
        {type:"translate", q:"Translate: 'I met a friend and watched a movie.' (meet=あう, に friend; movie=えいが, past tense)", answer:"ともだちに あって、えいがを みました。", accept:["ともだちにあって、えいがをみました","ともだちにあってえいがをみました","ともだちにあって えいがをみました。"], ex:"あう → あって (う group); only the final verb みました shows past tense."},
      ],
    },
  ],
},

// ════════════════════════════════ LESSON 7 ════════════════════════════════
7: {
  intro: "Lesson 7 is where Japanese grammar takes a huge leap. You'll learn 〜ている (the progressive/resultant-state form built on the て-form), how to describe appearance and clothing with wearing verbs, and family vocabulary with its two sets of terms — humble for your own family, honorific for others'.",
  points: [
    {
      id:"7-1", title:"〜ています — ongoing actions and resultant states",
      summary:"て-form + います = 'is doing' OR 'is in a state that resulted from doing'. One form, two different meanings depending on the verb type.",
      sections:[
        {h:"The basic meaning: ongoing action", t:"The most obvious use is the progressive: what someone is doing right now. て-form + います describes an action in progress. いま テレビを みています = I am watching TV right now. This is the Japanese equivalent of '-ing': eating, sleeping, studying."},
        {h:"The deeper meaning: resultant state", t:"ています also describes a STATE that results from a completed action. 「けっこんしています」 doesn't mean 'is currently getting married' — it means 'is married', in the state that results from having gotten married. 「しんでいます」 = is dead. 「しっています」 = knows (is in the state of having learned). The action happened in the past; ています describes where that leaves things now."},
        {h:"How to tell which meaning applies", t:"Verb type is the guide. Action verbs with natural ongoing duration (watch, eat, study, run) → progressive (is -ing). Change-of-state verbs where the result matters more than the process (marry, die, arrive, know, live somewhere) → resultant state. 「にほんに すんでいます」 = lives in Japan (resultant state of having moved there)."},
        {h:"Negative and past", t:"Negative: 〜ていません (is not doing / is not in that state). Past progressive: 〜ていました (was doing). 「べんきょうしていませんでした」 = I was not studying."},
      ],
      examples:[
        {jp:"いま、テレビを みています。", read:"いま、テレビを みています。", en:"I am watching TV right now. (progressive)"},
        {jp:"たけしさんは けっこんしています。", read:"たけしさんは けっこんしています。", en:"Takeshi is married. (resultant state)"},
        {jp:"にほんに すんでいます。", read:"にほんに すんでいます。", en:"I live in Japan. (resultant state of having moved)"},
        {jp:"その ことばを しっていますか。", read:"その ことばを しっていますか。", en:"Do you know that word?"},
      ],
      notes:[
        "しっています (knows) / しりません (doesn't know) — NOT しっていません for the negative.",
        "すんでいます = lives (in a place). Mark the location with に: 〜に すんでいます.",
        "Change-of-state verbs (marry, die, arrive, know) → ています = resultant state, not progressive.",
      ],
      practice:[
        {type:"mc", q:"What does 「けっこんしています」 mean?", choices:["is getting married","is married (resultant state)","was married","will get married"], a:1, ex:"Change-of-state verb + ています = the result, not the process."},
        {type:"mc", q:"'I am studying now' (progressive):", choices:["べんきょうします","べんきょうしています","べんきょうしました","べんきょうしていました"], a:1, ex:"て-form + います for ongoing actions."},
        {type:"fill", q:"'I don't know' — which is correct? しっていません OR しりません?", answer:"しりません", ex:"しる (to know/come-to-know) → negative is しりません, not しっていません."},
        {type:"translate", q:"Translate: 'What is Mary doing right now?'", answer:"メアリーさんは いま なにを していますか。", accept:["メアリーさんはいまなにをしていますか","メアリーさんはいまなにをしていますか。"], ex:"なにを + して + います + か."},
        {type:"mc", q:"'I live in Tokyo' uses which pattern?", choices:["とうきょうに いきます","とうきょうに すんでいます","とうきょうで います","とうきょうに すみます"], a:1, ex:"すむ is change-of-state → すんでいます = the resultant state (where you now are)."},
      ],
    },
    {
      id:"7-2", title:"Wearing verbs + ています — describing appearance",
      summary:"Japanese has separate verbs for wearing different things. With ています they describe what someone is currently wearing.",
      sections:[
        {h:"The wearing verbs", t:"Unlike English's single 'wear', Japanese specifies: きる (きます) for upper body (shirts, jackets, kimono); はく (はきます) for lower body and feet (pants, skirts, shoes, socks); かぶる (かぶります) for the head (hats, caps); かける (かけます) for glasses; する (します) for accessories (ties, rings, necklaces)."},
        {h:"With ています = currently wearing", t:"All combine with ています to describe what someone is wearing right now (a resultant state — they put it on and are now wearing it). めがねを かけています = is wearing glasses. あおい シャツを きています = is wearing a blue shirt."},
        {h:"Chaining descriptions", t:"Stack descriptions using the て-form of adjectives. い-adj: たかい → たかくて. な-adj: きれい → きれいで. 「せが たかくて、めがねを かけています」 = is tall and wearing glasses."},
      ],
      examples:[
        {jp:"めがねを かけています。", read:"めがねを かけています。", en:"(She/he) is wearing glasses."},
        {jp:"あおい シャツを きています。", read:"あおい シャツを きています。", en:"(She/he) is wearing a blue shirt."},
        {jp:"ぼうしを かぶっています。", read:"ぼうしを かぶっています。", en:"(She/he) is wearing a hat."},
        {jp:"せが たかくて、かみが みじかいです。", read:"せが たかくて、かみが みじかいです。", en:"(She/he) is tall and has short hair."},
      ],
      notes:[
        "Upper body → きる. Lower body/feet → はく. Head → かぶる. Glasses → かける. Accessories → する.",
        "い-adj chain: drop い, add くて (たかい → たかくて). な-adj chain: add で (きれい → きれいで).",
      ],
      practice:[
        {type:"mc", q:"Which verb for wearing a shirt?", choices:["はきます","かぶります","きます","かけます"], a:2, ex:"きる = upper body clothing."},
        {type:"mc", q:"Which verb for wearing shoes?", choices:["きます","はきます","かぶります","します"], a:1, ex:"はく = lower body and feet."},
        {type:"fill", q:"めがねを ____ています。 (is wearing glasses)", answer:"かけ", ex:"かける → かけて + います."},
        {type:"translate", q:"'(She) is wearing a hat and glasses.'", answer:"ぼうしを かぶって、めがねを かけています。", accept:["ぼうしをかぶって、めがねをかけています","ぼうしをかぶってめがねをかけています。"], ex:"かぶる → かぶって (te-form) then + かけています."},
      ],
    },
    {
      id:"7-3", title:"Family vocabulary: own family vs. someone else's",
      summary:"Use humble terms for your own family and honorific terms when referring to others' family members.",
      sections:[
        {h:"Two sets of vocabulary", t:"When talking about YOUR OWN family to others, use plain/humble terms. When asking about or describing SOMEONE ELSE's family, use polite/honorific terms. This is a core politeness distinction in Japanese."},
        {h:"The key pairs", t:"Own (humble) → Others' (honorific): ちち → おとうさん (father); はは → おかあさん (mother); あに → おにいさん (older brother); あね → おねえさん (older sister); おとうと → おとうとさん (younger brother); いもうと → いもうとさん (younger sister). Honorific forms usually have the お prefix."},
        {h:"People counters", t:"Counting people: ひとり (1), ふたり (2), then さんにん, よにん, ごにん etc. for 3+. ひとりっこ = only child. きょうだいは ふたりいます = I have two siblings."},
      ],
      examples:[
        {jp:"ちちは いしゃです。", read:"ちちは いしゃです。", en:"My father is a doctor. (own → humble)"},
        {jp:"おとうさんは おいくつですか。", read:"おとうさんは おいくつですか。", en:"How old is your father? (other's → honorific)"},
        {jp:"きょうだいは ふたりいます。", read:"きょうだいは ふたりいます。", en:"I have two siblings."},
      ],
      notes:[
        "Use ちち/はは (humble) when talking about YOUR OWN family to others.",
        "Use おとうさん/おかあさん (honorific) when referring to someone ELSE's family.",
        "People counter: ひとり, ふたり (irregular), さんにん, よにん…",
      ],
      practice:[
        {type:"mc", q:"Talking about YOUR OWN mother, which word?", choices:["おかあさん","はは","かあさん","おはは"], a:1, ex:"Own family → humble. はは = my mother."},
        {type:"mc", q:"Asking about a friend's FATHER, which word?", choices:["ちち","おちち","おとうさん","ちちさん"], a:2, ex:"Others' family → honorific. おとうさん = (your) father."},
        {type:"fill", q:"'I have three siblings': きょうだいは ____います。", answer:"さんにんいます", accept:["さんにん います","さんにんいます","さんにん"], ex:"People counter: ひとり, ふたり, さんにん…"},
      ],
    },
  ],
},

// ════════════════════════════════ LESSON 8 ════════════════════════════════
8: {
  intro: "Lesson 8 introduces the plain form (also called short form), which is both the casual register of Japanese AND the grammatical building block for dozens of complex patterns. You'll also learn 〜と思います, the probability form でしょう, and the three giving/receiving verbs あげる/くれる/もらう.",
  points: [
    {
      id:"8-1", title:"Plain forms — the foundation of Japanese grammar",
      summary:"Plain forms are used in casual speech AND as the base for most complex grammar patterns. Every verb, adjective, and noun has four plain forms.",
      sections:[
        {h:"Why you need plain forms now", t:"You've been using polite forms (ます/です) so far. Plain forms appear in: (1) casual conversation with friends and family, (2) written Japanese — manga, novels, news, (3) grammar patterns that require a plain form regardless of the sentence's formality level. Learning them now unlocks an enormous amount of real Japanese."},
        {h:"Plain present of verbs", t:"The plain affirmative present IS the dictionary form: たべる, のむ, する, くる. You already know these. The plain negative: for る-verbs, replace る with ない (たべる → たべない). For う-verbs, change the final u-sound to its a-equivalent and add ない (のむ → のまない; かく → かかない; はなす → はなさない). Irregulars: する → しない; くる → こない. Special case: う-ending verbs — かう → かわない (not かあない)."},
        {h:"Plain past of verbs", t:"Plain affirmative past: take the て-form and change て→た / で→だ. たべて→たべた; のんで→のんだ; いって→いった. Plain negative past: take the plain negative (ない) and change it to なかった: たべない→たべなかった; のまない→のまなかった."},
        {h:"Plain forms of adjectives and nouns", t:"い-adjectives: the plain form IS the adjective (たかい = is expensive). Negative: たかくない. Past: たかかった. Past negative: たかくなかった. な-adjectives and nouns use だ for the plain form: しずかだ / がくせいだ. Negative: しずかじゃない. Past: しずかだった. Past negative: しずかじゃなかった."},
      ],
      examples:[
        {jp:"たべる / たべない / たべた / たべなかった", read:"たべる / たべない / たべた / たべなかった", en:"eat / don't eat / ate / didn't eat"},
        {jp:"のむ / のまない / のんだ / のまなかった", read:"のむ / のまない / のんだ / のまなかった", en:"drink / don't drink / drank / didn't drink"},
        {jp:"する / しない / した / しなかった", read:"する / しない / した / しなかった", en:"do / don't do / did / didn't do (irregular)"},
        {jp:"くる / こない / きた / こなかった", read:"くる / こない / きた / こなかった", en:"come / don't come / came / didn't come (irregular)"},
      ],
      notes:[
        "う-verb plain negative: change final -u to -a, add ない. Special: う-verbs ending in う → かう: かわない.",
        "する → しない (not すない). くる → こない (not くない). Memorize.",
        "Plain past = て-form with て→た / で→だ.",
      ],
      practice:[
        {type:"mc", q:"Plain negative of たべる?", choices:["たべない","たべぬ","たべません","たべなかった"], a:0, ex:"る-verb plain negative: replace る with ない."},
        {type:"mc", q:"Plain past of のむ?", choices:["のみた","のんだ","のまた","のむた"], a:1, ex:"のむ → のんで (te-form) → change で to だ = のんだ."},
        {type:"mc", q:"Plain negative of する?", choices:["すない","しない","せない","さない"], a:1, ex:"する is irregular: plain negative = しない."},
        {type:"fill", q:"Plain past negative of たべる: たべ____", answer:"なかった", ex:"Plain negative たべない → change ない to なかった."},
        {type:"translate", q:"Write the four plain forms of かく: present, negative, past, past-negative.", answer:"かく / かかない / かいた / かかなかった", accept:["かく、かかない、かいた、かかなかった","かく かかない かいた かかなかった"], ex:"neg: かか+ない; past: かいた (く→いて→いた); past neg: かかなかった."},
      ],
    },
    {
      id:"8-2", title:"〜と思います — 'I think that ~'",
      summary:"Plain form + と思います = my opinion or conjecture. Everything before と must be in plain form.",
      sections:[
        {h:"How it works", t:"Plain form clause + と思います = 'I think that ___.' The plain form of any verb, adjective, or noun sentence goes directly before と. おもしろいと思います = I think it's interesting. たかかったと思います = I think it was expensive. あめが ふると思います = I think it will rain."},
        {h:"Negative version", t:"To say 'I don't think X', negate the EMBEDDED CLAUSE, not おもいます. 「こないと思います」 = I think he won't come. NOT 「くると思いません」 (unnatural). You're saying 'I think [he won't come]', not 'I don't think [he'll come]'."},
        {h:"な-adjectives and nouns before と", t:"な-adjectives and nouns need だ before と思います: しずかだと思います (I think it's quiet). たけしさんは がくせいだと思います (I think Takeshi is a student)."},
      ],
      examples:[
        {jp:"おもしろいと思います。", read:"おもしろいと思います。", en:"I think it's interesting."},
        {jp:"あめが ふると思います。", read:"あめが ふると思います。", en:"I think it will rain."},
        {jp:"こないと思います。", read:"こないと思います。", en:"I think (he) won't come."},
      ],
      notes:[
        "Everything BEFORE と must be in PLAIN form. い-adj, verb: attach directly. な-adj/noun: add だ before と.",
        "Negate the embedded clause for 'I don't think X': こないと思います NOT くると思いません.",
      ],
      practice:[
        {type:"mc", q:"'I think it's interesting':", choices:["おもしろいですと思います","おもしろいと思います","おもしろと思います","おもしろいと思いません"], a:1, ex:"Plain form おもしろい directly before と."},
        {type:"mc", q:"'I think he won't come' — best expression:", choices:["くると思いません","こないと思います","くると思わない","こないと思いません"], a:1, ex:"Negate the embedded clause: こない (plain negative) + と思います."},
        {type:"fill", q:"'I think it was expensive': たかかった____思います。", answer:"と", ex:"Plain past (たかかった) + と + 思います."},
        {type:"translate", q:"'I think it will rain.' (rain = あめが ふる)", answer:"あめが ふると思います。", accept:["あめがふると思います","あめがふると思います。"], ex:"ふる (plain present) + と思います."},
      ],
    },
    {
      id:"8-3", title:"Giving and receiving: あげる, くれる, もらう",
      summary:"Three verbs for give/receive based on the direction of exchange relative to the speaker.",
      sections:[
        {h:"Why three verbs", t:"English has 'give' and 'receive'. Japanese tracks social direction more carefully: who is the insider (speaker's group) vs outsider affects the choice of verb."},
        {h:"あげる — I give to others", t:"The giver is the speaker or their in-group; recipient is outside. わたしは メアリーさんに プレゼントを あげました = I gave Mary a present. Recipient is marked with に."},
        {h:"くれる — others give to me", t:"The giver is outside; recipient is the speaker or their in-group. メアリーさんは わたしに プレゼントを くれました = Mary gave me a present. Because the recipient is the speaker, わたしに is often dropped."},
        {h:"もらう — I receive from others", t:"Describes receiving from the recipient's perspective. Giver is marked with に or から. わたしは メアリーさんに プレゼントを もらいました = I received a present from Mary."},
        {h:"The core rule", t:"Ask: who benefits? Speaker benefits (receives) → くれる or もらう. Speaker gives outward → あげる. くれる ALWAYS has the speaker or their people as the recipient."},
      ],
      examples:[
        {jp:"わたしは ともだちに ほんを あげました。", read:"わたしは ともだちに ほんを あげました。", en:"I gave a book to my friend. (あげる)"},
        {jp:"ともだちが わたしに ほんを くれました。", read:"ともだちが わたしに ほんを くれました。", en:"My friend gave me a book. (くれる)"},
        {jp:"わたしは ともだちに ほんを もらいました。", read:"わたしは ともだちに ほんを もらいました。", en:"I received a book from my friend. (もらう)"},
      ],
      notes:[
        "あげる = give (speaker→other). くれる = give (other→speaker). もらう = receive (speaker←other).",
        "With もらう, the giver is marked with に OR から — both are fine.",
      ],
      practice:[
        {type:"mc", q:"'My friend gave ME a book' — which verb?", choices:["あげました","くれました","もらいました","かしました"], a:1, ex:"くれる: outsider gives to the speaker."},
        {type:"mc", q:"'I gave my friend a book' — which verb?", choices:["あげました","くれました","もらいました","かりました"], a:0, ex:"あげる: speaker gives outward."},
        {type:"mc", q:"'I received a book from my friend' — which verb?", choices:["あげました","くれました","もらいました","かしました"], a:2, ex:"もらう: speaker receives."},
        {type:"fill", q:"ともだちが わたしに プレゼントを __ました。 (friend gave me)", answer:"くれ", ex:"くれる: others give to the speaker."},
        {type:"translate", q:"'I gave a present to Mary.' (present = プレゼント)", answer:"わたしは メアリーさんに プレゼントを あげました。", accept:["わたしはメアリーさんにプレゼントをあげました","メアリーさんにプレゼントをあげました。"], ex:"あげる: speaker gives outward to に."},
      ],
    },
  ],
},

// ════════════════════════════════ LESSON 9 ════════════════════════════════
9: {
  intro: "Lesson 9 covers past experience (〜たことがあります), want-to (〜たいです), comparisons with より and いちばん, and how to turn adjectives into adverbs. These patterns let you express opinions and desires naturally.",
  points: [
    {
      id:"9-1", title:"〜たことがあります — past experience",
      summary:"Plain past + ことがあります = 'I have done ~ before'. Focuses on whether an experience exists, not when.",
      sections:[
        {h:"How it works", t:"Take the plain past form of a verb and add ことがあります. This expresses a life experience — something you've done at some point in the past, with the focus on whether the experience exists, not when it happened. すしを たべたことがあります = I have eaten sushi (before)."},
        {h:"Negative: never done", t:"ことがありません = 'I have never ~'. まだ たべたことがありません = I still haven't eaten it yet. This is often more natural than just ことがありません."},
        {h:"Asking about experience", t:"〜たことがありますか = Have you ever ~? Natural short answers: はい、あります / いいえ、ありません."},
      ],
      examples:[
        {jp:"すしを たべたことがあります。", read:"すしを たべたことがあります。", en:"I have eaten sushi before."},
        {jp:"にほんに いったことがありません。", read:"にほんに いったことがありません。", en:"I have never been to Japan."},
        {jp:"かぶきを みたことがありますか。", read:"かぶきを みたことがありますか。", en:"Have you ever seen kabuki?"},
      ],
      notes:[
        "Verb must be in PLAIN PAST form (た/だ): たべた, いった, みた, した, きた.",
        "Do NOT use time words like 'yesterday' with this pattern — it's about lifetime experience.",
      ],
      practice:[
        {type:"mc", q:"'I have eaten sushi before' — correct form:", choices:["すしを たべることがあります","すしを たべたことがあります","すしを たべていたことがあります","すしを たべたことがありました"], a:1, ex:"Plain PAST (たべた) + ことがあります."},
        {type:"fill", q:"'I have never been to Japan.': にほんに いった__がありません。", answer:"こと", ex:"Plain past + ことがありません = have never done."},
        {type:"translate", q:"'Have you ever seen kabuki?' (kabuki = かぶき, see = みる)", answer:"かぶきを みたことがありますか。", accept:["かぶきをみたことがありますか","かぶきをみたことがありますか。"], ex:"みた (plain past) + ことがありますか."},
      ],
    },
    {
      id:"9-2", title:"〜たいです — want to do",
      summary:"ます-stem + たいです = want to do. Conjugates like an い-adjective. Only for the speaker's desire.",
      sections:[
        {h:"How it works", t:"Drop ます from the polite form to get the ます-stem, then add たいです. たべます → たべ → たべたいです (want to eat). いきます → いき → いきたいです (want to go). The たい ending conjugates like an い-adjective."},
        {h:"Conjugating たい", t:"Negative: たべたくないです (don't want to eat). Past: たべたかったです (wanted to eat). Past negative: たべたくなかったです (didn't want to eat). This parallels exactly how い-adjectives conjugate."},
        {h:"Object particle", t:"With たいです, the object can be を OR が. が is especially natural: すしが たべたいです (I want to eat sushi — feel a craving for it specifically). Both are correct."},
        {h:"Only for the speaker", t:"〜たいです only expresses the SPEAKER's desire in statements. For a third person's desire use 〜たがっています."},
      ],
      examples:[
        {jp:"にほんに いきたいです。", read:"にほんに いきたいです。", en:"I want to go to Japan."},
        {jp:"なにが たべたいですか。", read:"なにが たべたいですか。", en:"What do you want to eat?"},
        {jp:"コーヒーは のみたくないです。", read:"コーヒーは のみたくないです。", en:"I don't want to drink coffee."},
      ],
      notes:[
        "ます-stem + たい conjugates like an い-adj: たい/たくない/たかった/たくなかった.",
        "Object can be を OR が with たい. が is natural for cravings.",
        "Only for speaker's desire. Third person: 〜たがっています.",
      ],
      practice:[
        {type:"mc", q:"'I want to eat sushi':", choices:["すしを たべます","すしを たべたいです","すしを たべたいます","すしが たべます"], a:1, ex:"ます-stem (たべ) + たいです."},
        {type:"fill", q:"'I don't want to drink coffee': コーヒーを のみたく____。", answer:"ないです", accept:["ないです","ない"], ex:"たい → たくない (like い-adj negative)."},
        {type:"mc", q:"'I wanted to go to Japan' (past):", choices:["にほんに いきたいでした","にほんに いきたかったです","にほんに いきたくないです","にほんに いきましたかった"], a:1, ex:"たい past = たかった (い-adj past)."},
        {type:"translate", q:"'What do you want to eat?' (use なにが)", answer:"なにが たべたいですか。", accept:["なにがたべたいですか","なにがたべたいですか。","なにをたべたいですか。"], ex:"なにが (or なにを) + たべたいですか."},
      ],
    },
    {
      id:"9-3", title:"Comparisons: より, いちばん, and どちら",
      summary:"より = 'more than'; いちばん = 'the most'; どちら = 'which one (of two)'.",
      sections:[
        {h:"A より B のほうが — A is more ~ than B", t:"The thing being compared favorably comes with のほうが; the thing it's compared against gets より. とうきょうは おおさかより おおきいです = Tokyo is bigger than Osaka. Alternatively: おおさかより とうきょうのほうが おおきいです. Both orders work."},
        {h:"いちばん — the most", t:"いちばん + adjective = 'the most ~'. Add scope with 〜の中で (among ~). くだものの中で なにが いちばん すきですか = Among fruits, what do you like most?"},
        {h:"どちら / どれ", t:"Comparing two: AとBと どちらが ~ ですか. Three+: どれが. どちらも = both. どちらも すきです = I like both."},
      ],
      examples:[
        {jp:"とうきょうは おおさかより おおきいです。", read:"とうきょうは おおさかより おおきいです。", en:"Tokyo is bigger than Osaka."},
        {jp:"くだものの中で りんごが いちばん すきです。", read:"くだものの中で りんごが いちばん すきです。", en:"Among fruits, I like apples the most."},
        {jp:"コーヒーと おちゃと どちらが すきですか。", read:"コーヒーと おちゃと どちらが すきですか。", en:"Which do you prefer, coffee or tea?"},
      ],
      notes:[
        "より marks the lesser item. のほうが marks the greater item.",
        "いちばん + adj/verb = the most. Scope: 〜の中で.",
        "どちら for 2 items; どれ for 3+.",
      ],
      practice:[
        {type:"mc", q:"'Tokyo is bigger than Osaka.' Which particle marks Osaka (the lesser)?", choices:["は","が","より","のほうが"], a:2, ex:"より marks the thing being compared against."},
        {type:"fill", q:"'I like apples the most among fruits.': くだものの中で りんごが ____すきです。", answer:"いちばん", ex:"いちばん + verb = the most."},
        {type:"mc", q:"Comparing two options uses:", choices:["どれが","どちらが","どっちは","どのが"], a:1, ex:"どちら for exactly two options."},
        {type:"translate", q:"'Coffee is more expensive than tea.' (tea = おちゃ, expensive = たかい)", answer:"コーヒーは おちゃより たかいです。", accept:["コーヒーはおちゃよりたかいです","コーヒーはおちゃよりたかいです。","おちゃよりコーヒーのほうがたかいです。"], ex:"より marks the lesser; main clause has the greater item."},
      ],
    },
    {
      id:"9-4", title:"Adjective → adverb: 〜く and 〜に, and なる",
      summary:"い-adj → く; な-adj → に. Combined with なる (to become) these are essential patterns.",
      sections:[
        {h:"い-adjectives → く", t:"Drop い, add く. はやい → はやく (quickly). This is identical to forming the negative stem — just without ない. Modifies verbs: はやく はしります (runs fast)."},
        {h:"な-adjectives → に", t:"Add に to the stem. しずか → しずかに (quietly). じょうず → じょうずに (skillfully). じょうずに にほんごを はなします = speaks Japanese skillfully."},
        {h:"〜く/〜に + なる (to become)", t:"Adverb + なる = to become ~. おおきく なります (becomes big / grows up). じょうずに なりたいです (want to become good at it). This combo is everywhere in Japanese."},
      ],
      examples:[
        {jp:"はやく はしります。", read:"はやく はしります。", en:"I run fast. (はやい → はやく)"},
        {jp:"しずかに べんきょうします。", read:"しずかに べんきょうします。", en:"I study quietly. (しずか → しずかに)"},
        {jp:"にほんごが じょうずに なりたいです。", read:"にほんごが じょうずに なりたいです。", en:"I want to become good at Japanese."},
      ],
      notes:[
        "い-adj adverb: drop い, add く (はやい → はやく).",
        "な-adj adverb: add に (しずか → しずかに).",
        "〜く/〜に + なる = to become ~ (very common pattern).",
      ],
      practice:[
        {type:"fill", q:"はやい → adverb: ____", answer:"はやく", ex:"Drop い, add く."},
        {type:"fill", q:"しずか → adverb: ____", answer:"しずかに", ex:"な-adj: add に."},
        {type:"translate", q:"'I want to become good at Japanese.' (good at = じょうず)", answer:"にほんごが じょうずに なりたいです。", accept:["にほんごがじょうずになりたいです","にほんごをじょうずになりたいです","にほんごがじょうずになりたいです。"], ex:"じょうず → じょうずに + なりたいです."},
      ],
    },
  ],
},

// ════════════════════════════════ LESSON 10 ════════════════════════════════
10: {
  intro: "Lesson 10 is about expressing time relationships between events. You'll learn から (because), 前に (before), てから (after), つもり (plan to), and ために (in order to). These patterns are essential for telling stories and explaining your reasoning.",
  points: [
    {
      id:"10-1", title:"〜から — because (giving reasons)",
      summary:"Plain form clause + から = 'because ~'. The reason comes FIRST in Japanese, then the result.",
      sections:[
        {h:"How it works", t:"から attaches to the end of a clause to mark it as the reason for what follows. Japanese word order: REASON から、RESULT. The opposite of English. ねむいから、ねます = Because I'm sleepy, I'll sleep."},
        {h:"Plain form before から", t:"In natural speech, the clause before から uses plain form. ねむいから (plain い-adj), がくせいだから (plain noun), たかかったから (plain past adj), たべたから (plain past verb)."},
        {h:"Answering なぜ/どうして", t:"〜からです is the natural polite answer to 'why' questions. にほんに いきたいからです = Because I want to go to Japan."},
      ],
      examples:[
        {jp:"ねむいから、ねます。", read:"ねむいから、ねます。", en:"Because I'm sleepy, I'll sleep."},
        {jp:"あめが ふっているから、でかけません。", read:"あめが ふっているから、でかけません。", en:"Because it's raining, I won't go out."},
        {jp:"にほんが すきだから、にほんごを べんきょうしています。", read:"にほんが すきだから、にほんごを べんきょうしています。", en:"Because I like Japan, I'm studying Japanese."},
      ],
      notes:[
        "Order: [reason] から [result]. Reason FIRST.",
        "Plain form before から in most contexts.",
        "Polite answer form: 〜からです.",
      ],
      practice:[
        {type:"mc", q:"'Because I'm sleepy, I'll sleep.' Japanese order:", choices:["ねます、ねむいから","ねむいから、ねます","ねむいので、ねます","ねます、だからねむい"], a:1, ex:"[reason] から、[result]. Reason first."},
        {type:"fill", q:"'Because I like Japan': にほんが すきだ____", answer:"から", ex:"Reason clause + から."},
        {type:"translate", q:"'Because it's raining, I won't go out.' (rain = あめが ふる, go out = でかける)", answer:"あめが ふっているから、でかけません。", accept:["あめがふっているから、でかけません","あめがふるから、でかけません","あめがふっているからでかけません。"], ex:"[reason] ふっているから + [result] でかけません."},
      ],
    },
    {
      id:"10-2", title:"〜前に / 〜てから — before and after",
      summary:"Dictionary form + 前に = before doing. て-form + から = after doing (emphasizes completion).",
      sections:[
        {h:"〜前に — before ~", t:"Dictionary form (plain non-past) + 前に = before doing ~. ねる まえに、はを みがきます = I brush my teeth before going to sleep. The verb before 前に is ALWAYS plain non-past, even in past-tense sentences, because the action is always 'in the future' relative to what precedes it."},
        {h:"〜てから — after doing", t:"て-form + から = after doing ~ and then doing something else. しゅくだいを してから、テレビを みます = After doing homework, I watch TV. This emphasizes that X is completed before Y begins."},
        {h:"て vs てから", t:"て chains fluidly (and then). てから emphasizes completion before the next action. おきて、シャワーをあびます (wake up then shower) vs おきてから シャワーをあびます (after fully waking up, THEN shower)."},
      ],
      examples:[
        {jp:"ねる まえに、はを みがきます。", read:"ねる まえに、はを みがきます。", en:"I brush my teeth before going to sleep."},
        {jp:"しゅくだいを してから、テレビを みます。", read:"しゅくだいを してから、テレビを みます。", en:"After doing homework, I watch TV."},
        {jp:"にほんに いく まえに、にほんごを べんきょうします。", read:"にほんに いく まえに、にほんごを べんきょうします。", en:"I'll study Japanese before going to Japan."},
      ],
      notes:[
        "〜前に verb: ALWAYS plain non-past (dictionary form), even in past sentences.",
        "〜てから: emphasizes completing the first action before starting the second.",
      ],
      practice:[
        {type:"mc", q:"'Before sleeping' — which verb form?", choices:["ねて まえに","ねた まえに","ねる まえに","ねます まえに"], a:2, ex:"Dictionary form (non-past) + まえに."},
        {type:"fill", q:"'After doing homework, I watch TV': しゅくだいを して____、テレビを みます。", answer:"から", ex:"て-form + から = after doing (emphasizes completion)."},
        {type:"translate", q:"'I'll study Japanese before going to Japan.'", answer:"にほんに いく まえに、にほんごを べんきょうします。", accept:["にほんにいくまえに、にほんごをべんきょうします","にほんにいくまえににほんごをべんきょうします","にほんにいくまえに、にほんごをべんきょうします。"], ex:"いく (dictionary form) + まえに."},
      ],
    },
    {
      id:"10-3", title:"〜つもりです — plans and intentions",
      summary:"Dictionary form + つもりです = personal plan or firm intention.",
      sections:[
        {h:"How it works", t:"Plain present + つもりです = I intend to / I plan to. にほんに いく つもりです = I plan to go to Japan. Stronger than just using a future ます — it implies personal resolve. Negative: plain negative + つもり: いかない つもりです = I don't plan to go."},
        {h:"つもり vs よてい", t:"つもり = personal intention/resolve. よてい = externally scheduled plan. 「にほんに いく よていです」 = I have a scheduled trip. 「にほんに いく つもりです」 = I intend to go (personal resolve)."},
      ],
      examples:[
        {jp:"にほんに いく つもりです。", read:"にほんに いく つもりです。", en:"I plan to go to Japan."},
        {jp:"にほんに いかない つもりです。", read:"にほんに いかない つもりです。", en:"I don't plan to go to Japan."},
        {jp:"らいねん、しごとを やめる つもりです。", read:"らいねん、しごとを やめる つもりです。", en:"I intend to quit my job next year."},
      ],
      notes:[
        "Dict form + つもり = plan to. Plain negative + つもり = plan NOT to.",
        "つもり = personal resolve. よてい = scheduled plan.",
      ],
      practice:[
        {type:"mc", q:"'I plan to go to Japan':", choices:["にほんに いきます つもりです","にほんに いく つもりです","にほんに いって つもりです","にほんに いかない つもりです"], a:1, ex:"Dictionary form (いく) + つもりです."},
        {type:"fill", q:"'I don't plan to go': にほんに いか____ つもりです。", answer:"ない", ex:"Plain negative (いかない) + つもりです."},
        {type:"translate", q:"'I intend to study Japanese next year.' (next year = らいねん)", answer:"らいねん、にほんごを べんきょうする つもりです。", accept:["らいねん、にほんごをべんきょうするつもりです","らいねんにほんごをべんきょうするつもりです。"], ex:"べんきょうする (dict form) + つもりです."},
      ],
    },
  ],
},

// ════════════════════════════════ LESSON 11 ════════════════════════════════
11: {
  intro: "Lesson 11 introduces the conditional 〜と (for automatic consequences), the potential form (can do), listing reasons with 〜し, and the two そうです patterns (looks like vs. I heard that). These are all extremely common in real Japanese.",
  points: [
    {
      id:"11-1", title:"〜と — if/when (automatic consequence)",
      summary:"Plain form + と = when X happens, Y automatically follows. Used for facts, directions, and natural consequences.",
      sections:[
        {h:"How it works", t:"Plain form + と describes a natural, automatic consequence: whenever X happens, Y happens. Used for: directions (まがると、えきがあります = if you turn, the station is there), natural laws (はるに なると、あたたかくなります = when spring comes, it gets warm), habitual truths (ボタンを おすと、ドアが あきます = when you press the button, the door opens)."},
        {h:"What makes it different from other conditionals", t:"Japanese has multiple 'if' forms. と is specifically for natural/automatic consequences, directions, and factual sequences. It CANNOT be followed by requests, suggestions, or volitional actions. For those, use たら."},
        {h:"Great for directions", t:"Step-by-step directions use と constantly: 「まっすぐ いくと、こうさてんが あります。みぎに まがると、えきが みえます。」"},
      ],
      examples:[
        {jp:"みぎに まがると、えきが あります。", read:"みぎに まがると、えきが あります。", en:"If you turn right, the station is there."},
        {jp:"はるに なると、さくらが さきます。", read:"はるに なると、さくらが さきます。", en:"When spring comes, the cherry blossoms bloom."},
        {jp:"このボタンを おすと、ドアが あきます。", read:"このボタンを おすと、ドアが あきます。", en:"When you press this button, the door opens."},
      ],
      notes:[
        "と = natural/automatic consequence. NOT for one-time events, requests, or wishes.",
        "Second clause cannot be a request or suggestion with と — use たら for those.",
      ],
      practice:[
        {type:"mc", q:"Which situation fits 〜と best?", choices:["If you study, please pass","When spring comes, it gets warm","If you go to Japan, eat sushi (request)","If I had money, I'd buy it (one-time)"], a:1, ex:"と = natural automatic consequence. Spring → warmth is factual."},
        {type:"fill", q:"'If you turn right, the station is there.': みぎに まがる____、えきが あります。", answer:"と", ex:"と for natural consequence."},
        {type:"translate", q:"'When you press this button, the door opens.' (press = おす, door = ドア, open = あく)", answer:"このボタンを おすと、ドアが あきます。", accept:["このボタンをおすと、ドアがあきます","このボタンをおすとドアがあきます","このボタンをおすと、ドアがあきます。"], ex:"おす (dict form) + と + natural result."},
      ],
    },
    {
      id:"11-2", title:"Potential form — can do",
      summary:"The potential form expresses ability or possibility. Forms differently by verb group.",
      sections:[
        {h:"Building the potential", t:"る-verbs: replace る with られる (たべる → たべられる). Casual speech often drops ら: たべれる. う-verbs: change final u-sound to e-equivalent and add る (のむ → のめる; かく → かける; はなす → はなせる; まつ → まてる). Irregulars: する → できる; くる → こられる."},
        {h:"Object particle", t:"With potential verbs, the object often takes が instead of を. にほんごが はなせます (I can speak Japanese). が is especially natural with potential, though を is also correct."},
        {h:"できる", t:"できる (from する) means 'can do' and is the most versatile potential verb. にほんごが できます = I can do Japanese / I know Japanese. できるだけ = as much as possible."},
      ],
      examples:[
        {jp:"にほんごが はなせます。", read:"にほんごが はなせます。", en:"I can speak Japanese."},
        {jp:"さしみは たべられません。", read:"さしみは たべられません。", en:"I can't eat sashimi."},
        {jp:"ピアノが できます。", read:"ピアノが できます。", en:"I can play piano."},
      ],
      notes:[
        "る-verb: replace る with られる. う-verb: u-row → e-row + る.",
        "する → できる; くる → こられる. Memorize.",
        "Object often takes が with potential (though を is also correct).",
      ],
      practice:[
        {type:"mc", q:"Potential form of たべる:", choices:["たべれます","たべられます","たべます","たべれる"], a:1, ex:"る-verb: replace る with られる → たべられます."},
        {type:"mc", q:"Potential form of のむ:", choices:["のまれます","のみます","のめます","のむれます"], a:2, ex:"う-verb: む → め + る → のめる → のめます."},
        {type:"fill", q:"する → potential form: ____", answer:"できる", accept:["できます","できる"], ex:"する → できる (irregular)."},
        {type:"translate", q:"'I can speak Japanese.' (use が)", answer:"にほんごが はなせます。", accept:["にほんごがはなせます","にほんごがはなせます。","にほんごをはなせます。"], ex:"はなす → はなせる → はなせます."},
        {type:"mc", q:"'I can't eat sashimi' (さしみ):", choices:["さしみを たべます","さしみが たべられません","さしみを たべません","さしみが たべません"], a:1, ex:"Potential negative: たべられません."},
      ],
    },
    {
      id:"11-3", title:"〜し and 〜そうです",
      summary:"し lists multiple reasons ('and also…'). そうです has two patterns: looks like (observation) vs I heard (hearsay).",
      sections:[
        {h:"〜し — listing reasons", t:"し at the end of a clause adds it to a list of reasons. Unlike から (one reason), し implies multiple supporting factors. やすいし、おいしいし、このレストランが すきです = It's cheap, and delicious, and I like this restaurant. The final conclusion clause doesn't need し."},
        {h:"Pattern 1: [adj stem/verb stem] + そうです — 'looks like'", t:"Built from the adjective/verb STEM. Drop い from い-adj (おいしい → おいし + そうです = おいしそう). Drop だ from な-adj. Use ます-stem of verbs (ふり + そうです = ふりそうです). This is YOUR OWN direct observation."},
        {h:"Pattern 2: [plain form] + そうです — 'I heard that'", t:"Uses the FULL plain form before そうです. あの えいがは おもしろいそうです = I heard that movie is interesting. This is secondhand/hearsay information. The key difference: おいしそうです (stem + そう = looks delicious from observation) vs おいしいそうです (plain + そう = I heard it's delicious)."},
      ],
      examples:[
        {jp:"このへやは ひろいし、しずかだし、いいです。", read:"このへやは ひろいし、しずかだし、いいです。", en:"This room is spacious and quiet — it's great. (listing reasons with し)"},
        {jp:"このケーキは おいしそうです。", read:"このケーキは おいしそうです。", en:"This cake looks delicious. (observation — stem + そう)"},
        {jp:"あの えいがは おもしろいそうです。", read:"あの えいがは おもしろいそうです。", en:"I heard that movie is interesting. (hearsay — plain form + そう)"},
      ],
      notes:[
        "し = 'and also, not only that' — stacks multiple reasons.",
        "Looks like: ADJ STEM (drop い/だ) + そう. Hearsay: FULL PLAIN FORM + そうです.",
        "いい → よさそうです (looks good) — irregular stem.",
      ],
      practice:[
        {type:"mc", q:"'This cake looks delicious' (you're looking at it):", choices:["おいしいそうです","おいしそうです","おいしだそうです","おいしくそうです"], a:1, ex:"Observation: drop い from おいしい → おいし + そうです."},
        {type:"mc", q:"'I heard that movie is interesting' — correct form:", choices:["おもしろそうです","おもしろだそうです","おもしろいそうです","おもしろくそうです"], a:2, ex:"Hearsay: FULL plain form おもしろい + そうです."},
        {type:"fill", q:"'It looks like it's going to rain.' (ふる, ます-stem = ふり): あめが ふり____。", answer:"そうです", ex:"Verb ます-stem + そうです = observation of imminent action."},
        {type:"fill", q:"'This room is spacious and quiet and nice.' (use し): このへやは ひろい__、しずかだ__、いいです。", answer:"し、し", accept:["し","し、し","しし"], ex:"Plain form + し for stacking reasons."},
      ],
    },
  ],
},

// ════════════════════════════════ LESSON 12 ════════════════════════════════
12: {
  intro: "Lesson 12 is the final chapter of Genki I. It brings together 〜んです (the explanatory んだ pattern), the conditional 〜たら, the passive voice, and giving/receiving favors with 〜てあげる/くれる/もらう. Mastering this lesson means you're ready for Genki II.",
  points: [
    {
      id:"12-1", title:"〜んです / 〜んだ — explanation and emphasis",
      summary:"Plain form + んです adds an explanatory or emotional tone: 'the thing is…', 'you see…', 'it's because…'",
      sections:[
        {h:"What it does", t:"んです (polite) / んだ (casual) attaches to a plain form clause and signals that you are EXPLAINING something, seeking an explanation, or adding emotional emphasis. Without it, statements can sound flat or abrupt. With it, there's implied context: 'I'm telling you this because it's relevant / because you're wondering.'"},
        {h:"Seeking explanation: 〜んですか", t:"On questions, んですか invites an explanation and sounds softer than a plain question. 「どうして こなかったんですか」 = How come you didn't come? (softer, more empathetic than 「なぜ きませんでしたか」)."},
        {h:"Giving explanation: 〜んです", t:"On statements, んです signals 'here's my explanation'. 「かぜを ひいたんです」 = (The thing is) I caught a cold. It's offering the information as relevant context — not just a bare fact."},
        {h:"How to form it", t:"Plain form + んです. For nouns and な-adjectives, add な before んです: がくせいなんです. い-adjectives and verbs attach directly: たかいんです, たべたんです."},
      ],
      examples:[
        {jp:"どうして こなかったんですか。", read:"どうして こなかったんですか。", en:"How come you didn't come? (softer — seeking explanation)"},
        {jp:"かぜを ひいたんです。", read:"かぜを ひいたんです。", en:"(The thing is) I caught a cold."},
        {jp:"あたまが いたいんです。", read:"あたまが いたいんです。", en:"I have a headache, you see."},
      ],
      notes:[
        "Plain form + んです. Noun/な-adj: add な before ん → がくせいなんです.",
        "〜んですか on a question = you noticed something and want the explanation.",
        "Very common in real speech — sentences without it can sound blunt in contexts calling for explanation.",
      ],
      practice:[
        {type:"mc", q:"'How come you didn't come?' (soft/explanatory):", choices:["どうして きませんでしたか","どうして こなかったんですか","なぜ きませんか","どうして くるんですか"], a:1, ex:"〜んですか = seeking explanation, softer tone."},
        {type:"fill", q:"'I caught a cold (you see)': かぜを ひいた____。", answer:"んです", accept:["んです","んだ"], ex:"Plain past + んです = providing explanation."},
        {type:"mc", q:"For a noun before んです, you need:", choices:["を before ん","な before ん","の before ん","は before ん"], a:1, ex:"Noun/な-adj + な + んです: がくせいなんです."},
        {type:"translate", q:"'I have a headache, you see.' (headache = あたまが いたい)", answer:"あたまが いたいんです。", accept:["あたまがいたいんです","あたまがいたいんです。","あたまがいたいんだ。"], ex:"い-adj plain (いたい) + んです directly."},
      ],
    },
    {
      id:"12-2", title:"〜たら — the most flexible conditional",
      summary:"Plain past + ら = 'if/when X happens/ed'. Works for hypotheticals, one-time events, requests, and wishes — things と cannot handle.",
      sections:[
        {h:"How it forms", t:"Take the plain past form (た/だ) and add ら. たべたら = if I eat / after I eat. いったら = if I go. Applies identically to all verb types, adjectives, and nouns."},
        {h:"What たら can do that と can't", t:"と only works for natural automatic consequences. たら is the most flexible conditional. It allows: hypotheticals (もし おかねが あったら = if I had money), one-time events, requests in the second clause (うちに ついたら、でんわしてください = when you get home, please call me), and wishes. The second clause can be a command, request, or wish — impossible with と."},
        {h:"Temporal use", t:"たら is also used for 'when X happens, then Y'. 「にほんに いったら、すしを たべました」 = When I went to Japan, I ate sushi. The first event sets the scene for the second."},
      ],
      examples:[
        {jp:"うちに ついたら、でんわしてください。", read:"うちに ついたら、でんわしてください。", en:"When you get home, please call me."},
        {jp:"もし おかねが あったら、にほんに いきます。", read:"もし おかねが あったら、にほんに いきます。", en:"If I had money, I would go to Japan."},
        {jp:"にほんに いったら、すしを たべました。", read:"にほんに いったら、すしを たべました。", en:"When I went to Japan, I ate sushi."},
      ],
      notes:[
        "Form: plain past (た/だ) + ら.",
        "Unlike と, たら CAN have requests/commands/wishes in the second clause.",
        "もし (if) is optional but adds emphasis to hypotheticals.",
      ],
      practice:[
        {type:"mc", q:"Which conditional can be followed by a request (〜てください)?", choices:["〜と","〜たら","Both","Neither"], a:1, ex:"たら can have requests in the second clause. と cannot."},
        {type:"fill", q:"'When you get home, please call me.': うちに つい____、でんわしてください。", answer:"たら", ex:"ついた (plain past of つく) + ら = ついたら."},
        {type:"translate", q:"'If I had money, I would go to Japan.' (use もし)", answer:"もし おかねが あったら、にほんに いきます。", accept:["もしおかねがあったら、にほんにいきます","もしおかねがあったらにほんにいきます","おかねがあったら、にほんにいきます。"], ex:"あった (plain past of ある) + ら = あったら."},
        {type:"mc", q:"Form of たら conditional:", choices:["plain present + ら","plain past + ら","て-form + ら","ます-stem + ら"], a:1, ex:"Plain past (た/だ) + ら."},
      ],
    },
    {
      id:"12-3", title:"Passive voice — 〜られます",
      summary:"The passive form describes being on the receiving end of an action, often with a nuance of inconvenience.",
      sections:[
        {h:"Forming the passive", t:"る-verbs: replace る with られる (same form as potential — context distinguishes them). う-verbs: change final u-sound to a-equivalent and add れる (のむ → のまれる; かく → かかれる; はなす → はなされる). Irregulars: する → される; くる → こられる."},
        {h:"Sentence structure", t:"In passive sentences, the thing affected becomes the subject (は/が). The agent (the doer) is marked with に. 「わたしは せんせいに ほめられました」 = I was praised by the teacher."},
        {h:"The suffering passive", t:"Japanese passive frequently expresses that something happened TO you and was inconvenient — the 'suffering passive'. 「あめに ふられました」 = I got rained on. 「ともだちに こられて、べんきょうできませんでした」 = My friend came over (on me) and I couldn't study. Distinctly Japanese — no direct English equivalent."},
      ],
      examples:[
        {jp:"わたしは せんせいに ほめられました。", read:"わたしは せんせいに ほめられました。", en:"I was praised by the teacher."},
        {jp:"わたしは ははに しかられました。", read:"わたしは ははに しかられました。", en:"I was scolded by my mother."},
        {jp:"さいふを ぬすまれました。", read:"さいふを ぬすまれました。", en:"My wallet was stolen (from me)."},
      ],
      notes:[
        "Passive: る-verb → られる; う-verb → a-row + れる; する → される; くる → こられる.",
        "Agent (doer) is marked with に. Affected person is the grammatical subject.",
        "Suffering passive: even neutral events can imply inconvenience to the speaker.",
      ],
      practice:[
        {type:"mc", q:"Passive form of たべる:", choices:["たべれる","たべられる","たべさせる","たべされる"], a:1, ex:"る-verb passive: replace る with られる."},
        {type:"mc", q:"Passive form of のむ:", choices:["のまれる","のみられる","のめる","のまる"], a:0, ex:"う-verb passive: む → ま + れる = のまれる."},
        {type:"fill", q:"'I was scolded by my mother.': わたしは ははに しかられ____。", answer:"ました", ex:"しかる → しかられる (passive) → しかられました (past polite)."},
        {type:"translate", q:"'I was praised by the teacher.' (praise = ほめる)", answer:"わたしは せんせいに ほめられました。", accept:["わたしはせんせいにほめられました","せんせいにほめられました。","せんせいにほめられました"], ex:"せんせい + に + ほめられました (passive past)."},
      ],
    },
    {
      id:"12-4", title:"〜てあげる / くれる / もらう — doing favors",
      summary:"Attach the giving/receiving verbs to the て-form to describe doing an action AS a favor. Same direction rules as the object verbs.",
      sections:[
        {h:"Extending the giving verbs to actions", t:"The same あげる/くれる/もらう from Lesson 8 attach to the て-form to describe doing an action as a favor. Direction rules are identical: てあげる = I do X for someone (I give the action outward); てくれる = someone does X for me (they give me the action); てもらう = I receive the action / have someone do X for me."},
        {h:"〜てあげます", t:"て-form + あげます = I do X for (someone). おしえてあげました = I taught them (as a favor for them). Use with care — overuse can sound condescending, as if emphasizing your own generosity."},
        {h:"〜てくれます", t:"て-form + くれます = someone does X for me. せんせいが おしえてくれました = The teacher taught me (did the favor of teaching). Naturally positive — you're acknowledging a benefit received."},
        {h:"〜てもらいます and requesting", t:"て-form + もらいます = I have someone do X / receive the action. 〜てもらえますか / 〜てもらえませんか = could I have you do ~? This is often softer and more polite than てください for requests."},
      ],
      examples:[
        {jp:"ともだちに くるまを かしてあげました。", read:"ともだちに くるまを かしてあげました。", en:"I lent my car to a friend (as a favor)."},
        {jp:"せんせいが かんじを おしえてくれました。", read:"せんせいが かんじを おしえてくれました。", en:"The teacher taught me kanji (as a favor for me)."},
        {jp:"ともだちに にほんごを おしえてもらいました。", read:"ともだちに にほんごを おしえてもらいました。", en:"I had a friend teach me Japanese."},
        {jp:"てつだって もらえますか。", read:"てつだって もらえますか。", en:"Could you help me? (softer than 'please help')"},
      ],
      notes:[
        "てあげる = do for someone. てくれる = done for me. てもらう = I receive the action.",
        "てもらえますか = 'could you please ~?' — a very polite request form.",
        "Careful with てあげる — can sound patronizing if overused.",
      ],
      practice:[
        {type:"mc", q:"'The teacher taught me (as a favor)' — which pattern?", choices:["せんせいに おしえてあげました","せんせいが おしえてくれました","せんせいを おしえてもらいました","せんせいに おしえてもらいました"], a:1, ex:"てくれる: teacher (outsider) does favor for the speaker."},
        {type:"mc", q:"'Could you help me?' (polite request using もらう):", choices:["てつだってください","てつだってあげますか","てつだってもらえますか","てつだってくれてください"], a:2, ex:"てもらえますか = 'could I receive the favor of you doing ~?'"},
        {type:"fill", q:"'I had my friend teach me Japanese.': ともだちに にほんごを おしえて____ました。", answer:"もらい", ex:"てもらう: I receive the favor/action."},
        {type:"translate", q:"'The teacher taught me kanji.' (using くれる)", answer:"せんせいが かんじを おしえてくれました。", accept:["せんせいがかんじをおしえてくれました","せんせいがかんじをおしえてくれました。"], ex:"てくれる: outsider does something beneficial for the speaker."},
      ],
    },
  ],
},

};
