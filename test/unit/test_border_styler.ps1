$ErrorActionPreference = "Stop"
$code = Get-Content "src/features/styler/border_styler.js" -Raw
if ($code -notmatch "BorderStyler") { throw "Missing BorderStyler" }
if ($code -notmatch "--cgg-border-crimson") { throw "Missing crimson border token" }
Write-Host "[PASS] BorderStyler verified."
