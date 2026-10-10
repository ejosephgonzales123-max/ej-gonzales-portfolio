# Emmanuel Gonzales — AI Automation & Workflow Specialist Portfolio

A static, responsive personal portfolio site built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step, no backend. Designed to be hosted for free on **GitHub Pages**.

---

## 1. Project structure

```
portfolio/
├── index.html
├── README.md
├── css/style.css
├── js/script.js
└── assets/
    ├── profile/profile-photo.webp
    ├── icons/            (6 neon-red AI icons used in Tools & Technologies)
    ├── visuals/visual-handshake.webp   (contact section only)
    ├── projects/         (12 workflow screenshots, .png)
    └── certificates/     (5 PDFs + 5 .webp preview thumbnails)
```

All paths are **relative**, so the site works from a root domain (`username.github.io`) or a project subpath (`username.github.io/portfolio`).

### Design system

A dark "control room" look: oxblood-black background, neon red signal color, Archivo + IBM Plex Sans + IBM Plex Mono, hairline borders, no heavy shadows. Colors and fonts are CSS variables at the top of `css/style.css` — change the red there and the whole site follows.

### Editing content

- **Projects and certificates** live in the `PROJECTS` and `CERTS` arrays at the top of `js/script.js`. Add an object, drop the screenshot into `assets/projects/`, and the card, filter count and modal update automatically.
- **Certificate thumbnails**: generate from a PDF with `pdftoppm -png -r 100 -f 1 -l 1 file.pdf thumb`, then convert to `.webp` (or use `.png` and update the path in `CERTS`).
- **Profile photo**: overwrite `assets/profile/profile-photo.webp` with a square photo.
- **Social preview**: after publishing, replace the relative `og:image` in `index.html` with the full `https://` URL of the image.

---

## 2. Testing locally

Open `index.html` directly, or from the `portfolio/` folder run `python3 -m http.server 8000` and visit http://localhost:8000.

You don't need Node.js or any build tools. Any of the following works:

**Option A — just open the file**
Double-click `index.html`, or right-click → Open With → your browser.

**Option B — local server (recommended, avoids any path quirks)**
From inside the `portfolio/` folder:
```bash
# Python 3
python3 -m http.server 8000
```
Then open **http://localhost:8000** in your browser.

Or with VS Code, install the "Live Server" extension and click "Go Live."

Check that:
- The hero, about, skills, projects, process, experience, certifications, and contact sections all load.
- Clicking "View Workflow" on a project card opens the modal with the screenshot and details.
- Clicking "View Certificate" opens the certificate modal with a link to the full PDF.
- The mobile hamburger menu works below ~880px width.
- Pressing `Esc` or clicking outside a modal closes it.

---

## 3. Creating a GitHub repository

1. Go to [github.com/new](https://github.com/new).
2. Repository name: `portfolio` (or any name you like — this becomes part of your URL).
3. Keep it **Public** (required for free GitHub Pages).
4. Do **not** initialize with a README (you already have one) — or if you do, you'll merge it in step 6.
5. Click **Create repository**.

---

## 4. Uploading / pushing the project to GitHub

From inside your local `portfolio/` folder, open a terminal:

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

(Alternative: use GitHub Desktop or the "Add file → Upload files" button on the repository's GitHub page if you'd rather not use the command line.)

---

## 5. Enabling GitHub Pages

1. On your repository's GitHub page, click **Settings**.
2. In the left sidebar, click **Pages**.
3. Under "Build and deployment" → **Source**, choose **Deploy from a branch**.
4. Under **Branch**, select `main` and folder `/ (root)`, then click **Save**.
5. Wait 1–2 minutes for the first deployment to finish (a green checkmark will appear in the **Actions** tab).

---

## 6. Getting your live portfolio URL

Once deployment finishes, your site will be live at:

```
https://YOUR-USERNAME.github.io/portfolio/
```

You can also find this exact link at **Settings → Pages** once it's published — GitHub shows a "Your site is live at…" banner with the clickable URL.

Any time you push new commits to `main`, GitHub Pages automatically rebuilds and redeploys the site within a minute or two.

---

## Notes

- This site is 100% static — no backend, no database, no build step, no external JS frameworks.
- External resources used: Google Fonts (Archivo, IBM Plex Sans, IBM Plex Mono) — no other CDNs or paid icon services.
- All icons are inline SVG, so nothing depends on an icon font or paid service.
- Reduced-motion is respected (`prefers-reduced-motion`), and the mobile menu, modals, and buttons are keyboard-accessible.
