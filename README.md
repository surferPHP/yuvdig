# Portfolio - Maintainer Notes

Static portfolio website.

## Quick Start (Local)

```bash
python3 -m http.server 4173
```

Open: `http://localhost:4173`

## Edit Scope

Edit only:
- `index.html`
- `styles.css`
- `app.js`
- `content/`
- `assets/`

Do not edit:
- `dist/` manually
- `private-assets/` (private files)

## Build Dist (Optional)

```bash
./scripts/prepare-deploy.sh
```

## GitHub Notes

- Main source is the project root (not `dist/`).
- `README.md` is shown in GitHub repository view only.
- `README.md` is not rendered inside the portfolio homepage.
