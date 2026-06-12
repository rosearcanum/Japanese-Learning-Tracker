# 🌸 Setup Guide — Your Japanese Study Site with Admin Panel

This guide gets your site live with a **public view for everyone** and a
**private admin panel just for you** to write blog posts, add flashcard
decks, and post lesson notes — no coding required after setup.

The admin panel uses **Decap CMS** + **Netlify Identity**. That means your
site needs to be hosted on **Netlify** (free) instead of GitHub Pages, because
GitHub Pages can't handle the login part.

---

## Part 1 — Put the files in your repo

1. Copy ALL of these files/folders into your GitHub repo, keeping the structure:

   ```
   index.html
   style.css
   app.js
   grammar.js
   content-loader.js
   netlify.toml
   admin/
     index.html
     config.yml
   content/
     manifest.json
     blog/2026-06-09-welcome.md
     decks/tricky-words.md
     lessons/
   media/uploads/      (create this empty folder — uploaded images go here)
   ```

2. In **`content-loader.js`**, check the top two lines say your repo:
   ```js
   const GH_OWNER = "rosearcanum";
   const GH_REPO  = "Japanese-Learning-Tracker";
   ```
   Fix them if your username or repo name is different.

3. In **`admin/config.yml`**, the `backend.branch` should be `main`
   (or `master` if that's your default branch).

Commit and push everything.

---

## Part 2 — Host on Netlify (free)

1. Go to **https://app.netlify.com** and sign up (use your GitHub account).
2. Click **Add new site → Import an existing project**.
3. Choose **GitHub**, authorize, and pick your repo.
4. Leave build settings blank (it's a static site). Click **Deploy**.
5. Netlify gives you a URL like `your-site-name.netlify.app`. That's your live site!
   - You can rename it under **Site configuration → Change site name**.

---

## Part 3 — Turn on the login (Netlify Identity + Git Gateway)

1. In your Netlify site dashboard, go to **Integrations** (or **Identity** in
   older menus) and **enable Identity**.
   - Newer Netlify: search the **Extensions/Integrations** area for "Identity"
     and enable it. If you don't see it, see Part 6 for the alternative.
2. Under **Identity → Registration**, set it to **Invite only**
   (so randos can't sign up as editors).
3. Under **Identity → Services → Git Gateway**, click **Enable Git Gateway**.
   This lets the CMS save your posts back to GitHub.
4. Under **Identity**, click **Invite users** and invite **your own email**.
5. Check your email, accept the invite, and set a password.

---

## Part 4 — Use your admin panel

1. Go to **`your-site.netlify.app/admin/`**
2. Log in with the email/password you just set.
3. You'll see three collections:
   - **📓 Blog Posts** — write progress updates and anything else
   - **🃏 Flashcard Decks** — add custom decks with as many cards as you want
   - **📚 Lesson & Grammar Notes** — add your own notes to any lesson
4. Write something, hit **Publish**. It commits to your repo, Netlify
   redeploys in ~30 seconds, and it appears on the public site.

That's it! Everyone can read your site; only you can edit it.

---

## Part 5 — How content shows up on the site

- **Blog posts** → appear on the **📓 Blog** tab, newest first.
- **Flashcard decks** → appear as new filter chips on the **🃏 Cards** tab.
- **Lesson notes** → appear under the **📝 My Notes** sub-tab inside each Lesson.

The site auto-discovers new files through the GitHub API, so you never have to
touch `manifest.json` by hand (it's just a backup).

---

## Part 6 — If Netlify Identity isn't available

Netlify has been phasing Identity in and out. If you can't enable it, use
**GitHub OAuth** instead:

1. In `admin/config.yml`, change the backend to:
   ```yaml
   backend:
     name: github
     repo: rosearcanum/Japanese-Learning-Tracker
     branch: main
   ```
2. Set up an OAuth provider. The easiest no-server option is to deploy the
   tiny free **`vencax/netlify-cms-github-oauth-provider`** on Render.com, or
   use **Cloudflare Pages' built-in** function. (Search "Decap CMS GitHub
   backend OAuth" for current step-by-steps — it changes occasionally.)
3. Then `/admin/` will log you in directly with GitHub.

If this part gets fiddly, tell me which host you picked and I'll give exact steps.

---

## Keeping GitHub Pages too (optional)

You can keep your GitHub Pages site as a read-only mirror — but the admin panel
will only work on the Netlify version. Most people just switch fully to Netlify.

🌸 がんばって！
