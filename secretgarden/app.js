/* ══════════════════════════════════════════════════════════════════
   secretgarden/app.js
   Standalone loader for the Secret Garden — deliberately independent
   of the main site's content-loader.js, since this folder is no
   longer part of that app. Reads the same content/garden/*.md files
   Decap CMS writes to (three collections — Drawing/Story/Diary — all
   land here, distinguished by a `type` frontmatter field).

   Frontmatter fields used:
     type              "drawing" | "story" | "diary"
     title             string
     date              ISO datetime
     tags              list of strings
     image             drawings — image path
     background_color  optional — CSS color for this post's page
     background_image  optional — image path for this post's page
     body              markdown (raw HTML allowed — see note in README)

   CUSDIS_APP_ID below needs to be filled in once you've created a
   free account at https://cusdis.com and registered this site —
   I can't create that account for you.
══════════════════════════════════════════════════════════════════ */

const GH_OWNER = "rosearcanum";
const GH_REPO  = "Japanese-Learning-Tracker";
const GH_BRANCH = "main";

const CUSDIS_APP_ID = "PASTE-YOUR-CUSDIS-APP-ID-HERE";
const CUSDIS_HOST = "https://cusdis.com";

// ── Tiny frontmatter parser (same approach as the main site's content-loader.js) ──
function parseFrontmatter(text) {
  const m = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: text };
  const yaml = m[1], body = m[2];
  const data = {};
  let curKey = null, list = null, listObj = null;
  yaml.split("\n").forEach(line => {
    if (!line.trim()) return;
    const indent = line.match(/^\s*/)[0].length;
    const trimmed = line.trim();
    if (trimmed.startsWith("- ")) {
      const rest = trimmed.slice(2);
      if (rest.includes(":")) {
        if (!Array.isArray(data[curKey])) data[curKey] = [];
        listObj = {};
        const idx = rest.indexOf(":");
        listObj[rest.slice(0, idx).trim()] = stripQuotes(rest.slice(idx + 1).trim());
        data[curKey].push(listObj);
      } else {
        if (!Array.isArray(data[curKey])) data[curKey] = [];
        data[curKey].push(stripQuotes(rest));
      }
      return;
    }
    if (indent >= 2 && listObj && trimmed.includes(":")) {
      const idx = trimmed.indexOf(":");
      listObj[trimmed.slice(0, idx).trim()] = stripQuotes(trimmed.slice(idx + 1).trim());
      return;
    }
    if (trimmed.includes(":")) {
      const idx = trimmed.indexOf(":");
      const k = trimmed.slice(0, idx).trim();
      const v = trimmed.slice(idx + 1).trim();
      curKey = k; listObj = null;
      data[k] = v === "" ? [] : stripQuotes(v);
    }
  });
  return { data, body };
}
function stripQuotes(s) { return s.replace(/^["']|["']$/g, ""); }

async function listGardenFiles() {
  const api = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/content/garden?ref=${GH_BRANCH}`;
  try {
    const res = await fetch(api);
    if (res.ok) {
      const files = await res.json();
      return files.filter(f => f.name.endsWith(".md")).map(f => f.name);
    }
  } catch (e) {}
  try {
    const res = await fetch("../content/manifest.json");
    if (res.ok) { const m = await res.json(); return m.garden || []; }
  } catch (e) {}
  return [];
}

async function loadEntry(name) {
  const res = await fetch(`../content/garden/${name}`);
  if (!res.ok) return null;
  const text = await res.text();
  const { data, body } = parseFrontmatter(text);
  return {
    slug: name.replace(/\.md$/, ""),
    type: data.type || "diary",
    title: data.title || "untitled",
    date: data.date || "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    image: data.image || "",
    backgroundColor: data.background_color || "",
    backgroundImage: data.background_image || "",
    bodyHtml: window.marked ? marked.parse(body) : body,
  };
}

async function loadAllEntries() {
  const names = await listGardenFiles();
  const entries = await Promise.all(names.map(loadEntry));
  return entries.filter(Boolean).sort((a, b) => new Date(b.date) - new Date(a.date));
}

// ── Creator badge — reads the SAME session cookie the main site
//    login sets, via the Worker's public /api/whoami endpoint ──
async function renderCreatorBadge() {
  const el = document.getElementById("creator-badge");
  if (!el) return;
  try {
    const res = await fetch("/api/whoami", { credentials: "include" });
    const { loggedIn } = await res.json();
    el.textContent = loggedIn ? "★ creator" : "";
    el.classList.toggle("visible", !!loggedIn);
  } catch (e) { /* whoami not deployed yet — badge just stays hidden */ }
}

// ── Per-post custom background ──
function applyPostBackground(entry) {
  if (entry.backgroundImage) {
    document.body.style.backgroundImage = `url('${entry.backgroundImage}')`;
    document.body.classList.add("custom-bg");
  } else if (entry.backgroundColor) {
    document.body.style.backgroundColor = entry.backgroundColor;
  }
}

// ── Index page (entry list) ──
async function renderIndex() {
  const listEl = document.getElementById("entry-list-items");
  const wrapEl = document.getElementById("entry-list");
  if (!listEl) return;
  const entries = await loadAllEntries();
  if (!entries.length) {
    listEl.innerHTML = `<div class="empty-state">nothing here yet.</div>`;
  } else {
    const typeIcon = { drawing: "art", story: "fic", diary: "diary" };
    listEl.innerHTML = entries.map(e => {
      const d = e.date ? new Date(e.date) : null;
      const month = d ? d.toLocaleDateString("en-US", { month: "short" }) : "";
      const day = d ? d.getDate() : "";
      return `
      <li>
        <a href="post.html?slug=${encodeURIComponent(e.slug)}">
          <span class="entry-month">${month}</span>
          <span class="entry-day">${day}</span>
          <span class="entry-type-tag">${typeIcon[e.type] || e.type}</span>
          <span class="entry-title">${e.title}</span>
        </a>
      </li>`;
    }).join("");
  }
  if (wrapEl) wrapEl.classList.add("fade-in");
}

// ── Single post page ──
async function renderPost() {
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");
  const titleEl = document.getElementById("title");
  const dateEl = document.getElementById("date-subtitle");
  const bodyEl = document.getElementById("post-body");
  if (!slug || !bodyEl) return;

  const entries = await loadAllEntries();
  const entry = entries.find(e => e.slug === slug);
  if (!entry) {
    bodyEl.innerHTML = `<div class="empty-state">post not found.</div>`;
    return;
  }

  applyPostBackground(entry);
  titleEl.textContent = entry.title;
  dateEl.textContent = entry.date ? new Date(entry.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "";
  document.title = `${entry.title} — secret garden`;

  let html = "";
  if (entry.image) html += `<div class="image-container"><img src="${entry.image}" alt=""/></div>`;
  html += entry.bodyHtml;
  bodyEl.innerHTML = html;

  mountCusdis(entry);
}

function mountCusdis(entry) {
  const wrap = document.getElementById("comments-wrap");
  if (!wrap) return;
  if (!CUSDIS_APP_ID || CUSDIS_APP_ID.startsWith("PASTE-")) {
    wrap.innerHTML = `<div class="cta">comments aren't set up yet — see secretgarden/README in the setup notes.</div>`;
    return;
  }
  wrap.innerHTML = `<div id="cusdis_thread"
    data-host="${CUSDIS_HOST}"
    data-app-id="${CUSDIS_APP_ID}"
    data-page-id="${entry.slug}"
    data-page-url="${location.href}"
    data-page-title="${entry.title.replace(/"/g, "&quot;")}"
  ></div>`;
  const s = document.createElement("script");
  s.async = true; s.defer = true; s.src = `${CUSDIS_HOST}/js/cusdis.es.js`;
  document.body.appendChild(s);
}

// ── Boot ──
document.addEventListener("DOMContentLoaded", () => {
  renderCreatorBadge();
  if (document.getElementById("entry-list-items")) renderIndex();
  if (document.getElementById("post-body")) renderPost();
});
