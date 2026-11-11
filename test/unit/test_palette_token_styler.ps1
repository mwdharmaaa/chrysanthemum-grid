$ErrorActionPreference = "Stop"
$code = Get-Content "src/features/styler/palette_token_styler.js" -Raw
if ($code -notmatch "PaletteTokenStyler") { throw "Missing PaletteTokenStyler" }
if ($code -notmatch "--cgg-l0") { throw "Missing cgg-l0 token" }
if ($code -notmatch "apply\(settings") { throw "Missing apply method" }
Write-Host "[PASS] PaletteTokenStyler verified."
