$ErrorActionPreference = "Stop"
$code = Get-Content "src/styles/tooltip/halo.css" -Raw
if ($code -notmatch "radial-gradient") { throw "Missing radial gradient" }
Write-Host "[PASS] Halo CSS verified."
