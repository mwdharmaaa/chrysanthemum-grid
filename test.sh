#!/usr/bin/env bash
set -euo pipefail

echo "========================================"
echo "[*] Chrysanthemum Gold Grid - Integrity Test"
echo "========================================"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ ! -f "${SCRIPT_DIR}/manifest.json" ]; then
  echo "[FAIL] manifest.json missing."
  exit 1
fi

REQUIRED_FILES=(
  "icons/icon-16.png"
  "icons/icon-48.png"
  "icons/icon-128.png"
  "icons/icon.svg"
  "src/assets/wing_left.png"
  "src/assets/wing_right.png"
  "src/core/palette_config.js"
  "src/styles/chrysanthemum.css"
  "src/styles/gold_typography.css"
  "src/styles/winged_tooltip.css"
  "src/features/gold_styler.js"
  "src/features/winged_tooltip.js"
  "src/features/calendar_observer.js"
  "src/content_main.js"
  "src/popup/popup.html"
  "src/popup/popup.css"
  "src/popup/popup.js"
  "test/test_page.html"
)

MISSING=0
for f in "${REQUIRED_FILES[@]}"; do
  if [ -f "${SCRIPT_DIR}/$f" ]; then
    echo "  [OK] $f exists."
  else
    echo "  [MISSING] $f"
    MISSING=$((MISSING + 1))
  fi
done

if [ "$MISSING" -gt 0 ]; then
  echo "[FAIL] $MISSING required files missing."
  exit 1
fi

echo "========================================"
echo "[ALL PASS] Extension integrity verified."
echo "========================================"
