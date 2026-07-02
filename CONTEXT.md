# What this workspace is for

Marie is building a public Japanese study website with a private admin panel.
The site is her personal Genki-aligned study hub, styled retro-MySpace (pastel pink, glitter, VT323/Press Start fonts, scrolling banners).
It is deployed on Netlify. Hosting is static; dynamic behavior is handled client-side in JS.

---

## Site architecture

### Hosting and deployment
- Host: Netlify (free tier), auto-deploys from GitHub repo `rosearcanum/Japanese-Learning-Tracker`
- No build step. All files are raw HTML/CSS/JS served as-is.
- Custom domain: to be connected (Marie owns or is acquiring one)

### File map
```
/
├── index.html          ← main app shell, all tabs, both modes (study + garden)
├── style.css           ← all styles, retro MySpace layer + garden theme override
├── app.js              ← all tab logic, flashcards, quiz, stats, kanji, journal, mode switch
├── grammar.js          ← window.GRAMMAR — in-depth grammar content for Genki L1–6
├── content-loader.js   ← fetches blog/decks/lessons/garden entries from /content/ via GitHub API
├── netlify.toml        ← redirect rule for /admin/
├── admin/
│   ├── index.html      ← Decap CMS entry point
│   └── config.yml      ← CMS schema (blog posts, flashcard decks, lesson notes, garden entries)
├── content/
│   ├── manifest.json   ← fallback file list for content-loader
│   ├── blog/           ← .md files, one per post
│   ├── decks/          ← .md files, one per custom flashcard deck
│   ├── lessons/        ← .md files, one per lesson note (created by admin panel)
│   └── garden/         ← .md files, drawings/stories/diary entries (type field distinguishes them)
└── media/uploads/      ← images uploaded via Decap CMS
```

### Tabs (in order)
| Tab | Label | What it does |
|-----|-------|--------------|
| Home | 🌸 Home | Progress bars, vocab mastery count, lesson completion, journal entry count, study calendar |
| Lessons | 📚 Lessons | Genki I L1–12 chips; sub-tabs: Grammar Summary, In-Depth + Practice, Vocab, Extra Vocab, Kanji, My Notes |
| Kanji | 🖊 Kanji | Daily 5 kanji (rotates by date), full kanji bank grid; data live-fetched from Jo-Mako sheet |
| Quiz | 🌟 Quiz | 4 questions per lesson, multiple choice, score feedback |
| Cards | 🃏 Cards | Flashcard deck from all Genki I vocab; filter by lesson; custom decks from /content/decks/ merge in |
| Blog | 📓 Blog | Public blog posts fetched from /content/blog/ via GitHub API; Marie authors in /admin/ |
| Resources | 🔗 Links | Direct links to Jo-Mako sheets, Jisho, Anki, HelloTalk, Cure Dolly, etc. |

---

## Two modes: Study vs. 🌙 Secret Garden

The site now has two visual "modes" sharing one shell (`index.html`, one set
of `.panel`/`.pill`/`.btn` CSS components, one `nav()` function). A toggle
button in the topbar (`toggleMode()` in app.js) swaps between them; the
choice persists in `localStorage` (`jp-mode`).

- **Study mode** (default) — the 8 tabs above, pastel-pink sakura theme
- **Garden mode** — personal/creative space, dark twilight-purple theme
  (`body.mode-garden` CSS override — same variable names, so all existing
  components reskin without duplicated CSS)

| Garden tab | What it does |
|-----|--------------|
| Garden | Landing feed merging blog posts + garden entries + study progress, newest first. Placeholder panel marks where a clickable garden-scene map (Phase 2) will go. |
| Drawings | Card grid of `type: drawing` entries from `content/garden/` |
| Stories | Card grid of `type: story` entries |
| Diary | Card grid of `type: diary` entries |

**Not actually private.** Garden mode is a different theme and a
not-linked-in-study-nav section — it is not access-controlled. Everything in
`content/garden/` is public, same as blog posts, since it lives in the public
GitHub repo. Real privacy for diary entries would need the Supabase auth
layer already planned for community features.

---

## Data sources

### Jo-Mako kanji sheet (live CSV fetch)
- URL: `https://docs.google.com/spreadsheets/d/1056uW4iIObSuwptN5Xpbg0UbOy9ALvxMUIxQbl6QfUI/gviz/tq?tqx=out:csv&sheet=Kanji`
- Sheet must be set to "Anyone with the link can view"
- Columns used: `Kanji`, `Keyword_KKLC`, `Reading On`, `Reading Kun`, `Info_JLPT`, `Info_Stroke_Count`, `Vocab_On`, `Vocab_Kun`, `Story_Wanikani`
- Falls back to 10 hardcoded N5 kanji if fetch fails

### Genki vocab (hardcoded in app.js)
- Source: Marshall Yin's vocabulary lists (marshallyin.com/genki-1-vocabulary), matches Genki 3rd edition
- 12 lessons, 300+ cards total
- Each entry: `{ kanji, reading, english, pos, lesson }`

---

## Admin panel (Decap CMS)

- Entry point: `/admin/` — only accessible to Marie after Netlify Identity login
- Marie logs in via Netlify Identity (invite-only registration)
- Git Gateway commits content changes directly to GitHub repo
- Three collections:
  - **Blog Posts** → `content/blog/YYYY-MM-DD-slug.md` — frontmatter: title, date, tags, body
  - **Flashcard Decks** → `content/decks/slug.md` — frontmatter: title, lesson tag, cards array (front/back)
  - **Lesson Notes** → `content/lessons/slug.md` — frontmatter: title, lesson number, body

---

## What "good" looks like

- A new Genki lesson tab loads with: grammar summary cards, in-depth grammar points with practice questions, full vocab list with readings, extra vocab, kanji list
- The kanji bank filters cleanly by JLPT level (N5 default for a Genki I student)
- Daily kanji rotates without repeating until the full set cycles through
- Blog posts appear on the public Blog tab within ~30 seconds of Marie publishing in /admin/
- Custom flashcard decks from /content/decks/ merge into the Cards tab as new filter chips
- The site loads on mobile and desktop; no broken layout at narrow widths
- The retro aesthetic is intact: scrolling banner, glitter dividers, VT323 headings, pastel pink base

## What to avoid

- Do not suggest React, Vue, or any framework. The site is intentionally vanilla JS.
- Do not hardcode blog posts or lesson notes — those come from /content/ via the CMS.
- Do not break the window.GRAMMAR global — app.js depends on grammar.js loading first and setting it.
- Do not assume Netlify Identity is available in all accounts — it has been partially deprecated. If login breaks, fall back to GitHub OAuth (documented in SETUP.md).
- Do not generate placeholder content like [fill this in] — write real example text or ask.
- Do not add tabs or features without asking whether they belong in app.js or as a new file.

---

## Current state (as of June 2026)

- Site is live on Netlify at marie-japanese.netlify.app
- All 4 core files (index.html, style.css, app.js, grammar.js) are deployed
- Decap CMS admin panel is installed and login has been confirmed working
- In-depth grammar content exists for Genki L1–6; L7–12 are not yet written
- Jo-Mako CSV fetch is wired and tested
- Custom domain: not yet connected

## Next priorities
1. Connect custom domain
2. Extend in-depth grammar to L7–12
3. Add Genki II lessons when Marie reaches that stage

Last updated: 2026-06-12
