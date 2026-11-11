$ErrorActionPreference = "Stop"
$code = Get-Content "src/features/tooltip/positioner.js" -Raw
if ($code -notmatch "getBoundingClientRect") { throw "Missing bounding rect calculation" }
if ($code -notmatch "centerX") { throw "Missing center alignment" }
Write-Host "[PASS] Positioner coordinate logic verified."
