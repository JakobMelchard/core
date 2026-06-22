#!/bin/bash
set -euo pipefail
# Usage: curl -sL https://raw.githubusercontent.com/JakobMelchard/cloudflare-core/main/install.sh | bash
# Or:    bash install.sh [dir]

REPO="https://github.com/JakobMelchard/cloudflare-core.git"
DIR="${1:-.}"

TMP=$(mktemp -d)
git clone --depth 1 "$REPO" "$TMP"
shopt -s dotglob
cp -r "$TMP"/* "$DIR/"
rm -rf "$TMP" "$DIR/.git"
git init "$DIR"
echo "✓ cloudflare-core installed in $DIR"
