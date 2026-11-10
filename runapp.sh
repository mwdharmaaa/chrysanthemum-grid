#!/usr/bin/env bash
set -euo pipefail

echo "========================================"
echo "[*] Chrysanthemum Gold Grid - Dev Runner"
echo "========================================"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CHROME_BIN="/c/Program Files/Google/Chrome/Application/chrome.exe"

if [ ! -f "$CHROME_BIN" ]; then
  CHROME_BIN="/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"
fi

if [ ! -f "$CHROME_BIN" ]; then
  CHROME_BIN="$(which google-chrome 2>/dev/null || which chromium 2>/dev/null || true)"
fi

if [ -z "$CHROME_BIN" ] || [ ! -f "$CHROME_BIN" ]; then
  echo "[x] Google Chrome or Chromium executable not found."
  exit 1
fi

DEV_PROFILE="${TEMP:-/tmp}/chrome-cgg-dev"
mkdir -p "$DEV_PROFILE"

TEST_PAGE="file:///${SCRIPT_DIR}/test/test_page.html"

echo "[*] Extension Path : ${SCRIPT_DIR}"
echo "[*] Target Harness : ${TEST_PAGE}"
echo "[*] Launching Chrome in isolated profile..."

"$CHROME_BIN" --load-extension="${SCRIPT_DIR}" --user-data-dir="${DEV_PROFILE}" "${TEST_PAGE}" &
echo "[OK] Chrome dispatched successfully."
