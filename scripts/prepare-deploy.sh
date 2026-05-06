#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="$ROOT_DIR/dist"

rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"

# Copy only public website assets
cp "$ROOT_DIR/index.html" "$DIST_DIR/"
cp "$ROOT_DIR/styles.css" "$DIST_DIR/"
cp "$ROOT_DIR/app.js" "$DIST_DIR/"
cp -R "$ROOT_DIR/content" "$DIST_DIR/content"
cp -R "$ROOT_DIR/assets" "$DIST_DIR/assets"

# Optional static docs (public) - opt-in only
if [ "${PUBLISH_DOCS:-0}" = "1" ] && [ -d "$ROOT_DIR/docs" ]; then
  cp -R "$ROOT_DIR/docs" "$DIST_DIR/docs"
fi

# Strip local OS metadata that should never be deployed
find "$DIST_DIR" -name ".DS_Store" -delete

echo "Prepared safe deploy bundle at: $DIST_DIR"
echo "Excluded: private-assets/, docs/ by default, codex/, local/editor files, .DS_Store"
