# 🌙 Secret Garden — setup steps

`index.html`, `style.css`, `app.js`, and `content-loader.js` in this delivery are
**complete, drop-in replacements** for your current files — copy them straight
into the repo.

`admin/config.yml` and `content/manifest.json` weren't in the files I could see,
so instead of guessing and overwriting them, here's exactly what to add to your
existing copies.

---

## 1. `admin/config.yml` — add three new collections

Paste these into your existing `collections:` list (alongside Blog Posts,
Flashcard Decks, Lesson Notes — don't remove those). All three write into the
same `content/garden/` folder; a hidden `type` field is what content-loader.js
uses to sort them into Drawings / Stories / Diary on the site.

```yaml
  - name: "garden_drawings"
    label: "Garden — Drawing"
    folder: "content/garden"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - {label: "Type", name: "type", widget: "hidden", default: "drawing"}
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: "Tags", name: "tags", widget: "list", required: false}
      - {label: "Image", name: "image", widget: "image"}
      - {label: "Notes", name: "body", widget: "markdown", required: false}

  - name: "garden_stories"
    label: "Garden — Story"
    folder: "content/garden"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - {label: "Type", name: "type", widget: "hidden", default: "story"}
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: "Tags", name: "tags", widget: "list", required: false}
      - {label: "Story", name: "body", widget: "markdown"}

  - name: "garden_diary"
    label: "Garden — Diary"
    folder: "content/garden"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - {label: "Type", name: "type", widget: "hidden", default: "diary"}
      - {label: "Title", name: "title", widget: "string", default: "Diary Entry"}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: "Tags", name: "tags", widget: "list", required: false}
      - {label: "Entry", name: "body", widget: "markdown"}
```

This gives you three separate "New" buttons in `/admin/` — one per content
type — even though they all land in the same folder.

## 2. `content/manifest.json` — add the garden fallback key

Add a `"garden": []` key alongside your existing `"blog"`, `"decks"`,
`"lessons"` keys, so the manifest fallback works before you've published
anything (and if the GitHub API listing ever fails/rate-limits):

```json
{
  "blog": [...your existing entries...],
  "decks": [...your existing entries...],
  "lessons": [...your existing entries...],
  "garden": []
}
```

You don't need to create `content/garden/` yourself — like `content/lessons/`,
it'll be created automatically the first time you publish a drawing, story, or
diary entry from `/admin/`.

---

## What's live now
- 🌙 toggle button in the topbar, top-right, always visible — switches between
  Study mode and Secret Garden mode
- Garden has its own sidebar, its own nav (Garden / Drawings / Stories /
  Diary), and its own dark twilight-purple theme (`body.mode-garden` in
  `style.css` — same CSS variables as the study theme, just re-declared, so
  every existing `.panel`/`.pill`/`.btn` reskins for free)
- Garden Home shows a combined recent-activity feed: blog posts + garden
  entries + study progress (cards/kanji/quiz/grammar counts pulled from your
  existing `dailyActivity` tracking), newest first
- Drawings/Stories/Diary each render as a card grid, pulling from whichever
  entries exist in `content/garden/`
- Mode choice persists across visits (`localStorage`, key `jp-mode`)

## What's deferred (Phase 2, whenever you're ready)
- The clickable garden-scene background — click a flower/bench/lantern to
  jump into Drawings/Stories/Diary. There's a placeholder panel on Garden
  Home ("🗺️ the map — coming soon") marking where it'll go. This is its own
  design + SVG-hotspot build; happy to start on it whenever you want to pick
  an art style for the scene.
