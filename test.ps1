$ErrorActionPreference = "Stop"

Write-Host "========================================"
Write-Host "[*] Chrysanthemum Gold Grid - Integrity Test"
Write-Host "========================================"

$baseDir = $PSScriptRoot

# 1. Manifest Validation
$manifestPath = Join-Path $baseDir "manifest.json"
if (-not (Test-Path $manifestPath)) {
    Write-Error "[FAIL] manifest.json missing."
    exit 1
}

try {
    $manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json
    Write-Host "[PASS] manifest.json is valid JSON (version $($manifest.version))."
} catch {
    Write-Error "[FAIL] Failed to parse manifest.json: $_"
    exit 1
}

# 2. Key Asset Verification
$requiredFiles = @(
    "icons/icon-16.png",
    "icons/icon-48.png",
    "icons/icon-128.png",
    "icons/icon.svg",
    "src/assets/wing_left.png",
    "src/assets/wing_right.png",
    "src/core/palette_config.js",
    "src/styles/chrysanthemum.css",
    "src/styles/gold_typography.css",
    "src/styles/winged_tooltip.css",
    "src/features/gold_styler.js",
    "src/features/winged_tooltip.js",
    "src/features/calendar_observer.js",
    "src/content_main.js",
    "src/popup/popup.html",
    "src/popup/popup.css",
    "src/popup/popup.js",
    "test/test_page.html"
)

$missingCount = 0
foreach ($relPath in $requiredFiles) {
    $fullPath = Join-Path $baseDir $relPath
    if (Test-Path $fullPath) {
        Write-Host "  [OK] $relPath exists."
    } else {
        Write-Host "  [MISSING] $relPath" -ForegroundColor Red
        $missingCount++
    }
}

if ($missingCount -gt 0) {
    Write-Error "[FAIL] $missingCount required files missing."
    exit 1
}

Write-Host "========================================"
Write-Host "[ALL PASS] Extension integrity verified."
Write-Host "========================================"
