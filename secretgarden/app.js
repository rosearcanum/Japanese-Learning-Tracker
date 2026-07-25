/* ══════════════════════════════════════════════════════════════════
   secretgarden/app.js  — diagnostic build
   Same behaviour as before, but it can no longer fail silently:
   - the entry list is made visible IMMEDIATELY, before any fetching,
     so a thrown error can never leave a blank page again
   - every failure is caught and printed on the page
   - a status line reports which data source was used and what it found
   Once things are working, the status line can be turned off by
   setting DEBUG = false just below.
══════════════════════════════════════════════════════════════════ */

const DEBUG = false;

const GH_OWNER = "rosearcanum";
const GH_REPO  = "Japanese-Learning-Tracker";
const GH_BRANCH = "main";

const CUSDIS_APP_ID = "ae9780db-0b37-43cc-adf3-cd34a9c41020";
const CUSDIS_HOST = "https://cusdis.com";

// ── on-page diagnostics ───────────────────────────────────────────
function debugLog(msg) {
  if (!DEBUG) return;
  let box = document.getElementById("debug-box");
  if (!box) {
    box = document.createElement("div");
    box.id = "debug-box";
    box.style.cssText =
      "margin-top:30px;padding:12px;border:1px solid #333;color:#7a7a7a;" +
      "font-size:12px;line-height:1.7;white-space:pre-wrap;word-break:break-word;";
    const mc = document.querySelector(".main-content") || document.body;
    mc.appendChild(box);
    box.textContent = "— debug —\n";
  }
  box.textContent += msg + "\n";
}

function showError(where, err) {
  debugLog(`ERROR in ${where}: ${err && err.message ? err.message : String(err)}`);
  console.error(where, err);
}

// ── frontmatter parsing ───────────────────────────────────────────
function stripQuotes(s) { return String(s).replace(/^["']|["']$/g, ""); }

function parseFrontmatter(text) {
  const m = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: text };
  const yaml = m[1], body = m[2];
  const data = {};
  let curKey = null;
  yaml.split("\n").forEach(line => {
    if (!line.trim()) return;
    const trimmed = line.trim();
    if (trimmed.startsWith("- ")) {
      const rest = trimmed.slice(2);
      if (!Array.isArray(data[curKey])) data[curKey] = [];
      data[curKey].push(stripQuotes(rest));
      return;
    }
    const idx = trimmed.indexOf(":");
    if (idx === -1) return;
    const k = trimmed.slice(0, idx).trim();
    const v = trimmed.slice(idx + 1).trim();
    curKey = k;
    data[k] = v === "" ? [] : stripQuotes(v);
  });
  return { data, body };
}

// ── locating the markdown files ───────────────────────────────────
async function listGardenFiles() {
  const api = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/content/garden?ref=${GH_BRANCH}`;
  try {
    const res = await fetch(api);
    debugLog(`GitHub API: HTTP ${res.status}`);
    if (res.ok) {
      const files = await res.json();
      const names = files.filter(f => f.name.endsWith(".md")).map(f => f.name);
      debugLog(`GitHub API returned ${names.length} .md file(s): ${names.join(", ") || "(none)"}`);
      if (names.length) return names;
    } else if (res.status === 404) {
      debugLog("404 = content/garden/ not found, or the repo is private (the API needs auth for private repos).");
    } else if (res.status === 403) {
      debugLog("403 = GitHub API rate limit. Falls back to manifest.json below.");
    }
  } catch (e) {
    showError("listGardenFiles/api", e);
  }

  try {
    const res = await fetch("../content/manifest.json");
    debugLog(`manifest.json: HTTP ${res.status}`);
    if (res.ok) {
      const mf = await res.json();
      const names = mf.garden || [];
      debugLog(`manifest "garden" key: ${names.length} entry/entries: ${names.join(", ") || "(empty)"}`);
      return names;
    }
  } catch (e) {
    showError("listGardenFiles/manifest", e);
  }
  return [];
}

async function loadEntry(name) {
  try {
    const res = await fetch(`../content/garden/${name}`);
    if (!res.ok) { debugLog(`could not fetch ${name} (HTTP ${res.status})`); return null; }
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
      bodyHtml: (window.marked && marked.parse) ? marked.parse(body) : body,
    };
  } catch (e) {
    showError(`loadEntry(${name})`, e);
    return null;
  }
}

async function loadAllEntries() {
  const names = await listGardenFiles();
  const entries = (await Promise.all(names.map(loadEntry))).filter(Boolean);
  debugLog(`parsed ${entries.length} entry/entries successfully`);
  return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// ── creator badge ─────────────────────────────────────────────────
async function renderCreatorBadge() {
  const el = document.getElementById("creator-badge");
  if (!el) return;
  try {
    const res = await fetch("/api/whoami", { credentials: "include" });
    if (!res.ok) { debugLog(`/api/whoami: HTTP ${res.status} (login Worker not deployed yet — badge stays hidden, this is fine)`); return; }
    const { loggedIn } = await res.json();
    el.textContent = loggedIn ? "★ creator" : "";
    el.classList.toggle("visible", !!loggedIn);
  } catch (e) {
    debugLog("/api/whoami unreachable (login Worker not deployed yet — this is fine)");
  }
}

function applyPostBackground(entry) {
  if (entry.backgroundImage) {
    document.body.style.backgroundImage = `url('${entry.backgroundImage}')`;
    document.body.classList.add("custom-bg");
  } else if (entry.backgroundColor) {
    document.body.style.backgroundColor = entry.backgroundColor;
  }
}

// ── index page ────────────────────────────────────────────────────
async function renderIndex() {
  const listEl = document.getElementById("entry-list-items");
  const wrapEl = document.getElementById("entry-list");

  // Make it visible FIRST. This is the fix — previously this happened
  // last, so any error above left the entire section at opacity 0.
  if (wrapEl) wrapEl.classList.add("fade-in");
  if (!listEl) return;

  try {
    const entries = await loadAllEntries();
    if (!entries.length) {
      listEl.innerHTML = `<li class="empty-state">nothing here yet.</li>`;
      return;
    }
    const typeTag = { drawing: "art", story: "fic", diary: "diary" };
    listEl.innerHTML = entries.map(e => {
      const d = e.date ? new Date(e.date) : null;
      const valid = d && !isNaN(d.getTime());
      const month = valid ? d.toLocaleDateString("en-US", { month: "short" }) : "";
      const day = valid ? d.getDate() : "";
      return `
      <li>
        <a href="post.html?slug=${encodeURIComponent(e.slug)}">
          <span class="entry-month">${month}</span>
          <span class="entry-day">${day}</span>
          <span class="entry-type-tag">${typeTag[e.type] || e.type}</span>
          <span class="entry-title">${e.title}</span>
        </a>
      </li>`;
    }).join("");
  } catch (e) {
    showError("renderIndex", e);
    listEl.innerHTML = `<li class="empty-state">something went wrong loading entries — see debug below.</li>`;
  }
}

// ── single post ───────────────────────────────────────────────────
async function renderPost() {
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");
  const titleEl = document.getElementById("title");
  const dateEl = document.getElementById("date-subtitle");
  const bodyEl = document.getElementById("post-body");
  if (!bodyEl) return;

  if (!slug) {
    if (titleEl) titleEl.textContent = "no post specified";
    return;
  }

  try {
    const entries = await loadAllEntries();
    const entry = entries.find(e => e.slug === slug);
    if (!entry) {
      if (titleEl) titleEl.textContent = "post not found";
      debugLog(`no entry matched slug "${slug}". available: ${entries.map(e => e.slug).join(", ") || "(none)"}`);
      return;
    }

    applyPostBackground(entry);
    if (titleEl) titleEl.textContent = entry.title;
    const d = entry.date ? new Date(entry.date) : null;
    if (dateEl && d && !isNaN(d.getTime())) {
      dateEl.textContent = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    }
    document.title = `${entry.title} — secret garden`;

    let html = "";
    if (entry.image) html += `<div class="image-container"><img src="${entry.image}" alt=""/></div>`;
    html += entry.bodyHtml;
    bodyEl.innerHTML = html;

    mountCusdis(entry);
  } catch (e) {
    showError("renderPost", e);
  }
}

// ── CSS injected INTO the Cusdis widget ───────────────────────────
// Cusdis builds its iframe with srcdoc, which inherits this page's
// origin — so unlike a normal third-party embed, we can reach inside
// it. We watch for the iframe appearing and rewrite its srcdoc to
// append our own styles before it renders.
// These rules target plain elements (body/textarea/input/button)
// rather than Cusdis's internal class names, so they keep working if
// the widget's markup changes. To refine further: inspect the iframe
// in devtools and add rules for whatever classes you find.
const CUSDIS_INJECTED_CSS = `
  * { border-radius: 0 !important; }
  body, html {
    background: transparent !important;
    color: #b8b0c4 !important;
    font-family: 'Abaddon','MS Gothic','Courier New',Courier,monospace !important;
    font-size: 14px !important;
  }
  a { color: #e08bb0 !important; }
  textarea, input {
    background: #14101c !important;
    color: #f0ebf5 !important;
    border: 1px solid #2a2435 !important;
    font-family: inherit !important;
    font-size: 14px !important;
    padding: 8px 10px !important;
  }
  textarea::placeholder, input::placeholder { color: #6d6480 !important; }
  textarea:focus, input:focus {
    outline: none !important;
    border-color: #a8637f !important;
  }
  button {
    background: #14101c !important;
    color: #e08bb0 !important;
    border: 1px solid #a8637f !important;
    font-family: inherit !important;
    font-size: 13px !important;
    letter-spacing: 1px !important;
    padding: 8px 16px !important;
    cursor: pointer !important;
    text-transform: lowercase !important;
  }
  button:hover { background: #1d1826 !important; color: #f0ebf5 !important; }
  /* comment rows */
  .dark, .dark * { background-color: transparent !important; }
  hr { border-color: #2a2435 !important; }
`;

function mountCusdis(entry) {
  const wrap = document.getElementById("comments-wrap");
  if (!wrap) return;
  if (!CUSDIS_APP_ID || CUSDIS_APP_ID.startsWith("PASTE-")) {
    wrap.innerHTML = `<div class="cta">comments not configured yet.</div>`;
    return;
  }

  wrap.innerHTML = `<div class="label">comments</div>
  <div id="cusdis_thread"
    data-host="${CUSDIS_HOST}"
    data-app-id="${CUSDIS_APP_ID}"
    data-page-id="${entry.slug}"
    data-page-url="${location.href}"
    data-page-title="${String(entry.title).replace(/"/g, "&quot;")}"
    data-theme="dark"
  ></div>`;

  // Observer must be watching BEFORE the Cusdis script builds the
  // iframe, otherwise we miss our chance to rewrite srcdoc.
  const thread = document.getElementById("cusdis_thread");
  const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
      m.addedNodes.forEach(node => {
        if (!node || node.tagName !== "IFRAME") return;
        try {
          if (typeof node.srcdoc === "string" && node.srcdoc.includes("</style>")) {
            node.srcdoc = node.srcdoc.replace("</style>", CUSDIS_INJECTED_CSS + "</style>");
          }
        } catch (e) {
          showError("cusdis style injection", e);
        }
      });
    });
  });
  observer.observe(thread, { childList: true, subtree: true });

  const s = document.createElement("script");
  s.async = true; s.defer = true; s.src = `${CUSDIS_HOST}/js/cusdis.es.js`;
  document.body.appendChild(s);
}

// ── boot ──────────────────────────────────────────────────────────
function boot() {
  debugLog(`page: ${location.pathname}`);
  debugLog(`marked.js loaded: ${!!(window.marked && marked.parse)}`);
  renderCreatorBadge();
  if (document.getElementById("entry-list-items")) renderIndex();
  if (document.getElementById("post-body")) renderPost();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot(); // script loaded after DOM was already parsed
}
