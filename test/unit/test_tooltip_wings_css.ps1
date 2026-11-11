$ErrorActionPreference = "Stop"
$code = Get-Content "src/styles/tooltip/wings.css" -Raw
if ($code -notmatch "cgg-winged-tooltip-wing") { throw "Missing wing selector" }
Write-Host "[PASS] Wings CSS verified."
