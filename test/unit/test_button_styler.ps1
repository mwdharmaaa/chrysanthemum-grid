$ErrorActionPreference = "Stop"
$code = Get-Content "src/features/styler/button_styler.js" -Raw
if ($code -notmatch "ButtonStyler") { throw "Missing ButtonStyler" }
if ($code -notmatch "--cgg-crimson-base") { throw "Missing crimson base token" }
Write-Host "[PASS] ButtonStyler verified."
