#!/usr/bin/env bash
set -euo pipefail

# wrangler: deploy/dev Workers from the container
if ! command -v wrangler &>/dev/null; then
  npm install -g wrangler
fi

# Playwright Chromium: used by e2e tests (playwright-core installed per-project)
npx --yes playwright-core install --with-deps chromium

# Android cmdline-tools: optional, controlled by feature option
if [ "${ANDROID:-false}" = "true" ]; then
  ANDROID_HOME="${ANDROID_HOME:-/opt/android}"
  CMDLINE_TOOLS_URL="https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip"
  CMDLINE_TOOLS_DIR="${ANDROID_HOME}/cmdline-tools"

  if [ ! -d "${CMDLINE_TOOLS_DIR}/latest" ]; then
    apt-get update -y && apt-get install -y --no-install-recommends unzip curl
    mkdir -p "${CMDLINE_TOOLS_DIR}"
    TMP=$(mktemp -d)
    curl -fsSL "${CMDLINE_TOOLS_URL}" -o "${TMP}/cmdline-tools.zip"
    unzip -q "${TMP}/cmdline-tools.zip" -d "${TMP}"
    # Google distributes as cmdline-tools/; rename to latest per SDK layout
    mv "${TMP}/cmdline-tools" "${CMDLINE_TOOLS_DIR}/latest"
    rm -rf "${TMP}"
  fi

  # Persist env vars for all users
  {
    echo "ANDROID_HOME=${ANDROID_HOME}"
    echo "PATH=\${PATH}:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools"
  } >> /etc/environment
fi
