$ErrorActionPreference = "Stop"
$code = Get-Content "src/styles/tooltip/animations.css" -Raw
if ($code -notmatch "cggWingFlutter") { throw "Missing keyframe animation" }
Write-Host "[PASS] Animations CSS verified."
