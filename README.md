# Yuval Portfolio MVP

Static dynamic-portfolio website powered by `content/portfolio-content.json`.

## Run locally

From project root:

```bash
python3 -m http.server 4173
```

Then open:

`http://localhost:4173`

## Source Of Truth (No More Duplicates)

- Edit only root files: `index.html`, `styles.css`, `app.js`, `content/`, `assets/`
- Do not edit `dist/` manually
- Rebuild `dist/` from root when ready:

```bash
./scripts/prepare-deploy.sh
```

After that, run from `dist` if needed:

```bash
cd dist && python3 -m http.server 5500
```

## Content updates

Edit only:

- `content/portfolio-content.json`

No code change required for text/content updates.

## Theme switching

Use the header `Theme` dropdown:

- `Executive`
- `Personal Brand`
- `Technical`
- `Midnight Glass`
- `Emerald Glass`

Theme choice is saved in browser storage.  
You can also force a theme via URL:

- `?theme=executive`
- `?theme=personal-brand`
- `?theme=technical-grid`
- `?theme=midnight-glass`
- `?theme=emerald-glass`

## Deploy to Netlify

1. Build a clean static bundle:

```bash
./scripts/prepare-deploy.sh
```

2. In Netlify, choose **Add new site** -> **Deploy manually**.
3. Drag and drop the local `dist/` folder.
4. Netlify will publish the site with `dist/index.html` as the entry page.

Notes:
- This site is fully static (no backend required).
- Do not upload `private-assets/`.
