# Safe Deployment

## Security rule
Do not deploy `private-assets/`.

## Option 1: Vercel
This repo includes `.vercelignore` that excludes:
- `private-assets/`
- local editor/system files

## Option 2: Generic static hosting
Prepare a safe bundle first (this is the only command you need):

```bash
./scripts/prepare-deploy.sh
```

Deploy only the `dist/` folder.

## Daily workflow

1. Edit only root files (`index.html`, `styles.css`, `app.js`, `content/`, `assets/`)
2. Run `./scripts/prepare-deploy.sh`
3. Deploy `dist/`

## Verify before deploy

```bash
find dist -maxdepth 3 -type f
```

You should NOT see any private CV/document files.
