$ErrorActionPreference = "Stop"
$code = Get-Content "src/styles/tooltip/levels.css" -Raw
if ($code -notmatch "cgg-level-4") { throw "Missing level 4 tier" }
Write-Host "[PASS] Levels CSS verified."
