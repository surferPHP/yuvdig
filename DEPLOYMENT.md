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

## Security headers to enable on the host

Set these at the hosting layer when possible:

- `Content-Security-Policy: default-src 'self'; script-src 'self'; connect-src 'self'; img-src 'self' data:; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`

If the site is always served over HTTPS, also add:

- `Strict-Transport-Security: max-age=31536000; includeSubDomains`

## Daily workflow

1. Edit only root files (`index.html`, `styles.css`, `app.js`, `content/`, `assets/`)
2. Run `./scripts/prepare-deploy.sh`
3. Deploy `dist/`

## Verify before deploy

```bash
find dist -maxdepth 3 -type f
```

You should NOT see any private CV/document files, `.DS_Store`, or `docs/` unless you explicitly ran `PUBLISH_DOCS=1 ./scripts/prepare-deploy.sh`.
