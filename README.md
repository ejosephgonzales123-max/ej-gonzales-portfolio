# Emmanuel Gonzales — AI Automation & Workflow Specialist Portfolio

A static, responsive personal portfolio site built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step, no backend. Designed to be hosted for free on **GitHub Pages**.

---

## 1. Project structure

```
portfolio/
│
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
│
└── assets/
    ├── projects/
    │   ├── make-gmail-automation.png
    │   ├── n8n-customer-support.png
    │   ├── n8n-resume-automation.png
    │   ├── n8n-video-automation.png
    │   ├── n8n-appointment-automation.png
    │   ├── n8n-recruitment-automation.png
    │   ├── zapier-social-media.png
    │   ├── zapier-sales-pipeline.png
    │   └── zapier-lead-enrichment.png
    │
    └── certificates/
        ├── n8n-certificate.pdf
        ├── n8n-certificate-thumb.png
        ├── zapier-certificate.pdf
        ├── zapier-certificate-thumb.png
        ├── make-certificate.pdf
        ├── make-certificate-thumb.png
        ├── ghl-certificate.pdf
        ├── ghl-certificate-thumb.png
        ├── prompt-engineering-certificate.pdf
        └── prompt-engineering-certificate-thumb.png
```

All 9 project screenshots and all 5 certificate PDFs (plus a generated thumbnail image for each certificate) are already included and wired up in `js/script.js`. You don't need to add anything to make the site work as-is — the folders below only matter if you want to **swap in your own images later**.

All paths in the code are **relative**, so the site works correctly whether it's hosted at a root domain (`username.github.io`) or a project subpath (`username.github.io/portfolio`).

---

## 2. Replacing project screenshots (optional)

If you want to swap a screenshot for a newer one later:

1. Export/save your new screenshot as a `.png` (or `.jpg` — just update the extension in `js/script.js`).
2. Name it to match (or update) the corresponding entry in the `PROJECTS` array near the top of `js/script.js`, e.g.:
   ```js
   image: 'assets/projects/make-gmail-automation.png',
   ```
3. Drop the file into `assets/projects/`, replacing the old one (keep the same filename to avoid editing the JS).

---

## 3. Replacing certificates (optional)

Each certificate needs **two files**:
- The full PDF (opened when "View Certificate" is clicked)
- A thumbnail image shown on the card (PNG/JPG)

To generate a thumbnail from a PDF locally (macOS/Linux with `poppler` installed):
```bash
pdftoppm -png -r 100 -f 1 -l 1 your-certificate.pdf your-certificate-thumb
```
This produces `your-certificate-thumb-1.png` — rename it to match the filename referenced in the `CERTS` array in `js/script.js`, e.g. `assets/certificates/n8n-certificate-thumb.png`.

If you don't have `poppler`, you can also just take a screenshot of the certificate and save it as the thumbnail.

---

## 4. Testing locally

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

## 5. Creating a GitHub repository

1. Go to [github.com/new](https://github.com/new).
2. Repository name: `portfolio` (or any name you like — this becomes part of your URL).
3. Keep it **Public** (required for free GitHub Pages).
4. Do **not** initialize with a README (you already have one) — or if you do, you'll merge it in step 6.
5. Click **Create repository**.

---

## 6. Uploading / pushing the project to GitHub

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

## 7. Enabling GitHub Pages

1. On your repository's GitHub page, click **Settings**.
2. In the left sidebar, click **Pages**.
3. Under "Build and deployment" → **Source**, choose **Deploy from a branch**.
4. Under **Branch**, select `main` and folder `/ (root)`, then click **Save**.
5. Wait 1–2 minutes for the first deployment to finish (a green checkmark will appear in the **Actions** tab).

---

## 8. Getting your live portfolio URL

Once deployment finishes, your site will be live at:

```
https://YOUR-USERNAME.github.io/portfolio/
```

You can also find this exact link at **Settings → Pages** once it's published — GitHub shows a "Your site is live at…" banner with the clickable URL.

Any time you push new commits to `main`, GitHub Pages automatically rebuilds and redeploys the site within a minute or two.

---

## Notes

- This site is 100% static — no backend, no database, no build step, no external JS frameworks.
- External resources used: Google Fonts (Space Grotesk, Inter, JetBrains Mono) — no other CDNs or paid icon services.
- All icons are inline SVG, so nothing depends on an icon font or paid service.
- Reduced-motion is respected (`prefers-reduced-motion`), and the mobile menu, modals, and buttons are keyboard-accessible.
