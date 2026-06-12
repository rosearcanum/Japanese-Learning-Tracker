/* ══════════════════════════════════════════════════════════════════
   content-loader.js
   Loads blog posts, custom flashcard decks, and lesson notes that you
   publish through the admin panel (Decap CMS writes .md files to the repo).

   Auto-discovers files via the GitHub API, with content/manifest.json
   as a fallback. No backend needed — it reads the public repo.
══════════════════════════════════════════════════════════════════ */

// ⚙️ EDIT THESE TWO LINES to match your GitHub repo:
const GH_OWNER = "rosearcanum";              // your GitHub username
const GH_REPO  = "Japanese-Learning-Tracker"; // your repo name
const GH_BRANCH = "main";

// Holds loaded content
window.BLOG_POSTS = [];
window.CUSTOM_DECKS = [];
window.LESSON_NOTES = [];

// ── Tiny YAML frontmatter parser (handles the fields our CMS writes) ──
function parseFrontmatter(text) {
  const m = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!m) return { data:{}, body:text };
  const yaml = m[1], body = m[2];
  const data = {};
  let curKey = null, list = null, listObj = null;
  yaml.split("\n").forEach(line => {
    if (!line.trim()) return;
    const indent = line.match(/^\s*/)[0].length;
    const trimmed = line.trim();

    // list item start "- "
    if (trimmed.startsWith("- ")) {
      const rest = trimmed.slice(2);
      if (rest.includes(":")) {
        // object in list
        if (!Array.isArray(data[curKey])) data[curKey] = [];
        listObj = {};
        const idx = rest.indexOf(":");
        const k = rest.slice(0, idx).trim();
        const v = rest.slice(idx+1).trim();
        listObj[k] = stripQuotes(v);
        data[curKey].push(listObj);
      } else {
        if (!Array.isArray(data[curKey])) data[curKey] = [];
        data[curKey].push(stripQuotes(rest));
      }
      return;
    }

    // continuation of an object inside a list (indented key: value)
    if (indent >= 2 && listObj && trimmed.includes(":")) {
      const idx = trimmed.indexOf(":");
      const k = trimmed.slice(0, idx).trim();
      const v = trimmed.slice(idx+1).trim();
      listObj[k] = stripQuotes(v);
      return;
    }

    // normal key: value
    if (trimmed.includes(":")) {
      const idx = trimmed.indexOf(":");
      const k = trimmed.slice(0, idx).trim();
      const v = trimmed.slice(idx+1).trim();
      curKey = k;
      listObj = null;
      if (v === "") { data[k] = []; }  // a list will follow
      else { data[k] = stripQuotes(v); }
    }
  });
  return { data, body };
}
function stripQuotes(s){ return s.replace(/^["']|["']$/g,""); }

// ── List files in a content folder ──
async function listFolder(folder) {
  // Try GitHub API first (auto-discovers new files you publish)
  const api = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/content/${folder}?ref=${GH_BRANCH}`;
  try {
    const res = await fetch(api);
    if (res.ok) {
      const files = await res.json();
      return files.filter(f => f.name.endsWith(".md")).map(f => f.name);
    }
  } catch(e) { /* fall through */ }
  // Fallback: manifest.json
  try {
    const res = await fetch("content/manifest.json");
    if (res.ok) { const m = await res.json(); return m[folder] || []; }
  } catch(e) {}
  return [];
}

async function fetchMd(folder, name) {
  const res = await fetch(`content/${folder}/${name}`);
  if (!res.ok) return null;
  return await res.text();
}

// ── Load blog posts ──
async function loadBlog() {
  const names = await listFolder("blog");
  const posts = [];
  for (const name of names) {
    const text = await fetchMd("blog", name);
    if (!text) continue;
    const { data, body } = parseFrontmatter(text);
    posts.push({
      title: data.title || "Untitled",
      date: data.date || "",
      category: data.category || "",
      mood: data.mood || "🌸",
      banner: data.banner || "",
      bodyHtml: window.marked ? marked.parse(body) : body,
    });
  }
  posts.sort((a,b) => new Date(b.date) - new Date(a.date));
  window.BLOG_POSTS = posts;
  renderBlog();
}

// ── Load custom decks ──
async function loadDecks() {
  const names = await listFolder("decks");
  const decks = [];
  for (const name of names) {
    const text = await fetchMd("decks", name);
    if (!text) continue;
    const { data } = parseFrontmatter(text);
    if (data.cards && Array.isArray(data.cards)) {
      decks.push({ title:data.title||"Custom Deck", tag:data.tag||"Custom", description:data.description||"", cards:data.cards });
    }
  }
  window.CUSTOM_DECKS = decks;
  // merge custom cards into the flashcard pool
  if (typeof mergeCustomDecks === "function") mergeCustomDecks();
}

// ── Load lesson notes ──
async function loadLessonNotes() {
  const names = await listFolder("lessons");
  const notes = [];
  for (const name of names) {
    const text = await fetchMd("lessons", name);
    if (!text) continue;
    const { data, body } = parseFrontmatter(text);
    notes.push({
      lesson: parseInt(data.lesson)||0,
      title: data.title||"Note",
      type: data.type||"Note",
      summary: data.summary||"",
      bodyHtml: window.marked ? marked.parse(body) : body,
    });
  }
  window.LESSON_NOTES = notes;
  if (typeof renderLessonDetail === "function") renderLessonDetail();
}

// ── Render blog list ──
function renderBlog() {
  const el = document.getElementById("blog-list");
  if (!el) return;
  if (!window.BLOG_POSTS.length) {
    el.innerHTML = `<div class="empty-state">No posts yet — publish your first one from the admin panel! 🌸</div>`;
    return;
  }
  el.innerHTML = window.BLOG_POSTS.map(p => {
    const d = p.date ? new Date(p.date).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}) : "";
    return `
    <div class="blog-card">
      ${p.banner ? `<img class="blog-card-banner" src="${p.banner}" alt=""/>` : ""}
      <div class="blog-card-inner">
        <div class="blog-card-meta">
          <span style="font-size:22px;">${p.mood}</span>
          ${p.category ? `<span class="blog-card-cat">${p.category}</span>` : ""}
          <span class="blog-card-date">${d}</span>
        </div>
        <div class="blog-card-title">${p.title}</div>
        <hr class="glitter-rule" style="margin:10px 0;"/>
        <div class="blog-card-body">${p.bodyHtml}</div>
      </div>
    </div>`;
  }).join("");
}

// ── Render lesson notes inside the lesson detail (called from app.js) ──
function renderLessonNotesFor(lessonNum) {
  const notes = (window.LESSON_NOTES||[]).filter(n => n.lesson === lessonNum);
  if (!notes.length) {
    return `<div class="empty-state" style="padding:24px;">No personal notes for this lesson yet.<br/>Add some from the <a href="admin/" target="_blank" style="color:var(--pink4);">admin panel »</a></div>`;
  }
  return notes.map(n => `
    <div class="gp-card">
      <div class="gp-header open">
        <div>
          <div class="gp-title">${n.title} <span class="pill muted">${n.type}</span></div>
          ${n.summary ? `<div class="gp-summary">${n.summary}</div>` : ""}
        </div>
      </div>
      <div class="gp-body open"><div class="gp-section-t">${n.bodyHtml}</div></div>
    </div>`).join("");
}

// ── Kick everything off ──
function initContent() {
  loadBlog();
  loadDecks();
  loadLessonNotes();
}
// run after app.js has defined its functions
if (document.readyState === "complete" || document.readyState === "interactive") {
  setTimeout(initContent, 300);
} else {
  window.addEventListener("DOMContentLoaded", () => setTimeout(initContent, 300));
}

// ── Expose for app.js ──
window.renderBlog = renderBlog;
window.renderLessonNotesFor = renderLessonNotesFor;
